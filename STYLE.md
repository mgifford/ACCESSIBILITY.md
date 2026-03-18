# STYLE.md: Unified design and content standards

---

## Scope: documentation files vs. the website

This guide covers two distinct surfaces that share the same project:

| Surface | Files | Audience |
| :--- | :--- | :--- |
| **GitHub Pages site** | `index.md`, `_layouts/`, `assets/`, pages with front matter | Public visitors browsing the site |
| **Repository documentation** | `README.md`, `AGENTS.md`, `CONTRIBUTING.md`, `ACCESSIBILITY.md`, `SUSTAINABILITY.md`, `BROWSER_SUPPORT.md`, `examples/*.md` | Contributors, adopters, and AI agents reading files directly on GitHub |

**What applies everywhere (documentation and website):**
- Section 2 — Content and voice standards (plain language, active voice, sentence-case headings, American English)
- Section 4 — Accessibility and semantic logic (heading hierarchy, alt text)
- Section 5 — Instructions for AI agents

**What applies to the website only:**
- Section 3 — Design foundations (CSS tokens, typography, breakpoints, page layout patterns)

Even though documentation files are rendered as plain Markdown rather than styled HTML, they share the same voice, tone, and heading conventions as the site. This keeps the project a unified whole for every reader, regardless of which surface they encounter first.

---

## 1. Core philosophy
We design for the user, not the institution. Our goal is to reduce cognitive load through consistency, clarity, and radical accessibility.

1. **User-First:** Start with user needs, not organizational structure.
2. **Plain Language:** If a 12-year-old can't understand it, it's a barrier.
3. **Inclusive by Default:** Refer to `ACCESSIBILITY.md` for all interaction and visual standards.
4. **Consistency is Trust:** AI and humans must use the same tokens, patterns, and vocabulary.

---

## 2. Content and voice standards
Derived from *UK GDS* and *Digital.gov* standards.

### 2.1 Voice and tone
We use an **Authoritative Peer** tone: professional and knowledgeable, but accessible and supportive.

| Context | Tone | Strategy |
| :--- | :--- | :--- |
| **Onboarding** | Encouraging | Focus on the benefit to the user. |
| **Technical/Legal** | Precise | Be unambiguous; explain "why" if a rule is complex. |
| **Error States** | Calm/Helpful | Don't blame the user. Provide a clear path to resolution. |

### 2.2 Plain language and word choice
Avoid "Government-ese" or "Corporate-speak." AI agents must prioritize these substitutions:

| Avoid (Bureaucratic) | Use (Plain Language) |
| :--- | :--- |
| Utilize / Leverage | Use |
| Facilitate / Implement | Help / Carry out |
| At this point in time | Now |
| In order to | To |
| Notwithstanding | Despite / Even though |
| Requirements | Rules / What you need |

### 2.3 Grammar and mechanics
* **Active Voice:** "The department issued the permit" NOT "The permit was issued by the department."
* **Sentence Case:** Use sentence case for all headings and buttons (e.g., "Save and continue," not "Save and Continue").
* **Lists:** Use bullets for items. Use numbered lists only for sequential steps.

### 2.4 Spelling convention
This project uses **American English** as its default spelling standard.

| Variant | Example spellings | When to use |
| :--- | :--- | :--- |
| **American English** (default) | color, center, optimize, behavior | All documentation in this project unless overridden |
| **British English** | colour, centre, optimise, behaviour | Specify `lang: en-GB` in project config |
| **Canadian English** | colour, centre, optimize, behaviour | Specify `lang: en-CA` in project config |

To change the spelling variant for a derived project, update the `lang` attribute in `_config.yml` and the `<html lang="…">` tag in `_layouts/default.html`. Reference: [IETF language tag registry](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry).

> **AI agents:** When generating or reviewing content, always check the `lang` attribute at the top of `_config.yml` and apply the corresponding spelling rules consistently throughout the document.

---

## 3. Design foundations (tokens and UI)
Inspired by the *California Design System* and *Home Office Digital* patterns.

### 3.1 Design tokens (CSS/variables)
Use these tokens to maintain a "Single Source of Truth." The canonical values live in `assets/css/site.css` and are the authoritative source; this table documents the design intent.

**Light mode (`:root` defaults)**

| Category | Token Name | Light Value | Dark Value | Requirement |
| :--- | :--- | :--- | :--- | :--- |
| **Background** | `--bg` | `#ffffff` | `#0b0d10` | Base page background |
| **Surface** | `--bg-soft` | `#f7f7f8` | `#12161d` | Hero, footer, subtle backgrounds |
| **Text** | `--text` | `#121212` | `#f3f4f6` | 4.5:1 contrast on `--bg` required |
| **Muted text** | `--muted` | `#4b5563` | `#c5cad3` | Supporting copy; 3:1 min on `--bg` |
| **Border/Divider**| `--line` | `#e5e7eb` | `#2a2f3a` | Cards, section separators |
| **Card surface** | `--card` | `#ffffff` | `#0f1319` | Card backgrounds |
| **Code block** | `--code` | `#f3f4f6` | `#0c1016` | `<pre>` and inline code |
| **Button fill** | `--button` | `#111111` | `#f3f4f6` | Primary CTA background |
| **Button label** | `--button-text`| `#ffffff` | `#111111` | Text on `--button` fill |
| **Spacing unit** | `--space-unit` | `8px` | — | Use multiples: `calc(var(--space-unit) * N)` |

Both light and dark values are defined via a single `@media (prefers-color-scheme: dark)` override block — no extra class is needed. See Section 3.4 for all user-preference media queries.

### 3.2 Typography and readability
* **Font Stack:** `Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif` — system fonts are the fallback; no external font load is required.
* **Font Scaling:** Use `rem` units to respect user browser settings. Never use `px` for font sizes.
* **Fluid type:** Use `clamp()` for headings so they scale smoothly: e.g. `clamp(2.1rem, 5vw, 3.8rem)`.
* **Line Length:** Keep body text between 45–75 characters per line (`max-width: 760px` for `.prose` blocks).
* **Line Height:** Minimum `1.6` for body text; `1.2` or lower for display headings.

### 3.3 Responsive design: mobile-first
Write base CSS for the smallest screen first, then progressively enhance with `min-width` media queries.

**Breakpoint ladder**

| Layer | Breakpoint | Intent |
| :--- | :--- | :--- |
| **Mobile** | `0` – `599px` (base, no query) | Single-column, touch targets ≥ 44×44 px |
| **Tablet** | `min-width: 600px` | Two-column layouts where content benefits |
| **Desktop** | `min-width: 900px` | Multi-column grids, wider prose, side panels |

> **Note:** The current `site.css` uses a single `max-width: 900px` fallback query (desktop-first collapse) for historical reasons.
> * **When adding new CSS to `site.css`:** Write mobile-first using `min-width` queries as shown below.
> * **When adapting this guide for a derived project:** Always use the mobile-first pattern from the start.
> The existing `max-width` block in `site.css` should be migrated to `min-width` equivalents as those components are updated.

**Layout token**

```css
/* Content wrapper — scales from 92 % of viewport to a 1100 px cap */
.wrap {
  width: min(1100px, 92vw);
  margin: 0 auto;
}
```

**Mobile-first example skeleton**

```css
/* Base (mobile) */
.cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

/* Tablet */
@media (min-width: 600px) {
  .cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop */
@media (min-width: 900px) {
  .cards {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
```

### 3.4 User preferences
Always honor CSS media query preferences before adding JavaScript-driven controls. These queries make the design user-centered at zero cost.

| Media query | Behavior to implement | Status in `site.css` |
| :--- | :--- | :--- |
| `prefers-color-scheme: dark` | Switch to dark palette via CSS custom properties | ✅ Implemented |
| `prefers-reduced-motion: reduce` | Remove or reduce transitions and animations | ✅ Implemented (`.card` transitions) |
| `prefers-contrast: more` | Increase border weight, darken muted text | ⬜ Recommended |
| `forced-colors: active` | Use `ButtonText`, `LinkText`, etc. system colors | ⬜ Recommended |
| `prefers-reduced-transparency` | Replace semi-transparent surfaces with opaque fallbacks | ⬜ Recommended |

**Implementation pattern for new components**

```css
/* 1. Design for light mode and full motion first */
.component {
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

/* 2. Dark mode override */
@media (prefers-color-scheme: dark) {
  .component { /* dark overrides */ }
}

/* 3. Strip motion for users who prefer it */
@media (prefers-reduced-motion: reduce) {
  .component { transition: none; }
}

/* 4. Higher contrast enhancement */
@media (prefers-contrast: more) {
  .component { outline: 2px solid currentColor; }
}
```

See also: `ACCESSIBILITY.md`, and the [User Personalization Best Practices](examples/USER_PERSONALIZATION_ACCESSIBILITY_BEST_PRACTICES.md) guide for JavaScript-driven preference controls.

---

## 3.5 Page layout patterns

The site uses two layout templates defined in `_layouts/`:

| Layout | File | Use for |
| :--- | :--- | :--- |
| `default` | `_layouts/default.html` | Home page and pages with custom full-width HTML sections (hero, cards, steps) |
| `prose` | `_layouts/prose.html` | All markdown-rendered content pages (guides in `examples/`, reference docs) |

### Prose layout

Apply `layout: prose` (set automatically via `_config.yml` for `examples/`) to any page whose content is rendered from Markdown. The `prose` layout:

* Adds a **breadcrumb nav** ("← Home") so users can return to the index.
* Wraps content in `.wrap` (max-width `1100px`, centered) and `.prose-body` (max-width `760px`).
* Provides consistent typography for all standard Markdown elements: headings, lists, code blocks, blockquotes, tables.

> **AI agents:** When creating a new Markdown guide in `examples/`, do **not** add `layout:` to the file's front matter — the `_config.yml` scope rule applies `prose` automatically.

### Code-card pattern

The `.code-card` component on the home page follows this padding convention:

```css
.code-card h2   { padding: 0.75rem 1rem; }   /* title bar */
.code-card p    { padding: 0.5rem 1rem; }    /* subtitle / link line */
.code-card pre  { padding: 1rem; }           /* code block */
```

All three children share horizontal padding of `1rem` to keep text flush with the card interior — never touching the card border.

---

## 4. Accessibility and semantic logic
This section implements the mandates in `ACCESSIBILITY.md` [[ACCESSIBILITY.md]],


* **Heading Hierarchy:** Must be logical. H1 → H2 → H3. Never skip levels for "style."
* **Alt-Text:** Must describe the *intent* of the image, not just the pixels. 
* **Interactive Elements:** Every button or link must have a focus state that is visually distinct (e.g., a high-contrast 3px outline).

---

## 5. Instructions for AI agents
**Meta-Prompting Rules:** When generating content or code, the Agent must:

1. **Verify Tokens:** Only use the CSS variables defined in Section 3.1.
2. **Scan for Jargon:** Before finalizing text, run a "Plain Language" check against the table in Section 2.2.
3. **Reference Accessibility:** Before outputting a UI component, check `ACCESSIBILITY.md` for ARIA and keyboard navigation requirements.
4. **Markdown Formatting:** Always use semantic Markdown. Use GFM (GitHub Flavored Markdown) callouts (`> [!NOTE]`) for emphasis.

Also see: [[AGENTS.md]]

---

## 6. References and inspiration
* [UK GDS Style Guide](https://www.gov.uk/guidance/style-guide/a-to-z)
* [California Design System](https://designsystem.webstandards.ca.gov/)
* [18F Content Guide](https://content-guide.18f.gov/)
* [Harvard Accessibility & Readability](https://accessibility.huit.harvard.edu/design-readability)
* [Content Design London](https://contentdesign.london/blog/)

---
*This document is a living file. Please submit a PR for updates.*
