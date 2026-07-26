import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';
import { checkReflowRisk } from '../reflow-risk.mjs';
import { checkFocusVisibleRisk } from '../focus-visible-risk.mjs';

/**
 * Runs the Reflow and Focus Visible behavioral checks against a small set
 * of representative rendered pages and writes a structured results.json.
 * Intended for CI use (see .github/workflows/behavioral-accessibility-checks.yml)
 * but runnable locally: SITE_BASE_URL=http://127.0.0.1:4000 node lib/run-site-checks.mjs
 *
 * PAGE_PATHS can be overridden via the PAGE_PATHS env var (comma-separated,
 * relative paths). The default set is intentionally small and generic
 * because this repository's own site is documentation, not an application
 * with many interactive templates; adopting projects should replace this
 * list with their own representative user-task pages.
 */

const baseUrl = process.env.SITE_BASE_URL ?? 'http://127.0.0.1:4000';
const pagePaths = (process.env.PAGE_PATHS ?? '/,/examples/,/examples/playwright/fixtures/reflow/01-responsive-pass.html')
  .split(',')
  .map((p) => p.trim())
  .filter(Boolean);

const screenshotDir = new URL('../screenshots/', import.meta.url).pathname;

async function main() {
  await mkdir(screenshotDir, { recursive: true });

  const browser = await chromium.launch();
  const results = {
    generatedAt: new Date().toISOString(),
    baseUrl,
    reflow: { results: [], noOverflowDetected: 0, potentialReflowBarrier: 0, cantTell: 0, testError: 0 },
    focusVisible: { results: [], visibleChangeDetected: 0, confirmedNoVisibleChange: 0, potentialMissingIndicator: 0, cantTell: 0, testError: 0 },
    notes: [
      'This file contains behavioral risk indicators and confirmed-for-instance findings, not a WCAG conformance determination.',
      'See examples/BEHAVIORAL_ACCESSIBILITY_AUTOMATION.md for the result vocabulary.',
    ],
  };

  for (const path of pagePaths) {
    const url = new URL(path, baseUrl).toString();

    const reflowPage = await browser.newPage();
    try {
      const reflowResult = await checkReflowRisk(reflowPage, url, {
        captureScreenshotOnFinding: true,
        screenshotDir,
      });
      results.reflow.results.push(reflowResult);
      if (reflowResult.verdict === 'no-overflow-detected') results.reflow.noOverflowDetected += 1;
      else if (reflowResult.verdict === 'potential-reflow-barrier') results.reflow.potentialReflowBarrier += 1;
      else if (reflowResult.verdict === 'cant-tell') results.reflow.cantTell += 1;
      else results.reflow.testError += 1;
    } finally {
      await reflowPage.close();
    }

    const focusPage = await browser.newPage();
    try {
      const focusResult = await checkFocusVisibleRisk(focusPage, url, {
        maxTabStops: 20,
        captureScreenshotsOnFinding: true,
        screenshotDir,
      });
      results.focusVisible.results.push(focusResult);
      results.focusVisible.visibleChangeDetected += focusResult.summary?.visibleChangeDetected ?? 0;
      results.focusVisible.confirmedNoVisibleChange += focusResult.summary?.confirmedNoVisibleChange ?? 0;
      results.focusVisible.potentialMissingIndicator += focusResult.summary?.potentialMissingIndicator ?? 0;
      results.focusVisible.cantTell += focusResult.summary?.cantTell ?? 0;
      if (focusResult.error) results.focusVisible.testError += 1;
    } finally {
      await focusPage.close();
    }
  }

  await browser.close();

  const outputPath = new URL('../results.json', import.meta.url).pathname;
  await writeFile(outputPath, JSON.stringify(results, null, 2));
  console.log(`Wrote ${outputPath}`);
  console.log(
    `Reflow: ${results.reflow.noOverflowDetected} no-overflow, ${results.reflow.potentialReflowBarrier} potential-barrier, ${results.reflow.cantTell} cant-tell, ${results.reflow.testError} test-error`,
  );
  console.log(
    `Focus Visible: ${results.focusVisible.visibleChangeDetected} visible-change, ${results.focusVisible.confirmedNoVisibleChange} confirmed-no-change, ${results.focusVisible.potentialMissingIndicator} potential-missing, ${results.focusVisible.cantTell} cant-tell, ${results.focusVisible.testError} test-error`,
  );
}

main().catch((error) => {
  console.error('run-site-checks failed:', error);
  process.exitCode = 1;
});
