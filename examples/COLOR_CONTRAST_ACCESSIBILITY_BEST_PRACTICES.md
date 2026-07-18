---
title: Color Contrast Accessibility Best Practices
---

# Color Contrast Accessibility Best Practices

Use sufficient contrast so that people can read text, identify controls, understand graphics, and track keyboard focus. Do not use color as the only way to communicate meaning.

This guide targets WCAG 2.2 Level AA. Level AAA requirements are identified separately and are not presented as Level AA requirements.

---

## 1. Required Outcomes

A conforming implementation must:

- provide at least 4.5:1 contrast for normal text and images of text;
- provide at least 3:1 contrast for large text and images of large text;
- provide at least 3:1 contrast for visual information needed to identify user interface components and their states;
- provide at least 3:1 contrast for parts of graphics needed to understand the content;
- provide a visual cue other than color when color communicates meaning, state, or an available action;
- provide a visible keyboard focus indicator;
- preserve these outcomes in every supported theme and component state; and
- remain understandable when user agents replace author colors in forced-colors mode.

Do not treat a passing palette as proof that the finished interface passes. Contrast depends on the colors that are actually adjacent after opacity, gradients, images, overlays, states, and themes are applied.

---

## 2. WCAG 2.2 Requirements

| Success criterion | Level | Requirement |
|:---|:---:|:---|
| [1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html) | A | Color is not the only visual means of conveying information, prompting a response, or distinguishing an element. |
| [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) | AA | Text and images of text have at least 4.5:1 contrast, or 3:1 for large text. |
| [1.4.5 Images of Text](https://www.w3.org/WAI/WCAG22/Understanding/images-of-text.html) | AA | Use real text instead of images of text when the same presentation can be achieved with available technology, except when customizable or essential. |
| [1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) | AA | Visual information needed to identify components, states, and graphical objects has at least 3:1 contrast against adjacent colors. |
| [2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html) | AA | A keyboard-operable interface has a visible mode of operation in which focus is indicated. |
| [1.4.6 Contrast (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-enhanced.html) | AAA | Text has at least 7:1 contrast, or 4.5:1 for large text. |
| [2.4.13 Focus Appearance](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html) | AAA | The focus indicator meets minimum area and contrast-change requirements. |

WCAG thresholds are pass or fail values. Do not round a result such as 4.499:1 up to 4.5:1.

---

## 3. Prioritize by User Impact

Fix contrast problems in this order when time is limited:

1. Text and controls required to complete a task.
2. Keyboard focus indicators and component states.
3. Errors, warnings, required fields, and status messages.
4. Navigation, links, and labels.
5. Charts, diagrams, and other information-bearing graphics.
6. Supporting or secondary content.

Frequency matters, but it does not make a blocking problem more serious than an infrequent problem that prevents task completion.

---

## 4. Text Contrast

### Minimum ratios

| Text | WCAG 2.2 AA | WCAG 2.2 AAA |
|:---|:---:|:---:|
| Normal text | 4.5:1 | 7:1 |
| Large text | 3:1 | 4.5:1 |

For Latin text, WCAG defines large-scale text as at least:

- 18 point, approximately 24 CSS pixels, at normal weight; or
- 14 point, approximately 18.67 CSS pixels, when bold.

Treat thin or unusual typefaces cautiously. A combination can meet the computed threshold but remain difficult to read because of narrow strokes or antialiasing.

### Text covered by the requirement

The requirement includes:

- body text and headings;
- link text;
- button and form-control labels;
- placeholder text;
- text revealed on hover or focus;
- validation and status messages; and
- text rendered as an image.

Logotypes, purely decorative text, and text in an inactive component are among the defined exceptions. Do not extend those exceptions to brand colors used for ordinary content.

### Specify both sides of a color pair

If author CSS specifies a foreground without a background, or a background without a foreground, the other color may come from an unknown user preference.

```css
html {
  background: #ffffff;
  color: #1b1f23;
}

.notice {
  background: #f2f6fa;
  color: #243447;
}
```

### Prefer real text

Real text can reflow, resize, adapt to user styles, and change with the theme. Use an image of text only when the presentation is customizable or the particular presentation is essential.

```html
<!-- Prefer this. -->
<p class="campaign-title">Public services for everyone</p>

<!-- Avoid using a raster image only to reproduce styled text. -->
```

---

## 5. Non-text Contrast

WCAG 1.4.11 applies to visual information needed to identify a user interface component or its state, and to parts of a graphic needed to understand it.

Examples include:

- a checkbox boundary when that boundary identifies the control;
- a check mark that communicates the checked state;
- an icon in an icon-only button;
- a slider thumb and track needed to operate the slider;
- an error boundary when it communicates the error state; and
- lines, sectors, points, or symbols needed to read a chart.

The required visual information must have at least 3:1 contrast against the adjacent color or colors that a user must distinguish it from.

This does not mean that every decorative border must be 3:1. If text, shape, position, or another visual treatment already identifies the component and state, a low-contrast decorative border is not necessarily the required visual information.

### Native controls are a strong default

Browsers and operating systems can adapt native controls to user preferences. Replacing them creates responsibility for every state and mode.

```html
<label>
  <input type="checkbox" name="updates">
  Send me service updates
</label>
```

### If a control is customized, validate every state

```css
.checkbox {
  appearance: none;
  inline-size: 1.25rem;
  block-size: 1.25rem;
  border: 2px solid #59636e;
  border-radius: 0.2rem;
  background: #ffffff;
}

.checkbox:checked {
  border-color: #005ea8;
  background-color: #005ea8;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='none' stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2.5' d='m3 8 3 3 7-7'/%3E%3C/svg%3E");
}
```

Test the unchecked boundary against its background, the checked fill against the surrounding background, and the check mark against the checked fill. Do not rely on a comment claiming that a color pair passes. Measure the rendered combination.

### Use `currentColor` for adaptable icons

```html
<button class="icon-button" type="button" aria-label="Close dialog">
  <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
    <path d="m6 6 12 12M18 6 6 18"></path>
  </svg>
</button>
```

```css
.icon-button {
  color: #25313c;
}

.icon-button svg {
  inline-size: 1.5rem;
  block-size: 1.5rem;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-width: 2;
}
```

The button supplies the accessible name. The repeated SVG is hidden from assistive technology.

---

## 6. Do Not Rely on Color Alone

Add a visible text, shape, pattern, icon, or other non-color cue whenever color carries meaning.

### Required fields and errors

```html
<div class="field" data-state="error">
  <label for="email">
    Email address <span aria-hidden="true">(required)</span>
  </label>
  <input
    id="email"
    name="email"
    type="email"
    required
    aria-invalid="true"
    aria-describedby="email-error"
  >
  <p id="email-error" class="error-message">
    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
      <path d="M12 3 2 21h20L12 3Zm0 6v5m0 3v.01"></path>
    </svg>
    Enter an email address in the format name@example.com.
  </p>
</div>
```

```css
.field[data-state="error"] input {
  border: 3px solid #b10e1e;
}

.error-message {
  color: #8a0b18;
  font-weight: 700;
}

.error-message svg {
  inline-size: 1.25em;
  block-size: 1.25em;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  vertical-align: -0.2em;
}
```

The text identifies the error without color. Native `required` exposes the required state and enables browser behavior. `aria-invalid` exposes the current invalid state.

### Links in body text

Underlining links is the simplest dependable pattern.

```css
a {
  color: #005ea8;
  text-decoration-line: underline;
  text-decoration-thickness: max(1px, 0.08em);
  text-underline-offset: 0.15em;
}

a:visited {
  color: #5c2d91;
}
```

An exception documented in [WCAG technique G183](https://www.w3.org/WAI/WCAG22/Techniques/general/G183) permits links without a default underline when the link text differs from surrounding text by at least 3:1 and gains an additional non-color cue on hover and keyboard focus. That exception is harder to maintain and less obvious to users. Prefer persistent underlines in prose.

### Charts and status indicators

Use labels, symbols, line styles, or patterns in addition to color. A separate text table can provide equivalent data, but it does not automatically excuse an operable or information-bearing graphic from applicable contrast requirements.

---

## 7. Keyboard Focus

WCAG 2.2 Level AA requires a visible focus indicator under 2.4.7. WCAG 2.2 does not require Level AA projects to satisfy 2.4.13, because Focus Appearance is Level AAA.

WCAG 1.4.11 may apply to an author-created focus indicator as visual information needed to identify the focused state. Level AAA criterion 2.4.13 separately measures the indicator's area and the contrast change between the same pixels in focused and unfocused states.

### Start with the browser indicator

Do not remove the browser outline unless the replacement has been tested on every surface where it appears.

```css
:focus-visible {
  outline: 3px solid #005fcc;
  outline-offset: 3px;
}
```

### Use a two-color indicator on varied surfaces

```css
:focus-visible {
  outline: 3px solid #ffffff;
  outline-offset: 2px;
  box-shadow: 0 0 0 5px #111111;
}

@media (forced-colors: active) {
  :focus-visible {
    outline: 3px solid Highlight;
    outline-offset: 3px;
    box-shadow: none;
  }
}
```

A two-color indicator is more likely to remain visible over mixed light and dark surfaces. It is not self-validating. Test its geometry, clipping, adjacent colors, component states, and forced-colors behavior.

Do not add `:focus:not(:focus-visible) { outline: none; }` as a universal rule. Browsers already determine when `:focus-visible` should match, and scripts, platform behavior, or unsupported contexts can make a blanket suppression risky.

---

## 8. Themes and Semantic Color Tokens

Validate complete foreground-background pairs, not isolated colors. Semantic tokens make intended pairings explicit and reduce hard-coded theme failures.

```css
:root {
  color-scheme: light dark;

  --surface: light-dark(#ffffff, #15191e);
  --surface-subtle: light-dark(#f2f6fa, #242a31);
  --text: light-dark(#1b1f23, #f4f6f8);
  --text-muted: light-dark(#4d5966, #c3cbd4);
  --link: light-dark(#005ea8, #73b7f2);
  --control-border: light-dark(#59636e, #a7b0ba);
}

html {
  background: var(--surface);
  color: var(--text);
}

.card {
  background: var(--surface-subtle);
  color: var(--text);
  border: 1px solid var(--control-border);
}

.card a {
  color: var(--link);
}
```

`light-dark()` is useful when the site's browser support policy permits it. A custom-property fallback or separate media-query declarations may still be needed for older browsers.

For a manual theme selector, use the same semantic tokens and override them with a root attribute. The implementation details are covered in [Light/Dark Mode Accessibility Best Practices](./LIGHT_DARK_MODE_ACCESSIBILITY_BEST_PRACTICES.md).

### Do not assume CSS color functions guarantee accessibility

`color-mix()` can create a color between two inputs, but it does not target a WCAG contrast ratio. `contrast-color()` chooses a contrasting value from a limited result set in current implementations, but it does not replace validation of text, component, and state requirements. Treat both as implementation aids, not conformance tests.

---

## 9. Variable Backgrounds, Opacity, and Overlays

For text over a gradient, image, video, or translucent surface, test the least favorable rendered region that can occur in normal use.

Use an opaque or sufficiently opaque backing surface when the underlying content cannot be controlled.

```css
.hero-title {
  display: inline;
  padding: 0.15em 0.35em;
  color: #ffffff;
  background: #16202a;
  box-decoration-break: clone;
}
```

Be careful with opacity on a parent element. It blends the text and background together with content behind the component, changing both sides of the contrast pair.

```css
/* Avoid reducing the opacity of the entire component. */
.secondary-card {
  opacity: 0.6;
}

/* Prefer explicit, validated colors. */
.secondary-card {
  background: #f2f6fa;
  color: #4d5966;
}
```

Automated tools may report variable backgrounds as incomplete or needing review. That is a limitation of the test, not evidence that the content passes.

---

## 10. States That Need Separate Validation

Check each component in all states that users can encounter:

- default;
- hover;
- keyboard focus;
- active or pressed;
- selected or checked;
- visited;
- invalid or error;
- success, warning, and informational;
- disabled or inactive;
- browser autofill;
- text selection; and
- open, expanded, or current.

Repeat the checks in each supported light, dark, or custom theme.

### Disabled controls

Inactive user interface components are excepted from the specific contrast requirements in 1.4.3 and 1.4.11. The exception is not a design target.

- Keep disabled controls identifiable when practical.
- Do not communicate the disabled state only by color.
- Explain why a control is unavailable when that information is needed to continue.
- Consider whether the control needs to be disabled at all. A submit attempt followed by clear validation can be easier to understand than an unexplained unavailable button.

```html
<button type="submit" disabled aria-describedby="submit-help">Submit</button>
<p id="submit-help">Add at least one contact before submitting.</p>
```

---

## 11. User Contrast Preferences

`prefers-contrast` and `forced-colors` address different situations. Do not treat either as a light/dark theme selector.

### `prefers-contrast`

Use `prefers-contrast: more` as an enhancement. The default presentation must already meet the project's conformance target.

```css
@media (prefers-contrast: more) {
  :root {
    --text-muted: var(--text);
    --control-border: currentColor;
  }

  a {
    text-decoration-thickness: 0.15em;
  }

  :focus-visible {
    outline-width: 4px;
  }
}
```

### Forced colors

In forced-colors mode, the user agent maps author colors to a limited system palette. Authors remain responsible for preserving meaning, state, and operability.

Use native controls and semantic HTML first. Add targeted corrections only where testing shows that information disappears.

```css
@media (forced-colors: active) {
  .status-icon,
  .icon-button svg {
    fill: none;
    stroke: currentColor;
  }

  [aria-current="page"] {
    border-block-end: 0.25rem solid currentColor;
  }

  [aria-invalid="true"] {
    border: 3px solid Mark;
  }
}
```

Avoid `forced-color-adjust: none` unless preserving author colors is essential and the result has been tested with multiple user-selected system palettes. It opts the element out of protections the mode is intended to provide.

---

## 12. Testing

### Manual testing

1. Inspect the actual foreground and background colors in the browser.
2. Measure text pairs without rounding the result.
3. Identify the visual information required to find each component and understand each state.
4. Measure that information against the relevant adjacent color or colors.
5. Tab through the page and inspect focus on every background.
6. Test all supported themes and component states.
7. Test Windows High Contrast or browser forced-colors emulation.
8. Inspect gradients, images, opacity, overlays, sticky content, and text selection manually.
9. Use a grayscale or color-vision simulation as a review aid, then verify that meaning does not depend on color alone.

Simulations do not reproduce a person's lived experience and do not replace standards-based testing.

### Automated testing

Automated tools can find many computable text contrast failures. They cannot reliably determine every background, required graphical detail, color-only distinction, focus-indicator geometry, or forced-colors failure.

Use automation to support manual review, not to replace it.

```javascript
// tests/contrast.spec.js
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const theme of ["light", "dark"]) {
  test(`automated accessibility scan: ${theme}`, async ({ page }) => {
    await page.goto("/");
    await page.locator("html").evaluate((element, value) => {
      element.dataset.theme = value;
    }, theme);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();

    expect(results.violations).toEqual([]);
  });
}
```

This example assumes the project already starts its test server through the Playwright `webServer` configuration. A CI command that scans `localhost` without starting and waiting for the application is incomplete.

Do not cite axe rules that do not exist. In particular, `focus-visible` and `focus-order-semantics` are not axe-core rule IDs. Keyboard focus appearance still requires manual testing.

### Design-token checks

Maintain an explicit list of approved token pairings and test those pairs whenever tokens change. Do not test every token against every other token because many combinations are not valid uses.

```json
[
  { "foreground": "text", "background": "surface", "minimum": 4.5 },
  { "foreground": "link", "background": "surface", "minimum": 4.5 },
  { "foreground": "control-border", "background": "surface", "minimum": 3 }
]
```

Runtime tests are still required because component CSS can introduce opacity, overlays, and combinations that token tests do not cover.

---

## 13. CSS Validation Checks

Add CSS validation at two points:

1. In the local development command, so authors receive immediate feedback.
2. In continuous integration, so invalid CSS cannot be merged unnoticed.

Use the [W3C CSS Validation Service](https://jigsaw.w3.org/css-validator/) for standards validation where practical, and a maintained linter such as [Stylelint](https://stylelint.io/) for repository rules and fast feedback.

CSS validation does not measure contrast. It catches invalid declarations that can prevent intended colors, focus styles, or forced-colors fixes from applying.

---

## 14. WCAG 3 and APCA

WCAG 3.0 is a W3C Working Draft. Its requirements and conformance model can change, and it must not be used as a replacement for the WCAG version required by a law, policy, or project.

APCA has informed contrast research and earlier WCAG 3 work. Do not present fixed APCA thresholds as current WCAG requirements. Teams may use experimental contrast methods as supplemental design evidence, but they must continue to test against the applicable WCAG 2.x requirements for conformance.

See the [current WCAG 3 Working Draft](https://www.w3.org/TR/wcag-3.0/) for its present status rather than relying on copied threshold tables.

---

## 15. Common Failures

| Failure | Correction |
|:---|:---|
| Muted or placeholder text is too faint. | Measure it as text and meet the applicable text threshold. |
| A token is labeled “accessible” without naming its paired background. | Document and test approved foreground-background pairs. |
| A pale border is assumed to identify a control. | Ensure the required component boundary or other identifying visual information reaches 3:1. |
| Errors or required fields use red as the only cue. | Add visible text, an icon, a pattern, or another non-color cue. |
| Links in prose differ only by color. | Keep a persistent underline. |
| Focus works on white but disappears on cards or images. | Test every surface and use a robust one- or two-color indicator. |
| `outline: none` removes browser focus with no dependable replacement. | Preserve the browser indicator or provide a tested replacement. |
| Light mode passes but dark mode, visited links, or hover states fail. | Test every state in every supported theme. |
| Text is placed directly over an uncontrolled image or gradient. | Add a controlled backing surface or test the least favorable region. |
| `opacity` is used to create secondary text. | Use an explicit foreground color validated against the final background. |
| Custom graphics disappear in forced-colors mode. | Use semantic HTML, `currentColor`, system colors, and targeted forced-colors fixes. |
| An automated scan reports no violations, so the page is declared conformant. | Complete manual color, focus, state, graphic, and forced-colors testing. |

---

## 16. Definition of Done

- [ ] Normal text and images of text meet 4.5:1 or a documented exception.
- [ ] Large text and images of large text meet 3:1 or a documented exception.
- [ ] Required component boundaries, icons, controls, and states meet 3:1 against relevant adjacent colors.
- [ ] Required graphical information meets 3:1 against relevant adjacent colors.
- [ ] Color is never the only visual cue for meaning, state, or action.
- [ ] Links in prose have a dependable non-color distinction.
- [ ] Focus is visible on every keyboard-operable element and on every surface.
- [ ] Every supported theme and component state has been tested.
- [ ] Images, gradients, transparency, overlays, placeholder text, visited links, autofill, and text selection have been reviewed.
- [ ] Forced-colors mode preserves meaning and operability.
- [ ] Automated tests run against rendered pages, with manual review for incomplete coverage.
- [ ] Approved design-token pairings are documented and tested.
- [ ] CSS validation and linting run locally and in continuous integration.

---

## 17. Related Guides

- [Light/Dark Mode Accessibility Best Practices](./LIGHT_DARK_MODE_ACCESSIBILITY_BEST_PRACTICES.md)
- [SVG Accessibility Best Practices](./SVG_ACCESSIBILITY_BEST_PRACTICES.md)
- [Charts and Graphs Accessibility Best Practices](./CHARTS_GRAPHS_ACCESSIBILITY_BEST_PRACTICES.md)
- [Forms Accessibility Best Practices](./FORMS_ACCESSIBILITY_BEST_PRACTICES.md)
- [Keyboard Accessibility Best Practices](./KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md)
- [User Personalization Accessibility Best Practices](./USER_PERSONALIZATION_ACCESSIBILITY_BEST_PRACTICES.md)
- [Print Accessibility Best Practices](./PRINT_ACCESSIBILITY_BEST_PRACTICES.md)

---

## References

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Understanding 1.4.1: Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html)
- [Understanding 1.4.3: Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- [Understanding 1.4.5: Images of Text](https://www.w3.org/WAI/WCAG22/Understanding/images-of-text.html)
- [Understanding 1.4.11: Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)
- [Understanding 2.4.7: Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html)
- [Understanding 2.4.13: Focus Appearance](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html)
- [Technique G183: Links identified by color and an additional visual cue](https://www.w3.org/WAI/WCAG22/Techniques/general/G183)
- [Technique C40: Two-color focus indicator](https://www.w3.org/WAI/WCAG22/Techniques/css/C40)
- [CSS Color Adjustment Module Level 1](https://www.w3.org/TR/css-color-adjust-1/)
- [Media Queries Level 5: `prefers-contrast`](https://www.w3.org/TR/mediaqueries-5/#prefers-contrast)
- [WCAG 3.0 Working Draft](https://www.w3.org/TR/wcag-3.0/)

### Machine-readable standards

For AI systems and automated tooling, see [wai-yaml-ld](https://github.com/mgifford/wai-yaml-ld):

- [WCAG 2.2 normative content in YAML](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wcag-2.2-normative.yaml)
- [Standards link graph in YAML](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/standards-link-graph.yaml)

---

AGPL-3.0-or-later License - See LICENSE file for full text  
Copyright (c) 2026 Mike Gifford
