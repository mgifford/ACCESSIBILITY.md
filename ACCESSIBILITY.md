# Accessibility Commitment (ACCESSIBILITY.md)

## 1. Our Commitment

We believe accessibility is a subset of quality. This project commits to **WCAG 2.2 AA** standards for all documentation and example code. We track our progress publicly to remain accountable to our users.

## 2. Real-Time Health Metrics

| Metric | Status / Value |
| :--- | :--- |
| **Open A11y Issues** | [View open accessibility issues](https://github.com/mgifford/ACCESSIBILITY.md/labels/accessibility) |
| **Automated Test Pass Rate** | Monitored via link checking and documentation validation |
| **A11y PRs Merged (MTD)** | Tracked in [project insights](https://github.com/mgifford/ACCESSIBILITY.md/pulse) |

## 3. Contributor Requirements (The Guardrails)

To contribute to this repo, you must follow these guidelines:

- **Documentation Testing:** All documentation examples must follow accessibility best practices
- **Code Examples:** Follow our component-specific best practices:
  - [SVG Accessibility Best Practices](./examples/SVG_ACCESSIBILITY_BEST_PRACTICES.md)
  - [Mermaid Diagram Best Practices](./examples/MERMAID_ACCESSIBILITY_BEST_PRACTICES.md)
  - [Forms Accessibility Best Practices](./examples/FORMS_ACCESSIBILITY_BEST_PRACTICES.md)
  - [Keyboard Accessibility Best Practices](./examples/KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md)
- **Link Validation:** All documentation links must pass our automated link checker
- **Inclusive Language:** Use person-centered, respectful language throughout

## 4. Reporting & Severity Taxonomy

Please use our [issue templates](https://github.com/mgifford/ACCESSIBILITY.md/issues/new) when reporting issues. We prioritize based on:

- **Critical:** Documentation error that could lead to implementing inaccessible features that prevent users from completing core tasks
- **High:** Significant guidance gap or misleading information that could create accessibility barriers
- **Medium:** Documentation clarity issues or incomplete examples
- **Low:** Minor improvements, typos, or enhancements

## 5. Automated Check Coverage

We track our automated testing rules against the [Axe Rules Reference](./examples/AXE_RULES_REFERENCE.md). 

Our documentation includes:
- Comprehensive axe-core rule mappings ([AXE_RULES_COVERAGE.md](./examples/AXE_RULES_COVERAGE.md))
- Shift-left automation guidance ([SHIFT_LEFT_ACCESSIBILITY_AUTOMATION.md](./examples/SHIFT_LEFT_ACCESSIBILITY_AUTOMATION.md))
- Pre-commit hook samples ([PRE_COMMIT_ACCESSIBILITY_SAMPLE.yaml](./examples/PRE_COMMIT_ACCESSIBILITY_SAMPLE.yaml))
- CI/CD workflow examples ([A11Y_SHIFT_LEFT_WORKFLOW.yml](./examples/A11Y_SHIFT_LEFT_WORKFLOW.yml))

## 6. Assistive Technology Testing

Contributors are encouraged to test documentation and examples with:

- **Screen readers:** JAWS, NVDA, VoiceOver, TalkBack
- **Keyboard navigation:** Tab, arrow keys, standard shortcuts
- **Magnification tools:** Browser zoom, screen magnifiers
- **Voice control:** Dragon, Voice Control

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details on reporting assistive technology test results.

## 7. Machine-Readable Standards

This project leverages [wai-yaml-ld](https://github.com/mgifford/wai-yaml-ld) for machine-readable accessibility standards, enabling AI agents to provide standards-grounded guidance. All vetted sources are documented in [TRUSTED_SOURCES.yaml](./examples/TRUSTED_SOURCES.yaml).

## 8. Known Limitations

As a documentation repository:
- We provide guidance and templates but cannot test actual implementations
- Examples are illustrative and may need adaptation for specific contexts
- We rely on community feedback to identify gaps and outdated patterns

## 9. Getting Help

- **Questions:** Open a [discussion](https://github.com/mgifford/ACCESSIBILITY.md/discussions)
- **Bugs or gaps:** Open an [issue](https://github.com/mgifford/ACCESSIBILITY.md/issues)
- **Contributions:** See [CONTRIBUTING.md](./CONTRIBUTING.md)
- **Accommodations:** Request via `accessibility-accommodation` label

## 10. Continuous Improvement

We regularly review and update:
- WCAG conformance as standards evolve
- Best practices based on community feedback
- Tool recommendations and automation examples
- Inclusive language and terminology

Last updated: 2026-02-23
