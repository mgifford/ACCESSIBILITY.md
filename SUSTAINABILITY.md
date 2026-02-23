# SUSTAINABILITY.md

> Practical sustainability policy for this documentation project, covering digital waste, accessibility integration, and AI usage.

## Status and ownership

- Status: Active
- Policy owner: Project maintainers
- Last updated: 2026-02-23
- Review cadence: Quarterly

## Team commitment

We commit to reducing digital waste and emissions by making sustainability part of normal delivery work. We optimize for measurable improvement over perfection, and we treat sustainability as a quality attribute alongside reliability, security, performance, and accessibility.

## Scope

This policy applies to:

- Repository: [mgifford/ACCESSIBILITY.md](https://github.com/mgifford/ACCESSIBILITY.md)
- Jekyll website build and deployment
- Documentation assets (images, diagrams, examples)
- CI/CD workflows (link checking, build processes)
- AI agent instructions and automation

Out of scope for now:

- External websites and resources we link to
- Third-party tools and services (GitHub, Jekyll hosting)

## Baseline metrics

| Metric | Baseline | Target | Owner | Check cadence |
| :--- | :--- | :--- | :--- | :--- |
| Average page weight | Monitor | < 500KB per page | Maintainers | Per PR |
| Image optimization | Manual | All images optimized | Contributors | Per PR |
| CI workflow time | Monitor | Minimize duration | Maintainers | Monthly |
| Third-party scripts | Minimal | Keep minimal | Maintainers | Quarterly |
| Accessibility violations (critical) | 0 | 0 | All contributors | Per PR |
| AI calls per PR | Monitor | Use judiciously | Contributors | Monthly |

## Pull request requirements

All pull requests should consider:

- **Sustainability impact:** Are we adding large assets? Can images be optimized?
- **Accessibility impact:** Do code examples follow best practices?
- **Documentation efficiency:** Is content clear and reusable?
- **AI assistance disclosure:** If AI tools were used, what was their scope?

## Accessibility as code (required checks)

Minimum required CI checks for each pull request:

- Link validation for all documentation
- Markdown structure validation
- Component-specific best practices compliance for examples
- Inclusive language checks

Workflow policy:

- Block merge when documentation links are broken
- Require review for accessibility-related changes
- Validate all code examples against published best practices

## Sustainability as code (required checks)

Minimum required considerations for each pull request:

- **Asset optimization:** Images should be compressed and appropriately sized
- **Documentation efficiency:** Avoid duplication, prefer linking to canonical sources
- **Build optimization:** Keep Jekyll builds efficient, minimize dependencies
- **Third-party resources:** Minimize external dependencies and large assets

Workflow policy:

- Review large binary additions
- Optimize images before committing
- Prefer SVG for diagrams when appropriate
- Use Mermaid for diagrams to avoid static image maintenance

## AI usage policy

### Default behavior

- Prefer deterministic documentation tools and templates first
- Use AI for drafting and refactoring when it reduces manual effort
- Keep AI prompts focused and task-scoped
- Disclose AI usage in PRs for transparency

### Allowed uses

- Drafting documentation from templates
- Summarizing complex accessibility standards
- Generating alternative text for complex diagrams
- Refactoring and improving clarity
- Code review for accessibility patterns

### Restricted uses

- No always-on AI generation for routine documentation updates
- No large-context prompts for simple formatting tasks
- No AI calls when templates or existing patterns can be reused
- No AI-generated content without human review and validation

### AI controls

- Use smaller models when sufficient (Claude Haiku, GPT-4o-mini)
- Cache reusable prompts and outputs
- Track approximate AI call volume per PR
- Review monthly and optimize usage patterns

## Time and space considerations

### Documentation timing

- Schedule major documentation updates during lower-traffic periods
- Batch related changes to minimize CI runs
- Use draft PRs for work-in-progress to avoid premature CI execution

### Hosting efficiency

- Leverage GitHub Pages CDN for efficient content delivery
- Minimize custom builds and preprocessing
- Use static site generation (Jekyll) for efficiency

## Governance and exceptions

- Labels: `sustainability`, `accessibility`, `performance-budget`, `ai-usage`, `large-assets`
- Decision owners: Project maintainers
- Exception process:
  1. Open issue with rationale for exception
  2. Define owner and review date
  3. Add mitigation plan
  4. Revalidate before merge

## References

- [Web Sustainability Guidelines (WSG) 1.0](https://www.w3.org/TR/web-sustainability-guidelines/)
- [Sustainable Web Design](https://sustainablewebdesign.org/)
- [Green Web Foundation](https://www.thegreenwebfoundation.org/)
- [Website Carbon Calculator](https://www.websitecarbon.com/)

## Intersection with accessibility

Accessibility and sustainability are complementary:

- **Semantic HTML** reduces code bloat and improves accessibility
- **Optimized images** benefit users on slow connections and reduce carbon
- **Clear documentation** reduces time spent searching and re-reading
- **Keyboard navigation** reduces device power consumption
- **Text alternatives** provide lightweight content options

See [ACCESSIBILITY.md](./ACCESSIBILITY.md) for our accessibility commitment.

## AI agent instruction block

Use in AGENTS.md, .cursorrules, or system prompts:

> Check SUSTAINABILITY.md and ACCESSIBILITY.md before proposing changes. Prefer low-compute deterministic solutions. Optimize assets. Follow accessibility best practices. If AI is used, keep context minimal, avoid duplicate calls, and disclose usage in the PR.
