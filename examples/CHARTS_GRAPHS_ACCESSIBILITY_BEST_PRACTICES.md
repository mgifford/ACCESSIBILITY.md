---
title: Charts and Graphs Accessibility Best Practices
---

# Charts and Graphs Accessibility Best Practices

Charts and graphs must communicate their information and support their intended tasks without requiring users to perceive a particular colour, inspect a visual position, use a pointer, or understand an unexplained graphic.

Accessibility is not achieved by adding one long label to a chart. Use a layered presentation: an understandable visual, a concise summary, structured data or explanation when needed, and accessible controls for any interaction.

---

## 1. Required Outcomes

A conforming implementation must:

- identify the chart's subject, scope, units, and time period where applicable;
- provide an equivalent text alternative for the information the chart communicates;
- make important trends, comparisons, outliers, and uncertainty available without visual inspection;
- expose underlying values in structured HTML when users need exact values or independent comparison;
- avoid using colour, shape, position, or size as the only way to communicate meaning;
- provide sufficient text and non-text contrast;
- make all chart controls and interactions keyboard operable with visible focus;
- make hover information available through keyboard and touch interaction;
- communicate meaningful dynamic updates without excessive announcements;
- remain usable with zoom, narrow viewports, themes, forced colours, and reduced motion; and
- preserve accessibility in exported or downloaded versions.

The appropriate alternative depends on the purpose of the chart. A single-value sparkline and an exploratory multi-series dashboard do not need the same amount of description or interaction.

---

## 2. Start with the User's Question

Before choosing a chart type or library, document:

- What question should the chart answer?
- Which comparison, trend, distribution, relationship, or location matters?
- Do users need the overall conclusion, exact values, exploration, or all three?
- Which filters, date ranges, units, and assumptions affect interpretation?
- What should a user be able to do after understanding the chart?

The chart's accessible summary should answer the same important question as the visual presentation. Do not describe every visual property while omitting the conclusion.

---

## 3. Use a Layered Information Model

Provide the layers users need:

1. **Title:** identifies the subject.
2. **Context:** explains scope, dates, units, population, and filters.
3. **Summary:** states the main trend, comparison, or finding.
4. **Structured detail:** provides exact values, categories, and relationships when needed.
5. **Source and methodology:** lets users evaluate and reuse the information.
6. **Interaction feedback:** explains active filters, selections, loading, and errors.

Do not duplicate every layer into an image's `alt`, an SVG `<title>`, or one `aria-label`. Long accessible names are difficult to review and navigate.

---

## 4. Choose the Representation Deliberately

| Need | Suitable starting point |
|:---|:---|
| One conclusion with few values | Visible text, possibly with a simple static chart |
| Exact comparison across rows and columns | HTML data table |
| Scalable static chart | SVG or an SVG exported as `<img>` |
| Dense rendering with many visual marks | Canvas plus visible HTML summary and data access |
| User exploration and filtering | Chart plus native HTML controls and structured results |
| Spatial relationships | Map or diagram plus equivalent locations, relationships, or route information |

SVG is not automatically accessible, and canvas is not automatically inaccessible. The implementation must expose equivalent information and functionality regardless of rendering technology.

If a table or short paragraph answers the question more clearly than a chart, use the simpler representation.

---

## 5. Simple Static Charts

Use concise `alt` text for a chart that has one clear takeaway and whose important context is already visible.

```html
<figure>
  <img
    src="/assets/charts/quarterly-sales.svg"
    alt="Sales increased each quarter, from $1.4 million in Q1 to $2.3 million in Q4."
    width="800"
    height="450"
  >
  <figcaption>
    Quarterly sales for 2025. Values are in Canadian dollars.
  </figcaption>
</figure>
```

Write the alternative for the chart's purpose in context. Include the chart type only when it helps users understand the information or the composition itself matters.

Avoid:

- “Chart”;
- “Sales chart”;
- a filename;
- every axis tick and decorative detail; or
- an interpretation that is not supported by the data.

If the surrounding article already states the same finding, keep `alt` concise and avoid forcing screen-reader users to hear the conclusion twice.

---

## 6. Complex Charts and Long Descriptions

A complex chart requires a short identification and a longer equivalent that communicates the essential values, relationships, and conclusions.

Make the detailed description visible. This benefits people using magnification, text-to-speech, translation, simplified presentation, or unfamiliar subject matter.

```html
<figure>
  <img
    src="/assets/charts/visitors-by-sector.svg"
    alt="Line chart of accessibility adoption from 2019 to 2024, described below."
    width="900"
    height="520"
  >

  <figcaption>
    <h2>Accessibility adoption by sector, 2019 to 2024</h2>
    <p>
      Adoption increased in all three sectors. Government remained highest,
      rising from 42% to 78%. Corporate adoption rose from 28% to 61%, with
      its largest increase in 2021. Non-profit adoption rose from 19% to 47%.
    </p>

    <details>
      <summary>View annual values</summary>
      <!-- Accessible data table -->
    </details>

    <p>Source: Annual organizational survey. Percentages are rounded.</p>
  </figcaption>
</figure>
```

`aria-describedby` can associate an image with a plain-text description. Assistive technologies generally expose referenced content as one flattened string, so headings, lists, and tables lose their navigable structure in that description. Do not use `aria-describedby` as the only route to a structured long description.

For extensive descriptions, provide a nearby link to a separate description page or a clearly headed section on the same page.

---

## 7. Provide Structured Data When Users Need Values

Use a real HTML table when users need to inspect, compare, copy, cite, sort, or search values.

```html
<details>
  <summary>View data for monthly website visitors</summary>

  <table>
    <caption>Monthly website visitors, January to March 2025</caption>
    <thead>
      <tr>
        <th scope="col">Month</th>
        <th scope="col">Visitors</th>
        <th scope="col">Change from previous month</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">January</th>
        <td>12,400</td>
        <td>Not applicable</td>
      </tr>
      <tr>
        <th scope="row">February</th>
        <td>15,800</td>
        <td>27.4%</td>
      </tr>
      <tr>
        <th scope="row">March</th>
        <td>19,200</td>
        <td>21.5%</td>
      </tr>
    </tbody>
  </table>
</details>
```

Use `<caption>`, `<th>`, and appropriate `scope` values. Complex tables may require explicit `id` and `headers` relationships.

There is no standards-based threshold requiring a table after a particular number of series or data points. Provide structured data when exact values or independent comparison are part of the user task. For very large datasets, offer a usable filtered table and a downloadable open format such as CSV. A download does not replace an on-page summary.

State how missing, suppressed, estimated, rounded, or provisional values are represented.

---

## 8. Colour and Visual Encoding

Do not use colour as the only way to identify a series, state, threshold, or region.

Combine colour with one or more of:

- direct text labels;
- different line styles;
- point shapes;
- fill patterns;
- symbols;
- boundaries; or
- position that is also explained in text.

Direct labels usually reduce the work required to move repeatedly between a chart and legend.

### Contrast

- Text labels generally need at least 4.5:1 contrast, or 3:1 when they meet WCAG's large-scale text definition.
- Visual information needed to understand data, identify controls, or distinguish states generally needs at least 3:1 contrast against the relevant adjacent colour.
- Decorative grid lines and boundaries do not become subject to 3:1 merely because they appear in a chart.
- A data line may need contrast against the plot background and against another adjacent line where the user must distinguish them.

Do not rely on a palette being described as “colour-blind safe.” Test the complete chart, including line weight, point size, labels, overlapping marks, selected states, and every supported theme.

Simulation is a review aid, not a substitute for standards testing or research with disabled users.

---

## 9. SVG Charts

Use one of two broad models.

### Atomic SVG image

Use `role="img"` when the chart is exposed as one image. Provide a concise name and keep structured detail in visible HTML.

```html
<figure>
  <svg
    role="img"
    aria-labelledby="sales-title"
    aria-describedby="sales-summary"
    viewBox="0 0 640 360"
  >
    <title id="sales-title">Quarterly sales for 2025</title>
    <!-- Visual chart content -->
  </svg>

  <figcaption id="sales-summary">
    Sales increased in every quarter, from $1.4 million in Q1 to
    $2.3 million in Q4. Values are in Canadian dollars.
  </figcaption>
</figure>
```

Do not put `role="list"` and `role="listitem"` on descendants of an SVG whose root has `role="img"` and expect them to remain navigable. The image role represents an atomic graphic and its children are presentational.

### Structured or interactive SVG

When individual SVG parts must be browsed or operated, do not flatten the whole graphic with `role="img"`. The ARIA Graphics Module defines structured graphic roles, but support must be tested with the project's actual browser and assistive-technology combinations.

Even when a structured SVG accessibility tree works, provide a visible HTML summary and data presentation. Do not force users to traverse every bar, point, axis, and grid line to discover the conclusion.

Keep decorative SVG groups out of the accessibility tree, generate unique IDs, preserve a logical DOM order, and follow [SVG Accessibility Best Practices](./SVG_ACCESSIBILITY_BEST_PRACTICES.md).

---

## 10. Canvas Charts

Canvas draws pixels. The bitmap does not expose its visual objects, labels, or relationships to assistive technology.

For a static canvas chart:

- give the canvas a concise image role and name;
- associate it with a visible summary where useful;
- provide structured data outside the canvas when exact values matter; and
- keep the visual canvas synchronized with those alternatives.

```html
<figure>
  <canvas
    id="regional-sales-chart"
    width="800"
    height="450"
    role="img"
    aria-label="Q2 sales by region"
    aria-describedby="regional-sales-summary"
  >
    Q2 sales by region. A summary and data table follow.
  </canvas>

  <figcaption id="regional-sales-summary">
    The West had the highest Q2 sales at $510,000. The East had the lowest
    at $280,000. A complete data table follows.
  </figcaption>
</figure>
```

Canvas fallback content is important when canvas is unavailable, and the HTML Standard permits focusable fallback descendants to map interactive canvas regions. That is a specialized implementation requiring one-to-one state, focus, hit-region, and keyboard synchronization. Prefer visible HTML controls outside the canvas unless there is a tested reason to use the fallback subtree as the interaction model.

Do not put essential detail only in canvas-drawing commands or library configuration.

---

## 11. Separate Data Browsing from Actions

Most chart values do not need to be interactive. Provide a summary and table for browsing data. Reserve buttons, links, checkboxes, and other controls for actual actions such as filtering, selecting, drilling down, or changing the presentation.

Use native HTML controls for legends and filters.

```html
<fieldset class="series-controls">
  <legend>Data series shown</legend>

  <label>
    <input type="checkbox" name="series" value="2024" checked>
    2024 sales
  </label>

  <label>
    <input type="checkbox" name="series" value="2025" checked>
    2025 sales
  </label>
</fieldset>
```

The chart can use matching colours, shapes, and line styles, but the controls do not depend on those visual encodings for their names.

Do not add every point to the page's Tab sequence. A chart with hundreds of focus stops is reachable but not practically operable.

---

## 12. Keyboard Interaction

All functions available through pointer or touch input must also work with a keyboard.

Prefer ordinary Tab navigation between native HTML controls. If a chart genuinely needs a composite navigation model:

- provide one Tab stop to enter the composite;
- use arrow keys to move among comparable items;
- support Home and End when useful;
- preserve the user's position when the chart updates;
- provide documented instructions before or at the chart;
- expose the active item's name, value, and state; and
- provide a direct way to leave the chart.

Do not invent keyboard behaviour simply because a table of key assignments looks comprehensive. Keys must match the widget's semantics, user expectations, and actual implementation.

Focus indicators must remain visible over every chart colour and must not be clipped by the SVG viewBox or an overflow container.

---

## 13. Tooltips and Data Details

Do not make hover the only way to discover a value. Use direct labels, an accessible table, a focusable control, or a user-controlled detail panel.

For substantial or interactive detail, prefer a disclosure over a transient tooltip.

```html
<button
  type="button"
  aria-expanded="false"
  aria-controls="march-details"
>
  March: 19,200 visitors
</button>

<div id="march-details" hidden>
  <p>March increased by 21.5% from February.</p>
</div>
```

If custom content appears on hover or focus, WCAG 1.4.13 generally requires it to be:

- dismissible without moving pointer or keyboard focus, unless it does not obscure other content;
- hoverable when pointer hover triggers it; and
- persistent until the user dismisses it, moves focus, or the information is no longer valid.

The same content must be triggerable from keyboard focus. Touch users need a tap or persistent alternative.

Do not reference a tooltip with `aria-describedby` while also setting `aria-hidden="true"` on it. Hidden content cannot provide an accessible description.

---

## 14. Dynamic Updates and Status Messages

When filters change, update the visible title, summary, table, and chart from the same data model.

If the interface displays a status message such as a result count, loading state, or update result without moving focus, expose that message programmatically.

```html
<p id="chart-status" role="status" aria-atomic="true"></p>
```

```javascript
function reportChartUpdate({ period, regions, total }) {
  const status = document.getElementById("chart-status");
  status.textContent =
    `Showing ${period}: ${regions} regions, total sales ${total}.`;
}
```

Create the status region before updates occur. Keep announcements concise and meaningful. Do not clear and rewrite live regions merely to force repeated speech, and do not announce every point in a rapidly updating chart.

WCAG 4.1.3 does not require authors to create a status message for every content change. It requires existing status messages to be programmatically determinable. Use user testing to avoid an excessively chatty experience.

For real-time charts, provide pause or refresh controls when updates interfere with reading or interaction. Preserve the user's focus and selection when new data arrives.

---

## 15. Responsive Layout, Reflow, and Zoom

Test the page at a width equivalent to 320 CSS pixels and at 400% zoom. Surrounding titles, summaries, controls, descriptions, and table cells must reflow without loss of information or functionality.

WCAG 1.4.10 includes an exception for parts of content that require a two-dimensional layout for usage or meaning, including certain maps, diagrams, and data tables. It does not require every chart to be compressed until labels become unreadable.

When two-dimensional scrolling is necessary:

- confine it to the chart or table rather than the whole page;
- provide a visible name and instructions when needed;
- ensure keyboard users can reach and scroll the region;
- keep controls and focus indicators visible; and
- provide a summary or alternative that does not require spatial panning.

```html
<div
  class="chart-scroll"
  role="region"
  aria-label="Monthly sales chart, horizontally scrollable"
  tabindex="0"
>
  <!-- Wide chart -->
</div>
```

```css
.chart-scroll {
  max-inline-size: 100%;
  overflow: auto;
}
```

Avoid shrinking labels below readability, removing essential legends, or hiding data simply to fit a narrow viewport. A simplified small-screen view plus the full data table can be more usable.

Interactive chart controls must meet WCAG 2.5.8 Target Size (Minimum) or one of its defined exceptions. Small visual points can use larger invisible hit areas without changing the apparent mark size.

---

## 16. Guidance by Chart Type

### Bar and column charts

- Begin quantitative axes at zero unless a clearly explained different baseline is necessary.
- Label categories and units.
- Put values on bars when this improves comparison without overcrowding.
- Avoid three-dimensional effects that distort length and position.

### Line charts

- Distinguish series with direct labels, line styles, and point shapes in addition to colour.
- Identify gaps and missing data rather than visually connecting values that were not observed.
- Explain logarithmic or non-linear scales.

### Pie and donut charts

- Use them only when part-to-whole comparison is the real task.
- Avoid them when users need precise comparison or when slices are numerous or similar.
- Label slices directly where practical and provide exact values in text or a table.
- Do not communicate a central total only as text embedded in the graphic.

### Scatterplots

- Explain both axes, units, sample size, and the meaning of point size or shape.
- Provide access to exact points only when the task requires them.
- Describe clusters, correlation, outliers, and uncertainty without overstating causation.

### Stacked charts

- Recognize that only segments sharing a baseline are easy to compare.
- Provide a table or alternative view for precise cross-category comparison.
- Label totals and explain whether values are absolute or percentages.

### Heat maps

- Do not rely on a colour gradient alone.
- Provide labels, symbols, boundaries, or a table for important cell values.
- State the scale, thresholds, and treatment of missing data.

### Maps

- Provide locations, values, routes, and relationships in text or structured HTML.
- Do not rely on visual position, colour, or pointer exploration alone.
- Offer search or a location list for tasks that do not require spatial browsing.

---

## 17. Motion, Transitions, and Flashing

Animated transitions can help some users understand change, but they can also cause distraction, disorientation, or vestibular symptoms.

- Keep the default information understandable without animation.
- Respect `prefers-reduced-motion` for non-essential chart transitions.
- Avoid animating every mark when filters change.
- Do not use motion as the only indication of change.
- Provide pause, stop, or hide controls where WCAG 2.2.2 applies.
- Avoid flashing content and comply with WCAG 2.3.1 regardless of motion preference.

```css
@media (prefers-reduced-motion: reduce) {
  .chart-mark,
  .chart-axis {
    animation: none;
    transition: none;
  }
}
```

Target chart components rather than applying a universal rule to all SVG descendants.

---

## 18. Sonification and Multimodal Alternatives

Sonification can communicate trends through pitch, duration, rhythm, or stereo position. It can be a useful optional exploration mode, particularly when paired with keyboard navigation.

It is supplemental, not a replacement for text and structured data.

- Explain what each sound dimension represents.
- Provide start, pause, replay, volume, and mute controls.
- Do not autoplay audio.
- Provide equivalent values and conclusions in text.
- Avoid using sound as the only indication of state or error.
- Test with screen readers and other audio running at the same time.

Haptic or tactile output can also supplement a visualization, but it does not remove the requirement for broadly available alternatives.

---

## 19. Themes, Forced Colours, and Print

Validate the chart in every supported theme and state. Use semantic tokens for surfaces, text, axes, series, focus, selection, and status.

In forced-colours mode:

- use text labels, patterns, and shapes that survive colour replacement;
- use system colours for required strokes and focus indicators where necessary;
- do not apply `forced-color-adjust: none` to the entire chart; and
- confirm that selected, hidden, and highlighted series remain distinguishable.

```css
@media (forced-colors: active) {
  .chart-series {
    fill: none;
    stroke: CanvasText;
  }

  .chart-series[data-selected="true"] {
    stroke: Highlight;
    stroke-width: 4;
  }
}
```

Test print output and exported images in grayscale. Include titles, labels, units, source, date, and a text or tabular alternative in the exported document.

---

## 20. Selecting and Updating a Chart Library

Do not select a library from a static ranking of accessibility claims. Features and output change between versions.

Evaluate the exact version against these questions:

- Can it render an accessible summary and associate visible detail?
- Does it support SVG, canvas, or both, and what semantics does it emit?
- Can native HTML controls drive filters, legends, and drill-down?
- Does keyboard interaction match the chart's real functions?
- Are focus, tooltip, and selected states exposed and visible?
- Can colour, patterns, shapes, and line styles be controlled?
- Does it respect themes, forced colours, zoom, and reduced motion?
- Can the underlying data be rendered as accessible HTML and exported?
- Are accessibility regressions covered by tests?
- Is the accessibility documentation current for the installed version?

Treat generated ARIA as code that your team owns. Inspect the browser accessibility tree and test real output instead of relying on the library's marketing description.

---

## 21. Export and Download Requirements

When users export the chart:

- preserve a meaningful title and concise alternative in HTML, PDF, presentation, or document formats;
- include the visible summary and source;
- include structured table tags in formats that support them;
- offer the underlying data in an open, documented format;
- retain units, locale, date range, filters, and missing-value notes; and
- do not export only a screenshot when the values are required for the task.

Test generated PDFs, spreadsheets, and presentation files independently. Accessibility in the web chart does not automatically transfer to an export.

---

## 22. Testing

### Content review

- Confirm that the title, scope, units, filters, and source are accurate.
- Compare the visible summary and alternative against the current data.
- Verify that conclusions do not overstate correlation, precision, or certainty.
- Check missing, estimated, rounded, and suppressed values.

### Visual and interaction review

1. Review all series in grayscale and colour-vision simulations.
2. Measure text and required non-text contrast in every theme and state.
3. Test at 200% and 400% zoom and at narrow viewport sizes.
4. Test keyboard access, focus order, focus visibility, and scroll regions.
5. Trigger tooltips and details with pointer, keyboard, and touch.
6. Change every filter and confirm that the summary, table, and chart remain synchronized.
7. Test reduced motion, increased contrast, and forced colours.
8. Pause real-time updates and verify that the user can finish reading.

### Assistive-technology review

- Confirm that the chart has the intended role, name, and description.
- Confirm that visible structured detail remains navigable as headings, lists, and tables.
- Ensure decorative chart internals do not create noise.
- Ensure controls announce their names, roles, values, and states.
- Confirm that update messages are concise and are not repeated excessively.
- Test relevant desktop and mobile browser and assistive-technology combinations from the project's support policy.

### Automated testing

Automation can detect some missing names, invalid ARIA, table markup problems, contrast failures, duplicate IDs, and focus issues. It cannot determine whether the summary is accurate, whether the table is equivalent, whether the visual encoding is understandable, or whether exploration is practical.

Include charts in component tests, page-level accessibility scans, visual regression tests, and data-synchronization tests. Manual review remains required.

---

## 23. Common Failures

| Failure | Correction |
|:---|:---|
| `alt="Chart"` identifies the object but not its information. | State the purpose or main finding and provide detail where needed. |
| Every visual detail is placed in one long accessible name. | Separate title, summary, structured data, and source. |
| `aria-describedby` points to a complex table and is assumed to preserve its navigation. | Keep the table visibly available as structured HTML. |
| An SVG root has `role="img"` while descendants use list or control roles. | Choose an atomic image or a tested structured graphic model. |
| Essential canvas data exists only in drawing commands. | Provide a visible summary and HTML data access. |
| Grid lines are required to reach 3:1 even though they are decorative. | Test only visual information required to understand or operate the chart. |
| Series differ only by colour. | Add direct labels, line styles, point shapes, patterns, or symbols. |
| Every data point is added to the Tab order. | Use a table for browsing and reserve controls for actual actions. |
| Hover-only tooltips expose the only exact values. | Provide direct labels, a table, keyboard access, or a persistent detail panel. |
| A tooltip is both `aria-describedby` content and `aria-hidden="true"`. | Keep description content exposed or use another labelling pattern. |
| Every filter change is forced through a live region. | Announce only meaningful status messages and avoid excessive speech. |
| The chart is compressed to 320 pixels until labels are unreadable. | Reflow supporting content and use a contained, labelled scroll region when spatial layout is necessary. |
| The data table is required only after an arbitrary point count. | Base structured detail on the task, complexity, and need for exact values. |
| A library's accessibility claim is accepted without testing its output. | Test the installed version and own the generated semantics. |
| The web chart passes, but its PDF or image export has no alternative. | Test and remediate every output format separately. |

---

## 24. Definition of Done

- [ ] The chart answers a documented user question.
- [ ] Title, scope, units, date range, filters, source, and methodology are available where relevant.
- [ ] A concise text alternative or summary communicates the important finding.
- [ ] Complex information has a visible long description or structured equivalent.
- [ ] Exact values are available in accessible HTML when the task requires them.
- [ ] Missing, rounded, estimated, suppressed, and provisional values are explained.
- [ ] Colour is not the only visual means of distinguishing data or state.
- [ ] Text and required graphical information meet applicable contrast requirements.
- [ ] SVG and canvas implementations use a coherent accessibility model.
- [ ] Only actual chart actions create interactive controls.
- [ ] All functions work by keyboard and focus remains visible.
- [ ] Hover information is also available through focus and touch.
- [ ] Dynamic updates preserve focus and provide appropriate, concise status feedback.
- [ ] Supporting content reflows, and necessary two-dimensional scrolling is contained and operable.
- [ ] Target sizes meet WCAG 2.5.8 or a defined exception.
- [ ] Reduced motion, increased contrast, forced colours, and supported themes are tested.
- [ ] Automated, keyboard, zoom, visual, and assistive-technology tests pass.
- [ ] Exported and downloaded formats preserve the information and accessibility.

---

## 25. WCAG 2.2 Mapping

| Success criterion | Level | Chart relevance |
|:---|:---:|:---|
| [1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html) | A | Charts need text alternatives serving an equivalent purpose. |
| [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) | A | Data relationships and table structure must be programmatically available where applicable. |
| [1.3.2 Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence.html) | A | Reading and focus order must preserve meaning. |
| [1.3.3 Sensory Characteristics](https://www.w3.org/WAI/WCAG22/Understanding/sensory-characteristics.html) | A | Instructions cannot depend only on position, shape, size, or orientation. |
| [1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html) | A | Colour cannot be the only visual means of communicating data or state. |
| [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) | AA | Chart text must meet applicable text contrast thresholds. |
| [1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) | AA | Supporting content must reflow; necessary two-dimensional layouts have a defined exception. |
| [1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) | AA | Required graphical and component information generally needs 3:1 contrast. |
| [1.4.13 Content on Hover or Focus](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html) | AA | Author-created hover or focus content must be dismissible, hoverable, and persistent when applicable. |
| [2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html) | A | All chart functionality must be keyboard operable. |
| [2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) | A | Certain automatically updating or moving content needs user controls. |
| [2.3.1 Three Flashes or Below Threshold](https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html) | A | Flashing must remain within the safety threshold. |
| [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html) | A | Focus order must preserve meaning and operability. |
| [2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html) | AA | Keyboard focus must be visible. |
| [2.5.3 Label in Name](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html) | A | A control's accessible name must contain its visible label. |
| [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) | AA | Pointer targets must meet the minimum or a defined exception. |
| [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html) | A | Chart controls must expose their semantics and states. |
| [4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html) | AA | Existing status messages must be programmatically determinable. |

---

## 26. Related Guides

- [SVG Accessibility Best Practices](./SVG_ACCESSIBILITY_BEST_PRACTICES.md)
- [Color Contrast Accessibility Best Practices](./COLOR_CONTRAST_ACCESSIBILITY_BEST_PRACTICES.md)
- [Tables Accessibility Best Practices](./TABLES_ACCESSIBILITY_BEST_PRACTICES.md)
- [Keyboard Accessibility Best Practices](./KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md)
- [Touch and Pointer Accessibility Best Practices](./TOUCH_POINTER_ACCESSIBILITY_BEST_PRACTICES.md)
- [Light/Dark Mode Accessibility Best Practices](./LIGHT_DARK_MODE_ACCESSIBILITY_BEST_PRACTICES.md)
- [Maps Accessibility Best Practices](./MAPS_ACCESSIBILITY_BEST_PRACTICES.md)
- [Mermaid Accessibility Best Practices](./MERMAID_ACCESSIBILITY_BEST_PRACTICES.md)

---

## References

- [W3C WAI Complex Images Tutorial](https://www.w3.org/WAI/tutorials/images/complex/)
- [W3C WAI Tables Tutorial](https://www.w3.org/WAI/tutorials/tables/)
- [HTML Standard: The canvas element](https://html.spec.whatwg.org/multipage/canvas.html)
- [SVG Accessibility API Mappings](https://www.w3.org/TR/svg-aam-1.0/)
- [WAI-ARIA Graphics Module](https://www.w3.org/TR/graphics-aria-1.0/)
- [Understanding 1.1.1: Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html)
- [Understanding 1.4.10: Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)
- [Understanding 1.4.11: Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)
- [Understanding 1.4.13: Content on Hover or Focus](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html)
- [Understanding 4.1.3: Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html)

### Machine-readable standards

For AI systems and automated tooling, see [wai-yaml-ld](https://github.com/mgifford/wai-yaml-ld):

- [WCAG 2.2 normative content in YAML](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wcag-2.2-normative.yaml)
- [ARIA informative catalog in YAML](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wai-aria-informative.yaml)
- [HTML accessibility content in YAML](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/html-living-standard-accessibility.yaml)
- [Standards link graph in YAML](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/standards-link-graph.yaml)

---

AGPL-3.0-or-later License - See LICENSE file for full text  
Copyright (c) 2026 Mike Gifford
