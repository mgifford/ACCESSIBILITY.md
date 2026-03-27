# User Personalization Accessibility Skill

> **Canonical source**: `examples/USER_PERSONALIZATION_ACCESSIBILITY_BEST_PRACTICES.md`
> This skill is derived from that file. When in doubt, the example is authoritative.

Apply these rules when implementing user preference controls or reviewing existing personalization features.

---

## Core Mandate

Users should be able to customize content presentation to meet their individual needs without compromising information, functionality, or accessibility. Personalization must complement — never replace — proper accessible design.

---

## Required: Never Use Accessibility Overlays as a Compliance Substitute

Third-party "accessibility overlay" widgets that claim to auto-fix accessibility issues must NOT be used as a substitute for proper accessible design. They:
- Cannot fix underlying structural issues
- Often create new barriers for AT users
- Provide false compliance assurance
- May interfere with users' own assistive technologies

The only acceptable use case for overlay-like technology is **custom remediation for legacy vendor-locked systems** as a temporary bridge, with active work toward proper implementation.

---

## Required: Implement CSS Media Queries First

Respect user preferences at the browser/OS level before adding any custom controls:

```css
/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --color-text: #e8e8e8;
    --color-background: #1a1a1a;
  }
}

/* High contrast */
@media (prefers-contrast: more) {
  :root {
    --color-text: #000000;
    --color-background: #ffffff;
    --border-width: 2px;
  }
}

/* Windows High Contrast / forced colors */
@media (forced-colors: active) {
  .custom-focus-indicator {
    forced-color-adjust: none;
    outline: 2px solid CanvasText;
  }
}

/* Reduced transparency */
@media (prefers-reduced-transparency: reduce) {
  .modal-overlay {
    opacity: 1;
    background-color: var(--color-background);
  }
}
```

---

## Required: Personalization Widgets — The Right Approach

Personalization widgets (font size, spacing, theme) are acceptable when:
- They offer user preferences, not claimed accessibility fixes
- They do not override the user's own AT settings
- Preferences are persisted in `localStorage`
- They are clearly labeled as preference controls, not "accessibility" fixes

### Font Size Controls
```html
<div role="group" aria-label="Text size">
  <button aria-label="Decrease text size" onclick="adjustFontSize(-1)">A−</button>
  <button aria-label="Reset text size" onclick="resetFontSize()">A</button>
  <button aria-label="Increase text size" onclick="adjustFontSize(1)">A+</button>
</div>
```
```javascript
function adjustFontSize(delta) {
  const current = parseFloat(getComputedStyle(document.documentElement).fontSize);
  document.documentElement.style.fontSize = `${current + delta}px`;
  localStorage.setItem('font-size', document.documentElement.style.fontSize);
}
```

### Spacing Controls
```javascript
const spacingOptions = { normal: '1', wide: '1.5', wider: '2' };
function setSpacing(level) {
  document.documentElement.style.setProperty('--line-height', spacingOptions[level]);
  localStorage.setItem('spacing', level);
}
```

### Restore Preferences on Load
```javascript
window.addEventListener('DOMContentLoaded', () => {
  const fontSize = localStorage.getItem('font-size');
  const spacing = localStorage.getItem('spacing');
  if (fontSize) document.documentElement.style.fontSize = fontSize;
  if (spacing) setSpacing(spacing);
});
```

---

## Required: Announce State Changes

When personalization controls change the page, announce the change:
```html
<div aria-live="polite" aria-atomic="true" class="visually-hidden" id="pref-announcement">
  <!-- JS inserts e.g. "Text size increased to large" -->
</div>
```

---

## Definition of Done Checklist

- [ ] No third-party accessibility overlay used as compliance substitute
- [ ] All CSS media queries implemented: `prefers-reduced-motion`, `prefers-color-scheme`, `prefers-contrast`, `forced-colors`
- [ ] Any personalization widget clearly labeled as preferences, not "accessibility fixes"
- [ ] User preferences persisted in `localStorage`
- [ ] Preferences restored on page load
- [ ] State changes announced to screen readers via live region
- [ ] Personalization controls are themselves keyboard accessible
- [ ] Personalization does not override user's own AT settings

---

## Key WCAG Criteria

- 1.4.3 Contrast Minimum (AA)
- 1.4.4 Resize Text (AA)
- 1.4.12 Text Spacing (AA)
- 2.3.3 Animation from Interactions (AAA)

---

## References

- [Full best practices guide](../../examples/USER_PERSONALIZATION_ACCESSIBILITY_BEST_PRACTICES.md)
- [Curated reference sources](references/references.md)
- [Overlay Fact Sheet](https://overlayfactsheet.com/en/)
