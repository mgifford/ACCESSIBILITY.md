# Accessibility Technical Finding

<!--
Use this template for a finding investigated with Playwright MCP, a Playwright
ARIA snapshot, Chrome DevTools accessibility tooling, or the Chrome DevTools
Protocol Accessibility domain. It can be copied into a GitLab issue template,
a Jira description, or another Markdown-capable tracker.

Keep a simpler reporting path available. A valid accessibility report does not
require developer-tool evidence, a selector, a WCAG mapping, or a proposed fix.
Delete instructions and sections that do not apply.
-->

## Finding summary

**Component or location:**

**Observed behavior:**

**Expected user-facing behavior, if known:**

**Current hypothesis, if any:**

## Evidence source and status

**Evidence source:** <!-- Playwright MCP, Playwright Test ARIA snapshot, Chrome DevTools Accessibility pane, Chrome CDP Accessibility domain, manual inspection, assistive technology, or other -->

**Reproduction status:** <!-- Not attempted, reproduced, intermittent, not observed in attempted run, unavailable conditions, or equivalent evidence -->

**Evidence status:** <!-- Not classified, automated indicator, reproducible finding, confirmed user-facing barrier, or confirmed standards failure -->

**Layer under investigation:** <!-- Application/content, shared component/dependency, Playwright MCP, Playwright Test, Chrome accessibility tree/CDP, browser/AT integration, or unknown -->

<!-- Tool output alone does not establish user impact, a standards failure,
browser responsibility, or conformance. -->

## Safe location and required state

**Safe URL or route:**

**Product build or commit:**

**Component or fixture:**

**UI state:**

**Account role or test-data state:**

**Frame or shadow-root boundary:**

<!-- Remove credentials, tokens, personal data, private record identifiers,
and temporary signed URLs. -->

## Affected task and people

**Task:**

**People or interaction methods confirmed or likely to be affected:**

**Consequence:**

**Workaround and its cost:**

**Evidence basis and scope limit:**

## Preconditions and reproduction or equivalent evidence

**Preconditions:**

1. Navigate to ...
2. Capture the initial state ...
3. Use the relevant keyboard, pointer, touch, speech, or other input ...
4. Observe ...

**Occurrences observed:**

**Timing, loading, network, or navigation conditions:**

**Failed reproduction attempts or equivalent evidence:**

<!-- Failure to reproduce is an investigation state. It does not invalidate the
original report. -->

## Environment and tool provenance

- Capture date, time, and time zone:
- Product build or commit:
- Browser and exact version:
- Operating system and version:
- Playwright MCP package version:
- Playwright Test version:
- Chrome/CDP protocol or browser revision, if known:
- MCP client and version:
- Viewport in CSS pixels:
- Zoom or text size:
- Locale:
- Active color, contrast, motion, or forced-color preferences:
- Relevant flags, configuration, retries, skips, or timeouts:

<!-- Viewport dimensions do not establish that a physical mobile device was
used. Record the actual browser and device conditions. -->

## Semantic target and context

- Role:
- Accessible name:
- Accessible description:
- Value and states:
- Programmatic relationships:
- Nearest meaningful landmark, form, dialog, region, or heading:
- Present, absent, or ignored in the accessibility tree:
- Ignored reason or accessible-name source, if known:

## Locators and session-only references

- Component or source identity:
- Playwright role or label locator:
- Test ID:
- CSS fallback:
- XPath fallback or legacy XPath:
- Frame or shadow host:
- MCP ref at capture time, if retained:
- MCP ref scope: original snapshot only
- CDP AX or DOM node IDs, if retained:
- CDP ID scope: enabled session, document, and frame only

<!-- Prefer semantic locators or maintained component identifiers. Do not use
MCP refs or CDP node IDs as durable locators, tracker IDs, or fingerprint
inputs. -->

## Scoped accessibility or ARIA snapshot

```yaml
# Include only the target, meaningful ancestor, relevant siblings, and state.
# Redact private content.
- form "Payment":
  - textbox "Card number" [invalid=true]
  - paragraph: Enter a card number.
  - button "Submit order"
```

## Focused Chrome accessibility evidence

**Method or event:** <!-- getAXNodeAndAncestors, getChildAXNodes, getFullAXTree, getPartialAXTree, getRootAXNode, queryAXTree, loadComplete, or nodesUpdated -->

**Parameters:** <!-- Include depth, fetchRelatives, frame, DOM node target, accessibleName, or role when used. -->

**`Accessibility.enable` active:** <!-- Yes, no, or unknown -->

**DOM target and resolution method:**

**Frame:**

**Before or after state and local timestamp:**

**Relevant AX or DOM node IDs, marked session-only:**

```json
{
  "relevantNodeData": "Paste a focused, redacted excerpt here"
}
```

**What this output demonstrates:**

**What remains unknown:**

**Chromium-specific limitation:**

<!-- A full AX-tree dump is rarely necessary. For nodesUpdated, state which
nodes were previously requested and how the triggering action and resulting
event were correlated. -->

## Live DOM or component excerpt

```html
<!-- Include the smallest relevant live-DOM or component excerpt. Page-source
HTML might not represent runtime state. -->
```

## Visual, focus, timing, or interaction evidence

- Initial focus or state:
- Triggering input:
- Resulting focus or state:
- Screenshot, recording, or trace reference and description:
- Geometry, color, viewport, or timing evidence:

## Assistive technology observation

<!-- Complete only when assistive technology was actually used. An
accessibility-tree snapshot is not an assistive technology observation. -->

- Assistive technology and version:
- Browser and version:
- Operating system:
- Command or interaction:
- Observed output:
- Participant or evaluator scope and limitations:

## Acceptance criteria and verification

**Corrected user-facing outcome:**

**Focused automated regression test:**

**Manual keyboard, visual, and interaction checks:**

**Assistive technology checks:**

**Testing with disabled people:** <!-- Required, planned, completed, or not yet determined, with rationale -->

<!-- Closing or completing a tracker item does not prove resolution. Record
verification evidence before changing the canonical finding lifecycle to
resolved. -->

## Standards mapping, if reviewed

**Standard, version, requirement, and level:**

**Relationship:** <!-- Confirmed, suspected, related, or not yet determined -->

**Rationale:**

<!-- Leave this section unclassified when it has not been reviewed. A tool rule
or tag is not automatically a confirmed standards failure. -->

## Tracking and correlation added during triage

- Canonical finding record:
- Tracker URL and relationship:
- Scan request or run ID:
- Occurrence fingerprint profile and full value:
- Pattern fingerprint profile and full value:
- Legacy identifier and migration status:
- Local or upstream related work:

<!-- Do not calculate a new fingerprint merely to submit this report. Preserve
existing full values and profiles when they are available. -->

## Unknowns, disagreements, and limitations

- Not tested:
- Tool or human evidence that disagrees:
- Unsupported CDP method, event, property, browser, or frame:
- Unresolved question:
- Next investigative action:
- Suggested owner or responsible source:

## Evidence safety check

- [ ] Credentials, tokens, personal data, private content, and temporary signed URLs are absent or redacted.
- [ ] Screenshots and recordings have useful descriptions, captions, or transcripts as applicable.
- [ ] MCP refs and CDP AX or DOM node IDs are marked as session-only and excluded from durable identity.
- [ ] Tool output has not been treated by itself as proof of user impact, a standards failure, browser responsibility, or conformance.
