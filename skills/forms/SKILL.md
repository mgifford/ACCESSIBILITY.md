# Forms Accessibility Skill

> **Canonical source**: `examples/FORMS_ACCESSIBILITY_BEST_PRACTICES.md`
> This skill is derived from that file. When in doubt, the example is authoritative.

Apply these rules when implementing or reviewing any form, input, or validation flow.

---

## Core Mandate

All users must be able to understand, complete, and submit forms with assistive technologies, keyboard-only input, and varying cognitive needs.

---

## Required: Labels & Instructions

- Every form control must have a programmatically associated `<label>`
- Never use placeholder text as the sole label
- Required fields must be identified in text, not by color alone
- Provide concise instructions before complex input groups

```html
<!-- Bad: placeholder as only label -->
<input type="email" placeholder="Email address">

<!-- Good: explicit label -->
<label for="email">Email address <span aria-hidden="true">*</span>
  <span class="visually-hidden">(required)</span>
</label>
<input type="email" id="email" autocomplete="email" required
       aria-required="true">
```

---

## Required: Grouping

Use `<fieldset>` + `<legend>` for related controls:
```html
<fieldset>
  <legend>Notification preferences</legend>
  <label><input type="checkbox" name="email-notify"> Email</label>
  <label><input type="checkbox" name="sms-notify"> SMS</label>
</fieldset>
```

---

## Required: Input Types & Autocomplete

Use appropriate input types: `email`, `tel`, `number`, `date`, `search`.
Add `autocomplete` for common user data:
```html
<input type="text" id="name" autocomplete="name">
<input type="email" id="email" autocomplete="email">
<input type="tel" id="phone" autocomplete="tel">
```

Never block paste or standard keyboard actions.

---

## Required: Validation & Error Handling

- Validate on submit at minimum; avoid disruptive real-time validation
- Error messages must be specific and actionable
- Mark invalid fields with `aria-invalid="true"`
- Associate error text programmatically with the field

```html
<label for="email">Email address</label>
<input type="email" id="email" aria-describedby="email-error"
       aria-invalid="true">
<span id="email-error" role="alert">
  Enter a valid email address, for example: name@example.com
</span>
```

---

## Required: Error Summary Pattern

For multi-error submissions:
```html
<div role="alert" aria-labelledby="error-heading" tabindex="-1" id="error-summary">
  <h2 id="error-heading">There are 2 errors in this form</h2>
  <ul>
    <li><a href="#email">Email address – enter a valid email</a></li>
    <li><a href="#dob">Date of birth – enter a real date</a></li>
  </ul>
</div>
```
Move focus to `#error-summary` after failed submit.

---

## Required: Async & Status Feedback

- Use `aria-live="polite"` for non-critical updates
- Use `aria-live="assertive"` only for blocking failures
- Announce submission success/failure to assistive tech

---

## Definition of Done Checklist

- [ ] All controls have programmatically associated labels
- [ ] No placeholder-only labels
- [ ] Required state communicated in text
- [ ] `fieldset`/`legend` used for grouped controls
- [ ] Appropriate `autocomplete` values on common fields
- [ ] `aria-invalid` set on invalid fields
- [ ] Error messages are specific, actionable, and associated
- [ ] Error summary present and focused on failed submit
- [ ] No color-only error indication
- [ ] Keyboard and screen reader walkthrough passes

---

## Key WCAG Criteria

- 1.3.1 Info and Relationships (A)
- 1.3.5 Identify Input Purpose (AA)
- 3.3.1 Error Identification (A)
- 3.3.2 Labels or Instructions (A)
- 3.3.3 Error Suggestion (AA)

---

## References

- [Full best practices guide](../../examples/FORMS_ACCESSIBILITY_BEST_PRACTICES.md)
- [Curated reference sources](references/references.md)
