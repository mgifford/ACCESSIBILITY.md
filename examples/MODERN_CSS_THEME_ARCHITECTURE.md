# Modern CSS Theme Architecture

> Build theme systems that are accessible, maintainable, and adaptable by separating design decisions from implementation details.

## Why this matters

Many websites still treat theming as a simple choice between a light and dark colour palette. Modern CSS has evolved beyond this model.

A well-designed theme architecture allows websites to:

* Respect user preferences.
* Support multiple themes without duplicating CSS.
* Improve maintainability through semantic design tokens.
* Make accessibility easier to audit and improve.
* Adapt to future browser capabilities with minimal changes.

This document describes the architectural principles behind modern CSS theming. It complements, rather than replaces, accessibility guidance on colour contrast, dark mode, focus indicators, reduced motion, and other user preferences.

---

# Architecture Overview

A modern theme system separates user preferences from implementation.

```text
User Preferences
        │
        ▼
Browser Capabilities
        │
        ▼
Theme Resolution
        │
        ▼
Semantic Design Tokens
        │
        ▼
Component Tokens
        │
        ▼
Component Implementation
```

Each layer has a distinct responsibility.

---

# Respect User Preferences

Users may express preferences through their operating system, browser, assistive technology, or application settings.

Common preferences include:

* Light mode
* Dark mode
* Forced colours
* Increased contrast
* Reduced motion
* Reduced transparency
* Larger text
* Browser zoom
* Custom stylesheets

A modern theme architecture should respect these preferences whenever possible.

Application-specific preferences should complement, rather than replace, operating system preferences.

---

# Prefer Native Browser Features

Modern browsers increasingly support adaptive theming directly.

Examples include:

* `color-scheme`
* `light-dark()`
* `prefers-color-scheme`
* `prefers-contrast`
* `forced-colors`

Prefer browser-native functionality before introducing JavaScript.

Native browser support generally provides:

* Better performance
* Lower maintenance
* Better interoperability
* Improved accessibility

---

# Design Layers

## Primitive Tokens

Primitive tokens define raw design values.

Examples include:

```css
--blue-500
--gray-100
--gray-900
--spacing-4
--radius-small
```

Primitive tokens should rarely be referenced directly by components.

---

## Semantic Tokens

Semantic tokens describe purpose rather than appearance.

Good examples:

```css
--surface
--surface-raised
--text-primary
--text-secondary
--interactive
--border-default
--focus-ring
```

Avoid names tied to colours.

Poor examples:

```css
--blue-button
--light-gray
--dark-background
```

Semantic names remain meaningful even when themes change.

---

## Component Tokens

Component tokens map semantic tokens onto individual components.

Examples:

```css
--button-background
--button-text
--card-background
--navigation-border
```

Component tokens should usually reference semantic tokens rather than raw colours.

---

# Theme Resolution

Modern CSS increasingly allows themes to be resolved automatically.

Rather than maintaining duplicated stylesheets:

```css
@media (prefers-color-scheme: dark) {
  ...
}
```

consider using:

```css
color: light-dark(#222, #eee);
```

where browser support permits.

This reduces duplication and simplifies maintenance.

---

# Accessibility Tokens

Accessibility involves more than colour.

Modern design systems should expose tokens for:

## Focus

```css
--focus-ring-color
--focus-ring-width
--focus-ring-offset
```

## Borders

```css
--border-width
--border-strong
```

## Motion

```css
--animation-duration
--transition-duration
--motion-scale
```

## Spacing

```css
--target-size
--interactive-spacing
```

## Typography

```css
--reading-width
--line-height-body
```

Treat these as first-class design tokens rather than hard-coded component values.

---

# Theme Components

A complete theme usually affects much more than colours.

Typical themed elements include:

* Page background
* Raised surfaces
* Text
* Links
* Buttons
* Forms
* Navigation
* Tables
* Borders
* Dividers
* Focus indicators
* Shadows
* Icons
* Charts
* Status colours
* Code blocks
* Syntax highlighting

Avoid treating them as independent colour choices.

---

# Avoid Separate Design Systems

A light theme and dark theme should not become separate design systems.

Instead:

```text
Semantic token

↓

Browser resolves value

↓

Component consumes token
```

Only the resolved value changes.

The meaning remains constant.

---

# Auditability

Semantic tokens improve accessibility auditing.

Instead of identifying hundreds of colour values across a website:

```
#005ea5
```

identify the semantic decision:

```
--interactive-primary
```

Fixing one token can improve accessibility across thousands of pages.

Large websites, government platforms, and design systems particularly benefit from this approach.

---

# Progressive Enhancement

Recommended implementation order:

1. Semantic design tokens
2. Browser-native features (`color-scheme`, `light-dark()`)
3. User preference media queries
4. JavaScript overrides where necessary

Each layer should enhance, rather than replace, the previous layer.

---

# Browser Support

Modern CSS features continue to evolve.

When using newer functionality:

* Prefer progressive enhancement.
* Avoid requiring JavaScript where CSS is sufficient.
* Provide sensible fallbacks.
* Test across supported browsers.

---

# Relationship to Other Accessibility Guidance

This document provides architectural guidance.

For implementation details, see:

* `USER_PREFERENCE_THEMING_ACCESSIBILITY_BEST_PRACTICES.md`
* `COLOR_CONTRAST_ACCESSIBILITY_BEST_PRACTICES.md`
* Focus indicator guidance
* Reduced motion guidance
* Forced colours guidance
* Accessible typography guidance

Those documents explain how to implement accessible interfaces.

This document explains how to structure a theme system so those recommendations become easier to apply consistently.

---

# Key Principles

Modern CSS theme architecture should:

* Respect user preferences.
* Prefer semantic design tokens over colour-specific names.
* Use browser-native features whenever practical.
* Minimize duplicated theme definitions.
* Treat accessibility as part of the design system rather than a separate concern.
* Improve maintainability through clear abstraction layers.
* Make accessibility easier to audit at scale.
