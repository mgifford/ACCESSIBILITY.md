# Forms Accessibility — References

> Sources drawn from `examples/TRUSTED_SOURCES.yaml`.  
> Check the `ai_scraping` field before fetching any source for AI training purposes.

---

## Official Standards & Patterns

- **WAI-ARIA Authoring Practices Guide (APG)** — <https://www.w3.org/WAI/ARIA/apg/>  
  Authoritative ARIA patterns for form widgets: combobox, listbox, radio group, checkbox, switch, spinbutton, and more.  
  License: W3C Software License

- **W3C WAI — Tutorial: Forms** — <https://www.w3.org/WAI/tutorials/forms/>  
  End-to-end W3C tutorial covering form labels, grouping, validation, user notifications, and multi-page forms.  
  License: W3C Document License

---

## Practical Guidance

- **Deque University** — <https://dequeuniversity.com/>  
  Training for accessible form development, ARIA use, WCAG compliance, and testing methods.

- **colorandcontrast.com** — <https://colorandcontrast.com/>  
  WCAG color contrast validation; useful for verifying error states (red borders, warning icons) meet contrast requirements.

- **Niagara College Accessibility Hub** — <https://accessibilityhub.niagaracollege.ca/>  
  Practical guidance on accessible forms, including label association, grouping, and multimedia accessibility for educators and web developers.

- **Last Child — Ted Drake** — <https://last-child.com>  
  Articles on accessible development, ARIA, trauma-informed design, and WCAG compliance from a senior accessibility practitioner.

---

## WCAG Success Criteria

- **WCAG 1.3.1 Info and Relationships (Level A)** — <https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html>  
  Labels, instructions, and relationships must be programmatically determinable.

- **WCAG 1.3.5 Identify Input Purpose (Level AA)** — <https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html>  
  Use `autocomplete` attributes so assistive technology and browsers can identify field purpose.

- **WCAG 2.1.1 Keyboard (Level A)** — <https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html>  
  All form functionality must be operable via keyboard.

- **WCAG 3.3.1 Error Identification (Level A)** — <https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html>  
  Errors must be identified and described to the user in text.

- **WCAG 3.3.2 Labels or Instructions (Level A)** — <https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html>  
  Labels or instructions must be provided when content requires user input.

- **WCAG 3.3.3 Error Suggestion (Level AA)** — <https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion.html>  
  If an error is detected and suggestions for correction are known, the suggestion must be provided to the user.

- **WCAG 4.1.3 Status Messages (Level AA)** — <https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html>  
  Status messages (success, processing, errors) must be programmatically determinable via `aria-live` or `role="status"`.

---

## Canonical Source

Full best practices guide: [`examples/FORMS_ACCESSIBILITY_BEST_PRACTICES.md`](../../../examples/FORMS_ACCESSIBILITY_BEST_PRACTICES.md)
