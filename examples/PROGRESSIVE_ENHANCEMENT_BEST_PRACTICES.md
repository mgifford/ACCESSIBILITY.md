---
title: Progressive Enhancement Best Practices
---

# Progressive Enhancement Best Practices

## Core Mandate

Start with a solid foundation that works for every user, then layer enhancements.
Every user — regardless of browser capability, network speed, assistive technology,
or JavaScript availability — must be able to access core content and complete core
tasks.

Progressive enhancement is also a sustainability practice. Pages that work without
JavaScript are dramatically lighter: fewer bytes transferred, less CPU spent on
parsing and executing scripts, and less energy consumed per page view. See
[SUSTAINABILITY.md](https://github.com/mgifford/SUSTAINABILITY.md) and the
[Web Sustainability Guidelines](https://www.w3.org/TR/web-sustainability-guidelines/).

---

## Severity Scale

| Level | Meaning |
| --- | --- |
| **Critical** | Core content or task inaccessible without JS/CSS |
| **Serious** | Core content accessible but significantly degraded without JS/CSS |
| **Moderate** | Enhancement degrades gracefully but with friction |
| **Minor** | Best-practice gap; marginal impact |

---

## The Three Layers

### Layer 1 — Semantic HTML (always required)

**Failure here is Critical.**

* All core content readable in plain HTML — no CSS or JS required
* Forms submittable with native browser behaviour
* Navigation functions as standard links
* Headings, lists, tables, and landmarks accurately reflect document structure

### Layer 2 — CSS (enhance presentation)

**Failure here is Moderate to Serious.**

* External stylesheets that can be disabled without losing content
* Respect user preferences: `prefers-reduced-motion`, `prefers-color-scheme`,
  `prefers-contrast`, `forced-colors`
* Page remains usable if stylesheets fail to load

### Layer 3 — JavaScript (enhance interactivity)

**JS that gates core content or tasks is Critical.**

* JS enhances; it does not gate access to core content or tasks
* Apply JS-dependent classes/behaviours from scripts, not static markup
* Handle script failure gracefully — the HTML layer must still work
* Use feature detection, not browser detection:

```js
if ('fetch' in window && 'querySelector' in document) {
  // apply enhanced experience
}
```

### Layer 3 extension — Service Workers (offline capability)

Service Workers are a Layer 3 enhancement: they require JavaScript, are
registered by a script, and must degrade gracefully when unavailable (private
browsing, unsupported browsers, HTTPS not available).

When implemented, they extend both accessibility and sustainability:

* **Accessibility**: users on unreliable connections (common in rural areas,
  low-income households, and developing regions) can continue to access
  previously loaded content offline
* **Sustainability**: cached responses eliminate repeat network requests,
  reducing data transfer and server energy per page view

```js
// Register Service Worker only if supported — classic PE feature detection
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch((err) => {
    // Registration failure: page continues to work normally without it
    console.warn('Service Worker registration failed:', err);
  });
}
```

**Offline fallback pattern:**

```js
// sw.js — cache-first with network fallback
const CACHE_NAME = 'v1';
const OFFLINE_URL = '/offline.html';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll([OFFLINE_URL, '/', '/styles.css'])
    )
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(OFFLINE_URL))
    );
  }
});
```

The offline fallback page (`/offline.html`) must itself be a valid Layer 1
HTML document — semantic, readable without CSS or JS.

Service Worker caching strategies (cache-first, network-first, stale-while-
revalidate) should be chosen based on content update frequency. Avoid caching
strategies that serve stale content for content that changes frequently without
a cache-invalidation plan.

---

## Critical: Core Content Must Not Require JavaScript

Rendering page content exclusively in JavaScript is **Critical** — users with
JS disabled, AT users encountering compatibility issues, and low-bandwidth users
are completely excluded.

* Deliver complete HTML from the server; hydrate interactivity in the browser
* Core content must be in the initial HTML response
* When using React/Vue/Angular/Svelte: configure SSR or static generation
* Avoid SPA patterns that require JS to render any visible content

Every byte of JavaScript that is not needed to access core content is unnecessary
energy consumption. Prefer server rendering — it transfers HTML once; a JS bundle
transfers code that must then be parsed, compiled, and executed on every visit.

---

## Critical: Forms Must Work Without JavaScript

```html
<!-- Layer 1: works without JS -->
<form action="/search" method="get">
  <label for="query">Search</label>
  <input id="query" name="q" type="search">
  <button type="submit">Search</button>
</form>
```

Enhance with JS for instant results, autocomplete, or inline validation —
while keeping the server-processed form as fallback.

**A form that cannot be submitted without JS is Critical.**

---

## Critical: Navigation Must Work Without JavaScript

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

## Serious: Dynamic Content Must Have a Fallback Route

```js
if ('fetch' in window) {
  loadContentAsync(url);
} else {
  // Standard link navigation works automatically
}
```

Use `aria-live` regions only after confirming the base content is accessible
without them.

---

## Moderate: CSS User Preferences Must Be Respected

`prefers-reduced-motion`, `prefers-color-scheme`, `prefers-contrast`, and
`forced-colors` are Layer 2 responsibilities. Ignoring them is **Moderate** at
minimum; ignoring `prefers-reduced-motion` for fast or flashing animations can
reach **Serious**.

---

## What to Avoid

* Rendering page content exclusively in JavaScript — **Critical**
* `display:none` / `visibility:hidden` on content required at the HTML layer — **Critical**
* Requiring JS to navigate between pages without a server-rendered fallback — **Critical**
* `user-scalable=no` — **Serious** (prevents zoom for low-vision users)
* Assuming scripts will execute — always handle failure states
* Polyfills as a substitute for progressive enhancement (they patch features;
  PE builds around their absence)
* Shipping large JS bundles for functionality that could be server-rendered —
  this is both an accessibility risk and a sustainability cost

---

## Definition of Done Checklist

* [ ] Core content readable with JavaScript disabled
* [ ] Core tasks completable with JavaScript disabled
* [ ] Forms submit via native browser behaviour
* [ ] Navigation works as standard HTML links
* [ ] CSS respects `prefers-reduced-motion`, `prefers-color-scheme`, `prefers-contrast`
* [ ] Script failure handled gracefully
* [ ] Feature detection used (not browser detection)
* [ ] SSR or static generation configured for JS frameworks
* [ ] Service Worker registered with feature detection and silent failure handling
* [ ] Offline fallback page is valid Layer 1 HTML
* [ ] Caching strategy documented and matched to content update frequency
* [ ] Tested: disable JS → verify core content; disable CSS → verify logical reading order

---

## Key WCAG Criteria

* 2.1.1 Keyboard (A) — native elements have built-in keyboard support
* 4.1.2 Name, Role, Value (A)

> **Note:** WCAG 4.1.1 Parsing was **removed in WCAG 2.2** (August 2023).
> Modern browsers handle parsing errors uniformly. Valid semantic HTML remains
> important as a progressive enhancement foundation, but it is no longer a
> testable WCAG criterion. Do not cite it in audits or compliance statements.

---
