# Behavioral Accessibility Playwright Examples

Reusable, tested Playwright checks that manipulate a rendered page rather
than only inspecting static markup: a Reflow risk indicator (WCAG 2.2 SC
1.4.10) and a Focus Visible behavioural risk indicator (WCAG 2.2 SC 2.4.7).

Read [BEHAVIORAL_ACCESSIBILITY_AUTOMATION.md](../BEHAVIORAL_ACCESSIBILITY_AUTOMATION.md)
first. It explains what these checks can and cannot establish, the result
vocabulary (`indicator` vs. confirmed failure vs. `cantTell`), and full CWAC
attribution. This README covers only how to run the code in this folder.

## What is here

```text
examples/playwright/
├── reflow-risk.mjs           # checkReflowRisk(page, url, options)
├── focus-visible-risk.mjs    # checkFocusVisibleRisk(page, url, options)
├── lib/
│   └── serve-fixtures.mjs    # minimal static server for the fixtures below
├── fixtures/
│   ├── reflow/                13 deterministic Reflow fixtures
│   └── focus-visible/         22 deterministic Focus Visible fixtures
├── tests/
│   ├── reflow-risk.test.mjs
│   └── focus-visible-risk.test.mjs
└── package.json
```

Every fixture file has an HTML comment stating its expected verdict and the
reasoning behind it. The test files assert those expectations by actually
running the checks against a live local server with a real Chromium browser
— nothing here is asserted from documentation alone.

## Setup

Requires Node.js 20+.

```bash
cd examples/playwright
npm install
npx playwright install --with-deps chromium
```

## Running the tests

```bash
npm test                  # both suites
npm run test:reflow       # Reflow only
npm run test:focus-visible
```

Tests start an in-process HTTP server for the `fixtures/` directory on a
free port (no fixed port, no conflicts between parallel runs) and exercise
both modules against every fixture with a headless Chromium instance.

## Using the modules against your own site

Both modules take an already-created Playwright `page` and a URL, and
return a structured JSON-serializable result — they do not manage the
browser lifecycle for you.

```javascript
import { chromium } from 'playwright';
import { checkReflowRisk } from './reflow-risk.mjs';
import { checkFocusVisibleRisk } from './focus-visible-risk.mjs';

const browser = await chromium.launch();
const page = await browser.newPage();

const reflowResult = await checkReflowRisk(page, 'https://example.com/', {
  viewport: { width: 320, height: 720 }, // default
});

const focusResult = await checkFocusVisibleRisk(page, 'https://example.com/', {
  maxTabStops: 30, // default
});

console.log(JSON.stringify({ reflowResult, focusResult }, null, 2));

await browser.close();
```

### Reflow options

| Option | Default | Purpose |
| --- | --- | --- |
| `viewport` | `{ width: 320, height: 720 }` | Reflow test viewport. 320 CSS px width is the SC 1.4.10 reference width. |
| `stabilizeTimeoutMs` | `5000` | Maximum time to wait for layout to settle before giving up (`cant-tell`). |
| `quietMs` | `500` | How long document dimensions must stay unchanged to be considered stable. **Increase this for pages with known delayed layout changes** — a shorter value can report `no-overflow-detected` before a late change lands. See the fixture `13-late-layout-shift.html` and its tests for a worked example of this exact race. |
| `captureScreenshotOnFinding` | `false` | Save a screenshot when overflow is detected. |
| `screenshotDir` | — | Required if `captureScreenshotOnFinding` is `true`. |
| `maxOverflowElements` | `10` | Cap on how many likely-overflowing elements to report. |

### Focus Visible options

| Option | Default | Purpose |
| --- | --- | --- |
| `maxTabStops` | `30` | How many Tab presses to test before stopping. |
| `regionPaddingPx` | `24` | Padding around the focused element's bounding box used for the pixel-comparison region. Too small risks missing indicators offset from the element (see fixture `08`); too large risks pulling in unrelated content. |
| `captureScreenshotsOnFinding` | `false` | Save a region screenshot for `visible-change-detected` or `confirmed-no-visible-change` findings. |
| `screenshotDir` | — | Required if `captureScreenshotsOnFinding` is `true`. |

## Known limitations (read before trusting a clean result)

These are the limitations actually exercised by the fixtures and tests in
this folder, not a hypothetical list:

- **Reflow** only reads `scrollWidth`/`clientWidth` and an attempted
  scroll. It cannot tell whether overflowing content is within a WCAG
  exception (see the canonical guide). Clipped content with
  `overflow: hidden` and no scrollbar (fixture `09`) produces a
  false-negative `no-overflow-detected` — there is nothing to scroll to,
  so nothing is measured as overflow.
- **Reflow stabilization** is a quiet-period heuristic. It cannot
  distinguish "nothing is happening" from "we are between two scheduled
  changes." Tune `quietMs` to your application; the default will read a
  page as stable before a change that lands more than ~500ms after the
  previous DOM mutation.
- **Focus Visible** pixel comparison is scoped to a padded region around
  the focused element, not the whole page, specifically so unrelated
  page animation cannot be misread as a focus indicator (see fixture
  `17`). The cost is that an indicator rendered well outside that padded
  region (fixture `08`) can be missed.
- **Focus Visible** cross-frame support is same-origin best effort only.
  Focus landing inside an `<iframe>` is reported as `cant-tell-no-coverage`
  rather than silently skipped or guessed (fixture `14`).
- **Focus Visible** does not itself measure contrast (SC 1.4.11) or
  minimum size/obscuration (SC 2.4.13/2.4.11). A `visible-change-detected`
  verdict is evidence something changed, not that the change is
  sufficient. See fixture `07` (barely perceptible change) and fixture
  `09` (indicator hidden under sticky content).
- Neither module establishes WCAG conformance by itself. See
  [BEHAVIORAL_ACCESSIBILITY_AUTOMATION.md](../BEHAVIORAL_ACCESSIBILITY_AUTOMATION.md).

## Attribution

The method these checks follow — resize to a narrow viewport and measure
overflow; send real Tab presses and diff screenshots — is informed by the
[Centralised Web Accessibility Checker (CWAC)](https://github.com/GOVTNZ/cwac),
developed by the Web Standards team at Te Pūnaha Matihiko, New Zealand
Government. CWAC is licensed under GPLv3; this repository is MIT licensed.
No CWAC source code was copied or translated. Both modules here are
**independent reimplementations of the documented method**, written from
scratch in JavaScript against Playwright. Full attribution, including a
statement of what was copied/translated/adapted/reimplemented for each
check, is in
[BEHAVIORAL_ACCESSIBILITY_AUTOMATION.md](../BEHAVIORAL_ACCESSIBILITY_AUTOMATION.md#8-cwac-attribution).

## Related documentation

- [Behavioral Accessibility Automation](../BEHAVIORAL_ACCESSIBILITY_AUTOMATION.md) — canonical guide
- [Manual Accessibility Testing Guide](../MANUAL_ACCESSIBILITY_TESTING_GUIDE.md)
- [Shift-Left Accessibility Automation](../SHIFT_LEFT_ACCESSIBILITY_AUTOMATION.md)
- [CI/CD Accessibility Best Practices](../CI_CD_ACCESSIBILITY_BEST_PRACTICES.md)

---

This document and the code in this folder are available under the
repository's [MIT License](../../LICENSE).
