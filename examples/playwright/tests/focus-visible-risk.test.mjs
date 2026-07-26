import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { startFixtureServer } from '../lib/serve-fixtures.mjs';
import { checkFocusVisibleRisk } from '../focus-visible-risk.mjs';

/** @type {import('playwright').Browser} */
let browser;
/** @type {Awaited<ReturnType<typeof startFixtureServer>>} */
let fixtureServer;

before(async () => {
  browser = await chromium.launch();
  fixtureServer = await startFixtureServer();
});

after(async () => {
  await browser?.close();
  await fixtureServer?.close();
});

async function runFocusCheck(fixturePath, options = {}) {
  const page = await browser.newPage();
  try {
    return await checkFocusVisibleRisk(page, `${fixtureServer.baseUrl}/focus-visible/${fixturePath}`, {
      maxTabStops: 10,
      ...options,
    });
  } finally {
    await page.close();
  }
}

function verdictsFor(result) {
  return result.stops.map((s) => s.verdict);
}

test('focus-visible: browser-default indicators are detected on all three controls', async () => {
  const result = await runFocusCheck('01-browser-default.html');
  assert.ok(result.pageStable);
  const applicableStops = result.stops.filter((s) => s.element);
  assert.equal(applicableStops.length, 3, JSON.stringify(result.stops));
  assert.equal(result.summary.visibleChangeDetected, 3, JSON.stringify(result.stops));
  assert.deepEqual(
    applicableStops.map((s) => s.element.tagName),
    ['a', 'button', 'input'],
  );
});

test('focus-visible: outline:none with no replacement is a confirmed-no-visible-change failure', async () => {
  // Focus demonstrably moved (the active element changed each Tab press)
  // but no pixels changed near the element, so this is CONCLUSIVE for
  // SC 2.4.7 on these components, not merely a "potential" indicator.
  // potential-missing-indicator is reserved for the case where we cannot
  // even confirm focus moved.
  const result = await runFocusCheck('02-outline-none-no-replacement.html');
  assert.ok(result.summary.confirmedNoVisibleChange >= 1, JSON.stringify(result.stops));
  assert.equal(result.summary.visibleChangeDetected, 0);
});

test('focus-visible: valid custom outline is detected on every applicable stop, not just the first', async () => {
  // Regression test: resolveActiveElementInfo used to mark BOTH the
  // pre-Tab and post-Tab active element on every stop, leaving a stale
  // marker on the previous element. querySelector then found that stale
  // (document-order-first) marked element instead of the newly focused
  // one, causing every stop after the first to silently re-test the same
  // already-tested element and misreport it as having no visible change.
  const result = await runFocusCheck('03-valid-custom-outline.html');
  const applicableStops = result.stops.filter((s) => s.element);
  assert.equal(applicableStops.length, 2, JSON.stringify(result.stops));
  assert.ok(applicableStops.every((s) => s.verdict === 'visible-change-detected'), JSON.stringify(result.stops));
  // The link and the button must be reported as distinct elements.
  const tags = applicableStops.map((s) => s.element.tagName);
  assert.deepEqual(tags, ['a', 'button']);
});

test('focus-visible: background-color change is detected', async () => {
  const result = await runFocusCheck('04-background-color-change.html');
  assert.ok(result.summary.visibleChangeDetected >= 1);
});

test('focus-visible: :focus-visible pseudo-class indicator is detected', async () => {
  const result = await runFocusCheck('06-focus-visible-pseudo.html');
  assert.ok(result.summary.visibleChangeDetected >= 1);
});

test('focus-visible: skip link revealed on focus is detected as a large visible change', async () => {
  const result = await runFocusCheck('10-skip-link-revealed-on-focus.html');
  assert.ok(result.summary.visibleChangeDetected >= 1);
});

test('focus-visible: open shadow DOM button is resolved and checked', async () => {
  const result = await runFocusCheck('13-open-shadow-dom.html');
  const shadowStop = result.stops.find((s) => s.element && s.element.tagName === 'button');
  assert.ok(shadowStop, JSON.stringify(result.stops));
  assert.equal(shadowStop.verdict, 'visible-change-detected');
});

test('focus-visible: same-origin iframe focus reports cant-tell-no-coverage', async () => {
  const result = await runFocusCheck('14-same-origin-iframe.html', { maxTabStops: 3 });
  assert.ok(verdictsFor(result).includes('cant-tell-no-coverage'), JSON.stringify(result.stops));
});

test('focus-visible: page with no focusable components terminates cleanly', async () => {
  const result = await runFocusCheck('20-no-focusable-components.html', { maxTabStops: 5 });
  assert.ok(result.stops.length <= 3, `expected the loop to terminate quickly, got ${result.stops.length} stops`);
  assert.ok(result.stops.every((s) => s.verdict === 'skipped-not-applicable'));
});

test('focus-visible: focus remaining on body terminates cleanly', async () => {
  const result = await runFocusCheck('21-focus-remains-on-body.html', { maxTabStops: 5 });
  assert.ok(result.stops.length <= 3);
});

test('focus-visible: single focusable element then focus leaves the document', async () => {
  const result = await runFocusCheck('22-focus-leaves-document.html', { maxTabStops: 10 });
  assert.ok(result.summary.visibleChangeDetected >= 1);
  assert.ok(verdictsFor(result).includes('skipped-not-applicable'));
});

test('focus-visible: unrelated page animation causes cant-tell-unstable rather than a false pass', async () => {
  const result = await runFocusCheck('17-unrelated-page-animation.html', {
    maxTabStops: 3,
  });
  // The page never stabilizes because of the continuous spinner animation.
  assert.equal(result.pageStable, false);
  const buttonStop = result.stops.find((s) => s.element && s.element.tagName === 'button');
  assert.ok(buttonStop, JSON.stringify(result.stops));
  assert.equal(buttonStop.verdict, 'cant-tell-unstable');
});

test('focus-visible: result includes limitation notes on every run', async () => {
  const result = await runFocusCheck('01-browser-default.html');
  assert.ok(result.notes.some((n) => n.includes('not proof of SC 1.4.11')));
});

test('focus-visible: unreachable page reports a navigation error', async () => {
  const page = await browser.newPage();
  try {
    const result = await checkFocusVisibleRisk(page, 'http://127.0.0.1:1/does-not-exist', {
      maxTabStops: 2,
    });
    assert.ok(result.error);
    assert.equal(result.stops.length, 0);
  } finally {
    await page.close();
  }
});

test('focus-visible: browsers auto-scroll Tab-focused elements into view', async () => {
  // Real browsers scroll a newly focused element into view as part of
  // handling the Tab key, so by the time this check reads the element's
  // bounding rect it is typically already back inside the viewport. This
  // fixture documents that behaviour rather than a check limitation: the
  // stop still resolves normally because the browser did the scrolling.
  const result = await runFocusCheck('11-element-outside-initial-viewport.html', { maxTabStops: 3 });
  const buttonStop = result.stops.find((s) => s.element && s.element.tagName === 'button');
  assert.ok(buttonStop, JSON.stringify(result.stops));
  assert.equal(buttonStop.element.inViewport, true);
});
