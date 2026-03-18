# Skills

A collection of portable AI agent skill files for web accessibility and digital quality.

## What Is This Directory?

Each skill in this directory encodes a set of best practices, rules, and code patterns as AI-actionable instructions. Skills are designed to be loaded into AI coding assistants (GitHub Copilot, Claude, Cursor, Codex, and others) so that the assistant automatically applies those standards when generating or reviewing code.

Two formats are provided for each skill:

| Format | File | Purpose |
|---|---|---|
| **Binary (ZIP)** | `<skill-name>.skill` | Single file to download and install — the entire skill in one portable archive |
| **Expanded directory** | `<skill-name>/` | Human-readable source — tracked in Git, open to contributions and review |

The expanded directory and the `.skill` ZIP are kept in sync. When you want to inspect or contribute to the rules, use the directory. When you want to install the skill into an AI tool, use the `.skill` file.

## Available Skills

| Skill | Download | Source | Description |
|---|---|---|---|
| **Opquast Digital Quality** | [`opquast-digital-quality.skill`](./opquast-digital-quality.skill) | [`opquast-digital-quality/`](./opquast-digital-quality/) | 244 web quality rules across 14 categories (content, security, forms, performance, privacy, and more). Complements WCAG 2.2 as a holistic quality baseline. |

## What Are `.skill` Files?

A `.skill` file is a ZIP archive containing one or more Markdown files that instruct AI agents how to behave. AI coding agents that support skills (such as [OpenAI Codex](https://github.com/openai/codex)) read these files from a designated skills directory and apply the guidelines to every task in that session.

The `.skill` format allows:

- **Portability** — a single file to copy, share, or version-pin
- **Composability** — install multiple skills side-by-side for layered guidance
- **Transparency** — ZIP archives are readable by any standard tool; nothing is hidden

If an AI tool does not natively support `.skill` files, you can unzip the archive and point the tool at the extracted Markdown files instead.

## How to Use These Skills

### Install for OpenAI Codex (global)

Run this one-liner to download and install a skill into `/etc/codex/skills`:

```bash
TMP_DIR="$(mktemp -d)" \
  && curl -fsSL "https://github.com/mgifford/ACCESSIBILITY.md/archive/refs/heads/main.zip" \
       -o "$TMP_DIR/main.zip" \
  && unzip -q "$TMP_DIR/main.zip" -d "$TMP_DIR" \
  && sudo mkdir -p /etc/codex/skills/opquast-digital-quality \
  && sudo cp "$TMP_DIR/ACCESSIBILITY.md-main/skills/opquast-digital-quality.skill" \
             /etc/codex/skills/opquast-digital-quality/ \
  && rm -rf "$TMP_DIR"
```

> **Security note:** Review downloaded files before running `sudo cp`. Inspect the extracted files in `$TMP_DIR` after the download step.

### Install manually (any AI tool)

1. Download the `.skill` file for the skill you want.
2. Unzip it: `unzip opquast-digital-quality.skill -d opquast-digital-quality`
3. Place the resulting directory where your AI tool reads system prompts or instructions (e.g. `.cursor/rules/`, `.github/copilot-instructions.md`, or your tool's configured skills path).
4. Restart or reload the AI tool session.

### Ask an AI agent to install from this repository

Many AI agents (Claude, Codex, Cursor) can fetch and install skills on request:

```text
Install the Opquast Digital Quality skill from
https://github.com/mgifford/ACCESSIBILITY.md/tree/main/skills
```

### Use the Markdown source directly

If you prefer to reference the expanded source rather than the ZIP:

- [`opquast-digital-quality/SKILL.md`](./opquast-digital-quality/SKILL.md) — Quick-reference summary, code patterns, and anti-patterns
- [`opquast-digital-quality/references/rules-part1.md`](./opquast-digital-quality/references/rules-part1.md) — Full rules 1–172 with code examples
- [`opquast-digital-quality/references/rules-part2.md`](./opquast-digital-quality/references/rules-part2.md) — Full rules 173–244 with code examples

## Skill Directory Structure

```
skills/
├── README.md                          ← This file
│
├── opquast-digital-quality.skill      ← Downloadable ZIP (SKILL.md + references/)
│
└── opquast-digital-quality/           ← Expanded human-readable source
    ├── SKILL.md                       ← Quick-reference summary and code patterns
    └── references/
        ├── rules-part1.md             ← Detailed rules 1–172 with code examples
        └── rules-part2.md             ← Detailed rules 173–244 with code examples
```

## Contributing

To propose a change to an existing skill, edit the files inside the expanded `<skill-name>/` directory and open a pull request. A maintainer will regenerate the `.skill` ZIP from the updated source before merging.

To propose a new skill, open an issue describing the framework or rule set you want to encode.

## License

The Opquast Digital Quality rules are published under [Creative Commons BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) by [Opquast](https://www.opquast.com/). This repository's skill packaging is MIT licensed. See [LICENSE](../LICENSE) for details.
