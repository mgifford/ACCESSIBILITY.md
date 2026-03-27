# Mermaid Diagrams Accessibility Skill

> **Canonical source**: `examples/MERMAID_ACCESSIBILITY_BEST_PRACTICES.md`
> This skill is derived from that file. When in doubt, the example is authoritative.

Apply these rules when authoring, generating, or reviewing Mermaid diagrams.

---

## Core Mandate

Every Mermaid diagram must include accessibility metadata and produce SVG output conforming to Pattern 11 — the most reliable pattern across screen reader/browser combinations.

---

## Required: Metadata in Every Diagram

```
%%accTitle Brief title (max 100 characters)
%%accDescr Detailed description of what the diagram shows and why
```

**Title requirements:**
- Concise and descriptive — identifies diagram type and subject
- Max 100 characters
- Unique within the page
- Never just "Diagram" or "Flowchart"

**Description requirements:**
- Complete explanation of purpose, key elements, and relationships
- Written as if explaining to someone who cannot see it
- For flowcharts: mention critical decision points
- Max 500 characters recommended; longer → use alternative presentation

### Example
```
graph TD
    A[User Login] --> B{Valid Credentials?}
    B -->|Yes| C[Grant Access]
    B -->|No| D[Show Error]
    C --> E[Load Dashboard]
    D --> F[Retry Login]

%%accTitle User Authentication Flowchart
%%accDescr Login process: credentials validated. If valid, access granted and dashboard loads. If invalid, error shown and user can retry.
```

---

## Required: SVG Output — Pattern 11

All rendered SVGs must implement:
```html
<svg role="img" aria-labelledby="title-id desc-id"
     xmlns="http://www.w3.org/2000/svg">
  <title id="title-id">Diagram Title</title>
  <desc id="desc-id">Diagram Description</desc>
  <!-- diagram content -->
</svg>
```

Required attributes:
- `role="img"` on root `<svg>`
- `xmlns="http://www.w3.org/2000/svg"`
- `aria-labelledby` referencing **both** title and desc IDs
- IDs unique per diagram; never reused across multiple diagrams on same page

---

## Required: Semantic Flowchart Structure

Following Léonie Watson's pattern:
```html
<svg role="img" aria-labelledby="...">
  <title>...</title>
  <desc>...</desc>
  <g role="list">
    <g role="listitem">
      <title>Node label</title>
      <!-- node content -->
    </g>
  </g>
</svg>
```

- Each node: single accessible name via `<title>`
- Decorative shapes: `aria-hidden="true"` or `role="presentation"`
- Arrows/connectors: `aria-hidden="true"` by default
- Named edges (Yes/No): include context — "Yes, proceed to processing" not just "Yes"

---

## Required: Pre-Export Validation Checklist

Before exporting any diagram, verify:
- [ ] Both `%%accTitle` and `%%accDescr` present
- [ ] Title ≤ 100 characters
- [ ] Description ≥ 10 characters
- [ ] No duplicate IDs within SVG
- [ ] `role="img"` on root SVG
- [ ] `aria-labelledby` references both title and desc IDs
- [ ] WCAG contrast met: 4.5:1 text, 3:1 non-text — in both light AND dark modes

---

## Required: Contrast

Test diagram colors in both light mode and dark mode:
- Text labels: 4.5:1 against background
- Non-text elements (lines, shapes): 3:1 against adjacent colors

---

## Definition of Done Checklist

- [ ] `%%accTitle` present, ≤100 chars, unique, meaningful
- [ ] `%%accDescr` present, explains purpose and key relationships
- [ ] SVG output uses Pattern 11: `role="img"`, `<title>`, `<desc>`, `aria-labelledby`
- [ ] All IDs unique within page
- [ ] Decorative elements hidden from accessibility tree
- [ ] Named edges include contextual label
- [ ] Contrast verified in light and dark modes
- [ ] Tested with screen reader

---

## Key WCAG Criteria

- 1.1.1 Non-text Content (A)
- 1.4.3 Contrast Minimum (AA)
- 1.4.11 Non-text Contrast (AA)
- 4.1.2 Name, Role, Value (A)

---

## References

- [Full best practices guide](../../examples/MERMAID_ACCESSIBILITY_BEST_PRACTICES.md)
- [Curated reference sources](references/references.md)
- [Accessible SVG flowcharts — Léonie Watson](https://tink.uk/accessible-svg-flowcharts/)
- [Accessible SVGs: Perfect Patterns — Carie Fisher](https://cariefisher.com/a11y-svg-updated/)
