# Mermaid Transformation Best Practices

AGPL-3.0-or-later License - See LICENSE file for full text  
Copyright (c) 2026 Mike Gifford

**Normative specification governing post-processing rules, semantic preservation, and verification checklists.**

Based on:
- Carie Fisher's [Accessible SVGs: Perfect Patterns For Screen Reader Users](https://cariefisher.com/a11y-svg-updated/)
- Léonie Watson's [Accessible SVG Flowcharts](https://tink.uk/accessible-svg-flowcharts/)
- SVG Specification (W3C)
- WCAG 2.2 Level AA

---

## 1. Transformation Goals

The post-processing transformation must:

1. **Preserve semantics** — Never remove or alter meaningful information
2. **Enhance accessibility** — Add proper ARIA roles and attributes
3. **Maintain visual integrity** — Don't break Mermaid's layout or styling
4. **Support theming** — Enable light/dark mode with maintained contrast
5. **Enable interoperability** — SVG must work in `<img>`, `<object>`, inline, and standalone

---

## 2. Mermaid Rendering Defaults

### Configuration Requirements

```javascript
mermaid.initialize({
  startOnLoad: false,           // Manual control
  theme: 'default',             // Preserve user's theme preference
  securityLevel: 'loose',       // Allow data URIs and scripts
  flowchart: {
    useMaxWidth: true,          // Responsive sizing
    htmlLabels: true            // Support semantic HTML in nodes
  }
});
```

### Version Pinning
- Pin Mermaid version in `package.json` and CDN URL
- Test all changes against pinned version
- Document breaking changes when upgrading

---

## 3. SVG Transformation Pipeline

### Step 1: Parse Generated SVG
```javascript
const parser = new DOMParser();
const doc = parser.parseFromString(svgString, 'image/svg+xml');
const svg = doc.documentElement;
```

### Step 2: Extract Mermaid Metadata
```javascript
const titleMatch = mermaidSource.match(/%%\s*accTitle\s*(.+)/);
const descMatch = mermaidSource.match(/%%\s*accDescr\s*(.+)/);
```

### Step 3: Apply Root-Level Attributes
```javascript
svg.setAttribute('role', 'img');
svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
```

### Step 4: Generate Unique IDs
```javascript
const titleId = `title-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
const descId = `desc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
```

### Step 5: Insert Title and Desc Elements
```javascript
// Remove existing (if present)
svg.querySelector('title')?.remove();
svg.querySelector('desc')?.remove();

// Insert new
const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
title.id = titleId;
title.textContent = metadata.title;

const desc = document.createElementNS('http://www.w3.org/2000/svg', 'desc');
desc.id = descId;
desc.textContent = metadata.description;

svg.insertBefore(desc, svg.firstChild);
svg.insertBefore(title, svg.firstChild);
```

### Step 6: Set aria-labelledby (Pattern 11)
```javascript
svg.setAttribute('aria-labelledby', `${titleId} ${descId}`);
```

### Step 7: Serialize and Return
```javascript
const result = new XMLSerializer().serializeToString(doc);
```

---

## 4. Semantic Preservation Rules

### Critical: Do NOT Remove
These elements must **never** be removed:
- `<title>` elements (accessibility)
- `<desc>` elements (accessibility)
- `viewBox` attribute (ensures scalability)
- `xmlns` namespace (ensures standalone usage)
- IDs used in links or references
- `role` attributes
- ARIA attributes (`aria-*`)

### Safe to Remove
These can be removed without losing semantics:
- Comments
- Extra whitespace
- Unused CSS classes
- Presentation attributes if CSS equivalents exist

### Safe to Modify
These can be modified while preserving semantics:
- Color values (for theming)
- Opacity (for contrast adjustment)
- Stroke width (for visibility)
- Font size (for readability)

---

## 5. Attribute Application Rules

### Flowchart Node Structure (Pattern 11)

For each semantic node in a flowchart:

```html
<g role="listitem">
  <title id="node-{id}">Node label</title>
  <!-- visual elements (shapes, text) -->
</g>
```

Rationale: This allows screen readers to navigate nodes as a list, with each node having a clear label.

### Decorative Element Hiding

Purely decorative elements must be hidden from accessibility tree:

```html
<!-- Decorative arrow -->
<g aria-hidden="true" role="presentation">
  <path d="..."/>
</g>

<!-- Alternative: use role="presentation" for semantic groups -->
<g role="presentation">
  <!-- Decorative shapes -->
</g>
```

### Edge Labels (Contextual)

Decision branches must have meaningful labels:

```html
<!-- BAD: Just the label -->
<text>Yes</text>

<!-- GOOD: Contextual label -->
<text>Yes, proceed with processing</text>
<g role="listitem">
  <title>Transition to processing: Yes, proceed with processing</title>
</g>
```

---

## 6. Dark Mode Support

### Strategy: CSS Custom Properties

```html
<svg role="img" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      :root {
        --text-color: #1a1a1a;
        --bg-color: #ffffff;
        --border-color: #cccccc;
      }
      
      @media (prefers-color-scheme: dark) {
        :root {
          --text-color: #ffffff;
          --bg-color: #1a1a1a;
          --border-color: #333333;
        }
      }
      
      text { fill: var(--text-color); }
      rect { fill: var(--bg-color); stroke: var(--border-color); }
      path { stroke: var(--border-color); }
    </style>
  </defs>
  <!-- content -->
</svg>
```

### Strategy: currentColor

```html
<svg role="img" color="currentColor">
  <style>
    .text { fill: currentColor; }
    .border { stroke: currentColor; }
  </style>
  <!-- content -->
</svg>
```

### Strategy: Inline Media Queries

```html
<svg role="img" xmlns="http://www.w3.org/2000/svg">
  <style>
    text { fill: #1a1a1a; }
    
    @media (prefers-color-scheme: dark) {
      text { fill: #ffffff; }
    }
    
    @media (prefers-contrast: more) {
      text { font-weight: bold; }
    }
  </style>
  <!-- content -->
</svg>
```

---

## 7. Contrast Verification Checklist

Before exporting, verify:

### Light Mode
- [ ] Text contrast ≥ 4.5:1 (WCAG AA)
- [ ] Non-text ≥ 3:1 (WCAG AA)
- [ ] APCA values available for reference (text only)

### Dark Mode
- [ ] Text contrast ≥ 4.5:1 (WCAG AA)
- [ ] Non-text ≥ 3:1 (WCAG AA)
- [ ] Same elements tested in both modes

### Special Cases
- [ ] Focus indicators (if interactive): ≥ 3:1
- [ ] Disabled states: ≥ 3:1 contrast with non-disabled
- [ ] Hover states: Maintain 4.5:1 or 3:1

---

## 8. Verification Checklist

### Pre-Export
- [ ] SVG parses without errors
- [ ] All required metadata present
- [ ] IDs are unique within SVG
- [ ] `role="img"` on root
- [ ] `xmlns` namespace present
- [ ] `<title>` and `<desc>` present
- [ ] `aria-labelledby` references both IDs
- [ ] Decorative elements hidden (aria-hidden)
- [ ] Contrast passes in light mode
- [ ] Contrast passes in dark mode
- [ ] No parsing errors in output

### Post-Export (Manual Testing)
- [ ] SVG displays correctly in `<img>` tag
- [ ] SVG displays correctly inline
- [ ] SVG displays correctly as `<object>`
- [ ] Screen reader announces title + description
- [ ] Screen reader can navigate semantic structure
- [ ] Keyboard navigation works if interactive
- [ ] Contrast valid in high contrast mode
- [ ] Reduced motion respected if applicable

---

## 9. Error Handling

### Parse Errors
```javascript
try {
  const doc = parser.parseFromString(svgString, 'image/svg+xml');
  if (doc.querySelector('parsererror')) {
    throw new Error('SVG parsing failed');
  }
} catch (e) {
  showError(`Invalid SVG: ${e.message}`);
  return null;
}
```

### Validation Errors
```javascript
if (!metadata.title) {
  throw new Error('Missing %%accTitle annotation');
}

if (!metadata.description) {
  throw new Error('Missing %%accDescr annotation');
}
```

### Graceful Degradation
If transformation fails:
1. Return original SVG with basic `role="img"`
2. Show user warning about missing semantics
3. Log error for debugging
4. Suggest adding annotations

---

## 10. Testing Transformations

### Unit Test Template
```javascript
describe('SVG Transformation', () => {
  it('should apply role="img"', () => {
    const svg = transform(mermaidSource);
    expect(svg).toContain('role="img"');
  });
  
  it('should insert title with unique ID', () => {
    const svg = transform(mermaidSource);
    expect(svg).toMatch(/<title id="title-[\d-a-z]+">.*<\/title>/);
  });
  
  it('should set aria-labelledby to both IDs', () => {
    const svg = transform(mermaidSource);
    expect(svg).toMatch(/aria-labelledby="title-[\d-a-z]+ desc-[\d-a-z]+"/);
  });
  
  it('should preserve xmlns namespace', () => {
    const svg = transform(mermaidSource);
    expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
  });
});
```

### Integration Test Template
```javascript
describe('SVG Export', () => {
  it('should render in <img> tag', async () => {
    const img = document.createElement('img');
    img.src = `data:image/svg+xml,${encodeURIComponent(svg)}`;
    // Test in browser or simulated environment
  });
  
  it('should be valid SVG', () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svg, 'image/svg+xml');
    expect(doc.querySelector('parsererror')).toBeNull();
  });
});
```

---

## 11. Performance Considerations

### Optimization Constraints
- **Preserve accessibility** — Don't minify in ways that strip semantics
- **Keep IDs intact** — Essential for aria-labelledby
- **Maintain structure** — Don't collapse groups if they have semantic meaning

### Safe Optimizations
- Remove whitespace between elements
- Minimize color hex codes (#fff vs #ffffff)
- Use CSS shorthand where possible
- Compress path data (carefully)

### Unsafe Optimizations (Never Apply)
- Removing `<title>` or `<desc>`
- Removing `viewBox`
- Collapsing `<g>` elements with roles
- Removing IDs
- Removing xmlns namespace

---

## 12. Version Control & Breaking Changes

### When Upgrading Mermaid

1. Test all sample diagrams against new version
2. Verify transformation pipeline still works
3. Check for new Mermaid attributes to preserve
4. Run full test suite
5. Document breaking changes
6. Update regression tests if needed
7. Pin new version in `package.json` and CDN URL

### Backwards Compatibility
- Maintain support for older Mermaid syntax where possible
- Document deprecated patterns
- Provide migration guide if syntax changes

---

## References

- **Carie Fisher's Pattern 11**: https://cariefisher.com/a11y-svg-updated/
- **Léonie Watson's Flowcharts**: https://tink.uk/accessible-svg-flowcharts/
- **SVG Spec**: https://www.w3.org/TR/SVG2/
- **WCAG 2.2**: https://www.w3.org/WAI/WCAG22/quickref/
- **ARIA Spec**: https://www.w3.org/WAI/ARIA/apg/

---

**Last Updated:** January 16, 2026  
**Version:** 1.0  
**Status:** Normative Reference
