---
title: ACCESSIBILITY.md
---

<header class="hero">
  <div class="wrap hero-grid">
    <div>
      <h1>ACCESSIBILITY.md</h1>
      <p class="lede">
        A simple, open format for documenting a project’s accessibility posture,
        automation, and contributor expectations.
      </p>
      <p class="lede">
        Think of ACCESSIBILITY.md as a <strong>README for accessibility</strong>:
        a predictable place for humans and AI coding agents to find your a11y
        standards.
      </p>
      <div class="cta-row">
        <a class="button primary" href="#framework">Explore Framework</a>
        <a class="button secondary" href="https://github.com/mgifford/ACCESSIBILITY.md">View on GitHub</a>
      </div>
    </div>
    <aside class="code-card" aria-label="Simple sample ACCESSIBILITY.md snippet">
      <h2>Simple Sample ACCESSIBILITY.md</h2>
      <p><a href="./ACCESSIBILITY-template.md">See full ACCESSIBILITY-template.md</a></p>
      <pre><code># ACCESSIBILITY.md

## Conformance
- Target: WCAG 2.2 AA

## CI Guardrails
- axe-core checks in pull requests
- Fail build on critical a11y regressions

## Definition of Done
- Keyboard and screen-reader checks required
- No unresolved blockers in merged PRs</code></pre>
    </aside>
  </div>
</header>

<section class="notice-experimental" aria-label="Experimental status notice">
  <div class="wrap">
    <p class="notice-heading">⚠️ Experimental — Validate Before Use</p>
    <p>
      This project is <strong>still experimental</strong>. Most of the content on this site was generated with AI assistance
      and <strong>has not yet been fully validated in real-world conditions</strong>.
      Impacts may vary significantly depending on where and how it is implemented.
    </p>
    <p>
      <strong>Do not expect that simply adding an <code>ACCESSIBILITY.md</code> file will make your digital tool accessible.</strong>
      What it <em>can</em> do is signal to developers that accessibility matters, and make explicit what your development
      processes are and how they affect accessibility.
    </p>
    <p>
      People with direct experience conducting studies on the accessibility impact and cost implications of
      AI-assisted workflows should be involved before drawing conclusions from this work.
    </p>
    <p>
      <strong>Please share your experience</strong> — positive or negative — in the
      <a href="https://github.com/mgifford/ACCESSIBILITY.md/issues">issue queue</a>.
      Include links and references so claims can be examined and discussed by the community.
    </p>
  </div>
</section>

<section id="why">
  <div class="wrap">
    <h2>Why ACCESSIBILITY.md?</h2>
    <div class="prose">
      <p>
        README files are for broad project onboarding. ACCESSIBILITY.md adds a
        dedicated layer for accessibility status, known gaps, and enforcement
        workflows.
      </p>
      <p>
        Keeping this guidance explicit improves transparency for users, clarity
        for maintainers, and reliability for AI coding agents.
      </p>
    </div>
  </div>
</section>

<section id="structure">
  <div class="wrap">
    <h2>Repository Structure</h2>
    <div class="prose">
      <p>This repository is organized to help you quickly find what to adopt vs. what to reference:</p>
      <pre class="structure-code"><code class="language-plaintext">[Repository Root]
├── ACCESSIBILITY-template.md       ← Start here: Copy this template
├── AGENTS.md                       ← AI agent instructions
│
├── examples/                       ← Copy these to your project
│   ├── A11Y_SHIFT_LEFT_WORKFLOW.yml
│   ├── PRE_COMMIT_ACCESSIBILITY_SAMPLE.yaml
│   ├── TRUSTED_SOURCES.yaml
│   ├── Component best practices (SVG, forms, keyboard, diagrams)
│   └── Automation guides (axe-core, shift-left testing)
│
├── .github/workflows/              ← This repo's automation (reference)
├── _layouts/, _config.yml          ← Jekyll site (for documentation)
└── README.md                       ← Complete adoption guide</code></pre>
      <p>
        <strong>Key:</strong><br>
        ✅ Copy to your project: <code>ACCESSIBILITY-template.md</code>, files in <code>examples/</code><br>
        📖 Read for guidance: <code>README.md</code>, <code>AGENTS.md</code>, <code>CONTRIBUTING.md</code><br>
        🛠️ Jekyll/docs site: <code>_layouts/</code>, <code>_config.yml</code>, <code>assets/</code>, <code>index.md</code>
      </p>
    </div>
  </div>
</section>

<section id="framework">
  <div class="wrap">
    <h2>The Framework</h2>
    <div class="cards">
      <article class="card">
        <h3>Transparency &amp; Disclosure</h3>
        <p>
          Publish conformance level, assistive tech coverage, and known barriers.
        </p>
      </article>
      <article class="card">
        <h3>Operational Governance</h3>
        <p>
          Define issue taxonomy, severity triage, and accessibility Definition of
          Done.
        </p>
      </article>
      <article class="card">
        <h3>Automated Guardrails</h3>
        <p>
          Enforce checks in CI and pre-commit workflows with documented rule
          coverage.
        </p>
      </article>
    </div>
  </div>
</section>

<section id="examples">
  <div class="wrap">
    <h2>Reference Examples</h2>
    <div class="cards">
      <a class="card" href="./examples/CI_CD_ACCESSIBILITY_BEST_PRACTICES.html">
        <article>
          <h3>CI/CD Accessibility Best Practices</h3>
          <p>GitHub Actions, GitLab CI, axe-core, pa11y, Lighthouse CI, and AccessLint integration patterns for accessibility automation</p>
        </article>
      </a>
      <a class="card" href="./examples/AXE_RULES_COVERAGE.html">
        <article>
          <h3>Axe Rule Coverage</h3>
          <p>Complete reference of axe-core accessibility rules, categories, and WCAG mappings</p>
        </article>
      </a>
      <a class="card" href="./examples/SHIFT_LEFT_ACCESSIBILITY_AUTOMATION.html">
        <article>
          <h3>Shift-left Automation</h3>
          <p>Move accessibility testing earlier in your development workflow to catch issues sooner</p>
        </article>
      </a>
      <article class="card">
        <h3><a href="./examples/TRUSTED_SOURCES.yaml">Trusted Sources</a></h3>
        <p>Vetted accessibility resources with <a href="./.github/TRUSTED_SOURCES_MAINTENANCE.html">automated monthly maintenance</a></p>
        <p>Includes <a href="https://github.com/mgifford/wai-yaml-ld">wai-yaml-ld</a> for machine-readable WCAG standards</p>
      </article>
      <a class="card" href="./examples/ANCHOR_LINKS_ACCESSIBILITY_BEST_PRACTICES.html">
        <article>
          <h3>Anchor Links Accessibility Best Practices</h3>
          <p>Descriptive link text, focus management, skip links, smooth-scroll animation with <code>prefers-reduced-motion</code>, and WCAG criteria for in-page links</p>
        </article>
      </a>
      <a class="card" href="./examples/AUDIO_VIDEO_ACCESSIBILITY_BEST_PRACTICES.html">
        <article>
          <h3>Audio/Video Accessibility Best Practices</h3>
          <p>Captions, transcripts, audio descriptions, and accessible media player implementation</p>
        </article>
      </a>
      <a class="card" href="./examples/CONTENT_DESIGN_ACCESSIBILITY_BEST_PRACTICES.html">
        <article>
          <h3>Content Design Accessibility Best Practices</h3>
          <p>Plain language, page structure, readability, and content style guidance aligned with accessibility goals</p>
        </article>
      </a>
      <a class="card" href="./examples/README.html">
        <article>
          <h3>Examples Index</h3>
          <p>Browse all accessibility best practice guides and examples in this repository</p>
        </article>
      </a>
      <a class="card" href="./examples/LIGHT_DARK_MODE_ACCESSIBILITY_BEST_PRACTICES.html">
        <article>
          <h3>Light/Dark Mode Best Practices</h3>
          <p>Color scheme support, contrast requirements, and system preference integration</p>
        </article>
      </a>
      <a class="card" href="./examples/USER_PERSONALIZATION_ACCESSIBILITY_BEST_PRACTICES.html">
        <article>
          <h3>User Personalization Best Practices</h3>
          <p>User preference controls, CSS media queries, and avoiding accessibility overlays</p>
        </article>
      </a>
      <a class="card" href="./examples/MANUAL_ACCESSIBILITY_TESTING_GUIDE.html">
        <article>
          <h3>Manual Accessibility Testing Guide</h3>
          <p>Screen reader, keyboard, and cognitive testing techniques with step-by-step checklists</p>
        </article>
      </a>
      <a class="card" href="./examples/CHARTS_GRAPHS_ACCESSIBILITY_BEST_PRACTICES.html">
        <article>
          <h3>Charts and Graphs Accessibility Best Practices</h3>
          <p>Accessible static and interactive charts, text alternatives, color-independent encoding, keyboard-navigable data visualizations, and WCAG 2.2 compliance guidance</p>
        </article>
      </a>
      <a class="card" href="./examples/MAPS_ACCESSIBILITY_BEST_PRACTICES.html">
        <article>
          <h3>Maps Accessibility Best Practices</h3>
          <p>Accessible static and interactive maps, keyboard-operable controls, text alternatives, and indoor wayfinding guidance</p>
        </article>
      </a>
      <a class="card" href="./examples/TOOLTIP_ACCESSIBILITY_BEST_PRACTICES.html">
        <article>
          <h3>Tooltip Accessibility Best Practices</h3>
          <p>ARIA tooltip pattern, keyboard interaction, WCAG 1.4.13 compliance, mobile considerations, and design system references</p>
        </article>
      </a>
      <article class="card">
        <h3><a href="./examples/OPQUAST_DIGITAL_QUALITY_BEST_PRACTICES.html">Opquast Digital Quality Best Practices</a></h3>
        <p>245 rules across 14 categories covering accessibility, security, performance, privacy, ecodesign, and web quality — based on the <a href="https://checklists.opquast.com/en/digital-quality/">Opquast Digital Quality Checklist</a></p>
      </article>
      <a class="card" href="./examples/PROGRESSIVE_ENHANCEMENT_BEST_PRACTICES.html">
        <article>
          <h3>Progressive Enhancement Best Practices</h3>
          <p>Build accessible, resilient web experiences starting from a solid HTML foundation</p>
        </article>
      </a>
      <a class="card" href="./examples/ACCESSIBILITY_PROMPT_STARTER.html">
        <article>
          <h3>Prompt Starter</h3>
          <p>Ready-to-use AI prompts for common accessibility tasks in development workflows</p>
        </article>
      </a>
      <a class="card" href="./prompt-generator.html">
        <article>
          <h3>Prompt Generator Tool</h3>
          <p>Interactive tool to generate accessibility prompt templates for AI coding assistants</p>
        </article>
      </a>
      <a class="card" href="./action-playbook.html">
        <article>
          <h3>Action Playbook</h3>
          <p>Practical accessibility workflow guide</p>
        </article>
      </a>
      <a class="card" href="./ACCESSIBILITY.html">
        <article>
          <h3>Accessibility Commitment</h3>
          <p>Our accessibility standards and metrics</p>
        </article>
      </a>
      <a class="card" href="./SUSTAINABILITY.html">
        <article>
          <h3>Sustainability Policy</h3>
          <p>Digital sustainability and AI usage guidelines</p>
        </article>
      </a>
      <a class="card" href="./AGENTS.html">
        <article>
          <h3>AI Agent Instructions</h3>
          <p>AI coding assistant guidance for this project</p>
        </article>
      </a>
      <a class="card" href="./BROWSER_SUPPORT.html">
        <article>
          <h3>Browser Support Policy</h3>
          <p>Browser version support guarantees</p>
        </article>
      </a>
      <a class="card" href="./CONTRIBUTING.html">
        <article>
          <h3>Contributing Guide</h3>
          <p>How to contribute to this project</p>
        </article>
      </a>
      <a class="card" href="https://github.com/CivicActions/open-practice/blob/main/open-requirements-library/accessibility.md">
        <article>
          <h3>Procurement Requirements <span aria-label="(external site)">(↗)</span></h3>
          <p>Section 508 compliance requirements for government contracts and RFPs</p>
        </article>
      </a>
      <a class="card" href="./COMPARISON_WITH_KREERC.html">
        <article>
          <h3>Comparison with Similar Projects</h3>
          <p>Analysis of different approaches to accessibility documentation</p>
        </article>
      </a>
    </div>
  </div>
</section>

<section id="adopt">
  <div class="wrap">
    <h2>How to Adopt</h2>
    <div class="prose">
      <p>Follow these steps to implement ACCESSIBILITY.md in your project:</p>
    </div>
    <div class="steps">
      <article class="step">
        <h3>1. Copy the Template</h3>
        <p>Start with <a href="./ACCESSIBILITY-template.md">ACCESSIBILITY-template.md</a>, customize it for your project, and place it at your repository root. Link it from your README.</p>
      </article>
      <article class="step">
        <h3>2. Set Up GitHub Workflows</h3>
        <p>
          Copy workflows from the <a href="./examples/">examples/</a> directory. Start with <code>A11Y_SHIFT_LEFT_WORKFLOW.yml</code> for automated accessibility testing on every PR.
        </p>
      </article>
      <article class="step">
        <h3>3. Configure AI Agents</h3>
        <p>
          Add <a href="./AGENTS.html">AGENTS.md</a> or create <code>.cursorrules</code> to ensure AI coding assistants follow accessibility standards. Include component-specific best practices.
        </p>
      </article>
      <article class="step">
        <h3>4. Add Pre-Commit Hooks</h3>
        <p>
          Copy <code>PRE_COMMIT_ACCESSIBILITY_SAMPLE.yaml</code> to catch issues before they're committed. Optional but highly recommended.
        </p>
      </article>
      <article class="step">
        <h3>5. Copy Component Guides</h3>
        <p>
          Add relevant best practice guides for forms, SVGs, keyboard navigation, light/dark mode, user personalization, and diagrams from the examples directory.
        </p>
      </article>
      <article class="step">
        <h3>6. Keep it Living</h3>
        <p>Update ACCESSIBILITY.md as your project evolves. Track metrics, document gaps, and maintain your commitment to accessibility.</p>
      </article>
    </div>
    <div class="prose steps-footer">
      <p><strong>For detailed instructions, see the <a href="https://github.com/mgifford/ACCESSIBILITY.md#how-to-adopt-this-in-your-project">step-by-step adoption guide</a> in the README.</strong></p>
    </div>
  </div>
</section>