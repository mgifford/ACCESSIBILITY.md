---
title: Keyboard Accessibility Best Practices
---

# Keyboard Accessibility Best Practices

This document defines project-level requirements for keyboard operability, focus order, focus visibility, focus management, shortcuts, and testing.

Keyboard accessibility supports people who use physical keyboards, switch controls, speech input, scanning interfaces, screen readers, and other technologies that operate through a keyboard interface.

---

## 1. Required outcomes

Users must be able to:

- Reach and operate all functionality using a keyboard interface, except where the underlying function genuinely depends on a path-based movement.
- Move focus into and away from every component.
- Understand how to operate custom widgets.
- Follow a logical focus sequence.
- See which component has focus.
- Keep the focused component at least partially visible when author-created content overlaps the page.
- Dismiss or leave modal and non-modal overlays using a documented keyboard method.
- Use content without unexpected changes merely because focus moved.
- Disable, remap, or require a modifier for single-character shortcuts where WCAG 2.1.4 applies.

Keyboard access is not equivalent to pressing Tab through every control. Native and composite widgets use different key conventions.

---

## 2. Prioritizing keyboard defects

Do not assign severity from the rule alone. Determine the actual effect on the task and process.

Consider:

- Whether the defect prevents reaching, operating, or leaving a component
- Whether it blocks an essential task or only an optional feature
- Whether focus is lost or placed somewhere misleading
- Whether a reasonable keyboard method remains available
- Whether instructions identify a non-standard exit method
- Whether the defect comes from a shared component
- Whether it affects keyboard, switch, speech-input, and screen-reader users differently

A trap that prevents leaving the page region can interfere with the entire page and will normally be treated as task-blocking. A non-standard but documented key within a specialized editor may be conforming, although it can still create usability costs.

---

## 3. Prefer native interactive elements

Native controls provide keyboard behaviour, focusability, semantics, states, and browser integration.

```html
<button type="button">Save draft</button>
<a href="/about">About this service</a>

<label>
  <input type="checkbox" name="updates">
  Send service updates
</label>
```

Do not use a generic element when a native element exists:

```html
<!-- Do not use this as a button. -->
<div onclick="saveDraft()">Save draft</div>
```

Adding `role="button"` and `tabindex="0"` does not add button behaviour. A custom button must also implement Enter and Space activation, disabled state, focus styling, and the expected accessible name and state. Use `<button>` instead.

Mouse and touch handlers must not be the only way to operate a control. Test the actual result, not merely whether a `keydown` handler exists.

---

## 4. Native keyboard behaviour

Do not override standard browser behaviour without a documented need.

| Native control | Expected core behaviour |
| --- | --- |
| Link with `href` | Tab to focus; Enter to follow |
| Button | Tab to focus; Enter or Space to activate |
| Checkbox | Tab to focus; Space to toggle |
| Radio group | Tab enters the group; arrow keys move and select according to browser conventions; Space selects the focused radio |
| `<select>` | Browser and platform conventions provide navigation and selection |
| Text input | Standard text entry, selection, clipboard, and editing commands |
| `<details>` summary | Tab to focus; Enter or Space toggles disclosure |

Browser and operating-system conventions can differ. Do not add custom handlers to native controls merely to force one platform’s behaviour onto every platform.

Custom widgets should follow the relevant WAI-ARIA Authoring Practices pattern unless product research establishes another familiar convention. APG patterns are design guidance, not WCAG requirements by themselves.

---

## 5. Keyboard traps and restricted focus

If focus can enter a component, users must be able to move focus away using a keyboard interface.

Tab, Shift+Tab, arrow keys, and Escape are common exit methods, depending on the component. If leaving requires an unusual command, provide instructions before or within the component.

Restricting focus temporarily is appropriate for a modal dialog when:

- Focus moves into the dialog when it opens.
- Tab and Shift+Tab remain within the open modal.
- A keyboard-operable control closes or completes the dialog.
- Escape closes the dialog when that convention is appropriate.
- Closing returns focus to the invoking control or another logical location.

This is not considered a keyboard trap because a standard or documented exit is available.

Test embedded editors, third-party widgets, iframes, media players, remote desktops, and canvas applications carefully. They commonly consume Tab or other keys and need an available, documented exit.

---

## 6. Focus order

Focus order must preserve meaning and operability.

- Put content in a logical DOM order.
- Align visual order with DOM order.
- Do not use CSS `order`, grid placement, or absolute positioning to create a misleading visual sequence.
- Avoid positive `tabindex` values. They create a separate focus sequence that is difficult to maintain.
- Use `tabindex="0"` only when an element legitimately belongs in the sequential focus order and no native element provides the required semantics.
- Use `tabindex="-1"` for programmatic focus targets and for inactive items in patterns such as roving `tabindex`.
- Do not add non-interactive headings, paragraphs, or containers to the Tab order without a specific interaction requirement.
- Do not use `autofocus` unless placing initial focus there is expected, tested, and will not surprise users.

When content is inserted, removed, reordered, or filtered, preserve focus or move it to a logical location. Never leave focus on an element that no longer exists.

---

## 7. Visible focus

Every keyboard-operable user-interface component must have a visible focus indicator.

```css
:focus-visible {
  outline: 3px solid var(--focus-color, #005fcc);
  outline-offset: 3px;
}

@media (forced-colors: active) {
  :focus-visible {
    outline-color: Highlight;
  }
}
```

Do not remove the browser outline unless an equally visible replacement is provided.

Distinguish the applicable WCAG requirements:

- **2.4.7 Focus Visible (AA):** a keyboard-operable interface must expose a visible mode of operation in which focus is visible.
- **1.4.11 Non-text Contrast (AA):** author-defined component states and visual information may need 3:1 contrast against adjacent colours.
- **2.4.13 Focus Appearance (AAA):** defines an enhanced minimum indicator area and a 3:1 change between focused and unfocused pixels.

A three-CSS-pixel solid outline with adequate contrast is a useful project default, but do not describe the complete Focus Appearance formula as a WCAG AA requirement.

Test focus in light, dark, increased-contrast, and forced-colours modes. Test controls on every background on which they appear.

---

## 8. Focus not obscured

Under WCAG 2.2 AA Success Criterion 2.4.11, a component receiving keyboard focus must not be entirely hidden by author-created content.

Sticky headers, sticky footers, cookie notices, chat panels, toolbars, virtual keyboards, and persistent disclosures can obscure focus.

Reserve space in the relevant scroll container where practical:

```css
html {
  scroll-padding-block-start: var(--sticky-header-height, 0);
  scroll-padding-block-end: var(--sticky-footer-height, 0);
}

[id] {
  scroll-margin-block-start: var(--sticky-header-height, 0);
}
```

CSS scroll spacing can help but does not prove conformance. Test every breakpoint, zoom level, text-spacing configuration, and persistent overlay.

Prefer designs where the complete focused component and its indicator remain visible. That exceeds the AA minimum and aligns with Focus Not Obscured (Enhanced), WCAG 2.4.12 AAA.

---

## 9. Modal dialogs

Prefer the native `<dialog>` element and `showModal()` for modal dialogs. A modal dialog opened with `showModal()` places the rest of the document in an inert state while it is open.

```html
<button type="button" id="delete-trigger">Delete project</button>

<dialog id="delete-dialog" aria-labelledby="delete-title">
  <h2 id="delete-title">Delete project?</h2>
  <p>This action cannot be undone.</p>

  <form method="dialog">
    <button value="cancel" autofocus>Cancel</button>
    <button value="confirm">Delete project</button>
  </form>
</dialog>
```

```javascript
const trigger = document.getElementById('delete-trigger');
const dialog = document.getElementById('delete-dialog');

trigger.addEventListener('click', () => {
  dialog.showModal();
});

dialog.addEventListener('close', () => {
  if (trigger.isConnected) {
    trigger.focus();
  }
});
```

Native modal behaviour does not remove the need to test:

- The initial focus location
- Tab and Shift+Tab containment
- Escape and visible close controls
- Form submission and cancellation
- Focus restoration
- Nested or stacked overlays
- Screen-reader announcement
- Browser support in the project’s support matrix

Initial focus depends on the dialog. A short confirmation might focus Cancel. A long informational dialog might focus a heading with `tabindex="-1"` so users can read from the beginning. Do not always focus the first interactive element without considering the content.

If a trigger is removed while the dialog is open, return focus to the nearest logical workflow location rather than the document body.

Do not add `aria-modal="true"` to a container and assume it creates modality. ARIA does not make content inert, contain focus, add keyboard handling, or restore focus.

---

## 10. Non-modal disclosures and popovers

Do not trap focus in ordinary disclosures, tooltips, menus, or non-modal popovers unless the chosen interaction pattern explicitly requires restricted focus.

For simple show-and-hide content, a button with `aria-expanded` is sufficient:

```html
<button type="button" aria-expanded="false" aria-controls="filter-panel">
  Filters
</button>
<div id="filter-panel" hidden>
  <!-- Filter controls -->
</div>
```

When open content overlays the page:

- Ensure keyboard users can enter and leave it.
- Close non-persistent content when interaction moves away.
- Support Escape where users reasonably expect it.
- Return focus when closing would otherwise cause focus loss.
- Prevent the overlay from obscuring the new focus location.
- Do not open complex content merely because its trigger receives focus.

Use the HTML Popover API where it meets the requirement, but still test focus behaviour and dismissal for the selected popover type.

---

## 11. Composite widgets

A composite widget usually has one Tab stop. Arrow keys or other documented keys move among its internal items.

Two recognized focus strategies are:

1. **Roving `tabindex`:** one item has `tabindex="0"`; other items have `tabindex="-1"`; movement updates the values and DOM focus.
2. **`aria-activedescendant`:** DOM focus remains on a container while the attribute identifies the active descendant.

Choose the strategy specified by the relevant widget pattern and supported by the component architecture. Do not add custom roving `tabindex` to a native radio group; browsers already provide its keyboard behaviour.

### Toolbar example using roving `tabindex`

```html
<div role="toolbar" aria-label="Text formatting">
  <button type="button" tabindex="0" aria-pressed="false">Bold</button>
  <button type="button" tabindex="-1" aria-pressed="false">Italic</button>
  <button type="button" tabindex="-1" aria-pressed="false">Underline</button>
</div>
```

```javascript
const toolbar = document.querySelector('[role="toolbar"]');

toolbar.addEventListener('keydown', (event) => {
  const items = Array.from(toolbar.querySelectorAll('button:not([disabled])'));
  const current = items.indexOf(document.activeElement);
  let next = current;

  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
    next = (current + 1) % items.length;
  } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
    next = (current - 1 + items.length) % items.length;
  } else if (event.key === 'Home') {
    next = 0;
  } else if (event.key === 'End') {
    next = items.length - 1;
  } else {
    return;
  }

  event.preventDefault();
  items.forEach((item, index) => {
    item.tabIndex = index === next ? 0 : -1;
  });
  items[next].focus();
});
```

This example establishes focus movement only. The buttons retain native Enter and Space activation. A production toolbar must also address orientation, directionality, disabled items, dynamic additions, and application-specific commands.

---

## 12. Common custom-widget conventions

Follow the complete current APG pattern for any custom widget. The following is an orientation summary, not a substitute for the pattern.

| Widget | Common keyboard conventions |
| --- | --- |
| Tabs | Tab enters the tab list; arrow keys move between tabs; activation may be automatic or require Enter/Space; Tab moves into the active panel |
| Menu button | Enter or Space opens; arrow keys navigate menu items; Escape closes and returns focus |
| Combobox | Keys depend on editable/select-only behaviour and popup type; Escape commonly closes the popup |
| Tree view | Up/Down navigate visible nodes; Right expands or enters; Left collapses or moves to parent |
| Slider | Arrow keys adjust; Home/End commonly move to bounds; Page Up/Down may make larger changes |
| Grid | Arrow keys move among cells according to the grid design; Tab usually enters and leaves the composite rather than visiting every cell |
| Dialog | Tab remains within a modal; Escape commonly closes; focus returns logically |

Do not implement a widget from this summary alone. Use the complete pattern, document any variation, and test with representative browsers and assistive technologies.

---

## 13. Character-key shortcuts

If a shortcut uses only a printable character, punctuation mark, number, or symbol, provide at least one of the following when WCAG 2.1.4 applies:

- A way to turn the shortcut off
- A way to remap it to include one or more non-printing modifier keys
- Activation only while the relevant component has focus

Single-character shortcuts can be triggered accidentally by speech input. Do not register document-wide character shortcuts without user control.

Do not intercept browser, operating-system, or assistive-technology shortcuts. Avoid preventing default behaviour unless the component genuinely replaces it and provides an accessible equivalent.

Display shortcut instructions and provide them in a form assistive technology can perceive.

---

## 14. Skip links and bypassing repeated blocks

Provide a mechanism to bypass repeated navigation. A visible-on-focus skip link is a common solution.

```html
<a class="skip-link" href="#main-content">Skip to main content</a>

<header>…</header>
<nav aria-label="Primary">…</nav>
<main id="main-content" tabindex="-1">…</main>
<footer>…</footer>
```

```css
.skip-link {
  position: fixed;
  z-index: 1000;
  inset-block-start: 0.5rem;
  inset-inline-start: 0.5rem;
  padding: 0.75rem 1rem;
  color: #ffffff;
  background: #000000;
  transform: translateY(-200%);
}

.skip-link:focus {
  transform: translateY(0);
}
```

- Put the skip link at or near the start of the body.
- Ensure it becomes fully visible when focused.
- Ensure activation moves the viewport and keyboard focus to the intended destination.
- Use native landmarks without redundant role attributes. For example, use `<header>` rather than `<header role="banner">`, unless the element is used in a context where its native landmark role is not exposed.
- Give multiple navigation landmarks distinct accessible names.

Heading navigation and landmarks can also help users bypass blocks, but test the mechanism required by the project’s conformance approach.

---

## 15. Hidden, unavailable, and inert content

Choose the mechanism that matches the intended state.

| Mechanism | Visual rendering | Sequential focus | Accessibility tree |
| --- | --- | --- | --- |
| `hidden` or `display: none` | Hidden | Removed | Normally removed |
| `visibility: hidden` | Hidden | Removed | Normally removed |
| `inert` | Usually visible unless separately styled | Descendants removed | Descendants excluded from interaction/accessibility exposure |
| `aria-hidden="true"` | Unchanged | **Unchanged** | Content hidden from assistive technology |

Never put a focusable element inside an `aria-hidden="true"` subtree. `aria-hidden` does not prevent keyboard focus and can create a control that receives focus without being exposed to a screen reader.

Use `hidden` for closed disclosures that should be unavailable. Use `inert` when visible content must temporarily become non-interactive. Native modal dialogs opened with `showModal()` provide document-level modal behaviour without manually applying `inert` to every sibling.

When removing `hidden` or `inert`, verify that focus order remains logical.

---

## 16. Dynamic content and client-side navigation

Do not move focus merely because content updated. Move it when users need a new interaction context or would otherwise lose their place.

Common appropriate cases include:

- Opening a modal dialog
- Returning from a closed modal
- Focusing an error summary after failed submission
- Moving to the main heading after a client-side route change
- Moving to a newly inserted editing interface after explicit activation
- Recovering when the focused element is deleted

When a single-page application changes routes:

- Update the document title.
- Move focus to an appropriate heading or main container when that matches the navigation model.
- Announce the new context without creating duplicate announcements.
- Preserve expected browser Back and Forward behaviour.

Do not use positive `tabindex` or repeated synthetic Tab key events to manage application focus.

---

## 17. Testing expectations

### Page-level keyboard testing

- [ ] Start at the browser chrome and Tab into the page.
- [ ] Use Tab and Shift+Tab through the complete page.
- [ ] Confirm focus order is logical in both directions.
- [ ] Confirm every interactive function can be reached and operated.
- [ ] Confirm no inactive or hidden control receives focus.
- [ ] Confirm the focus indicator is always visible.
- [ ] Confirm sticky and overlaid content does not entirely obscure focused components.
- [ ] Activate the skip link and confirm viewport and focus movement.

### Component testing

- [ ] Test native controls without overriding their browser behaviour.
- [ ] Test every documented key for each custom widget.
- [ ] Test first, last, disabled, dynamically added, and dynamically removed items.
- [ ] Test Tab and Shift+Tab entry and exit.
- [ ] Test Home, End, arrows, Enter, Space, and Escape where the pattern uses them.
- [ ] Test writing direction and orientation where arrow behaviour depends on them.
- [ ] Confirm keyboard activation produces the same result as pointer activation.

### Dialog and overlay testing

- [ ] Confirm initial focus is appropriate.
- [ ] Confirm modal focus does not leave the dialog.
- [ ] Confirm visible controls and Escape close the dialog where expected.
- [ ] Confirm focus returns to a logical location.
- [ ] Confirm non-modal content does not trap focus.
- [ ] Confirm persistent overlays do not obscure later focus positions.
- [ ] Test nested overlays and repeated opening and closing.

### Assistive technology and display testing

- [ ] Test keyboard operation with a screen reader running.
- [ ] Test at 200% and 400% zoom.
- [ ] Test at a 320 CSS-pixel viewport.
- [ ] Test light, dark, increased-contrast, and forced-colours modes.
- [ ] Test speech input for controls whose visible labels are used as commands.
- [ ] Test character shortcuts with speech input or simulated text dictation.

---

## 18. Automated checks

Automated tools can detect some tabindex, accessible-name, ARIA, focus-indicator, and hidden-focus problems. They cannot determine whether the complete focus order is meaningful or whether every custom interaction follows its expected keyboard model.

Include automated checks for:

- Positive `tabindex` values
- Click handlers on non-interactive elements
- Focusable descendants of `aria-hidden` or inert content
- Missing accessible names
- Dialog open, close, containment, and restoration
- Custom-widget key handling and state changes
- Skip-link destination and focus movement
- Focus after client-side route changes
- Focus preservation after DOM updates
- Focus visibility in supported themes

Retain manual keyboard walkthroughs for every new or changed interaction pattern.

---

## 19. Definition of done

An interface is complete when:

- All functionality works through a keyboard interface where WCAG requires it.
- Native elements and native keyboard behaviour are used where practical.
- Focus can enter and leave every component using standard or documented methods.
- DOM, visual, reading, and focus sequences remain coherent.
- No positive `tabindex` is used without a documented exceptional need.
- Every keyboard-operable component has a visible focus indicator.
- Author-created content does not entirely obscure focused components.
- Modal and non-modal focus behaviour matches their interaction model.
- Focus returns logically after dialogs and destructive DOM updates.
- Composite widgets follow their complete documented keyboard pattern.
- Character-key shortcuts can be disabled, remapped, or scoped as required.
- Repeated blocks can be bypassed.
- Hidden or unavailable content does not receive focus.
- Client-side navigation establishes a clear new context.
- Automated checks and representative manual keyboard and assistive-technology tests pass.

---

## WCAG 2.2 criteria commonly applicable to keyboard interaction

- 1.3.2 Meaningful Sequence (A)
- 1.4.10 Reflow (AA)
- 1.4.11 Non-text Contrast (AA)
- 2.1.1 Keyboard (A)
- 2.1.2 No Keyboard Trap (A)
- 2.1.4 Character Key Shortcuts (A)
- 2.4.1 Bypass Blocks (A)
- 2.4.3 Focus Order (A)
- 2.4.7 Focus Visible (AA)
- 2.4.11 Focus Not Obscured (Minimum) (AA)
- 2.4.12 Focus Not Obscured (Enhanced) (AAA)
- 2.4.13 Focus Appearance (AAA)
- 2.5.3 Label in Name (A)
- 3.2.1 On Focus (A)
- 3.2.2 On Input (A)
- 4.1.2 Name, Role, Value (A)

Applicability depends on the interface. Conformance with a keyboard criterion does not establish conformance with every other criterion in this list.

---

## References

### W3C guidance

- [Understanding 2.1.1: Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html)
- [Understanding 2.1.2: No Keyboard Trap](https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html)
- [Understanding 2.1.4: Character Key Shortcuts](https://www.w3.org/WAI/WCAG22/Understanding/character-key-shortcuts.html)
- [Understanding 2.4.1: Bypass Blocks](https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html)
- [Understanding 2.4.3: Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html)
- [Understanding 2.4.7: Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html)
- [Understanding 2.4.11: Focus Not Obscured (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html)
- [Understanding 2.4.12: Focus Not Obscured (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-enhanced.html)
- [Understanding 2.4.13: Focus Appearance](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html)
- [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [APG: Developing a Keyboard Interface](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/)
- [APG: Dialog Modal Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)

### HTML and structured standards

- [HTML Living Standard: The `dialog` element](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-dialog-element)
- [HTML Living Standard: The `inert` attribute](https://html.spec.whatwg.org/multipage/interaction.html#the-inert-attribute)
- [wai-yaml-ld: WCAG 2.2 normative data](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wcag-2.2-normative.yaml)
- [wai-yaml-ld: ARIA informative data](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wai-aria-informative.yaml)
- [wai-yaml-ld: HTML accessibility data](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/html-living-standard-accessibility.yaml)

---

AGPL-3.0-or-later License - See LICENSE file for full text  
Copyright (c) 2026 Mike Gifford
