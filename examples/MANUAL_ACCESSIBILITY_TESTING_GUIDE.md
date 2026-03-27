---
title: Manual Accessibility Testing Guide
---

# Manual Accessibility Testing Guide

This guide provides practical procedures for manual accessibility testing. While automated testing catches many issues, manual testing with real assistive technologies and keyboard-only interaction is essential for validating user experience.

## 1. Core Principle

**Manual testing reveals issues that automated tools cannot detect**, including:
- Screen reader user experience and announcement quality
- Keyboard navigation flow and logical sequence
- Focus management in dynamic interfaces
- Context and orientation for assistive technology users
- Real-world usability barriers

## 2. When Manual Testing Is Required

Manual testing should be performed:

- **Before each release** - Test critical user flows
- **After UI changes** - Test affected components and interactions
- **For new features** - Test complete user workflows
- **When automated tests pass** - Validate actual user experience
- **When accessibility bugs are reported** - Reproduce and verify fixes

## 3. Getting Started with Manual Testing

### 3.1 Required Setup

**Screen Readers (choose based on your platform):**
- **Windows:** [NVDA](https://www.nvaccess.org/download/) (free, open source)
- **Windows:** [JAWS](https://vispero.com/jaws-screen-reader-software/) (commercial, free demo)
- **macOS:** VoiceOver (built-in, Cmd+F5 to toggle)
- **iOS:** VoiceOver (built-in, Settings → Accessibility)
- **Android:** TalkBack (built-in, Settings → Accessibility)

**Recommended Browser Combinations:**
- NVDA + Firefox or Chrome (Windows)
- JAWS + Chrome or Firefox (Windows)
- VoiceOver + Safari (macOS/iOS)
- TalkBack + Chrome (Android)

### 3.2 Learning Resources

**Screen Reader Tutorials:**
- [WebAIM: Testing with NVDA](https://webaim.org/articles/nvda/)
- [WebAIM: Using VoiceOver](https://webaim.org/articles/voiceover/)
- [Deque: Screen Reader Keyboard Shortcuts](https://dequeuniversity.com/screenreaders/)

**Start Simple:**
1. Test with keyboard-only first (easier entry point)
2. Learn basic screen reader commands for your platform
3. Practice on familiar websites before testing your own
4. Focus on one component or flow at a time

## 4. Keyboard-Only Testing Procedures

### 4.1 Basic Keyboard Navigation Test

**Goal:** Verify all interactive elements are keyboard accessible.

**Steps:**
1. **Start at top of page** - Click in address bar, then press Tab
2. **Tab through entire page** - Press Tab repeatedly
3. **Check each focusable element:**
   - Is focus visible? (clear outline or highlight)
   - Is focus order logical? (follows visual/reading order)
   - Can you activate it? (Enter for links/buttons, Space for buttons/checkboxes)
4. **Navigate backwards** - Press Shift+Tab to reverse through elements
5. **Check for keyboard traps** - Can you Tab away from every element?

**What to Document:**
- Elements that don't receive visible focus
- Illogical focus order (jumps around page)
- Elements that can't be activated with keyboard
- Keyboard traps (can't Tab away)

### 4.2 Interactive Component Testing

**Forms:**
- [ ] Tab reaches all form fields
- [ ] Labels are announced clearly
- [ ] Required fields are indicated
- [ ] Error messages appear and are announced
- [ ] Can submit form with Enter key
- [ ] Can cancel/reset if applicable

**Buttons:**
- [ ] Enter and Space both activate
- [ ] Visual feedback on activation
- [ ] Focus moves appropriately after activation

**Links:**
- [ ] Enter activates link
- [ ] Destination is clear from link text
- [ ] Skip links work (if present)

**Dropdowns/Select Menus:**
- [ ] Arrow keys navigate options
- [ ] Enter or Space opens menu (implementation dependent)
- [ ] Escape closes menu
- [ ] Selected value is announced

**Modal Dialogs:**
- [ ] Focus moves into modal when opened
- [ ] Focus is trapped within modal
- [ ] Escape key closes modal (unless critical)
- [ ] Focus returns to trigger element on close

**Custom Widgets (tabs, accordions, carousels):**
- [ ] Follow WAI-ARIA keyboard patterns
- [ ] Arrow keys work as documented
- [ ] Home/End keys work (if applicable)
- [ ] State changes are clear

### 4.3 Common Keyboard Shortcuts to Test

| Key | Expected Behavior |
|-----|-------------------|
| **Tab** | Move focus forward |
| **Shift+Tab** | Move focus backward |
| **Enter** | Activate buttons, links, submit forms |
| **Space** | Activate buttons, toggle checkboxes |
| **Arrow Keys** | Navigate within components (menus, tabs, radio groups) |
| **Escape** | Close dialogs, cancel operations |
| **Home/End** | Jump to start/end of component |

## 5. Screen Reader Testing Procedures

### 5.1 Basic Screen Reader Test

**Goal:** Verify content and interactions are announced clearly.

**Steps:**
1. **Start screen reader:**
   - NVDA: Ctrl+Alt+N
   - JAWS: (runs at Windows startup if installed)
   - VoiceOver (macOS): Cmd+F5
   - VoiceOver (iOS): Triple-click home button or side button

2. **Navigate by headings:**
   - NVDA/JAWS: Press H (next heading) or Shift+H (previous)
   - VoiceOver (macOS): Ctrl+Option+Cmd+H
   - Check: Do headings create logical outline?

3. **Navigate by landmarks:**
   - NVDA/JAWS: Press D (next landmark) or Shift+D (previous)
   - VoiceOver (macOS): Use rotor (Ctrl+Option+U, then arrows)
   - Check: Are regions (`<nav>`, `<main>`, `<header>`, etc.) identified?

4. **Navigate by form controls:**
   - NVDA/JAWS: Press F (next field) or Shift+F (previous)
   - Check: Are labels announced? Is purpose clear?

5. **Read all content:**
   - NVDA: Numpad+ or Ctrl (to stop)
   - JAWS: NumPad+ or Ctrl (to stop)
   - VoiceOver (macOS): Ctrl+Option+A
   - Check: Is content in logical order? Any missing or confusing announcements?

### 5.2 Component-Specific Screen Reader Tests

**Images:**
- [ ] Decorative images are ignored (empty alt or aria-hidden)
- [ ] Informative images have descriptive alt text
- [ ] Complex images have longer descriptions (aria-describedby, longdesc, or adjacent text)

**Links:**
- [ ] Link purpose is clear from announcement alone
- [ ] Link text is meaningful (not "click here")
- [ ] External links or new windows are indicated

**Buttons:**
- [ ] Button label describes action
- [ ] State is announced (pressed/not pressed for toggles)
- [ ] Disabled state is announced (if applicable)

**Form Fields:**
- [ ] Label is announced before field type
- [ ] Required state is announced
- [ ] Instructions/hints are announced
- [ ] Error messages are announced
- [ ] Success messages are announced

**Dynamic Content:**
- [ ] New content is announced (via aria-live regions)
- [ ] Deleted content is communicated
- [ ] Loading states are announced
- [ ] Progress is communicated

**Tables:**
- [ ] Navigate by rows/cells (NVDA/JAWS: Ctrl+Alt+Arrow keys)
- [ ] Column headers are announced with each cell
- [ ] Row headers are announced (if applicable)
- [ ] Table purpose is clear (caption or aria-label)

**Custom Widgets:**
- [ ] Role is announced (e.g., "tab", "menu", "dialog")
- [ ] State is announced (e.g., "selected", "expanded")
- [ ] Instructions are provided for complex widgets
- [ ] Keyboard shortcuts are documented

### 5.3 Screen Reader Announcement Checklist

For each interactive element, verify:

- [x] **Element type** is announced (button, link, heading, etc.)
- [x] **Label/name** is clear and descriptive
- [x] **Current value** is announced (for form fields)
- [x] **State** is announced (checked, selected, expanded, etc.)
- [x] **Instructions** are provided for complex interactions
- [x] **Changes** are announced (for dynamic updates)

## 6. Visual Accessibility Testing

### 6.1 Color Contrast Testing

**Tools:**
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Contrast Ratio by Lea Verou](https://www.siegemedia.com/contrast-ratio)
- Browser DevTools (Chrome/Firefox/Edge have built-in checkers)

**Requirements:**
- **Normal text (under 18pt or 14pt bold):** 4.5:1 minimum
- **Large text (18pt+ or 14pt+ bold):** 3:1 minimum
- **UI components and graphics:** 3:1 minimum

**Test:**
1. Identify text color and background color
2. Check contrast ratio using tool
3. Test with different color modes (light/dark theme)
4. Test focus indicators (must be 3:1 against adjacent colors)

### 6.2 Magnification and Zoom Testing

**Test at 200% zoom:**
1. Set browser zoom to 200% (Ctrl/Cmd + +)
2. Verify all content is readable
3. Verify no content is cut off
4. Verify no horizontal scrolling on standard viewport (1280px)
5. Test responsive behavior at different zoom levels

**Test with screen magnification:**
- Windows: Magnifier (Windows + +)
- macOS: Zoom (System Preferences → Accessibility → Zoom)
- Check: Can users pan around page? Are labels close to fields?

### 6.3 Focus Indicator Testing

**Verify for each focusable element:**
- [ ] Focus indicator is visible (outline, border, or background change)
- [ ] Contrast meets 3:1 requirement against adjacent colors
- [ ] Focus indicator is not removed (unless replaced with better style)
- [ ] Focus indicator doesn't obscure content

## 7. Testing Workflows by Component Type

### 7.1 Forms

**Complete workflow test:**
1. Navigate to form with keyboard only
2. Fill out all fields (test Tab order)
3. Trigger validation errors (leave required field empty, invalid format)
4. Verify error messages appear and are announced
5. Correct errors and revalidate
6. Submit form with Enter or Space on submit button
7. Verify success message appears and is announced

**Screen reader additions:**
8. Navigate form by fields (F key in NVDA/JAWS)
9. Verify labels and instructions are announced
10. Verify field types are clear (email, phone, etc.)
11. Verify error messages are in logical reading order

### 7.2 Modal Dialogs

**Complete workflow test:**
1. Activate trigger element (button/link that opens modal)
2. Verify focus moves into modal
3. Tab through all elements in modal
4. Verify Tab doesn't leave modal (focus trap)
5. Press Escape to close (or close button)
6. Verify focus returns to trigger element

**Screen reader additions:**
7. Verify modal is announced (role="dialog", aria-labelledby for title)
8. Verify modal content is in logical reading order
9. Verify closing action is clear

### 7.3 Single Page Applications (SPAs)

**Page navigation test:**
1. Click navigation link
2. Verify page content changes
3. Verify focus management (moved to main heading or main content)
4. Verify page title changes
5. Verify route change is announced (or focus provides context)

**Screen reader additions:**
6. Verify new page structure is clear (landmarks, headings)
7. Verify back button works and announces changes
8. Test with aria-live announcements for route changes (if implemented)

## 8. Documenting Test Results

### 8.1 What to Report

For each issue found:

**Required Information:**
- **Component/page tested:** URL or component name
- **Issue description:** What doesn't work?
- **Expected behavior:** What should happen?
- **Steps to reproduce:** Numbered steps
- **Assistive technology:** Name and version (e.g., NVDA 2024.1, VoiceOver macOS Sonoma)
- **Browser:** Name and version (e.g., Firefox 133, Safari 18)
- **Operating system:** Name and version
- **Severity:** Critical, High, Medium, Low

**Optional but Helpful:**
- Screenshot or screen recording
- Error message or console output
- WCAG success criterion violated (if known)

### 8.2 Severity Classification

- **Critical:** Users cannot complete essential tasks (e.g., can't submit form, can't access main content)
- **High:** Major barrier but workaround exists (e.g., poor focus visibility, missing labels)
- **Medium:** Usability issue that causes confusion (e.g., unclear link text, missing skip link)
- **Low:** Minor issue or enhancement (e.g., helpful hint missing, suboptimal announcement)

### 8.3 Issue Template

```markdown
## Accessibility Issue: [Brief Description]

**Component:** [URL or component name]

**Issue:** [Description of what doesn't work]

**Expected:** [What should happen]

**Severity:** [Critical/High/Medium/Low]

**Steps to Reproduce:**
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Testing Environment:**
- **Screen Reader:** [Name and version]
- **Browser:** [Name and version]
- **OS:** [Operating system and version]

**WCAG Criterion:** [If applicable, e.g., 2.4.3 Focus Order]

**Suggested Fix:** [If you have one]
```

## 9. Encouraging Participation from People with Disabilities

### 9.1 Why This Matters

**People with disabilities are the experts** in identifying barriers and validating solutions. Their lived experience is essential for:
- Identifying issues automated tools miss
- Validating that fixes actually work
- Understanding real-world impact of design decisions
- Prioritizing issues by actual user impact

### 9.2 Creating Inclusive Testing Opportunities

**Remove barriers to participation:**
- Provide clear, jargon-free testing instructions
- Offer flexible timeframes for testing (not rush)
- Allow asynchronous feedback
- Provide compensation for testing time (if budget allows)
- Make issue reporting accessible (multiple formats, support)

**Invite diverse testers:**
- Screen reader users (blind and low vision)
- Keyboard-only users (motor disabilities)
- Voice control users (motor disabilities)
- Users with cognitive disabilities
- Users with multiple disabilities

**Make testing guides accessible:**
- Provide alternative formats (audio, large print, plain language)
- Test your testing documentation!
- Ensure issue templates are screen reader friendly

### 9.3 Acknowledging Contributions

- Credit testers in release notes (with permission)
- Highlight accessibility improvements driven by tester feedback
- Create opportunities for ongoing involvement
- Compensate testers fairly for their time and expertise

## 10. Quick Reference Checklists

### 10.1 30-Minute Keyboard-Only Test

- [ ] Tab from start to end of page
- [ ] Verify focus is visible on all elements
- [ ] Activate all buttons with Enter and Space
- [ ] Activate all links with Enter
- [ ] Fill and submit a form
- [ ] Open and close a modal/dialog (if present)
- [ ] Use any custom widgets (tabs, accordions, etc.)
- [ ] Navigate menu/navigation (if present)
- [ ] Check for keyboard traps

### 10.2 30-Minute Screen Reader Test

- [ ] Navigate by headings (H key)
- [ ] Navigate by landmarks (D key)
- [ ] Navigate by form fields (F key)
- [ ] Read full page content (continuous read)
- [ ] Activate buttons and links
- [ ] Fill and submit a form
- [ ] Test custom widget (menu, tabs, etc.)
- [ ] Verify images have alt text
- [ ] Verify dynamic content updates are announced

### 10.3 Visual Accessibility Quick Check

- [ ] Test at 200% browser zoom
- [ ] Check focus indicator visibility
- [ ] Check color contrast (sample text and UI components)
- [ ] Verify content is readable without color alone
- [ ] Test light and dark color modes (if applicable)

## 11. Building a Manual Testing Culture

### 11.1 Make It a Habit

- Add manual testing to Definition of Done
- Include in code review checklist
- Schedule regular testing sessions (weekly/biweekly)
- Pair test with teammates
- Celebrate finding and fixing issues

### 11.2 Start Small

- Focus on one component or flow per session
- Learn one new screen reader command per week
- Build confidence with familiar patterns first
- Share learnings with team

### 11.3 Learn Together

- Host lunch-and-learn sessions
- Watch screen reader demos together
- Practice on popular websites first
- Invite guest speakers (users with disabilities)
- Share "aha moments" and discoveries

## 12. Resources and Further Learning

### 12.1 Testing Guides

- [WebAIM: Screen Reader Testing](https://webaim.org/articles/screenreader_testing/)
- [W3C: Easy Checks - First Review](https://www.w3.org/WAI/test-evaluate/preliminary/)
- [A11Y Project: Checklist](https://www.a11yproject.com/checklist/)

### 12.2 Screen Reader Resources

- [NVDA Training](https://www.nvaccess.org/get-help/)
- [JAWS Training](https://www.freedomscientific.com/training/jaws/)
- [VoiceOver User Guide](https://support.apple.com/guide/voiceover/welcome/mac)
- [Deque: Screen Reader Keyboard Shortcuts](https://dequeuniversity.com/screenreaders/)

### 12.3 Community and Support

- [WebAIM Discussion List](https://webaim.org/discussion/)
- [A11y Slack Community](https://web-a11y.slack.com/)
- [Stack Overflow: Accessibility Tag](https://stackoverflow.com/questions/tagged/accessibility)

---

## Machine-Readable Standards

For AI systems and automated tooling, see [wai-yaml-ld](https://github.com/mgifford/wai-yaml-ld) for structured accessibility standards:

- [WCAG 2.2 (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wcag-2.2-normative.yaml) - Machine-readable WCAG 2.2 normative content
- [ARIA Informative (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wai-aria-informative.yaml) - ARIA patterns and testing procedures
- [HTML Living Standard Accessibility (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/html-living-standard-accessibility.yaml) - HTML element testing requirements
- [Accessibility Test Catalogs (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/accessibility-rule-catalogs.yaml) - Structured testing rules and procedures

---

**Related Documentation:**
- [CONTRIBUTING.md](../CONTRIBUTING.md) - How to contribute, including testing expectations
- [BROWSER_SUPPORT.md](../BROWSER_SUPPORT.md) - Browser and AT support matrix
- [KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md](./KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md) - Keyboard interaction patterns
- [FORMS_ACCESSIBILITY_BEST_PRACTICES.md](./FORMS_ACCESSIBILITY_BEST_PRACTICES.md) - Form accessibility requirements

---

**Last Updated:** 2026-02-24
