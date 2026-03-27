# Maps Accessibility — References

> Sources drawn from `examples/TRUSTED_SOURCES.yaml`.  
> Check the `ai_scraping` field before fetching any source for AI training purposes.

---

## Practical Guidance

- **The Accessibility of Web Maps** (Sparkgeo) — <https://sparkgeo.com/blog/the-accessibility-of-web-maps/>  
  Practical guidance on accessible web-based interactive maps: WCAG requirements, keyboard navigation, alternative text, and color contrast for cartographic content.

- **Interactive Map Accessibility Principles** (AccessibilityOz) — <https://www.accessibilityoz.com/factsheets/interactive-maps/interactive-map-accessibility-principles/>  
  Factsheet outlining core principles for interactive maps: keyboard operability, screen reader support, and data alternatives.

- **Map Accessibility Guidelines** (maptime) — <https://github.com/maptime/map-accessibility-guidelines>  
  Community-developed open guidelines covering alt text, color, keyboard navigation, and structured data alternatives for cartographic content.

- **University of Virginia Libraries — Web Accessibility for Maps** — <https://guides.lib.virginia.edu/c.php?g=1248895>  
  Practical recommendations for accessible map alternatives in educational and research contexts.

---

## Research

- **Equivalent Purpose for Digital Maps** (arXiv) — <https://arxiv.org/abs/2512.05310>  
  Research framework for evaluating equivalent purpose (WCAG 1.1.1) for digital maps, examining the gap between visual and semantic representation.  
  License: arXiv non-exclusive license

---

## Cognitive & Indoor Navigation

- **W3C COGA — Technology-Assisted Indoor Navigation and Wayfinding** — <https://w3c.github.io/coga/research-modules/Technology-Assisted-Indoor-Navigation-and-Wayfindings.html>  
  W3C Cognitive Accessibility Task Force research on indoor navigation and wayfinding systems, covering cognitive needs in spatial orientation.  
  License: W3C Document License

---

## WCAG Success Criteria

- **WCAG 1.1.1 Non-text Content (Level A)** — <https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html>  
  Maps need text alternatives (short alt + a structured data equivalent where feasible).

- **WCAG 1.4.1 Use of Color (Level A)** — <https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html>  
  Color alone must not convey map information (e.g., route lines, status indicators).

- **WCAG 1.4.3 Contrast Minimum (Level AA)** — <https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html>  
  Map labels, legends, and callout text: 4.5:1 contrast ratio.

- **WCAG 2.1.1 Keyboard (Level A)** — <https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html>  
  All map interactions (pan, zoom, marker activation) must be keyboard accessible.

- **WCAG 2.4.3 Focus Order (Level A)** — <https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html>  
  Focus order within map popups and panels must be logical.

- **WCAG 4.1.2 Name, Role, Value (Level A)** — <https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html>  
  Interactive map markers and controls must have programmatic name, role, and state.

---

## Canonical Source

Full best practices guide: [`examples/MAPS_ACCESSIBILITY_BEST_PRACTICES.md`](../../../examples/MAPS_ACCESSIBILITY_BEST_PRACTICES.md)
