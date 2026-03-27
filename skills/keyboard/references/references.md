# Keyboard Accessibility — References

> Sources drawn from `examples/TRUSTED_SOURCES.yaml`.  
> Check the `ai_scraping` field before fetching any source for AI training purposes.

---

## Tools & Libraries

- **PayPal SkipTo** — <https://paypal.github.io/skipto/>  
  Drop-in keyboard-accessible landmark/heading navigation menu. Provides skip-to-content capability and exposes page structure to keyboard users. Trigger: <kbd>Alt+0</kbd> / <kbd>Option+0</kbd>.  
  License: Apache-2.0

- **GitHub Accessibility** — <https://accessibility.github.com>  
  GitHub's accessibility documentation covering keyboard navigation patterns, screen reader support, and WCAG compliance for interactive components.

---

## Patterns & Guidance

- **WAI-ARIA Authoring Practices Guide (APG)** — <https://www.w3.org/WAI/ARIA/apg/>  
  Canonical patterns for keyboard interaction: modal dialogs, menus, tabs, carousels, comboboxes, trees, and more—each with expected key assignments.  
  License: W3C Software License

- **Inclusive Components (Heydon Pickering)** — <https://heydonworks.com>  
  In-depth articles on keyboard-accessible UI components: tabs, menus, toggles, notifications, tooltips, and more, with detailed keyboard interaction design rationale.

- **Are Your Anchor Links Accessible?** (amberwilson.co.uk) — <https://amberwilson.co.uk/blog/are-your-anchor-links-accessible/>  
  Focus management after navigation: how anchor links should move focus and what happens to keyboard position.

- **UserWay Blog** — <https://userway.org/blog/>  
  Articles on keyboard interaction patterns for tooltips, menus, and other components.

---

## WCAG Success Criteria

- **WCAG 2.1.1 Keyboard (Level A)** — <https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html>  
  All functionality must be operable via keyboard without requiring specific timings.

- **WCAG 2.1.2 No Keyboard Trap (Level A)** — <https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html>  
  Keyboard focus must not become trapped in a component.

- **WCAG 2.4.1 Bypass Blocks (Level A)** — <https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html>  
  Provide skip links or landmark regions to bypass repeated navigation blocks.

- **WCAG 2.4.3 Focus Order (Level A)** — <https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html>  
  Focusable components receive focus in an order that preserves meaning and operability.

- **WCAG 2.4.7 Focus Visible (Level AA)** — <https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html>  
  Keyboard focus indicator must be visible.

- **WCAG 2.4.11 Focus Appearance (Level AA, WCAG 2.2)** — <https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html>  
  Focus indicator area and contrast requirements (new in WCAG 2.2).

- **WCAG 2.4.12 Focus Not Obscured (Level AA, WCAG 2.2)** — <https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html>  
  Focused component must not be entirely hidden by sticky headers or other content.

---

## Canonical Source

Full best practices guide: [`examples/KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md`](../../../examples/KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md)
