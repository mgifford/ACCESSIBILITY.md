# Skills Directory

AI agent skills derived from `examples/` best practice guides.
Each skill distills a full example into agent-actionable rules.
**The `examples/` file is always the canonical source of truth.**

## Available Skills

| Skill | Derived from | Install |
|---|---|---|
| [ACCESSIBILITY-general](./ACCESSIBILITY-general/SKILL.md) | `AGENTS.md` + project-wide | [ACCESSIBILITY-general.skill](./ACCESSIBILITY-general.skill) |
| [anchor-links](./anchor-links/SKILL.md) | `examples/ANCHOR_LINKS_ACCESSIBILITY_BEST_PRACTICES.md` | [anchor-links.skill](./anchor-links.skill) |
| [audio-video](./audio-video/SKILL.md) | `examples/AUDIO_VIDEO_ACCESSIBILITY_BEST_PRACTICES.md` | [audio-video.skill](./audio-video.skill) |
| [charts-graphs](./charts-graphs/SKILL.md) | `examples/CHARTS_GRAPHS_ACCESSIBILITY_BEST_PRACTICES.md` | [charts-graphs.skill](./charts-graphs.skill) |
| [content-design](./content-design/SKILL.md) | `examples/CONTENT_DESIGN_ACCESSIBILITY_BEST_PRACTICES.md` | [content-design.skill](./content-design.skill) |
| [forms](./forms/SKILL.md) | `examples/FORMS_ACCESSIBILITY_BEST_PRACTICES.md` | [forms.skill](./forms.skill) |
| [keyboard](./keyboard/SKILL.md) | `examples/KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md` | [keyboard.skill](./keyboard.skill) |
| [light-dark-mode](./light-dark-mode/SKILL.md) | `examples/LIGHT_DARK_MODE_ACCESSIBILITY_BEST_PRACTICES.md` | [light-dark-mode.skill](./light-dark-mode.skill) |
| [maps](./maps/SKILL.md) | `examples/MAPS_ACCESSIBILITY_BEST_PRACTICES.md` | [maps.skill](./maps.skill) |
| [mermaid](./mermaid/SKILL.md) | `examples/MERMAID_ACCESSIBILITY_BEST_PRACTICES.md` | [mermaid.skill](./mermaid.skill) |
| [print](./print/SKILL.md) | `examples/PRINT_ACCESSIBILITY_BEST_PRACTICES.md` | [print.skill](./print.skill) |
| [progressive-enhancement](./progressive-enhancement/SKILL.md) | `examples/PROGRESSIVE_ENHANCEMENT_BEST_PRACTICES.md` | [progressive-enhancement.skill](./progressive-enhancement.skill) |
| [svg](./svg/SKILL.md) | `examples/SVG_ACCESSIBILITY_BEST_PRACTICES.md` | [svg.skill](./svg.skill) |
| [tooltips](./tooltips/SKILL.md) | `examples/TOOLTIP_ACCESSIBILITY_BEST_PRACTICES.md` | [tooltips.skill](./tooltips.skill) |
| [user-personalization](./user-personalization/SKILL.md) | `examples/USER_PERSONALIZATION_ACCESSIBILITY_BEST_PRACTICES.md` | [user-personalization.skill](./user-personalization.skill) |
| [opquast-digital-quality](./opquast-digital-quality/SKILL.md) | Opquast checklist (external) | [opquast-digital-quality.skill](./opquast-digital-quality.skill) |

## How to Install Skills

### Option 1: Claude Code (CLI) — Global Installation

Claude Code reads `.skill` ZIP archives from its global skills directory.
Download the skill archive and place it in your Claude Code skills folder:

```bash
# macOS / Linux
curl -L https://github.com/mgifford/ACCESSIBILITY.md/raw/main/skills/light-dark-mode.skill \
  -o ~/.claude/skills/light-dark-mode.skill

# Or download any skill:
curl -L https://github.com/mgifford/ACCESSIBILITY.md/raw/main/skills/<skill-name>.skill \
  -o ~/.claude/skills/<skill-name>.skill
```

Claude Code will load all `.skill` archives from `~/.claude/skills/` automatically on startup.

### Option 2: Claude.ai Projects — Browser Interface

To use skills with Claude in the browser (claude.ai):

1. Open **Claude.ai** → go to your **Project**
2. Click **Project instructions** (or **Set project instructions**)
3. Copy the contents of the relevant `SKILL.md` file(s) into the instructions field
4. Claude will apply those rules for all conversations in that project

For the general skill, copy `skills/ACCESSIBILITY-general/SKILL.md`.
For topic-specific work, also add the relevant topic skill (e.g., `skills/forms/SKILL.md`).

### Option 3: AGENTS.md — Project-Level (any AI agent)

Reference skills in your project's `AGENTS.md` so any AI agent working on the repo knows to load them:

```markdown
## Skills

Before working on color themes: read `skills/light-dark-mode/SKILL.md`
Before working on forms: read `skills/forms/SKILL.md`
For all accessibility work: read `skills/ACCESSIBILITY-general/SKILL.md`
```

### Option 4: Cursor / Copilot / Other Agents

Add skill file references to `.cursorrules`, your Copilot system prompt config, or equivalent:

```
When working on forms, follow the rules in skills/forms/SKILL.md.
When working on color themes, follow the rules in skills/light-dark-mode/SKILL.md.
```

## How Skills Stay in Sync

Each skill directory contains a `SYNC.md` recording:
- `canonical_source` — which `examples/` file this skill is derived from
- `last_synced_commit` — git SHA at last sync

`.github/workflows/skill-sync-check.yml` runs whenever an `examples/` file changes.
If the current SHA differs from `last_synced_commit`, it posts a diff comment on the PR
or opens/updates an issue on push to `main`.

## Design Principle

> Skills are distillations, not mirrors.

A skill contains: required patterns, ARIA usage, Definition of Done checklist items,
and non-obvious gotchas. It does NOT contain extended prose rationale or external links.
This keeps skills compact and fast for agents to load.

## Contributing a New Skill

1. Identify a stable, reviewed file in `examples/`
2. Create `skills/your-topic/SKILL.md` — distilled, agent-actionable rules
3. Create `skills/your-topic/SYNC.md` — set `canonical_source`, leave `last_synced_commit` blank
4. Build the ZIP: `cd skills && zip -r your-topic.skill your-topic/`
5. Add a row to the table above and open a PR
