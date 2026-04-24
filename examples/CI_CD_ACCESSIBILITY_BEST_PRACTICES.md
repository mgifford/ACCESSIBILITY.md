---
title: CI/CD Accessibility Best Practices
---

# CI/CD Accessibility & Performance Best Practices

Integrating accessibility (a11y) and performance checks into your CI/CD pipeline ensures that regressions are caught before they reach a single user. This guide emphasizes a **"Zero-Debt" strategy**: achieving $100% scores on all pages, across all devices and user preferences.

## The Strategy: Local-First & AI-Aligned

Automation is the baseline, not the ceiling. Our strategy uses:
- **Lighthouse CI** for high-level "quality gates" ($100% scores).
- **Playwright + axe-core** for dynamic elements, mobile emulation, and theme testing (Light/Dark).
- **Local Audits** as the default developer workflow to reduce CI noise.
- **Structured Data (JSON)** to ensure findings are "AI-ready" for automated remediation.

---

## 1. Local Development (The Baseline)

Run audits locally before pushing code. This is the fastest feedback loop and keeps the repository history clean.

### Setup
```bash
npm install -g @lhci/cli
npm install -D @playwright/test @axe-core/playwright
```

### Scripting
Add these to your `package.json` to normalize testing:
```json
"scripts": {
  "test:a11y": "lhci autorun && npx playwright test",
  "test:a11y:local": "lhci collect --url=http://localhost:3000 && lhci assert"
}
```

---

## 2. Lighthouse CI (The $100% Gate)

We enforce a strict $100% score for both Accessibility and Performance. If a page drops to $99%, the build fails.

**Configuration (`.lighthouserc.js`):**
```javascript
module.exports = {
  ci: {
    collect: {
      staticDistDir: './_site',
      numberOfRuns: 1,
      settings: {
        emulatedFormFactor: 'mobile',
      },
    },
    assert: {
      assertions: {
        'categories:accessibility': ['error', { minScore: 1 }],
        'categories:performance': ['error', { minScore: 1 }],
      },
    },
  },
};
```

---

## 3. Playwright + axe-core (Dynamic & Preferences)

For pages with dynamic elements (menus, modals) or those requiring specific user preferences, Playwright is the superior tool.

```typescript
// tests/a11y.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const themes = ['light', 'dark'];

for (const theme of themes) {
  test(`A11y: Desktop & Mobile in ${theme} mode`, async ({ page, isMobile }) => {
    await page.emulateMedia({ colorScheme: theme as 'light' | 'dark' });
    await page.goto('/');

    // Interact with dynamic elements
    const menuBtn = page.locator('#main-menu-toggle');
    if (isMobile && await menuBtn.isVisible()) {
      await menuBtn.click(); // Test the menu in its open state
    }

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });
}
```

---

## 4. GitHub Actions

### A. Monthly Accessibility Scanner with Alert-Fatigue Guard
This workflow uses the `github/accessibility-scanner`. It runs on the **first day of every month** and on demand, but **only when there are no existing open accessibility issues**. This prevents alert fatigue by pausing scans while known issues are still being resolved.

**Workflow (`.github/workflows/accessibility-scan.yml`):**
{% raw %}
```yaml
name: Accessibility Scan (Scheduled)

on:
  schedule:
    - cron: "0 0 1 * *"   # First day of every month at 00:00 UTC
  workflow_dispatch:

permissions:
  contents: write
  issues: write
  pull-requests: write

jobs:
  accessibility-scanner:
    name: GitHub Accessibility Scanner
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Check for existing open accessibility issues
        id: check_issues
        env:
          GH_TOKEN: ${{ secrets.GH_TOKEN || secrets.GITHUB_TOKEN }}
        run: |
          COUNT=$(gh issue list --label "accessibility" --state open --json number --jq '. | length')
          echo "count=$COUNT" >> $GITHUB_OUTPUT

      - name: Run GitHub Accessibility Scanner
        if: steps.check_issues.outputs.count == '0'
        uses: github/accessibility-scanner@v3
        with:
          urls: ${{ vars.ACCESSIBILITY_SCAN_URL || format('https://{0}.github.io/{1}/', github.repository_owner, github.event.repository.name) }}
          repository: ${{ github.repository }}
          token: ${{ secrets.GH_TOKEN || secrets.GITHUB_TOKEN }}
          cache_key: accessibility-scan-results
```
{% endraw %}

> **Notes:**
> - The `GH_TOKEN` secret is optional; the workflow falls back to the automatic `GITHUB_TOKEN`.
> - Set `ACCESSIBILITY_SCAN_URL` as a repository variable to override the default GitHub Pages URL. Multiple URLs can be provided as a newline-separated list.
> - Running less frequently (monthly rather than weekly) means fewer unnecessary API calls and quieter notifications when the site is in good shape.

### B. Lighthouse Accessibility Audit on Every PR
Catch regressions before they merge. This workflow builds the Jekyll site and runs a Lighthouse audit on every pull request and push to `main`.

**Workflow (`.github/workflows/lighthouse.yml`):**
```yaml
name: Lighthouse CI

on:
  pull_request:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read

jobs:
  lighthouse:
    name: Lighthouse accessibility audit
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: "3.2"
          bundler-cache: true

      - name: Build Jekyll site
        run: bundle exec jekyll build

      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: "22"

      - name: Install Lighthouse CI
        run: npm install -g @lhci/cli

      - name: Run Lighthouse CI
        run: lhci autorun
```

**Configuration (`.lighthouserc.json`):**
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

> **Tip:** Start with `"warn"` while resolving existing issues, then tighten to `"error"` with `"minScore": 1` once you achieve a clean baseline (see Section 2 above).

### C. Full Deep Crawl (AI-Ready)
A manual trigger to generate a full JSON report of the site's state for AI analysis.

```yaml
name: Deep Site Audit
on: workflow_dispatch

jobs:
  crawl:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Playwright & Export JSON
        run: npx playwright test --reporter=json > audit-report.json
      - uses: actions/upload-artifact@v4
        with:
          name: a11y-json-report
          path: audit-report.json
```

---

## 5. Accessibility Tree Testing

Automated WCAG rule checks (axe-core, Lighthouse) verify that markup follows accessibility rules, but they cannot tell you what a screen reader *actually announces* to the user. **Accessibility tree testing** queries the browser's internal representation of the page — the same structure assistive technologies consume — so you can assert on the exact names, roles, and properties that users experience.

> **When to use:** Add accessibility tree tests whenever you need to verify *how* content is announced — especially for complex components such as SVG diagrams, custom widgets, dynamic live regions, and navigation landmarks.

### 5.1 Playwright Aria Snapshots

Playwright exposes the accessibility tree as a YAML snapshot via `toMatchAriaSnapshot()` (added in Playwright v1.46). This is distinct from axe-core rule checks: instead of asking "does this pass WCAG rule X?", you ask "is this exactly what a screen reader user would hear?"

**Install:**
```bash
npm install -D @playwright/test
```

**Snapshot test example:**
```typescript
// tests/a11y-tree.spec.ts
import { test, expect } from '@playwright/test';

test('main navigation is correctly announced', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('nav[aria-label="Main navigation"]'))
    .toMatchAriaSnapshot(`
      - navigation "Main navigation":
          - list:
              - listitem:
                  - link "Home"
              - listitem:
                  - link "About"
              - listitem:
                  - link "Contact"
    `);
});

test('SVG diagram is exposed as a labelled image', async ({ page }) => {
  await page.goto('/diagrams');
  // Decorative SVGs and unlabelled images will FAIL this test,
  // surfacing real barriers for screen reader users.
  await expect(page.locator('svg[role="img"]').first())
    .toMatchAriaSnapshot(`
      - img "User Authentication Flowchart":
    `);
});
```

**Generating snapshots from the command line:**

Run the test with `--update-snapshots` once to generate the baseline:
```bash
npx playwright test tests/a11y-tree.spec.ts --update-snapshots
```

After intentional accessibility tree changes, regenerate the snapshot and review the diff the same way you review visual regression diffs.

**Semantic queries with `getByRole`:**

Querying by ARIA role and accessible name mirrors how assistive technology users locate elements. Use these queries in your existing Playwright tests to verify that accessible names are present and correct:

```typescript
test('form controls have meaningful accessible names', async ({ page }) => {
  await page.goto('/contact');

  await expect(page.getByRole('textbox', { name: 'Email address' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Send message' })).toBeEnabled();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Contact Us');
});
```

> **Note:** `getByRole()` queries fail when accessible names are missing or wrong, providing earlier feedback than a manual screen reader audit.

For more detail on Playwright's accessibility tree API, see the [Playwright aria snapshots documentation](https://playwright.dev/docs/aria-snapshots).

### 5.2 Guidepup — Virtual Screen Reader Testing

[Guidepup](https://www.guidepup.dev) provides reliable automation for screen reader workflows. Its virtual screen reader lets you unit-test the exact text that would be read aloud, without needing a real screen reader installed.

**Install:**
```bash
npm install -D @guidepup/virtual-screen-reader @guidepup/jest
```

**Unit test example (Jest):**
```typescript
// tests/sr.test.ts
import { virtual } from '@guidepup/virtual-screen-reader';

describe('Screen reader announcement', () => {
  it('announces the dialog title and action buttons', async () => {
    document.body.innerHTML = `
      <dialog open aria-labelledby="dlg-title">
        <h2 id="dlg-title">Confirm deletion</h2>
        <p>This action cannot be undone.</p>
        <button>Delete</button>
        <button>Cancel</button>
      </dialog>
    `;

    await virtual.start({ container: document.body });
    const spoken = await virtual.spokenPhraseLog();

    expect(spoken).toContain('Confirm deletion');
    expect(spoken).toContain('Delete, button');
    expect(spoken).toContain('Cancel, button');

    await virtual.stop();
  });
});
```

**GitHub Actions setup:**
```yaml
- name: Set up Guidepup
  uses: guidepup/setup-action@v2

- name: Run virtual screen reader tests
  run: npx jest tests/sr.test.ts
```

> **Note:** The [Guidepup Setup action](https://github.com/marketplace/actions/guidepup-setup) also enables automation of real VoiceOver (macOS) and NVDA (Windows) when needed.

### 5.3 Comparing Testing Approaches

Use these approaches together to achieve full coverage. No single tool catches everything.

| Approach | Finds WCAG rule violations | Finds announcement quality issues | Works for SVG / canvas | CI-friendly |
|:---|:---:|:---:|:---:|:---:|
| axe-core (Section 3) | ✅ | ❌ | Limited | ✅ |
| Lighthouse (Section 2) | ✅ | ❌ | ❌ | ✅ |
| Playwright aria snapshots | Partial | ✅ | ✅ | ✅ |
| Guidepup virtual screen reader | ❌ | ✅ | ✅ | ✅ |
| Manual screen reader testing | Partial | ✅ | ✅ | ❌ |

### 5.4 Future Standard: WebDriver BiDi

Playwright's aria snapshot feature currently relies on the Chromium accessibility API. The W3C WebDriver BiDi specification is [working to standardise accessibility tree access across all browsers](https://github.com/w3c/webdriver-bidi/issues/443), which will make these tests cross-browser in the future.

---

## 6. Agent-Driven Remediation

Detection alone does not fix accessibility barriers. The **detect → agent-fix → human-review** loop closes the gap by having a Copilot coding agent propose a fix immediately after a scanner creates an issue, rather than waiting days or weeks for a developer to triage and act.

### How it works

```
Scanner runs → issue created (label: accessibility) → agent workflow fires
→ agent locates code → agent applies minimal fix → agent opens DRAFT PR
→ human reviews → human merges
```

The agent-created PR is **always a draft** — it is never auto-merged. Human review is a mandatory step in the loop.

### Workflow (`.github/workflows/accessibility-remediation.yml`)

Copy [`examples/AGENT_REMEDIATION_WORKFLOW.yml`](./AGENT_REMEDIATION_WORKFLOW.yml) to `.github/workflows/` in your repository. The workflow:

- Fires on `issues: labeled` when the label is `accessibility` (matching issues created by `github/accessibility-scanner`).
- Also accepts a manual `workflow_dispatch` trigger with an issue number input.
- Reads the issue body to detect the axe rule ID (`image-alt`, `label`, `link-name`, `heading-order`, `color-contrast`, `aria-required-attr`).
- Selects the matching structured agent task from [`examples/COPILOT_REMEDIATION_AGENT_PROMPT.md`](./COPILOT_REMEDIATION_AGENT_PROMPT.md).
- Passes the task plus the live issue body to the Copilot coding agent.
- The agent opens a **draft PR** linked to the original issue.

**Permissions (minimum required):**
{% raw %}
```yaml
permissions:
  contents: write       # create branch and commit the fix
  pull-requests: write  # open the draft PR
  issues: read          # read the issue body
```
{% endraw %}

### Supported violation types

| axe Rule ID | WCAG SC | Fix complexity |
|-------------|---------|---------------|
| `image-alt` | 1.1.1 Non-text Content | Low |
| `label` | 1.3.1 Info and Relationships | Low |
| `link-name` | 2.4.4 Link Purpose | Low |
| `heading-order` | 1.3.1 Info and Relationships | Low |
| `color-contrast` | 1.4.3 Contrast (Minimum) | Medium |
| `aria-required-attr` | 4.1.2 Name, Role, Value | Medium |

For any other axe rule, the workflow falls back to a generic prompt that instructs the agent to consult [`examples/AXE_RULES_REFERENCE.md`](./AXE_RULES_REFERENCE.md).

### Requirements

- A **GitHub Copilot Individual, Business, or Enterprise** subscription with the Copilot coding agent feature enabled.
- Repository setting: **Settings → Copilot → "Allow Copilot to create and approve pull requests"** must be enabled.
- No additional secrets are required; the workflow uses the default `GITHUB_TOKEN`.

### Security considerations

- The workflow runs with **minimum required permissions** (`contents: write`, `pull-requests: write`, `issues: read`).
- The agent has no access to deployment secrets or credentials beyond what is needed to create a branch and open a PR.
- Agent-created PRs must be reviewed and approved by a human before merging.

> For the full structured agent task descriptions for each violation type, see
> [`examples/COPILOT_REMEDIATION_AGENT_PROMPT.md`](./COPILOT_REMEDIATION_AGENT_PROMPT.md).

---

## Governance & SLAs

- **Critical Failures:** Any page with a Lighthouse Accessibility score under $100% blocks the build.
- **Performance Budget:** Any page with a Lighthouse Performance score under $100% blocks the build.
- **Triage:** Failures from scheduled scans must be converted into GitHub Issues. If an issue remains open, subsequent scheduled scans are paused to prevent alert fatigue.

---

## Alternative Tools & Resources

- **[AccessLint](https://github.com/accesslint):** A GitHub App that provides inline PR comments. A great backup for catching issues during code review without a full CI run.
- **[Open-Scans](https://github.com/mgifford/open-scans):** Excellent for running external scans using multiple engines against a live URL.
- **[Lighthouse CI Documentation](https://github.com/GoogleChrome/lighthouse-ci):** Comprehensive guide for setting up an LHCI server for historical tracking.
- **[CivicActions: Scaling Automation](https://accessibility.civicactions.com/posts/how-we-scale-inclusive-website-content-with-automated-testing-and-open-source-tools):** A deep dive into the philosophy of enterprise-scale a11y.
- **[OpenSource.com: Automated A11y](https://opensource.com/article/23/2/automated-accessibility-testing):** Practical examples of integrating these tools into open-source workflows.
