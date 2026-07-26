/**
 * Reflow risk check (WCAG 2.2 SC 1.4.10 Reflow).
 *
 * Independently reimplemented from the documented method used by the
 * Centralised Web Accessibility Checker (CWAC) ReflowAudit plugin, developed
 * by the Web Standards team at Te Punaha Matihiko, New Zealand Government:
 * https://github.com/GOVTNZ/cwac/blob/main/src/audit_plugins/reflow_audit.py
 *
 * CWAC is licensed under GPLv3. This repository is MIT licensed. No CWAC
 * source code was copied or translated. This module was written from
 * scratch in JavaScript against Playwright, following only the *documented
 * behaviour* (resize to a narrow viewport, attempt a horizontal scroll,
 * measure whether the scroll succeeded). See
 * examples/BEHAVIORAL_ACCESSIBILITY_AUTOMATION.md for full attribution and a
 * statement of what was copied, translated, adapted, or reimplemented.
 *
 * This module produces a RISK INDICATOR, not a conformance verdict. SC
 * 1.4.10 has normative exceptions (content requiring two-dimensional layout
 * for usage or meaning, e.g. tables, maps, diagrams, video, games,
 * presentations, toolbars) that only a human reviewer can confirm. A clean
 * result does not prove SC 1.4.10 conformance, and an overflow result does
 * not prove a violation.
 *
 * At site or fleet scale, do not treat every affected page as an
 * independent finding: pages typically share templates and components, so
 * one shared defect can produce many affected pages from one root cause.
 * See examples/BEHAVIORAL_ACCESSIBILITY_AUTOMATION.md section 3.2 for why
 * per-target false-positive probabilities compound across many targets,
 * and section 6 for root-cause clustering vocabulary.
 */

/** @typedef {'no-overflow-detected'|'potential-reflow-barrier'|'cant-tell'|'test-error'} ReflowVerdict */

const DEFAULT_VIEWPORT = { width: 320, height: 720 };
const DEFAULT_STABILIZE_TIMEOUT_MS = 5000;
const DEFAULT_STABILIZE_POLL_MS = 250;
const DEFAULT_STABILIZE_QUIET_MS = 500;

/**
 * Wait for layout to stabilize: document ready, fonts ready, images
 * decoded, and no further change in document scroll dimensions for a
 * quiet period. This is a best-effort heuristic, not a guarantee that all
 * asynchronous JavaScript has finished.
 *
 * Known limitation: a quiet-period heuristic cannot distinguish "nothing
 * is happening" from "we are between two delayed changes." A page whose
 * layout-affecting script fires after a delay shorter than `quietMs` can
 * be misread as stable before that change lands. Increase `quietMs` (at
 * the cost of a slower check) for pages known to have delayed layout
 * changes, or prefer an explicit application-level "ready" signal when
 * one is available.
 *
 * @param {import('playwright').Page} page
 * @param {{ timeoutMs?: number, pollMs?: number, quietMs?: number }} [options]
 * @returns {Promise<{ stabilized: boolean, elapsedMs: number }>}
 */
export async function waitForLayoutStable(page, options = {}) {
  const timeoutMs = options.timeoutMs ?? DEFAULT_STABILIZE_TIMEOUT_MS;
  const pollMs = options.pollMs ?? DEFAULT_STABILIZE_POLL_MS;
  const quietMs = options.quietMs ?? DEFAULT_STABILIZE_QUIET_MS;

  const start = Date.now();

  try {
    await page.waitForLoadState('load', { timeout: timeoutMs });
  } catch {
    // Continue; some pages never reach 'load' due to long-lived connections.
  }

  try {
    await page.evaluate(() => document.fonts && document.fonts.ready);
  } catch {
    // document.fonts is not available in every engine; ignore.
  }

  let lastSize = null;
  let quietSince = Date.now();

  while (Date.now() - start < timeoutMs) {
    let size;
    try {
      size = await page.evaluate(() => ({
        height: document.documentElement.scrollHeight,
        width: document.documentElement.scrollWidth,
      }));
    } catch {
      return { stabilized: false, elapsedMs: Date.now() - start };
    }

    const unchanged =
      lastSize && size.height === lastSize.height && size.width === lastSize.width;

    if (unchanged) {
      if (Date.now() - quietSince >= quietMs) {
        return { stabilized: true, elapsedMs: Date.now() - start };
      }
    } else {
      lastSize = size;
      quietSince = Date.now();
    }

    await page.waitForTimeout(pollMs);
  }

  return { stabilized: false, elapsedMs: Date.now() - start };
}

/**
 * Attempt a horizontal scroll and measure whether the document moved,
 * following the CWAC method of "try to scroll right, then read back the
 * resulting scroll position." Works for both LTR and RTL documents: in RTL
 * documents, scrollLeft can be zero, negative, or positive-from-the-right
 * depending on the browser engine, so we compare the *magnitude* of scroll
 * movement rather than assuming a sign.
 *
 * @param {import('playwright').Page} page
 * @returns {Promise<{ attemptedScrollX: number, actualScrollX: number, direction: 'ltr'|'rtl', scrolled: boolean }>}
 */
async function attemptHorizontalScroll(page) {
  const before = await page.evaluate(() => ({
    scrollX: window.scrollX,
    direction: getComputedStyle(document.documentElement).direction === 'rtl' ? 'rtl' : 'ltr',
  }));

  const attemptedScrollX = 100;

  await page.evaluate((amount) => {
    window.scrollTo(amount, 0);
  }, attemptedScrollX);

  // Let the scroll settle (smooth-scroll CSS, snap points, etc.).
  await page.waitForTimeout(100);

  const after = await page.evaluate(() => window.scrollX);

  return {
    attemptedScrollX,
    actualScrollX: after,
    direction: before.direction,
    scrolled: Math.abs(after - before.scrollX) > 0.5,
  };
}

/**
 * Measure document and viewport dimensions relevant to overflow detection.
 *
 * @param {import('playwright').Page} page
 */
async function measureDimensions(page) {
  return page.evaluate(() => {
    const doc = document.documentElement;
    const body = document.body;
    return {
      clientWidth: doc.clientWidth,
      scrollWidth: doc.scrollWidth,
      bodyClientWidth: body ? body.clientWidth : null,
      bodyScrollWidth: body ? body.scrollWidth : null,
      innerWidth: window.innerWidth,
    };
  });
}

/**
 * Best-effort identification of elements whose scrollWidth exceeds the
 * viewport width. This is a heuristic to help a reviewer find the likely
 * cause of overflow; it does not attempt to classify whether the element
 * qualifies for the SC 1.4.10 two-dimensional-layout exception.
 *
 * @param {import('playwright').Page} page
 * @param {number} viewportWidth
 * @param {number} maxResults
 */
async function findLikelyOverflowingElements(page, viewportWidth, maxResults = 10) {
  try {
    return await page.evaluate(
      ({ viewportWidth, maxResults }) => {
        const candidates = [];
        const all = document.body ? document.body.querySelectorAll('*') : [];
        for (const el of all) {
          const rect = el.getBoundingClientRect();
          if (rect.right > viewportWidth + 1 && rect.width > 0) {
            const selectorParts = [];
            if (el.id) selectorParts.push(`#${el.id}`);
            if (el.className && typeof el.className === 'string' && el.className.trim()) {
              selectorParts.push(`.${el.className.trim().split(/\s+/).join('.')}`);
            }
            candidates.push({
              tagName: el.tagName.toLowerCase(),
              selector: selectorParts.join('') || el.tagName.toLowerCase(),
              rightEdge: Math.round(rect.right),
              width: Math.round(rect.width),
              overflowPx: Math.round(rect.right - viewportWidth),
            });
          }
          if (candidates.length >= maxResults * 4) break;
        }
        return candidates
          .sort((a, b) => b.overflowPx - a.overflowPx)
          .slice(0, maxResults);
      },
      { viewportWidth, maxResults },
    );
  } catch {
    return [];
  }
}

/**
 * Run a reflow risk check against a single page.
 *
 * @param {import('playwright').Page} page - an already-created Playwright page/context
 * @param {string} url - URL to navigate to
 * @param {object} [options]
 * @param {{width: number, height: number}} [options.viewport] - defaults to 320x720
 * @param {number} [options.stabilizeTimeoutMs]
 * @param {number} [options.quietMs] - how long dimensions must stay unchanged to be considered stable; increase for pages with known delayed layout changes
 * @param {number} [options.pollMs]
 * @param {boolean} [options.captureScreenshotOnFinding] - default false
 * @param {string} [options.screenshotDir] - required if captureScreenshotOnFinding is true
 * @param {number} [options.maxOverflowElements] - default 10
 * @returns {Promise<ReflowResult>}
 */
export async function checkReflowRisk(page, url, options = {}) {
  const viewport = options.viewport ?? DEFAULT_VIEWPORT;
  const captureScreenshotOnFinding = options.captureScreenshotOnFinding ?? false;
  const maxOverflowElements = options.maxOverflowElements ?? 10;

  /** @type {ReflowResult} */
  const result = {
    checkType: 'reflow-risk',
    url,
    viewport,
    verdict: /** @type {ReflowVerdict} */ ('test-error'),
    overflowDetected: null,
    dimensions: null,
    scroll: null,
    likelyOverflowingElements: [],
    screenshotPath: null,
    stabilized: null,
    elapsedMs: null,
    error: null,
    timestamp: new Date().toISOString(),
    notes: [
      'This is a page-level overflow risk indicator, not a conformance check.',
      'SC 1.4.10 exempts content that requires two-dimensional layout for usage or meaning; a human reviewer must confirm any exception applies. An unreviewed overflow finding has not ruled out this exception and should not be treated as a confirmed WCAG failure.',
      'A clean (no-overflow-detected) result does not prove SC 1.4.10 conformance.',
      'At scale, review repeated findings for a shared root cause (e.g. a component or template) before treating each affected page as an independent defect. See BEHAVIORAL_ACCESSIBILITY_AUTOMATION.md section 3.2.',
    ],
  };

  try {
    await page.setViewportSize(viewport);
  } catch (error) {
    result.error = `Failed to set viewport: ${error.message}`;
    result.verdict = 'test-error';
    return result;
  }

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
  } catch (error) {
    result.error = `Failed to navigate: ${error.message}`;
    result.verdict = 'test-error';
    return result;
  }

  const stabilization = await waitForLayoutStable(page, {
    timeoutMs: options.stabilizeTimeoutMs,
    quietMs: options.quietMs,
    pollMs: options.pollMs,
  });
  result.stabilized = stabilization.stabilized;
  result.elapsedMs = stabilization.elapsedMs;

  if (!stabilization.stabilized) {
    result.verdict = 'cant-tell';
    result.notes.push('Page did not stabilize (layout kept changing) within the timeout; result is inconclusive.');
    return result;
  }

  try {
    result.dimensions = await measureDimensions(page);
    result.scroll = await attemptHorizontalScroll(page);
  } catch (error) {
    result.error = `Failed during measurement: ${error.message}`;
    result.verdict = 'test-error';
    return result;
  }

  const overflowAmount = Math.max(
    0,
    result.dimensions.scrollWidth - result.dimensions.clientWidth,
  );
  const overflowDetected = overflowAmount > 1 || result.scroll.scrolled;
  result.overflowDetected = overflowDetected;
  result.overflowAmountPx = overflowAmount;

  if (overflowDetected) {
    result.verdict = 'potential-reflow-barrier';
    result.likelyOverflowingElements = await findLikelyOverflowingElements(
      page,
      viewport.width,
      maxOverflowElements,
    );

    if (captureScreenshotOnFinding) {
      if (!options.screenshotDir) {
        result.notes.push('captureScreenshotOnFinding was set but screenshotDir was not provided; screenshot skipped.');
      } else {
        try {
          const path = `${options.screenshotDir}/reflow-${Date.now()}.png`;
          await page.screenshot({ path, fullPage: false });
          result.screenshotPath = path;
        } catch (error) {
          result.notes.push(`Screenshot capture failed: ${error.message}`);
        }
      }
    }
  } else {
    result.verdict = 'no-overflow-detected';
  }

  // Reset scroll position so later tests/fixtures on the same page start clean.
  try {
    await page.evaluate(() => window.scrollTo(0, 0));
  } catch {
    result.notes.push('Failed to reset scroll position after the check.');
  }

  return result;
}

/**
 * @typedef {object} ReflowResult
 * @property {'reflow-risk'} checkType
 * @property {string} url
 * @property {{width: number, height: number}} viewport
 * @property {ReflowVerdict} verdict
 * @property {boolean|null} overflowDetected
 * @property {number} [overflowAmountPx]
 * @property {object|null} dimensions
 * @property {object|null} scroll
 * @property {Array<object>} likelyOverflowingElements
 * @property {string|null} screenshotPath
 * @property {boolean|null} stabilized
 * @property {number|null} elapsedMs
 * @property {string|null} error
 * @property {string} timestamp
 * @property {string[]} notes
 */
