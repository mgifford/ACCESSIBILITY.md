# SVG Accessibility Skill

> **Canonical source**: `examples/SVG_ACCESSIBILITY_BEST_PRACTICES.md`
> This skill is derived from that file. When in doubt, the example is authoritative.

Apply these rules when creating, optimizing, or reviewing SVG graphics.

---

## Core Mandate

Outcome-based, not checklist-driven. Measure against real usage context: is the SVG perceivable, operable, and compatible with assistive technologies?

---

## Required: Meaningful SVGs — Accessible Name & Description

Use when the SVG conveys information not redundant with adjacent text, or functions as a control.

**Preferred — `<title>` + `<desc>` with `aria-labelledby`:**
```html
<svg role="img" aria-labelledby="svgTitle svgDesc">
  <title id="svgTitle">No DRM</title>
  <desc id="svgDesc">An emblem indicating content without digital rights management.</desc>
</svg>
```

**Acceptable for single label:**
```html
<svg role="img" aria-label="Download icon">
```

---

## Required: Decorative SVGs — Hide from AT

```html
<svg aria-hidden="true" focusable="false">
  <!-- decorative icon -->
</svg>
```

Never use `role="presentation"` on SVGs that convey meaning.

---

## Required: Preserve Critical IDs

Never remove or rename IDs referenced by:
- `aria-labelledby`, `aria-describedby`
- `<use href="#...">` 
- `clip-path="url(#...)"`, `mask="url(#...)"`, `filter="url(#...)"`

---

## Required: currentColor for Theme Compatibility

```html
<svg viewBox="0 0 24 24" class="icon">
  <path fill="currentColor" d="..."/>
</svg>
```

---

## Required: Forced-Colors Support

Only when the SVG would lose meaning without it:
```css
@media (forced-colors: active) {
  .icon { stroke: CanvasText; fill: CanvasText; }
  .accent { stroke: Highlight; fill: Highlight; }
}
```

---

## Required: Non-text Contrast

Meaningful graphical elements (not decorative): minimum 3:1 contrast against adjacent colors.

---

## Required: Preserve viewBox

Do not remove `viewBox` during optimization — it is required for responsive scaling.

---

## Do NOT Remove During Optimization

- `viewBox`
- `<title>` when contributing to accessible name
- `<desc>` when contributing to accessible description
- IDs referenced by accessibility attributes or URL references
- Internal `<style>` implementing interaction states, reduced-motion, or forced-colors

---

## What Is NOT Required (Avoid False Positives)

- A `<desc>` for every SVG (name alone may be sufficient)
- A `<title>` when `aria-label` is sufficient
- Focus styling inside non-interactive SVGs
- A forced-colors block when SVG remains perceivable without it
- `role="img"` on decorative SVGs (hide them instead)

---

## Interactive SVGs Only

If the SVG itself is interactive:
- Make it focusable (prefer `<button>`/`<a>` wrapper over raw SVG `tabindex`)
- Provide visible focus indication
- Handle keyboard activation

---

## Definition of Done Checklist

- [ ] Meaningful SVGs have accessible name (`aria-label` or `<title>` + `aria-labelledby`)
- [ ] Decorative SVGs have `aria-hidden="true" focusable="false"`
- [ ] All referenced IDs preserved
- [ ] `currentColor` used for theme-aware fills/strokes
- [ ] `viewBox` present
- [ ] Non-text elements meet 3:1 contrast
- [ ] Tested with screen reader

---

## Key WCAG Criteria

- 1.1.1 Non-text Content (A)
- 1.4.11 Non-text Contrast (AA)
- 4.1.2 Name, Role, Value (A)

---

## References

- [Full best practices guide](../../examples/SVG_ACCESSIBILITY_BEST_PRACTICES.md)
- [Curated reference sources](references/references.md)
- [Accessible SVG flowcharts (Léonie Watson)](https://tink.uk/accessible-svg-flowcharts/)
