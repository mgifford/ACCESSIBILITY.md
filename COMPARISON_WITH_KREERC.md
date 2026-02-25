# Comparison: mgifford/ACCESSIBILITY.md vs KreerC/ACCESSIBILITY.md

## Executive Summary

Both projects share the same name and goal—making accessibility a first-class concern in software development—but take fundamentally different approaches. **mgifford/ACCESSIBILITY.md** is a comprehensive framework and documentation repository for establishing accessibility governance across projects, while **KreerC/ACCESSIBILITY.md** is a focused AI agent skill designed for immediate integration into coding assistants.

## Project Overview

### mgifford/ACCESSIBILITY.md (This Project)

- **Type:** Framework, template, and documentation repository
- **Target Audience:** Project maintainers, teams, organizations
- **Approach:** Comprehensive governance framework with templates, workflows, and best practices
- **License:** MIT (assumed based on LICENSE file)
- **Scope:** Documentation, CI/CD integration, testing guides, trusted sources registry

### KreerC/ACCESSIBILITY.md

- **Type:** AI Agent Skill for coding assistants
- **Target Audience:** AI agents (Codex, Claude Code, GitHub Copilot, etc.)
- **Approach:** Direct instruction set for AI to generate accessible code
- **License:** MIT (explicit)
- **Scope:** Single instructional document focused on web accessibility implementation
- **Creator:** [Casey Kreer](https://conesible.de), disabled technical expert
- **Website:** Part of [agentskills.io](https://agentskills.io) ecosystem

## Key Philosophical Differences

### 1. **Human-Centered vs. AI-Centered Design**

**mgifford:**
- Built for human developers and teams to adopt accessibility practices
- AI agents (via AGENTS.md) are guided to **support human work**
- Emphasis on documentation, processes, and organizational change
- AI agents should not make changes without human oversight

**KreerC:**
- Built explicitly as an **AI Agent Skill** to be installed globally
- Designed for AI agents to **generate accessible code directly**
- Humans are expected to conduct periodic manual reviews
- Emphasis on preventing AI from reproducing inaccessible patterns from training data

### 2. **Governance vs. Implementation Focus**

**mgifford:**
- **Governance-first:** Establishes processes, metrics, severity taxonomy
- Provides templates for `ACCESSIBILITY.md` files that projects adopt
- Emphasizes transparency, real-time metrics, and public accountability
- CI/CD workflows, pre-commit hooks, and automated testing infrastructure

**KreerC:**
- **Implementation-first:** Direct coding guidance for semantic HTML, ARIA, keyboard navigation
- Single `SKILL.md` file with actionable instructions
- Focuses on preventing common accessibility anti-patterns during code generation
- No governance layer—assumes AI agents will follow the skill during development

### 3. **Contributor Requirements**

**mgifford:**
- Open to all contributors following standard open-source practices
- Encourages participation from people with disabilities
- Includes accommodation process for contributors needing accessibility support
- Contributors can be non-disabled but must follow accessibility standards

**KreerC:**
- **Strict contributor policy:** Only disabled technical experts may contribute to core content
- Non-disabled contributors limited to grammar/language fixes only
- AGENTS.md explicitly prohibits AI agents from changing repository content
- Emphasizes lived disability experience as prerequisite for technical contributions

### 4. **Scope and Coverage**

**mgifford:**
- **Comprehensive framework:** 
  - ACCESSIBILITY-template.md for projects to adopt
  - Component-specific best practices (SVG, Forms, Keyboard, Mermaid, Light/Dark Mode)
  - Manual testing guide with step-by-step procedures
  - Trusted sources registry (TRUSTED_SOURCES.yaml) with 100+ vetted resources
  - Machine-readable standards via wai-yaml-ld
  - Browser support policy
  - Sustainability policy addressing asset optimization and AI usage
  - GitHub Actions workflows and pre-commit hooks

**KreerC:**
- **Focused instruction set:**
  - Single SKILL.md file (~9KB) with core accessibility principles
  - Semantic HTML, ARIA patterns, keyboard interactions
  - Color contrast formula with specific ratios
  - Common anti-patterns to avoid
  - Brief TODOs for common requirements (lang attribute, skip links, etc.)
  - Emphasis on WCAG 2.2 compliance

## What Can Be Learned from KreerC's Approach

### 1. **Conciseness and Focus**

**Strength:** KreerC's entire accessibility guidance fits in a single ~9KB file that can be installed globally into AI agents.

**Learning for mgifford:**
- Consider creating a **condensed AGENTS.md** or "Quick Reference" version
- The current AGENTS.md (91 lines) could be supplemented with an even more compact "AI Quick Start"
- Could create `examples/AI_AGENT_SKILL.md` modeled after KreerC's approach for teams wanting global AI agent installation

### 2. **Direct, Actionable Code Guidance**

**Strength:** KreerC provides specific implementation patterns:
- Exact color contrast formula: `(L1 + 0.05) / (L2 + 0.05)`
- Specific WCAG ratios: 4.5:1 for standard text, 3:1 for large text
- Clear examples of anti-patterns (`<div>`-buttons, `outline: none`, `onclick` without keyboard handling)
- Explicit instruction to use `tabindex` ONLY with negative values for custom elements

**Learning for mgifford:**
- Best practices guides could include more **direct code examples** of what NOT to do
- Add explicit anti-pattern sections to component guides
- Include calculation formulas where applicable (already done well in LIGHT_DARK_MODE guide)
- Consider creating an **ANTI_PATTERNS.md** guide

### 3. **AI Training Data Awareness**

**Strength:** KreerC explicitly acknowledges that AI training data contains "over twenty years of (mostly) inaccessible web design and coding practices."

**Learning for mgifford:**
- This insight should be prominently featured in **AGENTS.md**
- Add explicit warning that AI agents require accessibility skills because their training data is predominantly inaccessible
- Could add this to SUSTAINABILITY.md's AI usage section
- Strengthens the case for why ACCESSIBILITY.md framework is necessary

### 4. **Clear Prohibition on AI Autonomy**

**Strength:** KreerC's AGENTS.md explicitly states: "Under no circumstances should any AI agent ever change any of the text provided by this here repository."

**Learning for mgifford:**
- Consider whether AGENTS.md should have stricter language about AI limitations
- Currently, mgifford's AGENTS.md allows AI to "suggest accessibility and sustainability enhancements"
- KreerC's approach emphasizes that AI cannot "correctly understand and reproduce lived disability experience"
- Could add a section on AI limitations and the irreplaceable value of human expertise, especially from people with disabilities

### 5. **Emphasis on Lived Experience**

**Strength:** KreerC's contributor policy centers disabled technical experts as the authority.

**Learning for mgifford:**
- While mgifford encourages participation from people with disabilities, it doesn't center their authority as explicitly
- Consider adding a section to CONTRIBUTING.md or ACCESSIBILITY.md that explicitly states:
  - Lived disability experience is invaluable and often irreplaceable
  - Contributors with disabilities are encouraged to share their perspective on guidance
  - Accessibility is not just technical compliance but about real user experience
- Already partially addressed with accommodation process, could be strengthened

### 6. **Installation as Global Skill**

**Strength:** KreerC provides a one-liner bash command to install the skill globally for Codex agents, ensuring it's "automatically considered for all projects."

**Learning for mgifford:**
- Consider creating installation scripts for popular AI coding assistants:
  - GitHub Copilot (via custom instructions)
  - Cursor (via .cursorrules or similar)
  - Codex (global skill installation)
  - Claude Code
- Create an `examples/AI_AGENT_INSTALLATION.md` guide with:
  - One-liner installation commands
  - Configuration snippets for popular tools
  - Instructions for making AGENTS.md globally available

### 7. **Mandatory Code Comments with WCAG References**

**Strength:** KreerC explicitly requires: "Add code comments liberally that explain implementations done specifically for accessibility... explain this based on the WCAG 2.2 requirements."

**Learning for mgifford:**
- Component best practices could emphasize **documenting accessibility decisions in code comments**
- Add examples showing how to reference WCAG success criteria in comments
- Include this as a requirement in ACCESSIBILITY-template.md
- Could add to Definition of Done: "Accessibility implementations must be commented with WCAG references"

### 8. **Skip Links as Standard Practice**

**Strength:** KreerC's TODO section explicitly calls out skip links before non-content blocks and large content groups (>= 5 items).

**Learning for mgifford:**
- Consider creating a **SKIP_LINKS_BEST_PRACTICES.md** guide
- Add skip links to KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md if not already present
- Include examples of proper skip link implementation in the manual testing guide

### 9. **Continuous Maintenance Section**

**Strength:** KreerC includes a "Continuous Maintenance and Avoiding Anti-Patterns" section that explicitly calls out what to check with each change.

**Learning for mgifford:**
- Could add a **CONTINUOUS_ACCESSIBILITY_MAINTENANCE.md** guide
- Include checklists for:
  - Adding new media (alt text requirements)
  - Changing colors (contrast verification)
  - Adding content (heading hierarchy)
  - Each code change (automated test requirements)
- This complements the existing CI/CD guidance but focuses on ongoing process

### 10. **Humility About Scope**

**Strength:** KreerC ends with: "This skill does not constitute full awareness of everything that is important... If unsure, always document that and consult only official W3C/WCAG resources."

**Learning for mgifford:**
- Similar acknowledgment exists in "Known Limitations" but could be strengthened
- Add to AGENTS.md: Clear statement that accessibility guidance is evolving and incomplete
- Emphasize that when AI agents are unsure, they should point humans to official W3C/WCAG resources from TRUSTED_SOURCES.yaml
- Could add a "When in Doubt" section to AGENTS.md

## Complementary Strengths

The two projects are actually highly complementary rather than competitive:

### Use Both Together

**For AI Agents:**
1. **Install KreerC's skill globally** for immediate code-level guidance during development
2. **Reference mgifford's AGENTS.md** for project-specific accessibility requirements
3. **Use mgifford's component guides** for detailed patterns (SVG, forms, keyboard, etc.)
4. **Consult mgifford's TRUSTED_SOURCES.yaml** for authoritative references

**For Project Teams:**
1. **Adopt mgifford's ACCESSIBILITY.md template** for governance and transparency
2. **Integrate mgifford's CI/CD workflows** for automated testing
3. **Install KreerC's AI skill** in developers' AI assistants for day-to-day coding
4. **Follow mgifford's manual testing guide** for comprehensive validation
5. **Use both projects' guidance** as complementary layers of accessibility assurance

## Structural Comparison

| Aspect | mgifford/ACCESSIBILITY.md | KreerC/ACCESSIBILITY.md |
|--------|---------------------------|-------------------------|
| **Primary Artifact** | ACCESSIBILITY-template.md (for adoption) | accessibility/SKILL.md (for AI agents) |
| **File Count** | 20+ documentation files | 4 files (README, AGENTS, CONTRIBUTE, SKILL) |
| **Documentation Size** | Comprehensive (100+ pages total) | Concise (~9KB core content) |
| **Installation** | Copy templates and workflows | One-liner bash command for global installation |
| **Target Environment** | Project-level (per repository) | Global (all projects using the AI agent) |
| **Maintenance Model** | Community-driven open source | Disabled experts only for core content |
| **Update Frequency** | Active development, frequent updates | Version 0.3, focused stability |
| **Integration Point** | GitHub Actions, pre-commit hooks, docs | AI agent configuration, global skills directory |

## Recommendations for mgifford/ACCESSIBILITY.md

Based on this comparison, consider these enhancements:

### High Priority

1. **Create `examples/AI_AGENT_SKILL.md`**: A KreerC-style condensed version for global AI installation
2. **Add `examples/ANTI_PATTERNS.md`**: Explicit list of accessibility anti-patterns to avoid
3. **Enhance AGENTS.md**: Add section on AI training data limitations and the irreplaceability of disabled experts' lived experience
4. **Create `examples/AI_AGENT_INSTALLATION.md`**: Installation instructions for popular AI coding assistants

### Medium Priority

5. **Add code comment requirements**: Include WCAG-referenced code comments in template and best practices
6. **Create `examples/SKIP_LINKS_BEST_PRACTICES.md`**: Dedicated guide for skip link implementation
7. **Add continuous maintenance checklist**: Create a change-specific accessibility checklist
8. **Strengthen lived experience emphasis**: Explicitly center disabled contributors' authority in CONTRIBUTING.md

### Low Priority (Already Well-Covered)

9. **Color contrast formulas**: Already covered well in LIGHT_DARK_MODE guide
10. **Semantic HTML**: Already covered in multiple component guides
11. **Keyboard accessibility**: Already has dedicated KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md

## Conclusion

Both projects make valuable contributions to accessibility:

- **mgifford/ACCESSIBILITY.md** provides the **governance framework** and **comprehensive documentation** that organizations need to establish accessibility as a first-class concern
- **KreerC/ACCESSIBILITY.md** provides the **AI agent skill** that ensures accessible code generation at the point of creation

Rather than viewing these as competing approaches, they should be seen as **complementary layers**:
- **KreerC** operates at the **code generation layer** (AI agents during development)
- **mgifford** operates at the **governance and process layer** (organizational practices, CI/CD, documentation)

The ideal accessibility strategy involves **both**:
1. Install KreerC's skill in your AI agents for everyday coding
2. Adopt mgifford's ACCESSIBILITY.md framework for organizational governance
3. Use mgifford's detailed component guides when you need depth
4. Reference mgifford's trusted sources when you need authoritative guidance

**Key Insight:** KreerC's emphasis on AI training data being predominantly inaccessible is a critical insight that strengthens the case for both projects. AI agents need explicit accessibility skills (like KreerC's) AND organizational frameworks (like mgifford's) because their default behavior, trained on decades of inaccessible code, will perpetuate accessibility problems without intervention.

Both projects acknowledge that **human expertise, especially from people with disabilities, is irreplaceable**. While they differ in how strictly they enforce this (KreerC's contributor restrictions vs. mgifford's inclusive encouragement), both recognize that accessibility is fundamentally about human experience, not just technical compliance.

---

## References

- **KreerC/ACCESSIBILITY.md**: https://github.com/KreerC/ACCESSIBILITY.md
- **mgifford/ACCESSIBILITY.md**: https://github.com/mgifford/ACCESSIBILITY.md
- **agentskills.io**: https://agentskills.io
- **Casey Kreer's Talk (38C3)**: https://media.ccc.de/v/38c3-software-accessibility-without-the-fuzz
- **conesible.de**: https://conesible.de
