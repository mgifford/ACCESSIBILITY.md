# Content Design Accessibility Skill

> **Canonical source**: `examples/CONTENT_DESIGN_ACCESSIBILITY_BEST_PRACTICES.md`
> This skill is derived from that file. When in doubt, the example is authoritative.

Apply these rules when writing, editing, or reviewing any web content.

---

## Core Mandate

A technically accessible page that is confusing or poorly structured still creates barriers. Design content for the widest possible audience: write clearly, structure logically, and present information in the order users need it.

---

## Required: Plain Language

- Common words, short sentences, active voice
- Target Grade 8 reading level or lower for general audiences
- Define technical terms inline; spell out abbreviations on first use
- Front-load key information — most important point first
- Use "you" to address the reader directly
- Avoid double negatives and conditional stacking

---

## Required: Page Structure

- One `<h1>` per page that describes the page's main purpose
- Logical heading hierarchy: `h1` → `h2` → `h3` (no skips)
- Headings must be descriptive and unique — not "Introduction" alone
- Use lists for three or more parallel items (not embedded in paragraphs)
- Short paragraphs: 3–5 sentences maximum
- Inverted pyramid: most critical content at top

---

## Required: Link Text

Every link must make sense without surrounding context:
```html
<!-- Bad -->
<a href="/report">Click here</a>
<a href="/report">Read more</a>

<!-- Good -->
<a href="/report">2024 Accessibility Annual Report</a>
```

For document links, include file type:
```html
<a href="/report.pdf">2024 Annual Report (PDF, 2.3 MB)</a>
```

Warn users when links open in new tabs:
```html
<a href="/report" target="_blank">
  Annual Report <span class="visually-hidden">(opens in new tab)</span>
</a>
```

---

## Required: Images & Visual Content

- Meaningful images: `alt` text that conveys purpose, not appearance
- Decorative images: `alt=""`
- Charts/graphs: accompanied by text summary or accessible data table
- Never rely on images alone to convey information

---

## Required: Tables

- Use only for genuinely tabular data (never for layout)
- `<caption>` or heading explaining what the table contains
- Header cells marked with `<th scope="col">` or `<th scope="row">`
- Text summary for complex tables

---

## Required: Writing Style

- Active voice: "The form saves your data" not "Your data is saved"
- Present tense wherever possible
- Gender-neutral and inclusive language throughout
- Consistent terminology: one term per concept across the entire site
- Unique, descriptive page titles

---

## Required: Forms & Instructions

- Write form instructions before the form, not inside it
- Label fields with what the user needs to enter
- Provide format examples for unusual inputs: "Date: DD/MM/YYYY"
- Error messages must describe the problem and how to fix it

---

## Required: Cognitive Accessibility

- Supplement complex content with summaries or key takeaways
- Break long processes into numbered steps
- Use examples and analogies for abstract concepts
- Avoid time-pressured content presentation
- Run readability checker before publishing; target Flesch-Kincaid Grade 8 or lower

---

## Definition of Done Checklist

- [ ] Reading level checked (Grade 8 or lower for general audiences)
- [ ] One `<h1>`, logical heading hierarchy
- [ ] All link text descriptive out of context
- [ ] Document links include file type and size
- [ ] New-tab links warn the user
- [ ] All images have appropriate `alt` (meaningful or empty for decorative)
- [ ] Tables use `<caption>` and `<th scope="...">`
- [ ] Consistent terminology across the page/site
- [ ] Unique, descriptive page title

---

## Key WCAG Criteria

- 1.1.1 Non-text Content (A)
- 1.3.1 Info and Relationships (A)
- 2.4.4 Link Purpose in Context (AA)
- 2.4.6 Headings and Labels (AA)
- 3.1.5 Reading Level (AAA — target for general audiences)

---

## References

- [Full best practices guide](../../examples/CONTENT_DESIGN_ACCESSIBILITY_BEST_PRACTICES.md)
- [Curated reference sources](references/references.md)
- [Plain Language Guidelines](https://digital.gov/guides/plain-language)
