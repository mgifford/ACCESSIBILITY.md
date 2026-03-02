---
title: CI/CD Accessibility Best Practices
---

# CI/CD Accessibility Best Practices

Integrating accessibility checks into your CI/CD pipeline ensures that accessibility regressions are caught early, consistently, and automatically. This guide explains how to build a layered accessibility testing strategy using GitHub Actions (primary focus), GitLab CI, and popular open-source tools.

## Why CI/CD for Accessibility

Manual accessibility testing is essential but cannot scale alone. Automated checks in CI/CD pipelines:

- Catch regressions before they reach users.
- Give contributors immediate, actionable feedback.
- Create an auditable record of accessibility health over time.
- Reduce review burden on accessibility specialists.
- Complement—not replace—manual and assistive technology testing.

See also: [SHIFT_LEFT_ACCESSIBILITY_AUTOMATION.md](./SHIFT_LEFT_ACCESSIBILITY_AUTOMATION.md) for the broader shift-left philosophy.

---

## Pipeline Layers

A robust accessibility pipeline has four layers:

| Layer | When | Tools |
| :--- | :--- | :--- |
| **Editor / IDE** | While coding | ESLint-plugin-jsx-a11y, axe linting extensions |
| **Pre-commit** | Before push | pre-commit hooks, husky + lint-staged |
| **PR / CI gate** | On pull request | axe-core, pa11y, Lighthouse CI, AccessLint |
| **Scheduled scan** | Nightly / weekly | github/accessibility-scanner, pa11y-ci, full-site crawls |

See [PRE_COMMIT_ACCESSIBILITY_SAMPLE.yaml](./PRE_COMMIT_ACCESSIBILITY_SAMPLE.yaml) for a pre-commit configuration example.

---

## GitHub Actions

### 1. GitHub Accessibility Scanner (`github/accessibility-scanner`)

GitHub's AI-powered accessibility scanner runs automated accessibility checks and creates trackable issues for findings.

- **Repository**: <https://github.com/github/accessibility-scanner>
- **Marketplace**: <https://github.com/marketplace/actions/accessibility-scanner>

**Example scheduled scan workflow:**

```yaml
name: Accessibility Scan (Scheduled)

on:
  schedule:
    - cron: "0 6 * * 1"   # Every Monday at 06:00 UTC
  workflow_dispatch:

permissions:
  contents: read
  issues: write

jobs:
  accessibility-scanner:
    name: GitHub Accessibility Scanner
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Run GitHub Accessibility Scanner
        uses: github/accessibility-scanner@v2
        with:
          url: ${{ vars.ACCESSIBILITY_SCAN_URL }}
          repo_token: ${{ secrets.GH_TOKEN }}
          # For authenticated pages:
          # login_url: ${{ vars.ACCESSIBILITY_LOGIN_URL }}
          # username: ${{ secrets.ACCESSIBILITY_USERNAME }}
          # password: ${{ secrets.ACCESSIBILITY_PASSWORD }}
```

> **Note:** The built-in `GITHUB_TOKEN` does not have sufficient permissions for this action's issue creation workflows. Create a Personal Access Token (PAT) or a fine-grained token with `repo` scope, then store it as a repository secret named `GH_TOKEN`. Do not confuse this with the automatically provided `secrets.GITHUB_TOKEN`.

See [GITHUB_ACCESSIBILITY_SCANNER_INTEGRATION.md](./GITHUB_ACCESSIBILITY_SCANNER_INTEGRATION.md) for full governance guidance.

---

### 2. AccessLint

[AccessLint](https://github.com/accesslint) is an open-source bot that reviews pull requests for accessibility issues. It runs axe-core against changed pages and posts inline review comments.

- **GitHub app**: <https://github.com/marketplace/accesslint>
- **Source**: <https://github.com/accesslint>

**How it works:**

1. Install the AccessLint GitHub App on your repository.
2. AccessLint automatically reviews PRs that touch HTML or template files.
3. Accessibility violations appear as inline PR comments, linking to remediation guidance.

**Self-hosted alternative using the CLI:**

```yaml
name: AccessLint Check

on:
  pull_request:

permissions:
  contents: read
  pull-requests: write

jobs:
  accesslint:
    name: AccessLint
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Run AccessLint
        run: npx accesslint-ci --reporter github ./dist/**/*.html
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

---

### 3. axe-core Based Testing

[axe-core](https://www.deque.com/axe/) (by Deque Systems) is the most widely adopted open-source accessibility engine. It powers AccessLint, Accessibility Insights, and many other tools.

**Standalone GitHub Actions workflow:**

```yaml
name: axe-core Accessibility Tests

on:
  pull_request:
  push:
    branches: [main]

permissions:
  contents: read

jobs:
  axe:
    name: Run axe-core
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Serve and test
        run: |
          npx serve dist &
          npx wait-on http://localhost:3000
          npx axe http://localhost:3000 --exit
```

**With Playwright and axe-core (recommended for dynamic content):**

```yaml
      - name: Install Playwright
        run: npx playwright install --with-deps chromium

      - name: Run axe with Playwright
        run: npx playwright test --project=chromium tests/a11y/
```

```js
// tests/a11y/homepage.spec.js
const { test, expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;

test("homepage passes axe", async ({ page }) => {
  await page.goto("http://localhost:3000");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});
```

See [AXE_RULES_COVERAGE.md](./AXE_RULES_COVERAGE.md) for a reference of available axe rules.

---

### 4. pa11y and pa11y-ci

[pa11y](https://pa11y.org/) is an open-source command-line accessibility testing tool. [pa11y-ci](https://github.com/pa11y/pa11y-ci) adds batch URL testing suitable for CI pipelines.

```yaml
name: pa11y Accessibility Tests

on:
  pull_request:
  push:
    branches: [main]

permissions:
  contents: read

jobs:
  pa11y:
    name: pa11y CI
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Install pa11y-ci
        run: npm install -g pa11y-ci

      - name: Build and serve
        run: |
          npm ci && npm run build
          npx serve dist &
          npx wait-on http://localhost:3000

      - name: Run pa11y-ci
        run: pa11y-ci --config .pa11yci.json
```

**Example `.pa11yci.json`:**

```json
{
  "defaults": {
    "standard": "WCAG2AA",
    "runners": ["axe", "htmlcs"],
    "chromeLaunchConfig": {
      "args": ["--no-sandbox", "--disable-setuid-sandbox"]
    }
  },
  "urls": [
    "http://localhost:3000/",
    "http://localhost:3000/about",
    "http://localhost:3000/contact"
  ]
}
```

---

### 5. Lighthouse CI

[Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) includes an accessibility audit category and integrates with GitHub Actions via status checks.

```yaml
name: Lighthouse CI

on:
  pull_request:

permissions:
  contents: read
  statuses: write

jobs:
  lighthouse:
    name: Lighthouse CI
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Install and build
        run: npm ci && npm run build

      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli
          lhci autorun
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

**Example `lighthouserc.js`:**

```js
module.exports = {
  ci: {
    collect: {
      staticDistDir: "./dist",
    },
    assert: {
      assertions: {
        "categories:accessibility": ["error", { minScore: 0.9 }],
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
```

---

### 6. Combined Shift-Left Workflow

See [A11Y_SHIFT_LEFT_WORKFLOW.yml](./A11Y_SHIFT_LEFT_WORKFLOW.yml) for the recommended combined workflow that integrates all of the above: pre-commit, PR gate, and scheduled scan.

---

## GitLab CI

GitLab CI supports the same open-source tools through `.gitlab-ci.yml` configuration.

### axe-core on GitLab CI

```yaml
# .gitlab-ci.yml
stages:
  - build
  - accessibility

build:
  stage: build
  image: node:20
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/

axe-accessibility:
  stage: accessibility
  image: node:20
  dependencies:
    - build
  script:
    - npm install -g @axe-core/cli wait-on serve
    - npx serve dist &
    - npx wait-on http://localhost:3000
    - axe http://localhost:3000 --exit --tags wcag2a,wcag2aa,wcag21aa
  allow_failure: false
```

### pa11y on GitLab CI

```yaml
pa11y-accessibility:
  stage: accessibility
  image: node:20
  dependencies:
    - build
  script:
    - npm install -g pa11y-ci wait-on serve
    - npx serve dist &
    - npx wait-on http://localhost:3000
    - pa11y-ci --config .pa11yci.json
  artifacts:
    when: on_failure
    paths:
      - pa11y-results/
    expire_in: 1 week
```

### Lighthouse on GitLab CI

```yaml
lighthouse-accessibility:
  stage: accessibility
  image: node:20
  dependencies:
    - build
  script:
    - npm install -g @lhci/cli
    - lhci autorun
  artifacts:
    paths:
      - .lighthouseci/
    expire_in: 1 week
```

### GitLab Accessibility Testing Reports

GitLab supports [accessibility testing reports](https://docs.gitlab.com/ee/ci/testing/accessibility_testing.html) natively. When you configure your pipeline to output a pa11y report in GitLab's accessibility report format, GitLab displays inline findings in the merge request UI:

```yaml
accessibility:
  stage: accessibility
  image: node:20
  script:
    - npm install -g @gitlab/pa11y-ci
    - pa11y-ci --reporter @gitlab/pa11y-ci-reporter http://your-app-url/
  artifacts:
    reports:
      accessibility: accessibility.json
```

This displays inline accessibility findings in the GitLab merge request UI.

---

## Open-Source Tools Summary

| Tool | Engine | Use Case | License |
| :--- | :--- | :--- | :--- |
| [axe-core](https://github.com/dequelabs/axe-core) | Native | Library, CLI, browser extension | MPL-2.0 |
| [axe-cli](https://github.com/dequelabs/axe-cli) | axe-core | Command-line scanning | MPL-2.0 |
| [@axe-core/playwright](https://github.com/dequelabs/axe-playwright) | axe-core | Playwright test integration | MPL-2.0 |
| [@axe-core/react](https://github.com/dequelabs/axe-react) | axe-core | React development runtime | MPL-2.0 |
| [pa11y](https://github.com/pa11y/pa11y) | axe-core + HTML_CodeSniffer | CLI scanning | MIT |
| [pa11y-ci](https://github.com/pa11y/pa11y-ci) | pa11y | CI batch URL testing | MIT |
| [Lighthouse](https://github.com/GoogleChrome/lighthouse) | axe-core + custom | Performance + accessibility | Apache-2.0 |
| [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) | Lighthouse | CI pipeline integration | Apache-2.0 |
| [AccessLint](https://github.com/accesslint) | axe-core | GitHub PR reviews | MIT |
| [IBM Equal Access Checker](https://github.com/IBMa/equal-access) | Custom | WCAG + IBM standards | Apache-2.0 |
| [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y) | Static analysis | JSX/React linting | MIT |

---

## Recommended Toolchain by Project Type

### Static site or server-rendered HTML

1. **Pre-commit**: [PRE_COMMIT_ACCESSIBILITY_SAMPLE.yaml](./PRE_COMMIT_ACCESSIBILITY_SAMPLE.yaml)
2. **PR gate**: pa11y-ci or axe-cli
3. **Scheduled**: `github/accessibility-scanner@v2`

### React / Vue / Svelte SPA

1. **Development runtime**: `@axe-core/react` or equivalent
2. **Component tests**: axe-core with Jest or Vitest (`jest-axe`)
3. **E2E PR gate**: `@axe-core/playwright` or `@axe-core/webdriverio`
4. **Scheduled**: `github/accessibility-scanner@v2`

### Documentation site (GitHub Pages / Netlify)

1. **PR gate**: Lighthouse CI (accessibility score ≥ 0.9)
2. **PR gate**: pa11y-ci for URL-by-URL coverage
3. **Scheduled**: `github/accessibility-scanner@v2`

---

## Governance Recommendations

### Define blocking vs. informational findings

In your `ACCESSIBILITY.md`:

> Violations of WCAG 2.2 AA with impact `critical` or `serious` (as reported by axe-core) block merge. `moderate` violations are reported as non-blocking warnings. All `critical` violations raised by scheduled scans must be triaged within 5 business days.

### Track coverage

Use [AXE_RULES_COVERAGE.md](./AXE_RULES_COVERAGE.md) to document which rules your automated suite covers and which require manual testing. This prevents false confidence in automated-only results.

### Set accessibility score targets

For Lighthouse CI:

```js
"categories:accessibility": ["error", { minScore: 0.9 }]
```

Increase the target over time as technical debt is resolved.

### Use labels and SLAs

Create labels in your issue tracker (for example: `accessibility`, `wcag-a`, `wcag-aa`, `a11y-blocker`) and define response SLAs in your `ACCESSIBILITY.md`.

---

## References

- GitHub Accessibility Scanner: <https://github.com/github/accessibility-scanner>
- GitHub Marketplace – Accessibility Scanner: <https://github.com/marketplace/actions/accessibility-scanner>
- AccessLint (GitHub App): <https://github.com/marketplace/accesslint>
- AccessLint (source): <https://github.com/accesslint>
- axe-core: <https://github.com/dequelabs/axe-core>
- Deque axe tools: <https://www.deque.com/axe/>
- pa11y: <https://pa11y.org/>
- Lighthouse CI: <https://github.com/GoogleChrome/lighthouse-ci>
- GitLab Accessibility Testing: <https://docs.gitlab.com/ee/ci/testing/accessibility_testing.html>
- CivicActions article on automated accessibility testing: <https://accessibility.civicactions.com/posts/how-we-scale-inclusive-website-content-with-automated-testing-and-open-source-tools>
- OpenSource.com article on automated accessibility testing: <https://opensource.com/article/23/2/automated-accessibility-testing>
