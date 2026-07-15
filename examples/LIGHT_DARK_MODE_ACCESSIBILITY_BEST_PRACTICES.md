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

Use a three-option control for **Light**, **Dark**, and **System**:

- **Control model**: Use a radiogroup with three options (`light`, `dark`, `system`) so the selected state is explicit
- **Visual affordance**: Use sun/moon/system icons as supporting visuals, not the only state indicator
- **Placement**: Position in the top-right corner of the header in both desktop and mobile views
- **Scroll behavior**: Do not make the toggle fixed/sticky; it should remain in normal document flow within the header
- **Keyboard navigation**: Place the toggle in the DOM **after** navigation/menu items so it appears later in the tab order
- **Keyboard interaction**: Make the radiogroup a single Tab stop and support Arrow keys, Home/End, Space, and Enter to change the selected option
- **Language consideration**: This guidance assumes left-to-right (LTR) languages

#### HTML structure

```html
<header>
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
    <!-- Navigation items come first in DOM order -->
  </nav>

  <!-- Theme control comes after navigation for proper tab order -->
  <div id="theme-mode-group" role="radiogroup" aria-label="Color theme">
    <button type="button" class="theme-mode-btn" role="radio" aria-checked="false" tabindex="-1" data-theme-value="light">
      <svg aria-hidden="true" class="theme-icon" viewBox="0 0 24 24" width="20" height="20">
        <circle cx="12" cy="12" r="5" fill="currentColor"/>
        <path fill="currentColor" d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
      </svg>
      <span>Light</span>
    </button>

    <button type="button" class="theme-mode-btn" role="radio" aria-checked="false" tabindex="-1" data-theme-value="dark">
      <svg aria-hidden="true" class="theme-icon" viewBox="0 0 24 24" width="20" height="20">
        <path fill="currentColor" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
      </svg>
      <span>Dark</span>
    </button>

    <button type="button" class="theme-mode-btn" role="radio" aria-checked="true" tabindex="0" data-theme-value="system">
      <span>System</span>
      <svg aria-hidden="true" class="theme-mode-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 24">
        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
        </g>
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M36 3a6.364 6.364 0 0 0 9 9 9 9 0 1 1-9-9"/>
        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" transform="translate(48)">
          <rect width="18" height="11" x="3" y="4" rx="2"/>
          <path d="M2 18h20"/>
        </g>
      </svg>
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
  /* Optional: margin-left: auto provides fallback positioning if additional
     header items are added. Currently, justify-content: space-between on
     parent handles the layout with nav and this control. */
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.5rem;
  border: 0;
  background-color: var(--color-background);
  color: var(--color-text);
  cursor: pointer;
  border-radius: 4px;
}

.theme-mode-btn:hover {
  background-color: var(--color-hover);
}

.theme-mode-btn:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}

.theme-mode-btn[aria-checked="true"] {
  background-color: var(--color-hover);
  border: 1px solid var(--color-border);
}

.theme-icon,
.theme-mode-icon {
  display: block;
}

.theme-icon {
  width: 20px;
  height: 20px;
}

.theme-mode-icon {
  width: 54px;
  height: 18px;
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
const themeModeButtons = document.querySelectorAll('.theme-mode-btn');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const modeOrder = ['light', 'dark', 'system'];

// Safe localStorage access keeps controls working in restricted environments.
function getStoredMode() {
  try {
    return localStorage.getItem('theme-mode');
  } catch {
    return null;
  }
}

function setStoredMode(value) {
  try {
    localStorage.setItem('theme-mode', value);
  } catch {
    // Storage is unavailable; keep the current-session behavior.
  }
}

// Persist user mode as light, dark, or system.
const storedMode = getStoredMode();
let mode = modeOrder.includes(storedMode) ? storedMode : 'system';

function resolveTheme(activeMode) {
  if (activeMode === 'system') {
    return prefersDarkScheme.matches ? 'dark' : 'light';
  }
  return activeMode;
}

function updateSelection(activeMode) {
  themeModeButtons.forEach((button) => {
    const checked = button.dataset.themeValue === activeMode;
    button.setAttribute('aria-checked', checked ? 'true' : 'false');
    button.setAttribute('tabindex', checked ? '0' : '-1');
  });
}

function applyMode(activeMode) {
  const resolvedTheme = resolveTheme(activeMode);

  // Track both chosen mode and resolved theme for styling/debugging.
  document.documentElement.setAttribute('data-theme-mode', activeMode);
  document.documentElement.setAttribute('data-theme', resolvedTheme);

  updateSelection(activeMode);
}

function getModeIndex(activeMode) {
  return modeOrder.indexOf(activeMode);
}

function focusModeByIndex(index) {
  const normalizedIndex = (index + modeOrder.length) % modeOrder.length;
  const nextMode = modeOrder[normalizedIndex];
  const nextButton = document.querySelector(`[data-theme-value="${nextMode}"]`);

  if (!nextButton) {
    return;
  }

  mode = nextMode;
  setStoredMode(mode);
  applyMode(mode);
  nextButton.focus();
}

themeModeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    mode = button.dataset.themeValue;
    setStoredMode(mode);
    applyMode(mode);
  });

  button.addEventListener('keydown', (event) => {
    const currentIndex = getModeIndex(mode);

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        focusModeByIndex(currentIndex + 1);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        focusModeByIndex(currentIndex - 1);
        break;
      case 'Home':
        event.preventDefault();
        focusModeByIndex(0);
        break;
      case 'End':
        event.preventDefault();
        focusModeByIndex(modeOrder.length - 1);
        break;
      case ' ':
      case 'Enter':
        event.preventDefault();
        mode = button.dataset.themeValue;
        setStoredMode(mode);
        applyMode(mode);
        break;
      default:
        break;
    }
  });
});

prefersDarkScheme.addEventListener('change', (e) => {
  // Only react automatically while user has selected system mode.
  if (mode === 'system') {
    applyMode('system');
  }
});

applyMode(mode);
```

#### Requirements

- Provide three explicit options: `light`, `dark`, and `system`
- Persist selected mode across sessions in localStorage (for example, `theme-mode`) when storage is available
- Wrap localStorage reads/writes in `try/catch` so controls still work when persistence is blocked
- When `system` is selected, resolve visual theme from `prefers-color-scheme`
- While in `system` mode, update automatically if OS/browser preference changes
- Expose selected state programmatically (`role="radio"` with `aria-checked`)
- Implement roving tabindex so only the selected option is in the Tab order
- Support keyboard control with Arrow keys, Home/End, Space, and Enter
- Ensure the control appears in keyboard tab order **after** navigation items
- Position control in top-right corner of header (not fixed/sticky)

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
