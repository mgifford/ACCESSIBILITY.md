---
title: Accessibility Finding Schema
---

# Accessibility Finding Schema

This directory defines the versioned, machine-readable record format for accessibility findings: `schema_version: "2.0"`. It builds directly on [Accessibility Finding Tracking](../ACCESSIBILITY_FINDING_TRACKING.md) for terminology and on the frozen [fingerprint profiles](../fingerprints/README.md) for correlation identifiers. This schema defines how a finding and its surrounding evidence, tracking relationships, and lifecycle are represented for interchange. It does not define, redefine, or recompute how a fingerprint is generated.

## Files

| File | Purpose |
| --- | --- |
| `accessibility-finding-v2.schema.json` | The normative JSON Schema (Draft 2020-12). |
| `accessibility-finding-v2.example.json` | A complete, valid example with mixed manual and automated evidence, verified Stage 2 fingerprints, and every optional section populated. |
| `accessibility-finding-v2-minimal.example.json` | The smallest valid finding: no fingerprints, no tracker IDs, no WCAG mapping, no automated tooling, no technical locator. |
| `accessibility-finding-v2-manual.example.json` | A valid user-reported finding with no fabricated diagnosis, testing, assistive technology, WCAG failure, automated output, or root cause. |
| `accessibility-finding-v2-invalid-examples.json` | Ten documented negative cases and the exact validation failure each one must produce. |
| `validate-accessibility-findings.mjs` | Executable validator: compiles the schema, checks every valid and invalid example, and checks embedded fingerprints against Stage 2's frozen profiles. |
| `package.json` / `package-lock.json` | Pins `ajv`, `ajv-formats`, and `canonicalize`. |

Run the full check with:

```bash
cd examples/schemas
npm ci
npm run validate
```

## Schema version vs. fingerprint profile version

`schema_version` governs the shape of the whole finding record: what fields exist, which are required, and how tracking, evidence, and lifecycle are represented. It is a completely separate axis of versioning from:

- fingerprint profile versions (`a11y/pattern/v1`, `a11y/occurrence/v1`, and any future `v2`);
- normalization profile versions (`a11y/css-locator/v1`, `a11y/route/v1`, and so on);
- display-ID profile versions (`a11y/pattern-display/v1`, `a11y/occurrence-display/v1`);
- scanner versions, rule versions, or report versions.

Publishing `schema_version: "3.0"` in the future does not require a new fingerprint profile, and publishing `a11y/pattern/v2` does not require a new `schema_version`. A finding record from schema `2.0` can carry fingerprints computed under `a11y/pattern/v1` today and `a11y/pattern/v2` after that profile exists, without changing `schema_version` at all — see `$defs.fingerprints` in the schema, which is deliberately open to unknown future profile names.

This filename and the `schema_version: "2.0"` constant are chosen specifically to be unambiguous next to the illustrative `schema_version: "1.1"` example that previously lived in [Accessibility Bug Reporting Best Practices](../ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES.md) section 18 — `2.0` is not a patch of `1.1`, it is the first version of a deliberately different, versioned, schema-validated format.

## Design principles

A finding must remain valid when it has no fingerprint, no tracker ID, no WCAG mapping, no automated rule, no technical locator, no disability diagnosis, and no assistive technology information. The schema supports findings from disabled people, testing with disabled people, manual evaluation, automated testing, semi-automated testing, code review, support, and reasoned inference — see `source.method`. Automation-specific fields are never mandatory; the `accessibility-finding-v2-minimal.example.json` and `accessibility-finding-v2-manual.example.json` examples exist specifically to prove this.

## Top-level structure

| Field | Required | Purpose |
| --- | --- | --- |
| `schema_version` | Yes | Must equal `"2.0"`. |
| `finding_id` | No | An optional record identifier assigned by whatever system stores the record. Not the tracker ID, not a fingerprint, not a scan request/run ID. `null` or omitted when no system has assigned one. |
| `title` | Yes | Short, specific title. |
| `reported_at` | Yes | RFC 3339 date-time. |
| `source` | Yes (object; only `method` inside it is required) | How the finding was produced, and optional scan/tool provenance. |
| `tracking` | No | Tracker relationships, fingerprints, display IDs, legacy identifiers, clusters, root causes, lifecycle. |
| `location` | No | Where the finding was observed. |
| `state` | No | Relevant product state (build, account role, UI state). |
| `description` | Yes (object; only `summary` inside it is required) | Human-readable barrier description. |
| `affected_people` | Yes (array; may be empty pre-triage) | Who is confirmed or likely affected. |
| `impact` | No | Task effect, workaround, severity. |
| `environment` | No | Browser, OS, assistive technology, and other observation metadata. |
| `standards` | No | Zero or more WCAG/other standards mappings. |
| `test_results` | No | Zero or more test results from any method. |
| `evidence` | No | References, attachments, redaction, and privacy notes. |
| `scope` | No | Coverage information supporting lifecycle comparison. |
| `verification` | No | Automated, manual, and testing-with-disabled-people status. |
| `acceptance_criteria` | No | User-facing statements of resolution. |
| `extensions` | No | Namespaced, project-owned extension data. |

Every top-level field's purpose, null handling, and relationship to other fields is documented inline in the schema's `description` keywords — this README summarizes rather than duplicates that.

## Null vs. omitted

- **Omit** a field when the producer simply does not have it, it is irrelevant to this finding, or forward-compatible absence is fine (e.g. `tracking.tracker_ids: []` or omitted both mean "no tracker relationship currently recorded").
- **Use explicit `null`** when the field is known to have no current value and recording that explicitly is useful (e.g. `source.scan_request_id: null` means "this record explicitly has no known scan request," which is a stronger and more useful statement than silently leaving the key out).

Do not add `null` placeholders throughout a record merely for structural symmetry; only use `null` where its presence carries information omission would lose.

## `additionalProperties` policy

This schema does not set `additionalProperties: false` mechanically everywhere. The policy differs by section, and is chosen deliberately per field group:

- **Core, well-understood objects** (`source`, `description`, `location`, `tracking`, `lifecycle`, `impact`, `standardMapping`, `testResult`, `evidence`, `verificationMethod`, and so on) use `additionalProperties: false`. These are the sections most valuable for typo detection and interoperability: if a producer misspells `evidence_basis` as `evidenceBasis`, or nests a field one level too deep, the schema should say so rather than silently accepting and ignoring it.
- **`tracking.fingerprints`** uses `additionalProperties` pointing at the shared `fingerprintEntry` definition, with a `propertyNames` pattern constraining keys to the `a11y/(pattern|occurrence)/vN` shape. This is deliberate forward compatibility: a future `a11y/pattern/v2` fingerprint can be recorded by a schema-2.0 producer without any schema change, while a key that isn't a recognized profile name shape is still rejected.
- **`state` and `environment`** use `additionalProperties: true`. These sections exist specifically to carry project- or context-specific evidence that cannot be fully enumerated up front (arbitrary build metadata, an unusual environment attribute). Locking these down would force every producer into an extension namespace for ordinary evidence fields, working against the goal of first-class support for varied evidence sources.
- **`extensions`** uses `additionalProperties: true` but constrains `propertyNames` to look like an absolute HTTP(S) URI, so that two independent projects' extension keys cannot collide by accident. Each extension's own internal shape is that project's responsibility to validate; this schema only validates the outer namespacing convention.

If you are adding a new top-level or deeply-nested field to a future schema version, follow the same reasoning: default to `false` for anything you can fully enumerate today, and only use `true` (or a `propertyNames` pattern) where the whole point of the field is to carry content this schema cannot anticipate.

## Reusing Stage 2 fingerprint logic

`validate-accessibility-findings.mjs` imports `computeDigest`, `displayId`, and `HEX64` from [`../fingerprints/fingerprint-core.mjs`](../fingerprints/fingerprint-core.mjs) — the same module `examples/fingerprints/check-fingerprint-vectors.mjs` uses. `fingerprint-core.mjs` was extracted from that checker without changing any computed output (all 26 Stage 2 golden vectors were re-verified unchanged before and after the extraction). Stage 3 does not duplicate, reimplement, or reinterpret fingerprint generation anywhere.

## What this schema does not do

Schema validation of a finding record does not establish:

- accessibility conformance;
- that the record is true, accurate, or complete;
- actual user impact;
- that referenced evidence is safe, accurate, or accessible;
- a shared root cause between findings with matching fingerprints;
- that a finding is actually resolved.

## References

- [JSON Schema Draft 2020-12](https://json-schema.org/draft/2020-12)
- [JSON Schema Validation specification](https://json-schema.org/draft/2020-12/json-schema-validation)
- [RFC 3986, URI syntax](https://www.rfc-editor.org/rfc/rfc3986)
- [RFC 3339, date and time](https://www.rfc-editor.org/rfc/rfc3339)
- [ACT Rules Format 1.1](https://www.w3.org/TR/act-rules-format/) — cited only where relevant to result interchange (`test_results[].act_outcome`); never required for an ordinary finding record.
- [EARL 1.0 Schema](https://www.w3.org/TR/EARL10-Schema/) — likewise informative, not required.
- [Accessibility Finding Tracking](../ACCESSIBILITY_FINDING_TRACKING.md)
- [Fingerprint Profiles](../fingerprints/README.md)
