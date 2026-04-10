---
title: Keyboard Accessibility Best Practices
---

# Keyboard Accessibility Best Practices

This document defines project-level expectations for keyboard operability.

## Core Principle

All interactive functionality must be fully usable with a keyboard alone —
no mouse or touch required.

---

## Severity Scale

| Level | Meaning |
| --- | --- |
| **Critical** | Blocks task completion entirely for keyboard and AT users |
| **Serious** | Significantly impairs keyboard access; workaround unreasonable |
| **Moderate** | Creates friction for keyboard users; workaround exists |
| **Minor** | Best-practice gap; marginal keyboard impact |

---

## Critical: No Keyboard Trap

Users must never become unable to move focus away from a component using
standard keys (Tab, Shift+Tab, Escape, arrow keys).
The only permitted exception is an intentional modal dialog trap where Escape
closes the dialog and returns focus to the trigger.

**A keyboard trap with no exit is Critical** — it locks keyboard users and
switch-access users into a dead end with no recovery path.

---

## Critical: All Interactive Elements Must Be Keyboard Reachable

Every element that can be activated by mouse must be reachable and activatable
by keyboard. **Use native elements** — they have keyboard support, focus
management, and ARIA semantics built in at zero extra cost:

```html
<!-- Good: built-in keyboard support -->
<button type="button">Save</button>
<a href="/about">About</a>

<!-- Avoid: requires full ARIA + JS to match native behaviour -->
<div role="button" tabindex="0">Save</div>
```

Never attach `click` handlers to non-interactive elements (`<div>`, `<span>`,
`<p>`) without also adding the correct `role`, `tabindex="0"`, and keyboard
event handlers for both `Enter` and `Space`.

---

## Critical: Expected Key Behaviours

Follow the [WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/) for each widget
type. Deviating from expected widget key behaviour breaks the mental model that
assistive technology users depend on.

| Control | Required keys |
| --- | --- |
| Button | `Enter`, `Space` |
| Link | `Enter` |
| Checkbox | `Space` to toggle |
| Radio group | Arrow keys to move between options; `Space` to select |
| Select / listbox | Arrow keys to navigate; `Enter` to confirm |
| Menu / menubar | Arrow keys; `Enter` to activate item; `Escape` to close |
| Tab widget | Arrow keys between tabs; `Enter`/`Space` to activate tab |
| Dialog | `Escape` to close; focus trapped inside while open |
| Combobox | Arrow keys in list; `Enter` to select; `Escape` to collapse |
| Tree view | Arrow keys to expand/collapse/navigate nodes |
| Slider | Arrow keys to change value; `Home`/`End` for min/max |

---

## Critical: Dialog Focus Management

Incorrect dialog focus management is **Critical** — keyboard and screen reader
users lose their place, or cannot reach dialog controls at all.

### Preferred approach: `inert` attribute

The `inert` attribute prevents all interaction (focus, click, AT) with elements
outside the open dialog. It is simpler and more reliable than manual focusable-element
cycling and has good browser support (baseline 2023).

```js
function openDialog(dialog, trigger) {
  // Make everything outside the dialog inert
  document.querySelectorAll('body > *:not(#dialog-container)')
    .forEach(el => el.setAttribute('inert', ''));

  dialog.removeAttribute('hidden');

  // Move focus to first focusable element inside dialog
  const focusableSelectors = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';
  const first = dialog.querySelector(focusableSelectors);
  first?.focus();
}

function closeDialog(dialog, trigger) {
  // Remove inert from background content
  document.querySelectorAll('[inert]')
    .forEach(el => el.removeAttribute('inert'));

  dialog.setAttribute('hidden', '');
  trigger.focus(); // Return focus to the element that opened the dialog
}

dialog.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeDialog(dialog, trigger);
});
```

### Manual focus trap (fallback)

For environments that do not support `inert`, use the
[`focus-trap` library](https://github.com/focus-trap/focus-trap) — prefer it
over hand-rolling this logic:

```js
import { createFocusTrap } from 'focus-trap';

let trap;

function openDialog(dialog, trigger) {
  dialog.removeAttribute('hidden');
  trap = createFocusTrap(dialog, {
    escapeDeactivates: true,
    onDeactivate: () => closeDialog(dialog, trigger)
  });
  trap.activate();
}

function closeDialog(dialog, trigger) {
  trap?.deactivate();
  dialog.setAttribute('hidden', '');
  trigger.focus();
}
```

---

## Serious: Focus Visibility

Every focusable element must have a clear, persistent visible focus indicator.
**Removing focus outlines without an equally visible replacement is Serious.**

```css
:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 2px;
}
/* Never: :focus { outline: none; } without a visible replacement */
```

WCAG 2.4.11 minimum requirements:

- At least 2 px thick.
- Minimum 3:1 contrast ratio against adjacent colours.
- Must be visible in both light and dark modes.

---

## Serious: Focus Not Obscured (WCAG 2.4.12)

Sticky headers, cookie banners, floating toolbars, and chat widgets can cover
the focused element. **A focused element fully hidden behind a sticky overlay
is Serious.**

```css
/* Add scroll-margin to all focusable elements to clear sticky headers */
:focus {
  scroll-margin-top: var(--sticky-header-height, 4rem);
  scroll-margin-bottom: var(--sticky-footer-height, 0);
}
```

---

## Serious: Focus Order

Tab order must follow a logical reading and interaction sequence.

- Use semantic DOM order as the primary mechanism.
- Never use positive `tabindex` values (`tabindex="2"`, etc.) — they override
  DOM order globally and create unpredictable sequences.
- `tabindex="0"` — use only to make custom widgets focusable.
- `tabindex="-1"` — use only for programmatic focus targets (skip link anchors,
  modal focus management, scroll-into-view targets).
- If visual order differs from DOM order (e.g., CSS grid/flex reordering),
  fix the DOM order — do not use `tabindex` to compensate.

---

## Serious: Roving Tabindex for Composite Widgets

Composite widgets (toolbars, radio groups, tree views, tab lists, menubars) must
use the **roving tabindex** pattern so only one item in the group is in the tab
stop at a time, and arrow keys move within the group.

```html
<div role="toolbar" aria-label="Text formatting">
  <button tabindex="0"  aria-pressed="false">Bold</button>
  <button tabindex="-1" aria-pressed="false">Italic</button>
  <button tabindex="-1" aria-pressed="false">Underline</button>
</div>
```

```js
const toolbar = document.querySelector('[role="toolbar"]');
const items   = Array.from(toolbar.querySelectorAll('button'));

toolbar.addEventListener('keydown', (e) => {
  const index = items.indexOf(document.activeElement);
  let next = -1;

  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    next = (index + 1) % items.length;
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    next = (index - 1 + items.length) % items.length;
  } else if (e.key === 'Home') {
    next = 0;
  } else if (e.key === 'End') {
    next = items.length - 1;
  }

  if (next !== -1) {
    e.preventDefault();
    items.forEach(btn => btn.setAttribute('tabindex', '-1'));
    items[next].setAttribute('tabindex', '0');
    items[next].focus();
  }
});
```

---

## Moderate: Skip Link and Landmarks

- Provide a visible-on-focus skip link as the first element in `<body>`.
- Use landmark regions (`header`, `nav`, `main`, `aside`, `footer`) appropriately.

```html
<!-- First element in <body> — must be visible on focus -->
<a class="skip-link" href="#main">Skip to main content</a>

<header role="banner">…</header>
<nav aria-label="Main">…</nav>
<main id="main" tabindex="-1">…</main>
<aside>…</aside>
<footer>…</footer>
```

```css
.skip-link {
  position: absolute;
  top: -100%;
  left: 1rem;
  padding: 0.5rem 1rem;
  background: #000;
  color: #fff;
  font-weight: bold;
  text-decoration: none;
  z-index: 9999;
}
.skip-link:focus { top: 1rem; }
```

The skip link must be **visible on focus** — a skip link hidden permanently
(e.g., `display: none`) is a Serious issue as it breaks WCAG 2.4.1.

---

## Moderate: Hidden and Offscreen Content

- Elements with `display:none` or `visibility:hidden` are correctly excluded from tab order.
- Use `aria-hidden="true"` on offscreen content that must remain in the DOM but is not currently available to users.
- Modals and drawers: apply `inert` (or `aria-hidden`) to background content when the overlay is open; remove it when closed.

---

## Testing Expectations

Minimum manual checks for each UI change:

- Tab from page start to end and verify logical order.
- Verify visible focus on each focusable element.
- Verify activation keys for all interactive controls.
- Verify no keyboard trap exists.
- Verify dialog open/close focus management.

---

## Definition of Done Checklist

- [ ] Tab through entire page: logical order, no unexpected skips.
- [ ] Visible focus indicator on every focusable element (both light and dark modes).
- [ ] All interactive elements activatable with correct keys per widget type table.
- [ ] No keyboard trap (except intentional modal trap with working Escape).
- [ ] Dialog open: background content made `inert`; first focusable element receives focus.
- [ ] Dialog close: `inert` removed; focus returns to trigger.
- [ ] Skip link present, first in DOM, visible on focus.
- [ ] Skip link target has `tabindex="-1"` for programmatic focus.
- [ ] Sticky header/footer: `scroll-margin` prevents focused elements being hidden.
- [ ] Hidden content not in tab order.
- [ ] Composite widgets use roving tabindex; arrow keys navigate within group.
- [ ] Touch targets meet 24×24 px minimum (44×44 recommended).
- [ ] `user-scalable=no` not used.

---

## Key WCAG Criteria

- 2.1.1 Keyboard (A) — **Critical if violated**
- 2.1.2 No Keyboard Trap (A) — **Critical if violated**
- 2.4.1 Bypass Blocks (A)
- 2.4.3 Focus Order (A)
- 2.4.7 Focus Visible (AA)
- 2.4.11 Focus Appearance (AA, WCAG 2.2)
- 2.4.12 Focus Not Obscured (AA, WCAG 2.2)

---

## References

- [WAI-ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/) — versioned independently of WCAG; always check current version
- [APG: Roving tabindex practice](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex)
- [WCAG 2.2 Understanding 2.4.11 Focus Appearance](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html)
- [WCAG 2.2 Understanding 2.4.12 Focus Not Obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum)
- [WCAG 2.2 Understanding 2.5.8 Target Size Minimum](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- [MDN: The `inert` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/inert)
- [`focus-trap` library](https://github.com/focus-trap/focus-trap) — production-ready manual focus trap

### Machine-Readable Standards

For AI systems and automated tooling, see [wai-yaml-ld](https://github.com/mgifford/wai-yaml-ld) for structured accessibility standards:

- [WCAG 2.2 (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wcag-2.2-normative.yaml) - Machine-readable WCAG 2.2 normative content including keyboard-related success criteria
- [ARIA Informative (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wai-aria-informative.yaml) - ARIA keyboard interaction patterns and roles
- [HTML Living Standard Accessibility (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/html-living-standard-accessibility.yaml) - HTML element keyboard behavior
- [Standards Link Graph (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/standards-link-graph.yaml) - Relationships across WCAG/ARIA/HTML keyboard standards
