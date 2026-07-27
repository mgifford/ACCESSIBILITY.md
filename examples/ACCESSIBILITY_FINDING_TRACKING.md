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
16. A finding can be valid at intake without being ready for remediation; see [Actionability: Valid Report vs. Ready for Remediation](#actionability-valid-report-vs-ready-for-remediation).

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

The [fingerprint profiles](./fingerprints/README.md) define the exact hashing serialization, normalization algorithm, and published test vectors for `a11y/pattern/v1` and `a11y/occurrence/v1`. Do not treat SHA-256 as encryption, and do not treat any hash function as collision-free; a matching fingerprint is evidence for correlation, not proof of identity.

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

## Actionability: Valid Report vs. Ready for Remediation

A finding can be valid at intake without being ready for a team to act on. Treating every credible report as immediately actionable, or rejecting every incomplete report as invalid, both fail teams and the people who file reports.

> An incomplete report can be valid at intake without being ready for remediation. A finding should enter the active remediation queue only when the team can locate and evaluate it and has sufficient evidence to determine what would demonstrate correction.

This section defines the stages between an intake report and a verified fix, and where a finding should live while it moves between them. It does not create a new fingerprint identity, a new lifecycle status, or a new schema field. It governs triage and queue placement, using the [Lifecycle States](#lifecycle-states) and [`tracking.lifecycle.status`](./schemas/README.md) already defined above and in the schema.

### Actionability stages

| Stage | Meaning |
| --- | --- |
| Valid report | Credible evidence of a possible barrier has been recorded. |
| Ready for evaluation | The team can locate the affected experience and investigate it. |
| Reproducible or sufficiently evidenced | The team can reproduce the behavior or has equivalent evidence adequate for evaluation. |
| Ready for remediation | The barrier and remediation scope are understood well enough to change safely. |
| Ready for verification | The team can repeat the original interaction or an adequately equivalent test after correction. |
| Ready for closure | Verification demonstrates that the barrier is no longer present for the claimed scope. |

A finding does not have to pass through every stage to be worth preserving. A report can remain at "valid report" indefinitely while retained as evidence; it should not be discarded merely because it has not advanced.

### Three destinations

Findings live in one of three places, independent of the lifecycle status computed for any one comparison:

**Active remediation queue** — findings that are reproducible or otherwise supported by sufficient evidence to evaluate and remediate. An active item should normally have a precise safe location, relevant state and preconditions, expected and actual behavior, reproduction steps or equivalent evidence, relevant environment, technical evidence when applicable, an owner, user-facing acceptance criteria, and a verification plan. A WCAG mapping, severity, priority, frequency, fingerprint, and a proposed fix are useful but are not prerequisites for entering the queue.

**Investigation queue** — credible but intermittent, currently inaccessible, or insufficiently evidenced findings that warrant additional work. Every investigation item must have an owner, the evidence currently available, the next investigative action, the evidence that would justify promotion, an expiry or review date, and the reason it was not promoted to active remediation. Do not let an unowned `needs_review` finding sit indefinitely; a review date forces a decision.

**Observation history** — compact, machine-readable evidence for automated results that were not reproduced or promoted, retained only for recurrence detection: occurrence and pattern fingerprints when available, a safe normalized location, tool and rule identity, scan run ID, first/last-observed and last-checked dates, lifecycle status, the reason it was not promoted, and any relevant coverage comparison. Observation history is not the active human issue queue; apply a documented, project-defined retention policy rather than retaining it indefinitely without a purpose.

### The automated-finding actionability gate

An automated finding should normally enter the active remediation queue only when the team has: a precise safe URL, route, component, or equivalent location; a stable locator or captured affected element where applicable; focused HTML, DOM, accessibility-tree, or component evidence where applicable; tool and rule identifiers and versions; test configuration; relevant state and environment; expected and actual results; a successful controlled rerun or sufficient equivalent evidence; enough evidence to distinguish a likely defect from a tool, crawl, or test failure; and a defined way to verify correction.

The central question triage should ask is:

> Can the team locate the result, rerun or otherwise evaluate the relevant check, inspect the affected output, and determine what would demonstrate correction?

If not, the finding is not ready for the active remediation backlog. Route it to observation history (unreproduced automated result) or the investigation queue (credible but not yet evidenced enough to act on) instead of creating an issue nobody can work.

This gate governs automated findings specifically because they are produced at a volume and speed that manual triage cannot match one-by-one. It does not add a documentation, evidence, or reproduction requirement to a user-submitted report before that report is accepted as a valid finding — see [Direct reproduction and equivalent evidence](#direct-reproduction-and-equivalent-evidence) and the bug reporting guide's [minimum information for a useful report](./ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES.md#3-minimum-information-for-a-useful-report).

### Direct reproduction and equivalent evidence

Direct reproduction is the strongest basis for remediation and verification, and should be preferred when available. A team should not normally implement or close a claimed correction when it cannot understand or evaluate the original failure.

Exact reproduction is not always possible. Equivalent evidence supporting evaluation may include: a focused HTML or live-DOM excerpt; accessibility-tree output; tool output with its configuration and version; a recording or screenshot with a written explanation; browser or application logs; repeated reports; deterministic code inspection; evidence from a disabled person; reproduction in a sufficiently equivalent environment; a known invalid component pattern; or an intermittent failure with documented attempts and conditions.

When exact reproduction is unavailable, record: what evidence exists; what the team attempted; what could not be tested; the remaining uncertainty; the scope of any conclusion drawn; and the verification plan.

`Cannot reproduce` describes the team's current evidence, not the reporter's credibility:

> "The team cannot currently reproduce it" means the team does not yet have enough evidence to act. It does not establish that the reporter was wrong.

### Comparable runs

A missing result from an automated rerun is meaningful only when the runs being compared are actually comparable. Treat a run as comparable only when: the same resource or normalized route was in scope; the page loaded successfully; required authentication and account state were reached; the relevant component was present; the same applicable rule ran; the scanner completed; exclusions did not materially change; and the named test profile was sufficiently equivalent.

Classify these as `not_tested`, never `not_observed`: a timeout; an authentication failure; a skipped resource; a missing component caused by a load failure; a disabled rule; a scanner engine that did not run; an incomplete crawl; a test error; or incompatible coverage. Conflating an incomplete rerun with a clean rerun is the single most common way aggressive automated filtering manufactures false confidence.

### Suggested automated repeatability workflow

The following is a recommended starting process, not a universal standard; adjust it to the project.

1. Capture the initial result and its evidence.
2. Rerun the same rule against the same resource and state.
3. If reproduced, promote it to active remediation or update existing tracked work.
4. If not reproduced, make one controlled retry in a fresh session where practical.
5. If still absent, classify it as `not_observed`.
6. Keep compact observation history rather than creating an active issue.
7. Promote it to bounded investigation if it recurs in later comparable runs.
8. Treat failed or incomplete coverage as `not_tested`.

For deterministic findings, one controlled reproduction may be sufficient to promote. For indicator, timing-dependent, or intermittent findings, a project may define a recurrence threshold. The following is an informative example only, not an accessibility requirement:

```text
Deterministic finding:
  Promote after one successful controlled reproduction.

Indicator or intermittent finding:
  Promote after two observations in three comparable runs,
  or after manual confirmation.

Not reproduced:
  Keep compact history for three comparable runs or 30 days,
  then expire unless it recurs.
```

These numbers are illustrative. Projects must adjust them based on scan frequency, consequence, test reliability, cost of investigation, affected tasks, legal or contractual obligations, and available evidence.

### Consequences of aggressive filtering, and exceptions

Aggressive automated filtering can remove barriers that are intermittent, timing-dependent, network-dependent, tied to authentication or account state, specific to assistive technology, affected by personalization or preferences, difficult for the development team to reproduce, reported by one disabled person, or present in unstable or dynamically generated interfaces.

Do not automatically discard a credible user-reported barrier, or a potentially high-consequence safety, privacy, financial, health, employment, education, or public-service barrier, because an internal rerun did not reproduce it. Place it in bounded investigation with an owner, a next action, a review date, and a clear evidence threshold for promotion. Do not retain it indefinitely without ownership or a plan — an investigation item with no owner and no review date is functionally the same as a discarded report.

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

`drupal-core` and `open-scans` each have their own legacy identifier formats, verified against their current source and documented in [Accessibility Migration Profiles](./migrations/ACCESSIBILITY_MIGRATION_PROFILES.md). That guide is the canonical source for the exact hash inputs, known gaps (such as `open-scans` pattern IDs currently having no target-scope input), and the migration requirements for adopting `a11y/pattern/v1` and `a11y/occurrence/v1` in either project. Do not restate or re-derive those details here.

This guide does not change either implementation.

## Related Guides

- [Accessibility Migration Profiles](./migrations/ACCESSIBILITY_MIGRATION_PROFILES.md) - verified `drupal-core` and `open-scans` legacy identifier formats and migration requirements
- [Accessibility Finding Schema](./schemas/README.md) - versioned JSON Schema (`schema_version: "2.0"`) for the complete machine-readable finding record, with [a complete example](./schemas/accessibility-finding-v2.example.json), [a minimal example](./schemas/accessibility-finding-v2-minimal.example.json), and [a manual/user-reported example](./schemas/accessibility-finding-v2-manual.example.json)
- [Fingerprint Profiles](./fingerprints/README.md) - normative `a11y/pattern/v1` and `a11y/occurrence/v1` contracts, canonicalization, and golden test vectors
- [Accessibility Bug Reporting Best Practices](./ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES.md)
- [Contributing Accessibility Guide](./CONTRIBUTING_A11Y.md)
- [Examples Index](./README.md)
