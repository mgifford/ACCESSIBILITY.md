---
title: User Personalization and Accessibility Best Practices
---

# User Personalization and Accessibility Best Practices

Personalization can help people adjust presentation, motion, density, and other aspects of an interface. It is an enhancement to an accessible foundation, not a repair layer and not a substitute for WCAG conformance.

Start by respecting operating-system, browser, and assistive-technology settings. Add site-specific controls only when they provide a meaningful choice that users cannot obtain reliably from those existing tools.

---

## 1. Required Outcomes

An implementation with personalization must:

- remain accessible before preferences are applied and when JavaScript or storage is unavailable;
- avoid blocking browser zoom, user styles, extensions, reader modes, or assistive technology;
- respect applicable system and browser preferences;
- use accessible native controls for site-specific settings;
- explain each setting by its effect rather than by a presumed disability;
- apply changes without losing information, functionality, focus, or entered data;
- provide a simple way to restore defaults;
- keep every author-provided combination within applicable accessibility requirements;
- validate stored values before applying them;
- minimize stored preference data and avoid inferring or recording disability information;
- define whether a preference applies to one page, the site, the device, or a signed-in account; and
- test individual settings and meaningful combinations across supported pages.

The page must still support browser text resizing, zoom, text-spacing overrides, forced colors, keyboard operation, and other WCAG requirements whether or not it provides a preference editor.

---

## 2. Separate Requirements From Enhancements

WCAG usually requires content to adapt to user settings. It does not generally require every site to reproduce browser settings in a custom panel.

| Requirement or pattern | What authors must do |
|:---|:---|
| Resize Text, 1.4.4 Level AA | Do not prevent supported user-agent resizing. Content and controls must remain usable when text is enlarged to 200%. A site text-size control is one possible technique, not a universal requirement. |
| Text Spacing, 1.4.12 Level AA | Allow users to override line, paragraph, letter, and word spacing to the specified values without loss of content or functionality. The site does not have to provide spacing controls. |
| Reflow, 1.4.10 Level AA | Preserve content and functionality at the required narrow equivalent width, subject to the criterion's defined exceptions. |
| Contrast and non-text contrast | Every author-provided theme or preset must meet the applicable criteria. |
| Reduced motion | Respect `prefers-reduced-motion` where motion may create a barrier. A site control can provide an additional override. |
| Reading mode, font choice, density, or simplification | These are useful enhancements when research demonstrates a need. They are not automatic WCAG requirements. |

Do not claim that adding a preference panel makes inaccessible content conformant.

---

## 3. Understand the Preference Sources

Preferences can originate from several places:

1. **Operating system:** color scheme, reduced motion, forced colors, contrast, transparency, text scale, and other platform settings.
2. **Browser or user agent:** zoom, default font, minimum font size, reader mode, extensions, user styles, and site permissions.
3. **Site setting:** an explicit choice that applies only to one site or application.
4. **Account setting:** a preference intentionally synchronized across devices for a signed-in user.

Use this precedence model:

1. Start with an accessible default.
2. Follow a recognized system or browser preference when the site setting is **System** or **Default**.
3. Let an explicit site choice override only the corresponding presentation dimension.
4. Let **Reset to defaults** remove site overrides and resume following the system.

Do not interpret a media-query match as a diagnosis. A person may choose dark mode, reduced motion, or increased contrast for many reasons.

---

## 4. Decide Whether Site Controls Are Needed

Add a site preference only when it provides a clear benefit and can be maintained across the entire experience.

Useful candidates can include:

- System, Light, and Dark color themes;
- reduced motion;
- a larger text preset;
- a comfortable reading width and spacing preset;
- reduced visual density;
- control over autoplaying or moving content; and
- a tested font-family choice for a content-heavy product.

Avoid adding a large panel of controls merely to appear accessible. Every additional setting introduces interaction, translation, persistence, testing, and combination costs.

Do not provide arbitrary foreground and background color pickers unless the implementation can prevent unreadable author-generated combinations. Users needing unrestricted color control may be better served by browser, operating-system, or assistive-technology tools.

---

## 5. Respect User Preference Media Features

Use CSS media queries as progressive enhancement. Unsupported queries are ignored, so the default presentation must remain accessible.

### Color scheme

Declare the schemes the page supports and define complete color pairs.

```css
:root {
  color-scheme: light dark;
  --page-background: #ffffff;
  --text-color: #1f2937;
  --link-color: #005ea8;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    --page-background: #111827;
    --text-color: #f3f4f6;
    --link-color: #7dd3fc;
  }
}

:root[data-theme="light"] {
  color-scheme: light;
  --page-background: #ffffff;
  --text-color: #1f2937;
  --link-color: #005ea8;
}

:root[data-theme="dark"] {
  color-scheme: dark;
  --page-background: #111827;
  --text-color: #f3f4f6;
  --link-color: #7dd3fc;
}

body {
  color: var(--text-color);
  background: var(--page-background);
}

a {
  color: var(--link-color);
}
```

In this pattern, the absence of `data-theme` means **System**. An explicit Light or Dark selection sets the attribute.

### Reduced motion

Remove or replace non-essential motion that can trigger discomfort or distraction. Do not apply a universal rule that forces every animation and transition to `0.01ms`; that pattern can break state changes and scripted event assumptions.

```css
.panel {
  transition: translate 200ms ease-out, opacity 200ms ease-out;
}

@media (prefers-reduced-motion: reduce) {
  :root:not([data-motion]) .panel {
    transition: none;
  }

  :root:not([data-motion]) {
    scroll-behavior: auto;
  }
}

:root[data-motion="reduce"] .panel {
  transition: none;
}

:root[data-motion="reduce"] {
  scroll-behavior: auto;
}
```

If motion communicates essential state, replace it with an immediate state change or a less triggering presentation. Do not remove the information.

### Contrast preferences

`prefers-contrast` can express `more`, `less`, or `custom`. Do not treat every match as a request for high contrast.

```css
@media (prefers-contrast: more) {
  :root {
    --border-width: 0.1875rem;
    --muted-text-color: currentColor;
  }
}

@media (prefers-contrast: less) {
  .decorative-texture {
    background-image: none;
  }
}

@media (prefers-contrast) {
  .decorative-gradient,
  .decorative-shadow {
    background-image: none;
    box-shadow: none;
  }
}
```

An unqualified `prefers-contrast` query can be appropriate for reducing visual complexity. It is not appropriate for imposing a high-contrast palette because the user may have requested less contrast or a custom palette.

### Reduced transparency

Use `prefers-reduced-transparency` as a progressive enhancement and test current browser support before depending on it.

```css
@media (prefers-reduced-transparency: reduce) {
  .dialog-backdrop {
    background: Canvas;
    opacity: 1;
  }

  .frosted-panel {
    background: Canvas;
    backdrop-filter: none;
  }
}
```

Media Queries Level 5 remains a W3C Working Draft. Treat newer features and script preference APIs as evolving technology, not as a replacement for an accessible default or a tested site control.

---

## 6. Support Forced Colors

Forced-color mode is a user-agent color transformation, not an author theme. Allow the browser to substitute the user's chosen palette.

```css
@media (forced-colors: active) {
  .button {
    color: ButtonText;
    background: ButtonFace;
    border: 0.125rem solid ButtonText;
  }

  .button:focus-visible {
    outline: 0.1875rem solid Highlight;
    outline-offset: 0.1875rem;
  }

  .selected-item {
    border-color: Highlight;
  }
}
```

Keep the default `forced-color-adjust: auto`. Use `forced-color-adjust: none` only for a narrowly scoped element when the component supplies its own tested response to the user's forced-color palette. It is not a general focus-indicator fix.

Test meaning that was originally conveyed through:

- background colors;
- gradients;
- shadows;
- background images;
- custom check marks;
- selected states; and
- focus indicators.

Add borders, text, or system-color indicators where the forced palette removes a meaningful visual distinction.

---

## 7. Use an Accessible Preference Editor

Prefer an inline disclosure when the set of options is small. This avoids the focus management and dismissal requirements of a modal dialog.

```html
<details class="display-preferences" id="display-preferences">
  <summary>Display preferences</summary>

  <form id="display-preferences-form">
    <p>Changes are saved automatically on this device when storage is available.</p>

    <fieldset>
      <legend>Color theme</legend>

      <label>
        <input type="radio" name="theme" value="system" checked>
        System
      </label>

      <label>
        <input type="radio" name="theme" value="light">
        Light
      </label>

      <label>
        <input type="radio" name="theme" value="dark">
        Dark
      </label>
    </fieldset>

    <label for="text-size">Text size</label>
    <select id="text-size" name="textSize">
      <option value="default">Default</option>
      <option value="large">Large</option>
      <option value="x-large">Extra large</option>
    </select>

    <label for="reading-layout">Reading layout</label>
    <select id="reading-layout" name="readingLayout">
      <option value="default">Default</option>
      <option value="comfortable">Comfortable</option>
    </select>

    <label for="motion">Motion</label>
    <select id="motion" name="motion">
      <option value="system">Follow system</option>
      <option value="reduce">Reduce motion</option>
    </select>

    <button type="button" id="reset-display-preferences">
      Reset to defaults
    </button>

    <p id="display-preferences-status" role="status"></p>
  </form>
</details>
```

Native radio buttons and selects already expose their selected values. Do not add a live-region announcement for every visual change unless testing shows that additional feedback is necessary. A concise status message is useful when preferences are saved, reset, or cannot be stored.

If a modal is genuinely necessary, implement the complete dialog pattern: an accessible name, initial focus, contained tab sequence, Escape dismissal, a visible close button, and focus return to the opener.

---

## 8. Apply Presentation With CSS Variables and Attributes

Use a small, controlled set of values. Do not insert stored strings directly into CSS.

```css
:root {
  --content-measure: 80ch;
  --reading-line-height: 1.5;
  --paragraph-gap: 1em;
}

:root[data-text-size="large"] {
  font-size: 125%;
}

:root[data-text-size="x-large"] {
  font-size: 150%;
}

:root[data-reading-layout="comfortable"] {
  --content-measure: 70ch;
  --reading-line-height: 1.7;
  --paragraph-gap: 1.5em;
}

.reading-content {
  max-inline-size: var(--content-measure);
  margin-inline: auto;
}

.reading-content p,
.reading-content li {
  line-height: var(--reading-line-height);
}

.reading-content p {
  margin-block-end: var(--paragraph-gap);
}
```

Keep browser zoom and user font settings working. Root percentages scale from the user's default rather than replacing it with a fixed pixel size.

Do not use fixed-height text containers, clipping, or layout assumptions that fail when the font, text size, language, or spacing changes.

---

## 9. Validate, Apply, and Persist Values

This framework is suitable for a static site. It validates every stored value, applies only known attributes, handles unavailable storage, and gives users a reset.

```js
const preferenceKey = "site.displayPreferences.v1";

const defaults = Object.freeze({
  theme: "system",
  textSize: "default",
  readingLayout: "default",
  motion: "system"
});

const allowedValues = Object.freeze({
  theme: ["system", "light", "dark"],
  textSize: ["default", "large", "x-large"],
  readingLayout: ["default", "comfortable"],
  motion: ["system", "reduce"]
});

const form = document.querySelector("#display-preferences-form");
const resetButton = document.querySelector("#reset-display-preferences");
const status = document.querySelector("#display-preferences-status");

function sanitizePreferences(candidate = {}) {
  const source = candidate
    && typeof candidate === "object"
    && !Array.isArray(candidate)
      ? candidate
      : {};

  return Object.fromEntries(
    Object.entries(defaults).map(([name, defaultValue]) => {
      const value = source[name];
      return [
        name,
        allowedValues[name].includes(value) ? value : defaultValue
      ];
    })
  );
}

function readPreferences() {
  try {
    const stored = localStorage.getItem(preferenceKey);
    return stored
      ? sanitizePreferences(JSON.parse(stored))
      : { ...defaults };
  } catch {
    return { ...defaults };
  }
}

function setOptionalAttribute(name, value, defaultValue) {
  if (value === defaultValue) {
    document.documentElement.removeAttribute(name);
  } else {
    document.documentElement.setAttribute(name, value);
  }
}

function applyPreferences(preferences) {
  setOptionalAttribute("data-theme", preferences.theme, "system");
  setOptionalAttribute("data-text-size", preferences.textSize, "default");
  setOptionalAttribute(
    "data-reading-layout",
    preferences.readingLayout,
    "default"
  );
  setOptionalAttribute("data-motion", preferences.motion, "system");
}

function updateForm(preferences) {
  form.elements.theme.value = preferences.theme;
  form.elements.textSize.value = preferences.textSize;
  form.elements.readingLayout.value = preferences.readingLayout;
  form.elements.motion.value = preferences.motion;
}

function savePreferences(preferences) {
  try {
    localStorage.setItem(preferenceKey, JSON.stringify(preferences));
    status.textContent = "";
  } catch {
    status.textContent =
      "The preferences are applied for this page but could not be saved.";
  }
}

form.addEventListener("change", () => {
  const preferences = sanitizePreferences(
    Object.fromEntries(new FormData(form))
  );

  applyPreferences(preferences);
  savePreferences(preferences);
});

resetButton.addEventListener("click", () => {
  const preferences = { ...defaults };
  let storageCleared = true;

  try {
    localStorage.removeItem(preferenceKey);
  } catch {
    storageCleared = false;
  }

  applyPreferences(preferences);
  updateForm(preferences);
  status.textContent = storageCleared
    ? "Display preferences reset to system defaults."
    : "Defaults applied for this page, but saved preferences could not be cleared.";
});

const initialPreferences = readPreferences();
applyPreferences(initialPreferences);
updateForm(initialPreferences);
```

Load the script after the preference form or use `defer` on an external script so the controls exist before the code runs.

If a theme flash before the script runs is disruptive, apply a very small, validated boot script in the document `<head>` before the main stylesheet, or render account preferences on the server. Keep the default and system-controlled presentation accessible even if the early script is blocked.

Version the storage key when the schema changes. Migrate or discard old data deliberately rather than interpreting obsolete values.

---

## 10. Make Text Resizing Work Without Site Controls

Browser text resizing and zoom remain the primary mechanisms. Design the page so they work:

- use relative font sizes;
- let text containers grow vertically;
- avoid fixed heights for controls containing text;
- let navigation and toolbars wrap;
- avoid clipping and unnecessary `overflow: hidden`;
- test long labels and translations; and
- keep browser zoom enabled.

A site text-size control can help discoverability or meet a researched product need. It must not be the only way to enlarge content, and it must not stop browser zoom from scaling further.

Do not assume that increasing the root font size alone makes the layout accessible. Test every page and component at 200% text size and 400% page zoom.

---

## 11. Test Text-spacing Overrides Correctly

Success Criterion 1.4.12 does not require a site to set or offer these values. It requires content to tolerate user overrides of at least:

- line height at 1.5 times the font size;
- spacing after paragraphs at 2 times the font size;
- letter spacing at 0.12 times the font size; and
- word spacing at 0.16 times the font size.

Use a user stylesheet, bookmarklet, or test tool to apply the values.

```css
* {
  line-height: 1.5 !important;
  letter-spacing: 0.12em !important;
  word-spacing: 0.16em !important;
}

p {
  margin-block-end: 2em !important;
}
```

Confirm that text is not clipped, truncated, overlapped, obscured, or made inoperable. If an ellipsis appears only because of the override, the complete content must remain available.

Do not make users enable a site setting before their own stylesheet can work.

---

## 12. Offer Font Choices Carefully

Evidence does not support naming one font as universally best for dyslexia or another disability. User needs and preferences differ.

If research supports a font choice:

- describe it neutrally, such as Sans serif, Serif, or Monospace;
- include complete language and character coverage;
- provide robust fallback fonts;
- test control labels, code, numbers, and data tables;
- preserve user-agent minimum font-size settings;
- avoid layout shifts that move controls during loading;
- do not require a remote font for the accessible experience; and
- provide Default and Reset options.

Do not tell users which font they need based on a disability. Let them choose based on the result they can see and use.

---

## 13. Keep Every Theme and Preset Accessible

Every author-provided theme must independently meet the applicable requirements for:

- text contrast;
- non-text contrast;
- focus visibility and focus not obscured;
- links and visited links;
- selected, checked, expanded, current, and error states;
- charts, icons, and other meaningful graphics;
- disabled-control recognition where applicable;
- forced-color behavior; and
- print output.

Do not label a site preset “High contrast” unless it has a defined purpose, has been tested as a complete theme, and does not imply that it is equivalent to the user's operating-system forced-color mode. **Higher contrast** is often a more accurate label for an author palette.

See [Light/Dark Mode Accessibility Best Practices](./LIGHT_DARK_MODE_ACCESSIBILITY_BEST_PRACTICES.md) for the complete theme-selector pattern.

---

## 14. Reduce Motion and Distraction Without Removing Meaning

Reduced motion is not the same as removing all visual change. Prefer:

- immediate state changes instead of movement across the viewport;
- crossfades or no transition where opacity changes are not themselves problematic;
- paused decorative animation;
- manual controls for carousels and rotating content;
- no smooth scrolling; and
- stable positioning of controls and content.

If moving, blinking, scrolling, or auto-updating content meets the conditions in Success Criterion 2.2.2, provide Pause, Stop, Hide, or control of the update frequency as required. Do not hide these controls inside the same motion-heavy component.

A site-level Reduce motion setting can supplement `prefers-reduced-motion`. The System choice must continue responding when the operating-system setting changes.

---

## 15. Support Reading and Content Adaptation

A reading layout can change presentation without changing the meaning or availability of content. It may:

- constrain line length;
- increase spacing;
- remove decorative backgrounds;
- reduce visual density;
- pause non-essential motion; or
- place the primary article before supplementary material visually and structurally.

Do not silently remove instructions, warnings, controls, error messages, or required task information. If a setting hides optional material, tell users what is hidden and provide an immediate way to restore it.

Use semantic HTML so browser reader modes, extensions, and assistive technologies can adapt the content. Do not block extensions or overwrite user styles unnecessarily.

W3C COGA guidance and WAI-Adapt work describe additional personalization for people with cognitive and learning disabilities. These resources provide valuable supplemental and emerging guidance. They are not additional WCAG 2.2 conformance requirements, and draft WAI-Adapt syntax must not be presented as a stable HTML feature.

---

## 16. Make Controls Understandable and Discoverable

Label the entry point with its purpose, such as **Display preferences** or **Reading settings**.

Do not rely on an accessibility icon alone. No single symbol communicates every possible preference to every user. If an icon is included, keep the text label and usually hide the icon from assistive technology.

```html
<button type="button" aria-expanded="false" aria-controls="preferences-panel">
  <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
    <!-- Decorative settings icon -->
  </svg>
  <span>Display preferences</span>
</button>
```

Keep the entry point:

- in a consistent location;
- available by keyboard, pointer, touch, and speech input;
- large enough under the applicable target-size criterion;
- visible in every supported theme and forced colors; and
- understandable without a tooltip.

Avoid custom keyboard shortcuts unless there is a demonstrated need, a way to discover and change them, and a conflict review across browsers and assistive technologies.

---

## 17. Persist Preferences Without Creating a Privacy Profile

For non-sensitive site presentation choices, origin-scoped local storage is often sufficient. It is device- and browser-specific, can be cleared, and may be unavailable in some contexts.

Explain persistence accurately. Say “saved on this device” when that is what the implementation does. Do not promise that a setting follows the user across browsers or devices unless account synchronization provides that behavior.

Follow these rules:

- store only the values needed to reproduce the chosen presentation;
- do not store a presumed diagnosis or disability;
- do not send preference values to analytics merely because they are available;
- do not expose preferences in public profiles;
- make account synchronization intentional and transparent;
- protect synchronized settings as account data;
- provide a reset and, where relevant, deletion mechanism;
- handle storage denial and corrupted data safely; and
- document retention and cookie use under the project's privacy process.

User-preference media features can contribute to browser fingerprinting. Prefer CSS responses over reading and transmitting the values through JavaScript.

---

## 18. Use Progressive Enhancement

The unenhanced page must remain readable and operable.

- Use CSS media queries even when a site control is also present.
- Use native HTML controls before custom widgets.
- Keep content in semantic HTML rather than generating it only after a preference loads.
- Do not require third-party scripts for basic access.
- Do not block rendering while waiting for remote preference services.
- Preserve system preferences if storage fails.
- Keep reset and recovery available after a partial failure.

When an account service is unavailable, fall back to local or system preferences without preventing the task.

---

## 19. Do Not Confuse Personalization With an Overlay

An accessibility overlay claims to detect or repair accessibility problems by injecting generic changes into a site. A preference editor lets a user choose among presentations that the site has deliberately designed and tested.

Personalization must not:

- claim to make an otherwise inaccessible site conformant;
- rewrite semantics generically at runtime;
- interfere with assistive technology or user styles;
- conceal unresolved defects; or
- replace remediation in source templates and components.

Runtime remediation for a locked legacy system can sometimes reduce a known barrier while the source is being fixed. Treat it as a documented, tested, temporary risk mitigation. Do not call it conformance, do not describe it as the only acceptable overlay use case, and do not stop the underlying remediation work.

A preference panel does not need a prominent disclaimer stating that it is not an overlay. Its label, documentation, and claims simply need to describe its actual function accurately.

---

## 20. Testing

### Default and failure states

- Test before JavaScript runs and with JavaScript disabled.
- Block local storage and confirm that settings apply for the current page without breaking the interface.
- Insert malformed and obsolete stored values and confirm that they are ignored.
- Test the first visit, a returning visit, Reset, sign-out, and account deletion where applicable.
- Confirm that a storage or network failure does not block content.

### System preferences

- Test light and dark system schemes.
- Change the system scheme while the page is open and confirm that System mode follows it.
- Test reduced motion both before and after page load.
- Test `prefers-contrast` values supported by the test environment.
- Test at least one light and one dark forced-color palette.
- Treat reduced transparency and other newer queries as progressive enhancements.

### Site controls

- Operate every setting with keyboard, touch, pointer, and supported speech input.
- Confirm labels, groups, values, focus, and status messages with a screen reader.
- Confirm that applying a setting does not move focus or navigate unexpectedly.
- Confirm that Reset returns both the presentation and controls to defaults.
- Verify that the same settings work consistently on every page.
- Test long translations and right-to-left content.

### Content and layout

- Resize text to 200%.
- Test page zoom at 400% and the required narrow equivalent width.
- Apply the four Text Spacing override values.
- Test user font and minimum-font-size settings.
- Confirm that controls, labels, tables, diagrams, code, and messages remain available.
- Confirm that sticky and fixed elements do not obscure content or focus.

### Combination testing

Test individual settings first, then meaningful high-risk combinations, including:

- Extra large text with Comfortable reading layout;
- Dark theme with reduced motion;
- explicit site theme with forced colors;
- 400% zoom with the preferences panel open;
- long translated labels with increased text spacing; and
- stored preferences after a schema update.

Do not attempt every mathematical combination blindly. Use pairwise coverage, risk analysis, and representative pages, then add combinations found through user research and defects.

### Automated testing

Automation can check some contrast, labels, states, storage behavior, screenshots, CSS regressions, and target sizes. It cannot determine whether a preference is understandable, whether combinations create cognitive overload, whether a reading layout helps, or whether an injected remediation conflicts with assistive technology.

Include people who use relevant personalization and assistive-technology features in usability testing.

---

## 21. Common Failures

| Failure | Correction |
|:---|:---|
| A preference widget is claimed to make the site WCAG conformant. | Remediate the source and describe the widget only as optional personalization. |
| WCAG 1.4.12 is said to require line- and letter-spacing controls. | Test that user overrides work without loss of content or functionality. |
| A text-size button is treated as a replacement for browser zoom. | Keep zoom enabled and support text resizing independently. |
| All animations and transitions are forced to `0.01ms !important`. | Remove or replace specific non-essential motion without breaking state changes. |
| `prefers-contrast` is assumed to mean high contrast. | Handle `more`, `less`, and `custom` accurately. |
| `forced-color-adjust: none` is applied to custom focus indicators. | Let forced colors apply by default and use system colors where clarification is needed. |
| A site “High contrast” theme is treated as forced-color mode. | Test it as an author theme and label its effect accurately. |
| Every page adds A+, A-, font, color, speech, and navigation controls. | Add only researched settings that can be maintained and tested. |
| A settings icon is the only label. | Use visible text such as “Display preferences.” |
| A fieldset contains a redundant ARIA radiogroup with a broken label reference. | Use native `<fieldset>`, `<legend>`, radio buttons, and labels. |
| Every selection is repeated through a live region. | Rely on native control state and announce only results that need additional feedback. |
| Stored values are inserted directly into classes or CSS. | Validate against a small allowlist before applying them. |
| Local storage is assumed to be permanent and universal. | Handle denial and clearing, and describe its device and browser scope. |
| Preference values are used to infer disabilities or enrich analytics profiles. | Store the minimum presentation state and do not infer sensitive characteristics. |
| A named third-party script is presented as essential personalization. | Keep the guide implementation-neutral and evaluate dependencies under the project's security and accessibility process. |
| A reading mode silently removes warnings or instructions. | Preserve required content and disclose any optional material that is hidden. |
| Only individual options are tested. | Test high-risk combinations, reset, migration, and failure states. |

---

## 22. Definition of Done

- [ ] The base experience is accessible without the preference editor.
- [ ] Browser zoom, text resizing, user styles, extensions, and assistive technology are not blocked.
- [ ] System preferences are respected where applicable.
- [ ] Explicit site choices override only the corresponding setting.
- [ ] System or Default resumes following the system.
- [ ] Every setting has a clear visible label that describes its effect.
- [ ] Preference controls use native semantics and work with keyboard, pointer, touch, screen reader, and speech input.
- [ ] Applying a preference preserves focus, content, functionality, and entered data.
- [ ] Reset clears site overrides and updates the controls.
- [ ] Stored values are versioned and validated against allowlists.
- [ ] Storage denial, corruption, and clearing are handled safely.
- [ ] Persistence scope is explained accurately.
- [ ] Preference data is minimized and not used to infer disability.
- [ ] Every theme and preset meets applicable contrast and state requirements.
- [ ] Forced colors remain usable without broad `forced-color-adjust: none` rules.
- [ ] Reduced motion removes or replaces specific non-essential motion.
- [ ] Text remains usable at 200% resizing and 400% page zoom.
- [ ] Text-spacing overrides cause no clipping, overlap, obscuring, or loss of functionality.
- [ ] Optional reading or simplified views preserve required information.
- [ ] The implementation works when JavaScript, storage, or account services fail.
- [ ] Individual settings and high-risk combinations have been manually tested.
- [ ] Claims do not imply that personalization repairs accessibility conformance.

---

## 23. WCAG 2.2 Mapping

| Success criterion | Level | Personalization relevance |
|:---|:---:|:---|
| [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) | A | Preference labels, groups, instructions, and structure must be programmatically available. |
| [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) | AA | Text in every author theme must meet applicable contrast requirements. |
| [1.4.4 Resize Text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html) | AA | Text must resize to 200% without loss of content or functionality. |
| [1.4.8 Visual Presentation](https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation.html) | AAA | User-selectable colors, constrained line length, spacing, non-justified text, and resizing are relevant to enhanced reading presentation. |
| [1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) | AA | Preferences and enlarged content must work at the criterion's required narrow equivalent width. |
| [1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) | AA | Controls, states, and focus indicators must remain perceivable in every author theme. |
| [1.4.12 Text Spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html) | AA | User spacing overrides must not cause loss of content or functionality. |
| [2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html) | A | Preference controls must be keyboard operable. |
| [2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) | A | Moving and auto-updating content needs the required controls where the criterion applies. |
| [2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) | AAA | Interaction-triggered motion animation must be disableable unless essential. |
| [2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html) | AA | Focus must remain visible in every theme and preset. |
| [2.4.11 Focus Not Obscured (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html) | AA | Panels and enlarged layouts must not entirely hide focused controls. |
| [2.5.3 Label in Name](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html) | A | Accessible control names must contain their visible text labels. |
| [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) | AA | Preference controls must meet the 24 CSS-pixel minimum or a defined exception. |
| [3.2.2 On Input](https://www.w3.org/WAI/WCAG22/Understanding/on-input.html) | A | Changing a preference must not unexpectedly navigate or cause another change of context. |
| [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html) | A | Any custom control must expose an accurate name, role, value, and state. |
| [4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html) | AA | Save, reset, and storage-failure messages must be programmatically determinable when they are status messages. |

COGA guidance and WAI-Adapt drafts are supplemental. They should not be represented as additional WCAG 2.2 success criteria.

---

## 24. Related Guides

- [Light/Dark Mode Accessibility Best Practices](./LIGHT_DARK_MODE_ACCESSIBILITY_BEST_PRACTICES.md)
- [Color Contrast Accessibility Best Practices](./COLOR_CONTRAST_ACCESSIBILITY_BEST_PRACTICES.md)
- [Keyboard Accessibility Best Practices](./KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md)
- [Forms Accessibility Best Practices](./FORMS_ACCESSIBILITY_BEST_PRACTICES.md)
- [Navigation Accessibility Best Practices](./NAVIGATION_ACCESSIBILITY_BEST_PRACTICES.md)
- [Touch and Pointer Accessibility Best Practices](./TOUCH_POINTER_ACCESSIBILITY_BEST_PRACTICES.md)
- [Progressive Enhancement Best Practices](./PROGRESSIVE_ENHANCEMENT_BEST_PRACTICES.md)

---

## References

The external references in this guide follow the repository's [trusted-source list](./TRUSTED_SOURCES.yaml). Primary standards are used for normative requirements. Draft specifications and supplementary guidance are identified as such.

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Understanding 1.4.4: Resize Text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html)
- [Understanding 1.4.12: Text Spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html)
- [Understanding 2.3.3: Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)
- [Media Queries Level 5](https://www.w3.org/TR/mediaqueries-5/) (Working Draft)
- [CSS Color Adjustment Module Level 1](https://www.w3.org/TR/css-color-adjust-1/) (Candidate Recommendation)
- [Making Content Usable for People with Cognitive and Learning Disabilities](https://www.w3.org/TR/coga-usable/) (W3C Working Group Note)
- [WAI-Adapt Explainer](https://www.w3.org/TR/adapt/) (emerging personalization semantics)
- [MDN: Using media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Using) (supplementary implementation guidance)
- [Overlay Fact Sheet](https://overlayfactsheet.com/en/) (supplementary industry resource)

### Machine-readable standards

For AI systems and automated tooling, see [wai-yaml-ld](https://github.com/mgifford/wai-yaml-ld):

- [WCAG 2.2 normative content in YAML](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wcag-2.2-normative.yaml)
- [ARIA informative catalog in YAML](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wai-aria-informative.yaml)
- [HTML accessibility content in YAML](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/html-living-standard-accessibility.yaml)
- [Standards link graph in YAML](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/standards-link-graph.yaml)

---

AGPL-3.0-or-later License - See LICENSE file for full text  
Copyright (c) 2026 Mike Gifford
