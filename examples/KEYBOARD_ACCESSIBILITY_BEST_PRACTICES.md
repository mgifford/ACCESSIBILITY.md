---
title: Keyboard Accessibility Best Practices
---

# Keyboard Accessibility Best Practices

This document defines project-level expectations for keyboard operability.

## 1. Core Principle

All interactive functionality must be fully usable with a keyboard alone, without requiring a mouse or touch input.

## 2. Focus Visibility

- Every focusable control must show a clear, persistent visible focus indicator.
- Never remove focus outlines unless replacing them with an equally visible style.
- Focus indicators must meet WCAG contrast requirements against adjacent colors.

## 3. Focus Order

- Focus order must follow a logical reading and interaction sequence.
- Use semantic DOM order before relying on positive `tabindex` values.
- Avoid positive `tabindex` whenever possible.

## 4. Interactive Elements

- Use native interactive elements (`button`, `a`, `input`, `select`, `textarea`) whenever possible.
- Custom controls must expose equivalent keyboard behavior and ARIA semantics.
- Click handlers on non-interactive elements are not sufficient by themselves.

## 5. Required Keyboard Behavior

### Buttons and button-like controls
- `Enter` and `Space` must activate the control.

### Links
- `Enter` must activate the link.

### Menus, listboxes, tabs, trees, and grids
- Must follow WAI-ARIA Authoring Practices keyboard patterns.
- Arrow key behavior must be documented and consistent.

### Dialogs and popovers
- Move focus into the dialog on open.
- Trap focus while open.
- `Escape` closes when appropriate.
- Restore focus to the triggering element on close.

## 6. Skip and Landmark Navigation

- Provide a visible-on-focus skip link to main content.
- Use landmark regions (`header`, `nav`, `main`, `aside`, `footer`) appropriately.

## 7. Disabled, Hidden, and Offscreen Content

- Disabled controls should not be focusable unless intentionally discoverable.
- Hidden content must not remain in the tab order.
- Offscreen techniques must not create focus traps or focus loss.

## 8. Testing Expectations

Minimum manual checks for each UI change:

- Tab from page start to end and verify logical order.
- Verify visible focus on each focusable element.
- Verify activation keys for all interactive controls.
- Verify no keyboard trap exists.
- Verify dialog open/close focus management.

## 9. Linting and Automation

- Enforce keyboard-related rules in linting and CI where possible.
- Automated checks do not replace manual keyboard walkthroughs.

## 10. Definition of Done

A feature is not complete unless:

- Keyboard navigation is fully functional.
- Focus behavior is predictable and visible.
- Interaction patterns match expected standards.
- Manual keyboard test passes.
