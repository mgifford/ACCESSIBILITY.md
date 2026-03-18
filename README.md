# ACCESSIBILITY.md

> **The open standard for project accessibility transparency, governance, and AI-assisted inclusion.**

Just as `SECURITY.md` defines how to handle vulnerabilities, **`ACCESSIBILITY.md`** defines the inclusive state of a project. It is a human and machine-readable manifest that tracks a project’s commitment to accessibility (a11y) through metrics, guardrails, and automated enforcement.

---

> [!WARNING]
> **⚠️ Experimental — Validate Before Use**
>
> This project is **still experimental**. Most of the content on this site was generated with AI assistance and **has not yet been fully validated in real-world conditions**. Impacts may vary significantly depending on where and how it is implemented.
>
> **Do not expect that simply adding an `ACCESSIBILITY.md` file will make your digital tool accessible.** What it _can_ do is signal to developers that accessibility matters, and make explicit what your development processes are and how they affect accessibility.
>
> People with direct experience conducting studies on the accessibility impact and cost implications of AI-assisted workflows should be involved before drawing conclusions from this work.
>
> **Please share your experience** — positive or negative — in the [issue queue](https://github.com/mgifford/ACCESSIBILITY.md/issues). Include links and references so claims can be examined and discussed by the community.

---

## 🚀 Quick start

**New to this project?** Here's what you need:

1. **Copy the template** → Start with [ACCESSIBILITY-template.md](./ACCESSIBILITY-template.md)
2. **Add CI workflows** → Copy from [examples/](./examples/) directory
3. **Configure AI agents** → Use [AGENTS.md](./AGENTS.md) as a guide
4. **Read the framework** → Continue below to understand the approach

**Looking for specific files?** See the [Repository Structure](#-repository-structure) below.

**Additional resources:**
- Installation: [INSTALL.txt](./INSTALL.txt)
- Procurement: [Section 508 Requirements for Government Contracts](https://github.com/CivicActions/open-practice/blob/main/open-requirements-library/accessibility.md)
- Comparison with similar projects: [COMPARISON_WITH_KREERC.md](./COMPARISON_WITH_KREERC.md)

---

## 📁 Repository structure

This repository is organized to separate **content you adopt** from **project documentation**:

```
[Repository Root]
├── ACCESSIBILITY-template.md       ← Start here: Copy this template
├── ACCESSIBILITY.md                ← Our own accessibility commitment
├── ACCESSIBILITY.skill             ← AI agent skill (global installation)
├── AGENTS.md                       ← AI agent instructions (copy/adapt)
├── CONTRIBUTING.md                 ← How to contribute to this project
├── SUSTAINABILITY.md               ← Sustainability policy
├── BROWSER_SUPPORT.md              ← Browser support guidelines
├── COMPARISON_WITH_KREERC.md       ← Comparison with similar projects
├── README.md                       ← This file
│
├── opquast-digital-quality/        ← Opquast Digital Quality AI skill
│   ├── SKILL.md                    ← Concise skill (14 categories, 244 rules)
│   └── references/
│       ├── rules-part1.md          ← Rules 1–135 (categories 1–7)
│       └── rules-part2.md          ← Rules 136–244 (categories 8–14)
│
├── examples/                       ← Copy these to your project
│   ├── A11Y_SHIFT_LEFT_WORKFLOW.yml          ← GitHub Actions workflow
│   ├── PRE_COMMIT_ACCESSIBILITY_SAMPLE.yaml  ← Pre-commit hooks
│   ├── TRUSTED_SOURCES.yaml                  ← Vetted a11y resources
│   ├── AUDIO_VIDEO_ACCESSIBILITY_BEST_PRACTICES.md ← Component guides
│   ├── ANCHOR_LINKS_ACCESSIBILITY_BEST_PRACTICES.md
│   ├── CI_CD_ACCESSIBILITY_BEST_PRACTICES.md
│   ├── CONTENT_DESIGN_ACCESSIBILITY_BEST_PRACTICES.md
│   ├── SVG_ACCESSIBILITY_BEST_PRACTICES.md
│   ├── FORMS_ACCESSIBILITY_BEST_PRACTICES.md
│   ├── KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md
│   ├── LIGHT_DARK_MODE_ACCESSIBILITY_BEST_PRACTICES.md
│   ├── USER_PERSONALIZATION_ACCESSIBILITY_BEST_PRACTICES.md
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
- ✅ **Copy to your project**: `ACCESSIBILITY-template.md`, `ACCESSIBILITY.skill`, files in `examples/`
- 🤖 **Install globally in AI agents**: `ACCESSIBILITY.skill` or `opquast-digital-quality/SKILL.md` — see [Step 3: Configure AI coding assistants](#step-3-configure-ai-coding-assistants) below
- 📖 **Read for guidance**: `README.md`, `AGENTS.md`, `CONTRIBUTING.md`, `COMPARISON_WITH_KREERC.md`
- 🛠️ **Jekyll/docs site**: `_layouts/`, `_config.yml`, `assets/`, `index.md`

---

## 🚀 Why this exists

Modern software is built by two groups: **Humans** and **AI Agents**. Currently, neither has a reliable place to look for a project's accessibility "Source of Truth."

1.  **For Users:** It provides transparency on what works, what doesn't, and how to report barriers.
2.  **For Maintainers:** It standardizes how a11y debt is tracked and how contributors are expected to code.
3.  **For AI Agents:** It provides explicit "System Instructions" for LLMs (like Copilot, Cursor, or GPT-4) to ensure they don't generate inaccessible code patterns.

---

## 🛠 The framework

An effective `ACCESSIBILITY.md` file acts as a **Living Commitment**, covering three core pillars:

### 1. Transparency and disclosure
* **Conformance Level:** Current WCAG status (e.g., 2.2 AA).
* **Known Gaps:** Honest disclosure of current barriers.
* **Assistive Tech:** Actively tested with.

### 2. Operational governance
* **Taxonomy:** Standardized labels for issues (e.g., `accessibility`, `color-contrast`).
* **Definition of Done:** Requirement that no PR is merged without passing a11y linting.
* **Severity Matrix:** How a11y bugs are prioritized compared to feature requests.

### 3. Automated guardrails (the AI bridge)
* **CI/CD Integration:** Links to workflows running `axe-core` or `Lighthouse`.
* **Axe Rules Coverage:** Explicit mapping of which rules are automated ([Example](./examples/AXE_RULES_COVERAGE.md)).
* **GitHub Accessibility Scanner:** AI-powered accessibility scans with issue creation via `github/accessibility-scanner` ([Integration Guide](./examples/GITHUB_ACCESSIBILITY_SCANNER_INTEGRATION.md)).
* **Shift-Left Prevention:** Stop accessibility regressions before merge with pre-commit hooks and CI gates ([Guide](./examples/SHIFT_LEFT_ACCESSIBILITY_AUTOMATION.md)).
* **Copy-Ready Samples:** Starter files for CI and local guardrails ([Workflow](./examples/A11Y_SHIFT_LEFT_WORKFLOW.yml), [pre-commit config](./examples/PRE_COMMIT_ACCESSIBILITY_SAMPLE.yaml)).
* **Trusted Source Registry:** Machine-readable list of vetted accessibility references for AI retrieval and citation policies ([YAML](./examples/TRUSTED_SOURCES.yaml)), including [wai-yaml-ld](https://github.com/mgifford/wai-yaml-ld) for structured WCAG/ARIA/ATAG standards data and [CivicActions Open Requirements Library](https://github.com/CivicActions/open-practice/blob/main/open-requirements-library/accessibility.md) for procurement requirements.
* **Link Integrity Checks:** Scheduled and PR-time validation of documentation links ([Workflow](./.github/workflows/link-check.yml)).
* **Best Practice Reference:** Project-specific guidance for complex components like [CI/CD pipelines](./examples/CI_CD_ACCESSIBILITY_BEST_PRACTICES.md), [audio/video](./examples/AUDIO_VIDEO_ACCESSIBILITY_BEST_PRACTICES.md), [anchor links](./examples/ANCHOR_LINKS_ACCESSIBILITY_BEST_PRACTICES.md), [content design](./examples/CONTENT_DESIGN_ACCESSIBILITY_BEST_PRACTICES.md), [SVGs](./examples/SVG_ACCESSIBILITY_BEST_PRACTICES.md), [Mermaid diagrams](./examples/MERMAID_ACCESSIBILITY_BEST_PRACTICES.md), [keyboard interactions](./examples/KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md), [light/dark modes](./examples/LIGHT_DARK_MODE_ACCESSIBILITY_BEST_PRACTICES.md), [user personalization](./examples/USER_PERSONALIZATION_ACCESSIBILITY_BEST_PRACTICES.md), [forms](./examples/FORMS_ACCESSIBILITY_BEST_PRACTICES.md), [maps](./examples/MAPS_ACCESSIBILITY_BEST_PRACTICES.md), [charts and graphs](./examples/CHARTS_GRAPHS_ACCESSIBILITY_BEST_PRACTICES.md), [tooltips](./examples/TOOLTIP_ACCESSIBILITY_BEST_PRACTICES.md), and [digital quality (Opquast)](./examples/OPQUAST_DIGITAL_QUALITY_BEST_PRACTICES.md).
* **Manual Testing Guide:** Comprehensive procedures for keyboard-only and screen reader testing, with step-by-step workflows for validating accessibility beyond automated tools ([Guide](./examples/MANUAL_ACCESSIBILITY_TESTING_GUIDE.md)).

---

## 📊 The "living metric" table
We recommend including a dynamic table in your file to track progress. This turns a static statement into a measurable pulse.

| Metric | Status / Source |
| :--- | :--- |
| **A11y Issue Health** | `Open: 12` / `Closed (Last 30d): 8` |
| **Automated Pass Rate** | `96%` (via GitHub Actions) |
| **CI/CD Enforcement** | 🛑 **Strict** (Build fails on a11y errors) |
| **Contributor Guide** | [Read the A11y Guide](./examples/CONTRIBUTING_A11Y.md) |

---

## 📖 How to adopt this in your project

This repository provides templates and guidance to help you implement `ACCESSIBILITY.md` in your own projects.

### Step 1: Add ACCESSIBILITY.md to your repository

**Option A: Start with the template**
1. Copy [ACCESSIBILITY-template.md](./ACCESSIBILITY-template.md) to your repository root
2. Rename it to `ACCESSIBILITY.md`
3. Customize the sections to match your project's current state
4. Link it from your `README.md`

**Option B: Use the interactive prompt generator**
- Visit [prompt-generator.md](./prompt-generator.md) for a form-based tool
- Or use [examples/ACCESSIBILITY_PROMPT_STARTER.md](./examples/ACCESSIBILITY_PROMPT_STARTER.md) for guidance

### Step 2: Set up GitHub workflows (CI/CD automation)

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

### Step 3: Configure AI coding assistants

Help your AI tools (GitHub Copilot, Cursor, Claude, Codex, etc.) respect accessibility standards:

**Install the AI agent skill globally (recommended):**

Two portable skills are available for global installation:

- **[`ACCESSIBILITY.skill`](./ACCESSIBILITY.skill)** — full accessibility governance framework (WCAG 2.2 AA, semantic HTML, ARIA, CI/CD)
- **[`opquast-digital-quality/SKILL.md`](./opquast-digital-quality/SKILL.md)** — Opquast Digital Quality framework (245 rules across 14 categories: content, security, forms, performance, and more)

Ask any agent (Claude Code, Codex, Opencode, etc.) to install either or both directly:

```text
Install the skill from https://github.com/mgifford/ACCESSIBILITY.md globally.
```

For [Codex](https://github.com/openai/codex) (OpenAI's AI coding agent CLI), run this one-liner to install the accessibility skill globally into `/etc/codex/skills`:

```bash
TMP_DIR="$(mktemp -d)" && curl -fsSL "https://github.com/mgifford/ACCESSIBILITY.md/archive/refs/heads/main.zip" -o "$TMP_DIR/main.zip" && unzip -q "$TMP_DIR/main.zip" -d "$TMP_DIR" && sudo mkdir -p /etc/codex/skills/accessibility-md && sudo cp "$TMP_DIR/ACCESSIBILITY.md-main/ACCESSIBILITY.skill" /etc/codex/skills/accessibility-md/ && rm -rf "$TMP_DIR"
```

To install the Opquast skill for Codex:

```bash
TMP_DIR="$(mktemp -d)" && curl -fsSL "https://github.com/mgifford/ACCESSIBILITY.md/archive/refs/heads/main.zip" -o "$TMP_DIR/main.zip" && unzip -q "$TMP_DIR/main.zip" -d "$TMP_DIR" && sudo mkdir -p /etc/codex/skills/opquast-digital-quality && sudo cp -R "$TMP_DIR/ACCESSIBILITY.md-main/opquast-digital-quality" /etc/codex/skills/ && rm -rf "$TMP_DIR"
```

> **Security note:** Review downloaded files before running `sudo cp`. Inspect the extracted files in `$TMP_DIR` after the download step. Only run `sudo` commands after verifying the file contents are as expected.

**For project-level configuration:**

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

### Step 4: Add pre-commit hooks (optional but recommended)

Catch accessibility issues before they're committed:

```bash
# Copy the pre-commit configuration
cp examples/PRE_COMMIT_ACCESSIBILITY_SAMPLE.yaml .pre-commit-config.yaml

# Install pre-commit (if not already installed)
pip install pre-commit

# Install the hooks
pre-commit install
```

### Step 5: Add component-specific best practices

Copy relevant guides to your project's documentation:

- **Anchor links**: [examples/ANCHOR_LINKS_ACCESSIBILITY_BEST_PRACTICES.md](./examples/ANCHOR_LINKS_ACCESSIBILITY_BEST_PRACTICES.md)
- **Audio/Video**: [examples/AUDIO_VIDEO_ACCESSIBILITY_BEST_PRACTICES.md](./examples/AUDIO_VIDEO_ACCESSIBILITY_BEST_PRACTICES.md)
- **Charts and graphs**: [examples/CHARTS_GRAPHS_ACCESSIBILITY_BEST_PRACTICES.md](./examples/CHARTS_GRAPHS_ACCESSIBILITY_BEST_PRACTICES.md)
- **CI/CD pipelines**: [examples/CI_CD_ACCESSIBILITY_BEST_PRACTICES.md](./examples/CI_CD_ACCESSIBILITY_BEST_PRACTICES.md)
- **Content Design**: [examples/CONTENT_DESIGN_ACCESSIBILITY_BEST_PRACTICES.md](./examples/CONTENT_DESIGN_ACCESSIBILITY_BEST_PRACTICES.md)
- **Forms**: [examples/FORMS_ACCESSIBILITY_BEST_PRACTICES.md](./examples/FORMS_ACCESSIBILITY_BEST_PRACTICES.md)
- **SVGs**: [examples/SVG_ACCESSIBILITY_BEST_PRACTICES.md](./examples/SVG_ACCESSIBILITY_BEST_PRACTICES.md)
- **Keyboard navigation**: [examples/KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md](./examples/KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md)
- **Light/Dark mode**: [examples/LIGHT_DARK_MODE_ACCESSIBILITY_BEST_PRACTICES.md](./examples/LIGHT_DARK_MODE_ACCESSIBILITY_BEST_PRACTICES.md)
- **Tooltips**: [examples/TOOLTIP_ACCESSIBILITY_BEST_PRACTICES.md](./examples/TOOLTIP_ACCESSIBILITY_BEST_PRACTICES.md)
- **User Personalization**: [examples/USER_PERSONALIZATION_ACCESSIBILITY_BEST_PRACTICES.md](./examples/USER_PERSONALIZATION_ACCESSIBILITY_BEST_PRACTICES.md)
- **Mermaid diagrams**: [examples/MERMAID_ACCESSIBILITY_BEST_PRACTICES.md](./examples/MERMAID_ACCESSIBILITY_BEST_PRACTICES.md)
- **Manual testing**: [examples/MANUAL_ACCESSIBILITY_TESTING_GUIDE.md](./examples/MANUAL_ACCESSIBILITY_TESTING_GUIDE.md)
- **Maps**: [examples/MAPS_ACCESSIBILITY_BEST_PRACTICES.md](./examples/MAPS_ACCESSIBILITY_BEST_PRACTICES.md)
- **Progressive enhancement**: [examples/PROGRESSIVE_ENHANCEMENT_BEST_PRACTICES.md](./examples/PROGRESSIVE_ENHANCEMENT_BEST_PRACTICES.md)
- **Digital quality (Opquast)**: [examples/OPQUAST_DIGITAL_QUALITY_BEST_PRACTICES.md](./examples/OPQUAST_DIGITAL_QUALITY_BEST_PRACTICES.md)

### Step 6: Reference trusted sources

Copy the vetted accessibility resources list:

```bash
cp examples/TRUSTED_SOURCES.yaml docs/
```

This provides:
- Machine-readable WCAG standards via [wai-yaml-ld](https://github.com/mgifford/wai-yaml-ld)
- Procurement requirements via [CivicActions Open Requirements Library](https://github.com/CivicActions/open-practice/blob/main/open-requirements-library/accessibility.md)
- Curated accessibility references for AI systems

### Resources for this repository

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

## 🔄 Automated quality maintenance

### TRUSTED_SOURCES.yaml monthly maintenance

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

## 🤖 AI agent integration

To ensure your AI coding assistant respects your accessibility standards, add this to your `.cursorrules`, `AGENTS.md`, or system prompt:

> *"Before modifying or creating UI components, read `ACCESSIBILITY.md`. Ensure all changes comply with WCAG 2.2 AA standards and follow the component-specific best practices in the examples directory. Optimize assets and use AI judiciously."*

For a comprehensive guide on AI agent instructions for this project, see [AGENTS.md](./AGENTS.md).

### Machine-readable standards for AI

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
