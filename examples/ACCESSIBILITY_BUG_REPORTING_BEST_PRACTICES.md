---
title: Accessibility Bug Reporting Best Practices
---

# Accessibility Bug Reporting Best Practices

This guide explains how to record, triage, fix, and verify accessibility findings. It applies to findings reported by disabled people, observed during testing with disabled people, found through manual accessibility evaluation, detected by automated tools, identified in code review, or received through support channels.

A useful report lets another person understand the barrier, identify the people affected, reproduce it when possible, judge its impact, identify the responsible source, and verify the correction. Not every field applies to every finding. Do not delay a valid report because a selector, tool rule, WCAG mapping, or code-level fix is unavailable.

## 1. Principles

1. **Describe the barrier before the standard.** State what task or interaction fails and under what conditions.
2. **Identify the people affected.** Describe the relevant access needs, interaction methods, disability experience, or assistive technologies when the evidence supports doing so. Do not infer a diagnosis or imply that one person represents an entire disability group.
3. **State the evidence basis.** Distinguish user reports, testing with disabled people, manual evaluation, automated results, and reasoned inference.
4. **Record observed facts.** Separate observations from assumptions, suspected causes, and suggested fixes.
5. **Use complementary testing methods.** Automated testing, manual accessibility evaluation, and testing with disabled people answer different questions. None is a complete substitute for the others.
6. **Collect only relevant context.** Browser, assistive technology, viewport, preferences, and account state matter only when they affect the result.
7. **Protect people and systems.** Remove personal data, credentials, tokens, private content, and unnecessary account information from every attachment and code sample.
8. **Treat tool output as evidence, not a conformance decision.** Automated checks can find many failures, but they cannot establish that a page or product conforms to WCAG.
9. **Separate severity from priority.** Task impact and workaround quality inform severity. Reach, frequency, deadlines, regression status, and business context inform priority.
10. **Fix the source when possible.** A correction in a shared component, template, content model, or design token is usually safer than many page-specific patches.
11. **Close with verification evidence.** A code change, automated pass, or visual check alone may not prove that the user-facing barrier is gone.

## 2. Findings, Issues, Testing, and Conformance

These terms describe different things:

| Term | Meaning |
| --- | --- |
| **Finding** | An observed or suspected accessibility barrier or test result. |
| **Issue** | Tracked work that may contain one or more related findings. |
| **Occurrence** | One place or state in which a finding appears. |
| **Root cause** | The source that produces one or more occurrences, such as a shared component. |
| **Affected people** | The people whose task or experience is confirmed or reasonably expected to be affected. Describe them only as specifically as the evidence allows. |
| **Manual accessibility evaluation** | Human evaluation of an interface using relevant inputs, settings, inspection methods, and assistive technologies. |
| **Testing with disabled people** | Evaluation in which disabled participants use representative tasks and provide evidence from lived experience. This is distinct from an evaluator operating assistive technology. |
| **Conformance conclusion** | A conclusion about a defined scope, standard, level, and evaluation method. |

A failed automated rule does not automatically prove a WCAG failure. A passed automated rule does not prove conformance. Confirm the result and its scope before making a conformance claim.

## 3. Minimum Information for a Useful Report

Different amounts of information are needed at different points in a finding's life. Conflating them is a common cause of both rejecting valid reports and stalling remediation on reports that were never ready for it. See [Accessibility Finding Tracking](./ACCESSIBILITY_FINDING_TRACKING.md#actionability-valid-report-vs-ready-for-remediation) for the full stage model this section implements.

### 3.1 Minimum information for valid intake

A report is a valid finding, worth recording and preserving, once it identifies:

| Field | What to record |
| --- | --- |
| **Title** | Component or location, failure, and task effect. |
| **Location and state** | Safe URL or route, component name, build, and the state in which the problem appears, as precisely as the reporter can safely provide. |
| **Task and impact** | What the person is trying to do and how the barrier affects that task. |
| **Actual result** | What was observed. |
| **Evidence basis** | Whether the report is based on a user report, testing with disabled people, manual evaluation, an automated result, or reasoned inference. |

**Do not reject a report at intake because it lacks the fields below.** A person reporting a barrier is not expected to produce a diagnosis, a locator, a fingerprint, or a WCAG mapping. Preserve the report even when it is incomplete; see [Direct reproduction and equivalent evidence](./ACCESSIBILITY_FINDING_TRACKING.md#direct-reproduction-and-equivalent-evidence).

### 3.2 Additional information needed for evaluation

Before the team can meaningfully evaluate a finding, triage should also have, or actively be collecting:

| Field | What to record |
| --- | --- |
| **People affected** | The people, access needs, interaction methods, or assistive technology users confirmed or likely to be affected. Record more than one group when relevant. |
| **Steps or conditions** | The shortest reliable path to the problem, including required preconditions. |
| **Expected result** | The user-facing behavior that should occur. |
| **Environment** | Only the browser, operating system, assistive technology, input, viewport, zoom, preferences, or locale that affect the result. |

This is triage's responsibility to complete, not a precondition for accepting the report in the first place. See [section 5](#5-record-location-and-state-safely) and [section 10](#10-add-technical-evidence-without-exposing-data) for who is responsible for collecting a precise location and technical evidence.

### 3.3 Information normally needed before remediation

Before a finding enters the active remediation queue, the team normally also needs:

| Field | What to record |
| --- | --- |
| **Confidence and reproduction status** | Reproduced / intermittent / not observed / not tested / needs evidence, per [Accessibility Finding Tracking](./ACCESSIBILITY_FINDING_TRACKING.md#direct-reproduction-and-equivalent-evidence). |
| **Evidence** | A small, redacted excerpt, accessibility-tree output, or accessible attachment sufficient to inspect the result. |
| **Owner** | Who can change the source. |
| **Acceptance criteria** | Verifiable, user-facing behavior that would demonstrate correction. |

A WCAG mapping, severity, priority, frequency, fingerprint, and a proposed fix are useful but are **not** prerequisites for remediation readiness.

### 3.4 Information needed before closure

Before closing, the team needs verification evidence: the original interaction (or an adequately equivalent test) was repeated after the fix, relevant adjacent states and environments were checked, and, where required by the verification plan, testing with disabled people was completed. See [section 22](#22-definition-of-done).

Do not reject a report from a user because it lacks the section 3.2–3.4 fields. A triager collects a locator, standards mapping, diagnostic evidence, or verification plan later — it is triage's job, not a filter on whether the report was worth recording.

## 4. Write a Specific Title

Use a short title that identifies the component, failure, and consequence.

Good examples:

- `Checkout: card error text is not associated with the field`
- `Account menu: keyboard focus moves behind the open dialog`
- `Product cards: price text disappears at 200% text size`

Avoid titles such as `Accessibility issue`, `Screen reader bug`, or `WCAG failure`. They do not identify the affected behavior.

Including a WCAG criterion in the title is optional. The report should remain understandable to someone who does not know the criterion number.

## 5. Record Location and State Safely

### 5.1 Page, route, and build

Record enough information to find the same interface:

```text
Page or route: /checkout/payment
Build or commit: 2026.07.18.2
Component: Payment form
UI state: Form submitted with an invalid card number
Account role: Test customer
```

For a web finding, provide the affected URL whenever it is safe and sufficient. If the exact URL cannot be disclosed, provide a redacted route or another unambiguous way to locate the experience. A report such as "the menu is inaccessible" is not ready for evaluation unless the team can identify which menu and state it concerns; use the most precise safe location available, for example a redacted route, a page or screen name, a component example, a Storybook entry, a repository example, instructions for reaching an authenticated state, or a reference to protected evidence.

Use an exact URL only when its query and fragment values are relevant and safe to share. Remove or replace:

- session identifiers and access tokens;
- email addresses, names, account numbers, and order numbers;
- private search terms or document names;
- authentication callbacks and password-reset values;
- any other secret or personal data.

For example:

```text
Unsafe: https://example.com/orders/847291?token=secret-value
Safe:   https://example.com/orders/[test-order-id]
```

Do not include production credentials. Provide an approved test account through the organization's secure process when one is needed.

This precision requirement is for actionable evaluation, not for accepting the report — do not delay accepting a valid finding because a precise location has not yet been supplied; triage should add or request it before the finding moves to evaluation.

### 5.2 Element and component locators

Start with a human-readable component name and location:

```text
Component: Close button in the cookie settings dialog
Location: Dialog header, immediately after the heading
```

Add a stable technical locator if it helps:

```text
Stable selector: [data-component="cookie-settings"] [data-action="close"]
Frame: iframe[title="Payment"]
Shadow host: payment-widget
```

A tool-native selector, accessibility-tree path, test ID, or short XPath can be useful. A full absolute DOM XPath should not be mandatory. Absolute paths are brittle when wrappers, list positions, or generated markup change.

If the element is inside an iframe or shadow root, record that boundary. If no reliable locator exists, describe the visible label, accessible name, role, nearby heading, and interaction state.

## 6. Preconditions and Steps to Reproduce

List only the steps needed to reach the failure. Include the input method and assistive technology command when they matter.

```text
Preconditions:
- Signed in as a test customer
- Cart contains one item
- NVDA is running with Firefox

Steps:
1. Open the checkout payment step.
2. Leave the card number empty.
3. Move to the Submit order button with Tab.
4. Activate the button with Enter.
5. Listen for feedback without moving focus.
```

For intermittent findings, record:

- how many attempts reproduced the result;
- timing, network, animation, or loading conditions;
- whether the problem occurred after back navigation or a state change;
- the earliest known build in which it appeared.

`Cannot reproduce` is a triage state, not automatic evidence that the report is invalid. Preserve the original conditions and intermittent evidence. When direct reproduction is not possible, record equivalent evidence instead of discarding the report; see [Direct reproduction and equivalent evidence](./ACCESSIBILITY_FINDING_TRACKING.md#direct-reproduction-and-equivalent-evidence) for what counts and what to record about the attempt.

## 7. Separate Expected and Actual Results

Write expected behavior as an outcome, not as a required implementation.

```text
Expected:
After submission, the card number error is associated with the field. When
focus moves to the field, its label, invalid state, and error are available.

Actual:
The visible error appears, but the card number field has no programmatic error
association. When focus moves to the field, NVDA announces only its label.
```

Avoid putting a particular ARIA attribute or JavaScript method in the expected result unless the product contract requires that implementation. Put possible code changes under **Suggested fix**.

## 8. Identify the People Affected and Describe Impact

Every report should connect the barrier to people and a task, not only to a technical defect, tool rule, or standard.

Describe people in terms of relevant access needs, interaction methods, disability experience, or assistive technology when the evidence supports it. Do not guess a diagnosis, require a person to disclose one, or imply that every person in a disability group will have the same experience.

Record the basis and limits of the impact statement:

| Evidence status | Meaning |
| --- | --- |
| **Reported or confirmed by affected people** | A disabled person reported the barrier, or it was observed while disabled participants performed the task. Record the participant and task scope without exposing identity or private information. |
| **Observed through manual evaluation** | An evaluator reproduced the barrier using the relevant interaction method, setting, or assistive technology. This is evidence of the behavior, but it is not the same as testing with disabled people. |
| **Likely** | The affected population and impact are reasonably inferred from the observed behavior but have not been confirmed with affected people. |
| **Unknown or needs review** | The finding comes from automation or technical inspection and its user impact has not yet been established. |

Useful impact statement:

```text
People who use screen readers are likely to be affected, including some blind
and low-vision people. Manual evaluation with NVDA and Firefox found that
submission failure was not announced. A person may continue waiting or review
the form field by field to find the error. The impact has not yet been confirmed
through testing with disabled participants.
```

Less useful statement:

```text
This affects blind people and violates WCAG.
```

When known, record:

- the people, access needs, or interaction methods affected;
- whether the impact was reported, observed, inferred, or remains unknown;
- the task that is blocked or made harder;
- whether the person can perceive, understand, navigate, or operate the control;
- the quality and cost of any workaround;
- whether the result can cause loss of data, time, money, privacy, or safety;
- whether the barrier is repeated in a shared workflow;
- the limits of the evaluation or participant sample.

A report can identify more than one affected population. Avoid assuming a one-to-one relationship between a WCAG criterion or automated rule and a disability group. User impact may be reported even when no WCAG criterion has been identified.

## 9. Record the Relevant Environment

An environment list is useful only when it describes the conditions that produced the result. Do not paste a generic browser and assistive technology matrix into every issue.

Possible fields include:

```text
Test date and time: 2026-07-18 14:30 EDT
Product build: 2026.07.18.2
Browser: Firefox 140
Operating system: Windows 11 24H2
Assistive technology: NVDA 2026.1
Input: Keyboard
Viewport: 1280 by 720 CSS pixels
Zoom or text size: 200% text size
Orientation: Landscape
Color scheme: Dark
Forced colors: Active
prefers-reduced-motion: reduce
prefers-contrast: more
Locale and language: en-CA
Account role: Test customer
```

Use the value actually tested. Do not infer a device type from a viewport-width breakpoint. Viewport dimensions, input capabilities, browser, operating system, and physical device are separate facts.

Relevant CSS preference values include:

- `prefers-color-scheme`: `light` or `dark`;
- `prefers-reduced-motion`: `reduce` or `no-preference`;
- `prefers-contrast`: `more`, `less`, `custom`, or `no-preference`;
- `forced-colors`: `active` or `none`.

See [Light/Dark Mode Accessibility Best Practices](./LIGHT_DARK_MODE_ACCESSIBILITY_BEST_PRACTICES.md) and [User Personalization Accessibility Best Practices](./USER_PERSONALIZATION_ACCESSIBILITY_BEST_PRACTICES.md) for related implementation guidance.

## 10. Add Technical Evidence Without Exposing Data

Technical evidence is optional when the observed behavior is already clear. When it helps, include the smallest relevant excerpt.

Automated and technical findings normally need a focused HTML, DOM, accessibility-tree, or component excerpt before code-level remediation, so the team can inspect the actual result rather than a description of it. Reporters are not universally responsible for collecting this. A disabled person or other reporter may not know how to capture an HTML snippet, a DOM dump, or accessibility-tree output, and requiring one before accepting a report excludes exactly the people best placed to notice a barrier. Triage is responsible for collecting missing technical evidence when it is relevant, available, and needed for remediation — not for rejecting the report until the reporter supplies it.

For Playwright MCP setup, scoped snapshots, Chrome CDP Accessibility methods
and events, evidence provenance, and the boundary between session identifiers
and durable tracking identity, use
[Technical Evidence for Reproducible Accessibility Findings](./ACCESSIBILITY_FINDING_EVIDENCE.md).

Do not assume page-source HTML represents the live DOM or accessibility tree: client-side rendering, hydration, and dynamic attribute changes can all mean the two diverge. When the finding depends on runtime state, capture live-DOM or accessibility-tree output rather than the original page source, and note the iframe or shadow-root boundary if one is involved.

### 10.1 HTML or accessibility-tree excerpt

```html
<label for="card-number">Card number</label>
<input id="card-number" name="card-number">
<p id="card-number-error">Enter a card number.</p>
```

Explain what the excerpt demonstrates. In this example, the visible error is not programmatically associated with the field. Do not assume a code excerpt shows the entire computed accessibility tree or runtime state.

Before sharing HTML, DOM snapshots, logs, or accessibility-tree output, remove:

- tokens, cookies, and hidden credentials;
- names, addresses, messages, and account data;
- values from private form fields;
- internal URLs or identifiers that are not required to reproduce the issue.

### 10.2 Screenshots, recordings, and logs

Attachments must also be accessible and safe:

- describe the relevant content of each screenshot in the issue;
- use arrows or numbered markers plus text, not color alone;
- provide captions or a transcript for video and audio evidence;
- crop or redact faces, names, notifications, account details, and private content;
- limit access to sensitive evidence according to organizational policy;
- preserve diagnostic logs only as long as they are needed.

A recording can show timing and state changes, but it should not replace written steps, expected behavior, and actual behavior.

## 11. Standards, Rules, and Test Results

### 11.1 WCAG mapping

When the mapping is known, record the exact WCAG version, success criterion, and level:

```text
Standard: WCAG 2.2
Success Criterion: 1.3.1 Info and Relationships
Level: A
Relationship: Confirmed failure
```

Use `suspected` or `needs review` when the mapping is uncertain. A finding may relate to more than one requirement, but do not add criteria merely because a tool lists them as tags.

Use the [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/) to check the normative wording, intent, techniques, and failures. Do not rely on a shortened local table as a substitute for the standard.

### 11.2 Tool and rule information

For automated or semi-automated results, preserve:

```text
Tool and version: [name and version]
Rule ID and version: [identifier and version]
Configuration: [ruleset, tags, exclusions, and relevant options]
Test method: Automated / Semi-automated / Manual / User-reported / Testing with disabled people
Raw outcome: [tool's original outcome]
Human review: Confirmed / Rejected / Needs review
```

Keep a tool's impact or confidence value separate from the project's severity. Tool metadata is a heuristic and may not reflect the task, context, workaround, affected people, or root cause.

### 11.3 ACT outcomes

If a result uses the [ACT Rules Format 1.1](https://www.w3.org/TR/act-rules-format/), preserve one of its defined outcomes:

- `inapplicable`;
- `passed`;
- `failed`;
- `cantTell`;
- `untested`.

Send `cantTell` results for review. A `passed` or `inapplicable` rule result may still require other tests before drawing a conclusion about a WCAG requirement.

### 11.4 Obligation and handling

A WCAG mapping (11.1) states what standard applies. It does not by itself say whether the project is required to fix it, or whether it currently shows up in reporting and enforcement. Record those separately as `obligation` and `handling` — see [Accessibility Finding Tracking, "Policy Classification"](./ACCESSIBILITY_FINDING_TRACKING.md#policy-classification) for the full definitions. In brief:

- `obligation` is `required`, `aspirational`, `advisory`, `unmapped`, or `not-applicable`, assigned per standards mapping. **A confirmed AAA finding under an AA project target is `aspirational`, not `advisory` — it is a real, visible stretch goal, not an arbitrary suggestion.** A project may elevate a specific AAA criterion to `required`, with the reason recorded.
- `handling` is `report`, `review`, or `suppress`. An unconfirmed automated result normally goes to `review`, not `suppress`. Moving a finding to `suppress` requires a narrow scope, a reason, evidence, an owner, and a review or expiry date; suppression is never resolution, and a suppressed finding stays recorded.

Do not infer obligation from severity, and do not infer handling from lifecycle status. A `blocker`-severity finding can still be `unmapped` if no standard has been cited yet; a `resolved` finding is not automatically `suppress`ed, and a `suppress`ed finding is not automatically resolved.

## 12. Plan Complementary Testing and Verification

Automated testing, manual accessibility evaluation, and testing with disabled people provide different evidence. A verification plan should state which methods are required, why they are appropriate, and what their limits are.

### 12.1 Automated testing

Automated testing can identify some machine-testable patterns and provide repeatable regression coverage. It cannot determine all user impact, usability, or conformance.

For automated findings:

- preserve the raw result and configuration;
- require human review before treating the result as a confirmed user-facing barrier;
- add or update automated regression coverage when practical;
- do not treat an automated pass as sufficient closure evidence;
- do not place every raw automated result directly into the active remediation queue — apply the [automated-finding actionability gate](./ACCESSIBILITY_FINDING_TRACKING.md#the-automated-finding-actionability-gate) first, and route what does not clear it to bounded investigation or observation history instead;
- classify a result that could not run to completion (timeout, authentication failure, disabled rule, incomplete crawl) as `not_tested`, not as an absent finding; classify a genuinely absent result after a [comparable run](./ACCESSIBILITY_FINDING_TRACKING.md#comparable-runs) as `not_observed`, never silently as `resolved`.

### 12.2 Manual accessibility evaluation

Manual evaluation is required when the result depends on human judgment or interaction. A user-facing correction identified by automation should be manually retested in the original interaction before closure.

Depending on the finding, manual evaluation may include:

- keyboard operation, focus order, focus visibility, and focus management;
- pointer, touch, switch, and speech input;
- screen reader output and accessibility-tree inspection;
- zoom, reflow, text spacing, orientation, and responsive states;
- forced colors, contrast preferences, color schemes, and reduced motion;
- labels, instructions, errors, status messages, and dynamic updates;
- relevant loading, empty, expanded, collapsed, selected, disabled, and error states.

Test the supported environments relevant to the finding. Do not require every browser and assistive technology combination for every issue when a smaller, risk-based set is sufficient. Record what was tested and what was not.

### 12.3 Testing with disabled people

Testing with disabled people examines real tasks and lived interaction. It can identify barriers, confusing workflows, and ineffective workarounds that standards-based evaluation or an evaluator using assistive technology may miss.

Plan testing with disabled people when:

- the affected task is critical, such as authentication, payment, health, education, employment, safety, or access to public services;
- the barrier or proposed correction has major or uncertain impact;
- the interface uses a complex, novel, or highly interactive component;
- the quality or practicality of a workaround is unclear;
- reports from disabled people conflict with technical test results;
- the team intends to make broader claims about usability or accessibility;
- repeated reports suggest that technical evaluation is missing part of the experience.

Do not use disabled participants to rediscover obvious, known failures that should be fixed first. Recruit participants whose access needs and experience are relevant to the task. Make research materials, consent, communication, scheduling, and compensation accessible. Protect participant identity and private information.

Record the participant scope, relevant characteristics, tasks, methods, results, and limitations. One participant can confirm that person's experience, but should not be treated as representative of every person with the same disability.

Testing with disabled people does not replace evaluation against accessibility standards. Standards-based and manual evaluation do not replace learning directly from disabled people.

### 12.4 Verification plan

A report or linked test plan should record:

```text
Automated checks: Required / Not required / Planned / Completed
Manual checks: Required / Not required / Planned / Completed
Relevant supported environments: [list]
Testing with disabled people: Required / Not required / Not yet determined / Planned / Completed
Rationale: [risk, task, uncertainty, or scope]
Evaluation scope and limitations: [what was and was not covered]
```

## 13. Separate Severity, Priority, Reach, Frequency, and Confidence

These fields answer different questions:

| Field | Question |
| --- | --- |
| **Severity** | How serious is the task-level consequence in this occurrence? |
| **Priority** | When should the responsible team address it? |
| **Reach** | How many people, pages, components, or workflows may be affected? |
| **Frequency** | How often does the condition or occurrence appear? |
| **Confidence** | How certain is the team that the finding, affected people, impact, and cause are understood? |

Frequency and reach can increase priority, but they do not change what happened in one occurrence. Do not automatically turn a low-severity issue into a higher-severity issue because it appears on many pages.

Projects should define and calibrate their own scales with disabled people and product teams. One possible task-impact scale is:

| Severity | Definition |
| --- | --- |
| **Blocker** | A core task cannot be completed, or there is a serious safety, privacy, or data-loss risk, with no reasonable workaround. |
| **Major** | A task fails, is unreliable, or requires a substantial workaround. |
| **Moderate** | The task remains possible but requires significant extra effort or assistance. |
| **Minor** | The finding causes localized friction without material task loss. |
| **Needs review** | The result or impact has not been confirmed. |

This is an example, not a universal standard. Document local definitions and examples. Do not choose the highest value reported by several tools and call it user impact.

Priority may also consider:

- use in a critical or frequently used workflow;
- the number of affected occurrences or products;
- whether a shared source can correct many occurrences;
- legal, contractual, release, or procurement deadlines;
- whether the issue is a regression;
- risk of further content or component reuse;
- fix complexity and dependencies.

## 14. Record Scope, Frequency, and Root Cause

Describe what was actually checked:

```text
Observed occurrences: 7
Pages checked: 12
Pages affected: 5
States checked: Default, error, disabled
Likely source: Shared address form component
Unchecked scope: Mobile app and authenticated administrator flow
```

Do not extrapolate from a sample without saying that it is an estimate. A sitewide template defect and seven unrelated content errors may have the same count but require different work.

Group findings conservatively. Combine occurrences when they share the same remediation unit or confirmed root cause. Do not merge findings only because they have the same rule ID or a similar selector. Preserve representative URLs, states, affected populations, and exceptions within a grouped issue.

## 15. Suggested Fixes and Acceptance Criteria

A suggested fix is helpful but optional. Label it as a proposal and explain why it is expected to address the barrier. The responsible team may know a safer source-level correction.

```text
Suggested fix:
Associate the error message with the field and expose the invalid state after
validation. Move focus or provide a status message according to the form's
established error-handling pattern.
```

Acceptance criteria should describe verifiable behavior:

```text
- Submitting the empty field identifies the card number error in text.
- The field exposes the error association and invalid state programmatically.
- The error is discoverable without reviewing every field.
- Keyboard focus remains predictable.
- The behavior works in the supported browser and assistive technology combinations.
- Existing visible labels, instructions, and error summaries still work.
- The original interaction is manually retested.
- Testing with disabled people is completed when required by the verification plan.
```

Avoid acceptance criteria that specify only an attribute, selector, screenshot, or automated rule result. Those checks may support verification, but the user-facing outcome is the target.

## 16. Markdown Issue Template

Adapt this template to the organization. Fields marked as optional should remain optional.

```markdown
## Accessibility finding

### Summary

[Component or location: failure and task effect]

### Location and state

- Page or route:
- Build or commit:
- Component:
- Preconditions and UI state:
- Safe locator (optional):

### Steps or conditions

1.
2.
3.

### Expected result

[Describe the user-facing outcome.]

### Actual result

[Describe what was observed.]

### People affected and impact

- People confirmed or likely to be affected:
- Relevant access needs, interaction methods, or assistive technologies:
- Affected task:
- Consequence:
- Workaround and its cost, if any:
- Evidence basis: User report / Testing with disabled people / Manual evaluation / Automated result / Reasoned inference
- Confidence: Confirmed for reported scope / Observed / Likely / Unknown
- Scope limits or uncertainty:

### Relevant environment

- Test date:
- Browser and operating system:
- Assistive technology and version:
- Input method:
- Viewport, zoom, text size, and orientation:
- Active preferences or display modes:
- Locale, account role, or other relevant state:

### Evidence

[Add a small redacted excerpt, attachment description, or link to protected evidence.]

### Actionability and reproduction

- Precise safe URL, route, component, or equivalent location:
- Reproduction status: Reproduced / Intermittent / Not observed / Not tested / Needs evidence
- Reproduction attempts and results:
- Relevant HTML, DOM, accessibility-tree, or component excerpt:
- Evidence supporting evaluation when exact reproduction is unavailable:
- Next investigative action:
- Owner:
- Review or expiry date:

This section is optional at intake and is triage's responsibility to complete, not the original reporter's — see [Minimum Information for a Useful Report](#3-minimum-information-for-a-useful-report) and [Accessibility Finding Tracking](./ACCESSIBILITY_FINDING_TRACKING.md#actionability-valid-report-vs-ready-for-remediation).

### Standards and tests (optional)

- WCAG version, success criterion, and level:
- Relationship: Confirmed / Suspected / Needs review
- Tool, rule, version, and configuration:
- Test method and raw outcome:
- Human review: Confirmed / Rejected / Needs review

### Verification plan

- Automated checks: Required / Not required / Planned / Completed
- Manual checks: Required / Not required / Planned / Completed
- Relevant supported environments:
- Testing with disabled people: Required / Not required / Not yet determined / Planned / Completed
- Rationale:
- Evaluation scope and limitations:

### Scope and source

- Occurrences and sample checked:
- Suspected or confirmed root cause:
- Related issue or regression:

### Tracking and correlation (optional)

- Tracker IDs:
- Scan request ID:
- Scan run ID:
- Occurrence fingerprint profile and value:
- Pattern fingerprint profile and value:
- Display IDs:
- Legacy identifiers:
- Migration status:

Reporters are not expected to calculate these values manually. Leave this section blank if unknown; see [Accessibility Finding Tracking](./ACCESSIBILITY_FINDING_TRACKING.md) and [examples/schemas/](./schemas/README.md) for how these are computed and assigned.

### Suggested fix (optional)

[Describe a possible approach without replacing acceptance criteria.]

### Acceptance criteria

- [ ] The reported user-facing barrier is no longer present.
- [ ] The original environment and interaction have been manually retested.
- [ ] An automated pass was not treated as sufficient evidence on its own.
- [ ] Relevant adjacent inputs, states, preferences, and supported environments have been checked.
- [ ] Relevant keyboard, pointer, touch, speech, and assistive technology interactions have been checked.
- [ ] Testing with disabled people was completed when required by the verification plan.
- [ ] The impact statement does not go beyond the available evidence.
- [ ] Appropriate regression coverage has been added or updated.

### Privacy and attachment check

- [ ] Secrets, personal data, and private content have been removed.
- [ ] Participant information is included only with informed permission and a valid need.
- [ ] Screenshots are described and recordings have captions or transcripts.
```

## 17. Example Report

### Checkout: card error text is not associated with the field

**Location and state**

```text
Route: /checkout/payment
Build: 2026.07.18.2
Component: Payment form
State: Test customer submits an empty card number field
```

**Steps**

1. Start NVDA with Firefox.
2. Open the payment step as a test customer with one item in the cart.
3. Leave the card number empty.
4. Move to **Submit order** with Tab and press Enter.
5. Move focus back to the card number field with Shift+Tab.

**Expected**

The card number error is associated with the field. When focus returns to the field, its label, invalid state, and error are available programmatically.

**Actual**

The visible error appears, but the field has no programmatic error association. When focus returns to the field, NVDA announces only `Card number, edit`.

**People affected and impact**

People who use screen readers are likely to be affected, including some blind and low-vision people. They may not know which visible error belongs to the field. The available workaround is to navigate through surrounding content after each failed attempt.

The behavior was observed during manual evaluation with NVDA and Firefox. It has not yet been confirmed through testing with disabled participants, so the impact statement is limited to a reasoned assessment of this interaction.

**Relevant environment**

```text
Firefox 140, Windows 11 24H2, NVDA 2026.1, keyboard input
1280 by 720 CSS pixel viewport, 100% zoom, English (Canada)
```

**Standards and tests**

```text
WCAG 2.2, 1.3.1 Info and Relationships, Level A
Relationship: Confirmed failure
Method: Manual test with assistive technology
```

**Verification plan**

```text
Automated checks: Add regression coverage for the programmatic error association
Manual checks: Retest error identification, focus behavior, and screen reader output
Supported environments: Relevant supported browser and screen reader combinations
Testing with disabled people: Planned
Rationale: Checkout is a critical payment task and the practical error-recovery experience matters
Scope limit: Initial observation covers NVDA with Firefox only
```

**Acceptance criteria**

- The error remains identified in text.
- The field exposes the error association and invalid state programmatically.
- Moving focus to the field makes its label, invalid state, and error available.
- The error is discoverable without reviewing every field.
- Keyboard focus remains predictable.
- The correction is manually retested with the supported form error pattern.
- The corrected checkout error flow is evaluated with disabled participants who regularly use screen readers before the correction is treated as verified for that participant scope.
- Automated regression coverage is added or updated where practical.

## 18. Machine-Readable Finding Example

The JSON format described here is optional. It exists to support imports, reporting, and regression analysis, and it must not require fields that do not exist for manual or user-reported findings.

The canonical, versioned, schema-validated format is `schema_version: "2.0"` or `"2.1"`, defined in [examples/schemas/](./schemas/README.md). It replaces the illustrative `schema_version: "1.1"` shape previously shown in this section. `"2.1"` adds an optional `policy` object for obligation, handling, and evidence-status classification (see [11.4](#114-obligation-and-handling) and [Accessibility Finding Tracking, "Policy Classification"](./ACCESSIBILITY_FINDING_TRACKING.md#policy-classification)); it is omitted from the excerpt below because this finding has not yet been classified. A concise excerpt of the same checkout example, using the current schema, looks like this:

```json
{
  "schema_version": "2.0",
  "title": "Checkout: card error text is not associated with the field",
  "reported_at": "2026-07-18T14:30:00-04:00",
  "source": {
    "method": "manual-evaluation"
  },
  "tracking": {
    "fingerprints": {
      "a11y/occurrence/v1": {
        "algorithm": "sha-256",
        "value": "4a201c8916e0a3f58b423910e388ef607584a4c88911af24f4b77a0c84bb6a02"
      }
    },
    "lifecycle": {
      "status": "new",
      "status_basis": "No matching occurrence fingerprint was found in comparable retained history."
    }
  },
  "location": {
    "safe_url": "https://example.com/checkout/payment",
    "component": "Payment form"
  },
  "description": {
    "summary": "The visible card error is not programmatically associated with the field.",
    "expected": "The field exposes its label, invalid state, and associated error programmatically.",
    "actual": "A visible error appears, but the field has no error association and NVDA announces only its label."
  },
  "affected_people": [
    {
      "description": "People who use screen readers",
      "status": "likely",
      "evidence_basis": "manual-evaluation",
      "scope_limit": "Observed with NVDA and Firefox; not yet evaluated with disabled participants."
    }
  ]
}
```

See [examples/schemas/accessibility-finding-v2.example.json](./schemas/accessibility-finding-v2.example.json) for the complete record this excerpt is drawn from, including environment, standards mapping, test results, scope, verification, and acceptance criteria.

Key points:

- Manual and user-reported findings do not require any automation fields. [examples/schemas/accessibility-finding-v2-minimal.example.json](./schemas/accessibility-finding-v2-minimal.example.json) and [accessibility-finding-v2-manual.example.json](./schemas/accessibility-finding-v2-manual.example.json) are valid, schema-conformant findings with no fingerprint, no tracker ID, no WCAG mapping, and no technical locator.
- Fingerprints are optional and, when present, are computed under the frozen profiles in [examples/fingerprints/](./fingerprints/README.md). This guide does not define how a fingerprint is generated.
- A tracker ID may be assigned later, after triage; it must never be computed from finding content. See [Accessibility Finding Tracking](./ACCESSIBILITY_FINDING_TRACKING.md).
- The full schema, its `$defs`, and validated examples are maintained in [examples/schemas/](./schemas/README.md), not duplicated here.

Preserve the tool's raw output separately by reference when exact round-trip fidelity matters; `source.raw_result_reference` and `evidence.references` exist for this.

## 19. Automation and AI Guardrails

Automation can collect and organize evidence. It should not invent certainty, affected populations, or lived experience.

An automated or AI-assisted reporting workflow should:

1. preserve the raw result, tool version, rule version, configuration, time, and tested URL or route;
2. label the method as automated, semi-automated, manual, user-reported, or testing with disabled people;
3. retain the tool's original outcome and put `cantTell` or uncertain results into a review queue;
4. remove credentials and personal data before sending evidence to another system;
5. avoid generating a WCAG mapping, affected population, impact statement, severity, or root cause when the evidence does not support it;
6. distinguish confirmed participant evidence, manual observation, and reasoned inference;
7. require human validation according to the project's risk and triage rules before creating high-impact work or conformance claims;
8. group occurrences only when the remediation unit or root cause is sufficiently established;
9. update an existing issue with new occurrences instead of silently discarding them as duplicates;
10. preserve disagreements between a tool result, evaluator review, and participant feedback;
11. require manual user-facing retesting before closure when automation cannot verify the outcome;
12. record whether testing with disabled people is required, planned, completed, or not required, including the rationale;
13. never claim that testing with disabled people occurred unless it actually did;
14. route each automated result to the active remediation queue, the investigation queue, or observation history rather than creating one active issue per raw result — see [Accessibility Finding Tracking](./ACCESSIBILITY_FINDING_TRACKING.md#three-destinations) for what belongs in each;
15. never automatically reject a credible user-reported or potentially high-consequence barrier solely because an internal rerun did not reproduce it — place it in bounded investigation instead;
16. record an unreviewed automated result as `evidence_status: automated-indicator` with `handling: review`, never as `confirmed-standards-failure` or `handling: suppress`, until a human confirms it — see [Accessibility Finding Tracking, "Policy Classification"](./ACCESSIBILITY_FINDING_TRACKING.md#policy-classification).

Do not close an issue only because the original automated rule passes. The implementation may have changed the selector, hidden the tested node, or introduced a different barrier.

## 20. Deduplication and Identifiers

Use the issue tracker's ID as the durable identity for tracked work, not a scan request ID or a computed fingerprint. A **tracker ID** is assigned by a work-tracking system; a **scan request ID** identifies why a scan ran, and it is not automatically a defect tracker for every finding the scan produces.

A fingerprint can help correlate repeated results, but it is not a permanent bug ID:

- an **occurrence fingerprint** correlates a result at one normalized location;
- a **pattern fingerprint** correlates candidate patterns within a defined scope, such as a repository or product;
- a **display ID** is a short, human-readable alias derived from a fingerprint; it is convenient in reports and conversations, but it is not the authoritative key and may collide.

Matching fingerprints support grouping and investigation. They do not by themselves prove a shared root cause, and absence from a later scan does not by itself prove resolution.

If fingerprints are used:

- version the fingerprint algorithm and profile;
- include the tool and rule version where relevant;
- normalize URLs and selectors carefully;
- expect fingerprints to change when markup or routing changes;
- retain collision checks and the original evidence;
- do not infer `mobile` or `desktop` from a width threshold;
- do not merge results solely because their hashes match;
- retain legacy identifiers when a fingerprint algorithm changes rather than discarding them.

Do not use a fingerprint match, or a raw automated result on its own, to place a finding directly into the active remediation queue. Apply the [automated-finding actionability gate](./ACCESSIBILITY_FINDING_TRACKING.md#the-automated-finding-actionability-gate) first.

For the full conceptual model, including scan run IDs, root causes, heuristic clusters, legacy identifiers, and migration between fingerprint versions, see [Accessibility Finding Tracking](./ACCESSIBILITY_FINDING_TRACKING.md).

## 21. Finding Lifecycle

Use a lifecycle that keeps people, evidence, ownership, and verification connected:

1. **Capture:** Record the barrier, location, state, people affected, impact, evidence basis, and safe evidence.
2. **Triage:** Confirm the result when possible, identify missing context, and separate severity from priority.
3. **Isolate:** Find the source component, template, content model, token, or process that produces the occurrences.
4. **Assign:** Give the issue an owner who can change the source, not only the individual page.
5. **Define:** Agree on user-facing acceptance criteria, supported test environments, and a verification plan.
6. **Correct:** Fix the source and update relevant documentation, examples, or content guidance.
7. **Prevent:** Add proportionate automated, unit, integration, or manual regression coverage.
8. **Retest:** Repeat the original interaction and check relevant adjacent inputs, states, preferences, and supported environments.
9. **Evaluate with disabled people:** Complete planned participant testing where the task, risk, or uncertainty requires it.
10. **Close:** Record what changed, verification evidence, participant scope where applicable, remaining limitations, and follow-up work.

If a fix is partial, record the remaining occurrences or environments rather than closing the broader issue as complete.

## 22. Definition of Done

Before closing an accessibility issue, verify that:

- [ ] the original user-facing barrier is no longer present;
- [ ] the people affected and impact are described no more broadly than the evidence supports;
- [ ] the original steps and relevant environment were manually retested;
- [ ] expected and actual behavior now agree;
- [ ] the source-level fix covers the intended occurrences;
- [ ] relevant keyboard, pointer, touch, switch, speech, and assistive technology interactions were checked;
- [ ] relevant states such as error, loading, expanded, disabled, and responsive layouts were checked;
- [ ] active color, contrast, motion, text-size, zoom, and forced-colors preferences were checked when relevant;
- [ ] the fix did not remove information or functionality from another presentation;
- [ ] regression coverage was added or updated where practical;
- [ ] automated results were supplemented by manual testing where automation cannot verify the outcome;
- [ ] testing with disabled people was completed when required by the verification plan;
- [ ] participant scope and limitations were recorded without unnecessary personal information;
- [ ] verification evidence is accessible, redacted, and linked to the tracked issue;
- [ ] remaining limitations and follow-up issues are documented.

## 23. Reporting Barriers to an External Organization

Look first for the organization's accessibility statement, accessibility contact, support channel, or feedback form. Write for the person receiving the report, who may not be an accessibility specialist.

Lead with:

- the page or feature;
- the barrier you observed;
- the people or interaction methods affected, when known and safe to share;
- the task it prevents or complicates;
- concise steps and relevant environment details;
- a request for acknowledgement or follow-up.

WCAG references and suggested fixes are optional. A reporter should not be required to disclose a diagnosis or other private information. Do not include passwords, personal information, private account content, or sensitive documents. There is no universal response deadline or escalation path. Appropriate follow-up depends on the organization, contract, service, and jurisdiction. This guide is not legal advice, and a reporter is not obligated to provide unpaid testing or remediation work.

### External report template

```text
Subject: Accessibility barrier in [page or feature]

Hello,

I encountered an accessibility barrier in [page or feature].

Location: [safe URL, route, or feature name]
Task: [what you were trying to do]
Barrier: [what happened]
People or interaction methods affected, if known: [description]
Impact: [how this affected the task]
Evidence basis: [personal experience, observation, manual evaluation, or other basis]

Steps or conditions:
1. [Step]
2. [Step]

Expected: [user-facing outcome]
Actual: [observed result]

Relevant environment: [only details that affect the result]
WCAG reference, if known: [version, criterion, and level]

Please acknowledge this report and let me know how I can follow its status.

Thank you.
```

For more guidance, see [Contacting Organizations about Inaccessible Websites](https://www.w3.org/WAI/teach-advocate/contact-inaccessible-websites/).

## 24. Common Reporting Failures

Avoid these patterns:

- requiring a full DOM XPath, HTML excerpt, tool rule, or WCAG criterion before accepting a report;
- copying an exact URL that contains a token or personal data;
- reporting only `fails WCAG` without describing the user-facing behavior;
- inferring a disability group or population-wide impact from a WCAG criterion or tool rule;
- treating a tool result as a confirmed defect or a conformance conclusion;
- treating an evaluator's use of assistive technology as equivalent to testing with disabled people;
- assigning severity from a tool's impact field or automatically increasing it by occurrence count;
- claiming that a viewport width proves the physical device type;
- listing every assistive technology version instead of the environment actually tested;
- merging unrelated occurrences because the rule ID or selector looks similar;
- prescribing a code change without behavior-based acceptance criteria;
- attaching an unexplained screenshot or an uncaptioned recording;
- skipping manual testing because an automated check passes;
- closing after a code merge or automated pass without repeating the original interaction;
- using disabled participants to rediscover known basic failures that should have been corrected first;
- generalizing one participant's experience to an entire disability group;
- disclosing a reporter's or participant's diagnosis, identity, or private content without informed permission;
- promising legal outcomes or universal response timelines.

## 25. Evaluation and Interchange Notes

The [WCAG-EM overview](https://www.w3.org/WAI/test-evaluate/conformance/wcag-em/) describes a method for defining an evaluation scope, exploring a website, selecting a representative sample, evaluating it, and reporting findings. Use a current, appropriate evaluation method when the work is intended to support a conformance conclusion. A collection of issue reports is not, by itself, a complete conformance evaluation.

The [Evaluation Report Template](https://www.w3.org/WAI/test-evaluate/report-template/) provides adaptable reporting fields. The information needed varies with the evaluation context.

[Involving Users in Evaluating Web Accessibility](https://www.w3.org/WAI/test-evaluate/involving-users/) and [Using Combined Expertise to Evaluate Web Accessibility](https://www.w3.org/WAI/test-evaluate/combined-expertise/) explain how evaluation with disabled people complements standards-based and technical evaluation. Participant findings should be reported with their scope and limitations, and should not be generalized beyond the evidence.

[Evaluation and Report Language, EARL](https://www.w3.org/WAI/standards-guidelines/earl/) can be useful for exchanging test results between tools. EARL 1.0 is published as a non-normative W3C Working Group Note, not a W3C Recommendation. It should not be a required format for routine issue reports. ACT Rules Format 1.1 includes non-normative JSON-LD and EARL examples for ACT result exchange.

## 26. Related Guides

- [Technical Evidence for Reproducible Accessibility Findings](./ACCESSIBILITY_FINDING_EVIDENCE.md)
- [Accessibility Finding Tracking](./ACCESSIBILITY_FINDING_TRACKING.md)
- [Accessibility Finding Schema](./schemas/README.md) - versioned JSON Schema and validated examples for the machine-readable finding format
- [Manual Accessibility Testing Guide](./MANUAL_ACCESSIBILITY_TESTING_GUIDE.md)
- [AXE Rules Coverage](./AXE_RULES_COVERAGE.md)
- [Keyboard Accessibility Best Practices](./KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md)
- [Forms Accessibility Best Practices](./FORMS_ACCESSIBILITY_BEST_PRACTICES.md)
- [User Personalization Accessibility Best Practices](./USER_PERSONALIZATION_ACCESSIBILITY_BEST_PRACTICES.md)

## References

- [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/)
- [How to Meet WCAG 2.2: Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)
- [ACT Rules Format 1.1](https://www.w3.org/TR/act-rules-format/)
- [Website Accessibility Conformance Evaluation Methodology](https://www.w3.org/WAI/test-evaluate/conformance/wcag-em/)
- [Template for Accessibility Evaluation Reports](https://www.w3.org/WAI/test-evaluate/report-template/)
- [Involving Users in Evaluating Web Accessibility](https://www.w3.org/WAI/test-evaluate/involving-users/)
- [Using Combined Expertise to Evaluate Web Accessibility](https://www.w3.org/WAI/test-evaluate/combined-expertise/)
- [Contacting Organizations about Inaccessible Websites](https://www.w3.org/WAI/teach-advocate/contact-inaccessible-websites/)
- [Evaluation and Report Language](https://www.w3.org/WAI/standards-guidelines/earl/)
- [EARL 1.0 Schema](https://www.w3.org/TR/EARL10-Schema/)

## Machine-Readable Standards Metadata

```yaml
standards:
  wcag:
    version: "2.2"
    uri: "https://www.w3.org/TR/WCAG22/"
  act_rules_format:
    version: "1.1"
    status: "W3C Recommendation"
    uri: "https://www.w3.org/TR/act-rules-format/"
  earl:
    version: "1.0"
    status: "W3C Working Group Note"
    normative: false
    uri: "https://www.w3.org/TR/EARL10-Schema/"
reporting_scope:
  conformance_claim: false
  supports_user_reported_findings: true
  supports_testing_with_disabled_people: true
  supports_manual_findings: true
  supports_automated_findings: true
  requires_manual_review_of_automated_findings: true
```
