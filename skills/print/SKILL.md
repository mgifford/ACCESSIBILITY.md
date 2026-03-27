# Print Accessibility Skill

> **Canonical source**: `examples/PRINT_ACCESSIBILITY_BEST_PRACTICES.md`
> This skill is derived from that file. When in doubt, the example is authoritative.

Apply these rules when implementing or reviewing print stylesheets.

---

## Core Mandate

Printing is an accessibility feature. Users with cognitive disabilities may find printed material easier to process; users with low vision may enlarge it; users without internet may need offline copies. Print styles must keep content useful and readable.

---

## Required: Scope All Print Styles

```css
/* Preferred: inline block */
@media print { /* all print styles here */ }

/* Alternative: separate file */
<link rel="stylesheet" href="print.css" media="print">
```

---

## Required: Hide Non-Essential Elements

```css
@media print {
  nav, header nav, footer, aside, .sidebar,
  .cookie-banner, .skip-link, .ad, .social-share,
  .print-hide, video, audio, iframe,
  form button[type="submit"]:not(.print-show) {
    display: none !important;
  }
}
```

Utility classes:
- `.print-hide` — elements to suppress in print
- `.print-show` — elements hidden on screen but needed in print

---

## Required: Reveal Link URLs

```css
@media print {
  a[href]::after {
    content: " (" attr(href) ")";
    font-size: 0.875em;
    color: #333;
    word-break: break-all;
  }
  /* Suppress non-informative links */
  a[href^="#"]::after,
  a[href^="javascript:"]::after,
  a[href].no-print-url::after {
    content: "";
  }
}
```

---

## Required: Print Typography

```css
@media print {
  body {
    font-family: Georgia, "Times New Roman", Times, serif;
    font-size: 12pt;
    line-height: 1.5;
    color: #000;
    background: #fff;
  }
  h1 { font-size: 22pt; }
  h2 { font-size: 18pt; }
  h3 { font-size: 14pt; }
  p, li, td, th {
    font-size: 11pt;
    orphans: 3;
    widows: 3;
  }
}
```

Use serif typefaces for body text. Set `orphans`/`widows` to prevent isolated lines. Use `pt` for font sizes.

---

## Required: Page Setup

```css
@page {
  margin: 2cm;
  size: A4 portrait;
}
@page :first { margin-top: 3cm; }
```

---

## Required: Page Break Control

```css
@media print {
  h1, h2, h3 {
    page-break-after: avoid;
    break-after: avoid;
  }
  figure, img, table, pre, blockquote {
    page-break-inside: avoid;
    break-inside: avoid;
  }
  .page-break-before {
    page-break-before: always;
    break-before: always;
  }
}
```

---

## Required: Images

```css
@media print {
  img {
    max-width: 100% !important;
    page-break-inside: avoid;
  }
  /* Ensure images print with enough contrast */
  img[src*=".png"] {
    background: #fff;
  }
}
```

---

## Required: Tables

```css
@media print {
  table { border-collapse: collapse; width: 100%; }
  th, td { border: 1px solid #333; padding: 4pt; text-align: left; }
  thead { display: table-header-group; } /* Repeat header on each page */
  tr { page-break-inside: avoid; }
}
```

---

## Definition of Done Checklist

- [ ] All print styles scoped in `@media print`
- [ ] Nav, footer, ads, interactive widgets hidden
- [ ] Link URLs revealed via `::after` (fragment links suppressed)
- [ ] Serif body font, `pt` units, `12pt` base size
- [ ] `@page` margins defined (at least 2cm)
- [ ] Headings won't orphan at page bottom (`page-break-after: avoid`)
- [ ] Figures and tables won't split mid-page
- [ ] Table headers repeat across pages (`thead { display: table-header-group }`)
- [ ] Tested using browser Print Preview in Chrome, Firefox, and Safari

---

## Key WCAG Criteria

- 1.3.1 Info and Relationships (A) — structure preserved
- 1.4.3 Contrast Minimum (AA) — text readable on white paper
- 2.4.4 Link Purpose (AA) — URLs exposed for printed links

---

## References

- [Full best practices guide](../../examples/PRINT_ACCESSIBILITY_BEST_PRACTICES.md)
- [Curated reference sources](references/references.md)
