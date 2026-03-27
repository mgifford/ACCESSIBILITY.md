# Mermaid Diagram Accessibility — References

> Sources drawn from `examples/TRUSTED_SOURCES.yaml`.  
> Check the `ai_scraping` field before fetching any source for AI training purposes.

---

## SVG & ARIA Patterns

- **WAI-ARIA Authoring Practices Guide (APG)** — <https://www.w3.org/WAI/ARIA/apg/>  
  Canonical patterns for accessible widget markup; the `role="img"` with `aria-labelledby` / `aria-describedby` pattern used in Mermaid SVG output derives from APG guidance.  
  License: W3C Software License

- **Léonie Watson (Tink)** — <https://tink.uk>  
  Accessibility expert whose SVG accessibility pattern (`<title>` + `<desc>` + `role="img"` + `aria-labelledby`) is widely adopted and directly applicable to Mermaid diagrams. Cited as the canonical approach in multiple skills.

---

## SVG Accessibility Reference

- **MDN — SVG Accessibility** — <https://developer.mozilla.org/en-US/docs/Web/Accessibility/SVG_accessibility>  
  MDN reference on how screen readers interact with SVG, covering `<title>`, `<desc>`, `role`, and `aria-*` attributes on inline SVG elements.

- **developer.mozilla.org** — <https://developer.mozilla.org/>  
  MDN Web Docs: comprehensive reference for web standards including ARIA, SVG, and accessibility APIs.

---

## WCAG Success Criteria

- **WCAG 1.1.1 Non-text Content (Level A)** — <https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html>  
  Diagrams must provide a text alternative (accessible name + long description for complex diagrams).

- **WCAG 1.4.3 Contrast Minimum (Level AA)** — <https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html>  
  Text labels on diagrams (node text, edge labels): 4.5:1 contrast ratio.

- **WCAG 1.4.11 Non-text Contrast (Level AA)** — <https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html>  
  Shape borders, connector lines, and data points in diagrams: 3:1 against adjacent background.

- **WCAG 4.1.2 Name, Role, Value (Level A)** — <https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html>  
  Informational SVG diagrams must expose an accessible name via `role="img"` and `aria-labelledby`.

---

## Canonical Source

Full best practices guide: [`examples/MERMAID_ACCESSIBILITY_BEST_PRACTICES.md`](../../../examples/MERMAID_ACCESSIBILITY_BEST_PRACTICES.md)
