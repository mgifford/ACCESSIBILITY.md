import { readFile } from 'node:fs/promises';

/**
 * Reads a results.json produced by run-site-checks.mjs and prints a
 * Markdown summary suitable for $GITHUB_STEP_SUMMARY. Separates
 * indicators from confirmed-for-instance findings, per the vocabulary in
 * examples/BEHAVIORAL_ACCESSIBILITY_AUTOMATION.md section 3.
 *
 * Usage: node lib/summarize-results.mjs results.json
 */

const resultsPath = process.argv[2] ?? 'results.json';

async function main() {
  let raw;
  try {
    raw = await readFile(resultsPath, 'utf8');
  } catch (error) {
    console.log(`## Behavioral Accessibility Checks\n\nCould not read ${resultsPath}: ${error.message}\n`);
    return;
  }

  const data = JSON.parse(raw);

  const lines = [];
  lines.push('## Behavioral Accessibility Checks');
  lines.push('');
  lines.push(
    '> These are behavioral risk indicators and confirmed-for-instance findings, not a WCAG conformance determination. See [BEHAVIORAL_ACCESSIBILITY_AUTOMATION.md](../examples/BEHAVIORAL_ACCESSIBILITY_AUTOMATION.md).',
  );
  lines.push('');
  lines.push(`Generated: ${data.generatedAt} against \`${data.baseUrl}\``);
  lines.push('');
  lines.push('### Reflow risk (SC 1.4.10)');
  lines.push('');
  lines.push('| Verdict | Count | Category |');
  lines.push('| --- | --- | --- |');
  lines.push(`| no-overflow-detected | ${data.reflow.noOverflowDetected} | — (not proof of conformance) |`);
  lines.push(`| potential-reflow-barrier | ${data.reflow.potentialReflowBarrier} | Indicator — needs review |`);
  lines.push(`| cant-tell | ${data.reflow.cantTell} | Inconclusive |`);
  lines.push(`| test-error | ${data.reflow.testError} | Check did not run |`);
  lines.push('');
  lines.push('### Focus Visible risk (SC 2.4.7)');
  lines.push('');
  lines.push('| Verdict | Count | Category |');
  lines.push('| --- | --- | --- |');
  lines.push(`| visible-change-detected | ${data.focusVisible.visibleChangeDetected} | — (not proof of sufficiency) |`);
  lines.push(`| confirmed-no-visible-change | ${data.focusVisible.confirmedNoVisibleChange} | Confirmed failure for that component |`);
  lines.push(`| potential-missing-indicator | ${data.focusVisible.potentialMissingIndicator} | Indicator — needs review |`);
  lines.push(`| cant-tell (unstable / no-coverage) | ${data.focusVisible.cantTell} | Inconclusive |`);
  lines.push(`| test-error | ${data.focusVisible.testError} | Check did not run |`);
  lines.push('');

  if (data.focusVisible.confirmedNoVisibleChange > 0) {
    lines.push(
      `**${data.focusVisible.confirmedNoVisibleChange} confirmed missing focus indication(s) found.** Review the uploaded results.json and screenshots artifact.`,
    );
    lines.push('');
  }

  console.log(lines.join('\n'));
}

main().catch((error) => {
  console.error('summarize-results failed:', error);
  process.exitCode = 1;
});
