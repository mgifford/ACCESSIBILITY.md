# AI Agent Instructions

> **System instructions for AI coding assistants contributing to this project.**

This file provides guidance for AI agents (GitHub Copilot, Cursor, Claude, GPT-4, etc.) to maintain project standards and quality.

## Primary References

Before proposing or writing changes, read these project policy files:

1. **[ACCESSIBILITY.md](./ACCESSIBILITY.md)** - Accessibility commitment and requirements (WCAG 2.2 AA)
2. **[SUSTAINABILITY.md](./SUSTAINABILITY.md)** - Sustainability policy, asset optimization, and AI usage guidelines
3. **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Contribution process, including involvement of people with disabilities

## Core Requirements

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

### Documentation Quality
- Keep changes minimal and request-scoped
- Ensure all links are valid (checked by CI)
- Follow existing patterns and project structure
- Use practical, actionable language with examples
- Update cross-references when adding new pages

## Component-Specific Guidance

Consult these guides when working with specific elements:

- **Audio/Video**: [examples/AUDIO_VIDEO_ACCESSIBILITY_BEST_PRACTICES.md](./examples/AUDIO_VIDEO_ACCESSIBILITY_BEST_PRACTICES.md)
- **Content Design**: [examples/CONTENT_DESIGN_ACCESSIBILITY_BEST_PRACTICES.md](./examples/CONTENT_DESIGN_ACCESSIBILITY_BEST_PRACTICES.md)
- **SVG graphics**: [examples/SVG_ACCESSIBILITY_BEST_PRACTICES.md](./examples/SVG_ACCESSIBILITY_BEST_PRACTICES.md)
- **Diagrams (Mermaid)**: [examples/MERMAID_ACCESSIBILITY_BEST_PRACTICES.md](./examples/MERMAID_ACCESSIBILITY_BEST_PRACTICES.md)
- **Forms**: [examples/FORMS_ACCESSIBILITY_BEST_PRACTICES.md](./examples/FORMS_ACCESSIBILITY_BEST_PRACTICES.md)
- **Keyboard interactions**: [examples/KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md](./examples/KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md)
- **Light/Dark mode**: [examples/LIGHT_DARK_MODE_ACCESSIBILITY_BEST_PRACTICES.md](./examples/LIGHT_DARK_MODE_ACCESSIBILITY_BEST_PRACTICES.md)
- **User Personalization**: [examples/USER_PERSONALIZATION_ACCESSIBILITY_BEST_PRACTICES.md](./examples/USER_PERSONALIZATION_ACCESSIBILITY_BEST_PRACTICES.md)
- **Manual testing**: [examples/MANUAL_ACCESSIBILITY_TESTING_GUIDE.md](./examples/MANUAL_ACCESSIBILITY_TESTING_GUIDE.md)
- **Progressive enhancement**: [examples/PROGRESSIVE_ENHANCEMENT_BEST_PRACTICES.md](./examples/PROGRESSIVE_ENHANCEMENT_BEST_PRACTICES.md)

## Testing and Validation

- **Link checking**: Runs automatically on PRs
- **Accessibility examples**: Must follow published best practices
- **Code examples**: Must pass hypothetical axe-core checks
- **Documentation**: Must be clear, accurate, and well-structured

## Machine-Readable Standards

This project uses [wai-yaml-ld](https://github.com/mgifford/wai-yaml-ld) for machine-readable WCAG/ARIA/ATAG standards. See [examples/TRUSTED_SOURCES.yaml](./examples/TRUSTED_SOURCES.yaml) for vetted references.

### AI Scraping Policy for Trusted Sources

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

## Priority Taxonomy

When identifying issues, use this severity scale:

- **Critical**: Could lead to implementing features that prevent users from completing core tasks
- **High**: Significant guidance gap that could create accessibility barriers
- **Medium**: Documentation clarity issues or incomplete examples
- **Low**: Minor improvements, typos, or enhancements

Never suggest changes that introduce Critical or High severity accessibility issues.

## Quick Decision Framework

If uncertain about an approach:

1. Consult [ACCESSIBILITY.md](./ACCESSIBILITY.md) and [SUSTAINABILITY.md](./SUSTAINABILITY.md)
2. Check existing patterns in [examples/](./examples/)
3. Review [CONTRIBUTING.md](./CONTRIBUTING.md)
4. When in doubt, choose the more accessible and sustainable option

## Continuous Improvement

Help maintain quality by:

- Suggesting accessibility and sustainability enhancements
- Documenting patterns for reuse
- Sharing learnings in PR descriptions
- Contributing to examples and best practices

---

**Remember**: Accessibility and sustainability are not optional. They are core quality attributes that enable all users to access and use resources efficiently.
