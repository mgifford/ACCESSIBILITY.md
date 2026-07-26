import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { startFixtureServer } from '../lib/serve-fixtures.mjs';
import { checkReflowRisk } from '../reflow-risk.mjs';

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

async function runReflowCheck(fixturePath, options = {}) {
  const page = await browser.newPage();
  try {
    return await checkReflowRisk(page, `${fixtureServer.baseUrl}/reflow/${fixturePath}`, {
      stabilizeTimeoutMs: 3000,
      ...options,
    });
  } finally {
    await page.close();
  }
}

test('reflow: responsive page reports no-overflow-detected', async () => {
  const result = await runReflowCheck('01-responsive-pass.html');
  assert.equal(result.verdict, 'no-overflow-detected');
  assert.equal(result.overflowDetected, false);
});

test('reflow: fixed-width layout reports potential-reflow-barrier', async () => {
  const result = await runReflowCheck('02-fixed-width-layout.html');
  assert.equal(result.verdict, 'potential-reflow-barrier');
  assert.equal(result.overflowDetected, true);
  assert.ok(result.overflowAmountPx > 0);
});

test('reflow: overflowing descendant reports potential-reflow-barrier', async () => {
  const result = await runReflowCheck('03-overflowing-descendant.html');
  assert.equal(result.verdict, 'potential-reflow-barrier');
  assert.ok(result.likelyOverflowingElements.length > 0);
});

test('reflow: long unbroken string reports potential-reflow-barrier', async () => {
  const result = await runReflowCheck('04-long-unbroken-string.html');
  assert.equal(result.verdict, 'potential-reflow-barrier');
});

test('reflow: preformatted code reports potential-reflow-barrier', async () => {
  const result = await runReflowCheck('05-preformatted-code.html');
  assert.equal(result.verdict, 'potential-reflow-barrier');
});

test('reflow: table in its own scroll container reports no-overflow-detected at page level', async () => {
  const result = await runReflowCheck('06-table-own-scroll-container.html');
  assert.equal(result.verdict, 'no-overflow-detected');
});

test('reflow: table causing page overflow reports potential-reflow-barrier', async () => {
  const result = await runReflowCheck('07-table-page-overflow.html');
  assert.equal(result.verdict, 'potential-reflow-barrier');
});

test('reflow: oversized image reports potential-reflow-barrier', async () => {
  const result = await runReflowCheck('08-oversized-image.html');
  assert.equal(result.verdict, 'potential-reflow-barrier');
});

test('reflow: clipped content without scrollbar reports no-overflow-detected (documented false-negative risk)', async () => {
  const result = await runReflowCheck('09-clipped-no-scrollbar.html');
  assert.equal(result.verdict, 'no-overflow-detected');
});

test('reflow: sticky/fixed content within viewport reports no-overflow-detected', async () => {
  const result = await runReflowCheck('10-sticky-fixed-content.html');
  assert.equal(result.verdict, 'no-overflow-detected');
});

test('reflow: RTL responsive page reports no-overflow-detected', async () => {
  const result = await runReflowCheck('11-rtl-page.html');
  assert.equal(result.verdict, 'no-overflow-detected');
  assert.equal(result.scroll.direction, 'rtl');
});

test('reflow: RTL fixed-width layout reports potential-reflow-barrier', async () => {
  const result = await runReflowCheck('12-rtl-fixed-width.html');
  assert.equal(result.verdict, 'potential-reflow-barrier');
  assert.equal(result.scroll.direction, 'rtl');
});

test('reflow: late layout shift within the quiet window is caught after stabilization', async () => {
  // quietMs (500ms) is shorter than the fixture's 1500ms delayed change, so a
  // default-configuration check will read "stable" before the widget appears.
  // This documents a real, known limitation of quiet-period heuristics (see
  // the waitForLayoutStable comment): they cannot distinguish "nothing is
  // happening" from "we're between two scheduled changes." Passing a
  // quietMs longer than the known delay demonstrates the check CAN catch
  // this case when configured for it.
  const result = await runReflowCheck('13-late-layout-shift.html', {
    stabilizeTimeoutMs: 4000,
    quietMs: 2000,
  });
  assert.equal(result.stabilized, true);
  assert.equal(result.verdict, 'potential-reflow-barrier');
});

test('reflow: late layout shift with default quiet window demonstrates the false-stability limitation', async () => {
  const result = await runReflowCheck('13-late-layout-shift.html', { stabilizeTimeoutMs: 4000 });
  // With the default 500ms quiet window, the check declares stability
  // before the fixture's 1500ms delayed change fires, producing a false
  // no-overflow-detected result. This is expected and documents why
  // quietMs must be tuned to the page under test.
  assert.equal(result.stabilized, true);
  assert.equal(result.verdict, 'no-overflow-detected');
});

test('reflow: unreachable page reports test-error', async () => {
  const page = await browser.newPage();
  try {
    const result = await checkReflowRisk(page, 'http://127.0.0.1:1/does-not-exist', {
      stabilizeTimeoutMs: 1000,
    });
    assert.equal(result.verdict, 'test-error');
    assert.ok(result.error);
  } finally {
    await page.close();
  }
});

test('reflow: result always includes conformance-limitation notes', async () => {
  const result = await runReflowCheck('01-responsive-pass.html');
  assert.ok(result.notes.length > 0);
  assert.ok(result.notes.some((note) => note.includes('not a conformance check')));
});

test('reflow: scroll position is reset after a barrier is found', async () => {
  const page = await browser.newPage();
  try {
    await checkReflowRisk(page, `${fixtureServer.baseUrl}/reflow/02-fixed-width-layout.html`, {
      stabilizeTimeoutMs: 3000,
    });
    const scrollX = await page.evaluate(() => window.scrollX);
    assert.equal(scrollX, 0);
  } finally {
    await page.close();
  }
});
