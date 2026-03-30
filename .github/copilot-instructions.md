# Copilot Instructions

> **For AI coding agents working in this repository.**
> This file provides a quick-start orientation. For the full set of agent instructions, read [AGENTS.md](../AGENTS.md) in the repository root.

## Primary References

Read these files before making any changes:

1. **[AGENTS.md](../AGENTS.md)** — Complete agent instructions: core requirements, component-specific guidance, testing, AI scraping policy, and decision framework.
2. **[ACCESSIBILITY.md](../ACCESSIBILITY.md)** — Accessibility commitment and WCAG 2.2 AA requirements that all contributions must meet.
3. **[SUSTAINABILITY.md](../SUSTAINABILITY.md)** — Sustainability policy covering asset optimization, AI usage guidelines, and documentation principles.
4. **[CONTRIBUTING.md](../CONTRIBUTING.md)** — Contribution process, including involvement of people with disabilities.

## Key Rules at a Glance

- All documentation and code examples must comply with **WCAG 2.2 Level AA**.
- Keep changes **minimal and request-scoped**; avoid touching unrelated files.
- Ensure all links are valid — link checking runs automatically on every PR.
- When adding a new guide to `examples/`, update `examples/README.md`, `README.md`, `index.md`, and `AGENTS.md`.
- Before fetching any external URL, check `examples/TRUSTED_SOURCES.yaml` for the `ai_scraping` field; if it is `prohibited`, do **not** access the content.
- Disclose AI usage in pull request descriptions.
- **Jekyll/Liquid safety**: Wrap any YAML/workflow code block that contains GitHub Actions `${{ }}` syntax in `{% raw %}` / `{% endraw %}` tags to prevent Jekyll from misinterpreting them as Liquid template expressions.

## Component-Specific Guides

See [AGENTS.md § Component-Specific Guidance](../AGENTS.md#component-specific-guidance) for the full list. Quick links:

- [Anchor links](../examples/ANCHOR_LINKS_ACCESSIBILITY_BEST_PRACTICES.md)
- [ARIA live regions](../examples/ARIA_LIVE_REGIONS_BEST_PRACTICES.md)
- [Audio/Video](../examples/AUDIO_VIDEO_ACCESSIBILITY_BEST_PRACTICES.md)
- [Charts and graphs](../examples/CHARTS_GRAPHS_ACCESSIBILITY_BEST_PRACTICES.md)
- [CI/CD pipelines](../examples/CI_CD_ACCESSIBILITY_BEST_PRACTICES.md)
- [Content Design](../examples/CONTENT_DESIGN_ACCESSIBILITY_BEST_PRACTICES.md)
- [Forms](../examples/FORMS_ACCESSIBILITY_BEST_PRACTICES.md)
- [Keyboard interactions](../examples/KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md)
- [Light/Dark mode](../examples/LIGHT_DARK_MODE_ACCESSIBILITY_BEST_PRACTICES.md)
- [Maps](../examples/MAPS_ACCESSIBILITY_BEST_PRACTICES.md)
- [Mermaid diagrams](../examples/MERMAID_ACCESSIBILITY_BEST_PRACTICES.md)
- [Navigation](../examples/NAVIGATION_ACCESSIBILITY_BEST_PRACTICES.md)
- [Plain language](../examples/PLAIN_LANGUAGE_ACCESSIBILITY_BEST_PRACTICES.md)
- [Progressive enhancement](../examples/PROGRESSIVE_ENHANCEMENT_BEST_PRACTICES.md)
- [Print styles](../examples/PRINT_ACCESSIBILITY_BEST_PRACTICES.md)
- [SVG graphics](../examples/SVG_ACCESSIBILITY_BEST_PRACTICES.md)
- [Tables](../examples/TABLES_ACCESSIBILITY_BEST_PRACTICES.md)
- [Touch and pointer](../examples/TOUCH_POINTER_ACCESSIBILITY_BEST_PRACTICES.md)
- [User Personalization](../examples/USER_PERSONALIZATION_ACCESSIBILITY_BEST_PRACTICES.md)
- [Manual testing guide](../examples/MANUAL_ACCESSIBILITY_TESTING_GUIDE.md)
- [Digital quality (Opquast)](../examples/OPQUAST_DIGITAL_QUALITY_BEST_PRACTICES.md)

## Quick Decision Framework

When uncertain about an approach:

1. Consult [ACCESSIBILITY.md](../ACCESSIBILITY.md) and [SUSTAINABILITY.md](../SUSTAINABILITY.md).
2. Check existing patterns in [examples/](../examples/).
3. Review [CONTRIBUTING.md](../CONTRIBUTING.md).
4. When in doubt, choose the more accessible and sustainable option.

---

**Remember**: Accessibility and sustainability are non-negotiable quality attributes in this project.
