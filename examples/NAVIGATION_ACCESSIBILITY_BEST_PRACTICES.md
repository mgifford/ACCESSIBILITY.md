---
title: Navigation Accessibility Best Practices
---

# Navigation Accessibility Best Practices

## Core Mandate

Navigation is how users find content. Screen reader users rely on landmark
structure to orient themselves; keyboard users rely on predictable tab order and
dropdown behaviour; voice control users rely on visible, correctly-labelled
interactive elements; magnification users rely on nav that reflows without
breaking. Get navigation wrong and everything downstream is harder.

---

## Severity Scale

| Level | Meaning |
|---|---|
| **Critical** | Navigation completely unreachable or creates a keyboard trap |
| **Serious** | Dropdown only works on hover; `role="menu"` misused; no `aria-current` |
| **Moderate** | Missing `aria-label` on secondary nav; breadcrumb not labelled |
| **Minor** | Nav item count exceeds 7; inconsistent `aria-expanded` update |

---

## Assistive Technology Context

Navigation behaves differently across AT. Test with:

| AT | Browser | Key behaviour |
|---|---|---|
| NVDA | Chrome | `H` key for headings, `R` for regions, list count announced on nav entry |
| JAWS | Chrome | `F6` for frames/regions, `Q` to move to main; announces nav landmark |
| VoiceOver | Safari (macOS) | `VO+U` rotor for landmarks and links; announces nav label |
| VoiceOver | Safari (iOS) | Swipe to navigate; nav landmark accessible via rotor |
| TalkBack | Chrome (Android) | Linear swipe navigation; landmarks via local context menu |
| Voice Control | Any | Users navigate by visible link text; all interactive elements need accurate visible labels. `aria-label` that differs from visible text breaks voice control. |
| Screen magnification | Any | Sticky/fixed navbars shrink the visible viewport. Ensure nav does not obscure content at high zoom (200%, 400%). |
| Reader Mode | Firefox/Edge/Safari | Strips nav from the article view — acceptable. Main content must make sense without it. |
| Edge Read Aloud | Edge | Reads page linearly; nav at top means it is read first — skip link is critical. |

**Voice Control note:** Dragon NaturallySpeaking and iOS Voice Control navigate
by speaking visible link text. If `aria-label` differs from or overrides visible
text, the user cannot activate the link by speaking what they see. **The accessible
name must contain the visible text.** (WCAG 2.5.3 Label in Name.)

---

## Critical: Landmark Structure

Every page must have navigational landmarks. **Missing `<nav>` landmark is Serious**
— screen reader users cannot jump to navigation via the rotor or landmarks list.

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

Rules:
- `<nav>` wraps every navigation region
- When multiple `<nav>` elements are present, **every one** needs a unique
  `aria-label` — without it, screen readers announce "navigation" for each
  with no way to distinguish them
- `aria-label` must be short and descriptive: "Main", "Footer", "Breadcrumb",
  "Pagination" — not "Navigation menu" or "Main navigation menu"

---

## Critical: Skip Link

The skip link must be the **first focusable element** in the document and must
be **visible when focused**. A permanently hidden skip link (via `display:none`)
is a Serious issue — it defeats WCAG 2.4.1.

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

The skip link target (`#main`) needs `tabindex="-1"` so focus can be moved
to it programmatically even though it is not natively focusable.

---

## Serious: `aria-current="page"`

The current page link must be identified programmatically.
**Missing `aria-current` is Serious** — screen reader users cannot determine
where they are in the site without it.

```html
<nav aria-label="Main">
  <ul>
    <li><a href="/" aria-current="page">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>
```

`aria-current="page"` is the correct value for navigation items linking to
the current page. Use `aria-current="true"` for other current states (current
step in a wizard, current item in a list).

Also provide a **visual** current-page indicator — never rely on `aria-current`
alone (sighted users cannot see ARIA).

---

## Serious: Do Not Use `role="menu"` for Site Navigation

**Using `role="menu"` on site navigation is Serious.** This is one of the most
common navigation ARIA mistakes.

`role="menu"` signals a desktop-application-style menu (like a File menu in a
word processor). It puts screen readers into application-menu interaction mode:
- Arrow keys navigate items (not Tab)
- Tab exits the menu entirely
- Users who expect standard link navigation are confused

Standard site navigation uses native `<a>` elements in `<ul>` lists inside
`<nav>`. No ARIA menu roles needed.

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

The **only** appropriate use of `role="menu"` / `role="menuitem"` in web
navigation is for application toolbar menus that genuinely replicate desktop
app behaviour with full arrow-key navigation. See the
[WAI-ARIA APG menubar pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/)
for that distinct use case.

---

## Serious: Dropdown / Disclosure Navigation

The recommended pattern for dropdown submenus is the **Disclosure pattern**
(not the APG Menubar pattern). Disclosure is simpler, has broader AT support,
and is what most users — including AT users — expect from web navigation.

### Disclosure dropdown (recommended)

```html
<nav aria-label="Main">
  <ul>
    <li>
      <!-- Option A: Top-level item is a link; separate button opens dropdown -->
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

    <li>
      <!-- Option B: Top-level item is a button that opens dropdown only -->
      <button type="button"
              aria-expanded="false"
              aria-controls="about-submenu">
        About
        <svg aria-hidden="true" focusable="false"><!-- chevron --></svg>
      </button>
      <ul id="about-submenu" hidden>
        <li><a href="/about/team">Team</a></li>
        <li><a href="/about/history">History</a></li>
      </ul>
    </li>
  </ul>
</nav>
```

**Do not mix link and dropdown trigger on a single element.** If "Services"
is both a link to `/services` and the trigger for a dropdown, keyboard users
cannot reach the dropdown without navigating away from the page. Use Option A
(separate button) or Option B (button only, link in dropdown).

### JavaScript for disclosure dropdown

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

// Close on outside click
document.addEventListener('click', e => {
  document.querySelectorAll('[aria-controls][aria-expanded="true"]').forEach(trigger => {
    if (!trigger.contains(e.target)) {
      const target = document.getElementById(trigger.getAttribute('aria-controls'));
      trigger.setAttribute('aria-expanded', 'false');
      target.hidden = true;
    }
  });
});
```

### Hover behaviour

If hover also opens dropdowns, the dropdown **must not disappear immediately**
when the pointer moves away — users with motor impairments need time to move
the pointer into the submenu. Add a short CSS delay:

```css
.submenu { transition-delay: 0.2s; }
```

Also apply the dropdown open state on focus, not just hover — keyboard users
focus the trigger, not hover it.

---

## Moderate: Breadcrumbs

```html
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/services">Services</a></li>
    <li><a href="/services/web" aria-current="page">Web Design</a></li>
  </ol>
</nav>
```

- Use `<ol>` (ordered list) — breadcrumbs have a meaningful sequence
- `aria-label="Breadcrumb"` distinguishes it from other nav landmarks
- `aria-current="page"` on the current page item
- The current item may be a link or plain text — both are acceptable

---

## Moderate: Pagination

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

- `aria-label="Pagination"` on the `<nav>`
- `aria-current="page"` on the current page link
- Previous/Next arrows need descriptive `aria-label` — arrows alone are not
  meaningful to screen reader users
- Page numbers: `aria-label="Page 2, current"` avoids ambiguity

---

## Moderate: Mobile Navigation (Hamburger)

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

```js
const toggle = document.getElementById('mobile-menu-toggle');
const nav    = document.getElementById('mobile-nav');

toggle.addEventListener('click', () => {
  const expanded = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!expanded));
  // Update label to reflect current state — action-based label
  toggle.setAttribute('aria-label', expanded ? 'Open main menu' : 'Close main menu');
  nav.hidden = expanded;
  if (!expanded) {
    // Move focus to first link in nav when opening
    nav.querySelector('a')?.focus();
  }
});
```

When the nav closes, return focus to the toggle button.
Apply `inert` to background content while the mobile nav is open (see
`keyboard/SKILL.md` for the `inert` pattern).

---

## Moderate: `aria-current` for Active Navigation States

Beyond `aria-current="page"`, use `aria-current` for other active states:

```html
<!-- Step indicator -->
<ol aria-label="Order process">
  <li><a href="/cart">Cart</a></li>
  <li><a href="/delivery" aria-current="step">Delivery</a></li>
  <li>Payment</li>
</ol>

<!-- Tab list (use APG Tabs pattern instead for interactive tabs) -->
<!-- For navigation-style tabs that are links: -->
<nav aria-label="Account sections">
  <ul>
    <li><a href="/account/profile" aria-current="page">Profile</a></li>
    <li><a href="/account/security">Security</a></li>
  </ul>
</nav>
```

---

## Minor: Navigation Design Principles

- **5–7 top-level items** is the cognitive limit for most users; more creates
  findability problems before accessibility ones
- Navigation items must have **consistent placement** across all pages —
  moving the nav between pages disoriented users with cognitive disabilities
- Navigation icons must have **visible text labels** — icon-only nav is a
  persistent accessibility and usability failure
- **Do not open new windows or tabs** from navigation links without warning

---

## CMS and Framework Notes

**Drupal:** Drupal's Menu module generates `<nav>` landmark markup. The active
trail uses the `.is-active` class — ensure `aria-current="page"` is also set
programmatically. The [Drupal Accessibility Coding Standards](https://www.drupal.org/docs/getting-started/accessibility/accessibility-coding-standards)
require correct landmark structure in contributed modules.

**WordPress:** Block themes use `<nav>` landmarks. Check that `wp_nav_menu()`
output includes `aria-label` when multiple menus are present — it does not by
default. Use the `nav_menu_args` filter to add it.

**React/SPA frameworks:** Single-page apps must announce page changes after
navigation. When a route changes, move focus to the new page's `<h1>` or a
designated skip target, and announce the page title via a live region. Without
this, screen reader users hear nothing after navigation.

---

## Definition of Done Checklist

* [ ] `<nav>` landmark wraps every navigation region
* [ ] Every `<nav>` has a unique, descriptive `aria-label`
* [ ] Skip link: first in DOM, visible on focus, target has `tabindex="-1"`
* [ ] `aria-current="page"` on current page link in every nav
* [ ] `role="menu"` / `role="menuitem"` not used on site navigation
* [ ] Dropdowns use Disclosure pattern: `aria-expanded`, `aria-controls`, `hidden`
* [ ] Top-level link and dropdown trigger are separate elements (not one `<a>`)
* [ ] `Escape` closes dropdown and returns focus to trigger
* [ ] Hover dropdowns: delay prevents immediate close on pointer leave
* [ ] Breadcrumb: `<ol>`, `aria-label="Breadcrumb"`, `aria-current="page"` on last item
* [ ] Pagination: `aria-label` on nav, `aria-label` on prev/next arrows, `aria-current` on current page
* [ ] Mobile nav: `aria-expanded` on toggle, focus moves into nav on open, returns on close
* [ ] `inert` applied to background while mobile nav is open
* [ ] Voice Control tested: all links activatable by speaking visible text
* [ ] Screen magnification tested at 200%: nav not covering content at high zoom
* [ ] SPA/framework: focus moved and page title announced after route change
* [ ] Tested: NVDA+Chrome, JAWS+Chrome, VoiceOver+Safari

---

## Key WCAG Criteria

* 2.4.1 Bypass Blocks (A) — **Serious if skip link absent or broken**
* 2.4.3 Focus Order (A)
* 2.4.5 Multiple Ways (AA) — navigation + search or sitemap
* 2.4.7 Focus Visible (AA)
* 2.4.11 Focus Appearance (AA, WCAG 2.2)
* 2.5.3 Label in Name (A) — **Serious for voice control if violated**
* 4.1.2 Name, Role, Value (A) — **Serious if `aria-expanded` not updated**

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
