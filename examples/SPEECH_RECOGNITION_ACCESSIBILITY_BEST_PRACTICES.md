---
title: Speech Recognition Accessibility Best Practices
---

# Speech Recognition Accessibility Best Practices

This document defines project-level expectations for speech recognition
accessibility. Speech recognition software lets users navigate and interact
with web content using spoken commands instead of a keyboard or mouse.

## Core Principle

Every interactive control must be activatable by speaking its visible text.
The accessible name of a control must contain — and best practice is to start
with — the text that is visually presented to the user.

---

## Severity Scale

| Level | Meaning |
| --- | --- |
| **Critical** | Speech users cannot activate a control at all |
| **Serious** | Speech users must use workaround (numbered disambiguation, MouseGrid) |
| **Moderate** | Speech interaction is slower or less intuitive than necessary |
| **Minor** | Best-practice gap; marginal speech recognition impact |

---

## How Speech Recognition Works

Speech recognition software (Dragon NaturallySpeaking, Apple Voice Control,
Windows Speech Recognition, iOS/Android Voice Control) converts spoken words
into commands. The primary interaction pattern is:

**"Click [visible text]"** — the user speaks the label they see on screen.

The software matches the spoken text against the **accessible name** of each
control on the page. If a match is found, the control is activated. If
multiple controls share the same accessible name, the software highlights all
matches with numbers and the user must speak the correct number.

When no match is found, the user must resort to spatial interaction methods
such as MouseGrid (Dragon) or Show Numbers (Apple Voice Control), which
overlay the page with numbered grids. This is significantly slower and more
tedious than direct label activation.

---

## Critical: Visible Text Must Match Accessible Name

WCAG 2.5.3 Label in Name requires that the accessible name **contains** the
visible label text. Best practice is that the accessible name **starts with**
the visible text, because some speech recognition engines (notably iOS Voice
Control) can only match when the accessible name begins with the spoken text.

```html
<!-- Pass: accessible name starts with visible text -->
<button aria-label="Save document">Save</button>

<!-- Pass: visible text is the entire accessible name -->
<button>Save</button>

<!-- Fail: accessible name does not contain visible text -->
<button aria-label="Confirm changes">Save</button>

<!-- Fail: accessible name starts with different text -->
<button aria-label="Click to save document">Save</button>
```

```php
// Pass: visible label at start, context appended
$build['#title'] = $this->t('Configure <span class="visually-hidden">@module</span>',
  ['@module' => $module->info['name']]);

// Fail: visible label in the middle, hidden text before it
$build['#title'] = $this->t('<span class="visually-hidden">Show </span>@title<span class="visually-hidden"> media</span>',
  ['@title' => $title]);
```

---

## Serious: Visually-Hidden Text Placement

When using visually-hidden text to provide additional context for screen
readers, place it **after** the visible text, not before. The accessible name
is built from all text content (visible and hidden), so the position of hidden
text determines whether the accessible name starts with the visible label.

```html
<!-- Pass: hidden text after visible — accessible name starts with "Help" -->
<a href="/help/node">
  Help <span class="visually-hidden">for Content</span>
</a>

<!-- Fail: hidden text before visible — accessible name starts with "Module" -->
<a href="/help/node">
  <span class="visually-hidden">Module: </span>Help
</a>
```

```css
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### Pattern: Action links in lists

When a list of items each has the same action links (Edit, Delete, Configure),
the full accessible name should include the item name for screen reader
context, but the visible action text must come first.

```html
<!-- Pass: "Configure" is first in accessible name -->
<a href="/admin/content/formats/edit/basic_html">
  Configure <span class="visually-hidden">Basic HTML</span>
</a>

<!-- Fail: item name precedes action — "Click Configure" won't match -->
<a href="/admin/content/formats/edit/basic_html">
  <span class="visually-hidden">Basic HTML: </span>Configure
</a>
```

---

## Serious: Unique Accessible Names for Repeated Controls

When multiple controls share the same visible text, speech users must
disambiguate by speaking a number. Provide unique accessible names to avoid
this friction.

```html
<!-- Fail: both links have identical accessible name -->
<a href="/products">Read more</a>
<a href="/services">Read more</a>

<!-- Pass: each link has a unique accessible name -->
<a href="/products">Read more <span class="visually-hidden">about products</span></a>
<a href="/services">Read more <span class="visually-hidden">about services</span></a>
```

The hidden disambiguation text must come **after** the visible text so the
accessible name still starts with "Read more" — the text the user will speak.

---

## Serious: Native Element Semantics

Speech recognition software uses ARIA roles to identify control types.
Commands like "Click checkbox" or "Click button" rely on the underlying
semantics of the element. Use native HTML elements whenever possible.

| User says | Requires |
| --- | --- |
| "Click [text]" | Any focusable element with matching accessible name |
| "Click button [text]" | Element with `role="button"` or `<button>` |
| "Click checkbox [text]" | Element with `role="checkbox"` or `<input type="checkbox">` |
| "Click link [text]" | Element with `role="link"` or `<a href>` |
| "Click radio [text]" | Element with `role="radio"` or `<input type="radio">` |
| "Click heading [text]" | Element with `role="heading"` or `<h1>`–`<h6>` |

A styled `<div>` that looks like a button will not respond to "Click button"
because it lacks the correct role semantics.

```html
<!-- Pass: native button — responds to "Click button Save" -->
<button type="button">Save</button>

<!-- Fail: styled div — does not respond to "Click button" -->
<div class="btn" onclick="save()">Save</div>
```

---

## Moderate: Controls Without Visible Labels

When a control has no visible text (icon-only buttons, image-based controls),
speech users must rely on MouseGrid or Show Numbers to locate it. This is
usable but significantly slower.

```html
<!-- Pass: visible label for speech users -->
<button type="button" aria-label="Close dialog">
  <svg aria-hidden="true"><use href="#icon-close"></use></svg>
  Close
</button>

<!-- Moderate: no visible text — speech users need MouseGrid -->
<button type="button" aria-label="Close dialog">
  <svg aria-hidden="true"><use href="#icon-close"></use></svg>
</button>
```

For icon-only controls, consider adding a visible label or tooltip that
appears on focus. This benefits both speech recognition users and sighted
keyboard users.

---

## Moderate: Sticky Headers and Obscured Controls

Speech recognition users are necessarily sighted — they need to see labels
and focus indicators to issue commands. Sticky headers, cookie banners, and
floating widgets that obscure focusable content break speech interaction.

```css
/* Ensure focused elements clear sticky overlays */
:focus {
  scroll-margin-top: var(--sticky-header-height, 4rem);
}
```

If a control is visually hidden behind a sticky header but receives keyboard
focus, the speech user cannot see what they are clicking on. They may say
"Click [text]" but the target is invisible.

---

## Moderate: Focus Indicators for Speech Users

Speech users rely on visible focus to know which control is currently
targeted. Removing focus indicators without an equally visible replacement
makes it impossible for speech users to confirm which element they will
activate.

This requirement overlaps with keyboard accessibility but is worth emphasising:
speech users are sighted and depend on visual focus to issue accurate "Click"
commands.

---

## Platform-Specific Notes

### Dragon NaturallySpeaking (Windows/Mac)

- Primary command: "Click [visible text]"
- Disambiguation: numbered highlights for repeated text
- MouseGrid: "MouseGrid" then number to drill down
- Keyboard emulation: "Tab", "Press Enter", "Press Space"
- Supports ARIA roles from version 1.3+

### Apple Voice Control (macOS/iOS)

- "Show names" — overlay labels on all interactive elements
- "Show numbers" — overlay numbers on all interactive elements
- "Show grid" / "Show window grid" — spatial grid overlay
- "Click [number]" — activate by overlay number
- **Requires accessible name to start with visible text** for "Click [text]" to work
- Dictation mode, Spelling mode, Command mode for text input

### Windows Speech Recognition

- "Click [visible text]" — primary activation
- "Show numbers" — numbered overlay
- "Mouse grid" — spatial grid
- Less sophisticated than Dragon; basic label matching

### iOS/Android Voice Control

- "Tap [visible text]" — primary activation
- Numbered overlays for disambiguation
- **Strict matching**: accessible name must start with visible text

---

## Testing Expectations

Minimum manual checks for each UI change:

- Test with at least one speech recognition tool (Apple Voice Control, Dragon, or Windows Speech Recognition).
- Say "Click [visible text]" for every interactive control and verify it activates.
- Verify repeated controls have unique accessible names.
- Verify controls respond to role-based commands ("Click button", "Click link").
- Verify visually-hidden text does not precede visible text in accessible names.
- Verify sticky headers do not obscure focused controls.

---

## Definition of Done Checklist

- [ ] Every interactive control has an accessible name that starts with its visible text.
- [ ] Visually-hidden context text is placed after visible text, not before.
- [ ] Repeated controls have unique accessible names.
- [ ] Native HTML elements used for all interactive controls (`<button>`, `<a>`, `<input>`).
- [ ] Icon-only controls have visible text or a visible label on focus.
- [ ] Sticky headers do not obscure focused elements.
- [ ] Visible focus indicator present on all focusable elements.
- [ ] "Click [visible text]" activates every control when tested with speech recognition.
- [ ] Role-based commands ("Click button", "Click link") work for all controls.

---

## Key WCAG Criteria

- 2.5.3 Label in Name (A) — **Critical if violated**
- 4.1.2 Name, Role, Value (A) — **Critical if violated**
- 1.3.1 Info and Relationships (A)
- 2.4.4 Link Purpose in Context (A)
- 2.4.6 Headings and Labels (AA)
- 3.2.4 Consistent Identification (AA)

---

## References

- [WCAG 2.5.3 Understanding: Label in Name](https://www.w3.org/WAI/WCAG21/Understanding/label-in-name.html) — W3C normative understanding document
- [Understanding Success Criterion 2.5.3: Label in Name](https://w3c.github.io/wcag21/understanding/label-in-name) — Editor's draft with failure techniques
- [Testing with speech recognition](https://vispero.com/resources/testing-with-speech-recognition/) — TPGi practical testing guide covering Dragon, keyboard commands, MouseGrid, and element semantics
- [Browsing with speech recognition](https://tetralogical.com/blog/2021/11/15/browsing-with-speech-recognition/) — TetraLogical walkthrough of speech navigation patterns including numbered links and MouseGrid
- [Web Accessibility for Speech Recognition Users](https://www.barrierbreak.com/web-accessibility-for-speech-recognition-users-a-pragmatic-approach/) — BarrierBreak overview of interaction patterns and common challenges
- [Use Voice Control commands to interact with your Mac](https://support.apple.com/en-ca/guide/mac-help/mh40719/mac) — Apple documentation for Voice Control commands, Show Names, Show Numbers, and grid interaction
- [Voice Recognition (Speech-to-Text)](https://snow.idrc.ocadu.ca/assistive-technology-2/alternative-control/voice-recognition-speech-to-text-software-2/) — SNOW/OCAD overview of speech recognition software options and requirements
- [WAI-ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/) — Widget patterns with correct semantics for speech role-based commands

### Machine-Readable Standards

For AI systems and automated tooling, see [wai-yaml-ld](https://github.com/mgifford/wai-yaml-ld) for structured accessibility standards:

- [WCAG 2.2 (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wcag-2.2-normative.yaml) — Machine-readable WCAG 2.2 normative content including Label in Name
- [ARIA Informative (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wai-aria-informative.yaml) — ARIA role semantics for speech recognition
- [HTML Living Standard Accessibility (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/html-living-standard-accessibility.yaml) — Native element semantics
