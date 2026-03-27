# Sync Metadata

This file links this skill to its canonical source in the `examples/` directory.
It is read by the `skill-sync-check.yml` GitHub Action to detect drift.

## Source

```yaml
canonical_source: examples/LIGHT_DARK_MODE_ACCESSIBILITY_BEST_PRACTICES.md
last_synced_commit: "9b31008b9155af601ebd96f04c4cfac40fca0d93"   # filled in automatically by the sync workflow
last_synced_date: "2026-03-27"     # filled in automatically by the sync workflow
skill_maintainer: ""     # optional: GitHub username
```

## How to Update This Skill

When `examples/LIGHT_DARK_MODE_ACCESSIBILITY_BEST_PRACTICES.md` changes
and the CI check flags drift:

1. Open both files side-by-side
2. Review the diff linked in the GitHub issue/PR comment
3. Update `SKILL.md` to reflect any new requirements, patterns, or checklist items
4. Update `last_synced_commit` and `last_synced_date` above
5. Rebuild the `.skill` ZIP: `cd skills && zip -r light-dark-mode.skill light-dark-mode/`

## What Does NOT Need to Stay in Sync

The skill is intentionally a **distillation**, not a mirror. These things in
the example do NOT need to be in the skill:

- Extended prose explanations
- Background rationale ("why this matters")
- Full code examples that are repeated in shorter form in the skill
- References to external articles

What DOES need to stay in sync:

- All checklist items in the Definition of Done
- All required patterns (CSS structure, JS structure, ARIA usage)
- Any new requirements (new WCAG criteria, new browser behaviors)
- Removal of any previously recommended patterns
