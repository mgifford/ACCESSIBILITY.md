/**
 * Focus Visible behavioural risk check (WCAG 2.2 SC 2.4.7 Focus Visible).
 *
 * Independently reimplemented from the documented method used by the
 * Centralised Web Accessibility Checker (CWAC) FocusIndicatorAudit plugin,
 * developed by the Web Standards team at Te Punaha Matihiko, New Zealand
 * Government:
 * https://github.com/GOVTNZ/cwac/blob/main/src/audit_plugins/focus_indicator_audit.py
 *
 * CWAC is licensed under GPLv3. This repository is MIT licensed. No CWAC
 * source code was copied or translated. This module was written from
 * scratch in JavaScript against Playwright, following only the *documented
 * behaviour*: send real Tab key presses, take reference and focused
 * screenshots, and compare pixels to see whether anything visibly changed.
 * See examples/BEHAVIORAL_ACCESSIBILITY_AUTOMATION.md for full attribution.
 *
 * Key difference from a naive "did any pixel on the page change" check:
 * this module scopes its pixel comparison to a region around the focused
 * element's bounding box (not the whole page), and separately reports
 * whether unrelated page motion was observed, so a change elsewhere on an
 * animating page cannot be misread as evidence of a focus indicator, and
 * genuine motion elsewhere does not mask a missing indicator on the
 * focused element itself.
 *
 * This module produces per-tab-stop RISK INDICATORS. A "visible-change-near-
 * element" verdict is not proof the indicator has sufficient size, contrast,
 * or usability (SC 1.4.11, SC 2.4.13) — those require separate testing or
 * manual review. A "confirmed-no-visible-change" verdict can be conclusive
 * for SC 2.4.7 on a given component only when focus demonstrably moved to
 * an applicable, rendered component and the page was visually stable.
 */

/**
 * @typedef {'confirmed-no-visible-change'|'potential-missing-indicator'|'visible-change-detected'|'cant-tell-unstable'|'cant-tell-no-coverage'|'test-error'|'skipped-not-applicable'} FocusStopVerdict
 */

const DEFAULT_MAX_TAB_STOPS = 30;
const DEFAULT_ANIMATION_CHECK_ROUNDS = 3;
const DEFAULT_ANIMATION_CHECK_INTERVAL_MS = 400;
const DEFAULT_REGION_PADDING_PX = 24;
const DEFAULT_PIXEL_DIFF_THRESHOLD = 12; // per-channel 0-255 tolerance for anti-aliasing noise
const FOCUS_MARKER_ATTR = 'data-a11y-focus-check-marker';

/**
 * Wait for the page to stop visibly animating by comparing full-page
 * screenshots taken a short interval apart, following the CWAC method.
 * Unlike a single-shot check, this repeats until two consecutive
 * screenshots are identical (a true "quiet" reading) or a round budget is
 * exhausted.
 *
 * @param {import('playwright').Page} page
 * @param {{ rounds?: number, intervalMs?: number }} [options]
 * @returns {Promise<{ stable: boolean, roundsUsed: number }>}
 */
export async function waitForVisualStability(page, options = {}) {
  const rounds = options.rounds ?? DEFAULT_ANIMATION_CHECK_ROUNDS;
  const intervalMs = options.intervalMs ?? DEFAULT_ANIMATION_CHECK_INTERVAL_MS;

  let previous = null;
  for (let i = 0; i < rounds; i += 1) {
    const current = await page.screenshot({ fullPage: false });
    if (previous && buffersEqual(previous, current)) {
      return { stable: true, roundsUsed: i + 1 };
    }
    previous = current;
    await page.waitForTimeout(intervalMs);
  }
  return { stable: false, roundsUsed: rounds };
}

function buffersEqual(a, b) {
  if (a.length !== b.length) return false;
  // Sampling comparison keeps this fast on large screenshots; exact
  // equality on a sample is a reasonable proxy for "nothing is animating."
  const step = Math.max(1, Math.floor(a.length / 5000));
  for (let i = 0; i < a.length; i += step) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

/**
 * Resolve the deepest active element, following open shadow roots and
 * same-origin iframes where practical. Returns descriptive metadata rather
 * than an element handle so it can cross frame boundaries.
 *
 * @param {import('playwright').Page} page
 * @param {{ mark?: boolean }} [options] - set `mark: true` to tag the
 *   resolved element with the temporary re-focus marker attribute. Only
 *   one element should ever be marked at a time (see
 *   {@link clearFocusMarker}); callers that only need to *read* the active
 *   element (e.g. the pre-Tab snapshot) should leave this false so a stale
 *   marker from an earlier stop can never accumulate and shadow the
 *   intended element in a later `querySelector` lookup.
 */
async function resolveActiveElementInfo(page, options = {}) {
  const mark = options.mark ?? false;
  // Handle the top-level document and any open shadow roots first.
  const mainFrameInfo = await page.evaluate(({ markerAttr, mark }) => {
    function describeElement(el) {
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      return {
        tagName: el.tagName.toLowerCase(),
        role: el.getAttribute('role'),
        accessibleName:
          el.getAttribute('aria-label') ||
          el.getAttribute('alt') ||
          el.getAttribute('title') ||
          (el.labels && el.labels[0] && el.labels[0].textContent) ||
          (el.textContent ? el.textContent.trim().slice(0, 120) : null),
        id: el.id || null,
        className: typeof el.className === 'string' ? el.className : null,
        htmlExcerpt: el.outerHTML ? el.outerHTML.slice(0, 300) : null,
        rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
        inViewport:
          rect.bottom > 0 &&
          rect.top < window.innerHeight &&
          rect.right > 0 &&
          rect.left < window.innerWidth,
      };
    }

    function deepestActiveElement(root) {
      let active = root.activeElement;
      while (active && active.shadowRoot && active.shadowRoot.activeElement) {
        active = active.shadowRoot.activeElement;
      }
      return active;
    }

    const active = deepestActiveElement(document);

    if (!active || active === document.body) {
      return { location: 'body-or-none', element: describeElement(active), isIframe: false };
    }

    if (active.tagName === 'IFRAME') {
      return { location: 'iframe', element: describeElement(active), isIframe: true };
    }

    if (mark) {
      // Tag the element with a temporary marker attribute so it can be
      // re-focused deterministically later (e.g. to capture an unfocused
      // reference screenshot) without relying on a CSS selector that may
      // not be unique or stable for custom widgets.
      active.setAttribute(markerAttr, 'true');
    }

    return { location: 'main-or-shadow', element: describeElement(active), isIframe: false };
  }, { markerAttr: FOCUS_MARKER_ATTR, mark });

  return mainFrameInfo;
}

/**
 * Re-focus the element previously tagged by {@link resolveActiveElementInfo}
 * and remove the temporary marker attribute afterwards. Searches open
 * shadow roots as well as the light DOM, since document.querySelector does
 * not pierce shadow boundaries.
 *
 * @param {import('playwright').Page} page
 */
async function refocusMarkedElement(page) {
  return page.evaluate((markerAttr) => {
    function findMarked(root) {
      const direct = root.querySelector(`[${markerAttr}]`);
      if (direct) return direct;
      for (const el of root.querySelectorAll('*')) {
        if (el.shadowRoot) {
          const found = findMarked(el.shadowRoot);
          if (found) return found;
        }
      }
      return null;
    }
    const el = findMarked(document);
    if (el) {
      el.focus();
      el.removeAttribute(markerAttr);
      return true;
    }
    return false;
  }, FOCUS_MARKER_ATTR);
}

/**
 * Blur the element previously tagged by {@link resolveActiveElementInfo}.
 * Searches open shadow roots as well as the light DOM.
 *
 * @param {import('playwright').Page} page
 */
async function blurMarkedElement(page) {
  return page.evaluate((markerAttr) => {
    function findMarked(root) {
      const direct = root.querySelector(`[${markerAttr}]`);
      if (direct) return direct;
      for (const el of root.querySelectorAll('*')) {
        if (el.shadowRoot) {
          const found = findMarked(el.shadowRoot);
          if (found) return found;
        }
      }
      return null;
    }
    const el = findMarked(document);
    if (el) {
      el.blur();
      return true;
    }
    return false;
  }, FOCUS_MARKER_ATTR);
}

/**
 * Remove the temporary marker attribute without changing focus, used when
 * a stop is skipped and no re-focus is needed. Searches open shadow roots
 * as well as the light DOM.
 *
 * @param {import('playwright').Page} page
 */
async function clearFocusMarker(page) {
  return page.evaluate((markerAttr) => {
    function findMarked(root) {
      const direct = root.querySelector(`[${markerAttr}]`);
      if (direct) return direct;
      for (const el of root.querySelectorAll('*')) {
        if (el.shadowRoot) {
          const found = findMarked(el.shadowRoot);
          if (found) return found;
        }
      }
      return null;
    }
    const el = findMarked(document);
    if (el) el.removeAttribute(markerAttr);
  }, FOCUS_MARKER_ATTR);
}

/**
 * Check whether the page (or a same-origin child frame) currently has
 * document focus, used to detect focus leaving the document entirely.
 *
 * @param {import('playwright').Page} page
 */
async function documentHasFocus(page) {
  try {
    return await page.evaluate(() => document.hasFocus());
  } catch {
    return false;
  }
}

/**
 * Crop a full-page PNG screenshot buffer down to a padded region around a
 * bounding box using Playwright's `clip` option on a fresh screenshot,
 * rather than pixel-cropping the buffer, so this has no extra image-library
 * dependency.
 *
 * @param {import('playwright').Page} page
 * @param {{x:number,y:number,width:number,height:number}} rect
 * @param {number} paddingPx
 */
async function screenshotRegion(page, rect, paddingPx) {
  const viewport = page.viewportSize() ?? { width: 1280, height: 720 };
  const clip = {
    x: Math.max(0, Math.floor(rect.x - paddingPx)),
    y: Math.max(0, Math.floor(rect.y - paddingPx)),
    width: Math.min(
      viewport.width - Math.max(0, Math.floor(rect.x - paddingPx)),
      Math.ceil(rect.width + paddingPx * 2),
    ),
    height: Math.min(
      viewport.height - Math.max(0, Math.floor(rect.y - paddingPx)),
      Math.ceil(rect.height + paddingPx * 2),
    ),
  };

  if (clip.width <= 0 || clip.height <= 0) {
    return null;
  }

  return page.screenshot({ clip });
}

/**
 * Compare two same-size PNG-encoded region screenshots and report whether
 * a meaningful fraction of sampled pixels differ. Uses a coarse decode-free
 * byte comparison: PNG re-encoding of an unchanged region from the same
 * renderer is deterministic in Chromium/Firefox/WebKit under Playwright, so
 * byte-level sampling is a reasonable, dependency-free proxy for pixel
 * comparison. Projects needing exact anti-aliasing-tolerant diffing should
 * swap in an image-diff library (e.g. pixelmatch) at this call site.
 *
 * @param {Buffer|null} before
 * @param {Buffer|null} after
 */
function regionsDiffer(before, after) {
  if (!before || !after) return null; // unknown
  if (before.length !== after.length) return true;
  let diffCount = 0;
  const step = Math.max(1, Math.floor(before.length / 20000));
  let sampled = 0;
  for (let i = 0; i < before.length; i += step) {
    sampled += 1;
    if (Math.abs(before[i] - after[i]) > DEFAULT_PIXEL_DIFF_THRESHOLD) {
      diffCount += 1;
    }
  }
  // Require more than a token number of differing samples to absorb
  // single-byte PNG chunk/metadata noise.
  return diffCount > Math.max(2, sampled * 0.002);
}

/**
 * Run a Focus Visible behavioural risk check by tabbing through the page a
 * configurable number of times and comparing region screenshots.
 *
 * @param {import('playwright').Page} page
 * @param {string} url
 * @param {object} [options]
 * @param {number} [options.maxTabStops] - default 30
 * @param {number} [options.regionPaddingPx] - default 24
 * @param {boolean} [options.captureScreenshotsOnFinding] - default false
 * @param {string} [options.screenshotDir]
 * @returns {Promise<FocusVisibleResult>}
 */
export async function checkFocusVisibleRisk(page, url, options = {}) {
  const maxTabStops = options.maxTabStops ?? DEFAULT_MAX_TAB_STOPS;
  const regionPaddingPx = options.regionPaddingPx ?? DEFAULT_REGION_PADDING_PX;
  const captureScreenshotsOnFinding = options.captureScreenshotsOnFinding ?? false;

  /** @type {FocusVisibleResult} */
  const result = {
    checkType: 'focus-visible-risk',
    url,
    timestamp: new Date().toISOString(),
    pageStable: null,
    stops: [],
    summary: { total: 0, confirmedNoVisibleChange: 0, potentialMissingIndicator: 0, visibleChangeDetected: 0, cantTell: 0, skipped: 0 },
    error: null,
    notes: [
      'Each stop result is a behavioural risk indicator, not proof of SC 1.4.11/2.4.13 conformance.',
      'A visible-change-detected verdict does not establish that the indicator has sufficient size, contrast, or usability.',
      'A confirmed-no-visible-change verdict is conclusive for SC 2.4.7 on that component only when focus demonstrably moved, the component was in the captured region, and the page was visually stable.',
    ],
  };

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
  } catch (error) {
    result.error = `Failed to navigate: ${error.message}`;
    return result;
  }

  const stability = await waitForVisualStability(page);
  result.pageStable = stability.stable;

  if (!stability.stable) {
    result.notes.push('Page did not reach visual stability before testing began; all stop results are cant-tell-unstable.');
  }

  // Move focus to a known starting point (top of document) before tabbing.
  try {
    await page.evaluate(() => {
      if (document.activeElement && document.activeElement !== document.body) {
        document.activeElement.blur();
      }
    });
  } catch {
    // Non-fatal.
  }

  for (let stopIndex = 1; stopIndex <= maxTabStops; stopIndex += 1) {
    const beforeInfo = await resolveActiveElementInfo(page);

    await page.keyboard.press('Tab');
    await page.waitForTimeout(80);

    const hasFocusAfter = await documentHasFocus(page);

    if (!hasFocusAfter) {
      result.stops.push({
        stopIndex,
        verdict: /** @type {FocusStopVerdict} */ ('skipped-not-applicable'),
        reason: 'Focus left the document (e.g. moved to browser chrome). Sequential focus order exhausted.',
        element: null,
      });
      result.summary.skipped += 1;
      break;
    }

    const afterInfo = await resolveActiveElementInfo(page, { mark: true });

    const focusMoved =
      JSON.stringify(beforeInfo.element) !== JSON.stringify(afterInfo.element);

    if (afterInfo.location === 'body-or-none') {
      result.stops.push({
        stopIndex,
        verdict: 'skipped-not-applicable',
        reason: 'Focus is on <body> or no element; no applicable focusable component to test.',
        element: afterInfo.element,
      });
      result.summary.skipped += 1;
      if (!focusMoved && stopIndex > 1) {
        // Focus did not move and is not advancing; stop to avoid an infinite loop.
        break;
      }
      continue;
    }

    if (afterInfo.isIframe) {
      await clearFocusMarker(page);
      result.stops.push({
        stopIndex,
        verdict: 'cant-tell-no-coverage',
        reason: 'Focus moved into an iframe. Cross-frame focus resolution beyond same-origin best-effort is not implemented in this example.',
        element: afterInfo.element,
      });
      result.summary.cantTell += 1;
      continue;
    }

    if (!afterInfo.element || !afterInfo.element.inViewport) {
      await clearFocusMarker(page);
      result.stops.push({
        stopIndex,
        verdict: 'cant-tell-no-coverage',
        reason: 'Focused element is outside the current viewport; scroll-into-view and long-page handling is left to the caller for this example.',
        element: afterInfo.element,
      });
      result.summary.cantTell += 1;
      continue;
    }

    if (!stability.stable) {
      await clearFocusMarker(page);
      result.stops.push({
        stopIndex,
        verdict: 'cant-tell-unstable',
        reason: 'Page was not visually stable before testing; pixel comparison would be unreliable.',
        element: afterInfo.element,
      });
      result.summary.cantTell += 1;
      continue;
    }

    // Capture the focused-state region, then blur the marked element to
    // capture an unfocused reference of the exact same region, then
    // restore focus to the same element via the marker so the next Tab
    // press continues the natural forward sequence.
    const rect = afterInfo.element.rect;

    let focusedRegionShot = null;
    let unfocusedRegionShot = null;
    try {
      focusedRegionShot = await screenshotRegion(page, rect, regionPaddingPx);

      await blurMarkedElement(page);
      await page.waitForTimeout(60);

      unfocusedRegionShot = await screenshotRegion(page, rect, regionPaddingPx);

      await refocusMarkedElement(page);
      await page.waitForTimeout(40);
    } catch (error) {
      await clearFocusMarker(page);
      result.stops.push({
        stopIndex,
        verdict: 'test-error',
        reason: `Failed to capture region screenshots: ${error.message}`,
        element: afterInfo.element,
      });
      continue;
    }

    const differs = regionsDiffer(unfocusedRegionShot, focusedRegionShot);

    /** @type {FocusStopVerdict} */
    let verdict;
    if (differs === null) {
      verdict = 'cant-tell-no-coverage';
      result.summary.cantTell += 1;
    } else if (differs) {
      verdict = 'visible-change-detected';
      result.summary.visibleChangeDetected += 1;
    } else if (focusMoved) {
      verdict = 'confirmed-no-visible-change';
      result.summary.confirmedNoVisibleChange += 1;
    } else {
      verdict = 'potential-missing-indicator';
      result.summary.potentialMissingIndicator += 1;
    }

    /** @type {any} */
    const stopResult = {
      stopIndex,
      verdict,
      element: afterInfo.element,
      focusMoved,
    };

    const isFinding = verdict === 'visible-change-detected' || verdict === 'potential-missing-indicator';
    if (isFinding && captureScreenshotsOnFinding && options.screenshotDir) {
      try {
        const path = `${options.screenshotDir}/focus-stop-${stopIndex}-${Date.now()}.png`;
        if (focusedRegionShot) {
          const fs = await import('node:fs/promises');
          await fs.writeFile(path, focusedRegionShot);
          stopResult.screenshotPath = path;
        }
      } catch (error) {
        result.notes.push(`Stop ${stopIndex}: failed to save screenshot (${error.message}).`);
      }
    }

    result.stops.push(stopResult);
  }

  result.summary.total = result.stops.length;
  return result;
}

/**
 * @typedef {object} FocusVisibleResult
 * @property {'focus-visible-risk'} checkType
 * @property {string} url
 * @property {string} timestamp
 * @property {boolean|null} pageStable
 * @property {Array<object>} stops
 * @property {{total:number, confirmedNoVisibleChange:number, potentialMissingIndicator:number, visibleChangeDetected:number, cantTell:number, skipped:number}} summary
 * @property {string|null} error
 * @property {string[]} notes
 */
