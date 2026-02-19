# GitHub Accessibility Scanner Integration

This guide shows how to integrate GitHub's AI-powered Accessibility Scanner into your repository as part of your `ACCESSIBILITY.md` guardrails.

## Why include this

- Adds recurring and on-demand accessibility scans in GitHub Actions.
- Creates trackable issues for discovered barriers.
- Supports AI-assisted remediation workflows.

## Recommended baseline workflow

Use the official action:

- `github/accessibility-scanner@v2`

Typical setup:

1. Run on a schedule (for continuous monitoring).
2. Optionally run on `workflow_dispatch` for manual scans.
3. Configure target URL, auth details (if needed), and repository token secret.
4. Route findings into issues with your accessibility labels/taxonomy.

## Governance requirements

- Define severity handling in `ACCESSIBILITY.md` (Critical/High/Medium/Low).
- Require triage of scanner-created issues within your SLA window.
- Track scanner findings in your living metrics table.

## Authentication notes

- The scanner requires a token with appropriate repository permissions.
- The default `GITHUB_TOKEN` is not sufficient for this action's issue/PR workflows.
- For authenticated scans, support login flows or provide persisted auth context.

## Suggested policy statement

Add language like this to your project manifest:

> We run `github/accessibility-scanner` on a recurring schedule and treat scanner findings as first-class accessibility defects. New high-severity regressions block release until resolved or explicitly waived.

## Source

- GitHub repository: https://github.com/github/accessibility-scanner
