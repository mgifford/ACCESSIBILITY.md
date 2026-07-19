---
layout: page
title: Browser and Assistive Technology Support Policy
meta_title: Evidence-Based Browser and Assistive Technology Support
description: Guidance for defining, testing, documenting, and maintaining browser and assistive technology support
lede: A versioned, evidence-based policy for browser, operating system, device, input method, and assistive technology combinations
source_url: https://github.com/mgifford/ACCESSIBILITY.md/blob/main/BROWSER_SUPPORT.md
---

# Browser and Assistive Technology Support Policy

## Purpose

This guide helps a project decide which browser, operating system, device,
input method, and assistive technology combinations it supports, how it tests
them, and what it can claim from the resulting evidence.

This is adoption guidance. It is not evidence that the
`mgifford/ACCESSIBILITY.md` repository or a project copying this file has
tested any particular combination.

Do not copy version numbers, testing statuses, or support claims from another
project. Build a matrix from the needs of the people who use the product, then
record actual results.

## Core Principle

A support policy is a maintained product decision, not a browser popularity
list.

WCAG does not require “the latest browser,” “the last two versions,” or a
particular screen reader. WCAG conformance relies on
accessibility-supported ways of using technologies. Support can vary by:

- browser product, engine, channel, and version;
- operating system and version;
- assistive technology and version;
- device and input method;
- language, locale, and writing direction;
- feature, pattern, and interaction;
- configuration and user preferences; and
- the complete task being performed.

A version number alone is not accessibility evidence. Record the combination,
task, state, date, method, and result.

## Separate Four Different Records

Do not combine these into one ambiguous “supported browsers” list.

### 1. Product support policy

The combinations the project commits to maintaining, the level of support
offered, and the process for changes.

### 2. Test coverage matrix

The combinations, user journeys, states, and preferences included in
automated and manual regression testing.

### 3. Test-results record

What was tested, on which build and environment, when, by whom, with what
method, and what happened.

### 4. Known-issues register

Verified interoperability problems, affected combinations, user impact,
workarounds, upstream reports, owners, and review dates.

A combination may be in the support policy without having complete regression
coverage. If so, disclose the coverage gap rather than marking it “tested.”

## Define Support from User Needs

### Evidence to consider

Use several sources:

- user research that includes people with disabilities;
- support requests and accessibility issue reports;
- privacy-respecting product analytics;
- organizational and managed-device inventories;
- procurement, contractual, public-sector, and educational requirements;
- operating systems and devices available to the intended audience;
- browser and assistive technology pairings used by that audience;
- languages, input methods, and regional constraints;
- vendor security-support timelines;
- critical tasks and consequences of failure; and
- the cost and feasibility of maintaining secure alternatives.

Aggregate browser share is not enough. A combination with low overall usage
may be disproportionately important to people with disabilities, users of
managed devices, or users in a specific region.

### Ask before choosing a matrix

1. Which complete tasks are essential, high risk, or time sensitive?
2. Who uses those tasks, and what environments do they use?
3. Which combinations are contractually or organizationally required?
4. Which platform accessibility APIs and browser pairings are relevant?
5. Which combinations can the team test directly?
6. Where is external testing or user evaluation needed?
7. What secure equivalent is available if a combination cannot be supported?
8. Who owns the matrix and how often will it be reviewed?

Do not use lack of internal access to an assistive technology as evidence that
users do not need it.

## Support Levels

Define project-specific terms. This model is a starting point:

| Level | Commitment | Required evidence |
|---|---|---|
| **Core** | Critical tasks are maintained and regressions can block release. | Automated coverage where feasible, scheduled manual testing, and dated results for representative combinations. |
| **Extended** | The project aims to preserve access and investigates reported barriers, but does not run the full regression suite for every release. | Compatibility checks for high-risk changes, documented limitations, and an escalation path. |
| **Known unsupported** | A verified barrier or security limitation prevents reliable support. | User impact, secure alternative, tracked issue, owner, rationale, and review date. |
| **Not evaluated** | No reliable evidence is available. | Honest disclosure; do not label the combination supported or unsupported. |

“Best effort” is not a useful level unless the project defines the response,
testing, and remediation it includes.

Core support does not mean defect-free. It means the project has a defined
commitment, coverage, reporting route, and remediation process.

## Browser Products, Engines, and Channels

Record the browser product and the engine or automation target separately.

- Chromium test results are not automatically results for every
  Chromium-based browser.
- An automated WebKit build is not the same product, operating-system
  integration, or accessibility stack as Safari.
- Firefox automation does not replace testing the relevant released Firefox
  product with platform accessibility services.
- Mobile emulation does not replace testing on a real mobile operating system,
  browser, accessibility service, and input method.
- A web view embedded in an app can differ from the standalone browser.

Stable, beta, developer, extended-stable, and enterprise channels have
different purposes. A preview channel can find upcoming regressions, but it
does not replace testing the production channel used by the audience.

### Browser matrix template

| Support level | Browser product and channel | Version policy | Operating system or device | Engine or automation target | Critical tasks | Last tested | Evidence | Owner |
|---|---|---|---|---|---|---|---|---|
| `{{CORE_EXTENDED}}` | `{{PRODUCT_AND_CHANNEL}}` | `{{POLICY}}` | `{{OS_DEVICE}}` | `{{ENGINE_OR_RUNNER}}` | `{{TASKS}}` | `{{YYYY-MM-DD}}` | `{{REPORT_URL}}` | `{{OWNER}}` |

Avoid a single row such as “Chrome: latest.” Desktop and mobile products,
operating systems, managed channels, and web views may need separate rows.

## Version Policy

### Prefer a maintainable rule

A project may choose:

- the current vendor-supported stable channel;
- stable plus an extended or enterprise channel used by its audience;
- a defined set of operating-system/browser combinations;
- specific versions required by managed environments;
- a rolling window tied to release testing; or
- another evidence-based policy.

“Last two major versions” can be a product decision, but it is not a WCAG
requirement and is difficult to interpret when vendors have different release
cadences, extended channels, operating-system coupling, or automatic updates.

If using a rolling rule, define:

- which product and channel it applies to;
- when a newly released version enters core support;
- how long the previous version remains supported;
- whether emergency security updates change the schedule;
- how the exact versions used in testing are captured; and
- what happens when the team cannot obtain a required version.

### Keep exact results outside prose

Do not maintain a manually copied “current browser versions” table in a policy
document. It will become stale.

Record exact versions at test execution in a report, artifact, or
machine-readable file. A generated status page may summarize that data.

Example:

```yaml
tested_at: "{{YYYY-MM-DD}}"
build: "{{COMMIT_OR_RELEASE}}"
combination:
  operating_system: "{{NAME_AND_VERSION}}"
  browser:
    product: "{{NAME}}"
    channel: "{{CHANNEL}}"
    version: "{{EXACT_VERSION}}"
  assistive_technology:
    product: "{{NAME_OR_NONE}}"
    version: "{{EXACT_VERSION_OR_NOT_APPLICABLE}}"
  input: "{{KEYBOARD_TOUCH_POINTER_SPEECH_BRAILLE}}"
tasks:
  - "{{TASK_AND_STATE}}"
result: "{{PASS_FAIL_PARTIAL_NOT_RUN}}"
findings:
  - "{{ISSUE_URL_OR_NONE}}"
```

Use a date format with an unambiguous year, month, and day.

## Assistive Technology Coverage

Assistive technology behavior depends on the complete combination. Do not say
“tested with NVDA” without naming at least the NVDA version, browser, browser
version, operating system, task, and date.

### Choose representative combinations

Candidate combinations may include:

- JAWS with a browser commonly used by the project's Windows audience;
- NVDA with Firefox, Chrome, or another browser used by the audience;
- Narrator with Edge on Windows;
- VoiceOver with Safari on macOS;
- VoiceOver with Safari on iOS or iPadOS; and
- TalkBack with Chrome on Android.

This is not a mandatory or complete matrix. Select combinations from user
needs and project risk. Include other tools such as screen magnification,
braille displays, switch access, voice control, speech input, reading tools,
and operating-system preferences when relevant.

Do not assume one screen reader represents all screen readers or all people
who use that screen reader.

### Assistive technology matrix template

| Support level | Assistive technology and version | Browser and version | OS and version | Language and input | Tasks and states | Method | Date | Result and evidence |
|---|---|---|---|---|---|---|---|---|
| `{{LEVEL}}` | `{{AT}}` | `{{BROWSER}}` | `{{OS}}` | `{{LOCALE_INPUT}}` | `{{TASKS}}` | `{{SCRIPTED_EXPLORATORY_USER_EVALUATION}}` | `{{YYYY-MM-DD}}` | `{{RESULT_URL}}` |

### Interpret shared interoperability data carefully

The [ARIA-AT project](https://aria-at.w3.org/) publishes interoperability
reports for specific examples, browser and assistive technology combinations,
and test-plan versions.

Before relying on a report:

- check the exact example and pattern;
- check the browser and assistive technology versions;
- check the report date;
- distinguish recommended reports from candidate or unapproved reports;
- read must-have and should-have expectations;
- verify that the project's implementation matches the tested example; and
- run product-specific task testing.

ARIA-AT data is valuable interoperability evidence. It is not a conformance
report for a product and does not replace testing complete user journeys.

## User Preferences and Input Methods

Browser support also includes behavior under relevant preferences and input
methods.

| Environment | Examples to evaluate |
|---|---|
| Keyboard | Tab, Shift+Tab, arrow keys for composites, Enter, Space, Escape, shortcuts |
| Touch and pointer | Touch, mouse, stylus, target size, cancellation, gestures, dragging alternatives |
| Speech input | Visible label and accessible-name consistency, command discovery, dictation |
| Zoom and magnification | Browser zoom, text resize, reflow, magnifier tracking |
| Color and contrast | Light, dark, increased contrast, forced colors, color independence |
| Motion and timing | Reduced motion, pause/stop/hide, timeouts, session recovery |
| Orientation and viewport | Portrait, landscape, narrow viewport, on-screen keyboard |
| Language | Locale, direction, pronunciation, input method, translated labels and errors |

Record the browser, operating system, device, and preference configuration used
for each result.

## Testing Layers

Use layers because each finds different problems.

### 1. Source and static checks

Examples include HTML validation, type checking, linting, accessible-name
rules, and checks for prohibited patterns. These do not evaluate rendered
behavior or assistive technology output.

### 2. Browser-based automated checks

Run automated accessibility rules and functional tests in configured browser
engines. Capture the tool, rule set, browser build, viewport, page state, and
result.

Automated rules do not determine whether:

- focus order is logical;
- instructions are understandable;
- alternatives communicate equivalent meaning;
- screen reader announcements are useful;
- a complete process is usable; or
- a pattern works across the required browser and assistive technology
  combinations.

Do not use a Lighthouse score threshold as an accessibility conformance gate.
Gate on specific actionable findings and required task tests.

### 3. Cross-engine and branded-browser checks

Use automation to detect functional and rendering differences across engines.
Add tests in actual branded browsers and operating systems where the support
policy requires them.

### 4. Manual accessibility checks

Test keyboard operation, focus, zoom, reflow, text spacing, orientation,
contrast, forced colors, reduced motion, touch, speech input, and error
recovery as applicable.

### 5. Assistive technology task tests

Use a documented script for critical tasks, then add exploratory testing.
Record unexpected announcements, missing information, excessive verbosity,
mode changes, focus behavior, and task outcomes.

### 6. Evaluation with people with disabilities

Include people with disabilities throughout design and evaluation. User
evaluation finds practical barriers that standards checks may miss. It does
not replace standards-based evaluation, and one person's experience must not
be generalized to every person with a similar disability.

## Automation Guidance

### Name automation targets accurately

Playwright can run Chromium, Firefox, and WebKit builds and can use installed
branded Chrome or Edge channels. A Playwright `webkit` run is valuable
cross-engine coverage, but label it “WebKit automation,” not “Safari tested.”

Similarly:

- device descriptors and responsive viewports are emulation, not real-device
  tests;
- headless browser runs are not screen reader tests;
- DOM snapshots are not accessibility API interoperability tests; and
- an automated rule pass is not a WCAG conformance result.

### Example Playwright projects

```javascript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'chromium-engine',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox-engine',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit-engine',
      use: { ...devices['Desktop Safari'] }
    }
  ]
});
```

The device names configure Playwright browser builds and emulation parameters.
They do not prove results in released Chrome, Firefox, or Safari products.

If the project requires branded Chrome or Edge, configure and record those
channels explicitly. If it requires Safari, include actual Safari testing on a
supported Apple environment.

### Accessible automation reports

Reports and dashboards must themselves be accessible:

- use semantic headings and tables;
- do not rely on red and green alone;
- expose status in text;
- identify the tested build and environment;
- provide downloadable structured data where useful; and
- retain enough history to investigate regressions.

## Manual Test Requirements

Test complete tasks, including:

- initial, empty, loading, success, and error states;
- validation and recovery;
- authentication and session timeout;
- dialogs, menus, disclosures, tooltips, and other temporary content;
- asynchronous updates and status messages;
- content at zoom and narrow viewports;
- light, dark, increased-contrast, forced-color, and reduced-motion
  presentation;
- pointer, touch, keyboard, and speech input as applicable; and
- help, reporting, and accessible-alternative routes.

For screen reader tests:

- learn the relevant reading, navigation, forms, and interaction modes;
- use the project's test script without limiting exploration to the script;
- check the task outcome, not only whether each control is announced;
- verify labels, descriptions, groups, states, changes, errors, and focus;
- avoid changing multiple environment variables during one comparison; and
- record verbosity, punctuation, language, and other settings that materially
  affect results.

See the
[Manual Accessibility Testing Guide](examples/MANUAL_ACCESSIBILITY_TESTING_GUIDE.md).

## Known-Issues Register

Do not keep undated generalizations such as “Browser X has focus problems.”
Record a reproducible, scoped issue.

| Field | Required information |
|---|---|
| User impact | Affected task, users, and consequences |
| Feature or pattern | Exact component and state |
| Combination | Browser, version, OS, assistive technology, input, and preferences |
| Reproduction | Minimal steps and test case |
| Expected result | Requirement or documented expectation |
| Actual result | Observable behavior |
| Workaround | Equivalent, secure alternative or none |
| Upstream issue | Browser, assistive technology, framework, or standards report |
| Project issue | Owner, priority, target, and review date |

Retest known issues after relevant browser, operating system, assistive
technology, framework, or component changes. Close an issue only with dated
evidence.

## Release and Regression Policy

### Test before release

At minimum:

- run configured automated checks;
- test changed critical tasks in core combinations;
- test the keyboard and relevant user preferences;
- test new or changed custom interaction with representative assistive
  technologies;
- verify accessible alternatives and reporting routes; and
- review unresolved critical and high-impact findings.

### Trigger additional testing

Run targeted regression tests after:

- a browser, operating system, or assistive technology major update;
- a design-system or component-library update;
- a JavaScript framework, polyfill, or rendering-engine change;
- a sanitizer, optimizer, SVG, Mermaid, chart, or export-tool change;
- a change to authentication, forms, focus management, or routing;
- a new language or writing direction;
- a significant user report; or
- a change to the support matrix.

Preview-channel testing can provide early warning. Do not fail a production
release solely because an unstable preview channel changes unless the project
has explicitly adopted that policy.

## Changing or Ending Support

Do not drop support solely because:

- aggregate usage falls below an arbitrary percentage;
- a combination is difficult for the team to test;
- a newer implementation would be easier to build; or
- no recent issue has been reported.

Consider:

- usage among people with disabilities and within critical user groups;
- managed, public-sector, educational, and enterprise environments;
- vendor security support;
- user impact and task criticality;
- availability and quality of secure alternatives;
- cost and feasibility of remediation;
- contractual and policy obligations; and
- notice and migration support.

### Deprecation record

| Field | Required value |
|---|---|
| Combination or feature | `{{EXACT_SCOPE}}` |
| Evidence | `{{ANALYTICS_RESEARCH_VENDOR_POLICY_ISSUES}}` |
| Accessibility impact | `{{AFFECTED_USERS_AND_TASKS}}` |
| Security impact | `{{RISK}}` |
| Alternative | `{{EQUIVALENT_SECURE_PATH}}` |
| Decision owner | `{{ROLE}}` |
| Notice date | `{{YYYY-MM-DD}}` |
| End date | `{{YYYY-MM-DD}}` |
| Review or appeal route | `{{URL}}` |

Give notice through channels the affected users can access. Keep the
alternative available and tested. If a browser is no longer securely
maintainable, explain the security risk and provide a secure migration path
rather than silently breaking the task.

## Reporting a Compatibility Barrier

A browser or assistive technology report should include, when available:

- the task and page;
- expected and actual behavior;
- browser product, channel, and exact version;
- operating system and version;
- assistive technology and exact version;
- device and input method;
- language and relevant settings;
- zoom, contrast, motion, or other preferences;
- reproducible steps;
- workaround or alternative; and
- whether the issue appeared after an update.

Do not require a reporter to disclose a disability. Do not ask them to publish
personal, medical, authentication, or security-sensitive information.

See
[Accessibility Bug Reporting Best Practices](examples/ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES.md).

## Copy-Ready Project Policy Template

Replace every placeholder and remove instructions that do not apply.

```markdown
## Browser and Assistive Technology Support

Our support matrix is based on {{USER_RESEARCH_ANALYTICS_REQUIREMENTS}} and was
last reviewed on {{YYYY-MM-DD}}.

The policy describes our testing and maintenance commitments. It is not a
claim that every combination is defect-free.

### Browser support

| Level | Browser and channel | Version policy | OS or device | Tasks | Last tested | Evidence |
|---|---|---|---|---|---|---|
| Core | {{BROWSER}} | {{POLICY}} | {{OS}} | {{TASKS}} | {{DATE}} | {{URL}} |

### Assistive technology coverage

| Level | AT and version | Browser and version | OS | Tasks | Date | Evidence |
|---|---|---|---|---|---|---|
| Core | {{AT}} | {{BROWSER}} | {{OS}} | {{TASKS}} | {{DATE}} | {{URL}} |

### Known limitations

| Barrier | Combination | User impact | Alternative | Issue | Review date |
|---|---|---|---|---|---|
| {{BARRIER}} | {{COMBINATION}} | {{IMPACT}} | {{ALTERNATIVE}} | {{URL}} | {{DATE}} |

### Reporting

Report compatibility barriers at {{ACCESSIBLE_REPORTING_ROUTE}}. Include
versions and steps when comfortable doing so. Disability disclosure is not
required.
```

## Implementation Checklist

### Policy and evidence

- [ ] The policy, coverage matrix, test results, and known issues are separate.
- [ ] Support levels have project-specific definitions.
- [ ] The matrix is based on user needs, critical tasks, and obligations.
- [ ] Exact browser, operating system, and assistive technology versions are
      captured at test execution.
- [ ] “Not evaluated” is not mislabeled as supported or unsupported.
- [ ] Every support claim links to dated evidence.

### Testing

- [ ] Source, browser automation, manual, assistive technology, and user
      evaluation layers are distinguished.
- [ ] Engine automation is not mislabeled as branded-browser testing.
- [ ] Emulation is not mislabeled as real-device testing.
- [ ] Headless automation is not mislabeled as screen reader testing.
- [ ] Critical tasks and error states are covered.
- [ ] Relevant input methods and user preferences are covered.
- [ ] Reports are accessible and retain useful environment metadata.

### Maintenance

- [ ] Known issues include user impact, combination, workaround, owner, and
      review date.
- [ ] Release and additional regression triggers are documented.
- [ ] Deprecation decisions consider disability-specific use and secure
      alternatives.
- [ ] Changes are announced through accessible channels.
- [ ] The matrix has an owner and scheduled review.

## Definition of Done

A browser and assistive technology support policy is ready when:

1. it identifies the users and tasks the matrix is intended to support;
2. support levels and version rules are unambiguous;
3. browser products, engines, channels, operating systems, devices, and
   assistive technologies are recorded accurately;
4. every tested claim has dated evidence;
5. automation, emulation, manual testing, and user evaluation are described
   honestly;
6. critical tasks, error states, preferences, and input methods have
   proportionate coverage;
7. known gaps and interoperability problems have alternatives, owners, and
   review dates;
8. reporting and deprecation processes are accessible; and
9. the matrix is maintained as browsers, assistive technologies, and user
   needs change.

## References

### Accessibility support and evaluation

- [WCAG 2.2: Understanding Conformance](https://www.w3.org/WAI/WCAG22/Understanding/conformance)
- [Documenting Accessibility Support for Uses of a Web Technology](https://www.w3.org/WAI/WCAG22/Understanding/documenting-accessibility-support)
- [Understanding Techniques for WCAG 2.2](https://www.w3.org/WAI/WCAG22/Understanding/understanding-techniques)
- [WAI: Evaluating Web Accessibility](https://www.w3.org/WAI/test-evaluate/)
- [WAI: Involving Users in Evaluating Web Accessibility](https://www.w3.org/WAI/test-evaluate/involving-users/)
- [ARIA-AT Interoperability Reports](https://aria-at.w3.org/reports)

### Browser automation and compatibility

- [Playwright browser documentation](https://playwright.dev/docs/browsers)
- [MDN Browser Compatibility Data](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Page_structures/Compatibility_tables)
- [MDN Baseline limitations](https://developer.mozilla.org/en-US/docs/Glossary/Baseline/Compatibility)

### Browser release information

- [Chrome releases](https://developer.chrome.com/release-notes)
- [Firefox release calendar](https://wiki.mozilla.org/Release_Management/Calendar)
- [Firefox ESR release cycle](https://support.mozilla.org/en-US/kb/firefox-esr-release-cycle)
- [Microsoft Edge release schedule](https://learn.microsoft.com/en-us/deployedge/microsoft-edge-release-schedule)
- [Safari release notes](https://developer.apple.com/documentation/safari-release-notes)

### Assistive technology documentation

- [JAWS](https://www.freedomscientific.com/products/software/jaws/)
- [NVDA user guide](https://download.nvaccess.org/documentation/userGuide.html)
- [VoiceOver User Guide for Mac](https://support.apple.com/guide/voiceover/welcome/mac)
- [Narrator complete guide](https://support.microsoft.com/en-us/windows/complete-guide-to-narrator-e4397a0d-ef4f-b386-d8ae-c172f109bdb1)
- [TalkBack](https://support.google.com/accessibility/android/answer/6283677)

## Review Information

This guide intentionally contains no hard-coded current browser or assistive
technology versions. Use the vendor sources above and record exact versions in
dated project test results.

Last reviewed: 2026-07-19

---

This document is available under the repository's [MIT License](LICENSE).
