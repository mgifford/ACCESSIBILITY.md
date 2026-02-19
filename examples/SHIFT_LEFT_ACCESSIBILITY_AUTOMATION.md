# Shift-Left Accessibility Automation

This guide focuses on preventing accessibility issues from entering commits in the first place.

## Core principle

Catch issues as early as possible:

1. In-editor and local linting
2. Pre-commit checks
3. Pull request CI gates
4. Scheduled full-site scans

## 1) Local developer checks

Minimum local checks before commit:

- Accessibility-focused lint rules (framework-specific where applicable).
- Unit/component accessibility checks (for UI components).
- Fast smoke checks for obvious violations.

## 2) Pre-commit gate (recommended)

Run accessibility checks only on changed files to keep feedback fast.

Typical approach:

- Use `pre-commit` (Python) or `husky` + `lint-staged` (Node).
- Block commit when accessibility checks fail.
- Keep checks deterministic and under ~30-60 seconds.

## 3) PR gate in CI

- Re-run accessibility checks in CI for trust and consistency.
- Fail PR checks on blocking accessibility regressions.
- Publish actionable results and artifact links.

## 4) Scheduled depth scans

- Run deeper scans on a schedule (nightly/weekly).
- Use issue automation to create and label findings.
- Trend metrics over time in your `ACCESSIBILITY.md` table.

## Policy model to encourage adoption

- **Fast fail locally:** contributors get immediate feedback before push.
- **Strict PR enforcement:** no merge with blocking accessibility failures.
- **Transparent metrics:** show pass rate, open defects, and remediation trend.
- **Waiver discipline:** only time-bound waivers with explicit owner and expiry.

## Suggested Definition of Done addition

> No UI-impacting commit is accepted unless local/pre-commit accessibility checks pass and PR CI accessibility checks are green.

## References

- CivicActions article: https://accessibility.civicactions.com/posts/how-we-scale-inclusive-website-content-with-automated-testing-and-open-source-tools
- GitHub AI-powered Accessibility Scanner: https://github.com/github/accessibility-scanner
