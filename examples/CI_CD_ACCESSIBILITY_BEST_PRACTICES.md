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
          node-version: "20"

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
