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

- [Accessibility bug reporting](../examples/ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES.md)
- [Anchor links](../examples/ANCHOR_LINKS_ACCESSIBILITY_BEST_PRACTICES.md)
- [ARIA live regions](../examples/ARIA_LIVE_REGIONS_BEST_PRACTICES.md)
- [Audio/Video](../examples/AUDIO_VIDEO_ACCESSIBILITY_BEST_PRACTICES.md)
- [Charts and graphs](../examples/CHARTS_GRAPHS_ACCESSIBILITY_BEST_PRACTICES.md)
- [CI/CD pipelines](../examples/CI_CD_ACCESSIBILITY_BEST_PRACTICES.md)
- [Color contrast](../examples/COLOR_CONTRAST_ACCESSIBILITY_BEST_PRACTICES.md)
- [Content Design](../examples/CONTENT_DESIGN_ACCESSIBILITY_BEST_PRACTICES.md)
- [Forms](../examples/FORMS_ACCESSIBILITY_BEST_PRACTICES.md)
- [Image alt text](../examples/IMAGE_ALT_TEXT_ACCESSIBILITY_BEST_PRACTICES.md)
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
- [Copilot agent mode](../examples/COPILOT_AGENT_MODE_GUIDE.md)

## GitHub Copilot agent mode

When running as a coding agent (multi-step autonomous mode), follow these additional rules.

### Pre-flight checks (run before every task)

1. Read `ACCESSIBILITY.md` to understand the project's current conformance level and known gaps.
2. If the task touches a component type listed above, read that component guide first.
3. Check `examples/TRUSTED_SOURCES.yaml` before fetching any external URL.

### Task decomposition

Break UI changes into sequential layers and verify each before moving to the next:

1. **HTML structure** — semantic elements, heading hierarchy, landmark roles
2. **ARIA attributes** — only valid roles/states/properties permitted on the host element
3. **Keyboard behaviour** — Tab order follows visual order; every interactive element is reachable and operable
4. **Visual presentation** — colour contrast, focus indicators, motion/animation

### Stopping conditions

Stop and request human review if:

- You cannot determine whether a change affects keyboard navigation without running the application.
- The fix requires modifying more than three files.
- The change involves colour contrast and design-system tokens are not present in the repository.
- The component relies on a third-party library whose source is inaccessible.
- The correct WCAG Success Criterion is ambiguous.

### Required PR output

Every agent-authored PR must include:

- The WCAG Success Criterion reference for each accessibility change made.
- A before/after code snippet for each modified element.
- A list of automated checks run (or "not run – requires live environment").
- A list of manual checks required before merge.
- AI usage disclosure.

## Quick Decision Framework

When uncertain about an approach:

1. Consult [ACCESSIBILITY.md](../ACCESSIBILITY.md) and [SUSTAINABILITY.md](../SUSTAINABILITY.md).
2. Check existing patterns in [examples/](../examples/).
3. Review [CONTRIBUTING.md](../CONTRIBUTING.md).
4. When in doubt, choose the more accessible and sustainable option.

---

**Remember**: Accessibility and sustainability are non-negotiable quality attributes in this project.
