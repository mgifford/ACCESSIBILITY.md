---
title: Copilot Bootstrap Agent Prompt
---

# Copilot Bootstrap Agent Prompt: Auto-Generate ACCESSIBILITY.md

This file contains the structured task description (agent prompt) used by the
[`AGENT_BOOTSTRAP_WORKFLOW.yml`](./AGENT_BOOTSTRAP_WORKFLOW.yml) GitHub Actions
workflow. Copy and adapt it for your own projects.

> **GitHub Copilot seat required.** The bootstrap workflow uses GitHub Copilot
> coding agent (autonomous multi-step mode). A **GitHub Copilot Individual,
> Business, or Enterprise** subscription with the Copilot coding agent feature
> enabled is required. See the
> [GitHub Copilot documentation](https://docs.github.com/en/copilot) for
> current plan details.

---

## How to Use This Prompt

1. Trigger the
   [`AGENT_BOOTSTRAP_WORKFLOW.yml`](./AGENT_BOOTSTRAP_WORKFLOW.yml) workflow
   via **workflow_dispatch** in your repository.
2. The workflow passes this task description to the Copilot coding agent.
3. The agent opens a draft pull request with a customised `ACCESSIBILITY.md`.
4. Review the PR, correct any **[ASSUMED: …]** annotations, and merge.

---

## Agent Task Description

Copy the block below when configuring the agent task in the workflow or
assigning it directly in the GitHub Copilot coding-agent interface.

```text
You are an accessibility expert contributing to a software project.

## Your task

1. **Analyse the repository.**
   Read all files relevant to the tech stack and development process:
   - `package.json`, `*.gemspec`, `pyproject.toml`, `go.mod`, `Cargo.toml`
     (to identify the primary programming language and framework)
   - `.github/workflows/*.yml` (to understand existing CI/CD pipelines)
   - Framework config files: `next.config.*`, `vite.config.*`, `angular.json`,
     `webpack.config.*`, `gatsby-config.*`, `rails` layout files, etc.
   - `README.md`, `CONTRIBUTING.md`, `CHANGELOG.md` (for project context)
   - Any existing `ACCESSIBILITY.md`, `a11y`, or accessibility-related files

2. **Draft a customised ACCESSIBILITY.md.**
   - Open `ACCESSIBILITY-template.md` at the repository root as your base.
   - Replace every placeholder (text in square brackets, e.g. `[PROJECT_NAME]`)
     with values inferred from the repository.
   - For every value you cannot determine with certainty, write
     `[ASSUMED: <brief reason>]` inline so reviewers can verify or correct it.
   - For any metric you cannot measure (e.g. "Automated Test Pass Rate"), write
     "Unknown – measure within 30 days" rather than inventing a number.
   - Use **WCAG 2.2 AA** as the conformance target unless the repository
     contains explicit evidence of a different target.
   - Refer to `examples/TRUSTED_SOURCES.yaml` for vetted references; do not
     cite sources that are not listed there unless you are citing official
     W3C/WCAG documents.
   - Check the `ai_scraping` field in `TRUSTED_SOURCES.yaml` before fetching
     any external URL. Do NOT access sources where `ai_scraping: prohibited`.

3. **Recommend CI/CD automation.**
   - Inspect `.github/workflows/` to identify whether any accessibility
     automation already exists.
   - If none exists, recommend copying the most appropriate file from
     `examples/` based on the detected tech stack:
     - Node.js / React / Vue / Svelte → `examples/A11Y_SHIFT_LEFT_WORKFLOW.yml`
     - Multi-browser testing required → `examples/BROWSER_TESTING_WORKFLOW.yml`
     - Pre-commit hooks → `examples/PRE_COMMIT_ACCESSIBILITY_SAMPLE.yaml`
   - Add a short comment at the top of the generated `ACCESSIBILITY.md`
     explaining which CI file you recommend and why.

4. **Write the completed ACCESSIBILITY.md.**
   - Write the file to the repository root as `ACCESSIBILITY.md`.
   - Add a comment block at the very top of the file (inside an HTML comment
     `<!-- … -->`) that lists:
     - Every assumption you made, with brief justification.
     - Which CI workflow file you recommend and why.
     - The date this file was generated (use today's date).
   - Do NOT overwrite an existing `ACCESSIBILITY.md` without first reading it;
     if one already exists, produce the new draft as `ACCESSIBILITY-draft.md`
     instead and note the conflict in the comment block.

5. **Open a draft pull request.**
   - Create a new branch named `accessibility-bootstrap/<today's date>`.
   - Commit the generated file with the message:
     `docs: bootstrap ACCESSIBILITY.md via Copilot coding agent`
   - Open a **draft** pull request titled
     "Bootstrap ACCESSIBILITY.md [<project name>]".
   - In the PR body include:
     - A summary of the tech stack and CI tooling detected.
     - A checklist of every `[ASSUMED: …]` annotation that needs human review.
     - Instructions for the reviewer on how to promote the PR from draft to
       ready-for-review once all assumptions are verified.

## Constraints

- Do NOT merge the pull request. Open it as a draft only.
- Do NOT commit directly to `main`.
- Do NOT invent metrics or compliance claims; use "Unknown – measure within
  30 days" for any data you cannot determine from the repository.
- Do NOT access external URLs where `ai_scraping: prohibited` in
  `TRUSTED_SOURCES.yaml`.
- Keep the generated `ACCESSIBILITY.md` under 300 lines; link to the relevant
  files in `examples/` rather than duplicating their content.
- Disclose AI usage in the pull request description per the project's
  Sustainability policy (`SUSTAINABILITY.md`).
```

---

## What the Agent Produces

| Artefact | Location |
|----------|----------|
| Customised accessibility commitment | `ACCESSIBILITY.md` (or `ACCESSIBILITY-draft.md` if a file already exists) |
| Draft pull request | New branch `accessibility-bootstrap/<date>` |
| Inline assumption annotations | `[ASSUMED: …]` markers throughout the file |
| AI usage disclosure | PR description |

---

## Reviewing the Draft PR

When the agent opens the pull request, work through each `[ASSUMED: …]`
annotation:

1. **Verify** — confirm the inferred value is correct.
2. **Correct** — replace the annotation with the accurate value.
3. **Escalate** — for assumptions you cannot verify (e.g. "does this product
   have users with motor disabilities?"), open a separate issue for user
   research.

Once all annotations are resolved, promote the PR from draft to
ready-for-review and request sign-off from an accessibility-knowledgeable
reviewer before merging.

---

## Permissions Required

| Permission | Why it is needed |
|-----------|-----------------|
| `contents: write` | Agent creates a branch and commits `ACCESSIBILITY.md` |
| `pull-requests: write` | Agent opens the draft PR |
| GitHub Copilot coding agent enabled | Agent mode (multi-step autonomous editing) |

---

## Related Files

- [`AGENT_BOOTSTRAP_WORKFLOW.yml`](./AGENT_BOOTSTRAP_WORKFLOW.yml) — the
  workflow that triggers this agent task
- [`ACCESSIBILITY-template.md`](../ACCESSIBILITY-template.md) — base template
  the agent fills in
- [`ACCESSIBILITY_PROMPT_STARTER.md`](./ACCESSIBILITY_PROMPT_STARTER.md) —
  manual prompt alternative (no agent required)
- [`TRUSTED_SOURCES.yaml`](./TRUSTED_SOURCES.yaml) — vetted reference list
- [`COPILOT_AGENT_MODE_GUIDE.md`](./COPILOT_AGENT_MODE_GUIDE.md) — deeper
  guide on structuring agent tasks for WCAG-grounded output
