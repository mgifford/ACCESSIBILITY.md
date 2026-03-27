# Anchor Links Accessibility Skill

> **Canonical source**: `examples/ANCHOR_LINKS_ACCESSIBILITY_BEST_PRACTICES.md`
> This skill is derived from that file. When in doubt, the example is authoritative.

Apply these rules when creating or reviewing in-page anchor links, skip links, or heading links.

---

## Core Mandate

Every anchor link must have meaningful text, a reachable target with a visible focus indicator, and must not cause motion-related harm.

---

## Required: Meaningful Link Text

Link text must make sense out of context (screen reader users navigate by link lists).

```html
<!-- Bad -->
<a href="#section">Click here</a>
<a href="#section">Read more</a>

<!-- Good -->
<a href="#installation">Installation instructions</a>
<a href="#wcag-criteria">Relevant WCAG success criteria</a>
```

When visible text cannot be changed (e.g., icon-only heading links):
```html
<a href="#installation" aria-label="Link to Installation section">
  <svg aria-hidden="true" focusable="false"><!-- anchor icon --></svg>
</a>
```

---

## Required: Target Elements & Focus Management

```html
<!-- Target must have matching unique id -->
<h2 id="installation" tabindex="-1">Installation</h2>

<!-- tabindex="-1" allows programmatic focus without entering tab order -->
```

For sticky/fixed headers, prevent target being obscured:
```css
:target {
  scroll-margin-top: 4rem;
}

h2:focus, h3:focus, h4:focus {
  outline: 3px solid #005fcc;
  outline-offset: 2px;
  scroll-margin-top: 1rem;
}
```

---

## Required: Smooth Scroll Must Respect prefers-reduced-motion

```css
/* Never unconditional */
/* Bad: html { scroll-behavior: smooth; } */

/* Good: */
@media (prefers-reduced-motion: no-preference) {
  html { scroll-behavior: smooth; }
}
```

JavaScript scroll:
```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

link.addEventListener('click', (e) => {
  e.preventDefault();
  const target = document.getElementById(link.hash.slice(1));
  target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  target.focus({ preventScroll: true });
});
```

---

## Required: Skip Link

Must be first focusable element in DOM, visible when focused:

```html
<a class="skip-link" href="#main-content">Skip to main content</a>
<main id="main-content" tabindex="-1">...</main>
```

```css
.skip-link {
  position: absolute;
  top: -100%;
  left: 1rem;
  padding: 0.5rem 1rem;
  background: #000;
  color: #fff;
  font-weight: bold;
  text-decoration: none;
  z-index: 9999;
}
.skip-link:focus { top: 1rem; }
```

---

## Required: URL Stability

- Use meaningful slug IDs (`#installation-guide` not `#section-3`)
- Update `window.location.hash` when JS intercepts anchor clicks
- IDs must not contain spaces; use hyphens as separators

---

## Definition of Done Checklist

- [ ] All link text is descriptive and meaningful out of context
- [ ] Target elements have unique `id` values
- [ ] Non-interactive targets have `tabindex="-1"` if programmatic focus needed
- [ ] Smooth scroll wrapped in `prefers-reduced-motion: no-preference`
- [ ] Skip link present, first in DOM, visible on focus
- [ ] Focus indicators visible on all anchor targets
- [ ] `scroll-margin-top` accounts for any sticky header
- [ ] No focus traps after anchor navigation

---

## Key WCAG Criteria

- 2.4.1 Bypass Blocks (A) — skip links
- 2.4.4 Link Purpose in Context (AA)
- 2.4.7 Focus Visible (AA)
- 2.3.3 Animation from Interactions (AAA) — reduced motion

---

## References

- [Full best practices guide](../../examples/ANCHOR_LINKS_ACCESSIBILITY_BEST_PRACTICES.md)
- [Curated reference sources](references/references.md)
- [WCAG 2.2 Understanding 2.4.4](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html)
