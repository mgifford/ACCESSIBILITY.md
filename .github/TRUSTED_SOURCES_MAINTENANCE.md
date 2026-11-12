# TRUSTED_SOURCES.yaml Maintenance

## Overview

This repository includes an automated monthly maintenance workflow for `examples/TRUSTED_SOURCES.yaml` to ensure the list of trusted accessibility resources remains high-quality and up-to-date.

## Features

The maintenance script (`.github/scripts/maintain_trusted_sources.py`) performs:

### 1. URL Validation
- Checks all URLs for accessibility (404 detection)
- **First 404**: Marks source as "not active"
- **Second 404**: Removes the entry entirely
- Tracks error history in `.github/data/url_error_history.json`

### 2. Metadata Enrichment
- **`owner`**: Detects from domain name or description patterns
- **`license`**: Attempts to detect common licenses (Creative Commons, MIT, Apache, GPL, etc.)
  - Sets to "unknown" if not found (never leaves as `null`)
- **`last_reviewed`**: Updates timestamp when metadata is reviewed

### 3. Content Freshness Check
- Checks Last-Modified headers to detect site updates
- Marks as "not active" if no content updates in over 1 year

### 4. Quality Validation
- Validates YAML structure
- Ensures required fields are present
- Checks for valid status values

## Workflow Schedule

The workflow runs:
- **Automatically**: Monthly on the 1st at 00:00 UTC
- **Manually**: Via workflow_dispatch with options:
  - `full_scan`: Perform annual topic_tags update
  - `skip_validation`: Skip URL checks (metadata only)

## How It Works

1. **Automated Execution**: GitHub Action runs monthly
2. **Changes Detection**: Script validates URLs and enriches metadata
3. **Pull Request Creation**: If changes are found, creates a PR for review
4. **Human Review**: Maintainer reviews and merges the PR

## Manual Execution

### Run Full Scan (Annual Topic Update)
```bash
python .github/scripts/maintain_trusted_sources.py --full-scan
```

### Validate Only (No Changes)
```bash
python .github/scripts/maintain_trusted_sources.py --validate-only
```

### Skip URL Validation (Metadata Only)
```bash
python .github/scripts/maintain_trusted_sources.py --skip-validation
```

## Requirements

- Python 3.11+
- Dependencies in `.github/scripts/requirements.txt`:
  - PyYAML
  - requests

## Error Tracking

The script maintains a history file at `.github/data/url_error_history.json`:

```json
{
  "errors": {
    "source-id": [
      {
        "date": "2026-02-25T12:00:00",
        "status_code": 404,
        "error": "404 Not Found"
      }
    ]
  }
}
```

## Respecting Content Creator Preferences

The registry records an `ai_scraping` policy, but the maintenance script is
not a consent or licence enforcement system. It applies these rules:

- `prohibited`: URL validation, licence detection, and freshness checks skip
  the source. The script makes no request to it. The entry remains in the
  registry for citation and human discovery.
- `restricted`: the script may check availability, but its content must not be
  used for training.
- `allowed` (default when omitted): availability checks may run, subject to
  the source's own terms.

An omitted value is not independent proof of permission. The script does not
train on source content, and a successful check does not grant reuse rights.

## Quality Assurance

### What the Script Does
- ✅ Validates URLs monthly, skipping sources marked `ai_scraping: prohibited`
- ✅ Tracks 404 errors with two-strike removal
- ✅ Enriches missing metadata without overriding verified values
- ✅ Detects content staleness where retrieval is permitted
- ✅ Creates PRs for human review

The registry validator also checks identifier format, absolute URLs,
duplicate IDs and URLs, required licence/owner provenance, authority and
status enums, review-date format, optional field shapes, and local guidance
paths. It does not decide whether a source is authoritative, accurate, or
appropriately licensed for a particular use; a human must review those
judgements.

### What Humans Should Review
- ⚠️ Verify sources marked "not active" are truly inactive
- ⚠️ Confirm removed sources should be deleted
- ⚠️ Check accuracy of detected metadata (owner, license)
- ⚠️ Add context for topic_tags during annual scans

## Future Enhancements

Potential improvements:
1. **Topic Tags**: Implement ML/NLP analysis for automatic tag suggestions
2. **RSS/Atom**: Check blog feeds for recent posts
3. **Archive.org**: Suggest archived versions for removed content
4. **WCAG Version**: Parse content for WCAG 2.1/2.2/3.0 references
5. **Authority Scoring**: Analyze citations, backlinks, author credentials

## Related Files

- Workflow: `.github/workflows/maintain-trusted-sources.yml`
- Script: `.github/scripts/maintain_trusted_sources.py`
- Data: `examples/TRUSTED_SOURCES.yaml`
- History: `.github/data/url_error_history.json`

## Support

For issues or questions about the maintenance workflow, please:
1. Check existing GitHub Issues
2. Review the workflow logs in GitHub Actions
3. Open a new issue with the `maintenance` label
