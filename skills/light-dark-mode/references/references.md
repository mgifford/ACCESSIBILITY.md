# Light/Dark Mode Accessibility — References

> Sources drawn from `examples/TRUSTED_SOURCES.yaml`.  
> Check the `ai_scraping` field before fetching any source for AI training purposes.

---

## Color Contrast Tools

- **colorandcontrast.com** — <https://colorandcontrast.com/>  
  WCAG color contrast validation and accessible color palette creation; covers text (4.5:1), large text (3:1), and non-text UI components (3:1).

- **getstark.co** — <https://www.getstark.co/>  
  Designer tool for checking color contrast, typography, and focus order; supports both light and dark theme evaluation.

---

## CSS Media Queries Guides

- **A More Inclusive Website Thanks to Media Queries** (Eleven Ways) — <https://elevenways.be/en/articles/a-more-inclusive-website-thanks-to-media-queries>  
  Comprehensive guide to using `prefers-color-scheme`, `prefers-contrast`, `prefers-reduced-motion`, and `prefers-reduced-transparency` CSS media queries for inclusive design.

- **CSS Media Queries: Accessibility Optimize Digital Product Design** (DockYard) — <https://dockyard.com/blog/2024/01/16/css-media-queries-accessibility-optimize-digital-product-design>  
  Guide on using CSS media queries to optimize digital product design for accessibility, covering all user-preference media features.

---

## Official Standards

- **WCAG 1.4.3 Contrast Minimum (Level AA)** — <https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html>  
  Normal text: 4.5:1 contrast ratio in both light and dark themes.

- **WCAG 1.4.6 Contrast Enhanced (Level AAA)** — <https://www.w3.org/WAI/WCAG22/Understanding/contrast-enhanced.html>  
  Enhanced contrast: 7:1 for normal text, 4.5:1 for large text.

- **WCAG 1.4.11 Non-text Contrast (Level AA)** — <https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html>  
  UI components (buttons, inputs, icons) require 3:1 contrast against adjacent background in all themes.

- **WCAG 1.4.8 Visual Presentation (Level AAA)** — <https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation.html>  
  Users can select foreground and background colors.

- **CSS Media Features — MDN** — <https://developer.mozilla.org/en-US/docs/Web/CSS/@media#media_features>  
  Reference for `prefers-color-scheme`, `forced-colors`, `prefers-contrast`, and all user-preference media features.

---

## Canonical Source

Full best practices guide: [`examples/LIGHT_DARK_MODE_ACCESSIBILITY_BEST_PRACTICES.md`](../../../examples/LIGHT_DARK_MODE_ACCESSIBILITY_BEST_PRACTICES.md)
