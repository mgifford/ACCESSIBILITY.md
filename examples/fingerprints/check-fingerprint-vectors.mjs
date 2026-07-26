// Verifies that examples/fingerprints/test-vectors.json matches what the
// a11y/pattern/v1 and a11y/occurrence/v1 profiles actually compute.
//
// Usage:
//   node check-fingerprint-vectors.mjs
//
// Exits non-zero if any vector's expected digest or display ID does not
// match a fresh computation, or if a vector's shape violates a documented
// profile rule (e.g. an occurrence vector embedding a display ID instead of
// a full pattern fingerprint).

import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import canonicalize from 'canonicalize';

const HERE = path.dirname(fileURLToPath(import.meta.url));

function loadJSON(relPath) {
  const fullPath = path.join(HERE, relPath);
  return JSON.parse(readFileSync(fullPath, 'utf8'));
}

function sha256Hex(utf8String) {
  return createHash('sha256').update(utf8String, 'utf8').digest('hex');
}

function computeDigest(profileName, input) {
  const withProfile = { ...input, profile: profileName };
  const canonical = canonicalize(withProfile);
  return sha256Hex(canonical);
}

function displayId(prefix, fullDigestHex) {
  return `${prefix}-${fullDigestHex.slice(0, 12).toUpperCase()}`;
}

const HEX64 = /^[0-9a-f]{64}$/;

function fail(message) {
  failures.push(message);
}

const failures = [];

// a11y/pattern/v1 requires all five top-level fields, including an explicit
// `state_key` (use JSON null, not an omitted key, when no state applies).
const PATTERN_REQUIRED_KEYS = ['target', 'rule', 'locator', 'state_key'];
// a11y/occurrence/v1 requires all three top-level fields, including an
// explicit `test_profile` (use JSON null when no test profile applies).
const OCCURRENCE_REQUIRED_KEYS = ['pattern_fingerprint', 'location', 'test_profile'];

function missingRequiredKeys(input, requiredKeys) {
  return requiredKeys.filter((key) => !(key in (input ?? {})));
}

const patternProfile = loadJSON('a11y-pattern-v1.json');
const occurrenceProfile = loadJSON('a11y-occurrence-v1.json');
const vectors = loadJSON('test-vectors.json');

for (const requiredField of ['profile', 'status', 'algorithm', 'canonicalization', 'digest_format', 'display_profile']) {
  if (!(requiredField in patternProfile)) {
    fail(`a11y-pattern-v1.json is missing required field "${requiredField}"`);
  }
  if (!(requiredField in occurrenceProfile)) {
    fail(`a11y-occurrence-v1.json is missing required field "${requiredField}"`);
  }
}

if (patternProfile.profile !== 'a11y/pattern/v1') {
  fail(`a11y-pattern-v1.json "profile" must equal "a11y/pattern/v1", got "${patternProfile.profile}"`);
}
if (occurrenceProfile.profile !== 'a11y/occurrence/v1') {
  fail(`a11y-occurrence-v1.json "profile" must equal "a11y/occurrence/v1", got "${occurrenceProfile.profile}"`);
}

for (const vector of vectors.pattern_vectors ?? []) {
  const missing = missingRequiredKeys(vector.input, PATTERN_REQUIRED_KEYS);

  if (vector.expect_error === 'missing_required_field') {
    if (missing.length === 0) {
      fail(`[${vector.id}] expected a missing required field, but input has all of: ${PATTERN_REQUIRED_KEYS.join(', ')}`);
    }
    continue;
  }

  if (missing.length > 0) {
    fail(`[${vector.id}] pattern input is missing required field(s): ${missing.join(', ')}`);
    continue;
  }

  const digest = computeDigest('a11y/pattern/v1', vector.input);

  if (vector.expect_error) {
    // Other documented error vectors (e.g. type violations) do not produce
    // a comparable digest; skip digest comparison for them.
    continue;
  }

  if (!HEX64.test(vector.expected_fingerprint)) {
    fail(`[${vector.id}] expected_fingerprint is not 64 lowercase hex characters: "${vector.expected_fingerprint}"`);
  }

  if (digest !== vector.expected_fingerprint) {
    fail(`[${vector.id}] pattern digest mismatch: computed ${digest}, expected ${vector.expected_fingerprint}`);
  }

  if (vector.expected_display_id) {
    const computedDisplay = displayId('A11Y-PAT', digest);
    if (computedDisplay !== vector.expected_display_id) {
      fail(`[${vector.id}] pattern display ID mismatch: computed ${computedDisplay}, expected ${vector.expected_display_id}`);
    }
  }
}

for (const vector of vectors.occurrence_vectors ?? []) {
  const missing = missingRequiredKeys(vector.input, OCCURRENCE_REQUIRED_KEYS);

  if (vector.expect_error === 'missing_required_field') {
    if (missing.length === 0) {
      fail(`[${vector.id}] expected a missing required field, but input has all of: ${OCCURRENCE_REQUIRED_KEYS.join(', ')}`);
    }
    continue;
  }

  if (missing.length > 0) {
    fail(`[${vector.id}] occurrence input is missing required field(s): ${missing.join(', ')}`);
    continue;
  }

  const patternFp = vector.input?.pattern_fingerprint;
  const embedsNonFullPatternFingerprint = Boolean(patternFp && patternFp.value && !HEX64.test(patternFp.value));

  if (vector.expect_error === 'display_id_used_as_pattern_fingerprint') {
    if (!embedsNonFullPatternFingerprint) {
      fail(`[${vector.id}] expected this vector to embed a non-full pattern fingerprint (display ID), but pattern_fingerprint.value is a full 64-character digest`);
    }
    continue;
  }

  if (embedsNonFullPatternFingerprint) {
    fail(`[${vector.id}] occurrence vector embeds a non-full pattern fingerprint (must be 64 lowercase hex characters, not a display ID): "${patternFp.value}"`);
    continue;
  }

  const digest = computeDigest('a11y/occurrence/v1', vector.input);

  if (vector.expect_error) {
    continue;
  }

  if (!HEX64.test(vector.expected_fingerprint)) {
    fail(`[${vector.id}] expected_fingerprint is not 64 lowercase hex characters: "${vector.expected_fingerprint}"`);
  }

  if (digest !== vector.expected_fingerprint) {
    fail(`[${vector.id}] occurrence digest mismatch: computed ${digest}, expected ${vector.expected_fingerprint}`);
  }

  if (vector.expected_display_id) {
    const computedDisplay = displayId('A11Y-OCC', digest);
    if (computedDisplay !== vector.expected_display_id) {
      fail(`[${vector.id}] occurrence display ID mismatch: computed ${computedDisplay}, expected ${vector.expected_display_id}`);
    }
  }
}

// Cross-checks that do not depend on a single vector's input/output pair.
for (const check of vectors.relationship_checks ?? []) {
  const a = computeDigest(check.profile, check.input_a);
  const b = computeDigest(check.profile, check.input_b);

  if (check.expect === 'different' && a === b) {
    fail(`[${check.id}] expected different fingerprints for input_a and input_b, but both produced ${a}`);
  }
  if (check.expect === 'same' && a !== b) {
    fail(`[${check.id}] expected the same fingerprint for input_a and input_b, but got ${a} and ${b}`);
  }
}

if (failures.length > 0) {
  console.error(`FAIL: ${failures.length} fingerprint vector check(s) failed:\n`);
  for (const message of failures) {
    console.error(`  - ${message}`);
  }
  console.error('\nIf this failure is expected because you are introducing a new');
  console.error('profile version, confirm you have NOT modified an existing stable');
  console.error('profile or its published vectors. See examples/fingerprints/README.md,');
  console.error('"Changing a fingerprint profile".');
  process.exit(1);
}

const totalVectors =
  (vectors.pattern_vectors?.length ?? 0) +
  (vectors.occurrence_vectors?.length ?? 0) +
  (vectors.relationship_checks?.length ?? 0);

console.log(`OK: ${totalVectors} fingerprint vector check(s) passed.`);
