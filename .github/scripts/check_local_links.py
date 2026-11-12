#!/usr/bin/env python3
"""Check relative Markdown links and images without making network requests.

Usage:
    python .github/scripts/check_local_links.py [--root .] [files...]

The checker intentionally ignores external URLs. Lychee covers those in the
separate link-check workflow. This script catches the deterministic failures
that should block a documentation change: a relative path that does not exist,
a renamed file, or a link that escapes the repository.
"""

import os
import re
import sys
from typing import Iterable, List, Tuple
from urllib.parse import unquote, urlparse

LINK_PATTERN = re.compile(r'!?\[[^\]]*\]\(([^)]+)\)')
SKIP_PREFIXES = ('http://', 'https://', 'mailto:', 'tel:', 'data:', 'javascript:')
DEFAULT_GLOBS = ('*.md', 'docs/**/*.md', 'examples/**/*.md', '.github/**/*.md')


def find_markdown_files(root: str) -> List[str]:
    import glob

    files = []
    for pattern in DEFAULT_GLOBS:
        files.extend(glob.glob(os.path.join(root, pattern), recursive=True))
    return sorted({os.path.normpath(path) for path in files if os.path.isfile(path)})


def extract_targets(text: str) -> Iterable[str]:
    for match in LINK_PATTERN.finditer(text):
        target = match.group(1).strip()
        # Drop an optional Markdown title: (path "title").
        if target.startswith('<') and '>' in target:
            target = target[1:target.index('>')]
        else:
            target = target.split()[0] if target.split() else target
        yield target


def check_file(path: str, root: str) -> List[Tuple[str, str]]:
    errors = []
    with open(path, 'r', encoding='utf-8') as handle:
        text = handle.read()

    for target in extract_targets(text):
        if not target or target.startswith('#'):
            continue
        if target.startswith(SKIP_PREFIXES):
            continue
        if '{{' in target or '{%' in target:
            continue

        parsed = urlparse(target)
        if parsed.scheme or parsed.netloc:
            continue

        local = unquote(parsed.path)
        if not local:
            continue

        if local.startswith('/'):
            candidate = os.path.normpath(os.path.join(root, local.lstrip('/')))
        else:
            candidate = os.path.normpath(os.path.join(os.path.dirname(path), local))

        root_abs = os.path.abspath(root)
        candidate_abs = os.path.abspath(candidate)
        if not (candidate_abs == root_abs or candidate_abs.startswith(root_abs + os.sep)):
            errors.append((path, f'{target} escapes the repository'))
            continue
        if not os.path.exists(candidate_abs):
            # Jekyll serves page.html from page.md. Accept the rendered URL
            # when its Markdown source exists so source-tree checks do not
            # report a false positive for site navigation.
            if local.endswith('.html'):
                markdown_counterpart = candidate_abs[:-5] + '.md'
                if os.path.exists(markdown_counterpart):
                    continue
            errors.append((path, f'{target} does not resolve to a local path'))

    return errors


def main(argv: List[str]) -> int:
    root = '.'
    files = []
    args = list(argv)
    if '--root' in args:
        index = args.index('--root')
        root = args[index + 1]
        del args[index:index + 2]

    files = args or find_markdown_files(root)
    all_errors = []
    for path in files:
        if not os.path.isfile(path):
            all_errors.append((path, 'file does not exist'))
            continue
        all_errors.extend(check_file(path, root))

    if all_errors:
        print('Broken local links:')
        for path, message in all_errors:
            print(f'  {path}: {message}')
        return 1

    print(f'Checked {len(files)} Markdown file(s); no broken local links.')
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
