// Guards a specific promise made by the schema_version 2.1 policy-classification
// update (obligation/handling/evidence_status, examples/ACCESSIBILITY_FINDING_TRACKING.md,
// "Policy Classification"): that change must never alter fingerprint generation,
// normalization, or identity.
//
// This is intentionally independent of check-fingerprint-vectors.mjs, which
// recomputes vectors and would already fail if a profile's *output* changed.
// This script instead pins the exact bytes of every file that defines
// fingerprint identity, so it fails immediately -- with a message naming this
// policy change as the likely cause -- if any of those files are touched at
// all, even in ways that happen not to change a computed digest.
//
// Usage:
//   node check-policy-fingerprint-invariance.mjs
//
// If this check fails because a fingerprint profile is being deliberately
// changed for unrelated reasons, update EXPECTED_SHA256 to match and record
// why in examples/fingerprints/README.md, "Changing a fingerprint profile" --
// do not update it to silence a failure caused by this policy change.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import path from 'node:path';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const FINGERPRINTS_DIR = path.join(HERE, '..', 'fingerprints');

// Recorded immediately before the schema_version 2.1 policy-classification
// work began (2.0 schema baseline, PR "Define versioned JSON Schema for
// machine-readable accessibility findings" / a11y/pattern/v1 + a11y/occurrence/v1
// profile introduction). These files are frozen identity-defining artifacts;
// none of them should ever change as a side effect of a policy-classification
// schema update.
const EXPECTED_SHA256 = {
  'a11y-pattern-v1.json': '5f8dfdd5130561b2d9ec91126cdc785b447ac0299a503291df6e221653758e2d',
  'a11y-occurrence-v1.json': 'e15b834d3122605a0dc064d229e2c9bc86965adfc0330c5c7e684b969271c795',
  'test-vectors.json': '65d83b393c87715a971be1b9a1b325d68934c955148dfc8b0c366cb064fd84d8',
  'fingerprint-core.mjs': 'c5db02168263167dfe351eab9aaf8d808da8da3ac23e729d7474702776935533',
};

function sha256(filePath) {
  return createHash('sha256').update(readFileSync(filePath)).digest('hex');
}

const failures = [];

for (const [filename, expected] of Object.entries(EXPECTED_SHA256)) {
  const filePath = path.join(FINGERPRINTS_DIR, filename);
  let actual;
  try {
    actual = sha256(filePath);
  } catch (error) {
    failures.push(`examples/fingerprints/${filename} could not be read: ${error.message}`);
    continue;
  }
  if (actual !== expected) {
    failures.push(
      `examples/fingerprints/${filename} has changed.\n` +
      `    expected sha256: ${expected}\n` +
      `    actual sha256:   ${actual}\n` +
      `    The schema_version 2.1 policy-classification update must not change fingerprint\n` +
      `    generation, normalization, tracker IDs, or any other identity field. If this file\n` +
      `    is changing for an unrelated, deliberate reason, update EXPECTED_SHA256 in this\n` +
      `    script and document the change in examples/fingerprints/README.md.`
    );
  }
}

if (failures.length > 0) {
  console.error(`FAIL: ${failures.length} fingerprint-identity file(s) changed unexpectedly:\n`);
  for (const message of failures) {
    console.error(`- ${message}\n`);
  }
  process.exit(1);
}

console.log(`OK: all ${Object.keys(EXPECTED_SHA256).length} fingerprint-identity file(s) are byte-identical to their pre-2.1 baseline.`);
