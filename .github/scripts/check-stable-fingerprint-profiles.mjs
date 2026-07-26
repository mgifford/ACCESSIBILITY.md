// Fails if a stable fingerprint profile, its normalization/display-ID
// references, or an existing golden test vector has changed relative to a
// base git revision. New profile versions, new vectors, and untouched
// content are all allowed to pass; editing the byte content of anything
// already published as "status": "stable" is not.
//
// This does not replace check-fingerprint-vectors.mjs. That script proves a
// profile's current files are internally consistent (the recorded expected
// digests actually match what the profile computes). This script proves
// nobody quietly rewrote a stable profile and its expected outputs together
// to launder a breaking change through as if it were still the same
// version.
//
// Usage:
//   node .github/scripts/check-stable-fingerprint-profiles.mjs --base <git-revision>
//
// In CI, pass the pull request's base SHA (e.g. `github.event.pull_request.base.sha`
// with a fetch-depth that includes it). Locally, pass `main`, `origin/main`,
// or any ref that predates your change.

import { execFileSync } from 'node:child_process';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const FINGERPRINTS_DIR = path.join(REPO_ROOT, 'examples', 'fingerprints');

function parseArgs(argv) {
  const args = { base: null };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--base') {
      args.base = argv[i + 1];
      i += 1;
    }
  }
  return args;
}

function git(args, options = {}) {
  return execFileSync('git', args, { cwd: REPO_ROOT, encoding: 'utf8', ...options });
}

function fileExistsAtRevision(revision, relPath) {
  try {
    git(['cat-file', '-e', `${revision}:${relPath}`], { stdio: ['ignore', 'ignore', 'ignore'] });
    return true;
  } catch {
    return false;
  }
}

function readFileAtRevision(revision, relPath) {
  return git(['show', `${revision}:${relPath}`]);
}

function isStableProfile(jsonText) {
  try {
    const parsed = JSON.parse(jsonText);
    return parsed.status === 'stable';
  } catch {
    return false;
  }
}

function allVectorsById(vectorsDoc) {
  const byId = new Map();
  for (const group of ['pattern_vectors', 'occurrence_vectors', 'relationship_checks']) {
    for (const vector of vectorsDoc[group] ?? []) {
      byId.set(vector.id, vector);
    }
  }
  return byId;
}

function stableStringify(value) {
  // Order-insensitive comparison of vector objects: JSON.stringify with a
  // sorted-key replacer is sufficient here because this is a same-process
  // equality check, not a cross-implementation digest.
  return JSON.stringify(value, Object.keys(value).sort());
}

// Returns vector IDs present at the base revision whose recorded content
// (input, expected_fingerprint, expected_display_id, expect_error, etc.)
// differs from the current working copy. A vector that is unchanged, or
// that is newly added, is not reported.
function changedExistingVectorIds(baseVectorsDoc, currentVectorsDoc) {
  const baseById = allVectorsById(baseVectorsDoc);
  const currentById = allVectorsById(currentVectorsDoc);
  const changed = [];

  for (const [id, baseVector] of baseById) {
    const currentVector = currentById.get(id);
    if (!currentVector) {
      // A previously published vector was removed. Treat as a change to
      // existing coverage, not a safe addition.
      changed.push(id);
      continue;
    }
    if (stableStringify(baseVector) !== stableStringify(currentVector)) {
      changed.push(id);
    }
  }

  return changed;
}

const { base } = parseArgs(process.argv.slice(2));

if (!base) {
  console.error('Usage: node check-stable-fingerprint-profiles.mjs --base <git-revision>');
  process.exit(2);
}

try {
  git(['rev-parse', '--verify', base]);
} catch {
  console.error(`Could not resolve base revision "${base}".`);
  console.error('If your CI checkout is shallow, increase fetch-depth or fetch the base ref explicitly.');
  console.error('See examples/fingerprints/README.md, "How stable-profile modification is detected".');
  process.exit(2);
}

// Every file in examples/fingerprints/ that looks like a profile definition
// or a vector file is in scope. Profile files are only protected once they
// carry "status": "stable" at the base revision; a profile still in
// development (no stable status yet, or newly added) is exempt so version 1
// can be iterated on before its first stable publication.
const candidateFiles = ['test-vectors.json'];
if (existsSync(FINGERPRINTS_DIR)) {
  for (const entry of readdirSync(FINGERPRINTS_DIR)) {
    if (/^a11y-.*-v\d+\.json$/.test(entry)) {
      candidateFiles.push(entry);
    }
  }
}

const violations = [];

for (const fileName of candidateFiles) {
  const relPath = path.join('examples', 'fingerprints', fileName);
  const absPath = path.join(REPO_ROOT, relPath);

  if (!existsSync(absPath)) {
    // Deleted in the working tree; not this script's concern here.
    continue;
  }

  if (!fileExistsAtRevision(base, relPath)) {
    // New file since the base revision. Always allowed.
    continue;
  }

  const baseContent = readFileAtRevision(base, relPath);
  const currentContent = readFileSync(absPath, 'utf8');

  if (baseContent === currentContent) {
    continue;
  }

  if (fileName === 'test-vectors.json') {
    // Adding new vectors is always allowed. Only report a violation when a
    // vector that already existed at the base revision has changed shape
    // (different input, expected_fingerprint, expected_display_id, or
    // expect_error) or was removed outright.
    let baseVectorsDoc;
    let currentVectorsDoc;
    try {
      baseVectorsDoc = JSON.parse(baseContent);
      currentVectorsDoc = JSON.parse(currentContent);
    } catch (error) {
      violations.push({ file: relPath, profileHint: 'test-vectors.json (failed to parse for comparison)' });
      continue;
    }

    const changedIds = changedExistingVectorIds(baseVectorsDoc, currentVectorsDoc);
    if (changedIds.length > 0) {
      violations.push({
        file: relPath,
        profileHint: `test-vectors.json (published golden vector${changedIds.length > 1 ? 's' : ''}: ${changedIds.join(', ')})`,
      });
    }
    continue;
  }

  const baseWasStable = isStableProfile(baseContent);

  if (!baseWasStable) {
    // The profile was not yet published as stable at the base revision, so
    // it is still allowed to change freely.
    continue;
  }

  violations.push({ file: relPath, profileHint: JSON.parse(baseContent).profile });
}

if (violations.length > 0) {
  console.error('FAIL: stable fingerprint profile content has changed.\n');
  for (const violation of violations) {
    console.error(`The stable fingerprint profile ${violation.profileHint} has changed.`);
    console.error(`  File: ${violation.file}\n`);
  }
  console.error(
    'Do not update an existing stable profile when the change can alter generated\n' +
    'identifiers. Create a new profile version, retain v1, add migration notes, and\n' +
    'dual-write both versions during transition. See examples/fingerprints/README.md,\n' +
    '"Changing a fingerprint profile".'
  );
  process.exit(1);
}

console.log(`OK: no stable fingerprint profile or published vector file changed relative to ${base}.`);
