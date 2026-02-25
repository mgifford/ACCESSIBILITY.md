# ACCESSIBILITY.md

> **The open standard for project accessibility transparency, governance, and AI-assisted inclusion.**

Just as `SECURITY.md` defines how to handle vulnerabilities, **`ACCESSIBILITY.md`** defines the inclusive state of a project. It is a human and machine-readable manifest that tracks a project’s commitment to accessibility (a11y) through metrics, guardrails, and automated enforcement.

---

## 🚀 Quick Start

**New to this project?** Here's what you need:

1. **Copy the template** → Start with [ACCESSIBILITY-template.md](./ACCESSIBILITY-template.md)
2. **Add CI workflows** → Copy from [examples/](./examples/) directory
3. **Configure AI agents** → Use [AGENTS.md](./AGENTS.md) as a guide
4. **Read the framework** → Continue below to understand the approach

**Looking for specific files?** See the [Repository Structure](#-repository-structure) below.

**Additional resources:**
- Installation: [INSTALL.txt](./INSTALL.txt)
- Procurement: [Section 508 Requirements for Government Contracts](https://github.com/CivicActions/open-practice/blob/main/open-requirements-library/accessibility.md)

---

## 📁 Repository Structure

This repository is organized to separate **content you adopt** from **project documentation**:

```
[Repository Root]
├── ACCESSIBILITY-template.md       ← Start here: Copy this template
├── ACCESSIBILITY.md                ← Our own accessibility commitment
├── AGENTS.md                       ← AI agent instructions (copy/adapt)
├── CONTRIBUTING.md                 ← How to contribute to this project
├── SUSTAINABILITY.md               ← Sustainability policy
├── BROWSER_SUPPORT.md              ← Browser support guidelines
├── README.md                       ← This file
│
├── examples/                       ← Copy these to your project
│   ├── A11Y_SHIFT_LEFT_WORKFLOW.yml          ← GitHub Actions workflow
│   ├── PRE_COMMIT_ACCESSIBILITY_SAMPLE.yaml  ← Pre-commit hooks
│   ├── TRUSTED_SOURCES.yaml                  ← Vetted a11y resources
│   ├── SVG_ACCESSIBILITY_BEST_PRACTICES.md   ← Component guides
│   ├── FORMS_ACCESSIBILITY_BEST_PRACTICES.md
│   ├── KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md
│   ├── LIGHT_DARK_MODE_ACCESSIBILITY_BEST_PRACTICES.md
│   ├── MANUAL_ACCESSIBILITY_TESTING_GUIDE.md
│   ├── MERMAID_ACCESSIBILITY_BEST_PRACTICES.md
│   ├── AXE_RULES_COVERAGE.md                 ← Automation reference
│   ├── SHIFT_LEFT_ACCESSIBILITY_AUTOMATION.md
│   └── README.md                             ← Examples index
│
├── .github/workflows/              ← This repo's automation (reference)
│   ├── link-check.yml              ← Weekly link validation
│   └── maintain-trusted-sources.yml ← Monthly TRUSTED_SOURCES maintenance
├── _layouts/                       ← Jekyll theme (for documentation site)
├── _config.yml                     ← Jekyll config (for documentation site)
├── assets/                         ← Site assets (for documentation site)
├── index.md                        ← Landing page (for documentation site)
├── prompt-generator.md             ← Interactive prompt builder
└── action-playbook.md              ← Practical workflow guide
```

**Key:**
- ✅ **Copy to your project**: `ACCESSIBILITY-template.md`, files in `examples/`
- 📖 **Read for guidance**: `README.md`, `AGENTS.md`, `CONTRIBUTING.md`
- 🛠️ **Jekyll/docs site**: `_layouts/`, `_config.yml`, `assets/`, `index.md`

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
* **Trusted Source Registry:** Machine-readable list of vetted accessibility references for AI retrieval and citation policies ([YAML](./examples/TRUSTED_SOURCES.yaml)), including [wai-yaml-ld](https://github.com/mgifford/wai-yaml-ld) for structured WCAG/ARIA/ATAG standards data and [CivicActions Open Requirements Library](https://github.com/CivicActions/open-practice/blob/main/open-requirements-library/accessibility.md) for procurement requirements.
* **Link Integrity Checks:** Scheduled and PR-time validation of documentation links ([Workflow](./.github/workflows/link-check.yml)).
* **Best Practice Reference:** Project-specific guidance for complex components like [SVGs](./examples/SVG_ACCESSIBILITY_BEST_PRACTICES.md), [Mermaid diagrams](./examples/MERMAID_ACCESSIBILITY_BEST_PRACTICES.md), [keyboard interactions](./examples/KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md), [light/dark modes](./examples/LIGHT_DARK_MODE_ACCESSIBILITY_BEST_PRACTICES.md), and [forms](./examples/FORMS_ACCESSIBILITY_BEST_PRACTICES.md).
* **Manual Testing Guide:** Comprehensive procedures for keyboard-only and screen reader testing, with step-by-step workflows for validating accessibility beyond automated tools ([Guide](./examples/MANUAL_ACCESSIBILITY_TESTING_GUIDE.md)).

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

## 📖 How to Adopt This in Your Project

This repository provides templates and guidance to help you implement `ACCESSIBILITY.md` in your own projects.

### Step 1: Add ACCESSIBILITY.md to Your Repository

**Option A: Start with the template**
1. Copy [ACCESSIBILITY-template.md](./ACCESSIBILITY-template.md) to your repository root
2. Rename it to `ACCESSIBILITY.md`
3. Customize the sections to match your project's current state
4. Link it from your `README.md`

**Option B: Use the interactive prompt generator**
- Visit [prompt-generator.md](./prompt-generator.md) for a form-based tool
- Or use [examples/ACCESSIBILITY_PROMPT_STARTER.md](./examples/ACCESSIBILITY_PROMPT_STARTER.md) for guidance

### Step 2: Set Up GitHub Workflows (CI/CD Automation)

Copy the workflows that match your needs from the `examples/` directory:

**Basic setup:**
```bash
# Copy the main accessibility workflow
cp examples/A11Y_SHIFT_LEFT_WORKFLOW.yml .github/workflows/
```

**Additional workflows:**
- **Browser testing**: Copy `examples/BROWSER_TESTING_WORKFLOW.yml` for multi-browser a11y checks
- **Link checking**: See `.github/workflows/link-check.yml` (already in this repo) as a reference

**Workflow features:**
- ✅ Runs axe-core accessibility tests on every PR
- ✅ Fails builds on critical accessibility issues
- ✅ Provides detailed reports for fixing issues

Learn more: [SHIFT_LEFT_ACCESSIBILITY_AUTOMATION.md](./examples/SHIFT_LEFT_ACCESSIBILITY_AUTOMATION.md)

### Step 3: Configure AI Coding Assistants

Help your AI tools (GitHub Copilot, Cursor, Claude, etc.) respect accessibility standards:

**For Cursor or similar tools:**
1. Copy [AGENTS.md](./AGENTS.md) to your repository root
2. Or create `.cursorrules` with instructions from AGENTS.md
3. Customize component-specific guides as needed

**For GitHub Copilot:**
- Add ACCESSIBILITY.md reference to your project documentation
- Copilot will automatically read it for context

**What AI agents get:**
- WCAG 2.2 AA compliance requirements
- Component-specific best practices (forms, SVGs, diagrams, keyboard, light/dark modes)
- Asset optimization guidelines
- Testing requirements

See the full guide: [AGENTS.md](./AGENTS.md)

### Step 4: Add Pre-Commit Hooks (Optional but Recommended)

Catch accessibility issues before they're committed:

```bash
# Copy the pre-commit configuration
cp examples/PRE_COMMIT_ACCESSIBILITY_SAMPLE.yaml .pre-commit-config.yaml

# Install pre-commit (if not already installed)
pip install pre-commit

# Install the hooks
pre-commit install
```

### Step 5: Add Component-Specific Best Practices

Copy relevant guides to your project's documentation:

- **Forms**: [examples/FORMS_ACCESSIBILITY_BEST_PRACTICES.md](./examples/FORMS_ACCESSIBILITY_BEST_PRACTICES.md)
- **SVGs**: [examples/SVG_ACCESSIBILITY_BEST_PRACTICES.md](./examples/SVG_ACCESSIBILITY_BEST_PRACTICES.md)
- **Keyboard navigation**: [examples/KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md](./examples/KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md)
- **Light/Dark mode**: [examples/LIGHT_DARK_MODE_ACCESSIBILITY_BEST_PRACTICES.md](./examples/LIGHT_DARK_MODE_ACCESSIBILITY_BEST_PRACTICES.md)
- **Mermaid diagrams**: [examples/MERMAID_ACCESSIBILITY_BEST_PRACTICES.md](./examples/MERMAID_ACCESSIBILITY_BEST_PRACTICES.md)
- **Manual testing**: [examples/MANUAL_ACCESSIBILITY_TESTING_GUIDE.md](./examples/MANUAL_ACCESSIBILITY_TESTING_GUIDE.md)

### Step 6: Reference Trusted Sources

Copy the vetted accessibility resources list:

```bash
cp examples/TRUSTED_SOURCES.yaml docs/
```

This provides:
- Machine-readable WCAG standards via [wai-yaml-ld](https://github.com/mgifford/wai-yaml-ld)
- Procurement requirements via [CivicActions Open Requirements Library](https://github.com/CivicActions/open-practice/blob/main/open-requirements-library/accessibility.md)
- Curated accessibility references for AI systems

### Resources for This Repository

**Contributing to this project:**
* **[CONTRIBUTING.md](./CONTRIBUTING.md):** How to contribute, including accessibility accommodations
* **[ACCESSIBILITY.md](./ACCESSIBILITY.md):** This repository's own accessibility commitment
* **[SUSTAINABILITY.md](./SUSTAINABILITY.md):** Digital sustainability and AI usage policy
* **[BROWSER_SUPPORT.md](./BROWSER_SUPPORT.md):** Browser version support guarantees

**Building the documentation site:**
* **[INSTALL.txt](./INSTALL.txt):** Local setup and Jekyll build instructions

**Reference materials:**
* **[action-playbook.md](./action-playbook.md):** Practical workflow guide for teams
* **[examples/README.md](./examples/README.md):** Complete index of all examples

---

## 🔄 Automated Quality Maintenance

### TRUSTED_SOURCES.yaml Monthly Maintenance

The [TRUSTED_SOURCES.yaml](./examples/TRUSTED_SOURCES.yaml) file is automatically maintained via a [monthly GitHub Action](./.github/workflows/maintain-trusted-sources.yml) that:

- **Validates URLs**: Checks for 404 errors with a two-strike removal policy
  - First 404 → marked as "not active"
  - Second 404 → removed from the list
- **Enriches metadata**: Automatically fills in missing owner, license, and freshness information
- **Quality checks**: Validates YAML structure and ensures data consistency
- **Creates PRs**: All changes are reviewed by maintainers before merging

This ensures the trusted resources list remains high-quality and up-to-date without manual maintenance overhead.

📖 **[Full maintenance documentation](./.github/TRUSTED_SOURCES_MAINTENANCE.md)**

---

## 🤖 AI Agent Integration

To ensure your AI coding assistant respects your accessibility standards, add this to your `.cursorrules`, `AGENTS.md`, or system prompt:

> *"Before modifying or creating UI components, read `ACCESSIBILITY.md`. Ensure all changes comply with WCAG 2.2 AA standards and follow the component-specific best practices in the examples directory. Optimize assets and use AI judiciously."*

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
