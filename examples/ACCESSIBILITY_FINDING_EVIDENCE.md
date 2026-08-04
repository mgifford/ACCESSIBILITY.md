---
title: Technical Evidence for Reproducible Accessibility Findings
---

# Technical Evidence for Reproducible Accessibility Findings

This guide explains how triagers, evaluators, developers, and automated or
AI-assisted tools can collect technical evidence that makes an accessibility
finding easier to reproduce, investigate, correct, and verify.

Technical evidence supplements a report. It does not determine whether the
report is valid, establish WCAG conformance, or replace evaluation of the
user-facing barrier. A person reporting a barrier is not expected to use
developer tools, construct a selector, run Playwright, or understand the
browser accessibility tree. Collecting missing technical evidence is a triage
and investigation responsibility.

Use this guide with:

- [Accessibility Bug Reporting Best Practices](./ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES.md)
  for valid intake, impact, triage, and verification;
- [Accessibility Finding Tracking](./ACCESSIBILITY_FINDING_TRACKING.md) for
  tracker IDs, fingerprints, lifecycle, actionability, and policy
  classification;
- [Behavioral Accessibility Automation](./BEHAVIORAL_ACCESSIBILITY_AUTOMATION.md)
  for risk indicators and repeatable interaction checks; and
- [Accessibility Finding Schema](./schemas/README.md) for machine-readable
  interchange.

The Playwright MCP instructions in this guide were reviewed on 2026-08-04.
Playwright MCP and its tool schemas can change. Verify version-sensitive setup
against the current official documentation before adopting it in a maintained
workflow.

## 1. Scope and Non-Goals

This guide covers:

- constructing a layered evidence package;
- identifying an affected element without depending on a single brittle
  selector;
- capturing relevant DOM, accessibility-tree, interaction, and visual state;
- using Playwright MCP for exploratory investigation;
- converting an MCP-assisted investigation into a maintained Playwright test;
- recording tool and environment provenance;
- redacting, retaining, and referencing evidence safely; and
- distinguishing evidence, locators, fingerprints, and durable issue identity.

This guide does not:

- make technical evidence mandatory for valid intake;
- define or change a fingerprint profile;
- make a Playwright MCP element reference durable;
- claim that an accessibility-tree snapshot represents exactly what every
  assistive technology announces;
- treat an automated assertion as a WCAG conformance conclusion;
- require whole-page snapshot comparisons; or
- replace manual evaluation or testing with disabled people.

## 2. Evidence Is Not Identity

Several identifiers may appear together in a finding, but they serve different
purposes.

| Concept | Purpose | Expected lifetime |
| --- | --- | --- |
| Tracker ID | Durable identity assigned by an issue or work-tracking system | Life of the tracked work |
| Occurrence fingerprint | Correlates a result at one normalized location under a versioned profile | Until the profile or normalized inputs change |
| Pattern fingerprint | Correlates a candidate pattern within a defined scope | Until the profile or normalized inputs change |
| Stable locator | Finds an element using a maintained product or test contract | Until that contract changes |
| Semantic locator | Finds an element by role, accessible name, label, or related semantics | Until the relevant user-facing semantics change |
| DOM locator | Finds an element using CSS, XPath, or DOM structure | Until the relevant markup changes |
| MCP element ref | Identifies an interactive element in the current Playwright MCP snapshot | Until navigation or a relevant page change |
| Evidence artifact | Supports reproduction or evaluation | According to the retention policy |
| Regression assertion | Defines behavior that should continue to hold | Until the product contract is intentionally revised |

Use the issue tracker's ID as the durable identity for tracked work. Do not
compute it from finding content. Follow the frozen profiles in
[`examples/fingerprints/`](./fingerprints/README.md) when generating
fingerprints. This guide does not add semantic paths, Playwright refs, or
accessibility snapshots to those profiles.

An MCP ref such as `e15` is session evidence. It must not be used as:

- a tracker ID;
- an occurrence or pattern fingerprint input;
- a locator expected to work in a later run;
- proof that two results have the same root cause; or
- proof that a finding has been resolved.

## 3. A Layered Evidence Model

No single artifact can describe every accessibility finding. Collect the
smallest combination that demonstrates the relevant behavior.

### 3.1 Human and task context

Record:

- the task the person is trying to complete;
- the safe page, route, component, and UI state;
- required preconditions;
- the input method and assistive technology when relevant;
- expected user-facing behavior;
- actual observed behavior; and
- the evidence basis and its limits.

This remains the primary explanation of the finding. Technical output should
not replace it.

### 3.2 Semantic evidence

Semantic evidence may include:

- computed role;
- accessible name and description;
- value and states such as `expanded`, `checked`, `pressed`, `disabled`, or
  `invalid`;
- programmatic relationships;
- meaningful accessibility-tree ancestors and siblings; and
- whether the target is absent from or ignored in the accessibility tree.

Semantic evidence describes what the browser exposes. It does not prove that
the semantics are meaningful, that the control works with a keyboard, or that
a particular browser and assistive technology combination announces the same
information in the same way.

### 3.3 DOM and component evidence

DOM and component evidence may include:

- a short live-DOM excerpt;
- component, template, design-system, or source-file identity;
- a maintained test ID;
- a concise CSS selector or XPath fallback;
- iframe and shadow-root boundaries;
- relevant attributes and computed styles; and
- a repository, Storybook, or component-fixture reference.

Prefer the live DOM when client-side rendering, hydration, or dynamic state can
make page-source HTML inaccurate.

### 3.4 Interaction evidence

Interaction evidence may include:

- initial state;
- exact input sequence;
- focus before and after the action;
- changed accessible names, roles, states, or relationships;
- timing and waiting conditions;
- navigation history;
- reproduction attempts and observed frequency; and
- relevant console, network, or application events.

### 3.5 Visual and spatial evidence

Visual evidence may include:

- a screenshot with a written description;
- a captioned recording;
- bounding boxes and target dimensions;
- viewport and zoom or text-size settings;
- computed colors;
- overlap, clipping, reflow, or focus-indicator evidence; and
- the supported theme or user-preference state.

An accessibility snapshot cannot establish visual contrast, target size,
clipping, overlap, visible focus, or visual reading order. Combine semantic and
visual evidence when both affect the finding.

### 3.6 Environment and provenance

Record only relevant values, including:

- product build or commit;
- capture date and time;
- tool and version;
- browser and version;
- operating system and version when relevant;
- viewport, zoom, text size, orientation, and device emulation;
- active preferences such as reduced motion or forced colors;
- locale, account role, or test data state; and
- redactions, omissions, retries, timeouts, and failed setup steps.

## 4. Choose Evidence for the Finding

| Finding type | Primary evidence | Useful supporting evidence |
| --- | --- | --- |
| Missing or incorrect accessible name | Scoped accessibility snapshot and semantic locator | Live DOM and accessible-name sources |
| Incorrect role or state | Scoped accessibility snapshot before and after interaction | DOM attributes and product contract |
| Element absent from the accessibility tree | DOM target and intended component description | Accessibility-tree absence and screenshot |
| Focus moves incorrectly | Interaction steps and focused element before and after | Scoped snapshots, trace, and recording |
| Focus is not visible or is obscured | Region-scoped screenshots and geometry | Focus sequence and DOM target |
| Status or error is not announced | Triggering interaction, timing, and live-region or relationship evidence | Manual assistive-technology observation |
| Contrast failure | Computed foreground and background colors | Screenshot, state, selector, and theme |
| Target-size failure | Bounding box, viewport, and applicable spacing | Screenshot and DOM target |
| Reflow, clipping, or overlap | Viewport, zoom, screenshot, and geometry | DOM excerpt and computed styles |
| Keyboard failure | Exact keys, focus sequence, and resulting state | Snapshot, trace, and recording |
| Canvas or image-based interface | Screenshot and task description | DOM fallback, text alternative, and keyboard behavior |

Do not capture every artifact for every finding. Additional artifacts create
privacy, retention, storage, and review costs. Collect evidence that answers a
specific investigative or verification question.

## 5. Construct a Reproducible Target Description

Describe a target in layers, using the first reliable information available:

1. human-readable component and location;
2. safe page, route, build, and UI state;
3. maintained component identity or test ID;
4. role and accessible name;
5. nearest meaningful landmark, form, region, dialog, or heading;
6. iframe or shadow-root boundary;
7. concise CSS or XPath fallback; and
8. temporary runtime reference, retained only with its original session.

Example:

```text
Component: Save button in the Account settings form
Route: /account/settings
State: Invalid email has been submitted
Semantic target: button "Save changes"
Semantic context: main > form "Account settings"
Test ID: account-save
CSS fallback: form.account-settings button.save
Frame: none
Shadow host: none
MCP ref at capture time: e15, original snapshot only
```

Do not require every layer. A component description and a reliable state may be
more useful than an absolute XPath. An XPath may still be retained for legacy
correlation or investigation, but it should not be treated as permanent.

## 6. Set Up Playwright MCP

[Playwright MCP](https://github.com/microsoft/playwright-mcp) is an MCP server
that lets an MCP-capable agent navigate and inspect web pages through
Playwright. Its standard interaction model returns structured accessibility
snapshots with temporary element refs.

Use MCP for exploratory investigation, evidence collection, and turning an
observed interaction into a test proposal. Use maintained Playwright Test files
for committed regression coverage.

### 6.1 Prerequisites

At the time this guide was reviewed, the official MCP setup required:

- Node.js 20 or newer; and
- an MCP client such as VS Code, Codex, Cursor, Claude Code, or another client
  that can launch a local MCP server.

Use a Node.js version that is also supported by the Playwright Test version in
the project. Record the actual versions used. Do not assume a global or
continuously updated `latest` installation is reproducible.

The MCP-managed browser downloads automatically on first use. Account for that
download in restricted, offline, or ephemeral development environments.

### 6.2 Minimal client configuration

The official starting configuration is:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

This is suitable for initial evaluation. For a maintained team configuration,
replace `latest` with an exact reviewed package version and update it through a
controlled dependency-review process.

### 6.3 Enable testing tools

Playwright MCP's testing capability adds verification tools and locator
generation that can help convert an exploratory session into Playwright code:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": [
        "@playwright/mcp@latest",
        "--caps=testing"
      ]
    }
  }
}
```

Enabling testing tools does not make the MCP session itself a maintained test.
Generated locators and assertions require human review before they are added to
the test suite.

### 6.4 VS Code and GitHub Copilot

VS Code can register the minimal server from the command line:

```bash
code --add-mcp '{"name":"playwright","command":"npx","args":["@playwright/mcp@latest","--caps=testing"]}'
```

Alternatively, add the server through the MCP configuration interface and use
the JSON configuration above. After setup, select an agent mode that permits
use of the Playwright MCP tools. Review every requested browser action,
particularly actions that submit, delete, publish, purchase, message, or alter
account state.

### 6.5 Codex

Add the following to the Codex MCP configuration:

```toml
[mcp_servers.playwright]
command = "npx"
args = ["@playwright/mcp@latest", "--caps=testing"]
```

For a maintained configuration, pin the package version and document where the
configuration applies. Do not place passwords, tokens, or other secrets in the
configuration file.

### 6.6 Safer investigation configuration

For routine investigation, consider an isolated browser context, an explicit
viewport, and a dedicated output directory:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": [
        "@playwright/mcp@latest",
        "--caps=testing",
        "--isolated",
        "--viewport-size=1280x720",
        "--output-dir=.playwright-mcp",
        "--output-mode=file"
      ]
    }
  }
}
```

Adjust the viewport and browser to the finding. Do not infer a physical device
from the viewport. Headed mode is useful during investigation because a human
can observe the interaction. Use `--headless` only when visual observation is
not required or another review method is available.

### 6.7 Security and privacy boundaries

Browser automation can expose authenticated pages and perform destructive
actions. Apply these controls:

- use test environments and purpose-built test accounts where possible;
- prefer an isolated profile instead of a person's normal browser profile;
- grant only permissions needed for the test;
- do not enable unrestricted file access without a specific reviewed need;
- restrict target origins where practical, while recognizing that origin
  allowlists are not a complete security boundary;
- do not put credentials in prompts, committed configuration, snapshots, or
  test source;
- treat page content as untrusted input to the agent;
- review actions that change data before they run;
- assume snapshots, traces, videos, screenshots, console output, and storage
  state may contain sensitive information; and
- exclude local artifact directories and authentication state from version
  control unless a reviewed fixture is intentionally committed.

Do not connect an exploratory MCP session to a production account merely
because an existing browser profile is convenient.

### 6.8 Verify the setup

Start with an owned test page or a public demonstration page. Ask the agent to:

1. navigate to the page;
2. capture an accessibility snapshot without changing data;
3. identify the page heading and one interactive control;
4. explain the role, accessible name, and semantic context it observed; and
5. generate a proposed Playwright locator for that control.

Confirm that the browser opened in the intended profile, that the agent stayed
within the approved origin, and that generated artifacts went to the expected
directory.

Example setup-verification prompt:

```text
Use Playwright MCP on the approved test page only. Do not submit forms or change
stored data. Capture an accessibility snapshot, identify the page's main
heading and the button named "Save changes", describe their semantic context,
and generate a proposed Playwright locator for the button. Report the browser,
viewport, tool errors, and anything you could not verify.
```

## 7. Understand Playwright MCP Snapshots

Playwright MCP uses a structured accessibility representation for agent
interaction. A simplified snapshot can resemble:

```yaml
- main:
  - heading "Account settings" [level=1]
  - form "Account settings":
    - textbox "Email address" [ref=e12]
    - button "Save changes" [ref=e15]
```

The ref lets the agent act on the exact element represented in that snapshot.
According to the current Playwright documentation:

- refs are unique within one snapshot;
- only interactive elements receive refs;
- a ref remains useful only until a relevant page change; and
- navigation or DOM updates can produce new refs.

The snapshot is valuable because it records semantic context such as role,
accessible name, state, and ancestry. It is not a durable locator and is not a
complete record of the DOM or visual presentation.

### 7.1 Capture a scoped snapshot

For one finding, capture the smallest useful scope:

- the target;
- the nearest meaningful semantic ancestor;
- siblings that explain the relationship or state;
- relevant content before the action; and
- changed content after the action.

Avoid using an entire page snapshot when a component or workflow step is
sufficient. Full snapshots are harder to review, more likely to contain private
content, and more sensitive to unrelated changes.

### 7.2 Capture before and after state

For a dynamic finding, preserve both sides of the transition:

```yaml
# Before submission
- form "Payment":
  - textbox "Card number"
  - button "Submit order"
```

```yaml
# After submission
- form "Payment":
  - textbox "Card number" [invalid=true]
  - paragraph: Enter a card number.
  - button "Submit order"
```

These snapshots show that state and content changed. They do not, by
themselves, prove that the error is programmatically associated with the field
or announced at the right time. Add relationship evidence and manual
assistive-technology observation when those questions are part of the finding.

### 7.3 Combine snapshots with other evidence

Add a screenshot when layout or visual state matters. Add live DOM or browser
accessibility data when the simplified snapshot omits the relationship or name
source needed for diagnosis. Add an interaction trace when timing, focus, or
navigation matters.

## 8. MCP-Assisted Investigation Workflow

### 8.1 Preserve the original report

Do not rewrite a user report into an automated conclusion. Retain the original
description, evidence basis, conditions, and uncertainty. Add technical
evidence as a separate triage or investigation record.

### 8.2 Define the target state

Before navigating, write down:

- the safe route;
- the required account and test-data state;
- browser, viewport, locale, preferences, and input;
- the action that is expected to trigger the result; and
- what evidence would confirm or reject the current hypothesis.

### 8.3 Navigate and capture the initial state

Ask the agent to navigate to the safe route, stop before the triggering action,
and return a snapshot. Confirm that the target, accessible name, and relevant
context match the report.

Do not continue if the agent reached the wrong account, environment, record, or
component.

### 8.4 Perform the shortest relevant interaction

Use the same input method described by the finding when possible. Mouse
activation is not equivalent to keyboard activation. Programmatic `.click()`
does not demonstrate pointer or keyboard operability.

Ask the agent to report each material action and resulting state. Re-snapshot
after navigation, dialog changes, expansion, validation, asynchronous status,
or other relevant DOM updates.

### 8.5 Capture focused evidence

Collect only what is needed to explain the result:

- scoped before and after snapshots;
- generated semantic locator;
- live DOM excerpt;
- relevant screenshot or trace;
- environment and tool versions;
- observed focus target;
- timing or retries; and
- uncertainties or evidence that could not be collected.

### 8.6 Generate a durable locator proposal

With the testing capability enabled, Playwright MCP can propose a Playwright
locator from the current ref. Prefer locators based on user-facing semantics:

```ts
page.getByRole('button', { name: 'Save changes' })
```

or a maintained label:

```ts
page.getByLabel('Email address')
```

Use a product-owned test ID when semantics are insufficient to identify the
specific target reliably:

```ts
page.getByTestId('account-save')
```

Review the proposal. A locator is not good merely because it currently finds
one element. It should express a stable product or test contract and fail
meaningfully when that contract changes.

### 8.7 Record reproduction status honestly

Use the reproduction and equivalent-evidence states defined in
[Accessibility Finding Tracking](./ACCESSIBILITY_FINDING_TRACKING.md#direct-reproduction-and-equivalent-evidence).
An unsuccessful MCP run is not proof that the original report was false. Record
the attempted state, differences from the original conditions, tool errors,
timeouts, missing access, and next investigative action.

Example investigation-to-test prompt:

```text
Reproduce tracked finding A11Y-123 in the approved test environment with
Playwright MCP. Preserve snapshots immediately before and after the triggering
action. Generate durable locator proposals from role, accessible name, label,
component identity, or test ID, not from MCP refs. Propose the smallest
Playwright Test that would fail for the original barrier. State exactly what
the proposed test establishes, what it does not establish, and which manual
checks remain necessary. Do not update snapshots or write test files without
review.
```

## 9. Convert Investigation Into a Maintained Playwright Test

MCP supports exploration. Playwright Test supplies maintained test files,
assertions, isolation, reports, retries, traces, and CI integration. Do not use
an MCP transcript as the only regression test.

### 9.1 Install Playwright Test

For a new or existing Node.js project, the official initializer is:

```bash
npm init playwright@latest
```

Review the generated files before committing them. Commit the package lockfile,
select the browsers the project actually supports, and pin or control
dependency updates according to project policy.

Run the suite with:

```bash
npx playwright test
```

Open the HTML report with:

```bash
npx playwright show-report
```

### 9.2 Prefer focused, web-first assertions

Test the user-facing semantic or behavioral contract. Playwright's web-first
assertions retry until the expected state appears or the assertion times out.

Example:

```ts
import { test, expect } from '@playwright/test';

test('account settings exposes the save control', async ({ page }) => {
  await page.goto('/account/settings');

  const save = page.getByRole('button', { name: 'Save changes' });

  await expect(save).toBeVisible();
  await expect(save).toBeEnabled();
  await expect(save).toHaveAccessibleName('Save changes');
});
```

This verifies a narrow contract. It does not establish that the entire workflow
is accessible.

### 9.3 Test the interaction that exposed the finding

The test should fail for the original barrier and pass after the correction.
For the payment-error example:

```ts
import { test, expect } from '@playwright/test';

test('empty card number exposes an identifiable field error', async ({ page }) => {
  await page.goto('/checkout/payment');

  const cardNumber = page.getByRole('textbox', { name: 'Card number' });
  const submit = page.getByRole('button', { name: 'Submit order' });

  await submit.click();

  await expect(cardNumber).toMatchAriaSnapshot(`
    - textbox "Card number" [invalid=true]
  `);

  await expect(page.getByText('Enter a card number.')).toBeVisible();
});
```

This example verifies invalid state and visible error text. It does not prove
that the error is programmatically associated with the field. Add a focused
assertion for the product's supported error-association contract and manually
retest screen-reader output. Do not claim broader coverage than the test
provides.

### 9.4 Use scoped ARIA snapshots

Playwright Test can compare a page or locator with an ARIA snapshot template.
Prefer a stable component or workflow scope:

```ts
import { test, expect } from '@playwright/test';

test('delete dialog exposes its confirmation structure', async ({ page }) => {
  await page.goto('/account');
  await page.getByRole('button', { name: 'Delete account' }).click();

  const dialog = page.getByRole('dialog', { name: 'Delete account' });

  await expect(dialog).toMatchAriaSnapshot(`
    - dialog "Delete account":
      - heading "Delete account"
      - paragraph: This action cannot be undone.
      - textbox "Type DELETE to confirm"
      - button "Delete account" [disabled]
      - button "Cancel"
  `);
});
```

Review the actual snapshot produced by the supported browser versions and
adjust the template only when the expected semantics are understood. Do not
approve a snapshot update merely to make CI pass.

### 9.5 Prefer partial or targeted matching when appropriate

Whole-page ARIA snapshots can fail because unrelated content, counts, links, or
browser behavior changed. Use:

- a component locator instead of the entire page;
- targeted assertions for a name, role, state, description, focus, or value;
- partial ARIA snapshot templates that include only relevant nodes;
- regular expressions only for genuinely variable values; and
- strict child matching only when exact structure is part of the reviewed
  contract.

Large accessibility-tree diffs should normally be review evidence, not an
automatic conformance verdict or an unreviewed fleet-wide build gate.

### 9.6 Save ARIA snapshots as reviewed files when useful

Playwright can store a named ARIA snapshot in a `.aria.yml` file:

```ts
await expect(page.getByRole('main')).toMatchAriaSnapshot({
  name: 'account-settings.aria.yml',
});
```

Named snapshots belong in version control only when they express a stable,
reviewed contract. Review their diffs like source code. Do not automatically
accept new baselines.

### 9.7 Attach diagnostic evidence to a test result

An ARIA snapshot can be attached without making the entire snapshot a blocking
assertion:

```ts
import { test, expect } from '@playwright/test';

test('capture account form evidence', async ({ page }, testInfo) => {
  await page.goto('/account/settings');

  const form = page.getByRole('form', { name: 'Account settings' });
  await expect(form).toBeVisible();

  await testInfo.attach('account-settings-aria', {
    body: await form.ariaSnapshot(),
    contentType: 'text/yaml',
  });
});
```

Use an attachment when the tree is useful for diagnosis but too broad or
unstable to define pass or fail.

### 9.8 Retain failure artifacts proportionately

Example Playwright configuration:

```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
```

Traces and videos can contain page text, form values, URLs, network data, and
other sensitive material. Apply access controls, redaction, retention limits,
and artifact-upload rules. Do not enable every artifact indefinitely by
default.

## 10. Use Raw Browser Accessibility Data When Needed

The simplified Playwright snapshot is often sufficient for navigation and a
human-readable semantic record. A browser's lower-level accessibility data may
be needed to investigate:

- accessible-name and description sources;
- ignored nodes and ignored reasons;
- programmatic relationships;
- computed states not visible in the simplified snapshot;
- accessibility-tree ancestry; or
- mapping between an accessibility node and the live DOM.

For Chromium-specific investigation, the
[Chrome DevTools Protocol Accessibility domain](https://chromedevtools.github.io/devtools-protocol/tot/Accessibility/)
can provide this detail. Record the browser and protocol version. Do not assume
that Chromium-specific output describes Firefox, WebKit, an operating-system
accessibility API, or a particular assistive technology.

Use raw browser data to explain a focused question. Do not attach an entire
unredacted accessibility tree when a small excerpt answers it.

## 11. Dynamic and Intermittent Findings

For a finding involving timing, loading, animation, asynchronous status,
client-side navigation, or intermittent behavior, record:

- the initial state and evidence;
- the triggering input and exact sequence;
- the event or condition awaited;
- the resulting state and evidence;
- elapsed time when it affects the result;
- number of attempts and number of observed occurrences;
- network, cache, service-worker, animation, or data conditions;
- whether back navigation, refresh, or repeated interaction was involved;
- skips, retries, timeouts, and tool errors; and
- differences between the original and attempted environment.

Prefer waiting for an observable state over an arbitrary delay. A delay may be
retained when timing is itself part of the finding, but record why it is used.

Do not classify a finding as resolved merely because it was absent from one
run. Use comparable-run and lifecycle guidance in
[Accessibility Finding Tracking](./ACCESSIBILITY_FINDING_TRACKING.md#comparable-runs).

## 12. Evidence Package

A focused evidence package can use this structure without creating a competing
finding schema:

```yaml
tracker_id: A11Y-123

target:
  component: Account settings form
  role: button
  accessible_name: Save changes
  semantic_context: main > form "Account settings"
  test_id: account-save
  css_fallback: form.account-settings button.save
  xpath_legacy: /html/body/main/form/button

state:
  route: /account/settings
  condition: invalid email submitted

evidence:
  before_snapshot: evidence/A11Y-123-before.aria.yml
  after_snapshot: evidence/A11Y-123-after.aria.yml
  dom_excerpt: evidence/A11Y-123-target.html
  screenshot: evidence/A11Y-123-after.png
  trace: https://evidence.example.test/A11Y-123/trace.zip

session:
  playwright_mcp_ref: e15
  ref_scope: original snapshot only

environment:
  product_build: 2026.08.04.1
  browser: Chromium [record exact version]
  playwright_mcp: [record exact version]
  playwright_test: [record exact version]
  viewport: 1280x720 CSS pixels
  locale: en-CA

limitations:
  - MCP ref is temporary and excluded from fingerprint generation.
  - Screen-reader output was not tested in this session.
```

This is an explanatory evidence manifest, not a new interchange schema. In the
canonical finding schema, use `source.raw_result_reference` and
`evidence.references` to point to stored evidence:

```json
{
  "schema_version": "2.0",
  "title": "Account settings: save control does not expose invalid state",
  "reported_at": "2026-08-04T14:30:00-04:00",
  "source": {
    "method": "semi-automated",
    "raw_result_reference": "https://evidence.example.test/A11Y-123/mcp-session"
  },
  "location": {
    "scope": "component-state",
    "route": "/account/settings",
    "component": "Account settings form",
    "locator": {
      "type": "test-id",
      "raw_value": "account-save"
    }
  },
  "description": {
    "summary": "The invalid account form is visible, but its save-state semantics require review."
  },
  "affected_people": [
    {
      "description": "People who rely on programmatically exposed form state",
      "status": "unknown",
      "evidence_basis": "semi-automated",
      "scope_limit": "MCP evidence has not yet been confirmed through manual evaluation."
    }
  ],
  "evidence": {
    "references": [
      {
        "reference": "https://evidence.example.test/A11Y-123/after.aria.yml",
        "description": "Scoped ARIA snapshot after invalid submission."
      },
      {
        "reference": "https://evidence.example.test/A11Y-123/after.png",
        "description": "Redacted screenshot after invalid submission."
      }
    ],
    "redacted": true,
    "contains_personal_data": false,
    "retention_notes": "Retain with the tracked issue according to project policy."
  }
}
```

Do not place the temporary MCP ref in the canonical locator or fingerprint.
Preserve tool-specific session data in the referenced raw evidence or a
namespaced extension only when it is needed for interchange.

## 13. Reproduction, Acceptance Criteria, and Regression Tests

Keep three artifacts distinct:

| Artifact | Question it answers |
| --- | --- |
| Reproduction evidence | What happened, under which conditions, and what supports that observation? |
| Acceptance criteria | What user-facing behavior must be true after correction? |
| Regression test | Which stable part of that behavior can the test suite enforce repeatably? |

A regression test rarely covers the entire acceptance criterion. For example,
an ARIA snapshot can verify that a dialog has a name and expected controls. It
does not prove that focus moved appropriately, that every control works with a
keyboard, or that the workflow is understandable.

Record manual checks that remain necessary. Do not close an issue solely
because the generated locator works, an ARIA snapshot matches, or the original
automated rule passes.

## 14. Privacy, Accessibility, and Retention

Before storing or sharing evidence:

- remove tokens, cookies, credentials, and temporary signed URLs;
- replace production accounts and records with approved test data;
- redact names, addresses, messages, account numbers, document titles, and
  private form values;
- inspect hidden DOM and accessibility-tree content, not only visible pixels;
- inspect trace, video, storage-state, console, and network artifacts;
- describe screenshots in the issue or evidence record;
- caption or transcribe recordings when their audio or visual sequence conveys
  relevant information;
- use text labels or numbered markers in addition to color annotations;
- document access controls and retention or expiry rules;
- delete evidence when its retention purpose ends; and
- retain a redacted explanation when the original artifact cannot be shared.

A cryptographic hash can verify that an artifact has not changed. That hash is
artifact integrity metadata, not a tracker ID or accessibility finding
fingerprint.

## 15. Common Mistakes

Avoid:

- requiring MCP, snapshots, selectors, or developer-tool output before
  accepting a report;
- treating `ref=e15` as a stable identifier;
- hashing a complete accessibility snapshot into a permanent bug ID;
- replacing a human-readable component and state with only XPath;
- attaching a complete page tree when a component excerpt is sufficient;
- using only a screenshot for a semantic relationship failure;
- using only an accessibility snapshot for a visual or spatial failure;
- assuming tree presence proves operability or usability;
- assuming tree absence identifies the intended DOM target;
- assuming one browser's accessibility tree represents every browser or
  assistive technology;
- turning generated MCP actions directly into committed tests without review;
- using programmatic `.click()` as evidence of keyboard or pointer operation;
- making large, unstable snapshots blocking by default;
- automatically approving snapshot changes;
- inferring user impact, WCAG failure, severity, or root cause from tool output;
- treating failure to reproduce as proof that a report is invalid;
- storing unredacted authenticated traces or browser state; or
- treating an automated pass as sufficient closure evidence.

## 16. Review Checklist

Before treating a technical evidence package as ready for remediation, verify:

- [ ] The original report and its evidence basis remain distinguishable from
      later technical investigation.
- [ ] The safe page, component, state, and shortest relevant interaction are
      recorded.
- [ ] The target has a human-readable description.
- [ ] Stable semantic, component, or test locators are used where available.
- [ ] Temporary MCP refs are marked as session-only.
- [ ] The evidence is scoped to the question being investigated.
- [ ] Semantic evidence is supplemented by visual, DOM, interaction, or manual
      evidence when needed.
- [ ] Tool, browser, build, environment, and capture date are recorded.
- [ ] Reproduction status and limitations are stated without overstating
      certainty.
- [ ] Sensitive data has been removed or protected.
- [ ] Screenshots and recordings have accessible descriptions, captions, or
      transcripts as applicable.
- [ ] Acceptance criteria describe user-facing behavior.
- [ ] Any committed regression test fails for the original barrier and checks
      only the contract it claims to cover.
- [ ] Manual and disabled-participant testing obligations remain explicit.
- [ ] Evidence references use the canonical schema rather than introducing a
      conflicting record format.
- [ ] Tracker IDs and frozen fingerprint profiles remain unchanged by
      tool-specific evidence.

## 17. Related Guides

- [Accessibility Bug Reporting Best Practices](./ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES.md)
- [Accessibility Finding Tracking](./ACCESSIBILITY_FINDING_TRACKING.md)
- [Accessibility Finding Schema](./schemas/README.md)
- [Behavioral Accessibility Automation](./BEHAVIORAL_ACCESSIBILITY_AUTOMATION.md)
- [Playwright examples and tests](./playwright/README.md)
- [Manual Accessibility Testing Guide](./MANUAL_ACCESSIBILITY_TESTING_GUIDE.md)
- [CI/CD Accessibility Best Practices](./CI_CD_ACCESSIBILITY_BEST_PRACTICES.md)

## 18. Primary References

- [Playwright MCP repository](https://github.com/microsoft/playwright-mcp)
- [Playwright MCP installation](https://playwright.dev/mcp/installation)
- [Playwright MCP snapshots](https://playwright.dev/mcp/snapshots)
- [Playwright MCP testing and assertions](https://playwright.dev/mcp/tools/assertions)
- [Playwright MCP configuration](https://playwright.dev/mcp/configuration/options)
- [Playwright Test installation](https://playwright.dev/docs/intro)
- [Playwright ARIA snapshot testing](https://playwright.dev/docs/aria-snapshots)
- [Playwright assertions](https://playwright.dev/docs/test-assertions)
- [Playwright locators](https://playwright.dev/docs/locators)
- [Playwright accessibility testing](https://playwright.dev/docs/accessibility-testing)
- [Chrome DevTools Protocol Accessibility domain](https://chromedevtools.github.io/devtools-protocol/tot/Accessibility/)

---

This document is available under the repository's [MIT License](../LICENSE).
