// Stable, documented interface for computing a11y/pattern/v1 and
// a11y/occurrence/v1 fingerprints and their display IDs.
//
// This module is the single implementation of the Stage 2 normative
// computation (examples/fingerprints/README.md, "Normative computation").
// check-fingerprint-vectors.mjs and examples/schemas/validate-accessibility-findings.mjs
// both import it so that fingerprint generation is defined exactly once.
//
// Extracted from check-fingerprint-vectors.mjs without changing any
// computed output; all 26 golden vectors were re-verified unchanged after
// this extraction.

import { createHash } from 'node:crypto';
import canonicalize from 'canonicalize';

export const HEX64 = /^[0-9a-f]{64}$/;

export function sha256Hex(utf8String) {
  return createHash('sha256').update(utf8String, 'utf8').digest('hex');
}

export function computeDigest(profileName, input) {
  const withProfile = { ...input, profile: profileName };
  const canonical = canonicalize(withProfile);
  return sha256Hex(canonical);
}

export function displayId(prefix, fullDigestHex) {
  return `${prefix}-${fullDigestHex.slice(0, 12).toUpperCase()}`;
}
