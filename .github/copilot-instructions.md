# GitHub Copilot Repository Instructions

## Purpose and Usefulness

This file is a compatibility entry point for GitHub Copilot. The canonical,
tool-neutral repository instructions are in [AGENTS.md](../AGENTS.md).

This file is useful because some GitHub Copilot surfaces load
`.github/copilot-instructions.md` but do not automatically load `AGENTS.md`. It
is not a second repository policy and must not repeat the content of
`AGENTS.md`. See GitHub's current
[custom-instruction support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support).

If the repository stops using GitHub Copilot, this file can be removed without
moving its contents elsewhere.

## Required Behavior

1. Read and follow [AGENTS.md](../AGENTS.md). It defines repository scope,
   authority, workflow, validation, and completion requirements, including how
   to find a more specific `AGENTS.md`.
2. Treat this file, applicable `AGENTS.md` files, and applicable path-specific
   instruction files as one instruction set. Report a material conflict rather
   than guessing.
3. If the current Copilot surface cannot read `AGENTS.md`, report that the
   canonical repository instructions are unavailable instead of substituting
   rules from this file.

## Copilot-Specific Notes

- GitHub Copilot features and editors do not all support the same instruction
  file types. When the interface exposes loaded references or instructions,
  confirm that the applicable `AGENTS.md` was loaded. If it was not, add it to
  the context or report that the canonical instructions may not have applied.
- Copilot code review uses instructions from the pull request's base branch.
  Changes to instruction files in the pull request itself should not be expected
  to affect that review.
- Examples involving Copilot actions, agents, models, or preview features can
  become outdated. Verify current behavior in
  [official GitHub Copilot documentation](https://docs.github.com/en/copilot)
  before recommending, copying, or enabling them.

## Where New Copilot Guidance Belongs

- Put shared repository policy in [AGENTS.md](../AGENTS.md).
- Put a genuinely path-specific rule in
  `.github/instructions/NAME.instructions.md` with an appropriate `applyTo`
  pattern.
- Put a distinct specialist persona or tool configuration in
  `.github/agents/NAME.agent.md`.
- Put a repeatable, manually invoked task in
  `.github/prompts/NAME.prompt.md`.
- Add content here only when it is specific to how GitHub Copilot consumes or
  applies repository instructions.
