---
title: Shift-Left Accessibility Automation
---

# Shift-Left Accessibility Automation

Shift-left accessibility means making accessibility requirements, feedback,
and testing available earlier in product and engineering work. It does not mean
moving responsibility onto individual developers, relying only on pre-commit
hooks, or replacing evaluation of the finished product.

The goal is to prevent known barriers while keeping later review, manual
testing, assistive-technology testing, and production monitoring in place.

This guide is canonical for shift-left guidance in `ACCESSIBILITY.md`. The
companion `ci-cd` skill in
[accessibility-skills](https://github.com/mgifford/accessibility-skills) may
require a separate update when this guide or
[CI/CD Accessibility Best Practices](./CI_CD_ACCESSIBILITY_BEST_PRACTICES.md)
changes. Synchronization is not automatic.

## Core Principles

- Start with affected user tasks and requirements, not a preferred tool.
- Give contributors fast feedback before requiring slower checks.
- Keep central CI authoritative because local hooks are optional and bypassable.
- Block known regressions with explicit rules and reviewable evidence.
- Test rendered behavior and relevant states, not only source files.
- Treat automated results as evidence to investigate, not proof of conformance.
- Keep accessibility responsibility shared across research, design, content,
  development, quality assurance, product ownership, and operations.
- Maintain production monitoring and user feedback after release.

## What Shift-Left Does and Does Not Do

| Shift-left should | Shift-left should not |
| --- | --- |
| Make requirements visible during planning and design | Begin only when code is committed |
| Provide deterministic local and CI feedback | Require every contributor to configure identical local tooling |
| Test components and tasks in meaningful states | Scan only a static initial page |
| Prevent new known regressions | Hide existing barriers in a permanent baseline |
| Route uncertain findings to human review | Convert every tool result directly into project severity |
| Preserve evidence for review | Treat a score or clean scan as WCAG conformance |
| Reduce expensive late rework | Eliminate release or production evaluation |

W3C notes that evaluation tools cannot automatically check every accessibility
aspect and that human judgment is required. Apply that limitation at every
stage.

## The Feedback Ladder

Use the fastest reliable check at the earliest useful stage, then add broader
checks as the change approaches release.

| Stage | Typical feedback | Expected speed | Authority |
| --- | --- | --- | --- |
| Planning and design | User tasks, acceptance criteria, content and interaction review | During design | Product decision record |
| Editor or static analysis | Syntax, framework rules, detectable markup patterns | Seconds | Advisory unless repeated in CI |
| Unit and component tests | Names, roles, states, errors, announcements, rule scans | Seconds to minutes | Repeat in CI |
| Optional pre-commit hook | Fast checks on staged or affected files | Usually under one minute | Convenience, not the merge gate |
| Pull-request CI | Reproducible build, component and task tests, regression checks | Minutes | Required when configured in repository rules |
| Human review | Meaning, alternatives, keyboard behavior, focus, reading order | Proportionate to risk | Required for applicable changes |
| Scheduled or release tests | Broader pages, browsers, preferences, and authenticated states | Longer-running | Triage and release evidence |
| Production feedback | Monitoring, support reports, user research, barrier reports | Continuous | Drives remediation and future prevention |

Later stages should not repeat expensive work without adding evidence. Earlier
stages should not claim coverage they cannot provide.

## 1. Define Accessibility Before Implementation

For a feature or change, record:

- the user task and affected content;
- applicable input methods and assistive technologies;
- expected names, roles, states, relationships, reading order, and focus order;
- keyboard, pointer, touch, and speech-input behavior;
- loading, empty, success, validation, error, timeout, and permission states;
- themes, contrast preferences, reduced motion, zoom, reflow, and orientation;
- meaningful text alternatives and synchronized descriptions; and
- what requires automated, manual, and assistive-technology verification.

These become acceptance criteria and test targets. A generic instruction to
"make it accessible" is not sufficiently testable.

## 2. Editor and Static Feedback

Static tools can catch issues such as unsupported attributes, missing required
properties, detectable naming gaps, and framework-specific anti-patterns before
a browser runs.

Use them when:

- the rule can be evaluated reliably from source;
- the tool understands the language or framework;
- messages explain the affected behavior and a safe correction; and
- the same configuration runs in CI.

Do not create broad regex rules that mechanically rewrite semantics. Source
analysis usually cannot determine final accessible names, focus behavior,
rendered contrast, generated SVG semantics, or complete user tasks.

Pin tool versions in the project's dependency manifest and lockfile. Review
rule changes before enabling an update as a blocking check.

## 3. Unit and Component Tests

Test behavior at the smallest level that renders the real component. Useful
assertions include:

- visible labels and computed accessible names;
- native roles and required states;
- relationships between instructions, fields, errors, and descriptions;
- keyboard activation and focus movement;
- status messages after asynchronous changes;
- open, closed, selected, expanded, disabled, invalid, and busy states;
- no inaccessible change across light and dark themes; and
- an axe-core or equivalent scan after relevant interaction.

Prefer role and accessible-name queries over test IDs when the query represents
how a user or assistive technology finds the control. Do not assert an ARIA
attribute merely because it exists; assert that the exposed state and behavior
are correct.

Keep component tests representative of the production rendering path. A test
fixture that omits application styles, templates, sanitization, localization,
or client-side behavior can miss the regression that users receive.

## 4. Fast Local Commands

Expose stable commands rather than requiring contributors to remember tool
syntax:

```json
{
  "scripts": {
    "lint:a11y": "eslint .",
    "test:a11y:fast": "playwright test tests/accessibility/smoke.spec.ts",
    "test:a11y:changed": "node scripts/test-a11y-changed.mjs",
    "test:a11y:ci": "playwright test tests/accessibility",
    "test:a11y:full": "playwright test tests/accessibility --project=full"
  }
}
```

These are illustrative names. Do not add a script until its command, inputs,
exit status, scope, and required dependencies are implemented and documented.

Use the same underlying configuration locally and in CI. A local command may
select fewer tests, but it should not silently change rules or expected results.

## 5. Optional Pre-Commit Hooks

Pre-commit hooks provide convenient feedback, but they are not a reliable
repository control:

- contributors may not install them;
- Git allows them to be bypassed;
- graphical clients and development environments handle hooks differently;
- system-language hooks depend on tools already installed locally;
- slow hooks discourage use and can create contribution barriers; and
- automatically modifying staged files can surprise contributors or lose work
  when tooling is misconfigured.

Keep hooks fast, deterministic, documented, and optional. Provide a supported
manual command and rerun the required check in CI.

Example for a project whose `test:a11y:changed` script accepts filenames:

```yaml
repos:
  - repo: local
    hooks:
      - id: accessibility-changed-files
        name: Accessibility checks for changed files
        entry: npm run test:a11y:changed --
        language: system
        pass_filenames: true
        files: \.(html|js|jsx|ts|tsx|vue|svelte)$
        stages: [pre-commit]
```

This example relies on the project's installed Node dependencies. If the script
does not accept filenames, do not set `pass_filenames: true`. If it ignores the
filenames, do not describe the hook as changed-file testing.

The current
[`PRE_COMMIT_ACCESSIBILITY_SAMPLE.yaml`](./PRE_COMMIT_ACCESSIBILITY_SAMPLE.yaml)
sets `pass_filenames: false` and calls project scripts that must exist in the
adopting repository. Treat it as a minimal placeholder until it is revised and
validated against a real project.

Tools such as `lint-staged` are an alternative in Node projects. Review their
Git and stash behavior, quote paths safely, pin versions, and test filenames
containing spaces and special characters.

## 6. Pull-Request CI Is the Shared Gate

CI should rerun applicable checks in a clean environment using reviewed,
locked dependencies. A pull-request check is a merge gate only when an active
branch-protection rule or ruleset requires that exact check.

For each required check, document:

- its stable and unique job name;
- triggers and event types;
- files and changes it covers;
- tool and browser versions;
- pass, warning, and failure conditions;
- baseline and suppression behavior;
- artifacts and annotations produced;
- owner and triage process; and
- what remains manual.

### Required checks and path filters

GitHub documents that a required workflow skipped by path or branch filtering
can remain pending and block merging. If a check is required, prefer a workflow
that always starts and has a stable summary job. Decide within the workflow
whether affected tests should run, then report an explicit success, failure, or
documented not-applicable result.

If a merge queue is used, verify that the workflow handles the required
`merge_group` event. Confirm current repository rules rather than assuming a
workflow file is enforced.

### New regressions and existing findings

The safest initial gate is often:

1. inventory existing findings;
2. assign owners and remediation plans;
3. prevent new instances or worsened user impact;
4. reduce the baseline deliberately; and
5. expire suppressions rather than normalizing them.

Never knowingly introduce a Critical or High barrier. Lower-severity findings
still require an explicit decision and tracked follow-up when they cannot be
fixed in the change.

Tool severities are inputs to triage. Map them to the project taxonomy only
after reviewing the affected task and user impact.

## 7. Test the Final Output

Source checks are insufficient when a build or runtime transforms content.
Test after applicable stages such as:

- template rendering and static-site generation;
- CSS compilation and theme application;
- component hydration;
- localization;
- Markdown and Mermaid rendering;
- SVG sanitization or optimization;
- minification and bundling;
- content-management transformation; and
- export to SVG, raster, print, or PDF.

For this repository, relevant checks include the built Jekyll `_site`, not only
Markdown source. Follow
[Mermaid Transformation](./MERMAID_TRANSFORMATION_BEST_PRACTICES.md) and
[SVG Accessibility](./SVG_ACCESSIBILITY_BEST_PRACTICES.md) for generated visual
assets.

## 8. Risk-Based Browser and Preference Coverage

Run a fast representative browser configuration on routine pull requests. Add
broader coverage for shared components, high-risk tasks, releases, dependency
updates, or changes to browser support.

Applicable coverage may include:

- supported Chromium, Firefox, and WebKit-based environments;
- narrow reflow and larger desktop viewports;
- system, light, and dark themes;
- increased contrast and forced colors;
- reduced and default motion;
- zoom and text-spacing overrides;
- keyboard, pointer, touch, and speech input; and
- supported browser and assistive-technology combinations.

WebKit automation is not evidence that Safari and VoiceOver were tested. An
ARIA snapshot is not a screen-reader transcript. Record the exact environment
for any interoperability claim.

See [Browser Support](../BROWSER_SUPPORT.md) and
[Manual Accessibility Testing](./MANUAL_ACCESSIBILITY_TESTING_GUIDE.md).

## 9. Scheduled and Production Checks

Scheduled tests complement pull-request checks by finding:

- dependency and browser drift;
- content changes outside the primary code path;
- production configuration differences;
- pages not represented in pull-request fixtures;
- authenticated and permission-dependent barriers; and
- regressions introduced by external services.

Do not stop every scheduled scan because one known issue is open. Use stable
finding identity, deduplication, ownership, and reviewed closure behavior.

The
[GitHub Accessibility Scanner Integration](./GITHUB_ACCESSIBILITY_SCANNER_INTEGRATION.md)
guide documents a dry-run-first, issue-tracking pattern. Keep its Copilot
assignment disabled when using the separate review-only remediation workflow.

Production checks must have authorized targets, bounded crawl behavior, safe
authentication, privacy review, and incident handling. Do not put session data,
private page content, or secrets into issues, logs, screenshots, artifacts, or
AI prompts.

## 10. Human Review and Assistive Technology

Automation cannot determine whether:

- alternative text communicates the intended meaning;
- instructions and errors are understandable;
- content order supports comprehension;
- a keyboard interaction model is efficient and predictable;
- focus moves and returns appropriately;
- status messages arrive at the useful time;
- a diagram's structured alternative conveys its relationships; or
- a complete task is usable with a supported assistive technology.

Assign manual checks based on the change and risk. Record the browser,
operating system, assistive technology, versions, settings, task, date, and
result when that testing is performed.

Do not require a contributor with a disability to disclose their disability or
serve as the sole accessibility reviewer. Lived experience is expertise, not a
substitute for shared organizational responsibility.

## Accessible Feedback from Automation

CI output should itself be usable:

- use plain text in addition to color or icons;
- identify the affected file, component, route, state, and rule;
- explain observed behavior and a safe next step;
- link to authoritative guidance;
- distinguish errors, warnings, and informational results in text;
- keep annotations concise and provide complete results in an accessible
  artifact;
- avoid huge undifferentiated logs;
- ensure reports can be read with keyboard and assistive technology; and
- provide a way to report a false positive or request help.

A tool message that says only "accessibility failed" does not give a
contributor an actionable path forward.

## Security and Supply-Chain Controls

- Pin GitHub Actions to reviewed full commit SHAs.
- Pin project tools through manifests and lockfiles.
- Declare minimum workflow permissions explicitly.
- Set `persist-credentials: false` when checkout credentials are unnecessary.
- Do not expose secrets to untrusted pull-request code.
- Avoid `pull_request_target` for workflows that execute or build untrusted
  changes.
- Keep issue text, commit messages, filenames, URLs, HTML, SVG, and scanner
  results out of executable shell text.
- Quote shell variables and validate paths before destructive operations.
- Review external actions, plugins, install scripts, and transitive
  dependencies.
- Add job timeouts, concurrency controls, and bounded artifacts.
- Treat generated reports, screenshots, traces, and videos as potentially
  sensitive.

See [CI/CD Accessibility Best Practices](./CI_CD_ACCESSIBILITY_BEST_PRACTICES.md)
for detailed workflow and AI-remediation security guidance.

## Current Companion Workflow Status

[`A11Y_SHIFT_LEFT_WORKFLOW.yml`](./A11Y_SHIFT_LEFT_WORKFLOW.yml) is an
experimental reference and is not currently copy-ready. At the 2026-07-19
review it:

- used mutable action tags rather than full commit SHAs;
- referenced an older GitHub Accessibility Scanner version and obsolete input
  names;
- assumed `package.json`, `npm ci`, and `npm run test:a11y`, which this Jekyll
  repository does not currently provide;
- used workflow-level path filters that require special handling if the check
  becomes required; and
- did not document the separate authority of the scanner PAT.

Revise and validate that workflow before recommending it for adoption. The
current
[GitHub Accessibility Scanner Integration](./GITHUB_ACCESSIBILITY_SCANNER_INTEGRATION.md)
and [CI/CD guide](./CI_CD_ACCESSIBILITY_BEST_PRACTICES.md) are authoritative for
the intended replacement model.

The broader
[`BROWSER_TESTING_WORKFLOW.yml`](./BROWSER_TESTING_WORKFLOW.yml) is also an
experimental reference. Its browser claims, action tags, global installations,
matrix behavior, permissions, secret use, and referenced project scripts need
independent review before use.

## Adoption Sequence

### Phase 1: Observe

- Identify critical user tasks and rendered surfaces.
- Add fast local commands and non-blocking CI results.
- Measure runtime, flakiness, false positives, and coverage gaps.
- Fix the test environment before enforcing unreliable results.

### Phase 2: Prevent regressions

- Inventory and own existing findings.
- Require stable checks for applicable pull requests.
- Block new known Critical and High barriers.
- Add narrow, dated exceptions where a finding cannot yet be resolved.

### Phase 3: Expand meaningful coverage

- Add interaction states and shared components.
- Add risk-based browser, theme, preference, and viewport coverage.
- Test final generated and exported output.
- Add scheduled scans and authenticated tasks safely.

### Phase 4: Improve with evidence

- Review escaped regressions and user-reported barriers.
- Turn recurring defects into focused tests or design-system constraints.
- Remove checks that provide noise without useful evidence.
- Update tools, baselines, and documentation through reviewed changes.

## Useful Metrics

Prefer metrics that describe coverage and outcomes:

- critical user tasks with automated and manual coverage;
- new accessibility regressions caught before merge;
- regressions first reported after release;
- median time to triage and remediate by project severity;
- flaky-check and false-positive rates;
- active suppressions with owners and expiry dates;
- pages and states represented in scheduled scans; and
- supported browser and assistive-technology combinations tested recently.

Avoid presenting a scanner score or automated pass rate as a conformance
percentage. Record the exact scope and denominator for every metric.

## Exceptions and Bypasses

A bypass may be necessary for an unavailable service, false positive, urgent
security fix, or documented platform limitation. It should not silently erase
the finding.

Record:

- the affected user task and impact;
- the failed or skipped check;
- reason and evidence;
- project severity and release decision;
- workaround and limitations;
- linked issue and accountable owner;
- expiry or review date; and
- remediation and retest plan.

Review bypass authority in repository rules. Do not allow a bot or generated
patch to approve its own exception.

## Definition of Done

- [ ] Accessibility acceptance criteria were defined before implementation.
- [ ] Fast local commands and CI use the same reviewed configuration.
- [ ] Optional hooks are documented, bounded, and repeated in CI.
- [ ] Required checks are actually enforced by current repository rules.
- [ ] Required workflows report a stable result for applicable pull requests.
- [ ] Dependencies, actions, browsers, and rule sets are pinned and recorded.
- [ ] Relevant component states and complete user tasks are covered.
- [ ] Final rendered, transformed, sanitized, optimized, or exported output is
  tested.
- [ ] Applicable browsers, themes, preferences, and viewports are covered.
- [ ] Manual and assistive-technology testing was completed or handed off
  precisely.
- [ ] Findings include actionable, accessible evidence.
- [ ] New Critical and High barriers are not knowingly introduced.
- [ ] Suppressions, exceptions, and bypasses are narrow, owned, and dated.
- [ ] Workflow permissions, secrets, untrusted input, and artifacts were
  reviewed.
- [ ] Scheduled and production feedback remains in place.
- [ ] Documentation and applicable companion skills are synchronized.

## Related Project Guidance

- [CI/CD Accessibility Best Practices](./CI_CD_ACCESSIBILITY_BEST_PRACTICES.md)
- [Contributing Accessibility](./CONTRIBUTING_A11Y.md)
- [Manual Accessibility Testing](./MANUAL_ACCESSIBILITY_TESTING_GUIDE.md)
- [Accessibility Bug Reporting](./ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES.md)
- [Progressive Enhancement](./PROGRESSIVE_ENHANCEMENT_BEST_PRACTICES.md)
- [Browser Support](../BROWSER_SUPPORT.md)
- [GitHub Accessibility Scanner Integration](./GITHUB_ACCESSIBILITY_SCANNER_INTEGRATION.md)
- [Pre-Commit Sample](./PRE_COMMIT_ACCESSIBILITY_SAMPLE.yaml)
- [Shift-Left Workflow](./A11Y_SHIFT_LEFT_WORKFLOW.yml)
- [Browser Testing Workflow](./BROWSER_TESTING_WORKFLOW.yml)
- [Trusted Sources Registry](./TRUSTED_SOURCES.yaml)

## Primary References

- [WAI: Selecting Web Accessibility Evaluation Tools](https://www.w3.org/WAI/test-evaluate/tools/selecting/)
- [WAI: Involving Users in Evaluation](https://www.w3.org/WAI/test-evaluate/involving-users/)
- [WAI: WCAG-EM Overview](https://www.w3.org/WAI/test-evaluate/conformance/wcag-em/)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Playwright: Accessibility Testing](https://playwright.dev/docs/accessibility-testing)
- [Deque: axe-core Playwright API](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/playwright)
- [pre-commit Documentation](https://pre-commit.com/)
- [lint-staged Documentation](https://github.com/lint-staged/lint-staged)
- [GitHub: Troubleshooting Required Status Checks](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/troubleshooting-required-status-checks)
- [GitHub: Rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets)
- [GitHub Actions Secure Use Reference](https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions)

Version-sensitive claims and companion assets last reviewed: 2026-07-19.

---

This document is available under the repository's [MIT License](../LICENSE).
