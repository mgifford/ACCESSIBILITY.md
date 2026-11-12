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
        
        if source.get('ai_scraping') == 'prohibited':
            print(f"Skipping {source_id}: ai_scraping is prohibited")
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
        scraping_policy = source.get('ai_scraping', 'allowed')
        fetch_allowed = scraping_policy != 'prohibited'
        
        # Fill in owner if missing
        if not source.get('owner'):
            owner = detect_owner(source)
            if owner:
                source['owner'] = owner
                print(f"  Set owner: {owner}")
        
        # Fill in license if missing (set to "unknown" if can't determine).
        # Do not fetch a source whose registry policy forbids retrieval.
        if source.get('license') is None:
            if fetch_allowed:
                print(f"  Detecting license...")
                license_info = detect_license(full_url)
                source['license'] = license_info
                print(f"  Set license: {license_info}")
                time.sleep(REQUEST_DELAY)
            else:
                source['license'] = 'unknown'
                print("  Skipped license fetch (ai_scraping: prohibited); set license: unknown")
        
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
            if not fetch_allowed:
                print("  Skipped freshness fetch (ai_scraping: prohibited)")
                continue
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


VALID_STATUSES = ['active', 'not active', 'removed']
VALID_AUTHORITY_LEVELS = [
    'authoritative',
    'established',
    'expert-interpretation',
    'community-expert',
    'practitioner',
    'community',
    'to_review',
]
VALID_AI_SCRAPING = ['allowed', 'restricted', 'prohibited']
VALID_RESOURCE_TYPES = [
    'standard',
    'research',
    'guidance',
    'methodology',
    'tool',
    'skill',
    'governance',
    'dataset',
    'component',
]
VALID_NORMATIVE_STATUSES = ['normative', 'informative', 'mixed', 'not-applicable']
VALID_CURATION_STATUSES = [
    'candidate',
    'reviewed',
    'recommended-for-evaluation',
    'not-currently-recommended',
]
VALID_MAINTENANCE_STATUSES = ['active', 'maintenance', 'stale', 'archived', 'unknown']
COMPONENT_REQUIRED_FIELDS = [
    'component_name',
    'component_type',
    'repository_url',
    'documentation_url',
    'curation_status',
    'intended_use',
    'native_alternatives',
    'compatibility',
    'progressive_enhancement',
    'accessibility_limitations',
    'test_evidence',
    'reviewed_version',
    'maintenance_status',
    'last_reviewed',
]


def validate_yaml_structure(
    sources: List[Dict[str, Any]],
    root_dir: Optional[str] = None,
) -> List[str]:
    """
    Validate YAML structure, required fields, and registry provenance.

    Returns list of validation errors. Passing root_dir also checks that
    optional local_guidance paths resolve inside the repository.
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

        # Stable identifier format. IDs are used by tools and citations.
        if not re.match(r'^[a-z0-9][a-z0-9-]*$', str(source_id)):
            errors.append(f"{source_id}: ID must use lowercase letters, digits, and hyphens")

        # Canonical URL must be a complete HTTP(S) URL.
        if full_url:
            parsed = urlparse(str(full_url))
            if parsed.scheme not in ('http', 'https') or not parsed.netloc:
                errors.append(f"{source_id}: full_url must be an absolute HTTP(S) URL, got '{full_url}'")

        # Provenance fields must be recorded, not left null. Unknown licensing
        # is allowed as the literal string "unknown" until it is verified.
        # Entries still marked to_review may have an unresolved owner.
        value = source.get('license')
        if value is None or (isinstance(value, str) and not value.strip()):
            errors.append(f"{source_id}: Missing provenance field 'license'")

        # Validate enumerated fields rather than accepting arbitrary labels.
        if source.get('status') not in VALID_STATUSES:
            errors.append(f"{source_id}: Invalid status '{source.get('status')}', must be one of {VALID_STATUSES}")

        authority = source.get('authority_level')
        if authority not in VALID_AUTHORITY_LEVELS:
            errors.append(f"{source_id}: Invalid authority_level '{authority}', must be one of {VALID_AUTHORITY_LEVELS}")

        if 'ai_scraping' in source and source['ai_scraping'] not in VALID_AI_SCRAPING:
            errors.append(f"{source_id}: Invalid ai_scraping '{source['ai_scraping']}', must be one of {VALID_AI_SCRAPING}")

        if 'resource_type' in source and source['resource_type'] not in VALID_RESOURCE_TYPES:
            errors.append(f"{source_id}: Invalid resource_type '{source['resource_type']}', must be one of {VALID_RESOURCE_TYPES}")

        if 'normative_status' in source and source['normative_status'] not in VALID_NORMATIVE_STATUSES:
            errors.append(f"{source_id}: Invalid normative_status '{source['normative_status']}', must be one of {VALID_NORMATIVE_STATUSES}")

        if 'curation_status' in source and source['curation_status'] not in VALID_CURATION_STATUSES:
            errors.append(f"{source_id}: Invalid curation_status '{source['curation_status']}', must be one of {VALID_CURATION_STATUSES}")

        if 'maintenance_status' in source and source['maintenance_status'] not in VALID_MAINTENANCE_STATUSES:
            errors.append(f"{source_id}: Invalid maintenance_status '{source['maintenance_status']}', must be one of {VALID_MAINTENANCE_STATUSES}")

        for field in (
            'component_name', 'component_type', 'intended_use', 'native_alternatives',
            'compatibility', 'progressive_enhancement', 'accessibility_limitations',
            'test_evidence', 'curation_notes', 'reviewed_version',
        ):
            if field in source and not isinstance(source[field], str):
                errors.append(f"{source_id}: '{field}' must be a string")

        for field in ('repository_url', 'documentation_url'):
            if field in source:
                parsed = urlparse(str(source[field]))
                if parsed.scheme not in ('http', 'https') or not parsed.netloc:
                    errors.append(f"{source_id}: {field} must be an absolute HTTP(S) URL, got '{source[field]}'")

        if 'related_skills' in source:
            if not isinstance(source['related_skills'], list):
                errors.append(f"{source_id}: 'related_skills' must be a list")
            else:
                for skill in source['related_skills']:
                    if not isinstance(skill, str) or not re.match(r'^[a-z0-9][a-z0-9-]*$', skill):
                        errors.append(f"{source_id}: related_skills entry is not a valid skill name: '{skill}'")

        if source.get('resource_type') == 'component':
            for field in COMPONENT_REQUIRED_FIELDS:
                if field not in source or source[field] in (None, ''):
                    errors.append(f"{source_id}: component reference is missing required field '{field}'")

        # Date and list shapes.
        last_reviewed = source.get('last_reviewed')
        if last_reviewed is not None and not re.match(r'^\d{4}-\d{2}-\d{2}$', str(last_reviewed)):
            errors.append(f"{source_id}: last_reviewed must be null or YYYY-MM-DD, got '{last_reviewed}'")

        for field in ('topic_tags', 'wcag_version', 'audience', 'local_guidance', 'additional_urls'):
            if field in source and not isinstance(source[field], list):
                errors.append(f"{source_id}: '{field}' must be a list")

        for field in ('jurisdiction', 'scope', 'limitations', 'authority_basis', 'recommended_use', 'license_notes'):
            if field in source and not isinstance(source[field], str):
                errors.append(f"{source_id}: '{field}' must be a string")

        # A curated, typed entry needs a recorded owner and an authority basis.
        # Legacy records may remain to_review until a human resolves them.
        if authority and authority != 'to_review':
            owner = source.get('owner')
            if owner is None or (isinstance(owner, str) and not owner.strip()):
                errors.append(f"{source_id}: Missing provenance field 'owner' for a non-provisional authority_level")
            if source.get('resource_type') and not source.get('authority_basis'):
                errors.append(f"{source_id}: authority_level '{authority}' with resource_type requires authority_basis")

        # Additional URLs must be complete HTTP(S) URLs.
        for extra_url in source.get('additional_urls', []) or []:
            parsed = urlparse(str(extra_url))
            if parsed.scheme not in ('http', 'https') or not parsed.netloc:
                errors.append(f"{source_id}: additional_urls entry is not an absolute HTTP(S) URL: '{extra_url}'")

        # Optional local relationship paths must resolve.
        if root_dir:
            for local_path in source.get('local_guidance', []) or []:
                candidate = os.path.normpath(os.path.join(root_dir, str(local_path)))
                root_abs = os.path.abspath(root_dir)
                if not os.path.abspath(candidate).startswith(root_abs + os.sep):
                    errors.append(f"{source_id}: local_guidance path escapes the repository: '{local_path}'")
                elif not os.path.exists(candidate):
                    errors.append(f"{source_id}: local_guidance path does not exist: '{local_path}'")

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
    validation_errors = validate_yaml_structure(sources, root_dir='.')
    if validation_errors:
        print("⚠️  Validation errors:")
        for error in validation_errors:
            print(f"  - {error}")
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
