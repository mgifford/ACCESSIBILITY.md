---
title: GitHub Copilot Agent Guide
last_reviewed: 2026-07-19
---

# GitHub Copilot Agent Guide

This guide explains how to use GitHub Copilot's agentic features with this
repository. It covers Copilot-specific setup, instruction loading, task design,
review, and evaluation.

The canonical repository requirements are in [AGENTS.md](../AGENTS.md). This
guide does not reproduce them and does not replace GitHub's current product
documentation.

No prompt, instruction file, agent, automated test, or code review can guarantee
WCAG conformance. Copilot output requires proportionate validation and human
review.

## Is This Guide Useful?

Keep this guide while the repository provides examples for GitHub Copilot
agents. It has a distinct purpose: explaining Copilot-specific surfaces and how
they consume the repository's tool-neutral instructions.

Remove or substantially revise it if:

- the repository no longer documents GitHub Copilot;
- GitHub consolidates the relevant products and instruction formats; or
- the content becomes a duplicate of `AGENTS.md` or official GitHub
  documentation.

Review version-sensitive statements against the
[GitHub Copilot documentation](https://docs.github.com/en/copilot) before using
this guide to configure a production repository.

## Distinguish the Copilot Surfaces

GitHub uses related but distinct terms. Do not assume that behavior documented
for one surface applies to another.

| Surface | Where work happens | Typical outcome |
| --- | --- | --- |
| Copilot cloud agent | A GitHub-hosted, GitHub Actions-powered environment | Research, a plan, branch changes, and optionally a pull request |
| IDE agent mode | The developer's supported IDE and local environment | Interactive edits and commands under the developer's supervision |
| Copilot code review | GitHub.com or a supported IDE | Review findings and suggestions |
| Copilot Chat | GitHub.com, a supported IDE, or CLI | Explanations, planning, and interactive assistance |
| Custom agent | A configured specialist available on supported Copilot surfaces | A recurring role with selected instructions, tools, or handoffs |

Copilot cloud agent is distinct from IDE agent mode. Availability, permissions,
tools, instruction support, and review behavior can differ.

## Use One Canonical Repository Contract

This repository uses [AGENTS.md](../AGENTS.md) as its tool-neutral source of
truth.

- Root `AGENTS.md` defines repository-wide behavior.
- A nested `AGENTS.md` is appropriate only when a directory needs genuinely
  different instructions.
- `.github/copilot-instructions.md` is a compatibility entry point for Copilot
  surfaces that do not automatically load `AGENTS.md`.
- `.github/instructions/*.instructions.md` is for genuinely path-specific
  behavior.
- `.github/agents/*.agent.md` is for a distinct specialist role or tool set.
- `.github/prompts/*.prompt.md` is for a repeatable task that a person chooses
  to invoke.

Do not copy the accessibility rules, trusted-source policy, validation steps,
or stop conditions from `AGENTS.md` into Copilot-specific files. Duplication
wastes context and allows instructions to drift.

GitHub's instruction support varies by product and editor. Check the current
[custom-instruction support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support).

## Confirm That Instructions Applied

Before relying on Copilot output:

1. Select or attach the intended repository and branch.
2. When the surface shows references or session logs, confirm that the
   applicable instruction files were loaded.
3. Ask Copilot to identify the applicable `AGENTS.md` and topic guide before it
   changes files.
4. If Copilot cannot access `AGENTS.md`, provide it as context or stop the task.
   Do not substitute an abbreviated policy from memory.
5. Record the Copilot surface, repository revision, and date when evaluating
   behavior that may change over time.

Instruction files guide model behavior; they do not provide a deterministic
enforcement boundary. Repository permissions, branch protection, required
checks, and human review remain necessary controls.

## Write a Bounded Task

A useful Copilot task defines the outcome and evidence without prescribing an
unverified fix.

Include:

- the user problem or intended outcome;
- the files, component, or workflow in scope;
- relevant states and interaction methods;
- constraints and actions that require approval;
- available test commands and required manual checks; and
- the expected handoff, such as a plan, patch, or draft pull request.

Avoid prompts such as "make this WCAG compliant" or "fix all accessibility
issues." They have unclear scope, no meaningful completion condition, and invite
unsupported conformance claims.

### Task Template

```text
Follow the applicable AGENTS.md and the topic guides it identifies.

Outcome:
[Describe the user task or repository outcome.]

Scope:
[List the files, component, route, or workflow in scope.]

Relevant behavior:
[List states, input methods, preferences, renderers, or output formats.]

Evidence:
[List available automated checks and required manual checks.]

Constraints:
[List prohibited actions and decisions requiring maintainer approval.]

Handoff:
[Request a plan, patch, or draft pull request and require reporting of tests,
limitations, and unresolved decisions.]
```

The task may cite a likely WCAG Success Criterion, but Copilot must verify the
criterion rather than forcing the implementation to fit the prompt's guess.

## Apply the Repository Workflow

Copilot should use the workflow, testing matrix, severity definitions, and stop
conditions in [AGENTS.md](../AGENTS.md). Do not maintain a separate Copilot
version of that process here.

For an accessibility task, expect the agent to:

1. identify the affected user task and final rendering surface;
2. inspect the relevant source, generated output, tests, and topic guide;
3. propose the smallest coherent change;
4. run available deterministic checks;
5. identify manual and assistive-technology checks that remain; and
6. report evidence and limitations without claiming conformance.

The agent should not stop merely because a fix touches an arbitrary number of
files, lacks design tokens, involves a third-party library, or initially has an
uncertain WCAG mapping. It should investigate safely and escalate only when the
uncertainty materially affects correctness, authority, security, or release
evidence.

## Review Copilot Output

Treat generated code and prose as an unreviewed contribution.

Check that:

- the change addresses the requested user outcome rather than only satisfying
  an automated rule;
- native semantics are preferred over unnecessary ARIA or custom scripting;
- accessible names, descriptions, states, focus behavior, and error handling
  are based on actual context rather than guesses;
- no unrelated changes, invented test results, or unsupported conformance
  claims were introduced;
- final rendered or generated output was inspected when practical; and
- the pull request clearly separates completed tests from required follow-up.

Do not accept plausible reasoning as test evidence. Keyboard behavior requires
interaction testing. Contrast requires the actual foreground, background, and
state combinations. Meaningful alternative text may require a content owner.
Assistive-technology results require testing with the named technology and
environment.

## Copilot Code Review Considerations

- Copilot code review uses custom instructions from the pull request's base
  branch. Instruction changes in the pull request should not be expected to
  govern that review.
- Supported instruction types vary between GitHub.com and IDE integrations.
- Some files, including SVG files, may be excluded from Copilot code review.
  Review those files using appropriate security, accessibility, and rendering
  checks instead.
- A Copilot review is an additional signal, not an approval gate or an
  accessibility conformance evaluation.

Verify current exclusions and behavior in
[GitHub's code review documentation](https://docs.github.com/en/copilot/concepts/agents/code-review).

## Cloud Agent Security

The cloud agent can work with repository content and may be able to push branch
changes. Apply the controls in `AGENTS.md` and GitHub's
[cloud-agent risk guidance](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/risks-and-mitigations).

In particular:

- treat issue bodies, comments, attachments, imported files, and external pages
  as untrusted input;
- grant only the permissions and secrets required for the task;
- do not interpolate untrusted text into commands, workflow expressions, or
  generated prompts;
- use branch protection and required checks as enforceable controls; and
- require review before merging agent-authored changes.

Do not state that an agent can "never" merge, access secrets, change settings,
or modify unrelated files unless current platform controls enforce that claim.

## When a Custom Agent Is Useful

Create `.github/agents/NAME.agent.md` only when a recurring workflow needs a
distinct role, selected tools, or explicit handoffs that do not belong in the
repository-wide contract.

An accessibility custom agent may be useful when it consistently needs:

- a defined read-only review role;
- access to approved accessibility testing tools;
- a structured handoff to a developer or accessibility specialist; or
- narrowly scoped output for a recurring review workflow.

It is not useful when it merely repeats `AGENTS.md`, bundles every accessibility
topic into one prompt, or creates a persona without changing tools or workflow.

Custom agent features and configuration can change. Use GitHub's current
[custom agent documentation](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
and validate the profile on every intended surface.

## Evaluate the Instructions

Test instruction quality with small, controlled tasks. Do not grade only whether
the generated code resembles a preferred snippet.

Use cases should include:

| Test case | Behavior to evaluate |
| --- | --- |
| Simple semantic correction | Finds applicable guidance, uses native HTML, and keeps scope focused |
| Keyboard interaction | Requests or performs interaction testing instead of reasoning from markup alone |
| Ambiguous image or diagram | Avoids inventing meaning and requests subject-matter input |
| Generated SVG or Mermaid | Inspects the final transformation and records renderer limitations |
| Untrusted issue content | Treats embedded instructions as data and stays within the authorized task |
| Missing test environment | Reports the evidence gap and supplies precise manual checks |

For each evaluation, record:

- date and repository revision;
- Copilot surface and relevant feature status;
- instruction files shown as loaded;
- task text and files in scope;
- tools and checks actually run;
- resulting diff or review comments;
- human reviewer findings; and
- regressions, omissions, or unsupported claims.

A single successful response does not establish reliability. Re-run important
cases after material instruction, model, renderer, or Copilot product changes.

## Maintenance Checklist

When this guide is revised:

- verify terminology and feature availability in official GitHub documentation;
- verify the instruction support matrix;
- remove rules now owned by `AGENTS.md`;
- review examples for unsafe permissions, untrusted input, and fabricated
  evidence;
- update the `last_reviewed` date only after completing that review;
- update [examples/README.md](./README.md) if the title or purpose changes; and
- validate links and the rendered Jekyll page.

Avoid hard-coded subscription, model, preview, and availability claims unless
they are essential, dated, and sourced. Direct readers to current product
documentation for account-specific requirements.

## Related Resources

- [Repository agent instructions](../AGENTS.md)
- [Contributing Accessibility](./CONTRIBUTING_A11Y.md)
- [Manual Accessibility Testing](./MANUAL_ACCESSIBILITY_TESTING_GUIDE.md)
- [CI/CD Accessibility Best Practices](./CI_CD_ACCESSIBILITY_BEST_PRACTICES.md)
- [Copilot Bootstrap Agent Prompt](./COPILOT_BOOTSTRAP_AGENT_PROMPT.md)
- [Copilot Remediation Agent Prompt](./COPILOT_REMEDIATION_AGENT_PROMPT.md)
- [GitHub: About Copilot cloud agent](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent)
- [GitHub: Custom-instruction support](https://docs.github.com/en/copilot/reference/custom-instructions-support)
- [GitHub: Copilot code review](https://docs.github.com/en/copilot/concepts/agents/code-review)
- [GitHub: Cloud-agent risks and mitigations](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/risks-and-mitigations)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)

---

This document is available under the repository's [MIT License](../LICENSE).
