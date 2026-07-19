---
title: Image Alt Text Accessibility Best Practices
---

# Image Alt Text Accessibility Best Practices

Text alternatives make the information and function of images available when the images cannot be perceived or presented. Good alternative text is determined by the image's purpose in its specific context, not by the file alone.

This guide focuses on HTML images. For inline SVG, charts, maps, and other specialized graphics, also use the related guides linked near the end of this document.

## 1. Core Principles

1. **Communicate purpose and equivalent information.** Do not merely inventory visible objects.
2. **Decide in context.** The same image may need different alternative text, or an empty alternative, in different uses.
3. **Keep meaningful content available to everyone.** Put complex explanations, data, instructions, and important image text in visible page content when practical.
4. **Hide only genuinely decorative or redundant images.** Use `alt=""` for an HTML image that assistive technology should ignore.
5. **Name actions and destinations.** When an image is the only content of a link or button, its alternative identifies what the control does.
6. **Do not invent details.** Never guess a person's identity, attributes, emotion, health, disability, or other sensitive information.
7. **Do not rely on automation alone.** Tools can detect structural problems. People must judge meaning, accuracy, context, and redundancy.
8. **Maintain alternatives with the content.** Update and translate the alternative when the image, purpose, surrounding text, or language changes.

## 2. What WCAG 2.2 Requires

[WCAG 2.2 Success Criterion 1.1.1](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html) requires non-text content to have a text alternative that serves the equivalent purpose, with specific handling for several situations.

| Situation | Required outcome |
| --- | --- |
| Informative non-text content | Provide an equivalent text alternative. |
| Control or input | Provide a name that describes its purpose. |
| Time-based media | At least identify the media, in addition to the requirements under Guideline 1.2. |
| Test or exercise that would be invalid in text | At least identify and describe its purpose. |
| Specific sensory experience | At least provide descriptive identification. |
| CAPTCHA | Identify and describe its purpose, and provide alternatives using different output modes. |
| Pure decoration, formatting, or content not presented to users | Implement it so assistive technology can ignore it. |

Decorative images are not an exception that permits a missing `alt` decision. For an HTML `<img>` used as decoration, the usual implementation is a present but empty attribute: `alt=""`.

WCAG does not prescribe a universal character limit for alternative text. Use the shortest alternative that communicates the necessary purpose and information. Move substantial or structured information into visible page content.

## 3. Use This Decision Process

Ask these questions in order for each use of an image:

1. **Is the image the only content that names a link, button, or other control?**
   - Yes: provide a name that communicates the action or destination.
   - No: continue.
2. **Does the image contain text that is important here?**
   - If the same words are already available as nearby real text, the image may use `alt=""`.
   - If the words are not otherwise available, include the necessary words in the alternative or provide them as visible text.
3. **Does the image add information, meaning, identity, state, instruction, or an intended impression?**
   - For a simple image, write a concise equivalent alternative.
   - For a complex image, provide a short identification plus an accessible detailed equivalent.
4. **Is all of the image's relevant information already provided nearby?**
   - Yes: use `alt=""` to avoid repetition.
5. **Is the image purely decorative or only visual formatting?**
   - Yes: use `alt=""`, or implement it as a CSS decorative image.
6. **Is the purpose still unclear?**
   - Clarify why the image is present before publishing. Do not guess and do not automatically choose either a description or an empty alternative.

The [W3C WAI alt Decision Tree](https://www.w3.org/WAI/tutorials/images/decision-tree/) provides a concise version of this process.

## 4. Informative Images

An informative image contributes meaning that is not already available in nearby text. Describe the information or purpose that matters in the current context.

```html
<img
  src="community-garden.jpg"
  alt="Volunteers planting seedlings in raised garden beds">
```

If the page discusses the garden's wheelchair-accessible paths, that information may be the important content:

```html
<img
  src="community-garden.jpg"
  alt="Wide, level paths connect the garden's raised beds">
```

Do not add details that are unsupported or irrelevant. A literal description is appropriate when visual appearance is itself the information, such as in art history, product comparison, evidence review, or design critique.

### 4.1 Context changes the alternative

```html
<!-- Adoption profile: identity and appearance are relevant. -->
<img
  src="buddy.jpg"
  alt="Buddy, a golden retriever with a red collar">

<!-- Article already says Buddy is a golden retriever with a red collar. -->
<img src="buddy.jpg" alt="">

<!-- Training article: the depicted action is relevant. -->
<img
  src="buddy.jpg"
  alt="Buddy waits beside his handler before crossing the street">
```

Alternative text belongs to the image use, not permanently to the asset file.

## 5. Decorative and Redundant Images

Use an empty `alt` attribute when an HTML image adds no information or function in its context:

```html
<img src="decorative-wave.png" alt="">
```

Common examples include:

- borders, textures, flourishes, and spacers;
- an image that is fully described by adjacent text;
- an icon that repeats text inside the same link or button;
- an illustrative image included only for visual atmosphere.

Do not omit the attribute:

```html
<!-- Wrong: the browser or assistive technology may expose the filename. -->
<img src="decorative-wave.png">

<!-- Wrong: this announces content that should be ignored. -->
<img src="decorative-wave.png" alt="decorative wave">

<!-- Correct. -->
<img src="decorative-wave.png" alt="">
```

For `<img>`, prefer `alt=""` over adding `role="presentation"`. Do not use `aria-hidden="true"` to conceal an image that provides information or a control name.

An unnecessary description is not harmless. It can interrupt reading order, repeat visible content, obscure nearby information, and make a page more tiring to navigate.

## 6. Functional Images

When an image is the only content of a link or control, its alternative describes the action or destination, not the icon's shape.

### 6.1 Image-only link

```html
<a href="/">
  <img src="acme-logo.svg" alt="Acme home">
</a>
```

`Acme home` communicates both the organization and the destination. `Company logo` does not.

### 6.2 Image plus link text

When the text in the same link already describes the destination, make a redundant image decorative:

```html
<a href="/reports/annual">
  <img src="report-cover.jpg" alt="">
  <span>2026 annual report</span>
</a>
```

If the image adds information needed to understand the link, use complementary text rather than repeating the visible label.

### 6.3 Button with visible text

Visible text is usually the clearest label:

```html
<button type="submit">
  <img src="search.svg" alt="">
  <span>Search</span>
</button>
```

### 6.4 Icon-only button

Put the control name on the button and hide the image from assistive technology:

```html
<button type="button" aria-label="Close dialog">
  <img src="close.svg" alt="">
</button>
```

If the control has a visible text label, its accessible name should contain that visible text. This supports people who use speech input and is required by [WCAG 2.2 Success Criterion 2.5.3](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html).

### 6.5 Image submit buttons

An `<input type="image">` uses `alt` to provide its control name:

```html
<input type="image" src="submit-order.png" alt="Submit order">
```

Prefer a normal `<button>` with real text when possible because it is easier to style, translate, and maintain.

## 7. Images of Text and Logos

Use real HTML text instead of an image of text when the technology can produce the required presentation. Real text can resize, reflow, adapt to user colors, and be translated more reliably.

If an image contains important words that are not available nearby, include those words in the text alternative:

```html
<img
  src="sale-banner.png"
  alt="Summer sale: 50% off through July 31">
```

If the same message appears as real text next to the image, use an empty alternative:

```html
<img src="sale-banner.png" alt="">
<p><strong>Summer sale:</strong> 50% off through July 31.</p>
```

For a poster, scanned notice, or screenshot containing substantial text, provide the full important text as visible page content. The `alt` can identify the image and point to that equivalent:

```html
<figure>
  <img
    src="community-meeting-poster.jpg"
    alt="Community meeting poster. Event details follow.">
  <figcaption>
    <p><strong>Community planning meeting</strong></p>
    <p>September 12, 6:30 p.m., Central Library, Room 2.</p>
  </figcaption>
</figure>
```

Logotypes are considered essential images of text under WCAG 1.4.5, but they still need an appropriate text alternative. Usually the organization or product name is sufficient. Add `home` when a logo is the only content of a home-page link.

## 8. Complex Images

Charts, diagrams, maps, infographics, and other complex images need an equivalent that preserves the information and relationships required for the task.

Use two parts:

1. a short alternative that identifies the image and its purpose or main conclusion;
2. a visible detailed description, data table, ordered steps, nested list, or other structure that conveys the essential information.

```html
<figure>
  <img
    src="revenue-trend.png"
    alt="Line chart showing revenue rising each quarter in 2025. Data table follows.">
  <figcaption>
    <p>
      Revenue increased from $1.2 million in the first quarter to
      $2.1 million in the fourth quarter.
    </p>
    <table>
      <caption>Quarterly revenue for 2025</caption>
      <thead>
        <tr>
          <th scope="col">Quarter</th>
          <th scope="col">Revenue</th>
        </tr>
      </thead>
      <tbody>
        <tr><th scope="row">Q1</th><td>$1.2 million</td></tr>
        <tr><th scope="row">Q2</th><td>$1.5 million</td></tr>
        <tr><th scope="row">Q3</th><td>$1.8 million</td></tr>
        <tr><th scope="row">Q4</th><td>$2.1 million</td></tr>
      </tbody>
    </table>
  </figcaption>
</figure>
```

The detailed equivalent should communicate the relevant:

- values, labels, units, scales, and source;
- trends, comparisons, outliers, and uncertainty;
- sequence, hierarchy, or relationships;
- instructions or decisions supported by the image;
- visual properties when they are themselves meaningful.

Prefer descriptions that are visible to everyone. If the description is on another page or elsewhere on the same page, provide a clear nearby link. Do not rely on the obsolete `longdesc` attribute.

Use `aria-describedby` only for a concise, plain-text description. Content referenced by `aria-describedby` is commonly exposed as a single description and can lose headings, tables, and other navigation structure. It is not a substitute for visible structured content.

See [Charts and Graphs Accessibility Best Practices](./CHARTS_GRAPHS_ACCESSIBILITY_BEST_PRACTICES.md) and [Maps Accessibility Best Practices](./MAPS_ACCESSIBILITY_BEST_PRACTICES.md).

## 9. Figures and Captions

`<figcaption>` provides a visible caption for a `<figure>`. It does not justify omitting the `alt` attribute from an informative `<img>`.

Choose the relationship between alternative and caption deliberately:

- If the caption already provides the full equivalent information, use `alt=""` to avoid repetition.
- If the image adds information beyond the caption, make the `alt` complementary.
- If the caption is a title, credit, source, or commentary rather than an equivalent, the image still needs its own alternative.

```html
<figure>
  <img
    src="river-at-dawn.jpg"
    alt="Mist rises above the river as two canoeists approach the bridge">
  <figcaption>Morning commute, photograph by Lena Ortiz</figcaption>
</figure>
```

Do not copy the same sentence into both `alt` and `<figcaption>`. Do not put copyright, licensing, or photo-credit information only in `alt`; keep that information visible.

## 10. Groups and Collections of Images

When several images combine to express one value, provide the value once and hide the repeated visual units:

```html
<p>
  <span>Rating: 4 out of 5</span>
  <span aria-hidden="true">★★★★☆</span>
</p>
```

If separate `<img>` elements must be used, one alternative can describe the combined value and the others can use `alt=""`.

When a collection contains distinct meaningful images, each image needs an alternative appropriate to its role. A gallery caption can describe the collection, while each image alternative distinguishes that item.

## 11. Responsive Images and Art Direction

In a `<picture>` element, place the `alt` attribute on the fallback `<img>`, not on `<source>`:

```html
<picture>
  <source media="(min-width: 60rem)" srcset="team-wide.jpg">
  <source media="(min-width: 30rem)" srcset="team-medium.jpg">
  <img
    src="team-close.jpg"
    alt="The support team gathered around a conference table">
</picture>
```

Every responsive source must communicate substantially the same information. If art direction changes the image's meaning, one shared alternative may no longer be accurate. Change the content model or provide equivalent visible text rather than allowing the alternative to contradict a source image.

## 12. CSS Background Images

CSS background images do not provide image semantics or an `alt` attribute. They are suitable for decoration or when equivalent information and function are already present as real content.

```css
.page-banner {
  background-image: url("decorative-grid.svg");
}
```

Do not place the only instruction, status, label, or meaningful image in CSS:

```html
<!-- Wrong: the award exists only as a background image. -->
<div class="award-badge"></div>

<!-- Better: provide the information in HTML. -->
<p class="award-badge">Winner, 2026 Inclusive Design Award</p>
```

Background images may disappear when user styles, high-contrast settings, forced colors, print styles, content blockers, or network failures are active. The page must not depend on them for essential content or operation.

## 13. Image Maps and Other Image Technologies

For a client-side image map:

- give the `<img>` an alternative that provides the overall context;
- give each linked `<area>` an `alt` that describes its destination or action;
- provide equivalent ordinary text links when needed for responsive or input support.

```html
<img
  src="campus-map.png"
  alt="Campus buildings"
  usemap="#campus-buildings">

<map name="campus-buildings">
  <area
    shape="rect"
    coords="20,30,120,100"
    href="/library"
    alt="Central Library">
  <area
    shape="rect"
    coords="140,30,240,100"
    href="/student-centre"
    alt="Student Centre">
</map>
```

For inline SVG, use the patterns in [SVG Accessibility Best Practices](./SVG_ACCESSIBILITY_BEST_PRACTICES.md). For `<canvas>`, provide equivalent fallback content and keyboard-operable alternatives to any interaction. Do not assume that `aria-label` alone can replace complex canvas content.

## 14. Writing Useful Alternative Text

### 14.1 Include what matters

Consider:

- why the image was selected;
- what information a person needs for the surrounding task;
- what nearby text already communicates;
- whether the medium, composition, color, direction, or emotion is relevant;
- whether an action, destination, identity, state, or relationship is shown;
- whether a full description should be visible to everyone.

### 14.2 Do not follow blanket wording bans

Prefixes such as `image of` or `photo of` are often redundant, but the medium can matter. `Oil painting of the harbor after the storm` communicates information that `Harbor after the storm` does not. Use the medium when it changes meaning, source, interpretation, or task.

There is no reliable rule that a certain word count is always correct. Avoid filenames, keyword lists, filler, and unnecessary repetition. Preserve the complete meaning even when that requires a detailed visible description.

### 14.3 Use punctuation and natural language

Write in the language of the page. Use normal capitalization and punctuation so synthesized speech and Braille output are understandable. Do not force punctuation tricks to control a specific screen reader's pauses.

### 14.4 Handle identity and sensitive attributes carefully

Use a person's name only when their identity is known, relevant, and appropriate to publish. Do not infer race, ethnicity, gender identity, disability, diagnosis, religion, age, emotion, or relationship from appearance.

Describe a visible characteristic only when it contributes to the purpose. For example, a guide about step-free entrances may need to describe the depicted route and mobility equipment. A generic staff portrait usually does not.

### 14.5 Do not treat SEO text as an alternative

Alternative text is for equivalent information and function. Do not add marketing phrases, search keywords, copyright notices, or unrelated metadata.

## 15. Common Failure Patterns

| Failure | Better approach |
| --- | --- |
| Missing `alt` on an informative `<img>` | Provide an equivalent alternative. |
| Missing `alt` on a decorative `<img>` | Use `alt=""`. |
| `alt="image"`, `alt="photo"`, or `alt="graphic"` | Describe the relevant content or purpose. |
| Filename, URL, database ID, or generated code as `alt` | Replace it with contextual author-written text. |
| `alt="decorative"` or `alt="spacer"` | Use `alt=""`. |
| `alt="TBD"`, `alt="TODO"`, `alt="null"`, or similar placeholder | Block publication until the author makes a real decision. |
| Text alternative repeats nearby link text or caption | Use `alt=""` or complementary text. |
| Icon-only control named by its shape | Name the action or destination. |
| `title` used instead of `alt` | Use `alt`; do not rely on hover-only text. |
| `aria-label` added to `<img>` instead of `alt` | Use the native `alt` attribute for HTML images. |
| Full chart data forced into a long `alt` | Use a short alternative plus visible structured data. |
| Every image begins with `image of` | Include the medium only when it matters. |
| Every portrait includes guessed demographics or emotion | Include only known, relevant, appropriate information. |
| One asset-level alternative reused everywhere | Author an alternative for each context. |
| AI-generated text published without review | Require contextual human approval. |

## 16. CMS and Authoring Requirements

A content system should support the decision, not merely require a non-empty field.

### 16.1 Authoring interface

Provide authors with:

- a required choice such as **Informative**, **Functional**, **Decorative or redundant**, or **Needs detailed description**;
- an alternative-text field that permits a deliberately empty value for decorative images;
- context explaining where and how the image will be used;
- a visible preview of surrounding headings, captions, links, and controls;
- a structured field or nearby content area for detailed descriptions;
- per-use alternatives when the same asset appears in different contexts;
- translation status and language controls;
- a way to revisit the decision when the image or content changes.

Do not automatically fill empty fields with filenames, asset titles, captions, or previous alternatives. A caption, credit, internal asset name, and text alternative serve different purposes.

### 16.2 Publication validation

Block publication when:

- no alt decision has been made;
- an informative image has no alternative or equivalent visible text;
- a functional image does not give its control a useful name;
- a complex image lacks its necessary detailed equivalent;
- a placeholder or filename was inserted as the alternative.

Do not block a deliberate `alt=""` solely because the field is empty. Instead, require the author to confirm that the image is decorative or redundant in that use.

### 16.3 Maintenance

Include images in content review, translation, and expiration workflows. When an image is replaced, do not silently retain the old alternative. When content is localized, translate the alternative into the page language and recheck culturally specific references.

## 17. AI-Assisted Alternative Text

AI can suggest a draft description, but it cannot reliably know the editorial purpose, surrounding task, intended audience, or whether the image is redundant.

An AI-assisted workflow should:

1. provide the image plus safe surrounding context;
2. ask for purpose-equivalent text, not a visual inventory;
3. distinguish informative, functional, decorative, and complex uses;
4. identify uncertainty rather than fabricate details;
5. avoid inferring sensitive attributes or identifying unknown people;
6. avoid exposing private images or metadata to an unapproved service;
7. require a responsible person to review the suggestion in the rendered context;
8. preserve the author's deliberate empty-alt decision;
9. send complex images for a detailed human-authored equivalent;
10. record that the content needs review again when the source image changes.

Do not let AI-generated confidence replace editorial accountability. A fluent description can still be inaccurate, biased, irrelevant, or unsafe.

## 18. Testing

### 18.1 Manual content review

For every image use:

1. identify the image's purpose in the current task;
2. compare its relevant information with nearby text;
3. inspect the actual `alt` value or control name;
4. confirm that decorative images are ignored;
5. confirm that informative alternatives are accurate and not repetitive;
6. confirm that functional images communicate the action or destination;
7. read complex descriptions and verify values, order, and relationships against the image;
8. check the page language and translation;
9. review privacy, identity, and sensitive descriptions;
10. verify that responsive sources communicate the same meaning.

### 18.2 Keyboard and assistive technology review

Use the project's supported browser and assistive technology combinations. Navigate the page in reading order and operate every image-based link or control. Confirm that:

- the image alternative is exposed in the correct place;
- decorative images do not create announcements or navigation stops;
- links and controls have concise, distinct, purpose-oriented names;
- visible control labels are contained in accessible names;
- structured descriptions remain navigable as headings, lists, or tables;
- focus and operation do not depend on pointing at the image.

Do not make one screen reader and browser combination a universal Definition of Done. Test the environments the product supports and use additional combinations when a failure appears implementation-specific.

### 18.3 Automated checks

Automation can help detect:

- missing `alt` attributes;
- empty alternatives on some interactive images;
- missing names on image buttons or image-map areas;
- filenames, placeholders, or repeated suspicious values;
- duplicated alternatives in some contexts;
- inaccessible image markup patterns.

Automation cannot reliably determine:

- whether the image is informative or decorative in context;
- whether the alternative communicates the intended meaning;
- whether a description is accurate, complete, biased, or unsafe;
- whether nearby text already provides the equivalent;
- whether a complex description preserves all necessary relationships;
- whether a different alternative is needed for another use of the same asset.

Store the tool and rule version with results. Review a tool's finding before turning it into a confirmed issue. See [Accessibility Bug Reporting Best Practices](./ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES.md).

## 19. Definition of Done

Before publishing or closing an image accessibility issue, verify that:

- [ ] every image use has an explicit purpose and alt decision;
- [ ] every meaningful `<img>` has an accurate contextual `alt`;
- [ ] every decorative or fully redundant `<img>` has `alt=""`;
- [ ] no filename, placeholder, keyword list, credit, or unrelated metadata is used as `alt`;
- [ ] functional images provide useful link or control names;
- [ ] visible control labels are included in accessible names;
- [ ] important words shown only in an image are also available as text alternatives or visible text;
- [ ] complex images have a short identification and an accessible detailed equivalent;
- [ ] captions and alternatives complement rather than duplicate each other;
- [ ] responsive sources convey the same essential meaning;
- [ ] CSS images are not the only source of information or function;
- [ ] alternatives use the page language and are included in translation workflows;
- [ ] descriptions do not invent identity, emotion, or sensitive attributes;
- [ ] AI-generated suggestions received contextual human review;
- [ ] manual review was completed in the rendered context;
- [ ] relevant image-based links and controls were tested with keyboard and supported assistive technologies;
- [ ] automated checks were supplemented by human judgment;
- [ ] the original user-facing barrier was retested after remediation.

## 20. Related WCAG 2.2 Criteria

| Criterion | Level | Relevance |
| --- | --- | --- |
| [1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html) | A | Provides equivalent alternatives or appropriate handling for non-text content. |
| [1.4.5 Images of Text](https://www.w3.org/WAI/WCAG22/Understanding/images-of-text.html) | AA | Uses real text instead of images of text unless the image is customizable or the presentation is essential. |
| [1.4.9 Images of Text (No Exception)](https://www.w3.org/WAI/WCAG22/Understanding/images-of-text-no-exception.html) | AAA | Restricts images of text to pure decoration or essential presentation. |
| [2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html) | A | Requires image-only and combined links to communicate their purpose in context. |
| [2.5.3 Label in Name](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html) | A | Requires visible control text to be contained in the programmatic name. |
| [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html) | A | Requires image-based controls to expose an appropriate name and role. |

WCAG techniques are informative examples, not mandatory implementations. Judge conformance against the normative success criteria.

## 21. Related Guides

- [SVG Accessibility Best Practices](./SVG_ACCESSIBILITY_BEST_PRACTICES.md)
- [Charts and Graphs Accessibility Best Practices](./CHARTS_GRAPHS_ACCESSIBILITY_BEST_PRACTICES.md)
- [Maps Accessibility Best Practices](./MAPS_ACCESSIBILITY_BEST_PRACTICES.md)
- [Color Contrast Accessibility Best Practices](./COLOR_CONTRAST_ACCESSIBILITY_BEST_PRACTICES.md)
- [Accessibility Bug Reporting Best Practices](./ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES.md)

## References

- [W3C WAI Images Tutorial](https://www.w3.org/WAI/tutorials/images/)
- [W3C WAI alt Decision Tree](https://www.w3.org/WAI/tutorials/images/decision-tree/)
- [W3C WAI Informative Images](https://www.w3.org/WAI/tutorials/images/informative/)
- [W3C WAI Decorative Images](https://www.w3.org/WAI/tutorials/images/decorative/)
- [W3C WAI Functional Images](https://www.w3.org/WAI/tutorials/images/functional/)
- [W3C WAI Images of Text](https://www.w3.org/WAI/tutorials/images/textual/)
- [W3C WAI Complex Images](https://www.w3.org/WAI/tutorials/images/complex/)
- [W3C WAI Groups of Images](https://www.w3.org/WAI/tutorials/images/groups/)
- [W3C WAI Image Maps](https://www.w3.org/WAI/tutorials/images/imagemap/)
- [Understanding WCAG 2.2 Success Criterion 1.1.1](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html)
- [Technique H37: Using alt attributes on img elements](https://www.w3.org/WAI/WCAG22/Techniques/html/H37)
- [Technique H67: Using null alt text for images assistive technology should ignore](https://www.w3.org/WAI/WCAG22/Techniques/html/H67)
- [Technique H2: Combining adjacent image and text links](https://www.w3.org/WAI/WCAG22/Techniques/html/H2)

## Machine-Readable Standards Metadata

```yaml
standards:
  wcag:
    version: "2.2"
    uri: "https://www.w3.org/TR/WCAG22/"
  primary_success_criterion:
    id: "1.1.1"
    name: "Non-text Content"
    level: "A"
    uri: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html"
related_success_criteria:
  - id: "1.4.5"
    name: "Images of Text"
    level: "AA"
  - id: "1.4.9"
    name: "Images of Text (No Exception)"
    level: "AAA"
  - id: "2.4.4"
    name: "Link Purpose (In Context)"
    level: "A"
  - id: "2.5.3"
    name: "Label in Name"
    level: "A"
  - id: "4.1.2"
    name: "Name, Role, Value"
    level: "A"
```

## License

This document is available under the repository's [MIT License](../LICENSE).
