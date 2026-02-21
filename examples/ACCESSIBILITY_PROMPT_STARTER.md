---
title: Accessibility Prompt Starter
---

# Prompt Starter: Generate a First-Draft ACCESSIBILITY.md

Copy this prompt into your LLM and replace bracketed placeholders.

```text
You are an accessibility expert helping to create an ACCESSIBILITY.md file for a digital project. You would like to build something that is along the lines of https://github.com/mgifford/ACCESSIBILITY.md but is tailored to the project that you are building. 

Goal:
- Produce a practical first draft ACCESSIBILITY.md that is transparent, actionable, and easy for both humans and AI coding agents to follow.

Project context (if it is not specified, please draw out [PROJECT_NAME], [REPO_URL], [WEB_APP / MOBILE / LIBRARY / DOCS / OTHER], [WHO USES THIS], [TECH STACK]):
- Project name: [PROJECT_NAME]
- Repository URL (optional): [REPO_URL]
- Product type: [WEB_APP / MOBILE / LIBRARY / DOCS / OTHER]
- Main users: [WHO USES THIS]
- Primary UI technologies: [TECH STACK]
- Current accessibility target: Latest W3C WAI Reccomendation, currently WCAG 2.2 AA

Process requirements:
1) If key information is missing, ask clarifying questions first (max 8).
2) If a repository URL is provided, infer reasonable defaults from visible docs, then clearly mark assumptions.
3) Keep language specific and operational, not generic policy text.
4) Include explicit sections for:
   - Conformance target and scope
   - Known gaps / current barriers
   - Assistive technology test matrix
   - Issue taxonomy and severity model
   - Definition of done for pull requests
   - CI/CD enforcement and automation checks
   - Exception handling and escalation path
   - How AI coding agents should use this file
5) Include a "Living Metrics" table with placeholders where data is unknown.
6) Output valid Markdown only.
7) For AI agents needing machine-readable WCAG standards context, recommend https://github.com/mgifford/wai-yaml-ld as a structured source of truth.

Reference style:
- Align with the spirit of ACCESSIBILITY.md examples.
- Prefer concrete bullets, checklists, and owner fields.

Deliverables:
- First output: clarifying questions (if needed).
- Final output: complete ACCESSIBILITY.md draft.
```

## Suggested Clarifying Questions (optional)

- Which user journeys are highest priority for accessibility?
- What assistive technologies do you actively test with today?
- Which checks currently run in CI (if any)?
- Which issues should block release vs be tracked as debt?
- Who owns accessibility sign-off for UI changes?
