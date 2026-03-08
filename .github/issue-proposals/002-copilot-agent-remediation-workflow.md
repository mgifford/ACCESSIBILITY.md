---
title: "Add example: GitHub Copilot agent workflow for automated accessibility issue remediation"
labels:
  - enhancement
  - ai-agent
  - ci-cd
priority: Medium
---

## Summary

The project already shows how to **detect** accessibility issues automatically (via `github/accessibility-scanner`, axe-core, Lighthouse CI). The missing piece is the **fix** loop. GitHub's accessibility agent documentation at [accessibility.github.com/documentation/guide/getting-started-with-agents/](https://accessibility.github.com/documentation/guide/getting-started-with-agents/) describes how Copilot coding agents can be triggered by issue events to automatically propose fixes as pull requests.

This issue proposes adding an example workflow that closes the detect → fix cycle: when the accessibility scanner creates an issue, a Copilot coding agent is invoked to analyse the finding and open a PR with a proposed fix, ready for human review.

## Problem

The current CI/CD and scanner examples stop at detection:

1. Scanner runs → finding created as a GitHub issue.
2. Human reads the issue.
3. Human writes a fix.
4. Human opens a PR.

Steps 2–4 can take days or weeks. For common, well-understood violation types (missing `alt` attributes, unlabelled form inputs, missing `<label>` associations, inadequate heading hierarchy), a coding agent can propose a correct fix in seconds, cutting the remediation cycle dramatically.

The project currently has no example showing this pattern, leaving adopters to discover it independently or not at all.

## Proposed Solution

Add a complete example of the **detect → agent-fix → human-review** loop:

### Trigger

A GitHub Actions workflow that fires on:
- Issue opened with label `accessibility` (created by `github/accessibility-scanner`)
- `workflow_dispatch` (manual trigger with an issue number as input)

### Agent task

The Copilot coding agent receives:
1. The issue body (violation type, affected element, file/URL, axe rule ID).
2. The relevant source file(s) from the repository.
3. A structured task description that tells it which WCAG criterion is violated and what a correct fix looks like.

The agent then:
1. Locates the offending code.
2. Applies the minimal fix required to pass the axe rule.
3. Opens a draft PR linked to the original issue, with a description explaining the change and the WCAG criterion satisfied.

### Deliverables

| File | Purpose |
|------|---------|
| `examples/AGENT_REMEDIATION_WORKFLOW.yml` | GitHub Actions workflow triggered by accessibility issue events |
| `examples/COPILOT_REMEDIATION_AGENT_PROMPT.md` | Structured task descriptions for common violation types |
| Updates to `examples/CI_CD_ACCESSIBILITY_BEST_PRACTICES.md` | Add "Phase 4: Agent-driven remediation" section |
| Updates to `examples/GITHUB_ACCESSIBILITY_SCANNER_INTEGRATION.md` | Add note about connecting scanner findings to remediation agent |

### Example agent task description for `image-alt` violations (draft)

```text
You are an accessibility engineer. An automated scanner found this issue:

  Rule: image-alt (WCAG 1.1.1 – Non-text Content)
  Impact: Critical
  Element: <img src="{{src}}" class="{{class}}">
  File: {{file_path}}, line {{line_number}}

Your task:
1. Open the file at {{file_path}}.
2. Locate the <img> element on or near line {{line_number}}.
3. Add a meaningful alt attribute. Use surrounding context (caption, adjacent heading, filename) to infer a useful description. If the image is decorative, add alt="".
4. Verify no other images in the same file are missing alt attributes.
5. Commit the change to a new branch named fix/a11y-image-alt-{{issue_number}}.
6. Open a draft pull request. In the PR body, explain the change and cite WCAG 1.1.1 Success Criterion.

Do not change anything unrelated to the accessibility fix.
```

### Violation types to cover in initial examples

| axe Rule ID | WCAG SC | Fix complexity |
|-------------|---------|---------------|
| `image-alt` | 1.1.1 | Low |
| `label` | 1.3.1 | Low |
| `color-contrast` | 1.4.3 | Medium |
| `link-name` | 2.4.4 | Low |
| `heading-order` | 1.3.1 | Low |
| `aria-required-attr` | 4.1.2 | Medium |

## Acceptance Criteria

- [ ] `examples/AGENT_REMEDIATION_WORKFLOW.yml` is a valid GitHub Actions workflow.
- [ ] The workflow is triggered by an issue label event (label: `accessibility`) and by `workflow_dispatch`.
- [ ] At least three violation-type-specific agent prompts are documented in `examples/COPILOT_REMEDIATION_AGENT_PROMPT.md`.
- [ ] The PR created by the agent is a **draft** PR (not auto-merged).
- [ ] `examples/CI_CD_ACCESSIBILITY_BEST_PRACTICES.md` is updated to include the remediation loop as a pipeline layer.
- [ ] Documentation notes that the pattern requires a Copilot seat with agent capabilities and appropriate repository permissions.

## Security Considerations

- The agent workflow must run with **minimum required permissions** (contents: write, pull-requests: write — no broader access).
- Agent-created PRs must be reviewed by a human before merging.
- The agent must not have access to secrets beyond what is required to create the branch and PR.

## References

- GitHub accessibility agents guide: https://accessibility.github.com/documentation/guide/getting-started-with-agents/
- GitHub accessibility scanner: https://github.com/github/accessibility-scanner
- Existing CI/CD guide: [examples/CI_CD_ACCESSIBILITY_BEST_PRACTICES.md](../examples/CI_CD_ACCESSIBILITY_BEST_PRACTICES.md)
- Existing scanner integration: [examples/GITHUB_ACCESSIBILITY_SCANNER_INTEGRATION.md](../examples/GITHUB_ACCESSIBILITY_SCANNER_INTEGRATION.md)
- axe-core rules: [examples/AXE_RULES_REFERENCE.md](../examples/AXE_RULES_REFERENCE.md)
