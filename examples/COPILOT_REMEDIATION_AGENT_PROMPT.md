---
title: Copilot Remediation Agent Prompt
---

# Copilot Remediation Agent Prompt: Automated Accessibility Fix

This file contains the structured task descriptions (agent prompts) used by the
[`AGENT_REMEDIATION_WORKFLOW.yml`](./AGENT_REMEDIATION_WORKFLOW.yml) GitHub Actions
workflow. Each section covers a different axe rule violation type. Copy and
adapt them for your own projects.

> **GitHub Copilot seat required.** This workflow uses the GitHub Copilot
> coding agent (autonomous multi-step mode). A **GitHub Copilot Individual,
> Business, or Enterprise** subscription with the Copilot coding agent feature
> enabled is required. See the
> [GitHub Copilot documentation](https://docs.github.com/en/copilot) for
> current plan details.

---

## How to Use These Prompts

1. An accessibility scanner (e.g. `github/accessibility-scanner`) creates a
   GitHub issue labelled `accessibility` containing the axe rule ID, the
   affected element, and the file path or URL.
2. The
   [`AGENT_REMEDIATION_WORKFLOW.yml`](./AGENT_REMEDIATION_WORKFLOW.yml)
   workflow fires on `issues: labeled` and selects the matching prompt below.
3. The workflow passes the prompt — plus the live issue body — to the Copilot
   coding agent.
4. The agent opens a **draft pull request** linked to the original issue.
5. A human reviews the draft PR, verifies the fix is correct and minimal, and
   merges after approval.

---

## Permissions Required

| Permission | Why it is needed |
|-----------|-----------------|
| `contents: write` | Agent creates a branch and commits the fix |
| `pull-requests: write` | Agent opens the draft PR |
| `issues: read` | Workflow reads the issue body to extract violation details |
| GitHub Copilot coding agent enabled | Agent mode (multi-step autonomous editing) |

> **Note:** No secrets beyond `GITHUB_TOKEN` are required. The agent must not
> be granted access to deployment keys, environment secrets, or any credentials
> unrelated to branch/PR creation.

---

## Violation-Specific Agent Task Descriptions

Each block below is selected by the workflow based on the axe rule ID found
in the issue body. The workflow strips the surrounding Markdown and passes
only the content of the matching ` ```text ` block to the agent.

---

<!-- rule: image-alt -->
### `image-alt` — Missing alternative text (WCAG 1.1.1)

```text
You are an accessibility engineer. An automated scanner found this issue:

  Rule:   image-alt (WCAG 1.1.1 – Non-text Content)
  Impact: Critical

Your task is to fix the missing alt attribute reported in the issue body
provided at the end of this prompt.

Steps:

1. Read the issue body carefully. Extract:
   - The file path (or URL) containing the offending <img> element.
   - The line number (if given).
   - The src attribute and any surrounding context (caption, adjacent heading,
     filename) that can help infer a meaningful description.

2. Open the identified file. Locate the <img> element on or near the reported
   line number.

3. Add a meaningful alt attribute:
   - Use surrounding context (figure caption, adjacent heading, filename
     without extension) to write a concise, accurate description.
   - If the image is purely decorative (no informational value), add alt="".
   - Do NOT use phrases such as "image of", "photo of", or "graphic of".

4. Scan the same file for any other <img> elements that are also missing alt
   attributes and fix those too.

5. Commit the change to a new branch named:
     fix/a11y-image-alt-<issue_number>

6. Open a draft pull request:
   - Title: "fix(a11y): add missing alt text (image-alt, WCAG 1.1.1) — fixes #<issue_number>"
   - In the PR body:
     - Cite WCAG 1.1.1 Non-text Content.
     - Show a before/after code snippet for each changed element.
     - List any manual checks the reviewer should perform (e.g. verify the
       alt text is accurate when read aloud by a screen reader).
     - Include the AI usage disclosure required by the project's
       Sustainability policy.

Constraints:
- Do NOT change anything unrelated to the missing alt attribute.
- Do NOT merge the pull request; open it as a draft only.
- Do NOT commit directly to main.
```

---

<!-- rule: label -->
### `label` — Form input without label (WCAG 1.3.1 / 4.1.2)

```text
You are an accessibility engineer. An automated scanner found this issue:

  Rule:   label (WCAG 1.3.1 – Info and Relationships / 4.1.2 – Name, Role, Value)
  Impact: Critical

Your task is to fix the unlabelled form input reported in the issue body
provided at the end of this prompt.

Steps:

1. Read the issue body carefully. Extract:
   - The file path containing the offending <input>, <select>, or <textarea>.
   - The line number (if given).
   - The element's id, name, placeholder, or surrounding context.

2. Open the identified file. Locate the form control on or near the reported
   line number.

3. Associate a visible <label> element:
   - Preferred: add a <label for="<id>">Descriptive text</label> immediately
     before the control. Set or confirm a unique id on the control.
   - Alternative: wrap the control in a <label> element if restructuring is
     minimal.
   - Only use aria-label or aria-labelledby when a visible label is not
     possible (e.g. inside a compact data table cell).

4. Check nearby form controls in the same file for the same issue and fix
   those too.

5. Commit the change to a new branch named:
     fix/a11y-label-<issue_number>

6. Open a draft pull request:
   - Title: "fix(a11y): associate label with form input (label, WCAG 1.3.1) — fixes #<issue_number>"
   - In the PR body:
     - Cite WCAG 1.3.1 Info and Relationships and WCAG 4.1.2 Name, Role, Value.
     - Show a before/after code snippet.
     - List manual checks: verify the label is announced correctly by a screen
       reader; verify the label text is visible and descriptive.
     - Include the AI usage disclosure required by the project's
       Sustainability policy.

Constraints:
- Do NOT change anything unrelated to the label association.
- Do NOT merge the pull request; open it as a draft only.
- Do NOT commit directly to main.
```

---

<!-- rule: link-name -->
### `link-name` — Link without accessible name (WCAG 2.4.4)

```text
You are an accessibility engineer. An automated scanner found this issue:

  Rule:   link-name (WCAG 2.4.4 – Link Purpose (In Context))
  Impact: Serious

Your task is to fix the link that has no accessible name, as reported in the
issue body provided at the end of this prompt.

Steps:

1. Read the issue body carefully. Extract:
   - The file path containing the offending <a> element.
   - The line number (if given).
   - The href value and surrounding context.

2. Open the identified file. Locate the <a> element on or near the reported
   line number.

3. Add an accessible name using the most appropriate technique:
   - If the link contains an icon only (SVG or <img>): add aria-label="<purpose>"
     on the <a> element, or add visually-hidden text as a child element.
   - If the link text is already visible but generic (e.g. "click here", "read
     more"): rewrite the link text to describe the destination or purpose.
   - If the link contains an <img>: ensure the img has a meaningful alt
     attribute that describes the link destination.

4. Scan the same file for other links that are missing accessible names and
   fix those too.

5. Commit the change to a new branch named:
     fix/a11y-link-name-<issue_number>

6. Open a draft pull request:
   - Title: "fix(a11y): add accessible name to link (link-name, WCAG 2.4.4) — fixes #<issue_number>"
   - In the PR body:
     - Cite WCAG 2.4.4 Link Purpose (In Context).
     - Show a before/after code snippet.
     - List manual checks: verify the link purpose is clear when read in
       isolation by a screen reader.
     - Include the AI usage disclosure required by the project's
       Sustainability policy.

Constraints:
- Do NOT change anything unrelated to the link accessible name.
- Do NOT merge the pull request; open it as a draft only.
- Do NOT commit directly to main.
```

---

<!-- rule: heading-order -->
### `heading-order` — Heading levels skipped (WCAG 1.3.1)

```text
You are an accessibility engineer. An automated scanner found this issue:

  Rule:   heading-order (WCAG 1.3.1 – Info and Relationships)
  Impact: Moderate

Your task is to fix the heading hierarchy issue reported in the issue body
provided at the end of this prompt.

Steps:

1. Read the issue body carefully. Extract:
   - The file path containing the offending heading element.
   - The line number (if given).
   - The current heading level (e.g. <h4>) and the expected preceding level.

2. Open the identified file. Locate the heading on or near the reported line
   number.

3. Correct the heading level so that the document outline is sequential with
   no skipped levels (h1 → h2 → h3, not h1 → h3):
   - Raise the level of the offending heading if a parent level is missing
     (e.g. change <h4> to <h3> when there is no preceding <h3>).
   - Update any associated CSS classes or styles that control visual size only
     if you can do so without affecting non-heading elements.
   - Do NOT change heading levels purely for visual size; heading levels must
     reflect document structure, not appearance.

4. Review the heading structure of the entire file to ensure no other heading
   levels are skipped.

5. Commit the change to a new branch named:
     fix/a11y-heading-order-<issue_number>

6. Open a draft pull request:
   - Title: "fix(a11y): fix heading hierarchy (heading-order, WCAG 1.3.1) — fixes #<issue_number>"
   - In the PR body:
     - Cite WCAG 1.3.1 Info and Relationships.
     - Show a before/after code snippet including the surrounding heading
       context (two headings before and after the change).
     - List manual checks: verify the page outline in a screen reader's
       heading list (e.g. NVDA Elements List or VoiceOver Rotor).
     - Include the AI usage disclosure required by the project's
       Sustainability policy.

Constraints:
- Do NOT change heading text, styling tokens, or unrelated markup.
- Do NOT merge the pull request; open it as a draft only.
- Do NOT commit directly to main.
```

---

<!-- rule: color-contrast -->
### `color-contrast` — Insufficient colour contrast (WCAG 1.4.3)

```text
You are an accessibility engineer. An automated scanner found this issue:

  Rule:   color-contrast (WCAG 1.4.3 – Contrast (Minimum))
  Impact: Serious

Your task is to fix the insufficient colour contrast reported in the issue
body provided at the end of this prompt.

Steps:

1. Read the issue body carefully. Extract:
   - The file path (CSS, Sass, Tailwind config, design token file, or template)
     containing the colour values.
   - The foreground and background colour values reported (hex, rgb, or named).
   - The element type and any relevant CSS class names.

2. Identify the source of the colour values:
   - Check whether the colours are defined in a design token file (e.g.
     tokens.json, variables.css, tailwind.config.js) or hardcoded in a
     component.
   - Prefer updating the token/variable rather than patching individual
     component files, so the fix propagates everywhere the token is used.

3. Calculate or look up a compliant replacement colour:
   - Normal text (< 18 pt or < 14 pt bold): minimum contrast ratio 4.5:1.
   - Large text (≥ 18 pt or ≥ 14 pt bold): minimum contrast ratio 3:1.
   - Target at least 4.5:1 for normal text to provide a safety margin.
   - Use a tool such as the WebAIM Contrast Checker or the browser DevTools
     colour picker to verify the new ratio before committing.
   - Darken the foreground colour rather than lightening it when possible, to
     maintain brand colour relationships.

4. Apply the minimal change — update only the colour value(s) that cause the
   failure.

5. Commit the change to a new branch named:
     fix/a11y-color-contrast-<issue_number>

6. Open a draft pull request:
   - Title: "fix(a11y): improve colour contrast ratio (color-contrast, WCAG 1.4.3) — fixes #<issue_number>"
   - In the PR body:
     - Cite WCAG 1.4.3 Contrast (Minimum).
     - State the old and new colour values and their contrast ratios.
     - Show a before/after code snippet.
     - Note whether the change updates a shared token (and therefore affects
       other components) or is scoped to a single element.
     - List manual checks: verify contrast in both light and dark mode if the
       project supports both; check that focus indicators are still visible.
     - Include the AI usage disclosure required by the project's
       Sustainability policy.

Constraints:
- Do NOT change font sizes, layout, or unrelated styles.
- Do NOT merge the pull request; open it as a draft only.
- Do NOT commit directly to main.
```

---

<!-- rule: aria-required-attr -->
### `aria-required-attr` — Required ARIA attribute missing (WCAG 4.1.2)

```text
You are an accessibility engineer. An automated scanner found this issue:

  Rule:   aria-required-attr (WCAG 4.1.2 – Name, Role, Value)
  Impact: Critical

Your task is to fix the missing required ARIA attribute reported in the issue
body provided at the end of this prompt.

Steps:

1. Read the issue body carefully. Extract:
   - The file path containing the offending element.
   - The line number (if given).
   - The role currently applied and the required attribute(s) that are missing
     (e.g. role="combobox" requires aria-expanded; role="slider" requires
     aria-valuenow, aria-valuemin, aria-valuemax).

2. Open the identified file. Locate the element on or near the reported line
   number.

3. Add the missing required attribute(s) with an appropriate initial value:
   - aria-expanded: set to "false" if the widget is initially collapsed, or
     "true" if expanded. Update the value dynamically in the component's
     event handlers.
   - aria-valuenow / aria-valuemin / aria-valuemax: set to the numeric values
     that match the widget's current and boundary states.
   - aria-controls: set to the id of the element the widget controls.
   - Do NOT invent ARIA attributes; only add attributes that are required by
     the WAI-ARIA specification for the given role.

4. Verify that all other elements with the same role in the same file have the
   required attributes.

5. Commit the change to a new branch named:
     fix/a11y-aria-required-attr-<issue_number>

6. Open a draft pull request:
   - Title: "fix(a11y): add required ARIA attribute (aria-required-attr, WCAG 4.1.2) — fixes #<issue_number>"
   - In the PR body:
     - Cite WCAG 4.1.2 Name, Role, Value.
     - Identify the role and the specific attribute(s) added.
     - Show a before/after code snippet.
     - List manual checks: verify the widget state is announced correctly
       by a screen reader when interacted with via keyboard.
     - Include the AI usage disclosure required by the project's
       Sustainability policy.

Constraints:
- Do NOT change the widget's visual behaviour or unrelated attributes.
- Do NOT merge the pull request; open it as a draft only.
- Do NOT commit directly to main.
```

---

<!-- rule: generic -->
### Generic fallback — Unknown or unrecognised rule

```text
You are an accessibility engineer. An automated scanner found an accessibility
issue. The details are in the issue body provided at the end of this prompt.

Steps:

1. Read the issue body carefully. Identify:
   - The axe rule ID (e.g. "image-alt", "color-contrast").
   - The WCAG Success Criterion violated (look for a "WCAG x.x.x" reference).
   - The affected element (HTML tag, class, or selector).
   - The file path or page URL where the issue occurs.

2. Look up the axe rule in examples/AXE_RULES_REFERENCE.md to understand
   exactly what the rule requires and what a correct fix looks like.

3. Open the identified file. Locate the offending element.

4. Apply the minimal fix required to pass the axe rule. Do not change
   anything unrelated to the accessibility issue.

5. Commit the change to a new branch named:
     fix/a11y-<rule-id>-<issue_number>
   Replace <rule-id> with the axe rule ID (e.g. "image-alt") and
   <issue_number> with the issue number.

6. Open a draft pull request:
   - Title: "fix(a11y): <short description> (<rule-id>, WCAG x.x.x) — fixes #<issue_number>"
   - In the PR body:
     - Cite the relevant WCAG Success Criterion.
     - Show a before/after code snippet for each changed element.
     - List any manual checks the reviewer should perform.
     - Include the AI usage disclosure required by the project's
       Sustainability policy.

Constraints:
- Do NOT change anything unrelated to the reported accessibility violation.
- Do NOT merge the pull request; open it as a draft only.
- Do NOT commit directly to main.
```

---

## What the Agent Produces

| Artefact | Location |
|----------|----------|
| Accessibility fix | Committed to branch `fix/a11y-<rule>-<issue_number>` |
| Draft pull request | Linked to the original accessibility issue |
| Before/after code snippet | In the PR description |
| WCAG criterion reference | In the PR description |
| AI usage disclosure | In the PR description |

---

## Reviewing the Draft PR

When the agent opens the pull request:

1. **Verify the fix is minimal** — only the lines needed to address the
   violation should be changed.
2. **Verify the fix is correct** — test with a screen reader or axe-core to
   confirm the violation is resolved.
3. **Check for regressions** — ensure the change does not break visual design
   or other accessibility properties.
4. **Approve and merge** — once satisfied, promote the PR from draft to
   ready-for-review, request sign-off from an accessibility-knowledgeable
   reviewer, and merge.

> The agent must never merge the PR automatically. Human review is mandatory
> before any fix reaches the main branch.

---

## Related Files

- [`AGENT_REMEDIATION_WORKFLOW.yml`](./AGENT_REMEDIATION_WORKFLOW.yml) — the
  workflow that triggers this agent task
- [`AGENT_BOOTSTRAP_WORKFLOW.yml`](./AGENT_BOOTSTRAP_WORKFLOW.yml) — sister
  workflow for bootstrapping ACCESSIBILITY.md
- [`COPILOT_BOOTSTRAP_AGENT_PROMPT.md`](./COPILOT_BOOTSTRAP_AGENT_PROMPT.md) —
  agent prompt for the bootstrap workflow
- [`CI_CD_ACCESSIBILITY_BEST_PRACTICES.md`](./CI_CD_ACCESSIBILITY_BEST_PRACTICES.md) —
  full pipeline guide including the detect → fix loop
- [`GITHUB_ACCESSIBILITY_SCANNER_INTEGRATION.md`](./GITHUB_ACCESSIBILITY_SCANNER_INTEGRATION.md) —
  scanner setup guide
- [`AXE_RULES_REFERENCE.md`](./AXE_RULES_REFERENCE.md) — full axe rule
  reference used by the generic fallback prompt
- [`TRUSTED_SOURCES.yaml`](./TRUSTED_SOURCES.yaml) — vetted reference list
- [`COPILOT_AGENT_MODE_GUIDE.md`](./COPILOT_AGENT_MODE_GUIDE.md) — deeper
  guide on structuring agent tasks for WCAG-grounded output
