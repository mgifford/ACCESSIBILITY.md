/* search.js — lunr.js-powered client-side search for ACCESSIBILITY.md
   Expects lunr.min.js to be loaded before this script. */

(function () {
  'use strict';

  var SEARCH_INDEX_URL = window.SEARCH_INDEX_URL || '/search-index.json';

  var searchInput = document.getElementById('search-input');
  var resultsContainer = document.getElementById('search-results');
  var statusRegion = document.getElementById('search-status');
  var searchForm = document.getElementById('search-form');

  if (!searchInput || !resultsContainer) return;

  var lunrIndex = null;
  var pagesData = [];

  /* ── Read query from URL ── */
  function getQuery() {
    var params = new URLSearchParams(window.location.search);
    return (params.get('q') || '').trim();
  }

  /* ── Update URL without reloading ── */
  function updateUrl(query) {
    var url = new URL(window.location.href);
    if (query) {
      url.searchParams.set('q', query);
    } else {
      url.searchParams.delete('q');
    }
    history.replaceState(null, '', url.toString());
  }

  /* ── Announce to screen readers ── */
  function announce(msg) {
    if (statusRegion) statusRegion.textContent = msg;
  }

  /* ── Escape HTML to prevent XSS ── */
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ── Render results ── */
  function renderResults(results, query) {
    resultsContainer.innerHTML = '';

    if (!query) {
      announce('');
      return;
    }

    if (results.length === 0) {
      var noResults = document.createElement('p');
      noResults.className = 'search-no-results';
      noResults.textContent = 'No results found for \u201c' + query + '\u201d.';
      resultsContainer.appendChild(noResults);
      announce('No results found for \u201c' + query + '\u201d.');
      return;
    }

    announce(results.length + ' result' + (results.length !== 1 ? 's' : '') + ' found for \u201c' + query + '\u201d.');

    var list = document.createElement('ol');
    list.className = 'search-result-list';

    results.forEach(function (result) {
      var page = pagesData.find(function (p) { return String(p.id) === result.ref; });
      if (!page) return;

      var li = document.createElement('li');
      li.className = 'search-result-item';

      var titleLink = document.createElement('a');
      titleLink.href = page.url;
      titleLink.className = 'search-result-title';
      titleLink.textContent = page.title;

      var excerpt = document.createElement('p');
      excerpt.className = 'search-result-excerpt';
      excerpt.textContent = page.content
        ? page.content.substring(0, 200).trim() + '\u2026'
        : '';

      li.appendChild(titleLink);
      li.appendChild(excerpt);
      list.appendChild(li);
    });

    resultsContainer.appendChild(list);
  }

  /* ── Run a search ── */
  function doSearch(query) {
    if (!lunrIndex || !query) {
      renderResults([], query);
      return;
    }
    try {
      var results = lunrIndex.search(query);
      renderResults(results, query);
    } catch (e) {
      /* Handle lunr parse errors gracefully (e.g. bare special chars) */
      try {
        var safeResults = lunrIndex.search(query + '*');
        renderResults(safeResults, query);
      } catch (e2) {
        renderResults([], query);
      }
    }
  }

  /* ── Build the lunr index from fetched data ── */
  function buildIndex(pages) {
    pagesData = pages;
    lunrIndex = lunr(function () {
      this.ref('id');
      this.field('title', { boost: 10 });
      this.field('content');
      pages.forEach(function (page) {
        this.add(page);
      }, this);
    });
  }

  /* ── Fetch the search index and initialise ── */
  function init() {
    var query = getQuery();
    if (searchInput) searchInput.value = query;

    fetch(SEARCH_INDEX_URL)
      .then(function (response) {
        if (!response.ok) throw new Error('Failed to load search index');
        return response.json();
      })
      .then(function (pages) {
        buildIndex(pages);
        if (query) doSearch(query);
      })
      .catch(function (err) {
        announce('Search is temporarily unavailable.');
        console.warn('[search] ' + err.message);
      });

    /* Live search as user types */
    if (searchInput) {
      searchInput.addEventListener('input', function () {
        var q = searchInput.value.trim();
        updateUrl(q);
        doSearch(q);
      });
    }

    if (searchForm) {
      searchForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var q = searchInput ? searchInput.value.trim() : '';
        updateUrl(q);
        doSearch(q);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
