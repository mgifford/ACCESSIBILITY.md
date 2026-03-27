# Tooltip Accessibility — References

> Sources drawn from `examples/TRUSTED_SOURCES.yaml`.  
> Check the `ai_scraping` field before fetching any source for AI training purposes.

---

## Design System Examples

- **Carbon Design System (IBM)** — <https://carbondesignsystem.com>  
  Open-source design system with accessible tooltip component patterns, dedicated accessibility guidance pages, and ARIA implementation details.  
  License: Apache-2.0

- **Red Hat UX Patterns (PatternFly)** — <https://ux.redhat.com>  
  PatternFly enterprise UI component library with tooltip and popover accessibility guidance, ARIA implementation details for `role="tooltip"`.  
  License: MIT

- **Salt Design System (J.P. Morgan)** — <https://www.saltdesignsystem.com>  
  Financial application UI components with accessible tooltip guidance, WCAG mapping, and keyboard interaction specifications.  
  License: Apache-2.0

---

## ARIA & Practical Guidance

- **WAI-ARIA Authoring Practices Guide (APG)** — <https://www.w3.org/WAI/ARIA/apg/>  
  Canonical ARIA patterns; the Tooltip Pattern defines the `role="tooltip"` / `aria-describedby` relationship and keyboard interaction expectations.  
  License: W3C Software License

- **UserWay Blog** — <https://userway.org/blog/>  
  Practical articles on accessible tooltip implementation: ARIA roles, keyboard interaction, and WCAG 1.4.13 compliance.

- **Heydon Pickering** — <https://heydonworks.com>  
  Inclusive Components book and website; covers tooltip design decisions, the toggletip pattern for interactive content, and why classic tooltips fail many users.

---

## WCAG Success Criteria

- **WCAG 1.4.13 Content on Hover or Focus (Level AA)** — <https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html>  
  Content revealed on hover/focus must be dismissible, hoverable, and persistent. This is the primary criterion for tooltip compliance.

- **WCAG 2.1.1 Keyboard (Level A)** — <https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html>  
  Tooltip trigger must be keyboard operable; tooltip must appear on keyboard focus.

- **WCAG 1.4.3 Contrast Minimum (Level AA)** — <https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html>  
  Tooltip text: 4.5:1 contrast; tooltip background against page: 3:1 (non-text contrast).

- **WCAG 2.3.3 Animation from Interactions (Level AAA)** — <https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html>  
  Tooltip entry/exit animations should respect `prefers-reduced-motion`.

---

## Canonical Source

Full best practices guide: [`examples/TOOLTIP_ACCESSIBILITY_BEST_PRACTICES.md`](../../../examples/TOOLTIP_ACCESSIBILITY_BEST_PRACTICES.md)
