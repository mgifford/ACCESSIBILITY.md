# Light/Dark Mode Accessibility Skill

> **Canonical source**: `examples/LIGHT_DARK_MODE_ACCESSIBILITY_BEST_PRACTICES.md`  
> This skill is derived from that file. When in doubt, the example is authoritative.

AI agents should apply these rules whenever implementing or reviewing color theme support in HTML, CSS, or JavaScript.

---

## Core Mandate

All color themes **must** meet WCAG 2.2 Level AA contrast in **both** light and dark modes, including forced-colors/high contrast modes. Test all three — not just the default.

---

## Required: CSS Custom Properties Pattern

Always use CSS custom properties for theme tokens. Never hardcode color values in component styles.

```css
:root {
  --color-text:       #1a1a1a;
  --color-background: #ffffff;
  --color-link:       #0066cc;
  --color-focus:      #004499;
  --color-border:     #cccccc;
  --color-hover:      #f5f5f5;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-text:       #e8e8e8;
    --color-background: #1a1a1a;
    --color-link:       #66aaff;
    --color-focus:      #99ccff;
    --color-border:     #444444;
    --color-hover:      #2a2a2a;
  }
}

[data-theme="light"] { /* mirror :root light values */ }
[data-theme="dark"]  { /* mirror prefers-color-scheme dark values */ }
```

---

## Required: Contrast Ratios

Check ALL of the following in BOTH light and dark modes:

| Element | Minimum ratio |
|---|---|
| Normal text | 4.5:1 |
| Large text (18pt+ / 14pt+ bold) | 3:1 |
| UI components & graphical objects | 3:1 |
| Focus indicators | 3:1 against adjacent colors |

---

## Required: Manual Theme Toggle

If providing a theme toggle button:

- Default to `prefers-color-scheme`; fall back to `light`
- Persist user choice in `localStorage`
- `aria-label` must describe the **action** ("Switch to dark mode"), not the current state
- Use sun icon in dark mode, moon icon in light mode
- Place toggle **after** nav items in DOM order (tab order)
- Do not make toggle fixed/sticky

**Minimal accessible toggle button:**

```html
<button id="theme-toggle" aria-label="Switch to dark mode">
  <svg aria-hidden="true" class="sun-icon" viewBox="0 0 24 24" width="20" height="20">
    <circle cx="12" cy="12" r="5" fill="currentColor"/>
    <path fill="currentColor" d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
  </svg>
  <svg aria-hidden="true" class="moon-icon" viewBox="0 0 24 24" width="20" height="20">
    <path fill="currentColor" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
  </svg>
</button>
```

**Minimal JS:**

```javascript
const toggle = document.getElementById('theme-toggle');
const mq = window.matchMedia('(prefers-color-scheme: dark)');
let saved = localStorage.getItem('theme');
let userOverride = !!saved;
let current = saved || (mq.matches ? 'dark' : 'light');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
}

toggle.addEventListener('click', () => {
  current = current === 'light' ? 'dark' : 'light';
  userOverride = true;
  localStorage.setItem('theme', current);
  applyTheme(current);
});

mq.addEventListener('change', e => {
  if (!userOverride) { current = e.matches ? 'dark' : 'light'; applyTheme(current); }
});

applyTheme(current);
```

---

## Required: Forced-Colors / High Contrast Mode

```css
@media (forced-colors: active) {
  .card { border: 1px solid CanvasText; }
  button { color: ButtonText; background-color: ButtonFace; }
  :focus-visible { outline: 2px solid Highlight; }
  tbody tr { border-bottom: 1px solid CanvasText; } /* table rows lose stripes */
}
```

Use semantic system color keywords: `Canvas`, `CanvasText`, `LinkText`, `ButtonFace`, `ButtonText`, `Highlight`, `HighlightText`.

---

## Required: Color Independence

Never convey information by color alone. Every status indicator needs icon + text + color:

```html
<!-- Good -->
<div class="status status-error">
  <svg role="img" aria-label="Error"><use href="#icon-warning"/></svg>
  <span>Error</span>
</div>

<!-- Bad -->
<div class="status-error">Item failed</div>
```

---

## Required: SVG Icons

Use `currentColor` so icons inherit theme color:

```html
<svg viewBox="0 0 24 24" class="icon">
  <path fill="currentColor" d="..."/>
</svg>
```

For images with transparency that need to work across modes:

```html
<picture>
  <source srcset="logo-dark.svg" media="(prefers-color-scheme: dark)">
  <img src="logo-light.svg" alt="Company logo">
</picture>
```

---

## Required: Focus Indicators

```css
:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}
```

- Minimum 3:1 contrast against adjacent colors
- At least 2px thick
- Must be visible in BOTH light and dark modes
- Never remove focus indicators in dark mode

---

## Required: Motion

```css
* { transition: background-color 0.2s ease, color 0.2s ease; }

@media (prefers-reduced-motion: reduce) {
  * { transition: none; }
}
```

Never auto-animate theme changes based on time of day.

---

## Required: Data Table Zebra Stripes

Define stripe colors **relative to the page background**, not as absolute values. A 5–10% luminance step from the background is the correct range.

```css
:root {
  --color-background:      #ffffff;
  --color-table-row-even:  #f2f2f2; /* ~5% darker  */
  --color-table-row-odd:   #e5e5e5; /* ~10% darker */
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-background:      #1a1a1a;
    --color-table-row-even:  #272727; /* ~5% lighter  */
    --color-table-row-odd:   #343434; /* ~10% lighter */
  }
}

tbody tr:nth-child(even) { background-color: var(--color-table-row-even); }
tbody tr:nth-child(odd)  { background-color: var(--color-table-row-odd);  }
```

Or use `color-mix()` for automatic relative computation:

```css
--color-table-row-even: color-mix(in srgb, var(--color-background) 95%, black);
--color-table-row-odd:  color-mix(in srgb, var(--color-background) 90%, black);
```

---

## Definition of Done Checklist

Before marking color mode work complete, verify:

- [ ] All text/UI elements meet WCAG 2.2 AA contrast in light mode
- [ ] All text/UI elements meet WCAG 2.2 AA contrast in dark mode
- [ ] `prefers-color-scheme` detected and respected by default
- [ ] Forced-colors mode: content remains comprehensible
- [ ] Information is not conveyed by color alone
- [ ] Focus indicators visible and meeting 3:1 in all modes
- [ ] User preference persists in `localStorage` (if toggle present)
- [ ] `prefers-reduced-motion` respected for theme transitions
- [ ] Zebra stripes use relative (5–10%) differences, not absolute colors
- [ ] SVGs use `currentColor`

---

## Key WCAG Criteria

- 1.4.1 Use of Color (A)
- 1.4.3 Contrast Minimum (AA)
- 1.4.11 Non-text Contrast (AA)
- 2.4.11 Focus Appearance (AA, WCAG 2.2)
- 1.4.12 Text Spacing (AA)

---

## References

- [Full best practices guide](../../examples/LIGHT_DARK_MODE_ACCESSIBILITY_BEST_PRACTICES.md)
- [Curated reference sources](references/references.md)
- [WCAG 2.2 Understanding 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- [CSS prefers-color-scheme](https://www.w3.org/TR/mediaqueries-5/#prefers-color-scheme)
- [CSS forced-colors](https://www.w3.org/TR/mediaqueries-5/#forced-colors)
- [CSS System Colors](https://www.w3.org/TR/css-color-4/#css-system-colors)
