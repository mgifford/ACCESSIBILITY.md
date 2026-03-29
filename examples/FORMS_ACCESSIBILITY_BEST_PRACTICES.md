---
title: Forms Accessibility Best Practices
---

# Forms Accessibility Best Practices

This document defines project-level requirements for accessible form design, validation, and error handling.

## Core Principle

All users must be able to understand, complete, and submit forms with assistive technologies, keyboard-only input, and varying cognitive needs.

---

## Severity Scale

| Level | Meaning |
| --- | --- |
| **Critical** | Blocks task completion entirely for one or more disability groups |
| **Serious** | Significantly impairs access; workaround unreasonable to expect |
| **Moderate** | Creates friction; workaround exists and is not too burdensome |
| **Minor** | Best-practice gap; marginal impact on access |

---

## Critical: Labels

Every form control must have a programmatically associated label.
**Missing labels are Critical** — screen reader users cannot identify the field.

- Never use placeholder text as the sole label — it disappears on input, fails
  contrast requirements, and is not reliably announced by all screen readers.
- Required fields must be identified in text, not by colour alone.

```html
<!-- Bad: placeholder as only label — CRITICAL issue -->
<input type="email" placeholder="Email address">

<!-- Good: explicit label -->
<label for="email">
  Email address <span class="visually-hidden">(required)</span>
</label>
<input type="email" id="email" autocomplete="email" required>
```

**On `aria-required`:** Do not add `aria-required="true"` to native inputs
that already have the HTML `required` attribute — it is redundant and adds
noise to the accessibility tree. Use `aria-required` only on custom widgets
(e.g., `role="combobox"`, `role="listbox"`) that cannot use the native attribute.

---

## Critical: Error Identification

Errors must be programmatically associated with their field.
**Absent error identification is Critical** — blind users receive no indication
something is wrong.

- Mark invalid fields with `aria-invalid="true"`.
- Error messages must be specific and actionable — not just "invalid input".
- Never use colour alone to indicate an error.
- Associate the error message with the field via `aria-describedby`.

```html
<label for="email">Email address</label>
<input type="email" id="email"
       aria-describedby="email-error"
       aria-invalid="true">
<span id="email-error" role="alert">
  Enter a valid email address, for example: name@example.com
</span>
```

Remove `aria-invalid` and the error message once the field is corrected.

---

## Critical: Error Summary

For multi-error submissions, provide a focused error summary so keyboard and
screen reader users are immediately oriented to what went wrong.
**No error summary on multi-error forms is Critical.**

```html
<div role="alert" aria-labelledby="error-heading"
     tabindex="-1" id="error-summary">
  <h2 id="error-heading">There are 2 errors in this form</h2>
  <ul>
    <li><a href="#email">Email address – enter a valid email</a></li>
    <li><a href="#dob">Date of birth – enter a real date</a></li>
  </ul>
</div>
```

Move focus to `#error-summary` immediately after a failed submit.
Each link in the list must take focus directly to the affected field.

---

## Critical: Do Not Block Paste

Never block paste, copy, or standard keyboard actions on any input.
**Blocking paste is Critical** — users with motor disabilities and those who use
password managers cannot re-type credentials they cannot physically type.

---

## Serious: Grouping Related Controls

Use `<fieldset>` + `<legend>` for related controls.
**Missing grouping is Serious** — radio and checkbox groups become unintelligible
without a group label.

```html
<fieldset>
  <legend>Notification preferences</legend>
  <label><input type="checkbox" name="email-notify"> Email</label>
  <label><input type="checkbox" name="sms-notify"> SMS</label>
</fieldset>
```

---

## Serious: Input Types

Use the most specific applicable input type. This surfaces the correct virtual
keyboard on mobile and provides semantic meaning to assistive technologies.

| Need | Use | Avoid |
| --- | --- | --- |
| Email address | `type="email"` | `type="text"` |
| Phone number | `type="tel"` | `type="number"` |
| Search | `type="search"` | `type="text"` |
| Web URL | `type="url"` | `type="text"` |
| Password | `type="password"` | `type="text"` |
| Date | See date guidance below | `type="text"` alone |

### `type="number"` — use with caution

`type="number"` has inconsistent screen reader support and unexpected behaviour
(scroll wheel changes values, non-numeric characters silently stripped).
**Prefer `type="text"` with `inputmode="numeric"` and `pattern="[0-9]*"`**
for quantities, codes, and amounts:

```html
<!-- Good: text input with numeric keyboard on mobile -->
<label for="quantity">Quantity</label>
<input type="text" id="quantity"
       inputmode="numeric"
       pattern="[0-9]*"
       autocomplete="off">
```

### Date inputs

Native `<input type="date">` has reasonable accessibility support in modern
browsers but inconsistent screen reader announcement. Evaluate against your
AT support matrix before using.

For complex date ranges or date pickers, prefer three separate labelled inputs
(day/month/year) over a custom calendar widget — they work with all AT without
JavaScript:

```html
<fieldset>
  <legend>Date of birth</legend>
  <label for="dob-day">Day</label>
  <input type="text" id="dob-day" inputmode="numeric"
         pattern="[0-9]{1,2}" autocomplete="bday-day"
         aria-describedby="dob-hint">
  <label for="dob-month">Month</label>
  <input type="text" id="dob-month" inputmode="numeric"
         pattern="[0-9]{1,2}" autocomplete="bday-month">
  <label for="dob-year">Year</label>
  <input type="text" id="dob-year" inputmode="numeric"
         pattern="[0-9]{4}" autocomplete="bday-year">
  <p id="dob-hint">For example: 23 4 1980</p>
</fieldset>
```

### `<select multiple>` — avoid

`<select multiple>` has poor usability for many users, including those
with motor and cognitive disabilities. The multi-select interaction (hold Shift
or Ctrl while clicking) is non-obvious and keyboard-unfriendly.

**Prefer checkboxes inside a `<fieldset>` for multiple selection:**

```html
<fieldset>
  <legend>Topics (select all that apply)</legend>
  <label><input type="checkbox" name="topic" value="html"> HTML</label>
  <label><input type="checkbox" name="topic" value="css"> CSS</label>
  <label><input type="checkbox" name="topic" value="js"> JavaScript</label>
</fieldset>
```

---

## Serious: Autocomplete for Personal Data

Missing `autocomplete` on personal-data fields is **Serious** — it directly
impacts users with motor disabilities and cognitive conditions who rely on
autofill to avoid retyping.

```html
<input type="text"     id="name"         autocomplete="name">
<input type="email"    id="email"        autocomplete="email">
<input type="tel"      id="phone"        autocomplete="tel">
<input type="text"     id="street"       autocomplete="street-address">
<input type="text"     id="city"         autocomplete="address-level2">
<input type="text"     id="postal"       autocomplete="postal-code">
<input type="password" id="current-pass" autocomplete="current-password">
<input type="password" id="new-pass"     autocomplete="new-password">
```

Full list of valid `autocomplete` token values:
[WCAG 1.3.5 Input Purposes](https://www.w3.org/TR/WCAG21/#input-purposes)

---

## Serious: Async and Status Feedback

- Use `aria-live="polite"` for non-critical updates (character counts, inline validation).
- Use `aria-live="assertive"` **only** for blocking failures — it interrupts the screen reader immediately.
- Announce submission success and failure to assistive technology.

**Silent async failures are Serious** — screen reader users have no indication
the action completed or failed.

---

## Serious: Error Prevention (Legal, Financial, Data)

For forms that result in legal commitments, financial transactions, or permanent
data changes, users must be able to do at least one of:

- **Check** — review their input before final submission.
- **Correct** — reverse, cancel, or modify the submission afterwards.
- **Confirm** — an explicit confirmation step before the action is finalised.

```html
<!-- Confirmation step pattern -->
<h2>Review your order</h2>
<dl>
  <dt>Item</dt><dd>Annual plan</dd>
  <dt>Amount</dt><dd>$120.00</dd>
</dl>
<button type="submit">Confirm and pay</button>
<a href="/cart">Edit order</a>
```

This is **Serious** for most forms and may become **Critical** in regulated
contexts (financial services, legal agreements, medical data) where the error
cannot be undone (WCAG 3.3.4).

---

## Moderate: Instructions

Provide concise instructions before complex input groups.

- Place instructions before the input, not after.
- Provide format examples for unusual inputs: `Date: DD/MM/YYYY`.
- Associate instructions with the field via `aria-describedby`.

---

## Moderate: Session Timeout Warning

If the form session can expire, users must be warned before timeout occurs
(WCAG 2.2.1 Timing Adjustable). Give at least 20 seconds to extend the session,
and the warning itself must be accessible to assistive technology.

```html
<!-- Timeout warning — inject when ~2 minutes remain -->
<div role="alertdialog" aria-modal="true"
     aria-labelledby="timeout-title" tabindex="-1" id="timeout-dialog">
  <h2 id="timeout-title">Your session will expire in 2 minutes</h2>
  <p>You will lose any unsaved form data.</p>
  <button type="button" id="extend-session">Stay signed in</button>
</div>
```

Move focus to the warning dialog. On "Stay signed in", reset the timer and
return focus to where the user was.

---

## Moderate: Validation Timing

- Validate on submit at minimum.
- Inline validation on blur (field exit) is acceptable when clearly scoped to
  the field just left — do not validate fields the user has not yet visited.
- Avoid disruptive real-time validation while the user is actively typing.

---

## Testing Expectations

Minimum checks for each form change:

- Navigate and complete the form using keyboard only.
- Verify screen reader announces labels, required state, and errors correctly.
- Submit with invalid inputs and confirm clear recovery paths.
- Confirm focus moves to error summary and then to each field link target.

---

## Definition of Done Checklist

- [ ] All controls have programmatically associated `<label>`.
- [ ] No placeholder-only labels.
- [ ] `required` used on native inputs; `aria-required` not added redundantly.
- [ ] Required state communicated in text (not colour alone).
- [ ] `<fieldset>`/`<legend>` used for grouped controls.
- [ ] Appropriate `autocomplete` values on personal-data fields.
- [ ] Paste and standard keyboard actions not blocked.
- [ ] `<select multiple>` replaced with checkboxes where feasible.
- [ ] `type="text" inputmode="numeric"` used in preference to `type="number"` for quantities/codes.
- [ ] `aria-invalid` set on invalid fields; removed when corrected.
- [ ] Error messages are specific, actionable, and associated via `aria-describedby`.
- [ ] Error summary present and receives focus on failed submit.
- [ ] Async success/failure announced to screen readers.
- [ ] Legal/financial/data-change forms have check/correct/confirm step (3.3.4).
- [ ] Session timeout warned before expiry with accessible dialog.
- [ ] No colour-only indication of any state.
- [ ] Keyboard and screen reader walkthrough passes.

---

## Key WCAG Criteria

- 1.3.1 Info and Relationships (A)
- 1.3.5 Identify Input Purpose (AA) — **Serious if absent on personal-data fields**
- 3.3.1 Error Identification (A) — **Critical if absent**
- 3.3.2 Labels or Instructions (A) — **Critical if absent**
- 3.3.3 Error Suggestion (AA)
- 3.3.4 Error Prevention — legal, financial, data (AA) — **Serious if absent**

---

## References

- [WAI-ARIA APG — Combobox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)
- [WAI-ARIA APG — Date Picker pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/)
- [WCAG 1.3.5 Input Purposes — full autocomplete token list](https://www.w3.org/TR/WCAG21/#input-purposes)
- [WCAG 2.2 Understanding 3.3.1 Error Identification](https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html)
- [WCAG 2.2 Understanding 3.3.4 Error Prevention](https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-legal-financial-data.html)
- [WCAG 2.2 Understanding 2.2.1 Timing Adjustable](https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html)

### Machine-Readable Standards

For AI systems and automated tooling, see [wai-yaml-ld](https://github.com/mgifford/wai-yaml-ld) for structured accessibility standards:

- [WCAG 2.2 (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wcag-2.2-normative.yaml) - Machine-readable WCAG 2.2 normative content including form-related success criteria
- [ARIA Informative (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wai-aria-informative.yaml) - ARIA-focused informative catalog including form roles and properties
- [HTML Living Standard Accessibility (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/html-living-standard-accessibility.yaml) - HTML form element accessibility
- [Standards Link Graph (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/standards-link-graph.yaml) - Relationships across WCAG/ARIA/HTML form standards
