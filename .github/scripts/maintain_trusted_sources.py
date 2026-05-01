#!/usr/bin/env python3
"""
Maintain TRUSTED_SOURCES.yaml by validating URLs, enriching metadata, and ensuring quality.

This script is designed to run as part of a GitHub Action monthly workflow.
"""

import json
import os
import sys
import yaml
import requests
from datetime import datetime, timedelta, timezone
from typing import Dict, List, Optional, Any
from urllib.parse import urlparse
import time
import re

# Configuration
REQUEST_TIMEOUT = 10
REQUEST_DELAY = 1  # Delay between requests to be respectful
USER_AGENT = "Mozilla/5.0 (compatible; ACCESSIBILITY.md-Bot/1.0; +https://github.com/mgifford/ACCESSIBILITY.md)"

# File paths
TRUSTED_SOURCES_FILE = "examples/TRUSTED_SOURCES.yaml"
ERROR_HISTORY_FILE = ".github/data/url_error_history.json"


def load_yaml(file_path: str) -> Dict[str, Any]:
    """Load YAML file."""
    with open(file_path, 'r', encoding='utf-8') as f:
        return yaml.safe_load(f)


def save_yaml(data: Dict[str, Any], file_path: str) -> None:
    """Save YAML file with proper formatting."""
    with open(file_path, 'w', encoding='utf-8') as f:
        yaml.dump(data, f, default_flow_style=False, allow_unicode=True, sort_keys=False)


def load_error_history() -> Dict[str, Any]:
    """Load URL error history from JSON file."""
    if os.path.exists(ERROR_HISTORY_FILE):
        with open(ERROR_HISTORY_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {"errors": {}}


def save_error_history(history: Dict[str, Any]) -> None:
    """Save URL error history to JSON file."""
    os.makedirs(os.path.dirname(ERROR_HISTORY_FILE), exist_ok=True)
    with open(ERROR_HISTORY_FILE, 'w', encoding='utf-8') as f:
        json.dump(history, f, indent=2)


def check_url(url: str) -> tuple[int, str]:
    """
    Check if a URL is accessible.
    
    Returns:
        tuple: (status_code, error_message)
    """
    try:
        response = requests.head(
            url,
            timeout=REQUEST_TIMEOUT,
            allow_redirects=True,
            headers={'User-Agent': USER_AGENT}
        )
        # Some servers don't respond well to HEAD, try GET
        if response.status_code >= 400:
            response = requests.get(
                url,
                timeout=REQUEST_TIMEOUT,
                allow_redirects=True,
                headers={'User-Agent': USER_AGENT}
            )
        return response.status_code, ""
    except requests.exceptions.Timeout:
        return -1, "timeout"
    except requests.exceptions.ConnectionError:
        return -1, "connection_error"
    except requests.exceptions.RequestException as e:
        return -1, str(e)


def validate_urls(sources: List[Dict[str, Any]], error_history: Dict[str, Any]) -> tuple[List[str], List[str]]:
    """
    Validate URLs in sources and track errors.
    
    Returns:
        tuple: (ids_to_mark_inactive, ids_to_remove)
    """
    print("Validating URLs...")
    ids_to_mark_inactive = []
    ids_to_remove = []
    today = datetime.now().isoformat()
    
    for source in sources:
        source_id = source.get('id')
        full_url = source.get('full_url')
        status = source.get('status', 'active')
        
        if not full_url or status == 'removed':
            continue
        
        print(f"Checking {source_id}: {full_url}")
        status_code, error_msg = check_url(full_url)
        
        if status_code == 404:
            print(f"  ❌ 404 Not Found")
            # Track this error
            if source_id not in error_history["errors"]:
                error_history["errors"][source_id] = []
            
            error_history["errors"][source_id].append({
                "date": today,
                "status_code": status_code,
                "error": "404 Not Found"
            })
            
            # Check if this is the second 404
            error_count = len([e for e in error_history["errors"][source_id] if e.get("status_code") == 404])
            
            if error_count >= 2:
                print(f"  🗑️  Second 404 - marking for removal")
                ids_to_remove.append(source_id)
            else:
                print(f"  ⚠️  First 404 - marking as not active")
                ids_to_mark_inactive.append(source_id)
        elif status_code >= 200 and status_code < 400:
            print(f"  ✓ {status_code} OK")
            # Clear any previous errors for this source
            if source_id in error_history["errors"]:
                del error_history["errors"][source_id]
        else:
            print(f"  ⚠️  Status {status_code}: {error_msg}")
        
        # Be respectful - delay between requests
        time.sleep(REQUEST_DELAY)
    
    return ids_to_mark_inactive, ids_to_remove


def detect_license(url: str) -> Optional[str]:
    """
    Attempt to detect license from a website.
    
    Returns common license types or "unknown" if not found.
    """
    try:
        response = requests.get(
            url,
            timeout=REQUEST_TIMEOUT,
            headers={'User-Agent': USER_AGENT}
        )
        content = response.text.lower()
        
        # Check for common license indicators
        if 'creative commons' in content or 'cc by' in content:
            if 'cc by-sa' in content:
                return 'CC BY-SA'
            elif 'cc by-nc' in content:
                return 'CC BY-NC'
            elif 'cc by' in content:
                return 'CC BY'
            return 'Creative Commons'
        elif 'mit license' in content:
            return 'MIT'
        elif 'apache license' in content:
            return 'Apache'
        elif 'gnu general public license' in content or 'gpl' in content:
            return 'GPL'
        elif 'all rights reserved' in content:
            return 'All Rights Reserved'
        
        return "unknown"
    except Exception:
        return "unknown"


def detect_owner(source: Dict[str, Any]) -> Optional[str]:
    """
    Attempt to detect the owner/author of a website.
    """
    domain = source.get('domain', '')
    
    # If domain looks like a person's name, use it
    if ' ' in domain and not any(word in domain.lower() for word in ['blog', 'site', 'web', 'inc', 'llc', 'ltd']):
        return domain
    
    # Try to extract from description
    description = source.get('description', '')
    # Look for patterns like "Personal site of X" or "X's blog"
    patterns = [
        r'personal (?:site|blog|website) of ([^,\.]+)',
        r'([^,\.]+)\'s (?:site|blog|website)',
        r'by ([^,\.]+)',
    ]
    for pattern in patterns:
        match = re.search(pattern, description, re.IGNORECASE)
        if match:
            return match.group(1).strip()
    
    return None


def check_content_freshness(url: str) -> Optional[datetime]:
    """
    Attempt to determine when content was last updated.
    
    This is a simplified check - in practice, might need site-specific logic.
    """
    try:
        response = requests.get(
            url,
            timeout=REQUEST_TIMEOUT,
            headers={'User-Agent': USER_AGENT}
        )
        
        # Check Last-Modified header
        last_modified = response.headers.get('Last-Modified')
        if last_modified:
            from email.utils import parsedate_to_datetime
            return parsedate_to_datetime(last_modified)
        
        # Could also parse content for dates, RSS feeds, etc.
        # For now, return None to indicate we couldn't determine
        return None
    except Exception:
        return None


def suggest_topic_tags(source: Dict[str, Any]) -> List[str]:
    """
    Suggest topic tags based on best_for and description fields.
    
    Returns a list of normalized topic tags.
    """
    # Common accessibility topic keywords
    topic_keywords = {
        'wcag': ['wcag', 'guideline', 'standard'],
        'aria': ['aria', 'wai-aria', 'screen reader'],
        'forms': ['form', 'input', 'validation'],
        'color-contrast': ['contrast', 'color'],
        'keyboard': ['keyboard', 'navigation', 'focus'],
        'screen-readers': ['screen reader', 'nvda', 'jaws', 'voiceover'],
        'testing': ['test', 'testing', 'audit', 'scan'],
        'design': ['design', 'ux', 'ui'],
        'development': ['code', 'development', 'programming'],
        'inclusive-design': ['inclusive', 'universal design'],
        'captions': ['caption', 'subtitle', 'video'],
        'audio-description': ['audio description', 'described video'],
        'pdf': ['pdf', 'document'],
        'mobile': ['mobile', 'ios', 'android'],
        'web-standards': ['html', 'css', 'javascript', 'w3c'],
        'policy': ['policy', 'legal', 'compliance', 'regulation'],
        'training': ['training', 'education', 'learning', 'course'],
    }
    
    # Combine best_for and description for analysis
    text = f"{source.get('best_for', '')} {source.get('description', '')}".lower()
    
    suggested_tags = []
    for tag, keywords in topic_keywords.items():
        if any(keyword in text for keyword in keywords):
            suggested_tags.append(tag)
    
    return suggested_tags[:10]  # Limit to 10 tags


def enrich_metadata(sources: List[Dict[str, Any]], full_scan: bool = False) -> None:
    """
    Enrich metadata for sources with missing information.
    
    Args:
        full_scan: If True, update topic_tags (annual scan)
    """
    print("Enriching metadata...")
    today = datetime.now().date().isoformat()
    
    for source in sources:
        source_id = source.get('id')
        full_url = source.get('full_url')
        status = source.get('status', 'active')
        
        if not full_url or status == 'removed':
            continue
        
        print(f"Processing {source_id}...")
        
        # Fill in owner if missing
        if not source.get('owner'):
            owner = detect_owner(source)
            if owner:
                source['owner'] = owner
                print(f"  Set owner: {owner}")
        
        # Fill in license if missing (set to "unknown" if can't determine)
        if source.get('license') is None:
            print(f"  Detecting license...")
            license_info = detect_license(full_url)
            source['license'] = license_info
            print(f"  Set license: {license_info}")
            time.sleep(REQUEST_DELAY)
        
        # Update last_reviewed if we're doing metadata updates
        if source.get('last_reviewed') is None or full_scan:
            source['last_reviewed'] = today
            print(f"  Updated last_reviewed: {today}")
        
        # Suggest topic_tags during full scan if empty or missing
        if full_scan and (not source.get('topic_tags') or len(source.get('topic_tags', [])) == 0):
            suggested_tags = suggest_topic_tags(source)
            if suggested_tags:
                source['topic_tags'] = suggested_tags
                print(f"  Suggested topic_tags: {', '.join(suggested_tags)}")
        
        # Check content freshness for active sources
        if status == 'active':
            print(f"  Checking content freshness...")
            last_updated = check_content_freshness(full_url)
            if last_updated:
                # If no new content in over a year, mark as not active
                one_year_ago = datetime.now(timezone.utc) - timedelta(days=365)
                if last_updated < one_year_ago:
                    source['status'] = 'not active'
                    print(f"  ⚠️  No updates since {last_updated.date()}, marked as 'not active'")
            time.sleep(REQUEST_DELAY)


def apply_changes(
    sources: List[Dict[str, Any]],
    ids_to_mark_inactive: List[str],
    ids_to_remove: List[str]
) -> List[Dict[str, Any]]:
    """
    Apply status changes to sources.
    """
    print("\nApplying changes...")
    
    # Mark as inactive
    for source in sources:
        if source['id'] in ids_to_mark_inactive:
            source['status'] = 'not active'
            print(f"  Marked {source['id']} as 'not active'")
    
    # Remove sources (filter out)
    original_count = len(sources)
    sources = [s for s in sources if s['id'] not in ids_to_remove]
    removed_count = original_count - len(sources)
    
    if removed_count > 0:
        print(f"  Removed {removed_count} source(s)")
        for removed_id in ids_to_remove:
            print(f"    - {removed_id}")
    
    return sources


def validate_yaml_structure(sources: List[Dict[str, Any]]) -> List[str]:
    """
    Validate YAML structure and required fields.
    
    Returns list of validation errors.
    """
    errors = []
    required_fields = ['id', 'domain', 'url', 'full_url', 'best_for', 'description', 'status']
    
    # Track for duplicate detection
    seen_ids = set()
    seen_urls = {}
    
    for i, source in enumerate(sources):
        source_id = source.get('id', f'source_{i}')
        
        # Check for duplicate IDs
        if source_id in seen_ids:
            errors.append(f"{source_id}: Duplicate ID found")
        seen_ids.add(source_id)
        
        # Check for duplicate URLs
        full_url = source.get('full_url', '')
        if full_url and full_url in seen_urls:
            errors.append(f"{source_id}: Duplicate URL '{full_url}' (also in {seen_urls[full_url]})")
        if full_url:
            seen_urls[full_url] = source_id
        
        # Check required fields
        for field in required_fields:
            if field not in source:
                errors.append(f"{source_id}: Missing required field '{field}'")
        
        # Check that null values are intentional (not for owner/license which should be "unknown")
        if source.get('license') is None:
            # This is OK during initial state, but after enrichment should be set
            pass
        
        # Validate status values
        valid_statuses = ['active', 'not active', 'removed']
        if source.get('status') not in valid_statuses:
            errors.append(f"{source_id}: Invalid status '{source.get('status')}', must be one of {valid_statuses}")
    
    return errors


def main():
    """Main execution function."""
    print("=== TRUSTED_SOURCES.yaml Maintenance ===\n")
    
    # Parse arguments
    validate_only = '--validate-only' in sys.argv
    full_scan = '--full-scan' in sys.argv
    skip_validation = '--skip-validation' in sys.argv
    
    # Load data
    print("Loading TRUSTED_SOURCES.yaml...")
    data = load_yaml(TRUSTED_SOURCES_FILE)
    sources = data.get('sources', [])
    print(f"Loaded {len(sources)} sources\n")
    
    # Load error history
    error_history = load_error_history()
    
    # Validate structure
    print("Validating YAML structure...")
    validation_errors = validate_yaml_structure(sources)
    if validation_errors:
        print("⚠️  Validation warnings:")
        for error in validation_errors[:10]:  # Show first 10
            print(f"  - {error}")
        if len(validation_errors) > 10:
            print(f"  ... and {len(validation_errors) - 10} more")
    else:
        print("✓ Structure validation passed\n")
    
    if validate_only:
        sys.exit(0 if not validation_errors else 1)
    
    # Validate URLs
    if not skip_validation:
        ids_to_mark_inactive, ids_to_remove = validate_urls(sources, error_history)
        sources = apply_changes(sources, ids_to_mark_inactive, ids_to_remove)
        save_error_history(error_history)
        print()
    else:
        ids_to_mark_inactive = []
        ids_to_remove = []
    
    # Enrich metadata
    enrich_metadata(sources, full_scan=full_scan)
    
    # Save updated data
    data['sources'] = sources
    data['generated_on'] = datetime.now().date().isoformat()
    
    print("\nSaving updated TRUSTED_SOURCES.yaml...")
    save_yaml(data, TRUSTED_SOURCES_FILE)
    
    # Print summary
    print("\n=== Summary ===")
    print(f"Total sources: {len(sources)}")
    print(f"Marked as inactive: {len(ids_to_mark_inactive)}")
    print(f"Removed: {len(ids_to_remove)}")
    print(f"Validation warnings: {len(validation_errors)}")
    
    if ids_to_mark_inactive or ids_to_remove:
        print("\n⚠️  Changes were made. Please review before committing.")
    else:
        print("\n✓ No URL status changes needed.")
    
    print("\nDone!")


if __name__ == '__main__':
    main()
