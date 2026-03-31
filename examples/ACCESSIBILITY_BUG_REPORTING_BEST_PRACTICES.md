---
title: Accessibility Bug Reporting Best Practices
---

# Accessibility Bug Reporting Best Practices

This guide explains how to write accessibility bug reports that are clear, reproducible, and actionable. It is optimized for the output of automated testing tools and AI agents, but applies equally to manually discovered issues.

A good accessibility bug report provides enough information for a developer who was not present during testing to reproduce, understand, and fix the problem — without requiring additional back-and-forth.

## 1. Core Principle

**Reproducibility is the single most important quality of a bug report.** If a developer cannot reproduce the problem, they cannot fix it. Every field in an accessibility report exists to close the gap between finding a bug and fixing it.

Accessibility bugs have extra requirements compared with general bugs because:

- The failure often only surfaces with a specific assistive technology (AT) or browser combination.
- The violation may be visible in the DOM but invisible to sighted keyboard users, or vice versa.
- Automated tools detect *potential* violations; human or AT confirmation is often needed to establish real-world impact.
- The fix must not introduce new barriers for other users.

## 2. Required Fields

Every accessibility bug report must include the following fields.

### 2.1 Page URL

Provide the exact URL where the issue was found, including query string and fragment identifier if relevant.

```
URL: https://example.com/checkout?step=2#payment-form
```

If the issue appears on multiple pages, list all affected URLs or describe the URL pattern (e.g. "all `/product/*` pages").

### 2.2 XPath (Simplest Form)

Provide the shortest XPath that uniquely identifies the failing element on the page. Simple attribute-based selectors are preferred over full absolute paths.

```xpath
//button[@id="submit-payment"]
//input[@name="card-number"]
//div[@role="dialog"][@aria-labelledby="modal-title"]
```

If the element has no stable ID or name attribute, add the next-shortest unique selector:

```xpath
//nav[@aria-label="Main navigation"]//a[contains(text(),"Sign in")]
```

### 2.3 XPath with Hierarchy (Full DOM Path)

Provide the complete ancestor chain when the context is ambiguous or when the simplified XPath could match multiple elements.

```xpath
/html/body/main/section[@id="checkout"]/form[@id="payment-form"]/fieldset[2]/input[@name="card-number"]
```

Automated tools should emit both forms. The hierarchy path supports debugging in environments where IDs change dynamically (e.g. React, Angular).

### 2.4 HTML Snippet

Include the minimal HTML fragment that demonstrates the problem. Trim surrounding markup to the smallest context that still shows the issue.

**Good — shows only what matters:**

```html
<button>
  <img src="close.svg">
</button>
```

**Problem:** The image has no `alt` attribute, so the button has no accessible name.

**Expected:**

```html
<button>
  <img src="close.svg" alt="Close dialog">
</button>
```

Include parent elements only when the violation depends on the relationship between parent and child (e.g. missing `<label>` for `<input>`, or a `<table>` without `<th scope>`).

### 2.5 WCAG Success Criterion

Cite the specific WCAG 2.1 or 2.2 Success Criterion violated, including its level (A, AA, or AAA).

```
WCAG SC: 1.1.1 Non-text Content (Level A)
WCAG SC: 4.1.2 Name, Role, Value (Level A)
WCAG SC: 1.4.3 Contrast (Minimum) (Level AA)
```

Refer to the [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/) for the full list of criteria.

### 2.6 ACT Rule or Checker Rule

Reference the specific rule from the testing tool or from the W3C Accessibility Conformance Testing (ACT) framework.

**Axe-core rule:**

```
Rule ID: image-alt
Rule: Images must have alternate text
Tool: axe-core 4.x
```

**ACT rule:**

```
ACT Rule: 23a2a8 — Image button has accessible name
URL: https://act-rules.github.io/rules/23a2a8
```

**Accessibility Insights rule:**

```
Rule: image-alt
Check: alt-attribute
Guidance: https://accessibilityinsights.io/info-examples/web/image-alt/
```

When multiple tools flag the same issue, list all rule IDs so the report can be linked to automated check output.

### 2.7 Severity

Rate severity using a standard scale. Use this taxonomy consistently across all reports in a project.

| Level | Definition | Example |
|-------|-----------|---------|
| **Critical** | Users cannot complete a core task at all | Modal dialog traps keyboard focus and has no close mechanism |
| **High** | Significant barrier that degrades or blocks a key workflow | Form error messages not announced to screen readers |
| **Medium** | Noticeable barrier with a workaround available | Focus indicator is missing but Tab order is logical |
| **Low** | Minor issue with minimal real-world impact | Decorative icon has a redundant `aria-label` |

This taxonomy aligns with the severity levels used in [ACCESSIBILITY.md](../ACCESSIBILITY.md).

### 2.8 Frequency / Occurrence

Report how often the element appears on the page and across the site.

```
Frequency: 1 instance on this page
Frequency: Appears on every page in the main navigation
Frequency: Found on 23 of 47 pages crawled (49%)
```

For automated scans, include aggregate counts:

```json
{
  "rule": "image-alt",
  "occurrences": 14,
  "pages_affected": 6,
  "total_pages_scanned": 50
}
```

Frequency informs prioritisation. A single critical failure may warrant immediate action; a low-severity issue across hundreds of pages may need a systematic fix.

**Frequency amplifies effective severity.** A "Low" rated issue that appears on every page of a site, or on a heavily trafficked page or a top user task (such as sign-in, checkout, or search), should be treated with higher urgency than its base severity suggests. When assigning priority, consider both the raw severity rating and the reach of the issue:

| Situation | Suggested priority adjustment |
|-----------|-------------------------------|
| Low severity, appears on every page | Treat as Medium |
| Medium severity, appears on every page | Treat as High |
| Low/Medium severity, on a top-task page | Escalate by one severity level |
| Low/Medium severity, on a high-traffic landing page | Escalate by one severity level |

## 3. Recommended Additional Fields

These fields are not always required but significantly improve report quality.

### 3.1 Issue Summary (Title)

Write a concise title that identifies:
1. The component type
2. The failure mode
3. The WCAG criterion (optionally)

**Good titles:**
- `Close button missing accessible name (WCAG 1.1.1)`
- `Error message not associated with form field (WCAG 1.3.1)`
- `Dropdown menu items not keyboard-operable (WCAG 2.1.1)`

**Avoid:**
- `Accessibility issue found`
- `Screen reader problem on checkout`

### 3.2 Description

Explain what is wrong and why it is a barrier for users with disabilities.

```
The "Close" button in the cookie-consent dialog contains only a decorative SVG icon 
with no alt text, aria-label, or visible text. Screen reader users hear "button" with 
no indication of its purpose, making it impossible to dismiss the dialog by voice or 
from a screen reader virtual cursor.
```

### 3.3 Steps to Reproduce

Provide numbered steps a developer can follow to see the failure.

```
1. Go to https://example.com/shop
2. Wait for the cookie consent banner to appear
3. Open NVDA (or VoiceOver on macOS)
4. Press Tab to move focus to the "X" button in the banner
5. Listen to what the screen reader announces
```

For automated test output, include the command used and relevant configuration:

```bash
npx axe https://example.com/shop --tags wcag2a,wcag2aa --reporter json
```

### 3.4 Expected Behaviour

State what the correct experience should be.

```
Expected: Screen reader announces "Close cookie consent dialog, button" 
          or equivalent meaningful label.
```

### 3.5 Actual Behaviour

State what currently happens.

```
Actual: Screen reader announces "button" only. No accessible name is provided.
```

### 3.6 Testing Environment

Specify the full stack used during testing. AT bugs are often environment-specific.

```
Browser:     Chrome 124 / Firefox 126 / Safari 17.4
OS:          Windows 11 / macOS 14 / iOS 17
Screen reader: NVDA 2024.1 / JAWS 2024 / VoiceOver
Zoom level:  100% / 200%
Tool:        axe-core 4.9.1 / Accessibility Insights 2.47 / Pa11y 6.2
```

### 3.7 Impact Statement

Describe which disability groups are affected and how.

```
Impact: Blind and low-vision users relying on screen readers cannot identify 
        or operate the close button. Users who rely on voice control software 
        (e.g. Dragon NaturallySpeaking) cannot activate an unnamed button by 
        speaking its label.
```

### 3.8 Suggested Fix

Provide a concrete remediation if possible.

```html
<!-- Current (broken) -->
<button class="close-btn">
  <svg aria-hidden="true" ...></svg>
</button>

<!-- Fixed: Option A — aria-label -->
<button class="close-btn" aria-label="Close cookie consent dialog">
  <svg aria-hidden="true" ...></svg>
</button>

<!-- Fixed: Option B — visually hidden text -->
<button class="close-btn">
  <svg aria-hidden="true" ...></svg>
  <span class="visually-hidden">Close cookie consent dialog</span>
</button>
```

### 3.9 Personalisation and Context

Accessibility failures are not always reproducible on every page load. Many issues only surface under specific user settings, device types, or navigation paths. Always record the personalisation state and context at the time of discovery.

**Colour scheme and display preferences**

Note whether the issue occurs in light mode, dark mode, or both, and whether any OS-level display settings are active.

```
Colour scheme:    Light mode / Dark mode / System default
Forced Colors:    Active (Windows High Contrast) / Inactive
Contrast mode:    Standard / Increased contrast (macOS)
```

**CSS media features**

Some failures only appear when specific CSS media features are active. Record any active preferences.

```
prefers-color-scheme:   light / dark
prefers-reduced-motion: reduce / no-preference
prefers-contrast:       more / less / forced / no-preference
forced-colors:          active / none
```

See the [Light/Dark Mode Accessibility Best Practices](./LIGHT_DARK_MODE_ACCESSIBILITY_BEST_PRACTICES.md) guide for more detail.

**Viewport and device type**

Layout, component visibility, and interaction patterns often differ between mobile and desktop. Specify the device context when the issue is viewport-specific.

```
Viewport:   375 × 812 px (iPhone 14, Safari iOS 17)
Viewport:   1440 × 900 px (MacBook Pro, Chrome 124)
Device:     Mobile — iOS 17 / Android 14
Device:     Desktop — Windows 11 / macOS 14
Orientation: Portrait / Landscape
```

**Navigation path and UI state**

The route taken to reach a page — and any UI interactions performed before the failure — can determine whether a problem appears at all. Record the user journey when it is relevant.

```
Arrived via:   Direct URL / Search results link / Internal navigation from [page]
Preceded by:   Clicked "Add to cart" on product page, then navigated to checkout
UI state:      Modal open / Accordion expanded / Dropdown active
Login state:   Authenticated (standard user role) / Guest / Admin
```

Together, these contextual details help developers reproduce failures that only appear under specific personalisation settings, on specific device classes, or after specific interaction sequences.

## 4. Structured Report Templates

### 4.1 Markdown Template (for GitHub Issues)

```markdown
## Accessibility Issue: [Brief Description]

**URL:** [Full URL where issue was found]
**XPath:** `[Shortest unique XPath]`
**Full DOM path:** `[Full ancestor chain XPath]`
**WCAG SC:** [SC number] — [SC name] (Level [A/AA/AAA])
**Rule:** [Tool name] — [Rule ID]
**Severity:** [Critical / High / Medium / Low]
**Frequency:** [Number of instances; pages affected]

### HTML Snippet

```html
[Minimal failing HTML fragment]
```

### Description

[Explain what is wrong and why it creates a barrier]

### Steps to Reproduce

1. [Step 1]
2. [Step 2]
3. [Step 3]

### Expected Behaviour

[What should happen]

### Actual Behaviour

[What currently happens]

### Testing Environment

| Item | Value |
|------|-------|
| Browser | [name and version] |
| OS | [name and version] |
| Screen reader | [name and version, or N/A] |
| Testing tool | [name and version] |

### Impact

[Who is affected and how]

### Suggested Fix (optional)

[Code or prose describing the fix]
```

### 4.2 JSON Schema for Automated Tool Output

Use this schema when scripts or CI pipelines emit machine-readable accessibility reports.

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "AccessibilityIssue",
  "type": "object",
  "required": ["url", "wcag_sc", "severity", "rule_id", "xpath", "html_snippet"],
  "properties": {
    "url": {
      "type": "string",
      "format": "uri",
      "description": "Full URL of the page where the issue was found"
    },
    "xpath": {
      "type": "string",
      "description": "Shortest unique XPath identifying the failing element"
    },
    "xpath_full": {
      "type": "string",
      "description": "Full ancestor-chain XPath for unambiguous DOM location"
    },
    "html_snippet": {
      "type": "string",
      "description": "Minimal HTML fragment demonstrating the failure"
    },
    "wcag_sc": {
      "type": "string",
      "pattern": "^\\d\\.\\d+\\.\\d+$",
      "examples": ["1.1.1", "4.1.2", "1.4.3"],
      "description": "WCAG Success Criterion number"
    },
    "wcag_level": {
      "type": "string",
      "enum": ["A", "AA", "AAA"],
      "description": "WCAG conformance level"
    },
    "rule_id": {
      "type": "string",
      "description": "Rule identifier from the testing tool (e.g. axe-core rule ID)"
    },
    "act_rule_id": {
      "type": "string",
      "description": "W3C ACT rule identifier, if applicable"
    },
    "tool": {
      "type": "string",
      "description": "Name and version of the testing tool that found the issue"
    },
    "severity": {
      "type": "string",
      "enum": ["critical", "high", "medium", "low"],
      "description": "Severity level of the issue"
    },
    "frequency": {
      "type": "object",
      "properties": {
        "instances_on_page": { "type": "integer" },
        "pages_affected": { "type": "integer" },
        "total_pages_scanned": { "type": "integer" }
      },
      "description": "How often the issue occurs"
    },
    "summary": {
      "type": "string",
      "description": "Short title: component + failure mode + criterion"
    },
    "description": {
      "type": "string",
      "description": "Human-readable explanation of the barrier"
    },
    "impact": {
      "type": "array",
      "items": { "type": "string" },
      "examples": [["blind", "low-vision", "motor"]],
      "description": "Disability groups affected"
    },
    "environment": {
      "type": "object",
      "properties": {
        "browser": { "type": "string" },
        "os": { "type": "string" },
        "screen_reader": { "type": "string" },
        "zoom_level": { "type": "string" }
      }
    },
    "suggested_fix": {
      "type": "string",
      "description": "Code snippet or prose describing the remediation"
    },
    "steps_to_reproduce": {
      "type": "array",
      "items": { "type": "string" },
      "description": "Ordered steps to observe the failure"
    }
  }
}
```

### 4.3 Example JSON Report (axe-core output mapped to schema)

```json
{
  "url": "https://example.com/checkout?step=2",
  "xpath": "//button[contains(@class,'close-btn')]",
  "xpath_full": "/html/body/div[@id='cookie-banner']/button[contains(@class,'close-btn')]",
  "html_snippet": "<button class=\"close-btn\"><svg aria-hidden=\"true\"></svg></button>",
  "wcag_sc": "4.1.2",
  "wcag_level": "A",
  "rule_id": "button-name",
  "act_rule_id": "97a4e1",
  "tool": "axe-core 4.9.1",
  "severity": "critical",
  "frequency": {
    "instances_on_page": 1,
    "pages_affected": 12,
    "total_pages_scanned": 50
  },
  "summary": "Close button missing accessible name (WCAG 4.1.2)",
  "description": "The cookie consent close button contains only an SVG icon with no accessible name. Screen reader users hear 'button' with no indication of the button's purpose.",
  "impact": ["blind", "low-vision", "voice-control"],
  "environment": {
    "browser": "Chrome 124",
    "os": "Windows 11",
    "screen_reader": "NVDA 2024.1",
    "zoom_level": "100%"
  },
  "suggested_fix": "<button class=\"close-btn\" aria-label=\"Close cookie consent dialog\"><svg aria-hidden=\"true\"></svg></button>",
  "steps_to_reproduce": [
    "Go to https://example.com/checkout?step=2",
    "Wait for the cookie consent banner to appear",
    "Open NVDA and press Tab to reach the close button",
    "Observe that NVDA announces 'button' with no label"
  ]
}
```

### 4.4 EARL: Evaluation and Report Language

[EARL (Evaluation and Report Language)](https://www.w3.org/WAI/standards-guidelines/earl/) is a W3C standard for expressing test results in a machine-readable format. It uses RDF (Resource Description Framework) to describe which subject (a web page or resource) was tested, which assertion (a WCAG criterion or rule) was evaluated, and what the outcome was.

Use EARL when you need interoperable, tool-agnostic accessibility reports that can be processed by different systems — for example, aggregating results from multiple testing tools, feeding a compliance dashboard, or archiving audit evidence.

**Minimal EARL example (Turtle syntax):**

```turtle
@prefix earl: <http://www.w3.org/ns/earl#> .
@prefix dcterms: <http://purl.org/dc/terms/> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

[] a earl:Assertion ;
   earl:assertedBy <https://example.com/tools/axe-runner> ;
   earl:subject <https://example.com/checkout?step=2> ;
   earl:test <http://www.w3.org/TR/WCAG21/#non-text-content> ;
   earl:result [
     a earl:TestResult ;
     earl:outcome earl:failed ;
     dcterms:description "Close button contains only an SVG icon with no accessible name." ;
     dcterms:date "2025-06-01T10:30:00Z"^^xsd:dateTime
   ] ;
   earl:mode earl:automatic .
```

**Key EARL concepts:**

| Term | Meaning |
|------|---------|
| `earl:Assertion` | A single test result (subject + test + outcome) |
| `earl:subject` | The URL or resource that was tested |
| `earl:test` | The criterion or rule being tested (WCAG SC, ACT rule, etc.) |
| `earl:outcome` | `earl:passed`, `earl:failed`, `earl:cantTell`, `earl:inapplicable`, or `earl:untested` |
| `earl:mode` | How the test was performed: `earl:automatic`, `earl:manual`, or `earl:semiAuto` |
| `earl:assertedBy` | The tool or person that produced the assertion |

EARL output can be produced by tools such as [Alfa](https://github.com/Siteimprove/alfa), [Axe Reporter EARL](https://github.com/dequelabs/axe-reporter-earl), and [ACT-Rules implementations](https://act-rules.github.io/). The W3C [WCAG-EM Report Tool](https://www.w3.org/WAI/eval/report-tool/) also exports EARL.

For further reading, see [EARL overview on W3C WAI](https://www.w3.org/WAI/standards-guidelines/earl/).

## 5. Guidance for Automated Tools and AI Agents

When a script or AI agent generates accessibility reports, apply these rules.

### 5.1 Always Emit Both XPath Forms

Automated tools must emit both the simplified XPath (shortest unique selector) and the full DOM path XPath. The simplified form aids human readability; the full form aids deterministic replay.

### 5.2 Deduplicate Before Reporting

Before filing issues, group violations by rule and normalised XPath. Reporting 200 identical `image-alt` violations as separate issues obscures the true scope of the problem. Instead, report one issue with `frequency.instances_on_page` set to 200.

```python
# Pseudocode: aggregate duplicates
issues = defaultdict(list)
for violation in raw_results:
    key = (violation["rule_id"], violation["wcag_sc"], normalize_xpath(violation["xpath"]))
    issues[key].append(violation)

for key, group in issues.items():
    report_issue(group[0], frequency=len(group))
```

### 5.3 Map Tool Output to WCAG Criteria

Every automated rule should map to at least one WCAG SC. Maintain a rule-to-WCAG mapping table in your project (see [AXE_RULES_COVERAGE.md](./AXE_RULES_COVERAGE.md) for an example) so that reports consistently include the criterion.

### 5.4 Preserve the HTML Snippet

Extract the failing element's outer HTML at scan time. DOM content may change after the scan. The preserved snippet allows verification of whether a deployed fix addresses the original issue.

### 5.5 Assign Severity Consistently

Use a single severity taxonomy across all reports and all tools. If multiple tools report the same violation at different severities, use the higher severity.

### 5.6 Include Confidence Score for Automated Detections

Automated tools sometimes flag *potential* violations that require manual confirmation (e.g. colour contrast where the background is a gradient). Include a `confidence` field when the tool provides it.

```json
{
  "rule_id": "color-contrast",
  "confidence": "needs-review",
  "note": "Background colour is a CSS gradient; automated contrast check may be inaccurate. Manual verification required."
}
```

### 5.7 AI Agent Prompt for Issue Filing

When an AI agent files a GitHub Issue from automated scan output, use the following prompt structure:

```
You are an accessibility engineer filing a GitHub Issue. 
Given the following JSON violation report, create a well-structured 
GitHub Issue using the Markdown template below. 

Rules:
- Use the issue summary as the title.
- Populate all fields; write "N/A" only if the data is genuinely absent.
- Do not paraphrase WCAG criterion names; use the exact W3C wording.
- Include the HTML snippet in a fenced code block.
- Add the label "accessibility" to the issue.

Violation data:
[INSERT JSON HERE]

Template:
[INSERT MARKDOWN TEMPLATE HERE]
```

## 6. Reporting Accessibility Issues to External Organisations

When reporting accessibility barriers to a third-party organisation (a vendor, government service, or public website), adapt the report to the audience.

### 6.1 Contact Strategy

1. **Check for an existing channel** — Look for an accessibility statement, a dedicated `accessibility@` email address, or a feedback form.
2. **Be specific, not general** — "Your site is inaccessible" does not help. Provide the exact page, element, and barrier.
3. **Focus on impact** — Explain who is affected and what task they cannot complete, rather than leading with the technical violation.
4. **Reference WCAG** — Cite the specific criterion. For public-sector organisations, reference applicable legislation (e.g. Section 508 in the US, EN 301 549 in the EU, AODA in Ontario).
5. **Offer to help** — Suggest the fix. Organisations are more likely to act quickly when a solution is provided alongside the problem.
6. **Set a timeline** — Request acknowledgement within a defined period (e.g. 10 business days) and a remediation timeline for critical issues.
7. **Escalate if necessary** — If no response is received, contact the relevant accessibility enforcement body or ombudsman.

### 6.2 Template for External Reports

```
Subject: Accessibility barrier on [Page Title] — [WCAG SC]

Dear [Organisation Name] Accessibility Team,

I am writing to report an accessibility barrier I encountered on your website.

Page:     [Full URL]
Issue:    [One-sentence description of the barrier]
Impact:   [Who is affected and what they cannot do]
WCAG SC:  [SC number and name, Level]

Steps to reproduce:
1. [Step 1]
2. [Step 2]

Expected: [What should happen]
Actual:   [What happens instead]

Suggested fix: [Brief description or code snippet if appropriate]

I am available to provide further information or test a proposed fix. 
I would appreciate acknowledgement within 10 business days and a 
remediation timeline for this critical barrier.

Thank you for your attention to this matter.

[Your name / organisation]
```

## 7. Quality Checklist

Before filing or submitting an accessibility bug report, verify each item:

- [ ] URL is exact and publicly accessible (or a test account is provided)
- [ ] XPath (simplified) uniquely identifies the element
- [ ] Full DOM path XPath is included
- [ ] HTML snippet is minimal and self-contained
- [ ] WCAG SC is cited with the correct level (A/AA/AAA)
- [ ] Automated rule ID is included (axe-core, ACT, or tool-specific)
- [ ] Severity is assigned using the project's standard taxonomy
- [ ] Frequency / occurrence count is provided
- [ ] Summary title follows the `[Component] — [Failure] ([WCAG SC])` pattern
- [ ] Steps to reproduce are numbered and complete
- [ ] Expected and actual behaviours are stated separately
- [ ] Testing environment (browser, OS, AT, tool) is documented
- [ ] Personalisation context is recorded (colour scheme, CSS media features, viewport, navigation path)
- [ ] Impact on specific disability groups is described
- [ ] Duplicate violations are aggregated, not filed individually
- [ ] For automated output: confidence level is included where relevant

## 8. WCAG Success Criteria Quick Reference

The following criteria are most frequently violated in automated scans. Use these as a starting point when assigning `wcag_sc`.

| SC | Name | Level | Common Violations |
|----|------|-------|------------------|
| 1.1.1 | Non-text Content | A | Missing `alt` on images, unlabelled icon buttons |
| 1.3.1 | Info and Relationships | A | Unsemantic heading structure, missing form labels |
| 1.3.3 | Sensory Characteristics | A | Instructions that rely on shape, colour, or position only |
| 1.4.1 | Use of Color | A | Status conveyed by colour alone |
| 1.4.3 | Contrast (Minimum) | AA | Text below 4.5:1 contrast ratio |
| 1.4.4 | Resize Text | AA | Page breaks at 200% zoom |
| 1.4.11 | Non-text Contrast | AA | UI component borders below 3:1 contrast |
| 2.1.1 | Keyboard | A | Elements not reachable or operable by keyboard |
| 2.4.3 | Focus Order | A | Illogical tab order, focus moves unexpectedly |
| 2.4.7 | Focus Visible | AA | No visible focus indicator |
| 3.3.1 | Error Identification | A | Form errors not described in text |
| 3.3.2 | Labels or Instructions | A | Form fields without visible labels |
| 4.1.2 | Name, Role, Value | A | Custom widgets missing ARIA name, role, or state |
| 4.1.3 | Status Messages | AA | Notifications not exposed to screen readers |

For the complete list, see the [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/).

## 9. Further Reading

The following resources informed this guide:

- [Writing Impactful Accessibility Reports](https://medium.com/openconcept-stories/writing-impactful-accessibility-reports-d6cdd84356fd) — Mike Gifford, OpenConcept
- [How to Fix Accessibility Bugs](https://github.com/readme/guides/fix-accessibility-bugs) — Mike Gifford, GitHub README Guides
- [Contacting Organizations about Inaccessible Websites](https://www.w3.org/WAI/teach-advocate/contact-inaccessible-websites/) — W3C WAI
- [How to Report Accessibility Bugs](https://www.digitala11y.com/how-where-to-report-accessibility-bugs/) — DigitalA11y
- [Template: Reporting Accessibility Issues](https://accessibility.huit.harvard.edu/template-reporting-accessibility-issues) — Harvard University
- [Accessibility Insights for Web](https://github.com/microsoft/accessibility-insights-web) — Microsoft
- [ACT Rules Community Group](https://act-rules.github.io/) — W3C
- [EARL: Evaluation and Report Language](https://www.w3.org/WAI/standards-guidelines/earl/) — W3C WAI (machine-readable standard for expressing accessibility test results)
- [AXE Rules Coverage](./AXE_RULES_COVERAGE.md) — This repository
- [Manual Accessibility Testing Guide](./MANUAL_ACCESSIBILITY_TESTING_GUIDE.md) — This repository
