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
├── skills/                         ← Portable AI agent skills
│   ├── README.md                   ← Skills index and usage guide
│   ├── ACCESSIBILITY-general.skill ← ┐
│   ├── anchor-links.skill          │
│   ├── audio-video.skill           │
│   ├── charts-graphs.skill         │
│   ├── content-design.skill        │ Downloadable .skill ZIP archives
│   ├── forms.skill                 │ (one per topic, for easy install)
│   ├── keyboard.skill              │
│   ├── light-dark-mode.skill       │
│   ├── maps.skill                  │
│   ├── mermaid.skill               │
│   ├── opquast-digital-quality.skill│
│   ├── print.skill                 │
│   ├── progressive-enhancement.skill│
│   ├── svg.skill                   │
│   ├── tooltips.skill              │
│   ├── user-personalization.skill  ← ┘
│   └── <skill-name>/              ← Expanded human-readable source
│       ├── SKILL.md               ← Agent-actionable rules + DoD checklist
│       └── SYNC.md                ← Tracks source file and last sync SHA
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
- 🤖 **Install globally in AI agents**: `ACCESSIBILITY.skill` or any `skills/<name>.skill` archive — see [AI Agent Skills](#-ai-agent-skills) and [Step 3: Configure AI coding assistants](#step-3-configure-ai-coding-assistants) below
- 📖 **Read for guidance**: `README.md`, `AGENTS.md`, `CONTRIBUTING.md`, `COMPARISON_WITH_KREERC.md`
- 🛠️ **Jekyll/docs site**: `_layouts/`, `_config.yml`, `assets/`, `index.md`

### Skills vs Examples

| | `examples/` | `skills/` |
|---|---|---|
| **Audience** | Humans: developers, designers, auditors | AI agents: Claude, Copilot, Cursor, Codex |
| **Format** | Full best practices guide with rationale, code, testing steps | Distilled, agent-actionable rules + Definition of Done checklist |
| **Source of truth** | ✅ Always authoritative | Derived from `examples/`; kept in sync via CI |
| **How to use** | Read when learning or auditing | Paste into AI project instructions or install as `.skill` archive |
| **Contribution** | Open a PR with a new or updated guide | Derive a skill from an existing example; CI tracks drift |

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
* **Best Practice Reference:** Project-specific guidance for complex components like [CI/CD pipelines](./examples/CI_CD_ACCESSIBILITY_BEST_PRACTICES.md), [audio/video](./examples/AUDIO_VIDEO_ACCESSIBILITY_BEST_PRACTICES.md), [anchor links](./examples/ANCHOR_LINKS_ACCESSIBILITY_BEST_PRACTICES.md), [ARIA live regions](./examples/ARIA_LIVE_REGIONS_BEST_PRACTICES.md), [content design](./examples/CONTENT_DESIGN_ACCESSIBILITY_BEST_PRACTICES.md), [SVGs](./examples/SVG_ACCESSIBILITY_BEST_PRACTICES.md), [Mermaid diagrams](./examples/MERMAID_ACCESSIBILITY_BEST_PRACTICES.md), [keyboard interactions](./examples/KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md), [light/dark modes](./examples/LIGHT_DARK_MODE_ACCESSIBILITY_BEST_PRACTICES.md), [navigation](./examples/NAVIGATION_ACCESSIBILITY_BEST_PRACTICES.md), [plain language](./examples/PLAIN_LANGUAGE_ACCESSIBILITY_BEST_PRACTICES.md), [tables](./examples/TABLES_ACCESSIBILITY_BEST_PRACTICES.md), [touch and pointer](./examples/TOUCH_POINTER_ACCESSIBILITY_BEST_PRACTICES.md), [user personalization](./examples/USER_PERSONALIZATION_ACCESSIBILITY_BEST_PRACTICES.md), [forms](./examples/FORMS_ACCESSIBILITY_BEST_PRACTICES.md), [maps](./examples/MAPS_ACCESSIBILITY_BEST_PRACTICES.md), [charts and graphs](./examples/CHARTS_GRAPHS_ACCESSIBILITY_BEST_PRACTICES.md), [tooltips](./examples/TOOLTIP_ACCESSIBILITY_BEST_PRACTICES.md), [print styles](./examples/PRINT_ACCESSIBILITY_BEST_PRACTICES.md), and [digital quality (Opquast)](./examples/OPQUAST_DIGITAL_QUALITY_BEST_PRACTICES.md).
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

16 topic-specific `.skill` archives are available for global installation alongside the full governance skill:

- **[`ACCESSIBILITY.skill`](./ACCESSIBILITY.skill)** — full accessibility governance framework (WCAG 2.2 AA, semantic HTML, ARIA, CI/CD)
- **[`skills/<name>.skill`](./skills/)** — topic skills (forms, keyboard, maps, SVG, etc.); see [`skills/README.md`](./skills/README.md) for the full list and direct download links

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
TMP_DIR="$(mktemp -d)" && curl -fsSL "https://github.com/mgifford/ACCESSIBILITY.md/archive/refs/heads/main.zip" -o "$TMP_DIR/main.zip" && unzip -q "$TMP_DIR/main.zip" -d "$TMP_DIR" && sudo mkdir -p /etc/codex/skills/opquast-digital-quality && sudo cp "$TMP_DIR/ACCESSIBILITY.md-main/skills/opquast-digital-quality.skill" /etc/codex/skills/opquast-digital-quality/ && rm -rf "$TMP_DIR"
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

## 🧩 AI Agent Skills

Skills are portable AI agent instruction files. Each skill encodes a set of best
practices, rules, and code patterns so that AI coding assistants (GitHub Copilot,
Claude, Cursor, Codex, and others) automatically apply those standards when
generating or reviewing code.

Skills are stored in the [`skills/` directory](./skills/). Each skill ships in
two formats: a single downloadable `.skill` ZIP archive for easy installation, and
an expanded directory of Markdown files for human review and contribution.

### Available Skills

| Skill | What it covers |
|---|---|
| [ACCESSIBILITY-general](./skills/ACCESSIBILITY-general/SKILL.md) | Project-wide non-negotiables, WCAG 2.2 AA, AI scraping policy, contribution guide |
| [anchor-links](./skills/anchor-links/SKILL.md) | Skip links, descriptive link text, smooth-scroll + `prefers-reduced-motion`, focus management |
| [audio-video](./skills/audio-video/SKILL.md) | Captions, transcripts, audio descriptions, Able Player |
| [charts-graphs](./skills/charts-graphs/SKILL.md) | Text alternatives, data tables, color independence, SVG chart markup, color-blind-safe palettes |
| [content-design](./skills/content-design/SKILL.md) | Plain language, heading hierarchy, link text, images, tables, reading level |
| [forms](./skills/forms/SKILL.md) | Labels, grouping, autocomplete, validation, error summary, async feedback |
| [keyboard](./skills/keyboard/SKILL.md) | Focus visibility, focus order, expected key behaviors, dialog management |
| [light-dark-mode](./skills/light-dark-mode/SKILL.md) | CSS custom properties, dual-mode contrast, toggle button, forced-colors, zebra stripes |
| [maps](./skills/maps/SKILL.md) | Static map alt text, keyboard controls, accessible markers and popups, structured text alternatives |
| [mermaid](./skills/mermaid/SKILL.md) | `%%accTitle`/`%%accDescr` metadata, Pattern 11 SVG output, semantic flowchart structure |
| [print](./skills/print/SKILL.md) | `@media print`, hiding nav/UI, revealing link URLs, print typography, page breaks |
| [progressive-enhancement](./skills/progressive-enhancement/SKILL.md) | Three-layer HTML/CSS/JS approach, forms without JS, SSR, feature detection |
| [svg](./skills/svg/SKILL.md) | Accessible names, decorative hiding, `currentColor`, forced-colors, contrast |
| [tooltips](./skills/tooltips/SKILL.md) | ARIA tooltip pattern, hover + focus triggers, WCAG 1.4.13, toggletip for mobile |
| [user-personalization](./skills/user-personalization/SKILL.md) | CSS media queries, avoiding overlays, font/spacing controls, persisting preferences |
| [opquast-digital-quality](./skills/opquast-digital-quality/SKILL.md) | 244 web quality rules: content, security, forms, performance, privacy |

### How to Install Skills

#### Claude Code (CLI) — Global Installation

Claude Code reads `.skill` ZIP archives from its global skills directory.

```bash
# Download a skill archive
curl -L https://github.com/mgifford/ACCESSIBILITY.md/raw/main/skills/forms.skill \
  -o ~/.claude/skills/forms.skill

# Repeat for any other skills you want globally available:
curl -L https://github.com/mgifford/ACCESSIBILITY.md/raw/main/skills/keyboard.skill \
  -o ~/.claude/skills/keyboard.skill
```

Claude Code loads all `.skill` archives from `~/.claude/skills/` automatically on startup.
For the full list of available `.skill` archives, see the [`skills/` directory](./skills/).

#### Claude.ai (Browser) — Project Instructions

The easiest way to use these skills with Claude in the browser:

1. Go to **[claude.ai](https://claude.ai)** and open or create a **Project**
2. Click **Project instructions** (the pencil icon or "Set project instructions")
3. Copy and paste the contents of one or more `SKILL.md` files into the instructions field
4. Claude will apply those rules for every conversation in that project

**Recommended starting point:** Copy [`skills/ACCESSIBILITY-general/SKILL.md`](./skills/ACCESSIBILITY-general/SKILL.md)
into your project instructions for project-wide coverage, then add topic skills
(e.g., `forms`, `keyboard`) as needed.

> **Tip:** Claude.ai Projects support long instructions. You can paste multiple skill
> files end-to-end. Keep the most important skills at the top.

#### AGENTS.md — Project-Level (Any AI Agent)

Add references to your project's `AGENTS.md` so any AI agent working on the repo
knows which skills to load before starting work:

```markdown
## Skills

Before working on forms or validation: read `skills/forms/SKILL.md`
Before working on color themes: read `skills/light-dark-mode/SKILL.md`
Before working on interactive components: read `skills/keyboard/SKILL.md`
For all accessibility work in this project: read `skills/ACCESSIBILITY-general/SKILL.md`
```

#### Cursor / GitHub Copilot / Other Agents

Add skill references to `.cursorrules` or your agent's system prompt config:

```
When implementing forms, apply rules from skills/forms/SKILL.md.
When implementing interactive UI, apply rules from skills/keyboard/SKILL.md.
When implementing color themes, apply rules from skills/light-dark-mode/SKILL.md.
```

### Keeping Skills in Sync with Examples

Each skill's `SYNC.md` records which `examples/` file it was derived from and the
git SHA at the last sync. The [`skill-sync-check.yml`](./.github/workflows/skill-sync-check.yml)
GitHub Action runs automatically when any `examples/` file changes. If a skill's
recorded SHA is stale, it posts a diff comment on the PR (or opens an issue on push
to `main`) so maintainers know exactly what changed and what to review.

To update a skill after its source changes:
1. Review the diff linked in the CI issue/comment
2. Update `skills/<skill-name>/SKILL.md` to reflect new requirements
3. Set `last_synced_commit` in `skills/<skill-name>/SYNC.md` to the current SHA
4. Rebuild the archive: `cd skills && zip -r <skill-name>.skill <skill-name>/`

### Contributing a New Skill

1. Identify a stable, reviewed file in `examples/`
2. Create `skills/your-topic/` containing:
   - `SKILL.md` — distilled, agent-actionable rules (not a prose copy of the example)
   - `SYNC.md` — set `canonical_source` to the example path; leave `last_synced_commit` blank
   - `README.md` — what the skill covers and how to install it
3. Build the ZIP: `cd skills && zip -r your-topic.skill your-topic/`
4. Add a row to the Skills table above and in `skills/README.md`
5. Open a PR — the sync check will track drift automatically from that point

> **Design principle:** Skills are distillations, not mirrors. A skill contains required
> patterns, ARIA usage, and Definition of Done checklists. It does not replicate prose
> rationale or external references — those belong in the `examples/` source.

---

## 🤖 AI Disclosure

This section documents which AI tools have been used in the development and maintenance of this repository, and in what capacity. Per this project's [AGENTS.md](./AGENTS.md) and [SUSTAINABILITY.md](./SUSTAINABILITY.md), AI usage must be disclosed transparently.

> This project is a **documentation and template repository**. No AI runs at runtime when users read or adopt these files, and no browser-based AI is embedded in the project itself.

### LLMs used to build this project

| Tool | Provider | Used for |
|------|----------|----------|
| **GitHub Copilot Coding Agent** | GitHub / Microsoft (Claude models via Anthropic) | Creating and maintaining documentation files, adding best-practice guides, refactoring content, managing pull requests, and performing repository maintenance tasks |

### Notes

- **Runtime AI**: None. This is a static documentation project; no AI is invoked when users read or use the files.
- **Browser-based AI**: None. No client-side or browser-based AI features are embedded in this project.
- **Human oversight**: All AI-generated content is reviewed by the repository maintainer before merging. The README already notes: *"Most of the content on this site was generated with AI assistance and has not yet been fully validated in real-world conditions."*

### How to update this disclosure

If you use an AI tool when contributing to this repository, please add or update the entry in the table above in your pull request. See [AGENTS.md](./AGENTS.md) for the full instruction.

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
