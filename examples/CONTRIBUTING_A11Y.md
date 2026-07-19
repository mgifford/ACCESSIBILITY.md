---
title: Contributing Accessibility Guide
---

# Contributing Accessibility Guide

This guide explains how to make, test, document, and review contributions without introducing accessibility barriers. It applies to documentation, examples, templates, code, workflows, visualizations, and generated output in this repository.

Use this guide with the root [Contributing guide](../CONTRIBUTING.md). The root guide covers community participation and accommodations. This guide covers accessibility requirements and evidence for changes.

## Core Expectations

Every contribution should:

- Identify the user task or experience affected by the change.
- Preserve or improve accessibility for people with different disabilities, technologies, input methods, and preferences.
- Use native platform features and established standards before custom solutions.
- Test the final rendered or generated result, not only the source file.
- Use automated checks and human evaluation in proportion to the change.
- Document what was tested, what was not tested, and any known limitations.
- Avoid claiming conformance based on a single tool, score, test, or pull request.

Accessibility is a shared engineering and editorial responsibility. Contributors with disabilities are not expected to disclose disability status or carry the full responsibility for accessibility review.

## Scope

This guide applies when a contribution changes any of the following:

- Markdown, prose, examples, templates, or navigation
- HTML, CSS, JavaScript, or reusable components
- Forms, dialogs, menus, notifications, and other workflows
- Images, icons, SVG, Mermaid, charts, maps, or other visualizations
- Audio, video, captions, transcripts, or audio descriptions
- Themes, color, contrast, motion, zoom, reflow, or personalization
- Tests, linters, build tools, sanitizers, optimizers, or CI workflows
- Dependencies or rendering platforms that affect generated output
- Accessibility requirements, policies, testing instructions, or conformance claims
- Content or code produced with an AI-assisted tool

Small changes still require review, but not every check in this guide applies to every change. Choose checks based on the affected user experience and the likelihood and consequence of a regression.

## Before Starting

### 1. Describe the user impact

Before choosing an implementation, answer:

- What user task, content, or component changes?
- Which interaction methods are affected, such as keyboard, touch, pointer, speech input, or screen reader navigation?
- Which display preferences are affected, such as zoom, text spacing, dark mode, forced colors, increased contrast, or reduced motion?
- Does the change alter names, roles, states, relationships, reading order, focus order, errors, or status messages?
- Does a build step, sanitizer, optimizer, renderer, or hosting platform transform the source before users receive it?

These answers determine the required implementation guidance and testing.

### 2. Find the applicable guidance

Start with [ACCESSIBILITY-template.md](../ACCESSIBILITY-template.md), then use the topic-specific guides in this directory. Do not copy a pattern without reading its limitations and testing guidance.

When adding or revising factual guidance:

1. Prefer normative standards and official specifications for requirements.
2. Prefer primary documentation for browser, framework, library, and platform behavior.
3. Use established practitioner guidance to explain implementation experience, not to replace normative requirements.
4. Check [TRUSTED_SOURCES.yaml](./TRUSTED_SOURCES.yaml) for relevant sources and their authority, review status, jurisdiction, and permitted use.
5. State when a recommendation is advisory, experimental, platform-specific, or based on incomplete support.
6. Record the version and retrieval or review date when behavior can change over time.

Being listed in `TRUSTED_SOURCES.yaml` does not by itself make every statement from a source normative. Consider the source's authority level and the claim being supported.

### 3. Establish the baseline

For changes to an existing page, component, workflow, or generated asset:

- Run the relevant existing tests before making the change when practical.
- Record pre-existing failures that are related to the affected experience.
- Do not hide a new regression by grouping it with an old failure.
- Open a separate issue when an unrelated barrier is discovered and cannot reasonably be addressed in the current contribution.

The goal is to prevent regressions while keeping the contribution focused.

## Choose the Required Level of Verification

Use the highest level that describes the change.

| Level | Typical change | Minimum verification |
| --- | --- | --- |
| Documentation | Prose, spelling, links, or non-interactive Markdown | Review structure, language, links, and the rendered page |
| Presentation | CSS, themes, spacing, images, or responsive layout | Documentation checks plus zoom, reflow, contrast, preferences, and visual states |
| Interaction | JavaScript, controls, forms, dialogs, menus, or updates | Presentation checks plus keyboard, focus, names, roles, states, errors, and announcements |
| Generated or transformed output | Mermaid, SVG, charts, build output, sanitization, or optimization | Test the source, transformation, final output, alternatives, security boundary, and target platform |
| Critical workflow or shared pattern | Authentication, payment, publishing, navigation, reusable component, or site-wide template | Test representative end-to-end tasks, failure recovery, supported browsers, and relevant assistive technologies |

Risk can raise the required level. For example, a one-line CSS change that removes a focus indicator is an interaction-level accessibility change.

## Requirements by Change Type

### Markdown and Documentation

For prose, guidance, templates, and examples:

- Use one descriptive page title and a logical heading hierarchy.
- Use meaningful link text that remains understandable out of context.
- Identify the language of unusual terms or passages when needed.
- Use lists for lists and tables only for tabular relationships.
- Give tables clear headers and keep their structure as simple as possible.
- Provide text alternatives for meaningful images and diagrams.
- Avoid instructions that depend only on position, shape, size, color, or sensory characteristics.
- Explain acronyms and specialized terms when the intended audience may not know them.
- Keep sentences, labels, and instructions direct and specific.
- Ensure code samples demonstrate accessible behavior and do not silently omit essential error, focus, or state handling.
- Build or preview the documentation when Markdown processing, Jekyll, syntax highlighting, or site templates may change the result.
- Check new and changed links.

Use:

- [Content Design Accessibility Best Practices](./CONTENT_DESIGN_ACCESSIBILITY_BEST_PRACTICES.md)
- [Plain Language Accessibility Best Practices](./PLAIN_LANGUAGE_ACCESSIBILITY_BEST_PRACTICES.md)
- [Tables Accessibility Best Practices](./TABLES_ACCESSIBILITY_BEST_PRACTICES.md)
- [Image Alt Text Accessibility Best Practices](./IMAGE_ALT_TEXT_ACCESSIBILITY_BEST_PRACTICES.md)

### HTML and Reusable Components

For HTML examples and component patterns:

- Prefer native HTML elements with built-in semantics and interaction.
- Use ARIA only when native HTML cannot express the required semantics or state.
- Ensure each control has an accurate accessible name.
- Expose role, state, value, and relationships programmatically.
- Keep visible labels and accessible names consistent. The accessible name should normally contain the visible label.
- Preserve a meaningful reading order and focus order.
- Do not make unavailable functionality appear operable.
- Avoid positive `tabindex` values.
- Ensure repeated components do not create duplicate IDs.
- Test the component in the context where it will actually be embedded.

Changing semantics requires more than checking markup. Inspect the browser accessibility tree and spot-check relevant assistive technology behavior when the change affects how content is announced or operated.

### Keyboard, Pointer, Touch, and Speech Input

For interactive changes:

- Make every action available without a pointer unless the action fundamentally depends on a path or freehand movement and an accessible alternative is provided.
- Use expected keyboard behavior for the chosen native element or established widget pattern.
- Provide a visible focus indicator with sufficient contrast and area.
- Keep focus order logical and predictable.
- Do not create keyboard traps.
- Return or move focus deliberately after dialogs, menus, deletions, route changes, and other context changes.
- Ensure targets are usable with touch and coarse pointers.
- Avoid hover-only or focus-only access to essential functionality. If content expands on hover or focus, keep it available while the pointer or focus moves into it and provide a dismissible, persistent interaction where necessary.
- Ensure speech-input users can identify and activate controls by their visible labels.

Use:

- [Keyboard Accessibility Best Practices](./KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md)
- [Touch and Pointer Accessibility Best Practices](./TOUCH_POINTER_ACCESSIBILITY_BEST_PRACTICES.md)
- [Speech Recognition Accessibility Best Practices](./SPEECH_RECOGNITION_ACCESSIBILITY_BEST_PRACTICES.md)
- [Tooltip Accessibility Best Practices](./TOOLTIP_ACCESSIBILITY_BEST_PRACTICES.md)

### Forms, Errors, and Status Messages

For forms and task workflows:

- Associate every input with a persistent, meaningful label.
- Provide instructions before they are needed.
- Identify required fields programmatically and visually.
- Group related controls with meaningful group names.
- Communicate errors in text and associate each error with the affected field.
- Move focus only when it helps users locate or recover from an error.
- Preserve entered data when validation fails whenever possible.
- Announce important asynchronous status changes without moving focus unnecessarily.
- Allow users to review, correct, and confirm important submissions.
- Test successful completion, validation failure, correction, cancellation, and recovery.

Use:

- [Forms Accessibility Best Practices](./FORMS_ACCESSIBILITY_BEST_PRACTICES.md)
- [ARIA Live Regions Best Practices](./ARIA_LIVE_REGIONS_BEST_PRACTICES.md)

### CSS, Layout, Themes, and User Preferences

For presentation changes:

- Support browser zoom and text resizing without loss of content or functionality.
- Test narrow reflow and increased text spacing.
- Meet the appropriate text and non-text contrast requirements.
- Do not use color as the only way to communicate meaning or state.
- Preserve meaningful focus, selected, hover, error, disabled, and visited states.
- Test supported light, dark, and system settings.
- Support forced-colors mode where platform support exists.
- Respect reduced-motion preferences and avoid unnecessary animation.
- Avoid disabling user zoom or overriding user preferences without a strong reason.
- Use `color-scheme` when the page supports corresponding browser-provided light and dark controls.

Use:

- [Color Contrast Accessibility Best Practices](./COLOR_CONTRAST_ACCESSIBILITY_BEST_PRACTICES.md)
- [Light and Dark Mode Accessibility Best Practices](./LIGHT_DARK_MODE_ACCESSIBILITY_BEST_PRACTICES.md)
- [User Personalization Accessibility Best Practices](./USER_PERSONALIZATION_ACCESSIBILITY_BEST_PRACTICES.md)
- [Progressive Enhancement Best Practices](./PROGRESSIVE_ENHANCEMENT_BEST_PRACTICES.md)

### Images, SVG, Mermaid, Charts, and Other Visualizations

For meaningful visual content:

- Define the purpose of the visual before choosing its text alternative.
- Provide an equivalent that communicates the information needed for the same user task, not merely the appearance.
- Keep the source visual and its alternative together so reviewers can compare them.
- Keep the alternative synchronized when the visual changes.
- Do not depend on color alone to distinguish values, categories, paths, or states.
- Test themes and contrast settings supported by the target platform.
- Test the final embedded or exported result. Source markup alone is not sufficient.

For SVG specifically:

- Choose semantics based on the embedding method and intended interaction.
- Keep referenced IDs unique and verify that ARIA and graphical references resolve.
- Verify that sanitization and optimization preserve required titles, descriptions, roles, language, IDs, `viewBox`, and same-document references.
- Treat uploaded, user-edited, AI-generated, and otherwise untrusted SVG as active content requiring an SVG-aware sanitizer.
- Do not use regular expressions as an SVG sanitizer.
- Do not combine an atomic image role with descendants that users are expected to navigate or operate.

For Mermaid specifically:

- Use valid Mermaid accessibility declarations.
- Pin the Mermaid version when the project controls the renderer.
- For platform-managed renderers, record the observed version, platform, and date, then test the features the contribution depends on.
- Provide a structured text alternative for diagrams whose meaning is not captured adequately by a short description.
- Verify the target Markdown host, documentation build, and exported SVG separately when they use different rendering paths.

Use:

- [SVG Accessibility Best Practices](./SVG_ACCESSIBILITY_BEST_PRACTICES.md)
- [Mermaid Accessibility Best Practices](./MERMAID_ACCESSIBILITY_BEST_PRACTICES.md)
- [Mermaid Transformation Best Practices](./MERMAID_TRANSFORMATION_BEST_PRACTICES.md)
- [Charts and Graphs Accessibility Best Practices](./CHARTS_GRAPHS_ACCESSIBILITY_BEST_PRACTICES.md)
- [Maps Accessibility Best Practices](./MAPS_ACCESSIBILITY_BEST_PRACTICES.md)

### Audio and Video

For media changes:

- Provide accurate captions for synchronized speech and meaningful sounds.
- Provide transcripts when they improve access to the information or are required by the media format.
- Provide audio description or an equivalent when important visual information is not available in the audio.
- Make the player operable with a keyboard and expose control names, roles, states, and values.
- Avoid autoplay with sound.
- Test captions, transcripts, descriptions, keyboard interaction, focus, and full-screen behavior in the final player.

Use [Audio and Video Accessibility Best Practices](./AUDIO_VIDEO_ACCESSIBILITY_BEST_PRACTICES.md).

### Build Tools, Dependencies, Tests, and CI

For tooling and workflow changes:

- Run accessibility checks against the same output users receive whenever possible.
- Pin third-party GitHub Actions to reviewed commit SHAs and use minimum required permissions.
- Pin or lock renderer and testing dependencies when the project controls them.
- Record platform-managed versions as observed facts rather than pinned dependencies.
- Document what each automated rule set covers and what remains manual.
- Preserve useful test artifacts without exposing secrets, personal information, or private content.
- Ensure a test fails for the barrier it claims to detect. A test that only checks that a command ran is not accessibility coverage.
- Review generated baselines, snapshots, and allowlists rather than accepting changes automatically.
- Do not lower a threshold, suppress a rule, or update a snapshot solely to make CI pass.
- Use time-limited suppressions with a rationale, owner, linked issue, and review date.

Use:

- [CI/CD Accessibility Best Practices](./CI_CD_ACCESSIBILITY_BEST_PRACTICES.md)
- [Shift-Left Accessibility Automation](./SHIFT_LEFT_ACCESSIBILITY_AUTOMATION.md)
- [Accessibility Test Coverage](./TEST_COVERAGE.md)

## Test the Final User Experience

Transformations can introduce or remove barriers. Relevant examples include:

- Markdown converted to HTML
- Jekyll layouts and plugins
- CSS bundling and minification
- SVG optimization and sanitization
- Mermaid or chart rendering
- Client-side hydration
- component composition
- content management systems
- localization

When a transformation is in scope, verify at least one representative final output. If the contribution changes the transformation itself, include fixtures that exercise both accessible content and hostile or malformed input where security is relevant.

## Automated Testing

Run repository-provided lint, test, build, and link-check commands that apply to the change. Report the exact commands and results in the pull request.

Automated checks are useful for repeatable detection of some problems, including missing names, invalid relationships, certain contrast failures, and selected HTML or ARIA errors. They generally cannot determine whether:

- Alternative text communicates the right meaning.
- Reading and focus order support the task.
- A status announcement is timely and understandable.
- A keyboard interaction matches user expectations.
- A complex diagram has an equivalent alternative.
- A workflow is usable from start to finish.
- The overall experience conforms to an accessibility standard.

Do not describe an automated score as a conformance result. Include the tool, version, rules or tags, scope, page state, and known limitations when reporting results.

## Manual Testing

Select manual checks based on the affected experience. At minimum:

1. Complete the affected task using the keyboard when interaction is present.
2. Verify visible focus, focus order, activation, dismissal, and recovery.
3. Inspect names, roles, states, relationships, and reading order when semantics change.
4. Test zoom, reflow, text spacing, and relevant color or motion preferences when presentation changes.
5. Test error and status behavior when a workflow changes.
6. Compare meaningful visuals with their text alternatives.
7. Test the rendered output on the target platform.

Follow the [Manual Accessibility Testing Guide](./MANUAL_ACCESSIBILITY_TESTING_GUIDE.md) for detailed procedures.

### Assistive technology testing

Assistive technology testing is particularly important when a contribution changes:

- Semantic structure or accessible names
- Custom widgets or keyboard behavior
- Focus management
- Dynamic announcements
- Forms and validation
- SVG, diagrams, charts, or other generated semantics
- A critical or shared workflow

Report:

- Assistive technology and version
- Browser and version
- Operating system and version
- Input method or settings used
- Exact task and states tested
- Expected and observed result

Do not generalize one assistive technology result to every assistive technology or user. Do not present a simulated screen reader, accessibility-tree snapshot, or automated semantic query as equivalent to testing with a real assistive technology. These methods are valuable supplements and regression checks.

Testing by people with disabilities provides essential evidence, but one person's experience does not represent every person with the same disability. Treat lived experience as expertise, respond constructively, and avoid asking contributors to disclose personal information.

## Security and Accessibility Must Survive Together

Do not weaken a security boundary to preserve accessibility metadata, and do not remove required accessibility information without validating the result.

When a contribution processes untrusted HTML, SVG, Markdown, URLs, or AI-generated output:

- Use a maintained, context-appropriate sanitizer or parser with an allowlist.
- Sanitize before inserting content into the document.
- Avoid modifying sanitized markup in ways that can reintroduce unsafe content.
- Treat Content Security Policy as defense in depth, not as a replacement for sanitization.
- Validate accessibility semantics and internal references after sanitization and optimization.
- Include adversarial fixtures appropriate to the input format.
- Document intentionally permitted active content and external references.

Security and accessibility tests should cover the same final artifact.

## AI-Assisted Contributions

AI-assisted tools can help draft, analyze, or transform a contribution, but a human contributor remains responsible for the result.

For AI-assisted work:

- Verify every factual, legal, standards, browser-support, and API claim against an appropriate current source.
- Use `TRUSTED_SOURCES.yaml` to help identify sources, while checking each source's authority and review status.
- Do not claim that a test was run unless it was actually run and its result was inspected.
- Do not infer accessible behavior from the presence of an ARIA attribute.
- Review all generated code for unnecessary ARIA, unsafe markup, fabricated APIs, and brittle selectors.
- Sanitize untrusted generated HTML and SVG before rendering it.
- Compare generated descriptions and alternatives with the original content for accuracy and completeness.
- Disclose material AI assistance when required by repository policy.
- Keep human review mandatory for generated accessibility fixes and generated changes to standards guidance.

An AI-generated passing patch is a proposal, not evidence that the affected user experience is accessible.

## Pull Request Evidence

Include enough information for a reviewer to reproduce the result. Adapt this template to the change:

```md
## Accessibility impact

- Affected user task or content:
- Change types:
- Applicable guidance or standards:
- Expected accessibility effect:

## Verification

- Automated commands and results:
- Manual checks performed:
- Browser, operating system, and assistive technology versions:
- Themes, viewport sizes, zoom levels, and preferences tested:
- Generated or rendered output tested:

## Limitations

- Checks not performed and why:
- Known issues or follow-up work:
- Workaround, if any:
```

Screenshots and videos can supplement this evidence but do not replace keyboard, semantic, or assistive technology testing. Provide text describing what a visual artifact demonstrates.

## Exceptions and Incomplete Testing

Do not silently omit an applicable check or suppress a failure. If a contribution must proceed with a known accessibility limitation, document:

- The affected user task and users
- The barrier and its practical consequence
- Why it cannot be resolved in the current change
- Available workaround and its limitations
- Severity and release impact
- A linked tracking issue
- Accountable owner
- Remediation plan
- Review or target date

An exception is a managed risk, not a permanent waiver. Reassess it when the affected component, dependency, or platform changes.

## Severity, Priority, and Merge Decisions

Use [Accessibility Bug Reporting Best Practices](./ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES.md) for severity and reporting.

Keep these decisions separate:

- **Severity** describes the effect of the barrier on users and task completion.
- **Priority** describes when the project plans to address it.
- **Confidence** describes the strength and reproducibility of the evidence.
- **Merge or release decision** considers severity, reach, regression status, workaround quality, and project risk.

A newly introduced barrier that blocks or seriously impairs a user task should normally block merge. Lower-severity issues still require an explicit decision and tracked follow-up when they cannot be resolved in the contribution.

Do not use a tool score alone to assign severity.

## Reviewer Guidance

Reviewers should verify that:

- The contribution explains the affected user experience.
- The chosen pattern uses appropriate native semantics and follows relevant repository guidance.
- Tests are proportional to the change and cover the final output.
- Evidence is reproducible and does not overstate what was tested.
- Accessibility alternatives remain synchronized with visual or interactive content.
- Security, sanitization, optimization, and rendering have not removed required semantics.
- Known limitations are visible, owned, and tracked.
- Standards and support claims cite appropriate current sources.

Ask for clarification when evidence is missing. Do not assume that a contributor's use of an assistive technology proves that all users of that technology will have the same result.

## Definition of Done

A contribution is complete when all applicable items are true:

- [ ] The affected user task and accessibility impact are documented.
- [ ] Relevant topic guides and trusted sources were consulted.
- [ ] Native semantics and standard platform behavior are used where possible.
- [ ] Keyboard, focus, names, roles, states, relationships, errors, and announcements were checked where affected.
- [ ] Zoom, reflow, contrast, themes, forced colors, and reduced motion were checked where affected.
- [ ] Meaningful non-text content has an equivalent, synchronized alternative.
- [ ] Automated checks applicable to the change pass.
- [ ] Required manual checks were performed.
- [ ] Relevant assistive technology testing was performed, or its omission is explained.
- [ ] The final rendered, generated, sanitized, optimized, or exported output was tested.
- [ ] Commands, tools, versions, platforms, states, and results are recorded.
- [ ] No new accessibility regression is knowingly introduced without an approved, tracked exception.
- [ ] Documentation and tests were updated with the implementation.
- [ ] Changed links were checked.

## Common Contribution Failures

Avoid these recurring mistakes:

- Treating a clean automated scan as proof of accessibility.
- Testing only the source rather than the rendered result.
- Adding ARIA where native HTML already provides the correct behavior.
- Fixing an accessible name while leaving keyboard or focus behavior broken.
- Updating a diagram without updating its structured alternative.
- Preserving a visual result while optimization removes SVG semantics or references.
- Describing a platform-managed renderer as a pinned dependency.
- Updating snapshots or suppressions without reviewing the accessibility effect.
- Copying a code pattern without its error, focus, or state handling.
- Requiring every contribution to perform the same tests regardless of risk.
- Deferring a known barrier without an owner, issue, and review date.
- Citing a secondary article as if it were a normative requirement.

## Related References

- [ACCESSIBILITY-template.md](../ACCESSIBILITY-template.md)
- [Root Contributing Guide](../CONTRIBUTING.md)
- [Examples Index](./README.md)
- [Manual Accessibility Testing Guide](./MANUAL_ACCESSIBILITY_TESTING_GUIDE.md)
- [Accessibility Bug Reporting Best Practices](./ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES.md)
- [Accessibility Test Coverage](./TEST_COVERAGE.md)
- [CI/CD Accessibility Best Practices](./CI_CD_ACCESSIBILITY_BEST_PRACTICES.md)
- [Trusted Sources](./TRUSTED_SOURCES.yaml)

If you are uncertain which checks apply, describe the proposed change and affected user task in an issue before implementing it. Maintainers and reviewers can help define a proportionate verification plan.
