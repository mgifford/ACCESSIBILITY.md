---
title: Navigation Accessibility Best Practices
---

# Navigation Accessibility Best Practices

This document defines project-level requirements for page landmarks, site navigation, disclosure navigation, skip mechanisms, breadcrumbs, pagination, responsive navigation, current-location indicators, and client-side route changes.

Navigation must remain understandable and operable with keyboards, touch, speech input, screen readers, screen magnification, text resizing, and browser zoom.

---

## 1. Required outcomes

Users must be able to:

- Identify major page regions and navigation areas.
- Bypass repeated blocks of content.
- Reach and operate every navigation control with a keyboard and pointer.
- Understand each link’s purpose from its text and context.
- Determine their current location when the interface provides a current-location indicator.
- Open, navigate, and dismiss responsive and disclosure navigation without a keyboard trap.
- Find pages through more than one method where WCAG 2.4.5 applies.
- Encounter repeated navigation in a consistent relative order.
- Navigate at 200% and 400% zoom without lost, clipped, overlapping, or obscured content.
- Understand a client-side route change without needing to infer it visually.

---

## 2. Prioritizing navigation defects

Do not assign severity from the pattern alone. Determine the actual effect on navigation and task completion.

Consider:

- Whether users can reach the main content
- Whether a menu can be opened, operated, closed, and left
- Whether focus becomes trapped, lost, or obscured
- Whether the defect affects every page through a shared header or component
- Whether another navigation method remains available
- Whether visible and accessible names support speech input
- Whether the problem appears only at particular breakpoints or zoom levels
- Whether users can still determine link purpose and current location

A shared navigation trap can block an entire site. A missing `aria-current` value may reduce orientation but does not automatically have the same impact on every site or page.

---

## 3. Page regions and navigation landmarks

Use HTML landmarks to identify major page regions.

```html
<a class="skip-link" href="#main-content">Skip to main content</a>

<header>
  <a href="/">Service name</a>

  <nav aria-label="Primary">
    <ul>
      <li><a href="/services">Services</a></li>
      <li><a href="/guidance">Guidance</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>
</header>

<main id="main-content" tabindex="-1">
  <h1>Page title</h1>
  <!-- Main page content -->
</main>

<footer>
  <nav aria-label="Footer">
    <!-- Site-wide footer links -->
  </nav>
</footer>
```

Use `<nav>` for major groups of links that help users navigate the site, page, or process. Do not wrap every incidental link list in a navigation landmark. Excess landmarks make region navigation harder rather than easier.

### Naming navigation landmarks

When a page contains multiple navigation landmarks, give them understandable names so users can distinguish them.

```html
<nav aria-label="Primary">…</nav>
<nav aria-label="On this page">…</nav>
<nav aria-label="Footer">…</nav>
```

If a visible heading names the region, use `aria-labelledby`:

```html
<nav aria-labelledby="section-navigation-heading">
  <h2 id="section-navigation-heading">In this section</h2>
  <!-- Links -->
</nav>
```

- Do not include the role word in the name. A screen reader already exposes the navigation role, so prefer “Primary” to “Primary navigation landmark.”
- Use the same name for repeated navigation landmarks that contain the same links.
- Use different names when the landmarks serve different purposes or contain different link sets.
- Do not add redundant `role="navigation"` to `<nav>`.

---

## 4. Bypassing repeated blocks

Provide a mechanism to bypass repeated navigation and reach the main content. A visible-on-focus skip link is a common solution.

```html
<a class="skip-link" href="#main-content">Skip to main content</a>
```

```css
.skip-link {
  position: fixed;
  z-index: 1000;
  inset-block-start: 0.5rem;
  inset-inline-start: 0.5rem;
  padding: 0.75rem 1rem;
  color: #ffffff;
  background: #000000;
  transform: translateY(-200%);
}

.skip-link:focus {
  transform: translateY(0);
}
```

Requirements:

- Put the skip link at or near the beginning of the body and before the content it bypasses.
- Ensure it becomes completely visible when focused.
- Ensure activation moves both the viewport and keyboard focus to the intended destination.
- Use `tabindex="-1"` on a non-interactive target such as `<main>` when needed for reliable focus movement.
- Do not use `display: none`, `visibility: hidden`, or the `hidden` attribute on the focusable skip link.
- Ensure sticky headers do not obscure the destination.

A skip link does not have to be the first node in `<body>`, but it should be one of the first useful keyboard stops. WCAG also permits other conforming bypass mechanisms, such as appropriate headings or landmarks, depending on the content and conformance approach.

---

## 5. Link purpose and visible labels

Use link text that identifies its destination or purpose from the text alone or together with its programmatically determined context.

```html
<!-- Prefer -->
<a href="/reports/2026-accessibility">Read the 2026 accessibility report</a>

<!-- Avoid repeated ambiguous links without useful context -->
<a href="/reports/2026-accessibility">Read more</a>
```

For controls used with speech input, ensure the accessible name contains the visible text.

```html
<a href="/contact" aria-label="Contact our accessibility team">Contact</a>
```

The accessible name contains the visible word “Contact.” Avoid an `aria-label` that replaces visible text with unrelated wording.

Prefer visible text for major navigation actions. An icon-only control can be accessible when it has an accurate name and a familiar or explained visual treatment, but visible text usually improves recognition and speech-input operation.

If a navigation link opens a new window or tab, warn users in visible text or consistently explained supporting text when the change would otherwise be unexpected.

---

## 6. Current location and state

Use `aria-current` when a navigation interface visually identifies the current item.

```html
<nav aria-label="Primary">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/guidance" aria-current="page">Guidance</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>
```

Also provide a visible current-item treatment that does not rely on colour alone.

Use the value that matches the relationship:

- `aria-current="page"` for the current page
- `aria-current="step"` for the current step in a process
- `aria-current="location"` for the current location within an environment
- `aria-current="date"` or `time` where applicable
- `aria-current="true"` only when a more specific token does not apply

Do not use `aria-selected` for ordinary navigation links. Reserve it for widgets whose selected state is part of their role, such as tabs or listboxes.

---

## 7. Site navigation is not an application menu

Use native lists and links for ordinary site navigation.

```html
<nav aria-label="Primary">
  <ul>
    <li><a href="/about">About</a></li>
    <li><a href="/services">Services</a></li>
  </ul>
</nav>
```

Do not add `role="menu"`, `menubar`, or `menuitem` to ordinary site navigation. Those roles describe application-style menus with a different focus and arrow-key model. They require the complete corresponding keyboard implementation.

Application menus, action menus, context menus, and similar widgets may use menu roles when they genuinely implement that interaction pattern. The distinction is based on behaviour and purpose, not visual appearance.

---

## 8. Disclosure navigation

Use disclosure buttons for site navigation that shows and hides nested link lists. Do not force ordinary site navigation into the ARIA menubar pattern.

### Parent link with a separate disclosure button

Use separate controls when a parent item must both navigate and expose child links.

```html
<nav aria-label="Primary" data-disclosure-nav>
  <ul>
    <li data-disclosure-item>
      <a href="/services">Services</a>
      <button
        type="button"
        aria-expanded="false"
        aria-controls="services-links"
      >
        <span class="visually-hidden">Show Services submenu</span>
        <svg aria-hidden="true" focusable="false" viewBox="0 0 20 20">
          <path d="m5 7 5 5 5-5" fill="none" stroke="currentColor" stroke-width="2"/>
        </svg>
      </button>

      <ul id="services-links" hidden>
        <li><a href="/services/design">Design</a></li>
        <li><a href="/services/development">Development</a></li>
      </ul>
    </li>
  </ul>
</nav>
```

If the parent does not have a destination, use one visible button to disclose the child links. Consider including an “Overview” link as the first child when users need a parent landing page.

### Scoped JavaScript

```javascript
document.querySelectorAll('[data-disclosure-nav]').forEach((navigation) => {
  const buttons = Array.from(
    navigation.querySelectorAll('[data-disclosure-item] > button[aria-controls]')
  );

  function close(button, restoreFocus = false) {
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    button.setAttribute('aria-expanded', 'false');
    panel.hidden = true;

    const label = button.querySelector('.visually-hidden');
    if (label) label.textContent = label.textContent.replace('Hide ', 'Show ');
    if (restoreFocus) button.focus();
  }

  function open(button) {
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    button.setAttribute('aria-expanded', 'true');
    panel.hidden = false;

    const label = button.querySelector('.visually-hidden');
    if (label) label.textContent = label.textContent.replace('Show ', 'Hide ');
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      if (expanded) close(button); else open(button);
    });

    const item = button.closest('[data-disclosure-item]');

    item.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
        event.preventDefault();
        close(button, true);
      }
    });

    item.addEventListener('focusout', (event) => {
      if (!item.contains(event.relatedTarget)) close(button);
    });
  });

  document.addEventListener('pointerdown', (event) => {
    buttons.forEach((button) => {
      const item = button.closest('[data-disclosure-item]');
      if (!item.contains(event.target)) close(button);
    });
  });
});
```

Requirements:

- The disclosure button is keyboard focusable and uses `aria-expanded`.
- `aria-controls` references the disclosed element.
- The `hidden` state and `aria-expanded` state remain synchronized.
- Tab and Shift+Tab follow ordinary link and button order.
- Escape closes an open submenu and returns focus to its button.
- Moving focus outside the complete parent item closes its submenu.
- Opening does not automatically move focus or change the page.
- The component remains usable without hover.
- JavaScript is scoped to the navigation component rather than every `aria-controls` element on the page.

The example updates the visually hidden action name. A project may instead use a stable name such as “Services submenu” and rely on the announced expanded/collapsed state. Choose one convention and test it rather than producing repetitive announcements.

---

## 9. Optional hover behaviour

Click or activation must be sufficient to open disclosure navigation. Hover is optional.

If pointer hover or keyboard focus causes additional content to appear and then disappear, WCAG 1.4.13 requires the additional content to be:

- **Dismissible:** users can dismiss it without moving focus or pointer, unless it does not obscure or replace other content.
- **Hoverable:** users can move the pointer onto the additional content without it disappearing.
- **Persistent:** it remains until hover/focus is removed, the user dismisses it, or the information is no longer valid.

Do not open a complex submenu merely because its trigger receives focus. That can surprise keyboard users and create unwanted content changes during ordinary Tab navigation.

A CSS `transition-delay` does not keep an element with `hidden` available and does not, by itself, satisfy hoverable or persistent behaviour.

---

## 10. Breadcrumbs

Use an ordered list inside a named navigation landmark.

```html
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/services">Services</a></li>
    <li aria-current="page">Web accessibility</li>
  </ol>
</nav>
```

- Use `<ol>` because breadcrumb order is meaningful.
- Hide decorative separators from assistive technology, preferably through CSS.
- Use `aria-current="page"` on the current item when it is represented in the breadcrumb.
- The current item may be plain text or a link. Do not create a link that performs no useful navigation.
- Keep the visible breadcrumb consistent with the page hierarchy users actually experience.

Breadcrumbs can support orientation and provide another navigation route, but WCAG does not require breadcrumbs on every site.

---

## 11. Pagination

Use visible Previous and Next text where space permits.

```html
<nav aria-label="Pagination">
  <ul>
    <li><a href="?page=1" rel="prev">Previous</a></li>
    <li><a href="?page=1" aria-label="Page 1">1</a></li>
    <li><a href="?page=2" aria-label="Page 2" aria-current="page">2</a></li>
    <li><a href="?page=3" aria-label="Page 3">3</a></li>
    <li><a href="?page=3" rel="next">Next</a></li>
  </ul>
</nav>
```

- Name the pagination landmark when other navigation landmarks are present.
- Use `aria-current="page"` for the current result page.
- Ensure the current page has a visible non-colour distinction.
- If only an arrow is visible, provide an accessible name containing “Previous” or “Next.”
- Do not create links for unavailable Previous or Next actions. Use text or a properly disabled button only when the interaction is an application action rather than navigation.
- Preserve filters, search terms, sort order, and other relevant state in pagination URLs.

The visible page number provides useful text. An `aria-label` such as “Page 2” may add context, but test the resulting verbosity and ensure the accessible name contains the visible number.

---

## 12. Responsive navigation

Treat a typical responsive menu as a non-modal disclosure unless the design genuinely requires a modal navigation drawer.

```html
<button
  type="button"
  id="navigation-toggle"
  aria-expanded="false"
  aria-controls="responsive-navigation"
>
  <span>Menu</span>
  <svg aria-hidden="true" focusable="false"><!-- menu icon --></svg>
</button>

<nav id="responsive-navigation" aria-label="Primary" hidden>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/services">Services</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>
```

```javascript
const toggle = document.getElementById('navigation-toggle');
const navigation = document.getElementById('responsive-navigation');

function setNavigationOpen(open) {
  toggle.setAttribute('aria-expanded', String(open));
  navigation.hidden = !open;
}

toggle.addEventListener('click', () => {
  setNavigationOpen(toggle.getAttribute('aria-expanded') !== 'true');
});

navigation.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    setNavigationOpen(false);
    toggle.focus();
  }
});
```

For a non-modal disclosure:

- Keep the toggle immediately before the navigation in the DOM where practical.
- Do not make the rest of the page inert.
- Do not trap focus.
- Do not force focus into the first link. Tab naturally moves from the toggle into the revealed navigation.
- Support Escape as a convenient way to close and return.
- Ensure links that follow the navigation remain reachable.

If the navigation is a genuinely modal drawer, implement it as a modal dialog with focus containment, an accessible name, a visible close button, Escape handling, background inertness, and focus restoration. Do not create partial modality by applying `inert` without the complete modal interaction.

---

## 13. Consistent navigation

Navigation mechanisms repeated across a set of pages must occur in the same relative order unless the user initiates a change.

- Keep primary navigation placement and relative order consistent.
- Keep repeated link names and destinations consistent.
- Preserve familiar responsive behaviour across page templates.
- Do not reorder navigation based on inferred user characteristics without an explicit user-controlled personalization feature.
- When a user customizes navigation, preserve the chosen arrangement and provide a way to reset it.

Consistency does not require every page to contain identical navigation. Contextual additions are acceptable when repeated mechanisms retain their relative order.

---

## 14. Multiple ways to find pages

For pages within a set of pages, provide more than one way to locate a page unless it is a step or result within a process.

Possible mechanisms include:

- Hierarchical site navigation
- Site search
- Sitemap
- Table of contents
- Index
- Links from related pages

Two presentations of the same navigation list do not necessarily provide meaningfully different ways to find content. Choose mechanisms that support different user strategies.

---

## 15. Zoom, reflow, and magnification

At 200% and 400% zoom and narrow viewport widths:

- Navigation content must reflow without two-dimensional scrolling, except where a WCAG exception applies.
- Menu controls, labels, and focus indicators must not be clipped.
- Sticky navigation must not consume an unreasonable portion of the viewport.
- Open navigation must not obscure the focused component.
- Users must be able to dismiss persistent overlays.
- Touch and pointer targets must remain usable without overlap.
- Text-spacing overrides must not hide or overlap labels.

Test with browser zoom rather than only resizing the desktop window. Test landscape and portrait orientations where supported.

---

## 16. Client-side routing and dynamic navigation

A client-side route change must establish a clear new-page context.

At minimum:

- Update the document title.
- Update the main heading and current-location state.
- Move focus to a logical target when the route change otherwise leaves users in an obsolete context.
- Preserve browser Back and Forward behaviour.
- Avoid duplicate announcements.

One common strategy is to focus the new page heading:

```html
<main id="main-content">
  <h1 id="page-heading" tabindex="-1">Account settings</h1>
  <!-- New route content -->
</main>
```

```javascript
document.title = 'Account settings · Service name';
document.getElementById('page-heading').focus();
```

Do not automatically combine heading focus, main-region focus, assertive live regions, and route announcements. That can produce repeated or interrupted output. Choose one tested focus and announcement strategy for the application.

When a route change follows a normal link, preserve the semantics and URL behaviour users expect from a link. Do not use a button for navigation merely because JavaScript handles the route.

---

## 17. CMS and component integration

Navigation is usually generated by shared templates, CMS menu systems, or design-system components. Review the rendered output rather than assuming the framework produces the required result.

Verify that the integration:

- Uses native links and navigation landmarks
- Generates stable IDs for disclosure relationships
- Adds and updates `aria-current` where the design exposes current location
- Keeps visible and accessible names aligned
- Does not add menu roles to site navigation
- Synchronizes `aria-expanded` and hidden state
- Supports nested navigation without duplicate IDs
- Preserves link URLs when JavaScript fails
- Does not duplicate primary navigation landmarks at responsive breakpoints
- Removes hidden responsive variants from the focus order and accessibility tree

Prefer correcting the shared menu template or component over patching individual pages.

---

## 18. Testing expectations

### Structure and orientation

- [ ] Inspect the landmark list and confirm that major regions are present and distinguishable.
- [ ] Confirm incidental link groups do not create unnecessary landmarks.
- [ ] Confirm repeated identical navigation uses consistent names.
- [ ] Confirm the current item is visible and programmatically identified where applicable.
- [ ] Check heading, breadcrumb, title, and navigation state for agreement.

### Keyboard and focus

- [ ] Activate the skip link and confirm viewport and focus movement.
- [ ] Tab and Shift+Tab through every navigation control.
- [ ] Open and close each disclosure using Enter and Space.
- [ ] Use Escape to close open submenus and responsive navigation.
- [ ] Confirm focus is never trapped or lost.
- [ ] Confirm focus is not obscured by sticky or open navigation.
- [ ] Confirm site navigation does not require application-menu arrow keys.

### Pointer, touch, and speech input

- [ ] Operate navigation with mouse, touch, and a large pointer.
- [ ] Confirm any hover-triggered content is dismissible, hoverable, and persistent.
- [ ] Confirm visible labels are contained in accessible names.
- [ ] Activate important navigation controls using their visible spoken labels.
- [ ] Confirm targets do not overlap and meet the project’s target-size requirements.

### Reflow and personalization

- [ ] Test at 200% and 400% browser zoom.
- [ ] Test at a 320 CSS-pixel viewport.
- [ ] Test portrait and landscape orientation.
- [ ] Apply WCAG text-spacing overrides.
- [ ] Test light, dark, increased-contrast, and forced-colours modes.
- [ ] Confirm sticky navigation does not dominate the magnified viewport.

### Routes and resilience

- [ ] Follow links with JavaScript disabled where progressive enhancement is required.
- [ ] Test browser Back, Forward, refresh, deep links, and copied URLs.
- [ ] Confirm client-side route changes update title, heading, focus, and current state.
- [ ] Confirm route announcements are not duplicated.
- [ ] Test generated navigation with long labels, localization, and right-to-left text.

Test with representative screen readers and browsers from the project’s support matrix. Avoid hard-coding product-specific keystrokes into project requirements because commands change by product, platform, mode, and version.

---

## 19. Automated checks

Automated tests can identify some landmark, name, state, ID, focus, and ARIA problems. They cannot determine whether navigation labels are understandable, link purpose is clear, focus order is logical, or the complete navigation model is usable.

Include checks for:

- Duplicate IDs and broken `aria-controls` references
- Missing or duplicate landmark names where names are required
- Invalid or unnecessary menu roles
- `aria-expanded` and `hidden` synchronization
- Focusable content inside hidden or inert navigation
- Current-item state on applicable routes
- Skip-link target and focus movement
- Disclosure open, close, Escape, focus departure, and outside-pointer behaviour
- Responsive variants at supported breakpoints
- Client-side route title and focus updates
- Link URLs, status codes, and progressive enhancement

Retain manual keyboard, screen-reader, magnification, speech-input, and touch testing.

---

## 20. Definition of done

Navigation is complete when:

- Major page and navigation regions use appropriate native landmarks.
- Multiple navigation landmarks have understandable names.
- Repeated identical navigation is named consistently.
- Users can bypass repeated blocks and reach the main content.
- Link purpose and visible labels are understandable.
- Current location is visibly and programmatically identified where applicable.
- Ordinary site navigation does not use application-menu roles.
- Disclosure navigation is operable, dismissible, and correctly exposes its state.
- Optional hover content meets dismissible, hoverable, and persistent requirements.
- Breadcrumbs and pagination use appropriate structure and current state.
- Responsive navigation uses either a complete non-modal or complete modal model.
- Repeated navigation remains consistent across the site.
- Multiple ways to locate pages are available where required.
- Navigation reflows and remains usable with zoom, text spacing, touch, and magnification.
- Client-side route changes establish a clear new context without duplicate announcements.
- Generated CMS or component markup passes the same requirements as hand-authored markup.
- Automated checks and representative manual assistive-technology tests pass.

---

## WCAG 2.2 criteria commonly applicable to navigation

- 1.3.1 Info and Relationships (A)
- 1.3.2 Meaningful Sequence (A)
- 1.4.10 Reflow (AA)
- 1.4.11 Non-text Contrast (AA)
- 1.4.12 Text Spacing (AA)
- 1.4.13 Content on Hover or Focus (AA)
- 2.1.1 Keyboard (A)
- 2.1.2 No Keyboard Trap (A)
- 2.4.1 Bypass Blocks (A)
- 2.4.3 Focus Order (A)
- 2.4.4 Link Purpose (In Context) (A)
- 2.4.5 Multiple Ways (AA)
- 2.4.7 Focus Visible (AA)
- 2.4.11 Focus Not Obscured (Minimum) (AA)
- 2.5.3 Label in Name (A)
- 2.5.8 Target Size (Minimum) (AA)
- 3.2.1 On Focus (A)
- 3.2.3 Consistent Navigation (AA)
- 3.2.4 Consistent Identification (AA)
- 4.1.2 Name, Role, Value (A)

Applicability depends on the navigation interface and the relationship between pages. This list is not a substitute for evaluating the complete standard.

---

## References

### W3C guidance

- [WAI Menus Tutorial](https://www.w3.org/WAI/tutorials/menus/)
- [WAI Page Structure Tutorial: Page Regions](https://www.w3.org/WAI/tutorials/page-structure/regions/)
- [WAI Page Structure Tutorial: Labeling Regions](https://www.w3.org/WAI/tutorials/page-structure/labels/)
- [WAI-ARIA Authoring Practices: Disclosure Navigation Example](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/)
- [Understanding 1.4.13: Content on Hover or Focus](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html)
- [Understanding 2.4.1: Bypass Blocks](https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html)
- [Understanding 2.4.4: Link Purpose](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html)
- [Understanding 2.4.5: Multiple Ways](https://www.w3.org/WAI/WCAG22/Understanding/multiple-ways.html)
- [Understanding 2.4.11: Focus Not Obscured (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html)
- [Understanding 2.5.3: Label in Name](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html)
- [Understanding 3.2.3: Consistent Navigation](https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation.html)

### HTML and structured standards

- [HTML Living Standard: The `nav` element](https://html.spec.whatwg.org/multipage/sections.html#the-nav-element)
- [WAI-ARIA: `aria-current`](https://www.w3.org/TR/wai-aria-1.2/#aria-current)
- [wai-yaml-ld: WCAG 2.2 normative data](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wcag-2.2-normative.yaml)
- [wai-yaml-ld: ARIA informative data](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wai-aria-informative.yaml)
- [wai-yaml-ld: HTML accessibility data](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/html-living-standard-accessibility.yaml)

---

AGPL-3.0-or-later License - See LICENSE file for full text  
Copyright (c) 2026 Mike Gifford
