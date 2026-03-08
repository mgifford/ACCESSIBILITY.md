---
title: "Add example: GitHub Copilot coding agent to bootstrap ACCESSIBILITY.md for new projects"
labels:
  - enhancement
  - ai-agent
  - documentation
priority: Medium
---

## Summary

GitHub's accessibility agent documentation at [accessibility.github.com/documentation/guide/getting-started-with-agents/](https://accessibility.github.com/documentation/guide/getting-started-with-agents/) introduces a new workflow pattern: using GitHub Copilot coding agents to autonomously analyze a repository and generate project-specific configuration files. This project currently ships a static template (`ACCESSIBILITY-template.md`) and a manual prompt (`examples/ACCESSIBILITY_PROMPT_STARTER.md`). Both require a human to run the prompt manually and fill in placeholders by hand.

An agent-driven bootstrap workflow would eliminate that friction: a developer runs one command (or triggers one workflow dispatch), and a Copilot coding agent reads the real repository code, infers the tech stack, checks existing CI/CD, and opens a ready-to-review PR with a tailored `ACCESSIBILITY.md`.

## Problem

The current adoption path for `ACCESSIBILITY.md` requires:
1. A human to copy the template
2. A human to manually fill every placeholder (project name, tech stack, assistive tech matrix, CI/CD details, etc.)
3. A human to pick the right CI workflow example from `examples/`

This manual process is a barrier to adoption, especially for maintainers of many repositories who need to roll out `ACCESSIBILITY.md` at scale.

## Proposed Solution

Add a new example that demonstrates how to configure a GitHub Copilot coding agent to:

1. **Analyse the repository** — inspect `package.json`, `*.gemspec`, CI workflows, framework config files, README, and existing accessibility tooling.
2. **Draft a customised `ACCESSIBILITY.md`** — using `ACCESSIBILITY-template.md` as the base, replacing every placeholder with values inferred from the codebase.
3. **Suggest the right CI workflow** — recommend which file(s) from `examples/` to copy, based on detected tech stack.
4. **Open a pull request** — the agent creates a branch and opens a PR so a human can review and refine before merging.

### Deliverables

| File | Purpose |
|------|---------|
| `examples/AGENT_BOOTSTRAP_WORKFLOW.yml` | GitHub Actions `workflow_dispatch` that launches a Copilot coding agent task |
| `examples/COPILOT_BOOTSTRAP_AGENT_PROMPT.md` | Structured system prompt / task description for the agent |
| Updates to `README.md` and `examples/README.md` | Add "Bootstrap with an agent" option to the Quick Start section |
| Updates to `AGENTS.md` | Document the bootstrap agent pattern for adopters |

### Example agent task description (draft)

```text
You are an accessibility expert contributing to a software project.

Your task:
1. Read all files in this repository to understand the tech stack, CI/CD setup, and current accessibility tooling.
2. Open ACCESSIBILITY-template.md and fill in every placeholder with values specific to this project.
3. If no CI workflow exists, copy the most appropriate file from examples/ and adapt it.
4. Write the completed ACCESSIBILITY.md to the repository root.
5. Explain every assumption you made in a short comment block at the top of the file.

Constraints:
- Use WCAG 2.2 AA as the conformance target unless evidence suggests otherwise.
- Refer to examples/TRUSTED_SOURCES.yaml for vetted references.
- Do not invent metrics; use "Unknown – measure within 30 days" for missing data.
```

## Acceptance Criteria

- [ ] `examples/AGENT_BOOTSTRAP_WORKFLOW.yml` is a valid GitHub Actions workflow using `workflow_dispatch`.
- [ ] The workflow uses GitHub Copilot agent capabilities (e.g. `github/copilot-agent` action or equivalent documented pattern).
- [ ] `examples/COPILOT_BOOTSTRAP_AGENT_PROMPT.md` contains a complete, tested agent task description.
- [ ] README.md and examples/README.md reference the new files.
- [ ] The workflow produces a draft PR (not a direct commit to `main`).
- [ ] Documentation includes instructions for the required GitHub Copilot seat/permissions.

## References

- GitHub accessibility agents guide: https://accessibility.github.com/documentation/guide/getting-started-with-agents/
- Existing prompt starter: [examples/ACCESSIBILITY_PROMPT_STARTER.md](../examples/ACCESSIBILITY_PROMPT_STARTER.md)
- Existing template: [ACCESSIBILITY-template.md](../ACCESSIBILITY-template.md)
- GitHub Copilot coding agent documentation: https://docs.github.com/en/copilot/using-github-copilot/using-github-copilot-for-pull-requests/using-copilot-to-help-you-work-on-a-pull-request
