---
title: Accessibility Migration Profiles
---

# Accessibility Migration Profiles

This guide names the legacy identifier profiles used by specific accessibility scanning implementations and defines how they map onto the [Stage 2 fingerprint profiles](../fingerprints/README.md) (`a11y/pattern/v1`, `a11y/occurrence/v1`) described in [Accessibility Finding Tracking](../ACCESSIBILITY_FINDING_TRACKING.md).

This is documentation only. It does not change any scanner code, and it does not modify `drupal-core`, `open-scans`, or `accessibility-skills`. It is Stage 4A of a five-stage plan: terminology and tracking model, immutable fingerprint profiles, the machine-readable finding schema, legacy migration and repository adoption (this stage and the repository-specific stages that follow it), and a later comparison-key transition once dual-writing has been proven.

## How the claims in this guide were verified

Every identifier format and code behavior described below was read directly from the named repository's current source on `main`, not inferred or assumed. Where a claim could not be verified this way, it is marked explicitly as unverified rather than presented as fact, per [AGENTS.md](../../AGENTS.md)'s requirement to never invent a source, version, or behavior.

## Legacy profiles

### `drupal-core/pattern/v1`

**Verified from** `core/tests/playwright/scripts/analyze-patterns.js` and `.claude/skills/ai_best_practices/skills/bug-reporting/SKILL.md` in `mgifford/drupal-core` (read 2026-07-26).

```text
pattern_id = "DRU-" + uppercase(first 8 hex characters of SHA-256(selectorKey + "|" + ruleId))
```

- `selectorKey` is a normalized CSS selector (cardinality indexes, UUIDs, and long hex fragments collapsed to placeholders before hashing).
- `screenType`, `theme`, and `colorScheme` are deliberately excluded from the hash; the source comment states the same selector failing the same rule is treated as the same bug across those conditions, and the conditions are tracked separately in the pattern's `conditions` list.
- Digest length: 8 hex characters, uppercase. This is a **truncated** identifier, not a full 64-character SHA-256 digest.

### `drupal-core/occurrence/v1`

**Verified from the same source.**

```text
instance_id = "INS-" + uppercase(first 8 hex characters of SHA-256(pagePath + "|" + selectorKey + "|" + ruleId + "|" + screenType))
```

- `pagePath` is generalized before hashing (for example `/node/123` becomes `/node/[nid]`).
- Unlike the pattern ID, `screenType` **is** included here, so desktop and mobile occurrences of the same pattern get different instance IDs.
- Digest length: 8 hex characters, uppercase.

### `drupal-core/multi-scanner-id` (unverified)

`reports/MULTI-SCANNER-REPORT-*.md` in `drupal-core` displays identifiers in the form `MS-79d3451d` (instance) and `MS-f18f484a` (pattern). A repository-wide source search did not locate the generation code for this specific format as a committed, reusable script; it may be produced by an uncommitted script, an inline report step, or a differently-named module not covered by the search terms used. Do not assume `MS-` uses the same hash inputs as `DRU-`/`INS-` until the generating code is located and confirmed. Treat every published `MS-` value as an opaque legacy identifier to be preserved, not as a value this guide can currently explain the derivation of.

### `open-scans/finding/v1`

**Verified from** `scanner/run-scan.mjs` and `tests/unit/dedup-fingerprint.test.mjs` in `mgifford/open-scans` (read 2026-07-26). This is the occurrence-level identifier; `open-scans`' own `ACCESSIBILITY.md` calls it "Instance ID."

```text
raw_fingerprint = lowercase-hex(SHA-256(finalUrl + "|" + locator + "|" + ruleKey)).slice(0, 12)
display_id       = "A11Y-" + raw_fingerprint.slice(0, 8)
```

- `finalUrl` is the scanned page's resolved URL (not generalized into a route pattern).
- `locator` is a normalized XPath/CSS selector or HTML snippet.
- `ruleKey` is produced by `normalizeRuleKey()`, which is **not** a bare rule ID: it prefers a WCAG success-criterion tag set (`wcag:...`), falls back to an ACT rule ID (`act:...`), then a raw rule ID (`rule:...`), then a truncated message (`msg:...`) — and it appends `|light` or `|dark` for colour scheme in every case.
- The raw fingerprint stored in `fingerprints.json` is 12 hex characters. The display form shown in reports and used in `A11Y_ID_PREFIX` formatting keeps only the first 8 of those 12 characters. Two raw fingerprints that differ only in their last 4 characters would currently display as the same `A11Y-xxxxxxxx` value.

### `open-scans/instance-display/v1`

**Verified from the same source**, specifically `formatA11yId()` and its call sites in `scanner/interactive-report.mjs`.

```text
A11Y-xxxxxxxx  (prefix + first 8 lowercase hex characters of the raw 12-character finding fingerprint)
```

This is a display alias derived from `open-scans/finding/v1`, not an independent profile with its own hash inputs.

### `open-scans/pattern/v1`

**Verified from the same source**, `computePatternId()`.

```text
pattern_id = "A11Y-" + first 8 hex characters of SHA-256(locator + "|" + ruleKey)
```

- Deliberately excludes the page URL, so the same locator+rule combination on any number of pages shares one pattern ID.
- Because `ruleKey` (see above) already has `|light` or `|dark` appended, colour scheme is currently part of pattern identity in `open-scans`, not excluded from it as `a11y/pattern/v1`'s `state_key` guidance recommends.
- **This profile has no target-scope input.** `open-scans` scans arbitrary URLs supplied per GitHub issue; nothing in `locator` or `ruleKey` identifies which site, repository, or product was scanned. Two unrelated sites that happen to share a coincidental selector-and-rule combination would receive the same `open-scans/pattern/v1` value today. This is the concrete gap that motivates giving `a11y/pattern/v1` an explicit, required `target.scope_id` (see [fingerprint profile contract](../fingerprints/README.md#pattern-fingerprint-contract-a11ypatternv1)).

## Corrections to prior assumptions

An earlier draft of this migration plan assumed `open-scans` still needed to move its fingerprint history into an issue-local store. Reading `scanner/run-scan.mjs` directly shows this is already the case: `loadFingerprintStore()` is called with a path of `join(outputDir, "..", "fingerprints.json")`, where `outputDir` is scoped under `reports/issues/issue-<N>/...`, and the surrounding comment states "one file per GitHub issue." Do not treat "move history to an issue-local fingerprint store" as outstanding work for `open-scans` without first confirming whether a different, cross-issue consolidation is actually intended.

Likewise, `open-scans`' `computeChangeTracking()` names its output fields `resolvedCount` / `resolvedIssues` for fingerprints absent from the current scan, with no independent verification step. This is exactly the `resolved`-vs-`not_observed` conflation [Accessibility Finding Tracking](../ACCESSIBILITY_FINDING_TRACKING.md#resolved) warns against, even though the interactive HTML report's own heading already softens this to "Potentially Resolved Issues" with a caveat that they were "not detected in this scan." The underlying field names and API do not yet reflect that caveat.

## Migration relationships

Use the four relationships defined in [Accessibility Finding Tracking](../ACCESSIBILITY_FINDING_TRACKING.md#migration-principles):

- **`equivalent`** — a legacy identifier and a current fingerprint are confirmed, with evidence, to identify the same pattern or occurrence.
- **`split`** — one legacy identifier's underlying findings are now recognized as more than one distinct pattern or occurrence under the current profile (for example, because the current profile's normalization is more precise than the legacy hash inputs).
- **`merged`** — several legacy identifiers are now recognized as the same pattern or occurrence under the current profile (for example, because the legacy hash included a condition, such as colour scheme, that the current profile excludes).
- **`unresolved`** — no mapping has been established yet. This is the correct default; do not compute a mapping speculatively.

None of the profiles above have been mapped to `a11y/pattern/v1` or `a11y/occurrence/v1` values by this change. Every legacy identifier's migration status starts at `unresolved` until a specific dual-write implementation (Stage 4B for `drupal-core`, Stage 4C for `open-scans`) actually computes and records a mapping.

## Requirements for any implementation stage

1. **Preserve every historical identifier exactly as published.** Do not reformat, re-case, or truncate a `DRU-`, `INS-`, `MS-`, or `A11Y-` value when recording it as a `legacy_identifier` (see the schema's [`legacyIdentifier` definition](../schemas/accessibility-finding-v2.schema.json)).
2. **Dual-write, do not replace.** A repository adopting `a11y/pattern/v1`/`a11y/occurrence/v1` must continue emitting its existing legacy identifiers for at least one full overlapping cycle before any comparison logic switches to the new fingerprints.
3. **Record migration evidence, not assumption.** A `migration_status` of `equivalent`, `split`, or `merged` must be backed by an explainable reason (matching hash inputs once normalized, confirmed human review, or similar) — never assigned merely because two values happen to have been seen at the same time.
4. **Do not retroactively assign a target scope that wasn't recorded.** `open-scans`' historical `A11Y-` pattern IDs have no target-scope input to recover; a migration cannot invent one after the fact. New pattern fingerprints must specify a real target scope going forward, but legacy `open-scans/pattern/v1` values should be presented for what they are: same-format identifiers that are not directly comparable to a scoped `a11y/pattern/v1` value without additional evidence about which site produced them.
5. **Convert absence into `not_observed`, not `resolved`, at the tracking-model level**, independent of what any single repository's current internal field names say.

## Not part of this stage

The following are explicitly out of scope for Stage 4A and belong to later, repository-specific stages:

- Any code change to `drupal-core`, `open-scans`, or `accessibility-skills`.
- Locating or documenting the actual `MS-` generation logic (needs repository access this guide's author did not have beyond read-only source review).
- Computing any real `equivalent`/`split`/`merged` mapping between a legacy identifier and a Stage 2 fingerprint.
- Defining the `drupal-core` tracker map connecting patterns to Drupal.org issues.
- Defining `open-scans`' target-scope values for its scanned sites.

## Related Guides

- [Accessibility Finding Tracking](../ACCESSIBILITY_FINDING_TRACKING.md)
- [Fingerprint Profiles](../fingerprints/README.md)
- [Accessibility Finding Schema](../schemas/README.md)
