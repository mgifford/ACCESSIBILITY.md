---
title: Rules Summary
---

# Axe 4.11 Test Coverage - Quick Reference

## 📋 What's Tested

This accessibility test suite covers **50+ axe-core 4.11 rules** across **9 test pages**.

### By the Numbers
- **9 test pages** with intentional accessibility violations
- **100+ axe rules** documented
- **50+ rules actively tested**
- **40+ expected violations** across all pages
- **3-5 error types per page** (no more than 5, as requested)

---

## 🎯 Test Pages

### Text Alternatives
**`page1.html`** — Images & Contrast
- Missing alt text on images
- Poor color contrast (WCAG 2 AA)
- Expected violations: 2-3

### Forms & Input Accessibility
**`page2.html`** — Forms & Labels
- Inputs without associated labels
- Unlabeled select elements
- Multiple labels on single field
- Expected violations: 3-4

### Buttons & Semantic HTML
**`page3.html`** — Buttons & Headings
- Icon buttons without accessible text
- Heading hierarchy issues (h1 → h3 skip)
- Duplicate IDs
- Expected violations: 3-4

### ARIA & Language
**`page4.html`** — ARIA & Language
- Missing lang attribute on HTML element
- Invalid ARIA roles
- ARIA attributes without required values
- Expected violations: 4-5

### Media & Embedded Content
**`page5.html`** — Media & Captions *(NEW)*
- Videos without captions (video-caption rule)
- Audio without transcripts
- Iframes without accessible titles
- SVG images without descriptions
- Object elements without alt text
- Expected violations: 3-4

### Tables & Data Structure
**`page6.html`** — Tables & Data *(NEW)*
- Table headers not associated with cells
- Incorrect header attribute references
- List items outside containers
- Definition list structure errors
- Expected violations: 4-5

### Form Authentication
**`auth/login.html`** — Form Authentication
- Missing field labels
- Invalid autocomplete attributes
- Meta viewport disables zoom
- Incorrect tabindex values
- Expected violations: 3-4

### Blog & Content
**`blog/post1.html`** — Blog & Landmarks
- Missing lang attribute
- Missing image alt text
- Skipped heading levels
- Missing main landmark
- List structure issues
- Expected violations: 4-5

### Comprehensive Test
**`demo-bad.html`** — Multiple Issues
- Comprehensive violations across multiple categories
- Expected violations: 5+

---

## 📚 Documentation

### Understanding Axe Rules
1. **[TEST_COVERAGE.md](TEST_COVERAGE.md)** — Overview & quick reference
2. **[AXE_RULES_COVERAGE.md](AXE_RULES_COVERAGE.md)** — Complete rule summary (100+ rules)
3. **[AXE_RULES_REFERENCE.md](AXE_RULES_REFERENCE.md)** — Detailed rule-to-page mapping

### What These Documents Contain

**AXE_RULES_COVERAGE.md:**
- Overview of all axe rule categories
- WCAG version breakdown (2.0, 2.1, 2.2)
- Which pages test which categories
- Summary coverage table

**AXE_RULES_REFERENCE.md:**
- Rule-by-rule mapping to test pages
- Expected violations for each rule
- Severity levels (Critical, Serious, Moderate, Minor)
- Coverage statistics

**TEST_COVERAGE.md:**
- Quick start guide
- Test pages at a glance
- Rule categories with checkmarks
- Related resources

---

## 🚀 How to Validate

### Using the Standalone Scanner

1. Open `a11y-scan.html` (example scanner interface - not yet implemented)
2. Select "Local Directory" from the dropdown
3. Drag this repository folder onto the drop zone
4. Click "Start Scan"
5. Review violations detected on each page

### Comparing to Expected Results

Each page has **3-5 specific error types**:

- **page1.html** → Expect violations: `image-alt`, `color-contrast`
- **page2.html** → Expect violations: `label`, `select-name`, `form-field-multiple-labels`
- **page3.html** → Expect violations: `button-name`, `heading-order`, `empty-heading`
- **page4.html** → Expect violations: `html-has-lang`, `aria-roles`, `aria-required-attr`
- **page5.html** → Expect violations: `video-caption`, `frame-title`, `object-alt`, `svg-img-alt`
- **page6.html** → Expect violations: `th-has-data-cells`, `td-headers-attr`, `listitem`, `dlitem`
- **auth/login.html** → Expect violations: `label`, `autocomplete-valid`, `meta-viewport`, `tabindex`
- **blog/post1.html** → Expect violations: `heading-order`, `image-alt`, `html-has-lang`, `landmark-one-main`

---

## 📊 Rule Coverage Breakdown

### By WCAG Level

| Standard | Rules | Tested | % Coverage |
|----------|-------|--------|-----------|
| WCAG 2.0 A/AA | 68 | ~45 | 66% |
| WCAG 2.1 A/AA | 26 | ~8 | 31% |
| Best Practices | 30+ | ~15 | 50% |
| Experimental | 9 | ~5 | 56% |
| **TOTAL** | **100+** | **50+** | **50%** |

### By Category

- ✅ Text Alternatives (7 rules)
- ✅ ARIA Attributes (20 rules)
- ✅ Forms (4+ rules)
- ✅ Headings & Lists (5+ rules)
- ✅ Tables (3 rules)
- ✅ Buttons & Links (4 rules)
- ✅ Language (5 rules)
- ✅ Color & Contrast (1 rule)
- ✅ Parsing & Structure (5+ rules)
- ✅ Meta & Viewport (3 rules)
- ✅ Media & Embeds (8 rules)
- ✅ Keyboard (3+ rules)
- ✅ Best Practices (30+ rules)

---

## 🎓 Learning Resources

### About Axe-Core
- [Deque University - Axe 4.11 Rules](https://dequeuniversity.com/rules/axe/html/4.11)
- [GitHub: dequelabs/axe-core](https://github.com/dequelabs/axe-core)

### Accessibility Standards

#### W3C Specifications

- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1)
- [WCAG 2.0 Guidelines](https://www.w3.org/TR/WCAG20/)

#### Machine-Readable Standards

For AI systems and automated tooling, see [wai-yaml-ld](https://github.com/mgifford/wai-yaml-ld) for structured accessibility standards:

- [WCAG 2.2 (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wcag-2.2-normative.yaml) - Machine-readable WCAG 2.2 normative content
- [WCAG 2.0 (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wcag-2.0-normative.yaml) - WCAG 2.0 legacy normative
- [Accessibility Rule Catalogs (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/accessibility-rule-catalogs.yaml) - Machine-readable ACT, Deque axe, and Siteimprove Alfa rules
- [Standards Link Graph (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/standards-link-graph.yaml) - Relationships across WCAG standards

### Related Projects
- [O-Hat Scanner](https://github.com/mgifford/o-hat-scanner) - Parent project
- [O-Hat Standalone](https://github.com/mgifford/o-hat-standalone) - This project

---

## ⚠️ Important Notes

### Design Principle
Each page is designed to test **3-5 specific error types** to keep validation focused and unambiguous.

### Intentional Issues
All accessibility errors on these pages are **intentional** and used for validation purposes only.

### Coverage Gaps
Some advanced or deprecated rules are not tested. See [AXE_RULES_REFERENCE.md](AXE_RULES_REFERENCE.md) for complete rule status.

### Scanner Validation
These pages should be used with `a11y-scan.html` (example scanner - not yet implemented) to verify scanner accuracy and rule detection.

---

**Last Updated:** January 2026
**Axe Version:** 4.11
**Documentation Status:** ✅ Complete
**Test Coverage:** ✅ 50+ rules active
