---
title: Anchor Links Accessibility Best Practices
---

# Anchor Links Accessibility Best Practices

This document defines project-level expectations for creating accessible anchor links (in-page links and heading links). It covers link text quality, focus management, smooth-scroll animation, and testing.

## 1. Core Principle

Anchor links let users jump to specific sections of a page. To be accessible, every anchor link must have meaningful text, a reachable target with a visible focus indicator, and must not cause motion-related harm when animation is used.

## 2. Meaningful Link Text

### Write descriptive anchor text

Link text must make sense out of context. Screen reader users can navigate by listing all links on a page; vague phrases like "click here" or "read more" are not useful.

**Do not use:**

```html
<!-- Avoid: vague, non-descriptive text -->
<a href="#section">Click here</a>
<a href="#section">Read more</a>
<a href="#section">More</a>
```

**Use instead:**

```html
<!-- Good: describes the target -->
<a href="#installation">Installation instructions</a>
<a href="#wcag-criteria">Relevant WCAG success criteria</a>
```

### Keep link text concise and front-loaded

Put the most important words first. This helps users who scan headings or link lists.

```html
<!-- Good: key topic first -->
<a href="#keyboard-support">Keyboard support requirements</a>

<!-- Avoid: article or preposition first -->
<a href="#keyboard-support">The requirements for keyboard support</a>
```

### Do not rely on surrounding context

The link must be understandable when read alone, without the surrounding sentence.

```html
<!-- Avoid: meaning depends on surrounding prose -->
<p>For more details, <a href="#criteria">see this section</a>.</p>

<!-- Good: meaning is self-contained -->
<p>For more details, see <a href="#criteria">WCAG success criteria for links</a>.</p>
```

### Add accessible names when the visible text cannot be changed

When the visible text must stay short (for example, a heading link icon), add an accessible name with `aria-label` or visually-hidden text:

```html
<!-- Visible icon link with accessible name -->
<a href="#installation" aria-label="Link to Installation section">
  <svg aria-hidden="true" focusable="false"><!-- anchor icon --></svg>
</a>

<!-- Visually-hidden technique (preferred when possible) -->
<a href="#installation">
  <span aria-hidden="true">#</span>
  <span class="visually-hidden">Link to Installation section</span>
</a>
```

```css
/* Standard visually-hidden helper */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

## 3. Target Elements and Focus Management

### Use a valid `id` on the target

Every anchor target must have a matching, unique `id`. Duplicate `id` values cause unpredictable behavior.

```html
<!-- Target element -->
<h2 id="installation">Installation</h2>

<!-- Link to it -->
<a href="#installation">Jump to Installation</a>
```

### Ensure the target can receive focus

Non-interactive elements (headings, `<div>`, `<section>`) do not receive focus by default. If you need the browser to scroll the target into view **and** move keyboard focus to it (for example, after an in-page navigation), add `tabindex="-1"` to the target so it can be programmatically focused.

```html
<h2 id="installation" tabindex="-1">Installation</h2>
```

`tabindex="-1"` removes the element from the natural tab order but allows `.focus()` to be called on it by scripts. Use this when you need to call `document.getElementById('installation').focus()` after navigation.

### Do not trap focus

After the user follows an anchor link, focus must be moveable naturally (Tab, Shift+Tab). Never leave the user stranded on a non-interactive element without a clear exit.

### Provide a visible focus indicator on the target

When a target heading or section receives focus (either natively or via `tabindex="-1"`), the focus indicator must be visible and meet WCAG contrast requirements. Do not suppress the default `:focus` style without providing an equivalent replacement.

```css
/* Ensure heading anchor targets show focus when focused */
h2:focus,
h3:focus,
h4:focus {
  outline: 3px solid #005fcc;
  outline-offset: 2px;
  scroll-margin-top: 1rem; /* accounts for sticky headers */
}
```

### Account for sticky or fixed headers

Fixed navigation bars obscure the target element when an anchor link is followed. Use `scroll-margin-top` (or `scroll-padding-top` on the scroll container) to offset the scroll position:

```css
/* Offset all heading targets by the height of a sticky header */
:target {
  scroll-margin-top: 4rem;
}
```

## 4. Smooth Scroll Animation and `prefers-reduced-motion`

### Never use unconditional smooth scroll

Smooth-scroll animation can cause nausea, dizziness, or disorientation for users with vestibular disorders. Never apply it unconditionally.

**Do not use:**

```css
/* Avoid: applies animation unconditionally */
html {
  scroll-behavior: smooth;
}
```

### Wrap all animation in `prefers-reduced-motion`

The `prefers-reduced-motion` media query reflects the user's operating-system preference to reduce motion. Always honour it:

```css
/* Only apply smooth scroll when the user has not requested reduced motion */
@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}
```

The same pattern applies to JavaScript-driven scroll:

```js
const prefersReducedMotion =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

link.addEventListener('click', (event) => {
  event.preventDefault();
  const target = document.getElementById(link.hash.slice(1));
  target.scrollIntoView({
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
  });
  target.focus({ preventScroll: true });
});
```

### Do not animate other properties unconditionally

When decorating anchor links (for example, fade-in effects, sliding indicators, or scroll-spy highlights), apply the same `prefers-reduced-motion` guard:

```css
@media (prefers-reduced-motion: no-preference) {
  .anchor-highlight {
    transition: background-color 0.3s ease;
  }
}
```

## 5. URL and Fragment Considerations

### Update the URL fragment on navigation

When JavaScript intercepts an anchor click for smooth scroll, update `window.location.hash` or use `history.pushState` so the URL reflects the current position. This allows users to bookmark, share, and reload to the same location.

```js
history.pushState(null, '', '#' + targetId);
```

### Keep `id` values stable and meaningful

Avoid auto-generated numeric IDs such as `#section-3`. Use meaningful, URL-friendly slugs that do not change when content is reordered:

```html
<!-- Prefer -->
<h2 id="installation-guide">Installation guide</h2>

<!-- Avoid -->
<h2 id="section-3">Installation guide</h2>
```

### Encode special characters

`id` values must not contain spaces or characters that require percent-encoding in URLs. Use hyphens as word separators:

```html
<!-- Good -->
<h2 id="api-reference">API Reference</h2>

<!-- Avoid -->
<h2 id="api reference">API Reference</h2>
```

## 6. Skip Links and In-Page Navigation

### Provide a skip-to-main-content link

A skip link is the most common form of anchor link. It must be the first focusable element in the DOM and must be visible when focused:

```html
<!-- Place immediately after <body> -->
<a class="skip-link" href="#main-content">Skip to main content</a>

<header><!-- navigation --></header>
<main id="main-content" tabindex="-1">
  <!-- page content -->
</main>
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

.skip-link:focus {
  top: 1rem;
}

@media (prefers-reduced-motion: no-preference) {
  .skip-link {
    transition: top 0.1s ease;
  }
}
```

### Table-of-contents links

When providing in-page navigation (table of contents), follow the same rules as all anchor links: descriptive text, matching `id` targets, and no unconditional animation.

## 7. WCAG Success Criteria

| Criterion | Level | Relevance |
| :--- | :--- | :--- |
| [1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html) | A | Icon-only anchor links require text alternatives |
| [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) | A | Heading structure that anchor links target must convey document structure semantically |
| [2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html) | A | Anchor links and their targets must be keyboard operable |
| [2.1.2 No Keyboard Trap](https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html) | A | Following an anchor link must not trap keyboard focus |
| [2.4.1 Bypass Blocks](https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html) | A | Skip links are an anchor-link implementation of this criterion |
| [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html) | A | Focus must move to the anchor target in a logical order |
| [2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html) | A | Link text must be meaningful in context |
| [2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html) | AA | Focused anchor targets must show a visible focus indicator |
| [2.4.9 Link Purpose (Link Only)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-link-only.html) | AAA | Link text should be understandable without surrounding context |
| [2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) | AAA | Smooth scroll must respect `prefers-reduced-motion`; AAA target but strongly recommended |

## 8. Testing Expectations

### Automated checks

Run automated checks with axe-core or equivalent:

- Links must have accessible names (`link-name` rule).
- `id` values must be unique (`duplicate-id` rule).
- Images inside links must have alt text.

### Keyboard testing

For each anchor link:

1. Tab to the anchor link and confirm focus is visible.
2. Press **Enter** to follow the link.
3. Confirm focus moves to the target or to the nearest focusable ancestor.
4. Confirm the target is scrolled into view and not obscured by a fixed header.
5. Tab forward from the target and confirm focus continues logically through the page.

### Screen reader testing

With NVDA/Firefox, JAWS/Chrome, or VoiceOver/Safari:

1. Open the Links list (NVDA: Insert+F7; JAWS: Insert+F7; VoiceOver: VO+U then arrow to Links).
2. Verify every anchor link has a unique, descriptive name.
3. Activate an anchor link and confirm the screen reader announces the target heading or landmark.

### Motion testing

1. In the operating system settings, enable **Reduce Motion** (macOS/iOS) or **Show animations in Windows** set to Off.
2. Reload the page and follow an anchor link.
3. Confirm no smooth-scroll animation occurs; the page should jump instantly to the target.

## 9. Definition of Done

An anchor link implementation is complete when:

- All links have descriptive, context-independent text or accessible names.
- Target elements have unique, stable `id` values.
- Focus moves to the target when the link is followed.
- A visible focus indicator appears on the target.
- Fixed headers are accounted for using `scroll-margin-top` or `scroll-padding-top`.
- Smooth-scroll animation is only applied inside a `prefers-reduced-motion: no-preference` media query.
- The URL fragment is updated so the location is bookmarkable.
- Skip links are functional and visible on focus.
- Automated, keyboard, screen reader, and motion tests pass.

## 10. Further Reading

- [Anchor Links and How to Make Them Awesome (codersblock.com)](https://codersblock.com/blog/anchor-links-and-how-to-make-them-awesome/)
- [Are Your Anchor Links Accessible? (Amber Wilson)](https://amberwilson.co.uk/blog/are-your-anchor-links-accessible/)
- [prefers-reduced-motion (MDN Web Docs)](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)
- [Understanding Success Criterion 2.4.1 Bypass Blocks (W3C)](https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html)
- [Understanding Success Criterion 2.4.4 Link Purpose (W3C)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html)
- [CSS Tricks: prefers-reduced-motion](https://css-tricks.com/almanac/rules/m/media/prefers-reduced-motion/)
- [Skip Navigation Links (WebAIM)](https://webaim.org/techniques/skipnav/)
- [Link Accessibility (WebAIM)](https://webaim.org/techniques/hypertext/)
- [Keyboard Accessibility Best Practices](./KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md)
