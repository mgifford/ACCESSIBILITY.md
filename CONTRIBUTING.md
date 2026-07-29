# Contributing

Thanks for your interest in improving ACCESSIBILITY.md.

We welcome contributions from the community, especially from people with disabilities (PwD) and others with lived accessibility experience. Your feedback helps ensure this project remains practical, inclusive, and grounded in real-world use.

For project accessibility standards and requirements, see [ACCESSIBILITY-template.md](./examples/ACCESSIBILITY-template.md), which provides the framework this repository follows.

> [!IMPORTANT]
> **Participation from people with disabilities is highly valued in this project.**
> We consider lived accessibility experience essential to the quality of this work.
> You are welcome to contribute without disclosing personal disability status.

## Ways to contribute

- Open issues for gaps, barriers, or unclear guidance.
- Propose improvements to templates, examples, and workflows.
- Submit pull requests for documentation updates and new implementation patterns.
- Share real-world adoption stories and lessons learned.
- Test documentation and examples with assistive technologies.
- Review pull requests from an accessibility perspective.

## Inclusive contribution principles

- Prioritize clarity and usability for diverse users.
- Use respectful, person-centered language.
- Document accessibility tradeoffs and limitations transparently.
- Prefer reproducible, testable guidance over opinion-only recommendations.

## Pull request expectations

- Keep changes focused and explain the problem being solved.
- Link related issues where possible.
- Update relevant docs in [examples/](examples/) when introducing new guidance.
- Ensure documentation links pass repository link checks.
- Follow the accessibility standards outlined in [ACCESSIBILITY-template.md](./examples/ACCESSIBILITY-template.md).
- If proposing code examples, ensure they meet WCAG 2.2 AA standards.
- Consider testing with assistive technologies when relevant (screen readers, keyboard navigation, etc.).

## Code of collaboration

- Be respectful and constructive.
- Assume good intent.
- Center accessibility impact in technical decisions.

## Involving people with disabilities

We actively encourage participation from people with disabilities in all aspects of this project:

- **Testing and feedback**: Share your experiences using documentation, templates, and examples with assistive technologies
- **Issue reporting**: Help identify barriers or gaps from lived experience perspectives
- **Code review**: Provide accessibility expertise on pull requests
- **Best practices**: Contribute real-world implementation patterns that work well with assistive technologies
- **Documentation**: Help ensure guidance is practical and reflects diverse user needs

### Accessibility accommodations

If you need accommodations to participate in this project (e.g., alternative formats, extended time for reviews, asynchronous communication), please:

1. Open an issue labeled `accessibility-accommodation`
2. Describe what would help you contribute more effectively
3. We will work with you to implement reasonable accommodations

We recognize that people with disabilities are the experts in accessibility barriers and solutions.

## Testing with assistive technologies

Contributors using assistive technologies are especially valuable for validating:

- Documentation clarity and navigation
- Code examples with screen readers (JAWS, NVDA, VoiceOver, TalkBack)
- Keyboard-only navigation patterns
- Compatibility with magnification tools
- Usability with voice control systems

If you test with assistive technologies, please include:
- The assistive technology name and version
- The browser and operating system used
- Specific feedback about what worked well or what presented barriers

### Manual accessibility testing guidance

**For detailed manual testing procedures, see [Manual Accessibility Testing Guide](examples/MANUAL_ACCESSIBILITY_TESTING_GUIDE.md).**

This comprehensive guide provides:
- Step-by-step keyboard-only testing procedures
- Screen reader testing workflows
- Component-specific testing checklists
- Getting started resources for new testers
- Issue reporting templates

**Quick testing approaches:**

**30-Minute Keyboard Test** - Test any page or component:
1. Tab from start to end - verify focus is visible and in logical order
2. Activate all interactive elements (Enter for links, Space/Enter for buttons)
3. Test any forms (fill, submit, validate errors)
4. Test any modals/dialogs (open, interact, close, verify focus returns)
5. Check for keyboard traps (can you Tab away from everything?)

**30-Minute Screen Reader Test** - Test with NVDA, JAWS, or VoiceOver:
1. Navigate by headings (H key) - verify logical structure
2. Navigate by landmarks (D key) - verify page regions
3. Navigate by form fields (F key) - verify labels are clear
4. Read page content continuously - verify reading order
5. Test interactive elements - verify announcements are clear

**When to test manually:**
- Before each release (test critical user flows)
- After UI changes (test affected components)
- For new features (test complete workflows)
- When automated tests pass (validate actual user experience)

**We especially encourage testing from people with disabilities**, as lived experience is essential for identifying real-world barriers that automated tools miss.

## Need help?

If you are unsure how to contribute, open an issue with your idea and we can help shape it into a change proposal.
