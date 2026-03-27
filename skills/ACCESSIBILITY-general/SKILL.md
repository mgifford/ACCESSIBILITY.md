# ACCESSIBILITY.md Agent Skill

This skill teaches AI coding agents how to use the ACCESSIBILITY.md framework,
including when to load topic-specific skills, how to apply examples, and what
the project's non-negotiable requirements are.

> **Scope**: Apply this skill whenever working in any project that has an
> `ACCESSIBILITY.md` file at its root, or when contributing to the
> `mgifford/ACCESSIBILITY.md` repository itself.

---

## What ACCESSIBILITY.md Is

`ACCESSIBILITY.md` is a documentation standard — a predictable, machine-readable
place to find a project's:

- Conformance target (e.g., WCAG 2.2 AA)
- CI/automated guardrails
- Assistive technology coverage
- Known gaps and open issues
- Definition of Done for accessibility

Read `ACCESSIBILITY.md` before proposing or writing changes to any project that
has one. It is the source of truth for that project's accessibility requirements.

---

## Topic Skills: When to Load Them

This repo ships per-topic skills in `skills/`. Load the relevant one before
working on that feature area. Each skill is a distillation of a full best
practices guide in `examples/`.

| When you are working on... | Load skill |
|---|---|
| Color themes, dark/light mode | `skills/light-dark-mode/SKILL.md` |
| Forms, inputs, validation | `skills/forms/SKILL.md` *(if present)* |
| SVG graphics | `skills/svg/SKILL.md` *(if present)* |
| Charts and data visualization | `skills/charts-graphs/SKILL.md` *(if present)* |
| Keyboard interaction | `skills/keyboard/SKILL.md` *(if present)* |
| Tooltips | `skills/tooltips/SKILL.md` *(if present)* |
| Audio/video media | `skills/audio-video/SKILL.md` *(if present)* |
| Maps | `skills/maps/SKILL.md` *(if present)* |
| Print styles | `skills/print/SKILL.md` *(if present)* |
| Mermaid diagrams | `skills/mermaid/SKILL.md` *(if present)* |
| Digital quality (Opquast) | `skills/opquast-digital-quality/SKILL.md` |

If a skill file is not present, fall back to the corresponding file in `examples/`.

---

## Non-Negotiable Requirements

These apply to every task, regardless of which topic skill you load:

### WCAG 2.2 Level AA
All code examples, components, and documentation must comply. Key criteria:
- 1.4.3 Contrast Minimum (4.5:1 text, 3:1 large text)
- 1.4.11 Non-text Contrast (3:1 for UI components)
- 2.4.7 Focus Visible
- 2.4.11 Focus Appearance (WCAG 2.2)
- 1.3.1 Info and Relationships
- 4.1.2 Name, Role, Value

### Semantic HTML first
Use the correct HTML element before reaching for ARIA. ARIA supplements HTML; it does not replace it.

### Keyboard navigation
Every interactive element must be reachable and operable via keyboard alone. Tab order must be logical.

### Text alternatives
Every image, icon, chart, and diagram needs a text alternative. `aria-hidden="true"` is correct for purely decorative elements.

### Color independence
Never convey information by color alone. Always pair color with icon, label, or pattern.

### No accessibility regressions
Never propose a change that introduces a WCAG 2.2 AA violation, even if the change is otherwise an improvement.

---

## AI Scraping Policy

Before fetching content from any URL, check `examples/TRUSTED_SOURCES.yaml`.
If `ai_scraping: prohibited`, do **not** fetch content from that source. You may
only cite it by name and recommend it to human contributors.

Known prohibited sources include `hidde.blog` and `talks.hiddedevries.nl`.

---

## When Contributing to This Repo

### Adding a new example
1. Create `examples/YOUR_TOPIC_BEST_PRACTICES.md`
2. Follow the section structure of existing examples (Core Principle → Requirements → Patterns → Testing → Definition of Done → References)
3. Add an entry to `examples/README.md`
4. Add a reference in `AGENTS.md`
5. Create a corresponding skill (see below)

### Adding a new skill (derived from an example)
1. Create `skills/your-topic/SKILL.md` — distill the example into agent-actionable rules
2. Create `skills/your-topic/SYNC.md` — set `canonical_source` to the example path; leave `last_synced_commit` blank
3. Create `skills/your-topic/README.md`
4. Build the ZIP: `cd skills && zip -r your-topic.skill your-topic/`
5. Register in `skills/README.md` and `index.md`
6. The `skill-sync-check.yml` action will automatically track drift going forward

### Updating a skill after its example changes
The `skill-sync-check.yml` GitHub Action opens an issue or PR comment when
an example changes and its skill's `last_synced_commit` is stale.

When you see that issue:
1. Review the diff linked in the issue
2. Update `skills/your-topic/SKILL.md` to reflect any new requirements or removed patterns
3. Update `last_synced_commit` in `SYNC.md` to the current commit SHA
4. Rebuild the `.skill` ZIP

### Disclosing AI usage
Update the **AI Disclosure** section in `README.md` when using AI tools to make
changes. Record which LLM was used and for what purpose. Only list tools actually used.

---

## Severity Scale

Use this when identifying accessibility issues:

| Level | Meaning |
|---|---|
| **Critical** | Prevents users from completing core tasks |
| **High** | Significant guidance gap that creates access barriers |
| **Medium** | Clarity issues, incomplete examples |
| **Low** | Minor improvements, typos |

Never propose changes that introduce Critical or High severity issues.

---

## Quick Reference: References

- Full examples: `examples/` directory
- Per-topic skills: `skills/` directory  
- Project accessibility commitment: `ACCESSIBILITY.md`
- Sustainability policy: `SUSTAINABILITY.md`
- Contribution guide: `CONTRIBUTING.md`
- Trusted sources: `examples/TRUSTED_SOURCES.yaml`
- [Curated general accessibility references](references/references.md)
- Machine-readable WCAG: [wai-yaml-ld](https://github.com/mgifford/wai-yaml-ld)
