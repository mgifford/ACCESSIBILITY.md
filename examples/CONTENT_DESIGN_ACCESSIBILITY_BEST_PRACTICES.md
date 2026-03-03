---
title: Content Design Accessibility Best Practices
---

# Content Design Accessibility Best Practices

This document provides high-level guidance on creating content that is easy to understand and aligned with accessibility goals. Well-structured, clearly written content reduces cognitive load and benefits all users, including those using assistive technologies.

## 1. Core Principle

Content design and accessibility are inseparable. A technically accessible page that is confusing or poorly structured still creates barriers. Design content for the widest possible audience: write clearly, structure logically, and present information in the order users need it.

## 2. Plain Language

- Write in plain language. Use common words, short sentences, and active voice.
- Write at the reading level appropriate for your audience. Government guidance commonly targets a Grade 8 reading level or lower.
- Avoid jargon, acronyms on first use, and insider terminology unless your audience requires it.
- Define technical terms inline when they cannot be avoided.
- Front-load key information. Put the most important point first.
- Use the second person ("you") to speak directly to the reader.

### Plain Language Resources

- [Plain Language Guidelines (plainlanguage.gov)](https://digital.gov/guides/plain-language) - US government guidance

## 3. Page and Content Structure

- Use a clear, logical heading hierarchy (`h1` → `h2` → `h3`) to organize the page.
- Each page should have exactly one `h1` that describes the page's main purpose.
- Keep headings descriptive and unique. Avoid "Introduction" or "Overview" as standalone headings without context.
- Use bulleted or numbered lists for three or more parallel items instead of embedding them in dense paragraphs.
- Keep paragraphs short (3–5 sentences). Use white space generously.
- Place the most critical content at the top of the page (inverted pyramid structure).
- Use one idea per paragraph.

## 4. Writing Style

- Prefer active voice ("The form saves your data") over passive voice ("Your data is saved by the form").
- Use present tense wherever possible.
- Avoid double negatives and conditional stacking ("You can only proceed if you have not failed to complete the required fields"). Instead, write simply: "Complete all required fields to proceed."
- Use gender-neutral and inclusive language throughout.
- Spell out abbreviations on first use, then use the abbreviation.
- Prefer short, concrete words over long, abstract ones (for example, "use" instead of "utilize").

## 5. Headings and Labels

- Write headings as statements or clear topic labels, not questions (unless FAQ format is appropriate).
- Navigation labels, button text, and form labels must be descriptive and unambiguous out of context.
- Avoid "Click here," "Read more," or "Learn more" as standalone link labels.
- Page titles must be unique and describe the current page.

## 6. Link Text

- Every link must make sense when read without surrounding context.
- Distinguish links to documents (PDF, spreadsheet) by including file type and size in the link text or immediately after.
- Use consistent terminology: if a concept is called "accessibility statement" in one place, do not call it "a11y disclosure" somewhere else.
- Do not open links in new tabs or windows without warning the user in the link text.

## 7. Images and Visual Content

- Every informative image needs meaningful alternative text that conveys its purpose, not just its appearance.
- Decorative images should use `alt=""`.
- Do not rely on images alone to convey information. Support visual content with accompanying text.
- Charts and graphs must be accompanied by a text summary or accessible data table.
- See [SVG Accessibility Best Practices](./SVG_ACCESSIBILITY_BEST_PRACTICES.md) for diagram-specific guidance.

## 8. Tables

- Use tables only for genuinely tabular data, not for layout.
- Provide a clear `<caption>` or heading that explains what the table contains.
- Mark header cells with `<th>` and appropriate `scope` attributes.
- Keep tables simple; avoid merging cells unless necessary.
- Provide a text summary for complex tables.

## 9. Reading Level and Cognitive Accessibility

- Run content through a readability checker before publishing. Aim for Flesch-Kincaid Grade 8 or lower for general audiences.
- Supplement complex content with summaries, key takeaways, or "what you need to know" sections.
- Break long processes into numbered steps.
- Use examples and analogies to explain abstract concepts.
- Avoid time-pressured content presentation where possible.
- Provide enough context so users can understand content without relying on memory of prior sections.

## 10. Forms and Instructions

- Write form instructions before the form, not inside it.
- Label fields with what the user needs to enter, not how the system stores it.
- Provide examples for unusual or formatted inputs (for example, "Date: DD/MM/YYYY").
- For error messages, describe the problem and how to fix it. Avoid system error codes.
- See [Forms Accessibility Best Practices](./FORMS_ACCESSIBILITY_BEST_PRACTICES.md) for full form guidance.

## 11. Consistent Terminology and Voice

- Maintain a content style guide for your product or organization.
- Use the same term for the same concept throughout the site or application.
- Establish a defined voice and tone, and apply it consistently.
- Review content periodically to remove outdated, misleading, or contradictory information.

## 12. Content for Diverse Audiences

- Assume a broad audience that includes people with cognitive, learning, and language differences.
- Provide content in more than one format where feasible (for example, video summary alongside written guidance).
- Consider whether translations or Easy Read versions are appropriate.
- Avoid idioms, metaphors, or culturally specific references that may not translate.

## 13. Testing and Review

- Read content aloud to check for clarity and natural flow.
- Have someone unfamiliar with the topic review it before publishing.
- Test page navigation with keyboard only and confirm headings convey structure.
- Use a screen reader to verify that the content makes sense in linear reading order.
- Check that all links are descriptive and functional.
- Run a readability score on key pages and track it over time.

## 14. Definition of Done

Content is ready to publish when:

- It passes a plain language review.
- Heading structure is logical and correctly nested.
- All images have appropriate alternative text.
- All links are descriptive and functional.
- Tables have captions and proper markup.
- A readability score meets the target for the intended audience.
- Content has been reviewed by someone outside the team.

---

## References

### Government Content Design Style Guides

- [Canada.ca Content Style Guide](https://design.canada.ca/style-guide/) - Government of Canada
- [GOV.UK Style Guide](https://www.gov.uk/guidance/style-guide) - UK Government Digital Service
- [California ODI Content Design Guide](https://hub.innovation.ca.gov/content-design/odi-style-guide/) - California Office of Data & Innovation
- [California ODI Recommended Reading](https://hub.innovation.ca.gov/content-design/recommended-reading/) - Curated content design resources
- [UK Home Office Content Style Guide](https://design.homeoffice.gov.uk/design-and-content/content/content-style-guide) - UK Home Office
- [ONS Content Guide: Structuring Content](https://service-manual.ons.gov.uk/content/writing-for-users/structuring-content) - UK Office for National Statistics

### Plain Language

- [plainlanguage.gov Guidelines](https://digital.gov/guides/plain-language) - US Plain Language guidelines
- [W3C Web Content Accessibility Guidelines 1.4.12 Text Spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html) - Resizable text guidance

### Content Design Principles

- [UX Writing Hub: Content Style Guides](https://uxwritinghub.com/content-style-guides/) - How to write a content style guide
- [UX Design Institute: Content Design Principles](https://www.uxdesigninstitute.com/blog/content-design-principles/) - Core content design principles

### Machine-Readable Standards

For AI systems and automated tooling, see [wai-yaml-ld](https://github.com/mgifford/wai-yaml-ld) for structured accessibility standards:

- [WCAG 2.2 (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wcag-2.2-normative.yaml) - Machine-readable WCAG 2.2 normative content including readability and language success criteria (SC 3.1)
- [Standards Link Graph (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/standards-link-graph.yaml) - Relationships across WCAG/ARIA/HTML standards
