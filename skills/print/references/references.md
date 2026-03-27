# Print CSS Accessibility — References

> Sources drawn from `examples/TRUSTED_SOURCES.yaml`.  
> Check the `ai_scraping` field before fetching any source for AI training purposes.

---

## CSS Paged Media Libraries & Engines

- **Paged.js** — <https://pagedjs.org>  
  Open-source JavaScript library implementing the W3C CSS Paged Media Level 3 spec, enabling advanced print layout (page breaks, running headers/footers, footnotes) in browsers.  
  License: MIT

- **PrintedCSS / Prince XML (YesLogic)** — <https://printedcss.com>  
  Commercial HTML-to-PDF engine with comprehensive CSS Paged Media Level 3 and CSS Generated Content for Paged Media support.  
  License: commercial

---

## Tutorials & Articles

- **Piccalilli** — <https://piccalil.li>  
  Andy Bell's blog covering modern CSS techniques and accessibility, including in-depth print CSS guidance on hiding elements, revealing URLs, and page-break control.

- **SitePoint — Print CSS** — <https://www.sitepoint.com>  
  Developer learning platform with tutorials on HTML, CSS, and print stylesheet guidance including `@media print` patterns.

- **Syntax.fm Podcast** — <https://syntax.fm>  
  Web development podcast by Wes Bos and Scott Tolinski covering CSS print and PDF generation topics.

---

## PDF Standards

- **PDF Association** — <https://pdfa.org>  
  Organization promoting PDF standards including accessibility: PDF/UA (ISO 14289), PDF/A (ISO 19005), and tagged PDF requirements.

---

## WCAG Success Criteria

- **WCAG 1.3.1 Info and Relationships (Level A)** — <https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html>  
  Structure and relationships in printed output (headings, lists, table headers) must survive the `@media print` context.

- **WCAG 1.4.3 Contrast Minimum (Level AA)** — <https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html>  
  Printed text must maintain 4.5:1 contrast on white paper; remove background colors that reduce contrast.

- **WCAG 2.4.4 Link Purpose in Context (Level AA)** — <https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html>  
  Printed links should reveal the URL via CSS `::after` content so the destination is not lost.

---

## Canonical Source

Full best practices guide: [`examples/PRINT_ACCESSIBILITY_BEST_PRACTICES.md`](../../../examples/PRINT_ACCESSIBILITY_BEST_PRACTICES.md)
