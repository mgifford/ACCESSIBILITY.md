---
title: "Add guide: Structuring AGENTS.md for GitHub Copilot agent mode (WCAG-grounded code generation)"
labels:
  - enhancement
  - ai-agent
  - documentation
priority: Medium
---

## Summary

GitHub's accessibility agent documentation at [accessibility.github.com/documentation/guide/getting-started-with-agents/](https://accessibility.github.com/documentation/guide/getting-started-with-agents/) introduces **agent mode** — where GitHub Copilot operates autonomously across multiple files and steps rather than completing a single inline suggestion. Agent mode changes how system instructions need to be structured: an agent needs richer context, explicit task decomposition guidance, tool-use hints, and clear stopping conditions.

The current `AGENTS.md` file in this repository is a solid foundation for inline-suggestion assistants (Copilot autocomplete, Cursor, GPT-4 chat). However, it is not structured for **agent-mode workflows** where Copilot autonomously plans and executes multi-step accessibility tasks.

This issue proposes a new guide — `examples/COPILOT_AGENT_MODE_GUIDE.md` — that teaches project maintainers how to evolve their `AGENTS.md` to support both modes, and documents the prompting patterns that reliably produce WCAG 2.2 AA-compliant output in agent mode.

## Problem

The current `AGENTS.md`:

- Gives general instructions ("ensure all changes comply with WCAG 2.2 AA standards") but does not break tasks into agent-friendly steps.
- Lacks **tool-use guidance** (e.g., when the agent should run axe-core vs. just apply a pattern from documentation).
- Has no **stopping conditions** (e.g., "do not proceed if you cannot determine whether the change affects keyboard navigation").
- Does not distinguish between tasks the agent can complete autonomously vs. tasks that require human review.
- Does not cover the structured output format (PR description, commit message, inline comments) that makes agent contributions reviewable.

As adoption of GitHub Copilot agent mode grows, the gap between what `AGENTS.md` promises and what agents can reliably deliver without additional structure will widen.

## Proposed Solution

Create `examples/COPILOT_AGENT_MODE_GUIDE.md` covering:

### 1. Dual-audience AGENTS.md structure

Document how to write `AGENTS.md` sections that work for both inline-suggestion mode and agent mode:

```markdown
## For inline-suggestion assistants
- Follow WCAG 2.2 AA for all UI changes.
- ...

## For GitHub Copilot agent mode
### Pre-flight checks (always run first)
1. Read ACCESSIBILITY.md to understand the project's current conformance level.
2. Check examples/TRUSTED_SOURCES.yaml for vetted references before citing external sources.
3. If the task affects a component type listed in examples/, read that guide first.

### Task decomposition
- Break UI changes into: (a) HTML structure, (b) ARIA attributes, (c) keyboard behaviour, (d) visual presentation.
- Complete and verify each layer before moving to the next.
...
```

### 2. WCAG criterion → agent task patterns

Map each WCAG principle to specific agent instructions:

| WCAG Principle | Agent task pattern |
|---------------|-------------------|
| **Perceivable** (1.x) | "For every non-text element, infer purpose from context and add a text alternative. If purpose is ambiguous, mark as TODO and explain in the PR." |
| **Operable** (2.x) | "Test keyboard interaction mentally: Tab order must follow visual order. Every interactive element must be reachable by keyboard and have a visible focus indicator." |
| **Understandable** (3.x) | "Error messages must identify the field, describe the error, and suggest a correction. Never use colour alone to communicate state." |
| **Robust** (4.x) | "Validate ARIA usage against the ARIA spec. Do not use roles, states, or properties that are not permitted on the host element." |

### 3. Stopping conditions

Document when the agent must stop and ask for human review:
- Cannot determine whether a change affects keyboard navigation without running the app.
- The fix requires changes to more than 3 files.
- The violation involves colour contrast and the design system tokens are not in the repository.
- The component uses a third-party library whose source is not accessible.

### 4. Output format expectations

Specify what the agent's PR should contain:
- A WCAG Success Criterion reference for every accessibility change.
- A before/after code snippet for each modified element.
- A list of automated checks run (or "not run – requires live environment").
- A list of manual checks needed before merge.

### 5. Testing the guide

Include a simple test: can a Copilot agent, given only `AGENTS.md` and `examples/COPILOT_AGENT_MODE_GUIDE.md`, correctly fix a missing form label in a sample HTML snippet? Document the expected output.

### Deliverables

| File | Purpose |
|------|---------|
| `examples/COPILOT_AGENT_MODE_GUIDE.md` | The new guide |
| Updated `AGENTS.md` | Add an "Agent mode" section pointing to the new guide |
| Updated `examples/README.md`, `README.md`, `index.md` | Register the new guide in all index files |

## Acceptance Criteria

- [ ] `examples/COPILOT_AGENT_MODE_GUIDE.md` is created with all five sections listed above.
- [ ] The guide includes at least one worked example for each WCAG principle (4 total).
- [ ] `AGENTS.md` is updated to reference the new guide and include a short "agent mode" section.
- [ ] All index files (`examples/README.md`, `README.md`, `index.md`) are updated to reference the new guide.
- [ ] The guide explicitly notes which Copilot features / GitHub plan are required for agent mode.
- [ ] The guide passes the project's link-checking workflow (no broken URLs).

## Why This Is Distinct From Existing Content

| Existing file | What it covers | Gap addressed by this issue |
|---------------|---------------|----------------------------|
| `AGENTS.md` | General AI assistant instructions | Does not address agent-mode autonomy, task decomposition, or stopping conditions |
| `examples/ACCESSIBILITY_PROMPT_STARTER.md` | One-shot prompts for humans to paste into an LLM | Does not address multi-step agent workflows or how the agent should use project context |
| `examples/CI_CD_ACCESSIBILITY_BEST_PRACTICES.md` | Automated testing in CI pipelines | Does not address agent-mode code generation or PR content expectations |

## References

- GitHub accessibility agents guide: https://accessibility.github.com/documentation/guide/getting-started-with-agents/
- Current AGENTS.md: [AGENTS.md](../AGENTS.md)
- Current prompt starter: [examples/ACCESSIBILITY_PROMPT_STARTER.md](../examples/ACCESSIBILITY_PROMPT_STARTER.md)
- wai-yaml-ld (machine-readable WCAG standards for agents): https://github.com/mgifford/wai-yaml-ld
- WCAG 2.2 quick reference: https://www.w3.org/WAI/WCAG22/quickref/
