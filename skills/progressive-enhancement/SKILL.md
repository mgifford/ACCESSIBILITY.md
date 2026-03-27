# Progressive Enhancement Accessibility Skill

> **Canonical source**: `examples/PROGRESSIVE_ENHANCEMENT_BEST_PRACTICES.md`
> This skill is derived from that file. When in doubt, the example is authoritative.

Apply these rules when building any web feature or reviewing architecture decisions.

---

## Core Mandate

Start with a solid foundation that works for every user, then layer enhancements. Every user — regardless of browser capability, network speed, assistive technology, or JavaScript availability — must be able to access core content and complete core tasks.

---

## Required: The Three Layers

### Layer 1 — Semantic HTML (always required)
- All core content readable in plain HTML, no CSS or JS required
- Forms submittable with native browser behavior
- Navigation functions as standard links
- Headings, lists, tables, and landmarks accurately reflect document structure

### Layer 2 — CSS (enhance presentation)
- External stylesheets that can be disabled without losing content
- Respect user preferences: `prefers-reduced-motion`, `prefers-color-scheme`, `prefers-contrast`, `forced-colors`
- Page remains usable if stylesheets fail to load

### Layer 3 — JavaScript (enhance interactivity)
- JS enhances; it does not gate access to core content or tasks
- Apply JS-dependent classes/behaviors from scripts, not static markup
- Handle script failure gracefully — the HTML layer must still work
- Use feature detection, not browser detection:

```javascript
if ('fetch' in window && 'querySelector' in document) {
  // apply enhanced experience
}
```

---

## Required: Forms Must Work Without JavaScript

```html
<!-- Layer 1: works without JS -->
<form action="/search" method="get">
  <label for="query">Search</label>
  <input id="query" name="q" type="search">
  <button type="submit">Search</button>
</form>
```

Enhance with JS for instant results/autocomplete/inline validation — while keeping the server-processed form as fallback.

---

## Required: Navigation Must Work Without JavaScript

```html
<!-- Layer 1: plain links always work -->
<nav aria-label="Main">
  <ul>
    <li><a href="/about">About</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>
```

Enhance with JS for dropdowns or animated transitions.

---

## Required: Server-Side Rendering

- Deliver complete HTML from the server; hydrate interactivity in browser
- Core content must be in the initial HTML response — not rendered only by JS
- When using React/Vue/Angular/Svelte: configure SSR or static generation
- Avoid SPA patterns that require JS to render any visible content

---

## Required: Dynamic Content Fallbacks

```javascript
// Always provide a non-JS fallback route
if ('fetch' in window) {
  // Fetch content without full-page reload
  loadContentAsync(url);
} else {
  // Standard link navigation works automatically
}
```

Use `aria-live` regions only after confirming base content is accessible without them.

---

## What to Avoid

- Rendering page content exclusively in JavaScript
- `display:none` / `visibility:hidden` on content that must be accessible at the HTML layer
- Requiring JS to navigate between pages (without server-rendered fallback)
- Assuming scripts will execute — always handle failure states
- Polyfills as a substitute for progressive enhancement (they patch features; PE builds around their absence)

---

## Definition of Done Checklist

- [ ] Core content readable with JavaScript disabled
- [ ] Core tasks completable with JavaScript disabled
- [ ] Forms submit via native browser behavior (no JS required)
- [ ] Navigation works as standard HTML links
- [ ] CSS respects `prefers-reduced-motion`, `prefers-color-scheme`, `prefers-contrast`
- [ ] Script failure handled gracefully
- [ ] Feature detection used (not browser detection)
- [ ] SSR or static generation configured for JS frameworks
- [ ] Tested: disable JS → verify core content; disable CSS → verify logical reading order

---

## Key WCAG Criteria

- 2.1.1 Keyboard (A) — native elements have built-in keyboard support
- 4.1.1 Parsing (A) — semantic HTML foundation
- 4.1.2 Name, Role, Value (A)

---

## References

- [Full best practices guide](../../examples/PROGRESSIVE_ENHANCEMENT_BEST_PRACTICES.md)
- [Curated reference sources](references/references.md)
