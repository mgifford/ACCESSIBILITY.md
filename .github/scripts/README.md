# TRUSTED_SOURCES Maintenance Scripts

## Quick Reference

### Run Validation Only
```bash
python .github/scripts/maintain_trusted_sources.py --validate-only
```

### Run Monthly Maintenance (Default)
```bash
python .github/scripts/maintain_trusted_sources.py
```

### Run Full Scan (Annual, includes topic tags)
```bash
python .github/scripts/maintain_trusted_sources.py --full-scan
```

### Run Metadata Enrichment Only (Skip URL Validation)
```bash
python .github/scripts/maintain_trusted_sources.py --skip-validation
```

## Installation

```bash
pip install -r .github/scripts/requirements.txt
```

## Script Options

- `--validate-only`: Only validate YAML structure, don't make changes
- `--full-scan`: Perform comprehensive scan including topic_tags update (annual)
- `--skip-validation`: Skip URL validation, only enrich metadata (faster)

## What the Script Does

1. **URL Validation**: Checks all `full_url` fields for 404 errors
2. **Metadata Enrichment**: Fills in missing `owner` and `license` fields
3. **Content Freshness**: Checks Last-Modified headers and marks stale content
4. **Topic Tags**: Suggests tags based on description (only with `--full-scan`)
5. **Quality Checks**: Validates structure, detects duplicates

## Output Files

- `examples/TRUSTED_SOURCES.yaml`: Updated with enriched metadata
- `.github/data/url_error_history.json`: Tracks 404 errors for two-strike removal

## Automation

The GitHub Action (`.github/workflows/maintain-trusted-sources.yml`) runs this script:
- **Automatically**: Monthly on the 1st at 00:00 UTC
- **Manually**: Via workflow_dispatch with options

## Testing Locally

```bash
# Dry run - validate without making changes
python .github/scripts/maintain_trusted_sources.py --validate-only

# Test on a copy
cp examples/TRUSTED_SOURCES.yaml /tmp/TRUSTED_SOURCES_backup.yaml
python .github/scripts/maintain_trusted_sources.py --skip-validation
# Review changes, then restore if needed:
# cp /tmp/TRUSTED_SOURCES_backup.yaml examples/TRUSTED_SOURCES.yaml
```

## Safety Features

- ✅ All changes create PRs for review (never auto-merges)
- ✅ Two-strike policy before removing entries
- ✅ Error history tracked in JSON file
- ✅ Respects `ai_scraping` preferences
- ✅ Rate limiting and respectful delays between requests

## See Also

- [TRUSTED_SOURCES_MAINTENANCE.md](../.github/TRUSTED_SOURCES_MAINTENANCE.md) - Full documentation
- [maintain-trusted-sources.yml](../.github/workflows/maintain-trusted-sources.yml) - GitHub Action workflow
