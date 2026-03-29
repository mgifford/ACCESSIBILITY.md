---
title: Plain Language Accessibility Best Practices
---

# Plain Language Accessibility Best Practices

This document defines project-level requirements for writing web content in plain
language to ensure it is accessible to users with cognitive disabilities, low
literacy, and other reading challenges.

## 1. Core Principle

Plain language means writing so that people can find what they need, understand it,
and act on it the first time they read it. It is not about dumbing content down — it
is about respecting the reader's time and removing unnecessary barriers.

Plain language is the primary accessibility strategy for:
- Users with cognitive disabilities, learning disabilities, and intellectual disabilities
- Users with low literacy or whose first language is not the page language
- Users who are stressed, fatigued, or in crisis
- Screen reader users, for whom re-reading is slow and effortful
- Users in reader mode or text-to-speech, where complex syntax breaks down

WCAG 3.1.5 Reading Level (AAA) targets Grade 8 or lower for general audiences.
Plain language also aligns with Opquast Digital Quality rules 5 and 7 and reduces
data transfer and reading time.

## 2. Structure Before Prose

Plain language begins with structure. A well-structured page with mediocre prose is
more accessible than beautiful prose with poor structure.

- **One topic per page; one idea per paragraph.**
- **Front-load the key information** — put the conclusion first, then the evidence.
- **Inverted pyramid**: most important → supporting detail → background.

```
✗ After reviewing several options and consulting with our legal team, we have
  decided that applications submitted after 31 March will not be accepted.

✓ Applications close 31 March. We will not accept late submissions.
```

This structure serves screen reader users who navigate by heading, search users,
and users in crisis who need the answer immediately.

## 3. Sentence and Paragraph Length

Long sentences and paragraphs are a serious barrier for users with cognitive
disabilities, dyslexia, and low literacy.

- Target 15–20 words maximum for most sentences.
- One main clause per sentence; move subordinate clauses to their own sentence.
- Remove hedges and qualifications where possible: "It should be noted that…" → remove it.
- 3–5 sentences maximum per paragraph for general web content.
- One main idea per paragraph.

```
✗ Due to the fact that the application process requires a significant amount of
  documentation to be submitted in advance of the deadline, which is 31 March
  for this financial year, applicants who have not yet gathered their supporting
  materials should begin doing so immediately.

✓ The application deadline is 31 March.
  Gather your supporting documents now — the process takes time.
  See the checklist below for what you need.
```

## 4. Active Voice

Passive voice hides the actor and increases cognitive load. Use active voice unless
there is a deliberate reason not to.

```
✗ Decisions will be made by the committee.
✗ Applications must be submitted before the deadline.
✗ Your account may be suspended if payment is not received.

✓ The committee will decide.
✓ Submit your application before the deadline.
✓ We will suspend your account if we do not receive payment.
```

When to use passive voice deliberately:
- The actor is truly unknown: "Three people were injured."
- The actor is irrelevant: "The form was designed in 2019."

## 5. Plain Words

Use the word your reader already knows. Technical terminology is appropriate for
expert audiences; general audiences need plain equivalents.

| Instead of | Use |
|---|---|
| utilise | use |
| commence | start |
| endeavour | try |
| prior to | before |
| in the event that | if |
| at this point in time | now |
| facilitate | help |
| demonstrate | show |
| subsequently | then / after |
| approximately | about |

Domain-specific terms should be defined inline on first use:

```html
<!-- First use: define inline -->
<p>Your <abbr title="General Data Protection Regulation">GDPR</abbr> rights
   allow you to request a copy of your personal data.</p>

<!-- Subsequent uses on the same page: abbreviation alone is acceptable -->
<p>To exercise your GDPR rights, contact our data protection team.</p>
```

## 6. Reading Level

Target Grade 8 or lower (Flesch-Kincaid) for general public content. Above Grade 10
is a moderate issue; above Grade 12 is a serious issue for public-facing content.

Grade level is a guide, not an absolute rule. Legal or regulatory text may require
precision that raises the grade level — provide a plain language summary alongside
the formal text.

Tools for checking reading level:
- [Hemingway Editor](https://hemingwayapp.com/) — highlights complex sentences, passive voice, grade level
- Microsoft Word's built-in Flesch-Kincaid score (Review → Check Accessibility)
- `retext-readability` — CI-integrable readability linter

## 7. Abbreviations and Acronyms

Unexpanded abbreviations are a moderate barrier — screen readers may mispronounce
them and new readers do not know them.

- Expand every abbreviation on first use on every page (not just the first page of the site).
- Use `<abbr title="...">` to provide the expansion to assistive technology and on hover.
- Always write the expansion in text on first use regardless of whether you use `<abbr>`,
  because screen reader handling of `<abbr>` is inconsistent.

```html
<p>The <abbr title="Web Content Accessibility Guidelines">WCAG</abbr> are
   published by the W3C. WCAG version 2.2 is the current standard.</p>
```

## 8. Lists vs Prose

Use lists for three or more parallel items. Embedding lists in prose hides the
structure and increases cognitive load.

```
✗ You will need to provide your full name, date of birth, current address,
  email address, and a copy of your identification document.

✓ You will need:
  • Full name
  • Date of birth
  • Current address
  • Email address
  • A copy of your identification document
```

Use `<ul>` for unordered lists, `<ol>` for steps or sequences that must be followed
in order.

## 9. Instructions and Sequences

Number steps. Place the action before the context.

```
✗ After logging in, which you can do from the homepage, click the Settings
  icon in the top-right corner, then select Account.

✓ To update your account:
  1. Log in at the homepage.
  2. Click Settings (top-right corner).
  3. Select Account.
```

## 10. Tone and Inclusive Language

- Address the reader as "you" and the organisation as "we".
- Use gender-neutral language: "they" as singular is grammatically accepted.
- Avoid ableist language — do not use disability as a metaphor.
- Avoid culture-specific idioms that may not translate.

## 11. Page Titles and Headings

- Page `<title>` must identify the page and the site: "About Us | Acme Corp".
- One `<h1>` per page; it must match or closely reflect the `<title>`.
- Headings must be descriptive — "Introduction to plain language principles"
  rather than just "Introduction".
- Do not use headings for visual styling — use CSS classes instead.

## 12. Testing Expectations

Before publishing:

1. Check readability score: Flesch-Kincaid Grade 8 or lower for general content.
2. Scan for sentences over 25 words.
3. Use Hemingway Editor to identify passive voice.
4. Verify every abbreviation is expanded on first use on the page.
5. Open in Firefox or Safari Reader Mode — does it make sense without CSS?
6. Use Edge Read Aloud or macOS VoiceOver — confusing sentences sound obviously wrong
   when spoken aloud.

## 13. Definition of Done

A content change is not complete unless:

- Reading level is Grade 8 or lower for general audiences.
- Sentences average ≤20 words; no sentence over 30 without good reason.
- Active voice used throughout; passive voice only when deliberate.
- Key information front-loaded in each paragraph.
- All abbreviations and acronyms expanded on first use on every page.
- Technical terms defined inline on first use.
- Lists used for three or more parallel items.
- Numbered steps used for sequential instructions.
- Inclusive, gender-neutral language throughout.
- Page `<title>` in "Page | Site" format.
- One `<h1>`; headings are descriptive and hierarchical.
- Reader Mode test passed.

---

## References

- [Plain Language Guidelines — digital.gov](https://digital.gov/guides/plain-language/)
- [Plainlanguage.gov](https://www.plainlanguage.gov/)
- [Hemingway Editor](https://hemingwayapp.com/)
- [WCAG 2.2 Understanding 3.1.5 Reading Level](https://www.w3.org/WAI/WCAG22/Understanding/reading-level.html)
- [Berkeley Web Accessibility — Plain language](https://dap.berkeley.edu/websites/web-accessibility-basics/what-plain-language)

### Machine-Readable Standards

For AI systems and automated tooling, see [wai-yaml-ld](https://github.com/mgifford/wai-yaml-ld) for structured accessibility standards:

- [WCAG 2.2 (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wcag-2.2-normative.yaml) - Machine-readable WCAG 2.2 normative content including reading level and language criteria
- [HTML Living Standard Accessibility (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/html-living-standard-accessibility.yaml) - HTML language and heading element accessibility
- [Standards Link Graph (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/standards-link-graph.yaml) - Relationships across WCAG language and readability standards
