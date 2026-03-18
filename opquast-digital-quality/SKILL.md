---
name: opquast-digital-quality
description: Opquast Digital Quality Checklist v5 (2025–2030) — 244 rules across 14 categories covering accessibility, security, performance, privacy, ecodesign, forms, links, navigation, and overall web quality. Use for any web project to enforce holistic digital quality beyond WCAG alone.
license: CC-BY-SA-4.0
metadata:
  author: Opquast (opquast.com) — rules published under Creative Commons BY-SA 4.0
  version: "5.0"
  rules_version: "2025-2030"
  repository: https://github.com/mgifford/ACCESSIBILITY.md
---

# Opquast Digital Quality — AI Agent Skill

This skill encodes the [Opquast Digital Quality Checklist v5](https://checklists.opquast.com/en/digital-quality/) (245 rules, 14 categories) as AI-actionable development requirements.

> **License:** The Opquast rules are published under [Creative Commons BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). This skill is a derivative work. Rule numbers correspond to Version 5 (2025–2030). Authoritative source: [opquast.com](https://www.opquast.com/).

> **Relationship to WCAG:** The Opquast framework complements WCAG 2.2 rather than replacing it. Apply Opquast as a holistic quality baseline and layer WCAG testing on top for full accessibility compliance. Many Opquast rules directly reinforce WCAG success criteria — see [references/rules-part2.md](./references/rules-part2.md) for mappings.

---

## Quick-Reference Summary

Apply these requirements when generating or reviewing web code, content, or infrastructure:

| Category | Key requirements |
|---|---|
| **1. Content** | `<meta name="description">`, explicit dates, `<abbr>` for acronyms, data table for every chart |
| **2. Personal Data** | Privacy link in every footer; generic auth-failure messages; no sensitive data in URLs; cookie purposes explained |
| **3. E-Commerce** | No pre-checked opt-ins; availability + cost before checkout; two payment methods; order confirmation email |
| **4. Forms** | `<label>` on every field; `aria-required`; `aria-invalid` on errors; `aria-describedby` for hints; correct `input type`; `autocomplete` |
| **5. Identification** | Unique descriptive `<title>` per page; `lang` on `<html>`; favicon; two contact methods |
| **6. Images & Media** | Meaningful `alt`; `alt=""` for decorative; captions + transcript for audio/video; no autoplay |
| **7. Internationalisation** | `lang` on inline language changes; international dial codes; `hreflang`; translate navigation links |
| **8. Links** | Descriptive anchor text; file type + size for downloads; `tel:` for phone numbers; warn on new tab |
| **9. Navigation** | Skip links; visible focus (`outline`); logical tab order; consistent navigation placement; breadcrumbs |
| **10. Newsletter** | Confirmed opt-in; unsubscribe in every email; unsubscribe without extra confirmation |
| **11. Presentation** | 4.5:1 contrast; no color-only information; no blocked zoom; responsive layout; print styles |
| **12. Security** | HTTPS + HSTS; CSP header; SRI on third-party assets; no plain-text passwords; SPF/DKIM/DMARC |
| **13. Server/Performance** | `robots.txt`; `sitemap.xml`; gzip/Brotli; cache headers; minified CSS/JS; proper 404 status codes |
| **14. Structure & Code** | UTF-8; `<meta charset>`; unique `id` values; no `meta` refresh; tagged PDFs; `<th scope>` on tables |

---

## Universal Requirements (All Projects)

These rules apply regardless of project type. Treat them as your baseline checklist for every PR.

### Document Setup

```html
<!-- Rule 131 — language of page (WCAG 3.1.1) -->
<html lang="en">
<head>
  <!-- Rule 232, 233 — character encoding -->
  <meta charset="UTF-8" />

  <!-- Rules 102-103 — unique, descriptive page title -->
  <title>Page Name | Site Name</title>

  <!-- Rule 104 — favicon -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

  <!-- Rules 3 — page metadata -->
  <meta name="description" content="Concise description of this page." />

  <!-- Rule 193 — never block zoom -->
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
```

### Navigation and Keyboard

```html
<!-- Rule 164 — skip link (WCAG 2.4.1) -->
<a class="skip-link" href="#main-content">Skip to main content</a>

<!-- Rule 156 — breadcrumb for location in hierarchy -->
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/products">Products</a></li>
    <li aria-current="page">Widget Pro</li>
  </ol>
</nav>
```

```css
/* Rule 165 — never hide focus without a visible replacement (WCAG 2.4.7) */
:focus-visible {
  outline: 3px solid #005fcc;
  outline-offset: 2px;
}
```

### Forms

```html
<!-- Rules 69-71 — associated label, required indicator, aria-required -->
<label for="email">
  Email address <span aria-hidden="true">*</span>
</label>
<input
  id="email"
  type="email"
  autocomplete="email"
  aria-required="true"
  aria-describedby="email-hint email-error"
/>
<p id="email-hint">We will only use this to send your receipt.</p>

<!-- Rule 79, 80 — error identification and explanation (WCAG 3.3.1, 3.3.3) -->
<p id="email-error" role="alert" aria-live="assertive">
  <!-- shown on validation failure: -->
  Enter a valid email address, for example name@example.com
</p>
```

```html
<!-- Rule 95 — correct input types; Rule 97 — autocomplete -->
<input type="email"    name="email"   autocomplete="email" />
<input type="tel"      name="phone"   autocomplete="tel" />
<input type="url"      name="website" />
<input type="password" name="password" autocomplete="current-password" />
<input type="date"     name="dob"     autocomplete="bday" />
```

### Images and Media

```html
<!-- Rule 116 — decorative image -->
<img src="divider.png" alt="" />

<!-- Rule 117 — image link: alt describes the destination -->
<a href="/home"><img src="logo.png" alt="Acme Corporation — Home" /></a>

<!-- Rule 118 — informative image -->
<img src="chart.png" alt="Bar chart: December sales were highest at 1,200 units." />

<!-- Rules 121, 122, 123, 124 — video with captions, transcript, duration, no autoplay -->
<figure>
  <video controls width="800">
    <source src="demo.mp4" type="video/mp4" />
    <track kind="captions" src="demo.vtt" srclang="en" label="English" default />
  </video>
  <figcaption>
    Product demo (3:45). <a href="demo-transcript.html">Read the full transcript</a>.
  </figcaption>
</figure>
```

### Links

```html
<!-- Rule 137 — descriptive link text (WCAG 2.4.6) -->
<!-- Wrong: -->
<a href="/report.pdf">Click here</a>

<!-- Right: includes file type and size per rules 147-148 -->
<a href="/report.pdf">2025 Annual Report (PDF, 1.2 MB)</a>

<!-- Rule 145 — telephone links use tel: protocol -->
<a href="tel:+12125550100">+1 (212) 555-0100</a>

<!-- Rule 146 — warn when link opens new tab -->
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  Vendor site <span class="visually-hidden">(opens in new tab)</span>
</a>
```

### Security Headers

Send these HTTP response headers on every page:

```http
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';
Referrer-Policy: strict-origin-when-cross-origin
```

Apply Subresource Integrity to all third-party scripts and stylesheets:

```html
<script
  src="https://cdn.example.com/lib.min.js"
  integrity="sha384-<hash>"
  crossorigin="anonymous"
></script>
```

### Presentation and Responsiveness

```css
/* Rule 182 — minimum contrast (WCAG 1.4.3): 4.5:1 normal text, 3:1 large text */
body { color: #1a1a1a; background: #ffffff; } /* ~16:1 */

/* Rule 191 — never justify body text */
body { text-align: left; }

/* Rule 190 — always include generic font family fallback */
body { font-family: "Roboto", Arial, sans-serif; }

/* Rule 195, 196 — print styles */
@media print {
  nav, header, .sidebar { display: none; }
  a[href]::after { content: " (" attr(href) ")"; }
}
```

### Data Tables

```html
<!-- Rules 242, 243 — scoped headers and caption -->
<table>
  <caption>Quarterly revenue by region (USD thousands)</caption>
  <thead>
    <tr>
      <th scope="col">Region</th>
      <th scope="col">Q1</th>
      <th scope="col">Q2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">North America</th>
      <td>1,200</td>
      <td>1,450</td>
    </tr>
  </tbody>
</table>
```

---

## Anti-Patterns to Avoid

| Anti-pattern | Rule(s) | Correct approach |
|---|---|---|
| `maximum-scale=1` or `user-scalable=no` in viewport | 193 | Remove; never block browser zoom |
| `outline: none` without replacement | 165 | Provide visible `:focus-visible` style |
| Color as the only status indicator | 181 | Add icon, text, or pattern alongside color |
| `placeholder` as sole label | 69 | Always use `<label>` |
| Generic link text ("click here", "read more") | 137 | Use descriptive anchor text |
| Autoplay audio or video | 124, 125 | Require explicit user action to play |
| Sensitive data in URL query strings | 28 | Use POST + HTTPS |
| Pre-checked subscription checkboxes | 33 | All opt-ins must be unchecked by default |
| `meta http-equiv="refresh"` | 239 | Use server-side HTTP 301/302 redirects |
| Missing `alt` on images | 116-118 | Always provide `alt`; `alt=""` for decorative |
| `text-align: justify` on body text | 191 | Use `text-align: left` |
| Blocking copy/paste | 237 | Remove `user-select: none` from content |
| Uppercase text in HTML | 192 | Use `text-transform: uppercase` in CSS |

---

## Detailed Rules Reference

For the full rule set with code examples:

- **[references/rules-part1.md](./references/rules-part1.md)** — Rules 1–135: Content, Personal Data, E-Commerce, Forms, Identification, Images & Media, Internationalisation
- **[references/rules-part2.md](./references/rules-part2.md)** — Rules 136–244: Links, Navigation, Newsletter, Presentation, Security, Server & Performance, Structure & Code

Full checklist: [checklists.opquast.com/en/digital-quality/](https://checklists.opquast.com/en/digital-quality/)

---

This skill does not cover every Opquast requirement or every accessibility nuance. When unsure, consult the [official Opquast checklist](https://checklists.opquast.com/en/digital-quality/) and [WCAG 2.2](https://www.w3.org/TR/WCAG22/) directly. Human expert review — especially from people with disabilities — is irreplaceable.
