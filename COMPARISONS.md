# Comparison with Complementary Accessibility Resources

## Maintenance metadata

- **Last verified**: 2026-11-11
- **Review cadence**: Quarterly
- **Verification method**: Each upstream repository's public README, licence, and
  repository metadata were checked on the date above. Project scope changes
  quickly; re-check the linked source before relying on a description here.

## Why this page exists

Accessibility work is not one product category. A standard, a research
knowledge base, a component guide, a scanner, a testing method, and an agent
skill answer different questions. Treating them as interchangeable leads to
bad procurement decisions and false conformance claims.

This page helps you choose complementary resources. It does not rank them, and
it does not replace their authoritative documentation. For source metadata,
licensing, and review status, use the
[Trusted Sources Registry](./TRUSTED_SOURCES.md).

## Resource categories are not interchangeable

| Category | Question it answers | Typical examples |
| --- | --- | --- |
| **Normative standards and specifications** | What must be satisfied? | [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/), [EN 301 549](https://www.etsi.org/human-factors-accessibility/en-301-549-v3-the-harmonized-european-standard-for-ict-accessibility) |
| **Research and functional considerations** | Which access strategies and interface barriers should be examined? | [Microsoft Accessibility Considerations Toolkit](https://github.com/microsoft/Microsoft-Accessibility/tree/main/Accessibility-Considerations-Toolkit), [W3C COGA](https://www.w3.org/TR/coga-usable/) |
| **Design and implementation guidance** | How might a team build this component or pattern? | This repository's [`examples/`](./examples/README.md), Intopia's skill, `A11Y.md` |
| **Automated accessibility testing** | Which machine-detectable conditions are present? | axe-core, Playwright assertions, Lighthouse, scanner integrations |
| **Manual evaluation and user research** | What happens when a person completes a real task with assistive technology or other access methods? | [W3C WAI evaluation guidance](https://www.w3.org/WAI/test-evaluate/), this repository's [manual testing guide](./examples/MANUAL_ACCESSIBILITY_TESTING_GUIDE.md), ACT methodology |
| **AI agent instructions and skills** | What should an AI coding agent do while generating or reviewing code? | The resources in the AI-assisted column below |
| **Governance and accountability** | Who commits to what, how is evidence recorded, and how are gaps handled? | This repository's [template](./examples/ACCESSIBILITY-template.md), [`A11Y.md`](https://github.com/fecarrico/A11Y.md), [Community-Access](https://github.com/Community-Access/accessibility-agents) |

A tool result is not a standard. A skill is not a governance policy. A research
lens is not a representation of disabled people. Keep the categories distinct
when you cite them.

## At-a-glance comparison

| Resource | Primary role | Best for | Machine-readable resources | AI-assisted development or evaluation | Reuse terms |
| --- | --- | --- | --- | --- | --- |
| [mgifford/ACCESSIBILITY.md](https://github.com/mgifford/ACCESSIBILITY.md) (this repository) | Governance framework plus implementation and testing guidance | Project commitments, policy templates, component guidance, testing requirements, trusted-source discovery | YAML registry, JSON Schema, fingerprints, workflows | Agent instructions, skills derivatives, prompt starters | MIT |
| [mgifford/accessibility-skills](https://github.com/mgifford/accessibility-skills) | Portable topic skills derived from this repository's guidance | Installing concise, topic-specific agent instructions | `SYNC.md`, `VOCABULARY_SYNC.md`, evaluation fixtures | Yes, designed for agent use | AGPL-3.0 |
| [Microsoft Accessibility Considerations Toolkit (ACT)](https://github.com/microsoft/Microsoft-Accessibility/tree/main/Accessibility-Considerations-Toolkit) | Research-informed access considerations and evaluation methodology | Investigating barriers across access strategies; structured evaluation lenses; agent evaluation design | Generated YAML considerations and JSON Schemas | Yes, designed for agent consumption and evaluation | MIT for original contributions; separate W3C terms for adapted material |
| [KreerC/ACCESSIBILITY.md](https://github.com/KreerC/ACCESSIBILITY.md) | Concise AI coding skills | Fast, direct web accessibility guardrails for agents | Skill files | Yes | MIT |
| [mikemai2awesome/agent-skills](https://github.com/mikemai2awesome/agent-skills) | Front-end and iOS coding-style skills | Teams wanting native-first, minimal-code conventions alongside other skills | Skill files | Yes | MIT |
| [Intopia/intopia-web-accessibility-skill](https://github.com/Intopia/intopia-web-accessibility-skill) | Structured component skill with acceptance criteria and examples | Teams needing component-level criteria and a contrast-check script | Markdown references, JSON palette templates, Node script | Yes | CC BY-NC-SA 4.0 (non-commercial, share-alike) |
| [LaurenceRLewis/a11y-spec-first-skill](https://github.com/LaurenceRLewis/a11y-spec-first-skill) | Specification-citation discipline for AI output | Teams requiring explicit standards mapping before code is generated | Skill file and authority table | Yes | MIT |
| [fecarrico/A11Y.md](https://github.com/fecarrico/A11Y.md) | Persistent context and governance protocol | Teams wanting an always-on accessibility constraint with evidence and exception records | Markdown core, references, templates, optional tools | Yes | MIT |
| [dadederk/iOS-Accessibility-Agent-Skill](https://github.com/dadederk/iOS-Accessibility-Agent-Skill) | Native iOS accessibility skill | UIKit and SwiftUI teams working with VoiceOver, Dynamic Type, and related features | Skill file plus references | Yes | MIT |
| [Community-Access/accessibility-agents](https://github.com/Community-Access/accessibility-agents) | Large multi-agent ecosystem with scanners and an edit gate | Teams adopting broad, client-integrated automation across code and documents | Agent skills, JSON findings, MCP tools, scanner integrations | Yes | MIT |

"Machine-readable" means the project publishes structured files intended for
tooling. It does not mean the files are a normative standard, complete, or
suitable for every use.

## Project notes

### mgifford/ACCESSIBILITY.md (this repository)

**Problem it solves:** Projects often have no honest, reviewable statement of
their accessibility commitment, ownership, testing, and known gaps. This
repository provides a template, policy guidance, component examples, testing
procedures, a trusted-source registry, and machine-readable finding schemas.

**Who should use it:** Maintainers, delivery teams, accessibility programme
leads, and AI-assisted contributors who need governance and implementation
guidance in one place.

**How it complements others:** It is the governance and local-guidance layer.
It points to normative standards for requirements and to specialist projects
for research, testing tools, and platform depth. The companion
[accessibility-skills](https://github.com/mgifford/accessibility-skills)
repository distils the component guidance for agents.

**When to prefer it:** When you need a project commitment, contribution
expectations, a testing baseline, issue/finding handling, or a starting point
for component guidance.

**Limitations:** The project is experimental and much of its content has
AI-assisted origins. It is not a certification body, does not guarantee
conformance, and does not replace manual testing or research with disabled
people. Several guides and registry entries still need human review.

**Authoritative documentation:** [README.md](./README.md),
[ACCESSIBILITY.md](./ACCESSIBILITY.md), [examples/](./examples/README.md), and
[TRUSTED_SOURCES.md](./TRUSTED_SOURCES.md).

### mgifford/accessibility-skills

**Problem it solves:** Canonical best-practice guides are too long to load for
every coding task. This companion repository provides concise, topic-specific
skills that preserve the canonical guide as the source of truth.

**Who should use it:** People installing reusable skills into Claude Code,
Codex, Copilot, Cursor, or another agent runtime, and maintainers who need a
reviewable sync model.

**How it complements others:** It is a derivative distribution layer, not a
second standard. Each skill records its canonical source and sync status. Shared
vocabulary is tracked separately because several skills consume the same
finding terminology and schemas.

**When to prefer it:** When an agent needs a compact, topic-scoped instruction
set and the full canonical guide would be excessive context.

**Limitations:** The skills are web-focused and intentionally shorter than
their sources. Synchronization detects that a source changed; it does not prove
that a skill is correct, complete, or tested. The repository does not ship a
runtime scanner or a conformance verdict.

**Authoritative documentation:** [accessibility-skills README](https://github.com/mgifford/accessibility-skills#readme)
and [VOCABULARY_SYNC.md](https://github.com/mgifford/accessibility-skills/blob/main/VOCABULARY_SYNC.md).

### Microsoft Accessibility Considerations Toolkit (ACT)

**Problem it solves:** Teams evaluating an interface can miss access strategies
that are not expressed as WCAG success criteria. ACT organizes access
considerations around the EN 301 549 Functional Performance Statements (FPS),
then documents possible barriers, assistive-technology interaction patterns, and
accessibility-focused usability heuristics. It also publishes methodology for
responsible interpretation and structured agent evaluation.

**Who should use it:** Accessibility evaluators investigating barriers across
access methods, designers and researchers examining assistive-technology
interaction, and agent developers building evaluation or design-review tools.

**How it complements this repository:** ACT supplies functional consideration
lenses and evaluation methodology. This repository supplies project
commitments, governance, component implementation guidance, testing workflows,
issue handling, and maintenance across software changes. A team can use ACT to
decide what to investigate and this repository to decide how to govern,
implement, and record the work.

**When to prefer it:** When the question is "which access strategies and
possible barriers should we examine for this interface?" rather than "what does
our project commit to?", "how do we implement this component?", or "is this
WCAG conformant?". It is also the better starting point for structured,
provenance-aware AI evaluation design.

**Limitations:** ACT is reference guidance, not a WCAG compliance testing tool,
a conformance certification, a substitute for user research, or a
representation of disabled people. Some consideration documents are stubs. Its
guidance is organized by EN 301 549 FPS clauses, which are not WCAG success
criteria and must not be presented as equivalent. Original contributions are
MIT-licensed, but W3C-derived cognitive and WCAG material carries separate
terms. The project recommends pinning reviewed commits because it has no
release/tag convention yet.

**Authoritative documentation:** [ACT README](https://github.com/microsoft/Microsoft-Accessibility/blob/main/Accessibility-Considerations-Toolkit/README.md),
[responsible consideration use](https://github.com/microsoft/Microsoft-Accessibility/blob/main/Accessibility-Considerations-Toolkit/methodology/responsible-consideration-use.md),
[consideration interpretation](https://github.com/microsoft/Microsoft-Accessibility/blob/main/Accessibility-Considerations-Toolkit/methodology/consideration-interpretation.md),
[licensing and provenance](https://github.com/microsoft/Microsoft-Accessibility/blob/main/Accessibility-Considerations-Toolkit/methodology/licensing.md),
and [provenance.json](https://github.com/microsoft/Microsoft-Accessibility/blob/main/Accessibility-Considerations-Toolkit/provenance.json).

### KreerC/ACCESSIBILITY.md

**Problem it solves:** Agents need short, direct accessibility rules that can be
installed immediately without loading a large framework.

**Who should use it:** Developers who want concise web coding guardrails and a
quick manual-review reminder.

**How it complements this repository:** It is an implementation-layer skill
collection. It does not provide project governance, testing procedures, or a
source registry. This repository can provide those surrounding processes.

**When to prefer it:** When minimal context and fast installation matter more
than traceability to a canonical guide.

**Limitations:** It is intentionally brief and does not claim to be exhaustive.
It is not a conformance test suite or a governance framework, and its guidance
still requires manual review.

**Authoritative documentation:** [KreerC/ACCESSIBILITY.md README](https://github.com/KreerC/ACCESSIBILITY.md#readme).

### mikemai2awesome/agent-skills

**Problem it solves:** Front-end and iOS agents often over-engineer components.
The `frontend-a11y` and `ios-a11y` skills emphasize native elements, minimal
code, and platform conventions.

**Who should use it:** Web and iOS teams that want a coding-style companion to
more formal accessibility requirements.

**How it complements this repository:** It provides implementation style and
platform-specific patterns. This repository provides governance, broader
component coverage, testing expectations, and resource discovery.

**When to prefer it:** When the main risk is unnecessary ARIA or custom
component code rather than missing project policy.

**Limitations:** The skills reflect one author's conventions. They are not a
WCAG conformance suite or an organisational policy, and they do not replace
testing with assistive technologies.

**Authoritative documentation:** [mikemai2awesome/agent-skills README](https://github.com/mikemai2awesome/agent-skills#readme).

### Intopia/intopia-web-accessibility-skill

**Problem it solves:** Component work benefits from explicit acceptance
criteria, worked examples, and repeatable contrast checks rather than generic
advice.

**Who should use it:** Teams that want component-level criteria and a small
contrast-validation script inside an agent workflow.

**How it complements this repository:** It adds structured acceptance criteria
and examples for selected components. This repository adds governance,
cross-topic guidance, and testing procedures. The two can be used together, but
their content should not be merged into one undifferentiated skill.

**When to prefer it:** When component acceptance criteria and runnable contrast
checks are the immediate need.

**Limitations:** The project describes itself as experimental, with partial
component coverage and AI-generated portions. It does not guarantee WCAG
conformance. Its **CC BY-NC-SA 4.0** licence restricts commercial use and
requires share-alike terms; verify compatibility before adapting or
redistributing its content.

**Authoritative documentation:** [Intopia skill README](https://github.com/Intopia/intopia-web-accessibility-skill#readme) and [LICENSE](https://github.com/Intopia/intopia-web-accessibility-skill/blob/main/LICENSE).

### LaurenceRLewis/a11y-spec-first-skill

**Problem it solves:** AI output can sound authoritative while relying on stale
training data. This skill requires a specification citation before code or
guidance is produced.

**Who should use it:** Teams that need an auditable chain from a claim to a
current normative source.

**How it complements this repository:** It strengthens source discipline. This
repository supplies the project context, component guidance, and testing
workflow that the cited specifications must be applied within.

**When to prefer it:** When unsupported or outdated specification claims are the
main review risk.

**Limitations:** It is an instruction-only discipline. It does not test the
result, guarantee model compliance, or replace project-specific decisions. The
authority table must be kept current as specifications change.

**Authoritative documentation:** [Spec-First Coding README](https://github.com/LaurenceRLewis/a11y-spec-first-skill#readme).

### fecarrico/A11Y.md

**Problem it solves:** Accessibility guidance is often loaded only when a task
is already labelled "accessibility". `A11Y.md` is designed as a persistent
constraint that applies before an agent knows what it is building, with
profiles, exception records, and release evidence.

**Who should use it:** Teams that want an always-on accessibility contract and a
structured evidence trail across AI-assisted delivery.

**How it complements this repository:** It offers a broad protocol and
governance framing. This repository offers a lighter template, component
guidance, testing workflows, and a trusted-source registry. They overlap in
governance intent, so choose one as the primary project contract rather than
maintaining two competing commitments.

**When to prefer it:** When a team wants a single persistent context file,
explicit compliance profiles, and an evidence/exception model as the primary
operating contract.

**Limitations:** Some claims and benchmarks in the project are self-reported
and should be independently reviewed before adoption. It is not a formal
standard or certification. Its scope is broad, so teams should verify that its
profiles and rules match their legal and contractual context.

**Authoritative documentation:** [A11Y.md README](https://github.com/fecarrico/A11Y.md#readme)
and the normative core at [docs/en/A11Y.md](https://github.com/fecarrico/A11Y.md/blob/main/docs/en/A11Y.md).

### dadederk/iOS-Accessibility-Agent-Skill

**Problem it solves:** Web accessibility skills do not cover iOS semantics,
VoiceOver, Dynamic Type, or platform testing.

**Who should use it:** iOS developers and agents working in UIKit or SwiftUI.

**How it complements this repository:** It provides native iOS depth where this
repository is mostly web and process focused. Use it alongside a project
commitment and a platform-appropriate test plan.

**When to prefer it:** When the implementation target is iOS and the agent needs
platform-specific accessibility guidance.

**Limitations:** It is iOS-only and explicitly a work in progress. It is not a
legal compliance service or a replacement for testing with real users and
assistive technologies.

**Authoritative documentation:** [iOS Accessibility Agent Skill README](https://github.com/dadederk/iOS-Accessibility-Agent-Skill#readme).

### Community-Access/accessibility-agents

**Problem it solves:** Large teams want specialist routing, scanners, report
rendering, and an edit gate rather than a single prompt file.

**Who should use it:** Teams adopting a broad agent package across code,
documents, and repository workflows, with the operational capacity to maintain
it.

**How it complements this repository:** It provides an orchestration and
scanning layer. This repository provides a governance template, canonical
guidance, and a source registry. The projects overlap in agent instructions, so
avoid installing competing instruction sets without deciding which one owns
which behaviour.

**When to prefer it:** When breadth, client integration, scanner tooling, and an
edit gate are more important than a small, portable skill.

**Limitations:** It has a large surface area, client-specific capabilities, and
optional scanner dependencies. A passing scanner or edit gate is not a
conformance result. Review its privacy and external-service behaviour before
use.

**Authoritative documentation:** [Accessibility Agents README](https://github.com/Community-Access/accessibility-agents#readme).

## Choosing a combination

Start with the question you need answered, then add only the resources that
answer it.

- **A project needs a commitment and an accountable owner:** use this
  repository's [template](./examples/ACCESSIBILITY-template.md) and
  [contribution guidance](./examples/CONTRIBUTING_A11Y.md). Add a research or
  evaluation layer only when you reach evaluation.
- **A developer needs component guidance:** start with the relevant guide in
  [`examples/`](./examples/README.md), then install the matching
  [accessibility skill](https://github.com/mgifford/accessibility-skills) if the
  agent needs a compact derivative.
- **An evaluator needs to investigate access strategies:** use ACT's
  considerations and methodology, then record findings using this repository's
  [finding model](./examples/ACCESSIBILITY_FINDING_TRACKING.md) and
  [manual testing guide](./examples/MANUAL_ACCESSIBILITY_TESTING_GUIDE.md).
- **A team needs automated checks:** use a scanner for what it can detect, then
  add behavioral and manual checks. A scanner result is evidence, not a
  conformance verdict.
- **A team needs research or user-centred design:** use primary research
  guidance and direct participation from disabled people. ACT and this
  repository can structure the questions, but neither represents disabled
  people.
- **An organisation needs governance:** choose one primary commitment
  framework. This repository and `A11Y.md` both aim at governance; running both
  as competing sources of truth creates ambiguity and duplicate maintenance.

## Notes and limits

- This comparison is qualitative and is not a ranking or an endorsement.
- Repository scope, licences, and maintenance activity change. Verify the
  current upstream source before adoption.
- No skill, scanner, research lens, or template replaces manual testing with
  assistive technologies or feedback from people with disabilities.
- Microsoft ACT's EN 301 549 FPS organization is not a WCAG success-criterion
  mapping. Do not invent normative equivalences.
- A future machine-readable mapping between ACT considerations and local
  guidance may be useful, but it is not introduced here because it would need
  review and validation against the upstream source.

## References

- [mgifford/ACCESSIBILITY.md](https://github.com/mgifford/ACCESSIBILITY.md)
- [mgifford/accessibility-skills](https://github.com/mgifford/accessibility-skills)
- [Microsoft Accessibility Considerations Toolkit](https://github.com/microsoft/Microsoft-Accessibility/tree/main/Accessibility-Considerations-Toolkit)
- [KreerC/ACCESSIBILITY.md](https://github.com/KreerC/ACCESSIBILITY.md)
- [mikemai2awesome/agent-skills](https://github.com/mikemai2awesome/agent-skills)
- [Intopia/intopia-web-accessibility-skill](https://github.com/Intopia/intopia-web-accessibility-skill/)
- [LaurenceRLewis/a11y-spec-first-skill](https://github.com/LaurenceRLewis/a11y-spec-first-skill)
- [fecarrico/A11Y.md](https://github.com/fecarrico/A11Y.md)
- [dadederk/iOS-Accessibility-Agent-Skill](https://github.com/dadederk/iOS-Accessibility-Agent-Skill)
- [Community-Access/accessibility-agents](https://github.com/Community-Access/accessibility-agents)
