# Contributions to awesome-copilot

This directory holds instruction files formatted for
[github/awesome-copilot](https://github.com/github/awesome-copilot),
ready to submit as pull requests to that repository.

## How to submit

1. **Fork** `github/awesome-copilot`.
2. **Create a branch from `staged`** (not `main`):
   ```bash
   git checkout staged
   git checkout -b add-keyboard-accessibility-instructions
   ```
3. **Copy the file** to the `instructions/` directory of your fork:
   ```bash
   cp contributions/keyboard-accessibility.instructions.md instructions/
   ```
4. **Update the README** in your fork:
   ```bash
   npm install
   npm start
   ```
5. **Open a PR** targeting the `staged` branch with:
   - A clear title describing the contribution
   - A brief description of what the instructions do
   - Append `🤖🤖🤖` to the PR title (required for AI-authored PRs to be fast-tracked)
   - AI usage disclosure (this file was generated with GitHub Copilot coding agent from source material at `mgifford/ACCESSIBILITY.md`)

## Files

| File | Description | Target path in awesome-copilot |
|------|-------------|-------------------------------|
| [`keyboard-accessibility.instructions.md`](./keyboard-accessibility.instructions.md) | Deep keyboard accessibility patterns: dialog focus management (`inert`), roving tabindex, focus visibility, skip links, sticky-header obscuring. Complements the existing `a11y.instructions.md`. | `instructions/keyboard-accessibility.instructions.md` |

## Source and provenance

The content is adapted from
[`examples/KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md`](../examples/KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md)
in this repository.

**Adapted** (reformatted for Copilot instructions style):
- Frontmatter added (`applyTo`, `description`)
- Severity labels kept but aligned to awesome-copilot conventions (CRITICAL / SERIOUS / MODERATE)
- WCAG criterion references condensed to inline footnotes

**Preserved as-is**:
- All code examples (HTML/CSS/JS)
- Widget key-behaviour table
- Definition-of-done checklist
- External references

**Removed**:
- Repo-specific references (`mgifford/ACCESSIBILITY.md`, `wai-yaml-ld` YAML paths, machine-readable standards section)
- Jekyll/Liquid frontmatter (`title:`)
