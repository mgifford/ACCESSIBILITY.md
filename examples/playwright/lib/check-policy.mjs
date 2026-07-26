import { readFile } from 'node:fs/promises';

/**
 * Applies an opt-in blocking policy against a results.json produced by
 * run-site-checks.mjs. Disabled by default in the sample workflow — see
 * .github/workflows/behavioral-accessibility-checks.yml — because
 * treating every indicator as a blocking failure produces noisy, low-trust
 * CI. Projects should choose which categories are worth blocking on.
 *
 * IMPORTANT: --fail-on reads a raw count from results.json. It has no
 * baseline-comparison capability — it cannot distinguish a reviewed,
 * previously-confirmed regression from a first-seen, unreviewed
 * indicator. Do NOT point --fail-on at reflow.potentialReflowBarrier or
 * focusVisible.confirmedNoVisibleChange as a general policy: an
 * unreviewed Reflow indicator has not ruled out the normative SC 1.4.10
 * exception, and an unreviewed confirmed-no-visible-change result has not
 * been through human review either. See
 * examples/BEHAVIORAL_ACCESSIBILITY_AUTOMATION.md section 3.2 and
 * examples/CI_CD_ACCESSIBILITY_BEST_PRACTICES.md#risk-indicators-and-build-gates.
 * Reviewed-baseline comparison is not implemented here; treat any
 * --fail-on use against those two paths as a documented gap, not a
 * supported pattern, until that capability exists.
 *
 * Usage:
 *   node lib/check-policy.mjs results.json --fail-on=reflow.testError,focusVisible.testError
 *   node lib/check-policy.mjs results.json --warn-on=reflow.cantTell,focusVisible.cantTell
 *
 * Dotted paths (e.g. "reflow.testError") are read from the results.json
 * summary counts. --fail-on exits non-zero if any named count is greater
 * than zero. --warn-on only prints a warning and always exits zero.
 * Multiple paths may be comma-separated. A test-error count is a safe
 * default --fail-on target because it means the check itself did not run
 * correctly, not that a human has yet to review a finding.
 */

function parseArgs(argv) {
  const resultsPath = argv[2];
  const failOn = [];
  const warnOn = [];
  for (const arg of argv.slice(3)) {
    if (arg.startsWith('--fail-on=')) {
      failOn.push(...arg.slice('--fail-on='.length).split(',').map((s) => s.trim()).filter(Boolean));
    } else if (arg.startsWith('--warn-on=')) {
      warnOn.push(...arg.slice('--warn-on='.length).split(',').map((s) => s.trim()).filter(Boolean));
    }
  }
  return { resultsPath, failOn, warnOn };
}

function getByPath(obj, path) {
  return path.split('.').reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
}

async function main() {
  const { resultsPath, failOn, warnOn } = parseArgs(process.argv);

  if (!resultsPath) {
    console.error('Usage: node lib/check-policy.mjs <results.json> [--fail-on=path,path] [--warn-on=path,path]');
    process.exitCode = 2;
    return;
  }

  const data = JSON.parse(await readFile(resultsPath, 'utf8'));

  let shouldFail = false;

  for (const path of warnOn) {
    const count = getByPath(data, path);
    if (typeof count === 'number' && count > 0) {
      console.warn(`[warn] ${path} = ${count} (not blocking; policy is warn-on)`);
    }
  }

  for (const path of failOn) {
    const count = getByPath(data, path);
    if (count === undefined) {
      console.error(`[policy error] Unknown result path: ${path}`);
      shouldFail = true;
      continue;
    }
    if (typeof count === 'number' && count > 0) {
      console.error(`[fail] ${path} = ${count} (policy: --fail-on)`);
      shouldFail = true;
    } else {
      console.log(`[ok] ${path} = ${count}`);
    }
  }

  if (shouldFail) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error('check-policy failed:', error);
  process.exitCode = 1;
});
