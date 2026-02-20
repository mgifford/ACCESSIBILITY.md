---
title: Axe Rules Reference
---

# Axe 4.11 Rules - Detailed Test Coverage Map

This document maps each axe-core 4.11 rule to specific test pages and describes what violations to expect.

## WCAG 2.0 Level A & AA Rules (68 Total)

### Text Alternatives Category (7 rules)

| Rule | Severity | Page | Expected Violation | Description |
|------|----------|------|-------------------|---|
| `image-alt` | Critical | page1.html | ✅ Yes | Images missing alt text |
| `image-alt` | Critical | page5.html | ✅ Yes | SVG images missing alt |
| `image-alt` | Critical | blog/post1.html | ✅ Yes | Hero image without alt |
| `area-alt` | Critical | — | ⏸️ Not tested | Image map areas lack alt text |
| `input-image-alt` | Critical | — | ⏸️ Not tested | Image input buttons lack alt |
| `object-alt` | Serious | page5.html | ✅ Yes | Object elements without alt |
| `svg-img-alt` | Serious | page5.html | ✅ Yes | SVG with role="img" no alt |
| `video-caption` | Critical | page5.html | ✅ Yes | Videos without captions |

### ARIA Attributes Category (20 rules)

| Rule | Severity | Page | Expected Violation | Description |
|------|----------|------|-------------------|---|
| `aria-allowed-attr` | Critical | page4.html | ✅ Yes | Element role has unsupported ARIA attributes |
| `aria-braille-equivalent` | Serious | — | ⏸️ Not tested | Braille labels lack non-braille equivalent |
| `aria-command-name` | Serious | page4.html | ✅ Yes | Button/link without accessible name |
| `aria-conditional-attr` | Serious | page4.html | ✅ Yes | ARIA attributes not per role spec |
| `aria-deprecated-role` | Minor | — | ⏸️ Not tested | Deprecated ARIA role used |
| `aria-hidden-body` | Critical | — | ⏸️ Not tested | aria-hidden on body element |
| `aria-hidden-focus` | Serious | page4.html | ✅ Yes | Hidden element contains focusable content |
| `aria-input-field-name` | Serious | page4.html | ✅ Yes | ARIA input field without name |
| `aria-meter-name` | Serious | — | ⏸️ Not tested | ARIA meter without name |
| `aria-progressbar-name` | Serious | — | ⏸️ Not tested | ARIA progressbar without name |
| `aria-prohibited-attr` | Serious | page4.html | ✅ Yes | Prohibited ARIA attribute used |
| `aria-required-attr` | Critical | page4.html | ✅ Yes | Required ARIA attribute missing |
| `aria-required-children` | Critical | page4.html | ✅ Yes | Required child ARIA roles missing |
| `aria-required-parent` | Critical | page4.html | ✅ Yes | Required parent ARIA role missing |
| `aria-roles` | Critical | page4.html | ✅ Yes | Invalid ARIA role value |
| `aria-toggle-field-name` | Serious | — | ⏸️ Not tested | ARIA toggle field without name |
| `aria-tooltip-name` | Serious | — | ⏸️ Not tested | ARIA tooltip without name |
| `aria-valid-attr` | Critical | page4.html | ✅ Yes | Invalid ARIA attribute used |
| `aria-valid-attr-value` | Critical | page4.html | ✅ Yes | ARIA attribute has invalid value |

### Forms Category (4 rules)

| Rule | Severity | Page | Expected Violation | Description |
|------|----------|------|-------------------|---|
| `label` | Critical | page2.html | ✅ Yes | Form inputs without associated labels |
| `label` | Critical | auth/login.html | ✅ Yes | Login form fields unlabeled |
| `select-name` | Critical | auth/login.html | ✅ Yes | Select element without name |
| `form-field-multiple-labels` | Moderate | page2.html | ✅ Yes | Multiple labels on single field |

### Headings Category (2 rules)

| Rule | Severity | Page | Expected Violation | Description |
|------|----------|------|-------------------|---|
| `heading-order` | Moderate | page3.html | ✅ Yes | Heading hierarchy incorrect |
| `heading-order` | Moderate | blog/post1.html | ✅ Yes | Skipped heading level (h2 to h4) |

### Tables Category (3 rules)

| Rule | Severity | Page | Expected Violation | Description |
|------|----------|------|-------------------|---|
| `th-has-data-cells` | Serious | page6.html | ✅ Yes | Table headers don't describe data |
| `td-headers-attr` | Serious | page6.html | ✅ Yes | Table cells reference invalid headers |
| `table-duplicate-name` | Minor | page6.html | ✅ Yes | Caption duplicates summary |

### Buttons & Links Category (4 rules)

| Rule | Severity | Page | Expected Violation | Description |
|------|----------|------|-------------------|---|
| `button-name` | Critical | page3.html | ✅ Yes | Buttons without discernible text |
| `button-name` | Critical | page5.html | ✅ Yes | Icon buttons without labels |
| `input-button-name` | Critical | page3.html | ✅ Yes | Input buttons without text |
| `link-name` | Serious | — | ⏸️ Not tested | Links without discernible text |
| `link-in-text-block` | Serious | — | ⏸️ Not tested | Links not distinguished by color |

### Frames & Embeds Category (3 rules)

| Rule | Severity | Page | Expected Violation | Description |
|------|----------|------|-------------------|---|
| `frame-title` | Serious | page5.html | ✅ Yes | Iframe without accessible name |
| `frame-title-unique` | Serious | — | ⏸️ Not tested | Frame titles not unique |
| `frame-focusable-content` | Serious | — | ⏸️ Not tested | Frame with focusable content has tabindex=-1 |

### Language & Document Category (5 rules)

| Rule | Severity | Page | Expected Violation | Description |
|------|----------|------|-------------------|---|
| `html-has-lang` | Serious | page4.html | ✅ Yes | Missing lang attribute |
| `html-has-lang` | Serious | blog/post1.html | ✅ Yes | HTML without lang (intentional) |
| `html-lang-valid` | Serious | — | ⏸️ Not tested | Invalid lang value |
| `html-xml-lang-mismatch` | Moderate | — | ⏸️ Not tested | Lang and xml:lang disagree |
| `valid-lang` | Serious | — | ⏸️ Not tested | Invalid lang attribute value |
| `document-title` | Serious | — | ⏸️ Not tested | Document missing title |

### Color & Contrast Category (1 rule)

| Rule | Severity | Page | Expected Violation | Description |
|------|----------|------|-------------------|---|
| `color-contrast` | Serious | page1.html | ✅ Yes | Poor contrast ratio |
| `color-contrast` | Serious | blog/post1.html | ✅ Yes | Low contrast text (#888 on #8a8a) |

### Parsing & Structure Category (4 rules)

| Rule | Severity | Page | Expected Violation | Description |
|------|----------|------|-------------------|---|
| `duplicate-id-aria` | Critical | demo-bad.html | ✅ Yes | Duplicate ID attributes |
| `list` | Serious | page6.html | ✅ Yes | Incorrect list structure |
| `listitem` | Serious | page6.html | ✅ Yes | li outside ul/ol |
| `listitem` | Serious | blog/post1.html | ✅ Yes | List items outside container |
| `definition-list` | Serious | page6.html | ✅ Yes | Definition list structure incorrect |
| `dlitem` | Serious | page6.html | ✅ Yes | dt/dd outside dl |
| `marquee` | Serious | — | ⏸️ Not tested | Marquee element used |
| `blink` | Serious | — | ⏸️ Not tested | Blink element used |

### Meta & Viewport Category (3 rules)

| Rule | Severity | Page | Expected Violation | Description |
|------|----------|------|-------------------|---|
| `meta-viewport` | Moderate | auth/login.html | ✅ Yes | Viewport disables user zoom |
| `meta-refresh` | Critical | — | ⏸️ Not tested | Meta refresh used |

### Keyboard Interaction Category (3 rules)

| Rule | Severity | Page | Expected Violation | Description |
|------|----------|------|-------------------|---|
| `bypass` | Serious | — | ⏸️ Not tested | No skip navigation link |
| `scrollable-region-focusable` | Serious | — | ⏸️ Not tested | Scrollable region not keyboard accessible |
| `server-side-image-map` | Minor | — | ⏸️ Not tested | Server-side image map used |

---

## WCAG 2.1 Level A & AA Rules (26 Total)

### Content Sizing (2 rules)

| Rule | Severity | Page | Expected Violation | Description |
|------|----------|------|-------------------|---|
| `avoid-inline-spacing` | Serious | — | ⏸️ Not tested | Text spacing via styles not adjustable |
| `autocomplete-valid` | Serious | auth/login.html | ✅ Yes | Invalid/missing autocomplete |

---

## Best Practices Rules (30+ Total)

### Selected Key Rules

| Rule | Severity | Page | Expected Violation | Description |
|------|----------|------|-------------------|---|
| `empty-heading` | Minor | page3.html | ✅ Yes | Heading with no text |
| `empty-table-header` | Minor | — | ⏸️ Not tested | Table header without text |
| `heading-order` | Moderate | page3.html | ✅ Yes | Heading hierarchy wrong |
| `label-title-only` | Serious | page2.html | ✅ Yes | Form field only labeled via title |
| `landmark-one-main` | Moderate | blog/post1.html | ✅ Yes | Document missing main landmark |
| `region` | Moderate | blog/post1.html | ✅ Yes | Content outside landmarks |
| `tabindex` | Serious | auth/login.html | ✅ Yes | tabindex > 0 used |
| `page-has-heading-one` | Moderate | page3.html | ✅ Yes | No h1 heading |
| `scope-attr-valid` | Moderate | page6.html | ✅ Yes | Invalid scope attribute |

---

## Experimental Rules (9 Total - Disabled by Default)

| Rule | Severity | Page | Expected Violation | Description |
|------|----------|------|-------------------|---|
| `td-has-header` | Critical | page6.html | ✅ Yes | Large table cells lack headers |
| `table-fake-caption` | Serious | page6.html | ✅ Yes | Table caption not using caption element |
| `p-as-heading` | Serious | — | ⏸️ Not tested | Paragraph styled as heading |
| `label-content-name-mismatch` | Serious | — | ⏸️ Not tested | Visible label doesn't match name |

---

## Summary Statistics

### Coverage by Test Page

- **page1.html** — 3-4 rule categories, 5-7 violations expected
- **page2.html** — 2-3 rule categories, 5-8 violations expected
- **page3.html** — 3-4 rule categories, 4-6 violations expected
- **page4.html** — 4-5 rule categories, 6-10 violations expected
- **page5.html** — 3-4 rule categories, 6-8 violations expected
- **page6.html** — 4-5 rule categories, 8-12 violations expected
- **auth/login.html** — 3-4 rule categories, 6-9 violations expected
- **blog/post1.html** — 4-5 rule categories, 7-10 violations expected
- **demo-bad.html** — 5+ rule categories, 10+ violations expected

### Overall Rule Coverage

- **Rules with test coverage:** 50+ out of 100+
- **Rules not tested:** 50+ (mostly edge cases, deprecated, or AAA rules)
- **Primary focus:** WCAG 2.0 & 2.1 Level A/AA standards
- **Coverage percentage:** ~50% of actionable rules

---

## How to Use This Map

1. **Select a specific rule** from the table above
2. **Visit the listed test page** to see how it manifests
3. **Run axe-core** on that page
4. **Verify the violation** appears in results
5. **Check if scanner detects it** correctly

## Testing Methodology

1. Open [a11y-scan.html](a11y-scan.html)
2. Select "Local Directory" from dropdown
3. Drag this repository folder onto the drop zone
4. Run the scan
5. Compare detected violations to expected errors in this document

---

**Last Updated:** January 2026
**Axe Version:** 4.11
**Test Pages:** 9
**Total Violations Expected:** 40+
