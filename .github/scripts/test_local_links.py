#!/usr/bin/env python3
"""Tests for check_local_links.py. Run with python .github/scripts/test_local_links.py."""

import os
import sys
import tempfile

sys.path.insert(0, '.github/scripts')

from check_local_links import check_file, find_markdown_files


def write(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as handle:
        handle.write(content)


def run_case(label, files, expected_errors):
    with tempfile.TemporaryDirectory() as root:
        for relative, content in files.items():
            write(os.path.join(root, relative), content)
        errors = []
        for relative in files:
            errors.extend(check_file(os.path.join(root, relative), root))
        ok = len(errors) == expected_errors
        print(f"  {'✓' if ok else '✗'} {label} (expected {expected_errors}, got {len(errors)})")
        if not ok:
            for path, message in errors:
                print(f"      {os.path.relpath(path, root)}: {message}")
        return ok


def main():
    print("Testing check_local_links.py...")
    results = []

    results.append(run_case(
        'valid relative link and image',
        {'docs/page.md': '[Guide](../examples/guide.md)\n\n![Logo](../assets/logo.png)\n',
         'examples/guide.md': '# Guide\n',
         'assets/logo.png': 'not-really-a-png'},
        0,
    ))
    results.append(run_case(
        'broken relative link',
        {'docs/page.md': '[Missing](../examples/missing.md)\n'},
        1,
    ))
    results.append(run_case(
        'external and anchor-only links are ignored',
        {'docs/page.md': '[W3C](https://www.w3.org/TR/WCAG22/)\n\n[Top](#top)\n'},
        0,
    ))
    results.append(run_case(
        'link escaping the repository is rejected',
        {'docs/page.md': '[Outside](../../outside.md)\n'},
        1,
    ))
    results.append(run_case(
        'Jekyll .html link resolves to its Markdown source',
        {'docs/page.md': '[Comparison](../COMPARISONS.html)\n',
         'COMPARISONS.md': '# Comparison\n'},
        0,
    ))
    results.append(run_case(
        'template placeholders are ignored',
        {'docs/page.md': '[Placeholder]({{SITE_URL}}/page)\n'},
        0,
    ))

    with tempfile.TemporaryDirectory() as root:
        write(os.path.join(root, 'README.md'), '# Readme\n')
        write(os.path.join(root, 'examples', 'guide.md'), '# Guide\n')
        files = find_markdown_files(root)
        ok = len(files) == 2
        print(f"  {'✓' if ok else '✗'} discovers Markdown files recursively (found {len(files)})")
        results.append(ok)

    passed = sum(results)
    print(f"  {passed}/{len(results)} tests passed\n")
    return 0 if passed == len(results) else 1


if __name__ == '__main__':
    sys.exit(main())
