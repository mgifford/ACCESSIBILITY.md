---
title: Speech Recognition Accessibility Best Practices
---

# Speech Recognition Accessibility Best Practices

Speech recognition can be used to dictate text, navigate interfaces, activate controls, emulate keyboard input, and operate a pointer. This guide explains how to make web content compatible with speech input and voice control without depending on product-specific commands.

Speech recognition is not the same as speaker recognition. Speech recognition interprets words and commands. Speaker recognition attempts to identify who is speaking.

## 1. Core Principles

1. **Use visible, persistent labels.** People should be able to determine what to say without guessing a hidden name.
2. **Match visible labels and accessible names.** If a control has a visible text label, its accessible name must contain that text. Matching exactly is usually simplest.
3. **Use native semantics.** Correct HTML names, roles, states, values, and keyboard behavior give speech tools reliable information.
4. **Support more than direct label activation.** Keyboard emulation, role and name overlays, number overlays, and pointer emulation vary by product.
5. **Do not require fine pointer control.** Provide alternatives to dragging, path gestures, and precise spatial interaction.
6. **Accept input from more than key events.** Dictation, paste, autocomplete, and assistive technologies may change a field without firing the keystrokes a developer expects.
7. **Provide clear feedback.** After an action, expose changed state, errors, confirmations, and results visually and programmatically.
8. **Test the supported environments.** Commands, name matching, overlays, browsers, languages, and product behavior change across platforms and versions.

## 2. Who Uses Speech Input

Speech input may be used by:

- people with limited movement, strength, dexterity, reach, or endurance;
- people with repetitive strain injuries, pain, tremors, or fatigue;
- people who use speech instead of, or together with, a keyboard or pointer;
- people with cognitive or learning disabilities who find dictation easier than typing;
- people with temporary injuries or situational limitations;
- people combining speech input with a screen reader, magnifier, switch, or other assistive technology.

Speech users are not necessarily sighted. Do not design or test on the assumption that everyone using speech can see a label, overlay, pointer, focus indicator, or visual result.

The [W3C WAI Speech Recognition perspective](https://www.w3.org/WAI/perspective-videos/voice/) explains that speech recognition can support both dictation and interface control, and that keyboard compatibility is an important foundation.

## 3. Visible Labels and Accessible Names

The **visible label** is the text a person sees next to or inside a control. The **accessible name** is the programmatically determined name exposed to accessibility APIs.

For a user interface component with visible text or an image of text, [WCAG 2.2 Success Criterion 2.5.3](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html) requires the accessible name to contain the visible text. Having the visible text at the start of the accessible name is a documented best practice, not an additional normative requirement.

### 3.1 Prefer native text as the name

```html
<button type="submit">Save</button>
```

The visible label and accessible name are both `Save`. There is no separate value to synchronize or translate.

### 3.2 Do not override a correct visible name

```html
<!-- Wrong: the accessible name is "Confirm changes", not "Save". -->
<button type="submit" aria-label="Confirm changes">Save</button>

<!-- Better: use the visible text. -->
<button type="submit">Save</button>

<!-- Acceptable when extra context is genuinely needed. -->
<button type="submit" aria-label="Save document">Save</button>
```

`aria-label` and `aria-labelledby` can override names derived from child content and native labels. Inspect the computed accessible name instead of assuming that every labeling source is combined.

### 3.3 Use explicit form labels

```html
<label for="email">Email address</label>
<input id="email" name="email" type="email" autocomplete="email">
```

Do not use placeholder text as the only label. Placeholder text can disappear during dictation, may not remain visible, and is not a substitute for a programmatically associated label.

### 3.4 Keep the visible words intact and in order

The visible text should appear as a contiguous part of the accessible name, in the same order. Capitalization and most punctuation differences do not normally change conformance, but matching the rendered label exactly is easier to maintain and test.

```html
<!-- Good: visible label starts the accessible name. -->
<button>
  Delete <span class="visually-hidden">quarterly report</span>
</button>

<!-- Avoid: hidden words interrupt the visible label. -->
<button aria-label="Delete the quarterly report permanently">
  Delete report
</button>
```

The second example contains `Delete` and `report`, but inserts other words between them. Some speech tools may not match the phrase a user sees.

### 3.5 Hidden context usually follows the visible label

```html
<a href="/products/widget/edit">
  Edit <span class="visually-hidden">Widget product</span>
</a>
```

This produces an accessible name such as `Edit Widget product` while preserving the visible word `Edit` at the start.

A hidden prefix is not automatically a WCAG 2.5.3 failure if the visible text still appears intact in the accessible name. It can still make direct label activation harder. Prefer not to put hidden words before the text a person sees.

### 3.6 Put supplemental instructions in the description

Not every instruction belongs in the accessible name. Use visible instructions and an accessible description for format help, constraints, or explanatory context:

```html
<label for="start-date">Start date</label>
<input
  id="start-date"
  name="start-date"
  aria-describedby="start-date-format">
<p id="start-date-format">Use year, month, and day, for example 2026-07-18.</p>
```

The name remains `Start date`. The format is available without turning it into part of the command phrase.

## 4. Repeated Controls and Ambiguous Labels

Repeated labels such as `Edit`, `Delete`, or `Read more` may cause a speech tool to present several matches. That is not automatically a conformance failure, but it increases effort and ambiguity.

Prefer specific visible labels when they remain concise:

```html
<a href="/services">Read about services</a>
<a href="/products">Read about products</a>
```

When a compact repeated action is necessary, add contextual text after the visible action:

```html
<ul>
  <li>
    Billing address
    <a href="/account/billing/edit">
      Edit <span class="visually-hidden">billing address</span>
    </a>
  </li>
  <li>
    Shipping address
    <a href="/account/shipping/edit">
      Edit <span class="visually-hidden">shipping address</span>
    </a>
  </li>
</ul>
```

Test whether the supported speech tool allows the person to say the full unique name and whether its overlay presents repeated matches clearly.

Do not make accessible names unique by replacing or reordering the visible label. `Modify billing address` is not a good hidden name for a visible `Edit` link.

## 5. Icon-Only Controls

An icon-only control still needs an accessible name under WCAG 4.1.2. WCAG 2.5.3 does not apply when there is no visible text label that expresses something in human language.

```html
<button type="button" aria-label="Close dialog">
  <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
    <path d="M6 6 18 18M18 6 6 18"></path>
  </svg>
</button>
```

Persistent visible text is usually more discoverable:

```html
<button type="button">
  <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
    <path d="M6 6 18 18M18 6 6 18"></path>
  </svg>
  <span>Close</span>
</button>
```

A tooltip that appears only after hover or focus is not a persistent visible label. It may help explain an icon, but a person must first discover or target the control. If an icon-only design is retained:

- use a concise, localized accessible name;
- use a familiar icon consistently;
- provide adequate target size and spacing;
- ensure name or number overlays identify it;
- do not use color or position as the only way to describe it;
- test it with the supported speech input tools.

For image-based controls, see [Image Alt Text Accessibility Best Practices](./IMAGE_ALT_TEXT_ACCESSIBILITY_BEST_PRACTICES.md).

## 6. Native Semantics and Keyboard Operation

Speech tools often use accessibility APIs, keyboard emulation, or pointer emulation. Native HTML supplies reliable role, name, state, value, focus, and activation behavior.

```html
<!-- Wrong: not a reliable button. -->
<div class="button" onclick="saveDocument()">Save</div>

<!-- Correct: native semantics and keyboard behavior. -->
<button type="button" onclick="saveDocument()">Save</button>
```

Do not publish tables that claim a particular spoken phrase will always work for every role. Role commands and grammar differ by speech product, platform, locale, and version. Correct semantics still improve compatibility and remain required for other assistive technologies.

All functionality must be available through a keyboard interface unless the underlying function requires path-dependent input. Speech software can use that keyboard interface as one method of operation.

For custom widgets:

- use the correct role only when no suitable native element exists;
- implement the expected keyboard interaction;
- expose the accessible name, state, properties, and current value;
- update programmatic state when the visual state changes;
- keep focus predictable;
- follow an established pattern from the [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/).

See [Keyboard Accessibility Best Practices](./KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md).

## 7. Dictation and Text Entry

Speech dictation may insert, replace, or delete text without producing the same `keydown` sequence as a physical keyboard. Code must respond to changes in the value, not only to keys.

```javascript
const search = document.querySelector('#site-search');

search.addEventListener('input', () => {
  updateSuggestions(search.value);
});
```

Avoid relying only on this pattern:

```javascript
// Wrong: dictation, paste, autocomplete, and other input may bypass this logic.
const search = document.querySelector('#site-search');

search.addEventListener('keydown', event => {
  updateSuggestions(event.key);
});
```

Text-entry controls should:

- use native inputs and textareas where possible;
- have persistent visible labels;
- expose format instructions and errors programmatically;
- accept paste, dictation, autocomplete, and programmatic value changes;
- allow editing and correction before submission;
- avoid short time limits or speech-rate assumptions;
- not require a particular punctuation phrase when another valid value can be accepted;
- preserve entered content after validation errors;
- use appropriate `autocomplete`, `inputmode`, and input types without blocking valid alternatives.

Do not infer that a lack of `keydown` means no user input occurred. Validate the current value at the appropriate event and again at submission.

## 8. Dragging, Gestures, and Spatial Interaction

Dragging with a speech-controlled pointer can require several commands and precise timing. Provide a direct alternative.

### 8.1 Reordering

```html
<ul>
  <li>
    Budget report
    <button type="button">
      Move up <span class="visually-hidden">Budget report</span>
    </button>
    <button type="button">
      Move down <span class="visually-hidden">Budget report</span>
    </button>
  </li>
</ul>
```

If drag and drop is also available, both methods should update the same model, expose the new position, and provide confirmation.

### 8.2 Sliders and visual controls

Pair a draggable control with a direct entry or step control when practical:

```html
<label for="volume">Volume</label>
<input id="volume" name="volume" type="range" min="0" max="100" value="50">

<label for="volume-value">Volume percentage</label>
<input id="volume-value" name="volume-value" type="number" min="0" max="100" value="50">
```

Keep the values synchronized and announce relevant validation errors.

[WCAG 2.2 Success Criterion 2.5.7](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html) requires author-created dragging functionality to have a single-pointer alternative unless dragging is essential. Keyboard accessibility is a separate requirement. A keyboard-only alternative does not necessarily satisfy the single-pointer requirement.

Path-based or multipoint gestures also need a single-pointer alternative under [WCAG 2.2 Success Criterion 2.5.1](https://www.w3.org/WAI/WCAG22/Understanding/pointer-gestures.html), unless the gesture is essential.

## 9. Focus, Scrolling, and Overlays

Some speech users emulate keyboard commands or combine speech with another input method. Focus order, focus visibility, and unobscured controls remain important.

Sticky headers, cookie notices, chat launchers, and non-modal panels must not hide a focused component. WCAG 2.4.11 requires a component receiving keyboard focus not to be entirely hidden by author-created content.

```css
html {
  scroll-padding-block-start: var(--sticky-header-height, 4rem);
}

:focus-visible {
  scroll-margin-block: 0.5rem;
}
```

CSS spacing can help, but it is not a substitute for testing actual overlays, responsive layouts, zoom, text resizing, and user-opened content.

Ensure that:

- focus does not move behind an open modal dialog;
- closing a dialog returns focus to a logical control;
- direct activation scrolls the target or result into view when needed;
- focus indicators remain visible and meet contrast requirements;
- overlays can be dismissed without dragging or precise pointer movement;
- no essential control is permanently covered at supported viewport sizes.

Speech input can also be combined with a screen reader, so an interaction must not depend on seeing focus or an overlay.

## 10. State, Results, and Error Feedback

After a speech-initiated action, the interface must make the result perceivable and programmatically available.

### 10.1 Expose component state

```html
<button type="button" aria-expanded="false" aria-controls="filters-panel">
  Filters
</button>
<div id="filters-panel" hidden>
  <!-- Filter controls -->
</div>
```

When the panel opens, update both `aria-expanded` and `hidden`. Similar requirements apply to `aria-pressed`, `aria-checked`, selected tabs, slider values, and other user-settable states.

### 10.2 Expose status messages

```html
<p id="cart-status" role="status" aria-atomic="true"></p>
```

```javascript
document.querySelector('#cart-status').textContent =
  'Added Blue cotton shirt to the cart.';
```

Use visible text and an appropriate status-message pattern. Do not move focus for every confirmation. For errors that require immediate correction, associate the error with the field and use the form's established error-summary and focus strategy.

Avoid feedback that is:

- shown only by color, animation, or icon change;
- available only on hover;
- removed before it can be perceived;
- announced repeatedly for every dictated character;
- hidden from accessibility APIs;
- disconnected from the control that caused it.

## 11. Labels, Symbols, and Localization

Use the same human language for visible labels and accessible names. Translate `aria-label`, hidden context, descriptions, error messages, and custom command help with the rest of the interface.

Do not normalize every symbol into an unrelated word. The correct name depends on how the symbol functions:

- A magnifying-glass icon used as a control is named `Search`, not `Magnifying glass`.
- A visible mathematical expression should remain represented by the same expression in the accessible name.
- A visible `X` used only as a close icon should have the function `Close`, because the symbol is not acting as a human-language label.
- A product or feature name should retain its intended spelling and pronunciation guidance where the platform supports it.

Test speech matching in each supported interface and dictation language. A command that works in English may not work after translation, and speech software behavior may differ for punctuation, abbreviations, homophones, and mixed-language labels.

## 12. Product and Platform Variation

Speech recognition tools differ in how they:

- activate a control by name;
- use roles and accessibility APIs;
- display names, numbers, or grid overlays;
- disambiguate repeated names;
- emulate keyboard and pointer input;
- handle browser content, embedded frames, and shadow DOM;
- switch between command and dictation modes;
- interpret punctuation, symbols, accents, and languages.

Do not put fixed command phrases, product versions, or compatibility claims into a project standard unless the project actively maintains and retests them. Refer testers to the current documentation for the product and operating system in scope.

Record the actual test environment:

```text
Speech input product and version:
Operating system and version:
Browser and version:
Input and interface language:
Command, dictation, or mixed mode:
Microphone or audio setup, if relevant:
Viewport, zoom, and text size:
```

## 13. Testing Procedure

### 13.1 Static inspection

For each interactive component:

1. identify the visible label;
2. inspect the computed accessible name and role;
3. confirm that the visible words occur intact and in order in the name;
4. check whether extra hidden text appears before or inside the visible phrase;
5. verify state, value, and description relationships;
6. confirm that repeated controls can be distinguished;
7. verify that icon-only controls have concise names;
8. verify that names and hidden text are translated.

Inspect the computed accessibility tree. Do not infer the final name by reading attributes independently.

### 13.2 Keyboard foundation

Without using a pointer:

- reach and operate all functionality;
- follow a logical focus order;
- open, use, and close custom widgets;
- escape dialogs, menus, and popovers;
- verify that focus remains visible and unobscured;
- complete drag alternatives and other complex tasks.

### 13.3 Speech input test

Using each supported speech environment:

1. activate visibly labeled controls by speaking the visible label using the tool's documented grammar;
2. inspect the tool's name or number overlay and confirm every control is discoverable;
3. distinguish repeated controls without resorting to a precision grid when a direct name should work;
4. operate icon-only controls and custom widgets;
5. dictate, edit, replace, and submit text;
6. trigger and correct validation errors;
7. navigate modal dialogs, menus, tabs, disclosures, and autocomplete suggestions;
8. complete sorting, reordering, slider, map, canvas, and other spatial tasks through alternatives;
9. confirm state changes and status feedback;
10. repeat critical tasks after zoom, reflow, and localization changes.

Do not require every control to respond to one literal phrase such as `Click [label]`. Use the documented grammar of the tested tool and judge whether the interface exposes the information needed for efficient operation.

### 13.4 Test with users

Include people who regularly use speech input in usability testing. A technical pass cannot reveal the full effort involved in correcting recognition errors, switching modes, disambiguating controls, or navigating a dense overlay.

## 14. Automated Checks

Automation can help detect:

- controls without accessible names;
- visible labels missing from accessible names in some straightforward cases;
- invalid or missing roles, states, and properties;
- click handlers on non-interactive elements;
- missing keyboard support in some patterns;
- duplicate accessible names;
- missing labels and descriptions on form fields.

Automation cannot reliably determine:

- whether a speech product recognizes a visible label;
- whether the computed name is efficient to speak in the current language;
- whether repeated controls are practically distinguishable;
- whether dictation and correction work in a complex editor;
- whether overlays expose shadow DOM or embedded content correctly;
- whether a drag alternative is efficient and understandable;
- whether the total number of commands makes a task unreasonably difficult.

Automated label-in-name comparisons must account for accessible-name computation, text normalization, punctuation, symbols, and localization. Treat uncertain results as review items rather than confirmed failures.

## 15. Common Failure Patterns

| Failure | Better approach |
| --- | --- |
| Visible `Save` button has hidden name `Confirm changes` | Use `Save`, or a name beginning with `Save`. |
| Hidden words are inserted inside the visible phrase | Keep the visible words contiguous and in order. |
| Every repeated link is visibly `Read more` | Use specific visible text or append contextual hidden text. |
| Placeholder is the only field label | Add a persistent, associated `<label>`. |
| Icon-only button has no accessible name | Add a concise name, and prefer persistent visible text. |
| Tooltip is treated as a visible label | Keep the label persistently visible when discoverability matters. |
| Styled `<div>` acts as a button | Use `<button>` or implement the complete custom-widget contract. |
| Validation runs only on `keydown` | Respond to `input`, current values, and submission. |
| Reordering requires drag and drop | Add Move up, Move down, or position controls. |
| Gesture is the only way to operate a feature | Add simple controls for the same result. |
| Sticky content hides the focused control | Adjust layout and scrolling, then test at supported sizes. |
| State changes only visually | Update programmatic state and provide visible feedback. |
| Success or error is exposed only by color | Provide text and an appropriate status or error relationship. |
| Project documentation promises universal spoken commands | Test and document the actual supported products and locales. |
| Testing assumes every speech user can see | Include non-visual and combined assistive-technology use. |

## 16. Definition of Done

Before publishing or closing a speech-input accessibility issue, verify that:

- [ ] every control exposes an accurate name, role, state, and value;
- [ ] every visible text label is contained intact and in order in the accessible name;
- [ ] visible text appears at the start of the accessible name where practical;
- [ ] native HTML is used where it can provide the required control;
- [ ] custom controls follow supported keyboard and ARIA patterns;
- [ ] repeated controls can be distinguished efficiently;
- [ ] icon-only controls have concise, localized accessible names;
- [ ] persistent visible labels are used where discoverability matters;
- [ ] form fields have visible, programmatically associated labels;
- [ ] dictation, paste, autocomplete, editing, and correction update fields correctly;
- [ ] validation does not depend only on physical key events;
- [ ] all functionality is available through a keyboard interface;
- [ ] dragging and path-based gestures have appropriate alternatives;
- [ ] focus remains logical, visible, and unobscured;
- [ ] states, validation errors, confirmations, and results are exposed programmatically;
- [ ] critical tasks were tested in the supported speech products, browsers, and languages;
- [ ] zoom, reflow, overlays, dialogs, and custom widgets were included in testing;
- [ ] automated results were supplemented by manual speech-input testing;
- [ ] the original user-facing barrier was retested after remediation.

Use the project's severity and priority model rather than assigning a universal severity from a WCAG number. See [Accessibility Bug Reporting Best Practices](./ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES.md).

## 17. Related WCAG 2.2 Criteria

| Criterion | Level | Relevance |
| --- | --- | --- |
| [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) | A | Preserves labels, instructions, groups, and structural relationships. |
| [2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html) | A | Provides an operable keyboard interface that speech tools can emulate. |
| [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html) | A | Keeps keyboard-emulated navigation logical. |
| [2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html) | AA | Makes the keyboard interaction point visible. |
| [2.4.11 Focus Not Obscured (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html) | AA | Prevents author-created content from entirely hiding a focused component. |
| [2.5.1 Pointer Gestures](https://www.w3.org/WAI/WCAG22/Understanding/pointer-gestures.html) | A | Provides single-pointer alternatives to multipoint or path-based gestures. |
| [2.5.3 Label in Name](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html) | A | Ensures visible text labels are contained in accessible names. |
| [2.5.7 Dragging Movements](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html) | AA | Provides a single-pointer alternative to author-created dragging. |
| [3.3.2 Labels or Instructions](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html) | A | Provides labels and instructions for user input. |
| [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html) | A | Exposes control semantics, state, and value to assistive technologies. |
| [4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html) | AA | Makes relevant status changes available without requiring focus. |

WCAG criteria describe outcomes, not product-specific spoken commands. A command failing in one environment may indicate a content defect, a product limitation, a localization issue, or an unsupported combination. Record the environment and investigate before assigning a standards failure.

## 18. Related Guides

- [Keyboard Accessibility Best Practices](./KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md)
- [Forms Accessibility Best Practices](./FORMS_ACCESSIBILITY_BEST_PRACTICES.md)
- [Touch and Pointer Accessibility Best Practices](./TOUCH_POINTER_ACCESSIBILITY_BEST_PRACTICES.md)
- [Image Alt Text Accessibility Best Practices](./IMAGE_ALT_TEXT_ACCESSIBILITY_BEST_PRACTICES.md)
- [Accessibility Bug Reporting Best Practices](./ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES.md)

## References

- [W3C WAI Speech Recognition Perspective](https://www.w3.org/WAI/perspective-videos/voice/)
- [Understanding WCAG 2.2 Success Criterion 2.5.3: Label in Name](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html)
- [Understanding WCAG 2.2 Success Criterion 2.1.1: Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html)
- [Understanding WCAG 2.2 Success Criterion 2.5.1: Pointer Gestures](https://www.w3.org/WAI/WCAG22/Understanding/pointer-gestures.html)
- [Understanding WCAG 2.2 Success Criterion 2.5.7: Dragging Movements](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html)
- [Understanding WCAG 2.2 Success Criterion 2.4.11: Focus Not Obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html)
- [Understanding WCAG 2.2 Success Criterion 4.1.2: Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html)
- [Understanding WCAG 2.2 Success Criterion 4.1.3: Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [Providing Accessible Names and Descriptions](https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/)

## Machine-Readable Standards Metadata

```yaml
standards:
  wcag:
    version: "2.2"
    uri: "https://www.w3.org/TR/WCAG22/"
  wai_aria_apg:
    uri: "https://www.w3.org/WAI/ARIA/apg/"
primary_success_criteria:
  - id: "2.1.1"
    name: "Keyboard"
    level: "A"
  - id: "2.5.3"
    name: "Label in Name"
    level: "A"
  - id: "4.1.2"
    name: "Name, Role, Value"
    level: "A"
related_success_criteria:
  - id: "2.4.11"
    name: "Focus Not Obscured (Minimum)"
    level: "AA"
  - id: "2.5.1"
    name: "Pointer Gestures"
    level: "A"
  - id: "2.5.7"
    name: "Dragging Movements"
    level: "AA"
  - id: "4.1.3"
    name: "Status Messages"
    level: "AA"
```

## License

This document is available under the repository's [MIT License](../LICENSE).
