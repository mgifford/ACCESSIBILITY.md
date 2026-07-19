---
title: Maps Accessibility Best Practices
---

# Maps Accessibility Best Practices

## Purpose

Maps can communicate locations, routes, boundaries, quantities, relationships,
and changes over time. They can also support tasks such as finding a service,
choosing an accessible route, comparing regions, or exploring spatial data.

No single text description works for every map. Start with the map's purpose and
the tasks it supports, then provide accessible content and controls that preserve
that purpose for people who cannot see, distinguish, point at, drag, zoom, or
interpret the visual map.

This guide covers static and interactive maps, map alternatives, markers,
clusters, controls, search, routes, indoor wayfinding, embedded maps, visual
design, keyboard and pointer operation, low-vision support, and testing. It
targets WCAG 2.2 Level AA and identifies relevant Level AAA practices.

## Core Principles

1. Define the map's purpose before choosing an alternative.
2. Make essential information and tasks available without perceiving or
   operating the visual map.
3. Keep the map and its structured alternative synchronized from the same data.
4. Use native HTML controls and content outside the map whenever possible.
5. Do not rely on color, shape, position, dragging, pinching, or hover alone.
6. Preserve ordinary browser, keyboard, screen reader, speech input, zoom, and
   page-scrolling behavior.
7. Avoid `role="application"` unless a rare, thoroughly tested use case requires
   application-mode interaction.
8. Do not make every marker a separate Tab stop when a map contains many
   locations.
9. Give users a visible, direct path to the location list, data table,
   directions, or other non-map view.
10. Test task completion, not only the presence of attributes.

## Classify the Map and Its Purpose

Document the map's primary purpose before implementation.

| Map purpose | Essential information or task | Common accessible presentation |
|---|---|---|
| Simple locator | Where one place is and how to reach it | Concise image alternative, address, nearby landmark, directions, and contact information |
| Location directory | Find and compare services or facilities | Searchable list or table with names, addresses, distances, categories, and relevant accessibility information |
| Route or wayfinding map | Travel from a start point to a destination | Ordered directions with distances, turns, landmarks, route conditions, and accessible alternatives |
| Thematic or quantitative map | Compare values across geographic areas | Summary of findings and a data table with region names, values, units, and time period |
| Boundary or zoning map | Understand containment, adjacency, or jurisdiction | Named boundary descriptions, affected locations, attributes, and downloadable structured data |
| Indoor or multi-floor map | Navigate a building or complex | Floor selector, accessible route instructions, landmarks, entrances, lifts, stairs, doors, surfaces, and current barriers |
| Exploratory map | Investigate many spatial features and relationships | Synchronized filters, structured results, descriptions of spatial relationships, and accessible query tools |

A map can have more than one purpose. Provide the alternatives needed for every
essential task rather than assuming that a short `alt` value, table, or set of
directions is universally equivalent.

## Equivalent Purpose

WCAG 1.1.1 requires a text alternative that serves the equivalent purpose of
non-text content. Equivalent purpose does not mean reproducing every pixel,
tile, street label, or decorative feature. It means preserving the information
and tasks that matter in context.

For each map, identify:

- the question the map is intended to answer;
- the tasks users must complete;
- the geographic scope, orientation, and scale;
- the important places, areas, routes, and categories;
- spatial relationships such as near, inside, connected, upstream, or adjacent;
- values, units, ranges, and trends encoded visually;
- conditions that affect accessibility or safety;
- the data source, date, and known limitations; and
- the effect of filters, layers, searches, and selections.

Then verify that a person using the non-visual presentation can complete the
same essential tasks and reach the same conclusions.

### Research framework

The 2026 paper
[Systematically Evaluating Equivalent Purpose for Digital Maps](https://arxiv.org/abs/2512.05310)
proposes a Map Equivalent-Purpose Framework covering generalized information,
spatial information, and spatial relationships. It found that traditional
tables and turn-by-turn directions can be insufficient when the map's purpose
includes broad spatial understanding or exploration.

Treat this as research guidance, not as a separate WCAG success criterion. A
table can be equivalent for finding and comparing offices. Directions can be
equivalent for following a route. A map intended to support open spatial
exploration may need additional descriptions, queries, sonification, tactile
output, or another accessible spatial interface.

## Static Maps

### Simple informative map

Use a concise alternative that communicates the map's purpose and important
relationships. Put actionable details in ordinary HTML.

```html
<figure>
  <img src="clinic-location.png"
       alt="The clinic is on the north side of King Street, immediately east of the Central Station entrance."
       width="960"
       height="540">
  <figcaption>
    Northside Clinic, 200 King Street. The step-free entrance is on King Street.
    <a href="#clinic-directions">Read accessible travel directions</a>.
  </figcaption>
</figure>
```

Do not fill `alt` with turn-by-turn instructions, every road label, or visual
styling. Keep the alternative concise and provide detailed content nearby.

### Complex static map

W3C guidance treats maps that convey substantial information as complex
images. Provide both:

- a short alternative identifying the map and its purpose; and
- a visible, structured long description or clearly associated link.

```html
<figure>
  <img src="accessible-transit-routes.png"
       alt="Map of step-free transit routes in the downtown area. Detailed route information follows."
       width="1200"
       height="800">
  <figcaption>
    Step-free transit routes, updated 15 July 2026.
    <a href="#transit-route-details">View route details and connections</a>.
  </figcaption>
</figure>

<section id="transit-route-details" aria-labelledby="transit-route-heading">
  <h2 id="transit-route-heading">Step-free transit route details</h2>
  <p>
    Three routes connect Central Station, City Hall, the library, and Central
    Hospital. Routes 2 and 8 intersect at City Hall.
  </p>
  <!-- Use a list or table for the complete route and stop information. -->
</section>
```

Prefer visible structured content because everyone can navigate, enlarge,
translate, copy, and search it. `aria-describedby` can be suitable for a plain
text description, but assistive technologies generally expose referenced
headings, lists, and tables as one flattened description. Do not use it as the
only access to a complex structured alternative.

### Redundant and decorative maps

Use `alt=""` when an image is purely decorative. It can also be appropriate
when the same map information is already completely and immediately available
in nearby HTML and the image adds no additional purpose for non-visual users.

Decorative maps must not contain interactive descendants or expose unnecessary
keyboard stops. Do not call a meaningful or interactive map decorative simply
to hide accessibility problems.

## Structured Alternatives

The alternative format must match the task. A map may need several formats.

### Location list or table

For directories, provide the same locations, filters, status, and relevant
attributes outside the visual map.

```html
<table id="branch-table">
  <caption>Library branches matching the current filters</caption>
  <thead>
    <tr>
      <th scope="col">Branch</th>
      <th scope="col">Address</th>
      <th scope="col">Distance</th>
      <th scope="col">Accessibility information</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row"><a href="/branches/central">Central Library</a></th>
      <td>100 Main Street</td>
      <td>600 metres</td>
      <td>Step-free entrance, lift, accessible washroom, hearing loop</td>
    </tr>
    <tr>
      <th scope="row"><a href="/branches/eastside">Eastside Branch</a></th>
      <td>450 Oak Avenue</td>
      <td>1.4 kilometres</td>
      <td>Step-free entrance and accessible washroom</td>
    </tr>
  </tbody>
</table>
```

- Explain how distance was calculated.
- Include units and do not rely on row position to communicate proximity.
- Preserve the selected filters and sort order in the list or table.
- Let users open the same details and perform the same actions from both views.
- Use pagination or result summaries when hundreds of markers would make the
  alternative difficult to navigate.

### Route directions

Route alternatives need more than a start and destination.

```html
<section id="clinic-directions" aria-labelledby="directions-heading">
  <h2 id="directions-heading">Step-free route from Central Station</h2>
  <p>Distance: 350 metres. Typical travel time: 6 to 10 minutes.</p>
  <ol>
    <li>Leave Central Station through the King Street step-free exit.</li>
    <li>Turn left and continue east for approximately 250 metres.</li>
    <li>Cross Queen Avenue at the signal-controlled crossing with curb cuts.</li>
    <li>Continue for 80 metres. The clinic entrance is on the left after the pharmacy.</li>
  </ol>
  <p>
    Route data checked 15 July 2026. Call 555-0100 to confirm temporary lift or
    entrance closures.
  </p>
</section>
```

Include, as applicable:

- distances and expected travel time;
- street names, landmarks, turns, and decision points;
- curb cuts, crossings, gradients, surfaces, widths, and steps;
- accessible entrances, lifts, ramps, and washrooms;
- known construction, closures, or temporary barriers;
- transit stop and platform information; and
- an alternative route when the shortest route is not accessible.

Do not rely only on cardinal directions. Combine direction with street names,
distances, sequence, and recognizable landmarks.

### Thematic and quantitative maps

Provide:

- a plain-language summary of the main finding;
- a data table with every value needed for comparison;
- region names, categories, units, ranges, and missing-data indicators;
- the time period and data source; and
- access to structured data when practical.

Do not replace a choropleth map with a list of color names. Explain what the
encoded ranges mean and expose the underlying values.

### Legends

A legend is part of the map's content, not decoration.

- Put legend text in HTML when possible.
- Describe the meaning of colors, symbols, patterns, line styles, and sizes.
- Keep legend changes synchronized with active layers and filters.
- Do not use the legend as the only structured alternative.
- Make interactive legend controls native buttons, checkboxes, or radio
  buttons.

## Interactive Map Structure

Keep the page structure understandable before the map library loads.

```html
<section aria-labelledby="service-map-heading">
  <h2 id="service-map-heading">Find an accessible service location</h2>
  <p>
    Search or filter the locations, then use either the interactive map or the
    synchronized results list.
  </p>
  <p>
    <a href="#location-results-heading">Skip the interactive map and view locations</a>
  </p>

  <form role="search" aria-label="Service locations">
    <label for="location-query">Location or address</label>
    <input id="location-query"
           name="query"
           type="search">
    <button type="submit">Search locations</button>
  </form>

  <div class="map-interface">
    <h3 id="map-view-heading">Interactive map</h3>
    <p id="map-instructions">
      Use the named map controls to move or zoom. The locations list contains
      every result shown on the map.
    </p>
    <div id="map-viewport"
         role="region"
         aria-labelledby="map-view-heading"
         aria-describedby="map-instructions">
      <!-- The tested map library renders the map and its controls here. -->
    </div>
  </div>

  <section aria-labelledby="location-results-heading">
    <h3 id="location-results-heading" tabindex="-1">Location results</h3>
    <p id="location-result-status" role="status" aria-atomic="true"></p>
    <ul id="location-results">
      <!-- Render the same locations represented by map markers. -->
    </ul>
  </section>
</section>
```

The map region's accessible name describes the interface, not every marker.
Do not duplicate the same heading through both `aria-label` and
`aria-labelledby`.

The visible link to results is useful to screen reader, keyboard, switch,
speech-input, mobile, low-bandwidth, and cognitively disabled users. Do not
reveal it only on keyboard focus if the alternative is useful to everyone.

### Avoid `role="application"`

Most maps do not need `role="application"`. It can change screen reader
interaction modes and suppress ordinary reading commands.

Prefer:

- native controls around the map;
- ordinary document content for results and details;
- a named region for the viewport; and
- documented, scoped keyboard behavior only where the viewport needs it.

Use application semantics only when the team understands the screen reader
consequences, has implemented a complete keyboard model, provides instructions
and an exit path, and has tested the supported combinations. Adding the role
does not make a map accessible.

## Map Controls

### Use named native controls

Provide buttons for functions that would otherwise require a pointer gesture
or dragging movement.

```html
<div class="map-controls" role="group" aria-labelledby="map-controls-heading">
  <h3 id="map-controls-heading">Map view controls</h3>
  <button type="button">Zoom in</button>
  <button type="button">Zoom out</button>
  <button type="button">Pan north</button>
  <button type="button">Pan west</button>
  <button type="button">Reset map view</button>
  <button type="button">Pan east</button>
  <button type="button">Pan south</button>
</div>
```

Visible text makes controls easier to understand and operate by speech. If the
design uses an icon, keep the visible tooltip or adjacent label available by
keyboard, touch, and pointer, and include the visible wording in the accessible
name.

### Target size

WCAG 2.5.8 Target Size (Minimum) requires a target of at least 24 by 24 CSS
pixels or satisfaction of a listed exception. It does not impose a universal
44 by 44 minimum at Level AA.

Use at least 44 by 44 CSS pixels for primary map controls as an inclusive
practice and to align with the Level AAA Target Size (Enhanced) criterion.
Markers can be visually small while a larger transparent hit area provides an
adequate target, as long as hit areas do not overlap in a way that creates
ambiguous activation.

```css
.map-controls button {
  min-inline-size: 44px;
  min-block-size: 44px;
}
```

### Layers and filters

Use native controls and visible labels.

```html
<fieldset>
  <legend>Locations to show</legend>
  <label>
    <input type="checkbox" name="category" value="clinic" checked>
    Clinics
  </label>
  <label>
    <input type="checkbox" name="category" value="pharmacy">
    Pharmacies
  </label>
  <label>
    <input type="checkbox" name="step-free" value="yes">
    Step-free entrance
  </label>
</fieldset>
```

When a filter changes the markers, update the structured results from the same
state. Announce a concise result summary such as "12 locations shown." Do not
announce every marker added, tile loaded, pan movement, or zoom frame.

## Keyboard Interaction

All map functionality must be available from a keyboard interface unless the
underlying movement is essential under WCAG's limited exception.

- Users can reach every control in a logical order.
- Native buttons operate with `Enter` and `Space`.
- Focus is visible and is not obscured by floating controls or popups.
- Users can move into and out of the map without a keyboard trap.
- Panning, zooming, selecting features, changing layers, searching, and opening
  details have keyboard paths.
- Rerendering the map does not discard focus or move it to the document body.
- Full-screen mode has an obvious exit control and returns focus logically.

### Arrow keys and shortcuts

Do not capture page-level arrow keys merely because a map is present. If arrow
keys pan a viewport, activate that behavior only while the viewport has focus
and provide nearby instructions. Users must still be able to press `Tab` or
`Shift` plus `Tab` to leave.

If single-character shortcuts such as `+` or `-` work outside a focused
component, meet WCAG 2.1.4 by allowing users to turn them off, remap them, or
limiting them to when the relevant component has focus. Always provide named
buttons as an alternative.

### Large marker sets

Hundreds of markers must not create hundreds of sequential Tab stops. Choose a
tested interaction model such as:

- one map-viewport Tab stop with documented directional navigation;
- a roving `tabindex` pattern within the current marker set;
- focusable markers only after a user narrows results; or
- a structured location list as the primary keyboard interface.

There is no universal WAI-ARIA map pattern. Document the chosen behavior and
test it with users. Do not invent a composite role that misrepresents the map.

## Markers, Clusters, and Details

### Markers

Each interactive marker needs a concise, unique accessible name that identifies
the place or feature. Include a visible label in the accessible name when one
is displayed.

```html
<button type="button"
        class="map-marker"
        aria-label="City Hall, 123 Main Street"
        aria-expanded="false"
        aria-controls="city-hall-details">
  <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
    <!-- Marker artwork -->
  </svg>
</button>

<section id="city-hall-details"
         aria-labelledby="city-hall-heading"
         hidden>
  <h3 id="city-hall-heading">City Hall</h3>
  <p>123 Main Street. Step-free entrance on Queen Avenue.</p>
  <a href="/locations/city-hall">City Hall details</a>
</section>
```

The implementation must update both `hidden` and `aria-expanded`. The example
uses ordinary non-modal content. Do not add `role="dialog"` or
`aria-modal="true"` to every marker popup.

If a popup contains interactive content, define a predictable focus strategy.
Moving focus can be appropriate when the user explicitly opens a substantial
detail panel. It is usually disruptive for a small label or preview. If focus
moves, provide a close control and return focus to the triggering marker or
equivalent result item.

### Clusters

Clusters need an accessible name, a count, a meaningful location or category,
and a keyboard action.

```html
<button type="button"
        aria-expanded="false"
        aria-controls="downtown-location-results">
  Show 7 locations in downtown
</button>
```

After expansion:

- update `aria-expanded`;
- update the map and structured results together;
- preserve focus on the cluster control or move it only to a predictable
  results heading after an explicit user action; and
- announce a concise result summary rather than every marker.

Do not put instructions such as "press Enter" in a native button's name.
Its role already communicates how it operates.

## Search, Geocoding, and Geolocation

### Prefer a simple search first

A labeled search form followed by a status message and ordinary links is easier
to implement and use than a custom autocomplete widget.

```html
<form role="search" aria-labelledby="map-search-heading">
  <h2 id="map-search-heading">Search service locations</h2>
  <label for="map-search">Address, postal code, or place</label>
  <input id="map-search"
         name="query"
         type="search">
  <button type="submit">Search</button>
</form>

<p id="search-status" role="status" aria-atomic="true"></p>
<ul id="search-results">
  <!-- Use ordinary links or buttons for results. -->
</ul>
```

If suggestions are necessary, implement and test the complete WAI-ARIA
combobox pattern, including `aria-expanded`, `aria-controls`, option state,
active-descendant or focus behavior, keyboard interaction, selection, and
escape behavior. Adding `role="listbox"` and `aria-autocomplete` to an
otherwise incomplete widget is not sufficient.

### Search behavior

- Accept multiple useful forms of location input.
- Explain errors and offer corrections without clearing the query.
- Announce a concise result count or no-results message.
- Keep results keyboard navigable as ordinary content.
- Do not move focus on every keystroke.
- Identify ambiguous addresses and let the user choose.
- Expose distance units and the origin used for distance calculations.
- Preserve the query and filters when switching between map and list views.

### Geolocation

- Request location permission only after a clear user action.
- Explain why location is requested and how it will be used.
- Provide address or place search when permission is denied or unavailable.
- Handle inaccurate or stale locations without blaming the user.
- Do not require precise geolocation for a task that can use manual input.

## Pointer, Touch, and Dragging

Maps commonly depend on pinch, rotate, swipe, and drag gestures. These cannot
be the only way to operate essential functions.

- Provide zoom buttons as alternatives to pinch gestures.
- Provide pan controls, search, or location selection as alternatives to
  dragging the map.
- Provide a button or menu action as an alternative to dragging a marker or
  route point.
- Let users activate markers and controls with a single pointer.
- Avoid actions that fire on pointer-down when they can be completed on
  pointer-up, allowing cancellation.
- Keep controls separated and large enough for users with limited dexterity.

An embedded map must not create a page-scrolling trap. Users need a reliable
way to scroll past it without performing an undocumented multi-finger gesture.
Consider requiring an explicit "Use interactive map" action before the map
captures drag or wheel gestures, especially on small screens.

## Low Vision, Zoom, Reflow, and Orientation

Browser zoom and map zoom are different. Support both.

- Browser zoom enlarges controls, labels, instructions, and alternatives.
- Map zoom changes geographic scale and displayed features.
- Do not override browser zoom or pinch-to-zoom at the page level.
- Keep map controls and alternatives available at 200 percent and 400 percent
  browser zoom.
- Preserve content in portrait and landscape orientations.
- Avoid fixed-height layouts that hide controls when text grows.

WCAG 1.4.10 includes an exception for content requiring a two-dimensional
layout for meaning or use. A map viewport can require two-dimensional panning.
This does not exempt the surrounding controls, search, status, details,
directions, and location results from reflow requirements.

Provide a full-screen or enlarged view when useful, but do not make it the only
accessible path. Full-screen controls must remain keyboard and touch operable.

## Color, Contrast, and Visual Encoding

### Do not rely on color alone

Combine color with labels, patterns, line styles, symbols, sizes, or direct
values. Examples include:

- route numbers and distinct line styles in addition to route colors;
- icons and text labels in addition to marker colors;
- hatching or boundary styles in addition to area fills; and
- numeric values in the alternative data table.

Do not use color alone to indicate selected markers, accessible routes,
closures, hazards, or severity.

### Apply contrast requirements accurately

- Authored normal-size text generally needs at least 4.5 to 1 contrast.
- Large text generally needs at least 3 to 1 contrast.
- Visual information required to identify authored controls, their states, and
  meaningful graphical objects generally needs at least 3 to 1 contrast
  against adjacent colors under WCAG 1.4.11.
- Focus indicators need enough contrast to remain visible against the colors
  they touch.

Do not claim that every pixel, aerial photograph, terrain feature, or incidental
label in a map must meet one universal ratio. Evaluate the authored information
needed to understand and operate the map, and always provide the structured
alternative.

### Forced colors and user preferences

- Test controls, focus indicators, markers, routes, selected states, and
  legends in forced-colors mode.
- Do not disable forced-color adjustments broadly.
- Ensure the location list and directions remain complete if map tiles,
  gradients, or background imagery disappear.
- Respect increased text spacing, browser colors, dark presentation, and
  reduced-motion preferences.
- Avoid animated panning or zooming when an immediate update works.

## Canvas and SVG Maps

Canvas pixels have no child semantics. If a map is drawn on `<canvas>`, provide
accessible DOM controls, results, names, states, details, and alternatives
outside or in a tested fallback structure. Do not assume screen readers can
inspect painted markers.

For SVG maps:

- give a non-interactive SVG map an appropriate accessible name and
  description;
- keep decorative paths out of the accessibility tree;
- make interactive regions programmatically focusable and named;
- expose state and relationships through supported HTML or SVG semantics; and
- provide a structured alternative for large or spatially complex SVG maps.

See the project's
[SVG Accessibility Best Practices](./SVG_ACCESSIBILITY_BEST_PRACTICES.md)
for detailed SVG guidance.

## Indoor Maps and Wayfinding

Indoor wayfinding depends on current, detailed information.

Provide, as applicable:

- building, entrance, floor, and destination names;
- accessible entrances and their hours;
- lift, stair, escalator, ramp, and platform locations;
- corridor widths, door types, thresholds, gradients, surfaces, and lighting;
- washrooms, refuge areas, service counters, and assistance points;
- landmarks and distances between decision points;
- temporary lift outages, construction, locked doors, or route closures; and
- the source and last verification date.

### Floor selection

Use a native control and update both the map and its alternative.

```html
<label for="floor-select">Building floor</label>
<select id="floor-select">
  <option value="ground">Ground floor: entrance, reception, cafe</option>
  <option value="1">Floor 1: offices and meeting rooms 101 to 120</option>
  <option value="2">Floor 2: library and training rooms 201 to 210</option>
</select>

<p id="floor-status" role="status" aria-atomic="true"></p>
```

On change, update the floor heading, locations, directions, and map together.
A concise status such as "Ground floor shown, 8 locations" can confirm the
result. Do not rely on a live region as a substitute for updating the visible
content.

Real-time positioning is an enhancement, not the only navigation method.
Indoor location can be inaccurate, unavailable, or difficult to interpret.
Offer static directions, assistance information, and a way to report outdated
route data.

## Embedded and Third-Party Maps

The content owner remains responsible for the experience delivered through an
embedded map.

```html
<iframe
  src="https://maps.example.org/embed/service-locations"
  title="Interactive map of service locations"
  loading="lazy">
</iframe>

<p>
  <a href="#service-location-list">View service locations as a list</a>
  or
  <a href="/service-locations.csv">download the location data</a>.
</p>
```

- Give each iframe a concise, unique title.
- Make iframe sizing responsive without clipping controls or enlarged text.
- Confirm keyboard users can enter, operate, and leave the embed.
- Test controls, markers, popups, consent notices, and full-screen mode.
- Keep the structured alternative outside the iframe and available when the
  provider fails or is blocked.
- Confirm changes made in the embed are reflected in the site's alternative.
- Retest after provider, plugin, style, or configuration updates.

Do not rely on a provider's accessibility claim, conformance report, or default
configuration without testing the current rendered experience.

### Map libraries

Preserve a library's accessibility defaults unless testing supports a change.
For example, Leaflet's current accessibility guidance states that its map
container and markers are keyboard operable by default and that markers need
descriptive alternatives. Plugins can change or degrade that behavior.

Use the latest stable version allowed by the project, pin the version for
repeatable builds, review release notes, and retest after updates. Do not
recommend a plugin as universally accessible or use unpinned `@latest`
dependencies in production examples.

## Dynamic Updates and Status Messages

Use live status messages selectively for completed, user-requested results:

- search result count;
- no results;
- selected floor or layer with result count;
- route calculation completed or failed; and
- cluster expansion result count.

Do not announce:

- every map tile load;
- continuous coordinates while panning;
- every zoom animation frame;
- every marker entering or leaving the viewport; or
- duplicated visual and list updates separately.

Keep important results visible in headings, lists, tables, and detail sections.
A live region confirms a change but does not replace persistent content.

## Data Quality and Accessibility Information

Accessible presentation cannot correct inaccurate geographic data.

- Identify the source and last update date.
- Explain whether distances are straight-line, walking, driving, or transit.
- Distinguish verified accessibility information from user-submitted or
  inferred information.
- Provide a way to report errors and temporary barriers.
- Preserve missing or unknown values rather than presenting them as "No."
- Avoid absolute route claims when conditions can change.
- Include contact information when a critical accessibility feature should be
  confirmed before travel.

## Testing

### Equivalent-purpose and task testing

Test the visual map and structured alternative separately.

1. List the map's documented purposes and essential tasks.
2. Complete each task using the visual map.
3. Complete each task using only the structured alternative and non-map
   controls.
4. Compare the information, results, actions, and conclusions available.
5. Test with blind, low-vision, mobility-disabled, cognitively disabled, and
   DeafBlind users as appropriate to the map and audience.

Do not evaluate equivalence only by counting labels or checking that a table
exists.

### Keyboard testing

- Reach and operate search, filters, layers, map controls, markers, clusters,
  details, results, and full-screen mode.
- Confirm focus order is logical and focus remains visible.
- Verify focus is not hidden by floating controls or popups.
- Confirm map updates do not lose focus.
- Enter and leave the viewport and embedded map without a trap.
- Test any scoped arrow keys and shortcuts against documented behavior.
- Confirm the structured alternative supports the same actions.

### Screen reader testing

Test supported browser, operating system, map-library, and assistive-technology
combinations. Record versions and relevant settings.

- Navigate the page by headings, landmarks, forms, links, and controls.
- Confirm map controls, markers, clusters, states, and results have useful
  names and roles.
- Verify status messages are concise and not repeated excessively.
- Read structured descriptions, tables, directions, and details independently
  of the map.
- Confirm opening and closing details does not cause unexpected focus changes.

Do not publish a fixed table promising identical map behavior from named screen
readers. Support changes with browser, library, plugin, and assistive-technology
versions.

### Visual and low-vision testing

- Test browser zoom at 200 percent and 400 percent.
- Test narrow viewports and both orientations.
- Test text spacing and enlarged default fonts.
- Test light, dark, and forced-colors presentations.
- Confirm important labels do not disappear or overlap.
- Verify selected states, routes, boundaries, and focus indicators remain
  distinguishable without color alone.
- Confirm the structured alternative remains usable when map imagery is hidden.

### Pointer and touch testing

- Complete every task with a single pointer.
- Operate zoom and pan without pinch or drag.
- Verify alternatives to dragging markers or route points.
- Check target size, spacing, overlap, and pointer cancellation.
- Scroll the page past the map without an interaction trap.
- Test supported touch and switch-control environments.

### Data and integration testing

- Compare marker count and content with the structured results.
- Apply every filter and confirm both views remain synchronized.
- Verify distances, units, coordinates, routes, and accessibility attributes.
- Test empty, loading, error, offline, permission-denied, and provider-failure
  states.
- Test third-party embeds without editor or administrator privileges.
- Retest after data, basemap, library, plugin, or provider updates.

### Automated checks

Automation can help detect:

- missing iframe titles;
- unnamed buttons and form controls;
- invalid ARIA attributes and duplicate IDs;
- focus-order regressions in component tests;
- color-contrast issues in authored controls;
- missing static-image alternatives;
- map and list record-count mismatches; and
- inaccessible loading or error states.

Automation cannot determine equivalent purpose, direction accuracy, route
accessibility, spatial comprehension, popup usability, or third-party keyboard
behavior. Manual and user testing are required.

## Common Failures

| Failure | Correction |
|---|---|
| Using one generic `alt="Map"` | Describe the map's purpose and provide the task-appropriate structured alternative |
| Repeating every visual label without identifying the map's purpose | Preserve essential tasks, spatial information, relationships, and conclusions |
| Assuming a table or directions are always fully equivalent | Match the alternative to the documented purpose and add spatial descriptions or interfaces when needed |
| Giving a complex table through `aria-describedby` | Provide visible, navigable HTML or a clearly associated link |
| Adding `role="application"` to the map by default | Use named regions, native controls, ordinary content, and scoped keyboard behavior |
| Capturing arrow keys while focus is elsewhere on the page | Scope map keys to the focused viewport and provide named controls |
| Making every marker a Tab stop | Use a tested navigation model and synchronized location list |
| Making every popup an `aria-modal="true"` dialog | Use ordinary non-modal details unless the interaction is genuinely modal |
| Putting instructions such as "press Enter" in button names | Give the button a concise action name and rely on native semantics |
| Building an incomplete custom listbox for search | Use a simple search and results list or implement the complete combobox pattern |
| Claiming WCAG AA universally requires 44 by 44 targets | Apply the 24 by 24 Level AA criterion and use 44 by 44 as an inclusive or Level AAA target |
| Treating 2.4.11 as Focus Appearance | Identify it as Focus Not Obscured; Focus Appearance is 2.4.13 at Level AAA |
| Requiring pinch or drag | Provide single-pointer buttons and selection alternatives |
| Applying one contrast ratio to every map pixel | Test essential authored text, controls, states, and graphical objects accurately |
| Hiding an interactive map as decorative | Remove interaction or expose accessible controls, information, and alternatives |
| Announcing every pan, tile, or marker update | Announce concise completed task results and keep persistent content visible |
| Trusting a map provider or plugin without testing | Test the current configured version and preserve an external structured alternative |
| Letting the map and location list use different data | Generate both from the same source and state |

## Definition of Done

- [ ] The map's purpose, audience, and essential tasks are documented.
- [ ] The map type and required alternative formats are identified.
- [ ] A person who does not use the visual map can complete every essential
  task.
- [ ] Static maps have appropriate concise alternatives and complex
  descriptions.
- [ ] Location lists, tables, data, and directions are visible, structured, and
  easy to find.
- [ ] Map and non-map views use the same data, filters, selections, and result
  state.
- [ ] Search, filters, layers, controls, markers, clusters, and details have
  appropriate names, roles, states, and keyboard behavior.
- [ ] The map does not use `role="application"` without documented need and
  testing.
- [ ] Large marker sets do not create an excessive sequential Tab order.
- [ ] Users can enter, operate, and leave the map and embeds without a trap.
- [ ] Pinch, path gestures, and dragging have single-pointer alternatives.
- [ ] Targets meet WCAG 2.5.8, with 44 by 44 CSS pixels used where practical.
- [ ] Color, position, shape, or visual styling is not the only way information
  is conveyed.
- [ ] Text, controls, states, focus indicators, and essential graphical objects
  meet applicable contrast requirements.
- [ ] Controls and alternatives work at 200 percent and 400 percent browser
  zoom and on narrow viewports.
- [ ] The map remains usable in forced-colors mode, or the complete structured
  alternative remains available.
- [ ] Status messages are concise and persistent results remain in the page.
- [ ] Embedded maps have useful titles and alternatives outside the iframe.
- [ ] Source, date, units, limitations, and uncertain accessibility data are
  identified.
- [ ] Keyboard, screen reader, low-vision, touch, pointer, error-state, and
  equivalent-purpose tests have been completed.
- [ ] People with relevant disabilities have tested essential map tasks.
- [ ] Automated checks supplement, but do not replace, manual and user testing.

## Related WCAG Criteria

### Content and structure

- [1.1.1 Non-text Content (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html)
- [1.3.1 Info and Relationships (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html)
- [1.3.2 Meaningful Sequence (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence.html)
- [1.3.3 Sensory Characteristics (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/sensory-characteristics.html)
- [1.3.4 Orientation (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/orientation.html)
- [1.4.1 Use of Color (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html)
- [1.4.3 Contrast (Minimum) (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- [1.4.4 Resize Text (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html)
- [1.4.10 Reflow (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)
- [1.4.11 Non-text Contrast (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)
- [1.4.12 Text Spacing (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html)
- [1.4.13 Content on Hover or Focus (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html)

### Keyboard and focus

- [2.1.1 Keyboard (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html)
- [2.1.2 No Keyboard Trap (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html)
- [2.1.4 Character Key Shortcuts (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/character-key-shortcuts.html)
- [2.4.3 Focus Order (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html)
- [2.4.6 Headings and Labels (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels.html)
- [2.4.7 Focus Visible (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html)
- [2.4.11 Focus Not Obscured (Minimum) (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html)
- [2.4.13 Focus Appearance (Level AAA)](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html)

### Pointer and input

- [2.5.1 Pointer Gestures (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/pointer-gestures.html)
- [2.5.2 Pointer Cancellation (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/pointer-cancellation.html)
- [2.5.3 Label in Name (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html)
- [2.5.5 Target Size (Enhanced) (Level AAA)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html)
- [2.5.7 Dragging Movements (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html)
- [2.5.8 Target Size (Minimum) (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- [3.2.1 On Focus (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/on-focus.html)
- [3.2.2 On Input (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/on-input.html)
- [3.3.1 Error Identification (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html)
- [3.3.2 Labels or Instructions (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html)
- [3.3.3 Error Suggestion (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion.html)
- [4.1.2 Name, Role, Value (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html)
- [4.1.3 Status Messages (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html)

## Related Guides

- [ARIA Live Regions Best Practices](./ARIA_LIVE_REGIONS_BEST_PRACTICES.md)
- [Color Contrast Accessibility Best Practices](./COLOR_CONTRAST_ACCESSIBILITY_BEST_PRACTICES.md)
- [Image Alt Text Accessibility Best Practices](./IMAGE_ALT_TEXT_ACCESSIBILITY_BEST_PRACTICES.md)
- [Keyboard Accessibility Best Practices](./KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md)
- [SVG Accessibility Best Practices](./SVG_ACCESSIBILITY_BEST_PRACTICES.md)
- [Tables Accessibility Best Practices](./TABLES_ACCESSIBILITY_BEST_PRACTICES.md)
- [Touch and Pointer Accessibility Best Practices](./TOUCH_POINTER_ACCESSIBILITY_BEST_PRACTICES.md)
- [User Personalization Accessibility Best Practices](./USER_PERSONALIZATION_ACCESSIBILITY_BEST_PRACTICES.md)

Use the project's
[Accessibility Bug Reporting Best Practices](./ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES.md)
to assign severity and priority. This guide does not define a universal
severity scale.

## References

- [W3C WAI: Complex Images](https://www.w3.org/WAI/tutorials/images/complex/)
- [W3C WAI: Image Maps](https://www.w3.org/WAI/tutorials/images/imagemap/)
- [W3C WAI-ARIA Authoring Practices: Combobox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)
- [W3C COGA: Technology-Assisted Indoor Navigation and Wayfinding](https://w3c.github.io/coga/research-modules/Technology-Assisted-Indoor-Navigation-and-Wayfindings.html)
- [Leaflet: A Guide to Basic Leaflet Accessibility](https://leafletjs.com/examples/accessibility/)
- [Systematically Evaluating Equivalent Purpose for Digital Maps](https://arxiv.org/abs/2512.05310)

### Machine-Readable Standards

For AI systems and automated tooling, see
[wai-yaml-ld](https://github.com/mgifford/wai-yaml-ld) for structured
accessibility standards:

- [WCAG 2.2 (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wcag-2.2-normative.yaml)
- [HTML Living Standard Accessibility (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/html-living-standard-accessibility.yaml)
- [WAI-ARIA Informative (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wai-aria-informative.yaml)
- [Standards Link Graph (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/standards-link-graph.yaml)

---

This document is available under the repository's [MIT License](../LICENSE).
