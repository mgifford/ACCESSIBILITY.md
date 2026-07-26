import { readFile } from 'node:fs/promises';

/**
 * Applies an opt-in blocking policy against a results.json produced by
 * run-site-checks.mjs. Disabled by default in the sample workflow — see
 * .github/workflows/behavioral-accessibility-checks.yml — because
 * treating every indicator as a blocking failure produces noisy, low-trust
 * CI. Projects should choose which categories are worth blocking on.
 *
 * Usage:
 *   node lib/check-policy.mjs results.json --fail-on=focusVisible.confirmedNoVisibleChange
 *   node lib/check-policy.mjs results.json --fail-on=reflow.potentialReflowBarrier
 *   node lib/check-policy.mjs results.json --warn-on=reflow.cantTell,focusVisible.cantTell
 *
 * Dotted paths (e.g. "focusVisible.confirmedNoVisibleChange") are read
 * from the results.json summary counts. --fail-on exits non-zero if any
 * named count is greater than zero. --warn-on only prints a warning and
 * always exits zero. Multiple paths may be comma-separated.
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
