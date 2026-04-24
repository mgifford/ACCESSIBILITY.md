## Description

<!-- Briefly explain what this PR does and why. -->

Fixes #<!-- issue number, if applicable -->

---

## Type of change

- [ ] New guide or example (`examples/`)
- [ ] Update to existing guide or example
- [ ] Template or workflow update (`.github/`)
- [ ] Documentation update (`README.md`, `index.md`, `AGENTS.md`, etc.)
- [ ] Bug fix (broken link, typo, incorrect guidance)
- [ ] Other: <!-- describe -->

---

## Accessibility checklist

> Skip items that are clearly not applicable and note why.

### Content and structure

- [ ] Headings follow a logical hierarchy (no skipped levels)
- [ ] Lists, tables, and code blocks use the correct Markdown/HTML elements
- [ ] Tables have a caption or a clear preceding heading that identifies their purpose
- [ ] HTML table examples use `<th>` elements with appropriate `scope` attributes
- [ ] Images in documentation have descriptive alt text; decorative images use `alt=""`
- [ ] Links have descriptive text — no "click here" or bare URLs used as link text
- [ ] Plain language used: active voice, short sentences, no unexplained jargon

### Code examples

- [ ] All HTML/CSS/JS examples meet **WCAG 2.2 Level AA**
- [ ] ARIA roles, states, and properties are valid for the host element
- [ ] Colour is not used as the sole means of conveying information
- [ ] Colour contrast in examples meets WCAG 1.4.3 (4.5:1 text) and 1.4.11 (3:1 non-text)
- [ ] Interactive elements in examples are keyboard operable and have a visible focus indicator
- [ ] Form controls in examples have associated `<label>` elements or `aria-label`

### WCAG criterion

<!-- If this PR relates to a specific WCAG Success Criterion, list it here. -->
<!-- e.g. WCAG 1.1.1 Non-text Content, WCAG 2.4.7 Focus Visible -->

Relevant WCAG criterion: <!-- or "N/A – documentation-only change" -->

---

## Testing

### Automated checks

<!-- List any automated checks run, or note "not run – requires live environment". -->

- [ ] Link checker passes (runs automatically on this PR)
- [ ] Spell checker / linter passes (if configured)
- Additional automated checks run: <!-- or "none – documentation-only" -->

### Manual checks completed

<!-- Tick only what you have actually tested. -->

- [ ] Keyboard-only navigation (Tab, Shift+Tab, Enter, Space, arrow keys) through any interactive examples
- [ ] Screen reader spot-check (NVDA + Firefox, VoiceOver + Safari, or TalkBack + Chrome)
- [ ] Checked with browser zoom at 200% — content reflows without horizontal scrolling
- [ ] Windows High Contrast / Forced Colors mode verified (if colour-critical changes)
- [ ] Manual checks required before merge: <!-- describe or "none" -->

---

## Sustainability

- [ ] New images are optimised (compressed, appropriate format, ≤ 500 KB per page target)
- [ ] No large binary assets added without justification
- [ ] Content is clear and reusable — no duplication of existing guidance

---

## Cross-references updated

*Required when adding a new guide to `examples/`.*

- [ ] `examples/README.md` updated
- [ ] `README.md` updated
- [ ] `index.md` updated
- [ ] `AGENTS.md` updated
- [ ] `.github/copilot-instructions.md` updated

---

## Jekyll / Liquid safety

- [ ] Any code block containing GitHub Actions `${{ }}` expressions is wrapped in `{% raw %}` / `{% endraw %}` tags

---

## AI usage disclosure

> Per the [Sustainability policy](https://github.com/mgifford/ACCESSIBILITY.md/blob/main/SUSTAINABILITY.md), disclose AI tool usage here.

- [ ] No AI tools were used in authoring this PR
- [ ] AI tools were used — details: <!-- which tool(s) and for what purpose -->
