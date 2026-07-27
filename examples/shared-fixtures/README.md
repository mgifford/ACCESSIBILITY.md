---
title: Shared Cross-Repo Policy Fixtures
---

# Shared Cross-Repo Policy Fixtures

This directory holds findings that must classify identically wherever `obligation`, `handling`, and `evidence_status` are computed or documented: this repository's schema and canonical guides, [`accessibility-skills`](https://github.com/mgifford/accessibility-skills)' operational guidance, and [`vital-core`](https://github.com/mgifford/vital-core)'s `finding-policy` engine. A single fixture that all three repositories agree on is a stronger test of consistency than any one repository's own unit tests, because it catches the case where documentation, agent instructions, and implementation have quietly drifted apart from each other while each still passes its own tests.

This is normative test data, not additional guidance. It does not redefine any vocabulary from [Accessibility Finding Tracking, "Policy Classification"](../ACCESSIBILITY_FINDING_TRACKING.md#policy-classification) or the [finding schema](../schemas/README.md).

## Fixtures

| File | Scenario | Expected classification |
| --- | --- | --- |
| `color-contrast-unreviewed.json` | An axe-core `color-contrast` result, `evidence_status` still `automated-indicator`, no human review yet. | `obligation: required` (WCAG 2.2 1.4.3 is within the AA baseline target), `handling: review`, `evidence_status: automated-indicator`. |

Each fixture is a complete, schema-valid `schema_version: "2.1"` finding record (see `../schemas/accessibility-finding-v2.schema.json`). `npm run validate` in `../schemas/` validates every file in this directory against the schema alongside the existing examples.

## Why this specific scenario

An unreviewed automated indicator for a WCAG AA criterion is the single most common — and most commonly mishandled — case in practice: a scanner produces a plausible-looking violation, and downstream tooling is tempted to either (a) treat it as a confirmed failure immediately, or (b) silently drop it because it hasn't been triaged. Schema 2.1's policy classification exists specifically to prevent both: `required` says the underlying standard is in scope, `review` says a human still needs to confirm it, and `evidence_status: automated-indicator` says exactly how strong the current evidence is. Getting this one scenario right in all three repositories is a proxy for getting the whole obligation/handling/evidence_status model right.

## How each repository consumes this fixture

| Repository | Consumption |
| --- | --- |
| `ACCESSIBILITY.md` (this repo) | `examples/schemas/validate-accessibility-findings.mjs` validates every fixture in this directory against `accessibility-finding-v2.schema.json`. |
| `accessibility-skills` | `tests/unit/shared-fixture.test.js` (or equivalent) asserts that applying this repository's own documented axe-rules/bug-reporting guidance to the fixture's `test_results[0]` (an unreviewed `color-contrast` result) yields the same `obligation`/`handling`/`evidence_status` as this file's `policy` object. |
| `vital-core` | `tests/unit/shared-fixture.test.js` runs the fixture's `standards`/`test_results` shape (translated into a `finding-policy.js` bug object) through `applyFindingPolicy()` with the default policy, and asserts the computed `obligation`/`handling` match this file's `policy` object. |

## Updating a fixture

Because three repositories read this data, do not edit a fixture's `policy` object without also verifying (and, if necessary, updating) all three consumers above in the same change. A fixture change that only updates one repository's test expectations without the others is exactly the drift this directory exists to prevent.
