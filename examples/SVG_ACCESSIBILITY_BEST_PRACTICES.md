---
title: SVG Accessibility Best Practices
---

# SVG Accessibility Best Practices

## Core Mandate

Outcome-based, not checklist-driven. Measure against real usage context: is the
SVG perceivable, operable, and compatible with assistive technologies?

Pattern recommendations in this skill are grounded in cross-browser/screen reader
testing by Carie Fisher (published on Smashing Magazine, updated at
<https://cariefisher.com/a11y-svg-updated/>). When a pattern is labelled
**"Best in Show"**, **"Use Caution"**, or **"Not Recommended"** below, those
labels reflect her testing results across OS/browser/screen reader combinations.

---

## Severity Scale

| Level | Meaning |
| --- | --- |
| **Critical** | SVG conveys essential information with no accessible alternative |
| **Serious** | SVG is interactive but unreachable or unlabelled for AT users |
| **Moderate** | AT experience degraded but content still partially accessible |
| **Minor** | Best-practice gap; marginal impact |

---

## Decorative SVGs — Hide Completely from AT

A decorative SVG that is not hidden from AT is a **Moderate** issue — it adds
noise to the accessibility tree and forces screen reader users to listen to
meaningless announcements.

**Both attributes are required:**

```html
<svg aria-hidden="true" focusable="false">
  <!-- decorative icon — no title, no desc, no role needed -->
</svg>
```

* `aria-hidden="true"` removes the SVG from the accessibility tree entirely
* `focusable="false"` is required for IE/Edge legacy compatibility where SVGs
  become focusable by default and appear in the tab order

**Never use `role="presentation"` as a substitute for `aria-hidden="true"`**
on decorative SVGs. `role="presentation"` does not reliably suppress AT
announcement across all browser/screen reader combinations.

**When is an SVG decorative?** If the same meaning is conveyed by adjacent
visible text, or if the image is purely ornamental (borders, backgrounds,
flourishes), it is decorative. If removing it would leave a user without
information or context they need, it is meaningful.

---

## Meaningful SVGs — Choosing the Right Pattern

Based on Carie Fisher's testing across NVDA, JAWS, VoiceOver (macOS and iOS),
TalkBack, and Narrator:

### SVG as `<img>` (external file reference)

Use `<img>` for simple, uncomplicated images. The SVG file loads separately —
this is lighter and easier to maintain for icons used in multiple places, but
offers less control over internals.

**Best in Show — `<img>` patterns:**

```html
<!-- Pattern 2: <img> + role="img" + alt — RECOMMENDED -->
<img role="img" class="icon" alt="Download" src="download.svg">

<!-- Pattern 3: <img> + role="img" + aria-label — RECOMMENDED -->
<img role="img" class="icon" aria-label="Download" src="download.svg">
```

**Use Caution:**

```html
<!-- Pattern 4: <img> + role="img" + aria-labelledby
     Works in most combinations but has gaps in some screen readers -->
<p id="cap1" class="visually-hidden">Download report</p>
<img role="img" aria-labelledby="cap1" src="download.svg">
```

**Not Recommended:**

```html
<!-- Pattern 1: <img> + alt alone — inconsistent results, omit role="img" -->
<img alt="Download" src="download.svg">
```

---

### Inline SVG — simple label only

Use inline `<svg>` when you need control over colours, animation, or internals.

**Best in Show — inline SVG patterns (simple label):**

```html
<!-- Pattern 5: <svg> + role="img" + <title> — RECOMMENDED -->
<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <title>Download</title>
  <!-- paths -->
</svg>

<!-- Pattern 8: <svg> + role="img" + <title> + aria-labelledby — RECOMMENDED -->
<svg role="img" aria-labelledby="dl-title" viewBox="0 0 24 24">
  <title id="dl-title">Download</title>
  <!-- paths -->
</svg>
```

**Use Caution:**

```html
<!-- Pattern 7: aria-describedby pointing to <title> — less reliable than
     aria-labelledby; some screen readers do not expose the description -->
<svg role="img" aria-describedby="dl-title7" viewBox="0 0 24 24">
  <title id="dl-title7">Download</title>
</svg>
```

**Not Recommended:**

```html
<!-- Pattern 6: <svg> + role="img" + <text> — poor results across screen readers -->
<svg role="img" viewBox="0 0 24 24">
  <text class="visually-hidden" font-size="0">Download</text>
</svg>
```

---

### Inline SVG — extended description (complex/informational images)

Use when the SVG conveys more than a name can carry: diagrams, illustrations,
charts, infographics.

**Best in Show — inline SVG with extended description:**

```html
<!-- Pattern 11: <svg> + role="img" + <title> + <desc> + aria-labelledby
     pointing to BOTH IDs — RECOMMENDED for complex SVGs -->
<svg role="img"
     aria-labelledby="chart-title chart-desc"
     viewBox="0 0 400 300">
  <title id="chart-title">Q1 2024 Website Visitors</title>
  <desc id="chart-desc">
    Bar chart. January 12,400. February 15,800.
    March 19,200 — highest, up 54% from January.
  </desc>
  <!-- chart paths -->
</svg>
```

Note: Pattern 11 sometimes reads both `<title>` and `<desc>` consecutively,
which can sound slightly repetitive. This is acceptable — it did not suppress
or ignore any content in testing, unlike the "Use Caution" patterns below.

**Use Caution (all have gaps in at least one major screen reader combination):**

```html
<!-- Pattern 9: <title> + <text> -->
<!-- Pattern 10: <title> + <desc> without aria-labelledby -->
<!-- Pattern 12: <title> + <desc> + aria-describedby -->
```

For Pattern 10 and 12 specifically: `<desc>` alone, and `aria-describedby`
pointing to `<desc>`, are not reliably exposed across all combinations.
Always use `aria-labelledby` referencing both IDs (Pattern 11) for complex SVGs.

---

## Animated SVGs — `prefers-reduced-motion`

**Rapid SVG animation is a Critical safety issue** if it flashes at 3+ Hz
(WCAG 2.3.1 — Three Flashes or Below Threshold). Vestibular disorders can be
triggered by any sustained motion; seizure thresholds are lower.

Always wrap SVG animations in a `prefers-reduced-motion` check:

```css
/* Default: respect the preference — run animation only if user has not
   requested reduced motion */
@media (prefers-reduced-motion: no-preference) {
  .animated-icon {
    animation: spin 1s linear infinite;
  }
}

/* Explicit reduction: stop all SVG animation */
@media (prefers-reduced-motion: reduce) {
  svg * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

For SVG animations controlled via JavaScript (e.g., GSAP, Anime.js):

```js
const prefersReduced = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (!prefersReduced) {
  // Start animation
  gsap.to('.icon-path', { rotation: 360, repeat: -1, duration: 1 });
} else {
  // Show static final state instead
  element.classList.add('animation-complete');
}
```

For inline `<svg>` with `<animate>` or `<animateTransform>` elements, use
`begin="indefinite"` as the default and only trigger the animation when
`prefers-reduced-motion: no-preference` is confirmed:

```html
<svg viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="40">
    <animate id="spin-anim"
             attributeName="r" from="40" to="45"
             dur="0.5s" repeatCount="indefinite"
             begin="indefinite"/>
  </circle>
</svg>
```

```js
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.getElementById('spin-anim').beginElement();
}
```

---

## Required: `currentColor` for Theme Compatibility

```html
<svg viewBox="0 0 24 24" class="icon" aria-hidden="true" focusable="false">
  <path fill="currentColor" d="…"/>
</svg>
```

Hardcoded colour values that do not respond to theme changes are **Moderate** —
the SVG may become invisible or low-contrast in dark mode or forced-colours mode.

---

## Required: Forced-Colors Support

Only needed when the SVG would lose meaning without it:

```css
@media (forced-colors: active) {
  .icon { stroke: CanvasText; fill: CanvasText; }
  .accent { stroke: Highlight; fill: Highlight; }
}
```

Use semantic system colour keywords: `Canvas`, `CanvasText`, `LinkText`,
`ButtonFace`, `ButtonText`, `Highlight`, `HighlightText`.

---

## Required: Non-text Contrast

Meaningful graphical elements (not decorative) require minimum 3:1 contrast
against adjacent colours (WCAG 1.4.11). This is **Moderate** if failing —
the SVG is still present, but low-contrast elements may be unperceivable for
low-vision users who do not use forced-colours mode.

---

## Required: Preserve `viewBox`

Do not remove `viewBox` during optimisation — it is required for responsive
scaling. Its removal is **Minor** in most fixed-dimension contexts but will
break fluid layouts.

---

## Do NOT Remove During Optimisation

Optimisation tools (SVGO and similar) may remove elements that are required
for accessibility. Configure your optimiser to preserve:

* `viewBox`
* `<title>` when contributing to accessible name
* `<desc>` when contributing to accessible description
* IDs referenced by `aria-labelledby`, `aria-describedby`, `<use href="#…">`,
  `clip-path="url(#…)"`, `mask="url(#…)"`, `filter="url(#…)"`
* Internal `<style>` elements implementing interaction states, reduced-motion,
  or forced-colours rules

---

## Interactive SVGs

If the SVG itself is interactive (clickable regions, toggle buttons):

* **Prefer a `<button>` or `<a>` wrapper** over raw SVG `tabindex` — native
  elements provide keyboard, ARIA semantics, and AT support for free
* Ensure keyboard activation (Enter/Space for buttons, Enter for links)
* Provide visible focus indication
* An interactive SVG unreachable by keyboard is **Critical**

---

## What Is NOT Required

* A `<desc>` for every SVG — Pattern 8 (`<title>` + `aria-labelledby`) is
  sufficient when a name alone fully conveys the meaning
* Focus styling inside non-interactive SVGs
* A `forced-colors` block when the SVG remains perceivable without it
* `role="img"` on decorative SVGs — use `aria-hidden="true"` instead

---

## Definition of Done Checklist

* [ ] Decorative SVGs: `aria-hidden="true" focusable="false"`, no `<title>`, no `<desc>`
* [ ] Meaningful `<img>` SVGs: Pattern 2 or 3 (`role="img"` + `alt` or `aria-label`)
* [ ] Meaningful inline SVGs (simple): Pattern 8 (`role="img"` + `<title>` + `aria-labelledby`)
* [ ] Meaningful inline SVGs (complex): Pattern 11 (`role="img"` + `<title>` + `<desc>` + `aria-labelledby` both IDs)
* [ ] All referenced IDs preserved through any optimisation pass
* [ ] `currentColor` used for fills/strokes
* [ ] `viewBox` present
* [ ] Non-text elements meet 3:1 contrast
* [ ] Animated SVGs: animation only runs under `prefers-reduced-motion: no-preference`
* [ ] Rapidly flashing content: does not flash at 3+ Hz regardless of preference
* [ ] Interactive SVGs: keyboard operable, visible focus, prefer native wrapper elements
* [ ] Tested with screen reader on recommended OS/browser combination

---

## Key WCAG Criteria

* 1.1.1 Non-text Content (A) — **Critical if meaningful SVG has no text alternative**
* 1.4.11 Non-text Contrast (AA)
* 2.3.1 Three Flashes or Below Threshold (A) — **Critical for flashing/strobing animations**
* 4.1.2 Name, Role, Value (A)

---

## References

### Machine-Readable Standards

For AI systems and automated tooling, see [wai-yaml-ld](https://github.com/mgifford/wai-yaml-ld) for structured accessibility standards:

- [WCAG 2.2 (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wcag-2.2-normative.yaml) - Machine-readable WCAG 2.2 normative content
- [ARIA Informative (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wai-aria-informative.yaml) - ARIA-focused informative catalog
- [HTML Living Standard Accessibility (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/html-living-standard-accessibility.yaml) - HTML accessibility including SVG
- [Standards Link Graph (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/standards-link-graph.yaml) - Relationships across WCAG/ARIA/SVG/HTML standards
