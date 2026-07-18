---
title: SVG Accessibility Best Practices
---

# SVG Accessibility Best Practices

SVG accessibility depends on the graphic's purpose and how it is embedded. A decorative icon, an informative image, an icon inside a button, and an interactive diagram require different patterns.

Start by deciding what users need from the graphic. Then provide the simplest semantic implementation that delivers the same information or function.

---

## 1. Required Outcomes

A conforming implementation must:

- provide an equivalent text alternative for meaningful SVG content;
- allow decorative SVG content to be ignored by assistive technology;
- give functional graphics a name that describes the action or destination;
- avoid repeating a control's accessible name through both its text and icon;
- preserve information that is communicated through colour, shape, position, or animation;
- provide sufficient text and non-text contrast;
- make SVG-based controls keyboard operable with visible focus;
- respect motion preferences and provide required animation controls;
- remain understandable in supported light, dark, increased-contrast, and forced-colours modes; and
- preserve accessibility markup during SVG optimization and reuse.

The presence of `<title>`, `<desc>`, `role="img"`, or `aria-label` does not by itself make an SVG accessible. The result must be tested in its final context.

---

## 2. Choose the Pattern by Purpose and Context

| Context | Preferred pattern |
|:---|:---|
| Decorative SVG loaded with `<img>` | `<img src="…" alt="">` |
| Meaningful SVG loaded with `<img>` | `<img src="…" alt="Useful description">` |
| Decorative inline SVG | `<svg aria-hidden="true">…</svg>` |
| Simple meaningful inline SVG | `<svg role="img" aria-labelledby="…"><title>…</title></svg>` |
| Icon inside a named button or link | Name the HTML control and hide the SVG |
| Complex graphic | Short name plus visible summary, data, or detailed description |
| Reused sprite icon | Label or hide each outer `<svg>` instance, not the shared symbol |
| Interactive graphic | Prefer native HTML controls; provide an equivalent structured alternative |

Use native HTML semantics before ARIA. Do not add `role="img"` to an `<img>` merely because its source is an SVG file.

---

## 3. External SVG Used with `<img>`

An SVG referenced by an HTML `<img>` follows the same text-alternative rules as other image formats.

### Informative image

```html
<img
  src="/assets/images/service-area.svg"
  alt="Map showing the service area extending from Kingston to Ottawa"
  width="640"
  height="360"
>
```

Use `alt` to communicate the image's purpose in that context. Do not begin with “image of” unless the fact that it is an image is itself important.

`role="img"` is redundant here. `aria-label` is also unnecessary when native `alt` can provide the name.

### Decorative image

```html
<img src="/assets/images/flourish.svg" alt="" width="120" height="24">
```

The empty `alt` tells assistive technology to ignore the image. Omitting `alt` is not equivalent and can expose a filename or URL.

### Functional image

When the image is the only content of a link or button, its text alternative describes the action or destination.

```html
<a href="/reports/annual-report.pdf">
  <img src="/assets/icons/download.svg" alt="Download annual report">
</a>
```

When visible text already names the control, give the image empty `alt` to avoid repetition.

```html
<a href="/reports/annual-report.pdf">
  <img src="/assets/icons/download.svg" alt="">
  Download annual report
</a>
```

### Internal SVG metadata does not replace HTML `alt`

When an SVG is loaded through `<img>`, provide its text alternative on the HTML `<img>`. Do not depend on `<title>` or `<desc>` inside the external SVG file to name the HTML image.

---

## 4. Decorative Inline SVG

Hide an inline SVG when it is ornamental or repeats information already supplied by nearby text or its containing control.

```html
<p class="notice">
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <path d="M12 3 2 21h20L12 3Z"></path>
  </svg>
  Your session expires in five minutes.
</p>
```

`aria-hidden="true"` removes the SVG and its descendants from the accessibility tree. Do not place focusable or interactive content inside an element hidden this way.

`focusable="false"` was used to address legacy Internet Explorer and older Edge behaviour. It can remain when a project's browser policy still includes those user agents, but it is not a universal requirement for modern browsers.

Do not add `<title>` or `<desc>` to an SVG that is intentionally hidden. Those elements would be unused and can confuse maintenance.

---

## 5. Simple Meaningful Inline SVG

Use an inline SVG as one atomic image when a short name communicates its purpose.

```html
<svg
  role="img"
  aria-labelledby="download-icon-title"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
>
  <title id="download-icon-title">Download</title>
  <path d="M12 3v12m0 0 5-5m-5 5-5-5M5 21h14"></path>
</svg>
```

The `<title>` is a direct child of the `<svg>`, has a unique ID, and supplies the accessible name through `aria-labelledby`.

An `aria-label` is a reasonable alternative when managing a unique title ID would add needless complexity.

```html
<svg role="img" aria-label="Download" viewBox="0 0 24 24">
  <path d="M12 3v12m0 0 5-5m-5 5-5-5M5 21h14"></path>
</svg>
```

Do not use both patterns unless there is a specific, tested reason. The accessible-name calculation gives ARIA labelling attributes priority over `<title>`.

### `<title>` is not dependable visible help

Some browsers display an SVG `<title>` as a pointer tooltip. That does not make it a substitute for visible text or an accessible custom tooltip. It may not be discoverable by keyboard, touch, speech input, or magnification users.

---

## 6. Icons Inside Buttons and Links

The HTML control should own the accessible name. Hide its SVG icon.

### Visible text

```html
<button type="button">
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <path d="M6 6 18 18M18 6 6 18"></path>
  </svg>
  Close
</button>
```

### Icon-only control

```html
<button type="button" aria-label="Close dialog">
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <path d="M6 6 18 18M18 6 6 18"></path>
  </svg>
</button>
```

Do not give both the button and its hidden icon separate versions of the same name. That can produce duplicate or inconsistent announcements.

Prefer a visible label when the action may not be obvious. A familiar-looking icon can still have different meanings across products.

### Light/Dark mode selector icon

For a standalone SVG asset inside the labelled selector button, use `<img>` with empty `alt` because the button already has a name.

```html
<button
  type="button"
  aria-expanded="false"
  aria-controls="light-dark-options"
>
  <img
    src="/assets/images/theme-selector.svg"
    alt=""
    width="24"
    height="24"
  >
  <span>Light/Dark mode: System</span>
</button>
```

The selector's behaviour, expanded options, and keyboard interaction are documented in [Light/Dark Mode Accessibility Best Practices](./LIGHT_DARK_MODE_ACCESSIBILITY_BEST_PRACTICES.md).

An external SVG loaded through `<img>` does not inherit `currentColor` from the surrounding HTML button. Use this pattern when the asset's own colours have been validated on every button background. If the icon must follow a manual site theme, inline the paths or reference a real external `<symbol>` whose paths use `currentColor`.

---

## 7. Accessible Names and Descriptions

The SVG Accessibility API Mappings define this name priority for exposed SVG elements:

1. `aria-labelledby`
2. `aria-label`
3. A direct child `<title>`
4. Other host-language fallbacks

Descriptions similarly prioritize `aria-describedby`, then a direct child `<desc>`.

### Name and concise description

```html
<svg
  role="img"
  aria-labelledby="weather-title"
  aria-describedby="weather-desc"
  viewBox="0 0 320 180"
>
  <title id="weather-title">Weekly temperature trend</title>
  <desc id="weather-desc">
    Temperatures rise from 12 degrees Monday to 21 degrees Friday.
  </desc>
  <!-- Graphic content -->
</svg>
```

Keep IDs unique in the whole HTML document. Repeating a component that contains fixed SVG IDs can cause one instance to be labelled by another.

Do not put both the title and description IDs in `aria-labelledby` when they have different purposes. That concatenates both strings into the accessible name. Use `aria-labelledby` for the name and `aria-describedby` for the description.

### Do not bury essential information in `<desc>`

Support for navigating or reviewing long SVG descriptions varies across assistive technologies. Put essential details in visible HTML so that everyone can find, navigate, copy, translate, and magnify them.

---

## 8. Complex Graphics, Diagrams, and Charts

A complex SVG usually needs more than one long accessible name. Provide:

- a concise name;
- a visible summary of the purpose and important conclusion;
- the complete data or relationships in structured HTML when needed; and
- keyboard-operable controls if the graphic is interactive.

```html
<figure>
  <svg
    role="img"
    aria-labelledby="visitors-title"
    aria-describedby="visitors-summary"
    viewBox="0 0 640 360"
  >
    <title id="visitors-title">Website visitors from January to March</title>
    <!-- Axes, labels, and bars -->
  </svg>

  <figcaption id="visitors-summary">
    Visitors increased each month, from 12,400 in January to 19,200 in March.
  </figcaption>

  <details>
    <summary>View the chart data</summary>
    <table>
      <caption>Monthly website visitors</caption>
      <thead>
        <tr><th scope="col">Month</th><th scope="col">Visitors</th></tr>
      </thead>
      <tbody>
        <tr><th scope="row">January</th><td>12,400</td></tr>
        <tr><th scope="row">February</th><td>15,800</td></tr>
        <tr><th scope="row">March</th><td>19,200</td></tr>
      </tbody>
    </table>
  </details>
</figure>
```

Do not duplicate a detailed table into `aria-label`, `<title>`, or `<desc>`. Long strings announced as one image name are difficult to navigate.

The ARIA Graphics Module defines roles such as `graphics-document`, `graphics-object`, and `graphics-symbol` for structured graphics. Support must be tested with the project's actual browser and assistive-technology combinations. These roles do not remove the need for an equivalent text presentation.

For detailed chart-specific requirements, see [Charts and Graphs Accessibility Best Practices](./CHARTS_GRAPHS_ACCESSIBILITY_BEST_PRACTICES.md).

---

## 9. Reused Icons and SVG Sprites

### Inline sprite

Define reusable artwork in `<symbol>` elements. Give each rendered outer SVG instance its context-specific accessibility treatment.

```html
<svg aria-hidden="true" hidden>
  <symbol id="icon-download" viewBox="0 0 24 24">
    <path d="M12 3v12m0 0 5-5m-5 5-5-5M5 21h14"></path>
  </symbol>
</svg>

<button type="button">
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <use href="#icon-download"></use>
  </svg>
  Download report
</button>
```

Names inside a shared symbol are rarely appropriate for every instance. “Arrow” could mean Next, Previous, Expand, Collapse, Upload, or Download depending on context. Name the control or outer rendered instance.

### External sprite

```html
<svg role="img" aria-label="Download" viewBox="0 0 24 24">
  <use href="/assets/icons.svg#icon-download"></use>
</svg>
```

Test external sprite use in the browsers and assistive technologies the project supports. SVG `<use>` creates a shadow tree, and ID references within reused content have special processing rules.

### Avoid recursive references

An external `<use>` target must be a distinct element, usually a `<symbol>` with an ID.

```xml
<!-- /assets/icons.svg -->
<svg xmlns="http://www.w3.org/2000/svg">
  <symbol id="theme-selector" viewBox="0 0 24 24">
    <!-- Actual paths go here. -->
  </symbol>
</svg>
```

```html
<svg aria-hidden="true" viewBox="0 0 24 24">
  <use href="/assets/icons.svg#theme-selector"></use>
</svg>
```

Do not make `/assets/icons.svg#theme-selector` reference itself. If `theme-selector.svg` is a complete standalone image rather than a sprite containing a symbol, embed it with `<img src="/assets/images/theme-selector.svg" alt="">` or inline its paths.

---

## 10. Colour, Contrast, and Themes

### Use `currentColor` when the icon should follow text colour

```html
<svg class="icon" aria-hidden="true" viewBox="0 0 24 24">
  <path d="M5 12h14M13 6l6 6-6 6"></path>
</svg>
```

```css
.icon {
  inline-size: 1.5rem;
  block-size: 1.5rem;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2;
}
```

`currentColor` is useful, not mandatory. Multi-colour graphics may need several semantic tokens. Validate every meaningful colour pairing in every supported theme.

### Do not rely on colour alone

Use text labels, patterns, line styles, shapes, or symbols in addition to colour for statuses, chart series, map areas, and selected states.

### Contrast requirements

- Text rendered inside an SVG is subject to the applicable text contrast requirement.
- Visual information required to identify a component, state, or graphical object generally needs at least 3:1 contrast against the relevant adjacent colour.
- Decorative details do not need to meet non-text contrast merely because they are in a meaningful graphic.

See [Color Contrast Accessibility Best Practices](./COLOR_CONTRAST_ACCESSIBILITY_BEST_PRACTICES.md) for thresholds, states, and testing.

### Forced colours

Allow the user agent to adapt author colours by default. Add targeted rules only when testing shows that necessary information disappears.

```css
@media (forced-colors: active) {
  .icon {
    color: ButtonText;
  }

  .chart-line {
    fill: none;
    stroke: CanvasText;
  }

  .chart-line[data-selected="true"] {
    stroke: Highlight;
    stroke-width: 4;
  }
}
```

Do not set both `fill` and `stroke` on every path indiscriminately. That can turn line artwork into solid shapes or otherwise destroy the graphic.

Avoid `forced-color-adjust: none` unless preserving author colours is essential and the result has been tested with multiple system palettes.

---

## 11. Text Inside SVG

Visible `<text>` elements can contribute to the graphic and its accessibility tree, but they do not behave like ordinary reflowing HTML text.

- Keep essential labels visible and legible.
- Meet text contrast requirements.
- Do not convert essential labels to paths merely to preserve a typeface.
- Do not use `font-size="0"`, off-canvas positioning, or transparent SVG text as a substitute for a text alternative.
- Provide important explanations and long-form content in HTML.
- Test resizing and zoom. SVG labels can overlap, clip, or become too small even when the outer SVG scales.

`<foreignObject>` can embed HTML in SVG, but it adds rendering, fallback, and assistive-technology considerations. Use ordinary HTML outside the SVG when it can provide the same result.

---

## 12. Interactive SVG

Prefer native HTML buttons, links, form controls, and disclosures placed before, after, or over the graphic. Native elements provide established semantics, keyboard behaviour, focus handling, and speech-input support.

```html
<div class="map">
  <svg aria-hidden="true" viewBox="0 0 640 360">
    <!-- Visual map -->
  </svg>

  <ul class="map-locations">
    <li><a href="/locations/ottawa">Ottawa service centre</a></li>
    <li><a href="/locations/kingston">Kingston service centre</a></li>
  </ul>
</div>
```

If interaction must occur within the SVG:

- use an SVG `<a href="…">` for genuine navigation;
- provide an accessible name that describes the purpose;
- preserve a logical DOM and focus order;
- support expected keyboard activation;
- show a visible focus indicator that is not clipped;
- ensure pointer targets meet the project's target-size requirement;
- expose selected, expanded, pressed, or current states programmatically;
- ensure the accessible name contains the visible label for speech input; and
- provide an equivalent HTML list, table, or controls when the visual layout cannot be navigated non-visually.

Do not put every data point in the tab order. Hundreds of focus stops make a visualization technically reachable but practically unusable. Design a deliberate navigation model and document its keys.

Do not create a button by adding only `tabindex="0"` and a click listener to `<path>` or `<g>`. That does not provide native button semantics or keyboard behaviour.

---

## 13. Motion, Animation, and Flashing

### Start with a static presentation

Run non-essential SVG animation only when the user has not requested reduced motion.

```css
.loading-icon {
  transform-origin: center;
}

@media (prefers-reduced-motion: no-preference) {
  .loading-icon {
    animation: spin 1s linear infinite;
  }
}

@keyframes spin {
  to { transform: rotate(1turn); }
}
```

Do not use a blanket `svg *` rule to reduce motion. It can affect unrelated components, override meaningful states, and make debugging difficult. Target the animated component and define an understandable static state.

### Interaction-triggered motion

WCAG 2.3.3 Animation from Interactions is Level AAA. It requires users to be able to disable non-essential motion animation triggered by interaction. Respecting `prefers-reduced-motion` is an effective design approach even when the conformance target is Level AA.

```css
@media (prefers-reduced-motion: reduce) {
  .diagram-panel {
    animation: none;
    transition: none;
  }
}
```

### Moving content

WCAG 2.2.2 requires a mechanism to pause, stop, or hide moving, blinking, or scrolling information that starts automatically, lasts more than five seconds, appears alongside other content, and is not essential.

### Flashing content

The reduced-motion preference does not replace WCAG 2.3.1. Avoid flashing content. Content must not flash more than three times in any one-second period unless it remains below the defined general and red-flash thresholds.

---

## 14. Responsive SVG and Zoom

Preserve `viewBox` so the graphic can scale without cropping its internal coordinate system.

```html
<svg
  class="responsive-diagram"
  role="img"
  aria-label="Request approval workflow"
  viewBox="0 0 800 450"
>
  <!-- Graphic content -->
</svg>
```

```css
.responsive-diagram {
  display: block;
  max-inline-size: 100%;
  block-size: auto;
}
```

Test at 200% and 400% browser zoom and with narrow viewports. A scalable canvas does not guarantee that labels reflow or remain readable. For dense diagrams, consider a simplified small-screen view and an adjacent HTML explanation.

Do not disable page zoom to compensate for an inflexible SVG layout.

---

## 15. Standalone SVG Documents

An SVG opened directly in a browser is a document, not an HTML `<img>` element. Include the namespace, language, responsive metadata, and an accessible name.

```xml
<svg
  xmlns="http://www.w3.org/2000/svg"
  role="img"
  aria-labelledby="diagram-title"
  viewBox="0 0 800 450"
  lang="en"
  xml:lang="en"
>
  <title id="diagram-title">Request approval workflow</title>
  <!-- Graphic content -->
</svg>
```

If the standalone file is complex, include or link to an equivalent HTML description near the place from which users open it. Do not assume that a long `<desc>` offers the same navigation and structure as HTML.

---

## 16. Optimization and Build Processing

SVG optimizers can remove or rewrite accessibility-critical content. Configure the build to preserve:

- `viewBox`;
- `<title>` and `<desc>` when they are used;
- `role`, `aria-*`, and language attributes;
- IDs referenced by ARIA, `<use>`, clipping paths, masks, filters, and gradients;
- semantic `<text>` content;
- styles for focus, themes, forced colours, and reduced motion; and
- symbol IDs exposed as part of a public sprite interface.

When inline SVG components are repeated, generate unique IDs for titles, descriptions, gradients, masks, and clipping paths. An optimizer that minifies every copy to the same IDs can break both rendering and accessible names.

Sanitize untrusted uploaded SVG files. SVG can contain scripts, external references, animation, and other active content. Sanitization must also preserve whichever text alternatives are intentionally allowed.

---

## 17. Testing

### Code review

- Classify each SVG as decorative, informative, functional, complex, or interactive.
- Confirm that the embedding pattern matches that purpose.
- Inspect accessible-name and description relationships.
- Search repeated inline components for duplicate IDs.
- Confirm that build optimization preserves required attributes and elements.

### Browser and assistive-technology testing

1. Inspect the accessibility tree and confirm the expected role, name, and description.
2. Read the page with the supported screen-reader and browser combinations.
3. Confirm that decorative icons are silent and named graphics are announced once.
4. Navigate all SVG-related controls using only the keyboard.
5. Test speech-input names against visible labels.
6. Zoom to 200% and 400% and test narrow viewports.
7. Test every supported light and dark theme.
8. Test `prefers-reduced-motion`, `prefers-contrast`, and forced colours.
9. Verify colour-independent meaning and required contrast.
10. Test with images unavailable when the SVG is essential to the task.

Use combinations relevant to the users and support policy, such as NVDA with Firefox or Chrome, JAWS with Chrome or Edge, VoiceOver with Safari, and TalkBack with Chrome. Results from one combination do not establish universal support.

### Automated testing

Automated tools can detect missing `<img alt>`, some accessible-name problems, duplicate IDs, contrast failures, and certain ARIA errors. They cannot decide whether the alternative is equivalent, whether a graphic is truly decorative, whether a long description communicates the relationships, or whether an interactive visualization is usable.

No automated pass replaces manual SVG review.

---

## 18. Common Failures

| Failure | Correction |
|:---|:---|
| `<img src="graphic.svg">` has no `alt`. | Add context-appropriate `alt`, including `alt=""` for decoration. |
| `role="img"` is added to every HTML `<img>`. | Use the native `<img>` semantics and `alt`. |
| Every inline SVG receives a title whether meaningful or decorative. | Classify its purpose first; hide decorative SVGs. |
| An icon and its parent button both expose the same label. | Name the button and hide the icon. |
| Both `<title>` and `<desc>` IDs are put in `aria-labelledby`. | Use `aria-labelledby` for the name and `aria-describedby` for the description. |
| A long table or paragraph is placed in `<desc>`. | Provide essential detail as visible, structured HTML. |
| Repeated inline icons contain identical title IDs. | Generate a unique ID for every document instance or use a direct `aria-label`. |
| A standalone SVG file is referenced through `<use>` as though it were a sprite symbol. | Use `<img>`, inline the paths, or define a real `<symbol id="…">`. |
| A sprite symbol references itself. | Put actual paths in the symbol and reference it only from rendered instances. |
| `currentColor` is declared mandatory for every SVG. | Use it for single-colour icons; use tested semantic tokens where multiple colours carry meaning. |
| Forced-colours CSS sets both fill and stroke on every path. | Apply targeted system colours without changing the graphic's geometry. |
| A clickable `<path>` has only a click handler. | Prefer a native HTML control or implement complete semantics and keyboard behaviour. |
| Every chart point is added to the tab order. | Provide a deliberate navigation model and an equivalent table or list. |
| Reduced motion is implemented with `svg *` and `!important`. | Target each animated component and provide a meaningful static state. |
| Passing an automated scan is treated as proof. | Test purpose, equivalence, announcements, keyboard use, themes, motion, and forced colours manually. |

---

## 19. Definition of Done

- [ ] Every SVG has been classified by purpose and embedding context.
- [ ] Meaningful external `<img>` elements have useful `alt` text.
- [ ] Decorative external images use `alt=""`.
- [ ] Decorative inline SVGs are hidden from assistive technology.
- [ ] Functional graphics describe their action or destination.
- [ ] Icons inside named controls do not create duplicate announcements.
- [ ] Meaningful inline SVGs expose the intended role and accessible name.
- [ ] Names and descriptions use the correct ARIA relationship.
- [ ] Essential complex information is available in visible, structured HTML.
- [ ] Repeated components have no conflicting IDs.
- [ ] Sprite targets are real symbols or elements and are not recursive.
- [ ] Text and required graphical details meet applicable contrast requirements.
- [ ] Meaning does not depend on colour alone.
- [ ] SVG-based interaction is keyboard operable with visible focus.
- [ ] Motion preferences and required pause, stop, hide, and flash protections are implemented.
- [ ] The graphic remains usable at 200% and 400% zoom and on narrow screens.
- [ ] Themes, increased contrast, and forced colours preserve meaning.
- [ ] Optimization preserves accessibility-critical content and references.
- [ ] The final implementation has been tested with relevant browsers and assistive technologies.

---

## 20. WCAG 2.2 Mapping

| Success criterion | Level | SVG relevance |
|:---|:---:|:---|
| [1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html) | A | Meaningful SVG content needs an equivalent text alternative; decoration must be ignorable. |
| [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) | A | Relationships communicated visually may need a programmatic or text equivalent. |
| [1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html) | A | Colour cannot be the only visual means of conveying information. |
| [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) | AA | Text within SVG must meet text contrast requirements. |
| [1.4.5 Images of Text](https://www.w3.org/WAI/WCAG22/Understanding/images-of-text.html) | AA | Use real text instead of path-rendered text when the presentation is not essential. |
| [1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) | AA | Required component and graphical information generally needs 3:1 contrast. |
| [2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html) | A | Interactive SVG functionality must work from a keyboard. |
| [2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) | A | Certain automatically moving SVG content needs user controls. |
| [2.3.1 Three Flashes or Below Threshold](https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html) | A | Flashing must remain within the defined safety threshold. |
| [2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) | AAA | Non-essential interaction-triggered motion animation must be disableable. |
| [2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html) | AA | Keyboard focus must be visible. |
| [2.5.3 Label in Name](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html) | A | The accessible name of a control should contain its visible label. |
| [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) | AA | SVG interaction targets must meet the applicable size or spacing requirement. |
| [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html) | A | Custom interactive graphics must expose their semantics and states. |

---

## References

- [W3C WAI Images Tutorial](https://www.w3.org/WAI/tutorials/images/)
- [SVG Accessibility API Mappings](https://www.w3.org/TR/svg-aam-1.0/)
- [Accessible Name and Description Computation](https://www.w3.org/TR/accname-1.2/)
- [WAI-ARIA Graphics Module](https://www.w3.org/TR/graphics-aria-1.0/)
- [Scalable Vector Graphics 2](https://www.w3.org/TR/SVG2/)
- [CSS Color Adjustment Module Level 1](https://www.w3.org/TR/css-color-adjust-1/)
- [Understanding 1.1.1: Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html)
- [Understanding 1.4.11: Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)
- [Understanding 2.2.2: Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)
- [Understanding 2.3.1: Three Flashes or Below Threshold](https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html)
- [Understanding 2.3.3: Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)

### Machine-readable standards

For AI systems and automated tooling, see [wai-yaml-ld](https://github.com/mgifford/wai-yaml-ld):

- [WCAG 2.2 normative content in YAML](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wcag-2.2-normative.yaml)
- [ARIA informative catalog in YAML](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wai-aria-informative.yaml)
- [HTML accessibility content in YAML](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/html-living-standard-accessibility.yaml)
- [Standards link graph in YAML](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/standards-link-graph.yaml)

---

AGPL-3.0-or-later License - See LICENSE file for full text  
Copyright (c) 2026 Mike Gifford
