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

## 3. Respecting User Preferences

Implement theme switching that respects system and user preferences:

### Preferred pattern: CSS custom properties with media query

```css
:root {
  /* Light mode (default) */
  --color-text: #1a1a1a;
  --color-background: #ffffff;
  --color-link: #0066cc;
  --color-focus: #004499;
}

@media (prefers-color-scheme: dark) {
  :root {
    /* Dark mode */
    --color-text: #e8e8e8;
    --color-background: #1a1a1a;
    --color-link: #66aaff;
    --color-focus: #99ccff;
  }
}

body {
  color: var(--color-text);
  background-color: var(--color-background);
}

a {
  color: var(--color-link);
}

a:focus {
  outline: 2px solid var(--color-focus);
}
```

### User override pattern

If providing manual theme toggle:

```html
<button id="theme-toggle" aria-label="Toggle dark mode">
  <span aria-hidden="true" class="icon-theme"></span>
</button>
```

```javascript
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'auto';

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  localStorage.setItem('theme', theme);
}

themeToggle.addEventListener('click', () => {
  const current = localStorage.getItem('theme') || 'auto';
  const next = current === 'auto' ? 'light' : current === 'light' ? 'dark' : 'auto';
  applyTheme(next);
  // Update button label to reflect new state
  themeToggle.setAttribute('aria-label', 
    next === 'dark' ? 'Switch to light mode' : 
    next === 'light' ? 'Switch to auto mode' : 
    'Switch to dark mode'
  );
});

// Apply saved preference on load
applyTheme(currentTheme);
```

Requirements:

- Default to system preference when no manual selection exists
- Persist user choice across sessions
- Update toggle button label to reflect current state
- Announce state changes to assistive technology when appropriate

---

## 4. Forced-Colors Mode Support

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

## 5. Color Independence

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

## 6. Images and Graphics

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

@media (prefers-color-scheme: dark) {
  .logo-with-transparency {
    /* Adjust if needed for dark mode */
    background-color: var(--color-logo-background-dark);
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

## 7. Focus and Interactive States

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

---

## 8. Motion and Transitions

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

## 9. Testing Expectations

Minimum checks for color mode implementation:

### Manual testing

- [ ] Navigate site in browser light mode - verify all contrast passes WCAG AA
- [ ] Switch to browser dark mode - verify all contrast passes WCAG AA
- [ ] Enable Windows High Contrast - verify content remains perceivable
- [ ] Test keyboard navigation in both light and dark modes
- [ ] Verify focus indicators are visible in both modes
- [ ] Check that all interactive states (hover, active, disabled) work in both modes
- [ ] Test with screen reader - verify no mode-specific issues
- [ ] Verify color-blind simulation tools show sufficient non-color cues

### Automated testing

- Run contrast checker on light mode colors
- Run contrast checker on dark mode colors
- Verify CSS uses semantic color tokens, not hardcoded values
- Check for `prefers-color-scheme` media query implementation
- Validate forced-colors mode fallbacks exist

### Browser and OS testing

Test with:

- Chrome/Edge with system dark mode
- Firefox with system dark mode
- Safari with system dark mode
- Windows High Contrast themes (forced-colors)
- Browser zoom at 200% in both modes

---

## 10. Definition of Done

A color mode implementation is complete when:

- All text and UI elements meet WCAG 2.2 AA contrast in both light and dark modes
- System color preference is detected and respected by default
- Forced-colors mode maintains content comprehension
- Information is not conveyed by color alone
- Focus indicators are visible and meet contrast requirements in all modes
- User theme preference persists across sessions (if manual toggle provided)
- No accessibility regressions when switching between modes
- Manual and automated tests pass in both modes

---

## References

Additional reading and resources:

- [Inclusive Dark Mode: Designing Accessible Dark Themes](https://www.smashingmagazine.com/2025/04/inclusive-dark-mode-designing-accessible-dark-themes/)
- [Dark Mode Accessibility Myth Debunked](https://stephaniewalter.design/blog/dark-mode-accessibility-myth-debunked/)
- [Dark Mode Done Right: Performance & Accessibility](https://dev.to/javascriptwizzard/dark-mode-done-right-performance-accessibility-considerations-43b1)
- [Dark Mode UI Design: Best Practices](https://blog.logrocket.com/ux-design/dark-mode-ui-design-best-practices-and-examples/)
- [Minnesota IT Services: Dark Mode Accessibility](https://mn.gov/mnit/media/blog/?id=38-469250)
- [WCAG 2.2 Understanding 1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- [WCAG 2.2 Understanding 1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)
- [CSS Media Queries Level 5: prefers-color-scheme](https://www.w3.org/TR/mediaqueries-5/#prefers-color-scheme)
- [CSS Media Queries Level 5: forced-colors](https://www.w3.org/TR/mediaqueries-5/#forced-colors)
- [CSS Color Module Level 4: System Colors](https://www.w3.org/TR/css-color-4/#css-system-colors)

---

AGPL-3.0-or-later License - See LICENSE file for full text  
Copyright (c) 2026 Mike Gifford
