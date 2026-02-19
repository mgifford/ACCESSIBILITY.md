# Forms Accessibility Best Practices

This document defines project-level requirements for accessible form design, validation, and error handling.

## 1. Core Principle

All users must be able to understand, complete, and submit forms with assistive technologies, keyboard-only input, and varying cognitive needs.

## 2. Labels and Instructions

- Every form control must have a programmatically associated label.
- Placeholder text must not be used as the only label.
- Required fields must be identified in text, not by color alone.
- Provide concise instructions before complex input groups.

## 3. Grouping and Structure

- Use `fieldset` and `legend` for related controls (for example, radio groups).
- Keep visual and semantic grouping aligned.
- Use headings to separate long forms into clear sections.

## 4. Input Purpose and Autocomplete

- Use appropriate input types (`email`, `tel`, `number`, `date`) where valid.
- Add `autocomplete` values for common user data when appropriate.
- Avoid input patterns that block paste or standard keyboard actions.

## 5. Validation and Error Messaging

- Validate on submit at minimum; avoid disruptive real-time validation.
- Error messages must be specific and actionable.
- Error text must be programmatically associated with the invalid field.
- Mark invalid controls with `aria-invalid="true"` when applicable.
- Do not rely on color alone to indicate errors.

## 6. Error Summary Pattern

For multi-error submissions:

- Show an error summary near the top of the form.
- Move focus to the error summary after failed submit.
- Each summary item should link to the corresponding field.

## 7. Success, Status, and Async Feedback

- Announce submission status and async validation outcomes to assistive tech.
- Use polite live regions for non-critical updates.
- Use assertive announcements only for blocking failures.

## 8. Time Limits and Session Expiry

- Warn users before timeout when possible.
- Provide a way to extend session time for critical workflows.
- Preserve entered data when safe and feasible.

## 9. Testing Expectations

Minimum checks for each form change:

- Navigate and complete the form using keyboard only.
- Verify screen reader announces labels, required state, and errors correctly.
- Submit with invalid inputs and confirm clear recovery paths.
- Confirm focus moves to error summary and then to each field link target.

## 10. Definition of Done

A form change is complete only when:

- All controls have accessible names.
- Validation and error recovery are understandable and navigable.
- Keyboard and screen reader workflows pass manual checks.
- No blocking accessibility defects remain.
