---
title: Tables Accessibility Best Practices
---

# Tables Accessibility Best Practices

This document defines project-level requirements for accessible HTML data tables.

## 1. Core Principle

Tables communicate relationships between data. Sighted users scan rows and columns
visually; screen reader users navigate cell by cell and rely on header announcements
for context. Without proper markup, every cell is an orphaned data point.

**Never use tables for layout.** Use CSS (Grid or Flexbox) instead. Layout tables
that remain in a codebase must have `role="presentation"` and must linearise without
loss of meaning.

## 2. `<th>` Elements with `scope`

A table with only `<td>` cells is a critical issue — screen readers announce raw data
with no context. All `<th>` elements must have an explicit `scope` attribute.

```html
<table>
  <caption>Monthly sales by region, Q1 2024</caption>
  <thead>
    <tr>
      <th scope="col">Region</th>
      <th scope="col">January</th>
      <th scope="col">February</th>
      <th scope="col">March</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">North</th>
      <td>$12,400</td>
      <td>$14,200</td>
      <td>$16,800</td>
    </tr>
    <tr>
      <th scope="row">South</th>
      <td>$9,100</td>
      <td>$10,300</td>
      <td>$11,900</td>
    </tr>
  </tbody>
</table>
```

`scope="col"` on column headers; `scope="row"` on row headers. When both are present,
the screen reader announces both before the data cell.

## 3. `<caption>` on Every Data Table

Every data table must have a `<caption>`. Without it, screen reader users navigating
multiple tables on one page cannot distinguish which table they are in.

```html
<table>
  <caption>2024 budget allocation by department</caption>
  …
</table>
```

`<caption>` must be the first child of `<table>`, before `<thead>`. It is announced
by screen readers when the user enters the table and helps users in Reader Mode identify
the table's purpose after CSS is stripped.

## 4. Spanned Headers

When a header spans multiple columns or rows, use `colgroup` or `rowgroup` scope values:

```html
<table>
  <caption>Quarterly revenue by product line (USD thousands)</caption>
  <thead>
    <tr>
      <th scope="col" rowspan="2">Product</th>
      <th scope="colgroup" colspan="2">H1</th>
      <th scope="colgroup" colspan="2">H2</th>
    </tr>
    <tr>
      <th scope="col">Q1</th>
      <th scope="col">Q2</th>
      <th scope="col">Q3</th>
      <th scope="col">Q4</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Hardware</th>
      <td>1,200</td>
      <td>1,450</td>
      <td>1,100</td>
      <td>1,800</td>
    </tr>
  </tbody>
</table>
```

Test spanned tables with NVDA+Chrome and JAWS+Chrome — screen reader handling of
complex headers can be inconsistent.

## 5. When to Use `headers` + `id`

The `headers` and `id` approach associates individual cells with specific header cells
by ID reference. Use it only for tables so complex that `scope` alone causes headers
to apply to the wrong cells.

```html
<table>
  <caption>Staff schedules by shift and department</caption>
  <tr>
    <th id="dept">Department</th>
    <th id="am">AM shift</th>
    <th id="pm">PM shift</th>
  </tr>
  <tr>
    <th id="nursing">Nursing</th>
    <td headers="nursing am">8</td>
    <td headers="nursing pm">6</td>
  </tr>
</table>
```

A table complex enough to require this approach may be functionally inaccessible in
practice — reading three or four headers before each cell is confusing when heard.
Prefer simplifying the table structure.

## 6. `<thead>`, `<tbody>`, `<tfoot>`

These elements have no direct assistive technology benefit on their own, but `<thead>`
enables `display: table-header-group` in print CSS, repeating column headers on every
printed page.

```html
<table>
  <caption>…</caption>
  <thead>
    <tr><th scope="col">…</th></tr>
  </thead>
  <tbody>
    <tr><td>…</td></tr>
  </tbody>
  <tfoot>
    <tr><td colspan="4">Total: $45,600</td></tr>
  </tfoot>
</table>
```

## 7. Responsive Tables

Wide tables require horizontal scrolling for low-vision users who zoom. Always wrap
tables in a scrollable container — never clip overflow silently.

```html
<div role="region"
     aria-labelledby="table-caption-id"
     tabindex="0"
     style="overflow-x: auto;">
  <table>
    <caption id="table-caption-id">Monthly sales by region</caption>
    …
  </table>
</div>
```

`tabindex="0"` makes the scroll container keyboard-focusable. `role="region"` with
`aria-labelledby` announces it as a named landmark.

For small screens, a card-based layout is an alternative:

```css
@media (max-width: 600px) {
  table, thead, tbody, th, td, tr { display: block; }
  thead tr { position: absolute; top: -9999px; left: -9999px; }
  td::before {
    content: attr(data-label) ": ";
    font-weight: bold;
  }
}
```

When using the card pattern, add `data-label` attributes to each `<td>`:

```html
<td data-label="Region">North</td>
<td data-label="January">$12,400</td>
```

## 8. Sortable Columns

Interactive sortable columns must be keyboard operable and announce their sort state:

```html
<th scope="col">
  <button type="button"
          aria-sort="ascending"
          aria-label="Sort by Region, currently ascending">
    Region
    <svg aria-hidden="true" focusable="false"><!-- sort icon --></svg>
  </button>
</th>
```

`aria-sort` values: `ascending`, `descending`, `none`, `other`. Test with NVDA and
JAWS — announcement varies across screen readers.

## 9. Colour in Tables

Zebra stripes (alternating row backgrounds) vanish in forced-colours mode and when
printing with backgrounds off. Provide fallback borders:

```css
@media print {
  tbody tr { border-bottom: 1px solid #333; }
}

@media (forced-colors: active) {
  tbody tr { border-bottom: 1px solid CanvasText; }
}
```

Never use background colour alone to convey meaning (for example, red rows = overdue).
Always pair colour with a text label or icon.

## 10. Layout Tables

Legacy layout tables must be marked to remove them from table navigation mode:

```html
<table role="presentation">
  <!-- layout content -->
</table>
```

`role="presentation"` removes table semantics from the assistive technology tree.
The content must still linearise logically when read top-to-bottom, left-to-right.
Verify by disabling CSS and reading the page linearly.

## 11. CMS and Framework Notes

- **Drupal**: Configure CKEditor to require `<caption>` and `scope` attributes. The
  Drupal Accessibility Coding Standards require WCAG 2.1 AA compliance for contributed
  modules — table markup in contrib must follow these rules.
- **WordPress and other CMS**: Block editors often generate tables without `<caption>`
  or `scope`. Audit CMS-generated markup and configure the editor to add missing attributes.
- **Generated tables** (DataTables.js, AG Grid, etc.): Verify the library outputs
  `<th scope="col">`, `<caption>`, and `<thead>`. Many do not by default.

## 12. Testing Expectations

- Tab into the table and verify column and row headers are announced before each cell
  (NVDA+Chrome: `T` key to navigate to table; JAWS: `Ctrl+Alt+Arrow` to navigate cells).
- Open the page in Firefox or Safari Reader Mode — table structure must remain meaningful.
- Test at 200% zoom — wide tables must scroll, not clip.
- Verify sortable column buttons are keyboard operable and `aria-sort` updates correctly.

## 13. Definition of Done

A table change is not complete unless:

- No tables used for layout; existing layout tables have `role="presentation"`.
- Every data table has a `<caption>` as its first child.
- All `<th>` elements have an explicit `scope` attribute.
- `<thead>` and `<tbody>` are present.
- Spanned headers use `colgroup` or `rowgroup` scope values.
- Wide tables are wrapped in a scrollable container with `role="region"`, `aria-labelledby`, and `tabindex="0"`.
- Sortable columns use `aria-sort` and are keyboard operable.
- Colour-only row distinction has print and forced-colours fallback.
- Tested with NVDA+Chrome, JAWS+Chrome, and VoiceOver+Safari.
- Tested in Reader Mode — structure remains meaningful.

---

## References

- [WAI Tables Tutorial](https://www.w3.org/WAI/tutorials/tables/)
- [WebAIM: Creating Accessible Tables](https://webaim.org/techniques/tables/data)
- [MDN: HTML table accessibility](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Table_accessibility)
- [WCAG 2.2 Understanding 1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html)
- [Drupal Accessibility Coding Standards](https://www.drupal.org/docs/getting-started/accessibility/accessibility-coding-standards)

### Machine-Readable Standards

For AI systems and automated tooling, see [wai-yaml-ld](https://github.com/mgifford/wai-yaml-ld) for structured accessibility standards:

- [WCAG 2.2 (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wcag-2.2-normative.yaml) - Machine-readable WCAG 2.2 normative content including info and relationships criteria
- [ARIA Informative (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wai-aria-informative.yaml) - ARIA table roles and properties
- [HTML Living Standard Accessibility (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/html-living-standard-accessibility.yaml) - HTML table element accessibility
- [Standards Link Graph (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/standards-link-graph.yaml) - Relationships across WCAG/ARIA/HTML table standards
