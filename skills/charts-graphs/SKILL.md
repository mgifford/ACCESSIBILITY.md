# Charts and Graphs Accessibility Skill

> **Canonical source**: `examples/CHARTS_GRAPHS_ACCESSIBILITY_BEST_PRACTICES.md`
> This skill is derived from that file. When in doubt, the example is authoritative.

Apply these rules when creating or reviewing any data visualization.

---

## Core Mandate

Every chart that conveys meaningful information must have an accessible alternative communicating the same data and insights. This includes static images, SVGs, canvas graphics, and JS charting libraries.

---

## Required: Text Alternatives

**Simple chart — brief alt:**
```html
<img src="quarterly-sales.png"
  alt="Bar chart: Q4 2024 highest at $2.3M, up 18% from Q3.">
```

**Complex chart — long description via figcaption:**
```html
<figure>
  <img src="trends.png"
    alt="Accessibility adoption rates 2019–2024 — detailed description below."
    aria-describedby="chart-desc">
  <figcaption id="chart-desc">
    <p>Line chart showing three sectors. Government: 42%→78%. 
    Corporate: 28%→61% (sharp increase 2021). 
    Non-profit: 19%→47%. All sectors show year-over-year growth.</p>
  </figcaption>
</figure>
```

Text alternative must include: chart type, axes and units, overall trend/finding, key data points, notable outliers, time range.

---

## Required: Data Table Alternative

For complex charts, provide a linked or adjacent data table:
```html
<details>
  <summary>View data table for budget chart</summary>
  <table>
    <caption>2024 budget allocation by department</caption>
    <thead>
      <tr><th scope="col">Department</th><th scope="col">Budget</th><th scope="col">%</th></tr>
    </thead>
    <tbody>
      <tr><td>Engineering</td><td>$1,200,000</td><td>40%</td></tr>
      <!-- ... -->
    </tbody>
  </table>
</details>
```

---

## Required: Color Independence

Never use color as the sole encoding. Add a secondary indicator:
- Patterns/textures in bar, area, or pie charts
- Direct labels on chart elements
- Distinct shapes for data points (scatter/line)
- Dash or thickness variation for lines

```html
<!-- SVG pattern fills -->
<svg width="0" height="0" aria-hidden="true">
  <defs>
    <pattern id="pattern-dots" patternUnits="userSpaceOnUse" width="6" height="6">
      <circle cx="2" cy="2" r="1.5" fill="currentColor"/>
    </pattern>
    <pattern id="pattern-stripes" patternUnits="userSpaceOnUse" width="6" height="6">
      <line x1="0" y1="0" x2="6" y2="6" stroke="currentColor" stroke-width="1.5"/>
    </pattern>
  </defs>
</svg>
<rect fill="url(#pattern-dots)" .../>
```

Use colorblind-safe palettes: Okabe-Ito or ColorBrewer. Avoid red/green as sole differentiators.

---

## Required: Contrast Ratios

| Element | Minimum |
|---|---|
| Text labels on/adjacent to charts | 4.5:1 |
| Large text axis labels | 3:1 |
| Non-text graphical elements, chart borders | 3:1 |
| Line chart lines encoding meaning | 3:1 |

---

## Required: SVG Chart Markup

```html
<figure>
  <svg role="img" aria-labelledby="chart-title chart-desc" viewBox="0 0 400 300">
    <title id="chart-title">Monthly website visitors, Q1 2024</title>
    <desc id="chart-desc">
      Bar chart. January: 12,400. February: 15,800. March: 19,200 (highest, up 54% from Jan).
    </desc>
    <g role="list" aria-label="Monthly visitors data">
      <g role="listitem" aria-label="January: 12,400 visitors">
        <rect x="50" y="155" width="60" height="124" fill="steelblue"/>
        <text x="80" y="149" text-anchor="middle">12,400</text>
      </g>
      <!-- ... -->
    </g>
  </svg>
  <figcaption>Source: Analytics dashboard, Q1 2024</figcaption>
</figure>
```

---

## Required: Interactive Charts

- All chart interactions available by keyboard
- Focus indicators on interactive data points
- Data point values announced on focus (`aria-label` on each element)
- Arrow keys to navigate between data points
- `Escape` to exit chart navigation

---

## Definition of Done Checklist

- [ ] All charts have text alternative (brief alt or figcaption)
- [ ] Complex charts have adjacent data table
- [ ] Color not used as sole encoding method
- [ ] Colorblind-safe palette used
- [ ] All contrast ratios met (text 4.5:1, non-text 3:1)
- [ ] SVG charts use `role="img"`, `<title>`, `<desc>`, `aria-labelledby`
- [ ] Interactive charts keyboard operable
- [ ] Tested with screen reader

---

## Key WCAG Criteria

- 1.1.1 Non-text Content (A)
- 1.4.1 Use of Color (A)
- 1.4.3 Contrast Minimum (AA)
- 1.4.11 Non-text Contrast (AA)
- 2.1.1 Keyboard (A)

---

## References

- [Full best practices guide](../../examples/CHARTS_GRAPHS_ACCESSIBILITY_BEST_PRACTICES.md)
- [Curated reference sources](references/references.md)
- [Okabe-Ito colorblind-safe palette](https://jfly.uni-koeln.de/color/)
