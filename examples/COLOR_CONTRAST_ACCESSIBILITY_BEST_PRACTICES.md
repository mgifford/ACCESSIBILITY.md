---
title: Color Contrast Accessibility Best Practices
---

# Color Contrast Accessibility Best Practices

This document defines accessibility requirements for color contrast in web interfaces, ensuring all users can perceive and distinguish content regardless of vision ability, ambient lighting, or display settings. It covers WCAG 2.2 Level AA requirements for text, non-text elements, and focus indicators — as well as emerging guidance on the Advanced Perceptual Contrast Algorithm (APCA) and forced-colors mode.

Color perception varies greatly across users. People with low vision, color vision deficiencies, or age-related vision changes all depend on sufficient contrast. Meeting contrast requirements benefits everyone: high-contrast interfaces are also easier to read in bright sunlight, on low-quality displays, and in print.

---

## 1. Core Principle

Sufficient contrast between foreground and background colors is a prerequisite for users to read text, identify UI components, perceive graphical content, and track keyboard focus. Color alone must never be the sole means of conveying information.

All visual interface elements that convey information or require user interaction must meet the applicable WCAG 2.2 Level AA contrast thresholds listed in this document. Contrast must be maintained in **light mode, dark mode, and forced-colors (high contrast) mode**.

---

## 2. WCAG 2.2 Requirements Overview

| Success Criterion | Level | Requirement | Applies To |
|:---|:---:|:---|:---|
| 1.4.1 Use of Color | A | Color must not be the only visual means of conveying information | All content |
| 1.4.3 Contrast (Minimum) | AA | 4.5:1 for normal text; 3:1 for large text | Text and images of text |
| 1.4.6 Contrast (Enhanced) | AAA | 7:1 for normal text; 4.5:1 for large text | Text and images of text |
| 1.4.11 Non-text Contrast | AA | 3:1 against adjacent colors | UI components, graphical objects |
| 2.4.13 Focus Appearance | AA | Focus indicator area ≥ perimeter of component × CSS pixels; 3:1 contrast change | Keyboard focus indicators |

> **WCAG 2.2 note:** 2.4.13 Focus Appearance is new in WCAG 2.2 at Level AA. Teams that previously targeted 2.4.7 (Focus Visible, AA) must also now satisfy 2.4.13.

---

## 3. Text Contrast (WCAG 1.4.3)

### Contrast ratio thresholds

| Text type | Minimum (Level AA) | Enhanced (Level AAA) |
|:---|:---:|:---:|
| Normal text (below 18pt / 14pt bold) | **4.5:1** | 7:1 |
| Large text (18pt+ / 14pt+ bold) | **3:1** | 4.5:1 |
| Logotypes (text in logos) | Exempt | Exempt |
| Incidental text (purely decorative) | Exempt | Exempt |
| Disabled controls | Exempt | Exempt |

### What counts as "large text"

- **18pt** (approximately 24 CSS `px`) or larger in regular weight
- **14pt** (approximately 18.67 CSS `px`) or larger in bold weight

### Preferred CSS pattern — text colors using custom properties

```css
:root {
  /* Normal body text — 4.5:1 against white background */
  --color-text:        #1a1a1a;   /* contrast vs #fff: 16.75:1 ✓ */
  --color-text-muted:  #595959;   /* contrast vs #fff: 7.0:1   ✓ */

  /* Large heading text — may use 3:1 minimum */
  --color-heading:     #333333;   /* contrast vs #fff: 12.63:1 ✓ */

  /* Link text — meets 4.5:1 against white and has non-color distinction */
  --color-link:        #0066cc;   /* contrast vs #fff: 4.52:1  ✓ */

  --color-background:  #ffffff;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-text:        #e8e8e8;   /* contrast vs #1a1a1a: 13.61:1 ✓ */
    --color-text-muted:  #b0b0b0;   /* contrast vs #1a1a1a:  7.0:1  ✓ */
    --color-heading:     #f0f0f0;
    --color-link:        #66aaff;   /* contrast vs #1a1a1a: 5.74:1  ✓ */
    --color-background:  #1a1a1a;
  }
}
```

### Images of text

Text embedded in images must meet the same 4.5:1 (or 3:1 large text) requirement. Prefer real text rendered in CSS to avoid this constraint and gain responsive scaling.

### Avoid

```css
/* Bad — 2.4:1 contrast, fails 1.4.3 */
.placeholder {
  color: #aaaaaa;
}

/* Bad — decorative styling applied to informative text */
.note {
  color: #888;  /* fails against white background */
}
```

---

## 4. Non-text Contrast (WCAG 1.4.11)

Non-text elements that are required for users to understand or operate the interface must meet a **3:1 contrast ratio** against adjacent colors.

### Applies to

- Form input borders (text fields, checkboxes, radio buttons, select dropdowns)
- Interactive UI component boundaries (buttons without text, sliders, toggles)
- Icons and graphical objects that convey meaning
- Charts and data visualization elements that encode information
- Status indicators (progress bars, meter fills)

### Does not apply to

- Decorative graphics or illustrations that do not convey meaning
- Inactive or disabled components
- Logos and brand marks
- Information also available in text (the graphical element is supplementary)

### Form control pattern

```css
/* Checkbox — border must contrast 3:1 against its background */
input[type="checkbox"] {
  /* Custom styled checkbox */
  --checkbox-border: #767676; /* 4.54:1 against #fff ✓ */
  appearance: none;
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid var(--checkbox-border);
  border-radius: 3px;
}

input[type="checkbox"]:checked {
  background-color: #0066cc;
  border-color: #0066cc;
  /* The check mark SVG fill must contrast 3:1 against #0066cc */
  background-image: url("data:image/svg+xml,…"); /* white checkmark ✓ */
}
```

### Icon pattern

```html
<!-- Good: icon whose meaning must be communicated has sufficient contrast -->
<button aria-label="Close dialog">
  <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
    <!-- Icon paths rendered in #595959 — 7.0:1 against white background ✓ -->
    <path fill="#595959" d="M18 6L6 18M6 6l12 12" stroke-width="2"/>
  </svg>
</button>
```

---

## 5. Use of Color (WCAG 1.4.1)

Color alone must not be the sole means of conveying information, indicating an action, prompting a response, or distinguishing a visual element. A second, non-color cue must always accompany color.

### Common failure patterns

```html
<!-- Bad: required field indicated only by red label color -->
<label style="color: red;">Email address</label>
<input type="email">

<!-- Bad: error state communicated only by red border -->
<input type="email" style="border-color: red;">

<!-- Bad: success/error icons differentiated only by color -->
<span class="dot dot--green"></span> Active
<span class="dot dot--red"></span>  Inactive
```

### Preferred patterns

```html
<!-- Good: required field — asterisk + color -->
<label>
  Email address
  <span aria-hidden="true" class="required-marker">*</span>
  <span class="sr-only">(required)</span>
</label>
<input type="email" aria-required="true">

<!-- Good: error state — icon + text + color + border -->
<div class="field field--error">
  <label for="email">Email address</label>
  <input id="email" type="email" aria-describedby="email-error" aria-invalid="true">
  <p id="email-error" class="error-message">
    <svg role="img" aria-label="Error" class="icon-error" aria-hidden="true">
      <use href="#icon-exclamation"></use>
    </svg>
    Please enter a valid email address.
  </p>
</div>

<!-- Good: status badges — shape/icon/text + color -->
<span class="badge badge--success">
  <svg role="img" aria-label="Active" aria-hidden="true" focusable="false">
    <use href="#icon-check"></use>
  </svg>
  Active
</span>
<span class="badge badge--error">
  <svg role="img" aria-label="Inactive" aria-hidden="true" focusable="false">
    <use href="#icon-x"></use>
  </svg>
  Inactive
</span>
```

### Link distinction from surrounding text

Links within paragraphs must be distinguishable from surrounding non-link text by more than color alone when the surrounding text has contrast of 3:1 or greater. Use underline (the browser default) or another non-color visual difference.

```css
/* Good: underline preserved, plus sufficient color contrast */
a {
  color: #0066cc;
  text-decoration: underline;
}

/* Acceptable: underline visible on hover/focus — only when the link contrast
   against the body text is 3:1 or greater (WCAG technique G183) */
a {
  color: #0066cc;         /* 4.52:1 vs white background */
  text-decoration: none;
}
a:hover,
a:focus {
  text-decoration: underline;
}
/* However, this pattern still requires 3:1 contrast between #0066cc and
   surrounding body text color (e.g., #1a1a1a) — verify with a tool */
```

---

## 6. Focus Appearance (WCAG 2.4.13)

WCAG 2.2 adds **2.4.13 Focus Appearance** at Level AA. A visible keyboard focus indicator must:

1. Enclose the focused component (or its text/icon) with a focus indicator area of at least the **perimeter of the component** (in CSS pixels) times 2 CSS pixels in thickness.
2. Have a **contrast ratio of at least 3:1** between the focused and unfocused states.
3. Have a **contrast ratio of at least 3:1** against every adjacent color in the unfocused state.

> **Simpler mental model:** The focus ring must be clearly visible (thick enough, high enough contrast) and not obscured by other content.

### Preferred CSS pattern — visible focus ring

```css
/* Universal focus style using CSS custom properties */
:root {
  --focus-ring-color:  #0066cc;
  --focus-ring-width:  3px;
  --focus-ring-offset: 2px;
}

/* Remove default outline and replace with a consistent, high-contrast ring */
:focus-visible {
  outline: var(--focus-ring-width) solid var(--focus-ring-color);
  outline-offset: var(--focus-ring-offset);
  /* Ensure the ring is visible against both light and dark backgrounds */
  box-shadow: 0 0 0 calc(var(--focus-ring-width) + var(--focus-ring-offset))
              #ffffff; /* White halo ensures visibility on dark backgrounds */
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --focus-ring-color: #99ccff; /* Lighter blue — visible on dark backgrounds */
  }
}
```

### Using the `:focus-visible` pseudo-class

`:focus-visible` shows the focus indicator only for keyboard navigation, hiding it for mouse/touch interaction. This improves aesthetics for pointer users while preserving accessibility for keyboard users.

```css
/* Only show custom ring for keyboard focus — never suppress focus entirely */
:focus:not(:focus-visible) {
  outline: none;
}
:focus-visible {
  outline: 3px solid #0066cc;
  outline-offset: 2px;
}
```

### Avoid

```css
/* NEVER do this — completely removes focus visibility */
:focus {
  outline: none;
}

/* NEVER do this without providing an alternative focus style */
*:focus {
  outline: 0 !important;
}
```

### C40 technique — focus offset for contrast

When the default focus ring appears on a colored background that reduces its contrast, use `outline-offset` combined with a contrasting background or double-ring pattern (WCAG technique C40):

```css
/* C40: Two-color focus indicator — works on both light and dark surfaces */
:focus-visible {
  outline: 3px solid #000000;   /* Dark outer ring */
  outline-offset: 1px;
  box-shadow: 0 0 0 5px #ffffff; /* White inner ring via box-shadow */
}
```

---

## 7. Evaluating Contrast Ratios

### The contrast ratio formula

WCAG contrast ratios are calculated using relative luminance (L) as defined in WCAG 2.x:

```
Contrast Ratio = (L1 + 0.05) / (L2 + 0.05)

Where L1 is the relative luminance of the lighter color
and   L2 is the relative luminance of the darker color.
```

This formula is based on the sRGB color space. It has limitations for colors of similar luminance but different hue (e.g., blue on red) — see [APCA](#10-apca--the-emerging-standard) for the next generation approach.

### Recommended contrast-checking tools

| Tool | Use case |
|:---|:---|
| [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) | Quick manual checks — text contrast |
| [Accessible Colors](https://accessible-colors.com/) | Find the closest accessible color |
| [Colour Contrast Analyser (TPGi)](https://vispero.com/lp/color-contrast-checker/) | Desktop app for sampling on-screen colors |
| [axe DevTools](https://www.deque.com/axe/devtools/) | Browser extension with contrast violation detection |
| [Colour Contrast Checker (Deque)](https://dequeuniversity.com/rules/axe/4.9/color-contrast) | Automated rule documentation |
| [apcacontrast.com](https://apcacontrast.com/) | APCA-based contrast evaluation |
| [Stark (Figma/Sketch plugin)](https://www.getstark.co/) | Design-time contrast checking |
| [Chrome DevTools CSS Overview](https://developer.chrome.com/docs/devtools/) | Browser-based audit of contrast issues |

### Testing programmatically with axe-core

```javascript
// Example: run contrast checks with axe-core
const axe = require("axe-core");

axe.run(document, {
  runOnly: {
    type: "rule",
    values: ["color-contrast", "color-contrast-enhanced"]
  }
}, (err, results) => {
  if (err) throw err;
  console.log("Contrast violations:", results.violations);
});
```

---

## 8. CSS Custom Properties for Accessible Color Palettes

Centralizing all design-system colors as CSS custom properties makes contrast validation and theming manageable at scale.

### Semantic color token pattern

```css
/* Design token layer — raw color values */
:root {
  /* Neutral scale */
  --color-neutral-0:   #ffffff;
  --color-neutral-100: #f5f5f5;
  --color-neutral-200: #e8e8e8;
  --color-neutral-600: #595959;  /* 7.0:1 on #fff */
  --color-neutral-700: #404040;  /* 9.73:1 on #fff */
  --color-neutral-900: #1a1a1a;  /* 16.75:1 on #fff */

  /* Brand color — verify contrast before use as text */
  --color-brand-500:   #0066cc;  /* 4.52:1 on #fff — OK for normal text ✓ */
  --color-brand-700:   #004c99;  /* 7.59:1 on #fff — OK for all text  ✓ */

  /* Semantic layer — component usage */
  --color-text-primary:   var(--color-neutral-900);
  --color-text-secondary: var(--color-neutral-600);
  --color-text-link:      var(--color-brand-500);
  --color-surface:        var(--color-neutral-0);
  --color-border:         var(--color-neutral-200); /* 3:1 for non-text ✓ */
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-text-primary:   var(--color-neutral-200);
    --color-text-secondary: #a0a0a0;  /* 7.11:1 on #1a1a1a ✓ */
    --color-text-link:      #66aaff;  /* 5.74:1 on #1a1a1a ✓ */
    --color-surface:        var(--color-neutral-900);
    --color-border:         #444444;  /* 3.1:1 vs #1a1a1a ✓ */
  }
}
```

### Always use semantic tokens in component CSS

```css
/* Good: references the semantic token, works in all themes */
.card {
  background-color: var(--color-surface);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
}

/* Bad: hard-coded value that may fail in dark mode */
.card {
  background-color: #ffffff;
  color: #333;  /* Not guaranteed to meet 4.5:1 in all themes */
}
```

---

## 9. Forced Colors Mode (High Contrast)

Windows High Contrast Mode and the CSS `forced-colors` media query replace author colors with a small set of system-defined colors. All contrast obligations are delegated to the operating system, but interfaces can break if they rely on CSS `background-color` or `color` for information.

### Key system color keywords

```css
@media (forced-colors: active) {
  /* These keywords map to the user's chosen system colors */
  .button {
    background-color: ButtonFace;
    color: ButtonText;
    border: 2px solid ButtonBorder;
  }

  .button:hover {
    background-color: Highlight;
    color: HighlightText;
  }

  /* Restore visibility of SVG icons hidden by fill:none */
  .icon {
    forced-color-adjust: auto; /* default; let the browser apply system colors */
  }

  /* Preserve a decorative gradient that also serves as a separator */
  .divider {
    forced-color-adjust: none;
    background: ButtonText; /* Manually map to a system color */
  }
}
```

### Transparency and pseudo-elements

Custom focus rings or decorative indicators built with `box-shadow`, `background-color`, or `::before`/`::after` pseudo-elements may disappear in forced-colors mode. Use `outline` for focus indicators — it is preserved in forced-colors mode by default.

```css
/* Good: outline is forced-colors-safe */
:focus-visible {
  outline: 3px solid Highlight;
  outline-offset: 2px;
}

/* Risk: box-shadow may not render in forced-colors mode */
:focus-visible {
  box-shadow: 0 0 0 3px #0066cc; /* May be suppressed */
}
```

### Testing forced-colors mode

- Enable **High Contrast Mode** in Windows Accessibility settings
- In Chrome DevTools → Rendering panel → "Emulate CSS media feature forced-colors: active"
- In Firefox, type `about:config` → `ui.forcedColors: 1`

---

## 10. APCA — The Emerging Standard

The **Advanced Perceptual Contrast Algorithm (APCA)** is being developed by the W3C Silver Task Force as a candidate replacement for the WCAG 2.x contrast ratio formula. APCA models human contrast perception more accurately than the current luminance-based ratio, particularly for:

- Dark text on light backgrounds vs. light text on dark backgrounds (the two are not symmetric)
- Thin strokes and small font sizes (which require higher contrast than large text)
- Saturated colors such as pure red or blue (which the WCAG 2.x formula handles poorly)

### Current status

APCA is not yet required by WCAG 2.2. It is expected to appear in WCAG 3.0. Teams adopting APCA today should **continue to meet WCAG 2.2 AA requirements** in parallel and treat APCA as supplemental guidance.

### APCA lightness contrast (Lc) thresholds (informational)

| Content type | Minimum Lc | Recommended Lc |
|:---|:---:|:---:|
| Normal body text (16px / 400 weight) | 60 | 75 |
| Large heading text (24px+ / 700 weight) | 45 | 60 |
| UI component labels | 45 | 60 |
| Placeholder / muted text | 30 | 45 |

Lc values are positive for dark-on-light and negative for light-on-dark; only the absolute value is used for threshold comparisons.

### Evaluating APCA contrast

```javascript
// Using the APCA-W3 package (github.com/Myndex/SAPC-APCA)
import { APCAcontrast, sRGBtoY } from "apca-w3";

const textColor       = "#1a1a1a";
const backgroundColor = "#ffffff";

const Lc = APCAcontrast(sRGBtoY(backgroundColor), sRGBtoY(textColor));
// Lc ≈ 106 — well above 75 threshold for normal body text ✓
console.log(`APCA Lc: ${Math.abs(Lc).toFixed(1)}`);
```

---

## 11. Disabled State Contrast

Disabled controls are **exempt** from WCAG 1.4.3 and 1.4.11 contrast requirements. However, this exemption exists because a disabled state signals to the user that the control is not currently operable — not as license to make disabled content unreadable. Consider these practices:

- Provide a clear visual distinction between disabled and enabled states beyond reduced opacity
- Include a tooltip or instructional text explaining when/why a control is disabled
- Avoid relying solely on reduced opacity (e.g., `opacity: 0.4`) — this does not meet any WCAG criterion but is a common pattern

```html
<!-- Good: disabled state with explanatory context -->
<button disabled aria-describedby="submit-note">Submit</button>
<p id="submit-note">Complete all required fields to enable the Submit button.</p>
```

---

## 12. Testing and Validation Checklist

### Automated checks

- [ ] Run axe-core `color-contrast` rule against all pages
- [ ] Run `color-contrast-enhanced` rule for AAA coverage
- [ ] Validate focus indicator contrast with `focus-order-semantics` and `focus-visible` axe rules
- [ ] Integrate contrast checks into CI pipeline using [@axe-core/cli](https://www.npmjs.com/package/@axe-core/cli) or pa11y

### Manual checks

- [ ] Check text contrast for all text sizes using a contrast checker tool
- [ ] Check non-text contrast for all form controls, icons, and data visualizations
- [ ] Verify focus ring is visible on all interactive elements in default and dark modes
- [ ] Test in Windows High Contrast / forced-colors mode
- [ ] Test with browser zoom at 200% and 400% (contrast issues can appear at scale)
- [ ] Review states: default, hover, focus, active, visited, error, disabled

### Color-independence check

- [ ] View the page in grayscale (Chrome DevTools → CSS media feature `prefers-color-scheme: light`, then add grayscale filter)
- [ ] Confirm all information conveyed by color is also conveyed by text, icons, or patterns

### Automated CI example

```yaml
# .github/workflows/a11y-contrast.yml
name: Accessibility — Contrast Check

on: [push, pull_request]

jobs:
  contrast:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "22"
      - run: npm ci
      - run: npm run build
      - run: |
          npx @axe-core/cli http://localhost:3000 \
            --tags wcag2aa \
            --disable "color-contrast-enhanced"
```

---

## 13. Common Mistakes

| Mistake | Why it fails | Fix |
|:---|:---|:---|
| Removing focus outline with `outline: none` | Focus invisible for keyboard users (2.4.7, 2.4.13) | Replace with visible custom focus style |
| Placeholder text in form fields uses low-contrast gray | Placeholder falls below 4.5:1 (1.4.3) | Use a placeholder color ≥ 4.5:1 or design labels outside the field |
| Error states shown only with a red border or red text | Color is sole cue for error (1.4.1) | Add error icon, text label, and `aria-invalid` |
| Contrast checked only in light mode | Dark mode or high contrast mode may fail | Test all modes |
| Overlay components (modals, tooltips) assume a white background | Background may vary (1.4.3) | Ensure overlay has opaque background with verified contrast |
| Disabled controls appear nearly invisible | Technically exempt but confusing | Add explanatory text about why a control is disabled |
| Gradient background behind text | Contrast ratio varies across the gradient (1.4.3) | Verify contrast at the lowest-contrast region, or use a solid overlay |
| Icon-only buttons with low-contrast icons | Icon fails 3:1 non-text requirement (1.4.11) | Ensure icon is rendered in a color with 3:1 contrast against its background |
| SVG `fill` not inheriting theme colors | SVG colors may not adapt in forced-colors mode | Use `currentColor` and CSS variables for SVG fills |

---

## 14. WCAG 2.2 Success Criterion Mapping

| SC | Title | Level | Summary |
|:---|:---|:---:|:---|
| [1.4.1](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html) | Use of Color | A | Color is not the sole conveyor of information |
| [1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) | Contrast (Minimum) | AA | 4.5:1 normal text; 3:1 large text |
| [1.4.6](https://www.w3.org/WAI/WCAG22/Understanding/contrast-enhanced.html) | Contrast (Enhanced) | AAA | 7:1 normal text; 4.5:1 large text |
| [1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) | Non-text Contrast | AA | 3:1 for UI components and graphical objects |
| [2.4.7](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html) | Focus Visible | AA | Keyboard focus indicator is visible |
| [2.4.13](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html) | Focus Appearance | AA | Focus indicator must be sufficiently large and high-contrast |

---

## 15. Related Guides

- [Light/Dark Mode Accessibility Best Practices](./LIGHT_DARK_MODE_ACCESSIBILITY_BEST_PRACTICES.md) — Implementing dual-mode color palettes, CSS custom properties, and `prefers-color-scheme` support
- [SVG Accessibility Best Practices](./SVG_ACCESSIBILITY_BEST_PRACTICES.md) — Color handling in SVG icons and graphics
- [Charts and Graphs Accessibility Best Practices](./CHARTS_GRAPHS_ACCESSIBILITY_BEST_PRACTICES.md) — Color-independent data visualization encoding
- [Forms Accessibility Best Practices](./FORMS_ACCESSIBILITY_BEST_PRACTICES.md) — Error state design, focus styles, and label contrast
- [Keyboard Accessibility Best Practices](./KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md) — Focus management and visible focus indicators
- [User Personalization Accessibility Best Practices](./USER_PERSONALIZATION_ACCESSIBILITY_BEST_PRACTICES.md) — Providing user-controlled contrast and color preferences
- [Print Accessibility Best Practices](./PRINT_ACCESSIBILITY_BEST_PRACTICES.md) — Contrast for print and grayscale output

---

## References

### W3C Specifications

- [WCAG 2.2 Understanding 1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html)
- [WCAG 2.2 Understanding 1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- [WCAG 2.2 Understanding 1.4.6 Contrast (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-enhanced.html)
- [WCAG 2.2 Understanding 1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)
- [WCAG 2.2 Understanding 2.4.13 Focus Appearance](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html)
- [WCAG 2.2 Technique C40: Creating a two-color focus indicator](https://www.w3.org/WAI/WCAG22/Techniques/css/C40)
- [CSS Color Adjust Module Level 1 (`forced-colors`)](https://www.w3.org/TR/css-color-adjust-1/)

### Machine-Readable Standards

For AI systems and automated tooling, see [wai-yaml-ld](https://github.com/mgifford/wai-yaml-ld) for structured accessibility standards:

- [WCAG 2.2 (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wcag-2.2-normative.yaml) — Machine-readable WCAG 2.2 normative content
- [Standards Link Graph (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/standards-link-graph.yaml) — Relationships across WCAG/CSS/HTML standards

### Additional Reading

- [WebAIM: Contrast and Color Accessibility](https://webaim.org/articles/contrast/)
- [MDN: Understanding WCAG / Color Contrast](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Guides/Understanding_WCAG/Perceivable/Color_contrast)
- [Deque University: Color Contrast Checklist](https://dequeuniversity.com/checklists/web/color-contrast)
- [Section 508: Accessibility Bytes — Color Contrast](https://www.section508.gov/blog/accessibility-bytes/color-contrast/)
- [Make Things Accessible: Contrast Requirements for WCAG 2.2 Level AA](https://www.makethingsaccessible.com/guides/contrast-requirements-for-wcag-2-2-level-aa/)
- [a11y-collective: Colour Contrast for Accessibility](https://www.a11y-collective.com/blog/colour-contrast-for-accessibility/)
- [a11y-collective: Focus Indicator Guide](https://www.a11y-collective.com/blog/focus-indicator/)
- [APCA Contrast Calculator](https://apcacontrast.com/)
- [SAPC-APCA GitHub Repository](https://github.com/Myndex/SAPC-APCA)
- [MDN: forced-colors media feature](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/forced-colors)
- [Smashing Magazine: Inclusive Dark Mode — Designing Accessible Dark Themes](https://www.smashingmagazine.com/2025/04/inclusive-dark-mode-designing-accessible-dark-themes/)
- [Sara Soueidan: A guide to designing accessible, WCAG-conformant focus indicators](https://www.sarasoueidan.com/blog/focus-indicators/)
- [Silktide: WCAG 2.4.13 Focus Appearance](https://silktide.com/accessibility-guide/the-wcag-standard/2-4/navigable/2-4-13-focus-appearance/)
- [W3C WCAG GitHub: Focus appearance discussion](https://github.com/w3c/wcag/issues/1847)

---

AGPL-3.0-or-later License - See LICENSE file for full text  
Copyright (c) 2026 Mike Gifford
