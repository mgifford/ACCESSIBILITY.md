---
title: GitHub Accessibility Scanner Integration
---

# GitHub Accessibility Scanner Integration

The
[GitHub Accessibility Scanner](https://github.com/github/accessibility-scanner)
is a GitHub Action that scans web pages, files accessibility findings as GitHub
issues, and can optionally assign those issues to GitHub Copilot.

The scanner is in public preview. Its inputs, permissions, issue lifecycle,
scan engines, Copilot integration, and storage behavior can change. Pin a
reviewed commit, record the review date, and recheck the upstream documentation
before every update.

The scanner can provide useful automated evidence. It cannot establish WCAG
conformance, determine the quality of every alternative, reproduce every user
task, or guarantee that a proposed fix is accessible.

## Recommended Use in This Project

Use the scanner for detection and issue tracking. Keep remediation as a
separate, human-triggered process:

1. Run the scanner in dry-run mode and review its scope and output.
2. Enable issue filing only after labels, ownership, grouping, and lifecycle
   behavior are agreed.
3. Set `skip_copilot_assignment: "true"` so the scanner does not independently
   assign issues to Copilot.
4. Have a human triage each finding and confirm the affected user task.
5. When AI assistance is useful, manually run
   [`AGENT_REMEDIATION_WORKFLOW.yml`](./AGENT_REMEDIATION_WORKFLOW.yml) with the
   issue number.
6. Review and apply an acceptable patch through the repository's normal branch
   and pull-request process.
7. Retest the final result with applicable automated, manual, and assistive
   technology checks.

This separation prevents two agents from acting on the same issue and keeps
issue content from automatically triggering a workflow that can modify the
repository.

## Decide Whether the Scanner Fits

Before adoption, confirm that the repository accepts these characteristics:

- The action requires a personal access token (PAT); the upstream documentation
  says the default `GITHUB_TOKEN` cannot be used.
- The documented PAT permissions are broad because the action can maintain a
  cache branch, file and update issues, and create Copilot remediation pull
  requests.
- The action stores finding state on an orphan `gh-cache` branch.
- It can close issues when a finding is absent from a later scan and reopen
  closed issues when a finding returns.
- Screenshots, when enabled, are also stored through the cache mechanism.
- Authenticated scans can expose sensitive session state or page content if
  inputs, logs, issues, screenshots, or artifacts are mishandled.
- The action and its dependencies execute third-party code in the workflow.
- Preview behavior and interfaces may change without the stability expected of
  a mature production dependency.

If the required credential or mutation scope is not acceptable, use a
read-only scanner that produces an artifact and let a separate reviewed process
create issues.

## Current Interface

The following inputs were verified in the upstream `action.yml` at commit
`21949ebcfc3229fb9338799f85608c60683ac3f6` on 2026-07-19. This table is a
review record, not a substitute for checking the pinned action.

| Input | Purpose | Review notes |
| --- | --- | --- |
| `urls` | Newline-delimited scan targets | Required unless `url_configs` is supplied |
| `url_configs` | Per-URL configuration and Axe exclusions | Exclusions require narrow justification and review |
| `repository` | Repository where issues and pull requests are managed | Confirm the target explicitly |
| `token` | PAT used by the action | A separate credential; workflow token permissions do not constrain it |
| `cache_key` | Path used for persisted finding state | Use a stable, unique value per scan surface |
| `base_url` | GitHub API URL | Required for applicable GitHub Enterprise Server configurations |
| `login_url`, `username`, `password` | Simple authenticated scan | Keep credentials in secrets, never literal workflow text |
| `auth_context` | Serialized authenticated browser state | Treat as a high-value secret |
| `skip_copilot_assignment` | Prevent Copilot assignment | Set to `true` for the review-only pattern in this guide |
| `include_screenshots` | Store and link screenshots | Default `false`; screenshots may contain sensitive information |
| `open_grouped_issues` | Create a tracking issue for related findings | Decide whether this improves or duplicates triage |
| `group_by` | Group by finding, rule, or rule and URL | Choose based on ownership and remediation workflow |
| `file_best_practice_issues` | File findings categorized as best practices | Consider disabling initially to reduce untriaged volume |
| `file_experimental_issues` | File findings categorized as experimental | Consider disabling until the team reviews stability |
| `reduced_motion` | Set the Playwright motion preference | One configured state does not cover every preference |
| `color_scheme` | Set the Playwright color scheme | Run separate configurations for materially different themes |
| `scans` | Choose Axe, AccessLint, or scanner plugins | Default is Axe; review every added engine and plugin |
| `dry_run` | Report proposed mutations without performing them | Use for initial configuration and material updates |

Input availability, defaults, and accepted values are version-sensitive.

## Start with a Dry Run

Use a manual trigger first. The example below pins the scanner to the commit
reviewed for this guide. Re-review and replace the SHA before adoption.

GitHub expression syntax is wrapped in a Jekyll raw block so the documentation
site does not interpret it.

{% raw %}

```yaml
name: Accessibility Scanner Preview

on:
  workflow_dispatch:

permissions:
  contents: read

jobs:
  preview:
    runs-on: ubuntu-latest
    timeout-minutes: 30

    steps:
      - name: Preview accessibility findings
        # github/accessibility-scanner, reviewed 2026-07-19.
        uses: github/accessibility-scanner@21949ebcfc3229fb9338799f85608c60683ac3f6
        with:
          urls: |
            https://example.com/
          repository: ${{ github.repository }}
          token: ${{ secrets.ACCESSIBILITY_SCANNER_TOKEN }}
          cache_key: scanner-cache/example.com.json
          dry_run: "true"
          skip_copilot_assignment: "true"
          include_screenshots: "false"
          file_best_practice_issues: "false"
          file_experimental_issues: "false"
          color_scheme: light
          reduced_motion: reduce
```

{% endraw %}

Replace `https://example.com/` and the cache key. Do not enable the example
until the target, secret, action commit, and organization policy have been
reviewed.

In the pinned version, dry-run mode does not open, close, reopen, or assign
issues and does not write the cache. It still runs the scanner and can place
finding details in workflow logs. Review log visibility and retention before
scanning private or authenticated content.

## Token and Permission Model

Two permission systems are involved:

1. The workflow's `permissions:` block controls the automatically generated
   `GITHUB_TOKEN`.
2. `ACCESSIBILITY_SCANNER_TOKEN` is a separate PAT passed directly to the
   action.

Setting `contents: read` for `GITHUB_TOKEN` does not reduce the PAT's authority.
The action can perform every operation granted to that PAT within its repository
scope.

At the time of review, the scanner README documented a fine-grained PAT with:

- Actions: write
- Contents: write
- Issues: write
- Pull requests: write
- Metadata: read
- access limited to the workflow repository and target repository

The upstream `action.yml` describes contents, issues, and pull-request write
access, while the README additionally lists Actions write. Treat the difference
as a reason to verify the exact pinned version rather than guessing.

Use these safeguards:

- Create a dedicated fine-grained PAT for the scanner.
- Limit it to the smallest possible repository set.
- Do not reuse a personal token with organization-wide access.
- Store it as an Actions secret; never commit it or echo it.
- Set an owner, purpose, expiry or rotation date, and revocation procedure.
- Test whether the selected pinned configuration works with narrower
  permissions. Record the result rather than assuming.
- If the action will not work with permissions the organization accepts, do not
  enable mutation mode.
- Review organization and enterprise policies that may override repository
  settings.

## Move from Preview to Issue Filing

After reviewing dry-run output:

1. Define the scan inventory and expected coverage.
2. Decide which findings create issues.
3. Select grouping that matches ownership.
4. Define labels, severity triage, and response ownership.
5. Review cache and issue lifecycle behavior.
6. Keep Copilot assignment disabled for this project's separate remediation
   workflow.
7. Change `dry_run` to `"false"` in a test repository or branch.
8. Inspect created, updated, closed, and reopened issues.
9. Confirm no sensitive data appears in issues, logs, cache content, or
   screenshots.
10. Add a schedule only after the first mutation run behaves as expected.

Do not automatically assign project severity from an Axe, AccessLint, or
scanner category. Use the taxonomy in
[Accessibility Bug Reporting](./ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES.md)
and evaluate the actual user task and impact.

## Scan Scope and Coverage

Create a machine-readable or reviewed inventory containing:

- canonical URL;
- page or template owner;
- public and authenticated states;
- critical user tasks represented;
- theme, contrast, motion, viewport, locale, and permission variants;
- last successful scan date; and
- deliberate exclusions with owner and review date.

One run with `color_scheme: light` does not cover dark or system behavior. One
run with `reduced_motion: reduce` does not cover the default motion state. Use
separate jobs, matrices, or scheduled configurations when the rendered output
materially differs.

Keep the scan matrix proportionate. Fast browser checks can run on pull
requests; deeper crawls and preference combinations can run on a schedule or
before release.

### URL authorization and boundaries

- Scan only sites and environments the project is authorized to test.
- Prefer staging or production-like test environments for authenticated scans.
- Do not send high request volumes to third-party services.
- Bound the URL list, runtime, and schedule.
- Review redirects so a trusted URL cannot silently move the scan to an
  unintended host.
- Do not place credentials in URLs.
- Treat content returned by scanned pages as untrusted.

## Authenticated Scanning

The scanner supports simple username and password inputs and serialized
authentication context. Authenticated state can contain cookies, tokens,
personal information, account data, and confidential page content.

Before enabling it:

- use a dedicated least-privileged test account;
- keep passwords and authentication context in Actions secrets;
- prevent secrets from appearing in command output;
- review whether issue text or screenshots can expose protected content;
- disable screenshots unless they are required and safe;
- avoid production accounts with destructive permissions;
- define session expiry and credential rotation; and
- test logout, timeout, permission, and failure behavior separately where they
  affect user tasks.

Do not treat successful login as evidence that the authenticated task is
accessible.

## Finding and Issue Lifecycle

The scanner persists state on an orphan `gh-cache` branch. According to the
upstream FAQ, it uses that state to avoid duplicate issues, close issues when a
finding disappears, and reopen issues when the same finding returns.

Review these consequences:

- A finding can disappear because of a scan failure, changed scope, timing,
  authentication failure, selector exclusion, or tool update—not only because
  the barrier was fixed.
- Automatic closure is not verification that the user task now works.
- Resetting or deleting the cache can cause previously tracked findings to be
  filed or reopened.
- The upstream `wontfix` label prevents some closed findings from reopening.
  Use a project-approved exception process rather than an unexplained label.
- Cache content and screenshot storage require the same retention and privacy
  review as other test artifacts.

Require human review before treating automatic closure as remediation evidence.
Link the final code change and manual verification to the issue where practical.

## Grouping and Noise Management

The scanner can create one issue per finding, one per rule, or one per rule and
URL. Choose based on how work is owned:

| Grouping | Advantage | Risk |
| --- | --- | --- |
| `finding` | Precise reproduction and closure | High issue volume |
| `rule` | Lower volume and centralized rule discussion | Different components and owners become mixed |
| `rule+url` | Page-level ownership with some consolidation | Repeated template defects may remain fragmented |

Do not stop all scheduled scans merely because accessibility issues remain
open. That can hide new regressions. Use the scanner's cache, stable finding
identity, grouping, triage queues, and response ownership to manage noise.

The `best-practice` and `experimental` categories are scanner metadata. They do
not decide WCAG conformance, user impact, or project severity. Review them
before enabling automatic issue creation.

Every exclusion should identify:

- the exact URL, selector, rule, engine, or state;
- why the result is not actionable;
- evidence supporting the decision;
- an owner and linked issue;
- an expiry or review date; and
- the narrowest possible scope.

## Scanner Engines and Plugins

The reviewed version defaults to Axe and can opt into AccessLint or plugins
through `scans`.

Adding an engine or plugin changes coverage, dependencies, runtime, network
behavior, findings, and possibly licensing. Before enabling one:

- verify the package, publisher, source, license, and maintenance status;
- pin the scanner and plugin version where supported;
- inspect installation scripts and transitive dependencies;
- compare duplicate and conflicting findings;
- document rules and known limitations; and
- repeat dry-run and mutation lifecycle testing.

Multiple engines can increase coverage, but duplicated findings without clear
ownership can reduce the value of the system.

## Copilot Options

There are two distinct patterns. Choose one deliberately.

### Scanner-managed Copilot assignment

The scanner can assign findings to GitHub Copilot, which may propose pull
requests. This is the upstream integrated model. It requires the applicable
Copilot plan, repository configuration, and write-capable credential. Review
current GitHub documentation and the scanner's pinned implementation before
using it.

### Separate review-only remediation

This repository's recommended model sets `skip_copilot_assignment: "true"` and
uses:

- [`COPILOT_REMEDIATION_AGENT_PROMPT.md`](./COPILOT_REMEDIATION_AGENT_PROMPT.md)
  for the bounded task;
- [`AGENT_REMEDIATION_WORKFLOW.yml`](./AGENT_REMEDIATION_WORKFLOW.yml) to create
  an uncommitted patch and report artifact; and
- human review, application, and retesting through the normal contribution
  workflow.

The reference remediation workflow does not commit, push, open or merge a pull
request, close an issue, deploy, or modify repository settings.

Do not enable both remediation paths for the same findings without an explicit
deduplication and ownership design.

## Supply-Chain and Workflow Security

- Pin the scanner to a reviewed full commit SHA, not `@v3` or `@main`.
- Review the scanner's composite action and all transitive action references.
- Recheck the SHA, source diff, release notes, inputs, and permissions before an
  update.
- Set explicit read-only `GITHUB_TOKEN` permissions unless another workflow
  step requires more.
- Remember that the separate PAT is not constrained by `permissions:`.
- Keep secrets unavailable to untrusted forked pull-request code.
- Avoid `pull_request_target` when untrusted code or configuration can execute.
- Treat URLs, page content, scanner results, issue bodies, plugins, screenshots,
  and cached data as untrusted input.
- Add timeouts and concurrency controls.
- Review logs, issues, and the `gh-cache` branch for accidental secret or
  personal-data exposure.
- Revoke the PAT immediately if exposure is suspected.
- Follow the scanner repository's private security-reporting process for a
  suspected vulnerability; do not disclose it in a public issue.

## Validation Checklist

### Before enabling

- [ ] The scanner is still in a support state the project accepts.
- [ ] The exact action commit and transitive dependencies are reviewed.
- [ ] Scan targets and crawl boundaries are authorized.
- [ ] The PAT is dedicated, repository-scoped, stored as a secret, and owned.
- [ ] Required PAT permissions are verified against the pinned implementation.
- [ ] `GITHUB_TOKEN` permissions are explicit.
- [ ] Copilot assignment is intentionally enabled or disabled.
- [ ] Screenshots and authenticated scanning have a privacy review.
- [ ] Grouping, labels, owners, and issue lifecycle are defined.
- [ ] Best-practice and experimental findings are intentionally configured.
- [ ] Exclusions are narrow, documented, owned, and dated.

### Dry run

- [ ] Expected URLs, states, themes, and preferences are reached.
- [ ] Login, redirects, timeouts, and failures behave safely.
- [ ] Logs contain no secrets or sensitive content.
- [ ] Findings are reproducible and useful to a reviewer.
- [ ] Missing coverage and false positives are documented.

### Mutation test

- [ ] Issues are created and grouped as intended.
- [ ] Duplicate findings update existing state correctly.
- [ ] Resolved, absent, and recurring findings receive human review.
- [ ] Cache and screenshot content are acceptable.
- [ ] No unintended Copilot assignment or pull request occurs.
- [ ] Token audit logs and repository changes match expectations.

### Ongoing operation

- [ ] Failed and skipped workflow runs are monitored.
- [ ] Action, browser, engine, rule, and configuration versions are recorded.
- [ ] Dependency updates repeat dry-run validation.
- [ ] PAT ownership, permissions, and rotation are reviewed.
- [ ] Open findings have owners and review dates.
- [ ] Automated closure is not treated as conclusive remediation evidence.
- [ ] Manual testing continues for requirements automation cannot evaluate.

## Related Project Guidance

- [CI/CD Accessibility Best Practices](./CI_CD_ACCESSIBILITY_BEST_PRACTICES.md)
- [Shift-Left Accessibility Automation](./SHIFT_LEFT_ACCESSIBILITY_AUTOMATION.md)
- [Accessibility Bug Reporting](./ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES.md)
- [Manual Accessibility Testing](./MANUAL_ACCESSIBILITY_TESTING_GUIDE.md)
- [Contributing Accessibility](./CONTRIBUTING_A11Y.md)
- [Copilot Agent Mode Guide](./COPILOT_AGENT_MODE_GUIDE.md)
- [Remediation Workflow](./AGENT_REMEDIATION_WORKFLOW.yml)
- [Remediation Prompt](./COPILOT_REMEDIATION_AGENT_PROMPT.md)
- [Trusted Sources Registry](./TRUSTED_SOURCES.yaml)

## Primary References

- [GitHub Accessibility Scanner README](https://github.com/github/accessibility-scanner/blob/main/README.md)
- [GitHub Accessibility Scanner action.yml](https://github.com/github/accessibility-scanner/blob/main/action.yml)
- [GitHub Accessibility Scanner FAQ](https://github.com/github/accessibility-scanner/blob/main/FAQ.md)
- [GitHub Accessibility Scanner Security Policy](https://github.com/github/accessibility-scanner/blob/main/SECURITY.md)
- [GitHub: Managing Fine-Grained Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)
- [GitHub Actions Secure Use Reference](https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions)
- [GitHub: Script Injections](https://docs.github.com/en/actions/concepts/security/script-injections)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [WAI: Understanding ACT Rules](https://www.w3.org/WAI/WCAG22/Understanding/understanding-act-rules)

Version-sensitive claims and examples last reviewed: 2026-07-19.

---

This document is available under the repository's [MIT License](../LICENSE).
