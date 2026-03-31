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

**A practical judgment test:** Can you imagine a person who can see the image remarking on its content? If so, the image has told them something and needs a text alternative. For example, if a child looking at a holiday brochure would say "that swimming pool has a cool slide!", the slide image conveys meaning and needs alt text.

**If you find yourself debating whether an image is decorative, that is usually a sign that it is not.** Genuine decorative images are obvious — borders, spacers, background textures. Images that prompt discussion almost always carry meaning worth describing.

**Content authors decide, not templates.** The person closest to the content — the author publishing the page — is best placed to judge whether an image warrants a text alternative. Enforcing `alt=""` via a CMS template is a fast path to WCAG failures, because the template cannot know what the image shows or why the author included it. If an author cannot explain why an image is on the page, that is a signal the image may not belong there at all — not that it is decorative.

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

## 6. Common Bad Alt Text Patterns

The patterns below are detected by automated accessibility tools including [Sa11y](https://sa11y.netlify.app/), [Editoria11y](https://editoria11y.princeton.edu/), axe-core, and the [CivicActions alt-text scanner](https://github.com/CivicActions/site-evaluation-tools/blob/main/python/alt-text-scan.py). Automated detection only gets you so far — human review is always needed to confirm whether a description is meaningful in context.

### 6.1 Missing or Absent Alt Attribute

When the `alt` attribute is completely absent, most screen readers announce the image's filename or URL — rarely useful, often confusing.

```html
<!-- WRONG: No alt attribute — screen reader reads the filename -->
<img src="Q3-revenue-chart-final-v2.png">

<!-- RIGHT: Meaningful alt text -->
<img src="Q3-revenue-chart-final-v2.png"
     alt="Bar chart: Q3 2024 revenue reached $4.2M, up 18% from Q2">

<!-- RIGHT: Empty alt for confirmed decorative images -->
<img src="decorative-wave-border.png" alt="">
```

### 6.2 Filename or CMS-Injected Alt Text

CMSs sometimes auto-populate the `alt` attribute with the filename, a URL fragment, or an injected message. None of these communicate meaning to users.

```html
<!-- WRONG: Filename echoed as alt text -->
<img src="golden-retriever.jpg" alt="golden-retriever.jpg">
<img src="hero-banner.png"      alt="hero-banner.png">

<!-- WRONG: CMS-generated placeholder message -->
<img src="dog.png"
     alt="This image has an empty alt attribute; its file name is dog.png">

<!-- RIGHT: Replace with a human-authored description -->
<img src="golden-retriever.jpg"
     alt="Golden retriever running through autumn leaves in a park">
```

### 6.3 Generic Single-Word Placeholders

Single words that label the medium rather than the content are meaningless. The following values are flagged as errors by multiple accessibility checkers:

```html
<!-- WRONG: Medium label instead of a description -->
<img src="photo.jpg"   alt="image">
<img src="photo.jpg"   alt="photo">
<img src="photo.jpg"   alt="graphic">
<img src="photo.jpg"   alt="chart">
<img src="photo.jpg"   alt="alt">         <!-- meta-placeholder -->
<img src="spacer.gif"  alt="spacer">      <!-- use alt="" instead -->
<img src="divider.png" alt="decorative">  <!-- use alt="" instead -->

<!-- RIGHT: Empty alt for genuinely decorative images -->
<img src="spacer.gif"  alt="">

<!-- RIGHT: Meaningful description for informative images -->
<img src="photo.jpg"   alt="Two engineers reviewing a system diagram on a whiteboard">
```

### 6.4 Draft and Placeholder Text

Placeholder values intended for later completion that were never replaced ship silently as accessibility failures.

```html
<!-- WRONG: Unreplaced draft values -->
<img src="portrait.jpg" alt="TBD">
<img src="portrait.jpg" alt="TODO">
<img src="portrait.jpg" alt="placeholder">
<img src="portrait.jpg" alt="untitled">
<img src="portrait.jpg" alt="null">
<img src="portrait.jpg" alt="none">
<img src="portrait.jpg" alt="alt text">   <!-- meta-placeholder -->
<img src="portrait.jpg" alt="undefined">  <!-- CMS error output -->

<!-- RIGHT: Write the description before publishing -->
<img src="portrait.jpg"
     alt="Dr. Amara Osei, Professor of Environmental Science, at the lab bench">
```

### 6.5 "Type" Prefix Phrases

Starting alt text with "image of", "photo of", "graphic of", or "picture of" wastes characters and creates a poor listening experience — screen readers already identify the element as an image.

```html
<!-- WRONG: Redundant medium prefix -->
<img src="team-photo.jpg" alt="Image of the team">
<img src="team-photo.jpg" alt="Photo of team members">
<img src="team-photo.jpg" alt="Graphic of our team">
<img src="team-photo.jpg" alt="Picture of employees">

<!-- RIGHT: Begin with the meaningful content immediately -->
<img src="team-photo.jpg"
     alt="The Civic Innovations team of 12 staff gathered outside City Hall">
```

### 6.6 Machine-Generated or CMS-Injected Codes

Some CMSs generate cryptic identifiers or database keys as alt text. These are machine-readable but meaningless to people.

```html
<!-- WRONG: System-generated codes -->
<img src="img_4521.jpg" alt="$700VIDEOSABOUTTURTLESALL2SECONDSLONG">
<img src="banner.png"   alt="node--article--field-image--hero--full">
<img src="photo.png"    alt="IMG_20241103_145832">

<!-- RIGHT: A human-readable description -->
<img src="img_4521.jpg"
     alt="Sea turtles swimming over a coral reef in the Caribbean">
```

### 6.7 Alt Text That Duplicates a Figcaption

When an image inside a `<figure>` has an `alt` that exactly copies the `<figcaption>`, screen readers announce the same text twice. [Sa11y](https://sa11y.netlify.app/) flags this pattern specifically.

The correct approach depends on context:

- **If the figcaption fully describes the image:** Use `alt=""` so screen readers proceed directly to the caption.
- **If the image adds meaning beyond the caption:** Write a *complementary* alt that adds context rather than copying the caption word for word.

```html
<!-- WRONG: Alt text is a verbatim copy of the figcaption -->
<figure>
  <img src="annual-report-cover.jpg"
       alt="2024 Annual Report cover showing the city skyline at dusk">
  <figcaption>2024 Annual Report cover showing the city skyline at dusk</figcaption>
</figure>
<!-- Screen reader announces: "2024 Annual Report cover showing the city
     skyline at dusk. Image. 2024 Annual Report cover showing the city
     skyline at dusk." — needlessly repetitive -->

<!-- RIGHT option 1: Caption fully describes — use empty alt -->
<figure>
  <img src="annual-report-cover.jpg" alt="">
  <figcaption>2024 Annual Report cover showing the city skyline at dusk</figcaption>
</figure>

<!-- RIGHT option 2: Alt adds complementary context not in the caption -->
<figure>
  <img src="annual-report-cover.jpg"
       alt="Warm orange and purple hues silhouette the downtown skyline at dusk">
  <figcaption>2024 Annual Report: A year of growth for the city</figcaption>
</figure>
```

### 6.8 Name-Only Alt for Person Portraits

A portrait image with only the subject's name as alt text provides minimal context. Why is this image on the page? What does it tell a screen reader user that the surrounding text does not?

```html
<!-- POOR: Name only — barely more useful than no alt text -->
<img src="j-smith.jpg" alt="J Smith">

<!-- BETTER: Include role and context relevant to the page -->
<img src="j-smith.jpg"
     alt="Dr. Jane Smith, Chief Medical Officer, presenting at the 2024 health summit">

<!-- ACCEPTABLE: Adjacent figcaption is sufficiently descriptive -->
<figure>
  <img src="j-smith.jpg" alt="">
  <figcaption>Dr. Jane Smith, Chief Medical Officer</figcaption>
</figure>
```

> **Judgment note:** The name "J Smith" read in isolation tells a screen reader user only that an image exists of someone by that name. But when accompanied by a descriptive adjacent caption, an empty alt is often the right choice to avoid double-announcing the name.

### 6.9 Excessively Long Alt Text for Simple Images

Alt text that runs longer than approximately 250 characters degrades the screen reader experience for simple images. For complex images requiring extensive description, use a long description technique instead (see [Section 4.4 — Complex Images](#44-complex-images)).

```html
<!-- WRONG: Paragraph-length alt for a simple button image -->
<img src="login-button.png"
     alt="This is the login button which allows registered users of our platform
          to securely authenticate using their email address and password
          credentials in order to gain access to their personalized dashboard
          and account settings. Please click this button if you already have
          an account with us.">

<!-- RIGHT: Concise and functional -->
<img src="login-button.png" alt="Log in to your account">
```

### 6.10 Keyword-Stuffed Alt Text

Padding alt text with SEO keywords harms screen reader users without benefiting search rankings.

```html
<!-- WRONG: Keyword list masquerading as alt text -->
<img src="shoes.jpg"
     alt="buy shoes online cheap shoes discount shoes running shoes sale shoes free shipping">

<!-- RIGHT: Describe what the image shows -->
<img src="shoes.jpg" alt="Blue and white running shoes with cushioned sole">
```

## 7. Context-Sensitive Alt Text

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

## 8. CSS Background Images

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

## 9. Automated Testing vs. Human Review

| What Automated Tools Can Detect | What Requires Human Review |
|---------------------------------|---------------------------|
| Missing `alt` attribute | Whether alt text is meaningful |
| Empty alt on functional images | Whether alt text matches context |
| Alt text that equals the file name | Whether a decorative image actually needs alt text |
| Alt text over a length threshold | Whether long descriptions are accurate |
| Repeated alt text on distinct images | Whether the level of detail is appropriate |
| Suspicious prefix phrases ("image of", "photo of") | Whether the description conveys the right meaning |
| Known placeholder values ("TBD", "null", "undefined") | Whether content-author intent was decorative or informative |
| Alt text identical to adjacent figcaption | Whether the alt or the caption should be kept (or both) |
| Machine-generated CMS codes as alt text | Whether the replacement description is accurate |

Automated tools such as axe-core detect structural alt text issues. Human review is always required to evaluate quality.

## 10. Definition of Done Checklist

Before publishing any page with images:

- [ ] Every `<img>` element has an `alt` attribute (even decorative images use `alt=""`)
- [ ] Decorative images use `alt=""` and are confirmed to add no meaning
- [ ] Functional images (links, buttons) describe the action or destination
- [ ] Alt text does not begin with "image of", "picture of", or "photo of"
- [ ] Alt text does not repeat the file name or generic label ("image", "photo", "graphic", "chart")
- [ ] Alt text is not a draft placeholder ("TBD", "TODO", "null", "none", "undefined", "placeholder")
- [ ] Alt text is not a machine-generated code or CMS-injected message
- [ ] Complex images (charts, diagrams) have both a short alt and a long description
- [ ] Images of text reproduce the exact text in the alt attribute
- [ ] Grouped images convey combined meaning via one image's alt (others are `alt=""`)
- [ ] Linked images with adjacent link text use `alt=""` on the image
- [ ] Figures with a `<figcaption>` do not duplicate the caption verbatim in the `alt`
- [ ] Portrait images include the person's role and context, not just their name
- [ ] CSS background images are decorative (meaningful images use `<img>`)
- [ ] Alt text has been reviewed in context, not just in isolation
- [ ] Alt text has been tested with a screen reader (NVDA + Firefox or VoiceOver + Safari)

## 11. Key WCAG Criteria

| Criterion | Level | Requirement |
|-----------|-------|-------------|
| [1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html) | A | All non-text content has a text alternative |
| [1.4.5 Images of Text](https://www.w3.org/WAI/WCAG22/Understanding/images-of-text.html) | AA | Use real text instead of images of text where possible |
| [1.4.9 Images of Text (No Exception)](https://www.w3.org/WAI/WCAG22/Understanding/images-of-text-no-exception.html) | AAA | Images of text are used only for decoration or where essential |
| [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html) | A | All UI components have accessible names and roles |

## 12. Testing Alt Text

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

## 13. References

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
- [Decorative Images](https://www.w3.org/WAI/tutorials/images/decorative/) (W3C WAI Images Tutorial)

### Accessibility Checkers That Inspect Alt Text

- [Sa11y](https://sa11y.netlify.app/) — flags suspicious alt text, alt matching figcaption, and placeholder patterns
- [Editoria11y](https://editoria11y.princeton.edu/) — flags missing alt, filename alt, placeholder alt, and machine-generated codes
- [axe-core](https://github.com/dequelabs/axe-core) — rules: `image-alt`, `image-redundant-alt`, `input-image-alt`, `area-alt`, `object-alt`
- [CivicActions alt-text scanner](https://github.com/CivicActions/site-evaluation-tools/blob/main/python/alt-text-scan.py) — scans sites for suspicious and meaningless alt text patterns
- [Drupal Alt Text Validation module](https://www.drupal.org/project/alt_text_validation) — CMS-level validation of alt text patterns

### Educational Institutions

- [Alternative Text and Long Description Best Practices](https://accessibility.ecampusontario.ca/accessibility/best-practices/alt-text/) (eCampus Ontario)
- [Accessibility — Images and Alt Text](https://accessibility.asu.edu/articles/images) (Arizona State University)
- [Image Alt Text](https://accessibility.psu.edu/images/alttext/) (Penn State University)
- [Alt Text Best Practices Guide](https://people.utoronto.ca/wp-content/uploads/2023/11/Alt-Text-Best-Practices-Guide-PSEC.pdf) (University of Toronto)
- [Accessibility Tip: Writing Alt Text](https://udayton.edu/blogs/onlinelearning/2026/accessibility-tip-2.php) (University of Dayton)

### Machine-Readable Standards

- [WCAG 2.2 machine-readable](https://github.com/mgifford/wai-yaml-ld/blob/main/wcag22/wcag22.yaml)
- [ARIA specification](https://github.com/mgifford/wai-yaml-ld/blob/main/aria/aria.yaml)
