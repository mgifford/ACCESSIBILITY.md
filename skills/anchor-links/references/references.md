# Anchor Links — References

> Sources drawn from `examples/TRUSTED_SOURCES.yaml`.  
> Check the `ai_scraping` field before fetching any source for AI training purposes.

---

## Tools & Libraries

- **PayPal SkipTo** — <https://paypal.github.io/skipto/>  
  Keyboard-accessible landmark/heading menu that fills the gap where browsers don't expose page structure navigation. Trigger: <kbd>Alt+0</kbd> / <kbd>Option+0</kbd>.  
  License: Apache-2.0

---

## Tutorials & Articles

- **Anchor Links and How to Make Them Awesome** (codersblock.com) — <https://codersblock.com/blog/anchor-links-and-how-to-make-them-awesome/>  
  Practical guide covering URL fragments, scroll offsets, smooth-scroll animation, and making heading links visible on hover.

- **Are Your Anchor Links Accessible?** (amberwilson.co.uk) — <https://amberwilson.co.uk/blog/are-your-anchor-links-accessible/>  
  Accessibility-focused guide covering descriptive link text, focus management after navigation, keyboard support, and WCAG success criteria.

---

## Official Standards

- **WCAG 2.4.1 Bypass Blocks (Level A)** — <https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html>  
  Requires a mechanism to bypass blocks of repeated content (the skip-link requirement).

- **WCAG 2.4.4 Link Purpose in Context (Level AA)** — <https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html>  
  Link text must describe the destination or purpose when read in context.

- **WCAG 2.4.7 Focus Visible (Level AA)** — <https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html>  
  Keyboard focus indicator must be visible.

- **WCAG 2.3.3 Animation from Interactions (Level AAA)** — <https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html>  
  Smooth-scroll motion must be suppressible; wrap in `prefers-reduced-motion: no-preference`.

---

## Canonical Source

Full best practices guide: [`examples/ANCHOR_LINKS_ACCESSIBILITY_BEST_PRACTICES.md`](../../../examples/ANCHOR_LINKS_ACCESSIBILITY_BEST_PRACTICES.md)
