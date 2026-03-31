---
title: Image Alt Text Accessibility Best Practices
---

# Image Alt Text Accessibility Best Practices

Alt text (alternative text) makes images accessible to people who cannot see them — including blind and low-vision users relying on screen readers, users in low-bandwidth environments, search engines, and anyone whose images fail to load. Getting alt text right requires understanding the image's purpose, not just describing its visual appearance.

## 1. Core Mandate

**WCAG 2.2 Success Criterion 1.1.1 — Non-text Content (Level A):** Every non-text element must have a text alternative that conveys the same meaning and purpose. There are no exceptions for decorative images; those require an explicit empty alt attribute.

Alt text quality is one of the most consistently failing accessibility issues across the web. Automated tools can flag missing alt text, but only human judgment can determine whether the alt text is *meaningful* and *appropriate* for the context.

## 2. Severity Scale

| Severity | Example |
|----------|---------|
| **Critical** | Image conveying essential meaning has no alt text or `alt` attribute is entirely absent |
| **Serious** | Functional image (button/link) has no text alternative, preventing keyboard/screen reader use |
| **Moderate** | Alt text is present but inaccurate, redundant ("image of…"), or missing meaningful context |
| **Minor** | Alt text is slightly verbose or could be improved but does not prevent understanding |

## 3. The Alt Text Decision Tree

Use this flowchart (based on the [W3C WAI Images Tutorial decision tree](https://www.w3.org/WAI/tutorials/images/decision-tree/)) to determine what type of alt text to provide:

```
Does the image contain text?
├── YES → Use the same text as the alt attribute (unless the text is decorative/logo)
└── NO
    └── Is the image used for a functional purpose (link, button)?
        ├── YES → Describe the destination/action (e.g., "Go to homepage")
        └── NO
            └── Does the image convey information not present in surrounding text?
                ├── YES
                │   └── Is the image complex (chart, diagram, graph)?
                │       ├── YES → Provide a short alt + long description in nearby text
                │       └── NO  → Write a concise description of the content and meaning
                └── NO
                    └── Is the image purely decorative or redundant?
                        ├── YES → Use empty alt: alt=""
                        └── NO  → Re-evaluate — the image likely carries meaning
```

## 4. Image Categories and Requirements

### 4.1 Informative Images

Images that convey information not expressed in surrounding text.

**Requirement:** Write alt text that describes the *information* conveyed, not the visual appearance.

```html
<!-- DO: Describe the meaning/content -->
<img src="quarterly-growth.png" alt="Bar chart showing 23% revenue growth in Q3 2024">

<!-- DON'T: Describe the visual appearance only -->
<img src="quarterly-growth.png" alt="Blue and green bar chart">

<!-- DON'T: Use file names or generic labels -->
<img src="quarterly-growth.png" alt="quarterly-growth.png">
<img src="quarterly-growth.png" alt="image">
```

### 4.2 Decorative Images

Images that are purely aesthetic and add no information beyond what is already provided in the page text.

**Requirement:** Use an empty `alt` attribute (`alt=""`). Never omit the `alt` attribute — a missing `alt` attribute causes screen readers to announce the file name.

```html
<!-- DO: Empty alt for decorative images -->
<img src="decorative-divider.png" alt="">

<!-- DO: aria-hidden for inline SVG decorations -->
<svg aria-hidden="true" focusable="false">...</svg>

<!-- DON'T: Omit alt entirely -->
<img src="decorative-divider.png">

<!-- DON'T: Use "decorative" or "spacer" as alt text -->
<img src="decorative-divider.png" alt="decorative">
```

**When is an image truly decorative?**

Too many images are incorrectly marked as decorative. An image is decorative only if:

- It is purely aesthetic (a visual flourish, border, or texture)
- It does not add any information beyond what surrounding text already conveys
- Removing it would not affect a user's understanding of the content
- It is not the only means of conveying an action (buttons, links)

When in doubt, provide alt text. The cost of unnecessary alt text is low; the cost of missing alt text can be complete loss of meaning.

### 4.3 Functional Images

Images that are the only content of a link or button, where the image communicates the action or destination.

**Requirement:** Describe the *function*, not the visual appearance.

```html
<!-- DO: Describe the link destination -->
<a href="/home">
  <img src="logo.svg" alt="Go to homepage">
</a>

<!-- DO: Describe the button action -->
<button>
  <img src="search-icon.svg" alt="Search">
</button>

<!-- DO: Use aria-label on the button, with empty alt on the image -->
<button aria-label="Search">
  <img src="search-icon.svg" alt="">
</button>

<!-- DON'T: Describe the appearance -->
<a href="/home">
  <img src="logo.svg" alt="Company logo image">
</a>

<!-- DON'T: Leave functional images with empty alt (creates unlabelled control) -->
<button>
  <img src="search-icon.svg" alt="">
  <!-- Missing accessible name on the button — use aria-label instead -->
</button>
```

### 4.4 Complex Images

Charts, graphs, diagrams, maps, and infographics where a short alt text cannot convey all the information.

**Requirement:** Provide a short alt text summarizing the image's purpose AND a long description (adjacent text, expandable section, or linked page) conveying the full content.

```html
<!-- Pattern 1: Alt summary + adjacent long description -->
<figure>
  <img
    src="accessibility-adoption-chart.png"
    alt="Line chart: WCAG AA adoption rose from 38% in 2020 to 67% in 2024"
    aria-describedby="chart-desc">
  <figcaption id="chart-desc">
    Annual WCAG 2.1 Level AA adoption rates from 2020 to 2024 across a sample
    of 10,000 public websites. Adoption grew steadily from 38% in 2020 to 45%
    in 2021, 51% in 2022, 59% in 2023, and 67% in 2024, driven by increased
    procurement requirements.
  </figcaption>
</figure>

<!-- Pattern 2: Long description linked separately -->
<img
  src="org-chart.png"
  alt="Organizational chart: Engineering department structure"
  aria-describedby="org-chart-longdesc">
<div id="org-chart-longdesc">
  <p>The Engineering department has three divisions reporting to the CTO:
  Platform (12 engineers), Product (18 engineers), and Infrastructure (8 engineers).
  Each division has one director and two team leads.</p>
</div>
```

### 4.5 Images of Text

Images that contain text (screenshots, scanned documents, typographic art).

**Requirement:** Reproduce the exact text in the `alt` attribute. Prefer actual text over images of text whenever possible (WCAG 1.4.5).

```html
<!-- DO: Reproduce the exact text -->
<img src="sale-banner.png" alt="Summer Sale: 50% off all items through July 31">

<!-- DO: For logos with text, use the text as the alt -->
<img src="company-logo.png" alt="Acme Corporation">

<!-- DON'T: Describe that it is text -->
<img src="sale-banner.png" alt="Sale banner showing promotional text">
```

### 4.6 Groups of Images

When multiple images work together to convey a single piece of information (e.g., a star rating).

**Requirement:** Provide alt text on only one image that conveys the group meaning; mark the others as decorative.

```html
<!-- Star rating: 4 out of 5 stars -->
<img src="star-filled.png" alt="Rating: 4 out of 5 stars">
<img src="star-filled.png" alt="">
<img src="star-filled.png" alt="">
<img src="star-filled.png" alt="">
<img src="star-empty.png" alt="">
```

### 4.7 Linked Images with Adjacent Text

When an image and text are together inside the same link.

**Requirement:** Use `alt=""` on the image to avoid redundant announcements. The link text describes the destination.

```html
<!-- DO: Empty alt when link text describes the destination -->
<a href="/articles/accessibility-guide">
  <img src="accessibility-thumbnail.jpg" alt="">
  <span>The Complete Accessibility Guide</span>
</a>

<!-- DON'T: Duplicate the link text in alt -->
<a href="/articles/accessibility-guide">
  <img src="accessibility-thumbnail.jpg" alt="The Complete Accessibility Guide">
  The Complete Accessibility Guide
</a>
```

## 5. Writing Quality Alt Text

### Principles

1. **Be concise but complete.** Aim for 125 characters or fewer for simple images; use long descriptions for complex images. Do not truncate meaning for the sake of brevity.

2. **Describe the content and purpose, not the appearance.** "Person in a wheelchair using a laptop" is more useful than "image of a person".

3. **Context is everything.** The same image can have different alt text depending on how it is used. A photo of a dog on a pet adoption page needs different alt text than the same photo used to illustrate a news article about animal rescue.

4. **Do not start with "Image of", "Picture of", or "Photo of".** Screen readers already announce that they are reading an image. These prefixes waste characters and create a poor listening experience.

5. **Avoid keyword stuffing.** Alt text serves users, not search engines. Stuffing alt text with keywords degrades the experience for screen reader users.

6. **Include text that appears within the image.** If an image contains a heading, caption, or data, include that text in the alt.

7. **Match the level of detail to the image's role.** A thumbnail used purely for navigation needs less detail than a standalone informative image.

### Examples of Poor vs. Good Alt Text

| Context | Poor Alt Text | Good Alt Text |
|---------|--------------|---------------|
| Product photo | `"image001.jpg"` | `"Red leather messenger bag with brass buckle closures"` |
| Chart | `"chart.png"` | `"Bar chart: JavaScript (67%) is the most-used language, followed by Python (45%) and TypeScript (38%)"` |
| Person | `"photo"` | `"Maria Chen, Director of Engineering, presenting at a conference"` |
| Icon button | `"icon"` | `"Close dialog"` |
| Decorative border | `"border"` | `""` (empty alt) |
| Screenshot of error | `"screenshot"` | `"Error message: 'Your session has expired. Please log in again.'"` |
| Infographic | `"infographic about web accessibility"` | Short summary alt + adjacent long description |

## 6. Context-Sensitive Alt Text

The same image can require different alt text in different contexts. Always consider the surrounding content.

```html
<!-- Context 1: Article about animal therapy programs
     The key information is the therapy setting -->
<img src="golden-retriever.jpg"
     alt="A therapy dog visiting patients in a hospital ward">

<!-- Context 2: Pet adoption listing
     The key information is the breed and appearance -->
<img src="golden-retriever.jpg"
     alt="Golden retriever, 2 years old, named Buddy">

<!-- Context 3: Decorative header image on a veterinary clinic website
     The image adds no information beyond the visual style -->
<img src="golden-retriever.jpg" alt="">
```

## 7. CSS Background Images

CSS background images declared with `background-image` do not support `alt` text. Use them only for decorative purposes. If a CSS background image conveys meaning, replace it with an `<img>` element with proper alt text.

```css
/* OK: Decorative pattern — no accessible name needed */
.hero {
  background-image: url('geometric-pattern.svg');
}
```

```html
<!-- NOT OK: Meaningful image as CSS background (invisible to screen readers) -->
<div style="background-image: url('award-badge.png')"><!-- no text alternative --></div>

<!-- DO: Use <img> for meaningful images -->
<img src="award-badge.png" alt="Winner: Best Accessibility Tool 2024">
```

## 8. Automated Testing vs. Human Review

| What Automated Tools Can Detect | What Requires Human Review |
|---------------------------------|---------------------------|
| Missing `alt` attribute | Whether alt text is meaningful |
| Empty alt on functional images | Whether alt text matches context |
| Alt text that equals the file name | Whether a decorative image actually needs alt text |
| Alt text over a length threshold | Whether long descriptions are accurate |
| Repeated alt text on distinct images | Whether the level of detail is appropriate |

Automated tools such as axe-core detect structural alt text issues. Human review is always required to evaluate quality.

## 9. Definition of Done Checklist

Before publishing any page with images:

- [ ] Every `<img>` element has an `alt` attribute (even decorative images use `alt=""`)
- [ ] Decorative images use `alt=""` and are confirmed to add no meaning
- [ ] Functional images (links, buttons) describe the action or destination
- [ ] Alt text does not begin with "image of", "picture of", or "photo of"
- [ ] Alt text does not repeat the file name or generic label ("image", "photo")
- [ ] Complex images (charts, diagrams) have both a short alt and a long description
- [ ] Images of text reproduce the exact text in the alt attribute
- [ ] Grouped images convey combined meaning via one image's alt (others are `alt=""`)
- [ ] Linked images with adjacent link text use `alt=""` on the image
- [ ] CSS background images are decorative (meaningful images use `<img>`)
- [ ] Alt text has been reviewed in context, not just in isolation
- [ ] Alt text has been tested with a screen reader (NVDA + Firefox or VoiceOver + Safari)

## 10. Key WCAG Criteria

| Criterion | Level | Requirement |
|-----------|-------|-------------|
| [1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html) | A | All non-text content has a text alternative |
| [1.4.5 Images of Text](https://www.w3.org/WAI/WCAG22/Understanding/images-of-text.html) | AA | Use real text instead of images of text where possible |
| [1.4.9 Images of Text (No Exception)](https://www.w3.org/WAI/WCAG22/Understanding/images-of-text-no-exception.html) | AAA | Images of text are used only for decoration or where essential |
| [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html) | A | All UI components have accessible names and roles |

## 11. Testing Alt Text

### Manual Testing with Screen Readers

1. **NVDA + Firefox (Windows):** Press `I` to navigate images. Listen to what is announced.
2. **VoiceOver + Safari (macOS/iOS):** Use VO+Command+G to navigate images.
3. **TalkBack (Android):** Explore by touch and listen for image descriptions.

### Using the Images List

Most screen readers provide a list of all images on the page:

- **NVDA:** Insert+F7 → Images tab
- **JAWS:** Insert+F3 → select Images
- **VoiceOver:** Use the rotor (VO+U), select Images

Review this list to spot missing or generic alt text across the full page.

### Automated Testing

```bash
# axe-core CLI (requires @axe-core/cli)
axe --tags wcag2a,wcag2aa https://example.com

# Check specifically for image-related rules:
# image-alt, image-redundant-alt, input-image-alt, area-alt, object-alt
```

## 12. References

### Authoritative Standards

- [W3C WAI — Images Tutorial and Decision Tree](https://www.w3.org/WAI/tutorials/images/decision-tree/) (W3C Web Accessibility Initiative)
- [WCAG 2.2 — 1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html) (W3C)
- [Section 508 — Alternative Text](https://www.section508.gov/create/alternative-text/) (U.S. General Services Administration)
- [Canada.ca — Alternative Text and Long Description Best Practices](https://a11y.canada.ca/en/alternative-text-and-long-description-best-practices/) (Government of Canada)

### Practitioner Guides

- [Writing Effective Alt Text](https://webaim.org/techniques/alttext/) (WebAIM)
- [Great Alt Text: An Introduction](https://www.deque.com/blog/great-alt-text-introduction/) (Deque Systems)
- [Alt Text for Accessibility](https://www.levelaccess.com/blog/alt-text-for-accessibility/) (Level Access)
- [How to Write Great Alt Text](https://www.nngroup.com/articles/write-alt-text/) (Nielsen Norman Group)
- [Describe Content Images](https://accessibility.huit.harvard.edu/describe-content-images) (Harvard University HUIT)
- [Image Alt Text Best Practices](https://help.siteimprove.com/support/solutions/articles/80000863904-accessibility-image-alt-text-best-practices) (Siteimprove)

### Educational Institutions

- [Alternative Text and Long Description Best Practices](https://accessibility.ecampusontario.ca/accessibility/best-practices/alt-text/) (eCampus Ontario)
- [Accessibility — Images and Alt Text](https://accessibility.asu.edu/articles/images) (Arizona State University)
- [Image Alt Text](https://accessibility.psu.edu/images/alttext/) (Penn State University)
- [Alt Text Best Practices Guide](https://people.utoronto.ca/wp-content/uploads/2023/11/Alt-Text-Best-Practices-Guide-PSEC.pdf) (University of Toronto)
- [Accessibility Tip: Writing Alt Text](https://udayton.edu/blogs/onlinelearning/2026/accessibility-tip-2.php) (University of Dayton)

### Machine-Readable Standards

- [WCAG 2.2 machine-readable](https://github.com/mgifford/wai-yaml-ld/blob/main/wcag22/wcag22.yaml)
- [ARIA specification](https://github.com/mgifford/wai-yaml-ld/blob/main/aria/aria.yaml)
