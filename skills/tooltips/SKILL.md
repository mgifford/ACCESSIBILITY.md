# Tooltips Accessibility Skill

> **Canonical source**: `examples/TOOLTIP_ACCESSIBILITY_BEST_PRACTICES.md`
> This skill is derived from that file. When in doubt, the example is authoritative.

Apply these rules when implementing or reviewing tooltip components.

---

## Core Mandate

Tooltips must convey supplementary information to all users regardless of input method. A tooltip unreachable by keyboard is an accessibility barrier.

Tooltips are non-interactive supplementary labels only. If the content is essential, or contains links/buttons, use persistent text or a popover instead.

---

## Required: ARIA Pattern

```html
<button type="button" aria-describedby="save-tooltip">Save</button>
<div id="save-tooltip" role="tooltip" hidden>
  Save changes to your draft
</div>
```

Rules:
- Tooltip element must have `role="tooltip"`
- Trigger must reference tooltip via `aria-describedby`
- Use `hidden` to conceal; never `aria-hidden="true"` on an active tooltip
- Each tooltip must have a unique `id`
- Do not put `role="tooltip"` on the trigger

For icon-only triggers, add `aria-label` for the accessible name:
```html
<button type="button" aria-label="Delete item" aria-describedby="delete-tip">
  <!-- SVG icon -->
</button>
<div id="delete-tip" role="tooltip" hidden>
  Permanently removes this item from your account
</div>
```

---

## Required: Trigger Behavior

Tooltips must appear on **both hover and keyboard focus**:

```javascript
function showTooltip() { tooltip.removeAttribute('hidden'); }
function hideTooltip() { tooltip.setAttribute('hidden', ''); }

trigger.addEventListener('mouseenter', showTooltip);
trigger.addEventListener('mouseleave', hideTooltip);
trigger.addEventListener('focusin', showTooltip);
trigger.addEventListener('focusout', hideTooltip);

// Escape dismisses without moving focus
trigger.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') hideTooltip();
});
```

---

## Required: WCAG 1.4.13 — Content on Hover or Focus

| Requirement | Description |
|---|---|
| **Dismissible** | `Escape` dismisses without moving pointer/focus |
| **Hoverable** | User can move pointer over tooltip without it disappearing |
| **Persistent** | Stays visible until trigger loses focus/hover |

---

## Required: Keyboard Interaction

| Key | Behavior |
|---|---|
| `Tab` / `Shift+Tab` | Focus moves to/from trigger; tooltip shows/hides |
| `Escape` | Dismisses tooltip; focus stays on trigger |

Tooltips must NOT be focusable themselves (no `tabindex` on tooltip container).

---

## Required: Visual Design

- Tooltip text: 4.5:1 contrast against tooltip background
- Tooltip background: 3:1 contrast against adjacent surfaces
- Respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: no-preference) {
  [role="tooltip"] { transition: opacity 0.15s ease; }
}
```

---

## Required: Mobile / Touch

Hover tooltips don't work on touch screens. Use toggletip pattern:

```html
<button type="button" aria-expanded="false" aria-controls="info-tip"
        aria-label="More information about password requirements">
  <span aria-hidden="true">ⓘ</span>
</button>
<div id="info-tip" hidden>
  Your password must be at least 12 characters and include a number.
</div>
```

Toggle `aria-expanded` and `hidden` together on click.

---

## When NOT to Use a Tooltip

- Label of control is self-explanatory
- Information must be readable at all times
- Touch-only interface (use toggletip or persistent help text instead)
- Content is long enough for a popover
- Content contains interactive elements (links, buttons)

---

## Definition of Done Checklist

- [ ] `role="tooltip"` on tooltip element
- [ ] Trigger has `aria-describedby` pointing to tooltip
- [ ] Tooltip shows on both hover and keyboard focus
- [ ] `Escape` dismisses without moving focus
- [ ] Tooltip cannot be hovered away accidentally (hoverable)
- [ ] Tooltip not focusable itself
- [ ] Text contrast 4.5:1; background 3:1 against surface
- [ ] Touch/mobile has toggletip fallback
- [ ] `prefers-reduced-motion` respected for animations

---

## Key WCAG Criteria

- 1.4.3 Contrast Minimum (AA)
- 1.4.13 Content on Hover or Focus (AA)
- 2.1.1 Keyboard (A)
- 4.1.2 Name, Role, Value (A)

---

## References

- [Full best practices guide](../../examples/TOOLTIP_ACCESSIBILITY_BEST_PRACTICES.md)
- [Curated reference sources](references/references.md)
- [WCAG 1.4.13](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html)
