---
title: Charts and Graphs Accessibility Best Practices
---

# Charts and Graphs Accessibility Best Practices

This document defines accessibility requirements for charts, graphs, and data visualizations on the web, ensuring all users can understand the information conveyed regardless of visual, motor, or cognitive ability.

Charts and graphs present unique accessibility challenges because they encode meaning through visual properties — position, color, shape, and size — that are inherently inaccessible to screen reader users, people with color vision deficiencies, or anyone who cannot load images. These practices help teams provide meaningful alternatives, make interactive visualizations operable, and ensure data is understandable for all users.

---

## 1. Core Principle

Every chart or graph that conveys meaningful information must have an accessible alternative that communicates the same data and insights. This applies to static images, SVG-based charts, canvas-rendered graphics, and JavaScript charting libraries. Users who are blind or low vision, users with color vision deficiencies, and users who cannot use a mouse must all be able to access the underlying data.

---

## 2. Text Alternatives for Static Charts

### Required for all charts that convey meaning

Every chart image must have a text alternative that goes beyond simple labeling to convey the meaning, trends, and conclusions the chart supports.

#### Brief alt text for simple charts

For a chart with a single clear takeaway:

```html
<img
  src="quarterly-sales.png"
  alt="Bar chart showing quarterly sales for 2024. Q4 was highest at $2.3M, up 18% from Q3."
/>
```

#### Long description for complex charts

For charts with multiple data series, trends, or nuanced findings, combine a short `alt` with a full description using `aria-describedby` or a visible caption:

```html
<figure>
  <img
    src="accessibility-adoption-trends.png"
    alt="Line chart of accessibility adoption rates 2019–2024 — detailed description below."
    aria-describedby="chart-desc"
  />
  <figcaption id="chart-desc">
    <p>
      Line chart showing accessibility adoption rates from 2019 to 2024 across three sectors.
      Government sector: rose steadily from 42% to 78%.
      Corporate sector: rose from 28% to 61%, with a sharp increase in 2021.
      Non-profit sector: rose from 19% to 47%, remaining consistently the lowest.
      All three sectors show year-over-year growth, with the government sector leading throughout.
    </p>
  </figcaption>
</figure>
```

### What to include in a text alternative

- The chart type (bar, line, pie, scatter)
- The axes and their units
- The overall trend or key finding
- Specific data points that support the conclusion
- Any notable outliers or exceptions
- The time range or scope of the data

Do not write: *"Chart showing sales data."*
Do write: *"Bar chart showing monthly sales from January to June 2024. Sales peaked in March at 4,200 units and fell to their lowest in June at 1,800 units, reflecting seasonal demand patterns."*

---

## 3. Providing a Data Table Alternative

A linked or adjacent data table is often the most accessible alternative for complex charts because it allows screen reader users to navigate the underlying data directly using standard table reading commands.

```html
<figure>
  <img
    src="budget-breakdown.png"
    alt="Pie chart showing 2024 budget allocation — data table below."
  />
  <figcaption>2024 budget allocation by department</figcaption>
</figure>

<details>
  <summary>View data table for budget chart</summary>
  <table>
    <caption>2024 budget allocation by department</caption>
    <thead>
      <tr>
        <th scope="col">Department</th>
        <th scope="col">Budget (USD)</th>
        <th scope="col">Percentage</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Engineering</td><td>$1,200,000</td><td>40%</td></tr>
      <tr><td>Marketing</td><td>$600,000</td><td>20%</td></tr>
      <tr><td>Operations</td><td>$450,000</td><td>15%</td></tr>
      <tr><td>HR</td><td>$450,000</td><td>15%</td></tr>
      <tr><td>Legal</td><td>$300,000</td><td>10%</td></tr>
    </tbody>
  </table>
</details>
```

### When a data table is required

- When the chart is the primary way to convey numerical data
- When the chart contains more data points than can be described in a short paragraph
- When users need to compare or search the data independently
- When the data will be cited or referenced in formal documents

---

## 4. Color and Visual Encoding

### Color must not be the only means of encoding information

WCAG 2.2 SC 1.4.1 (Use of Color, Level A) requires that color not be used as the sole visual means of conveying information. For charts, this means every color-coded element must also have a secondary encoding:

- Add **patterns or textures** to fill areas in bar, area, or pie charts
- Add **labels directly** on chart elements (lines, slices, bars)
- Add **distinct shapes** to data points in scatter and line charts
- Add **dashes or thickness variation** to distinguish lines

#### CSS pattern fills using SVG

```html
<svg width="0" height="0" aria-hidden="true">
  <defs>
    <pattern id="pattern-dots" patternUnits="userSpaceOnUse" width="6" height="6">
      <circle cx="2" cy="2" r="1.5" fill="currentColor"/>
    </pattern>
    <pattern id="pattern-stripes" patternUnits="userSpaceOnUse" width="6" height="6">
      <line x1="0" y1="0" x2="6" y2="6" stroke="currentColor" stroke-width="1.5"/>
    </pattern>
    <pattern id="pattern-cross" patternUnits="userSpaceOnUse" width="6" height="6">
      <line x1="3" y1="0" x2="3" y2="6" stroke="currentColor" stroke-width="1.5"/>
      <line x1="0" y1="3" x2="6" y2="3" stroke="currentColor" stroke-width="1.5"/>
    </pattern>
  </defs>
</svg>

<!-- Bar filled with dots pattern -->
<rect fill="url(#pattern-dots)" .../>
```

### Color contrast requirements

- Text labels on or adjacent to charts: 4.5:1 contrast ratio against background (SC 1.4.3 AA)
- Large text axis labels (18pt or 14pt bold): 3:1 contrast ratio (SC 1.4.3 AA)
- Non-text graphical elements (data point shapes, chart borders, grid lines): 3:1 contrast ratio against adjacent colors (SC 1.4.11 AA)
- Line chart lines that encode meaning: 3:1 contrast ratio against background (SC 1.4.11 AA)

### Designing for color vision deficiency

Red-green color blindness (deuteranopia/protanopia) affects approximately 8% of men and 0.5% of women. Blue-yellow deficiency (tritanopia) is rarer. Avoid using red and green as the only distinguishing colors in a multi-series chart. Use color palettes that are verified for color vision deficiency, such as:

- [Okabe-Ito palette](https://jfly.uni-koeln.de/color/) — designed to be distinguishable across all common types of color blindness
- [ColorBrewer](https://colorbrewer2.org/) — provides colorblind-safe palettes for maps and charts
- Verify your palette using Coblis, the Colour Blindness Simulator, or browser DevTools color blindness emulation

---

## 5. SVG-Based Charts

SVG is the preferred format for accessible charts because it supports semantic markup, ARIA, and scalable rendering without quality loss.

### SVG chart accessible markup

```html
<figure>
  <svg
    role="img"
    aria-labelledby="chart-title chart-desc"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 400 300"
  >
    <title id="chart-title">Monthly website visitors, Q1 2024</title>
    <desc id="chart-desc">
      Bar chart showing monthly visitors. January: 12,400. February: 15,800.
      March: 19,200. March was the highest, up 54% from January.
    </desc>

    <!-- Bars -->
    <g role="list" aria-label="Monthly visitors data">
      <g role="listitem" aria-label="January: 12,400 visitors">
        <rect x="50" y="155" width="60" height="124" fill="steelblue"/>
        <text x="80" y="149" text-anchor="middle" font-size="12">12,400</text>
        <text x="80" y="293" text-anchor="middle" font-size="12">Jan</text>
      </g>
      <g role="listitem" aria-label="February: 15,800 visitors">
        <rect x="170" y="121" width="60" height="158" fill="steelblue"/>
        <text x="200" y="115" text-anchor="middle" font-size="12">15,800</text>
        <text x="200" y="293" text-anchor="middle" font-size="12">Feb</text>
      </g>
      <g role="listitem" aria-label="March: 19,200 visitors">
        <rect x="290" y="87" width="60" height="192" fill="steelblue"/>
        <text x="320" y="81" text-anchor="middle" font-size="12">19,200</text>
        <text x="320" y="293" text-anchor="middle" font-size="12">Mar</text>
      </g>
    </g>

    <!-- Axes -->
    <line x1="40" y1="279" x2="380" y2="279" stroke="black" stroke-width="2"/>
    <line x1="40" y1="20" x2="40" y2="279" stroke="black" stroke-width="2"/>
  </svg>
  <figcaption>Source: Analytics dashboard, Q1 2024</figcaption>
</figure>
```

### SVG accessibility guidelines

- Always include `<title>` and `<desc>` as the first children of `<svg>` (or as the first children of `<g>` for chart groups)
- Reference them with `aria-labelledby` on the `<svg>` element
- Use `role="img"` when the SVG is a complete standalone image
- Use `role="list"` and `role="listitem"` on chart element groups to allow screen readers to enumerate data points
- Hide decorative elements from assistive technology using `aria-hidden="true"` (grid lines, decorative borders, background fills)
- Ensure `<text>` elements in SVG have sufficient contrast against their background

---

## 6. Accessible HTML Canvas Charts

Canvas renders as a bitmap — a single opaque image to assistive technology — unless fallback content and ARIA are used. Canvas-based charts require extra work to make accessible.

### Required techniques for accessible canvas charts

1. **Provide a text fallback inside `<canvas>`**:

```html
<canvas id="sales-chart" width="600" height="400" role="img" aria-label="Q2 sales by region — data table below">
  <!-- Fallback for browsers without canvas support -->
  <p>Q2 sales by region: North $450K, South $320K, East $280K, West $510K.</p>
</canvas>
```

2. **Provide a linked data table or description below the canvas element**

3. **Use a charting library that manages canvas accessibility**, such as Chart.js (with the `chartjs-plugin-a11y-legend` plugin) or Highcharts (which renders hidden accessible descriptions automatically)

4. **Add keyboard-navigable data points** if interaction is required — canvas alone does not support this; use an overlay `<div>` or `<table>` with matching `tabindex` attributes or switch to SVG

---

## 7. Interactive Charts

### Keyboard operability

All interactive chart behaviors available by mouse or touch must be operable by keyboard. This is required by WCAG 2.2 SC 2.1.1 (Keyboard, Level A).

| Interaction | Keyboard equivalent |
|---|---|
| Activate a data point / bar | `Enter` or `Space` |
| Navigate between data points | Arrow keys |
| Navigate between data series | `Tab` (or documented shortcut) |
| Dismiss tooltip or popup | `Escape` |
| Zoom in / out | `+` / `-` or labeled buttons |
| Pan / scroll chart area | Arrow keys (when chart has focus) |
| Return to chart overview | `Home` or labeled reset button |

### Tooltips

Tooltips on hover are inaccessible by default to keyboard and touch users. Replace hover-only tooltips with focus-visible tooltips:

```html
<!-- Data point that reveals a tooltip on hover AND focus -->
<circle
  cx="220"
  cy="140"
  r="6"
  tabindex="0"
  role="button"
  aria-describedby="tooltip-mar"
  aria-label="March: 19,200 visitors"
/>
<g id="tooltip-mar" role="tooltip" aria-hidden="true">
  <rect x="190" y="110" width="110" height="40" rx="4" fill="white" stroke="#333"/>
  <text x="245" y="128" text-anchor="middle" font-size="12" font-weight="bold">March</text>
  <text x="245" y="144" text-anchor="middle" font-size="11">19,200 visitors</text>
</g>
```

CSS to reveal tooltip on focus or hover:

```css
[role="tooltip"] {
  display: none;
}
[aria-describedby]:focus + [role="tooltip"],
[aria-describedby]:hover + [role="tooltip"] {
  display: block;
}
```

Note: Use `visibility` and `opacity` rather than `display: none` for tooltips if you want CSS transitions, and ensure `pointer-events: none` is set on the tooltip so it does not block the underlying element.

### Focus management for chart interactions

- Ensure focus is visible on all interactive chart elements (data points, legend items, controls)
- When a tooltip or panel opens, announce the content to screen readers (use `aria-live` or move focus)
- When a filter or date range control changes the chart data, announce the update:

```html
<div aria-live="polite" aria-atomic="true" class="visually-hidden" id="chart-announcement">
  <!-- Updated programmatically when chart data changes -->
</div>
```

```javascript
function updateChartAnnouncement(description) {
  const region = document.getElementById('chart-announcement');
  region.textContent = '';
  // Force re-announcement even if content is the same
  requestAnimationFrame(() => {
    region.textContent = description;
  });
}
// Call after chart update:
updateChartAnnouncement('Chart updated. Sales data filtered to Q1 2024. Total: $3.2M across 4 regions.');
```

---

## 8. Chart Legends

Chart legends are a common accessibility failure point. Legends that use color alone to identify series violate SC 1.4.1.

### Accessible legend requirements

- Include pattern/texture swatches or shape indicators alongside color swatches
- Make legend items keyboard-navigable if they serve as filter controls
- Provide legend item text labels in a readable font at sufficient size (minimum 9pt rendered, preferably 12pt or larger)
- Do not hide or collapse legends by default on small screens if they are required to interpret the chart

```html
<!-- Accessible legend with color + pattern identification -->
<ul class="chart-legend" role="list" aria-label="Chart legend">
  <li>
    <span class="legend-swatch" aria-hidden="true" style="background: steelblue; background-image: url('pattern-dots.svg');"></span>
    <span>2023 sales</span>
  </li>
  <li>
    <span class="legend-swatch" aria-hidden="true" style="background: coral; background-image: url('pattern-stripes.svg');"></span>
    <span>2024 sales</span>
  </li>
</ul>
```

---

## 9. Chart Types: Specific Guidance

### Bar and column charts

- Label each bar directly where space allows (reduces reliance on legend)
- Provide axis labels and tick labels for both axes
- For horizontal bar charts, ensure left-to-right reading order is preserved for screen readers
- Avoid 3D bar charts — depth and perspective add visual noise without data value and impair contrast

### Pie and donut charts

- Avoid pie charts when comparing more than five to seven segments — small segments become impossible to label or distinguish
- Label segments directly (percentage and name) rather than only through legend
- Provide a data table alternative — pie chart proportions are difficult to interpret precisely even visually
- For donut charts, ensure the hole does not obscure a center label that contains critical information

### Line charts

- Use distinct line styles (solid, dashed, dotted) in addition to distinct colors for each series
- Mark data points with distinct shapes (circle, square, triangle, diamond) in addition to color
- Label the end of each line directly where multiple lines are present
- For sparklines, ensure a text alternative describes the trend, not just the range

### Scatter charts

- Ensure each data point shape is distinguishable when overlapping
- Provide a way to access the underlying data values for each point (tooltip + keyboard navigation)
- Consider clustering strategies and their impact on readability when data density is high

### Area and stacked charts

- Stacked charts are particularly difficult to decode — provide a data table
- Label areas directly when they are large enough; do not rely solely on legend
- Use sufficient contrast between stacked areas to meet SC 1.4.11

### Heat maps

- Never encode information solely by color gradient — provide value labels on cells or an accessible tooltip/table
- Define the color scale explicitly in the chart title or caption ("Red = high risk, blue = low risk")
- Provide the full underlying data as a downloadable table for complex heat maps

---

## 10. Mobile and Responsive Accessibility

- Ensure charts are readable at 320px wide viewport width (WCAG 2.2 SC 1.4.10 Reflow, Level AA)
- Do not require two-dimensional scrolling for charts embedded in page content
- Provide a "View as table" option when the chart cannot be made fully accessible at small sizes
- Ensure touch targets for interactive chart elements are at least 24×24 CSS pixels (WCAG 2.2 SC 2.5.8, Level AA)

```html
<!-- Responsive chart container that offers table fallback -->
<div class="chart-wrapper">
  <div class="chart-container" aria-hidden="false">
    <!-- Chart renders here -->
  </div>
  <a href="#chart-data-table" class="chart-table-link">Skip to data table</a>
</div>

<div id="chart-data-table">
  <h3>Data table: monthly sales 2024</h3>
  <table><!-- ... --></table>
</div>
```

---

## 11. Charting Libraries: Accessibility Support

When selecting a charting library, consider built-in accessibility support. The following libraries have documented accessibility features:

| Library | Notes |
|---|---|
| **Highcharts** | Built-in accessible descriptions, keyboard navigation module, screen reader optimization; most comprehensive out-of-the-box support |
| **Chart.js** | Requires `chartjs-plugin-accessibility` or custom ARIA; canvas-based, so extra work required |
| **D3.js** | Maximum control, including full SVG and ARIA support, but accessibility must be implemented manually |
| **Vega-Lite / Vega** | Supports SVG output; some accessible description generation available |
| **Observable Plot** | SVG-based; supports accessible titles and descriptions via mark options |
| **Recharts** | React-based SVG library; supports ARIA props; manual labeling required |
| **Victory** | React-based; supports accessible containers and ARIA labels |
| **ApexCharts** | HTML5 Canvas/SVG hybrid; some ARIA support; test carefully with screen readers |

Regardless of library, always verify output with a screen reader before publishing. Library accessibility documentation may not reflect the current release state.

---

## 12. WCAG 2.2 Success Criteria

The following WCAG 2.2 success criteria apply directly to charts and graphs:

| SC | Level | Requirement |
|---|---|---|
| 1.1.1 Non-text Content | A | All charts must have text alternatives that serve the equivalent purpose |
| 1.3.1 Info and Relationships | A | Structure and relationships in charts must be available to assistive technology |
| 1.3.2 Meaningful Sequence | A | Reading order of chart elements must be logical |
| 1.3.3 Sensory Characteristics | A | Instructions must not rely solely on visual characteristics (color, position, shape) |
| 1.4.1 Use of Color | A | Color must not be the sole means of conveying information |
| 1.4.3 Contrast (Minimum) | AA | Text labels and values must meet 4.5:1 (or 3:1 for large text) contrast ratio |
| 1.4.10 Reflow | AA | Content must not require horizontal scrolling at 320px width |
| 1.4.11 Non-text Contrast | AA | Chart elements (lines, bars, data points) must meet 3:1 contrast against adjacent colors |
| 2.1.1 Keyboard | A | All interactive chart functionality must be operable by keyboard |
| 2.4.3 Focus Order | A | Focus sequence must be logical and predictable |
| 2.4.7 Focus Visible | AA | Keyboard focus must be visible on interactive chart elements |
| 2.5.8 Target Size (Minimum) | AA | Touch and click targets must be at least 24×24 CSS pixels |
| 4.1.2 Name, Role, Value | A | All interactive chart controls must have accessible names, roles, and states |
| 4.1.3 Status Messages | AA | Dynamic chart updates (filters, data changes) must be announced to screen readers |

---

## 13. Testing Procedure

### Automated testing

Automated tools can detect some chart accessibility issues but cannot verify the quality or accuracy of text alternatives. Run automated tests as a first pass, not a complete audit.

- **axe-core** / **axe DevTools**: Detects missing alt text on `<img>` chart images, color contrast failures in SVG text elements, missing accessible names on interactive controls
- **Lighthouse**: Detects missing alt text and some contrast failures
- **WAVE**: Highlights missing alt text, low contrast, and missing form labels on chart controls

### Manual testing checklist

- [ ] Every chart image has an `alt` attribute that is non-empty for meaningful charts
- [ ] Complex charts have a long description via `aria-describedby` or visible caption
- [ ] A data table alternative is present and linked for multi-series or complex charts
- [ ] Color is not the only means of distinguishing data series
- [ ] All text labels, axes, and values meet contrast requirements
- [ ] All non-text chart elements (bars, lines, points) meet 3:1 non-text contrast
- [ ] All interactive chart elements are reachable and operable by keyboard
- [ ] Tooltips are accessible on focus, not hover only
- [ ] Chart announces updates to screen readers using a live region
- [ ] Chart renders without horizontal scroll at 320px viewport width
- [ ] Touch targets on interactive elements are at least 24×24px

### Screen reader testing

Test with at least one desktop screen reader (NVDA + Firefox or JAWS + Chrome on Windows; VoiceOver + Safari on macOS) and one mobile screen reader (VoiceOver + Safari on iOS; TalkBack + Chrome on Android).

**For static image charts:**
- Navigate to the image by pressing `I` (NVDA) or `G` (VoiceOver Web Rotor)
- Verify the alt text or aria-describedby content is read and conveys the full meaning

**For SVG charts:**
- Navigate by heading or landmark to reach the chart
- Verify `<title>` and `<desc>` content is announced
- If data points use `role="listitem"`, navigate the list with `L` (NVDA)

**For interactive charts:**
- Tab to the chart and confirm focus is visible
- Use arrow keys to navigate between data points
- Press `Enter` or `Space` on a data point and confirm the tooltip or detail panel is accessible
- Press `Escape` to close any panel and confirm focus returns to the triggering element

---

## 14. Definition of Done

A chart or graph is complete only when:

- All chart images and SVGs have accurate, meaningful text alternatives
- A data table alternative is present for all charts with three or more data series or more than ten data points
- Color is not the sole means of differentiating any two data elements
- All text labels and graphical elements meet WCAG 2.2 contrast requirements
- All interactive functionality is keyboard operable
- Dynamic chart updates are announced via a live region
- The chart renders without horizontal scrolling at 320px viewport width
- Manual keyboard and screen reader testing passes with no blocking issues

---

## 15. Further Resources

- [Harvard University IT: Data Visualization, Charts and Graphs Accessibility](https://accessibility.huit.harvard.edu/data-viz-charts-graphs)
- [A11y Collective: Accessible Charts](https://www.a11y-collective.com/blog/accessible-charts/)
- [Berkeley DAP: Graphs, Charts and Complex Images](https://dap.berkeley.edu/learn/concepts/graphs-charts-and-complex-images)
- [Niagara College Accessibility Hub: Charts and Graphs](https://accessibilityhub.niagaracollege.ca/articles/websites/charts-and-graphs/)
- [UK Government Analysis Function: Charts — A Checklist](https://analysisfunction.civilservice.gov.uk/policy-store/charts-a-checklist/)
- [Vispero: Making Data Visualizations Accessible](https://vispero.com/resources/making-data-visualizations-accessible/)
- [MIT News: Making Graphs More Accessible for Blind and Low-Vision Readers (2025)](https://news.mit.edu/2025/making-graphs-more-accessible-blind-low-vision-readers-0325)
- [Deque: How to Make Interactive Charts Accessible](https://www.deque.com/blog/how-to-make-interactive-charts-accessible/)
- [Smashing Magazine: Accessibility-First Approach to Chart Visual Design](https://www.smashingmagazine.com/2022/07/accessibility-first-approach-chart-visual-design/)
- [ColorBrewer: Colorblind-Safe Palette Tool](https://colorbrewer2.org/)
- [Highcharts Accessibility Module Documentation](https://www.highcharts.com/docs/accessibility/accessibility-module)
