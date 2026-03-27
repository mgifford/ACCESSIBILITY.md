# Maps Accessibility Skill

> **Canonical source**: `examples/MAPS_ACCESSIBILITY_BEST_PRACTICES.md`
> This skill is derived from that file. When in doubt, the example is authoritative.

Apply these rules when implementing or reviewing any static or interactive map.

---

## Core Mandate

All users must access the essential information conveyed by a map through accessible alternatives, keyboard-operable controls, and clear structured content.

---

## Required: Text Alternatives for Static Maps

```html
<!-- Simple map -->
<img src="campus-map.png"
  alt="Campus map: main entrance on Elm Street, library to the north, parking to the east.">

<!-- Complex map -->
<figure>
  <img src="regional-map.png"
    alt="Regional accessibility map — detailed description below."
    aria-describedby="map-desc">
  <figcaption id="map-desc">
    <p>The map shows three accessible transit routes through the downtown core.
    Route A runs north–south on Main Street with level boarding at all stops...</p>
  </figcaption>
</figure>
```

Never leave `alt` empty for a meaningful map. Include: purpose, key features/routes, directional relationships, color/symbol meanings.

---

## Required: Skip Link Before Interactive Maps

```html
<a href="#map-skip-target" class="skip-link">Skip map</a>

<div id="map-container" aria-label="Interactive campus map">
  <!-- map renders here -->
</div>

<div id="map-skip-target" tabindex="-1">
  <h2>Map information as text</h2>
  <!-- structured text equivalent -->
</div>
```

---

## Required: Keyboard Controls

All mouse/touch map interactions must be keyboard-operable:
- Pan: arrow keys
- Zoom in/out: `+`/`-` keys or accessible buttons
- Marker activation: `Enter` or `Space` on focused markers
- Close popups: `Escape`

```html
<div role="group" aria-label="Map zoom controls">
  <button type="button" aria-label="Zoom in">+</button>
  <button type="button" aria-label="Zoom out">−</button>
  <button type="button" aria-label="Reset to default view">⟳</button>
</div>
```

---

## Required: ARIA Landmark Structure

```html
<section aria-labelledby="map-heading">
  <h2 id="map-heading">Service Area Map</h2>
  <div role="application" aria-label="Interactive service area map">
    <!-- map -->
  </div>
</section>
```

Use `role="application"` sparingly — only when the map delivers rich interactive widget experience with comprehensive keyboard support.

---

## Required: Accessible Markers & Popups

```html
<!-- Marker as accessible button -->
<button type="button" aria-label="City Hall — open weekdays 9am to 5pm">
  <svg aria-hidden="true" focusable="false"><!-- pin icon --></svg>
</button>

<!-- Rich popup as dialog -->
<div role="dialog" aria-labelledby="popup-title" aria-modal="true">
  <h3 id="popup-title">City Hall</h3>
  <p>123 Main Street. Open Monday–Friday, 9am–5pm.</p>
  <a href="/city-hall">More information</a>
  <button type="button" aria-label="Close City Hall popup">✕</button>
</div>
```

Focus management: move focus into popup on open; restore to triggering marker on close.

---

## Required: Layer Toggles

```html
<fieldset>
  <legend>Map layers</legend>
  <label><input type="checkbox" name="layer-transit" checked> Transit routes</label>
  <label><input type="checkbox" name="layer-a11y"> Accessibility features</label>
</fieldset>
```

---

## Required: Color Independence

- Never rely on color alone for route/zone differentiation
- Provide legend with text labels for all color-coded elements
- Test in forced-colors / Windows High Contrast mode
- Map text labels: 4.5:1 contrast; UI controls: 3:1

---

## Required: Structured Text Alternative

For maps showing location lists, provide an adjacent accessible table:
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
    <tr><td>Central Library</td><td>100 Main St</td><td>Ramp, elevator, braille signage</td></tr>
  </tbody>
</table>
```

---

## Definition of Done Checklist

- [ ] Static maps have meaningful text alternative
- [ ] Skip link provided before interactive map
- [ ] All map interactions keyboard-operable
- [ ] Zoom/pan controls have accessible labels
- [ ] Markers are keyboard-focusable with accessible names
- [ ] Popup dialogs managed with focus trap and `Escape` to close
- [ ] Layer toggles use semantic checkboxes
- [ ] Color not used as sole differentiator; legend provided
- [ ] Structured text alternative or table adjacent to complex map
- [ ] Tested in forced-colors mode

---

## Key WCAG Criteria

- 1.1.1 Non-text Content (A)
- 1.4.1 Use of Color (A)
- 1.4.3 Contrast Minimum (AA)
- 2.1.1 Keyboard (A)
- 2.4.3 Focus Order (A)
- 4.1.2 Name, Role, Value (A)

---

## References

- [Full best practices guide](../../examples/MAPS_ACCESSIBILITY_BEST_PRACTICES.md)
- [Curated reference sources](references/references.md)
