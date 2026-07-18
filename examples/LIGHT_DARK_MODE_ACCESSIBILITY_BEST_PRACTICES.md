---
title: Light/Dark Mode Accessibility Best Practices
---

# Light/Dark Mode Accessibility Best Practices

This document defines accessibility requirements for implementing light and dark color themes that respect user preferences and ensure WCAG 2.2 Level AA compliance.

User preference matters. This guidance ensures accessible experiences in both light and dark modes, including support for forced-colors modes and high contrast preferences.

---

## 1. Core Principle

All users must be able to perceive and interact with content in their preferred color mode without losing information, functionality, or accessible contrast. Color themes must meet WCAG contrast requirements in all supported modes.

---

## 2. Dual Contrast Validation

Color contrast must meet WCAG 2.2 Level AA requirements in **both** light and dark modes:

- **Text contrast**: 4.5:1 for normal text, 3:1 for large text (18pt+/14pt+ bold)
- **Non-text contrast**: 3:1 for UI components and graphical objects
- **Focus indicators**: 3:1 against adjacent colors

### Required checks

- Test contrast in light mode
- Test contrast in dark mode
- Test contrast in forced-colors/high contrast modes
- Verify focus indicators remain visible in all modes

Avoid:

- Assuming one mode is "default" and neglecting the other
- Using the same absolute colors in both modes without testing
- Relying on transparency alone to achieve acceptable contrast

---

## 3. Modern CSS Color System Best Practices (2026)

Modern color systems should start with the browser, not with duplicated theme branches. Declare `color-scheme` on the root element, prefer `light-dark()` for token values, and keep `prefers-color-scheme` for targeted fallback and asset-selection cases.

### Summary

1. Use `color-scheme` so the browser can match native UI to your theme support.
2. Prefer `light-dark()` for theme tokens instead of duplicating values across media queries.
3. Use `contrast-color()` for adaptive components that need a safe foreground choice.
4. Keep `prefers-color-scheme` for specialized cases such as images, SVGs, JavaScript initialization, and legacy support.
5. Test with real users and accessibility tools before treating automated color logic as sufficient.

### `color-scheme`

Modern implementations should declare:

```css
:root {
  color-scheme: light dark;
}
```

This tells the browser that the page supports both light and dark schemes, so built-in UI components, form controls, scrollbars, and other native surfaces are rendered in a matching style. It also enables `light-dark()` to resolve correctly.

### `light-dark()` as the preferred token pattern

Use `light-dark()` for theme tokens instead of duplicating the same values in separate `@media (prefers-color-scheme: dark)` blocks:

```css
:root {
  color-scheme: light dark;

  --background: light-dark(#ffffff, #1a1a1a);
  --text: light-dark(#1a1a1a, #e8e8e8);
  --link: light-dark(#005ea8, #8ecaff);
  --focus: light-dark(#004499, #99ccff);
  --border: light-dark(#cccccc, #444444);
  --hover: light-dark(#f5f5f5, #2a2a2a);
}

body {
  color: var(--text);
  background-color: var(--background);
}

a {
  color: var(--link);
}

a:focus-visible {
  outline: 2px solid var(--focus);
  outline-offset: 2px;
}
```

Advantages:

- Less duplication
- Easier maintenance
- Better token management
- Direct support for user color scheme preferences

### Progressive enhancement and fallback

Use safe defaults first, then layer `light-dark()` and `prefers-color-scheme` as the browser supports them:

```css
:root {
  color-scheme: light dark;

  --background: #ffffff;
  --text: #1a1a1a;
  --link: #005ea8;
  --focus: #004499;
}

@supports (color: light-dark(white, black)) {
  :root {
    --background: light-dark(#ffffff, #1a1a1a);
    --text: light-dark(#1a1a1a, #e8e8e8);
    --link: light-dark(#005ea8, #8ecaff);
    --focus: light-dark(#004499, #99ccff);
  }
}

@supports not (color: light-dark(white, black)) {
  @media (prefers-color-scheme: dark) {
    :root {
      --background: #1a1a1a;
      --text: #e8e8e8;
      --link: #8ecaff;
      --focus: #99ccff;
    }
  }
}
```

### `contrast-color()` for adaptive components

`contrast-color()` can make components self-correcting by choosing an appropriate foreground for the background that was actually used. This is useful for buttons, badges, tags, status indicators, and other dynamically themed components.

```css
.button,
.badge,
.tag,
.status-indicator,
.theme-card {
  --surface: light-dark(#005ea8, #8ecaff);

  background: var(--surface);
  color: #ffffff;
}

@supports (color: contrast-color(red)) {
  .button,
  .badge,
  .tag,
  .status-indicator,
  .theme-card {
    color: contrast-color(var(--surface));
  }
}
```

Examples of useful applications:

- Buttons that must stay readable over user-selected accent colors
- Badges and tags that change color by category or status
- Status indicators that use theme-driven surfaces
- Components that inherit their color from data, user settings, or CMS content

Important cautions:

- `contrast-color()` is not a replacement for accessibility testing
- It currently returns black or white choices
- Mid-tone colors may still present readability challenges
- Designers must still verify WCAG contrast requirements
- Automated color selection should be treated as an enhancement, not a guarantee

### Why `prefers-color-scheme` still matters

Keep `prefers-color-scheme` for cases where it is the right tool, including:

- Image selection
- SVG variants
- JavaScript theme initialization
- Legacy browser support
- Complex theme overrides

It is still valuable, but it is no longer the only recommended technique for token authoring.

## 4. Respecting User Preferences and Legacy Support

Implement theme switching that respects system and user preferences. If you provide a manual theme toggle, use it as an optional override layered on top of CSS-driven tokens.

### Fallback token pattern for older browsers

```css
:root {
  color-scheme: light dark;

  --color-text: #1a1a1a;
  --color-background: #ffffff;
  --color-link: #0066cc;
  --color-focus: #004499;
  --color-border: #cccccc;
  --color-hover: #f5f5f5;
}

@supports not (color: light-dark(white, black)) {
  @media (prefers-color-scheme: dark) {
    :root {
      --color-text: #e8e8e8;
      --color-background: #1a1a1a;
      --color-link: #66aaff;
      --color-focus: #99ccff;
      --color-border: #444444;
      --color-hover: #2a2a2a;
    }
  }
}

body {
  color: var(--color-text);
  background-color: var(--color-background);
}

a {
  color: var(--color-link);
}

a:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}
```

### User override pattern

If providing manual theme controls:

#### Toggle control design

Use a three-option control for **System**, **Light**, and **Dark**:

- **Control model**: Use a labelled group containing three native `<button type="button">` elements with `aria-pressed` for the selected option
- **Visual affordance**: Use sun/moon/system icons as supporting visuals with visible text labels
- **Placement**: Position in the top-right corner of the header in both desktop and mobile views
- **Scroll behavior**: Do not make the toggle fixed/sticky; it should remain in normal document flow within the header
- **Keyboard navigation**: Each button is a separate Tab stop — use standard native button behaviour (Tab, Shift+Tab, Enter, Space)
- **Do NOT** use custom keyboard handlers where native button behaviour already provides the required functionality
- **Do NOT** change the theme when arrow-key focus moves — theme changes only on explicit activation (Enter, Space, click)
- **Language consideration**: This guidance assumes left-to-right (LTR) languages

#### HTML structure

```html
<header>
  <nav aria-label="Main navigation">
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
    <!-- Navigation items come first in DOM order -->
  </nav>

  <!-- Theme control comes after navigation for proper tab order -->
  <div role="group" aria-label="Colour theme" id="theme-selector">
    <button type="button" class="theme-mode-btn" aria-pressed="false" data-theme-value="system">
      <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" width="20" height="20">
        <path fill="none" stroke="currentColor" stroke-width="2" d="M3 4h18v12H3zM8 20h8"/>
      </svg>
      <span>System</span>
    </button>

    <button type="button" class="theme-mode-btn" aria-pressed="false" data-theme-value="light">
      <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" width="20" height="20">
        <circle cx="12" cy="12" r="5" fill="currentColor"/>
      </svg>
      <span>Light</span>
    </button>

    <button type="button" class="theme-mode-btn" aria-pressed="true" data-theme-value="dark">
      <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" width="20" height="20">
        <path fill="currentColor" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
      </svg>
      <span>Dark</span>
    </button>
  </div>
</header>
```

#### CSS for header layout and positioning

```css
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

nav {
  display: flex;
  gap: 1.5rem;
}

#theme-mode-group {
  margin-left: auto;
  display: inline-flex;
  gap: 0.25rem;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  padding: 0.25rem;
}

.theme-mode-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 2px solid var(--color-border);
  border-radius: 0.375rem;
  background: var(--color-surface);
  color: var(--color-text);
  font-size: 1rem;
  cursor: pointer;
}

.theme-mode-btn:hover {
  background-color: var(--color-hover);
}

/* Focus indicator — visible outline, not box-shadow */
.theme-mode-btn:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}

/* Selected state — distinct from focus */
.theme-mode-btn[aria-pressed="true"] {
  border-color: var(--color-link);
  font-weight: 600;
  background: var(--color-background);
}

.theme-mode-btn svg {
  display: block;
  width: 20px;
  height: 20px;
}

/* Mobile responsive */
@media (max-width: 768px) {
  header {
    padding: 0.75rem;
  }
  
  nav {
    gap: 1rem;
  }
}
```

#### JavaScript implementation

```javascript
const STORAGE_KEY = 'theme-mode';
const VALID_MODES = ['system', 'light', 'dark'];
const buttons = document.querySelectorAll('.theme-mode-btn');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
let currentMode = 'system';

function getStoredMode() {
  try {
    var stored = localStorage.getItem(STORAGE_KEY);
    return VALID_MODES.indexOf(stored) !== -1 ? stored : 'system';
  } catch (e) {
    return 'system';
  }
}

function setStoredMode(mode) {
  try {
    localStorage.setItem(STORAGE_KEY, mode);
  } catch (e) {
    /* Storage unavailable; preference still works for current session. */
  }
}

function resolveTheme(mode) {
  if (mode === 'system') {
    return prefersDark.matches ? 'dark' : 'light';
  }
  return mode;
}

function updateButtons(activeMode) {
  for (var i = 0; i < buttons.length; i++) {
    var btn = buttons[i];
    var isActive = btn.getAttribute('data-theme-value') === activeMode;
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  }
}

function applyMode(mode) {
  currentMode = mode;
  var resolved = resolveTheme(mode);
  document.documentElement.setAttribute('data-theme-mode', mode);
  document.documentElement.setAttribute('data-theme', resolved);
  updateButtons(mode);
}

function handleActivation(event) {
  var btn = event.currentTarget;
  var mode = btn.getAttribute('data-theme-value');
  setStoredMode(mode);
  applyMode(mode);
}

/* Attach click handlers — no keyboard handlers needed */
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', handleActivation);
}

/* Listen for OS preference changes */
prefersDark.addEventListener('change', function() {
  if (currentMode === 'system') {
    applyMode('system');
  }
});

/* Initialize */
applyMode(getStoredMode());
```

#### Requirements

- Provide three explicit options: `system`, `light`, and `dark` visible simultaneously
- Use native `<button type="button">` elements with `aria-pressed` for selected state
- Do NOT use custom `role="radio"` elements or radiogroup semantics
- Do NOT use a single cycling button or two-state toggle
- Theme changes only on explicit activation (Enter, Space, click) — focus alone does NOT change the theme
- Persist selected mode across sessions in localStorage (key: `theme-mode`) when storage is available
- Wrap localStorage reads/writes in `try/catch` so controls still work when persistence is blocked
- Validate stored values — fall back to `system` for invalid values
- When `system` is selected, resolve visual theme from `prefers-color-scheme`
- While in `system` mode, update automatically if OS/browser preference changes
- Ensure the control appears in keyboard tab order **after** navigation items
- Position control in top-right corner of header (not fixed/sticky)
- Use visible text labels (System, Light, Dark) — icons supplement but do not replace labels

---

## 4. Complex Scripts and Diacritics (e.g., Hebrew, Arabic)

When supporting complex scripts with vocalization and cantillation marks (such as Hebrew Nikkud and Ta'amei Hamikra, or Arabic Tashkeel), dark mode presents unique accessibility challenges. These marks are not separate characters side-by-side; they are combining Unicode characters (e.g., range `U+0591` to `U+05C7` for Hebrew) that stack vertically. Standard frontend implementations often break when rendering these vertically stacked diacritics in dark mode.

### CSS Validation for Complex Scripts

1. **Irradiation / Glow Control:** Pure white text on a pure black background causes a bleeding effect ("halation") that blurs tiny dots. 
   * Use an off-white text color (e.g., `#f5f5f5`) on a dark charcoal/gray background (e.g., `#121212`).
   * Explicitly add font smoothing for diacritic legibility across browsers:
     ```css
     .complex-script-container {
       -webkit-font-smoothing: antialiased;
       -moz-osx-font-smoothing: grayscale;
     }
     ```
2. **Line-Height & Clipping:** Diacritics stack above and below the baseline. Audit your CSS to ensure `line-height` is set to at least `1.8` or `2.0`. **Never** apply `overflow: hidden` to the text container, otherwise top/bottom marks will be clipped.
3. **Contrast & Color Inheritance:** Ensure text color changes apply uniformly. If pseudo-elements or specific spans colorize diacritics, they must invert to a high-contrast color.
4. **RTL (Right-to-Left) Preservation:** Ensure dark mode state toggles do not accidentally strip `dir="rtl"` attributes or break bidirectional text isolation (`<bdi>`).
5. **Font-Weight "Thinning":** Light text on a dark background naturally looks bolder. Avoid overly bold font-weights in dark mode, as diacritics can merge into the base letters and become unreadable blobs.

### Visual Regression Testing for Diacritics

Standard DOM-based text checks cannot catch visual rendering failures of combining characters. Automated tests (e.g., using Playwright or Cypress) must use strict visual regression testing. 

**Example Prompt for LLM Test Generation:**

Act as a QA Automation Engineer. Write a visual regression test script using [Playwright/Cypress] that does the following:
1. Loads a page containing complex Hebrew text with both Nikkud and Ta'amei Hamikra (e.g., 'בְּרֵאשִׁ֖ית בָּרָ֣א אֱלֹהִ֑ים').
2. Captures a baseline screenshot in Light Mode.
3. Simulates/toggles Dark Mode (via data-theme attribute or prefers-color-scheme media query override).
4. Waits for the font (e.g., SBL Hebrew or Tiro Hebrew) to fully render.
5. Captures a Dark Mode screenshot and performs a pixel-by-pixel visual diff with a strict threshold (0.01) to ensure the tiny diacritic dots do not blur, disappear, or shift position. Ensure the test environment sets `ignoreFontAntialiasing: true` or runs in a standardized Docker container to prevent false positives across OS runners.

### Manual Validation Checklist

When reviewing screenshots or rendered UI components—or when passing images to Vision AI models for auditing—use this checklist:

* **Visibility:** Are the tiny dots inside the letters (e.g., the Dagesh dot in ּ) distinct and readable against the dark background?
* **Separation:** Are the vertical and horizontal lines below the letters blending together into a single blob, or do they remain separate lines?
* **Truncation:** Is the very highest mark (the cantillation accent above the letter) fully visible, or is it cut off by the top edge of the line block?
* **Weight/Blobbing:** Does the font weight feel too heavy in dark mode? Ensure bold text hasn't turned the diacritics into unreadable blobs.

## 5. Forced-Colors Mode Support

Forced-colors mode (Windows High Contrast) overrides author styles. Ensure content remains accessible:

### Detect forced-colors mode

```css
@media (forced-colors: active) {
  /* Maintain semantic boundaries */
  .card {
    border: 1px solid CanvasText;
  }
  
  /* Preserve critical visual indicators */
  .focus-indicator {
    outline: 2px solid Highlight;
  }
  
  /* Use system colors for UI elements */
  button {
    color: ButtonText;
    background-color: ButtonFace;
  }
}
```

### System color keywords in forced-colors mode

Use semantic system colors:

- `Canvas` - application background
- `CanvasText` - text on Canvas background
- `LinkText` - hyperlinks
- `ButtonFace` - button background
- `ButtonText` - button text
- `Highlight` - selected/highlighted background
- `HighlightText` - text on Highlight background

Requirements:

- Do not use `transparent` for borders needed for comprehension
- Preserve icons and graphics that convey meaning
- Test with Windows High Contrast themes
- Ensure focus indicators remain visible

---

## 6. Color Independence

Information must not be conveyed by color alone:

- Use icons, labels, or patterns in addition to color
- Provide text labels for status indicators
- Use multiple visual cues for interactive states

### Preferred pattern for status indicators

```html
<!-- Good: Icon + text + color -->
<div class="status status-success">
  <svg role="img" aria-label="Success" class="icon-checkmark">
    <use href="#icon-checkmark"></use>
  </svg>
  <span>Success</span>
</div>

<div class="status status-error">
  <svg role="img" aria-label="Error" class="icon-warning">
    <use href="#icon-warning"></use>
  </svg>
  <span>Error</span>
</div>
```

Avoid:

```html
<!-- Bad: Color only -->
<div class="status-success">Item saved</div>
<div class="status-error">Item failed</div>
```

---

## 7. Images and Graphics

Images and graphics must work in both modes:

### SVG icons and graphics

Use `currentColor` to inherit theme colors:

```svg
<svg viewBox="0 0 24 24" class="icon">
  <path fill="currentColor" d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
</svg>
```

### Images with transparency

Ensure PNG/WebP images with transparency remain perceivable:

```css
.logo-with-transparency {
  /* Provide subtle background to ensure visibility */
  background-color: var(--color-logo-background);
  padding: 0.5rem;
}

@supports (color: light-dark(white, black)) {
  .logo-with-transparency {
    background-color: light-dark(var(--color-logo-background-light), var(--color-logo-background-dark));
  }
}

@supports not (color: light-dark(white, black)) {
  @media (prefers-color-scheme: dark) {
    .logo-with-transparency {
      background-color: var(--color-logo-background-dark);
    }
  }
}
```

### Provide alternative images when necessary

```html
<picture>
  <source srcset="logo-dark.svg" media="(prefers-color-scheme: dark)">
  <img src="logo-light.svg" alt="Company logo">
</picture>
```

---

## 8. Focus and Interactive States

Focus indicators must be visible in all color modes:

### Requirements

- Minimum 3:1 contrast against adjacent colors
- Clearly distinguishable from unfocused state
- Consistent thickness (at least 2px)
- Not removed or reduced by dark mode

### Preferred pattern

```css
:focus {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}

:focus:not(:focus-visible) {
  outline: none;
}

:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}
```

Test:

- Tab through interactive elements in both modes
- Verify focus indicator meets 3:1 contrast
- Check keyboard navigation works identically in both modes
- Verify focus styles still read clearly in forced-colors mode

---

## 9. Motion and Transitions

Respect motion preferences when switching themes:

```css
/* Default: smooth transitions */
* {
  transition: background-color 0.2s ease, color 0.2s ease;
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  * {
    transition: none;
  }
}
```

Requirements:

- Theme transitions should be subtle and brief
- Respect `prefers-reduced-motion` setting
- Avoid jarring or distracting visual effects
- Do not auto-animate theme changes based on time of day

---

## 10. Testing Expectations

Minimum checks for color mode implementation:

### Manual testing

- [ ] Navigate site in browser light mode - verify all contrast passes WCAG AA
- [ ] Switch to browser dark mode - verify all contrast passes WCAG AA
- [ ] Enable Windows High Contrast - verify content remains perceivable
- [ ] Verify forced-colors mode preserves meaning and focus visibility
- [ ] Test keyboard navigation in both light and dark modes
- [ ] Verify focus indicators are visible in both modes
- [ ] Check that all interactive states (hover, active, disabled) work in both modes
- [ ] Test with screen reader - verify no mode-specific issues
- [ ] Verify color-blind simulation tools show sufficient non-color cues
- [ ] Verify `light-dark()` resolves to the intended token pair in supported browsers
- [ ] Verify `contrast-color()` chooses a legible foreground in supported browsers
- [ ] Verify browser support fallbacks work where `light-dark()` or `contrast-color()` are unavailable
- [ ] For data tables with zebra striping: verify row background colors differ by approximately 5–10% luminance from the page background (not near-white stripes on a dark page)
- [ ] Verify text on every zebra-stripe row background meets 4.5:1 contrast

### Automated testing

- Run contrast checker on light mode colors
- Run contrast checker on dark mode colors
- Verify CSS uses semantic color tokens, not hardcoded values
- Check for `color-scheme` declaration on `:root`
- Check for `light-dark()` token usage where supported
- Check for `contrast-color()` usage behind `@supports`
- Check for `prefers-color-scheme` media query implementation in fallback or asset-selection code
- Validate forced-colors mode fallbacks exist

### Browser and OS testing

Test with:

- Chrome/Edge with system dark mode
- Firefox with system dark mode
- Safari with system dark mode
- Windows High Contrast themes (forced-colors)
- High contrast settings on macOS and browser-level contrast modes
- Forced-colors mode with form controls, scrollbars, and native UI surfaces
- Browser support for `color-scheme`, `light-dark()`, and `contrast-color()`
- Browser zoom at 200% in both modes

---

## 11. Definition of Done

A color mode implementation is complete when:

- All text and UI elements meet WCAG 2.2 AA contrast in both light and dark modes
- System color preference is detected and respected by default
- `color-scheme` is declared on the root element
- `light-dark()` is used for theme tokens where supported
- `contrast-color()` is used behind progressive enhancement guards where appropriate
- Forced-colors mode maintains content comprehension
- Information is not conveyed by color alone
- Focus indicators are visible and meet contrast requirements in all modes
- User theme preference persists across sessions (if manual toggle provided)
- No accessibility regressions when switching between modes
- Manual and automated tests pass in both modes
- Data table zebra stripes use subtle relative differences (5–10% from the page background) rather than hard-coded absolute colors

---

## 12. Data Tables and Zebra Striping

Zebra striping (alternating row background colors) helps users track rows across wide tables. However, many implementations apply high-contrast absolute colors that work acceptably in light mode but become visually extreme in dark mode.

### The problem with absolute zebra-stripe colors

A common implementation might use `#ffffff` and `#f0f0f0` for light mode row stripes without updating the values for dark mode. When a dark page has a background of `#1a1a1a`, those same light stripe values create a jarring luminance jump that makes tables harder — not easier — to read, and can trigger discomfort for photosensitive users.

**Avoid:**

```css
/* Bad: absolute colors that ignore the current page background */
tbody tr:nth-child(even) { background-color: #ffffff; }
tbody tr:nth-child(odd)  { background-color: #e0e0e0; }
```

In dark mode, these near-white stripes sit on a near-black page and produce excessive contrast that is tiring to scan.

### Preferred pattern: subtle relative differences via CSS custom properties

Keep stripe colors close to the page background — roughly 5% and 10% away — and update all three values together as part of your theme tokens:

```css
:root {
  color-scheme: light dark;

  --color-background:     light-dark(#ffffff, #1a1a1a);
  --color-table-row-even: light-dark(#f2f2f2, #272727);
  --color-table-row-odd:  light-dark(#e5e5e5, #343434);
  --color-text:           light-dark(#1a1a1a, #e8e8e8);
}

table {
  border-collapse: collapse;
  width: 100%;
  background-color: var(--color-background);
  color: var(--color-text);
}

tbody tr:nth-child(even) { background-color: var(--color-table-row-even); }
tbody tr:nth-child(odd)  { background-color: var(--color-table-row-odd);  }
```

### Alternative: `color-mix()` for purely relative stripes

The CSS `color-mix()` function can compute stripe colors relative to the background at runtime, removing the need to maintain separate hex values per theme. Browser support is strong as of 2024.

```css
:root {
  --color-background: #ffffff;
  --color-text:       #1a1a1a;

  /* Mix background with black (light mode) or white (dark mode) */
  --color-table-row-even: color-mix(in srgb, var(--color-background) 95%, black);
  --color-table-row-odd:  color-mix(in srgb, var(--color-background) 90%, black);
}

@supports not (color: light-dark(white, black)) {
  @media (prefers-color-scheme: dark) {
    :root {
      --color-background: #1a1a1a;
      --color-text: #e8e8e8;

      --color-table-row-even: color-mix(in srgb, var(--color-background) 95%, white);
      --color-table-row-odd:  color-mix(in srgb, var(--color-background) 90%, white);
    }
  }
}
```

This approach automatically adapts if the base background value changes, reducing maintenance burden.

### Forced-colors mode

In forced-colors mode the browser replaces all author-defined background colors with system palette values. Table rows will lose their stripe backgrounds, which is expected and acceptable behavior. Ensure the table remains comprehensible without the stripes:

- Add a visible border between rows as a supplementary visual separator
- Do not rely solely on alternating background color to convey row grouping or meaning

```css
@media (forced-colors: active) {
  tbody tr {
    border-bottom: 1px solid CanvasText;
  }
}
```

### Requirements

- Zebra stripe colors must be defined relative to the page background, not as absolute values
- Text must meet 4.5:1 contrast against **both** stripe row backgrounds in all color modes
- The luminance difference between adjacent stripes should be perceivable but not jarring — a 5–10% step from the page background is the recommended range
- Stripe colors must be defined as CSS custom properties and updated together with other theme tokens
- Tables must remain scannable when stripe colors are absent (forced-colors mode)

---

## References

### W3C Specifications

- [WCAG 2.2 Understanding 1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- [WCAG 2.2 Understanding 1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)
- [CSS Media Queries Level 5: prefers-color-scheme](https://www.w3.org/TR/mediaqueries-5/#prefers-color-scheme)
- [CSS Media Queries Level 5: forced-colors](https://www.w3.org/TR/mediaqueries-5/#forced-colors)
- [CSS Color Module Level 4: System Colors](https://www.w3.org/TR/css-color-4/#css-system-colors)

### Machine-Readable Standards

For AI systems and automated tooling, see [wai-yaml-ld](https://github.com/mgifford/wai-yaml-ld) for structured accessibility standards:

- [WCAG 2.2 (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wcag-2.2-normative.yaml) - Machine-readable WCAG 2.2 normative content
- [CSS Specifications Index (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/css-specifications-index.yaml) - CSS specs including media queries and color modules
- [Standards Link Graph (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/standards-link-graph.yaml) - Relationships across WCAG/CSS/HTML standards

### Related Guides

- [User Personalization and Accessibility Best Practices](./USER_PERSONALIZATION_ACCESSIBILITY_BEST_PRACTICES.md) - Comprehensive guide on implementing user preference controls, CSS media queries for accessibility, and avoiding accessibility overlays

### Additional Reading

- [MDN: light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark)
- [MDN: contrast-color()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/contrast-color)
- [Smashing Magazine: Building Self-Correcting Color Systems With contrast-color()](https://www.smashingmagazine.com/2026/05/building-self-correcting-color-systems-contrast-color/)
- [CSS-Tricks: Exploring the CSS contrast-color() Function, a Second Time](https://css-tricks.com/exploring-the-css-contrast-color-function-a-second-time/)
- [Piccalilli: Some CSS-only contrast options until contrast-color() is baseline widely available](https://piccalil.li/blog/some-css-only-contrast-options-until-contrast-color-is-baseline-widely-available/)
- [Inclusive Dark Mode: Designing Accessible Dark Themes](https://www.smashingmagazine.com/2025/04/inclusive-dark-mode-designing-accessible-dark-themes/)
- [Dark Mode Accessibility Myth Debunked](https://stephaniewalter.design/blog/dark-mode-accessibility-myth-debunked/)
- [Dark Mode Done Right: Performance & Accessibility](https://dev.to/javascriptwizzard/dark-mode-done-right-performance-accessibility-considerations-43b1)
- [Dark Mode UI Design: Best Practices](https://blog.logrocket.com/ux-design/dark-mode-ui-design-best-practices-and-examples/)
- [Minnesota IT Services: Dark Mode Accessibility](https://mn.gov/mnit/media/blog/?id=38-469250)

---

AGPL-3.0-or-later License - See LICENSE file for full text  
Copyright (c) 2026 Mike Gifford
