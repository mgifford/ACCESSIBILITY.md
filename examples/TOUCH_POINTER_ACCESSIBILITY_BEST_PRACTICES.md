---
title: Touch and Pointer Accessibility Best Practices
---

# Touch and Pointer Accessibility Best Practices

Build interfaces that work with touchscreens, mice, trackpads, pens, head pointers, switch-controlled pointers, and other pointing devices. Do not infer a person's abilities from the device they use. A touchscreen user may also use a keyboard, speech input, a screen reader, or a mouse.

Pointer accessibility and keyboard accessibility overlap, but they are not interchangeable. A keyboard alternative does not by itself satisfy requirements for pointer gestures or dragging movements.

---

## 1. Required Outcomes

A conforming implementation must:

- allow browser and operating-system zoom;
- provide a simple single-pointer alternative to author-defined multipoint and path-based gestures, unless the gesture is essential;
- provide a single-pointer alternative that does not require dragging for every author-defined drag operation, unless dragging is essential;
- avoid triggering completion on the pointer-down event unless that timing is essential;
- make pointer targets at least 24 by 24 CSS pixels or satisfy a defined WCAG 2.2 exception;
- make all functionality available without requiring device motion;
- ensure each accessible name contains the control's visible text label;
- avoid functionality that depends only on hover, fine pointing, pressure, tilt, or a particular pointer type;
- preserve page scrolling, panning, pinch zoom, and browser gestures unless suppressing them is necessary in a narrowly scoped component;
- expose accurate names, roles, values, and states for controls; and
- remain usable with keyboard input, speech input, touch screen readers, zoom, narrow viewports, different orientations, and hybrid devices.

Use 44 by 44 CSS pixels as the preferred target size for frequently used controls. It is also the threshold in WCAG 2.2 Success Criterion 2.5.5, Target Size (Enhanced), at Level AAA.

---

## 2. Start With an Input-agnostic Base

Use native HTML controls and links. Their built-in `click` activation works across mouse, touch, pen, keyboard, and many assistive technologies.

```html
<button type="button">Save changes</button>
<a href="/help/">Get help</a>
```

Do not build a button from a generic element and device-specific handlers.

```html
<!-- Incorrect -->
<div class="button" ontouchend="saveChanges()">Save changes</div>

<!-- Correct -->
<button type="button" id="save-button">Save changes</button>

<script>
  document.querySelector("#save-button").addEventListener("click", saveChanges);
</script>
```

Use Pointer Events for custom direct-manipulation components. Do not maintain separate mouse and touch implementations unless a documented compatibility need requires it.

Do not gate core functionality on `pointerType`. A pen user, for example, should not lose a function that a mouse user receives.

---

## 3. Allow Zoom and Magnification

Use a responsive viewport declaration without restricting scaling.

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

Do not use `user-scalable=no`, `maximum-scale=1`, or scripts that block pinch zoom.

```html
<!-- Incorrect -->
<meta
  name="viewport"
  content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
>
```

Users may need browser zoom, pinch zoom, text enlargement, or operating-system magnification even when the page is responsive. Test text at 200% and page layout at 400% zoom. At narrow equivalent widths, content should reflow without losing information or controls, apart from content that genuinely requires two-dimensional layout.

Do not rely on browser attempts to ignore restrictive viewport settings. Remove the restriction from the source.

---

## 4. Provide Alternatives to Complex Pointer Gestures

A **multipoint gesture** uses two or more contact points, such as pinch zoom. A **path-based gesture** depends on the route, direction, or shape traced by the pointer, not just its start and end points.

When content defines such a gesture, provide another way to perform the same function with a single pointer and no path-based gesture. Examples include:

- buttons for zooming and panning a map;
- previous and next buttons for a swipe carousel;
- a menu command in addition to drawing a shape;
- visible controls for rotating or resizing an object; and
- a button or menu in addition to a multi-finger gesture.

```html
<div class="map-controls" aria-label="Map controls">
  <button type="button" data-map-action="zoom-in">Zoom in</button>
  <button type="button" data-map-action="zoom-out">Zoom out</button>
  <button type="button" data-map-action="north">Pan north</button>
  <button type="button" data-map-action="south">Pan south</button>
  <button type="button" data-map-action="west">Pan west</button>
  <button type="button" data-map-action="east">Pan east</button>
</div>
```

The alternative must be available in the content. A keyboard-only alternative is not enough to satisfy Success Criterion 2.5.1, although keyboard operability is separately required by Success Criterion 2.1.1.

Gestures required by the browser or assistive technology, such as a mobile screen reader's navigation gestures, are outside the author's control. Do not reproduce or interfere with them unnecessarily.

---

## 5. Provide Non-dragging Alternatives

If a function uses dragging, provide a way to complete it with a single pointer without dragging. Suitable patterns include:

- select an item, then use Move up and Move down buttons;
- select an item, choose a destination, then activate Move;
- tap a map control to pan in a direction;
- enter a value or click the track in addition to dragging a slider thumb; and
- use buttons to resize, rotate, or reorder an object.

A keyboard-only alternative does not by itself satisfy Success Criterion 2.5.7, Dragging Movements. The alternative must work with a single pointer without a drag. Native buttons can satisfy that pointer requirement and also provide keyboard access.

### Reordering example

```html
<ul id="task-list">
  <li>
    <span>Review content</span>
    <button type="button" data-move="up" aria-label="Move up: Review content">
      Move up
    </button>
    <button type="button" data-move="down" aria-label="Move down: Review content">
      Move down
    </button>
  </li>
  <li>
    <span>Test keyboard access</span>
    <button type="button" data-move="up" aria-label="Move up: Test keyboard access">
      Move up
    </button>
    <button type="button" data-move="down" aria-label="Move down: Test keyboard access">
      Move down
    </button>
  </li>
</ul>

<p id="reorder-status" role="status" aria-atomic="true"></p>

<script>
  const taskList = document.querySelector("#task-list");
  const reorderStatus = document.querySelector("#reorder-status");

  function updateMoveButtons() {
    const items = [...taskList.children];

    items.forEach((item, index) => {
      item.querySelector('[data-move="up"]').disabled = index === 0;
      item.querySelector('[data-move="down"]').disabled = index === items.length - 1;
    });
  }

  taskList.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-move]");
    if (!button) return;

    const item = button.closest("li");
    const label = item.querySelector("span").textContent;
    const direction = button.dataset.move;

    if (direction === "up" && item.previousElementSibling) {
      item.previousElementSibling.before(item);
    } else if (direction === "down" && item.nextElementSibling) {
      item.nextElementSibling.after(item);
    } else {
      return;
    }

    updateMoveButtons();
    const focusTarget = button.disabled
      ? item.querySelector("button:not([disabled])")
      : button;

    focusTarget?.focus();
    reorderStatus.textContent = `${label} moved ${direction}.`;
  });

  updateMoveButtons();
</script>
```

Drag and drop may remain as an enhancement. The non-dragging controls must expose the same result, remain visible or readily discoverable, and preserve focus and state after the move.

---

## 6. Support Pointer Cancellation

For ordinary controls, activate the function on `click`, not `pointerdown`, `mousedown`, or `touchstart`.

```js
const deleteButton = document.querySelector("#delete-button");

deleteButton.addEventListener("click", deleteItem);
```

WCAG permits several pointer-cancellation patterns:

1. the down event does not execute the function;
2. the function completes on the up event and the user can abort before releasing or undo after completion;
3. releasing reverses the outcome of the down event; or
4. completing on the down event is essential.

For a destructive or difficult-to-reverse action, also use confirmation or provide a clear Undo action where appropriate.

```html
<button type="button" id="archive-button">Archive message</button>
<p id="archive-status" role="status"></p>
<button type="button" id="undo-archive" hidden>Undo archive</button>

<script>
  const archiveStatus = document.querySelector("#archive-status");
  const undoArchive = document.querySelector("#undo-archive");

  document.querySelector("#archive-button").addEventListener("click", () => {
    archiveMessage();
    archiveStatus.textContent = "Message archived. Undo is available.";
    undoArchive.hidden = false;
  });

  undoArchive.addEventListener("click", () => {
    restoreMessage();
    undoArchive.hidden = true;
    archiveStatus.textContent = "Message restored.";
  });
</script>
```

---

## 7. Meet the Target Size Requirements

### WCAG 2.2 Level AA

Success Criterion 2.5.8 requires pointer targets to be at least 24 by 24 CSS pixels, except when one of these conditions applies:

- **Spacing:** a 24 CSS-pixel diameter circle centered on the target's bounding box does not intersect another target or an equivalent circle around another undersized target.
- **Equivalent:** another control on the same page performs the same function and meets the size requirement.
- **Inline:** the target appears in a sentence or its size is constrained by the line height of non-target text.
- **User agent control:** the browser determines the target size and the author has not modified it.
- **Essential:** the target's particular presentation is essential or legally required.

Do not reduce the criterion to a vague instruction to add spacing. The spacing exception has a specific geometric test.

### WCAG 2.2 Level AAA

Success Criterion 2.5.5 requires a target size of at least 44 by 44 CSS pixels, with exceptions for an equivalent target, inline text, unmodified user-agent controls, and essential presentation.

### Recommended default

Use an actual target of at least 44 by 44 CSS pixels for important and frequently used controls. This is easier to understand, implement, and test than relying on the Level AA spacing exception.

The visible icon can be smaller than the target. Padding inside the link or button must be clickable.

```css
.icon-button {
  display: inline-grid;
  min-inline-size: 2.75rem;
  min-block-size: 2.75rem;
  padding: 0.625rem;
  place-items: center;
}

.icon-button svg {
  inline-size: 1.5rem;
  block-size: 1.5rem;
}
```

At a default root font size of 16 CSS pixels, `2.75rem` is 44 CSS pixels. Using `rem` also lets the target grow when a user increases the default text size.

Do not apply a blanket minimum width and height to every `<a>` element. Inline links have a defined exception, and forcing them into square boxes damages reading and wrapping.

---

## 8. Make the Whole Visible Control Operable

Put padding on the interactive element, not on a non-interactive wrapper.

```html
<a class="nav-link" href="/account/">Account</a>
```

```css
.nav-link {
  display: inline-flex;
  min-block-size: 2.75rem;
  padding: 0.625rem 0.875rem;
  align-items: center;
}
```

Associate checkboxes and radio buttons with visible labels. The label then provides a larger operable area.

```html
<label class="choice">
  <input type="checkbox" name="updates">
  Email me product updates
</label>
```

```css
.choice {
  display: flex;
  gap: 0.75rem;
  min-block-size: 2.75rem;
  padding: 0.625rem;
  align-items: center;
}
```

Do not place several actions inside one undifferentiated clickable card. Use distinct links or buttons with enough space to prevent accidental activation.

---

## 9. Do Not Depend on Hover

Every function revealed on hover must also be available through a persistent control or keyboard focus. Touch devices may not support hover, and emulated hover can behave unpredictably.

Use a button for disclosure menus.

```html
<button
  type="button"
  id="account-menu-button"
  aria-expanded="false"
  aria-controls="account-menu"
>
  Account menu
</button>

<ul id="account-menu" hidden>
  <li><a href="/profile/">Profile</a></li>
  <li><a href="/settings/">Settings</a></li>
</ul>
```

Hover may enhance visual feedback, but it must not be the only indication.

```css
.control:focus-visible {
  outline: 0.1875rem solid CanvasText;
  outline-offset: 0.1875rem;
}

@media (hover: hover) {
  .control:hover {
    text-decoration-thickness: 0.1875rem;
  }
}
```

Content that appears on hover or focus must be dismissible, hoverable when a pointer can reach it, and persistent until the user dismisses it, moves away, or it is no longer valid, unless a defined exception applies. A visible button and ordinary disclosure are usually more reliable than a tooltip for essential instructions.

---

## 10. Use Pointer and Hover Media Features Carefully

The `pointer` and `hover` media features describe the primary pointing device. `any-pointer` and `any-hover` report capabilities across all available pointing devices.

They do not:

- detect keyboard use;
- identify a disability;
- prove that a person can use the available fine pointer or hover capability; or
- reliably classify every pen as coarse or every touchscreen as the primary device.

A drawing stylus will commonly be reported as a fine pointer. A touchscreen commonly reports a coarse pointer. Hybrid devices can report several capabilities, and those capabilities can change while the page is open.

Start with an accessible layout, then use media queries only for enhancements.

```css
.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.toolbar button {
  min-inline-size: 2.75rem;
  min-block-size: 2.75rem;
}

@media (any-pointer: coarse) {
  .toolbar {
    gap: 0.75rem;
  }
}
```

Do not hide essential controls behind an accurate-pointer query.

```css
/* Incorrect: touch and keyboard users may lose the controls. */
@media (pointer: fine) {
  .editing-controls {
    display: flex;
  }
}
```

---

## 11. Prefer Pointer Events for Custom Interaction

Pointer Events provide one event model for mouse, touch, pen, and other pointers. Native controls remain preferable. When a custom direct-manipulation surface is necessary:

- track the active `pointerId`;
- use pointer capture when the interaction must continue outside the element;
- finish on `pointerup`;
- cancel cleanly on `pointercancel`;
- account for `lostpointercapture`;
- avoid assuming every pointer reports pressure, tilt, or dimensions; and
- provide non-gesture and non-dragging controls for the same function.

```js
const surface = document.querySelector("#custom-surface");
let activePointerId = null;

function cancelInteraction() {
  activePointerId = null;
  restorePreviewState();
}

surface.addEventListener("pointerdown", (event) => {
  if (activePointerId !== null) return;

  activePointerId = event.pointerId;
  surface.setPointerCapture(event.pointerId);
  beginPreview(event.clientX, event.clientY);
});

surface.addEventListener("pointermove", (event) => {
  if (event.pointerId !== activePointerId) return;
  updatePreview(event.clientX, event.clientY);
});

surface.addEventListener("pointerup", (event) => {
  if (event.pointerId !== activePointerId) return;
  activePointerId = null;
  commitInteraction(event.clientX, event.clientY);
});

surface.addEventListener("pointercancel", (event) => {
  if (event.pointerId === activePointerId) cancelInteraction();
});

surface.addEventListener("lostpointercapture", () => {
  if (activePointerId !== null) cancelInteraction();
});
```

The example shows event handling, not a complete accessible widget. The surface still needs an accessible name and role where applicable, keyboard operation, visible focus, state exposure, and simple pointer controls. If a native control can perform the task, use it instead.

Do not register both `touchend` and `click` handlers for the same action without preventing duplicate activation. Prefer one device-independent `click` handler for ordinary controls.

---

## 12. Preserve Browser Panning and Zooming With `touch-action`

The `touch-action` property tells the browser which direct-manipulation gestures it may handle. It affects compatible pointers, not only touchscreens.

Use it only on the smallest custom interaction surface that needs it.

```css
/* A horizontal carousel may handle horizontal movement.
   Preserve vertical page scrolling and pinch zoom. */
.carousel-viewport {
  touch-action: pan-y pinch-zoom;
}
```

Do not broadly apply `touch-action: none` to `html`, `body`, page containers, maps, canvases, or carousels. It suppresses user-agent panning and zooming that begin on the affected element.

Before restricting a gesture, confirm that:

- the component genuinely needs to handle that gesture;
- page scrolling still works from the component;
- pinch zoom remains available;
- a simple control provides the same function; and
- Pointer Events cancellation is handled.

CSS `touch-action` is preferable to non-passive event listeners that call `preventDefault()` on every touch movement.

---

## 13. Apply Robust Patterns to Common Components

| Component | Required approach |
|:---|:---|
| Carousel | Provide previous, next, and pause controls. Do not require swiping. Preserve page scrolling and reduced-motion preferences. |
| Map | Provide named zoom and pan controls. Offer an address, coordinates, directions, or list-based alternative when the visual map is not sufficient. |
| Slider | Prefer `<input type="range">`. Provide a numeric input or other simple pointer method when dragging is required for the slider. |
| Sortable list | Provide Move up, Move down, or Move to controls in addition to drag and drop. Announce the result and preserve focus. |
| Swipe action | Expose the same action through a visible button or menu. Do not make swipe the only way to delete, archive, or reveal controls. |
| Long press | Provide an ordinary button or menu. Long press must not be the only way to reach a function. |
| Drawing or signature | Avoid requiring fine path accuracy when it is not essential. Provide typed, uploaded, or confirmation alternatives where the task allows them. |
| Canvas control | Provide an accessible DOM interface for all operations, names, values, instructions, and results. Canvas drawing pixels do not by themselves create accessible semantics. |

Do not depend on double-tap, pressure, tilt, edge swipes, or device-specific gestures for essential functions.

---

## 14. Provide an Alternative to Device Motion

If shaking, tilting, or gesturing toward a camera performs a function:

- provide a conventional user-interface control for the same function;
- let the user disable motion actuation; and
- request sensor permission only in response to a clear user action.

```html
<button type="button" id="undo-button">Undo last change</button>

<label>
  <input type="checkbox" id="shake-toggle">
  Enable shake to undo
</label>

<p id="motion-status" role="status"></p>
```

Keep the conventional Undo button available whether motion input is enabled or not. Defaulting the optional sensor feature to off avoids surprising activation and unnecessary permission requests.

```js
const shakeToggle = document.querySelector("#shake-toggle");
const motionStatus = document.querySelector("#motion-status");

async function requestMotionAccess() {
  if (!("DeviceMotionEvent" in window)) return false;

  if (typeof DeviceMotionEvent.requestPermission === "function") {
    return (await DeviceMotionEvent.requestPermission()) === "granted";
  }

  return true;
}

function handleMotion(event) {
  // Apply a tested threshold and cooldown before calling undoLastChange().
  // Never make this sensor path the only way to undo.
}

shakeToggle.addEventListener("change", async () => {
  if (!shakeToggle.checked) {
    window.removeEventListener("devicemotion", handleMotion);
    motionStatus.textContent = "Shake to undo disabled.";
    return;
  }

  const allowed = await requestMotionAccess();

  if (!allowed) {
    shakeToggle.checked = false;
    motionStatus.textContent = "Motion access was not enabled. Use the Undo button.";
    return;
  }

  window.addEventListener("devicemotion", handleMotion);
  motionStatus.textContent = "Shake to undo enabled.";
});
```

Motion input provided through an accessibility-supported interface or motion that is essential to the function has defined exceptions. Apply those exceptions narrowly.

---

## 15. Keep the Visible Label in the Accessible Name

Speech-input users often activate a control by saying its visible label. When a control has visible text, its accessible name must contain that text.

```html
<!-- Good: the accessible name is "Send". -->
<button type="button">Send</button>

<!-- Good: the visible label "Send" is at the start of the name. -->
<button type="button" aria-label="Send application">Send</button>
```

```html
<!-- Incorrect: the visible text is absent from the accessible name. -->
<button type="button" aria-label="Submit application">Send</button>
```

Putting the visible label at the start of a longer accessible name is a useful convention, especially for speech input.

An icon-only button has no visible text label to compare under Success Criterion 2.5.3, but it still needs a clear accessible name under Success Criterion 4.1.2.

```html
<button type="button" aria-label="Close dialog">
  <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
    <path d="M5 5l14 14M19 5L5 19"></path>
  </svg>
</button>
```

Use familiar icons and provide a visible label when space allows. A tooltip is not a replacement for a reliably available label on an unfamiliar control.

---

## 16. Preserve Orientation, Reflow, and Reachability

Support portrait and landscape orientations unless a particular orientation is essential. Do not use orientation locks to compensate for an inflexible layout.

At narrow widths and high zoom:

- keep controls in the document and in a meaningful order;
- wrap toolbars instead of shrinking targets below their minimum size;
- prevent sticky headers, cookie banners, chat widgets, and fixed footers from obscuring focused controls;
- keep dialogs and menus within the viewport while allowing their content to scroll;
- avoid horizontal page scrolling except for content that genuinely needs two dimensions; and
- keep primary actions reachable without precision or edge gestures.

When an on-screen keyboard opens, focused inputs, error messages, and submit controls must remain visible or be scrollable into view.

Do not assume that every touch user holds a device in one hand or can reach the screen edge. Reachability is a usability concern, not a substitute for the normative requirements.

---

## 17. Account for Touch Screen Readers

Mobile screen readers change how touch input reaches a page. A user may explore controls by touch, swipe through the accessibility tree, and use a screen-reader activation gesture instead of directly tapping the control.

To support this interaction:

- use native elements and accurate accessible names;
- keep the accessible target aligned with the visible control;
- expose current state, such as expanded, selected, checked, or value;
- avoid custom gestures that conflict with assistive-technology gestures;
- do not require spatial knowledge such as “tap the shape in the upper-right corner”; and
- ensure updates, errors, and completion messages are programmatically available.

Test both direct touch with the screen reader off and touch exploration with it on. Passing one mode does not establish that the other works.

---

## 18. Prevent Accidental Activation and Data Loss

Touch input can be imprecise, interrupted, or obscured by the user's hand. For consequential actions:

- separate adjacent destructive and constructive actions;
- use clear labels instead of ambiguous icons;
- do not execute on pointer down;
- confirm actions that are difficult to reverse;
- offer Undo when practical;
- preserve entered data after validation errors, orientation changes, or temporary disconnection; and
- avoid automatic submission or navigation when a value changes.

Do not use target size as the only safeguard. A large Delete button can still cause harm if it is next to Save and has no recovery path.

---

## 19. Keep Keyboard Requirements Separate

All interactive functions must still be keyboard operable unless the underlying function depends on the path of the user's movement, such as freehand drawing.

For custom pointer components, also provide:

- a logical focus order;
- visible focus that is not obscured;
- native controls or documented keyboard commands;
- no keyboard trap;
- correct state and value announcements; and
- instructions that do not depend only on pointer actions.

A component can pass keyboard testing and still fail pointer-gesture, dragging, target-size, or pointer-cancellation requirements. Test each requirement directly.

---

## 20. Testing

### Code and design review

1. Inventory all controls, links, clickable regions, custom canvases, and gesture surfaces.
2. Identify multipoint, path-based, dragging, swipe, long-press, pressure, tilt, and motion interactions.
3. Confirm that each has the required simple pointer or user-interface alternative.
4. Measure actual target boxes in CSS pixels and evaluate the exact spacing exception where a target is smaller than 24 by 24.
5. Search for restrictive viewport settings, broad `touch-action` rules, and device-specific event handlers.
6. Verify that visible labels are contained in accessible names.

### Input testing

- Complete every task with touch alone.
- Complete every task with a mouse or trackpad.
- Test a pen when the product supports pen input.
- Complete every task with a keyboard alone.
- Test speech input for visible control labels.
- Test touch exploration and activation with supported mobile screen readers.
- Test a hybrid device that switches between touch, trackpad, mouse, and keyboard.

Use physical devices for final testing. Browser emulation can approximate viewport size and some media queries, but it does not reproduce hand occlusion, reach, accidental contact, sensor permissions, screen-reader gestures, or hardware changes reliably.

### Visual and layout testing

- Test portrait and landscape orientations.
- Test text at 200% and page layout at 400% browser zoom.
- Test the smallest supported viewport and the on-screen keyboard.
- Confirm that sticky and fixed content does not obscure controls or focus.
- Test browser pinch zoom and page scrolling from every custom gesture surface.
- Test high contrast or forced-colour settings and all supported themes.

### Interaction-state testing

- Press down on a control, move away, and release. Confirm that the action can be cancelled where required.
- Interrupt a direct-manipulation interaction with scrolling, orientation change, a system gesture, or loss of pointer capture.
- Confirm that drag alternatives produce the same result and preserve focus.
- Confirm that motion input can be disabled and its conventional alternative remains available.
- Verify that status and error messages are exposed without moving focus unnecessarily.

### Automated testing

Automation can identify some small targets, invalid names, restrictive viewport settings, duplicate event patterns, missing focus indicators, and invalid ARIA. It usually cannot determine whether:

- a gesture is essential;
- an alternative performs the same function;
- target spacing satisfies the geometric exception in every responsive state;
- a drag alternative is discoverable and equivalent;
- a control is reachable or obscured on a physical device; or
- touch screen-reader interaction is understandable.

Manual testing remains required.

Prioritize failures by actual user impact, task criticality, reach, and frequency. Do not assign a universal severity solely from the success criterion number or testing tool output.

---

## 21. Common Failures

| Failure | Correction |
|:---|:---|
| Browser zoom is disabled because the layout breaks. | Fix the responsive layout and remove viewport scaling restrictions. |
| A keyboard command is the only alternative to a pinch or path gesture. | Add controls that work with a single pointer without a path gesture. |
| Keyboard reordering is offered as the only drag alternative. | Add single-pointer Move controls that do not require dragging. |
| An action fires on `pointerdown` for responsiveness. | Complete it on `click` or `pointerup`, with cancellation or Undo. |
| Every target is claimed to require 24 by 24 CSS pixels without exception. | Apply the exact 2.5.8 size rule and its defined exceptions. |
| Vague spacing is claimed to make an undersized target conform. | Evaluate the 24 CSS-pixel circle test. |
| Every link is forced into a square target. | Leave inline prose links in normal flow and enlarge standalone controls appropriately. |
| Padding is placed on a wrapper around a small icon button. | Put the padding on the interactive element so the whole area is clickable. |
| Controls appear only on hover. | Provide persistent or focus-triggered controls and a touch-operable disclosure. |
| `pointer: coarse` is treated as a reliable touchscreen or stylus detector. | Treat media features as capabilities and keep the base experience input agnostic. |
| Essential controls are hidden unless `pointer: fine` matches. | Keep core controls available in the base layout. |
| Separate touch and mouse handlers activate the action twice. | Use the native `click` event or a unified Pointer Events implementation. |
| A custom interaction ignores `pointercancel`. | Restore the previous state and clean up capture and previews on cancellation. |
| `touch-action: none` is applied to a whole page or component. | Preserve browser panning and zooming and restrict only the necessary gesture axis. |
| Swipe, long press, pressure, or tilt is the only route to a function. | Add a named button, link, menu item, or form control. |
| A visible “Send” button is named “Submit application.” | Include “Send” in the accessible name, preferably at the start. |
| Motion input is always active. | Provide a conventional alternative and a user-controlled way to disable motion response. |
| A mobile emulator is the only touch test. | Test physical devices, hybrid inputs, and mobile screen readers. |
| Passing keyboard tests is treated as proof of pointer accessibility. | Test gestures, dragging, cancellation, target size, and touch interaction separately. |

---

## 22. Definition of Done

- [ ] The viewport allows browser and pinch zoom.
- [ ] Layout and controls remain usable at 200% text size and 400% page zoom.
- [ ] Portrait and landscape orientations work unless one orientation is essential.
- [ ] Every multipoint or path-based gesture has a single-pointer, non-path alternative unless essential.
- [ ] Every drag operation has a single-pointer, non-dragging alternative unless essential.
- [ ] Keyboard operation is implemented and tested separately.
- [ ] Ordinary actions complete on `click` or pointer up rather than pointer down.
- [ ] Destructive actions can be confirmed, cancelled, or undone as appropriate.
- [ ] Every pointer target is at least 24 by 24 CSS pixels or satisfies a documented 2.5.8 exception.
- [ ] Important and frequent controls target at least 44 by 44 CSS pixels.
- [ ] Clickable padding belongs to the interactive element.
- [ ] Core functions do not depend on hover, fine pointing, pressure, tilt, swipe, or long press.
- [ ] Pointer and hover media queries enhance an already accessible base.
- [ ] Custom interactions use Pointer Events and handle pointer cancellation.
- [ ] `touch-action` preserves page scrolling and pinch zoom outside narrowly required gestures.
- [ ] Device-motion functions have a conventional alternative and can be disabled.
- [ ] Every accessible name contains the control's visible text label.
- [ ] Icon-only controls have clear accessible names and recognizable visuals.
- [ ] Sticky, fixed, and overlay content does not obscure focused or operable controls.
- [ ] Controls remain reachable when the on-screen keyboard is open.
- [ ] Physical touch, mouse, keyboard, speech input, hybrid input, and supported touch screen readers have been tested.
- [ ] Automated findings have been followed by manual task testing.

---

## 23. WCAG 2.2 Mapping

| Success criterion | Level | Touch and pointer relevance |
|:---|:---:|:---|
| [1.3.4 Orientation](https://www.w3.org/WAI/WCAG22/Understanding/orientation.html) | AA | Content must not be restricted to one display orientation unless essential. |
| [1.4.4 Resize Text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html) | AA | Text must resize to 200% without loss of content or functionality. |
| [1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) | AA | Content must reflow at narrow equivalent widths, subject to defined exceptions. |
| [1.4.13 Content on Hover or Focus](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html) | AA | Additional hover or focus content must be dismissible, hoverable, and persistent where applicable. |
| [2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html) | A | Pointer functions also need keyboard operation unless the function depends on movement path. |
| [2.1.2 No Keyboard Trap](https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html) | A | Custom pointer components must not trap keyboard focus. |
| [2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html) | AA | Keyboard focus must remain visible. |
| [2.4.11 Focus Not Obscured (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html) | AA | Sticky and overlay content must not entirely hide focused controls. |
| [2.5.1 Pointer Gestures](https://www.w3.org/WAI/WCAG22/Understanding/pointer-gestures.html) | A | Multipoint and path-based gestures need simple single-pointer alternatives unless essential. |
| [2.5.2 Pointer Cancellation](https://www.w3.org/WAI/WCAG22/Understanding/pointer-cancellation.html) | A | Pointer actions must use an accepted cancellation, completion, reversal, or essential-down-event pattern. |
| [2.5.3 Label in Name](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html) | A | A control's accessible name must contain its visible text label. |
| [2.5.4 Motion Actuation](https://www.w3.org/WAI/WCAG22/Understanding/motion-actuation.html) | A | Device-motion functions need a user-interface alternative and a way to disable motion response. |
| [2.5.5 Target Size (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html) | AAA | Pointer targets must be at least 44 by 44 CSS pixels unless a defined exception applies. |
| [2.5.7 Dragging Movements](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html) | AA | Drag functions need a single-pointer alternative that does not require dragging unless essential. |
| [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) | AA | Targets must be at least 24 by 24 CSS pixels or satisfy a defined exception. |
| [3.2.1 On Focus](https://www.w3.org/WAI/WCAG22/Understanding/on-focus.html) | A | Receiving focus must not unexpectedly change context. |
| [3.2.2 On Input](https://www.w3.org/WAI/WCAG22/Understanding/on-input.html) | A | Changing a value must not unexpectedly submit or navigate without prior explanation. |
| [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html) | A | Custom controls must expose accurate semantics and state. |
| [4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html) | AA | Results such as reordered items or completed actions must be programmatically available when they are status messages. |

---

## 24. Related Guides

- [Keyboard Accessibility Best Practices](./KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md)
- [Navigation Accessibility Best Practices](./NAVIGATION_ACCESSIBILITY_BEST_PRACTICES.md)
- [Forms Accessibility Best Practices](./FORMS_ACCESSIBILITY_BEST_PRACTICES.md)
- [Color Contrast Accessibility Best Practices](./COLOR_CONTRAST_ACCESSIBILITY_BEST_PRACTICES.md)
- [SVG Accessibility Best Practices](./SVG_ACCESSIBILITY_BEST_PRACTICES.md)
- [Light/Dark Mode Accessibility Best Practices](./LIGHT_DARK_MODE_ACCESSIBILITY_BEST_PRACTICES.md)

---

## References

The external references in this guide follow the repository's [trusted-source list](./TRUSTED_SOURCES.yaml). Primary standards are preferred for normative requirements; supplementary implementation references are used for developer guidance.

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Understanding 2.5.1: Pointer Gestures](https://www.w3.org/WAI/WCAG22/Understanding/pointer-gestures.html)
- [Understanding 2.5.2: Pointer Cancellation](https://www.w3.org/WAI/WCAG22/Understanding/pointer-cancellation.html)
- [Understanding 2.5.3: Label in Name](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html)
- [Understanding 2.5.4: Motion Actuation](https://www.w3.org/WAI/WCAG22/Understanding/motion-actuation.html)
- [Understanding 2.5.5: Target Size (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html)
- [Understanding 2.5.7: Dragging Movements](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html)
- [Understanding 2.5.8: Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- [Media Queries Level 4: Interaction Media Features](https://www.w3.org/TR/mediaqueries-4/#mf-interaction)
- [Pointer Events Level 3](https://www.w3.org/TR/pointerevents3/)
- [Pointer Events: `touch-action`](https://www.w3.org/TR/pointerevents3/#the-touch-action-css-property)
- [MDN: Pointer events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events)
- [MDN: `touch-action`](https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action)

### Machine-readable standards

For AI systems and automated tooling, see [wai-yaml-ld](https://github.com/mgifford/wai-yaml-ld):

- [WCAG 2.2 normative content in YAML](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wcag-2.2-normative.yaml)
- [ARIA informative catalog in YAML](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wai-aria-informative.yaml)
- [HTML accessibility content in YAML](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/html-living-standard-accessibility.yaml)
- [Standards link graph in YAML](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/standards-link-graph.yaml)

---

AGPL-3.0-or-later License - See LICENSE file for full text  
Copyright (c) 2026 Mike Gifford
