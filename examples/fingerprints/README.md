---
title: Accessibility Fingerprint Profiles
---

# Accessibility Fingerprint Profiles

This directory defines the first stable, interoperable accessibility fingerprint profiles and the machinery that keeps them stable. It is the normative implementation of the fingerprint concepts introduced conceptually in [Accessibility Finding Tracking](../ACCESSIBILITY_FINDING_TRACKING.md). Read that guide first for the terminology (finding, occurrence, pattern, tracker ID, display ID, and so on). This document defines the exact bytes that go into a fingerprint.

> A published fingerprint profile is immutable. Any change that can alter its output requires a new profile version.

This directory does not define a complete machine-readable accessibility-finding schema. That is a separate, later change.

## Files

| File | Purpose |
| --- | --- |
| `a11y-pattern-v1.json` | Normative, machine-readable definition of the `a11y/pattern/v1` profile. |
| `a11y-occurrence-v1.json` | Normative, machine-readable definition of the `a11y/occurrence/v1` profile, which depends on `a11y/pattern/v1`. |
| `test-vectors.json` | Golden test vectors. Every `expected_fingerprint` was computed by this profile's own reference implementation and independently cross-checked with a second SHA-256 implementation, not hand-typed. |
| `check-fingerprint-vectors.mjs` | Executable checker. Recomputes every vector and fails if any computed value disagrees with the recorded expectation. |
| `package.json` / `package-lock.json` | Pins the `canonicalize` dependency used for RFC 8785 canonicalization. |

Run the checker with:

```bash
cd examples/fingerprints
npm ci
npm run check
```

## Normative computation

The authoritative fingerprint for both profiles is:

```text
lowercase-hex(
  SHA-256(
    UTF-8(
      JCS-canonicalize(fingerprint-input)
    )
  )
)
```

- **Hash algorithm:** SHA-256, as defined in [FIPS 180-4](https://csrc.nist.gov/pubs/fips/180-4/upd1/final).
- **Encoding:** UTF-8.
- **Canonicalization:** [RFC 8785, the JSON Canonicalization Scheme (JCS)](https://www.rfc-editor.org/rfc/rfc8785).
- **Digest format:** all 64 lowercase hexadecimal characters. This full value is authoritative.

The `profile` field (the exact string `a11y/pattern/v1` or `a11y/occurrence/v1`) is part of the canonicalized input, not a label applied afterward. This is what keeps a pattern fingerprint and an occurrence fingerprint from ever colliding even if the rest of their JSON happened to match.

Do not:

- use a delimiter-joined string (such as `namespace|rule|locator`) as the normative representation — see requirement 16's pipe-collision test vectors for why;
- use ordinary `JSON.stringify()` in place of RFC 8785 canonicalization (it does not sort object keys or fix number formatting);
- implement a partial canonicalizer and describe it as RFC 8785 compliant;
- hand-type an expected digest value.

This repository uses the maintained [`canonicalize`](https://www.npmjs.com/package/canonicalize) npm package (pinned to `3.0.0` in `package.json`/`package-lock.json`) as its RFC 8785 implementation. A shortened value, such as a display ID, is a display alias only and is never authoritative.

## Pattern fingerprint contract: `a11y/pattern/v1`

Canonical input shape (see `a11y-pattern-v1.json` for the full, normative field-by-field contract):

```json
{
  "profile": "a11y/pattern/v1",
  "target": {
    "scope_type": "repository",
    "scope_id": "https://github.com/example/product"
  },
  "rule": {
    "namespace": "axe-core",
    "id": "color-contrast"
  },
  "locator": {
    "type": "css",
    "normalization_profile": "a11y/css-locator/v1",
    "value": "#edit-submit"
  },
  "state_key": null
}
```

Field notes:

- **`target.scope_type`** identifies the kind of product boundary. `a11y/pattern/v1` supports `repository`, `product`, `site-origin`, `package`, `component-library`, and `project-namespace`.
- **`target.scope_id`** is a stable, normalized identifier for that scope, such as a repository URL or a [package URL (purl)](https://github.com/package-url/purl-spec). Do not put an individual page URL here unless that URL is the entire target scope.
- **`rule.namespace`** is the rule system or producer, e.g. `axe-core`, `htmlcs`, `qualweb`, `act`, `manual`, `project`. It must be supplied explicitly, not inferred from `rule.id`.
- **`rule.id`** is the stable rule identifier within that namespace. It must not be a WCAG success criterion; WCAG and ACT mappings are recorded separately unless a profile explicitly uses an ACT rule as its rule identity.
- **`locator.type`** documents the kind of locator: `css`, `xpath`, `test-id`, `accessibility-tree`, `component`, `html-fragment`, `human-description`, or `unknown`.
- **`locator.normalization_profile`** names the exact normalization contract applied to `locator.value`. One normalization process is not assumed to work for every locator type.
- **`locator.value`** is the locator after that normalization has already been applied. Do not lowercase it unless the named normalization profile explicitly allows that.
- **`state_key`** is an optional, stable, product-intrinsic state (for example `"expanded"` on a disclosure widget). Use JSON `null`, not an omitted field, when no state applies. It must never carry scan date, severity, priority, theme, colour scheme, viewport, browser, orientation, direction, build, or tracker status.

All five fields are required. An omitted `state_key` is a validation error, not an implicit `null` — see test vector `PV-12-missing-required-field`.

## Occurrence fingerprint contract: `a11y/occurrence/v1`

Canonical input shape (see `a11y-occurrence-v1.json` for the full contract):

```json
{
  "profile": "a11y/occurrence/v1",
  "pattern_fingerprint": {
    "profile": "a11y/pattern/v1",
    "algorithm": "sha-256",
    "value": "<64-lowercase-hexadecimal-characters>"
  },
  "location": {
    "scope": "route-pattern",
    "normalization_profile": "a11y/route/v1",
    "key": "/node/[nid]"
  },
  "test_profile": null
}
```

Field notes:

- **`pattern_fingerprint`** must contain the complete authoritative `a11y/pattern/v1` fingerprint. Never embed a display ID here — test vector `OV-10-rejects-display-id-as-pattern-fingerprint` documents this, and the checker rejects it explicitly.
- **`location.scope`** is `exact-resource`, `route-pattern`, `component-state`, or `unknown`.
- **`location.normalization_profile`** names the immutable normalization contract applied to `location.key`.
- **`location.key`** is the normalized resource, route pattern, or component-state key. A route such as `/node/[nid]` can represent many concrete resources.
- **`test_profile`** is `null` by default. A project may define a named test profile when it intentionally treats specific test configurations as distinct occurrences, but that profile must come from explicit configuration. It must never be inferred from viewport width or described as a physical device without evidence.

All three fields are required, including an explicit `test_profile: null` — see test vector `OV-09-missing-required-field`.

## Fields excluded from fingerprint identity

Neither contract has a field for the following. They are evidence, conditions, mappings, provenance, or lifecycle metadata, and excluding them from identity does not make them unimportant:

- scan date, first-seen date, last-seen date
- build number, commit hash, scanner version
- browser version, operating-system version
- viewport dimensions, inferred device type
- colour scheme, theme, text direction, orientation
- severity, priority, review status, resolution status
- tracker ID
- WCAG mappings, ACT mappings
- evidence URLs
- concrete locations represented by a route pattern

## Locator and location normalization profiles

Both contracts depend on named, versioned normalization profiles. This stage defines only the minimal set needed by the published test vectors:

- `a11y/css-locator/v1`
- `a11y/exact-resource/v1`
- `a11y/route/v1`
- `a11y/component-state/v1`

Each normalization profile must eventually state its supported input type, Unicode handling, whitespace handling, case handling, URL handling, query and fragment handling, generated-value handling, error handling, whether raw input must be retained separately, examples, and limitations.

For version 1, where a normalization behaviour is not yet sufficiently understood, the conservative choice is an identity transformation (pass the value through unchanged) with its limitations documented, rather than an aggressive transformation that might merge unrelated findings. It is safer for a conservative profile to under-merge than for an aggressive one to over-merge: a separate fingerprint can still be reviewed and correlated by a human; a merged one has already discarded the distinction.

A full specification for each normalization profile, with its own test vectors, is follow-up work and is not completed in this change.

## Display IDs

```text
A11Y-PAT- + uppercase(first 12 hexadecimal characters of the full pattern fingerprint)
A11Y-OCC- + uppercase(first 12 hexadecimal characters of the full occurrence fingerprint)
```

Worked example, taken directly from `test-vectors.json` (`PV-01-baseline` / `OV-01-baseline`):

```text
A11Y-PAT-E7C842E0E569
A11Y-OCC-BB20023FD962
```

These display IDs are produced by the `a11y/pattern-display/v1` and `a11y/occurrence-display/v1` profiles referenced from `display_profile` in each profile JSON file.

Rules:

- Display IDs are not authoritative. A lookup must confirm the full digest before treating two display IDs as the same fingerprint.
- Display IDs may collide; 12 hex characters is 48 bits, not the full 256-bit space.
- Pattern and occurrence aliases use distinct prefixes (`A11Y-PAT-` vs `A11Y-OCC-`) so the two never look alike even if their first 12 hex characters matched.
- Changing the alias length or derivation requires a new display-ID profile version.
- Legacy short IDs (see [Accessibility Finding Tracking](../ACCESSIBILITY_FINDING_TRACKING.md#legacy-identifier)) retain their original formatting. They are not recomputed under `a11y/pattern-display/v1` or `a11y/occurrence-display/v1`.

## Stability requirements

1. Published profile versions are immutable.
2. Existing profile inputs must not be added, removed, reordered, renamed, reinterpreted, or normalized differently after publication.
3. A new profile version is required for any change to: canonical serialization; character encoding; hash algorithm; field names; field types; required fields; input ordering where relevant; default values; null handling; omitted-value handling; target scoping; rule identity; locator normalization; route normalization; component-state normalization; case handling; whitespace handling; Unicode handling; display-ID derivation; condition or test-profile inclusion; or interpretation of an existing value.
4. Fixing a mistake in an algorithm still requires a new profile version if the correction can change an existing fingerprint.
5. Editorial corrections that cannot affect computation (typo fixes in descriptions, added examples) may be made without a new profile version.
6. Dependency upgrades (including the pinned `canonicalize` version) must not silently alter output. Re-run the checker before and after any upgrade.
7. Implementations must use the published test vectors in `test-vectors.json` to verify compatibility.
8. Existing test-vector outputs must never be updated merely to make a failing implementation pass.
9. A legitimate output change requires retaining the old profile, creating a new profile version, adding new test vectors, documenting the reason and affected fields, describing the expected migration relationship, dual-writing old and new fingerprints during migration, and retaining old fingerprints for historical lookup.
10. A profile must not be called `"status": "stable"` until its normative profile definition and test vectors are committed together.

## Changing a fingerprint profile

Do not edit a stable profile file or its published vectors in place. Instead, open a proposal with the following fields:

```text
Current profile:
Proposed profile:
Reason for change:
Fields affected:
Normalization affected:
Existing IDs affected:
Expected migration relationship:
Legacy retention plan:
Dual-write period:
Comparison-key transition:
New test vectors:
Implementation repositories affected:
```

A new version is required whenever output may change, for example:

```text
a11y/pattern/v1 -> a11y/pattern/v2
```

The procedure:

1. Leave `v1` intact.
2. Create `v2` alongside it (a new pair of profile/vector files, e.g. `a11y-pattern-v2.json`).
3. Publish separate `v2` test vectors.
4. Document whether `v1` -> `v2` mappings are `equivalent`, `split`, `merged`, or `unresolved`, using the vocabulary in [Accessibility Finding Tracking](../ACCESSIBILITY_FINDING_TRACKING.md#migration-principles).
5. Require implementations to emit both versions during the transition.
6. Require consumers to compare using the newest profile version they mutually support.
7. Do not delete older fingerprints while historical consumers may still depend on them.
8. Record affected repositories and migration status.

## How stable-profile modification is detected

`check-fingerprint-vectors.mjs` recomputes every vector on every run; it cannot pass if `a11y-pattern-v1.json`, `a11y-occurrence-v1.json`, or `test-vectors.json` have drifted from what the pinned canonicalization and hashing steps actually produce.

That alone does not stop someone from editing a stable profile file and also updating its expected outputs to match, which would silently launder a breaking change through as if it were still v1. `.github/workflows/fingerprint-contract.yml` adds a second, independent check for that: it diffs the current `status: "stable"` profile files and their vectors against the pull request's base revision and fails if their content differs at all. Adding new vectors, or adding an entirely new `v2` profile pair, does not trip this check. Editing byte content of an existing stable profile or vector file does.

If your CI environment cannot resolve a reliable base revision (for example, a shallow clone or a non-PR trigger), run the same comparison locally before merging:

```bash
cd examples/fingerprints
node ../../.github/scripts/check-stable-fingerprint-profiles.mjs --base <base-revision>
```

## References

- [RFC 8785, JSON Canonicalization Scheme](https://www.rfc-editor.org/rfc/rfc8785)
- [NIST FIPS 180-4, Secure Hash Standard](https://csrc.nist.gov/pubs/fips/180-4/upd1/final)
- [SARIF 2.1.0](https://docs.oasis-open.org/sarif/sarif/v2.1.0/sarif-v2.1.0.html) — cited only as an informative migration precedent for how another ecosystem versions and identifies findings. This profile is not SARIF and is not required by SARIF.
- [GitHub: SARIF support for code scanning](https://docs.github.com/en/code-security/code-scanning/integrating-with-code-scanning/sarif-support-for-code-scanning)
- [Accessibility Finding Tracking](../ACCESSIBILITY_FINDING_TRACKING.md)

## Limitations

- This stage defines `a11y/pattern/v1` and `a11y/occurrence/v1` only. It does not define a complete accessibility-finding JSON Schema; that is separate follow-up work.
- The four normalization profiles named above are placeholders with conservative, identity-transformation behaviour. They are not yet fully specified with their own test vectors.
- No historical `drupal-core` or `open-scans` data is migrated by this change. See [Accessibility Finding Tracking](../ACCESSIBILITY_FINDING_TRACKING.md#repository-specific-examples) for the migration scenarios those projects would need to work through, none of which have been implemented yet.
- This directory does not establish accessibility conformance. It establishes a way to tell whether two findings are computed as the same correlation candidate.
