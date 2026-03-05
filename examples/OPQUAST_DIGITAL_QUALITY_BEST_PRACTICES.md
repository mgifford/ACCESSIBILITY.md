---
title: Opquast Digital Quality Best Practices
---

# Opquast Digital Quality Best Practices

This guide translates the [Opquast Digital Quality Checklist](https://checklists.opquast.com/en/digital-quality/) into AI-actionable development requirements. The checklist contains 245 rules across 14 categories covering accessibility, security, performance, privacy, ecodesign, and overall web quality.

**Full checklist:** [checklists.opquast.com/en/digital-quality/](https://checklists.opquast.com/en/digital-quality/) (English) | [checklists.opquast.com/fr/digital-quality/](https://checklists.opquast.com/fr/digital-quality/) (French)

> The Opquast rules are published under [Creative Commons BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Rule numbers in this guide correspond directly to Version 5 (2025–2030). See [opquast.com](https://www.opquast.com/) for the authoritative source.

---

## 1. Content

*Opquast rules 1–14. See: [checklists.opquast.com/en/digital-quality/](https://checklists.opquast.com/en/digital-quality/)*

### 1.1 Content Discovery and Metadata

- Provide a mechanism for users to discover new content or services (rule 1). This may be a "What's new" page, RSS/Atom feed, or newsletter.
- Include clear copyright and reuse rights information accessible from every page (rule 2).
- Each page's `<head>` must contain metadata that describes the content: at minimum `<meta name="description">` and Open Graph tags where appropriate (rule 3).

```html
<!-- Minimum required metadata per page -->
<head>
  <meta name="description" content="A concise description of this page's content." />
  <meta property="og:title" content="Page Title" />
  <meta property="og:description" content="Page description for social sharing." />
</head>
```

### 1.2 Dates, Vocabulary, and Transparency

- Present dates in an explicit, unambiguous format — write "15 March 2025" rather than "15/03/25" or "03/15/25" (rule 4).
- Expand abbreviations and acronyms on first use within a page body (rule 5). Use `<abbr title="Hypertext Markup Language">HTML</abbr>` in HTML.
- Indicate the publication or last-updated date whenever content timeliness matters (rule 6).
- Provide a lexicon or glossary for technical or domain-specific vocabulary (rule 7).

### 1.3 Advertising, Moderation, and Data Visualisation

- Label advertisements and sponsored content as such, visually and programmatically (rule 8).
- Publish moderation rules for user-generated public spaces (rule 9).
- Allow users to preview uploaded files before submission to public spaces (rule 10).
- Provide at least one mechanism to report abuse in public spaces (rule 11).
- Accompany every chart or graph with its underlying numerical data — in a table, a data download, or a clearly visible caption (rule 12).
- Search results pages must display the total number of results, the current page number, and the number of results per page (rule 13).
- Do not use special characters (Unicode symbols, ASCII art) to simulate visual formatting that is not conveyed semantically (rule 14).

---

## 2. Personal Data and Privacy

*Opquast rules 15–29. See: [checklists.opquast.com/en/digital-quality/](https://checklists.opquast.com/en/digital-quality/)*

### 2.1 Privacy Policy and Data Rights

- Provide a link to the privacy and confidentiality policy from every page — typically in the footer (rule 15).
- Document the process by which users can access and modify their personal data (rule 16). This must be explicit, not just referenced in policy text.

### 2.2 Account Management

- Allow account creation without requiring a third-party identity provider (OAuth, social login) as the only option (rule 17).
- Require a confirmation step (confirmation email) for account creation (rule 18).
- Implement a mechanism to prevent account or identity theft — such as email verification, CAPTCHA, or rate limiting (rule 19).
- Accounts and subscriptions opened online must be closeable online by the same method (rule 20). Do not require phone or postal contact to close an account.
- If a personal space is offered, users must be able to download their personal content (rule 21).
- Allow login with a single set of credentials across all services (rule 22). Avoid fragmenting authentication.
- Provide a clear logout mechanism from all private or authenticated areas (rule 23).

### 2.3 Technical Privacy Requirements

- Accept email addresses containing the `+` sign for aliasing (rule 24).
- Send a `Referrer-Policy` HTTP header on all responses to control referrer information (rule 25).

```http
Referrer-Policy: strict-origin-when-cross-origin
```

- Do not disclose whether a specific user account exists when handling login failures or password-reset requests (rule 26). Return generic messages only.
- Transmit sensitive data over HTTPS and indicate this visibly in the interface (rule 27).
- Never include sensitive data in URL query strings (rule 28). Use POST requests with encrypted bodies.
- Explain cookie purposes and clearly describe the consequences of refusing each cookie category (rule 29).

---

## 3. E-Commerce

*Opquast rules 30–68. See: [checklists.opquast.com/en/digital-quality/](https://checklists.opquast.com/en/digital-quality/)*

### 3.1 Purchase Flow and Cart

- Allow purchasing without requiring account creation (rule 30).
- Provide a link to view item details from within the shopping cart (rule 31).
- Never add products or services to the cart without an explicit user action (rule 32).
- Do not pre-check subscription or opt-in checkboxes for ancillary services (rule 33).
- Display product availability before the final order confirmation step (rule 34).
- Show the estimated delivery time before final order confirmation (rule 35).
- Show the estimated delivery cost before final order confirmation (rule 36).
- Describe how digital products will be delivered before the order is placed (rule 37).
- Allow quantity changes and item removal until the final confirmation step (rule 38).

### 3.2 Product Information and Pricing

- Describe the nature and measurable characteristics of products and services (rule 39).
- Indicate the validity period and conditions of special offers and promotions (rule 40).
- Display a detailed sub-total (inclusive of all charges) before final order confirmation (rule 41).
- Provide financing conditions when financing options are offered (rule 42).
- Describe after-sales service conditions (rule 43).
- State debit and payment conditions before final order placement (rule 44).
- Indicate warranty conditions (rule 45).
- Link to terms of sale or use from all pages (rule 46).
- State delivery zones or service areas (rule 47).
- List accepted payment methods and their procedures (rule 48).
- Identify third parties involved in transactions (rule 49).
- Include dispute recourse information in general terms and conditions (rule 50).
- State return address and conditions before the user finalizes a return (rule 51).
- Indicate return cost before finalising a return order (rule 52).
- Describe the complaint process and timeline (rule 53).
- State reimbursement conditions (rule 54).
- List required hardware and software before final order confirmation for digital services (rule 55).
- Display prices with applicable taxes and any additional charges, as well as tax-exclusive prices (rule 56).

### 3.3 Order Process

- Allow separate shipping and billing addresses (rule 57).
- Accept at least two payment methods (rule 58).
- Store payment details only after explicit user consent (rule 59).
- Allow stored payment details to be modified or deleted (rule 60).
- Display a transaction reference number after an order is placed (rule 61).
- Make issued invoices available online (rule 62).
- Send a confirmation email for each invoice (rule 63).
- Link to the source when claiming affiliation with a professional body, label, or award (rule 64).
- Visually and textually differentiate unavailable products from available ones (rule 65).
- Send an order confirmation email containing the transaction reference and order details (rule 66).
- Issue an acknowledgement of receipt for each complaint (rule 67).
- Indicate the origin of products where relevant (rule 68).

---

## 4. Forms

*Opquast rules 69–98. See: [checklists.opquast.com/en/digital-quality/](https://checklists.opquast.com/en/digital-quality/)*

### 4.1 Labels and Instructions

- Every form field must have a programmatically associated label in the source code (rule 69). Use `<label for="…">` or `aria-labelledby`.
- Supplementary instructions for a field must be programmatically associated with it — use `aria-describedby` (rule 70).
- Each label must clearly indicate whether its field is required (rule 71). Marking with an asterisk alone is insufficient unless the convention is explained.
- Indicate expected input formats where relevant — for example, "DD/MM/YYYY" for date fields (rule 72).
- Warn the user explicitly when a field is case-sensitive (rule 73).
- Include maximum character length in the label or hint when a limit applies (rule 74).

```html
<!-- Accessible label with required indicator, format hint, and character limit -->
<label for="postcode">
  Postcode <span aria-hidden="true">*</span>
  <span class="hint" id="postcode-hint">Required. Format: SW1A 1AA. Max 8 characters.</span>
</label>
<input
  id="postcode"
  name="postcode"
  type="text"
  maxlength="8"
  aria-required="true"
  aria-describedby="postcode-hint"
/>
```

### 4.2 Passwords

- Show a password-strength indicator when a user creates a password (rule 75).
- Provide a toggle to reveal/hide the password in plain text (rule 76).

```html
<label for="password">Password</label>
<div class="password-wrapper">
  <input id="password" type="password" aria-describedby="password-hint" />
  <button
    type="button"
    aria-controls="password"
    aria-pressed="false"
    onclick="togglePassword(this)"
  >Show password</button>
</div>
```

### 4.3 Visual Association and Proximity

- Each label must be visually adjacent to its associated field (rule 77).
- Contextual information for a field (hints, examples) must appear close to the field (rule 78).

### 4.4 Error Handling

- Identify all fields containing rejected data after a failed submission (rule 79). Mark with `aria-invalid="true"`.
- Explain why each piece of submitted data was rejected (rule 80).
- Preserve all previously entered data when a form is rejected so users can correct only the errors (rule 81).
- Write custom error messages in the form's language (rule 82).

```html
<!-- Inline error linked to field -->
<label for="email">Email address</label>
<input
  id="email"
  type="email"
  aria-invalid="true"
  aria-describedby="email-error"
/>
<p id="email-error" role="alert">
  Enter a valid email address, for example name@example.com
</p>
```

### 4.5 Multi-Step Processes

- Show a summary of all data before final submission of a multi-page form (rule 83).
- After successful submission, allow users to return to normal navigation without resubmitting (rule 84).
- Confirm whether form submission succeeded or failed (rule 85).
- Warn users of required documents and data at the start of a complex process (rule 86).
- Show a numbered step list for complex processes (rule 87).
- Indicate the current step clearly (rule 88).
- Allow users to go back to the previous step (rule 89).
- Warn users that navigating back via browser history may cause data loss (rule 90).
- Preserve previously submitted data when navigating between steps (rule 91).

### 4.6 Usability and Technical Requirements

- Permit paste into all form fields — do not block `Ctrl+V` or paste events (rule 92).
- Group related options in dropdown lists using `<optgroup>` (rule 93).
- Present list options in a logical, identifiable order — alphabetical, numerical, or by priority (rule 94).
- Use appropriate HTML input types for email, URL, telephone, search, password, and date/time fields (rule 95).

```html
<input type="email" name="email" autocomplete="email" />
<input type="tel" name="phone" autocomplete="tel" />
<input type="url" name="website" />
<input type="date" name="birthdate" autocomplete="bday" />
```

- Allow two-factor authentication processes to be restarted if they time out or fail (rule 96).
- Mark fields that support autocomplete with the appropriate `autocomplete` attribute (rule 97).
- Do not hide disabled buttons from screen readers — use `disabled` attribute rather than `aria-hidden` (rule 98).

---

## 5. Identification and Contact

*Opquast rules 99–115. See: [checklists.opquast.com/en/digital-quality/](https://checklists.opquast.com/en/digital-quality/)*

- The homepage must explain the nature of content and services offered (rule 99).
- If content is restricted to a specific audience, state this on the homepage (rule 100).
- Identify the author, company, or organisation responsible for the site (rule 101).
- Each page title must identify the website (rule 102). Typically formatted as "Page name | Site name".
- Each page title must identify the page content (rule 103).
- Include a valid `<link rel="icon">` in every page's `<head>` (rule 104).

```html
<title>About Us | Acme Corporation</title>
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
```

- Provide the complete address and phone number of the organisation from all pages — typically in the footer (rule 105).
- Display the company registration or legal identification number where required by applicable law (rule 106).
- Offer at least two contact methods (rule 107). Examples: email form, telephone, postal address.
- Indicate response times for information requests (rule 108).
- State operating hours and service costs (rule 109).
- Send an acknowledgement of receipt for every information request (rule 110).
- All transactional or service emails must include at least one contact method (rule 111).
- Provide at least one way to reach customer service or support (rule 112).
- Provide at least one way to reach the moderator of public spaces (rule 113).
- Identify the person or team responsible for site content (rule 114).
- When claiming conformance with a standard or guideline, provide a link to that standard (rule 115).

---

## 6. Images and Media

*Opquast rules 116–127. See: [checklists.opquast.com/en/digital-quality/](https://checklists.opquast.com/en/digital-quality/)*

### 6.1 Text Alternatives

- Decorative images must have an empty `alt=""` attribute (rule 116).
- Image links must have descriptive `alt` text that describes the link destination, not the image (rule 117).
- Informative images must have `alt` text that conveys the image's meaning (rule 118).

```html
<!-- Decorative -->
<img src="divider.png" alt="" />

<!-- Image link -->
<a href="/home"><img src="logo.png" alt="Acme Corporation — Home" /></a>

<!-- Informative -->
<img src="sales-chart.png" alt="Bar chart showing monthly sales; December was highest at 1,200 units." />
```

- Thumbnails and previews must not be full-size images resized in the browser — serve appropriately sized images (rule 119).
- Embedded objects (`<object>`, `<embed>`) must have appropriate text alternatives (rule 120).

### 6.2 Audio and Video

- Provide a text transcript for all audio and video content (rule 121).
- Videos must have synchronised subtitles/captions (rule 122).
- Indicate the duration of audio and video content (rule 123).
- Videos must not autoplay — they must be user-triggered (rule 124).
- Audio must not autoplay (rule 125).
- Video, animation, audio, and flash content must be pausable by the user (rule 126).
- Running video or animation must not block access to navigation or page content (rule 127).

```html
<!-- Accessible video with captions, transcript link, and no autoplay -->
<figure>
  <video controls width="800">
    <source src="demo.mp4" type="video/mp4" />
    <track kind="captions" src="demo.vtt" srclang="en" label="English captions" default />
    Your browser does not support HTML5 video.
  </video>
  <figcaption>
    Product demo (3:45). <a href="demo-transcript.html">Read the full transcript</a>.
  </figcaption>
</figure>
```

---

## 7. Internationalisation

*Opquast rules 128–135. See: [checklists.opquast.com/en/digital-quality/](https://checklists.opquast.com/en/digital-quality/)*

- Include international dialling codes for all phone numbers (rule 128). For example, +1 (212) 555-0100.
- Specify the country in all mailing addresses (rule 129).
- Indicate the language of a link's target page when it differs from the current page's language (rule 130). Use `hreflang` attribute or visible text.
- Declare the main language of each page in the `<html>` element's `lang` attribute (rule 131).

```html
<html lang="en">
```

- Mark language changes within content using the `lang` attribute on the containing element (rule 132).

```html
<p>The phrase <span lang="fr">savoir-faire</span> means a knack or skill.</p>
```

- Links to translated versions of a page must point directly to the translated equivalent, not to the target site's homepage (rule 133).
- Links to alternate language versions must be written in the target language (rule 134). For example, a French version link should read "Français", not "French".
- Configure the server to respect the preferred language order specified in the `Accept-Language` HTTP header (rule 135).

---

## 8. Links

*Opquast rules 136–152. See: [checklists.opquast.com/en/digital-quality/](https://checklists.opquast.com/en/digital-quality/)*

### 8.1 Accessible Link Text

- Every link must have a `title` attribute or accessible name in source code (rule 136). Prefer meaningful anchor text over `title`.
- Link labels must describe the link's function or its target content (rule 137). Avoid "click here", "read more", or "learn more" in isolation.

```html
<!-- Wrong -->
<a href="/report.pdf">Click here</a>

<!-- Right -->
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

## 9. Navigation

*Opquast rules 153–172. See: [checklists.opquast.com/en/digital-quality/](https://checklists.opquast.com/en/digital-quality/)*

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

## 10. Newsletter

*Opquast rules 173–179. See: [checklists.opquast.com/en/digital-quality/](https://checklists.opquast.com/en/digital-quality/)*

- Newsletter subscription must use a confirmed opt-in process (rule 173). Send a confirmation email before activating the subscription.
- Include an unsubscribe link in every newsletter (rule 174).
- Unsubscribing directly from a newsletter link must not require a separate email confirmation step (rule 175).
- Users must also be able to unsubscribe from the website itself (rule 176).
- Make the latest newsletter edition available online (rule 177).
- Maintain newsletter archives online (rule 178).
- State the newsletter's frequency before subscription (rule 179).

---

## 11. Presentation

*Opquast rules 180–196. See: [checklists.opquast.com/en/digital-quality/](https://checklists.opquast.com/en/digital-quality/)*

### 11.1 Visual Consistency and Colour

- Maintain a consistent visual identity (graphic charter) across all pages (rule 180).
- Do not convey information by colour alone — always provide a secondary indicator (rule 181). For example, use both colour and an icon or text label for status.
- Ensure sufficient contrast between text and background (rule 182). Minimum 4.5:1 for normal text, 3:1 for large text (WCAG 2.2 AA).

```css
/* High-contrast text on white background */
body {
  color: #1a1a1a;      /* contrast ratio ~16:1 on white */
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

## 12. Security

*Opquast rules 197–217. See: [checklists.opquast.com/en/digital-quality/](https://checklists.opquast.com/en/digital-quality/)*

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

## 13. Server and Performance

*Opquast rules 218–230. See: [checklists.opquast.com/en/digital-quality/](https://checklists.opquast.com/en/digital-quality/)*

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

## 14. Structure and Code

*Opquast rules 231–244. See: [checklists.opquast.com/en/digital-quality/](https://checklists.opquast.com/en/digital-quality/)*

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

## Summary for AI Systems

When generating or reviewing web content, code, or infrastructure configurations, apply the following checklist derived from the Opquast Digital Quality Framework:

| Category | Key AI-Enforceable Requirements |
|---|---|
| Content | Metadata, alt text, explicit dates, abbreviation expansion, data tables for charts |
| Personal data | Privacy link in footer, generic auth-failure messages, sensitive data over HTTPS only, no sensitive data in URLs |
| E-Commerce | No pre-checked opt-ins, availability before checkout, explicit pricing, two payment methods |
| Forms | Associated labels, `aria-required`, `aria-invalid`, `aria-describedby`, correct `input type`, `autocomplete` values |
| Identification | Unique page titles, `lang` attribute, favicon, two contact methods |
| Images/Media | Meaningful `alt` text, captions/transcripts for audio-video, no autoplay |
| Internationalisation | `lang` on `<html>` and inline changes, international dialling codes, `hreflang` |
| Links | Descriptive anchor text, `tel:` protocol, file type/size for downloads, no broken internal links |
| Navigation | Skip links, visible focus, logical tab order, consistent navigation placement |
| Presentation | Sufficient colour contrast, no colour-only information, no blocked zoom, responsive layout, print styles |
| Security | HTTPS everywhere, HSTS, CSP, SRI, no plain-text passwords, security headers |
| Server/Performance | `robots.txt`, `sitemap.xml`, gzip/Brotli, caching headers, minified assets |
| Structure/Code | UTF-8, unique IDs, no `meta` refresh, tagged PDFs, proper heading hierarchy |

---

## Relationship to Accessibility Standards

The Opquast Digital Quality Framework complements WCAG 2.2 rather than replacing it. Many Opquast rules directly correspond to or reinforce WCAG success criteria:

- **Opquast rules 116–118** (image alternatives) → WCAG 1.1.1 Non-text Content
- **Opquast rules 121–122** (transcripts, captions) → WCAG 1.2.2, 1.2.3, 1.2.5
- **Opquast rules 124–127** (no autoplay, pausable) → WCAG 1.4.2, 2.2.2
- **Opquast rules 165–167** (keyboard, focus, tab order) → WCAG 2.1.1, 2.4.3
- **Opquast rule 181** (not colour alone) → WCAG 1.4.1
- **Opquast rule 182** (contrast) → WCAG 1.4.3, 1.4.6
- **Opquast rule 193** (no zoom block) → WCAG 1.4.4 Resize Text

Use the Opquast framework as a holistic quality baseline and layer WCAG testing on top for full accessibility compliance.

---

## References and Further Reading

- **Opquast Digital Quality Checklist (English):** [checklists.opquast.com/en/digital-quality/](https://checklists.opquast.com/en/digital-quality/)
- **Opquast Digital Quality Checklist (French):** [checklists.opquast.com/fr/digital-quality/](https://checklists.opquast.com/fr/digital-quality/)
- **Opquast website:** [opquast.com](https://www.opquast.com/)
- **Opquast certification:** Learn and certify Opquast skills at [opquast.com](https://www.opquast.com/)
- **License:** Opquast rules are published under [Creative Commons BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
- **WCAG 2.2:** [w3.org/TR/WCAG22/](https://www.w3.org/TR/WCAG22/)
- **Machine-readable WCAG standards:** [wai-yaml-ld](https://github.com/mgifford/wai-yaml-ld)
- **Related guides in this repository:**
  - [Forms Accessibility Best Practices](./FORMS_ACCESSIBILITY_BEST_PRACTICES.md)
  - [Content Design Accessibility Best Practices](./CONTENT_DESIGN_ACCESSIBILITY_BEST_PRACTICES.md)
  - [Progressive Enhancement Best Practices](./PROGRESSIVE_ENHANCEMENT_BEST_PRACTICES.md)
  - [Audio/Video Accessibility Best Practices](./AUDIO_VIDEO_ACCESSIBILITY_BEST_PRACTICES.md)
  - [CI/CD Accessibility Best Practices](./CI_CD_ACCESSIBILITY_BEST_PRACTICES.md)
  - [Manual Accessibility Testing Guide](./MANUAL_ACCESSIBILITY_TESTING_GUIDE.md)
