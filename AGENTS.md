# AI Agent Instructions for Accessibility

> **System instructions for AI coding assistants to ensure accessibility compliance in this project.**

This file provides explicit guidance for AI agents (GitHub Copilot, Cursor, Claude, GPT-4, etc.) to maintain and improve accessibility standards when generating or modifying code.

## Core Accessibility Requirement

**All code changes must comply with WCAG 2.2 Level AA standards.**

Before modifying or creating any UI components, forms, interactive elements, or user-facing features:

1. **Read [ACCESSIBILITY.md](./ACCESSIBILITY-template.md)** for project-specific accessibility requirements and metrics
2. **Consult [examples/AXE_RULES_REFERENCE.md](./examples/AXE_RULES_REFERENCE.md)** for automated testing rules
3. **Review component-specific guidance** for the type of element being created or modified

## Component-Specific Best Practices

When working with specific UI components, always reference the appropriate best practices guide:

- **SVG graphics**: [examples/SVG_ACCESSIBILITY_BEST_PRACTICES.md](./examples/SVG_ACCESSIBILITY_BEST_PRACTICES.md)
- **Diagrams (Mermaid)**: [examples/MERMAID_ACCESSIBILITY_BEST_PRACTICES.md](./examples/MERMAID_ACCESSIBILITY_BEST_PRACTICES.md)
- **Forms**: [examples/FORMS_ACCESSIBILITY_BEST_PRACTICES.md](./examples/FORMS_ACCESSIBILITY_BEST_PRACTICES.md)
- **Keyboard interactions**: [examples/KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md](./examples/KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md)

## Required Checks for All UI Changes

Before suggesting or implementing any UI modification:

### 1. Semantic HTML
- Use appropriate HTML5 semantic elements (`<nav>`, `<main>`, `<article>`, `<button>`, etc.)
- Never use `<div>` or `<span>` for interactive elements
- Ensure proper heading hierarchy (h1 → h2 → h3, no skips)

### 2. ARIA Attributes
- Add ARIA labels only when native semantics are insufficient
- Use `aria-label`, `aria-labelledby`, or `aria-describedby` for non-text content
- Include `role` attributes when semantic HTML cannot express the widget type
- Always provide `aria-live` regions for dynamic content updates

### 3. Keyboard Navigation
- All interactive elements must be keyboard accessible (tab, enter, space, arrow keys)
- Implement visible focus indicators
- Ensure logical tab order matches visual layout
- Support standard keyboard shortcuts for the widget type

### 4. Color and Contrast
- Text contrast must meet WCAG AA minimum ratios (4.5:1 for normal text, 3:1 for large text)
- Do not rely on color alone to convey information
- Ensure sufficient contrast for interactive element states (hover, focus, disabled)

### 5. Alternative Content
- Provide `alt` text for all informational images
- Use `alt=""` for decorative images
- Include text alternatives for audio and video content
- Provide long descriptions for complex images, charts, and diagrams

### 6. Form Accessibility
- Associate all form inputs with visible `<label>` elements
- Use `<fieldset>` and `<legend>` for grouped form controls
- Provide clear error messages with `aria-invalid` and `aria-describedby`
- Indicate required fields with both visual and programmatic indicators

### 7. Testing Requirements
- All UI changes must pass automated testing with axe-core
- Manual keyboard navigation testing is required
- Screen reader testing recommended for complex interactions

## Automated Testing Integration

This project uses automated accessibility testing in CI/CD:

- **Pre-commit hooks**: Accessibility checks run before commits ([examples/PRE_COMMIT_ACCESSIBILITY_SAMPLE.yaml](./examples/PRE_COMMIT_ACCESSIBILITY_SAMPLE.yaml))
- **GitHub Actions**: Automated workflows enforce accessibility standards ([examples/A11Y_SHIFT_LEFT_WORKFLOW.yml](./examples/A11Y_SHIFT_LEFT_WORKFLOW.yml))
- **Build-time checks**: PRs will fail if accessibility violations are detected

When suggesting code changes, assume these automated checks will run and ensure compliance.

## Machine-Readable Standards

For standards-grounded accessibility guidance, this project references [wai-yaml-ld](https://github.com/mgifford/wai-yaml-ld), which provides machine-readable YAML/JSON-LD artifacts of W3C WAI standards including:

- WCAG 2.2 (Web Content Accessibility Guidelines)
- ARIA 1.2 (Accessible Rich Internet Applications)
- ATAG (Authoring Tool Accessibility Guidelines)
- HTML and CSS accessibility features

Consult [examples/TRUSTED_SOURCES.yaml](./examples/TRUSTED_SOURCES.yaml) for vetted accessibility references and citation policies.

## Priority and Severity

When accessibility issues are identified, prioritize them using this taxonomy:

- **Critical**: Prevents users from completing core tasks (e.g., cannot submit form, cannot navigate)
- **High**: Significant difficulty but workarounds exist (e.g., poor contrast, missing labels)
- **Medium**: Usability annoyance or inconsistent experience (e.g., suboptimal focus indicators)
- **Low**: Minor improvements or enhancements (e.g., redundant ARIA)

Never suggest code that introduces Critical or High severity accessibility issues.

## Documentation Requirements

When adding or modifying features:

- Update relevant documentation in [examples/](./examples/) directory
- Ensure all documentation links are valid (checked by CI)
- Follow [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines
- Use person-centered, inclusive language

## Inclusive Language

- Use "people with disabilities" (person-first) or "disabled people" (identity-first) based on context
- Avoid outdated or ableist terms (e.g., "handicapped", "crippled", "suffers from")
- Center accessibility impact in technical discussions
- Respect diverse user needs and assistive technologies

## Example Prompts for AI Agents

### When creating a new component:
```
Create a [component type] that:
1. Complies with WCAG 2.2 AA
2. Follows the guidelines in examples/[COMPONENT]_ACCESSIBILITY_BEST_PRACTICES.md
3. Includes proper ARIA attributes
4. Is fully keyboard navigable
5. Has sufficient color contrast
6. Passes axe-core automated tests
```

### When reviewing code:
```
Review this code for accessibility issues:
1. Check against examples/AXE_RULES_REFERENCE.md
2. Verify semantic HTML usage
3. Confirm keyboard navigation support
4. Validate ARIA implementation
5. Check color contrast ratios
6. Suggest improvements with explanations
```

## Questions or Clarifications

If you encounter accessibility requirements that are unclear or conflicting:

1. Consult the project's [ACCESSIBILITY.md](./ACCESSIBILITY-template.md) first
2. Check [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines
3. Refer to [examples/TRUSTED_SOURCES.yaml](./examples/TRUSTED_SOURCES.yaml) for authoritative references
4. When in doubt, choose the more accessible option

## Continuous Improvement

This project values accessibility as a subset of quality. Help us maintain and improve:

- Suggest accessibility enhancements when you notice opportunities
- Document patterns and solutions for reuse
- Share learnings in pull request descriptions
- Contribute to examples and best practices documentation

---

**Remember**: Accessibility is not optional. It's a core requirement that enables all users to access and use the product regardless of their abilities or assistive technologies.
