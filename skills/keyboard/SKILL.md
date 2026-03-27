# Keyboard Accessibility Skill

> **Canonical source**: `examples/KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md`
> This skill is derived from that file. When in doubt, the example is authoritative.

Apply these rules to every interactive UI element and feature.

---

## Core Mandate

All interactive functionality must be fully usable with a keyboard alone — no mouse or touch required.

---

## Required: Focus Visibility

- Every focusable element must show a clear, persistent visible focus indicator
- Never remove `outline` unless replacing with an equally visible style
- Minimum 3:1 contrast against adjacent colors; at least 2px thick

```css
:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 2px;
}
/* Never: :focus { outline: none; } without a replacement */
```

---

## Required: Focus Order

- Follow logical reading/interaction sequence using semantic DOM order
- Avoid positive `tabindex` values (never use `tabindex="2"`, etc.)
- Use `tabindex="0"` only to make custom elements focusable
- Use `tabindex="-1"` only for programmatic focus (e.g., skip link targets, modal focus management)

---

## Required: Use Native Elements

Always prefer native HTML over custom implementations:
```html
<!-- Good -->
<button type="button">Save</button>
<a href="/about">About</a>

<!-- Requires extensive ARIA + JS to match: -->
<div role="button" tabindex="0">Save</div>
```

---

## Required: Expected Key Behaviors

| Control | Required keys |
|---|---|
| Button | `Enter`, `Space` |
| Link | `Enter` |
| Checkbox | `Space` |
| Radio group | Arrow keys to move, `Space` to select |
| Select/listbox | Arrow keys, `Enter` |
| Menu/menubar | Arrow keys, `Enter`, `Escape` |
| Tab widget | Arrow keys between tabs, `Enter`/`Space` to activate |
| Dialog | `Escape` to close, focus trapped inside |

---

## Required: Dialog Focus Management

```javascript
function openDialog(dialog, trigger) {
  dialog.removeAttribute('hidden');
  // Move focus to first focusable element
  dialog.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])').focus();
}

function closeDialog(dialog, trigger) {
  dialog.setAttribute('hidden', '');
  trigger.focus(); // Restore focus to trigger
}

// Trap focus inside open dialog
dialog.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeDialog(dialog, trigger);
  if (e.key === 'Tab') { /* cycle within focusable elements */ }
});
```

---

## Required: Skip Link & Landmarks

```html
<!-- First element in <body> -->
<a class="skip-link" href="#main">Skip to main content</a>

<!-- Landmark regions -->
<header role="banner">...</header>
<nav aria-label="Main">...</nav>
<main id="main">...</main>
<aside>...</aside>
<footer>...</footer>
```

---

## Required: Hidden & Offscreen Content

- Elements with `display:none` or `visibility:hidden` must not be in the tab order
- `aria-hidden="true"` on offscreen content when it must remain in DOM
- Modals/drawers: remove from tab order when closed

---

## Definition of Done Checklist

- [ ] Tab through entire page; logical order, no skips
- [ ] Visible focus indicator on every focusable element
- [ ] All interactive elements activatable with correct keys
- [ ] No keyboard trap exists (except intentional modal trap)
- [ ] Dialog open/close focus management correct
- [ ] Skip link present and functional
- [ ] Hidden content not in tab order

---

## Key WCAG Criteria

- 2.1.1 Keyboard (A)
- 2.1.2 No Keyboard Trap (A)
- 2.4.1 Bypass Blocks (A)
- 2.4.3 Focus Order (A)
- 2.4.7 Focus Visible (AA)
- 2.4.11 Focus Appearance (AA, WCAG 2.2)

---

## References

- [Full best practices guide](../../examples/KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md)
- [Curated reference sources](references/references.md)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
