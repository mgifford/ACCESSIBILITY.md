# Project Learnings

This is a short, durable record of what the maintenance work on this repository
taught us. It is not a standard and not a conformance claim.

## Canonical ownership is the anchor

The most useful rule was the simplest: `examples/` owns shared accessibility
guidance, and the root owns the project's commitment and entry points. When a
guide, registry entry, and skill all tried to explain the same thing, the copies
drifted. Linking to one canonical place was easier to maintain and easier to
review.

## A registry is not a recommendation list

`TRUSTED_SOURCES.yaml` works as a discovery and review registry, not as a
certification or a "vetted" list. The useful metadata was authority basis,
licence, review date, status, and limitations — not a score. Large publishers
and popular projects are not automatically authoritative, and a README that
mentions WCAG is not evidence of accessibility.

Component references made this concrete. A component can be `reviewed` without
being `recommended-for-evaluation`, and neither state is a WCAG result. Record
what was actually tested; leave unknown values explicit.

## Separate project documentation from guidance

Moving project-specific material into `docs/` made the root easier to scan:

- policy, contribution, comparison, trusted sources, and guides stay visible;
- legacy redirects, historical reports, and contributor-only standards move to
  `docs/`;
- `docs/README.md` explains where to start.

Moving files changes URLs. Update internal links and the link checker in the
same change, and tell reviewers that external bookmarks need the new path.
Do not add root stubs just to preserve old paths; that recreates the clutter.

## Deterministic checks beat prose promises

The useful checks were:

- registry structure, duplicates, URLs, provenance, and curation fields;
- local Markdown links, including `docs/`;
- workflow wiring and report artifacts;
- a Jekyll build.

These checks catch structural mistakes. They do not prove accessibility
quality, component safety, or conformance. Keep that boundary in the report.

## Coordination lessons

- One canonical sync engine is easier to reason about than two comparison
  scripts.
- A recorded source commit is a review acknowledgement, not proof that a skill
  was regenerated.
- Intentional divergence and deferred review are different states and should
  not be collapsed into "synced".
- Merge order matters when a downstream repository records a commit from an
  unmerged branch. Prefer merge commits, or update the recorded commit after a
  squash.

## What to preserve if this work is retired

- `examples/` as the canonical guidance location.
- `TRUSTED_SOURCES.yaml` as the only registry.
- The distinction between normative standards, guidance, research, tools, and
  component references.
- The habit of citing upstream maintainers instead of copying their work.
- The local link and registry checks, even if the larger workflow is retired.
