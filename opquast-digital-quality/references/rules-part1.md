# Opquast Digital Quality — Rules Part 1 (Rules 1–135)

*Categories 1–7: Content · Personal Data · E-Commerce · Forms · Identification · Images & Media · Internationalisation*

> **License:** Opquast rules are published under [Creative Commons BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Rule numbers correspond to Version 5 (2025–2030). Authoritative source: [checklists.opquast.com/en/digital-quality/](https://checklists.opquast.com/en/digital-quality/)

---

## 1. Content (Rules 1–14)

### 1.1 Content Discovery and Metadata

- Provide a mechanism for users to discover new content or services (rule 1). This may be a "What's new" page, RSS/Atom feed, or newsletter.
- Include clear copyright and reuse rights information accessible from every page (rule 2).
- Each page's `<head>` must contain metadata that describes the content: at minimum `<meta name="description">` and Open Graph tags where appropriate (rule 3).

```html
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

## 2. Personal Data and Privacy (Rules 15–29)

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

## 3. E-Commerce (Rules 30–68)

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

## 4. Forms (Rules 69–98)

### 4.1 Labels and Instructions

- Every form field must have a programmatically associated label in the source code (rule 69). Use `<label for="…">` or `aria-labelledby`.
- Supplementary instructions for a field must be programmatically associated with it — use `aria-describedby` (rule 70).
- Each label must clearly indicate whether its field is required (rule 71). Marking with an asterisk alone is insufficient unless the convention is explained.
- Indicate expected input formats where relevant — for example, "DD/MM/YYYY" for date fields (rule 72).
- Warn the user explicitly when a field is case-sensitive (rule 73).
- Include maximum character length in the label or hint when a limit applies (rule 74).

```html
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
<input type="tel"   name="phone" autocomplete="tel" />
<input type="url"   name="website" />
<input type="date"  name="birthdate" autocomplete="bday" />
```

- Allow two-factor authentication processes to be restarted if they time out or fail (rule 96).
- Mark fields that support autocomplete with the appropriate `autocomplete` attribute (rule 97).
- Do not hide disabled buttons from screen readers — use `disabled` attribute rather than `aria-hidden` (rule 98).

---

## 5. Identification and Contact (Rules 99–115)

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

## 6. Images and Media (Rules 116–127)

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

## 7. Internationalisation (Rules 128–135)

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

*Continue with rules 136–244 in [rules-part2.md](./rules-part2.md).*
