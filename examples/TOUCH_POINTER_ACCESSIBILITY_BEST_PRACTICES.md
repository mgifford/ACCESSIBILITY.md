---
title: Touch and Pointer Accessibility Best Practices
---

# Touch and Pointer Accessibility Best Practices

## Core Mandate

WCAG 2.5.x criteria (introduced in WCAG 2.1 and extended in 2.2) address pointer,
touch, and motion-based interaction. These criteria exist because:

- Motor disabilities affect both keyboard use and pointer/touch precision
- Touch screens have different interaction affordances than mouse
- Many users alternate between keyboard and touch (tablets, convertibles)
- Voice control users activate elements by speaking visible labels — these must match

The full WCAG 2.5 set is listed in the criteria table. This skill covers the
most implementation-relevant patterns.

---

## Severity Scale

| Level | Meaning |
|---|---|
| **Critical** | Functionality only available via multi-point gesture with no single-pointer alternative; `user-scalable=no` prevents zoom |
| **Serious** | Drag-to-reorder with no keyboard/single-pointer alternative; touch target under 24×24px for primary actions |
| **Moderate** | Mousedown/touchdown action with no up-event cancellation; motion gesture without UI alternative |
| **Minor** | Target under 44×44px for non-primary actions; spacing between targets too small |

---

## Assistive Technology Context

| AT | How pointer/touch requirements apply |
|---|---|
| NVDA / JAWS | Primarily keyboard users — see `keyboard/SKILL.md`. Pointer events don't affect screen reader operation directly |
| VoiceOver (iOS) | Touch-based AT; uses tap, double-tap, swipe — standard HTML interactive elements work natively |
| TalkBack (Android) | Touch-based AT; double-tap to activate; swipe to navigate |
| Voice Control (iOS/macOS) | Activates elements by speaking visible labels; target size matters less than label accuracy |
| Dragon NaturallySpeaking | Click by number or by name; label accuracy critical |
| Switch access | Scans interactive elements; target size and order matter |
| Screen magnification | Small targets are harder to hit at high zoom; spacing prevents mis-taps |
| Stylus / eye gaze | Precision varies; larger targets with more spacing reduce error rate |

---

## Critical: Never Block Zoom (`user-scalable=no`)

Blocking browser zoom is **Critical** — it prevents low-vision users from
enlarging content to a usable size.

```html
<!-- Critical violation — never do this -->
<meta name="viewport" content="width=device-width, initial-scale=1,
      maximum-scale=1, user-scalable=no">

<!-- Correct -->
<meta name="viewport" content="width=device-width, initial-scale=1">
```

Some libraries and frameworks add `user-scalable=no` automatically (Bootstrap
historically did this in mobile CSS). Audit your viewport meta tag on every
project.

---

## Critical: Single-Pointer Alternatives for Multi-Point Gestures (WCAG 2.5.1)

Any functionality that uses multi-point gestures (pinch-to-zoom, two-finger
rotate, three-finger swipe) **must** also be available via a single-pointer
interaction.

```html
<!-- Map with pinch zoom — provide button alternatives -->
<div role="group" aria-label="Map controls">
  <button type="button" aria-label="Zoom in">+</button>
  <button type="button" aria-label="Zoom out">−</button>
</div>
```

Path-based gestures (swipe, draw) must also have a single-tap or button
alternative. Examples:
- **Swipe-to-delete:** also provide a delete button
- **Swipe-to-reveal:** also provide a menu or button
- **Draw to sign:** also accept typed name as an alternative where legally permitted

---

## Critical: Drag with No Alternative (WCAG 2.5.7 — WCAG 2.2)

Drag-and-drop interfaces must provide a single-pointer (click/tap) or keyboard
alternative. **Drag with no alternative is Serious to Critical.**

```html
<!-- Reorderable list — provide up/down buttons as drag alternative -->
<ul id="priority-list">
  <li>
    <span class="drag-handle" aria-hidden="true">⠿</span>
    Task A
    <button type="button" aria-label="Move Task A up">↑</button>
    <button type="button" aria-label="Move Task A down">↓</button>
  </li>
</ul>
```

The alternative does not need to look like the drag — it just needs to
provide the same result (reordering, moving between columns, etc.).

---

## Serious: Target Size Minimum (WCAG 2.5.8 — WCAG 2.2)

Interactive targets must be at least **24×24 CSS pixels** (AA requirement).
**Below 24×24 is Serious.** The recommended size for primary actions is **44×44px**.

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

When a target is smaller than 44×44px, ensure its **offset** (the spacing
around it) makes up the difference — a 20×20px icon button with 12px padding
on all sides meets the 44×44 guideline.

```css
/* Small icon button — padding provides target space */
.icon-btn {
  width: 20px;
  height: 20px;
  padding: 12px; /* Total clickable area: 44×44px */
}
```

For inline text links, target size exceptions apply — the WCAG exception
covers inline links in a sentence (where requiring 44px height would break
text flow).

---

## Serious: Pointer Cancellation (WCAG 2.5.2)

Actions triggered on `mousedown` or `touchstart` (the "down" event) cannot
be cancelled. Actions must complete on the "up" event (`mouseup`, `touchend`,
`click`) so users can abort by moving the pointer away.

```js
// Wrong — fires on mousedown, cannot be cancelled
button.addEventListener('mousedown', () => deleteItem());

// Right — fires on click (mouseup equivalent); user can drag away to cancel
button.addEventListener('click', () => deleteItem());
```

For drag operations, completion on `drop` (the up-event equivalent) is correct.
Custom gesture libraries should use up-events for final action.

---

## Serious: Motion Actuation Alternative (WCAG 2.5.4)

Functionality activated by device motion (shake, tilt) must have a UI alternative.
Users must also be able to disable the motion trigger to prevent accidental activation.

```js
// Device motion — always provide UI alternative
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

---

## Moderate: Adaptive Target Sizing with CSS Media Queries

Use `pointer` media query to provide larger targets on coarse-pointer (touch)
devices and tighter targets on fine-pointer (mouse) devices:

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
`@media (pointer: fine)` targets mouse and trackpad.
`@media (any-pointer: coarse)` also matches when a coarse pointer is *available*
(e.g., a laptop with a touchscreen) — use when you want to offer touch-friendly
sizing even on hybrid devices.

---

## Moderate: Touch Target Spacing

Adjacent small targets need spacing to prevent mis-taps — particularly
important for users with tremor, motor difficulties, or at high magnification.

```css
/* Spacing between adjacent icon buttons */
.toolbar button + button {
  margin-left: 8px;
}

/* Checkbox/radio spacing */
.option-group label {
  display: block;
  padding: 8px 0; /* vertical spacing between options */
}
```

WCAG 2.5.8 allows targets smaller than 24×24px if the offset (spacing to
adjacent targets) ensures the total space per target is at least 24×24px.

---

## Moderate: Touch-Specific Interaction Patterns

**Swipe carousels:** must have prev/next button alternatives; auto-advancing
must pause on focus/hover/touch; `prefers-reduced-motion` must disable animation.

**Pull-to-refresh:** must have a button alternative; must not be the only
way to refresh content.

**Long-press context menus:** must have a right-click or button alternative
for desktop users; must not be the only way to access important actions.

**Custom touch gestures (swipe, pinch in a non-map context):** document them
clearly; always provide single-pointer alternatives.

---

## Moderate: Label in Name for Voice Control (WCAG 2.5.3)

Voice Control users (Dragon NaturallySpeaking, iOS Voice Control) activate
elements by speaking their visible label. **The accessible name must contain
the visible text.**

```html
<!-- Serious violation: aria-label overrides visible text -->
<button aria-label="Submit application">Send</button>
<!-- User says "click Send" — does not work because accessible name is "Submit application" -->

<!-- Correct: accessible name contains visible text -->
<button aria-label="Send application form">Send</button>
<!-- Or simply: -->
<button>Send</button>
<!-- If context makes "Send" clear, no aria-label needed -->
```

The accessible name must **begin with** or **contain** the visible text string.
Adding context before or after is fine: "Send application" ✓, "Submit" when
visible text is "Send" ✗.

---

## Minor: `touch-action` CSS Property

Explicitly declare `touch-action` on elements that handle their own touch
events to prevent browser interference:

```css
/* Allow vertical scroll but prevent horizontal swipe (carousel) */
.carousel { touch-action: pan-y; }

/* Custom drag element — prevent default browser panning */
.draggable { touch-action: none; }

/* Do not suppress all touch actions on interactive elements */
button { touch-action: auto; /* default */ }
```

Overusing `touch-action: none` can block scrolling on touch devices — only
use it on elements that genuinely handle their own touch events.

---

## Definition of Done Checklist

* [ ] `user-scalable=no` and `maximum-scale` not in viewport meta tag
* [ ] All multi-point gesture functionality has single-pointer alternative
* [ ] All drag functionality has button/keyboard alternative
* [ ] Interactive targets: minimum 24×24px; primary controls 44×44px recommended
* [ ] Small targets have offset spacing to reach 24px effective area
* [ ] Actions fire on up-event (`click`, `mouseup`, `touchend`); not down-event
* [ ] Device motion functionality has UI alternative and can be disabled
* [ ] `@media (pointer: coarse)` used for adaptive touch-friendly sizing
* [ ] Swipe carousels have prev/next buttons; auto-advance pauses on focus
* [ ] Voice Control tested: all interactive elements activatable by speaking visible text
* [ ] `aria-label` values begin with or contain visible label text (WCAG 2.5.3)
* [ ] `touch-action` set only on elements that handle their own touch events
* [ ] Tested: iOS VoiceOver (touch), TalkBack (Android), iOS Voice Control

---

## Key WCAG Criteria

* 1.4.4 Resize Text (AA) — **Critical if zoom blocked**
* 2.5.1 Pointer Gestures (A) — **Serious if multi-point gesture has no alternative**
* 2.5.2 Pointer Cancellation (A) — **Serious if actions fire on down-event**
* 2.5.3 Label in Name (A) — **Serious for voice control users**
* 2.5.4 Motion Actuation (A)
* 2.5.7 Dragging Movements (AA, WCAG 2.2) — **Serious if drag has no alternative**
* 2.5.8 Target Size Minimum (AA, WCAG 2.2) — **Serious below 24×24px**

---

## References

- [WCAG 2.2 Understanding 2.5 Input Modalities](https://www.w3.org/WAI/WCAG22/Understanding/input-modalities)
- [WCAG 2.2 Understanding 2.5.8 Target Size Minimum](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- [WCAG 2.2 Understanding 2.5.7 Dragging Movements](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html)
- [MDN — Pointer events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events)
- [MDN — touch-action](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/touch-action)
- [ESDC — Touch input accessibility (Government of Canada)](https://bati-itao.github.io/learning/esdc-self-paced-web-accessibility-course/module10/touch-input.html)

### Machine-Readable Standards

For AI systems and automated tooling, see [wai-yaml-ld](https://github.com/mgifford/wai-yaml-ld) for structured accessibility standards:

- [WCAG 2.2 (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wcag-2.2-normative.yaml) - Machine-readable WCAG 2.2 normative content including pointer and touch criteria
- [HTML Living Standard Accessibility (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/html-living-standard-accessibility.yaml) - HTML interactive element accessibility
- [Standards Link Graph (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/standards-link-graph.yaml) - Relationships across WCAG pointer and touch standards
