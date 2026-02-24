---
title: Test Coverage Documentation
---

# Test Coverage Documentation

This directory contains comprehensive accessibility test pages designed to validate axe-core 4.11 rule coverage.

## Quick Start

### View Test Coverage Summary
- **[AXE_RULES_COVERAGE.md](AXE_RULES_COVERAGE.md)** — Overview of all 100+ axe rules organized by category
- **[AXE_RULES_REFERENCE.md](AXE_RULES_REFERENCE.md)** — Detailed map of each rule to specific test pages

### Run Scanner
1. Open `a11y-scan.html` (example scanner interface - not yet implemented)
2. Select "Local Directory" 
3. Drag the repository root onto the drop zone
4. Click "Start Scan"
5. Compare detected violations to expected errors below

## Test Pages at a Glance

| Page | Focus | Error Types | Rules Tested |
|------|-------|-------------|--------------|
| `page1.html` | Images & Contrast | 2-3 | image-alt, color-contrast |
| `page2.html` | Forms & Labels | 3-4 | label, select-name, form-field-multiple-labels |
| `page3.html` | Buttons & Headings | 3-4 | button-name, heading-order, empty-heading |
| `page4.html` | ARIA & Language | 4-5 | aria-*, html-has-lang, html-lang-valid |
| `page5.html` | Media & Captions | 3-4 | video-caption, frame-title, object-alt, svg-img-alt |
| `page6.html` | Tables & Structure | 4-5 | th-has-data-cells, td-headers-attr, list, listitem |
| `auth/login.html` | Form Authentication | 3-4 | label, autocomplete-valid, meta-viewport, tabindex |
| `blog/post1.html` | Blog & Landmarks | 4-5 | heading-order, image-alt, landmark-one-main, region |
| `demo-bad.html` | Multiple Issues | 5+ | Various mixed violations |

## Expected Violations

### Total Violations Across All Pages: 40+

Each page is designed to trigger 3-5 specific error types, with no overlap except intentional cross-validation.

### Rule Categories Covered

✅ **Text Alternatives** (7 rules)
- Image alt text, video captions, SVG descriptions

✅ **ARIA Attributes** (20 rules)
- ARIA role validation, attribute checking

✅ **Forms** (4 rules)
- Form labels, select names, field associations

✅ **Headings & Lists** (5+ rules)
- Heading hierarchy, list structure

✅ **Tables** (3 rules)
- Table header associations, structure

✅ **Buttons & Links** (4 rules)
- Button text, link accessibility names

✅ **Language** (5 rules)
- Lang attributes, language declarations

✅ **Color & Contrast** (1 rule)
- WCAG 2 AA contrast ratios

✅ **Parsing & Structure** (5+ rules)
- Duplicate IDs, semantic HTML

✅ **Meta & Viewport** (3 rules)
- Viewport zoom, meta refresh

✅ **Media & Embeds** (8 rules)
- Video captions, iframe titles

✅ **Keyboard** (3+ rules)
- Keyboard navigation, tabindex

✅ **Best Practices** (30+ rules)
- Landmarks, accessibility keys, etc.

## Rule Coverage by Type

### WCAG 2.0 Level A & AA (68 rules)
**Coverage: ~45 rules tested** (66%)

### WCAG 2.1 Level A & AA (26 rules)
**Coverage: ~8 rules tested** (31%)

### Best Practices (30+ rules)
**Coverage: ~15 rules tested** (50%)

### Experimental & AAA Rules
**Coverage: ~5 rules tested** (varying)

## Important Notes

⚠️ **These are intentional test fixtures** — All accessibility errors are deliberate for validation purposes.

🔍 **Not all rules have tests** — Some edge cases and deprecated rules are not covered. See [AXE_RULES_REFERENCE.md](AXE_RULES_REFERENCE.md) for full details.

🚀 **Use with scanner validation** — These pages should be scanned with `a11y-scan.html` (example scanner - not yet implemented) to verify scanner accuracy.

## Detailed Documentation

- **[AXE_RULES_COVERAGE.md](AXE_RULES_COVERAGE.md)** — Complete axe rule overview with page mapping
- **[AXE_RULES_REFERENCE.md](AXE_RULES_REFERENCE.md)** — Rule-by-rule reference with detailed test information

## Related Resources

### W3C Specifications

- **[WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)** — Official accessibility standards

### Machine-Readable Standards

For AI systems and automated tooling, see [wai-yaml-ld](https://github.com/mgifford/wai-yaml-ld) for structured accessibility standards:

- [WCAG 2.2 (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wcag-2.2-normative.yaml) - Machine-readable WCAG 2.2 normative content
- [WCAG 2.0 (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wcag-2.0-normative.yaml) - WCAG 2.0 legacy normative
- [Accessibility Rule Catalogs (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/accessibility-rule-catalogs.yaml) - Machine-readable ACT, Deque axe, and Siteimprove Alfa rules

### Tools and Projects

- **[O-Hat Scanner](https://github.com/mgifford/o-hat-scanner)** — Parent project with automated scanning
- **[Deque axe-core](https://github.com/dequelabs/axe-core)** — The accessibility engine behind all scanning

---

**Last Updated:** January 2026
**Axe Version:** 4.11
**Test Pages:** 9
**Rules Documented:** 100+
