---
title: Touch and Pointer Accessibility Best Practices
---

# Touch and Pointer Accessibility Best Practices

This document defines project-level requirements for accessible touch, pointer, and
gesture-based interaction following WCAG 2.5.x criteria.

## 1. Core Principle

WCAG 2.5.x criteria (introduced in WCAG 2.1 and extended in 2.2) address pointer,
touch, and motion-based interaction. These criteria exist because:

- Motor disabilities affect both keyboard use and pointer/touch precision.
- Touch screens have different interaction affordances than a mouse.
- Many users alternate between keyboard and touch (tablets, convertibles).
- Voice control users activate elements by speaking visible labels — these must match.

Pointer and keyboard requirements are complementary. This guide covers pointer and
touch specifics; see [KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md](./KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md)
for keyboard requirements.

## 2. Never Block Zoom

Blocking browser zoom is a critical issue — it prevents low-vision users from
enlarging content to a usable size.

```html
<!-- Critical violation — never do this -->
<meta name="viewport" content="width=device-width, initial-scale=1,
      maximum-scale=1, user-scalable=no">

<!-- Correct -->
<meta name="viewport" content="width=device-width, initial-scale=1">
```

Some libraries and frameworks add `user-scalable=no` automatically. Audit your
viewport meta tag on every project.

## 3. Single-Pointer Alternatives for Multi-Point Gestures (WCAG 2.5.1)

Any functionality that uses multi-point gestures (pinch-to-zoom, two-finger rotate,
three-finger swipe) must also be available via a single-pointer interaction.

```html
<!-- Map with pinch zoom — provide button alternatives -->
<div role="group" aria-label="Map controls">
  <button type="button" aria-label="Zoom in">+</button>
  <button type="button" aria-label="Zoom out">−</button>
</div>
```

Path-based gestures (swipe, draw) must also have a single-tap or button alternative:
- **Swipe-to-delete:** also provide a delete button.
- **Swipe-to-reveal:** also provide a menu or button.
- **Draw to sign:** also accept a typed name where legally permitted.

## 4. Drag with No Alternative (WCAG 2.5.7)

Drag-and-drop interfaces must provide a single-pointer (click/tap) or keyboard
alternative. Drag with no alternative is a serious to critical issue.

```html
<!-- Reorderable list — provide up/down buttons as a drag alternative -->
<ul id="priority-list">
  <li>
    <span class="drag-handle" aria-hidden="true">⠿</span>
    Task A
    <button type="button" aria-label="Move Task A up">↑</button>
    <button type="button" aria-label="Move Task A down">↓</button>
  </li>
</ul>
```

The alternative does not need to look like the drag interaction — it just needs to
produce the same result (reordering, moving between columns, etc.).

## 5. Target Size Minimum (WCAG 2.5.8)

Interactive targets must be at least 24×24 CSS pixels (WCAG 2.2 AA requirement).
The recommended size for primary actions is 44×44 px.

```css
/* Minimum — WCAG 2.5.8 AA */
button, a, [role="button"], input[type="checkbox"], input[type="radio"] {
  min-width:  24px;
  min-height: 24px;
}

/* Recommended for primary controls */
.primary-action {
  min-width:  44px;
  min-height: 44px;
}
```

When a target is smaller than 44×44 px, ensure its offset (the spacing around it)
makes up the difference — a 20×20 px icon button with 12 px padding on all sides
meets the 44×44 guideline.

```css
/* Small icon button — padding provides target space */
.icon-btn {
  width: 20px;
  height: 20px;
  padding: 12px; /* Total clickable area: 44×44px */
}
```

Target size exceptions in WCAG 2.5.8 cover inline text links in running prose, where
requiring 44 px height would break text flow.

## 6. Pointer Cancellation (WCAG 2.5.2)

Actions triggered on `mousedown` or `touchstart` (the "down" event) cannot be
cancelled. Actions must complete on the "up" event so users can abort by moving the
pointer away before releasing.

```js
// Wrong — fires on mousedown, cannot be cancelled
button.addEventListener('mousedown', () => deleteItem());

// Right — fires on click (mouseup equivalent); user can drag away to cancel
button.addEventListener('click', () => deleteItem());
```

For drag operations, completion on `drop` (the up-event equivalent) is correct.

## 7. Motion Actuation Alternative (WCAG 2.5.4)

Functionality activated by device motion (shake, tilt) must have a UI alternative.
Users must also be able to disable the motion trigger to prevent accidental activation.

```js
if (window.DeviceMotionEvent) {
  window.addEventListener('devicemotion', handleShake);
}

// UI alternative — always present regardless of motion support
document.getElementById('undo-btn').addEventListener('click', undoLastAction);

// Allow user to disable motion trigger
document.getElementById('disable-motion').addEventListener('change', (e) => {
  if (e.target.checked) {
    window.removeEventListener('devicemotion', handleShake);
  }
});
```

## 8. Adaptive Target Sizing with CSS Media Queries

Use the `pointer` media query to provide larger targets on touch (coarse-pointer)
devices:

```css
/* Base: fine pointer (mouse) */
.nav-item a {
  padding: 4px 8px;
}

/* Touch/coarse pointer: expand hit area */
@media (pointer: coarse) {
  .nav-item a {
    padding: 12px 16px;
    min-height: 44px;
    display: flex;
    align-items: center;
  }
}
```

`@media (pointer: coarse)` targets touch screens and styluses.
`@media (any-pointer: coarse)` also matches when a coarse pointer is available
(for example, a laptop with a touchscreen).

## 9. Touch Target Spacing

Adjacent small targets need spacing to prevent mis-taps — particularly important
for users with tremor or at high magnification.

```css
/* Spacing between adjacent icon buttons */
.toolbar button + button {
  margin-left: 8px;
}

/* Checkbox/radio spacing */
.option-group label {
  display: block;
  padding: 8px 0;
}
```

## 10. Touch-Specific Interaction Patterns

- **Swipe carousels:** must have prev/next button alternatives; auto-advancing must
  pause on focus, hover, and touch; `prefers-reduced-motion` must disable animation.
- **Pull-to-refresh:** must have a button alternative; must not be the only way to
  refresh content.
- **Long-press context menus:** must have a right-click or button alternative for
  desktop users; must not be the only way to access important actions.

## 11. Label in Name for Voice Control (WCAG 2.5.3)

Voice Control users (Dragon NaturallySpeaking, iOS Voice Control) activate elements
by speaking their visible label. The accessible name must contain the visible text.

```html
<!-- Serious violation: aria-label overrides visible text -->
<button aria-label="Submit application">Send</button>
<!-- User says "click Send" — does not work because accessible name is "Submit application" -->

<!-- Correct: accessible name contains visible text -->
<button aria-label="Send application form">Send</button>

<!-- Or simply: -->
<button>Send</button>
```

The accessible name must begin with or contain the visible text string. Adding
context after the visible text is fine: "Send application" is correct when the
visible label is "Send".

## 12. `touch-action` CSS Property

Explicitly declare `touch-action` on elements that handle their own touch events:

```css
/* Allow vertical scroll but prevent horizontal swipe (carousel) */
.carousel { touch-action: pan-y; }

/* Custom drag element — prevent default browser panning */
.draggable { touch-action: none; }

/* Do not suppress all touch actions on standard interactive elements */
button { touch-action: auto; /* default */ }
```

Overusing `touch-action: none` can block scrolling on touch devices — use it only
on elements that genuinely handle their own touch events.

## 13. Testing Expectations

- Verify viewport meta tag does not include `user-scalable=no` or `maximum-scale`.
- Test all multi-gesture interactions for single-pointer alternatives.
- Test all drag-and-drop interfaces for button or keyboard alternatives.
- Measure interactive target sizes — minimum 24×24 px, recommended 44×44 px.
- Test with iOS VoiceOver (touch navigation) and TalkBack (Android).
- Test with voice control: speak visible labels to activate elements.

## 14. Definition of Done

A feature is not complete unless:

- `user-scalable=no` and `maximum-scale` are not in the viewport meta tag.
- All multi-point gesture functionality has a single-pointer alternative.
- All drag functionality has a button or keyboard alternative.
- Interactive targets are at minimum 24×24 px; primary controls are 44×44 px.
- Actions fire on up-events (`click`, `mouseup`, `touchend`), not down-events.
- Device motion functionality has a UI alternative and can be disabled.
- `@media (pointer: coarse)` used for adaptive touch-friendly sizing.
- Swipe carousels have prev/next buttons; auto-advance pauses on focus.
- `aria-label` values begin with or contain visible label text.
- Tested with iOS VoiceOver (touch), TalkBack (Android), and iOS Voice Control.

---

## References

- [WCAG 2.2 Understanding 2.5 Input Modalities](https://www.w3.org/WAI/WCAG22/Understanding/input-modalities)
- [WCAG 2.2 Understanding 2.5.8 Target Size Minimum](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- [WCAG 2.2 Understanding 2.5.7 Dragging Movements](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html)
- [MDN — Pointer events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events)
- [MDN — touch-action](https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action)
- [ESDC — Touch input accessibility (Government of Canada)](https://bati-itao.github.io/learning/esdc-self-paced-web-accessibility-course/module10/touch-input.html)

### Machine-Readable Standards

For AI systems and automated tooling, see [wai-yaml-ld](https://github.com/mgifford/wai-yaml-ld) for structured accessibility standards:

- [WCAG 2.2 (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wcag-2.2-normative.yaml) - Machine-readable WCAG 2.2 normative content including pointer and touch criteria
- [HTML Living Standard Accessibility (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/html-living-standard-accessibility.yaml) - HTML interactive element accessibility
- [Standards Link Graph (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/standards-link-graph.yaml) - Relationships across WCAG pointer and touch standards
