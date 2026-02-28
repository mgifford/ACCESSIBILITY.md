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
      <article class="card">
        <h3>Axe Rule Coverage</h3>
        <p><a href="./examples/AXE_RULES_COVERAGE.html">examples/AXE_RULES_COVERAGE</a></p>
      </article>
      <article class="card">
        <h3>Shift-left Automation</h3>
        <p><a href="./examples/SHIFT_LEFT_ACCESSIBILITY_AUTOMATION.html">examples/SHIFT_LEFT_ACCESSIBILITY_AUTOMATION</a></p>
      </article>
      <article class="card">
        <h3>Trusted Sources</h3>
        <p><a href="./examples/TRUSTED_SOURCES.yaml">examples/TRUSTED_SOURCES.yaml</a></p>
        <p>Vetted accessibility resources with <a href="./.github/TRUSTED_SOURCES_MAINTENANCE.html">automated monthly maintenance</a></p>
        <p>Includes <a href="https://github.com/mgifford/wai-yaml-ld">wai-yaml-ld</a> for machine-readable WCAG standards</p>
      </article>
      <article class="card">
        <h3>Audio/Video Accessibility Best Practices</h3>
        <p><a href="./examples/AUDIO_VIDEO_ACCESSIBILITY_BEST_PRACTICES.html">examples/AUDIO_VIDEO_ACCESSIBILITY_BEST_PRACTICES</a></p>
      </article>
      <article class="card">
        <h3>Examples Index</h3>
        <p><a href="./examples/README.html">examples/README</a></p>
      </article>
      <article class="card">
        <h3>Light/Dark Mode Best Practices</h3>
        <p><a href="./examples/LIGHT_DARK_MODE_ACCESSIBILITY_BEST_PRACTICES.html">examples/LIGHT_DARK_MODE_ACCESSIBILITY_BEST_PRACTICES</a></p>
      </article>
      <article class="card">
        <h3>Manual Accessibility Testing Guide</h3>
        <p><a href="./examples/MANUAL_ACCESSIBILITY_TESTING_GUIDE.html">examples/MANUAL_ACCESSIBILITY_TESTING_GUIDE</a></p>
      </article>
      <article class="card">
        <h3>Prompt Starter</h3>
        <p><a href="./examples/ACCESSIBILITY_PROMPT_STARTER.html">examples/ACCESSIBILITY_PROMPT_STARTER</a></p>
      </article>
      <article class="card">
        <h3>Prompt Generator Tool</h3>
        <p><a href="./prompt-generator.html">Open the prompt generator</a></p>
      </article>
      <article class="card">
        <h3>Action Playbook</h3>
        <p><a href="./action-playbook.html">Practical accessibility workflow guide</a></p>
      </article>
      <article class="card">
        <h3>Accessibility Commitment</h3>
        <p><a href="./ACCESSIBILITY.html">ACCESSIBILITY.md - Our accessibility standards and metrics</a></p>
      </article>
      <article class="card">
        <h3>Sustainability Policy</h3>
        <p><a href="./SUSTAINABILITY.html">SUSTAINABILITY.md - Digital sustainability and AI usage</a></p>
      </article>
      <article class="card">
        <h3>AI Agent Instructions</h3>
        <p><a href="./AGENTS.html">AGENTS.md - AI coding assistant guidance</a></p>
      </article>
      <article class="card">
        <h3>Browser Support Policy</h3>
        <p><a href="./BROWSER_SUPPORT.html">BROWSER_SUPPORT.md - Browser version support guarantees</a></p>
      </article>
      <article class="card">
        <h3>Contributing Guide</h3>
        <p><a href="./CONTRIBUTING.html">CONTRIBUTING.md - How to contribute to this project</a></p>
      </article>
      <article class="card">
        <h3>Procurement Requirements</h3>
        <p><a href="https://github.com/CivicActions/open-practice/blob/main/open-requirements-library/accessibility.md">CivicActions Open Requirements Library</a></p>
        <p>Section 508 compliance requirements for government contracts and RFPs</p>
      </article>
      <article class="card">
        <h3>Comparison with Similar Projects</h3>
        <p><a href="./COMPARISON_WITH_KREERC.html">COMPARISON_WITH_KREERC.md - Analysis of different approaches to accessibility documentation</a></p>
      </article>
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
          Add relevant best practice guides for forms, SVGs, keyboard navigation, and diagrams from the examples directory.
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