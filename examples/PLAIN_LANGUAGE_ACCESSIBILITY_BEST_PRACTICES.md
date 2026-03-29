---
title: Plain Language Accessibility Best Practices
---

# Plain Language Accessibility Best Practices

## Core Mandate

Plain language means writing so that people can find what they need, understand
it, and act on it the first time they read it. It is not about dumbing content
down — it is about respecting the reader's time and removing unnecessary barriers.

Plain language is the primary accessibility strategy for:
- Users with cognitive disabilities, learning disabilities, and intellectual disabilities
- Users with low literacy or whose first language is not the page language
- Users who are stressed, fatigued, or in crisis
- Users accessing content via screen reader, where re-reading is slow
- Users in reader mode or using text-to-speech, where complex syntax breaks down

WCAG 3.1.5 Reading Level (AAA) targets Grade 8 or lower for general audiences.
Plain language is also an Opquast requirement (rules 5, 7) and aligns with the
[Web Sustainability Guidelines](https://www.w3.org/TR/web-sustainability-guidelines/) —
concise content reduces data transfer and reading time.

---

## Severity Scale

| Level | Meaning |
|---|---|
| **Critical** | Content is entirely incomprehensible to the target audience; essential instructions cannot be followed |
| **Serious** | Dense jargon or complex sentence structure creates a significant barrier for users with cognitive disabilities |
| **Moderate** | Reading level above Grade 8; abbreviations unexpanded; passive voice dominates |
| **Minor** | Opportunities to shorten or clarify that do not create a barrier |

---

## Assistive Technology Context

Plain language matters differently across AT:

| AT | How plain language helps |
|---|---|
| Screen readers (NVDA, JAWS, VoiceOver) | Short sentences reduce cognitive load when re-listening; heading hierarchy aids navigation |
| Reader Mode (Firefox/Edge/Safari) | Strips visual hierarchy — plain language structure must carry meaning alone |
| Edge Read Aloud / TalkBack TTS | Long sentences with many clauses are harder to parse when heard |
| Voice Control | Clear, short headings and labels are easier to speak as navigation targets |
| Screen magnification | Users see small portions at a time — front-loaded key information reduces scrolling |
| Cognitive accessibility tools (e.g., Helperbird, Recite Me) | These reformat content; simple structures reformat better than complex ones |

---

## Critical: Structure Before Prose

Plain language begins with structure. A well-structured page with mediocre prose
is more accessible than beautiful prose with poor structure.

### One topic per page; one idea per paragraph

```
✗ This page covers our history, our services, our pricing, and how to contact us.

✓ Separate pages for: About us / Services / Pricing / Contact
```

### Front-load the key information

Put the conclusion first, then the evidence. Readers should not have to reach
the end of a paragraph to understand what it is about.

```
✗ After reviewing several options and consulting with our legal team, we have
  decided that applications submitted after 31 March will not be accepted.

✓ Applications close 31 March. We will not accept late submissions.
```

### Inverted pyramid: most important → supporting detail → background

This structure serves screen reader users (who navigate by heading), search
engine users, and users in crisis who need the answer immediately.

---

## Serious: Sentence and Paragraph Length

Long sentences and paragraphs are a **Serious** barrier for users with
cognitive disabilities, dyslexia, and low literacy.

**Sentences:**
- Target 15–20 words maximum for most sentences
- One main clause per sentence; move subordinate clauses to their own sentence
- Remove hedges and qualifications where possible: "It should be noted that" → remove it

**Paragraphs:**
- 3–5 sentences maximum for general web content
- One main idea per paragraph
- Use blank lines between paragraphs (not just indentation)

```
✗ Due to the fact that the application process requires a significant amount
  of documentation to be submitted in advance of the deadline, which is
  31 March for this financial year, applicants who have not yet gathered
  their supporting materials should begin doing so immediately.

✓ The application deadline is 31 March.
  Gather your supporting documents now — the process takes time.
  See the checklist below for what you need.
```

---

## Serious: Active Voice

Passive voice hides the actor and increases cognitive load.
**Use active voice** unless there is a deliberate reason not to.

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
- You want to soften a negative: "Mistakes were made." (rare, and be cautious)

---

## Serious: Plain Words

Use the word your reader already knows. Technical terminology is appropriate
for expert audiences; general audiences need plain equivalents.

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

**Domain-specific terms** (legal, medical, technical): define them on first use
inline, not in a separate glossary unless the audience is expert.

```html
<!-- First use: define inline -->
<p>Your <abbr title="General Data Protection Regulation">GDPR</abbr> rights
   allow you to request a copy of your personal data.</p>

<!-- Subsequent uses: abbreviation alone is acceptable -->
<p>To exercise your GDPR rights, contact our data protection team.</p>
```

---

## Moderate: Reading Level

Target **Grade 8 or lower** (Flesch-Kincaid) for general public content.
**Above Grade 10 is Moderate**; above Grade 12 is Serious for public-facing content.

Tools for checking reading level:
- [Hemingway Editor](https://hemingwayapp.com/) — highlights complex sentences, passive voice, grade level
- `retext-readability` — CI-integrable readability linter
- Microsoft Word's built-in Flesch-Kincaid score (Review → Check Accessibility)

Grade level is a guide, not an absolute rule. Legal or regulatory text may
require precision that raises the grade level — acknowledge this and provide
a plain language summary alongside the formal text.

---

## Moderate: Abbreviations and Acronyms

Unexpanded abbreviations are a **Moderate** barrier — screen readers may
mispronounce them; new readers do not know them.

**Rule:** Expand on first use on every page (not just the first page of the site).

```html
<p>The <abbr title="Web Content Accessibility Guidelines">WCAG</abbr> are
   published by the W3C. WCAG version 2.2 is the current standard.</p>
```

`<abbr title="...">` provides the expansion to AT and on hover for sighted users.
Screen readers handle `<abbr>` inconsistently — the expansion in the `title`
attribute is read by some but not all AT. Always write the expansion in text on
first use regardless of whether you use `<abbr>`.

---

## Moderate: Lists vs Prose

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

Use `<ul>` for unordered lists, `<ol>` for steps or sequences that must be
followed in order.

---

## Moderate: Instructions and Sequences

Number steps. Place the action before the context (not after).

```
✗ After logging in, which you can do from the homepage, click the Settings
  icon in the top-right corner of the screen, then select Account.

✓ To update your account:
  1. Log in at [homepage link].
  2. Click Settings (top-right corner).
  3. Select Account.
```

---

## Minor: Tone and Inclusive Language

- Address the reader as "you"; address your organisation as "we"
- Gender-neutral language throughout: "they" as singular is grammatically
  accepted and widely supported; avoid "he or she"
- Avoid ableist language: do not use disability as metaphor
  ("turning a blind eye", "deaf to their concerns", "stands alone")
- Avoid culture-specific idioms that may not translate: "ballpark figure",
  "boil the ocean", "hit the ground running"

---

## Minor: Page Titles and Headings

- Page `<title>` must identify the page and the site: "About Us | Acme Corp"
- One `<h1>` per page; must match or closely reflect the `<title>`
- Headings must be descriptive — "Introduction" alone is not descriptive;
  "Introduction to plain language principles" is
- Do not use headings for visual styling — use CSS classes instead

---

## Testing Checklist

Run these checks before publishing:

1. **Readability score:** Flesch-Kincaid Grade 8 or lower for general content
2. **Sentence scan:** no sentence over 25 words without good reason
3. **Passive voice scan:** Hemingway Editor highlights these in green
4. **Abbreviation check:** every abbreviation expanded on first use
5. **Plain word check:** replace any word from the "instead of" table above
6. **Reader Mode test:** open in Firefox or Safari Reader Mode — does it make
   sense without CSS? Are headings correct? Is content in logical order?
7. **Read aloud test:** use Edge Read Aloud or macOS VoiceOver — confusing
   sentences sound obviously wrong when spoken

---

## Definition of Done Checklist

* [ ] Reading level: Grade 8 or lower (Flesch-Kincaid) for general audiences
* [ ] Sentences: ≤20 words average; no sentence over 30 without good reason
* [ ] Active voice used throughout; passive voice only when deliberate
* [ ] Key information front-loaded in each paragraph
* [ ] All abbreviations and acronyms expanded on first use on every page
* [ ] Technical terms defined inline on first use
* [ ] Lists used for three or more parallel items
* [ ] Numbered steps for sequential instructions
* [ ] Inclusive, gender-neutral language
* [ ] Page `<title>` in "Page | Site" format
* [ ] One `<h1>`; headings descriptive and hierarchical
* [ ] Reader Mode test passed
* [ ] Read Aloud test passed

---

## Key WCAG Criteria

* 3.1.1 Language of Page (A) — `lang` attribute on `<html>`
* 3.1.2 Language of Parts (AA) — `lang` on elements in a different language
* 3.1.5 Reading Level (AAA) — Grade 8 or lower target for general audiences
* 1.3.1 Info and Relationships (A) — heading hierarchy, list markup
* 2.4.2 Page Titled (A) — descriptive page title

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
