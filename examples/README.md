---
title: Examples Index
---

# Examples Directory

This index helps you browse all example assets used by `ACCESSIBILITY.md`.
Reference and adapt these examples for your project — they are not copy-paste solutions.

## Testing and Automation

- [CI_CD_ACCESSIBILITY_BEST_PRACTICES](./CI_CD_ACCESSIBILITY_BEST_PRACTICES.md)
- [AXE_RULES_COVERAGE](./AXE_RULES_COVERAGE.md)
- [AXE_RULES_REFERENCE](./AXE_RULES_REFERENCE.md)
- [SHIFT_LEFT_ACCESSIBILITY_AUTOMATION](./SHIFT_LEFT_ACCESSIBILITY_AUTOMATION.md)
- [MANUAL_ACCESSIBILITY_TESTING_GUIDE](./MANUAL_ACCESSIBILITY_TESTING_GUIDE.md)
- [BEHAVIORAL_ACCESSIBILITY_AUTOMATION](./BEHAVIORAL_ACCESSIBILITY_AUTOMATION.md) - Reflow risk and Focus Visible behavioral testing, with reusable tested [Playwright modules](./playwright/README.md)
- [ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES](./ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES.md)
- [ACCESSIBILITY_FINDING_TRACKING](./ACCESSIBILITY_FINDING_TRACKING.md) - Canonical model for tracker IDs, scan request/run IDs, occurrence and pattern fingerprints, display IDs, and legacy identifier migration
- [fingerprints/README](./fingerprints/README.md) - Normative `a11y/pattern/v1` and `a11y/occurrence/v1` fingerprint contracts, RFC 8785 canonicalization, and executable golden test vectors
- [schemas/README](./schemas/README.md) - Versioned JSON Schema (`schema_version: "2.0"`) for machine-readable accessibility findings, with validated complete, minimal, and manual examples
- [migrations/ACCESSIBILITY_MIGRATION_PROFILES](./migrations/ACCESSIBILITY_MIGRATION_PROFILES.md) - Verified `drupal-core` and `open-scans` legacy identifier formats, gaps, and migration requirements for adopting the fingerprint profiles
- [GITHUB_ACCESSIBILITY_SCANNER_INTEGRATION](./GITHUB_ACCESSIBILITY_SCANNER_INTEGRATION.md)
- [TEST_COVERAGE](./TEST_COVERAGE.md)
- [RULES_SUMMARY](./RULES_SUMMARY.md)

## Content and Media

- [CONTENT_DESIGN_ACCESSIBILITY_BEST_PRACTICES](./CONTENT_DESIGN_ACCESSIBILITY_BEST_PRACTICES.md)
- [PLAIN_LANGUAGE_ACCESSIBILITY_BEST_PRACTICES](./PLAIN_LANGUAGE_ACCESSIBILITY_BEST_PRACTICES.md)
- [IMAGE_ALT_TEXT_ACCESSIBILITY_BEST_PRACTICES](./IMAGE_ALT_TEXT_ACCESSIBILITY_BEST_PRACTICES.md)
- [AUDIO_VIDEO_ACCESSIBILITY_BEST_PRACTICES](./AUDIO_VIDEO_ACCESSIBILITY_BEST_PRACTICES.md)
- [SVG_ACCESSIBILITY_BEST_PRACTICES](./SVG_ACCESSIBILITY_BEST_PRACTICES.md)
- [TABLES_ACCESSIBILITY_BEST_PRACTICES](./TABLES_ACCESSIBILITY_BEST_PRACTICES.md)

## Interaction and Navigation

- [KEYBOARD_ACCESSIBILITY_BEST_PRACTICES](./KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md)
- [NAVIGATION_ACCESSIBILITY_BEST_PRACTICES](./NAVIGATION_ACCESSIBILITY_BEST_PRACTICES.md)
- [ANCHOR_LINKS_ACCESSIBILITY_BEST_PRACTICES](./ANCHOR_LINKS_ACCESSIBILITY_BEST_PRACTICES.md)
- [FORMS_ACCESSIBILITY_BEST_PRACTICES](./FORMS_ACCESSIBILITY_BEST_PRACTICES.md)
- [TOOLTIP_ACCESSIBILITY_BEST_PRACTICES](./TOOLTIP_ACCESSIBILITY_BEST_PRACTICES.md)
- [ARIA_LIVE_REGIONS_BEST_PRACTICES](./ARIA_LIVE_REGIONS_BEST_PRACTICES.md)
- [TOUCH_POINTER_ACCESSIBILITY_BEST_PRACTICES](./TOUCH_POINTER_ACCESSIBILITY_BEST_PRACTICES.md)
- [SPEECH_RECOGNITION_ACCESSIBILITY_BEST_PRACTICES](./SPEECH_RECOGNITION_ACCESSIBILITY_BEST_PRACTICES.md)

## Visual Design

- [COLOR_CONTRAST_ACCESSIBILITY_BEST_PRACTICES](./COLOR_CONTRAST_ACCESSIBILITY_BEST_PRACTICES.md)
- [LIGHT_DARK_MODE_ACCESSIBILITY_BEST_PRACTICES](./LIGHT_DARK_MODE_ACCESSIBILITY_BEST_PRACTICES.md)
- [USER_PERSONALIZATION_ACCESSIBILITY_BEST_PRACTICES](./USER_PERSONALIZATION_ACCESSIBILITY_BEST_PRACTICES.md)
- [PRINT_ACCESSIBILITY_BEST_PRACTICES](./PRINT_ACCESSIBILITY_BEST_PRACTICES.md)
- [MODERN_CSS_THEME_ARCHITECTURE](./MODERN_CSS_THEME_ARCHITECTURE.md)

## Data Visualization

- [CHARTS_GRAPHS_ACCESSIBILITY_BEST_PRACTICES](./CHARTS_GRAPHS_ACCESSIBILITY_BEST_PRACTICES.md)
- [MAPS_ACCESSIBILITY_BEST_PRACTICES](./MAPS_ACCESSIBILITY_BEST_PRACTICES.md)
- [MERMAID_ACCESSIBILITY_BEST_PRACTICES](./MERMAID_ACCESSIBILITY_BEST_PRACTICES.md)
- [MERMAID_DIAGRAM_TYPES](./MERMAID_DIAGRAM_TYPES.md)
- [MERMAID_TRANSFORMATION_BEST_PRACTICES](./MERMAID_TRANSFORMATION_BEST_PRACTICES.md)

## Progressive Enhancement and Quality

- [PROGRESSIVE_ENHANCEMENT_BEST_PRACTICES](./PROGRESSIVE_ENHANCEMENT_BEST_PRACTICES.md)
- [OPQUAST_DIGITAL_QUALITY_BEST_PRACTICES](./OPQUAST_DIGITAL_QUALITY_BEST_PRACTICES.md)

## Contributing and Guidance

- [CONTRIBUTING_A11Y](./CONTRIBUTING_A11Y.md)
- [COPILOT_AGENT_MODE_GUIDE](./COPILOT_AGENT_MODE_GUIDE.md)

## YAML / Workflow Assets

- [A11Y_SHIFT_LEFT_WORKFLOW.yml](./A11Y_SHIFT_LEFT_WORKFLOW.yml)
- [AGENT_BOOTSTRAP_WORKFLOW.yml](./AGENT_BOOTSTRAP_WORKFLOW.yml) - GitHub Actions `workflow_dispatch` that launches the Copilot coding agent to auto-generate ACCESSIBILITY.md
- [AGENT_REMEDIATION_WORKFLOW.yml](./AGENT_REMEDIATION_WORKFLOW.yml) - GitHub Actions workflow triggered by accessibility issue label events; invokes Copilot coding agent to propose a fix as a draft PR
- [BROWSER_TESTING_WORKFLOW.yml](./BROWSER_TESTING_WORKFLOW.yml) - Multi-browser accessibility testing
- [PRE_COMMIT_ACCESSIBILITY_SAMPLE.yaml](./PRE_COMMIT_ACCESSIBILITY_SAMPLE.yaml)
- [TRUSTED_SOURCES.yaml](./TRUSTED_SOURCES.yaml) - Machine-readable source metadata for discovery and review, with automated monthly maintenance. Includes procurement requirements from [CivicActions Open Requirements Library](https://github.com/CivicActions/open-practice/blob/main/open-requirements-library/accessibility.md). See [maintenance documentation](../.github/TRUSTED_SOURCES_MAINTENANCE.md).

## Prompt Starters and Agent Tasks

- [COPILOT_BOOTSTRAP_AGENT_PROMPT.md](./COPILOT_BOOTSTRAP_AGENT_PROMPT.md) - Structured task description for the Copilot coding agent bootstrap workflow
- [COPILOT_REMEDIATION_AGENT_PROMPT.md](./COPILOT_REMEDIATION_AGENT_PROMPT.md) - Structured agent task descriptions for automated accessibility fix PRs (image-alt, label, link-name, heading-order, color-contrast, aria-required-attr)
- [ACCESSIBILITY_PROMPT_STARTER.md](./ACCESSIBILITY_PROMPT_STARTER.md)

## Action Playbook

- [Action Playbook](../action-playbook.md) - Practical workflow guide for teams and AI agents

## AI Agent Skills

AI agent skills have moved to their own repository: [accessibility-skills](https://github.com/mgifford/accessibility-skills). Topic-specific `.skill` archives are available there for global installation in Codex, Claude Code, and other AI coding assistants.