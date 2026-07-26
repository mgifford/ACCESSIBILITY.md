---
title: Behavioral Accessibility Automation
---

# Behavioral Accessibility Automation

This is the canonical guide for **behavioral accessibility automation** in
`ACCESSIBILITY.md`: tests that manipulate a rendered page — resizing the
viewport, pressing real keys, capturing and comparing screenshots — rather
than only inspecting static markup or a single computed accessibility tree.
It complements, and does not replace,
[Manual Accessibility Testing](./MANUAL_ACCESSIBILITY_TESTING_GUIDE.md),
[Shift-Left Accessibility Automation](./SHIFT_LEFT_ACCESSIBILITY_AUTOMATION.md),
and [CI/CD Accessibility Best Practices](./CI_CD_ACCESSIBILITY_BEST_PRACTICES.md).

Runnable code for this guide lives in
[`examples/playwright/`](./playwright/README.md): a Reflow risk module, a
Focus Visible risk module, 35 deterministic fixtures, and a test suite that
exercises both modules against real browser behavior.

This guide is canonical for behavioral accessibility automation in
`ACCESSIBILITY.md`. The companion
[accessibility-skills](https://github.com/mgifford/accessibility-skills)
repository does not yet have a dedicated skill for this topic; a new skill
(tentatively `behavioral-a11y`, or an addition to the existing `ci-cd`
skill) should be created there and kept synchronized with this guide.
That synchronization is outside this repository's scope and has not been
done as part of this change.

## 1. Why behavioral checks exist

Static analysis (HTML/CSS linting, ARIA attribute presence, source-level
rule scans) and single-snapshot browser rule scans (axe-core and similar)
answer questions like "is this attribute valid" and "does this element have
an accessible name." They cannot answer questions that only exist while the
page is being *used*:

- Does the layout still work when the viewport is narrow?
- Does a keyboard user get a visible signal about where focus is?
- Does content clip or overlap when text is resized or spaced out?
- Does content that appears on hover or focus behave as SC 1.4.13 requires?
- Does a dynamic UI state (open menu, validation error, loading indicator)
  preserve the same accessibility guarantees as the page's initial state?

A behavioral check answers these by actually doing the thing a user would
do — resizing, tabbing, hovering, waiting — and observing what happens.
That makes behavioral checks more expensive to run and more prone to
environmental flakiness (animation, fonts, timing) than static checks, and
it does **not** make them a conformance test. See Section 3.

## 2. Topics covered here

### 2.1 Reflow risk (WCAG 2.2 SC 1.4.10)

A page-level indicator: resize to a narrow viewport (320 CSS pixels wide is
the SC 1.4.10 reference width), attempt a horizontal scroll, and measure
whether the document is wider than its viewport. See
[`examples/playwright/reflow-risk.mjs`](./playwright/reflow-risk.mjs) and
Section 4.

### 2.2 Focus Visible (WCAG 2.2 SC 2.4.7)

A per-component indicator: send real Tab key presses, resolve the actual
focused element (including through open shadow roots), and compare
screenshots of the region around that element before and after focus moves.
See [`examples/playwright/focus-visible-risk.mjs`](./playwright/focus-visible-risk.mjs)
and Section 5.

### 2.3 Focus obscuration (WCAG 2.2 SC 2.4.11 Focus Not Obscured)

A focus indicator can exist and still be useless if sticky headers, cookie
banners, or other fixed-position content sit on top of it. A behavioral
check for this compares the focused element's bounding rectangle against
the bounding rectangles of any `position: sticky` or `position: fixed`
ancestors/overlapping elements captured at the same moment. This repository
does not yet ship a dedicated obscuration module; fixture
[`fixtures/focus-visible/09-indicator-hidden-under-sticky.html`](./playwright/fixtures/focus-visible/09-indicator-hidden-under-sticky.html)
documents the gap: the existing Focus Visible check can report
`visible-change-detected` (the indicator's pixels genuinely changed) while
the indicator is still obscured in the real viewport, because pixel
comparison alone cannot detect overlap. Geometry comparison is the natural
next module; treat any current "pass" from the Focus Visible check as
silent on obscuration until that module exists.

### 2.4 Focus order evidence

Automation can *record* the sequence of elements a real Tab traversal
visits — which is exactly what `checkFocusVisibleRisk` does as a side
effect (each stop's element metadata, in order) — but it cannot judge
whether that order is *logical* for the page's content and task. Recording
is evidence for a human reviewer, not a verdict. Treat the `stops` array in
a Focus Visible result as a focus-order transcript in addition to a set of
indicator verdicts.

### 2.5 Text resizing and clipping (WCAG 2.2 SC 1.4.4 Resize Text)

A behavioral check can set a page zoom or font-size multiplier, wait for
layout, and look for the same signals as Reflow (overflow, clipped text,
overlapping elements) at 200% rather than at 320 CSS pixels. This
repository does not yet ship a dedicated module for this; the Reflow
module's `waitForLayoutStable` and dimension-measurement helpers in
[`reflow-risk.mjs`](./playwright/reflow-risk.mjs) are written to be reusable
for a zoom-based variant. See Section 6 of
[Manual Accessibility Testing](./MANUAL_ACCESSIBILITY_TESTING_GUIDE.md#62-zoom-text-resize-and-reflow-testing)
for why Resize Text and Reflow are distinct checks that should not be
conflated.

### 2.6 Text spacing (WCAG 2.2 SC 1.4.12)

A behavioral check can inject the WCAG-specified user style override (line
height to 1.5×, paragraph spacing to 2×, letter spacing to 0.12em, word
spacing to 0.16em) via `page.addStyleTag()`, wait for layout, and reuse the
same overflow/clipping detection as Reflow. Not yet implemented in this
repository; documented here as a known gap and a natural extension of the
Reflow module's measurement helpers.

### 2.7 Content on hover or focus (WCAG 2.2 SC 1.4.13)

A behavioral check can hover or focus a trigger element, wait for
additional content to appear, then verify: the new content can be
dismissed without moving pointer/focus (Escape or equivalent), the pointer
can move over the new content without it disappearing (hoverable), and the
content persists until dismissed, focus/hover moves away, or it becomes
invalid (persistent). Not yet implemented in this repository; documented
here as a known gap.

### 2.8 Dynamic UI states

Any behavioral check is only as good as the states it exercises. A page
that passes every check listed above on initial load can still fail once a
menu is open, a modal is active, or a validation error is showing. Apply
the checks in this guide *after* triggering the relevant interaction, not
only against the page's default state — the same principle
[Shift-Left Accessibility Automation](./SHIFT_LEFT_ACCESSIBILITY_AUTOMATION.md#3-unit-and-component-tests)
applies to axe-core scans.

## 3. Result vocabulary: indicator, confirmed failure, cantTell, manual review

Every check documented here and implemented in
[`examples/playwright/`](./playwright/README.md) uses one of these result
categories. Using them consistently is what keeps an automated result
honest about what it actually established.

| Category | Meaning | Example from this repository's modules |
| --- | --- | --- |
| **Indicator** | The check observed a signal correlated with a possible barrier, but did not rule out a legitimate explanation (an SC exception, an intentional design, a false-positive-prone edge case). Route to human review. | `potential-reflow-barrier`; `visible-change-detected` on its own (not proof of sufficient contrast/size) |
| **Confirmed failure** (for that specific tested instance) | The check established every precondition needed to rule out common false-negative causes for *that instance*: e.g. focus demonstrably moved to an applicable, rendered, in-viewport component, the page was visually stable, and no relevant pixels changed. Still not a full SC conformance claim — see Section 3.1. | `confirmed-no-visible-change` (Focus Visible) |
| **cantTell** | The check could not reach a reliable verdict: the page did not stabilize, screenshot coverage could not be established, focus resolution hit an unsupported case (cross-origin iframe, no coverage of the focused region), or similar. This is a distinct outcome from both a pass and a failure. | `cant-tell`, `cant-tell-unstable`, `cant-tell-no-coverage` (Reflow and Focus Visible) |
| **Test error** | The check itself failed to run (navigation failure, unexpected exception). Distinct from `cantTell`: a test error means the check did not execute correctly, not that the page's behavior was ambiguous. | `test-error` |
| **Manual review required** | Categories that automation is not attempting to resolve at all: whether an SC 1.4.10 exception legitimately applies to a two-dimensional component, whether an indicator has sufficient contrast (SC 1.4.11) or size (SC 2.4.13), whether alternative text is accurate, whether a focus order is logical for the content. | See Sections 4.4 and 5.4 |

### 3.1 A clean result is not a conformance claim

None of the checks in this guide, individually or together, establish that
a page conforms to WCAG 2.2. Specifically:

- A `no-overflow-detected` Reflow result does not prove SC 1.4.10
  conformance: it only means this check, at this viewport, on this page
  load, found no page-level horizontal overflow. It says nothing about
  whether content is cut off, overlapped, or operable, and nothing about
  whether an SC 1.4.10 exception was correctly applied elsewhere on the
  page.
- A `confirmed-no-visible-change` Focus Visible result is conclusive **for
  that tested component, on that page load** that no pixels changed near
  it when it received focus. It is not a claim about every focusable
  component on the page (only the ones actually tested, up to
  `maxTabStops`), and a `visible-change-detected` result on a *different*
  component is not evidence that its indicator is sufficiently visible,
  sized, or contrasted.

## 4. Reflow risk in detail

See [`examples/playwright/reflow-risk.mjs`](./playwright/reflow-risk.mjs)
for the implementation and
[`examples/playwright/README.md`](./playwright/README.md#reflow-options)
for the full option reference.

### 4.1 What it does

1. Sets the viewport to 320×720 CSS pixels by default (documented,
   configurable).
2. Navigates to the target URL.
3. Waits for layout to stabilize: page `load` event, `document.fonts.ready`,
   and a quiet period (default 500ms) with no change in
   `document.documentElement.scrollWidth`/`scrollHeight`.
4. Attempts a horizontal scroll (`window.scrollTo(100, 0)`) and reads back
   the resulting `window.scrollX`, following the CWAC method (see Section
   7). Comparing scroll *movement magnitude* rather than assuming a sign
   makes this work for right-to-left documents, where `scrollX` behavior
   varies by rendering engine.
5. Measures `clientWidth`/`scrollWidth` for the document element and body.
6. Best-effort identifies elements whose right edge extends past the
   viewport, to help a reviewer find the likely cause.
7. Resets scroll position before returning.

### 4.2 What it returns

A structured JSON result (see
[`examples/playwright/reflow-risk.mjs`](./playwright/reflow-risk.mjs) for
the full shape) with a `verdict` of `no-overflow-detected`,
`potential-reflow-barrier`, `cant-tell`, or `test-error`, plus dimensions,
scroll data, candidate overflowing elements, and notes restating the
limitations in Section 3.1.

### 4.3 What it cannot detect

- **Clipped content with no scrollbar.** `overflow: hidden` content that
  is silently truncated produces no scrollable overflow, so
  `scrollWidth`/`clientWidth` never diverge. See fixture
  [`09-clipped-no-scrollbar.html`](./playwright/fixtures/reflow/09-clipped-no-scrollbar.html) —
  this is a **documented false-negative risk**, not a solved case.
- **Whether an SC 1.4.10 exception applies.** The check has no way to know
  whether an overflowing element is a data table, map, diagram, or other
  component that requires two-dimensional layout for its meaning. See
  Section 4.4.
- **Delayed layout changes shorter than the configured quiet period.** See
  the `quietMs` documentation in
  [`examples/playwright/README.md`](./playwright/README.md#reflow-options)
  and the worked example in fixture
  [`13-late-layout-shift.html`](./playwright/fixtures/reflow/13-late-layout-shift.html).

### 4.4 The SC 1.4.10 exception, precisely

SC 1.4.10 does not exempt "pages that don't use two-dimensional layout." It
exempts **parts of content that require two-dimensional layout for their
usage or meaning** — data tables, maps, diagrams, video, games,
presentations, and interfaces requiring a persistently visible toolbar are
the normative examples. This has concrete consequences a reviewer must
check that automation cannot:

- An excepted component does not exempt the rest of the page. The heading
  above a data table, the paragraph introducing it, filters, search
  controls, and pagination around it must still reflow normally. See
  fixture [`07-table-page-overflow.html`](./playwright/fixtures/reflow/07-table-page-overflow.html)
  versus [`06-table-own-scroll-container.html`](./playwright/fixtures/reflow/06-table-own-scroll-container.html):
  the same table is a genuine barrier in one and a plausible exception
  candidate in the other, purely because of whether page-level content is
  dragged into the horizontal scroll with it.
- Within an excepted component, individual cells or sections may still
  need to reflow. A table's overall grid may need two dimensions to convey
  row/column relationships, but a single cell's text content does not
  automatically inherit that exception.
- "Requires" is a meaning test, not a convenience test. A component that
  merely looks better in a wide fixed layout, without losing information
  or functionality if it reflowed, is not exempt.

Automated overflow detection can flag a candidate. Only a human reviewer
applying this test can confirm an exception.

## 5. Focus Visible risk in detail

See [`examples/playwright/focus-visible-risk.mjs`](./playwright/focus-visible-risk.mjs)
for the implementation.

### 5.1 What it does, per Tab stop

1. Records the active element before pressing Tab.
2. Sends a real `page.keyboard.press('Tab')` — not a programmatic
   `.focus()` call, which would not exercise the same code paths as real
   keyboard use.
3. Confirms focus moved and the document still has focus (detects focus
   leaving the document to browser chrome).
4. Resolves the deepest active element through open shadow roots.
   Same-origin iframes are detected but not currently traversed into
   (reported as `cant-tell-no-coverage`; see Section 5.3).
5. Confirms the element is in the viewport (browsers auto-scroll a newly
   focused element into view as part of handling Tab — see fixture
   [`11-element-outside-initial-viewport.html`](./playwright/fixtures/focus-visible/11-element-outside-initial-viewport.html)
   for why "off-screen" is usually transient, not a way to avoid testing
   an element).
6. Captures a screenshot of the padded region around the element's
   bounding box.
7. Blurs the element, captures the same region again as an unfocused
   reference, then restores focus to the same element (via a temporary
   marker attribute that also pierces shadow roots) so the next Tab press
   continues the natural forward sequence.
8. Compares the two region screenshots.
9. Repeats up to a configurable `maxTabStops`, stopping early if focus
   leaves the document or stops advancing.

### 5.2 Why region-scoped, not whole-page, comparison

A naive check that asks "did any pixel on the page change" cannot tell the
difference between a focus indicator and an unrelated animation happening
somewhere else — a spinner, a carousel, a live-updating counter. It also
cannot tell the difference between "this element's indicator disappeared"
and "the *previous* element's indicator disappeared while this element has
none at all," because both look like *some* change happened somewhere on
the page.

This module scopes its pixel comparison to a padded region around the
newly focused element's own bounding box, and separately tracks whole-page
visual stability before testing begins. That combination is what lets
fixture [`17-unrelated-page-animation.html`](./playwright/fixtures/focus-visible/17-unrelated-page-animation.html)
correctly produce `cant-tell-unstable` (the page-level animation prevents
a reliable page load) while fixture
[`19-previous-indicator-disappears.html`](./playwright/fixtures/focus-visible/19-previous-indicator-disappears.html)
correctly isolates the second control's own missing indicator without
being confused by the first control's indicator vanishing nearby.

### 5.3 What it cannot detect

- **Sufficient contrast, size, or usability of an indicator.** A
  `visible-change-detected` verdict means pixels changed, not that they
  changed enough. See fixture
  [`07-barely-perceptible-change.html`](./playwright/fixtures/focus-visible/07-barely-perceptible-change.html) —
  this needs contrast-tool or manual review regardless of which way the
  pixel-diff threshold happens to fall.
- **Obscuration by other content.** See Section 2.3 and fixture
  [`09-indicator-hidden-under-sticky.html`](./playwright/fixtures/focus-visible/09-indicator-hidden-under-sticky.html).
- **Cross-origin iframes**, and same-origin iframes beyond a
  `cant-tell-no-coverage` acknowledgement (see fixture
  [`14-same-origin-iframe.html`](./playwright/fixtures/focus-visible/14-same-origin-iframe.html)).
- **Indicators rendered well outside the padded comparison region** (see
  fixture [`08-indicator-outside-bounding-box.html`](./playwright/fixtures/focus-visible/08-indicator-outside-bounding-box.html)) —
  a real but bounded tradeoff of region-scoped comparison; widen
  `regionPaddingPx` for components known to use offset indicators.
- **Focus changes not driven by Tab** (mouse-triggered or
  script-triggered focus changes outside the sequential Tab order); see
  fixture [`15-javascript-managed-focus.html`](./playwright/fixtures/focus-visible/15-javascript-managed-focus.html).

### 5.4 When a result is genuinely conclusive

A `confirmed-no-visible-change` verdict for a specific tested component is
conclusive for SC 2.4.7 **on that component, on that page load** when all
of the following held during the test: focus demonstrably moved to it
(the active element changed), it was an applicable, rendered, in-viewport
component, and the page was visually stable throughout. It is still not a
statement about contrast (SC 1.4.11), minimum size (SC 2.4.13), or
obscuration (SC 2.4.11) — those require the separate checks in Sections
4.4 and 5.3, or manual review.

## 6. Existing Focus Visible automation beyond axe-core

axe-core does not attempt behavioral Focus Visible testing — it can check
for some static anti-patterns (like `outline: none` without another
declared style) but cannot confirm a visible change actually occurs. Other
tools take different approaches. Verify each claim below against the
tool's current documentation before relying on it; capabilities change
between releases.

| Tool | Real Tab input | Sequential navigation | Focused/unfocused pixel comparison | Element-level evidence | Page manipulation | Known limitations | Manual review still needed |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **axe-core** | No | No | No | Partial (static CSS inspection for some anti-patterns) | No | Cannot confirm a visible change occurs; cannot detect obscuration or insufficient contrast of the indicator itself | Yes |
| **ALFA** (Siteimprove) | No | No | No | Yes — implements [SIA-R65](https://alfa.siteimprove.com/rules/sia-r65) (indirectly related to Focus Visible via style inspection) | No | Style-based inference, not a rendered behavioral test | Yes |
| **AccessLint** | Partial | Partial | No | Partial implementation of the [ACT Focus Visible rule](https://www.w3.org/WAI/standards-guidelines/act/rules/oj04fd/) | Limited | Confirm current coverage against the tool's own documentation before relying on it | Yes |
| **QualWeb** | Partial | Partial | No | Partial implementation of the ACT Focus Visible rule | Limited | Confirm current coverage against the tool's own documentation before relying on it | Yes |
| **IBM Equal Access** | No | No | No | Yes — `style_focus_visible` rule (style-based inspection) | No | Style-based inference, not a rendered behavioral test | Yes |
| **CWAC** (GOVTNZ) | Yes | Yes | Yes — whole-page screenshot diff | Per-tab-stop HTML excerpt of the focused element | Yes — resizes/expands browser, presses Tab, screenshots | See Section 7.2 for CWAC's documented behavior and limitations | Yes |
| **This repository's `focus-visible-risk.mjs`** | Yes | Yes | Yes — region-scoped, not whole-page | Per-tab-stop selector, HTML excerpt, accessible name, role, bounding rect | Yes — Playwright-driven Tab presses and region screenshots | See Section 5.3 | Yes |

Do not infer a tool's capabilities from its WCAG success-criterion mapping
alone — a rule labeled "2.4.7 Focus Visible" may test a narrow static
precondition rather than perform a rendered behavioral check. Confirm
against the tool's current source or documentation.

## 7. CWAC attribution

> The Reflow and Focus Visible behavioral testing examples in this
> repository were informed by the
> [Centralised Web Accessibility Checker (CWAC)](https://github.com/GOVTNZ/cwac),
> developed by the Web Standards team at Te Pūnaha Matihiko, New Zealand
> Government. See the CWAC
> [`ReflowAudit`](https://github.com/GOVTNZ/cwac/blob/main/src/audit_plugins/reflow_audit.py)
> and
> [`FocusIndicatorAudit`](https://github.com/GOVTNZ/cwac/blob/main/src/audit_plugins/focus_indicator_audit.py)
> implementations.

### 7.1 License note and what was and was not done

CWAC is licensed under the **GNU General Public License v3.0 (GPLv3)**.
This repository (`mgifford/ACCESSIBILITY.md`) is licensed under the **MIT
License**. GPLv3 code cannot be copied or directly translated into an MIT
file without extending GPL terms to the result, which would conflict with
this repository's licensing.

Accordingly:

- **No CWAC source code was copied.**
- **No CWAC source code was translated line-by-line or function-by-function.**
- **The algorithms were not "adapted" from the CWAC implementation** in the
  sense of restructuring existing code — no CWAC code was the starting
  point for either module.
- **Both `reflow-risk.mjs` and `focus-visible-risk.mjs` are independent
  reimplementations of the *documented, publicly observable method*** —
  the general approach described above (resize to 320px and check for
  overflow; send real Tab presses and diff screenshots) — written from
  scratch in JavaScript against Playwright, with different structure,
  different variable and function names, a different result schema, and
  deliberate design differences noted throughout this guide (notably:
  region-scoped rather than whole-page pixel comparison for Focus
  Visible, and RTL-aware scroll-magnitude comparison for Reflow).

This is a factual license-compliance statement, not merely a citation
courtesy. Anyone extending this code should preserve the same boundary:
read CWAC's public documentation and source to understand *what it does*,
then write new code to do something equivalent, rather than porting its
implementation.

### 7.2 What CWAC's `FocusIndicatorAudit` actually does

Stated precisely, because earlier drafts of this repository's manual
testing guide overstated CWAC's capabilities:

CWAC's `FocusIndicatorAudit`:

- sends actual Tab key presses (via Selenium `send_keys`);
- takes an initial reference screenshot of the whole page;
- takes a screenshot after each subsequent Tab press;
- compares pixel values between the reference and each subsequent
  screenshot (`np.sum(reference_image != current_image)`);
- reports a finding when **no captured pixels changed** at all following a
  Tab press.

CWAC's `FocusIndicatorAudit` does **not**:

- measure focus-indicator contrast (SC 1.4.11) — it has no color/contrast
  computation;
- prove that a detected visual change is local to the focused element — its
  comparison is whole-page, not region-scoped, so any page-wide change
  (not just a focus indicator) can satisfy its "something changed" check;
- determine that a detected indicator is sufficiently perceptible in
  human terms — it only reports whether *any* pixels differed;
- distinguish a genuinely missing indicator from one that is completely
  obscured by other content — both would show "no relevant change" or, if
  the obscuring content itself moves, could produce a false pass;
- guarantee that unrelated animation elsewhere on the page did not cause
  the detected pixel change — its own documentation addresses this with a
  separate animation-settling wait, but the focus-comparison step itself
  is still whole-page;
- compare a distinct focused and unfocused reference image for every
  individual element — it uses one initial whole-page reference image and
  compares each subsequent Tab-stop screenshot against that same single
  reference, not a fresh unfocused/focused pair per element.

This repository's `focus-visible-risk.mjs` deliberately diverges from that
last point: it captures a fresh unfocused/focused pair for each Tab stop,
scoped to a region around the element, specifically to close the
whole-page-comparison limitations described above. See Section 5.2.

### 7.3 What CWAC's `ReflowAudit` actually does

CWAC's `ReflowAudit`:

- requires headless mode and a browser window resized to exactly 320px
  wide;
- waits briefly for the page to render;
- attempts `window.scrollTo(100, 0)` and reads back `window.scrollX`;
- reports `overflows: true` when the resulting `scrollX` is greater than
  zero;
- optionally triggers a screenshot audit when overflow is detected;
- resets scroll position afterward.

CWAC's own module docstring states this directly: *"this test does not
properly test the normative requirement of WCAG 1.4.10... it does provide
a good indication of whether the page is responsive. Manual testing is
still required."* This repository's `reflow-risk.mjs` follows the same
honesty standard — see Section 4.2's verdict vocabulary and Section 3.1.

## 8. Automation coverage matrix

| Requirement | Static engines | Behavioral Playwright (this repo) | Manual review |
| --- | --- | --- | --- |
| Reflow at 320 CSS pixels | Prerequisites only (valid CSS, no inline fixed widths detectable from source) | Page-level risk indicator (Section 4) | Required for exceptions (Section 4.4) and usability |
| Focus Visible | Some engines provide partial static tests (Section 6) | Component-level behavioral evidence (Section 5) | Required for perceptibility (contrast, size) and completeness |
| Focus order quality | Limited structural evidence (DOM/tabindex order) | Tab sequence can be recorded (Section 2.4) | Required for meaningful order |
| Focus obscuration | Limited | Geometry and screenshot indicator — not yet implemented (Section 2.3) | Required for confirmation |
| Resize Text | Partial prerequisites | Zoom and clipping indicators — not yet implemented (Section 2.5) | Required |
| Text spacing | Partial | User-style injection and clipping indicators — not yet implemented (Section 2.6) | Required |

This table does not describe "percentage of WCAG covered." A cell listing
a method means that method can contribute evidence for that requirement,
not that the requirement is fully automatable.

## 9. Definition of done for a behavioral check

- [ ] The check states its viewport, timing, and stabilization assumptions.
- [ ] The result distinguishes indicator, confirmed-for-this-instance
  failure, `cantTell`, and test error (Section 3).
- [ ] The result includes machine-readable evidence (selector, rect, HTML
  excerpt) sufficient for a reviewer to locate the finding without
  re-running the check.
- [ ] Documented limitations name the specific false-positive and
  false-negative risks the check is known to have, with a fixture or test
  demonstrating each where practical.
- [ ] The check's own output states that it does not establish WCAG
  conformance.
- [ ] CI integration reports indicators separately from confirmed failures
  and does not silently convert every indicator into a blocking failure
  (see [CI/CD Accessibility Best Practices](./CI_CD_ACCESSIBILITY_BEST_PRACTICES.md)).

## 10. Related project guidance

- [Manual Accessibility Testing Guide](./MANUAL_ACCESSIBILITY_TESTING_GUIDE.md)
- [Shift-Left Accessibility Automation](./SHIFT_LEFT_ACCESSIBILITY_AUTOMATION.md)
- [CI/CD Accessibility Best Practices](./CI_CD_ACCESSIBILITY_BEST_PRACTICES.md)
- [AXE Rules Coverage](./AXE_RULES_COVERAGE.md)
- [Playwright examples and tests](./playwright/README.md)
- [Definition of Done](../DEFINITION_OF_DONE.md)

## 11. Primary references

- [WCAG 2.2 SC 1.4.10 Reflow — Understanding](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)
- [WCAG 2.2 SC 2.4.7 Focus Visible — Understanding](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html)
- [WCAG 2.2 SC 2.4.11 Focus Not Obscured (Minimum) — Understanding](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html)
- [WCAG 2.2 SC 2.4.13 Focus Appearance — Understanding](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html)
- [WCAG 2.2 SC 1.4.4 Resize Text — Understanding](https://www.w3.org/WAI/WCAG21/Understanding/resize-text.html)
- [WCAG 2.2 SC 1.4.12 Text Spacing — Understanding](https://www.w3.org/WAI/WCAG21/Understanding/text-spacing.html)
- [WCAG 2.2 SC 1.4.13 Content on Hover or Focus — Understanding](https://www.w3.org/WAI/WCAG21/Understanding/content-on-hover-or-focus.html)
- [ACT Rule: Focus Visible (oj04fd)](https://www.w3.org/WAI/standards-guidelines/act/rules/oj04fd/)
- [CWAC repository](https://github.com/GOVTNZ/cwac)
- [CWAC `ReflowAudit` source](https://github.com/GOVTNZ/cwac/blob/main/src/audit_plugins/reflow_audit.py)
- [CWAC `FocusIndicatorAudit` source](https://github.com/GOVTNZ/cwac/blob/main/src/audit_plugins/focus_indicator_audit.py)
- [Playwright: Accessibility Testing](https://playwright.dev/docs/accessibility-testing)

Version-sensitive claims (tool capability comparisons in Section 6) last
reviewed: 2026-07-25. Re-verify against each tool's current documentation
before citing its capabilities.

---

This document is available under the repository's [MIT License](../LICENSE).
