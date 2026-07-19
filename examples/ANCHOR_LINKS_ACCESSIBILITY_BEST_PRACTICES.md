---
title: Anchor Links Accessibility Best Practices
---

# Anchor Links Accessibility Best Practices

## Purpose

Anchor links navigate to a fragment within the current page or another page.
They support skip navigation, tables of contents, heading permalinks, deep
links, and links back to the top of a page.

An accessible anchor link needs a clear purpose, a unique and stable target,
predictable keyboard and history behavior, and a destination that is visible
and understandable after navigation.

This guide covers link text, fragment targets, skip links, focus management,
sticky headers, motion, generated IDs, single-page applications, and testing.

## Core Principles

1. Use a real `<a>` element with an `href` for navigation.
2. Make the link's purpose clear from its text or programmatically determined
   context.
3. Prefer native fragment navigation before adding JavaScript.
4. Give every target a unique, stable `id`.
5. Keep the fragment in the URL so the location can be bookmarked and shared.
6. Ensure the destination is not hidden behind a sticky header or other
   authored content.
7. Move focus when the pattern requires it, especially for skip links and
   scripted route changes.
8. Do not add every fragment target to the normal tab sequence.
9. Avoid smooth scrolling by default. Respect reduced-motion preferences when
   it is used.
10. Test direct loading, reload, back and forward navigation, keyboard focus,
    zoom, and supported assistive technologies.

## Use Links for Navigation

Use an anchor when activation changes the URL or navigates to another location.
Use a button when activation performs an action without navigation.

```html
<!-- Navigation to a page fragment -->
<a href="#installation">Installation instructions</a>

<!-- An action that copies the fragment URL -->
<button type="button" id="copy-installation-link">
  Copy link to Installation
</button>
```

Do not use dummy links such as:

```html
<!-- Do not use these for actions -->
<a href="#">Open settings</a>
<a href="javascript:void(0)">Open settings</a>
```

An empty fragment normally navigates to the top of the document. A JavaScript
URL does not provide ordinary link semantics, history, copying, opening in a
new tab, or progressive enhancement.

Do not add `role="link"` to a native anchor with an `href`. Its role is already
provided by HTML.

## Link Purpose and Accessible Names

[WCAG 2.2 Success Criterion 2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html)
requires the purpose of a link to be determinable from the link text alone or
from the link text together with programmatically determined context.

Understanding every link without context is the stronger
[Level AAA Link Purpose (Link Only) criterion](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-link-only.html).
It is still a useful project goal because people may scan links or use a list
of links provided by assistive technology.

### Prefer descriptive text

```html
<a href="#keyboard-support">Keyboard support requirements</a>
<a href="#wcag-criteria">Relevant WCAG success criteria</a>
```

Avoid repeated vague text when clearer wording is available:

```html
<!-- Avoid when the destination can be named directly -->
<a href="#keyboard-support">Click here</a>
<a href="#wcag-criteria">Read more</a>
```

Words such as "read more" are not automatically a WCAG Level A failure when
programmatically determined context supplies the purpose. Clear link text is
usually easier to scan, translate, operate by speech, and understand.

### Add context without replacing visible text

If a design must retain repeated visible text, add meaningful text inside the
link:

```html
<p>
  Keyboard testing finds barriers that automation misses.
  <a href="#keyboard-testing">
    Read more<span class="visually-hidden"> about keyboard testing</span>
  </a>
</p>
```

```css
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}
```

Do not use `aria-label` to replace useful visible link text with a different
name. An accessible name that contains the visible words supports speech input
and meets the intent of WCAG 2.5.3 Label in Name.

### Repeated and unique links

- Links with the same purpose and destination should use consistent names.
- Links with the same text but different destinations need sufficient context
  to distinguish them.
- Repeating the same destination in several parts of a long page can be
  appropriate.
- Do not add destination URLs to link names unless the URL itself is useful to
  the reader.

## Fragment Targets

### Use a unique `id`

```html
<nav aria-label="On this page">
  <a href="#installation">Installation</a>
</nav>

<h2 id="installation">Installation</h2>
```

The fragment after `#` must resolve to the intended element. IDs must be unique
within the document and must not contain ASCII whitespace.

HTML permits more characters than simple letters and hyphens, and fragments
can use percent encoding. Prefer stable, readable IDs that work well in URLs,
CSS, authoring tools, and content-management systems:

```html
<!-- Stable and readable -->
<h2 id="installation-guide">Installation guide</h2>

<!-- Fragile when sections are reordered -->
<h2 id="section-3">Installation guide</h2>
```

Do not claim that all non-ASCII or punctuation characters are invalid. If a
project restricts IDs to a simpler slug format, document it as an authoring
convention rather than a WCAG requirement.

### Keep published IDs stable

Fragment URLs may be bookmarked, shared, indexed, or referenced from other
documents. When a heading changes:

- preserve its existing ID when the destination is still conceptually the
  same;
- provide a compatible alias or redirect strategy when an ID must change;
- update internal links and automated link checks; and
- avoid regenerating every ID because heading punctuation or capitalization
  changed.

Generated slug systems must resolve duplicate headings deterministically and
must produce the same ID during server rendering and client hydration.

### Do not create empty or hidden destinations

The target must be perceivable after navigation. Do not target:

- an element with `hidden`, `display: none`, or `visibility: hidden`;
- content inside a collapsed disclosure that remains closed;
- a panel that is inactive and unavailable;
- an empty marker far from the visible heading; or
- an element removed during hydration.

If a deep link points into collapsed or tabbed content, reveal the relevant
container before scrolling or moving focus.

## Focus Management

Scrolling and focus are related but different. A visual scroll does not prove
that keyboard focus or a screen reader's point of regard moved to a useful
location.

### Ordinary in-page links

For a simple table of contents or heading link, start with native HTML and do
not cancel the click:

```html
<a href="#testing">Testing</a>

<h2 id="testing">Testing</h2>
```

Native behavior preserves the fragment, history, copying, opening in another
tab, and operation without JavaScript. Test the supported browsers to confirm
that after activation the next keyboard focus position is logical and the
destination is conveyed adequately.

Do not automatically add `tabindex="-1"` to every heading. Do not call
`.focus()` for every fragment merely because JavaScript can do so. Programmatic
focus may be appropriate when native behavior does not provide an
understandable transition or when the application has intercepted navigation.

### Skip links

A skip link is a focus-navigation mechanism. Activating it must move focus past
the repeated content to the main content. A reliable target can use
`tabindex="-1"` so it can receive focus without becoming an extra tab stop.

```html
<body>
  <a class="skip-link" href="#main-content">Skip to main content</a>

  <header>
    <!-- Site identity and repeated navigation -->
  </header>

  <main id="main-content" class="skip-target" tabindex="-1">
    <h1>Page title</h1>
    <!-- Page content -->
  </main>
</body>
```

The skip link should be the first focusable control, or part of the first small
set of skip links when a page offers several destinations. It may always be
visible. If initially concealed, it must become fully visible when focused.

After activation:

- focus is in the main content;
- the main heading or beginning of content is visible;
- the next `Tab` reaches the first logical interactive element in the main
  content; and
- the skipped navigation is not traversed first.

`tabindex="-1"` allows focus by script or browser fragment handling. It does
not put the target in sequential tab order. Test the actual browser behavior;
add narrowly scoped script only if the supported environment does not move
focus reliably.

### Scripted focus

If custom navigation requires explicit focus, focus the destination after it
exists and has been revealed:

```js
function focusFragmentTarget(target) {
  if (!target.hasAttribute('tabindex')) {
    target.setAttribute('tabindex', '-1');
  }

  target.focus({ preventScroll: true });
  target.scrollIntoView({ block: 'start' });
}
```

Do not add a positive `tabindex`. Do not focus a hidden element. Avoid leaving
temporary `tabindex="-1"` attributes on large numbers of targets when they are
no longer needed, unless they are intentional stable skip targets.

When focus moves to a normally non-interactive target, provide a visible
orientation cue:

```css
.skip-target:focus,
.programmatic-focus-target:focus {
  outline: 3px solid currentColor;
  outline-offset: 0.25rem;
}
```

Do not suppress the trigger link's own focus indicator. See the
[Keyboard Accessibility Best Practices](./KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md).

## Skip-Link Presentation

This pattern moves the skip link just outside the viewport until it receives
focus. It does not animate the link.

```css
.skip-link {
  position: absolute;
  z-index: 1000;
  inset-block-start: 0;
  inset-inline-start: 1rem;
  padding: 0.75rem 1rem;
  color: #ffffff;
  background: #111827;
  font-weight: 700;
  transform: translateY(-150%);
}

.skip-link:focus {
  transform: translateY(0);
  outline: 3px solid #facc15;
  outline-offset: 2px;
}

@media (forced-colors: active) {
  .skip-link {
    color: LinkText;
    background: Canvas;
    border: 1px solid LinkText;
  }

  .skip-link:focus {
    outline-color: Highlight;
  }
}
```

Test at 400 percent zoom and with long translated text. The focused link must
not be clipped by the viewport, a cookie banner, a fixed header, or an ancestor
with `overflow: hidden`.

## Sticky and Fixed Headers

Use CSS scroll offsets so fragment targets are not placed under a sticky
header. Logical properties work with different writing modes.

```css
:root {
  --anchor-offset: 5rem;
}

html {
  scroll-padding-block-start: var(--anchor-offset);
}

h2[id],
h3[id],
main[id],
.anchor-target {
  scroll-margin-block-start: var(--anchor-offset);
}
```

Use `scroll-padding-block-start` on the element that actually scrolls. For an
internal scrolling region, setting it only on `html` has no effect.

The offset must match the header at responsive breakpoints, zoom levels, and
when banners appear or disappear. Do not assume one fixed pixel value works in
every layout.

WCAG 2.4.11 Focus Not Obscured (Minimum) also applies when authored content
would entirely hide the focused link or control after navigation.

## Motion and Scrolling

The most robust default is immediate native scrolling. Smooth scrolling is a
presentation enhancement, not a requirement for anchor links.

If smooth scrolling is used, enable it only when the user has not requested
reduced motion:

```css
@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}
```

Keep the default behavior outside the media query. Do not pair smooth scroll
with parallax, animated highlighting, or other motion that makes the
destination harder to track.

For JavaScript animation, query the same preference and use automatic
scrolling when reduction is requested:

```js
const allowMotion = window.matchMedia(
  '(prefers-reduced-motion: no-preference)'
).matches;

target.scrollIntoView({
  behavior: allowMotion ? 'smooth' : 'auto',
  block: 'start'
});
```

Do not add JavaScript only to reproduce behavior available through native
fragment navigation and CSS. Custom scrolling must still update the URL,
manage history, handle focus when necessary, and work without animation.

WCAG 2.3.3 Animation from Interactions is Level AAA. Respecting user motion
preferences remains a strong inclusive-design practice for WCAG AA projects.

## URL and History Behavior

### Preserve the fragment

After a user activates an anchor link, the URL should include the fragment:

```text
https://example.com/guide#keyboard-testing
```

This supports:

- bookmarking;
- copying and sharing;
- reloading at the same section;
- browser back and forward navigation; and
- links from other documents.

Do not remove the hash after scrolling. Do not use `history.replaceState()` for
ordinary user-initiated anchor navigation when that would prevent Back from
returning to the previous location.

Prefer native links, which provide normal history behavior. If a router
intercepts them, it must deliberately reproduce that behavior.

### Initial load, reload, and history

Test all of these paths:

1. Open the complete URL with its fragment in a new tab.
2. Reload while the fragment is present.
3. Activate several anchor links and use Back and Forward.
4. Load the page before delayed or hydrated content finishes rendering.
5. Navigate to a fragment in another route of a single-page application.

If the target is not present when the browser first processes the fragment, the
page may remain at the wrong position. Render stable targets in the initial
document where practical. Otherwise, handle the fragment after the relevant
content is available without creating duplicate history entries.

### Scroll-spy navigation

A table of contents may indicate the section currently in view with
`aria-current="location"`:

```html
<nav aria-labelledby="on-this-page-heading">
  <h2 id="on-this-page-heading">On this page</h2>
  <ul>
    <li><a href="#overview" aria-current="location">Overview</a></li>
    <li><a href="#testing">Testing</a></li>
  </ul>
</nav>
```

Expose the current state visually as well. Keep only one link current. Do not
announce every scroll-spy change with a live region, and do not add a new
history entry whenever scrolling changes the current section.

## Tables of Contents

Use a labeled navigation landmark and a list of links:

```html
<nav aria-labelledby="contents-heading">
  <h2 id="contents-heading">Contents</h2>
  <ol>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#configuration">Configuration</a></li>
    <li><a href="#testing">Testing</a></li>
  </ol>
</nav>
```

- Match link wording closely to the destination heading.
- Preserve the document's heading hierarchy.
- Do not make the contents list so long that it becomes another block users
  need to bypass.
- For very long tables of contents, provide grouping or progressive
  disclosure without hiding the essential navigation.
- Do not place table-of-contents links in a tab widget merely for styling.

## Heading Permalinks

A permalink navigates to the heading's fragment. Keep it separate from the
heading so its accessible name does not become part of the heading text.

```html
<div class="heading-with-permalink">
  <h2 id="installation">Installation</h2>
  <a class="permalink" href="#installation">
    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
      <path d="M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7-7l-1 1"/>
      <path d="M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7 7l1-1"/>
    </svg>
    <span class="visually-hidden">Permalink to Installation</span>
  </a>
</div>
```

The permalink must have:

- an accessible name that identifies the section;
- a visible focus indicator;
- a usable target size when it is not within the inline-spacing exception;
- sufficient visual contrast when the icon is needed to identify the link;
  and
- availability without requiring pointer hover.

If activation copies the URL instead of navigating, use a button named "Copy
link to Installation" and provide a concise status message after the copy
succeeds.

## Back-to-Top Links

Use an explicit target rather than an empty `#` when a persistent location is
helpful:

```html
<header id="page-top" class="programmatic-focus-target" tabindex="-1">
  <!-- Site header -->
</header>

<!-- Long page content -->

<a href="#page-top">Back to top</a>
```

Ensure the target does not place focus behind sticky content. A back-to-top
link should not appear so frequently that it adds noise to every short section.

## Single-Page Applications and Routers

Routers often prevent the browser's default link behavior. An accessible
router must handle both route and fragment navigation.

- Render a real anchor with a usable `href`, such as
  `/settings#notifications`.
- Do not use a button for route or fragment navigation.
- Preserve modifier-click, open-in-new-tab, copying, and no-script behavior
  when possible.
- Wait until the destination route and target are rendered.
- Reveal a collapsed parent before navigating to the target.
- Update the URL and create the appropriate history entry.
- Scroll the correct container.
- Move focus when a route change or custom transition requires it.
- Handle the fragment on initial load, `hashchange`, and back or forward
  navigation.
- Prevent stale asynchronous route content from moving focus after the user has
  navigated elsewhere.

A full route change generally needs document-title and main-heading focus
management. A same-page fragment change does not automatically need the same
route announcement. See the
[Navigation Accessibility Best Practices](./NAVIGATION_ACCESSIBILITY_BEST_PRACTICES.md).

## Testing

### Static and automated checks

Automation can help detect:

- links without accessible names;
- empty or dummy `href` values;
- fragments that do not resolve to an element;
- duplicate IDs;
- IDs containing ASCII whitespace;
- positive `tabindex` values;
- focusable content hidden with `hidden` or `aria-hidden="true"`;
- icon-only links without text alternatives; and
- invalid nesting of interactive elements.

For generated sites, run a link checker against the built output, not only the
source Markdown. Test cross-page fragments as well as same-page fragments.

Automation cannot confirm focus placement, sticky-header clearance, motion,
history behavior, or whether the destination is understandable.

### Keyboard testing

For skip links:

1. Start at the browser chrome and press `Tab`.
2. Confirm the skip link is the first focusable control or part of the first
   small set of skip links.
3. Confirm it is fully visible and has a visible focus indicator.
4. Press `Enter`.
5. Confirm focus moves to the main content and the content is visible.
6. Press `Tab` and confirm focus continues with the first logical control in
   the main content.

For every important anchor link:

1. Reach the link by keyboard and confirm its focus indicator.
2. Activate it with `Enter`.
3. Confirm the correct target is visible and not obscured.
4. Confirm the transition is understandable without relying on animation.
5. Press `Tab` and `Shift+Tab` and verify logical focus order.
6. Use Back and Forward and confirm history and focus remain usable.

### Screen reader testing

Test supported browser and screen reader combinations. Record versions,
interaction mode, and relevant verbosity settings.

- Review the page's links list and confirm names are useful.
- Activate the skip link and verify the main content is the new working
  location.
- Activate table-of-contents links and confirm the destination is
  understandable.
- Confirm permalink names identify their sections.
- Test direct fragment URLs on initial load and reload.
- Do not require a particular product to speak one exact phrase.

### Visual, zoom, and motion testing

- Test at 200 percent and 400 percent zoom.
- Test narrow viewports and browser text-only zoom.
- Confirm sticky headers and banners do not cover targets or focus.
- Apply text-spacing overrides and test long translated link text.
- Test high contrast and forced-colors modes.
- Enable reduced motion and verify scrolling is immediate.
- Test both left-to-right and right-to-left content.
- Confirm focused skip links remain inside the viewport.

### Touch and speech testing

- Confirm anchor links have adequate activation areas or meet an applicable
  target-size exception.
- Confirm heading permalinks do not require hover to appear.
- Activate links with touch and verify the target is not hidden.
- Use speech input with visible link text.
- Confirm accessible names do not conflict with visible labels.

## Common Failures

| Failure | Correction |
|---|---|
| Using a button for fragment navigation | Use an anchor with an `href` |
| Using `href="#"` as a JavaScript action | Use a button, or provide the real fragment destination |
| Requiring every Level A link to make sense without context | Apply WCAG 2.4.4 accurately; treat link-only purpose as the Level AAA requirement and a strong design goal |
| Replacing visible text with a different `aria-label` | Keep the visible words in the accessible name |
| Linking to a missing or duplicate ID | Create one unique matching target |
| Declaring all punctuation or non-ASCII IDs invalid | Use valid HTML; adopt simpler slugs as a documented convention |
| Regenerating IDs whenever heading text changes | Preserve published deep links |
| Moving focus to every heading automatically | Start with native navigation and add focus management where the interaction requires it |
| Failing to move focus for a skip link | Use a focusable main target and verify the skip behavior |
| Adding `tabindex="0"` to headings | Use `tabindex="-1"` only for intentional programmatic focus |
| Scrolling to content hidden behind a sticky header | Use the correct scroll padding or margin and test responsive offsets |
| Intercepting clicks without updating the fragment | Preserve URL and history behavior |
| Using unconditional smooth scrolling | Use immediate scrolling or enable motion only for `no-preference` |
| Pushing a history entry on every scroll-spy update | Update current state without polluting history |
| Linking into closed or inactive content | Reveal the containing disclosure or panel before navigation |
| Assuming a screen reader will announce one exact phrase | Test the resulting orientation and focus across supported combinations |

## Definition of Done

- [ ] Navigation uses real anchors with meaningful `href` values.
- [ ] Link purpose is clear from text or programmatically determined context.
- [ ] Accessible names include useful visible label text.
- [ ] Every fragment resolves to one visible target with a unique ID.
- [ ] Published IDs are stable and generated IDs handle duplicates.
- [ ] Native fragment behavior is preserved unless custom behavior is needed.
- [ ] Skip links appear first, become visible on focus, and move focus beyond
  repeated content.
- [ ] Programmatic focus uses `tabindex="-1"`, never a positive value.
- [ ] Focused links and intentional focus targets have visible indicators.
- [ ] Sticky headers, banners, and internal scroll containers do not obscure
  the destination.
- [ ] The fragment remains bookmarkable and shareable.
- [ ] Initial load, reload, Back, Forward, and cross-route fragments work.
- [ ] Smooth scrolling is absent or limited to users with no reduced-motion
  preference.
- [ ] Tables of contents use semantic navigation and list markup.
- [ ] Heading permalinks have section-specific names and usable targets.
- [ ] Collapsed or delayed content is revealed before navigation.
- [ ] Keyboard, screen reader, zoom, motion, touch, speech, and forced-colors
  testing has been completed for supported environments.
- [ ] Automated checks supplement, but do not replace, manual navigation and
  focus testing.

## Related WCAG Criteria

- [1.3.1 Info and Relationships (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html)
- [1.4.10 Reflow (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)
- [1.4.11 Non-text Contrast (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)
- [2.1.1 Keyboard (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html)
- [2.1.2 No Keyboard Trap (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html)
- [2.3.3 Animation from Interactions (Level AAA)](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)
- [2.4.1 Bypass Blocks (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html)
- [2.4.3 Focus Order (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html)
- [2.4.4 Link Purpose (In Context) (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html)
- [2.4.7 Focus Visible (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html)
- [2.4.9 Link Purpose (Link Only) (Level AAA)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-link-only.html)
- [2.4.11 Focus Not Obscured (Minimum) (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html)
- [2.5.3 Label in Name (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html)
- [2.5.8 Target Size (Minimum) (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- [3.2.4 Consistent Identification (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/consistent-identification.html)
- [4.1.2 Name, Role, Value (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html)

## Related Guides

- [Keyboard Accessibility Best Practices](./KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md)
- [Navigation Accessibility Best Practices](./NAVIGATION_ACCESSIBILITY_BEST_PRACTICES.md)
- [Speech Recognition Accessibility Best Practices](./SPEECH_RECOGNITION_ACCESSIBILITY_BEST_PRACTICES.md)
- [Touch and Pointer Accessibility Best Practices](./TOUCH_POINTER_ACCESSIBILITY_BEST_PRACTICES.md)
- [User Personalization Accessibility Best Practices](./USER_PERSONALIZATION_ACCESSIBILITY_BEST_PRACTICES.md)

Use the project's
[Accessibility Bug Reporting Best Practices](./ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES.md)
to assign severity and priority. This guide does not define a universal
severity scale.

## References

- [WCAG 2.2 Understanding 2.4.1: Bypass Blocks](https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html)
- [Technique G1: Link to the Main Content Area](https://www.w3.org/WAI/WCAG22/Techniques/general/G1)
- [Technique G124: Links to Areas of the Page](https://www.w3.org/WAI/WCAG22/Techniques/general/G124)
- [Technique G91: Link Text Describes Link Purpose](https://www.w3.org/WAI/WCAG22/Techniques/general/G91)
- [Technique H78: Link Purpose from Its Enclosing Paragraph](https://www.w3.org/WAI/WCAG22/Techniques/html/H78)
- [WCAG 2.2 Understanding 2.4.4: Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html)
- [WCAG 2.2 Understanding 2.4.9: Link Purpose (Link Only)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-link-only.html)
- [Technique C39: Using `prefers-reduced-motion` in CSS](https://www.w3.org/WAI/WCAG22/Techniques/css/C39)
- [Technique SCR40: Using `prefers-reduced-motion` in JavaScript](https://www.w3.org/WAI/WCAG22/Techniques/client-side-script/SCR40)

### Machine-Readable Standards

For AI systems and automated tooling, see
[wai-yaml-ld](https://github.com/mgifford/wai-yaml-ld) for structured
accessibility standards:

- [WCAG 2.2 (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wcag-2.2-normative.yaml)
- [HTML Living Standard Accessibility (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/html-living-standard-accessibility.yaml)
- [Standards Link Graph (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/standards-link-graph.yaml)

---

This document is available under the repository's [MIT License](../LICENSE).
