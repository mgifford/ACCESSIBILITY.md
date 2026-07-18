---
title: Tables Accessibility Best Practices
---

# Tables Accessibility Best Practices

Use tables for information whose meaning depends on relationships between rows and columns. Mark those relationships in HTML so users can identify the table, navigate its cells, and hear the relevant headers with each value.

Do not turn a reading-oriented data table into an application-style grid unless users genuinely need spreadsheet-like keyboard interaction.

---

## 1. Required Outcomes

A conforming implementation must:

- use table markup only for genuinely tabular information;
- identify header cells and associate them with the correct data cells;
- provide enough context to understand the table's purpose, units, scope, and unusual structure;
- preserve a meaningful reading order;
- distinguish missing, unavailable, zero, and not-applicable values;
- make sorting, filtering, selection, editing, pagination, and disclosure controls keyboard operable;
- expose the names, roles, states, and results of those controls;
- remain usable with zoom, narrow viewports, themes, forced colours, and print; and
- preserve structure and relationships in exported formats.

The complexity of the markup should match the complexity of the information. Simplifying or splitting a table is often better than adding increasingly complicated associations.

---

## 2. Choose the Correct Structure

Use:

- a **list** when items do not depend on column relationships;
- a **definition list** for term and description pairs;
- a **data table** for reading and comparing row-column data;
- an **ARIA grid or treegrid** only for an application-style composite widget with cell navigation or editing; and
- CSS Grid or Flexbox for page layout.

Do not use a table merely to align form fields, cards, images, or page regions.

---

## 3. Basic Data Table Pattern

Use native HTML elements. A table with both column and row headers should normally use explicit `scope` values.

```html
<table>
  <caption>Monthly sales by region, first quarter 2025</caption>
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

Use `<th>` for cells that label a row, column, or group. Do not use `<td>` styled in bold as a visual substitute.

For a small, unambiguous table with only one header row or one header column, browsers can often infer header direction from `<th>`. Explicit `scope="col"` and `scope="row"` remain a dependable authoring convention, especially when the data is similar or the table is large.

`<thead>`, `<tbody>`, and `<tfoot>` provide structural row groups. They also support sticky headers, styling, scripting, and repeating headers in print. Their presence does not repair missing or incorrect header associations.

---

## 4. Captions and Summaries

### Use a caption as the default table name

`<caption>` is the native way to identify a table. It is particularly helpful when several tables appear on a page or users navigate directly between tables.

```html
<table>
  <caption>2025 budget allocation by department</caption>
  <!-- Header and data rows -->
</table>
```

The caption must be a direct child of `<table>`. Keep it concise and specific.

WCAG does not require a caption in every possible case. An immediately associated heading or surrounding text can sometimes identify a simple table adequately. Treat `<caption>` as the preferred default, then avoid needless duplication when another tested association already supplies the same name.

### Describe unusual structure

A complex table may need a short summary that explains how its rows and columns are organized.

```html
<table>
  <caption>
    Availability of holiday accommodation
    <span class="table-summary">
      Locations form row groups. Property types form columns.
    </span>
  </caption>
  <!-- Table content -->
</table>
```

The summary explains navigation and organization. It should not repeat every value or duplicate the caption.

The HTML `summary` attribute on `<table>` is obsolete. Use a visible explanation, caption content, or a nearby description. If `aria-describedby` is used, keep the referenced text concise and test support.

---

## 5. Column and Row Headers

When data cells need both a column and row context, mark both directions.

```html
<table>
  <caption>Delivery slots</caption>
  <thead>
    <tr>
      <td></td>
      <th scope="col">Monday</th>
      <th scope="col">Tuesday</th>
      <th scope="col">Wednesday</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">09:00 to 11:00</th>
      <td>Closed</td>
      <td>Open</td>
      <td>Open</td>
    </tr>
    <tr>
      <th scope="row">11:00 to 13:00</th>
      <td>Open</td>
      <td>Open</td>
      <td>Closed</td>
    </tr>
  </tbody>
</table>
```

The empty top-left cell has no header function, so it is a `<td>`. Do not add meaningless text such as “blank” solely to fill a corner cell.

Keep header text clear without depending on abbreviations, icons, or tooltips. Put units in the header when they apply to a whole column.

```html
<th scope="col">Revenue (CAD, thousands)</th>
```

---

## 6. Spanning Column and Row Groups

Use `scope="colgroup"` or `scope="rowgroup"` only when the corresponding group exists in the table structure.

### Column groups

```html
<table>
  <caption>Quarterly revenue by product line, CAD thousands</caption>

  <colgroup>
    <col>
  </colgroup>
  <colgroup span="2"></colgroup>
  <colgroup span="2"></colgroup>

  <thead>
    <tr>
      <th scope="col" rowspan="2">Product</th>
      <th scope="colgroup" colspan="2">First half</th>
      <th scope="colgroup" colspan="2">Second half</th>
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

### Row groups

Use separate `<tbody>` elements to define row groups when a group heading applies to several rows.

```html
<tbody>
  <tr>
    <th scope="rowgroup" rowspan="2">Ontario</th>
    <th scope="row">Ottawa</th>
    <td>1,120,000</td>
  </tr>
  <tr>
    <th scope="row">Kingston</th>
    <td>132,000</td>
  </tr>
</tbody>
```

Test grouped headers with the browser and assistive-technology combinations the project supports. If the associations are difficult to understand, split the content into simpler tables.

---

## 7. Multi-level and Irregular Headers

When strict horizontal or vertical `scope` associations cannot describe the table, use unique header IDs and each data cell's `headers` attribute.

```html
<table>
  <caption>Accommodation availability</caption>
  <thead>
    <tr>
      <th id="location" scope="col">Location</th>
      <th id="size" scope="col">Size</th>
      <th id="studio" scope="col">Studio</th>
      <th id="apartment" scope="col">Apartment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th id="paris" scope="row">Paris</th>
      <th id="paris-one" scope="row">One bedroom</th>
      <td headers="paris paris-one studio">11</td>
      <td headers="paris paris-one apartment">20</td>
    </tr>
  </tbody>
</table>
```

Every ID must be unique in the document, and every token in `headers` must match a relevant header cell.

Do not use `headers` and `id` merely to make simple markup look more explicit. They increase authoring and maintenance risk. First consider:

- splitting one table into several tables;
- transposing rows and columns;
- moving explanatory material outside the grid;
- reducing nested header levels; or
- offering a filtered view.

Validate associations against the actual dataset after every schema or column change.

---

## 8. Totals, Subtotals, and Footers

Mark total labels as headers when they identify the values in that row.

```html
<tfoot>
  <tr>
    <th scope="row">Total</th>
    <td>$21,500</td>
    <td>$24,500</td>
    <td>$28,700</td>
  </tr>
</tfoot>
```

Do not communicate subtotals only through bold text, indentation, or a background colour. Include visible text such as “Subtotal” and preserve the applicable header associations.

If a total is calculated dynamically, expose any visible update status appropriately and ensure the exported value uses the same calculation.

---

## 9. Empty, Missing, and Special Values

An empty cell is ambiguous. It can mean zero, not applicable, unknown, not reported, unavailable, or intentionally blank.

Use explicit text where the distinction matters:

- `0` for a measured zero;
- `Not applicable` when the measure does not apply;
- `No data` when no value is available;
- `Not reported` when the source did not report a value; or
- `Suppressed` when a value is intentionally withheld.

Define shortened visible symbols such as `N/A` or an em dash in the caption or nearby note. Prefer full text when space permits. Do not use `&nbsp;` to make an empty cell appear occupied.

Explain estimated, rounded, preliminary, and revised values. Do not rely on colour or typographic style alone to identify them.

---

## 10. Numeric and Text Presentation

- Align text consistently with the document language.
- Align numeric values consistently to support comparison.
- Include units in headers rather than repeating them in every cell when the unit is shared.
- Use locale-appropriate separators, decimal marks, dates, and currencies.
- Keep the underlying text in a meaningful reading order.
- Do not place essential values in CSS generated content.

```css
td[data-type="number"] {
  text-align: end;
  font-variant-numeric: tabular-nums;
}
```

Do not use fixed-width cells that clip enlarged text. Allow wrapping where it does not destroy the data relationship.

---

## 11. Responsive Tables and Reflow

WCAG 1.4.10 allows two-dimensional scrolling for parts of content that require a two-dimensional layout for usage or meaning, including data tables. The exception applies to the table, not to the surrounding page or to content within individual cells.

### Contained horizontal scrolling

```html
<div
  class="table-scroll"
  role="region"
  aria-labelledby="sales-caption"
  tabindex="0"
>
  <table>
    <caption id="sales-caption">Monthly sales by region</caption>
    <!-- Table content -->
  </table>
</div>
```

```css
.table-scroll {
  max-inline-size: 100%;
  overflow: auto;
}

.table-scroll:focus-visible {
  outline: 3px solid currentColor;
  outline-offset: 3px;
}
```

Use a labelled region when the scroll container benefits from being separately discoverable. Do not turn every table wrapper into a landmark. Use `tabindex="0"` when it is needed to make the overflow area keyboard-scrollable in supported browsers, and provide a visible focus indicator.

### Do not destroy table display semantics

Avoid responsive CSS that changes `table`, `thead`, `tbody`, `tr`, `th`, and `td` to `display: block`. Browser and assistive-technology behaviour varies, and duplicated `data-label` content can become inconsistent with real headers.

When a card presentation is genuinely better on small screens, render a real alternative list or definition-list view from the same data. Expose one view at a time, preserve all values and controls, and test both presentations.

Test at 200% and 400% zoom, with long translated strings, and at narrow viewport sizes.

---

## 12. Sticky Headers and Columns

Sticky headers can help users retain context while scrolling.

```css
thead th {
  position: sticky;
  inset-block-start: 0;
  background: var(--table-header-background);
  color: var(--table-header-text);
  z-index: 1;
}
```

- Keep the original semantic `<th>` elements.
- Do not create focusable cloned headers.
- If a visual clone is unavoidable, hide it from assistive technology and remove all duplicate IDs.
- Ensure sticky content does not obscure focus, headings, or the first data row.
- Test at high zoom and with browser text spacing overrides.

---

## 13. Sortable Columns

Put a native button inside each sortable column header. Put `aria-sort` on the `<th>` for the currently sorted column only.

```html
<table>
  <caption>
    Employees
    <span class="visually-hidden">
      Activate a column header button to sort the table.
    </span>
  </caption>
  <thead>
    <tr>
      <th scope="col" aria-sort="ascending">
        <button type="button">
          Last name
          <span class="sort-icon" aria-hidden="true">▲</span>
        </button>
      </th>
      <th scope="col">
        <button type="button">
          Department
          <span class="sort-icon" aria-hidden="true">◇</span>
        </button>
      </th>
    </tr>
  </thead>
  <tbody>
    <!-- Rows -->
  </tbody>
</table>
```

When sorting changes:

1. Sort the complete dataset, not only the visible page, unless the interface clearly says otherwise.
2. Move `aria-sort` to the newly sorted `<th>`.
3. Use `ascending`, `descending`, or `other` accurately.
4. Update the visible direction indicator without depending on colour alone.
5. Keep keyboard focus on the activated button.
6. Preserve header and data-cell associations.

Do not put `aria-sort` on the button or on both the button and header. Do not replace the button with a click handler on `<th>`.

---

## 14. Filtering, Search, and Result Counts

Place filters before the table, label them using normal form patterns, and describe what they affect.

```html
<form id="employee-filters">
  <label for="department-filter">Department</label>
  <select id="department-filter" name="department">
    <option value="">All departments</option>
    <option>Finance</option>
    <option>Operations</option>
  </select>
  <button type="submit">Apply filters</button>
</form>

<p id="employee-results" role="status" aria-atomic="true">
  Showing 24 employees.
</p>
```

- Update the visible result count after filtering.
- Use `role="status"` when that count changes without moving focus and functions as a status message.
- Keep active filters visible and programmatically determinable.
- Provide a clear way to remove filters.
- Ensure “No results” is visible and announced appropriately.
- Keep the table caption accurate when scope or date range changes.

Do not announce every changed cell through a live region.

---

## 15. Pagination and Large Datasets

Pagination is often more robust than rendering or virtualizing thousands of rows.

```html
<nav aria-label="Employees table pages">
  <a href="?page=1" aria-current="page">1</a>
  <a href="?page=2">2</a>
  <a href="?page=3">3</a>
  <a href="?page=2" rel="next">Next</a>
</nav>
```

- Identify the current page with `aria-current="page"`.
- Use links when navigation has a URL and buttons when paging changes application state in place.
- Preserve sort and filter parameters.
- State the displayed range and total, such as “Rows 51 to 100 of 842.”
- Move focus only when doing so is predictable and helpful.
- Preserve a usable no-script or server-rendered path where practical.

“Load more” controls need a clear name, a result update, and predictable focus. Infinite scrolling must not prevent users from reaching following page content or returning to an earlier row.

---

## 16. Row Selection and Row Actions

Do not make an entire `<tr>` behave as an unnamed clickable control. Put a real checkbox, link, or button in a cell.

```html
<p id="select-invoice" class="visually-hidden">Select invoice</p>

<table>
  <caption>Outstanding invoices</caption>
  <thead>
    <tr>
      <th scope="col"><span class="visually-hidden">Select</span></th>
      <th scope="col">Invoice</th>
      <th scope="col">Amount</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <input
          type="checkbox"
          name="invoice"
          value="1042"
          aria-labelledby="select-invoice invoice-1042"
        >
      </td>
      <th id="invoice-1042" scope="row">1042</th>
      <td>$1,240</td>
    </tr>
  </tbody>
</table>
```

The checkbox name becomes “Select invoice 1042.” Keep selected state programmatically available and visually distinguishable without colour alone.

For repeated row actions, include the row context in each accessible name. Avoid dozens of links announced only as “View” or “Edit.”

---

## 17. Forms and Editing in Tables

Every input needs a unique label that includes enough row and column context.

```html
<tr>
  <th scope="row">Widget A</th>
  <td>
    <label class="visually-hidden" for="widget-a-quantity">
      Quantity for Widget A
    </label>
    <input
      id="widget-a-quantity"
      name="widget-a-quantity"
      type="number"
      min="0"
      value="2"
    >
  </td>
</tr>
```

- Associate validation errors with the specific input.
- Do not remove the input from its row context when an error appears.
- Preserve user-entered values after validation.
- Make save, cancel, and undo behaviour explicit.
- Do not save automatically on focus movement unless users are warned and can recover.

If users need spreadsheet-like navigation and editing across many cells, evaluate an ARIA grid rather than adding ad hoc keyboard handling to a data table.

---

## 18. Expandable Rows

Use a button to disclose additional information. Expose expanded state and connect the button to the controlled content.

```html
<tr>
  <th scope="row">Invoice 1042</th>
  <td>$1,240</td>
  <td>
    <button
      type="button"
      aria-expanded="false"
      aria-controls="invoice-1042-details"
    >
      Show details for invoice 1042
    </button>
  </td>
</tr>
<tr id="invoice-1042-details" hidden>
  <td colspan="3">
    <h3>Invoice 1042 details</h3>
    <p>Issued 4 March 2025. Payment is due 3 April 2025.</p>
  </td>
</tr>
```

Update `aria-expanded`, the button text, and `hidden` together. Keep focus on the button unless the user's action clearly requests movement into the disclosed content.

---

## 19. Colour, Contrast, and Forced Colours

Zebra striping can help visual tracking, but it is supplemental.

- Do not use row colour as the only indication of overdue, selected, invalid, or changed data.
- Add visible text, an icon, a pattern, or another non-colour cue for meaning.
- Ensure table text meets the applicable text contrast requirement.
- Ensure focus indicators, form-control boundaries, and meaningful sort or state icons meet applicable non-text contrast requirements.
- Decorative cell borders and zebra stripes do not automatically need 3:1 contrast.

```css
tbody tr:nth-child(even) {
  background: var(--table-stripe-background);
}

@media (forced-colors: active) {
  th,
  td {
    border-block-end: 1px solid CanvasText;
  }

  .sort-icon {
    color: CanvasText;
  }
}
```

Test selected rows, invalid cells, focus, hover, sorting, sticky headers, and disabled controls in every supported theme and in forced-colours mode.

---

## 20. Data Tables and ARIA Grids Are Different

A native table supports reading and comparison. It normally does not place cells in the page's Tab sequence. Screen readers provide their own table-navigation commands.

An element with `role="grid"` is a composite widget. It creates expectations for managed focus, arrow-key navigation, selection, editing, and programmatically exposed row and column structure.

Use a grid only when:

- users need spreadsheet-like cell navigation or editing;
- the interaction model is documented and implemented completely;
- only the intended cell or descendant is in the Tab sequence;
- arrow keys, Home, End, and other relevant keys work predictably;
- row and column positions, counts, selection, and editing states are accurate; and
- the implementation has been tested with relevant assistive technologies.

Do not add `role="grid"` to make a table sound more interactive. It changes user-agent and assistive-technology behaviour and creates additional obligations.

Prefer native `<table>` elements even when sort and filter buttons are present. Those buttons do not by themselves make the table a grid.

---

## 21. Virtualization

Virtualized tables render only part of a dataset while users scroll. This can break find-in-page, table navigation, row counts, focus, selection, reading continuity, and browser history.

Prefer server-side or client-side pagination when it meets the task.

If virtualization is necessary:

- expose accurate total row and column counts where the chosen semantic model supports them;
- expose correct row and column indices for rendered items;
- never recycle the focused row out from under the user;
- preserve selection and editing state when items leave the DOM;
- keep headers available and correctly associated;
- support browser zoom, text resizing, and variable row height;
- provide search, filtering, and direct movement to a known row; and
- test continuous reading with screen readers, not just visual scrolling.

Do not claim thousands of rows are accessible because `aria-rowcount` is present. The interaction must remain understandable and operable.

---

## 22. Layout Tables

Remove layout tables and use CSS whenever practical.

When a legacy layout table cannot yet be removed:

```html
<table role="presentation">
  <tr>
    <td><!-- Layout content --></td>
    <td><!-- Layout content --></td>
  </tr>
</table>
```

- Do not use `<th>`, `<caption>`, or table-specific navigation inside it.
- Ensure content has a meaningful DOM order when read linearly.
- Ensure forms, headings, lists, and controls retain their own native semantics.
- Do not make the table focusable or give it table-specific ARIA properties.

`role="none"` is equivalent to `role="presentation"` in this context. Treat this as a temporary remediation, not a new layout pattern.

---

## 23. Print and Export

Use real `<thead>` and `<tfoot>` elements and test whether the print engine repeats headers correctly.

```css
@media print {
  thead {
    display: table-header-group;
  }

  tfoot {
    display: table-footer-group;
  }

  tr {
    break-inside: avoid;
  }
}
```

For exported PDF, spreadsheet, document, or presentation files:

- preserve table structure and header associations;
- include a title or caption;
- repeat headers across pages or sheets where needed;
- preserve units, filters, source, and date range;
- explain special values and abbreviations; and
- test the exported format independently with its accessibility tools.

Accessible HTML does not guarantee an accessible export.

---

## 24. Generated and Author-created Tables

Rich-text editors, CMS plugins, data-grid libraries, and reporting tools can change their output between versions.

Configure or test the exact version to confirm:

- authors can create header cells rather than bold data cells;
- captions and summaries can be added;
- `scope`, `headers`, and unique IDs are preserved;
- responsive behaviour does not destroy semantics;
- sorting and filtering use native controls and accurate states;
- empty and special values remain explicit;
- sanitization does not remove required attributes; and
- exported formats preserve structure.

Provide constrained authoring options for simple, irregular, and complex tables. Do not expect content authors to repair generated markup manually after every edit.

---

## 25. Testing

### Structural review

1. Confirm that the content is genuinely tabular.
2. Identify every row, column, row-group, and column-group header.
3. Starting from each data cell, verify the headers a user needs to understand it.
4. Confirm that `scope` or `headers` produces those exact associations.
5. Check captions, summaries, units, source, and special-value definitions.
6. Validate all IDs and `headers` references after sorting or rendering.

### Keyboard and visual review

- Operate sorting, filtering, pagination, selection, editing, and disclosures without a pointer.
- Confirm that focus remains visible and does not move unexpectedly.
- Scroll wide tables by keyboard when a scroll region is present.
- Test at 200% and 400% zoom and with narrow viewports.
- Test long translations and user text-spacing overrides.
- Test every theme, forced colours, print, and exported formats.

### Assistive-technology review

- Navigate to the table and confirm its name and dimensions are useful.
- Move through representative cells and verify the announced headers.
- Test grouped, spanned, and irregular headers extensively.
- Confirm sorting state, selected rows, expanded rows, input labels, errors, and result status.
- Test relevant desktop and mobile combinations from the project's support policy.

Do not depend on a product-specific keystroke checklist. Verify the output and task with the combinations users actually rely on.

### Automated testing

Automation can detect some missing headers, invalid ARIA, duplicate IDs, empty captions, contrast problems, and focus issues. It usually cannot determine whether a cell is a header, whether associations express the intended relationship, whether a complex table should be simplified, or whether virtualization is usable.

Manual cell-by-cell review remains required.

---

## 26. Common Failures

| Failure | Correction |
|:---|:---|
| Bold `<td>` elements visually imitate headers. | Use semantic `<th>` elements with correct associations. |
| Every `<th>` is claimed to require `scope` under WCAG. | Use explicit scope as a robust pattern where direction matters; do not misstate the criterion. |
| Every table is claimed to require a caption for conformance. | Use captions by default, while recognizing other associations can identify simple tables. |
| `scope="colgroup"` is used without a matching `<colgroup>`. | Define the column groups in markup. |
| A complex table uses `headers` values that no longer match IDs. | Generate and validate associations from the current schema. |
| Empty cells use `&nbsp;` or unexplained dashes. | State zero, not applicable, missing, suppressed, or another accurate meaning. |
| Responsive CSS changes all table elements to `display: block`. | Preserve table semantics and use contained overflow or a real alternative view. |
| Every scroll wrapper becomes a region landmark. | Add a named region only when separate discovery is useful. |
| `aria-sort` is placed on the sort button. | Put it on the currently sorted `<th>` only. |
| Sorting reorders only the visible page without explanation. | Sort the complete result set or clearly explain the scope. |
| An entire row is clickable. | Put a named native link, button, or checkbox in a cell. |
| Repeated controls are announced only as “View” or “Edit.” | Include the relevant row identifier in each accessible name. |
| Colour alone identifies selected, overdue, or invalid rows. | Add text, icons, state attributes, or another non-colour cue. |
| `role="grid"` is added without a grid keyboard model. | Keep a native table or implement the complete composite widget. |
| Virtual rows disappear while they contain focus. | Preserve focus and state or use pagination. |
| The HTML table passes, but the exported PDF loses its headers. | Test and remediate each output format separately. |

---

## 27. Definition of Done

- [ ] The content requires row-column relationships and is not a layout table.
- [ ] Every functional header is a `<th>` with the correct association.
- [ ] The table has a useful name, normally through `<caption>`.
- [ ] Complex structure has a concise, discoverable explanation.
- [ ] `scope`, groups, spans, IDs, and `headers` references match the current data.
- [ ] The table has been simplified or split where complexity impedes understanding.
- [ ] Empty, missing, zero, suppressed, estimated, and unavailable values are distinguishable.
- [ ] Units, dates, currencies, and abbreviations are clear.
- [ ] Wide tables scroll within a contained, keyboard-operable region when necessary.
- [ ] Responsive presentation preserves table semantics or provides a real equivalent view.
- [ ] Sticky headers do not duplicate semantics or obscure content.
- [ ] Sort state is on the correct `<th>` and remains accurate.
- [ ] Filtering, pagination, selection, editing, and disclosures use named native controls.
- [ ] Dynamic status messages are concise and programmatically available where applicable.
- [ ] Colour is not the only indication of meaning or state.
- [ ] Text, controls, focus, and meaningful graphics meet applicable contrast requirements.
- [ ] `role="grid"` is used only with a complete, tested grid interaction model.
- [ ] Virtualization preserves counts, positions, focus, state, and reading continuity.
- [ ] Structure and relationships survive print and export.
- [ ] Automated, keyboard, zoom, visual, and assistive-technology tests pass.

---

## 28. WCAG 2.2 Mapping

| Success criterion | Level | Table relevance |
|:---|:---:|:---|
| [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) | A | Header and data-cell relationships must be programmatically available. |
| [1.3.2 Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence.html) | A | Reading order must preserve meaning, including responsive alternatives. |
| [1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html) | A | Colour cannot be the only means of communicating state or category. |
| [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) | AA | Table text must meet applicable contrast thresholds. |
| [1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) | AA | Supporting content must reflow; necessary data-table layout has a defined exception. |
| [1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) | AA | Required controls, focus, and state indicators generally need 3:1 contrast. |
| [2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html) | A | Interactive table functions must be keyboard operable. |
| [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html) | A | Control focus order must preserve meaning and operability. |
| [2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html) | AA | Keyboard focus must remain visible. |
| [2.5.3 Label in Name](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html) | A | Control names must contain their visible labels. |
| [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) | AA | Table control targets must meet the minimum or a defined exception. |
| [3.2.2 On Input](https://www.w3.org/WAI/WCAG22/Understanding/on-input.html) | A | Changing a value must not unexpectedly change context. |
| [3.3.1 Error Identification](https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html) | A | Editable table errors must be identified in text. |
| [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html) | A | Custom controls and grids must expose accurate semantics and state. |
| [4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html) | AA | Existing result and update status messages must be programmatically determinable. |

---

## 29. Related Guides

- [Charts and Graphs Accessibility Best Practices](./CHARTS_GRAPHS_ACCESSIBILITY_BEST_PRACTICES.md)
- [Forms Accessibility Best Practices](./FORMS_ACCESSIBILITY_BEST_PRACTICES.md)
- [Keyboard Accessibility Best Practices](./KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md)
- [Color Contrast Accessibility Best Practices](./COLOR_CONTRAST_ACCESSIBILITY_BEST_PRACTICES.md)
- [Touch and Pointer Accessibility Best Practices](./TOUCH_POINTER_ACCESSIBILITY_BEST_PRACTICES.md)
- [Light/Dark Mode Accessibility Best Practices](./LIGHT_DARK_MODE_ACCESSIBILITY_BEST_PRACTICES.md)
- [Print Accessibility Best Practices](./PRINT_ACCESSIBILITY_BEST_PRACTICES.md)

---

## References

- [W3C WAI Tables Tutorial](https://www.w3.org/WAI/tutorials/tables/)
- [Tables with One Header](https://www.w3.org/WAI/tutorials/tables/one-header/)
- [Tables with Two Headers](https://www.w3.org/WAI/tutorials/tables/two-headers/)
- [Tables with Irregular Headers](https://www.w3.org/WAI/tutorials/tables/irregular/)
- [Tables with Multi-level Headers](https://www.w3.org/WAI/tutorials/tables/multi-level/)
- [Table Captions and Summaries](https://www.w3.org/WAI/tutorials/tables/caption-summary/)
- [WAI-ARIA Authoring Practices sortable table example](https://www.w3.org/WAI/ARIA/apg/patterns/table/examples/sortable-table/)
- [WAI-ARIA Authoring Practices grid pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/)
- [HTML Standard: The table element](https://html.spec.whatwg.org/multipage/tables.html#the-table-element)
- [Understanding 1.3.1: Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html)
- [Understanding 1.4.10: Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)

### Machine-readable standards

For AI systems and automated tooling, see [wai-yaml-ld](https://github.com/mgifford/wai-yaml-ld):

- [WCAG 2.2 normative content in YAML](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wcag-2.2-normative.yaml)
- [ARIA informative catalog in YAML](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wai-aria-informative.yaml)
- [HTML accessibility content in YAML](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/html-living-standard-accessibility.yaml)
- [Standards link graph in YAML](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/standards-link-graph.yaml)

---

AGPL-3.0-or-later License - See LICENSE file for full text  
Copyright (c) 2026 Mike Gifford
