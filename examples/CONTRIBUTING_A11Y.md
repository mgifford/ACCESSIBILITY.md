---
title: Contributing Accessibility Guide
---

# Contributing Accessibility Guide

This guide defines minimum accessibility expectations for all contributions.

## Scope

Applies to:

- UI components
- Content and documentation with interactive examples
- Visualizations and diagrams
- Forms and workflows

## Before Opening a PR

- Read [ACCESSIBILITY-template.md](../ACCESSIBILITY-template.md) and project-specific guidance in this repository.
- Review component references in the `examples/` directory.
- Ensure your changes do not introduce new accessibility regressions.

## Required Checks

Contributors must pass:

1. Local accessibility checks (lint/tests) before commit.
2. Pre-commit accessibility checks where configured.
3. PR CI accessibility checks.

See:

- [Shift-Left Accessibility Automation](./SHIFT_LEFT_ACCESSIBILITY_AUTOMATION.md)
- [A11Y Shift-Left Workflow](./A11Y_SHIFT_LEFT_WORKFLOW.yml)

## Definition of Done (A11y)

A change is complete only when:

- Keyboard access is verified.
- Focus behavior is visible and logical.
- Form labels, errors, and status messages are accessible.
- Automated checks pass.
- Any known exception is documented with owner and expiry.

## Severity and Escalation

- Critical and High accessibility defects should block merge.
- Medium and Low issues require documented follow-up in tracked issues.

## PR Checklist (Suggested)

- [ ] Keyboard-only interaction tested
- [ ] Screen reader behavior spot-checked for changed flows
- [ ] Color/contrast requirements reviewed
- [ ] Relevant docs in `examples/` updated
- [ ] No broken links in Markdown docs

## Related References

- [Keyboard Accessibility Best Practices](./KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md)
- [Forms Accessibility Best Practices](./FORMS_ACCESSIBILITY_BEST_PRACTICES.md)
- [SVG Accessibility Best Practices](./SVG_ACCESSIBILITY_BEST_PRACTICES.md)
- [Mermaid Accessibility Best Practices](./MERMAID_ACCESSIBILITY_BEST_PRACTICES.md)
