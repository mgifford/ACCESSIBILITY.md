# Comparison with Similar Projects

## Why this page exists

This page used to compare only **mgifford/ACCESSIBILITY.md** and **KreerC/ACCESSIBILITY.md**.
It now provides a broader comparison matrix across the related projects tracked in [README.md](./README.md#related-projects).

## Comparison matrix

| Project | Primary focus | Format | Primary audience | Platform scope | Distinct strength |
|---|---|---|---|---|---|
| [mgifford/ACCESSIBILITY.md](https://github.com/mgifford/ACCESSIBILITY.md) | Governance + templates + workflows for accessibility transparency | Multi-file docs repo (`ACCESSIBILITY-template.md`, `AGENTS.md`, examples, workflows) | Maintainers, teams, orgs, AI-assisted contributors | Broad web/process guidance | End-to-end governance layer (policy, CI/CD, testing, trusted sources) |
| [KreerC/ACCESSIBILITY.md](https://github.com/KreerC/ACCESSIBILITY.md) | Focused accessibility skill for AI agents | Skill-oriented repo with direct instructions | AI coding assistants and developers using them | Web accessibility implementation | Very concise, direct, installable guidance for day-to-day coding |
| [mikemai2awesome/agent-skills](https://github.com/mikemai2awesome/agent-skills) | Practical coding-style skills collection | Multi-skill repository | Developers using skills-driven agent workflows | Primarily frontend/web | Strong “trust native HTML/browser” approach via `frontend-a11y` |
| [Intopia/intopia-web-accessibility-skill](https://github.com/Intopia/intopia-web-accessibility-skill/) | Structured web accessibility skill with criteria and examples | `SKILL.md` + indexed references + scripts | Teams integrating agent skills into delivery | Web components/patterns | Combines acceptance criteria, examples, and contrast script checks |
| [LaurenceRLewis/a11y-spec-first-skill](https://github.com/LaurenceRLewis/a11y-spec-first-skill) | Spec-first AI prompting discipline | Instruction skill file | Developers wanting citation-driven AI output | Web/front-end technologies | Forces explicit specification mapping before recommendations |
| [mgifford/accessibility-skills](https://github.com/mgifford/accessibility-skills) | Portable topic-specific accessibility skills | Skill collection derived from this repo’s examples | AI agent users needing reusable modules | Mostly web, topic-based | Modular skill packs aligned to canonical example docs |
| [fecarrico/A11Y.md](https://github.com/fecarrico/A11Y.md) | Persistent context protocol for AI-assisted accessibility | Framework-style docs + templates | Teams using AI for UI implementation and review | Web product workflows | Strong protocol framing and workflow/checklist orientation |
| [dadederk/iOS-Accessibility-Agent-Skill](https://github.com/dadederk/iOS-Accessibility-Agent-Skill) | iOS accessibility implementation skill | iOS skill + extensive references | iOS teams (UIKit/SwiftUI) and agents | Native iOS | Deep assistive-tech coverage for VoiceOver, Dynamic Type, and iOS testing |
| [Community-Access/accessibility-agents](https://github.com/Community-Access/accessibility-agents) | Large multi-agent accessibility ecosystem | Agent suite + docs + workflows | Teams adopting broad automation and orchestration | Multi-platform (web/docs/workflows/tooling) | Breadth of specialized agents and platform integrations |

## How to use this matrix

- Use **mgifford/ACCESSIBILITY.md** as your governance and transparency baseline.
- Add one or more **skill-focused repos** for implementation-level AI guidance.
- Choose by delivery context:
  - **Web UI teams:** KreerC, Intopia, Mike Mai, Spec-First, accessibility-skills
  - **Native iOS teams:** iOS Accessibility Agent Skill
  - **Large agent orchestration needs:** Accessibility Agents

## Suggested layering model

1. **Governance layer**: `ACCESSIBILITY.md` + contribution/process standards
2. **Implementation layer**: install one or more targeted skills
3. **Validation layer**: CI checks, manual AT testing, and human review

This layered approach avoids relying on a single artifact for all accessibility needs.

## Notes and limits

- This matrix is a directional comparison, not a ranking.
- Repositories evolve quickly; verify current scope before adoption.
- No AI skill replaces manual testing with assistive technologies or feedback from people with disabilities.

## References

- [mgifford/ACCESSIBILITY.md](https://github.com/mgifford/ACCESSIBILITY.md)
- [KreerC/ACCESSIBILITY.md](https://github.com/KreerC/ACCESSIBILITY.md)
- [mikemai2awesome/agent-skills](https://github.com/mikemai2awesome/agent-skills)
- [Intopia/intopia-web-accessibility-skill](https://github.com/Intopia/intopia-web-accessibility-skill/)
- [LaurenceRLewis/a11y-spec-first-skill](https://github.com/LaurenceRLewis/a11y-spec-first-skill)
- [mgifford/accessibility-skills](https://github.com/mgifford/accessibility-skills)
- [fecarrico/A11Y.md](https://github.com/fecarrico/A11Y.md)
- [dadederk/iOS-Accessibility-Agent-Skill](https://github.com/dadederk/iOS-Accessibility-Agent-Skill)
- [Community-Access/accessibility-agents](https://github.com/Community-Access/accessibility-agents)
