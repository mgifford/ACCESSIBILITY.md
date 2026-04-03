#!/usr/bin/env python3
"""
Unit tests for maintain_trusted_sources.py

Run with: python .github/scripts/test_maintenance.py
"""

import json
import os
import sys
import tempfile
from unittest.mock import patch, MagicMock

sys.path.insert(0, '.github/scripts')

import maintain_trusted_sources as ms
import requests

from maintain_trusted_sources import (
    apply_changes,
    check_url,
    detect_license,
    detect_owner,
    load_error_history,
    load_yaml,
    save_error_history,
    save_yaml,
    suggest_topic_tags,
    validate_yaml_structure,
)

def test_detect_owner():
    """Test owner detection from various sources."""
    print("Testing detect_owner()...")
    
    tests = [
        # Test 1: Person name in domain
        {
            'source': {'domain': 'Aaron Gustafson', 'description': 'Web designer'},
            'expected': 'Aaron Gustafson'
        },
        # Test 2: Extract from description via "personal site of" pattern
        {
            'source': {
                'domain': 'Some Blog',
                'description': 'Personal site of Jane Doe, accessibility advocate'
            },
            'expected': 'Jane Doe'
        },
        # Test 3: No clear owner
        {
            'source': {
                'domain': 'W3C Blog',
                'description': 'Standards organization updates'
            },
            'expected': None
        },
        # Test 4: "by X" pattern in description
        {
            'source': {
                'domain': 'Tech Site',
                'description': 'Articles by Alice Smith, covering web accessibility'
            },
            'expected': 'Alice Smith'
        },
        # Test 5: "X's blog" possessive pattern in description
        {
            'source': {
                'domain': 'Personal Site',
                'description': "Bob Jones's blog about inclusive design"
            },
            'expected': 'Bob Jones'
        },
        # Test 6: Domain with org word — should not be treated as person name
        {
            'source': {
                'domain': 'Deque Systems Inc',
                'description': 'Accessibility tools vendor'
            },
            'expected': None
        },
        # Test 7: Empty source dict
        {
            'source': {},
            'expected': None
        },
    ]
    
    passed = 0
    for i, test in enumerate(tests, 1):
        result = detect_owner(test['source'])
        if result == test['expected']:
            print(f"  ✓ Test {i} passed")
            passed += 1
        else:
            print(f"  ✗ Test {i} failed: expected {test['expected']!r}, got {result!r}")
    
    print(f"  {passed}/{len(tests)} tests passed\n")
    return passed == len(tests)


def test_suggest_topic_tags():
    """Test topic tag suggestions."""
    print("Testing suggest_topic_tags()...")
    
    tests = [
        # Test 1: ARIA and WCAG content
        {
            'source': {
                'best_for': 'accessibility, web standards, wcag, aria',
                'description': 'Articles on ARIA and WCAG compliance'
            },
            'expected_tags': ['wcag', 'aria']  # Must have these at minimum
        },
        # Test 2: Video captioning
        {
            'source': {
                'best_for': 'audio, video, captions',
                'description': 'Captioning and audio description services'
            },
            'expected_tags': ['captions', 'audio-description']
        },
        # Test 3: Testing tools
        {
            'source': {
                'best_for': 'testing, audit',
                'description': 'Accessibility testing and audit tools'
            },
            'expected_tags': ['testing']
        },
        # Test 4: Empty source — should return no tags
        {
            'source': {},
            'expected_tags': []
        },
        # Test 5: PDF and mobile keywords
        {
            'source': {
                'best_for': 'pdf, mobile, ios',
                'description': 'Accessible PDF creation and mobile app testing'
            },
            'expected_tags': ['pdf', 'mobile']
        },
        # Test 6: Result must never exceed 10 tags
        {
            'source': {
                'best_for': 'wcag aria forms contrast keyboard screen reader testing design code inclusive caption audio description pdf mobile html',
                'description': 'Covers everything: wcag, aria, forms, contrast, keyboard, screen reader, testing, design, development, inclusive design, captions, audio description, pdf, mobile, web standards'
            },
            'expected_tags': []  # Special check: result length <= 10
        },
    ]
    
    passed = 0
    for i, test in enumerate(tests, 1):
        result = suggest_topic_tags(test['source'])
        if i == 6:
            # Special length-limit check
            if len(result) <= 10:
                print(f"  ✓ Test {i} passed: tag count {len(result)} <= 10")
                passed += 1
            else:
                print(f"  ✗ Test {i} failed: tag count {len(result)} exceeds 10")
        else:
            has_expected = all(tag in result for tag in test['expected_tags'])
            if has_expected:
                print(f"  ✓ Test {i} passed: {', '.join(result) or '(none)'}")
                passed += 1
            else:
                print(f"  ✗ Test {i} failed: expected {test['expected_tags']}, got {result}")
    
    print(f"  {passed}/{len(tests)} tests passed\n")
    return passed == len(tests)


def test_validate_yaml_structure():
    """Test YAML validation."""
    print("Testing validate_yaml_structure()...")

    def make_source(**overrides):
        base = {
            'id': 'test-1',
            'domain': 'Test Domain',
            'url': 'example.com',
            'full_url': 'https://example.com',
            'best_for': 'testing',
            'description': 'Test source',
            'status': 'active'
        }
        base.update(overrides)
        return base

    results = []

    # Test 1: Valid source
    errors = validate_yaml_structure([make_source()])
    ok = len(errors) == 0
    print(f"  {'✓' if ok else '✗'} Test 1 {'passed' if ok else 'failed'}: Valid source accepted")
    results.append(ok)

    # Test 2: Detect duplicate IDs
    errors = validate_yaml_structure([make_source(id='dup'), make_source(id='dup', url='example2.com', full_url='https://example2.com')])
    ok = any('Duplicate ID' in e for e in errors)
    print(f"  {'✓' if ok else '✗'} Test 2 {'passed' if ok else 'failed'}: Duplicate ID detected")
    results.append(ok)

    # Test 3: Detect duplicate URLs
    errors = validate_yaml_structure([make_source(id='s1'), make_source(id='s2', url='example.com')])
    ok = any('Duplicate URL' in e for e in errors)
    print(f"  {'✓' if ok else '✗'} Test 3 {'passed' if ok else 'failed'}: Duplicate URL detected")
    results.append(ok)

    # Test 4: Missing required field
    source_missing = make_source()
    del source_missing['description']
    errors = validate_yaml_structure([source_missing])
    ok = any("Missing required field 'description'" in e for e in errors)
    print(f"  {'✓' if ok else '✗'} Test 4 {'passed' if ok else 'failed'}: Missing required field detected")
    results.append(ok)

    # Test 5: Invalid status value
    errors = validate_yaml_structure([make_source(id='s-inv', status='broken')])
    ok = any('Invalid status' in e for e in errors)
    print(f"  {'✓' if ok else '✗'} Test 5 {'passed' if ok else 'failed'}: Invalid status detected")
    results.append(ok)

    # Test 6: Empty sources list — no errors
    errors = validate_yaml_structure([])
    ok = errors == []
    print(f"  {'✓' if ok else '✗'} Test 6 {'passed' if ok else 'failed'}: Empty sources list produces no errors")
    results.append(ok)

    # Test 7: All valid statuses are accepted
    valid_statuses = ['active', 'not active', 'removed']
    ok = True
    for idx, st in enumerate(valid_statuses, 1):
        errs = validate_yaml_structure([make_source(id=f'sv-{idx}', status=st)])
        if any('Invalid status' in e for e in errs):
            ok = False
            break
    print(f"  {'✓' if ok else '✗'} Test 7 {'passed' if ok else 'failed'}: All valid statuses accepted")
    results.append(ok)

    passed = sum(results)
    print(f"  {passed}/{len(results)} tests passed\n")
    return passed == len(results)


def test_apply_changes():
    """Test apply_changes() — mark inactive and remove sources."""
    print("Testing apply_changes()...")

    def make_source(id_, url_suffix=''):
        return {
            'id': id_,
            'domain': f'Domain {id_}',
            'url': f'example{url_suffix}.com',
            'full_url': f'https://example{url_suffix}.com',
            'best_for': 'testing',
            'description': 'Test source',
            'status': 'active'
        }

    results = []

    # Test 1: Mark a source as inactive
    sources = [make_source('a', '1'), make_source('b', '2')]
    updated = apply_changes(sources, ids_to_mark_inactive=['a'], ids_to_remove=[])
    ok = next(s for s in updated if s['id'] == 'a')['status'] == 'not active'
    print(f"  {'✓' if ok else '✗'} Test 1 {'passed' if ok else 'failed'}: Source marked as 'not active'")
    results.append(ok)

    # Test 2: Remove a source
    sources = [make_source('a', '1'), make_source('b', '2')]
    updated = apply_changes(sources, ids_to_mark_inactive=[], ids_to_remove=['b'])
    ok = len(updated) == 1 and updated[0]['id'] == 'a'
    print(f"  {'✓' if ok else '✗'} Test 2 {'passed' if ok else 'failed'}: Source removed")
    results.append(ok)

    # Test 3: Simultaneous mark inactive and remove
    sources = [make_source('a', '1'), make_source('b', '2'), make_source('c', '3')]
    updated = apply_changes(sources, ids_to_mark_inactive=['a'], ids_to_remove=['c'])
    ok = (
        len(updated) == 2
        and next(s for s in updated if s['id'] == 'a')['status'] == 'not active'
        and any(s['id'] == 'b' for s in updated)
    )
    print(f"  {'✓' if ok else '✗'} Test 3 {'passed' if ok else 'failed'}: Mark inactive and remove together")
    results.append(ok)

    # Test 4: No changes — sources returned unchanged
    sources = [make_source('x', '9')]
    updated = apply_changes(sources, ids_to_mark_inactive=[], ids_to_remove=[])
    ok = len(updated) == 1 and updated[0]['status'] == 'active'
    print(f"  {'✓' if ok else '✗'} Test 4 {'passed' if ok else 'failed'}: No changes leaves sources intact")
    results.append(ok)

    passed = sum(results)
    print(f"  {passed}/{len(results)} tests passed\n")
    return passed == len(results)


def test_load_save_yaml():
    """Test load_yaml() and save_yaml() using a temporary file."""
    print("Testing load_yaml() / save_yaml()...")

    results = []

    with tempfile.NamedTemporaryFile(mode='w', suffix='.yaml', delete=False) as f:
        tmp_path = f.name

    try:
        # Test 1: Round-trip a simple data structure
        original = {'sources': [{'id': 'x', 'domain': 'X', 'status': 'active'}], 'generated_on': '2026-01-01'}
        save_yaml(original, tmp_path)
        loaded = load_yaml(tmp_path)
        ok = loaded == original
        print(f"  {'✓' if ok else '✗'} Test 1 {'passed' if ok else 'failed'}: YAML round-trip preserves data")
        results.append(ok)

        # Test 2: Unicode characters survive round-trip
        unicode_data = {'title': 'Ünïcödé tëst 🎉', 'sources': []}
        save_yaml(unicode_data, tmp_path)
        loaded = load_yaml(tmp_path)
        ok = loaded['title'] == unicode_data['title']
        print(f"  {'✓' if ok else '✗'} Test 2 {'passed' if ok else 'failed'}: Unicode preserved in round-trip")
        results.append(ok)
    finally:
        os.unlink(tmp_path)

    passed = sum(results)
    print(f"  {passed}/{len(results)} tests passed\n")
    return passed == len(results)


def test_load_save_error_history():
    """Test load_error_history() and save_error_history() using a temporary directory."""
    print("Testing load_error_history() / save_error_history()...")

    results = []

    with tempfile.TemporaryDirectory() as tmp_dir:
        history_file = os.path.join(tmp_dir, 'data', 'url_error_history.json')

        # Test 1: File does not exist — should return default structure
        original_path = ms.ERROR_HISTORY_FILE
        ms.ERROR_HISTORY_FILE = history_file
        try:
            history = load_error_history()
            ok = history == {'errors': {}}
            print(f"  {'✓' if ok else '✗'} Test 1 {'passed' if ok else 'failed'}: Missing file returns default {{\"errors\": {{}}}}")
            results.append(ok)

            # Test 2: Save and reload history
            sample = {'errors': {'some-source': [{'date': '2026-01-01', 'status_code': 404, 'error': '404 Not Found'}]}}
            save_error_history(sample)
            loaded = load_error_history()
            ok = loaded == sample
            print(f"  {'✓' if ok else '✗'} Test 2 {'passed' if ok else 'failed'}: History round-trip preserves data")
            results.append(ok)

            # Test 3: save_error_history creates missing directories
            ok = os.path.isfile(history_file)
            print(f"  {'✓' if ok else '✗'} Test 3 {'passed' if ok else 'failed'}: Missing parent directories created")
            results.append(ok)
        finally:
            ms.ERROR_HISTORY_FILE = original_path

    passed = sum(results)
    print(f"  {passed}/{len(results)} tests passed\n")
    return passed == len(results)


def test_check_url():
    """Test check_url() with mocked HTTP responses."""
    print("Testing check_url()...")

    results = []

    # Test 1: Successful 200 response
    mock_response = MagicMock()
    mock_response.status_code = 200
    with patch('requests.head', return_value=mock_response):
        code, err = check_url('https://example.com')
        ok = code == 200 and err == ''
        print(f"  {'✓' if ok else '✗'} Test 1 {'passed' if ok else 'failed'}: 200 OK returned correctly (code={code})")
        results.append(ok)

    # Test 2: 404 — HEAD returns 404, GET also returns 404
    mock_404 = MagicMock()
    mock_404.status_code = 404
    with patch('requests.head', return_value=mock_404), patch('requests.get', return_value=mock_404):
        code, err = check_url('https://example.com/missing')
        ok = code == 404
        print(f"  {'✓' if ok else '✗'} Test 2 {'passed' if ok else 'failed'}: 404 returned correctly (code={code})")
        results.append(ok)

    # Test 3: Timeout exception
    with patch('requests.head', side_effect=requests.exceptions.Timeout()):
        code, err = check_url('https://slow.example.com')
        ok = code == -1 and err == 'timeout'
        print(f"  {'✓' if ok else '✗'} Test 3 {'passed' if ok else 'failed'}: Timeout handled (code={code}, err={err!r})")
        results.append(ok)

    # Test 4: Connection error
    with patch('requests.head', side_effect=requests.exceptions.ConnectionError()):
        code, err = check_url('https://unreachable.example.com')
        ok = code == -1 and err == 'connection_error'
        print(f"  {'✓' if ok else '✗'} Test 4 {'passed' if ok else 'failed'}: ConnectionError handled (code={code}, err={err!r})")
        results.append(ok)

    # Test 5: HEAD returns 403, GET fallback returns 200
    mock_head_403 = MagicMock()
    mock_head_403.status_code = 403
    mock_get_200 = MagicMock()
    mock_get_200.status_code = 200
    with patch('requests.head', return_value=mock_head_403), patch('requests.get', return_value=mock_get_200):
        code, err = check_url('https://example.com/protected')
        ok = code == 200
        print(f"  {'✓' if ok else '✗'} Test 5 {'passed' if ok else 'failed'}: HEAD 4xx triggers GET fallback (code={code})")
        results.append(ok)

    passed = sum(results)
    print(f"  {passed}/{len(results)} tests passed\n")
    return passed == len(results)


def test_detect_license():
    """Test detect_license() with mocked HTTP responses."""
    print("Testing detect_license()...")

    results = []

    def mock_get(content_text):
        mock_resp = MagicMock()
        mock_resp.text = content_text
        return mock_resp

    # Test 1: CC BY-SA license detected
    with patch('requests.get', return_value=mock_get('This work is licensed under cc by-sa 4.0')):
        result = detect_license('https://example.com')
        ok = result == 'CC BY-SA'
        print(f"  {'✓' if ok else '✗'} Test 1 {'passed' if ok else 'failed'}: CC BY-SA detected (got {result!r})")
        results.append(ok)

    # Test 2: MIT license detected
    with patch('requests.get', return_value=mock_get('Released under the MIT License')):
        result = detect_license('https://example.com')
        ok = result == 'MIT'
        print(f"  {'✓' if ok else '✗'} Test 2 {'passed' if ok else 'failed'}: MIT detected (got {result!r})")
        results.append(ok)

    # Test 3: All Rights Reserved
    with patch('requests.get', return_value=mock_get('Copyright 2024. All rights reserved.')):
        result = detect_license('https://example.com')
        ok = result == 'All Rights Reserved'
        print(f"  {'✓' if ok else '✗'} Test 3 {'passed' if ok else 'failed'}: All Rights Reserved detected (got {result!r})")
        results.append(ok)

    # Test 4: Unknown — no recognisable license text
    with patch('requests.get', return_value=mock_get('Welcome to our website. Enjoy your visit!')):
        result = detect_license('https://example.com')
        ok = result == 'unknown'
        print(f"  {'✓' if ok else '✗'} Test 4 {'passed' if ok else 'failed'}: Unknown license returns 'unknown' (got {result!r})")
        results.append(ok)

    # Test 5: Network exception → returns 'unknown'
    with patch('requests.get', side_effect=requests.exceptions.RequestException('boom')):
        result = detect_license('https://unreachable.example.com')
        ok = result == 'unknown'
        print(f"  {'✓' if ok else '✗'} Test 5 {'passed' if ok else 'failed'}: Network exception returns 'unknown' (got {result!r})")
        results.append(ok)

    passed = sum(results)
    print(f"  {passed}/{len(results)} tests passed\n")
    return passed == len(results)


def main():
    """Run all tests."""
    print("=== TRUSTED_SOURCES Maintenance Tests ===\n")
    
    results = []
    results.append(("detect_owner", test_detect_owner()))
    results.append(("suggest_topic_tags", test_suggest_topic_tags()))
    results.append(("validate_yaml_structure", test_validate_yaml_structure()))
    results.append(("apply_changes", test_apply_changes()))
    results.append(("load_yaml / save_yaml", test_load_save_yaml()))
    results.append(("load_error_history / save_error_history", test_load_save_error_history()))
    results.append(("check_url", test_check_url()))
    results.append(("detect_license", test_detect_license()))
    
    print("=== Summary ===")
    total = len(results)
    passed = sum(1 for _, result in results if result)
    
    for name, result in results:
        status = "✓ PASS" if result else "✗ FAIL"
        print(f"{status}: {name}")
    
    print(f"\n{passed}/{total} test suites passed")
    
    return 0 if passed == total else 1


if __name__ == '__main__':
    sys.exit(main())
