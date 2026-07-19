---
title: CI/CD Accessibility Best Practices
---

# CI/CD Accessibility Best Practices

> **Canonical source:** This guide is the source of truth for the companion
> `skills/ci-cd/SKILL.md` file in
> [accessibility-skills](https://github.com/mgifford/accessibility-skills).
> Update the skill separately when this guide changes; synchronization is not
> automatic.

Continuous integration can prevent known accessibility regressions, preserve
tested semantics, and produce evidence for human review. It cannot establish
WCAG conformance by itself. Automated rules, scores, snapshots, and AI output
are inputs to an accessibility evaluation, not substitutes for one.

This guide targets WCAG 2.2 Level AA for in-scope content and user tasks. That
target is not a claim that a repository, build, page, or product conforms.

## Principles

- Test complete user tasks and relevant states, not only page loads.
- Run fast deterministic checks locally and repeat them in CI.
- Block known regressions using explicit, reviewable rules.
- Keep accessibility, performance, security, and functional signals distinct.
- Test the final rendered, sanitized, optimized, or exported output.
- Record scope, versions, configuration, results, and known coverage gaps.
- Keep humans responsible for severity, alternatives, exceptions, and release
  decisions.
- Give workflows and agents the least authority needed for their task.

## A Layered Testing Model

No single tool covers the accessibility requirements of a user experience.
Choose layers based on the affected task and the likelihood and consequence of
a regression.

| Layer | Typical checks | Useful for | Does not establish |
| --- | --- | --- | --- |
| Static analysis | HTML, templates, framework lint rules | Fast feedback on detectable source patterns | Runtime behavior or final output |
| Unit and component tests | Names, roles, states, errors, announcements | Stable component contracts | Whole-page reading and focus order |
| Browser rule scans | axe-core or equivalent | Detectable rules in rendered states | Complete WCAG coverage or usability |
| Semantic assertions | Role queries and ARIA snapshots | Accessibility-tree structure and changes | Exact screen-reader speech |
| Visual checks | Screenshots, contrast tools, reflow checks | Theme and layout regressions | Meaning, keyboard access, or text alternatives |
| End-to-end tests | Keyboard and pointer task flows | Operability, focus, state changes, errors | Assistive-technology interoperability by itself |
| Manual and assistive-technology testing | Task-based evaluation | Quality, sequence, interaction, and compatibility | Universal behavior across all configurations |

Use [Manual Accessibility Testing](./MANUAL_ACCESSIBILITY_TESTING_GUIDE.md)
for checks that automation cannot complete.

## Define the CI Contract Before Choosing Tools

Document the following for each check:

- the user task, page, component, and states covered;
- the command and configuration file;
- the tool, browser, runtime, and rule-set versions;
- whether the result warns, blocks, or only produces an artifact;
- the baseline or expected result;
- the owner and response process for failures;
- known false positives, exclusions, and untested requirements; and
- the evidence retained for review.

Do not describe a check as a merge gate unless branch protection or a ruleset
currently requires it. Do not describe a warning as a failure.

### Scores are not conformance percentages

A Lighthouse accessibility score measures the weighted audits Lighthouse ran
in one configuration. A score of 100 does not mean 100% WCAG conformance, and
a score of 90 does not mean a page is 90% accessible.

Use individual audit results to investigate regressions. A project may retain a
score threshold as an additional signal, but it should also fail on the
specific rules and tasks the team has decided are blocking.

Keep performance budgets separate. Accessibility and performance can support
each other, but a performance score must not raise or lower accessibility
severity.

## Local-First, Reproducible Setup

Install project dependencies in the repository and commit the lockfile. Avoid
requiring contributors or CI to install an unspecified latest global package.

Example `package.json` scripts:

```json
{
  "scripts": {
    "test:a11y": "playwright test tests/accessibility",
    "test:a11y:update": "playwright test tests/accessibility --update-snapshots",
    "test:a11y:ci": "playwright test tests/accessibility --reporter=line,json"
  }
}
```

Install and update dependencies through the project's package manager:

```bash
npm install --save-dev @playwright/test @axe-core/playwright
npx playwright install --with-deps chromium
npm run test:a11y
```

Commit the package manifest and lockfile together. In CI, use `npm ci` so the
resolved dependency graph matches the reviewed lockfile.

## Browser Rule Testing with Playwright and axe-core

Scan meaningful states after the page is ready and after relevant interaction.
Do not scan only the initial route if users must open a menu, submit a form, or
complete another action.

```typescript
import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const colorSchemes = ['light', 'dark'] as const;

for (const colorScheme of colorSchemes) {
  test(`home page in ${colorScheme} mode`, async ({ page }) => {
    await page.emulateMedia({ colorScheme });
    await page.goto('/');

    await expect(page.getByRole('main')).toBeVisible();

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });
}

test('navigation is tested while expanded', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Menu' }).click();
  await expect(page.getByRole('navigation', { name: 'Main' })).toBeVisible();

  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
```

Adapt selectors, routes, tags, and expected results to the application. Confirm
that each tag is supported by the installed axe-core version. A clean scan
means no violations were found in the tested scope; it does not mean no
accessibility barriers exist.

### Cover states and preferences deliberately

Include applicable combinations without creating an unnecessarily expensive
matrix:

- desktop and narrow reflow viewports;
- system, light, and dark theme behavior;
- default and increased contrast;
- forced colors;
- reduced motion;
- default, hover, focus, active, disabled, loading, success, and error states;
- signed-in, signed-out, timeout, and permission states; and
- supported browsers identified in [Browser Support](../BROWSER_SUPPORT.md).

Use pairwise or risk-based coverage for routine changes, then test every
applicable combination for high-risk components such as authentication,
payment, safety, and core navigation.

## Semantic Assertions and ARIA Snapshots

Role and accessible-name queries provide useful contracts for the browser's
computed accessibility representation:

```typescript
test('contact form exposes its controls and error', async ({ page }) => {
  await page.goto('/contact');

  const email = page.getByRole('textbox', { name: 'Email address' });
  await expect(email).toBeVisible();

  await page.getByRole('button', { name: 'Send message' }).click();
  await expect(page.getByText('Enter an email address')).toBeVisible();
  await expect(email).toHaveAttribute('aria-invalid', 'true');
});
```

ARIA snapshots can catch unexpected structural changes:

```typescript
test('main navigation retains its semantic structure', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('navigation', { name: 'Main' }))
    .toMatchAriaSnapshot(`
      - navigation "Main":
        - list:
          - listitem:
            - link "Home"
          - listitem:
            - link "About"
    `);
});
```

Review snapshot changes; do not update them mechanically. An ARIA snapshot is a
representation of an accessibility tree, not a transcript of what every screen
reader will announce. Speech output also depends on the assistive technology,
browser, operating system, settings, navigation mode, and user action.

## Visual and Preference Regression Tests

Visual tests can find clipped text, missing focus indicators, theme-specific
contrast changes, and reflow regressions. Keep separate reviewed baselines for
materially different themes and forced-colors behavior.

Do not use screenshot equality as the only contrast test. Anti-aliasing,
transparency, gradients, images, browser rendering, and overlays can make
pixel-based results unreliable. Confirm computed colors and visually inspect
the final state where contrast is critical.

When animations are not the subject of the test, emulate reduced motion and
disable nonessential animation to improve determinism. Never remove an
animation from the product merely to make a screenshot pass.

## CI Workflow Pattern

The following GitHub Actions outline is intentionally incomplete. Replace every
placeholder with a reviewed full commit SHA, pin project dependencies in the
lockfile, and adapt the build and test commands. Do not copy an action tag such
as `@v4` into a production workflow.

GitHub expression syntax is wrapped in a Jekyll raw block so this documentation
site renders the example rather than interpreting it.

{% raw %}

```yaml
name: Accessibility checks

on:
  pull_request:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read

concurrency:
  group: accessibility-${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  accessibility:
    runs-on: ubuntu-latest
    timeout-minutes: 20

    steps:
      - name: Check out repository
        uses: actions/checkout@<reviewed-full-commit-sha>
        with:
          persist-credentials: false

      - name: Set up Node.js
        uses: actions/setup-node@<reviewed-full-commit-sha>
        with:
          node-version-file: .nvmrc
          cache: npm

      - name: Install locked dependencies
        run: npm ci

      - name: Install reviewed browser version
        run: npx playwright install --with-deps chromium

      - name: Build final site
        run: npm run build

      - name: Run accessibility tests
        run: npm run test:a11y:ci

      - name: Upload debugging evidence after failure
        if: failure()
        uses: actions/upload-artifact@<reviewed-full-commit-sha>
        with:
          name: accessibility-test-evidence-${{ github.run_id }}
          path: test-results
          if-no-files-found: ignore
          retention-days: 7
```

{% endraw %}

Before enabling the workflow:

1. Confirm the actions and inputs exist in their current official
   documentation.
2. Resolve each reviewed action release to its full commit SHA.
3. Review transitive action code and release notes.
4. Set explicit permissions at workflow or job level.
5. Validate fork behavior and ensure untrusted pull requests receive no
   privileged secrets.
6. Verify the build path matches production closely enough for the findings to
   be relevant.
7. Run the workflow in a test branch or repository and inspect its artifacts.

For this Jekyll repository, inspect the current
`.github/workflows/lighthouse.yml` and `.lighthouserc.json` rather than assuming
that the illustrative Node workflow above is directly applicable.

## Lighthouse CI

Lighthouse is useful for detecting changes in its audited rules and for
tracking performance and quality signals. Configure it against known URLs or a
built static directory, retain reports when useful, and record the Lighthouse
and browser versions.

Use at least one run for functional feedback. Use multiple runs and an
appropriate aggregation method when enforcing noisy performance metrics. Do not
assume one emulated mobile run represents desktop, alternate themes, forced
colors, zoom, or assistive technologies.

Example accessibility assertion:

```json
{
  "ci": {
    "collect": {
      "staticDistDir": "./_site",
      "numberOfRuns": 1
    },
    "assert": {
      "assertions": {
        "categories:accessibility": ["warn", { "minScore": 0.9 }]
      }
    },
    "upload": {
      "target": "filesystem",
      "outputDir": ".lighthouseci"
    }
  }
}
```

This configuration warns; it does not block. Raising the score threshold can be
useful after investigation, but a score threshold still does not establish
WCAG conformance.

## Scheduled Scanning and Issue Creation

Scheduled scans can find drift, dependency changes, content regressions, and
pages missed by pull-request tests. Continue scanning when known issues remain;
stopping every scan because one issue is open can hide new regressions. Prefer
deduplication, stable fingerprints, issue updates, and clear ownership.

For each scheduled scan, define:

- the authorized target URLs and crawl boundaries;
- public versus authenticated states;
- frequency, timeout, and resource limits;
- issue deduplication and closure behavior;
- retention and redaction of reports;
- responsibility for triage; and
- what happens when the scanner or target is unavailable.

Do not place authentication secrets, session data, or sensitive page content in
logs, issue bodies, artifacts, or AI prompts.

### GitHub Accessibility Scanner

The GitHub Accessibility Scanner is a public-preview action. Its interfaces,
permissions, and Copilot integration may change. Review its current README,
`action.yml`, releases, and security guidance immediately before adoption.

The action can file issues and can assign work to Copilot. If a repository uses
the separate review-only remediation workflow described below, set the
scanner's current option to skip Copilot assignment so two remediation systems
do not act on the same finding. Confirm the option still exists before use.

The scanner currently requires a token and documents broader permissions than
a read-only scan. Treat that credential and the action itself as privileged.
Use a dedicated fine-grained credential, limit repository access, review the
exact permissions required by the selected scanner features, and do not assume
the default `GITHUB_TOKEN` is sufficient.

See [GitHub Accessibility Scanner Integration](./GITHUB_ACCESSIBILITY_SCANNER_INTEGRATION.md)
for the project-specific companion guide. It must remain synchronized with this
security model.

## AI-Assisted Remediation

An AI-generated patch is a proposal, not evidence that a barrier is fixed.
Issues, comments, labels, repository content, HTML, SVG, URLs, and scan output
are untrusted input.

Use this review sequence:

1. A scanner or person records a reproducible finding.
2. A human triages the affected task, impact, confidence, and scope.
3. A maintainer manually triggers the remediation workflow with the issue
   number.
4. Copilot reads the issue as untrusted file data in an isolated copy without
   the repository's `.git` directory.
5. The workflow uploads a patch, changed-file list, and report.
6. A human reviews and applies an acceptable patch in a normal branch.
7. Relevant automated, manual, and assistive-technology checks are rerun on the
   final implementation.

The reference
[`AGENT_REMEDIATION_WORKFLOW.yml`](./AGENT_REMEDIATION_WORKFLOW.yml):

- is manual-only and requires explicit confirmation;
- gives the workflow token read-only content and issue permissions;
- keeps issue content out of shell commands, workflow expressions, and the
  static prompt;
- limits Copilot to read and write tools in an isolated working copy;
- denies shell, URL, and memory tools;
- blocks changes to protected policy and workflow paths;
- does not commit, push, open a pull request, close an issue, or deploy; and
- retains a review artifact for a limited period.

It expects `COPILOT_GITHUB_TOKEN` and a reviewed, pinned Copilot CLI version.
Follow current GitHub documentation and organization policy when configuring
that credential.

Use
[`COPILOT_REMEDIATION_AGENT_PROMPT.md`](./COPILOT_REMEDIATION_AGENT_PROMPT.md)
as the task recipe. The prompt routes the agent to canonical repository guides
and their companion skills; it does not replace those guides.

Do not trigger privileged AI remediation directly from an issue label or paste
an issue body into a shell command, `GITHUB_OUTPUT`, workflow expression, or
static prompt.

## Workflow Security

Apply these controls to accessibility workflows just as you would to build and
deployment workflows:

- Pin third-party actions to reviewed full commit SHAs.
- Declare the minimum `GITHUB_TOKEN` permissions explicitly.
- Set `persist-credentials: false` when later steps do not need Git access.
- Avoid `pull_request_target` for workflows that execute untrusted pull-request
  code.
- Pass untrusted values through environment variables or files and quote shell
  expansions; never interpolate them into executable script text.
- Do not expose secrets to forked or otherwise untrusted code.
- Restrict network access and tools for AI or transformation steps where
  practical.
- Add timeouts, concurrency controls, and bounded crawl limits.
- Treat uploaded HTML, JSON, screenshots, traces, videos, patches, and logs as
  potentially sensitive.
- Keep artifact retention no longer than the review process requires.
- Review dependency-update pull requests and rerun validation after action or
  browser updates.
- Use environments and required reviewers for any workflow that can deploy or
  modify external systems.

Do not say a workflow has no access to secrets, cannot merge, or cannot modify
settings unless its token permissions, event context, tools, and platform
controls demonstrate that claim.

## Results, Artifacts, and Triage

A useful finding includes:

- affected user task, route, component, and state;
- reproduction steps;
- observed and expected behavior;
- selector or source location when reliable;
- tool, version, browser, configuration, rule ID, and timestamp;
- screenshot, trace, or structured result when safe and useful;
- likely user impact and confidence; and
- checks still requiring human evaluation.

Map tool severities into the project taxonomy only after evaluating user
impact:

| Project severity | User impact |
| --- | --- |
| Critical | A core or safety-critical task cannot be completed and no reasonable accessible alternative exists. |
| High | A major task is blocked or requires an unsafe, unreliable, or highly burdensome workaround. |
| Medium | A task remains possible but creates substantial difficulty, confusion, delay, or loss of information. |
| Low | Impact is limited and the task remains understandable and operable. |

Tool labels such as `critical`, `serious`, `moderate`, and `minor` are triage
inputs. Do not copy them directly into project severity without reviewing the
affected task.

## Baselines, Suppressions, and Exceptions

Prefer preventing new regressions while existing findings are assigned and
remediated. A baseline is a temporary inventory, not proof that existing
barriers are acceptable.

Every suppression or exception should include:

- the exact rule, file, element, route, or task affected;
- the reason and supporting evidence;
- user impact and available workaround;
- an accountable owner and linked issue;
- an expiry or review date; and
- the narrowest practical scope.

Do not suppress an entire rule when one reviewed instance is the exception. Do
not update snapshots or baselines solely to make CI green.

## Sustainable Automation

- Run fast targeted checks on every pull request.
- Reserve full crawls and large browser matrices for schedules, releases, or
  high-risk changes.
- Cache reviewed dependencies where it improves speed without hiding updates.
- Cancel obsolete runs when doing so cannot discard required evidence.
- Retain artifacts only as long as necessary.
- Avoid duplicate scanners that provide the same evidence.
- Use deterministic tooling before AI when it can answer the question.
- Measure workflow duration and failure value before adding more jobs.

## Definition of Done

- [ ] The affected user tasks, pages, components, and states are defined.
- [ ] Dependencies, browsers, actions, and configuration are versioned and
  reviewable.
- [ ] Final rendered output is tested.
- [ ] Applicable themes, preferences, viewports, and interaction states are
  covered.
- [ ] Automated results are interpreted within their documented limitations.
- [ ] Required manual and assistive-technology tests are completed or handed
  off precisely.
- [ ] New Critical and High barriers are not knowingly introduced.
- [ ] Findings include reproducible evidence and an owner.
- [ ] Suppressions and exceptions are narrow, justified, tracked, and dated.
- [ ] Workflow permissions, untrusted input, secrets, and artifacts are
  reviewed.
- [ ] Action references use reviewed full commit SHAs.
- [ ] The final workflow is validated in a test branch or repository.
- [ ] Documentation and the companion `ci-cd` skill are synchronized.

## Related Project Guidance

- [Contributing Accessibility](./CONTRIBUTING_A11Y.md)
- [Manual Accessibility Testing](./MANUAL_ACCESSIBILITY_TESTING_GUIDE.md)
- [Accessibility Bug Reporting](./ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES.md)
- [Shift-Left Accessibility Automation](./SHIFT_LEFT_ACCESSIBILITY_AUTOMATION.md)
- [GitHub Accessibility Scanner Integration](./GITHUB_ACCESSIBILITY_SCANNER_INTEGRATION.md)
- [Browser and Assistive Technology Support](../BROWSER_SUPPORT.md)
- [Copilot Agent Mode Guide](./COPILOT_AGENT_MODE_GUIDE.md)
- [Bootstrap Workflow](./AGENT_BOOTSTRAP_WORKFLOW.yml)
- [Bootstrap Prompt](./COPILOT_BOOTSTRAP_AGENT_PROMPT.md)
- [Remediation Workflow](./AGENT_REMEDIATION_WORKFLOW.yml)
- [Remediation Prompt](./COPILOT_REMEDIATION_AGENT_PROMPT.md)
- [Trusted Sources Registry](./TRUSTED_SOURCES.yaml)

## Authoritative and Primary References

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [WAI: Understanding Conformance](https://www.w3.org/WAI/WCAG22/Understanding/conformance)
- [WAI: Understanding ACT Rules](https://www.w3.org/WAI/WCAG22/Understanding/understanding-act-rules)
- [Playwright: Accessibility Testing](https://playwright.dev/docs/accessibility-testing)
- [Playwright: ARIA Snapshots](https://playwright.dev/docs/aria-snapshots)
- [Deque: axe-core Playwright API](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/playwright)
- [Lighthouse CI Documentation](https://github.com/GoogleChrome/lighthouse-ci/tree/main/docs)
- [GitHub Actions Secure Use Reference](https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions)
- [GitHub: Script Injections](https://docs.github.com/en/actions/concepts/security/script-injections)
- [GitHub Accessibility Scanner](https://github.com/github/accessibility-scanner)
- [GitHub: Automating Copilot CLI with Actions](https://docs.github.com/en/copilot/how-tos/copilot-cli/automate-copilot-cli/automate-with-actions)
- [GitHub Copilot CLI Programmatic Reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-programmatic-reference)

Version-sensitive claims and examples last reviewed: 2026-07-19.

---

This document is available under the repository's [MIT License](../LICENSE).
