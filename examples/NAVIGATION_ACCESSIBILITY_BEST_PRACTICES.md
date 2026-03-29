---
title: Navigation Accessibility Best Practices
---

# Navigation Accessibility Best Practices

This document defines project-level requirements for accessible navigation patterns,
including primary navigation, dropdowns, breadcrumbs, pagination, and mobile menus.

## 1. Core Principle

Navigation is how users find content. Screen reader users rely on landmark structure
to orient themselves; keyboard users rely on predictable tab order and dropdown
behaviour; voice control users rely on visible, correctly-labelled interactive
elements; magnification users rely on nav that reflows without breaking.

## 2. Landmark Structure

Every page must have navigational landmarks. A missing `<nav>` landmark is a serious
issue — screen reader users cannot jump to navigation via the rotor or landmarks list.

- `<nav>` wraps every navigation region.
- When multiple `<nav>` elements are present, every one needs a unique `aria-label`.
- `aria-label` must be short and descriptive: "Main", "Footer", "Breadcrumb", "Pagination".
- Do not add "navigation" to the label — screen readers already announce the landmark role.

```html
<!-- Skip link — always first in <body> -->
<a class="skip-link" href="#main">Skip to main content</a>

<!-- Primary navigation -->
<header role="banner">
  <nav aria-label="Main">
    <ul>
      <li><a href="/" aria-current="page">Home</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/services">Services</a></li>
    </ul>
  </nav>
</header>

<!-- Main content -->
<main id="main" tabindex="-1">…</main>

<!-- Secondary navigation (if present) -->
<nav aria-label="Footer">…</nav>
```

## 3. Skip Link

The skip link must be the first focusable element in the document and must be visible
when focused. A permanently hidden skip link (via `display:none`) defeats WCAG 2.4.1.

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

The skip link target (`#main`) needs `tabindex="-1"` so focus can be moved to it
programmatically even though `<main>` is not natively focusable.

## 4. `aria-current="page"`

The current page link must be identified programmatically. Missing `aria-current`
is a serious issue — screen reader users cannot determine where they are in the site.

```html
<nav aria-label="Main">
  <ul>
    <li><a href="/" aria-current="page">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>
```

`aria-current="page"` is the correct value for links to the current page. Always
pair it with a visible current-page indicator — sighted users cannot see ARIA.

Use `aria-current="step"` for the current step in a wizard or multi-step flow.

## 5. Do Not Use `role="menu"` for Site Navigation

Using `role="menu"` on site navigation is a serious and common ARIA mistake.
`role="menu"` signals a desktop-application-style menu that puts screen readers
into application-menu interaction mode: arrow keys navigate items and Tab exits
the menu entirely.

Standard site navigation uses native `<a>` elements in `<ul>` lists inside `<nav>`.
No ARIA menu roles needed.

```html
<!-- Wrong — creates wrong AT interaction model -->
<nav>
  <ul role="menu">
    <li role="menuitem"><a href="/about">About</a></li>
  </ul>
</nav>

<!-- Right — native semantics, no ARIA menu roles -->
<nav aria-label="Main">
  <ul>
    <li><a href="/about">About</a></li>
  </ul>
</nav>
```

The only appropriate use of `role="menu"` / `role="menuitem"` on the web is for
application toolbar menus that genuinely replicate desktop app behaviour with full
arrow-key navigation. See the WAI-ARIA APG menubar pattern for that use case.

## 6. Dropdown / Disclosure Navigation

The recommended pattern for dropdown submenus is the Disclosure pattern — not the
APG Menubar pattern. Disclosure is simpler, has broader AT support, and is what most
users expect from web navigation.

Do not mix a link and a dropdown trigger on a single element. If "Services" is both
a link to `/services` and the trigger for a dropdown, keyboard users cannot expand
the dropdown without navigating away. Use a separate button for the trigger.

```html
<nav aria-label="Main">
  <ul>
    <li>
      <!-- Option A: link navigates; separate button opens dropdown -->
      <a href="/services">Services</a>
      <button type="button"
              aria-expanded="false"
              aria-controls="services-submenu"
              aria-label="Services submenu">
        <svg aria-hidden="true" focusable="false"><!-- chevron icon --></svg>
      </button>
      <ul id="services-submenu" hidden>
        <li><a href="/services/web">Web</a></li>
        <li><a href="/services/mobile">Mobile</a></li>
      </ul>
    </li>
  </ul>
</nav>
```

```js
document.querySelectorAll('[aria-controls][aria-expanded]').forEach(trigger => {
  const target = document.getElementById(trigger.getAttribute('aria-controls'));

  trigger.addEventListener('click', () => {
    const expanded = trigger.getAttribute('aria-expanded') === 'true';
    trigger.setAttribute('aria-expanded', String(!expanded));
    target.hidden = expanded;
  });

  // Escape closes the dropdown and returns focus to trigger
  target.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      trigger.setAttribute('aria-expanded', 'false');
      target.hidden = true;
      trigger.focus();
    }
  });
});
```

If hover also opens dropdowns, add a short CSS delay so users with motor impairments
can move the pointer into the submenu without it closing:

```css
.submenu { transition-delay: 0.2s; }
```

## 7. Breadcrumbs

```html
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/services">Services</a></li>
    <li><a href="/services/web" aria-current="page">Web Design</a></li>
  </ol>
</nav>
```

- Use `<ol>` (ordered list) — breadcrumbs have a meaningful sequence.
- `aria-label="Breadcrumb"` distinguishes it from other nav landmarks.
- `aria-current="page"` on the current item.

## 8. Pagination

```html
<nav aria-label="Pagination">
  <ul>
    <li>
      <a href="/articles?page=1" aria-label="Previous page">
        <span aria-hidden="true">←</span>
      </a>
    </li>
    <li><a href="/articles?page=1">1</a></li>
    <li><a href="/articles?page=2" aria-current="page" aria-label="Page 2, current">2</a></li>
    <li><a href="/articles?page=3">3</a></li>
    <li>
      <a href="/articles?page=3" aria-label="Next page">
        <span aria-hidden="true">→</span>
      </a>
    </li>
  </ul>
</nav>
```

Previous/Next arrows need descriptive `aria-label` — arrow symbols alone are not
meaningful to screen reader users.

## 9. Mobile Navigation (Hamburger)

```html
<button type="button"
        id="mobile-menu-toggle"
        aria-expanded="false"
        aria-controls="mobile-nav"
        aria-label="Open main menu">
  <svg aria-hidden="true" focusable="false"><!-- hamburger icon --></svg>
</button>

<nav id="mobile-nav" aria-label="Main" hidden>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>
```

When the nav opens, move focus to the first link. When the nav closes, return focus
to the toggle button. Apply `inert` to background content while the mobile nav is open.

## 10. Voice Control Compatibility

Voice Control users (Dragon NaturallySpeaking, iOS Voice Control) navigate by
speaking visible link text. If `aria-label` differs from or overrides visible text,
the user cannot activate the element by speaking what they see (WCAG 2.5.3 Label in Name).

The accessible name must contain the visible text. Adding context is fine:
"Services submenu" when the button is labelled "Services" is correct.
Replacing visible text entirely is a serious issue.

## 11. SPA and Framework Navigation

Single-page apps must announce page changes after navigation. When a route changes:
- Move focus to the new page's `<h1>` or a designated skip target.
- Announce the page title via a `role="status"` live region.

Without this, screen reader users hear nothing after navigation.

## 12. Testing Expectations

- Tab through navigation using keyboard only; verify logical focus order.
- Verify each `<nav>` element has a unique and descriptive `aria-label`.
- Verify skip link appears on focus and target has `tabindex="-1"`.
- Open and close dropdowns with keyboard; verify `Escape` closes and returns focus.
- Verify `aria-current="page"` on the current page link.
- Test with VoiceOver rotor — each nav landmark should be clearly identified.
- Test with voice control — all links should be activatable by speaking visible text.
- Test at 200% zoom — nav must not obscure content.

## 13. Definition of Done

A navigation change is not complete unless:

- `<nav>` landmark wraps every navigation region with a unique `aria-label`.
- Skip link is first in DOM, visible on focus, and target has `tabindex="-1"`.
- `aria-current="page"` is on the current page link in every nav.
- `role="menu"` / `role="menuitem"` is not used on site navigation.
- Dropdowns use the Disclosure pattern: `aria-expanded`, `aria-controls`, `hidden`.
- `Escape` closes dropdown and returns focus to trigger.
- Mobile nav: focus moves into nav on open, returns to toggle on close.
- SPA/framework: focus moved and page title announced after route change.
- Manual keyboard and screen reader test passes.

---

## References

- [WAI Menus Tutorial](https://www.w3.org/WAI/tutorials/menus/)
- [WAI-ARIA APG — Disclosure Navigation](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/)
- [WCAG 2.2 Understanding 2.4.1 Bypass Blocks](https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html)
- [WCAG 2.2 Understanding 2.5.3 Label in Name](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html)
- [Drupal Accessibility Coding Standards](https://www.drupal.org/docs/getting-started/accessibility/accessibility-coding-standards)

### Machine-Readable Standards

For AI systems and automated tooling, see [wai-yaml-ld](https://github.com/mgifford/wai-yaml-ld) for structured accessibility standards:

- [WCAG 2.2 (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wcag-2.2-normative.yaml) - Machine-readable WCAG 2.2 normative content including bypass blocks and focus criteria
- [ARIA Informative (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wai-aria-informative.yaml) - ARIA navigation landmark roles and disclosure pattern
- [HTML Living Standard Accessibility (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/html-living-standard-accessibility.yaml) - HTML nav element accessibility
- [Standards Link Graph (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/standards-link-graph.yaml) - Relationships across WCAG/ARIA/HTML navigation standards
