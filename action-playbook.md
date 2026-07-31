---
layout: page
title: Action Playbook
meta_title: Action Playbook · ACCESSIBILITY.md
description: A practical playbook for teams and AI agents to improve accessibility through measurable, repeatable actions.
lede: Use this page to turn accessibility principles into everyday engineering and content decisions. Start small, measure consistently, and improve every cycle.
source_url: https://github.com/mgifford/ACCESSIBILITY.md
---

## What this page is for

This playbook translates accessibility principles into repeatable actions for humans and AI coding agents.
It is intentionally practical: short checklists, clear ownership, and measurable outcomes.

## Operating principles

- Measure before and after changes.
- Prefer semantic HTML over complex ARIA patterns.
- Keep interfaces keyboard-navigable and screen reader friendly.
- Treat accessibility as an operational quality, like reliability and security.
- Improve continuously rather than waiting for perfect compliance.

## Rollout approach

### Phase 1: Starter commitment + CI gates first

- Publish a short public commitment in `ACCESSIBILITY.md`.
- Run axe-core or Lighthouse on every PR against the live site URL as an early indicator, not a conformance gate. A Lighthouse accessibility score is not a WCAG conformance result; it does not test keyboard operation, focus order, or assistive technology behavior.
- Start with a realistic warning threshold (for example this repository's own `minScore: 0.9` accessibility score in [`.lighthouserc.json`](.lighthouserc.json)) to catch meaningful issues while stabilizing signal quality, before treating any threshold as a merge-blocking gate.

### Phase 2: Full template adoption after ownership is clear

- Add full sections for ownership, scope, exceptions, and governance.
- Establish metric baselines and monthly targets per owner.
- Tighten automated thresholds progressively as reviewed regressions are resolved. Raise a warning to a blocking gate only for a specific, deterministic, confirmed failure — never for an aggregate score across categories a tool does not test for WCAG conformance.

## Weekly workflow (team)

### 1) Plan with accessibility in mind

- Tag work items with accessibility impact labels (for example: `a11y`, `keyboard-nav`, `screen-reader`, `color-contrast`, `aria`).
- Identify one expected accessibility improvement for each change (for example: better semantic markup, improved keyboard navigation, reduced cognitive load).
- Assign an owner for measurement and follow-up.

### 2) Build with accessible defaults

- Prefer semantic HTML elements over generic divs with ARIA.
- Ensure all interactive elements are keyboard accessible.
- Provide text alternatives for non-text content.
- Use sufficient color contrast and don't rely on color alone.
- Keep third-party dependencies to a justified minimum and verify their accessibility.

### 3) Review with an accessibility gate

- Verify no confirmed regressions in automated accessibility checks, and confirm keyboard navigation and screen reader support with manual testing where automated coverage cannot verify them.
- Require explicit justification for complex ARIA patterns when semantic HTML suffices.
- Block merges only on confirmed, deterministic failures against a reviewed baseline; treat an aggregate score drop as an indicator to investigate, not an automatic block.
- Review axe-core or Lighthouse trendlines each month and ratchet warning thresholds upward as issues are resolved.

## Monthly cadence (team)

### 1) Baseline and trend review

- Review key accessibility metrics trend lines (not only single-point snapshots).
- Compare current values against targets and previous month.
- Document top regressions and top improvements.

### 2) Focused accessibility sprint

- Pick the highest-impact accessibility barrier first (keyboard trap, missing labels, color contrast issue, complex navigation).
- Ship one or two concrete fixes with before/after evidence.
- Update standards/checklists to prevent recurrence.

### 3) Policy and knowledge updates

- Update this policy and related docs as architecture and tools change.
- Share wins, misses, and trade-offs with the broader team.
- Keep training lightweight but recurring.

## AI agent playbook

### Default behavior

- Always prefer semantic HTML elements over divs with ARIA roles.
- Ensure all generated components are keyboard accessible by default.
- Include appropriate ARIA labels only when semantic HTML is insufficient.
- Generate accessible names for all interactive elements.

### Allowed high-value AI use

- Accessibility audit analysis and remediation planning.
- Generation of accessible component patterns from design specifications.
- Summarization of WCAG guidelines for specific contexts.
- Triage tasks that reduce repeated accessibility testing effort.

### Restricted use

- No generation of complex ARIA patterns without explicit review.
- No AI-generated image alt text without human verification.
- No automated fixes to accessibility violations without validation.
- No AI generation when established accessible component patterns exist.

### AI logging and accountability

- Record AI-assisted accessibility tasks in PR descriptions when relevant.
- Track AI-generated accessibility improvements and issues per PR.
- Review usage trends monthly and ensure quality over quantity.

## Accessibility-aware operations

### Testing priorities

- Test with keyboard navigation first in every PR.
- Run automated accessibility checks before manual testing.
- Define safe coverage thresholds to protect user experience.

### Assistive technology testing

- Establish baseline screen reader testing schedule (weekly or per release).
- Document which assistive technologies are actively tested.
- Use both automated and manual testing to catch all barrier types.

### Keep constraints explicit

- **Document browser and assistive technology support matrix** - See [Browser Support Policy](./BROWSER_SUPPORT.md) for a comprehensive template including:
  - Browser version support guarantees (last 2 major versions recommended)
  - Browser + assistive technology testing combinations
  - Automated testing requirements across browsers
  - Known browser-specific accessibility issues
- Focus optimization efforts where control is real and measurable.
- Be transparent about known gaps and remediation timelines.

## Suggested scorecard

Track at least these indicators:

- WCAG conformance level (A, AA, or AAA).
- Automated accessibility test pass rate.
- Number of open accessibility issues by severity.
- Keyboard navigation coverage percentage.
- Screen reader compatibility test results.
- Average time to resolve accessibility issues.

## 30-day starter checklist

- Week 1: Define 3-5 accessibility metrics and establish baseline.
- Week 2: Add CI checks for accessibility violations and regressions.
- Week 3: Fix one major accessibility barrier (keyboard trap, missing labels, contrast issue).
- Week 4: Publish results and set next-month targets.

Progress over perfection: repeat the cycle and make each month more accessible than the last.
