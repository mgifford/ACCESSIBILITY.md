---
title: Progressive Enhancement Best Practices
---

# Progressive Enhancement Best Practices

This document defines project-level expectations for building accessible, resilient web experiences using progressive enhancement.

## 1. Core Principle

Start with a solid foundation that works for every user, then layer enhancements for users whose browsers and devices support them. Every user—regardless of browser capability, network speed, assistive technology, or JavaScript availability—must be able to access core content and complete core tasks.

Progressive enhancement is the opposite of graceful degradation. Rather than building a feature-rich experience and trying to keep it working for less capable environments, you build the baseline first and enhance from there.

## 2. The Three Layers

### Layer 1: Semantic HTML (structure and content)

- Use meaningful, semantic HTML elements that convey structure without CSS or JavaScript.
- All core content must be readable in plain HTML.
- Forms must be submittable with native browser behavior (no JavaScript required for form submission).
- Navigation must function as standard links.
- Headings, lists, tables, and landmark elements must accurately reflect document structure.

### Layer 2: CSS (visual presentation)

- Enhance the visual presentation with CSS, applied after the semantic HTML is in place.
- Use external stylesheets so they can be disabled without affecting content availability.
- Respect user preferences with CSS media queries: `prefers-reduced-motion`, `prefers-color-scheme`, `prefers-contrast`, `forced-colors`.
- Ensure the page remains usable if stylesheets fail to load.

### Layer 3: JavaScript (interactivity and behavior)

- Add scripted interactivity only after the HTML and CSS layers are complete and functional.
- Use JavaScript to enhance the experience, not to gate access to core content or tasks.
- Apply JavaScript-dependent classes, attributes, or behaviors from scripts, not markup (for example, add `js-enhanced` class with JS rather than relying on it in static HTML).
- Handle errors gracefully: if a script fails, the underlying HTML layer must still work.
- Use feature detection (for example, `if ('fetch' in window)`) rather than browser detection.

## 3. Accessibility Benefits

Progressive enhancement directly supports accessibility:

- **Assistive technology compatibility**: Semantic HTML is the most robust foundation for screen readers, braille displays, and other assistive technologies.
- **Keyboard operability**: Native HTML elements (links, buttons, form controls) have built-in keyboard support, reducing the need for custom ARIA.
- **Resilience to script blockers**: Security policies, privacy tools, or corporate firewalls may block scripts; a progressively enhanced page continues to function.
- **Low-bandwidth and offline scenarios**: Users on poor connections or using service-worker offline modes still reach essential content.
- **Cognitive load**: Simpler HTML-first experiences are often easier to navigate and understand.

## 4. Implementation Patterns

### Forms

```html
<!-- Layer 1: works without JS -->
<form action="/search" method="get">
  <label for="query">Search</label>
  <input id="query" name="q" type="search" />
  <button type="submit">Search</button>
</form>
```

Enhance with JavaScript for instant results (fetch API), autocomplete suggestions, or inline validation—while keeping the server-processed form as the fallback.

### Navigation

```html
<!-- Layer 1: plain links always work -->
<nav aria-label="Main">
  <ul>
    <li><a href="/about">About</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>
```

Enhance with JavaScript for dropdown menus or animated transitions, while ensuring all links remain keyboard and screen-reader accessible.

### Dynamic content updates

- Fetch updated content with JavaScript when available.
- Fall back to full-page navigation (standard links or form posts) when JavaScript is unavailable.
- Use `aria-live` regions only after confirming the base content is accessible without them.

### Cutting the mustard (capability detection)

Test for a set of modern features before applying enhancements:

```js
if ('querySelector' in document && 'addEventListener' in window) {
  // apply enhanced experience
}
```

This pattern, popularized by the BBC, allows older or less capable browsers to receive the core HTML experience while modern browsers get the full enhancement.

## 5. What to Avoid

- Do not render page content exclusively in JavaScript; ensure core content exists in the HTML response.
- Do not use `display:none` or `visibility:hidden` on content that must be accessible to all users at the HTML layer.
- Do not require JavaScript to navigate between pages unless a full server-rendered fallback route exists.
- Do not assume a script will execute successfully; always handle failure states.
- Do not conflate progressive enhancement with adding polyfills—polyfills patch missing features, while progressive enhancement builds around their absence.

## 6. Relationship with Graceful Degradation

| Approach | Starting point | Direction |
| :--- | :--- | :--- |
| Progressive enhancement | Simple baseline (HTML) | Build up capabilities |
| Graceful degradation | Full-featured experience | Provide fallbacks |

The W3C describes these as two sides of the same coin, but progressive enhancement is generally preferred because it leads to more robust, accessible, and maintainable code by design.

## 7. Server-Side and Framework Considerations

- **Server-side rendering (SSR)** is the natural partner to progressive enhancement: deliver complete HTML from the server, then hydrate interactivity in the browser.
- When using frameworks (React, Vue, Angular, Svelte), configure SSR or static site generation so core content is available in the initial HTML response.
- Frameworks such as Remix are designed around progressive enhancement: forms and navigation work without JavaScript and are enhanced when it is available.
- Avoid single-page application patterns that require JavaScript to render any visible content.

## 8. Testing Expectations

Minimum checks for each feature:

- Disable JavaScript in the browser and verify core content is readable and core tasks are completable.
- Disable CSS and verify content has a logical reading order.
- Test with a keyboard only (no mouse) with JavaScript enabled and disabled.
- Test with a screen reader (NVDA/Firefox, JAWS/Chrome, VoiceOver/Safari) to confirm the HTML layer is understandable.
- Test on a throttled (3G) network connection.
- Run automated accessibility checks (axe-core) on the base HTML layer.

## 9. Definition of Done

A feature built with progressive enhancement is complete when:

- Core content and task completion work with JavaScript disabled.
- The page is usable with CSS disabled (logical reading order, visible content).
- Enhancements do not break the base experience.
- The feature passes keyboard navigation checks at each layer.
- Automated and manual accessibility checks pass at the HTML layer.

## 10. Further Reading

- [Progressive Enhancement (MDN Web Docs Glossary)](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement)
- [Using progressive enhancement (GOV.UK Service Manual)](https://www.gov.uk/service-manual/technology/using-progressive-enhancement)
- [It's about time I tried to explain what progressive enhancement actually is (Piccalilli)](https://piccalil.li/blog/its-about-time-i-tried-to-explain-what-progressive-enhancement-actually-is/)
- [Progressive Enhancement (Remix docs)](https://v2.remix.run/docs/discussion/progressive-enhancement/)
- [Understanding Progressive Enhancement (A List Apart)](https://alistapart.com/article/understandingprogressiveenhancement/)
- [Graceful degradation versus progressive enhancement (W3C Wiki)](https://www.w3.org/wiki/Graceful_degradation_versus_progressive_enhancement)
