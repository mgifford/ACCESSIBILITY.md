---
title: Light/Dark Mode Accessibility Best Practices
---

# Light/Dark Mode Accessibility Best Practices

This document defines accessibility requirements for light and dark themes. It covers system preferences, optional manual selection, contrast, forced colours, increased-contrast preferences, images, interaction states, and testing.

Light and dark modes are not inherently accessible. Every supported mode must preserve content, functionality, visible states, and sufficient contrast.

---

## 1. Required outcomes

Users must be able to perceive and operate the interface without losing information or functionality because of the active colour mode.

At minimum:

- Normal text must meet WCAG 2.2 Success Criterion 1.4.3, generally 4.5:1.
- Large-scale text must meet the applicable 3:1 threshold defined by WCAG.
- User-interface components, states, and graphical objects covered by WCAG 1.4.11 must meet 3:1 against adjacent colours.
- Focus indicators must remain clearly visible in every supported mode. Do not reduce focus testing to a single contrast ratio; evaluate contrast, area, visibility, and whether the indicator is obscured.
- Information must not be conveyed by colour alone.
- Light, dark, System, forced-colours, and increased-contrast preferences must not be treated as interchangeable concepts.

Test actual colour combinations. Do not assume that a dark background automatically provides accessible contrast.

---

## 2. Choose an implementation pattern

Use one of these patterns.

### Pattern A: Follow the system preference

Use this pattern when users do not need a manual selector.

- Declare support with `color-scheme`.
- Use `prefers-color-scheme` or modern colour functions to define light and dark tokens.
- Allow the page to respond when the operating-system or browser preference changes.
- Do not store a separate preference when the user has not made one.

### Pattern B: Provide a manual selector

Use this pattern when users should be able to override their system preference.

Provide three mutually exclusive choices:

- **System:** follow the operating-system or browser preference.
- **Light:** always use the light theme.
- **Dark:** always use the dark theme.

The selector can be permanently visible where space permits. In a constrained header, use one labelled button that opens a single-choice group. Do not use a binary toggle when System is a supported state.

---

## 3. Theme tokens and browser integration

### Declare supported colour schemes

Place this metadata early in the document head:

```html
<meta name="color-scheme" content="light dark">
```

Declare the supported schemes in CSS. Set a specific value when a manual override is active so browser-provided controls and surfaces follow the selected theme.

```css
:root {
  color-scheme: light dark;
}

:root[data-theme="light"] {
  color-scheme: light;
}

:root[data-theme="dark"] {
  color-scheme: dark;
}
```

`color-scheme` affects browser-provided UI such as form controls, scrollbars, and spellcheck indicators. It does not create an accessible colour palette by itself.

### Preferred token pattern

Use semantic tokens rather than scattering theme-specific colours through component rules.

```css
:root {
  color-scheme: light dark;

  --background: light-dark(#ffffff, #15191e);
  --surface: light-dark(#f3f5f7, #242a31);
  --text: light-dark(#1b1f23, #f4f6f8);
  --muted-text: light-dark(#4d5966, #c3cbd4);
  --link: light-dark(#005ea8, #73b7f2);
  --border: light-dark(#6b7480, #a7b0ba);
  --focus: light-dark(#7a4e00, #ffdf85);
}

body {
  color: var(--text);
  background: var(--background);
}

a {
  color: var(--link);
}
```

Validate every token pair. `light-dark()` selects a value; it does not verify contrast.

### Fallback for older browsers

```css
:root {
  --background: #ffffff;
  --surface: #f3f5f7;
  --text: #1b1f23;
  --link: #005ea8;
  --border: #6b7480;
  --focus: #7a4e00;
}

@supports not (color: light-dark(white, black)) {
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]) {
      --background: #15191e;
      --surface: #242a31;
      --text: #f4f6f8;
      --link: #73b7f2;
      --border: #a7b0ba;
      --focus: #ffdf85;
    }
  }
}
```

Use `contrast-color()` only as progressive enhancement. It currently chooses a contrasting light or dark foreground; it does not replace component-level testing.

---

## 4. Compact System/Light/Dark selector

This example uses a compact trigger in the header and a native radio group in an overlaid panel. Native radios provide the expected single-choice semantics and arrow-key behaviour.

### Interaction requirements

- The trigger has a minimum 44 by 44 CSS-pixel target.
- Its accessible name includes the selected mode, for example, “Theme: System. Choose light or dark mode.”
- Click, Enter, or Space opens the selector.
- Opening moves focus to the selected radio button.
- Up/Left and Down/Right move through the radio choices using native browser behaviour.
- Changing a radio must not immediately close the panel; otherwise continued arrow-key selection is interrupted.
- Escape closes the panel and restores focus to the trigger.
- Clicking outside or moving focus outside the complete component closes the panel.
- Hover or focus may expose a tooltip, but must not open the selector.
- The panel overlays content rather than increasing the header height.
- The selected mode persists when storage is available.
- System mode continues to respond to changes in `prefers-color-scheme`.

### SVG icon

Inline the icon in the trigger when it must inherit the button's colour. This avoids an external `<use>` reference, works when the site is tested from a local file, and adapts to light, dark, and forced-colours modes through `currentColor`.

The SVG is decorative because the button supplies the accessible name. Do not give the inline SVG a competing `<title>` or description.

### HTML

```html
<div class="theme-control">
  <button
    class="theme-trigger"
    id="theme-trigger"
    type="button"
    aria-expanded="false"
    aria-controls="theme-panel"
  >
    <!-- Decorative icon: the adjacent visually hidden text names the button. -->
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      aria-hidden="true"
      focusable="false"
    >
      <!-- Left half: sun -->
      <path fill="currentColor" d="M12 5a7 7 0 0 0 0 14Z"/>
      <g
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-width="1.8"
      >
        <path d="M12 1.5V3M4.6 4.6l1.1 1.1M1.5 12H3M4.6 19.4l1.1-1.1M12 21v1.5"/>
      </g>

      <!-- Right half: crescent moon -->
      <path
        fill="currentColor"
        d="M12 5a7 7 0 0 1 0 14c2.9-1.25 4.75-3.85 4.75-7S14.9 6.25 12 5"
      />
    </svg>
    <span class="visually-hidden" id="theme-trigger-label">
      Theme: System. Choose light or dark mode.
    </span>
  </button>

  <span class="theme-tooltip" role="tooltip">Choose light or dark mode</span>

  <div class="theme-panel" id="theme-panel" hidden>
    <fieldset>
      <legend>Light or dark mode</legend>

      <label class="theme-option">
        <input type="radio" name="theme" value="system">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <rect x="3" y="4" width="18" height="13" rx="1.5"/>
          <path d="M8 21h8M12 17v4"/>
        </svg>
        <span><strong>System</strong><small>Follow your device setting</small></span>
      </label>

      <label class="theme-option">
        <input type="radio" name="theme" value="light">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"/>
        </svg>
        <span><strong>Light</strong><small>Always use the light theme</small></span>
      </label>

      <label class="theme-option">
        <input type="radio" name="theme" value="dark">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z"/>
        </svg>
        <span><strong>Dark</strong><small>Always use the dark theme</small></span>
      </label>
    </fieldset>
  </div>
</div>
```

### CSS

```css
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.theme-control {
  position: relative;
}

.theme-trigger {
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  padding: 0;
  border: 1px solid var(--border);
  border-radius: 50%;
  color: var(--text);
  background: var(--background);
  cursor: pointer;
}

.theme-trigger:focus-visible,
.theme-option input:focus-visible {
  outline: 3px solid var(--focus);
  outline-offset: 3px;
}

.theme-tooltip {
  position: absolute;
  z-index: 20;
  inset-block-start: calc(100% + 0.5rem);
  inset-inline-end: 0;
  width: max-content;
  max-width: 14rem;
  padding: 0.35rem 0.55rem;
  color: var(--background);
  background: var(--text);
  border-radius: 0.25rem;
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
}

.theme-trigger:hover + .theme-tooltip,
.theme-trigger:focus-visible + .theme-tooltip {
  opacity: 1;
  visibility: visible;
}

.theme-trigger[aria-expanded="true"] + .theme-tooltip {
  opacity: 0;
  visibility: hidden;
}

.theme-panel {
  position: absolute;
  z-index: 30;
  inset-block-start: calc(100% + 0.6rem);
  inset-inline-end: 0;
  width: min(19rem, calc(100vw - 2rem));
  padding: 0.85rem;
  border: 1px solid var(--border);
  border-radius: 0.55rem;
  color: var(--text);
  background: var(--background);
  box-shadow: 0 0.5rem 1.5rem rgb(0 0 0 / 25%);
}

.theme-panel[hidden] {
  display: none;
}

.theme-panel fieldset {
  margin: 0;
  padding: 0;
  border: 0;
}

.theme-option {
  display: grid;
  grid-template-columns: 1.35rem 1.5rem 1fr;
  gap: 0.65rem;
  align-items: start;
  padding: 0.55rem;
  border-radius: 0.35rem;
  cursor: pointer;
}

.theme-option:hover {
  background: var(--surface);
}

.theme-option input {
  width: 1.15rem;
  height: 1.15rem;
  margin: 0.2rem 0 0;
}

.theme-option svg {
  width: 1.4rem;
  height: 1.4rem;
  margin-block-start: 0.1rem;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.theme-option strong,
.theme-option small {
  display: block;
}

@media (forced-colors: active) {
  .theme-trigger,
  .theme-panel {
    border: 1px solid ButtonText;
  }

  .theme-trigger:focus-visible,
  .theme-option input:focus-visible {
    outline-color: Highlight;
  }
}
```

Do not place the component inside an ancestor that clips it with `overflow: hidden`. Test its position at narrow widths, 200% zoom, and 400% zoom.

### JavaScript

```javascript
(function () {
  var STORAGE_KEY = 'theme-mode';
  var VALID_MODES = ['system', 'light', 'dark'];
  var root = document.documentElement;
  var control = document.querySelector('.theme-control');
  var trigger = document.getElementById('theme-trigger');
  var triggerLabel = document.getElementById('theme-trigger-label');
  var panel = document.getElementById('theme-panel');
  var radios = Array.from(document.querySelectorAll('input[name="theme"]'));
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  var selectedMode = getStoredMode();

  function getStoredMode() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      return VALID_MODES.includes(stored) ? stored : 'system';
    } catch (error) {
      return 'system';
    }
  }

  function storeMode(mode) {
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch (error) {
      /* The current-session preference still works without storage. */
    }
  }

  function resolveTheme(mode) {
    if (mode === 'system') {
      return prefersDark.matches ? 'dark' : 'light';
    }
    return mode;
  }

  function modeLabel(mode) {
    return mode.charAt(0).toUpperCase() + mode.slice(1);
  }

  function applyMode(mode) {
    selectedMode = mode;
    root.dataset.themeMode = mode;
    root.dataset.theme = resolveTheme(mode);
    root.style.colorScheme = resolveTheme(mode);

    radios.forEach(function (radio) {
      radio.checked = radio.value === mode;
    });

    triggerLabel.textContent =
      'Theme: ' + modeLabel(mode) + '. Choose light or dark mode.';
  }

  function openPanel() {
    panel.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
    var selectedRadio = radios.find(function (radio) {
      return radio.checked;
    });
    if (selectedRadio) selectedRadio.focus();
  }

  function closePanel(restoreFocus) {
    panel.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
    if (restoreFocus) trigger.focus();
  }

  trigger.addEventListener('click', function () {
    if (panel.hidden) {
      openPanel();
    } else {
      closePanel(true);
    }
  });

  radios.forEach(function (radio) {
    radio.addEventListener('change', function (event) {
      storeMode(event.target.value);
      applyMode(event.target.value);
    });
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !panel.hidden) {
      event.preventDefault();
      closePanel(true);
    }
  });

  document.addEventListener('click', function (event) {
    if (!panel.hidden && !control.contains(event.target)) {
      closePanel(false);
    }
  });

  control.addEventListener('focusout', function (event) {
    if (!panel.hidden && !control.contains(event.relatedTarget)) {
      closePanel(false);
    }
  });

  prefersDark.addEventListener('change', function () {
    if (selectedMode === 'system') applyMode('system');
  });

  applyMode(selectedMode);
}());
```

### Prevent a first-paint theme flash

When manual overrides are supported, apply the stored mode in a small script in the document head before visible content is rendered. Keep the script synchronized with the main component implementation.

```html
<script>
  (function () {
    var mode = 'system';
    try {
      var stored = localStorage.getItem('theme-mode');
      if (stored === 'light' || stored === 'dark') mode = stored;
    } catch (error) {}

    var resolved = mode === 'system'
      ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : mode;

    document.documentElement.dataset.themeMode = mode;
    document.documentElement.dataset.theme = resolved;
    document.documentElement.style.colorScheme = resolved;
  }());
</script>
```

### Applying this pattern to a static or Jekyll site

Keep the component in the site's shared layout so every page uses the same markup, state, and keyboard behaviour.

1. In the shared layout, replace the existing System/Light/Dark button group with the `.theme-control` HTML. Keep it after navigation and search in the DOM order.
2. Put the component styles in the site's existing shared stylesheet. Reuse the site's semantic colour tokens instead of introducing duplicate values.
3. Put the anti-flash script in `<head>` before visible content is rendered.
4. Put the interaction script near the end of `<body>` or in the site's existing JavaScript bundle.
5. Keep the storage key consistent across both scripts. This example uses `theme-mode`.
6. Remove the old selector markup, styling, and event handlers after the replacement has passed testing. Do not leave two controls writing to the same preference.

For a Jekyll site, the likely integration points are:

```text
_layouts/default.html   Shared control markup and anti-flash script
assets/css/site.css     Theme tokens and component styles
assets/js/theme.js      Selector behaviour, if scripts are kept separately
```

The inline trigger SVG requires no image request or asset-path handling. Keep a standalone SVG only when the same artwork is needed elsewhere.

---

## 5. Forced-colours support

`forced-colors: active` means the browser is enforcing a limited user-selected palette. Windows High Contrast is an important example, but “forced colours” and “high contrast” are not interchangeable terms.

Allow the browser to substitute system colours. Do not build a separate forced-colours theme. Add targeted corrections only where substitution removes a necessary boundary or state.

```css
@media (forced-colors: active) {
  /* A shadow may disappear, so preserve the component boundary. */
  .card,
  dialog,
  .theme-panel {
    border: 1px solid CanvasText;
  }

  /* Preserve a selected state without relying on author colours. */
  [aria-current="page"],
  [aria-pressed="true"] {
    outline: 2px solid Highlight;
  }
}
```

Requirements:

- Use system colours such as `Canvas`, `CanvasText`, `LinkText`, `ButtonFace`, `ButtonText`, `Highlight`, and `HighlightText` when targeted adjustments are needed.
- Do not use transparent borders when the border is necessary for comprehension.
- Do not rely exclusively on box-shadow or background colour for boundaries and states.
- Avoid `forced-color-adjust: none` unless retaining author colours is essential and separately tested.
- Verify icons, focus indicators, selected states, form controls, and data visualizations.

---

## 6. Increased and reduced contrast preferences

`prefers-contrast` is separate from `prefers-color-scheme`. A user may request more or less contrast while using either a light or dark theme.

```css
@media (prefers-contrast: more) {
  :root {
    --border-width: 2px;
  }

  .secondary-text {
    color: var(--text);
  }
}

@media (prefers-contrast: less) {
  .decorative-divider {
    opacity: 0.65;
  }
}
```

Do not automatically change between light and dark mode because a contrast preference is present. Do not reduce required text, component, or focus contrast in response to `prefers-contrast: less`.

---

## 7. Focus and interactive states

Focus indicators must remain clearly visible in every supported theme and preference mode.

```css
:focus-visible {
  outline: 3px solid var(--focus);
  outline-offset: 3px;
}

@media (forced-colors: active) {
  :focus-visible {
    outline-color: Highlight;
  }
}
```

Evaluate:

- Contrast between the focus indicator and adjacent colours
- Contrast or other visible change between focused and unfocused states
- Indicator thickness and area
- Whether sticky headers, dialogs, or other content obscure the indicator
- Visibility at 200% and 400% zoom
- Visibility in forced-colours mode

Also test hover, active, selected, checked, expanded, current, disabled, validation-error, autofill, and visited-link states. A palette that passes for static text can still fail in its interaction states.

---

## 8. Colour independence

Do not convey information using colour alone.

```html
<p class="status status-error">
  <svg aria-hidden="true" focusable="false"><!-- warning icon --></svg>
  <strong>Error:</strong> Enter an email address.
</p>
```

Use text, icons, patterns, borders, shape, or position as supplementary cues. Ensure each cue remains available in light, dark, and forced-colours modes.

---

## 9. Images, SVGs, and embedded content

### SVG icons

Inline SVG icons can use `currentColor`:

```html
<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path fill="currentColor" d="M12 2 2 7v10c0 5.55 3.84 10.74 10 12 6.16-1.26 10-6.45 10-12V7Z"/>
</svg>
```

If an icon conveys information that is not already present as text, give it an appropriate accessible name. Decorative icons must not create redundant announcements.

### Transparent images and logos

Transparent images can disappear against an unexpected background. Provide a tested backing surface, outline, or theme-specific asset.

```css
.logo {
  padding: 0.5rem;
  background: var(--logo-background);
  border: 1px solid var(--border);
}
```

### Theme-specific images

```html
<picture>
  <source srcset="diagram-dark.svg" media="(prefers-color-scheme: dark)">
  <img src="diagram-light.svg" alt="Description of the diagram">
</picture>
```

If a manual override can differ from the system preference, `prefers-color-scheme` alone is insufficient for selecting the asset. Update the asset from the resolved application theme or design one asset that works in both modes.

Test charts, syntax highlighting, maps, screenshots, iframes, video players, canvas content, and third-party widgets separately.

---

## 10. Complex scripts and diacritics

Light and dark themes must not clip or obscure combining marks used in scripts such as Arabic and Hebrew.

- Use fonts with verified support for the required script and marks.
- Avoid fixed line heights that clip marks above or below the text.
- Avoid `overflow: hidden` on text containers unless clipping has been explicitly ruled out.
- Preserve `dir`, `lang`, `<bdi>`, and bidirectional isolation when applying a theme.
- Test real content at multiple font sizes and zoom levels in both themes.
- Use visual regression tests only in a controlled font and rendering environment; do not assume pixel diffs can determine whether text is readable.

Do not prescribe font smoothing or a universal line-height value. Rendering varies by font, platform, browser, script, and content.

---

## 11. Motion and transitions

Theme changes do not require animation. Immediate changes avoid unnecessary work and are the safest default.

If transitions provide a clear benefit, apply them only to major surfaces and controls. Do not attach transitions to the universal `*` selector.

```css
@media (prefers-reduced-motion: no-preference) {
  body,
  .site-header,
  .theme-selector {
    transition:
      background-color 0.15s ease,
      color 0.15s ease,
      border-color 0.15s ease;
  }
}
```

- Do not require animation to understand the change.
- Keep optional transitions brief and targeted.
- Do not animate theme changes when reduced motion is requested.
- Do not automatically animate changes based on time of day.

---

## 12. Data tables and zebra striping

Zebra striping can help some users track rows, but it is supplementary. Do not rely on alternating background colours alone to convey grouping or meaning.

```css
table {
  width: 100%;
  border-collapse: collapse;
  color: var(--text);
  background: var(--background);
}

tbody tr:nth-child(even) {
  background: var(--table-row-alternate);
}

th,
td {
  border-block-end: 1px solid var(--border);
}

@media (forced-colors: active) {
  tbody tr {
    border-block-end: 1px solid CanvasText;
  }
}
```

Requirements:

- Define row colours as theme tokens and validate them in every supported mode.
- Ensure text and interactive elements meet their contrast requirements on every row background.
- Retain row boundaries or another supplementary tracking cue when background colours disappear.
- Test selected, hovered, focused, and expanded rows.
- Do not prescribe an arbitrary percentage difference between stripe colours. Perceivability depends on the actual colours, display, context, and user.

---

## 13. Testing expectations

### Manual testing

- [ ] Follow the system light preference.
- [ ] Follow the system dark preference.
- [ ] If provided, select System, Light, and Dark manually.
- [ ] Reload the page and verify that an explicit selection persists.
- [ ] In System mode, change the operating-system preference while the page is open.
- [ ] Check for an incorrect flash during initial rendering.
- [ ] Use the complete selector with mouse, touch, keyboard, and a screen reader.
- [ ] Open the selector with Enter and Space.
- [ ] Move among radio choices with all expected arrow keys.
- [ ] Close with Escape and confirm that focus returns to the trigger.
- [ ] Tab away and confirm that the panel closes without trapping focus.
- [ ] Test at 200% and 400% zoom and at a 320 CSS-pixel viewport.
- [ ] Test text, controls, focus, hover, selected, disabled, error, and visited states.
- [ ] Enable forced colours and verify meaning, boundaries, icons, and focus.
- [ ] Test `prefers-contrast: more` and `prefers-contrast: less` where supported.
- [ ] Verify images, charts, code highlighting, transparent assets, and embedded content.
- [ ] Verify that colour is not the only cue.
- [ ] Test representative complex scripts and combining marks where applicable.

### Automated testing

- Run automated contrast checks in both resolved themes.
- Test the selector’s accessible name, expanded state, checked radio, and focus movement.
- Test persistence with valid, invalid, and unavailable storage.
- Test changes to the system preference while System is selected.
- Run accessibility tests in forced-colours emulation where the testing platform supports it.
- Validate authored CSS and CSS examples embedded in Markdown.
- Use visual regression tests for unexpected theme-specific rendering changes, not as a substitute for accessibility evaluation.

### CSS validation in continuous integration

Use Stylelint for authored stylesheets and `postcss-markdown` for fenced CSS examples in Markdown.

```json
{
  "scripts": {
    "lint:css": "stylelint 'assets/css/**/*.css'",
    "lint:css-docs": "stylelint '**/*.md' --custom-syntax postcss-markdown"
  },
  "devDependencies": {
    "postcss-markdown": "latest",
    "stylelint": "latest",
    "stylelint-config-standard": "latest"
  }
}
```

Run both commands in a dedicated pull-request lint job, alongside Markdown and link checks. Pin dependency versions through the lock file and review automated dependency updates before merging.

---

## 14. Definition of done

An implementation is complete when:

- All supported themes meet applicable WCAG 2.2 AA requirements.
- The system preference is respected by default.
- Manual selection, if present, provides System, Light, and Dark.
- The manual selector is operable with keyboard, touch, pointer, and assistive technology.
- Arrow-key navigation, Escape, focus departure, and focus restoration work as documented.
- The active mode and resolved theme remain distinguishable in the implementation.
- Browser-provided controls follow the resolved theme through `color-scheme`.
- Forced-colours and contrast preferences preserve content and functionality.
- Focus indicators and all component states remain visible.
- Information is not conveyed by colour alone.
- Images, graphics, tables, and embedded content work in every supported mode.
- Optional transitions are scoped and respect reduced-motion preferences.
- Manual, automated, CSS, and browser tests pass.

---

## References

### W3C specifications and guidance

- [WCAG 2.2 Understanding 1.4.3: Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- [WCAG 2.2 Understanding 1.4.11: Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)
- [WCAG 2.2 Understanding 2.4.7: Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html)
- [WCAG 2.2 Understanding 2.4.11: Focus Not Obscured (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html)
- [WCAG 2.2 Understanding 2.4.13: Focus Appearance](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html)
- [WAI-ARIA Authoring Practices: Radio Group Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/)
- [CSS Media Queries Level 5: prefers-color-scheme](https://www.w3.org/TR/mediaqueries-5/#prefers-color-scheme)
- [CSS Media Queries Level 5: prefers-contrast](https://www.w3.org/TR/mediaqueries-5/#prefers-contrast)
- [CSS Color Adjustment: forced colours](https://www.w3.org/TR/css-color-adjust-1/#forced)

### Additional technical references

- [MDN: color-scheme](https://developer.mozilla.org/docs/Web/CSS/color-scheme)
- [MDN: light-dark()](https://developer.mozilla.org/docs/Web/CSS/color_value/light-dark)
- [MDN: prefers-color-scheme](https://developer.mozilla.org/docs/Web/CSS/@media/prefers-color-scheme)
- [MDN: prefers-contrast](https://developer.mozilla.org/docs/Web/CSS/@media/prefers-contrast)
- [MDN: forced-colors](https://developer.mozilla.org/docs/Web/CSS/@media/forced-colors)
- [User Personalization and Accessibility Best Practices](./USER_PERSONALIZATION_ACCESSIBILITY_BEST_PRACTICES.md)

---

AGPL-3.0-or-later License - See LICENSE file for full text  
Copyright (c) 2026 Mike Gifford
