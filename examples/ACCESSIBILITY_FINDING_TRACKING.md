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
17. Obligation, evidence confidence, handling, severity, priority, lifecycle state, and identity are separate axes and must not be collapsed into one another; see [Policy Classification](#policy-classification).
18. An automated result is evidence, not a conformance decision. An unconfirmed result normally goes to `review`, not `suppress`.
19. A policy classification must never alter a fingerprint, tracker ID, or any other identity field.

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

## Policy Classification

A finding carries several independent axes of information: what it is (identity: fingerprints, tracker IDs), how strong the evidence is, whether meeting the relevant standard is required, how it is currently being handled for reporting and enforcement, how severe it is, and how it compares across runs (lifecycle state). Projects and tools repeatedly collapse these into one field -- for example, treating "automated tool flagged it" as equivalent to "confirmed standards failure," or treating "excluded from this sprint's report" as equivalent to "resolved." This section defines three policy dimensions -- `obligation`, `handling`, and `evidence_status` -- and how they relate to the identity, lifecycle, and severity concepts already defined in this guide. It does not redefine or replace any of them.

These three fields are optional and additive: `schema_version: "2.0"` findings remain fully valid without them. A finding that populates them uses `schema_version: "2.1"`; see [Accessibility Finding Schema](./schemas/README.md) for the normative field definitions. Populating a policy classification never computes, alters, or depends on a fingerprint, tracker ID, or any other identity field -- see [Fingerprint Profiles](./fingerprints/README.md), "Fields excluded from fingerprint identity."

### Obligation

Whether satisfying a specific standards mapping is required, a stretch goal, merely advisory, unmapped, or not applicable. `obligation` is assigned per standards mapping (for example, per WCAG success criterion cited in a finding), not once for the whole finding, because a single finding can implicate mappings at different obligation levels -- most commonly an AA criterion the project must meet alongside an AAA criterion it does not.

| Value | Meaning |
| --- | --- |
| `required` | Required by the project's target, applicable law, contract, platform policy, or explicit local policy. |
| `aspirational` | Outside the project's baseline target but a recognized stretch goal the team is encouraged to pursue. |
| `advisory` | A useful best practice that is not part of the baseline target or a declared stretch goal. |
| `unmapped` | No authoritative obligation has been established yet. |
| `not-applicable` | Reviewed and determined not to apply to this finding. |

**AAA criteria under an AA project target are `aspirational` by default, not `advisory`.** Most projects declare a baseline target such as WCAG 2.2 Level AA. A finding confirmed against an AAA success criterion is real, visible, and worth pursuing as a stretch goal -- it is not equivalent to an arbitrary best-practice suggestion with no standards basis at all, which is what `advisory` is for. A project may explicitly elevate a specific AAA criterion to `required` (for example, for safety-critical content, a regulatory requirement narrower than the general target, or a deliberate product commitment); when it does, record the reason in `obligation_basis` so the elevation is traceable rather than silently assumed.

Do not describe satisfying one or several AAA success criteria as achieving WCAG AAA conformance. Full AAA conformance is a whole-scope claim the [W3C is explicit is not recommended as a general policy requirement](https://www.w3.org/WAI/WCAG22/Understanding/conformance.html#levels), and treating individual elevated or aspirational AAA findings as partial credit toward it misrepresents both the finding and the conformance claim.

An `unmapped` finding is not a lesser finding -- it is an honest statement that no authoritative standards mapping has been established yet, which is common for newly reported barriers, best-practice-only issues awaiting a standards basis, or findings still in early triage. Do not default an unmapped finding to `advisory` merely to give it a value; `unmapped` and `advisory` are different claims.

### Handling

The finding's current reporting and enforcement treatment.

| Value | Meaning |
| --- | --- |
| `report` | Surfaced in standard reporting and enforcement. |
| `review` | Evidence or applicability is unresolved; a decision is pending. |
| `suppress` | Retained but excluded from specified reporting or enforcement under a documented exception. |

`handling` is independent of `obligation`: a `required` finding can be under `review` while evidence is gathered, and an `aspirational` finding can still be `report`ed. `handling` is also independent of `tracking.lifecycle.status`: `suppress` is a reporting and enforcement decision about where a finding appears, not a claim about whether the underlying barrier still exists. A suppressed finding with `tracking.lifecycle.status: "recurring"` is still recurring; suppression only changes whether it shows up in a specific report or gate.

**An unconfirmed automated result normally goes to `review`, not `suppress`.** The default for an indicator nobody has evaluated yet is that it needs evaluation -- not that it has been excluded. Moving a finding to `suppress` requires the documented exception described below; moving it to `review` requires nothing beyond "we have not resolved this yet."

**Suppression is not resolution, and a suppressed finding remains recorded.** Suppressing a finding must never delete it, hide it from every surface, or substitute for verifying and closing it. A valid suppression requires all of:

- **Scope** -- the specific, narrow reporting or enforcement context the suppression applies to (for example, "the CI merge gate for the legacy checkout route," not "this finding" unqualified).
- **Reason** -- why the finding is excluded from that specific context, in enough detail for a later reviewer to evaluate the decision.
- **Evidence** -- what supports the suppression (a risk acceptance, a compensating control, an investigation result, a vendor ticket).
- **Owner** -- who or what role is accountable for the suppression.
- **A review or expiry date** -- when the suppression must be revisited, or when it lapses. An undated, unowned suppression is functionally the same as silently discarding the finding and is not a valid use of `suppress`; see the equivalent warning about unowned investigation items in [Actionability](#actionability-valid-report-vs-ready-for-remediation).

See [Accessibility Finding Schema](./schemas/README.md) for the normative `policy.suppression` fields.

### Evidence status

How strong the evidence behind a finding currently is, independent of obligation, handling, severity, priority, and lifecycle status.

| Value | Meaning |
| --- | --- |
| `automated-indicator` | An unreviewed automated tool result only. |
| `reproducible-finding` | The team has reproduced the behavior, or has equivalent evidence, but has not yet confirmed it is a genuine, standards-relevant barrier. |
| `confirmed-user-facing-barrier` | A human has confirmed the finding actually blocks or burdens a person completing a task. |
| `confirmed-standards-failure` | A human has confirmed the finding fails a specific cited standards requirement. |
| `rejected-false-positive` | Reviewed and determined the indicator does not reflect a real barrier or failure. |
| `verified-resolution` | The fix was verified per this guide's [Resolved](#resolved) lifecycle state. |

`evidence_status` describes the finding's evidence, not the applicable rule's severity or the project's obligation to fix it. A `confirmed-user-facing-barrier` and a `confirmed-standards-failure` can both be true of the same finding (a confirmed barrier that also fails a cited standard) or independently true (a confirmed barrier with no clean standards mapping yet, or a confirmed technical standards failure with no yet-identified user-facing consequence).

**An automated result is evidence, not a conformance decision.** `automated-indicator` exists specifically to keep raw tool output from being silently treated as `confirmed-standards-failure` or used to justify closing a finding. Promoting a finding out of `automated-indicator` requires the human confirmation described in [Actionability](#actionability-valid-report-vs-ready-for-remediation), not simply the passage of time or a clean rerun.

### How the axes relate

| Axis | Field | Answers |
| --- | --- | --- |
| Identity | `tracking.fingerprints`, `tracking.tracker_ids` | What is this, and what tracked work covers it? |
| Evidence confidence | `policy.evidence_status` | How strong is the current evidence? |
| Obligation | `policy.standards_obligations[].obligation` | Are we required to fix this? |
| Handling | `policy.handling` | Is this currently reported, under review, or suppressed? |
| Severity / priority | `impact.severity`, project priority fields | How bad is it, and how urgently should it be worked? |
| Lifecycle | `tracking.lifecycle.status` | Is this new, recurring, not observed, resolved, and so on, relative to comparable history? |

These axes commonly move together but must never be inferred from one another. A finding can be `required` and still `review` (evidence pending); `aspirational` and still `report`ed (a visible stretch-goal opportunity); `confirmed-standards-failure` and still `suppress`ed (a documented, time-bounded exception); or `critical` severity and still `unmapped` obligation (a severe barrier with no standards citation yet). Treat each axis as answering its own question, not as a proxy for the others.

### Compact examples

The following illustrate the eight scenarios below; see [`accessibility-finding-v2.1-policy-examples.json`](./schemas/accessibility-finding-v2.1-policy-examples.json) for complete, schema-valid records.

- **Confirmed AA failure:** `obligation: required`, `handling: report`, `evidence_status: confirmed-standards-failure`.
- **Unresolved AA indicator:** `obligation: required`, `handling: review`, `evidence_status: automated-indicator`.
- **Confirmed AAA finding under an AA target:** `obligation: aspirational`, `handling: report`, `evidence_status: confirmed-standards-failure`.
- **Unresolved AAA indicator:** `obligation: aspirational`, `handling: review`, `evidence_status: automated-indicator`.
- **Best-practice rule outside the standards target:** `obligation: advisory`, `handling: report`, `evidence_status: confirmed-user-facing-barrier`.
- **AAA criterion elevated by local policy:** `obligation: required` (with `obligation_basis` naming the local policy), `handling: report`, `evidence_status: confirmed-standards-failure`.
- **Rejected false positive:** `obligation: not-applicable`, `handling: suppress` (with full suppression detail), `evidence_status: rejected-false-positive`.
- **Temporary suppression:** `obligation: required`, `handling: suppress` (narrow scope, owner, and expiry date), `evidence_status: confirmed-user-facing-barrier`.

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
- [Accessibility Finding Schema](./schemas/README.md) - versioned JSON Schema (`schema_version: "2.0"` or `"2.1"`) for the complete machine-readable finding record, with [a complete example](./schemas/accessibility-finding-v2.example.json), [a minimal example](./schemas/accessibility-finding-v2-minimal.example.json), [a manual/user-reported example](./schemas/accessibility-finding-v2-manual.example.json), and [policy-classification examples](./schemas/accessibility-finding-v2.1-policy-examples.json) for [Policy Classification](#policy-classification) above
- [Fingerprint Profiles](./fingerprints/README.md) - normative `a11y/pattern/v1` and `a11y/occurrence/v1` contracts, canonicalization, and golden test vectors
- [Accessibility Bug Reporting Best Practices](./ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES.md)
- [Contributing Accessibility Guide](./CONTRIBUTING_A11Y.md)
- [Examples Index](./README.md)
