# SVG Accessibility — References

> Sources drawn from `examples/TRUSTED_SOURCES.yaml`.  
> Check the `ai_scraping` field before fetching any source for AI training purposes.

---

## Patterns & Best Practices

- **Léonie Watson (Tink)** — <https://tink.uk>  
  Well-known accessibility expert who pioneered the SVG accessibility pattern:  
  `<title>` + `<desc>` + `role="img"` + `aria-labelledby` for informational SVGs, and `aria-hidden="true" focusable="false"` for decorative SVGs. Her work is the canonical reference for this skill.

- **WAI-ARIA Authoring Practices Guide (APG)** — <https://www.w3.org/WAI/ARIA/apg/>  
  ARIA patterns, roles, states, and properties; applicable to interactive SVG components that need keyboard navigation and focus management.  
  License: W3C Software License

---

## Browser & API Reference

- **MDN — SVG and Accessibility** — <https://developer.mozilla.org/en-US/docs/Web/Accessibility/SVG_accessibility>  
  MDN reference on how screen readers interact with SVG, covering `<title>`, `<desc>`, ARIA roles, and `focusable` attribute behavior.

- **HTML5 Accessibility (html5accessibility.com)** — <https://html5accessibility.com/>  
  Reference on accessibility support status for HTML5 and related features across browsers; useful for verifying SVG `<title>` / `role="img"` support.

---

## WCAG Success Criteria

- **WCAG 1.1.1 Non-text Content (Level A)** — <https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html>  
  Informational SVGs must have an accessible name; decorative SVGs must be hidden from assistive technology.

- **WCAG 1.4.11 Non-text Contrast (Level AA)** — <https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html>  
  SVG icon/graphic boundaries and data elements require 3:1 contrast against adjacent colors.

- **WCAG 2.1.1 Keyboard (Level A)** — <https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html>  
  Interactive SVG elements (buttons, links implemented in SVG) must be keyboard operable.

- **WCAG 4.1.2 Name, Role, Value (Level A)** — <https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html>  
  Interactive SVG components must expose accessible name, role, and state programmatically.

---

## Canonical Source

Full best practices guide: [`examples/SVG_ACCESSIBILITY_BEST_PRACTICES.md`](../../../examples/SVG_ACCESSIBILITY_BEST_PRACTICES.md)
