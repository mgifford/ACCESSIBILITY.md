# ACCESSIBILITY.md

> **The open standard for project accessibility transparency, governance, and AI-assisted inclusion.**

Just as `SECURITY.md` defines how to handle vulnerabilities, **`ACCESSIBILITY.md`** defines the inclusive state of a project. It is a machine-readable and human-navigable manifest that tracks a project’s commitment to accessibility (a11y) through metrics, guardrails, and automated enforcement.

## Quick Links

- Installation: [INSTALL.txt](./INSTALL.txt)

---

## 🚀 Why This Exists

Modern software is built by two groups: **Humans** and **AI Agents**. Currently, neither has a reliable place to look for a project's accessibility "Source of Truth."

1.  **For Users:** It provides transparency on what works, what doesn't, and how to report barriers.
2.  **For Maintainers:** It standardizes how a11y debt is tracked and how contributors are expected to code.
3.  **For AI Agents:** It provides explicit "System Instructions" for LLMs (like Copilot, Cursor, or GPT-4) to ensure they don't generate inaccessible code patterns.

---

## 🛠 The Framework

An effective `ACCESSIBILITY.md` file acts as a **Living Commitment**, covering three core pillars:

### 1. Transparency & Disclosure
* **Conformance Level:** Current WCAG status (e.g., 2.2 AA).
* **Known Gaps:** Honest disclosure of current barriers.
* **Assistive Tech:** Actively tested with.

### 2. Operational Governance
* **Taxonomy:** Standardized labels for issues (e.g., `accessibility`, `color-contrast`).
* **Definition of Done:** Requirement that no PR is merged without passing a11y linting.
* **Severity Matrix:** How a11y bugs are prioritized compared to feature requests.

### 3. Automated Guardrails (The AI Bridge)
* **CI/CD Integration:** Links to workflows running `axe-core` or `Lighthouse`.
* **Axe Rules Coverage:** Explicit mapping of which rules are automated ([Example](./examples/AXE_RULES_COVERAGE.md)).
* **GitHub Accessibility Scanner:** AI-powered accessibility scans with issue creation via `github/accessibility-scanner` ([Integration Guide](./examples/GITHUB_ACCESSIBILITY_SCANNER_INTEGRATION.md)).
* **Shift-Left Prevention:** Stop accessibility regressions before merge with pre-commit hooks and CI gates ([Guide](./examples/SHIFT_LEFT_ACCESSIBILITY_AUTOMATION.md)).
* **Copy-Ready Samples:** Starter files for CI and local guardrails ([Workflow](./examples/A11Y_SHIFT_LEFT_WORKFLOW.yml), [pre-commit config](./examples/PRE_COMMIT_ACCESSIBILITY_SAMPLE.yaml)).
* **Trusted Source Registry:** Machine-readable list of vetted accessibility references for AI retrieval and citation policies ([YAML](./examples/TRUSTED_SOURCES.yaml)), including [wai-yaml-ld](https://github.com/mgifford/wai-yaml-ld) for structured WCAG/ARIA/ATAG standards data.
* **Link Integrity Checks:** Scheduled and PR-time validation of documentation links ([Workflow](./.github/workflows/link-check.yml)).
* **Best Practice Reference:** Project-specific guidance for complex components like [SVGs](./examples/SVG_ACCESSIBILITY_BEST_PRACTICES.md), [Mermaid diagrams](./examples/MERMAID_ACCESSIBILITY_BEST_PRACTICES.md), [keyboard interactions](./examples/KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md), and [forms](./examples/FORMS_ACCESSIBILITY_BEST_PRACTICES.md).

---

## 📊 The "Living Metric" Table
We recommend including a dynamic table in your file to track progress. This turns a static statement into a measurable pulse.

| Metric | Status / Source |
| :--- | :--- |
| **A11y Issue Health** | `Open: 12` / `Closed (Last 30d): 8` |
| **Automated Pass Rate** | `96%` (via GitHub Actions) |
| **CI/CD Enforcement** | 🛑 **Strict** (Build fails on a11y errors) |
| **Contributor Guide** | [Read the A11y Guide](./examples/CONTRIBUTING_A11Y.md) |

---

## 📖 How to Use This Repo

This repository provides templates and guidance to help you implement `ACCESSIBILITY.md` in your own projects.

### Key Files

* **[ACCESSIBILITY.md](./ACCESSIBILITY.md):** This repository's own accessibility commitment and standards
* **[SUSTAINABILITY.md](./SUSTAINABILITY.md):** Digital sustainability policy including AI usage guidelines
* **[AGENTS.md](./AGENTS.md):** Instructions for AI coding assistants
* **[CONTRIBUTING.md](./CONTRIBUTING.md):** How to contribute, including accessibility accommodations

### Local install and build

For local setup and Jekyll build instructions, see [INSTALL.txt](./INSTALL.txt).

### Repository Structure

* **/templates:** Copy-paste Markdown templates for different project types (Web Apps, Libraries, Docs).
* **/spec:** The technical specification for making these files machine-readable.
* **/examples:** Reference docs for scanner integration, automation policy, and component-specific best practices.
* **/examples/README.md:** Human-friendly index of example files and prompt starter.
* **/prompt-generator.md:** Lightweight form-based generator for copy/download-ready ACCESSIBILITY.md prompts.
* **/action-playbook.md:** Practical workflow guide for teams and AI agents to implement accessibility through measurable, repeatable actions.
* **/tools:** GitHub Action snippets to automate the metrics in your manifest.

---

## 🤖 AI Agent Integration

To ensure your AI coding assistant respects your accessibility and sustainability standards, add this to your `.cursorrules`, `AGENTS.md`, or system prompt:

> *"Before modifying or creating UI components, read `ACCESSIBILITY.md` and `SUSTAINABILITY.md`. Ensure all changes comply with WCAG 2.2 AA standards and follow the component-specific best practices in the examples directory. Optimize assets and use AI judiciously."*

For a comprehensive guide on AI agent instructions for this project, see [AGENTS.md](./AGENTS.md).

### Machine-Readable Standards for AI

For LLMs to provide more accurate, standards-grounded accessibility guidance, consider using [**wai-yaml-ld**](https://github.com/mgifford/wai-yaml-ld) as a structured source of truth. This repository provides machine-readable YAML/JSON-LD artifacts of W3C WAI standards (WCAG, ATAG, UAAG, ARIA, HTML, CSS) that help AI agents:
* Map implementation choices to specific standards relationships
* Separate normative vs informative references
* Produce auditable, standards-aligned recommendations
* Explain the reasoning behind accessibility advice

---

## 🤝 Contributing

We are looking for feedback on the taxonomy and automation workflows. 
* **Read the guide:** See [CONTRIBUTING.md](./CONTRIBUTING.md).
* **Found a gap?** Open an issue.
* **Have a better workflow?** Send a PR.
* **Using this?** Let us know so we can add you to the "Adopters" list.

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---

**Would you like me to generate a sample `specification.md` next to define the exact Markdown headings and data structures for this standard?**
