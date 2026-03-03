---
title: User Personalization and Accessibility Best Practices
---

# User Personalization and Accessibility Best Practices

This document defines accessibility requirements for implementing user personalization features that empower users to customize their browsing experience based on their individual needs and preferences.

User choice matters. This guidance explains how to provide legitimate personalization options while avoiding problematic accessibility overlays, ensuring WCAG 2.2 Level AA compliance and respecting user preferences.

---

## 1. Core Principle

All users should be able to customize content presentation to meet their individual needs without compromising information, functionality, or accessibility. Personalization features must complement, not replace, proper accessible design.

---

## 2. Understanding Accessibility Overlays

### What are accessibility overlays?

Accessibility overlays are third-party tools that attempt to automatically "fix" accessibility issues on websites through JavaScript injections, typically triggered by a widget icon. They promise instant accessibility compliance without addressing underlying code issues.

### Why overlays are problematic

**Do NOT use accessibility overlays as a substitute for proper accessible design.**

Accessibility overlays have significant limitations:

- They cannot fix underlying structural accessibility issues
- They often create new barriers for assistive technology users
- They provide a false sense of compliance
- They may interfere with users' own assistive technologies
- They don't address server-side or backend accessibility
- They can create inconsistent experiences across different pages

**Key resource:**
- [Overlay Fact Sheet](https://overlayfactsheet.com/en/) - Comprehensive documentation of overlay problems, signed by over 800 accessibility professionals

### Legitimate use case: Custom remediation

There is ONE acceptable use case for overlay-like technology:

**Custom remediation for legacy systems** where:
1. The underlying codebase cannot be modified (e.g., vendor-locked legacy systems)
2. The remediation is developed specifically for your site's known issues
3. It's a temporary solution while planning proper accessibility fixes
4. Users are informed it's a stopgap measure
5. Active work continues toward proper accessible implementation

As noted in the [Web Almanac 2024 Accessibility Chapter](https://almanac.httparchive.org/en/2024/accessibility#user-personalization-widgets-and-overlay-remediation) (User Personalization Widgets and Overlay Remediation section):

> "Custom remediation for legacy sites can be fine when implemented thoughtfully as a bridge to proper accessibility."

---

## 3. User Personalization: The Right Approach

Instead of overlays, implement **user personalization widgets** that allow users to adjust presentation without claiming to "fix" accessibility.

### Key distinction

**Accessibility overlay:** Claims to make site accessible, injects fixes
**Personalization widget:** Offers user preferences, doesn't claim compliance

### Why personalization widgets work

Browsers have excellent built-in personalization tools, but many users don't know about them. Personalization widgets can:

- Make browser features more discoverable
- Provide site-specific preferences that persist
- Offer additional customization beyond browser defaults
- Help users who don't have their own assistive technology in that environment
- Benefit users not actively using assistive technology

---

## 4. CSS Media Queries for Accessibility

Modern CSS provides powerful media queries that respect user preferences at the browser level.

### Available preference queries

```css
/* User prefers reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* User prefers dark color scheme */
@media (prefers-color-scheme: dark) {
  :root {
    --color-text: #e8e8e8;
    --color-background: #1a1a1a;
  }
}

/* User prefers high contrast */
@media (prefers-contrast: more) {
  :root {
    --color-text: #000000;
    --color-background: #ffffff;
    --border-width: 2px;
  }
}

/* User has forced colors mode active (Windows High Contrast) */
@media (forced-colors: active) {
  .custom-focus-indicator {
    forced-color-adjust: none;
    outline: 2px solid CanvasText;
  }
}

/* User prefers reduced transparency */
@media (prefers-reduced-transparency: reduce) {
  .modal-overlay {
    opacity: 1;
    background-color: var(--color-background);
  }
}
```

### Essential reading

- [MDN: Using Media Queries for Accessibility](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries#accessibility_media_features)
- [A More Inclusive Website Thanks to Media Queries](https://elevenways.be/en/articles/a-more-inclusive-website-thanks-to-media-queries)
- [CSS Media Queries: Accessibility & Optimize Digital Product Design](https://dockyard.com/blog/2024/01/16/css-media-queries-accessibility-optimize-digital-product-design)

---

## 5. Implementing User Personalization Features

### Recommended personalization options

#### 5.1 Font Size Controls

Browsers allow font size adjustment, but many users prefer visible controls.

**Pattern: A+/A- buttons**

```html
<div class="font-size-controls" role="group" aria-label="Font size controls">
  <button 
    id="decrease-font" 
    aria-label="Decrease font size"
    aria-describedby="font-size-status">
    A-
  </button>
  <button 
    id="reset-font" 
    aria-label="Reset font size to default"
    aria-describedby="font-size-status">
    A
  </button>
  <button 
    id="increase-font" 
    aria-label="Increase font size"
    aria-describedby="font-size-status">
    A+
  </button>
  <div id="font-size-status" class="visually-hidden" role="status" aria-live="polite"></div>
</div>
```

```javascript
// Font size adjustment
const fontSizes = ['small', 'medium', 'large', 'x-large'];
let currentSize = 1; // medium

function adjustFontSize(delta) {
  currentSize = Math.max(0, Math.min(fontSizes.length - 1, currentSize + delta));
  document.documentElement.style.fontSize = fontSizes[currentSize];
  localStorage.setItem('preferredFontSize', currentSize);
  
  // Announce change to screen readers
  const status = document.getElementById('font-size-status');
  status.textContent = `Font size changed to ${fontSizes[currentSize]}`;
}

// Restore preference on load
const savedSize = localStorage.getItem('preferredFontSize');
if (savedSize !== null) {
  currentSize = parseInt(savedSize);
  document.documentElement.style.fontSize = fontSizes[currentSize];
}
```

**Key requirements:**
- Provide clear labels and ARIA descriptions
- Announce changes to screen readers via `aria-live` region
- Persist preferences using `localStorage` or cookies
- Allow reset to default
- Don't prevent browser zoom from working

#### 5.2 Font Family Selection

Research on dyslexia fonts is mixed, but **user choice is valuable**.

**Studies suggest mixed results:**
- [PMC Article: Typography for Dyslexia](https://pmc.ncbi.nlm.nih.gov/articles/PMC5934461/)
- [The Dyslexia Friendly Font Myth](https://www.heidigregoryparentadvocacy.com/post/the-dyslexia-friendly-font-myth)
- [Do Dyslexia Fonts Actually Work?](https://www.edutopia.org/article/do-dyslexia-fonts-actually-work)

**Recommendation:** Offer choice, let users decide what works for them.

```html
<div class="font-family-selector">
  <label for="font-select">Font style:</label>
  <select id="font-select" aria-describedby="font-change-status">
    <option value="default">Default (brand font)</option>
    <option value="sans-serif">Sans-serif</option>
    <option value="serif">Serif</option>
    <option value="monospace">Monospace</option>
    <option value="comic-sans">Comic Sans</option>
    <option value="opendyslexic">OpenDyslexic</option>
  </select>
  <div id="font-change-status" class="visually-hidden" role="status" aria-live="polite"></div>
</div>
```

```css
:root {
  --font-default: "Brand Font", system-ui, sans-serif;
}

[data-font="sans-serif"] {
  --font-default: system-ui, -apple-system, sans-serif;
}

[data-font="serif"] {
  --font-default: Georgia, "Times New Roman", serif;
}

[data-font="monospace"] {
  --font-default: "Courier New", monospace;
}

[data-font="comic-sans"] {
  --font-default: "Comic Sans MS", cursive, sans-serif;
}

[data-font="opendyslexic"] {
  --font-default: "OpenDyslexic", sans-serif;
}

body {
  font-family: var(--font-default);
}
```

**Important notes:**
- Respect brand identity by making default your brand font
- Ensure all font options remain readable and accessible
- Test contrast in all font options
- Allow users to revert to default

#### 5.3 Line Spacing and Reading Mode

```html
<fieldset class="reading-preferences">
  <legend>Reading preferences</legend>
  
  <div class="preference-option">
    <label for="line-spacing">Line spacing:</label>
    <select id="line-spacing">
      <option value="normal">Normal</option>
      <option value="relaxed">Relaxed (1.5)</option>
      <option value="loose">Loose (2.0)</option>
    </select>
  </div>
  
  <div class="preference-option">
    <label for="letter-spacing">Letter spacing:</label>
    <select id="letter-spacing">
      <option value="normal">Normal</option>
      <option value="wide">Wide</option>
    </select>
  </div>
  
  <div class="preference-option">
    <label for="word-spacing">Word spacing:</label>
    <select id="word-spacing">
      <option value="normal">Normal</option>
      <option value="wide">Wide</option>
    </select>
  </div>
</fieldset>
```

**WCAG 1.4.12 Text Spacing requirements:**
Users must be able to set:
- Line height to at least 1.5 times font size
- Paragraph spacing to at least 2 times font size
- Letter spacing to at least 0.12 times font size
- Word spacing to at least 0.16 times font size

#### 5.4 Contrast Options

See [Light/Dark Mode Accessibility Best Practices](./LIGHT_DARK_MODE_ACCESSIBILITY_BEST_PRACTICES.md) for comprehensive guidance on theme switching.

```html
<fieldset class="contrast-preferences">
  <legend>Color theme:</legend>
  <div role="radiogroup" aria-labelledby="theme-legend">
    <input type="radio" id="theme-auto" name="theme" value="auto" checked>
    <label for="theme-auto">Auto (follow system)</label>
    
    <input type="radio" id="theme-light" name="theme" value="light">
    <label for="theme-light">Light</label>
    
    <input type="radio" id="theme-dark" name="theme" value="dark">
    <label for="theme-dark">Dark</label>
    
    <input type="radio" id="theme-high-contrast" name="theme" value="high-contrast">
    <label for="theme-high-contrast">High contrast</label>
  </div>
</fieldset>
```

---

## 6. Complete Preference Framework: Fluid Infusion

The **Fluid Project** is an open-source community developing inclusive design approaches and tools. Their **Preferences Framework** (also known as **UI Options**) demonstrates best-in-class user personalization and serves as a reference implementation for accessibility-focused customization.

### About the Fluid Project

The [Fluid Project](https://fluidproject.org/) is housed at the [Inclusive Design Research Centre (IDRC)](https://idrc.ocadu.ca/) at OCAD University in Toronto. The project focuses on creating flexible, customizable, and accessible user experiences through open-source software development and research.

**Key Fluid Project GitHub Organization:** [https://github.com/fluid-project](https://github.com/fluid-project)

### Fluid Infusion and UI Options

**Fluid Infusion** is a JavaScript framework for building accessible web applications. Its **Preferences Framework (UI Options)** component provides a comprehensive user preference system that can be integrated into any website.

**Core Infusion Projects:**
- [Fluid Infusion](https://github.com/fluid-project/infusion) - Main framework and preferences system
- [UI Options](https://github.com/fluid-project/uio) - Standalone preferences component
- [Fluid Skinning System (FSS)](https://github.com/fluid-project/fluid-skinning-system) - Accessible CSS framework that works with preferences
- [Infusion Documentation](https://github.com/fluid-project/infusion-docs) - Comprehensive documentation and guides

### UI Options Features

**Text Customization:**
- Text size adjustment (5 levels)
- Line spacing controls
- Font family selection (including OpenDyslexic)
- Letter spacing adjustment
- Word spacing adjustment

**Visual Customization:**
- High contrast themes (multiple options)
- Dark mode / light mode
- Background color options
- Custom color schemes

**Navigation Enhancement:**
- Table of contents generation
- Keyboard shortcuts
- Enhanced focus indicators

**Input Enhancement:**
- Enhanced form inputs
- Self-voicing (text-to-speech)
- Highlight selection

**Persistence:**
- All preferences stored in cookies
- Preferences persist across sessions
- Works across multiple pages

### Key Resources

- [Fluid Infusion Preferences Framework Documentation](https://docs.fluidproject.org/infusion/development/PreferencesFramework)
- [UI Options Demo](https://build-infusion.fluidproject.org/demos/prefsFramework/)
- [Fluid Project GitHub Organization](https://github.com/fluid-project)
- [Fluid Project Website](https://fluidproject.org/)
- [Inclusive Design Research Centre](https://idrc.ocadu.ca/)

**Implementation approach:**

```html
<!-- Preference toggle button with universal accessibility icon -->
<button 
  id="preferences-toggle" 
  aria-label="Open accessibility preferences"
  aria-expanded="false"
  aria-controls="preferences-panel">
  <svg aria-hidden="true" focusable="false" width="24" height="24" viewBox="0 0 24 24">
    <!-- Universal accessibility icon -->
    <path d="M12 2C10.9 2 10 2.9 10 4s.9 2 2 2 2-.9 2-2-.9-2-2-2zm8 7h-3.18C16.4 7.84 15.3 7 14 7h-4c-1.3 0-2.4.84-2.82 2H4c-.55 0-1 .45-1 1s.45 1 1 1h3.18c.42 1.16 1.52 2 2.82 2h1v6c0 .55.45 1 1 1s1-.45 1-1v-6h1c1.3 0 2.4-.84 2.82-2H20c.55 0 1-.45 1-1s-.45-1-1-1z"/>
  </svg>
</button>

<div 
  id="preferences-panel" 
  class="preferences-panel" 
  hidden
  role="dialog"
  aria-labelledby="preferences-title"
  aria-modal="true">
  <h2 id="preferences-title">Display Preferences</h2>
  
  <p class="preferences-description">
    These settings let you customize how you view this site. 
    Your preferences will be saved for future visits.
  </p>
  
  <!-- Font size controls -->
  <!-- Line spacing controls -->
  <!-- Font family selection -->
  <!-- Contrast theme selection -->
  <!-- Additional preferences -->
  
  <div class="preferences-actions">
    <button id="save-preferences">Save and Close</button>
    <button id="reset-preferences">Reset to Defaults</button>
  </div>
</div>
```

**Critical distinction:**

Include clear messaging that this is **NOT** an accessibility overlay:

```html
<div class="preferences-notice" role="note">
  <p>
    <strong>Note:</strong> This is a preference editor, not an accessibility overlay. 
    It allows you to customize how you view content without claiming to make 
    inaccessible content accessible. Learn more about 
    <a href="https://overlayfactsheet.com/en/">why accessibility overlays are problematic</a>.
  </p>
</div>
```

---

## 7. SkipTo: Essential Page Navigation

SkipTo by PayPal provides a keyboard-accessible menu of landmarks and headings, helping users navigate long pages.

**Why SkipTo matters:**

Browsers should expose page structure natively but often don't provide an easy way for all users to jump to sections. SkipTo fills this gap.

**Key resource:**
- [PayPal SkipTo Documentation and Demo](https://paypal.github.io/skipto/)

**Implementation:**

```html
<!-- Include SkipTo -->
<script src="https://paypal.github.io/skipto/downloads/js/skipto.min.js"></script>

<!-- Configure SkipTo -->
<script>
  var SkipToConfig = {
    settings: {
      skipTo: {
        displayOption: 'popup',
        attachElement: 'body',
        colorTheme: 'auto'
      }
    }
  };
</script>
```

**Features:**
- Keyboard shortcut (Alt+0 or Option+0) to open menu
- Lists all landmarks and headings
- Visual and screen reader accessible
- Customizable appearance
- Works with existing site structure

**Integration with preferences:**

Consider adding SkipTo toggle to your preferences panel:

```html
<div class="preference-option">
  <input type="checkbox" id="enable-skipto" checked>
  <label for="enable-skipto">
    Enable SkipTo navigation menu (Alt+0)
  </label>
  <p class="preference-description">
    Provides quick keyboard access to page sections and headings
  </p>
</div>
```

---

## 8. The Accessibility Icon: Creating Recognition

Accessibility overlays have popularized a universal accessibility icon (person in a circle). Use this icon for legitimate personalization features to:

1. Create visual consistency users recognize
2. Signal where accessibility preferences are located
3. Distinguish your preferences from page content

**Icon pattern:**

```html
<button 
  class="accessibility-preferences-btn"
  aria-label="Open display preferences">
  <!-- SVG icon with proper ARIA -->
  <svg 
    role="img" 
    aria-hidden="true" 
    focusable="false"
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24"
    width="32" 
    height="32">
    <title>Accessibility</title>
    <path d="M12 2C10.9 2 10 2.9 10 4s.9 2 2 2 2-.9 2-2-.9-2-2-2zm8 7h-3.18C16.4 7.84 15.3 7 14 7h-4c-1.3 0-2.4.84-2.82 2H4c-.55 0-1 .45-1 1s.45 1 1 1h3.18c.42 1.16 1.52 2 2.82 2h1v6c0 .55.45 1 1 1s1-.45 1-1v-6h1c1.3 0 2.4-.84 2.82-2H20c.55 0 1-.45 1-1s-.45-1-1-1z" fill="currentColor"/>
  </svg>
  <span class="btn-text">Preferences</span>
</button>
```

**Placement:**
- Consistent location (typically top-right corner)
- Visible and easily discoverable
- Large enough touch target (44×44px minimum)
- Clear focus indicator

---

## 9. Accessibility Requirements Checklist

When implementing user personalization:

- [ ] **Do NOT use third-party accessibility overlays**
- [ ] Reference [Overlay Fact Sheet](https://overlayfactsheet.com/en/) to explain why
- [ ] Implement CSS media queries for user preferences
- [ ] Provide visible preference controls for users who need them
- [ ] Use proper ARIA for all controls (labels, live regions, states)
- [ ] Persist preferences using `localStorage` or cookies
- [ ] Announce changes to screen readers
- [ ] Test with keyboard-only navigation
- [ ] Test with screen readers (NVDA, JAWS, VoiceOver)
- [ ] Ensure preferences don't break responsive design
- [ ] Verify all preference combinations maintain WCAG 2.2 AA contrast
- [ ] Include clear messaging that this is NOT an overlay
- [ ] Consider including SkipTo for page navigation
- [ ] Use recognizable accessibility icon for preferences button
- [ ] Provide reset option to return to defaults
- [ ] Document that users' own assistive technology takes precedence

---

## 10. Testing User Personalization

### Automated testing

```javascript
// Example: Test font size preferences persist
describe('Font size preferences', () => {
  it('should persist font size selection', () => {
    cy.visit('/');
    
    // Increase font size
    cy.get('#increase-font').click();
    
    // Verify change applied
    cy.get('html').should('have.css', 'font-size', 'large');
    
    // Verify localStorage updated
    cy.window().then((win) => {
      expect(win.localStorage.getItem('preferredFontSize')).to.eq('2');
    });
    
    // Reload page
    cy.reload();
    
    // Verify preference persisted
    cy.get('html').should('have.css', 'font-size', 'large');
  });
  
  it('should announce changes to screen readers', () => {
    cy.visit('/');
    cy.get('#increase-font').click();
    
    // Check aria-live region updated
    cy.get('#font-size-status')
      .should('have.attr', 'role', 'status')
      .and('contain', 'Font size changed');
  });
});
```

### Manual testing

1. **Keyboard accessibility:**
   - Tab through all preference controls
   - Verify focus indicators visible
   - Test keyboard activation (Enter/Space)
   - Verify keyboard shortcuts (if implemented)

2. **Screen reader testing:**
   - Verify all controls properly labeled
   - Check that changes are announced
   - Test with NVDA (Windows), JAWS (Windows), VoiceOver (macOS/iOS)

3. **Preference persistence:**
   - Set preferences, refresh page
   - Close browser, reopen
   - Test in incognito/private mode

4. **Contrast validation:**
   - Test all theme combinations meet WCAG 2.2 AA
   - Verify in forced-colors mode (Windows High Contrast)
   - Check with color blindness simulators

5. **Mobile testing:**
   - Touch targets adequate (44×44px minimum)
   - Preferences panel accessible on small screens
   - Works with zoom enabled

---

## 11. Related Resources

### Internal guides
- [Light/Dark Mode Accessibility Best Practices](./LIGHT_DARK_MODE_ACCESSIBILITY_BEST_PRACTICES.md) - Comprehensive theming guidance
- [Keyboard Accessibility Best Practices](./KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md) - Keyboard interaction patterns
- [Forms Accessibility Best Practices](./FORMS_ACCESSIBILITY_BEST_PRACTICES.md) - Form control accessibility

### External resources
- [Overlay Fact Sheet](https://overlayfactsheet.com/en/) - Why overlays are problematic
- [Fluid Infusion Preferences Framework](https://docs.fluidproject.org/infusion/development/PreferencesFramework) - Reference implementation
- [PayPal SkipTo](https://paypal.github.io/skipto/) - Page navigation tool
- [MDN: CSS Media Queries for Accessibility](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries#accessibility_media_features)
- [Web Almanac 2024: Accessibility Chapter](https://almanac.httparchive.org/en/2024/accessibility#user-personalization-widgets-and-overlay-remediation)

---

## 12. Machine-Readable Standards

This guide references normative WCAG 2.2 requirements available in machine-readable YAML format via [wai-yaml-ld](https://github.com/mgifford/wai-yaml-ld):

- **WCAG 2.2 normative:** `wcag-2.2-normative.yaml`
- **WCAG 1.4.12 Text Spacing:** `wcag-2.2-normative.yaml#1.4.12`
- **WCAG 1.4.3 Contrast (Minimum):** `wcag-2.2-normative.yaml#1.4.3`
- **WCAG 2.4.1 Bypass Blocks:** `wcag-2.2-normative.yaml#2.4.1` (related to SkipTo)
- **ARIA authoring practices:** `wai-aria-informative.yaml`

---

## Summary

User personalization done right empowers users without claiming to fix accessibility. The key distinctions:

**❌ Don't:**
- Use third-party accessibility overlays
- Claim personalization "makes site accessible"
- Replace proper accessible design with widgets
- Interfere with users' assistive technology

**✅ Do:**
- Respect CSS media queries for user preferences
- Provide visible preference controls as helpers
- Be transparent about what features do
- Persist user choices
- Test thoroughly with assistive technology
- Reference the Overlay Fact Sheet
- Consider SkipTo for navigation
- Use clear labeling and announcements

User choice is powerful. Give users control over their experience while maintaining a solid accessible foundation.
