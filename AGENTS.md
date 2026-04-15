# AI agent instructions

> **System instructions for AI coding assistants contributing to this project.**

This file provides guidance for AI agents (GitHub Copilot, Cursor, Claude, GPT-4, etc.) to maintain project standards and quality.

For global installation of accessibility guidance as AI agent skills, see the [accessibility-skills](https://github.com/mgifford/accessibility-skills) repository.

## Primary references

Before proposing or writing changes, read these project policy files:

1. **[ACCESSIBILITY.md](./ACCESSIBILITY.md)** - Accessibility commitment and requirements (WCAG 2.2 AA)
2. **[SUSTAINABILITY.md](./SUSTAINABILITY.md)** - Sustainability policy, asset optimization, and AI usage guidelines
3. **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Contribution process, including involvement of people with disabilities

## Core requirements

### Accessibility
- All documentation and code examples must comply with **WCAG 2.2 Level AA** standards
- Follow component-specific best practices guides in [examples/](./examples/) directory
- Use semantic HTML, proper ARIA, keyboard navigation, and sufficient color contrast
- Provide text alternatives for images, diagrams, and multimedia
- Test with automated tools (axe-core) and keyboard navigation
- Use inclusive, person-centered language

### Sustainability
- Optimize assets (compress images, use appropriate formats)
- Prefer deterministic solutions over AI when possible
- Keep AI prompts focused and task-scoped
- Minimize large binary assets
- Avoid documentation duplication
- Disclose AI usage in pull requests
- When AI tools are used to build or modify this repository, update the **[AI Disclosure section in `README.md`](#-ai-disclosure)** to reflect which LLM(s) were used and for what purpose. Only list tools that were actually used — do not speculate.

### Documentation quality
- Keep changes minimal and request-scoped
- Ensure all links are valid (checked by CI)
- Follow existing patterns and project structure
- Use practical, actionable language with examples
- Update cross-references when adding new pages
- **Jekyll/Liquid safety**: Any markdown file rendered by Jekyll that includes GitHub Actions YAML expressions inside code blocks **must** wrap those code blocks with Liquid raw/endraw block tags to prevent Jekyll from misinterpreting them as Liquid template variables and breaking the site build. See the "Monthly Accessibility Scanner" workflow example in `examples/CI_CD_ACCESSIBILITY_BEST_PRACTICES.md` for the correct pattern.

## Component-specific guidance

Consult these guides when working with specific elements:

- **Accessibility bug reporting**: [examples/ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES.md](./examples/ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES.md)
- **Anchor links**: [examples/ANCHOR_LINKS_ACCESSIBILITY_BEST_PRACTICES.md](./examples/ANCHOR_LINKS_ACCESSIBILITY_BEST_PRACTICES.md)
- **ARIA live regions**: [examples/ARIA_LIVE_REGIONS_BEST_PRACTICES.md](./examples/ARIA_LIVE_REGIONS_BEST_PRACTICES.md)
- **Audio/Video**: [examples/AUDIO_VIDEO_ACCESSIBILITY_BEST_PRACTICES.md](./examples/AUDIO_VIDEO_ACCESSIBILITY_BEST_PRACTICES.md)
- **Charts and graphs**: [examples/CHARTS_GRAPHS_ACCESSIBILITY_BEST_PRACTICES.md](./examples/CHARTS_GRAPHS_ACCESSIBILITY_BEST_PRACTICES.md)
- **Color contrast**: [examples/COLOR_CONTRAST_ACCESSIBILITY_BEST_PRACTICES.md](./examples/COLOR_CONTRAST_ACCESSIBILITY_BEST_PRACTICES.md)
- **CI/CD pipelines**: [examples/CI_CD_ACCESSIBILITY_BEST_PRACTICES.md](./examples/CI_CD_ACCESSIBILITY_BEST_PRACTICES.md)
- **Content Design**: [examples/CONTENT_DESIGN_ACCESSIBILITY_BEST_PRACTICES.md](./examples/CONTENT_DESIGN_ACCESSIBILITY_BEST_PRACTICES.md)
- **SVG graphics**: [examples/SVG_ACCESSIBILITY_BEST_PRACTICES.md](./examples/SVG_ACCESSIBILITY_BEST_PRACTICES.md)
- **Diagrams (Mermaid)**: [examples/MERMAID_ACCESSIBILITY_BEST_PRACTICES.md](./examples/MERMAID_ACCESSIBILITY_BEST_PRACTICES.md)
- **Forms**: [examples/FORMS_ACCESSIBILITY_BEST_PRACTICES.md](./examples/FORMS_ACCESSIBILITY_BEST_PRACTICES.md)
- **Image alt text**: [examples/IMAGE_ALT_TEXT_ACCESSIBILITY_BEST_PRACTICES.md](./examples/IMAGE_ALT_TEXT_ACCESSIBILITY_BEST_PRACTICES.md)
- **Keyboard interactions**: [examples/KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md](./examples/KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md)
- **Light/Dark mode**: [examples/LIGHT_DARK_MODE_ACCESSIBILITY_BEST_PRACTICES.md](./examples/LIGHT_DARK_MODE_ACCESSIBILITY_BEST_PRACTICES.md)
- **Navigation**: [examples/NAVIGATION_ACCESSIBILITY_BEST_PRACTICES.md](./examples/NAVIGATION_ACCESSIBILITY_BEST_PRACTICES.md)
- **Plain language**: [examples/PLAIN_LANGUAGE_ACCESSIBILITY_BEST_PRACTICES.md](./examples/PLAIN_LANGUAGE_ACCESSIBILITY_BEST_PRACTICES.md)
- **Tables**: [examples/TABLES_ACCESSIBILITY_BEST_PRACTICES.md](./examples/TABLES_ACCESSIBILITY_BEST_PRACTICES.md)
- **Tooltips**: [examples/TOOLTIP_ACCESSIBILITY_BEST_PRACTICES.md](./examples/TOOLTIP_ACCESSIBILITY_BEST_PRACTICES.md)
- **Touch and pointer**: [examples/TOUCH_POINTER_ACCESSIBILITY_BEST_PRACTICES.md](./examples/TOUCH_POINTER_ACCESSIBILITY_BEST_PRACTICES.md)
- **User Personalization**: [examples/USER_PERSONALIZATION_ACCESSIBILITY_BEST_PRACTICES.md](./examples/USER_PERSONALIZATION_ACCESSIBILITY_BEST_PRACTICES.md)
- **Manual testing**: [examples/MANUAL_ACCESSIBILITY_TESTING_GUIDE.md](./examples/MANUAL_ACCESSIBILITY_TESTING_GUIDE.md)
- **Maps**: [examples/MAPS_ACCESSIBILITY_BEST_PRACTICES.md](./examples/MAPS_ACCESSIBILITY_BEST_PRACTICES.md)
- **Print styles**: [examples/PRINT_ACCESSIBILITY_BEST_PRACTICES.md](./examples/PRINT_ACCESSIBILITY_BEST_PRACTICES.md)
- **Progressive enhancement**: [examples/PROGRESSIVE_ENHANCEMENT_BEST_PRACTICES.md](./examples/PROGRESSIVE_ENHANCEMENT_BEST_PRACTICES.md)
- **Digital quality (Opquast)**: [examples/OPQUAST_DIGITAL_QUALITY_BEST_PRACTICES.md](./examples/OPQUAST_DIGITAL_QUALITY_BEST_PRACTICES.md)

## Testing and validation

- **Link checking**: Runs automatically on PRs
- **Accessibility examples**: Must follow published best practices
- **Code examples**: Must pass hypothetical axe-core checks
- **Documentation**: Must be clear, accurate, and well-structured

## GitHub Copilot agent mode

When running as a coding agent (multi-step autonomous mode), apply the following structured workflow in addition to the core requirements above.

### Pre-flight checks (always run first)

1. Read `ACCESSIBILITY.md` to understand the project's current conformance level and known gaps.
2. If the task touches a component type listed in the component-specific guidance section, read that guide before writing any code.
3. Check `examples/TRUSTED_SOURCES.yaml` before fetching or citing any external URL.
4. Identify which WCAG 2.2 AA Success Criterion the task relates to before proposing a solution.

### Task decomposition

Break any UI change into sequential layers. Complete and verify each layer before moving to the next:

| Layer | What to check |
|-------|--------------|
| **HTML structure** | Semantic elements, heading hierarchy, landmark roles |
| **ARIA attributes** | Only valid roles/states/properties permitted on the host element (validate against ARIA spec) |
| **Keyboard behaviour** | Tab order matches visual order; every interactive element is reachable by keyboard and has a visible focus indicator |
| **Visual presentation** | Colour contrast meets WCAG 1.4.3/1.4.11; focus indicators meet 2.4.11; motion respects `prefers-reduced-motion` |

#### WCAG principle → agent task patterns

| WCAG Principle | What to check |
|----------------|--------------|
| **Perceivable (1.x)** | Every non-text element has a text alternative. If purpose is ambiguous, mark as `<!-- TODO: verify alt -->` and explain in the PR. |
| **Operable (2.x)** | Every interactive element is keyboard-operable. No keyboard trap. Focus indicator is always visible. |
| **Understandable (3.x)** | Error messages identify the field, describe the error, and suggest a correction. State is never communicated by colour alone. |
| **Robust (4.x)** | ARIA usage is valid for the host element. Dynamic content updates are announced without forcibly moving focus. |

### Stopping conditions

Stop and request human review if any of these apply:

- You cannot determine whether a change affects keyboard navigation without running the application.
- The fix requires modifying more than three files.
- The change involves colour contrast and design-system tokens are not present in the repository.
- The component relies on a third-party library whose source is inaccessible.
- The correct WCAG Success Criterion is ambiguous.
- Multiple "Low" severity findings cluster on a single critical user journey (treat as "Critical" and escalate).

### Required PR output

Every agent-authored PR must include:

- The WCAG Success Criterion (e.g., `WCAG 1.1.1 Non-text Content`) for each accessibility change.
- A before/after code snippet for each modified element.
- A list of automated checks run, or the note "not run – requires live environment".
- A list of manual checks required before merge.
- AI usage disclosure per the Sustainability policy above.

## Machine-readable standards

This project uses [wai-yaml-ld](https://github.com/mgifford/wai-yaml-ld) for machine-readable WCAG/ARIA/ATAG standards. See [examples/TRUSTED_SOURCES.yaml](./examples/TRUSTED_SOURCES.yaml) for vetted references.

### AI scraping policy for trusted sources

**CRITICAL: Respect content creator preferences on AI scraping.**

When referencing sources from TRUSTED_SOURCES.yaml, always check the `ai_scraping` field:

- **`allowed`** (default if field is absent): You may reference content and use it for context
- **`prohibited`**: **DO NOT** scrape, crawl, or fetch content from this source. You may only:
  - Cite the source by name and URL
  - Recommend it as a reference for human readers
  - Acknowledge the author's expertise
- **`restricted`**: Use only for citation and reference purposes, not as training data

**Example prohibited sources:**
- Hidde de Vries (hidde.blog, talks.hiddedevries.nl) - `ai_scraping: prohibited`

**What this means for you:**
1. Before fetching content from any URL, check if it's in TRUSTED_SOURCES.yaml
2. If `ai_scraping: prohibited`, do not attempt to access the content
3. Instead, suggest the source as a reference for human contributors
4. Respect robots.txt and content creator preferences even for unlisted sources

## Priority taxonomy

When identifying issues, use this severity scale:

- **Critical**: Could lead to implementing features that prevent users from completing core tasks
- **High**: Significant guidance gap that could create accessibility barriers
- **Medium**: Documentation clarity issues or incomplete examples
- **Low**: Minor improvements, typos, or enhancements

Never suggest changes that introduce Critical or High severity accessibility issues.

## Quick decision framework

If uncertain about an approach:

1. Consult [ACCESSIBILITY.md](./ACCESSIBILITY.md) and [SUSTAINABILITY.md](./SUSTAINABILITY.md)
2. Check existing patterns in [examples/](./examples/)
3. Review [CONTRIBUTING.md](./CONTRIBUTING.md)
4. When in doubt, choose the more accessible and sustainable option

## Continuous improvement

Help maintain quality by:

- Suggesting accessibility and sustainability enhancements
- Documenting patterns for reuse
- Sharing learnings in PR descriptions
- Contributing to examples and best practices

---

**Remember**: Accessibility and sustainability are not optional. They are core quality attributes that enable all users to access and use resources efficiently.
