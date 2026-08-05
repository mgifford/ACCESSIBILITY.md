---
title: Accessibility Finding Issue Tracker Integration
---

# Accessibility Finding Issue Tracker Integration

This guide explains how to use the accessibility finding model with GitHub
Issues, GitLab issues and work items, and Jira work items. It defines a shared
integration contract while allowing each tracker to keep its own workflow,
permissions, labels, fields, and automation.

Use this guide with:

- [Accessibility Bug Reporting Best Practices](./ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES.md)
  for valid intake and human-readable reports;
- [Technical Evidence for Reproducible Accessibility Findings](./ACCESSIBILITY_FINDING_EVIDENCE.md)
  for Playwright MCP, Chrome CDP, DOM, interaction, and visual evidence;
- [Accessibility Finding Tracking](./ACCESSIBILITY_FINDING_TRACKING.md) for
  tracker IDs, fingerprints, lifecycle, actionability, and policy
  classification; and
- [Accessibility Finding Schema](./schemas/README.md) for the canonical
  machine-readable finding record.

The product-specific instructions in this guide were reviewed on 2026-08-04.
GitHub, GitLab, and Jira change independently. Confirm tenant features,
subscription limits, API versions, and administrator controls before deploying
an integration.

## 1. Scope and Non-Goals

This guide covers:

- mapping one canonical accessibility finding into different issue trackers;
- configuring practical intake fields;
- recording tracker relationships without replacing finding identity;
- synchronizing workflow status without making false resolution claims;
- attaching or linking technical evidence safely;
- preserving full fingerprints and legacy identifiers;
- handling local and upstream work in different trackers; and
- designing API or webhook automation that can be retried safely.

This guide does not:

- require technical evidence before accepting a report;
- require a fingerprint, WCAG mapping, severity, or tracker ID at intake;
- define a universal Jira project, workflow, screen, or form import;
- require GitHub, GitLab, or Jira custom fields that a project does not use;
- make the issue tracker the only copy of the finding or its evidence;
- map `Closed` or `Done` directly to verified resolution;
- make one platform's labels or statuses canonical across every platform; or
- change the finding schema or frozen fingerprint profiles.

## 2. Use an Adapter Model

Treat each tracker as an adapter around the canonical finding record.

| Layer | Owns | Must not own |
| --- | --- | --- |
| Finding record | Description, location, impact, standards mappings, evidence references, tracking relationships, lifecycle, and policy classification | Platform-specific screen layout or workflow configuration |
| Evidence store | Scoped snapshots, DOM and AX excerpts, screenshots, recordings, traces, logs, and capture provenance | Tracker status or durable remediation identity |
| Tracker | Work assignment, discussion, local priority, due dates, sprint or milestone placement, and native workflow status | Fingerprint generation, conformance conclusions, or automatic verification |
| Tracker adapter | Field mapping, tracker API IDs, synchronization state, retries, and conflict handling | Silent changes to human-reviewed evidence, severity, obligation, or resolution |

The finding record is the portable interchange object. The tracker is the work
surface. Evidence can be stored in the tracker when safe, but the tracker must
reference it rather than redefine what the evidence means.

### 2.1 Minimum synchronization contract

Every adapter should be able to:

1. create or locate a tracker item after triage decides tracked work is needed;
2. write the full tracker URL into `tracking.tracker_ids[].id`;
3. record the relationship, such as `tracks`, `blocked-by`, or `duplicates`;
4. preserve the tracker-native status separately from finding lifecycle;
5. link to focused evidence rather than copying unsafe or excessive artifacts;
6. preserve full fingerprint values and profiles when they already exist;
7. write the tracker relationship back to the canonical finding record; and
8. require verification evidence before setting lifecycle to `resolved`.

An integration that only creates issues, but never writes the resulting
tracker URL back to the finding, is incomplete.

## 3. Keep Tracker Identity and Finding Correlation Separate

Use the full work-item URL as the portable tracker ID:

```json
{
  "tracking": {
    "tracker_ids": [
      {
        "id": "https://github.com/example/product/issues/482",
        "relationship": "tracks",
        "status": "open",
        "tracker_native_status": "OPEN"
      }
    ]
  }
}
```

Equivalent examples include:

```text
https://gitlab.example.com/group/product/-/issues/91
https://example.atlassian.net/browse/A11Y-142
```

Do not use any of the following as a substitute for that tracker relationship:

- a GitHub or GitLab label;
- a Jira project key by itself;
- a scan request ID;
- a short display ID;
- an MCP ref;
- a CDP AX or DOM node ID;
- an issue title; or
- a fingerprint.

Fingerprints support deterministic correlation. They can help an adapter find
candidate existing work, but a matching fingerprint does not decide whether
to reuse, merge, split, or create an issue. That decision remains triage.

### 3.1 Platform-native numeric IDs

Adapters should also retain the platform's immutable or API-native identifiers
when available:

- GitHub API issue node or database ID;
- GitLab global issue ID, project ID, and project-scoped IID; and
- Jira numeric issue ID as well as the visible issue key.

These values belong in adapter state or a controlled namespaced extension when
they must be exchanged. They do not replace the human-usable tracker URL in
`tracking.tracker_ids`.

This matters particularly in Jira, where a visible issue key can change when
the project key changes or the work item moves. GitLab moves also require care:
GitLab closes the original issue and copies it into the target project, leaving
two work-item URLs connected by system notes.

## 4. Map Shared Concepts, Not Identical Screens

The following is a recommended mapping, not a claim that every platform or
subscription exposes the same fields.

| Canonical concept | GitHub | GitLab | Jira | Integration rule |
| --- | --- | --- | --- | --- |
| Tracker ID | Full issue URL | Full issue or work-item URL | Full browse URL; retain numeric issue ID in adapter state | Write back only after the item exists |
| Finding summary | Issue title and `Finding summary` section | Issue title and description heading | Summary and Description | Keep the title concise; retain detail in the body |
| Location and state | Issue body | Description | Description, Environment, Component, or a scoped custom field | Do not expose secrets or private record identifiers |
| Reproduction or equivalent evidence | Issue body | Description | Description or attached form | Direct reproduction is preferred but not mandatory |
| Evidence references | Links or attachments in body | Links or uploads in description | Links, attachments, or attached form | Apply access control, redaction, and retention policy |
| Evidence status | Project field or label when queryability is needed | Scoped label or custom field when available | Single-select custom field when reporting requires it | Never infer it from tracker state |
| Handling | Project field or label | Scoped label or custom field | Single-select custom field | Keep `report`, `review`, and `suppress` separate from status |
| Obligation | Body or project field per standards mapping | Description, scoped label, or custom field | Custom field or form field per standards mapping | AAA under an AA target remains `aspirational` by default |
| Accessibility severity | Project field or label | Scoped label or custom field | Dedicated custom field | Keep separate from tool impact and Jira Priority |
| Work priority | GitHub Project field or local label | Priority label, milestone, weight, or local process | Jira Priority | Project scheduling decision, not user-impact severity |
| Full fingerprints | Correlation block or external adapter store | Correlation block or external adapter store | Long-text field, issue property, or external adapter store | Never truncate the authoritative value into a label |
| Native status | Open or closed, plus project workflow fields | Open or closed, plus work-item status where available | Workflow status and status category | Record as `status` and `tracker_native_status`, not lifecycle |
| Finding lifecycle | Canonical finding record; optionally mirrored for reporting | Canonical finding record; optionally mirrored | Canonical finding record; optionally mirrored | `resolved` requires verification evidence |
| Relationships | Issue links, sub-issues, body links, or project data | Linked issues and work-item relationships | Issue links | Preserve every local and upstream tracker URL |

Create custom fields only for values the organization must query, report,
validate, or automate. Putting every evidence detail into a custom field makes
intake harder and creates a maintenance burden. Narrative evidence belongs in
the issue body or a linked evidence artifact.

## 5. Use a Shared Human-Readable Structure

The issue body or description should use the same conceptual order across
platforms:

1. finding summary;
2. affected task and people, when known;
3. safe location and required state;
4. observed and expected behavior;
5. reproduction steps or equivalent evidence;
6. environment and tool provenance;
7. focused technical evidence;
8. evidence status and limitations;
9. acceptance criteria and verification plan; and
10. tracking and correlation references added during triage.

Use the platform-neutral
[Technical Accessibility Finding Template](./issue-trackers/ACCESSIBILITY_TECHNICAL_FINDING_TEMPLATE.md)
for GitLab, Jira descriptions, trackers that accept Markdown, and a GitHub
Markdown fallback. Use the GitHub Issue Form when structured GitHub intake is
preferred.

The technical template is for triagers and investigators. Keep a simpler
general accessibility report path for people who encountered a barrier without
developer-tool evidence.

## 6. GitHub Issues

### 6.1 Install the Issue Form

Copy
`.github/ISSUE_TEMPLATE/accessibility-technical-evidence.yml` into the target
repository's default branch. GitHub Issue Forms are YAML files stored in
`.github/ISSUE_TEMPLATE`. Confirm that every referenced label already exists;
GitHub does not create a missing label merely because the form names it.

Keep the general accessibility report form available. The technical form must
not become the only way to report a barrier.

GitHub converts Issue Form responses into Markdown in the issue body. The form
is structured during intake, but the resulting issue is not a canonical JSON
finding record and its body remains editable. Do not build an integration that
assumes the form field IDs remain available as database fields after
submission.

### 6.2 Decide where queryable values live

Use one of these approaches consistently:

- labels for a small, stable vocabulary;
- GitHub Project fields when project-level reporting and workflow need
  structured values; or
- an external canonical finding store, with only the human-readable issue and
  relevant labels in GitHub.

Do not encode full fingerprints in labels. Do not use title prefixes as the
only machine-readable classification.

### 6.3 Closing and verification

A pull request can close a GitHub issue automatically. That changes the
tracker's native state to closed. It does not prove the affected user task was
retested. The adapter should record the native closure, then require the
verification plan before changing `tracking.lifecycle.status` to `resolved`.

If verified resolution is required before closure, use repository policy or
automation to add a verification step. Do not claim that the Issue Form alone
enforces this.

## 7. GitLab Issues and Work Items

### 7.1 Install the description template

Copy the platform-neutral template to:

```text
.gitlab/issue_templates/Accessibility-technical-finding.md
```

The file must be Markdown, be present on the default branch, and use the
`.gitlab/issue_templates` directory. GitLab can also provide group-level or
instance-level description templates, depending on offering and subscription.

GitLab description templates copy their content into the editable issue
description. Treat the result as a work surface, not the canonical finding
record.

### 7.2 Optional quick actions

GitLab templates can include quick actions. Add them only when the target
labels already exist and submitters have the required permission. For example:

```text
/label ~accessibility ~"a11y::review"
```

Keep platform commands outside the portable evidence sections. A project that
copies the template to another tracker should be able to remove the quick
actions without changing the finding model.

Scoped labels can represent values such as `evidence::automated-indicator` or
`handling::review`. Do not use a label to imply two axes at once. For example,
`confirmed-and-high-priority` incorrectly combines evidence confidence,
severity, and priority.

### 7.3 Moves and automatic closure

When GitLab moves an issue, it closes and preserves the original, creates a
copy in the target project, and adds system notes to both. Record both URLs.
The original can be `superseded-by` the target item; the target item can carry
the active `tracks` relationship.

GitLab can also close issues from merge requests or commit messages. Record
that native closure without setting the finding lifecycle to `resolved` until
the original task has been verified.

## 8. Jira Cloud

Jira is not one uniform configuration. Jira Cloud sites can use different work
types, forms, screens, field schemes, workflows, field contexts, and project or
space layouts. The instructions below define the data model, not a universal
import file.

Jira Data Center and older Jira configurations require separate validation.
Do not assume Cloud screen or form instructions apply unchanged.

### 8.1 Start with existing fields

Use existing fields where they have the correct meaning:

| Jira field | Recommended content |
| --- | --- |
| Summary | Concise finding title |
| Description | Human-readable finding, reproduction or equivalent evidence, acceptance criteria, and limitations |
| Environment | Browser, operating system, assistive technology, Playwright, MCP, Chrome/CDP, build, locale, and relevant settings |
| Components | Responsible product or component when confirmed |
| Labels | A small set such as `accessibility`; do not store fingerprints here |
| Attachments | Redacted evidence only, subject to access and retention rules |
| Issue links | Local, upstream, duplicate, blocking, and related work |
| Priority | Local scheduling priority, not accessibility severity |

Do not create a dedicated accessibility work type merely because it is
possible. A normal Bug or Task with a clear accessibility template is often
sufficient. Create a specialized work type only when it needs a genuinely
different workflow, permission model, or reporting contract.

### 8.2 Add only necessary custom fields

Common candidates are:

- Accessibility evidence status;
- Accessibility handling;
- Accessibility severity;
- Canonical finding record ID or URL; and
- Full occurrence or pattern fingerprint, when Jira must query it directly.

Keep Accessibility severity separate from Jira Priority. Keep finding
lifecycle separate from Jira workflow status. Use field descriptions that name
the allowed values and link back to the canonical tracking guide.

Jira administrators must add fields to the relevant field scheme, context,
create screen, view layout, and transition screen as applicable. A custom field
that exists but is absent from the applicable create screen or context cannot
be relied on by intake or automation.

### 8.3 Use forms for staged intake

Where Jira Forms are available, create two entry paths:

- a short accessibility report form for general intake; and
- a technical evidence form for triagers and investigators.

Make technical sections optional unless the form is explicitly restricted to
technical investigation. Link form fields to Jira fields only when the value
must be queried or drive automation. Keep verbose AX trees, traces, and DOM
excerpts as protected attachments or evidence links.

### 8.4 API integration

The Jira Cloud REST API accepts an issue ID or key for issue operations. The
fields available during creation depend on the target project or space and
work type. Query create-field metadata rather than hard-coding custom-field
IDs from another Jira site.

Jira Cloud API values for Description, Environment, and multi-line text custom
fields use Atlassian Document Format. An adapter must transform the shared
content structure into ADF; sending the GitLab Markdown template unchanged is
not a portable API implementation.

For machine-only adapter data, Jira issue properties can store JSON such as a
canonical record ID, schema version, and synchronization token. Issue
properties are not a substitute for an accessible human-readable Description,
and their permissions and app-access behavior must be reviewed.

Retain the Jira numeric issue ID in adapter state because the visible key can
change. Continue exposing the current human-readable browse URL in the finding
record.

## 9. Preserve Multiple Local and Upstream Trackers

A finding may be managed locally while its responsible fix is upstream in a
GitHub, GitLab, or Jira project.

```json
{
  "tracking": {
    "tracker_ids": [
      {
        "id": "https://example.atlassian.net/browse/A11Y-142",
        "relationship": "tracks",
        "status": "open",
        "tracker_native_status": "In Progress"
      },
      {
        "id": "https://github.com/example/design-system/issues/91",
        "relationship": "blocked-by",
        "status": "closed",
        "tracker_native_status": "CLOSED"
      },
      {
        "id": "https://gitlab.example.com/group/component/-/issues/27",
        "relationship": "relates-to",
        "status": "open",
        "tracker_native_status": "opened"
      }
    ]
  }
}
```

An upstream issue being closed or merged does not resolve the local finding.
The correction must be released, adopted downstream, and verified against the
original user task.

Do not overwrite the local tracker status with an upstream status. Update each
tracker relationship independently.

## 10. Synchronize State Conservatively

Tracker state and finding lifecycle answer different questions.

| Tracker event | Safe canonical update | Unsafe inference |
| --- | --- | --- |
| Item created | Add tracker URL and native open status | Finding is confirmed or remediation-ready |
| Label, field, assignee, sprint, or milestone changed | Update adapter or project-workflow metadata | Severity, evidence status, or obligation changed |
| Pull or merge request merged | Record related change and native state | Barrier is resolved |
| Item closed or Jira status becomes Done | Record `status: closed` and exact native status | `tracking.lifecycle.status: resolved` |
| Controlled retest does not observe the result | Record comparable-run evidence and consider `not_observed` | Resolved without verification |
| Verification passes for the claimed scope | Set lifecycle to `resolved` with basis and verification reference | Universal conformance |
| Item reopened or the finding recurs | Record native status and assess `recurring` or `needs_review` | Automatically restore old severity or root cause |
| Item moved or copied | Preserve old URL and add the new tracker relationship | Replace historical references in place |

Automation should queue verification when an item closes. It should not silently
promote closure to verified resolution.

## 11. Build Idempotent Automation

An API, webhook, scheduled synchronizer, or agent should follow this order:

1. validate the canonical finding record;
2. confirm the finding is ready for the intended queue;
3. search adapter state for an existing tracker relationship;
4. use a full fingerprint only as a candidate-correlation key when one exists;
5. require triage when grouping or root cause is ambiguous;
6. create or update the work item using the platform's current API;
7. capture the returned URL and platform-native IDs;
8. write the tracker relationship back to the finding record;
9. store the synchronization timestamp, adapter version, and last observed
   native status; and
10. retry safely without creating a duplicate item.

Use an explicit idempotency record, not a title search alone. A practical
adapter record may contain:

```json
{
  "adapter_version": "a11y-tracker-adapter/v1",
  "finding_record_id": "https://findings.example.test/records/93f44d9a",
  "tracker_url": "https://gitlab.example.com/group/product/-/issues/91",
  "platform": "gitlab",
  "platform_ids": {
    "project_id": 44,
    "issue_id": 8012,
    "issue_iid": 91
  },
  "last_synchronized_at": "2026-08-04T17:15:00Z"
}
```

This adapter record is not a fingerprint profile and is not part of the core
finding schema unless a project deliberately stores it in a namespaced
extension.

### 11.1 Conflict handling

Define which system owns each field:

- the tracker normally owns assignee, sprint, milestone, due date, local
  priority, and native workflow status;
- the canonical finding record owns fingerprints, finding lifecycle, evidence
  status, obligation, and evidence references; and
- human review owns severity, root cause, suppression, and verified resolution.

Do not implement unrestricted two-way synchronization. It creates loops and
allows an editable issue body or label to overwrite reviewed canonical data.
Log conflicts and route them for review.

## 12. Evidence Security and Accessibility

Before attaching evidence, account for platform differences:

- a public GitHub repository does not make an ordinary issue confidential;
- GitLab supports confidential issues, but access must still be verified;
- Jira issue security and project permissions vary by configuration;
- copied or moved issues can change who can access their content;
- attachments may outlive comments or be copied during migration; and
- webhook payloads and automation logs can reproduce private issue content.

Prefer a protected evidence store with a stable, access-controlled reference
when an issue tracker cannot provide the necessary confidentiality, retention,
or file-size controls. Store a redacted human-readable explanation in the work
item so the task remains understandable without exposing the original
artifact.

Keep screenshots described, recordings captioned or transcribed, and evidence
links meaningful. Do not make a visual attachment the only explanation of a
semantic failure.

## 13. Migration Between Trackers

When moving work from GitHub to GitLab, Jira to GitHub, or another combination:

1. keep the old tracker URL in `tracking.tracker_ids`;
2. add the new tracker URL as a separate relationship;
3. state whether the old item is `superseded-by`, `duplicates`, or merely
   `relates-to` the new item;
4. preserve original evidence links and dates;
5. preserve full fingerprints and legacy identifiers unchanged;
6. record which comments or attachments were not migrated;
7. update adapter state with both platforms' native IDs; and
8. verify access controls after the migration.

Do not rewrite historical reports merely to replace the old tracker URL.

## 14. Implementation Checklist

### Shared policy

- [ ] The finding schema is the portable interchange format.
- [ ] A valid report can exist without technical evidence or a tracker ID.
- [ ] Tracker URLs, fingerprints, scan IDs, and tool refs remain distinct.
- [ ] Severity, priority, evidence status, obligation, handling, lifecycle, and
      native tracker status remain separate.
- [ ] Closing a work item queues verification rather than proving resolution.
- [ ] Local and upstream tracker relationships can coexist.

### Platform setup

- [ ] GitHub retains both general and technical report paths.
- [ ] GitHub form labels exist before deployment.
- [ ] GitLab templates are on the default branch in the documented directory.
- [ ] GitLab quick actions use existing labels and permitted actions.
- [ ] Jira fields are present in the applicable scheme, context, create screen,
      view layout, and transition screen.
- [ ] Jira Priority is not used as accessibility severity.
- [ ] Jira API integrations transform rich text to Atlassian Document Format.

### Automation

- [ ] Create and update operations are idempotent.
- [ ] Returned tracker URLs and native IDs are written back to adapter state.
- [ ] Full fingerprints are preserved without truncation.
- [ ] Webhook loops and conflicting edits are detected.
- [ ] Automation uses least-privilege credentials and records its actor.
- [ ] Sensitive evidence is excluded from logs and webhook archives.
- [ ] Verification evidence is required before canonical resolution.

## 15. Primary References

### GitHub

- [GitHub Issue Form syntax](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms)
- [Configuring GitHub issue templates](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository)
- [GitHub REST API for issues](https://docs.github.com/en/rest/issues)

### GitLab

- [GitLab description templates](https://docs.gitlab.com/user/project/description_templates/)
- [GitLab quick actions](https://docs.gitlab.com/user/project/quick_actions/)
- [GitLab issue management](https://docs.gitlab.com/user/project/issues/managing_issues/)
- [GitLab Issues API](https://docs.gitlab.com/api/issues/)
- [GitLab Issue Links API](https://docs.gitlab.com/api/issue_links/)

### Jira Cloud

- [Jira form fields](https://support.atlassian.com/jira-software-cloud/docs/manage-your-form-fields/)
- [Jira work-item screens](https://support.atlassian.com/jira-cloud-administration/docs/what-are-screens-in-jira/)
- [Jira custom fields](https://support.atlassian.com/jira-cloud-administration/docs/configure-issue-custom-fields/)
- [Jira Cloud Issues REST API](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issues/)
- [Jira Cloud Issue Properties REST API](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-properties/)
- [Jira Cloud Issue Links REST API](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-links/)
- [Jira issue numeric IDs and keys](https://support.atlassian.com/jira/kb/how-to-get-issue-id-from-the-jira-user-interface/)

---

This document is available under the repository's [MIT License](../LICENSE).
