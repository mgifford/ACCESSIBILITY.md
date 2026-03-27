# User Personalization Accessibility — References

> Sources drawn from `examples/TRUSTED_SOURCES.yaml`.  
> Check the `ai_scraping` field before fetching any source for AI training purposes.

---

## Critical Reading: Overlays

- **Overlay Fact Sheet** — <https://overlayfactsheet.com/en/>  
  Comprehensive documentation explaining why accessibility overlays must **not** be used as a substitute for proper accessible design. Signed by over 800 accessibility professionals. Essential reading before adopting any automated-fix widget.

- **Web Almanac 2024 — Accessibility Chapter** — <https://almanac.httparchive.org/en/2024/accessibility>  
  Annual HTTP Archive analysis of web accessibility trends, including data on overlay widget adoption and the state of user personalization across millions of websites.  
  License: Apache-2.0

---

## Reference Implementation

- **Fluid Infusion Preferences Framework** — <https://docs.fluidproject.org/infusion/development/PreferencesFramework>  
  Reference implementation of a legitimate user preference framework (text size, line spacing, font, contrast, table of contents, enhanced inputs). Demonstrates best practices for personalization without claiming to fix accessibility issues.  
  License: BSD-3-Clause

---

## CSS Media Queries

- **A More Inclusive Website Thanks to Media Queries** (Eleven Ways) — <https://elevenways.be/en/articles/a-more-inclusive-website-thanks-to-media-queries>  
  Comprehensive guide to CSS user-preference media queries: `prefers-reduced-motion`, `prefers-color-scheme`, `prefers-contrast`, `prefers-reduced-transparency`.

- **CSS Media Queries: Accessibility Optimize** (DockYard) — <https://dockyard.com/blog/2024/01/16/css-media-queries-accessibility-optimize-digital-product-design>  
  Practical guide on using user-preference media queries to optimize digital product accessibility without requiring custom controls.

---

## Platform Accessibility Features

- **Apple Accessibility** — <https://apple.com/accessibility>  
  Built-in system-level user preferences (Dynamic Type, Reduce Motion, Increase Contrast, etc.) that web personalization must not override.

- **Google Accessibility** — <https://google.com/accessibility>  
  Android and Chrome OS user accessibility preferences (TalkBack, font size, display size) informing web personalization design decisions.

---

## WCAG Success Criteria

- **WCAG 1.4.4 Resize Text (Level AA)** — <https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html>  
  Text must be resizable up to 200% without loss of content or functionality.

- **WCAG 1.4.12 Text Spacing (Level AA)** — <https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html>  
  Content and functionality must not break when line-height, letter-spacing, word-spacing, or paragraph spacing is overridden.

- **WCAG 2.3.3 Animation from Interactions (Level AAA)** — <https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html>  
  Respect `prefers-reduced-motion`; personalization controls for motion must work at the CSS and JavaScript level.

- **WCAG 1.4.3 Contrast Minimum (Level AA)** — <https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html>  
  High-contrast personalization options must meet 4.5:1 for normal text.

---

## Canonical Source

Full best practices guide: [`examples/USER_PERSONALIZATION_ACCESSIBILITY_BEST_PRACTICES.md`](../../../examples/USER_PERSONALIZATION_ACCESSIBILITY_BEST_PRACTICES.md)
