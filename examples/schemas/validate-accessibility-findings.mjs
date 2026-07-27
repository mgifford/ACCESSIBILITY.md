// Validates the accessibility-finding-v2 schema and its example files, and
// checks that fingerprints embedded in those examples match what Stage 2's
// frozen a11y/pattern/v1 and a11y/occurrence/v1 profiles actually compute.
//
// This script does not reimplement fingerprint generation. It imports the
// single normative implementation from examples/fingerprints/fingerprint-core.mjs
// (the same module examples/fingerprints/check-fingerprint-vectors.mjs uses)
// so that fingerprint computation is defined in exactly one place.
//
// Usage:
//   node validate-accessibility-findings.mjs

import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import { computeDigest, displayId, HEX64 } from '../fingerprints/fingerprint-core.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));

function loadJSON(relPath) {
  return JSON.parse(readFileSync(path.join(HERE, relPath), 'utf8'));
}

const failures = [];
function fail(message) {
  failures.push(message);
}

const schema = loadJSON('accessibility-finding-v2.schema.json');
const ajv = new Ajv2020({ strict: true, allErrors: true });
addFormats(ajv);

let validate;
try {
  validate = ajv.compile(schema);
} catch (error) {
  console.error(`FAIL: schema failed to compile: ${error.message}`);
  process.exit(1);
}

// --- 1. Valid examples must all pass. ---

const validExamples = [
  'accessibility-finding-v2.example.json',
  'accessibility-finding-v2-minimal.example.json',
  'accessibility-finding-v2-manual.example.json',
];

for (const file of validExamples) {
  const data = loadJSON(file);
  const ok = validate(data);
  if (!ok) {
    fail(`${file} was expected to be VALID but failed schema validation:\n${JSON.stringify(validate.errors, null, 2)}`);
  }
}

// --- 1b. schema_version 2.1 policy-classification examples must all pass. ---

const policyDoc = loadJSON('accessibility-finding-v2.1-policy-examples.json');

for (const testCase of policyDoc.cases ?? []) {
  const ok = validate(testCase.finding);
  if (!ok) {
    fail(`[${testCase.id}] (${testCase.description}) was expected to be VALID but failed schema validation:\n${JSON.stringify(validate.errors, null, 2)}`);
  }
}

// --- 1c. Shared cross-repo policy fixtures (../shared-fixtures/) must all pass. ---
//
// These fixtures are also consumed by accessibility-skills and vital-core;
// see ../shared-fixtures/README.md. Validating them here keeps this repo's
// copy schema-valid, but does not by itself prove the other two repos agree
// with it -- that is asserted by each of their own shared-fixture tests.

const sharedFixturesDir = path.join(HERE, '..', 'shared-fixtures');
const sharedFixtureFiles = readdirSync(sharedFixturesDir).filter((f) => f.endsWith('.json'));

for (const file of sharedFixtureFiles) {
  const data = loadJSON(path.join('..', 'shared-fixtures', file));
  const ok = validate(data);
  if (!ok) {
    fail(`shared-fixtures/${file} was expected to be VALID but failed schema validation:\n${JSON.stringify(validate.errors, null, 2)}`);
  }
}

// --- 2. Invalid examples must all fail, for the declared reason. ---

const invalidDoc = loadJSON('accessibility-finding-v2-invalid-examples.json');

for (const testCase of invalidDoc.cases ?? []) {
  const ok = validate(testCase.finding);

  if (ok) {
    fail(`[${testCase.id}] was expected to be INVALID (${testCase.reason}) but validation passed.`);
    continue;
  }

  const expected = testCase.expected_failure;
  const matched = (validate.errors ?? []).some(
    (err) => err.instancePath === expected.instancePath && err.keyword === expected.keyword
  );

  if (!matched) {
    fail(
      `[${testCase.id}] failed validation, but not for the declared reason.\n` +
      `  expected: instancePath="${expected.instancePath}" keyword="${expected.keyword}"\n` +
      `  actual errors: ${JSON.stringify(validate.errors, null, 2)}`
    );
  }
}

// --- 3. Fingerprints embedded in valid examples must match Stage 2's frozen computation. ---
//
// This script does not know the original pattern/occurrence *input* that
// produced an example's embedded fingerprint (the finding record only
// carries the output, by design -- see accessibility-finding-v2.schema.json,
// $defs.fingerprints). So this check recomputes the two fingerprints this
// module ships worked examples for, from their documented inputs, and
// confirms those recomputed values match both examples/fingerprints/README.md's
// worked example and the values embedded in accessibility-finding-v2.example.json.

const completeExample = loadJSON('accessibility-finding-v2.example.json');

const checkoutPatternInput = {
  target: { scope_type: 'repository', scope_id: 'https://github.com/example/product' },
  rule: { namespace: 'manual', id: 'error-message-association' },
  locator: { type: 'css', normalization_profile: 'a11y/css-locator/v1', value: "[data-component='payment-form']" },
  state_key: 'empty-card-number-submitted',
};
const recomputedPatternDigest = computeDigest('a11y/pattern/v1', checkoutPatternInput);
const embeddedPatternDigest = completeExample.tracking?.fingerprints?.['a11y/pattern/v1']?.value;

if (recomputedPatternDigest !== embeddedPatternDigest) {
  fail(
    `accessibility-finding-v2.example.json's a11y/pattern/v1 fingerprint has drifted from the frozen profile.\n` +
    `  recomputed: ${recomputedPatternDigest}\n` +
    `  embedded:   ${embeddedPatternDigest}`
  );
}

const checkoutOccurrenceInput = {
  pattern_fingerprint: { profile: 'a11y/pattern/v1', algorithm: 'sha-256', value: recomputedPatternDigest },
  location: { scope: 'exact-resource', normalization_profile: 'a11y/exact-resource/v1', key: '/checkout/payment' },
  test_profile: null,
};
const recomputedOccurrenceDigest = computeDigest('a11y/occurrence/v1', checkoutOccurrenceInput);
const embeddedOccurrenceDigest = completeExample.tracking?.fingerprints?.['a11y/occurrence/v1']?.value;

if (recomputedOccurrenceDigest !== embeddedOccurrenceDigest) {
  fail(
    `accessibility-finding-v2.example.json's a11y/occurrence/v1 fingerprint has drifted from the frozen profile.\n` +
    `  recomputed: ${recomputedOccurrenceDigest}\n` +
    `  embedded:   ${embeddedOccurrenceDigest}`
  );
}

const expectedPatternDisplayId = displayId('A11Y-PAT', recomputedPatternDigest);
const embeddedPatternDisplayId = completeExample.tracking?.display_ids?.['a11y/pattern-display/v1'];
if (expectedPatternDisplayId !== embeddedPatternDisplayId) {
  fail(
    `accessibility-finding-v2.example.json's pattern display ID does not match its fingerprint.\n` +
    `  expected: ${expectedPatternDisplayId}\n` +
    `  embedded: ${embeddedPatternDisplayId}`
  );
}

const expectedOccurrenceDisplayId = displayId('A11Y-OCC', recomputedOccurrenceDigest);
const embeddedOccurrenceDisplayId = completeExample.tracking?.display_ids?.['a11y/occurrence-display/v1'];
if (expectedOccurrenceDisplayId !== embeddedOccurrenceDisplayId) {
  fail(
    `accessibility-finding-v2.example.json's occurrence display ID does not match its fingerprint.\n` +
    `  expected: ${expectedOccurrenceDisplayId}\n` +
    `  embedded: ${embeddedOccurrenceDisplayId}`
  );
}

if (!HEX64.test(embeddedPatternDigest ?? '') || !HEX64.test(embeddedOccurrenceDigest ?? '')) {
  fail('accessibility-finding-v2.example.json embeds a fingerprint that is not 64 lowercase hex characters.');
}

// --- Report ---

if (failures.length > 0) {
  console.error(`FAIL: ${failures.length} check(s) failed:\n`);
  for (const message of failures) {
    console.error(`- ${message}\n`);
  }
  process.exit(1);
}

console.log(
  `OK: schema compiled, ${validExamples.length} valid example(s) passed, ` +
  `${(policyDoc.cases ?? []).length} schema_version 2.1 policy-classification example(s) passed, ` +
  `${sharedFixtureFiles.length} shared cross-repo fixture(s) passed, ` +
  `${(invalidDoc.cases ?? []).length} invalid example(s) failed for their declared reason, ` +
  `and the complete example's fingerprints match Stage 2's frozen profiles.`
);
