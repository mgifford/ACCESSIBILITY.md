---
title: Search
layout: default
description: Search across all ACCESSIBILITY.md guides and documentation.
---

<div class="search-page">
  <div class="wrap">
    <h1>Search</h1>

    <form id="search-form" role="search" action="" class="search-form-standalone">
      <label for="search-input" class="search-label">Search guides and documentation</label>
      <div class="search-input-row">
        <input
          id="search-input"
          type="search"
          name="q"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
          placeholder="e.g. keyboard navigation, color contrast…"
          aria-describedby="search-hint"
        />
        <button type="submit" class="button primary search-submit-btn">Search</button>
      </div>
      <p id="search-hint" class="search-hint">Results update as you type.</p>
    </form>

    <!-- Polite ARIA live region announces result counts to screen readers -->
    <div id="search-status" role="status" aria-live="polite" aria-atomic="true" class="sr-only"></div>

    <div id="search-results" aria-label="Search results"></div>
  </div>
</div>

<script>window.SEARCH_INDEX_URL = '{{ "/search-index.json" | relative_url }}';</script>
<script src="{{ '/assets/js/lunr.min.js' | relative_url }}"></script>
<script src="{{ '/assets/js/search.js' | relative_url }}"></script>
