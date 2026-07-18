---
title: Forms Accessibility Best Practices
---

# Forms Accessibility Best Practices

This document defines project-level requirements for designing, implementing, validating, and testing accessible forms.

Forms must be understandable and operable with keyboards, touch, speech input, screen readers, screen magnification, browser autofill, password managers, and other assistive technologies. Requirements apply to initial entry, validation, recovery, review, submission, and authentication.

---

## 1. Required outcomes

Users must be able to:

- Identify every control and understand what information it expects.
- Determine which fields are required before submitting.
- Enter information using their preferred input method.
- Review, correct, and resubmit information without unnecessary re-entry.
- Find and understand errors without relying on colour, position, or sound alone.
- Complete time-limited forms when a time limit is not essential.
- Use password managers, autofill, copy, and paste during authentication.
- Complete the form at 200% and 400% zoom without losing content or functionality.

Prefer native HTML controls. Build a custom widget only when native controls cannot meet the documented requirement, and implement the applicable keyboard, focus, name, role, state, and value behaviour.

---

## 2. Prioritizing form defects

Do not assign severity from the violated rule alone. Determine severity from the actual form and task.

Consider:

- Whether the defect prevents submission or recovery
- Whether it affects authentication, payment, health, legal, safety, or essential public services
- How many users and form controls are affected
- Whether a reasonable workaround exists
- Whether the defect comes from a shared component or template
- Whether data can be lost
- Whether the failure affects one step or the complete process

A missing accessible name on an essential control will often be task-blocking. A missing error summary on a short form may not be, provided each error is identified, associated, announced, and easy to locate. Record the concrete user impact instead of declaring every instance Critical or Serious by default.

---

## 3. Labels and accessible names

Every control must have an accessible name that identifies its purpose. Most data-entry controls also need a persistent visible label.

Use an explicit `<label>` when possible:

```html
<label for="email">Email address</label>
<input
  id="email"
  name="email"
  type="email"
  autocomplete="email"
>
```

A control nested inside its label is also valid:

```html
<label>
  <input type="checkbox" name="updates">
  Send me service updates
</label>
```

Do not use placeholder text as the only label. Placeholder text disappears during entry, may have insufficient contrast, and does not provide a consistently visible reference.

```html
<!-- Do not use this pattern. -->
<input type="email" placeholder="Email address">
```

Use `aria-label` or `aria-labelledby` only when a visible HTML label is not practical. Ensure the accessible name includes the words users can see so speech-input users can identify the control by its visible label.

Controls whose content already supplies a name, such as `<button>Save</button>`, do not require a separate `<label>`.

---

## 4. Required and optional fields

Explain how required fields are identified before the first field. Mark individual native controls with `required`.

```html
<p>Fields marked “required” must be completed.</p>

<label for="full-name">Full name <span>required</span></label>
<input id="full-name" name="full-name" autocomplete="name" required>
```

- Do not rely on an asterisk or colour without a text explanation.
- Do not mark every optional field when marking the smaller set of required fields would be clearer, or vice versa.
- The native `required` attribute supplies the required state for supported native controls.
- Adding `aria-required="true"` to a native required control is normally unnecessary. Use `aria-required` for custom widgets whose semantics require it.

---

## 5. Instructions, hints, and constraints

Provide instructions before users encounter the relevant controls. Keep them concise and specific.

Associate field-specific hints with the control:

```html
<label for="account-number">Account number</label>
<p id="account-number-hint">Enter the 8 digits shown on your statement.</p>
<input
  id="account-number"
  name="account-number"
  inputmode="numeric"
  aria-describedby="account-number-hint"
>
```

- State format, units, accepted file types, limits, and case sensitivity when relevant.
- Do not hide essential instructions in placeholder text or a tooltip.
- Do not require users to infer a format from an example alone.
- Ensure instructions remain available while the user is entering and reviewing information.

---

## 6. Grouping related controls

Use `<fieldset>` and `<legend>` for radio groups, related checkboxes, and groups of inputs that need a shared question or context.

```html
<fieldset>
  <legend>How should we contact you?</legend>

  <label>
    <input type="radio" name="contact-method" value="email">
    Email
  </label>

  <label>
    <input type="radio" name="contact-method" value="phone">
    Phone
  </label>
</fieldset>
```

Keep legends concise. Do not use a `<fieldset>` solely for visual styling.

For a set of checkboxes that allows multiple selections, state that users may select more than one.

---

## 7. Input types, purposes, and input modalities

Choose `type`, `autocomplete`, and `inputmode` independently according to what the value means.

| Information | Recommended control |
| --- | --- |
| Email address | `type="email" autocomplete="email"` |
| Telephone number | `type="tel" autocomplete="tel"` |
| Website address | `type="url" autocomplete="url"` |
| Search query | `type="search"` |
| Current password | `type="password" autocomplete="current-password"` |
| New password | `type="password" autocomplete="new-password"` |
| One-time code | Usually one text input with `autocomplete="one-time-code" inputmode="numeric"` |
| Numeric quantity with increment/decrement semantics | `type="number"` where the browser spinbutton interaction is appropriate |
| Numeric-looking identifier, postal code, card number, or account number | Usually `type="text"` with an appropriate `inputmode` and autocomplete token |

### Do not treat all digits as numbers

Use `type="number"` for values on which mathematical operations make sense and where `min`, `max`, and `step` semantics are useful. Do not use it for identifiers or values that may contain leading zeros.

```html
<label for="quantity">Quantity</label>
<input id="quantity" name="quantity" type="number" min="1" max="20" step="1">

<label for="postal-code">Postal code</label>
<input id="postal-code" name="postal-code" type="text" autocomplete="postal-code">
```

`inputmode` requests a virtual keyboard; it does not validate the value. Add `pattern` only when the resulting constraint and error message are correct for every accepted value. Do not assume all users enter ASCII digits.

### Dates

Use a native date input when it meets the product’s locale, browser, and assistive-technology requirements. Test its actual implementation.

For dates such as date of birth, separate text inputs may be easier to understand and validate:

```html
<fieldset>
  <legend>Date of birth</legend>
  <p id="dob-hint">For example, 23 4 1980.</p>

  <label for="dob-day">Day</label>
  <input id="dob-day" name="dob-day" inputmode="numeric"
         autocomplete="bday-day" aria-describedby="dob-hint">

  <label for="dob-month">Month</label>
  <input id="dob-month" name="dob-month" inputmode="numeric"
         autocomplete="bday-month">

  <label for="dob-year">Year</label>
  <input id="dob-year" name="dob-year" inputmode="numeric"
         autocomplete="bday-year">
</fieldset>
```

Do not build a custom calendar dialog unless users need calendar-based selection. If one is required, implement and test the complete dialog and grid keyboard interaction.

### Multiple selection

Use checkboxes when a short, known list permits multiple choices. A native `<select multiple>` may be appropriate for some expert interfaces, but its interaction is less discoverable and must be usability-tested with the intended audience.

---

## 8. Autofill and identifying input purpose

Use valid `autocomplete` tokens for fields that collect information about the user when a token exists.

```html
<label for="name">Full name</label>
<input id="name" name="name" autocomplete="name">

<label for="street">Street address</label>
<textarea id="street" name="street" autocomplete="street-address"></textarea>

<label for="city">City</label>
<input id="city" name="city" autocomplete="address-level2">

<label for="postal">Postal code</label>
<input id="postal" name="postal" autocomplete="postal-code">
```

The control’s label, `name`, `type`, and autocomplete token should describe the same purpose. Test autofill without assuming `autocomplete="off"` will or should disable password managers and browser assistance.

---

## 9. Buttons and submission controls

Every button must have a clear name that describes its result.

```html
<button type="submit">Submit application</button>
<button type="button" id="add-address">Add another address</button>
```

- Always specify `type`. A `<button>` inside a form defaults to submit.
- Distinguish primary submission from secondary actions.
- Do not use vague labels such as “Go” or “Continue” when a more specific label is practical.
- Do not permanently disable the submit button merely because the form is incomplete. Users must be able to discover validation errors and recover.
- Prevent duplicate submissions without removing status information or trapping focus.

---

## 10. Validation and field errors

Validate on submission at minimum. Optional inline validation must not interrupt users while they are typing or expose errors for untouched fields.

When a field is invalid:

- Keep its entered value unless security requires otherwise.
- Add `aria-invalid="true"` after validation determines that it is invalid.
- Provide a specific, actionable text message.
- Associate the message with the field using `aria-describedby` or a tested `aria-errormessage` implementation.
- Preserve any existing hint association.
- Do not rely on colour or an icon alone.
- Remove the invalid state and obsolete error association after correction.

```html
<label for="email">Email address</label>
<p id="email-hint">We will send the receipt to this address.</p>
<input
  id="email"
  name="email"
  type="email"
  autocomplete="email"
  aria-invalid="true"
  aria-describedby="email-hint email-error"
>
<p id="email-error">
  <strong>Error:</strong> Enter an email address in the format name@example.com.
</p>
```

Do not put `role="alert"` on error text that is already present when the page loads. A live region announces changes made after it is established. Avoid combining several competing announcement mechanisms without assistive-technology testing.

---

## 11. Error summaries

Provide an error summary when several fields can fail, the form is long, errors may be outside the viewport, or users would otherwise have difficulty locating them.

Insert the summary after a failed submission and move focus to it.

```html
<div id="error-summary" tabindex="-1" aria-labelledby="error-heading">
  <h2 id="error-heading">There are 2 errors</h2>
  <ul>
    <li><a href="#email">Email address: enter a valid email address</a></li>
    <li><a href="#dob-day">Date of birth: enter a real date</a></li>
  </ul>
</div>
```

- Place the summary before the form or at the beginning of the form.
- Use links that identify both the field and the problem.
- Ensure activating a link moves focus to the relevant control.
- Keep the inline field message as well as the summary.
- Update the heading count when errors change.
- Avoid adding `role="alert"` when focus movement already causes a clear announcement, unless testing shows an additional live announcement is necessary.

Focus movement is a deliberate response to the user’s submit action. Do not move focus on every inline validation change.

---

## 12. Status, progress, and asynchronous updates

Submission, saving, loading, and completion status must be perceivable without requiring users to watch the screen.

```html
<div id="form-status" role="status" aria-live="polite"></div>
```

Update the established status container with concise text:

```javascript
document.getElementById('form-status').textContent = 'Application saved.';
```

- Use polite status announcements for routine progress and successful completion.
- Reserve assertive announcements for urgent information that cannot wait.
- Keep visible status text available long enough to find and read.
- If a submission navigates to a new page, provide a descriptive page title and heading there.
- Do not announce every keystroke, character-count change, or validation state unless the information is necessary at that moment.

---

## 13. Preserve entries and avoid redundant entry

Do not clear valid information after a validation error.

Within the same multi-step process, information previously entered by or supplied to the user must be auto-populated or available for selection unless re-entry is essential, required for security, or the previous information is no longer valid.

Examples:

- Provide a “Billing address is the same as shipping address” option.
- Carry an account identifier into later steps instead of asking for it again.
- Preserve a search query on the results page.
- Allow users to review and edit information without retyping it.

Protect personal information while preserving it. WCAG 3.3.7 does not require storing information between separate sessions.

---

## 14. Accessible authentication

Authentication must not require users to remember, manipulate, or transcribe information unless a conforming alternative or assistance mechanism is available.

At minimum:

- Allow password managers to identify and fill username and password fields.
- Allow copy and paste into username, password, and verification-code fields.
- Do not ask for selected characters from a password.
- Do not split a one-time code into controls that prevent pasting the complete code.
- Use appropriate autocomplete tokens.
- Provide a path through multi-factor authentication that does not require unsupported transcription or a cognitive puzzle.
- Ensure account recovery meets the same requirements as login.
- If a CAPTCHA or cognitive test is used, evaluate it against WCAG 3.3.8 and provide an applicable alternative.

```html
<label for="username">Email address</label>
<input id="username" name="username" type="email" autocomplete="username">

<label for="password">Password</label>
<input id="password" name="password" type="password"
       autocomplete="current-password">

<button type="button" aria-controls="password" aria-pressed="false">
  Show password
</button>
```

A show-password button must update its visible label or pressed state consistently, preserve focus, and not clear the value.

---

## 15. Error prevention for consequential submissions

For submissions that create legal commitments, financial transactions, test responses, or changes to user-controlled data, provide at least one applicable safeguard required by WCAG:

- The submission is reversible.
- The data is checked for errors and the user can correct them.
- The user can review, confirm, and correct the information before final submission.

```html
<h2>Review your order</h2>
<dl>
  <dt>Plan</dt>
  <dd>Annual plan</dd>
  <dt>Amount</dt>
  <dd>$120.00</dd>
</dl>

<a href="/cart">Edit order</a>
<button type="submit">Confirm and pay $120.00</button>
```

Make the final action and its consequence explicit.

---

## 16. Time limits and session expiry

Avoid time limits unless they are essential. When WCAG 2.2.1 applies, users must be able to turn off, adjust, or extend the limit under the criterion’s conditions and exceptions.

For an inactivity timeout that uses the warning-and-extension approach:

- Warn before expiry.
- Give at least 20 seconds to extend the session using a simple action.
- Permit extension at least ten times.
- Explain whether data will be lost.
- Announce and display the warning.
- Move focus into a correctly implemented modal dialog.
- Return focus to the previous location after the dialog closes.

```html
<dialog id="timeout-dialog" aria-labelledby="timeout-title">
  <h2 id="timeout-title">Your session will expire in 2 minutes</h2>
  <p>Your unsaved information will be lost.</p>
  <button type="button" id="extend-session">Stay signed in</button>
  <button type="button" id="sign-out">Sign out</button>
</dialog>
```

Open a native dialog with `showModal()` where supported. The `aria-modal` attribute alone does not create modal behaviour, manage focus, make the rest of the page inert, or provide Escape handling.

---

## 17. Visual layout and interaction

- Meet text and non-text contrast requirements for controls, borders, instructions, placeholders, errors, focus indicators, and disabled states.
- Do not use colour alone for required, invalid, selected, success, or warning states.
- Provide visible focus indicators.
- Ensure labels and controls reflow without horizontal scrolling at 320 CSS pixels, except where a WCAG exception applies.
- Support text spacing overrides without clipping or overlap.
- Provide adequate target sizes and spacing for touch and pointer input.
- Do not place essential instructions only in a tooltip.
- Do not obscure focused fields with sticky headers, virtual keyboards, or validation overlays.
- Do not change context merely because a control receives focus or a value changes, unless users were advised of that behaviour.

---

## 18. Testing expectations

### Keyboard and interaction

- [ ] Complete and submit the form using only the keyboard.
- [ ] Operate every custom widget using its documented keyboard pattern.
- [ ] Confirm focus order follows the visual and logical sequence.
- [ ] Trigger errors and follow every error-summary link.
- [ ] Confirm focus remains visible and is not obscured.
- [ ] Verify modal warnings contain focus, close as documented, and return focus.
- [ ] Test copy, paste, undo, redo, text selection, and password-manager entry.

### Screen readers and speech input

- [ ] Confirm each control’s name, role, state, value, hint, and error are understandable.
- [ ] Confirm required and invalid states are announced.
- [ ] Confirm grouped controls include their shared question.
- [ ] Confirm status updates are announced once and remain visible where appropriate.
- [ ] Confirm visible labels are included in accessible names used by speech input.

### Magnification, reflow, touch, and personalization

- [ ] Test at 200% and 400% zoom.
- [ ] Test at a 320 CSS-pixel viewport.
- [ ] Apply WCAG text-spacing overrides.
- [ ] Test touch targets and the on-screen keyboard.
- [ ] Test browser autofill and saved personal-information features.
- [ ] Verify error text remains visible when colours or contrast preferences change.

### Validation and recovery

- [ ] Submit the empty form.
- [ ] Submit one invalid field and several invalid fields.
- [ ] Correct errors in a different order from the summary.
- [ ] Confirm valid values are preserved.
- [ ] Test server-side errors, network errors, expired sessions, and duplicate submissions.
- [ ] Test invalid and unavailable stored state where the form uses client storage.

### Authentication and multi-step processes

- [ ] Complete login with autofill or a password manager.
- [ ] Paste a complete password and one-time code.
- [ ] Test every multi-factor and recovery path.
- [ ] Confirm previously entered information is preserved or selectable in later steps.
- [ ] Review and correct consequential submissions before confirmation.

---

## 19. Automated checks

Automated testing can identify some missing names, invalid ARIA, contrast failures, and state problems. It cannot determine whether instructions are understandable, errors are useful, focus movement is appropriate, or the complete process is usable.

Include:

- HTML validation
- Accessibility-tree and accessible-name assertions
- Axe-core or an equivalent rules engine
- Keyboard interaction tests for custom widgets
- Focus placement after invalid submission
- Error association and summary-link tests
- Autofill-token and field-purpose checks
- Preservation of entered data after errors
- Paste tests for authentication and one-time-code fields
- Reflow and visual-regression checks at supported breakpoints

Test server-rendered errors as well as client-side validation.

---

## 20. Definition of done

A form is complete when:

- Every control has an accurate accessible name and appropriate visible label.
- Required status and instructions are available before entry.
- Related controls have appropriate grouping and legends.
- Input types, autocomplete tokens, and input modalities match the data.
- Buttons have explicit types and descriptive names.
- Keyboard, touch, speech input, autofill, copy, and paste work.
- Errors are specific, visible, programmatically associated, and recoverable.
- An error summary is provided where the form’s length or complexity requires it.
- Focus movement is deliberate, tested, and does not trap or disorient users.
- Status changes are visible and announced appropriately.
- Valid values survive validation errors.
- Multi-step processes avoid unnecessary repeated entry.
- Authentication meets WCAG 3.3.8 where applicable.
- Consequential submissions provide the required prevention or correction mechanism.
- Time limits meet WCAG 2.2.1 where applicable.
- The form reflows and remains usable with zoom, text spacing, and contrast preferences.
- Automated tests and representative manual assistive-technology tests pass.

---

## WCAG 2.2 criteria commonly applicable to forms

- 1.3.1 Info and Relationships (A)
- 1.3.2 Meaningful Sequence (A)
- 1.3.5 Identify Input Purpose (AA)
- 1.4.3 Contrast (Minimum) (AA)
- 1.4.10 Reflow (AA)
- 1.4.11 Non-text Contrast (AA)
- 1.4.12 Text Spacing (AA)
- 2.1.1 Keyboard (A)
- 2.2.1 Timing Adjustable (A)
- 2.4.3 Focus Order (A)
- 2.4.7 Focus Visible (AA)
- 2.4.11 Focus Not Obscured (Minimum) (AA)
- 2.5.3 Label in Name (A)
- 2.5.8 Target Size (Minimum) (AA)
- 3.2.1 On Focus (A)
- 3.2.2 On Input (A)
- 3.3.1 Error Identification (A)
- 3.3.2 Labels or Instructions (A)
- 3.3.3 Error Suggestion (AA)
- 3.3.4 Error Prevention (Legal, Financial, Data) (AA)
- 3.3.7 Redundant Entry (A)
- 3.3.8 Accessible Authentication (Minimum) (AA)
- 4.1.2 Name, Role, Value (A)
- 4.1.3 Status Messages (AA)

Applicability depends on the form and process. This list is not a substitute for evaluating the complete WCAG standard.

---

## References

### W3C guidance

- [WAI Forms Tutorial](https://www.w3.org/WAI/tutorials/forms/)
- [WAI Forms Tutorial: Labeling Controls](https://www.w3.org/WAI/tutorials/forms/labels/)
- [WAI Forms Tutorial: Form Instructions](https://www.w3.org/WAI/tutorials/forms/instructions/)
- [WAI Forms Tutorial: Validating Input](https://www.w3.org/WAI/tutorials/forms/validation/)
- [WAI Forms Tutorial: User Notifications](https://www.w3.org/WAI/tutorials/forms/notifications/)
- [Understanding 1.3.5: Identify Input Purpose](https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html)
- [Understanding 2.2.1: Timing Adjustable](https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html)
- [Understanding 3.3.1: Error Identification](https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html)
- [Understanding 3.3.2: Labels or Instructions](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html)
- [Understanding 3.3.3: Error Suggestion](https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion.html)
- [Understanding 3.3.4: Error Prevention](https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-legal-financial-data.html)
- [Understanding 3.3.7: Redundant Entry](https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html)
- [Understanding 3.3.8: Accessible Authentication](https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html)
- [WAI-ARIA Authoring Practices: Combobox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)
- [WAI-ARIA Authoring Practices: Date Picker Dialog Example](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/)

### HTML and structured standards

- [HTML Living Standard: Forms](https://html.spec.whatwg.org/multipage/forms.html)
- [HTML Living Standard: Autofill](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill)
- [wai-yaml-ld: WCAG 2.2 normative data](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wcag-2.2-normative.yaml)
- [wai-yaml-ld: HTML accessibility data](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/html-living-standard-accessibility.yaml)

---

AGPL-3.0-or-later License - See LICENSE file for full text  
Copyright (c) 2026 Mike Gifford
