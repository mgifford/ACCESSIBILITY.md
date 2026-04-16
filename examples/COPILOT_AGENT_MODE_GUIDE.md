---
title: Copilot Agent Mode Guide — WCAG-Grounded Code Generation
---

# Copilot Agent Mode Guide: Structuring AGENTS.md for WCAG-Grounded Code Generation

This guide explains how to evolve an `AGENTS.md` file to support **GitHub Copilot agent mode** — where Copilot operates autonomously across multiple files and steps rather than completing a single inline suggestion. It documents the prompting patterns that reliably produce WCAG 2.2 AA-compliant output in agent mode.

> **GitHub plan requirement**: GitHub Copilot agent mode (multi-step autonomous editing) requires a **GitHub Copilot Individual, Business, or Enterprise** subscription with the agent-mode feature enabled. See the [GitHub Copilot documentation](https://docs.github.com/en/copilot) for current plan details.

---

## Why Agent Mode Needs a Different AGENTS.md Structure

Inline-suggestion assistants (Copilot autocomplete, chat) complete a single suggestion or answer a single question. **Agent mode** plans and executes multi-step tasks autonomously — reading files, editing code, running tools, and iterating.

A standard `AGENTS.md` written for inline suggestions typically:

- Gives general instructions ("comply with WCAG 2.2 AA") without breaking tasks into steps.
- Lacks tool-use guidance (when to run axe-core vs. apply a pattern from docs).
- Has no stopping conditions.
- Does not distinguish autonomous tasks from tasks requiring human review.
- Does not specify the structured output (PR description, commit message) that makes agent contributions reviewable.

The sections below address each of these gaps.

---

## Section 1: Dual-Audience AGENTS.md Structure

Structure `AGENTS.md` so that the inline-suggestion section and the agent-mode section are clearly separated. Both audiences read the same file; the structure lets each section give appropriately granular instructions.

```markdown
## For inline-suggestion assistants

- Follow WCAG 2.2 AA for all UI changes.
- Use semantic HTML, proper ARIA, and sufficient colour contrast.
- Provide text alternatives for all non-text content.
- Never use colour alone to communicate state.

---

## For GitHub Copilot agent mode

> Requires GitHub Copilot with agent mode enabled.

### Pre-flight checks (always run first)

1. Read `ACCESSIBILITY.md` to understand the project's current conformance
   level and known gaps.
2. Read `examples/TRUSTED_SOURCES.yaml` before citing any external reference.
   If `ai_scraping: prohibited`, do not fetch the content.
3. If the task touches a component type listed in the component-specific
   guidance section, read that guide before writing any code.
4. Identify which WCAG 2.2 AA Success Criterion the task relates to before
   proposing a solution.

### Task decomposition

Break any UI change into sequential layers and verify each before proceeding:

| Layer | What to verify |
|-------|---------------|
| **HTML structure** | Semantic elements, heading hierarchy, landmark roles |
| **ARIA attributes** | Only valid roles/states/properties for the host element |
| **Keyboard behaviour** | Tab order matches visual order; focus indicator always visible |
| **Visual presentation** | Contrast ≥ 4.5:1 text, ≥ 3:1 non-text; respects `prefers-reduced-motion` |

### Stopping conditions

Stop and request human review if any of these apply:

- You cannot determine whether a change affects keyboard navigation without
  running the application.
- The fix requires modifying more than three files.
- The change involves colour contrast and design-system tokens are not in the
  repository.
- The component relies on a third-party library whose source is not accessible.
- The correct WCAG Success Criterion is ambiguous.

### Required PR output

Every agent-authored PR must include:

- The WCAG Success Criterion (e.g. `WCAG 1.3.1 Info and Relationships`) for
  each accessibility change.
- A before/after code snippet for each modified element.
- A list of automated checks run (or "not run – requires live environment").
- A list of manual checks needed before merge.
- AI usage disclosure.
```

### Why this structure works

- The `##` heading signals to the agent's context window that the section applies to its operational mode.
- Pre-flight checks front-load the most important context before the agent writes any code.
- The layered task decomposition prevents the agent from jumping to visual polish before fixing structural issues.
- Stopping conditions give the agent a clear decision tree, reducing over-confident autonomous fixes.

---

## Section 2: WCAG Criterion → Agent Task Patterns

Map each WCAG principle to specific agent instructions. These patterns should be included verbatim or adapted in the agent-mode section of `AGENTS.md`.

| WCAG Principle | Agent task pattern |
|----------------|-------------------|
| **Perceivable (1.x)** | For every non-text element, infer purpose from context and add a text alternative. If purpose is ambiguous, mark as `<!-- TODO: verify alt -->` and explain in the PR. Never use colour as the sole conveyor of information. |
| **Operable (2.x)** | Test keyboard interaction mentally: Tab order must follow visual order. Every interactive element must be reachable by keyboard and have a visible focus indicator. No keyboard traps. |
| **Understandable (3.x)** | Error messages must identify the field, describe the error, and suggest a correction. Never communicate state by colour alone. Language of the page must be set (`lang` attribute). |
| **Robust (4.x)** | Validate ARIA usage against the ARIA spec. Do not use roles, states, or properties not permitted on the host element. Dynamic content updates must be announced without forcibly moving focus. |

### Worked example: Perceivable — missing image alt text (WCAG 1.1.1)

**Task**: Add alt text to a decorative image and an informative image in the same component.

**Before**:
```html
<img src="hero-background.jpg">
<img src="chart-q3-revenue.png">
```

**Agent reasoning**:
1. `hero-background.jpg` — name suggests a decorative background. Mark with empty alt.
2. `chart-q3-revenue.png` — name suggests informative data. Cannot determine full meaning without seeing the chart; mark as TODO and explain in PR.

**After**:
```html
<!-- Decorative: empty alt removes it from the accessibility tree -->
<img src="hero-background.jpg" alt="">

<!-- Informative: TODO — alt text requires reviewing chart data -->
<!-- TODO: verify alt — replace with a concise description of the chart's key finding,
     e.g. alt="Q3 revenue rose 12% year-over-year to $4.2M" -->
<img src="chart-q3-revenue.png" alt="Q3 revenue chart — description needed">
```

**PR annotation**:
> WCAG 1.1.1 Non-text Content: `hero-background.jpg` marked as decorative (empty alt). `chart-q3-revenue.png` needs a human-authored description — see inline TODO. Automated check: not run (requires live environment). Manual check needed: confirm chart description with content owner before merge.

---

### Worked example: Operable — missing focus indicator (WCAG 2.4.7, 2.4.11)

**Task**: A custom button removes the default outline without providing a replacement focus style.

**Before**:
```css
.btn-custom {
  outline: none; /* Removes focus ring — WCAG 2.4.7 failure */
}
```

**Agent reasoning**:
1. `outline: none` without a replacement violates WCAG 2.4.7 Focus Visible (AA) and 2.4.11 Focus Appearance (AA, WCAG 2.2).
2. Replace with a high-contrast custom focus ring using `focus-visible` to avoid showing the ring on mouse click.

**After**:
```css
.btn-custom {
  outline: none; /* Suppress default only */
}

.btn-custom:focus-visible {
  outline: 3px solid #005fcc; /* Meets WCAG 2.4.11: ≥ 2px, sufficient contrast */
  outline-offset: 2px;
}
```

**PR annotation**:
> WCAG 2.4.7 Focus Visible & 2.4.11 Focus Appearance: replaced `outline: none` with a `focus-visible` ring of 3 px at `#005fcc`. Automated check: not run (requires live environment). Manual check needed: verify contrast of `#005fcc` against all button background states (default, hover, disabled).

---

### Worked example: Understandable — missing form error (WCAG 3.3.1, 3.3.3)

**Task**: A form field shows a red border on invalid input but provides no programmatic error message.

**Before**:
```html
<label for="email">Email</label>
<input type="email" id="email" class="error">
<!-- Red border only — colour conveys state, no text error -->
```

**Agent reasoning**:
1. Colour-only error indication violates WCAG 1.4.1 Use of Colour and 3.3.1 Error Identification.
2. Must add an associated error message with `aria-describedby` and `aria-invalid`.
3. Error text must identify the field, describe the problem, and suggest a fix (WCAG 3.3.3).

**After**:
```html
<label for="email">Email</label>
<input type="email" id="email"
       aria-describedby="email-error"
       aria-invalid="true"
       class="error">
<span id="email-error" role="alert">
  Enter a valid email address, for example: name@example.com
</span>
```

**PR annotation**:
> WCAG 1.4.1 Use of Colour, 3.3.1 Error Identification, 3.3.3 Error Suggestion: added programmatic error message linked via `aria-describedby`; `aria-invalid="true"` set on invalid field; `role="alert"` announces error on inject. Automated check: not run (requires live environment). Manual check needed: verify screen reader announces error text on blur and on form submit attempt.

---

### Worked example: Robust — invalid ARIA role (WCAG 4.1.2)

**Task**: A `<div>` is used as an interactive button with an incorrect ARIA role.

**Before**:
```html
<!-- role="link" is wrong for a button action; also missing keyboard support -->
<div role="link" onclick="submitForm()">Submit</div>
```

**Agent reasoning**:
1. `role="link"` is semantically incorrect for a form submission action (links navigate; buttons act).
2. `<div>` is not keyboard-operable by default — missing `tabindex` and `keydown` handler.
3. Prefer the native `<button>` element which provides role, keyboard support, and focus management for free.

**After**:
```html
<!-- Use native <button>: correct implicit role, keyboard support, focus management -->
<button type="submit">Submit</button>
```

**PR annotation**:
> WCAG 4.1.2 Name, Role, Value: replaced `<div role="link">` with native `<button type="submit">`. Native element provides correct implicit role (`button`), keyboard operability, and focus management without additional ARIA or JavaScript. Automated check: not run (requires live environment). Manual check needed: verify form submits on Enter key and that screen reader announces "Submit, button".

---

## Section 3: Stopping Conditions

Include these in the agent-mode section of `AGENTS.md` exactly as shown, or adapt them to your project's context.

### When to stop and ask for human review

| Condition | Reason |
|-----------|--------|
| Cannot determine keyboard impact without running the app | Agent cannot emulate a browser focus model reliably |
| Fix touches more than three files | Risk of cascading regressions; human review needed |
| Colour contrast fix required but no design tokens in repo | Agent cannot reliably calculate contrast ratios for all states |
| Component uses a third-party library whose source is inaccessible | Agent cannot verify ARIA contract of custom widgets |
| Correct WCAG Success Criterion is ambiguous | Misidentifying the criterion leads to wrong fix |
| Multiple "Low" findings cluster on a single user journey | Aggregate impact may be "Critical" — requires human triage |

### Signals that a task is safe to complete autonomously

- The fix is confined to a single file.
- The WCAG criterion is unambiguous (e.g. missing `<label>`, empty alt, missing `lang`).
- The fix uses a native HTML element or well-known ARIA pattern.
- The project has a design-token file that defines colour values used in the component.

---

## Section 4: Output Format Expectations

Specify what a well-formed agent PR looks like. Add this to the `Required PR output` section of your `AGENTS.md`.

### PR description template

```markdown
## Accessibility changes

### [Component or file name]

**WCAG criterion**: [e.g. WCAG 1.3.1 Info and Relationships]
**Severity**: [Critical / Serious / Moderate / Minor]

**Before**:
```[language]
[Original code]
```

**After**:
```[language]
[Updated code]
```

**Reasoning**: [1–3 sentences explaining the fix]

---

## Automated checks

- [ ] axe-core: [ran / not run – requires live environment]
- [ ] Lighthouse: [ran / not run – requires live environment]
- [ ] Link checker: [ran / not applicable]

## Manual checks required before merge

- [ ] [Specific screen reader + browser combination]
- [ ] [Keyboard-only navigation test]
- [ ] [Any colour contrast verification needed]

## AI usage disclosure

This PR was authored with GitHub Copilot agent mode. All changes were reviewed
for accuracy against WCAG 2.2 AA criteria.
```

### Commit message convention

```
fix(a11y): [short description] — WCAG [criterion number]

Examples:
fix(a11y): add alt text to hero image — WCAG 1.1.1
fix(a11y): associate error message with email field — WCAG 3.3.1
fix(a11y): replace outline:none with focus-visible ring — WCAG 2.4.7
```

---

## Section 5: Testing the Guide

This section documents a simple test of whether the guide is effective: can a Copilot agent, given only `AGENTS.md` and this guide, correctly fix a missing form label?

### Test input

Provide the agent with this HTML snippet and the instruction: *"Fix all accessibility issues in this form."*

```html
<form>
  <input type="text" placeholder="Full name" name="name">
  <input type="email" placeholder="Email" name="email">
  <div onclick="submitForm()" style="background:red; color:white; padding:8px">
    Send
  </div>
</form>
```

### Expected agent output

The agent should:

1. **Identify the issues** (pre-flight / task decomposition):
   - Missing `<label>` elements → WCAG 1.3.1, 3.3.2
   - Placeholder-only labelling → placeholder disappears on input, not a reliable label
   - `<div>` acting as button with no keyboard support → WCAG 4.1.2, 2.1.1
   - Colour-only affordance (red background) for button → not a WCAG violation on its own, but worth noting
   - `<div onclick>` not keyboard-operable → WCAG 2.1.1

2. **Produce the fix**:

```html
<form>
  <div>
    <label for="name">Full name</label>
    <input type="text" id="name" name="name" autocomplete="name">
  </div>
  <div>
    <label for="email">Email</label>
    <input type="email" id="email" name="email" autocomplete="email">
  </div>
  <button type="submit">Send</button>
</form>
```

3. **Write a compliant PR description** (see Section 4 template above).

### Pass criteria

| Criterion | Pass |
|-----------|------|
| Both `<input>` fields have programmatically associated `<label>` elements | ✅ |
| `<div>` button replaced with native `<button type="submit">` | ✅ |
| Placeholder text not used as the sole label | ✅ |
| PR description includes WCAG criterion references | ✅ |
| PR description includes before/after snippets | ✅ |
| PR description lists manual checks needed | ✅ |

### Failure modes to watch for

- Agent fixes only one of the two missing labels (incomplete task).
- Agent adds `aria-label` to `<div>` instead of replacing with `<button>` (over-reliance on ARIA).
- Agent removes placeholder text entirely without adding labels first (introduces new issue).
- PR description missing WCAG criterion reference (incomplete output format).

---

## Quick Reference: Agent Mode Checklist for AGENTS.md

Use this checklist when authoring or reviewing the agent-mode section of any `AGENTS.md`:

- [ ] Pre-flight checks listed (ACCESSIBILITY.md, TRUSTED_SOURCES.yaml, component guides)
- [ ] Task decomposition layers defined (HTML → ARIA → keyboard → visual)
- [ ] WCAG principle → task patterns present (Perceivable, Operable, Understandable, Robust)
- [ ] Stopping conditions listed
- [ ] Required PR output format specified (WCAG criterion, before/after, automated checks, manual checks, AI disclosure)
- [ ] Distinction between autonomous tasks and human-review tasks is clear

---

## Related Resources

- [AGENTS.md](../AGENTS.md) — AI agent instructions for this project
- [ACCESSIBILITY_PROMPT_STARTER.md](./ACCESSIBILITY_PROMPT_STARTER.md) — One-shot prompts for human-to-LLM interactions
- [CI_CD_ACCESSIBILITY_BEST_PRACTICES.md](./CI_CD_ACCESSIBILITY_BEST_PRACTICES.md) — Automated testing in CI pipelines
- [FORMS_ACCESSIBILITY_BEST_PRACTICES.md](./FORMS_ACCESSIBILITY_BEST_PRACTICES.md) — Form-specific accessibility requirements
- [KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md](./KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md) — Keyboard interaction patterns
- [wai-yaml-ld](https://github.com/mgifford/wai-yaml-ld) — Machine-readable WCAG/ARIA/ATAG standards for agents
- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/) — W3C WAI criterion lookup
- [GitHub Copilot documentation](https://docs.github.com/en/copilot) — Feature requirements and plan information
