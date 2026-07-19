---
title: ARIA Live Regions Best Practices
---

# ARIA Live Regions Best Practices

## Purpose

ARIA live regions can make dynamic status information available to screen
reader users without moving keyboard focus. They are useful for concise
updates such as a search result count, a saved confirmation, or progress
information.

Live regions are not a general notification system. They do not replace
visible content, native HTML, focus management, or the programmatic state of a
control. Poorly timed or excessive announcements can be missed, duplicated,
reordered, or disruptive.

This guide covers status messages, alerts, logs, update timing, common
implementation patterns, and testing.

## Core Principles

1. Make important information visible to everyone.
2. Use native HTML and programmatic control state before adding a live region.
3. Use `role="status"` for most advisory status updates.
4. Reserve `role="alert"` for important, usually time-sensitive information.
5. Use an alert dialog when the user must stop and respond.
6. Keep the announcement short, specific, and related to the user's action.
7. Update a stable region after it has been exposed to accessibility APIs.
8. Reduce, combine, or cancel rapid and stale updates.
9. Do not assume an announcement will be delivered in the same way by every
   browser and assistive technology.
10. Test the complete interaction with supported browser and assistive
    technology combinations.

## What WCAG 4.1.3 Requires

[WCAG 2.2 Success Criterion 4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html)
requires existing status messages to be programmatically determinable through
role or properties so assistive technologies can present them without moving
focus.

A status message provides information about:

- the success or result of an action;
- a waiting state;
- the progress of a process; or
- the existence of errors.

The criterion does not require a site to create a new status message for every
dynamic change. The updated result list is content, while a message such as
"18 results found" is a status message. A dialog that receives focus is a
change of context, not a status message.

## Choose the Appropriate Mechanism

| Situation | Primary mechanism |
|---|---|
| A button expands or collapses content | Keep focus on the button and update `aria-expanded` |
| A tab changes panels | Use the tabs pattern and its selected state |
| A modal dialog opens | Move focus into the dialog and manage modal focus |
| A single-page application changes route | Update the document title and move focus to a logical heading or main region |
| A form submission reveals several errors | Show an error summary and move focus to it when appropriate; associate each error with its field |
| A save, cart, filter, or search action completes | Use a concise visible `role="status"` message |
| An important time-sensitive condition occurs | Use a visible `role="alert"` message |
| A condition requires an immediate decision | Open an alert dialog and move focus into it |
| New entries are appended to an ordered history | Use `role="log"` when that semantic matches the content |

Live regions can supplement focus management, but they should not announce a
focus change that already provides the same information.

## Live Region Roles and Properties

### `role="status"`

Use `status` for advisory information that does not require immediate action.
It has implicit `aria-live="polite"` and `aria-atomic="true"` values. Do not
move focus to a status merely because its content changed.

```html
<p id="cart-status" role="status"></p>
```

Do not add redundant explicit values unless a project convention or verified
compatibility need justifies them.

### `role="alert"`

Use `alert` for important, usually time-sensitive information. It has implicit
`aria-live="assertive"` and `aria-atomic="true"` values. An alert does not
receive focus and should not require a response to dismiss it.

```html
<p id="connection-alert" role="alert"></p>
```

Update the alert when an important condition occurs. Dynamically rendered
alerts often receive special handling, but announcement behavior still varies.
Do not use an alert for routine validation, success confirmations, or every
field error.

If the user must stop and make a decision, use the
[ARIA Authoring Practices Guide alert dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/)
with the modal dialog keyboard pattern.

### `role="log"`

Use `log` for an ordered sequence in which new information is added, such as a
chat history or activity log. It has implicit `aria-live="polite"`. Give the
log an accessible name and keep each entry understandable on its own.

```html
<section aria-labelledby="activity-heading">
  <h2 id="activity-heading">Recent activity</h2>
  <div role="log" aria-relevant="additions" aria-atomic="false">
    <p>Jordan uploaded quarterly-report.pdf.</p>
  </div>
</section>
```

### `aria-live`

Use `aria-live` when no suitable live-region role describes the content.

| Value | Meaning |
|---|---|
| `off` | Updates are normally not presented unless focus is within the region. This is the default. |
| `polite` | Present the update at the next graceful opportunity. |
| `assertive` | Give the update the highest priority. Use only when interruption is imperative. |

`assertive` indicates priority, but it does not guarantee that every assistive
technology will interrupt speech immediately. Its actual behavior depends on
the product, settings, interaction mode, and other queued output.

### `aria-atomic`

`aria-atomic` controls whether an assistive technology may present the entire
region or only the changed content.

- The default is `false`.
- Use `true` when the complete phrase provides necessary context, such as
  "3 items in cart".
- Use `false` when each addition is independently meaningful, such as a new
  entry in a log.
- `status` and `alert` have an implicit value of `true`.

When `aria-atomic="true"`, the accessible name or label associated with the
region may also be presented. Test the resulting phrase, not just the text
node that changed.

### `aria-relevant`

`aria-relevant` identifies which types of changes are relevant. Its default is
`additions text`, not only `additions`.

| Value | Relevant change |
|---|---|
| `additions` | Nodes added to the region |
| `removals` | Nodes removed from the region |
| `text` | Text added to a node |
| `all` | Additions, removals, and text changes |

These values are suggestions to assistive technologies, not delivery
guarantees. Use `removals` and `all` sparingly. Do not rely on removal
announcements for critical information.

### `aria-busy`

Set `aria-busy="true"` on a region while it is receiving a batch of related
updates, then reset it to `false` when the update is complete. Assistive
technologies may defer processing until the region is no longer busy.

```js
results.setAttribute('aria-busy', 'true');
renderResults(items);
results.setAttribute('aria-busy', 'false');
```

Always reset the value, including after an error. Do not use `aria-busy` as the
only indication that loading is taking place. Provide visible status or
progress information when it is useful.

## Update Timing

Live-region behavior depends on accessibility APIs observing the region before
the relevant content change. Adding a live region and its completed message in
the same DOM operation may be missed.

The region does not have to exist on the initial page load. In a component or
single-page application, it can be mounted before a later update. The useful
rule is:

> Expose a stable live region first, then update its content in response to a
> later event.

Do not rely on ordinary live-region content being announced merely because it
was present when the page loaded. If users must understand information on
load, place it visibly in the document's reading order.

`role="alert"` has special processing in many implementations, so dynamically
rendered alert content may be announced. This does not make `alert` equivalent
to adding `aria-live="assertive"` to any newly created element, and it does not
make initial page-load alerts reliable.

### Avoid fixed-delay workarounds

No standard defines a reliable 50 millisecond, 100 millisecond, or other fixed
delay for live regions. Clearing a region and reinserting the same text after
a timeout can produce missed, duplicate, stale, or reordered output.

Prefer these practices:

- keep a stable announcement node;
- update it after the component has mounted;
- let the framework render the message from state;
- announce only the final meaningful result of a rapid sequence;
- suppress responses from stale asynchronous requests; and
- use a tested application announcer abstraction when many components need to
  report status.

If a user genuinely performs the same action twice, the visible interface
should still reflect both outcomes. Test repeated identical outcomes in the
supported environment. Do not add an arbitrary delay as a universal fix.

## Visibility and Content Scope

Prefer visible status messages. They also help people who use magnification,
have cognitive or learning disabilities, or do not notice a change elsewhere
on the page.

Use a visually hidden live region only when:

- equivalent visible information already exists and a nonvisual supplement is
  necessary; or
- a concise announcement is needed to describe a complex visible update.

Do not duplicate the same message in a visible live region and a separate
hidden live region. This can lead to repeated announcements.

Do not apply `hidden`, `display: none`, `visibility: hidden`, or
`aria-hidden="true"` to a live region while it is expected to announce. Avoid
rules such as `.status:empty { display: none; }` when the empty region needs to
remain exposed before its next update.

When a hidden region is justified, use a robust visually hidden utility:

```css
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}
```

Keep the live region narrow. Announce the short status, not an entire results
container, form, table, or page section. Avoid nested live regions and avoid
placing a `role="alert"` inside another live region.

Interactive controls generally do not belong inside a live region. If a toast
contains an action, make that action persist long enough to find and operate,
and give the overall interaction an appropriate focus strategy.

## Implementation Patterns

### Visible status after an action

```html
<button type="button" id="add-to-cart">Add notebook to cart</button>
<p id="cart-status" role="status"></p>
```

```js
const addButton = document.getElementById('add-to-cart');
const cartStatus = document.getElementById('cart-status');

addButton.addEventListener('click', () => {
  addProduct('Notebook');
  cartStatus.textContent = 'Notebook added to cart. 3 items in cart.';
});
```

The status is visible, concise, and updated after the action. Keyboard focus
stays on the button.

### Search results and stale requests

```html
<form id="search-form" role="search">
  <label for="search-query">Search products</label>
  <input id="search-query" name="query" type="search">
  <button type="submit">Search</button>
</form>

<p id="result-status" role="status"></p>
<div id="search-results" aria-busy="false"></div>
```

```js
const searchForm = document.getElementById('search-form');
const resultStatus = document.getElementById('result-status');
const results = document.getElementById('search-results');
let requestSequence = 0;

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const sequence = ++requestSequence;
  const query = new FormData(searchForm).get('query').trim();
  results.setAttribute('aria-busy', 'true');
  resultStatus.textContent = `Searching for ${query}.`;

  try {
    const items = await searchProducts(query);

    if (sequence !== requestSequence) {
      return;
    }

    renderSearchResults(results, items);
    resultStatus.textContent =
      `${items.length} results found for ${query}.`;
  } catch (error) {
    if (sequence === requestSequence) {
      resultStatus.textContent = 'Search could not be completed. Try again.';
    }
  } finally {
    if (sequence === requestSequence) {
      results.setAttribute('aria-busy', 'false');
    }
  }
});
```

Escape or render untrusted result data safely. Consider delaying the visible
"Searching" message until it is useful so fast operations do not announce
both loading and completion in immediate succession.

### Character count without announcing every keystroke

The visual count can update continuously. A separate hidden status announces
only meaningful thresholds.

```html
<label for="summary">Summary</label>
<textarea id="summary" maxlength="280"
          aria-describedby="summary-help summary-count"></textarea>
<p id="summary-help">Maximum 280 characters.</p>
<p id="summary-count"><span id="remaining-count">280</span> characters remaining</p>
<p id="count-status" role="status" class="visually-hidden"></p>
```

```js
const summary = document.getElementById('summary');
const remainingCount = document.getElementById('remaining-count');
const countStatus = document.getElementById('count-status');
const thresholds = new Set([100, 50, 20, 10, 0]);
let lastAnnounced = null;

summary.addEventListener('input', () => {
  const remaining = summary.maxLength - summary.value.length;
  remainingCount.textContent = remaining;

  if (thresholds.has(remaining) && remaining !== lastAnnounced) {
    countStatus.textContent = `${remaining} characters remaining.`;
    lastAnnounced = remaining;
  }
});
```

The field's programmatic maximum still comes from `maxlength`. The status does
not repeat every visible count change.

### Form errors

For a failed submission with several errors, show a visible summary and move
focus to it. This is a focus-management pattern, so a live region is not
required for the summary itself.

```html
<div id="error-summary" tabindex="-1" hidden>
  <h2>There is a problem</h2>
  <ul>
    <li><a href="#email">Enter an email address.</a></li>
  </ul>
</div>

<label for="email">Email address</label>
<input id="email" name="email" type="email"
       aria-invalid="true" aria-describedby="email-error">
<p id="email-error">Enter an email address.</p>
```

```js
const errorSummary = document.getElementById('error-summary');

errorSummary.hidden = false;
errorSummary.focus();
```

Associate each error with its field. Do not add `role="alert"` to every field
error while the user is typing. For a single asynchronous field check, a
concise nearby `role="status"` may be appropriate if it does not duplicate
information already presented through focus.

### Activity feed or chat log

```html
<section aria-labelledby="chat-heading">
  <h2 id="chat-heading">Support chat</h2>
  <div id="chat-log" role="log" aria-relevant="additions"
       aria-atomic="false">
  </div>
</section>
```

```js
function appendChatMessage(author, message) {
  const entry = document.createElement('p');
  const name = document.createElement('strong');

  name.textContent = `${author}: `;
  entry.append(name, document.createTextNode(message));
  document.getElementById('chat-log').append(entry);
}
```

Provide user controls to pause, reduce, or mute announcements when updates are
frequent. Do not force focus to each new message. Preserve a way for keyboard
and screen reader users to review the complete log.

### Progress

Use a native `<progress>` element when it represents the task. Announce
meaningful milestones or completion, not every percentage change.

```html
<label for="upload-progress">Uploading quarterly report</label>
<progress id="upload-progress" max="100" value="0">0%</progress>
<p id="upload-status" role="status"></p>
```

```js
function updateUpload(percent) {
  const progress = document.getElementById('upload-progress');
  const status = document.getElementById('upload-status');

  progress.value = percent;
  progress.textContent = `${percent}%`;

  if (percent === 50) {
    status.textContent = 'Upload halfway complete.';
  }

  if (percent === 100) {
    status.textContent = 'Quarterly report uploaded.';
  }
}
```

### Session timeout that requires a response

A session warning that requires the user to extend or end the session is an
interaction, not only an announcement. Use an alert dialog with:

- `role="alertdialog"`;
- `aria-modal="true"`;
- an accessible name and description;
- initial focus inside the dialog;
- keyboard containment while modal; and
- focus returned to a logical element after it closes.

Follow [WCAG 2.2.1 Timing Adjustable](https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html)
for the timeout itself. An assertive announcement alone does not make a timed
interaction accessible.

## Managing Multiple Updates

Rapid live-region updates can overwhelm the speech queue and hide the outcome
the user needs. Apply these controls:

- Announce the result of an explicit user action before background activity.
- Debounce filter or search announcements triggered by typing.
- Combine related updates into one useful sentence.
- Cancel or ignore stale asynchronous responses.
- Do not announce scroll, pointer movement, animation frames, or every clock
  tick.
- Avoid announcing a loading state when completion is effectively immediate.
- Provide pause or mute controls for persistent streams such as chat, sports,
  auctions, or monitoring dashboards.
- Avoid simultaneous `status` and `alert` messages for the same event.

Content should answer what happened and, when necessary, what the user can do
next. Avoid prefixes such as "Notification" or "Status" when the role already
provides that context and the extra words add no value.

## Framework and Component Guidance

The framework does not determine accessibility. The DOM and accessibility tree
produced at runtime do.

- Place a stable announcer near the application root when many components need
  one.
- Render announcement content through framework state.
- Do not directly mutate a node that the framework also manages.
- Ensure the announcer has mounted before a later state change updates it.
- Prevent nested application roots, portals, or duplicate layouts from
  creating several active announcers.
- Treat hydration, route transitions, and component remounting as timing
  boundaries that may reset the region.
- Coalesce state updates so intermediate text is not announced.
- Test repeated actions and concurrent requests in the built application.

A framework utility can coordinate priority, deduplication, and stale request
handling, but it still requires manual testing with supported assistive
technologies.

## Testing

### Static inspection

Check that:

- the chosen role matches the message's purpose;
- implicit role properties are not contradicted by explicit properties;
- the region is exposed before the update it must report;
- the region is not hidden from the accessibility tree during the update;
- the status text is short and does not wrap a large changing container;
- live regions are not nested;
- duplicate announcers are not mounted;
- `aria-busy` returns to `false` after success and failure; and
- controls use their own names, roles, states, and focus behavior.

### Manual interaction testing

Test the supported operating system, browser, and assistive technology
combinations. Record their versions, relevant verbosity settings, and the
assistive technology interaction mode.

For each important flow:

1. Start reading content away from the update.
2. Initiate the action with the keyboard.
3. Confirm that the message is visible when it should be.
4. Confirm that a polite message does not needlessly interrupt other speech.
5. Confirm that an alert is reserved for an important condition.
6. Trigger rapid updates and verify that only the useful result is presented.
7. Repeat the same action and verify the second outcome.
8. Trigger overlapping requests and confirm that stale results are not
   announced.
9. Confirm that focus remains logical and is not moved by a status update.
10. Navigate back to the updated content and verify that it remains
    understandable outside the announcement.

Announcement content, timing, interruption, ordering, and duplication require
manual testing. Automated tools cannot prove that a live-region experience is
usable.

### Automated checks

Automation can help detect:

- invalid ARIA values;
- conflicting explicit and implicit properties;
- live regions hidden with `aria-hidden="true"`;
- nested live regions;
- duplicate IDs or announcer instances; and
- components that leave `aria-busy="true"` after tests complete.

Add component and integration tests that assert the final DOM message after a
user action, including error and stale-request paths. Do not treat a passing
DOM assertion as proof that an assistive technology announced it correctly.

## Common Failures

| Failure | Correction |
|---|---|
| Adding a new live-region element and its message in one operation | Expose a stable region, then update it after a later event |
| Requiring the region to exist on the initial page load | Require it to be exposed before the relevant update, including in mounted components |
| Clearing and reinserting text after a fixed delay | Remove the universal timeout; update stable state and test repeated outcomes |
| Using `assertive` for ordinary confirmations | Use `role="status"` |
| Expecting `assertive` to guarantee immediate interruption | Treat it as priority and test actual supported combinations |
| Putting `role="alert"` on every field error | Use an error summary, field associations, and appropriate focus management |
| Moving focus to content when an accordion opens | Keep focus on the disclosure control and update `aria-expanded` |
| Announcing an entire result list | Announce a concise result summary |
| Hiding an empty region with `display: none` | Keep the stable region exposed when a later update must be announced |
| Announcing every character, percentage, or second | Announce meaningful thresholds and completion |
| Leaving `aria-busy="true"` after an exception | Reset it in every completion path |
| Duplicating visible and hidden live messages | Use one status message or a tested nonduplicating design |
| Assuming one browser and screen reader represents all users | Test documented supported combinations and record results |

## Definition of Done

- [ ] Each message has been classified as control state, status, alert, log,
  dialog content, or focused content.
- [ ] Visible information is provided wherever practical.
- [ ] `role="status"` is used for advisory updates.
- [ ] `role="alert"` is limited to important, usually time-sensitive updates.
- [ ] An alert dialog and focus management are used when a response is
  required.
- [ ] The live region is exposed before the relevant content update.
- [ ] No initial page-load or fixed-delay announcement guarantee is assumed.
- [ ] `aria-atomic`, `aria-relevant`, and `aria-busy` are used only when their
  behavior matches the update.
- [ ] The default `aria-relevant` value is understood as `additions text`.
- [ ] The region is not hidden from the accessibility tree during an update.
- [ ] Large containers and interactive controls are not used as live regions.
- [ ] Rapid, duplicate, and stale updates are reduced or suppressed.
- [ ] Focus management remains correct with announcements enabled or missed.
- [ ] Success, error, loading, repeated-action, and overlapping-request paths
  have been tested.
- [ ] Supported browser and assistive technology combinations have been tested
  manually and their versions recorded.
- [ ] Automated checks supplement, but do not replace, manual announcement
  testing.

## Related WCAG Criteria

- [4.1.3 Status Messages (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html)
- [4.1.2 Name, Role, Value (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html)
- [3.3.1 Error Identification (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html)
- [3.3.3 Error Suggestion (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion.html)
- [2.4.3 Focus Order (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html)
- [2.2.1 Timing Adjustable (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html)

## Related Guides

- [Forms Accessibility Best Practices](./FORMS_ACCESSIBILITY_BEST_PRACTICES.md)
- [Keyboard Accessibility Best Practices](./KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md)
- [Navigation Accessibility Best Practices](./NAVIGATION_ACCESSIBILITY_BEST_PRACTICES.md)
- [Accessibility Bug Reporting Best Practices](./ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES.md)

Use the project's bug-reporting process to assign severity and priority. This
guide does not define a universal severity scale.

## References

- [WAI-ARIA 1.2: Live Region Attributes](https://www.w3.org/TR/wai-aria-1.2/#attrs_liveregions)
- [WAI-ARIA 1.2: `aria-live`](https://www.w3.org/TR/wai-aria-1.2/#aria-live)
- [WAI-ARIA 1.2: `aria-atomic`](https://www.w3.org/TR/wai-aria-1.2/#aria-atomic)
- [WAI-ARIA 1.2: `aria-relevant`](https://www.w3.org/TR/wai-aria-1.2/#aria-relevant)
- [WAI-ARIA 1.2: `aria-busy`](https://www.w3.org/TR/wai-aria-1.2/#aria-busy)
- [WAI-ARIA 1.2: `status` role](https://www.w3.org/TR/wai-aria-1.2/#status)
- [WAI-ARIA 1.2: `alert` role](https://www.w3.org/TR/wai-aria-1.2/#alert)
- [WAI-ARIA 1.2: `log` role](https://www.w3.org/TR/wai-aria-1.2/#log)
- [WCAG 2.2 Understanding Success Criterion 4.1.3: Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html)
- [ARIA Authoring Practices Guide: Alert Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alert/)
- [ARIA Authoring Practices Guide: Alert Dialog Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/)
- [WAI Forms Tutorial: User Notifications](https://www.w3.org/WAI/tutorials/forms/notifications/)
- [Technique ARIA22: Using `role=status`](https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA22)
- [Technique ARIA19: Using ARIA role=alert or Live Regions to Identify Errors](https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA19)
- [Technique ARIA23: Using `role=log`](https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA23)
- [Technique ARIA25: Using `role=status` for Status Updates](https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA25)

### Machine-Readable Standards

For AI systems and automated tooling, see
[wai-yaml-ld](https://github.com/mgifford/wai-yaml-ld) for structured
accessibility standards:

- [WCAG 2.2 (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wcag-2.2-normative.yaml)
- [ARIA Informative (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wai-aria-informative.yaml)
- [Standards Link Graph (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/standards-link-graph.yaml)

---

This document is available under the repository's [MIT License](../LICENSE).
