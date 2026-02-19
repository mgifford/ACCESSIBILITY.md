# Accessibility Commitment (ACCESSIBILITY.md)

## 1. Our Commitment
We believe accessibility is a subset of quality. This project commits to **WCAG 2.2 AA** standards. We track our progress publicly to remain accountable to our users.

## 2. Real-Time Health Metrics
| Metric | Status / Value |
| :--- | :--- |
| **Open A11y Issues** | [Link to GitHub Filter] |
| **Avg. Time to Fix (A11y)** | 14 Days |
| **Automated Test Pass Rate** | 98% (via axe-core) |
| **A11y PRs Merged (MTD)** | 5 |

## 3. Contributor Requirements (The Guardrails)
To contribute to this repo, you must follow these guidelines:
- **Testing:** All UI changes must be tested with [Axe DevTools].
- **Documentation:** Follow our [SVG Accessibility Best Practices](./SVG_ACCESSIBILITY_BEST_PRACTICES.md).
- **CI/CD:** PRs will fail if they introduce violations detected by our `a11y-lint` workflow.

## 4. Reporting & Severity Taxonomy
Please use our [Accessibility Issue Template]. We prioritize based on:
- **Critical:** Prevents a user from completing a core task (e.g., "Cannot checkout").
- **High:** Significant difficulty, but a workaround exists.
- **Medium:** Annoyance or inconsistent experience.

## 5. Automated Check Coverage
We track our automated testing rules against the [Axe Rules Reference](./AXE_RULES_REFERENCE.md). 
Currently, **72%** of our accessibility requirements are guarded by CI.