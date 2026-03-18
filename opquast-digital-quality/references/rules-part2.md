# Opquast Digital Quality — Rules Part 2 (Rules 136–244)

*Categories 8–14: Links · Navigation · Newsletter · Presentation · Security · Server & Performance · Structure & Code*

> **License:** Opquast rules are published under [Creative Commons BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Rule numbers correspond to Version 5 (2025–2030). Authoritative source: [checklists.opquast.com/en/digital-quality/](https://checklists.opquast.com/en/digital-quality/)

*Rules 1–135 are in [rules-part1.md](./rules-part1.md).*

---

## 8. Links (Rules 136–152)

### 8.1 Accessible Link Text

- Every link must have a `title` attribute or accessible name in source code (rule 136). Prefer meaningful anchor text over `title`.
- Link labels must describe the link's function or its target content (rule 137). Avoid "click here", "read more", or "learn more" in isolation.

```html
<!-- Wrong -->
<a href="/report.pdf">Click here</a>

<!-- Right: descriptive text with file type and size -->
<a href="/report.pdf">2025 Annual Report (PDF, 1.2 MB)</a>
```

### 8.2 Visual Differentiation

- Links of the same type must have consistent colour, shape, and behaviour across all pages (rule 138).
- Underlines must be reserved for links — do not underline decorative or non-link text (rule 139).
- Links must be visually distinguishable from surrounding content (rule 140).
- Visited and unvisited links must be visually differentiated (rule 141).
- Differentiate internal from external links visually (rule 142).
- Differentiate links to restricted (authenticated) content (rule 143).

### 8.3 Link Behaviour and Context

- Links that open external software (email client, calendar) must have an explicit label (rule 144). For example, "Send an email to support@example.com".
- Telephone numbers must use the `tel:` protocol for click-to-call (rule 145).

```html
<a href="tel:+12125550100">+1 (212) 555-0100</a>
```

- Warn users when a link opens in a new window or tab (rule 146). Add "(opens in new tab)" to the link label or use a visible icon with accessible text.
- Indicate the file format of files available for download (rule 147).
- Indicate the file size for internal files available for download (rule 148).
- When a downloadable file is in a different language than the page, indicate that language (rule 149).
- Name downloadable files so that their content and origin are identifiable from the filename alone (rule 150).
- Do not prohibit or technically restrict the creation of inbound links from other sites (rule 151).
- All internal links must resolve to valid pages (rule 152). Run automated link checking in CI.

---

## 9. Navigation (Rules 153–172)

### 9.1 Access and Orientation

- Public content must be accessible immediately, without forced login or subscription (rule 153).
- Navigation must not cause pop-ups to open (rule 154).
- Every page must provide a way to return to the homepage (rule 155) — typically the site logo or a "Home" link.
- Show users their location in the site hierarchy on every page (rule 156). Use breadcrumbs or equivalent.
- Active navigation items must be visually identifiable (rule 157).
- Navigation blocks of the same type must appear in the same location on every page (rule 158).
- Navigation icons must have a visible text label or equivalent (rule 159).

### 9.2 Modal and Window Management

- Close buttons for windows and modal dialogs must be visually linked to the content they close (rule 160).
- Close buttons must be immediately available without scrolling (rule 161).
- New or resized windows and modal dialogs must have an explicit close button (rule 162).
- Close mechanisms must be in the same location on every page (rule 163).

```html
<!-- Accessible modal with close button -->
<dialog aria-labelledby="dialog-title">
  <h2 id="dialog-title">Confirm deletion</h2>
  <p>This action cannot be undone.</p>
  <button type="button" autofocus>Cancel</button>
  <button type="button" class="destructive">Delete</button>
  <button type="button" aria-label="Close dialog" class="close-btn">✕</button>
</dialog>
```

### 9.3 Keyboard Navigation

- Provide skip links at the start of the source code for each page (rule 164). At minimum, "Skip to main content".
- Keyboard focus must never be hidden or removed — do not set `outline: none` without providing a visible replacement (rule 165).
- All content and services must be operable by keyboard (rule 166).
- Keyboard navigation order must be logical and predictable (rule 167).

```css
/* Acceptable: custom focus style that remains visible */
:focus-visible {
  outline: 3px solid #005fcc;
  outline-offset: 2px;
}
```

### 9.4 Search

- Provide an internal search engine for content-rich sites (rule 168).
- Each search results page must have a stable URL so it can be bookmarked and shared (rule 169).
- Allow users to refine or relaunch a search from the results page (rule 170).

### 9.5 Site Map and Time Limits

- Provide a sitemap accessible from every page (rule 171).
- Clearly indicate any time limits on user actions or access (rule 172).

---

## 10. Newsletter (Rules 173–179)

- Newsletter subscription must use a confirmed opt-in process (rule 173). Send a confirmation email before activating the subscription.
- Include an unsubscribe link in every newsletter (rule 174).
- Unsubscribing directly from a newsletter link must not require a separate email confirmation step (rule 175).
- Users must also be able to unsubscribe from the website itself (rule 176).
- Make the latest newsletter edition available online (rule 177).
- Maintain newsletter archives online (rule 178).
- State the newsletter's frequency before subscription (rule 179).

---

## 11. Presentation (Rules 180–196)

### 11.1 Visual Consistency and Colour

- Maintain a consistent visual identity (graphic charter) across all pages (rule 180).
- Do not convey information by colour alone — always provide a secondary indicator (rule 181). For example, use both colour and an icon or text label for status.
- Ensure sufficient contrast between text and background (rule 182). Minimum 4.5:1 for normal text, 3:1 for large text (WCAG 2.2 AA).

```css
/* High-contrast text on white background (~16:1) */
body {
  color: #1a1a1a;
  background: #ffffff;
}
```

### 11.2 Styles and Meaning

- Content must remain understandable when styles are disabled (rule 183). Essential meaning must not be conveyed through CSS alone.
- Never refer to content solely by shape or position ("Click the button on the right") (rule 184).
- Do not hide content from screen readers that is needed to understand the page (rule 185). Use `aria-hidden` only for truly decorative elements.
- Touch and click targets must be large enough for comfortable interaction (rule 186). WCAG 2.2 recommends at least 24×24 CSS pixels; aim for 44×44 pixels for primary controls.
- Do not replace text that could be styled via CSS with images of text (rule 187).
- If CSS-generated content (`::before`, `::after`) carries meaning, provide a text alternative (rule 188).
- Typographic symbols used decoratively must have appropriate text alternatives or be hidden from screen readers (rule 189).
- Font family declarations must end with a generic family fallback (rule 190).

```css
body {
  font-family: "Roboto", "Helvetica Neue", Arial, sans-serif;
}
```

- Do not use CSS `text-align: justify` for body text — it creates uneven spacing that reduces readability (rule 191).
- Use CSS `text-transform` for decorative capitalisation rather than writing text in uppercase in HTML (rule 192).

```css
/* Use CSS, not uppercase HTML text */
.button { text-transform: uppercase; }
```

### 11.3 Responsiveness and Print

- Do not block browser zoom or text scaling — remove `maximum-scale=1` and `user-scalable=no` from viewport meta tags (rule 193).

```html
<!-- Wrong: blocks zoom -->
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />

<!-- Right: allows zoom -->
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

- Provide at least one mechanism for adapting the layout to mobile devices (rule 194). Use responsive CSS.
- Provide print styles (rule 195). At minimum, hide navigation and decorative elements; ensure body text prints at a readable size.
- Page content must be printable without including navigation blocks (rule 196).

```css
@media print {
  nav, header, footer, .sidebar, .no-print {
    display: none;
  }
  body {
    font-size: 12pt;
    color: #000;
  }
  a[href]::after {
    content: " (" attr(href) ")";
  }
}
```

---

## 12. Security (Rules 197–217)

### 12.1 HTTPS and Transport Security

- All pages must use HTTPS (rule 197). HTTP must redirect to HTTPS.
- TLS certificates must be signed by a trusted authority and currently valid (rule 198).
- Send an HSTS (`Strict-Transport-Security`) header on HTTPS pages (rule 199).
- HTTPS pages must not load HTTP resources — avoid mixed content (rule 200).

```http
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

### 12.2 Password Management

- Users must be able to complete all password operations online, without requiring offline contact (rule 201).
- Allow users to choose and change their passwords freely (rule 202).
- Implement a password-strength indicator to raise user awareness (rule 203).
- Provide a self-service password reset mechanism (rule 204).
- Never transmit passwords in plain text — not in emails, logs, or URLs (rule 205).

### 12.3 HTTP Security Headers

- Send `X-Content-Type-Options: nosniff` to prevent MIME-type sniffing (rule 206).

```http
X-Content-Type-Options: nosniff
```

- Ensure every response includes an explicit `Content-Type` header (rule 207).
- Display information about transaction security in the interface when applicable (rule 208).
- Disable directory listing on all web servers (rule 209).
- Send `X-XSS-Protection: 1; mode=block` (rule 210). Note: modern browsers rely on CSP instead, but this header adds defence-in-depth for older browsers.
- Send an `X-Frame-Options` or `frame-ancestors` CSP directive to control framing (rule 211).

```http
X-Frame-Options: SAMEORIGIN
# Or, preferred via CSP:
Content-Security-Policy: frame-ancestors 'self';
```

- Implement a `Content-Security-Policy` header to restrict the origin of loaded content (rule 212).

```http
Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted-cdn.example.com; style-src 'self' 'unsafe-inline';
```

- Do not expose server software versions in response headers (rule 213). Remove or obfuscate `Server` and `X-Powered-By` headers.
- Apply Subresource Integrity (`integrity` attribute) to third-party scripts and stylesheets (rule 214).

```html
<script
  src="https://cdn.example.com/library.min.js"
  integrity="sha384-<hash>"
  crossorigin="anonymous"
></script>
```

- Require at least two confirmation factors for sensitive operations (rule 215).
- Never suppress or replace the browser's address bar (rule 216).
- Authenticate the email domain using SPF, DKIM, and DMARC records (rule 217).

---

## 13. Server and Performance (Rules 218–230)

### 13.1 URLs and Redirects

- The site must work with and without the `www` prefix (rule 218). Redirect one to the other consistently.
- The web root must contain a `robots.txt` file (rule 219).
- Provide a `sitemap.xml` listing crawlable content (rule 220).
- Do not force redirects from the desktop version to a mobile version or app (rule 221). Serve one responsive site.
- Return a proper `404 Not Found` HTTP status code for missing pages (rule 222). Do not return `200 OK` for error pages.

### 13.2 Error Pages

- Provide a custom 404 error page with a helpful message (rule 223).
- Include the main navigation menu on custom error pages (rule 225).

### 13.3 Compression, Caching, and Minification

- Enable HTTP compression (gzip or Brotli) for text-based resources (rule 226).
- Send cache-control headers for static assets (rule 227).

```http
Cache-Control: public, max-age=31536000, immutable
```

- Include the character set in `Content-Type` response headers (rule 228).

```http
Content-Type: text/html; charset=utf-8
```

- Minify CSS files before deployment (rule 229).
- Minify JavaScript files before deployment (rule 230).

---

## 14. Structure and Code (Rules 231–244)

### 14.1 Metadata and Encoding

- Make publication and update dates available as machine-readable metadata — use `<time datetime="…">` or structured data (rule 231).

```html
<time datetime="2025-03-01">1 March 2025</time>
```

- Each page's `<head>` must declare the character set (rule 232).
- Use UTF-8 encoding consistently (rule 233).

```html
<meta charset="UTF-8" />
```

### 14.2 Headings and Semantic Structure

- Organise page content using a hierarchical heading structure (`h1` → `h2` → `h3`) (rule 234). Do not skip heading levels.
- Mark up visually displayed lists as `<ul>`, `<ol>`, or `<dl>` in source code (rule 235).
- HTML `id` attributes must be unique within each page (rule 236).

### 14.3 User Control of Content

- Do not block copy/paste of page content (rule 237). Do not use CSS `user-select: none` on body text.
- Do not block access to the browser context menu (rule 238).
- Do not use client-side automatic redirection or `<meta http-equiv="refresh">` (rule 239). Perform redirects server-side (HTTP 301/302).

### 14.4 Documents and Tables

- Ensure the text in internal PDF documents can be selected — use tagged, not scanned, PDFs (rule 240).
- Structure internal PDF documents with headings (rule 241).
- Associate data table cells with their headers using `<th scope="…">` or `headers` attribute (rule 242).
- Provide captions for data tables using `<caption>` (rule 243).
- Ensure that layout tables linearise without loss of meaning (rule 244). Prefer CSS layout over table-based layout.

```html
<!-- Accessible data table -->
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

## Relationship to Accessibility Standards

Many Opquast rules directly correspond to or reinforce WCAG 2.2 success criteria:

| Opquast rules | WCAG SC |
|---|---|
| 116–118 (image alternatives) | 1.1.1 Non-text Content |
| 121–122 (transcripts, captions) | 1.2.2, 1.2.3, 1.2.5 |
| 124–127 (no autoplay, pausable) | 1.4.2, 2.2.2 |
| 165–167 (keyboard, focus, tab order) | 2.1.1, 2.4.3 |
| 181 (not colour alone) | 1.4.1 |
| 182 (contrast) | 1.4.3, 1.4.6 |
| 193 (no zoom block) | 1.4.4 Resize Text |
| 164 (skip links) | 2.4.1 Bypass Blocks |
| 69–71 (form labels) | 1.3.1, 3.3.2 |
| 79–80 (error identification) | 3.3.1, 3.3.3 |
| 102–103 (page titles) | 2.4.2 Page Titled |
| 131 (language of page) | 3.1.1 Language of Page |
| 132 (language of parts) | 3.1.2 Language of Parts |

Use the Opquast framework as a holistic quality baseline and layer WCAG testing on top for full accessibility compliance.

---

*Rules 1–135 are in [rules-part1.md](./rules-part1.md).*
