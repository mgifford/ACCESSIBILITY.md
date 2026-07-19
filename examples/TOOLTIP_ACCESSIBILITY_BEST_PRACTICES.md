---
title: Tooltip Accessibility Best Practices
---

# Tooltip Accessibility Best Practices

## Purpose

A tooltip is a short, non-interactive description that appears automatically
when its trigger receives keyboard focus or pointer hover. An accessible
tooltip must be available to keyboard, pointer, touch, magnification, and
assistive technology users without hiding essential information or blocking
the interface.

Tooltips are often the wrong solution. Persistent visible text, a clear control
label, a disclosure, or a dialog is usually easier to discover and use.

This guide covers authored tooltips. Browser-controlled tooltips created by the
HTML `title` attribute have different behavior and limitations.

## Core Principles

1. Use a tooltip only for short supplementary information.
2. Put instructions, errors, requirements, and other essential information in
   persistent visible text.
3. Give the trigger a complete accessible name without depending on the
   tooltip.
4. Show the same tooltip on keyboard focus and pointer hover.
5. Keep focus on the trigger. A tooltip never receives focus.
6. Let users dismiss the tooltip with `Escape` without moving focus.
7. Keep it visible while the trigger or tooltip is hovered, or while the
   trigger has focus.
8. Do not close an active tooltip on a timer.
9. Do not put links, buttons, or form controls inside a tooltip.
10. Do not depend on a tooltip for touch access.
11. Test positioning, magnification, zoom, text spacing, forced colors, and
    supported assistive technologies.

## Choose the Right Pattern

| Need | Use |
|---|---|
| A control needs a clearer label | Improve its visible label |
| Short supplementary text should appear automatically on focus or hover | Tooltip |
| Instructions or requirements are needed to complete a task | Persistent visible help text |
| A user explicitly asks to show or hide short help | Button-controlled disclosure |
| The popup contains links, buttons, or other controls | Non-modal dialog or another appropriate popup pattern |
| A decision is required before work can continue | Modal dialog or alert dialog |
| An action completed or a process changed state | Status message, not a tooltip |
| Text is truncated only because of layout | Allow wrapping, expansion, or another way to read the full text |

Calling every small popup a tooltip leads to incorrect semantics and keyboard
behavior. Classify the interaction before choosing ARIA.

## What Is a Tooltip?

An authored tooltip:

- describes an element;
- appears automatically after focus or hover;
- contains only non-interactive content;
- does not receive focus;
- is associated with its trigger through `aria-describedby`;
- remains available while the trigger has focus or the pointer is over the
  trigger or tooltip; and
- can be dismissed with `Escape`.

The WAI-ARIA specification defines `tooltip` as a contextual popup that
displays a description for an element. The
[ARIA Authoring Practices Guide tooltip pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)
documents expected interaction, but W3C currently marks that APG pattern as
work in progress without task-force consensus. Treat it as useful guidance,
not as a substitute for user testing.

## WCAG 1.4.13: Content on Hover or Focus

[WCAG 2.2 Success Criterion 1.4.13](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html)
applies when receiving and then removing pointer hover or keyboard focus makes
additional content appear and disappear.

| Requirement | Tooltip behavior |
|---|---|
| Dismissible | Provide a way to dismiss content without moving pointer or focus when the content obscures or replaces other content. `Escape` is the established tooltip interaction. |
| Hoverable | If pointer hover opens it, the pointer can move onto the tooltip without closing it. |
| Persistent | Keep it visible until hover or focus is removed, the user dismisses it, or the information is no longer valid. |

The dismissible requirement has limited exceptions, including when the
additional content does not obscure or replace other content. Do not design
around the exception. Supporting `Escape` gives users a predictable way to
remove content that may block what they need to see.

Do not invent an auto-close duration. A tooltip that disappears after 1.5
seconds, 5 seconds, or another fixed time does not meet the persistence
requirement while its trigger remains active.

## ARIA and Accessible Description

Use `role="tooltip"` on the popup and reference its unique `id` from the
trigger with `aria-describedby`.

```html
<span class="tooltip-container" data-tooltip>
  <button type="button"
          aria-describedby="save-tooltip"
          data-tooltip-trigger
          data-tooltip-id="save-tooltip">
    Save
  </button>
  <span id="save-tooltip" role="tooltip" hidden>
    Saves changes to your draft.
  </span>
</span>
```

Important details:

- Use a native interactive element for the trigger when the trigger performs
  an action.
- The trigger remains the only focusable element in this pattern.
- The tooltip content should exist in the DOM before the trigger receives
  focus so its description is available when focus is announced.
- `aria-describedby` may contain a space-separated list of IDs. Preserve
  existing help, error, or instruction references when adding a tooltip.
- Do not put `role="tooltip"` on the trigger.
- Do not add `aria-live`, `role="status"`, or `role="alert"` to a tooltip.
- Do not use `aria-expanded` for an automatically displayed tooltip. The
  trigger does not control an expandable interactive region.
- Do not use `aria-haspopup` for a tooltip. `tooltip` is not one of that
  property's popup values.
- Let the tooltip's text provide its accessible name. Avoid an `aria-label`
  that replaces different visible tooltip text.

A directly referenced hidden description can contribute to accessible
description calculation. Keeping the node in the DOM also avoids adding the
description only after a screen reader has already announced focus. Still test
the resulting name and description in supported combinations because
presentation varies.

### Preserve existing descriptions

Do not overwrite an existing `aria-describedby` value:

```html
<label for="account-name">Account name</label>
<input id="account-name"
       aria-describedby="account-name-help account-name-tooltip">
<p id="account-name-help">Use 4 to 30 characters.</p>
<span id="account-name-tooltip" role="tooltip" hidden>
  This name appears on your public profile.
</span>
```

In many forms, the persistent help paragraph makes the tooltip unnecessary.
Prefer the simpler design when both messages can remain visible.

### Icon-only controls

The tooltip is a description, not a replacement for the control's accessible
name. Name an icon-only button independently.

```html
<span class="tooltip-container" data-tooltip>
  <button type="button"
          aria-label="Delete quarterly report"
          aria-describedby="delete-tooltip"
          data-tooltip-trigger
          data-tooltip-id="delete-tooltip">
    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
      <path d="M5 7h14M9 7V4h6v3m-8 0 1 13h8l1-13"/>
    </svg>
  </button>
  <span id="delete-tooltip" role="tooltip" hidden>
    Permanently deletes the report.
  </span>
</span>
```

The visible icon, accessible name, and description should agree about the
action. Avoid repeating exactly the same words as both name and description.

## Complete Interaction Example

The following script supports multiple tooltip components. It tracks pointer
hover, focus, and dismissal as separate states so one event does not close a
tooltip that is still active for another reason.

```js
document.querySelectorAll('[data-tooltip]').forEach((container) => {
  const trigger = container.querySelector('[data-tooltip-trigger]');
  const tooltip = document.getElementById(trigger.dataset.tooltipId);

  if (!tooltip || tooltip.getAttribute('role') !== 'tooltip') {
    return;
  }

  let pointerWithin = false;
  let triggerFocused = false;
  let dismissed = false;

  function updateTooltip() {
    const shouldShow = !dismissed && (pointerWithin || triggerFocused);
    tooltip.hidden = !shouldShow;
  }

  container.addEventListener('pointerenter', () => {
    pointerWithin = true;
    dismissed = false;
    updateTooltip();
  });

  container.addEventListener('pointerleave', () => {
    pointerWithin = false;
    updateTooltip();
  });

  trigger.addEventListener('focus', () => {
    triggerFocused = true;
    dismissed = false;
    updateTooltip();
  });

  trigger.addEventListener('blur', () => {
    triggerFocused = false;
    updateTooltip();
  });

  trigger.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !tooltip.hidden) {
      dismissed = true;
      updateTooltip();
      event.stopPropagation();
    }
  });
});
```

This implementation keeps the tooltip visible when:

- the trigger has focus and the pointer leaves;
- the pointer remains over the trigger; or
- the pointer moves from the trigger onto the tooltip.

After `Escape`, focus remains on the trigger. The tooltip can appear again
after focus leaves and returns, or after the pointer leaves and re-enters the
component.

If a tooltip is inside another interface that also uses `Escape`, coordinate
event handling so the most recently opened layer closes first. Do not create a
keyboard trap.

### CSS for the example

```css
.tooltip-container {
  position: relative;
  display: inline-flex;
}

[role="tooltip"] {
  position: absolute;
  z-index: 10;
  inset-block-start: calc(100% + 0.5rem);
  inset-inline-start: 50%;
  max-inline-size: min(20rem, calc(100vw - 2rem));
  padding: 0.5rem 0.75rem;
  color: #ffffff;
  background: #111827;
  border: 1px solid #111827;
  border-radius: 0.25rem;
  transform: translateX(-50%);
  overflow-wrap: anywhere;
}

[role="tooltip"][hidden] {
  display: none;
}

@media (forced-colors: active) {
  [role="tooltip"] {
    color: CanvasText;
    background: Canvas;
    border-color: CanvasText;
  }
}
```

This CSS demonstrates presentation, not collision detection. A production
component must reposition the tooltip when it would leave the viewport or
obscure important content. Test both left-to-right and right-to-left content.

If animation is added, keep it brief and avoid essential motion. Disable or
reduce it when `prefers-reduced-motion: reduce` matches. Do not delay content
long enough to make focus or hover feedback feel broken.

## Pointer, Keyboard, and Focus Behavior

### Keyboard

| Key | Expected behavior |
|---|---|
| `Tab` or `Shift+Tab` | Moves focus normally. The tooltip appears when its trigger receives focus and closes after focus leaves, unless pointer hover still keeps it open. |
| `Escape` | Dismisses the visible tooltip without moving focus. |

Do not add the tooltip to the tab sequence. Do not move focus into it. Do not
use arrow keys to navigate its text. Screen reader users can receive the
content as the trigger's accessible description.

### Pointer

- Show the tooltip when the pointer hovers over the trigger.
- Keep it visible while the pointer travels from the trigger to the tooltip.
- Keep it visible while the pointer is over the tooltip.
- Close it after the pointer leaves both areas, unless the trigger still has
  focus.
- Avoid gaps or overlays that cause pointer leave events during the path.
- Do not set `pointer-events: none` on a visible tooltip that users must hover.

### Focus indicator

The tooltip must not hide the trigger's entire focus indicator. Keep the
trigger visible and ensure its focus appearance meets the project's
[keyboard accessibility guidance](./KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md).

## Touch and Activation

Touch devices do not provide dependable hover. A tap on an action button should
perform the action, not unexpectedly become the only way to reveal necessary
instructions first.

Use one of these alternatives:

- Keep the information visible near the control.
- Include it in the control's accessible name or existing description when
  appropriate.
- Provide a separate help button that opens a disclosure.
- Use a non-modal dialog when the additional content is structured or
  interactive.

### Button-controlled help is not a tooltip

When a user activates a button to show content, use a disclosure or popup
pattern. Do not give the content `role="tooltip"` and do not add a live region
merely because it became visible.

```html
<button type="button"
        id="password-help-button"
        aria-expanded="false"
        aria-controls="password-help">
  Password requirements
</button>

<div id="password-help" hidden>
  Use at least 12 characters. Include a number and a symbol.
</div>
```

```js
const helpButton = document.getElementById('password-help-button');
const helpPanel = document.getElementById('password-help');

helpButton.addEventListener('click', () => {
  const expanded = helpButton.getAttribute('aria-expanded') === 'true';
  helpButton.setAttribute('aria-expanded', String(!expanded));
  helpPanel.hidden = expanded;
});
```

The expanded state communicates the change. Focus remains on the button, and
the content follows it in reading order. If the popup contains interactive
controls or must manage focus, use an appropriate dialog or popup pattern.

## Do Not Rely on the `title` Attribute

Browser-controlled `title` tooltips fall under the WCAG 1.4.13 exception when
their visual presentation is entirely controlled by the user agent and is not
modified by the author. That exception does not make the `title` attribute a
dependable interface pattern.

Do not use `title` as the only:

- accessible name for a control;
- source of instructions or validation requirements;
- explanation of an icon;
- way to reveal truncated text; or
- access path for touch users.

Authors cannot ensure consistent keyboard, touch, magnification, timing, text
size, or dismissal behavior for browser-controlled tooltips. Prefer a visible
label or help text. Build an authored tooltip only when supplementary transient
content is genuinely appropriate.

## Disabled Controls

A native disabled form control is normally removed from the tab sequence and
may not dispatch the pointer or focus events a tooltip expects. Do not attach
essential explanations only to a disabled control.

Prefer visible text:

```html
<p id="publish-requirement">
  Add a page title before publishing.
</p>
<button type="button" disabled aria-describedby="publish-requirement">
  Publish
</button>
```

The visible explanation remains available even though the button cannot
receive focus. If a project uses `aria-disabled="true"` so a control remains
focusable, remember that ARIA does not prevent activation. The application
must suppress the action and maintain the correct disabled styling and state.

## Content Requirements

- Keep the content to a short phrase or sentence.
- Describe the trigger; do not introduce an unrelated message.
- Avoid repeating the trigger's accessible name word for word.
- Do not include headings, lists, links, buttons, fields, or other controls.
- Do not place error messages, legal text, security warnings, or task
  requirements only in a tooltip.
- Write in plain language.
- Keep dynamic descriptions stable while the trigger has focus.
- If the content needs structure or several sentences, use persistent help,
  `aria-details` with an appropriate visible design, a disclosure, or a dialog
  instead.

Do not make ordinary prose focusable merely to attach a tooltip. Extra tab
stops make keyboard navigation harder. If a term needs explanation, provide
adjacent text, a glossary link, or an explicit help button.

## Visual Presentation

### Contrast

- Normal-size tooltip text needs at least 4.5:1 contrast against its
  background under WCAG 1.4.3.
- Large text needs at least 3:1 contrast under the same criterion.
- A boundary, shape, or arrow needs 3:1 contrast against adjacent colors under
  WCAG 1.4.11 only when that visual information is required to identify the
  component or its state.
- A decorative arrow is not automatically subject to non-text contrast.
- Do not rely on color alone to associate a tooltip with its trigger.

### Zoom, reflow, and text spacing

At 400 percent zoom and narrow viewport widths:

- keep the tooltip within the viewport;
- allow text to wrap;
- avoid horizontal scrolling caused by the tooltip;
- do not cover the entire trigger or critical adjacent content; and
- preserve a usable way to dismiss it.

Apply WCAG text-spacing overrides and confirm text is not clipped or
overlapped. Avoid fixed heights and narrow fixed widths.

### Positioning

- Place the tooltip near its trigger without covering the trigger.
- Detect viewport edges and reposition it.
- Preserve the pointer path between trigger and tooltip.
- Recalculate placement after zoom, resize, content changes, and changes in
  text direction.
- Avoid rendering inside an ancestor whose `overflow` clips the tooltip.
- Use a suitable stacking order without covering modal dialogs or other active
  layers.

### Trigger size

An icon button used as a trigger is still a control. Ensure it meets
[WCAG 2.2 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
or a documented exception. The visible icon can be smaller than the target if
the interactive area meets the requirement.

## Component and Framework Guidance

- Give every tooltip a unique ID, including across repeated components.
- Render the descriptive node before focus reaches the trigger.
- Keep `aria-describedby` synchronized with the tooltip ID.
- Preserve other IDs already listed in `aria-describedby`.
- Remove stale relationships when components unmount.
- Avoid duplicate tooltips created by portals, hydration, or nested roots.
- Store open, hovered, focused, and dismissed state explicitly rather than
  guessing from one event.
- Do not close on pointer leave when focus still keeps the tooltip active.
- Do not close on blur when the pointer is still over the component.
- Coordinate `Escape` behavior with dialogs and other nested overlays.
- Use event types that match the supported input devices and test generated
  DOM, not only component source.

If a positioning library is used, inspect its rendered markup, focus handling,
portal location, collision behavior, and cleanup. A library name is not
evidence of accessibility.

## Testing

### Keyboard testing

1. Reach the trigger with `Tab` and `Shift+Tab`.
2. Confirm the tooltip appears without moving focus.
3. Press `Escape` and confirm it closes while focus stays on the trigger.
4. Continue tabbing and confirm there is no tooltip tab stop.
5. Return to the trigger and confirm the tooltip can appear again.
6. Verify the trigger's focus indicator remains visible.
7. Confirm no keyboard trap occurs inside a surrounding dialog or popup.

### Pointer and magnification testing

1. Hover the trigger.
2. Move the pointer slowly from the trigger onto every part of the tooltip.
3. Confirm it remains visible during the complete path.
4. Move off both elements and confirm it closes when focus is not retaining it.
5. Hover while the trigger has keyboard focus, then leave with the pointer.
   Confirm focus keeps the tooltip visible.
6. Test with screen magnification and move the viewport while hovering the
   tooltip.
7. Press `Escape` without moving the pointer and confirm dismissal.

### Touch testing

- Confirm every action is usable without first discovering hover content.
- Confirm essential information is visible or available through an explicit
  control.
- Test screen reader gestures as well as direct touch.
- Verify that long press is not required.
- Confirm a help disclosure can be opened and closed with touch and assistive
  technology.

### Screen reader testing

Test supported browser and screen reader combinations. Record product
versions, interaction mode, and relevant verbosity settings.

Confirm that:

- the trigger's accessible name is correct without the tooltip;
- the tooltip text is exposed as a description;
- name and description are not needlessly duplicated;
- focus is not moved;
- `Escape` dismisses the visual tooltip;
- other help and error descriptions remain available; and
- repeated focus does not produce stale or mismatched descriptions.

Do not publish a fixed table promising identical announcements from particular
screen readers. Accessible description presentation can vary by product,
settings, mode, language, and version.

### Visual and responsive testing

Test:

- 200 percent and 400 percent zoom;
- narrow viewports;
- browser text-only zoom;
- WCAG text-spacing overrides;
- high contrast and forced-colors modes;
- reduced motion;
- left-to-right and right-to-left text;
- long translated content; and
- placement near every viewport edge.

### Automated checks

Automation can help detect:

- missing or duplicate IDs;
- an `aria-describedby` reference that does not resolve;
- invalid ARIA values;
- focusable descendants inside a tooltip;
- inadequate computed color contrast;
- a hidden trigger; and
- stale open tooltips in component tests.

Automated tools cannot prove hoverability, persistence, usable positioning,
correct screen reader presentation, or touch discoverability. Keep manual tests
in the release process.

## Common Failures

| Failure | Correction |
|---|---|
| Showing the tooltip only on hover | Show it on keyboard focus too |
| Hiding it when the pointer leaves the trigger | Keep it open while the pointer is over the trigger or tooltip |
| Hiding it when pointer leaves even though focus remains | Track pointer and focus state separately |
| Closing it after a fixed timeout | Keep it visible until trigger removal, dismissal, or invalidation |
| Failing to support `Escape` | Dismiss without moving focus |
| Moving focus into the tooltip | Keep focus on the trigger |
| Putting a link or button in `role="tooltip"` | Use a disclosure, non-modal dialog, or other appropriate popup |
| Using `aria-expanded` or `aria-haspopup` for an automatic tooltip | Use `aria-describedby` and `role="tooltip"` |
| Adding a live region to activated help | Use the disclosure state and reading order |
| Relying on `title` for a control label or instruction | Provide a visible label and persistent or authored help |
| Overwriting existing `aria-describedby` IDs | Append and preserve all relevant references |
| Attaching essential help only to a disabled control | Make the explanation visible |
| Making clipped prose focusable only to show a tooltip | Allow wrapping or provide explicit expansion/help |
| Requiring every tooltip border or arrow to have 3:1 contrast | Apply non-text contrast when the visual information is required |
| Assuming one screen reader announcement is universal | Test supported combinations and document versions |

## Definition of Done

- [ ] A tooltip is the correct pattern for short supplementary information.
- [ ] Essential information is visible without opening the tooltip.
- [ ] The trigger has a complete accessible name without depending on the
  tooltip.
- [ ] The tooltip has `role="tooltip"` and a unique ID.
- [ ] The trigger references it with `aria-describedby` without losing other
  descriptions.
- [ ] The descriptive node exists before focus reaches the trigger.
- [ ] The tooltip appears on keyboard focus and pointer hover.
- [ ] `Escape` dismisses it without moving focus.
- [ ] It remains visible while the trigger has focus or the pointer is over the
  trigger or tooltip.
- [ ] It does not close on a fixed timer.
- [ ] The tooltip and all descendants are not focusable.
- [ ] No interactive or essential content is inside it.
- [ ] Touch users have visible information or an explicit help control.
- [ ] Disabled controls do not hide their explanation.
- [ ] Text contrast meets WCAG 1.4.3.
- [ ] Required boundaries and states meet WCAG 1.4.11.
- [ ] The trigger's target size and focus indicator meet applicable WCAG 2.2
  requirements.
- [ ] The tooltip reflows, wraps, and remains operable at zoom and with text
  spacing overrides.
- [ ] Placement works at viewport edges, in forced colors, and in both text
  directions.
- [ ] Keyboard, pointer, touch, magnification, and supported screen reader
  combinations have been tested manually.
- [ ] Automated tests supplement, but do not replace, interaction testing.

## Related WCAG Criteria

- [1.3.1 Info and Relationships (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html)
- [1.4.3 Contrast (Minimum) (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- [1.4.10 Reflow (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)
- [1.4.11 Non-text Contrast (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)
- [1.4.12 Text Spacing (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html)
- [1.4.13 Content on Hover or Focus (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html)
- [2.1.1 Keyboard (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html)
- [2.1.2 No Keyboard Trap (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html)
- [2.4.7 Focus Visible (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html)
- [2.4.11 Focus Not Obscured (Minimum) (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html)
- [2.5.8 Target Size (Minimum) (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- [4.1.2 Name, Role, Value (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html)

## Related Guides

- [ARIA Live Regions Best Practices](./ARIA_LIVE_REGIONS_BEST_PRACTICES.md)
- [Color Contrast Accessibility Best Practices](./COLOR_CONTRAST_ACCESSIBILITY_BEST_PRACTICES.md)
- [Keyboard Accessibility Best Practices](./KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md)
- [Touch and Pointer Accessibility Best Practices](./TOUCH_POINTER_ACCESSIBILITY_BEST_PRACTICES.md)
- [User Personalization Accessibility Best Practices](./USER_PERSONALIZATION_ACCESSIBILITY_BEST_PRACTICES.md)

Use the project's
[Accessibility Bug Reporting Best Practices](./ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES.md)
to assign severity and priority. This guide does not define a universal
severity scale.

## References

- [WAI-ARIA 1.2: `tooltip` role](https://www.w3.org/TR/wai-aria-1.2/#tooltip)
- [ARIA Authoring Practices Guide: Tooltip Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)
- [WCAG 2.2 Understanding 1.4.13: Content on Hover or Focus](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html)
- [Technique SCR39: Making Content on Focus or Hover Hoverable, Dismissible, and Persistent](https://www.w3.org/WAI/WCAG22/Techniques/client-side-script/SCR39)
- [Failure F95: Content Shown on Hover Is Not Hoverable](https://www.w3.org/WAI/WCAG22/Techniques/failures/F95)
- [Technique ARIA1: Using `aria-describedby`](https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA1)
- [Accessible Name and Description Computation 1.2](https://www.w3.org/TR/accname-1.2/)

### Machine-Readable Standards

For AI systems and automated tooling, see
[wai-yaml-ld](https://github.com/mgifford/wai-yaml-ld) for structured
accessibility standards:

- [WCAG 2.2 (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wcag-2.2-normative.yaml)
- [ARIA Informative (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wai-aria-informative.yaml)
- [HTML Living Standard Accessibility (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/html-living-standard-accessibility.yaml)
- [Standards Link Graph (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/standards-link-graph.yaml)

---

This document is available under the repository's [MIT License](../LICENSE).
