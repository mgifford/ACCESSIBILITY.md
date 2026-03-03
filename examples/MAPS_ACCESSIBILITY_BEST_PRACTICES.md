---
title: Maps Accessibility Best Practices
---

# Maps Accessibility Best Practices

This document defines accessibility requirements for interactive and static maps on the web, ensuring that all users can access geographic information regardless of visual, motor, or cognitive ability.

Maps present unique accessibility challenges because spatial information is inherently visual. These practices help teams provide meaningful alternatives, make interactive controls operable, and ensure content is understandable for all users.

---

## 1. Core Principle

All users must be able to access the essential information conveyed by a map through accessible alternatives, keyboard-operable controls, and clear, structured content. This includes people who are blind or low vision, those who cannot use a mouse, and those with cognitive or learning disabilities.

---

## 2. Text Alternatives for Static Maps

### Required for all maps that convey meaning

A static map image must have a text alternative that conveys the same information:

- Use `alt` for brief descriptions where the map supports a single point of information.
- Use `aria-describedby` or a linked long description for complex maps with multiple features.
- Never leave `alt` empty for a meaningful map — use `alt=""` only when the map is purely decorative (rare).

#### Simple static map

```html
<img
  src="campus-map.png"
  alt="Campus map showing the main entrance on Elm Street, with the library to the north and parking to the east."
/>
```

#### Complex map with long description

```html
<figure>
  <img
    src="regional-map.png"
    alt="Regional accessibility map — detailed description below."
    aria-describedby="regional-map-desc"
  />
  <figcaption id="regional-map-desc">
    <p>The map shows three accessible transit routes through the downtown core. Route A runs north–south on Main Street with level boarding at all stops. Route B runs east–west on King Avenue with ramps at each station entrance. Route C is an inner loop connecting the civic centre, library, and hospital, all of which have automatic doors and step-free access.</p>
  </figcaption>
</figure>
```

### What to include in a text alternative

- The purpose of the map
- Key features, locations, or routes shown
- Directional relationships (north, south, adjacent to, across from)
- Any symbols or color coding used, with their meaning

---

## 3. Interactive Map Accessibility

### Keyboard operability

All map interactions available by mouse or touch must be reachable and operable by keyboard:

- Pan/scroll: arrow keys or equivalent keyboard controls
- Zoom in/out: `+`/`-` keys or accessible buttons with visible labels
- Feature activation: `Enter` or `Space` on focused markers or regions
- Close popups or tooltips: `Escape`
- Skip the map: provide a visible-on-focus skip link before the map region

```html
<!-- Skip link before the map -->
<a href="#map-skip-target" class="skip-link">Skip map</a>

<div id="map-container" aria-label="Interactive campus map">
  <!-- map renders here -->
</div>

<div id="map-skip-target" tabindex="-1">
  <h2>Map information as text</h2>
  <!-- structured text equivalent -->
</div>
```

### Focus management

- Ensure focus is visible at all times on map controls and markers.
- When a marker popup opens, move focus into the popup.
- When a popup closes, restore focus to the triggering marker.
- Do not trap focus inside the map container unless it is a modal experience.

### Landmark and ARIA roles

- Wrap the map in a `<section>` or use `role="application"` when custom keyboard behavior is implemented.
- Provide an accessible name via `aria-label` or `aria-labelledby`.
- Use `role="application"` sparingly — it suspends standard reading mode in screen readers. Only use it when the map delivers a rich interactive widget experience and includes comprehensive keyboard support.

```html
<section aria-labelledby="map-heading">
  <h2 id="map-heading">Service Area Map</h2>
  <div role="application" aria-label="Interactive service area map">
    <!-- map -->
  </div>
</section>
```

---

## 4. Map Controls

### Zoom and navigation controls

- All map controls (zoom, pan, layer toggles, search) must be reachable by keyboard.
- Buttons must have accessible names — avoid icon-only buttons without labels.
- Controls must meet minimum touch target size (44×44 CSS pixels).

```html
<!-- Accessible zoom controls -->
<div role="group" aria-label="Map zoom controls">
  <button type="button" aria-label="Zoom in">+</button>
  <button type="button" aria-label="Zoom out">−</button>
  <button type="button" aria-label="Reset to default view">⟳</button>
</div>
```

### Layer toggles and filters

- Layer toggles must use `<input type="checkbox">` or `role="checkbox"` with a visible label.
- Group related layer controls with `<fieldset>` and `<legend>`.
- Announce layer state changes using a live region when appropriate.

```html
<fieldset>
  <legend>Map layers</legend>
  <label><input type="checkbox" name="layer-transit" checked> Transit routes</label>
  <label><input type="checkbox" name="layer-accessibility"> Accessibility features</label>
  <label><input type="checkbox" name="layer-parking"> Parking areas</label>
</fieldset>
```

---

## 5. Map Markers and Features

### Accessible marker names

Every marker, pin, or region must have an accessible name:

```html
<!-- Marker as a button -->
<button type="button" aria-label="City Hall — open weekdays 9am to 5pm">
  <svg aria-hidden="true" focusable="false"><!-- pin icon --></svg>
</button>
```

### Popups and tooltips

- Popup content must be keyboard-accessible and screen-reader-readable.
- Use `role="dialog"` with `aria-labelledby` for rich popups.
- Provide a clearly labeled close button.
- Ensure popup text has sufficient color contrast.

```html
<div role="dialog" aria-labelledby="popup-title" aria-modal="true">
  <h3 id="popup-title">City Hall</h3>
  <p>123 Main Street. Open Monday–Friday, 9am–5pm.</p>
  <a href="/city-hall">More information</a>
  <button type="button" aria-label="Close City Hall popup">✕</button>
</div>
```

### Clusters

- Marker clusters must announce their count and general location.
- Expanding a cluster must be keyboard-operable and announce the result.

```html
<button type="button" aria-label="Cluster of 7 locations in downtown — press Enter to expand">
  7
</button>
```

---

## 6. Color and Visual Design

### Do not rely on color alone

Maps frequently use color to convey meaning. Every use of color must be accompanied by another visual indicator:

- Use patterns, shapes, or labels in addition to color for route or zone differentiation.
- Provide a map legend with text labels for all color-coded elements.
- Ensure the legend is adjacent to the map and keyboard-accessible.

### Color contrast

- Map text and labels must meet 4.5:1 contrast ratio against their background (WCAG 2.2 AA).
- UI controls must meet 3:1 contrast ratio for non-text elements.
- Test maps in forced-colors (Windows High Contrast) mode.

### Avoid conveying direction by color alone

For route maps, supplement color with directional arrows or numbered waypoints.

---

## 7. Structured Text Alternative

Whenever a map communicates complex spatial data, provide a structured text equivalent alongside it. This can take several forms:

### Tabular data

When a map shows a list of locations:

```html
<table>
  <caption>Accessible library branches</caption>
  <thead>
    <tr>
      <th scope="col">Branch</th>
      <th scope="col">Address</th>
      <th scope="col">Accessibility features</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Central Library</td>
      <td>100 Main St</td>
      <td>Step-free entry, elevator, accessible washrooms, assistive listening</td>
    </tr>
    <tr>
      <td>Eastside Branch</td>
      <td>450 Oak Ave</td>
      <td>Step-free entry, accessible washrooms</td>
    </tr>
  </tbody>
</table>
```

### Step-by-step directions

For routing maps, provide turn-by-turn text directions as an alternative:

```html
<ol aria-label="Accessible route from main entrance to conference room">
  <li>Enter through the main doors on Elm Street (automatic doors, level threshold).</li>
  <li>Turn right and proceed to the elevator lobby.</li>
  <li>Take the elevator to the 3rd floor.</li>
  <li>Exit left and follow the corridor to room 310.</li>
</ol>
```

---

## 8. Indoor Maps and Wayfinding

Indoor maps present additional challenges because they often depict multi-level spaces with complex navigation needs.

### Key requirements

- Provide floor-level navigation controls with clear accessible names.
- Announce floor changes clearly when the map view updates.
- Provide text-based wayfinding as an alternative to the visual map.
- Where possible, support integration with indoor positioning systems for real-time navigation assistance.

### Floor selector

```html
<label for="floor-select">Select floor</label>
<select id="floor-select">
  <option value="ground">Ground floor (accessible entrance, lobby, café)</option>
  <option value="1">Floor 1 (offices, meeting rooms 101–120)</option>
  <option value="2">Floor 2 (library, training rooms 201–210)</option>
</select>

<!-- Use a live region to announce the floor change to screen readers -->
<div role="status" aria-live="polite" aria-atomic="true" id="floor-announcement"></div>
```

Wire the `change` event of the select to update `#floor-announcement` with a brief human-readable message such as "Showing Ground floor". This approach is more reliably supported across assistive technologies than `aria-controls`.

### Accessible route highlighting

When showing accessible routes indoors, clearly differentiate them from standard routes using both color and pattern (for example, a dashed line in addition to color), and provide a legend.

---

## 9. Third-Party Map Embeds

Many projects embed maps from third-party providers (Google Maps, Mapbox, Leaflet, OpenStreetMap). Each has different accessibility characteristics.

### Embedding considerations

- Always provide a non-map alternative (table of locations, directions, or address list) alongside any embedded map.
- Test the embedded map for keyboard operability and screen reader compatibility.
- Add a descriptive `title` to `<iframe>` embeds.
- Ensure the map does not create a keyboard trap.

```html
<iframe
  src="https://example-map-provider.com/embed?..."
  title="Interactive map showing our office locations"
  width="600"
  height="450"
  loading="lazy"
  referrerpolicy="no-referrer-when-downgrade">
</iframe>

<!-- Always provide a text alternative below the embed -->
<details>
  <summary>View office locations as a list</summary>
  <ul>
    <li>Vancouver: 100 Granville Street, V6C 1T2</li>
    <li>Toronto: 200 Bay Street, M5J 2J3</li>
  </ul>
</details>
```

### Leaflet.js accessibility

When using Leaflet, always add `keyboard: true` to your map initialization and ensure all custom markers and controls have accessible names. When clustering markers is needed, use the [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster) plugin and ensure cluster buttons expose accessible names with counts (see Section 5 — Clusters). Consider [Leaflet Accessible](https://github.com/adamlacombe/Leaflet.Accessible) for additional keyboard and screen reader improvements.

---

## 10. Map Search and Geocoding

If the map includes a search or address lookup:

- Label the search input clearly.
- Announce search results using a live region.
- Announce when no results are found.
- Ensure result items are navigable by keyboard and operable with `Enter`.

```html
<label for="map-search">Search for a location</label>
<input
  type="search"
  id="map-search"
  aria-controls="map-search-results"
  autocomplete="off"
  aria-autocomplete="list"
/>

<ul
  id="map-search-results"
  role="listbox"
  aria-label="Search suggestions"
  aria-live="polite"
>
  <!-- dynamically populated results -->
</ul>
```

---

## 11. Mobile and Touch Accessibility

- All map interactions must be operable with a single pointer (no multi-finger gestures required).
- Provide button-based alternatives for pinch-to-zoom and two-finger pan.
- Ensure maps work correctly with iOS VoiceOver and Android TalkBack.
- Confirm that touch targets are at least 44×44 CSS pixels.

---

## 12. Testing Expectations

Minimum checks for each map change:

- Navigate all controls and markers using keyboard only.
- Verify visible focus on all focusable elements.
- Verify screen reader announces marker names, popup content, and control states.
- Verify color contrast for map text, labels, and UI controls.
- Verify the map in forced-colors (Windows High Contrast) mode.
- Verify a text alternative or structured equivalent is present and complete.
- Verify embedded maps have descriptive `title` attributes.
- Check with iOS VoiceOver and Android TalkBack for mobile map interactions.

---

## 13. Definition of Done

A map feature is complete only when:

- All map controls have accessible names.
- All markers and interactive features are keyboard-operable.
- A text alternative (table, list, or directions) is present alongside the map.
- Color is not the only means of conveying information.
- Color contrast requirements are met for all labels and controls.
- Manual keyboard and screen reader checks pass.
- No blocking accessibility defects remain.

---

## References

### Standards

- [WCAG 2.2 Success Criterion 1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html) — Text alternatives for images including maps
- [WCAG 2.2 Success Criterion 1.3.3 Sensory Characteristics](https://www.w3.org/WAI/WCAG22/Understanding/sensory-characteristics.html) — Do not rely on shape, color, or location alone
- [WCAG 2.2 Success Criterion 1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html) — Color not the sole conveyor of information
- [WCAG 2.2 Success Criterion 1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) — Text contrast 4.5:1 minimum
- [WCAG 2.2 Success Criterion 2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html) — All functionality operable via keyboard
- [WCAG 2.2 Success Criterion 2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html) — Logical focus order
- [WCAG 2.2 Success Criterion 2.4.11 Focus Appearance](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html) — Visible focus indicators

### Guidance and Community Resources

- [Rick Hansen Foundation — Accessible Map](https://www.rickhansen.com/MAP) — Accessibility mapping resources
- [Sparkgeo — The Accessibility of Web Maps](https://sparkgeo.com/blog/the-accessibility-of-web-maps/) — Practical guidance for web map accessibility
- [AccessibilityOz — Interactive Map Accessibility Principles](https://www.accessibilityoz.com/factsheets/interactive-maps/interactive-map-accessibility-principles/) — Interactive map accessibility factsheet
- [maptime/map-accessibility-guidelines](https://github.com/maptime/map-accessibility-guidelines) — Community-developed map accessibility guidelines
- [University of Virginia Libraries — Web Accessibility and Maps](https://guides.lib.virginia.edu/c.php?g=1248895) — Library guidance on accessible maps
- [W3C COGA — Technology-Assisted Indoor Navigation](https://w3c.github.io/coga/research-modules/Technology-Assisted-Indoor-Navigation-and-Wayfindings.html) — Research on accessible indoor navigation

### Open Source Map Accessibility Projects

- [mgifford/a11y-maps](https://github.com/mgifford/a11y-maps) — Related accessibility maps project
- [DEFRA/interactive-map](https://github.com/DEFRA/interactive-map) — Accessible interactive map component
- [sammyhawkrad/accessible-map](https://github.com/sammyhawkrad/accessible-map) — Accessible map implementation reference
- [openindoormaps/openindoormaps](https://github.com/openindoormaps/openindoormaps) — Open indoor maps project
- [AccessibleMaps/IndoorOSMtoSITConverter](https://github.com/AccessibleMaps/IndoorOSMtoSITConverter) — Indoor map data conversion for accessibility
- [Accessible-InfoPoint/2.5D-Indoor-Maps](https://github.com/Accessible-InfoPoint/2.5D-Indoor-Maps) — Research project on accessible 2.5D indoor maps

### Machine-Readable Standards

For AI systems and automated tooling, see [wai-yaml-ld](https://github.com/mgifford/wai-yaml-ld) for structured accessibility standards:

- [WCAG 2.2 (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wcag-2.2-normative.yaml) — Machine-readable WCAG 2.2 normative content including non-text content and sensory characteristics criteria
- [ARIA Informative (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wai-aria-informative.yaml) — ARIA roles and properties relevant to map widgets
- [Standards Link Graph (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/standards-link-graph.yaml) — Relationships across WCAG/ARIA/HTML standards
