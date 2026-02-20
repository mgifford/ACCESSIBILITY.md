---
title: Axe Rules Coverage
---

# Axe 4.11 Rules Coverage Summary

This document outlines the accessibility issues that axe-core 4.11 can detect and which test pages cover them.

## Overview

Axe-core 4.11 includes **100+** automated accessibility checks organized into categories:

### Rule Categories

- **WCAG 2.0 Level A & AA** (68 rules) - Core web accessibility standards
- **WCAG 2.1 Level A & AA** (26 rules) - Additional modern web accessibility
- **WCAG 2.2 Level A & AA** (1 rule - disabled by default) - Latest standards
- **Best Practices** (30+ rules) - Industry accepted practices
- **WCAG 2.x Level AAA** (3 rules - disabled by default) - Enhanced accessibility
- **Experimental** (9 rules - disabled by default) - In development
- **Deprecated** (7 rules - disabled by default) - To be removed

### Severity Levels

- **Critical** - Issues that prevent users with disabilities from accessing content
- **Serious** - Major issues that substantially impact user experience
- **Moderate** - Minor issues that affect some users
- **Minor** - Very minor issues

## WCAG 2.0 Level A & AA Rules (Primary Focus)

### Text Alternatives (7 rules)
- `area-alt` - Image map areas need alt text
- `image-alt` - Images need alternative text
- `input-image-alt` - Image input buttons need alt text
- `object-alt` - Embedded objects need alt text
- `role-img-alt` - Elements with role="img" need alt text
- `svg-img-alt` - SVG graphics need accessible text
- `video-caption` - Videos need captions

**Test Page:** `page1.html` (Images & Contrast)

### ARIA Attributes (20 rules)
- `aria-allowed-attr` - Element role supports ARIA attributes
- `aria-braille-equivalent` - Braille labels have non-braille equivalents
- `aria-command-name` - Buttons, links, menu items have names
- `aria-conditional-attr` - ARIA attributes used per spec
- `aria-deprecated-role` - No deprecated roles used
- `aria-hidden-body` - aria-hidden not on body element
- `aria-hidden-focus` - Hidden elements not focusable
- `aria-input-field-name` - Input fields have accessible names
- `aria-meter-name` - Meter elements have names
- `aria-progressbar-name` - Progressbar elements have names
- `aria-prohibited-attr` - Prohibited ARIA attributes not used
- `aria-required-attr` - Required ARIA attributes present
- `aria-required-children` - Parent ARIA roles have required children
- `aria-required-parent` - Child ARIA roles have required parents
- `aria-roles` - Valid ARIA role values used
- `aria-toggle-field-name` - Toggle fields have accessible names
- `aria-tooltip-name` - Tooltips have accessible names
- `aria-valid-attr` - Only valid ARIA attributes used
- `aria-valid-attr-value` - ARIA attribute values are valid

**Test Page:** `page4.html` (ARIA & Language)

### Forms & Labels (4 rules)
- `label` - Form elements have labels
- `select-name` - Select elements have accessible names
- `form-field-multiple-labels` - Form fields don't have multiple labels

**Test Page:** `page2.html` (Forms & Labels)

### Headings & Lists (5 rules)
- `heading-order` - Heading hierarchy is correct
- `empty-heading` - Headings have discernible text
- `list` - Lists are structured correctly
- `listitem` - List items are used semantically
- `definition-list` - Definition lists are correct

**Test Page:** `page3.html` (Buttons & Headings)

### Tables (3 rules)
- `table-duplicate-name` - Table caption not same as summary
- `td-headers-attr` - Table cells reference table headers correctly
- `th-has-data-cells` - Table headers describe data cells

**Test Page:** `blog/post1.html` (Tables & Data)

### Buttons & Links (4 rules)
- `button-name` - Buttons have discernible text
- `input-button-name` - Input buttons have text
- `link-name` - Links have discernible text
- `link-in-text-block` - Links distinguished from surrounding text

**Test Page:** `page3.html` (Buttons & Headings)

### Frames & Embeds (4 rules)
- `frame-title` - Frames have accessible names
- `frame-title-unique` - Frame titles are unique
- `frame-focusable-content` - Frames with focusable content not tabindex=-1

**Test Page:** `demo-bad.html` (Multiple Violations)

### Language & Document (4 rules)
- `html-has-lang` - HTML document has lang attribute
- `html-lang-valid` - Lang attribute has valid value
- `html-xml-lang-mismatch` - Lang and xml:lang agree
- `valid-lang` - Lang attributes have valid values
- `document-title` - Document has non-empty title

**Test Page:** `page4.html` (ARIA & Language)

### Color & Contrast (1 rule)
- `color-contrast` - Contrast meets WCAG 2 AA standards

**Test Page:** `page1.html` (Images & Contrast)

### Parsing & Structure (4 rules)
- `duplicate-id-aria` - No duplicate ID values
- `dlitem` - dt/dd elements contained in dl
- `marquee` - Marquee elements not used
- `blink` - Blink elements not used

**Test Page:** `demo-bad.html` (Multiple Violations)

### Meta & Viewport (3 rules)
- `meta-refresh` - Meta refresh not used
- `meta-viewport` - Viewport doesn't disable zooming
- `autocomplete-valid` - Autocomplete attribute is correct

**Test Page:** `auth/login.html` (Form Authentication)

### Keyboard Interaction (3 rules)
- `bypass` - Skip navigation mechanism
- `scrollable-region-focusable` - Scrollable regions keyboard accessible
- `server-side-image-map` - No server-side image maps

**Test Page:** `demo-bad.html` (Multiple Violations)

## WCAG 2.1 Level A & AA Rules

### Content Sizing (2 rules)
- `avoid-inline-spacing` - Text spacing can be adjusted
- `autocomplete-valid` - Autocomplete suitable for field

**Test Page:** `auth/login.html` (Form Authentication)

## Best Practices Rules (Selected)

### Landmark Rules (8 rules)
- `landmark-banner-is-top-level` - Banner at top level
- `landmark-contentinfo-is-top-level` - Contentinfo at top level
- `landmark-main-is-top-level` - Main at top level
- `landmark-no-duplicate-banner` - At most one banner
- `landmark-no-duplicate-contentinfo` - At most one contentinfo
- `landmark-no-duplicate-main` - At most one main
- `landmark-one-main` - At least one main landmark
- `region` - All content contained by landmarks

**Test Page:** `blog/post1.html` (Tables & Data)

### ARIA Best Practices (3 rules)
- `aria-dialog-name` - Dialogs have accessible names
- `aria-text` - role="text" on elements with no focusable descendants
- `aria-treeitem-name` - Tree items have accessible names

**Test Page:** `page4.html` (ARIA & Language)

### Accessibility Keys (2 rules)
- `accesskeys` - Accesskey values are unique
- `tabindex` - Tabindex not > 0

**Test Page:** `page2.html` (Forms & Labels)

### Page Structure (2 rules)
- `page-has-heading-one` - Page has h1 heading
- `region` - Content in landmarks

**Test Page:** `blog/post1.html` (Tables & Data)

## Test Page Organization

### page1.html - Images & Contrast
- Missing alt text on images
- Poor color contrast 
- Redundant alt text

**Error Types:** 3
**Axe Rules Tested:**
- `image-alt` - Missing image alternative text
- `color-contrast` - Poor color contrast ratio

### page2.html - Forms & Labels  
- Missing form labels
- Unlabeled inputs
- Missing field descriptions
- Incorrect label associations

**Error Types:** 3-4
**Axe Rules Tested:**
- `label` - Form elements without labels
- `select-name` - Select elements without accessible names
- `form-field-multiple-labels` - Multiple labels on one field

### page3.html - Buttons & Headings
- Icon buttons without accessible text
- Heading hierarchy issues (h1 to h3 skip)
- Duplicate IDs

**Error Types:** 3
**Axe Rules Tested:**
- `button-name` - Buttons without discernible text
- `input-button-name` - Input buttons without text
- `heading-order` - Incorrect heading hierarchy
- `empty-heading` - Headings without text

### page4.html - ARIA & Language
- Missing lang attribute on html element
- Invalid ARIA roles
- Missing required ARIA attributes
- Incorrect ARIA attribute usage

**Error Types:** 4-5
**Axe Rules Tested:**
- `html-has-lang` - Document missing lang attribute
- `html-lang-valid` - Invalid lang attribute value
- `aria-roles` - Invalid ARIA role values
- `aria-required-attr` - Missing required ARIA attributes
- `aria-allowed-attr` - Unsupported ARIA attributes for role
- `aria-command-name` - ARIA buttons/links without names

### page5.html - Media & Captions
- Videos without captions
- Audio without transcripts
- Iframes without titles
- Object elements without alt text
- SVG images without accessible names

**Error Types:** 5
**Axe Rules Tested:**
- `video-caption` - Videos without captions
- `audio-caption` - Audio without captions (deprecated)
- `no-autoplay-audio` - Audio autoplaying without control
- `frame-title` - Iframes without accessible names
- `frame-title-unique` - Frame titles not unique
- `object-alt` - Object elements without alt text
- `svg-img-alt` - SVG graphics without accessible text
- `role-img-alt` - role="img" elements without names

### page6.html - Tables & Data Structure
- Table headers not associated with data
- Incorrect header attribute references
- Duplicate table captions/summaries
- List items outside containers
- Definition list structure errors

**Error Types:** 5
**Axe Rules Tested:**
- `th-has-data-cells` - Table headers describe no data cells
- `td-headers-attr` - Table cells reference invalid headers
- `table-duplicate-name` - Caption duplicates summary
- `td-has-header` - Large table cells lack headers (experimental)
- `listitem` - li elements outside ul/ol
- `list` - Incorrect list structure
- `definition-list` - Definition list structure incorrect
- `dlitem` - dt/dd outside dl container

### auth/login.html - Form Authentication
- Missing field labels
- No autocomplete hints
- Checkbox without label
- Radio buttons without fieldset
- Select without label
- Vague button text
- Meta viewport disables zoom

**Error Types:** 5
**Axe Rules Tested:**
- `label` - Form inputs without labels
- `select-name` - Select elements without names
- `autocomplete-valid` - Missing or invalid autocomplete
- `meta-viewport` - Viewport disables zooming
- `tabindex` - Incorrect tabindex values (>0)
- `button-name` - Buttons with insufficient text

### blog/post1.html - Tables, Landmarks & Heading Order
- Missing lang attribute
- Missing image alt text
- Low contrast text
- Skipped heading levels (h2 to h4)
- Table without proper structure
- Icon buttons without text
- List items outside containers
- Missing main landmark

**Error Types:** 5
**Axe Rules Tested:**
- `html-has-lang` - Document missing lang attribute
- `image-alt` - Images without alt text
- `color-contrast` - Poor contrast ratio
- `heading-order` - Skipped heading level
- `th-has-data-cells` - Table headers without descriptions
- `button-name` - Icon buttons without names
- `listitem` - li outside ul/ol
- `landmark-one-main` - No main landmark
- `region` - Content not in landmarks

### demo-bad.html - Multiple Violation Types
- Comprehensive test page with 5+ error types
- Duplicate IDs
- Missing captions
- Nested interactive elements
- Keyboard trap issues
- Mixed violations

**Error Types:** 5+

## Coverage Summary

| Category | Rules | Pages Covered | Status |
|----------|-------|---|--------|
| Text Alternatives | 7 | page1.html, page5.html, blog/post1.html | ✅ |
| ARIA Attributes | 20 | page4.html, demo-bad.html | ✅ |
| Forms & Labels | 8 | page2.html, page6.html, auth/login.html | ✅ |
| Headings & Lists | 6 | page3.html, page6.html, blog/post1.html | ✅ |
| Tables | 4 | page6.html, blog/post1.html | ✅ |
| Buttons & Links | 4 | page3.html, page5.html | ✅ |
| Language & Document | 5 | page4.html, blog/post1.html | ✅ |
| Color & Contrast | 1 | page1.html, blog/post1.html | ✅ |
| Parsing & Structure | 5 | demo-bad.html, page6.html | ✅ |
| Meta & Viewport | 3 | auth/login.html | ✅ |
| Media & Embeds | 8 | page5.html | ✅ |
| Keyboard & Navigation | 5 | demo-bad.html, auth/login.html | ✅ |
| Best Practices | 30+ | Multiple pages | ✅ |

## Total Pages: 9
- **page1.html** — Images & Contrast
- **page2.html** — Forms & Labels
- **page3.html** — Buttons & Headings
- **page4.html** — ARIA & Language
- **page5.html** — Media & Captions *(new)*
- **page6.html** — Tables & Data *(new)*
- **auth/login.html** — Form Authentication
- **blog/post1.html** — Blog & Structure
- **demo-bad.html** — Comprehensive Test

## How to Use These Test Pages

1. Open the **Accessibility Scanner** (`a11y-scan.html`)
2. Select "Local Directory" and drag your site folder
3. Run a scan to identify violations
4. Compare results to expected errors for each page
5. Use violations to validate scanner accuracy

## Notes

- Each page is designed to test 3-5 specific error types
- Pages use intentional violations to validate scanner detection
- Some rules are combined on pages to maximize coverage
- Best practices rules are tested across multiple pages
- Rules disabled by default (AAA, Experimental) are noted but not extensively tested

---

**Last Updated:** January 2026
**Axe Version:** 4.11
**WCAG Versions:** 2.0, 2.1, 2.2
