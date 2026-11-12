#!/usr/bin/env python3
"""Deterministic checks for the cross-repository workflow wiring.

Run with: python .github/scripts/test_workflows.py
"""

import os
import sys

import yaml

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
SYNC_WORKFLOW = os.path.join(ROOT, '.github', 'workflows', 'sync-check-accessibility-skills.yml')
LINK_WORKFLOW = os.path.join(ROOT, '.github', 'workflows', 'link-check.yml')
SKILLS_WORKFLOW = os.path.abspath(os.path.join(
    ROOT, '..', 'accessibility-skills', '.github', 'workflows', 'skill-sync-check.yml'
))


def load_yaml(path):
    with open(path, 'r', encoding='utf-8') as handle:
        return yaml.safe_load(handle)


def read(path):
    with open(path, 'r', encoding='utf-8') as handle:
        return handle.read()


def steps(workflow):
    return workflow.get('jobs', {}).get('check-sync', {}).get('steps', [])


def main():
    print('=== Cross-repository workflow checks ===\n')
    results = []

    def check(label, condition, detail=''):
        ok = bool(condition)
        print(f"  {'✓' if ok else '✗'} {label}{(' — ' + detail) if detail and not ok else ''}")
        results.append(ok)

    text = read(SYNC_WORKFLOW)
    workflow = load_yaml(SYNC_WORKFLOW)

    check('sync workflow checks out accessibility-skills',
          'repository: mgifford/accessibility-skills' in text)
    check('sync workflow fetches full history',
          'fetch-depth: 0' in text)
    check('sync workflow runs the shared engine',
          'scripts/sync-check.sh' in text)
    check('sync workflow does not fetch raw skill paths',
          'raw.githubusercontent.com' not in text,
          'remove raw URL construction; use the shared engine')
    check('sync workflow does not create duplicate issues',
          'issues: write' not in text and 'issues.create' not in text)
    check('sync workflow has a timeout',
          any(step.get('timeout-minutes') for step in steps(workflow)) or 'timeout-minutes' in text)
    check('sync workflow emits a machine-readable report',
          'sync.mjs report' in text and 'upload-artifact' in text)

    link_text = read(LINK_WORKFLOW)
    check('PR link workflow runs local link checks',
          'check_local_links.py' in link_text)
    check('PR link workflow runs registry tests',
          'test_maintenance.py' in link_text)

    if os.path.exists(SKILLS_WORKFLOW):
        skills_text = read(SKILLS_WORKFLOW)
        check('skills workflow fetches full history',
              skills_text.count('fetch-depth: 0') >= 2,
              'both the skills checkout and the canonical checkout need full history')
        check('skills workflow runs the shared engine',
              'scripts/sync-check.sh' in skills_text)
        check('skills workflow uses the deduplicating issue helper',
              'upsert-issue.js' in skills_text)
        check('skills workflow does not reconstruct upstream paths',
              'raw.githubusercontent.com' not in skills_text)
    else:
        print('  - skills workflow not present in this checkout; skipped cross-repo workflow check')

    passed = sum(results)
    print(f'\n{passed}/{len(results)} workflow checks passed')
    return 0 if passed == len(results) else 1


if __name__ == '__main__':
    sys.exit(main())
