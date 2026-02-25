#!/usr/bin/env python3
"""
Unit tests for maintain_trusted_sources.py

Run with: python .github/scripts/test_maintenance.py
"""

import sys
sys.path.insert(0, '.github/scripts')

from maintain_trusted_sources import (
    detect_owner,
    suggest_topic_tags,
    validate_yaml_structure
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
        # Test 2: Extract from description
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
    ]
    
    passed = 0
    for i, test in enumerate(tests, 1):
        result = detect_owner(test['source'])
        if result == test['expected']:
            print(f"  ✓ Test {i} passed")
            passed += 1
        else:
            print(f"  ✗ Test {i} failed: expected {test['expected']}, got {result}")
    
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
    ]
    
    passed = 0
    for i, test in enumerate(tests, 1):
        result = suggest_topic_tags(test['source'])
        # Check if expected tags are in result
        has_expected = all(tag in result for tag in test['expected_tags'])
        if has_expected:
            print(f"  ✓ Test {i} passed: {', '.join(result)}")
            passed += 1
        else:
            print(f"  ✗ Test {i} failed: expected {test['expected_tags']}, got {result}")
    
    print(f"  {passed}/{len(tests)} tests passed\n")
    return passed == len(tests)


def test_validate_yaml_structure():
    """Test YAML validation."""
    print("Testing validate_yaml_structure()...")
    
    # Test 1: Valid sources
    valid_sources = [
        {
            'id': 'test-1',
            'domain': 'Test Domain',
            'url': 'example.com',
            'full_url': 'https://example.com',
            'best_for': 'testing',
            'description': 'Test source',
            'status': 'active'
        }
    ]
    
    errors = validate_yaml_structure(valid_sources)
    if len(errors) == 0:
        print("  ✓ Test 1 passed: Valid source accepted")
        test1_passed = True
    else:
        print(f"  ✗ Test 1 failed: {errors}")
        test1_passed = False
    
    # Test 2: Detect duplicate IDs
    duplicate_sources = [
        {
            'id': 'test-1',
            'domain': 'Test 1',
            'url': 'example1.com',
            'full_url': 'https://example1.com',
            'best_for': 'testing',
            'description': 'Test source 1',
            'status': 'active'
        },
        {
            'id': 'test-1',  # Duplicate ID
            'domain': 'Test 2',
            'url': 'example2.com',
            'full_url': 'https://example2.com',
            'best_for': 'testing',
            'description': 'Test source 2',
            'status': 'active'
        }
    ]
    
    errors = validate_yaml_structure(duplicate_sources)
    has_duplicate_error = any('Duplicate ID' in error for error in errors)
    if has_duplicate_error:
        print("  ✓ Test 2 passed: Duplicate ID detected")
        test2_passed = True
    else:
        print(f"  ✗ Test 2 failed: Duplicate not detected")
        test2_passed = False
    
    # Test 3: Detect duplicate URLs
    duplicate_url_sources = [
        {
            'id': 'test-1',
            'domain': 'Test 1',
            'url': 'example.com',
            'full_url': 'https://example.com',
            'best_for': 'testing',
            'description': 'Test source 1',
            'status': 'active'
        },
        {
            'id': 'test-2',
            'domain': 'Test 2',
            'url': 'example.com',
            'full_url': 'https://example.com',  # Duplicate URL
            'best_for': 'testing',
            'description': 'Test source 2',
            'status': 'active'
        }
    ]
    
    errors = validate_yaml_structure(duplicate_url_sources)
    has_duplicate_url_error = any('Duplicate URL' in error for error in errors)
    if has_duplicate_url_error:
        print("  ✓ Test 3 passed: Duplicate URL detected")
        test3_passed = True
    else:
        print(f"  ✗ Test 3 failed: Duplicate URL not detected")
        test3_passed = False
    
    passed = sum([test1_passed, test2_passed, test3_passed])
    print(f"  {passed}/3 tests passed\n")
    return passed == 3


def main():
    """Run all tests."""
    print("=== TRUSTED_SOURCES Maintenance Tests ===\n")
    
    results = []
    results.append(("detect_owner", test_detect_owner()))
    results.append(("suggest_topic_tags", test_suggest_topic_tags()))
    results.append(("validate_yaml_structure", test_validate_yaml_structure()))
    
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
