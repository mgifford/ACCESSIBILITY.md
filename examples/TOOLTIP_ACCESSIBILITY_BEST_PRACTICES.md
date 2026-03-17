---
title: Tooltip Accessibility Best Practices
---

# Tooltip Accessibility Best Practices

This document defines project-level requirements for accessible tooltip design, markup, keyboard interaction, and mobile support.

## 1. Core Principle

Tooltips must convey supplementary information to all users, regardless of input method or assistive technology. A tooltip that cannot be reached by keyboard or assistive technology is an accessibility barrier.

## 2. What Is a Tooltip?

A tooltip is a short, transient text label that appears near a UI element when a user hovers over or focuses on that element. Tooltips:

- Provide **supplementary** context (not essential information).
- Are **non-interactive**: they cannot contain links, buttons, or form controls.
- Disappear automatically when the trigger loses focus or hover state.
- Are distinct from toggletips (which toggle on click) and popovers (which are persistent and may contain interactive content).

If the information in a tooltip is essential to completing a task, it belongs in persistent visible text, not a tooltip.

## 3. ARIA Pattern

Use `role="tooltip"` with `aria-describedby` to associate the tooltip with its trigger:

```html
<!-- Trigger element -->
<button
  type="button"
  aria-describedby="save-tooltip"
>
  Save
</button>

<!-- Tooltip container (hidden until triggered) -->
<div
  id="save-tooltip"
  role="tooltip"
  hidden
>
  Save changes to your draft
</div>
```

Key rules:
- The tooltip element must have `role="tooltip"`.
- The trigger must reference the tooltip via `aria-describedby`.
- Use `hidden` or `display: none` / `visibility: hidden` to conceal the tooltip until triggered; do **not** use `aria-hidden="true"` on an active tooltip.
- Do not place `role="tooltip"` on the trigger element itself.
- Each tooltip must have a unique `id`.

### Icon-Only Triggers

When the trigger has no visible label (for example, an icon button), provide an accessible name via `aria-label` in addition to the tooltip description:

```html
<button
  type="button"
  aria-label="Delete item"
  aria-describedby="delete-tooltip"
>
  <!-- SVG icon here -->
</button>
<div id="delete-tooltip" role="tooltip" hidden>
  Permanently removes this item from your account
</div>
```

## 4. Trigger Behavior

Tooltips must appear on **both hover and keyboard focus** so keyboard-only users receive the same information as pointer users.

```javascript
const trigger = document.querySelector('[aria-describedby]');
const tooltip = document.getElementById(trigger.getAttribute('aria-describedby'));

function showTooltip() {
  tooltip.removeAttribute('hidden');
}

function hideTooltip() {
  tooltip.setAttribute('hidden', '');
}

trigger.addEventListener('mouseenter', showTooltip);
trigger.addEventListener('mouseleave', hideTooltip);
trigger.addEventListener('focusin',    showTooltip);
trigger.addEventListener('focusout',   hideTooltip);
```

Additionally:
- `Escape` must dismiss a visible tooltip without moving focus.
- The tooltip must remain visible long enough for users to read it (minimum 1.5 seconds recommended; do not auto-hide solely on a short timer).
- Do not dismiss a tooltip while the pointer is hovering over it (WCAG 1.4.13).

## 5. WCAG 1.4.13 — Content on Hover or Focus (AA)

WCAG 2.1 Success Criterion 1.4.13 adds three requirements for content that appears on hover or focus:

| Requirement | Description |
|---|---|
| **Dismissible** | The tooltip can be dismissed without moving pointer or focus (for example, `Escape` key). |
| **Hoverable** | If the pointer triggers the tooltip, the user can move the pointer over the tooltip content without the tooltip disappearing. |
| **Persistent** | The tooltip remains visible until the pointer or focus leaves the trigger, the user dismisses it, or the information is no longer valid. |

An exception applies when the tooltip appearance is controlled entirely by the browser (for example, native `title` attribute tooltips), but these native tooltips have poor accessibility support across browsers and assistive technologies and should be avoided in favor of the ARIA tooltip pattern described in this guide.

## 6. Keyboard Interaction

| Key | Behavior |
|---|---|
| `Tab` / `Shift+Tab` | Moves focus to and away from the trigger; tooltip shows/hides accordingly. |
| `Escape` | Dismisses the tooltip while focus stays on the trigger. |

Tooltips must **not** be focusable themselves (do not set `tabindex` on the tooltip container). They are descriptive overlays, not interactive widgets.

## 7. Content Requirements

- Keep tooltip text concise — ideally one short sentence or phrase.
- Avoid repeating the accessible name of the trigger in the tooltip.
- Never put essential information only inside a tooltip; provide an equivalent in persistent visible text or help text.
- Do not include HTML links, buttons, or form controls inside a tooltip.
- Write in plain language; follow reading level guidance appropriate for the audience.

### When Not to Use a Tooltip

Avoid tooltips when:
- The label of the control is self-explanatory.
- The information must be readable by all users at all times.
- The control is on a touch-only interface where hover is not available.
- The content is long enough to warrant a popover or help text instead.

## 8. Mobile and Touch Considerations

Hover-based tooltips do not work on touch screens. Strategies for mobile accessibility:

- Use a **toggletip** pattern instead: the tooltip toggles visible on tap and is dismissed by tapping elsewhere or pressing a close button.
- Expose tooltip content as visible help text beneath the control on small viewports.
- Do not rely on long-press to reveal tooltips; it is not consistently supported and conflicts with system actions.

```html
<!-- Toggletip for touch interfaces -->
<button
  type="button"
  aria-expanded="false"
  aria-controls="info-toggletip"
  aria-label="More information about password requirements"
>
  <span aria-hidden="true">ⓘ</span>
</button>
<div id="info-toggletip" hidden>
  Your password must be at least 12 characters and include a number.
</div>
```

For toggletips, toggle `aria-expanded` and `hidden` together and use `role="status"` or a live region if the content is dynamically injected, so screen readers announce it.

## 9. Visual Design Requirements

- **Color contrast**: Tooltip text must meet a minimum 4.5:1 contrast ratio against the tooltip background (WCAG 1.4.3). The tooltip background must meet 3:1 contrast against adjacent surfaces (WCAG 1.4.11).
- **Position**: Position tooltips to avoid obscuring nearby content. Prefer placing them above or below the trigger, not over related text. Adjust position dynamically when close to viewport edges.
- **Arrow/caret**: A visual pointer indicating which element the tooltip describes is strongly recommended for clarity. Its color must also meet contrast requirements.
- **Size and spacing**: Text must be legible at the default zoom level. Do not set a `max-width` so small that text wraps into illegible lines.
- **Animation**: If a tooltip animates in or out, respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: no-preference) {
  [role="tooltip"] {
    transition: opacity 0.15s ease;
  }
}
```

## 10. CSS Implementation Notes

When building tooltip visuals with CSS alone (no JavaScript), ensure the tooltip is still exposed to assistive technologies on focus:

```css
/* Hide tooltip visually and from AT by default */
[role="tooltip"] {
  position: absolute;
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
}

/* Show on hover and keyboard focus of the trigger */
.tooltip-trigger:hover [role="tooltip"],
.tooltip-trigger:focus-within [role="tooltip"] {
  visibility: visible;
  opacity: 1;
  pointer-events: auto;
}
```

Avoid using `display: none` in pure-CSS tooltip implementations when focus-within is the show mechanism, because `display: none` removes the element from the accessibility tree, making the referenced content unavailable to assistive technologies.

Use `visibility: hidden` / `visibility: visible` (or `opacity: 0` combined with `pointer-events: none`) for pure-CSS implementations so the referenced tooltip text remains available in the accessibility tree when shown.

## 11. Testing Expectations

Minimum checks for each tooltip implementation:

- Trigger tooltip by hovering over the element; confirm it appears.
- Trigger tooltip by keyboard-focusing the element (`Tab`); confirm it appears.
- Press `Escape` while tooltip is visible; confirm it dismisses without moving focus.
- Move pointer from the trigger onto the tooltip; confirm it remains visible.
- Move pointer or focus away from trigger; confirm tooltip disappears.
- Confirm tooltip text is read by screen reader as a description when trigger receives focus.
- Confirm tooltip text meets color contrast requirements (4.5:1 text, 3:1 background boundary).
- On a touch device or narrow viewport, confirm tooltip content is accessible without hover.
- Confirm no `tabindex` is present on the tooltip container.
- Confirm `aria-describedby` on the trigger matches the `id` on the tooltip.

### Screen Reader Quick-Check

| Screen Reader | Browser | Expected behavior |
|---|---|---|
| NVDA | Chrome/Firefox | Tooltip description announced after accessible name on focus |
| JAWS | Chrome/Edge | Tooltip description announced after accessible name on focus |
| VoiceOver | Safari (macOS/iOS) | Tooltip description announced after accessible name on focus |
| TalkBack | Chrome (Android) | Visible tooltip content must be accessible via tap interaction |

## 12. WCAG 2.2 Success Criteria Mapping

| SC | Level | Applies because |
|---|---|---|
| 1.3.1 Info and Relationships | A | Tooltip must be programmatically associated with its trigger via `aria-describedby`. |
| 1.4.3 Contrast (Minimum) | AA | Tooltip text must have at least 4.5:1 contrast against its background. |
| 1.4.11 Non-text Contrast | AA | Tooltip boundaries and arrow must have 3:1 contrast against adjacent colors. |
| 1.4.13 Content on Hover or Focus | AA | Tooltip must be dismissible, hoverable, and persistent. |
| 2.1.1 Keyboard | A | Tooltip must be triggerable via keyboard focus without requiring a mouse. |
| 2.1.2 No Keyboard Trap | A | Tooltip must never trap keyboard focus. |
| 4.1.2 Name, Role, Value | A | `role="tooltip"` and `aria-describedby` must be correctly implemented. |

## 13. Definition of Done

A tooltip implementation is complete only when:

- `role="tooltip"` is applied to the tooltip container and referenced via `aria-describedby` on the trigger.
- The tooltip appears on both hover and keyboard focus.
- `Escape` dismisses the tooltip without moving focus.
- The tooltip remains visible when the pointer hovers over it.
- Tooltip text meets 4.5:1 contrast; tooltip container boundary meets 3:1 contrast.
- No interactive content exists inside the tooltip.
- Essential information is also available in persistent visible text.
- Touch and mobile users can access the same information.
- Screen readers announce the tooltip description when the trigger receives focus.
- `prefers-reduced-motion` is respected for any tooltip animations.

---

## References

### Machine-Readable Standards

For AI systems and automated tooling, see [wai-yaml-ld](https://github.com/mgifford/wai-yaml-ld) for structured accessibility standards:

- [WCAG 2.2 (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wcag-2.2-normative.yaml) - Machine-readable WCAG 2.2 normative content including SC 1.4.13
- [ARIA Informative (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wai-aria-informative.yaml) - ARIA tooltip role and aria-describedby
- [HTML Living Standard Accessibility (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/html-living-standard-accessibility.yaml) - HTML element accessibility semantics for tooltip triggers
- [Standards Link Graph (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/standards-link-graph.yaml) - Relationships across WCAG/ARIA/HTML standards

### Standards and Guidelines

- [ARIA Authoring Practices: Tooltip Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/) — WAI-ARIA Authoring Practices Guide definition and keyboard requirements
- [WCAG 2.2 SC 1.4.13 Content on Hover or Focus](https://www.w3.org/TR/WCAG22/#content-on-hover-or-focus) — Normative requirement for dismissible, hoverable, and persistent content
- [ARIA Specification: tooltip role](https://www.w3.org/TR/wai-aria-1.2/#tooltip) — Normative ARIA role definition

### Design System References

- [U.S. Web Design System (USWDS) — Tooltip](https://designsystem.digital.gov/components/tooltip/) — Federal design system implementation and guidance
- [Carbon Design System — Tooltip Accessibility](https://carbondesignsystem.com/components/tooltip/accessibility/) — IBM Carbon design system accessibility notes
- [Red Hat UX — Tooltip Accessibility](https://ux.redhat.com/elements/tooltip/accessibility/) — Enterprise UI accessibility implementation
- [Salt Design System — Tooltip Accessibility](https://www.saltdesignsystem.com/salt/components/tooltip/accessibility) — J.P. Morgan Salt design system guidance

### Articles and Research

- [Smashing Magazine — Designing Tooltips for Mobile User Interfaces](https://www.smashingmagazine.com/2021/02/designing-tooltips-mobile-user-interfaces/) — Mobile-specific considerations and patterns
- [Smashing Magazine — Modern CSS Tooltips and Speech Bubbles](https://www.smashingmagazine.com/2024/03/modern-css-tooltips-speech-bubbles-part1/) — Modern CSS tooltip implementation techniques
- [CSS-Tricks — The Little Triangle in the Tooltip](https://css-tricks.com/the-little-triangle-in-the-tooltip/) — CSS caret/arrow techniques for tooltip pointers
- [UserWay — Your Guide to Accessible Tooltips](https://userway.org/blog/your-guide-to-accessible-tooltips/) — Practical accessibility guidance for tooltip implementation
- [Nielsen Norman Group — Tooltip Guidelines](https://www.nngroup.com/articles/tooltip-guidelines/) — UX research on tooltip best practices and when to use them
