---
title: Accessibility Finding Tracking
---

# Accessibility Finding Tracking

This guide explains how to track accessibility findings over time without confusing durable tracked work with the computed identifiers used to correlate results. It is the canonical reference for tracking identifiers and finding correlation in this repository. Other guides should summarize the relevant concepts and link here rather than repeating the model.

This is a conceptual and terminology guide. It does not define a hashing algorithm, a JSON Schema, or test vectors. Those will be specified in a separate, dedicated change once this terminology is stable.

## Why This Guide Exists

Teams that track accessibility findings across repeated scans, reports, and manual evaluations run into the same problem: several different kinds of identifier get used interchangeably, and that makes results hard to compare over time. A scan request number gets treated as a bug ID. A tool's short hash gets treated as a permanent identifier. An absence from a later scan gets treated as proof that a barrier was fixed.

This guide names the distinct concepts involved and describes how they relate, so that projects, scanners, and tracking systems can describe findings consistently.

## Core Principles

1. A tracker ID is the durable identity of tracked work.
2. A fingerprint is a correlation mechanism, not a permanent bug ID.
3. A short display ID is not the authoritative fingerprint.
4. A valid finding does not require any computed identifier.
5. Fingerprint algorithms and normalization rules must be versioned.
6. Matching fingerprints support grouping but do not prove a common root cause.
7. A scan request is not automatically a defect tracker.
8. Test conditions such as theme, colour scheme, viewport, direction, browser, and orientation are normally evidence or observation metadata rather than pattern identity.
9. A project may define an explicit test profile as part of occurrence identity, but it must not infer a physical device from viewport width.
10. WCAG criteria are mappings, not sufficiently specific rule identifiers.
11. Heuristic clusters must be kept separate from deterministic fingerprints.
12. Legacy identifiers must be retained during migrations.
13. Historical reports should not be rewritten merely to replace their identifiers.
14. Correcting a fingerprint contract may create one-to-one, split, merged, or unresolved migrations.
15. Absence from a later scan does not by itself prove resolution.

## Terminology

### Finding

An observed or suspected accessibility barrier or test result. A finding can come from:

- a disabled person's report;
- testing with disabled people;
- manual evaluation;
- automated testing;
- code review;
- support; or
- another evidence source.

A finding remains valid without a computed fingerprint or tracker ID. Do not require a technical identifier before accepting a report.

### Occurrence

One observed manifestation of a finding at a resource, route pattern, component state, or other defined location. An occurrence does not necessarily mean one literal URL. A generalized route such as `/node/[nid]` may represent several observed resources.

### Pattern

A deterministic correlation candidate based on normalized technical characteristics. Matching patterns can support deduplication and investigation. They do not prove that findings have the same root cause or remediation.

### Root cause

A confirmed source that produces one or more occurrences, such as a shared component, template, content model, design token, dependency, or organizational process. Root cause must be established through investigation. It must not be assigned solely because fingerprints match.

### Scan request ID

The identifier for the request or work item that caused a scan to run. For example, a GitHub issue requesting an `open-scans` scan is normally a scan request. It is not automatically the tracker ID for every accessibility finding produced by that scan.

### Scan run ID

The identifier for one execution and its evidence, such as a report, workflow run, or scan artifact. Several runs may belong to one scan request.

### Tracker ID

The durable identifier for tracked remediation work after triage. A tracker ID:

- is assigned by a work-tracking system rather than computed from finding content;
- should use a globally scoped URI where practical;
- may be absent before a finding is filed;
- may cover several occurrences or patterns;
- must remain stable when fingerprint algorithms change; and
- must not be confused with a scan request ID.

Examples:

```text
https://www.drupal.org/project/drupal/issues/3612047
https://github.com/example/product/issues/482
https://jira.example.org/browse/A11Y-142
```

Do not invent a tracker ID where no tracked work item exists.

### Occurrence fingerprint

A deterministic, versioned correlation key for a pattern at a normalized resource, route pattern, or component state. It is computed rather than assigned.

### Pattern fingerprint

A deterministic, versioned correlation key for candidate patterns within an explicitly defined product, repository, site, package, or component-library scope. It is computed rather than assigned. A pattern fingerprint must not be described as proof of a shared root cause.

### Display ID

A shortened, human-readable alias derived from an authoritative fingerprint. A display ID is useful in reports and conversations but is not an authoritative key and may collide. Illustrative forms may include:

```text
A11Y-PAT-EA3B846C4F12
A11Y-OCC-8AD07D954618
```

These are proposed generic forms, not replacements for existing Drupal or `open-scans` identifiers.

### Legacy identifier

A previously published identifier retained so historical reports, issues, configurations, and comparisons remain searchable. Examples may include:

```text
DRU-D62C6EC9
INS-1234ABCD
MS-61380df7
A11Y-ea3b846c
8ad07d954618
```

These example forms do not share one algorithm or have equivalent semantics.

### Heuristic cluster

An analytical grouping based on selector similarity, edit distance, machine learning, or another changeable heuristic. A cluster is not a stable fingerprint and may change when the algorithm, threshold, or dataset changes.

## Conceptual Model

| Identifier | Purpose | Assigned or computed | Expected stability |
| --- | --- | --- | --- |
| Scan request ID | Identifies why a scan ran | Assigned | Stable for the request |
| Scan run ID | Identifies one execution and its evidence | Assigned | Stable for the run |
| Occurrence fingerprint | Correlates a result at a normalized location | Computed | Stable within a versioned profile |
| Pattern fingerprint | Correlates candidate patterns within a target scope | Computed | Stable within a versioned profile |
| Display ID | Provides a short human-readable alias | Derived | Not authoritative |
| Tracker ID | Identifies durable tracked remediation work | Assigned | Stable across fingerprint changes |
| Legacy identifier | Preserves historical references | Previously assigned or computed | Retained for compatibility |
| Cluster ID | Groups similar findings heuristically | Computed or assigned | Not necessarily stable |
| Root-cause ID | Identifies a confirmed remediation source | Assigned after investigation | Defined by project policy |

These relationships are not necessarily one-to-one. For example:

- one tracker issue may cover several patterns caused by one component;
- one pattern may occur at hundreds of routes;
- one scan request may produce findings assigned to several tracker issues;
- one historical pattern may split into several new patterns; and
- several historical environment-specific patterns may merge into one current pattern.

### Identifier relationships

The following example shows the concepts together. It is conceptual. The hash values are placeholders, not verified test vectors, and the exact serialization and normalization rules are out of scope for this guide.

```json
{
  "tracker_id": null,
  "source": {
    "scan_request_id": "https://github.com/example/scans/issues/320",
    "scan_run_id": "https://example.com/reports/run-2026-07-26"
  },
  "fingerprints": {
    "occurrence": {
      "profile": "a11y/occurrence/v1",
      "algorithm": "sha-256",
      "value": "<full-fingerprint>"
    },
    "pattern": {
      "profile": "a11y/pattern/v1",
      "algorithm": "sha-256",
      "value": "<full-fingerprint>",
      "relationship": "candidate"
    }
  },
  "display_ids": {
    "occurrence": "A11Y-OCC-8AD07D954618",
    "pattern": "A11Y-PAT-EA3B846C4F12"
  },
  "legacy_identifiers": [
    {
      "profile": "example-scanner/pattern/v1",
      "value": "A11Y-ea3b846c"
    }
  ],
  "cluster_id": null,
  "root_cause_id": null
}
```

A future machine-readable fingerprint profile will define the exact hashing serialization, normalization algorithm, and published test vectors. Do not treat SHA-256 as encryption, and do not treat any hash function as collision-free; a matching fingerprint is evidence for correlation, not proof of identity.

## Lifecycle States

Use these minimum states when comparing a finding across runs:

### New

Not present in the available comparable history. Do not claim that the finding has never existed elsewhere; only the available history was checked.

### Recurring

Present in both the current run and a comparable previous run.

### Not observed

Previously recorded but absent from the current evidence. The available evidence is not sufficient to call it resolved. Absence should normally produce `not_observed`, not `resolved`.

### Not tested

The applicable resource, route, state, rule, engine, or test condition did not run successfully. Examples include timeouts, authentication failures, skipped pages, disabled rules, and engines that did not run.

### Out of scope

The prior occurrence is outside the explicitly defined current comparison scope.

### Resolved

Use only when the relevant scope was successfully retested or explicitly verified and the project's closure criteria have been met. An automated rule no longer reporting a result is not sufficient evidence by itself.

## Migration Principles

When correcting or introducing a fingerprint contract, use an additive migration rather than replacing identifiers in place.

### Define

Publish the new tracking concepts and versioned profiles.

### Dual-write

Emit new fingerprints while retaining every current identifier.

### Map

Create mappings between legacy and current identifiers. Allowed relationships:

- `equivalent`
- `split`
- `merged`
- `unresolved`

### Backfill

Compute current fingerprints for historical evidence only when all required inputs are available. If the inputs are incomplete, preserve the legacy ID and mark the migration `unresolved`.

### Adopt

After an overlapping dual-write period, use full fingerprints for correlation and tracker IDs for durable work status. Continue retaining legacy aliases for search and historical references.

The detailed schema and migration-index format for these steps belong in a later, dedicated change.

## Repository-Specific Examples

These examples describe migration scenarios, not established facts about the current implementation of either project. Verify current behavior in each project's own source before relying on these details.

### `drupal-core`

Drupal currently has several incompatible historical identifier forms, including `DRU-`, `INS-`, `MS-`, shortened hashes, and full SHA-256 hashes. A migration under this model would:

- preserve existing published values;
- name their legacy profiles;
- add the new identifiers alongside them; and
- avoid implying that all existing Drupal values were generated using the same contract.

### `open-scans`

`open-scans` currently separates page-specific findings from cross-page patterns but uses shortened and overlapping public identifier forms. A migration under this model would:

- retain the existing values;
- add explicit occurrence and pattern concepts;
- distinguish their display prefixes;
- separate scan requests from defect trackers;
- retain issue-local history; and
- avoid classifying an absent finding as resolved without comparable coverage.

This guide does not change either implementation.

## Related Guides

- [Accessibility Bug Reporting Best Practices](./ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES.md)
- [Contributing Accessibility Guide](./CONTRIBUTING_A11Y.md)
- [Examples Index](./README.md)
