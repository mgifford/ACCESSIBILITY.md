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
├── ACCESSIBILITY.skill             ← AI agent skill (global installation)
├── AGENTS.md                       ← AI agent instructions
│
├── examples/                       ← Copy these to your project
│   ├── A11Y_SHIFT_LEFT_WORKFLOW.yml
│   ├── PRE_COMMIT_ACCESSIBILITY_SAMPLE.yaml
│   ├── TRUSTED_SOURCES.yaml
│   ├── Component best practices (SVG, forms, keyboard, diagrams)
│   └── Automation guides (axe-core, shift-left testing)
│
├── skills/                         ← AI agent skills (install globally)
│   ├── opquast-digital-quality.skill  ← Downloadable ZIP archive
│   └── opquast-digital-quality/    ← Human-readable source
│
├── .github/workflows/              ← This repo's automation (reference)
├── _layouts/, _config.yml          ← Jekyll site (for documentation)
└── README.md                       ← Complete adoption guide</code></pre>
      <p>
        <strong>Key:</strong><br>
        ✅ Copy to your project: <code>ACCESSIBILITY-template.md</code>, files in <code>examples/</code><br>
        🤖 Install globally in AI agents: <code>ACCESSIBILITY.skill</code>, skills in <code>skills/</code><br>
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
      <a class="card" href="./examples/PRINT_ACCESSIBILITY_BEST_PRACTICES.html">
        <article>
          <h3>Print-Friendly Style Sheets Best Practices</h3>
          <p>CSS print media queries, page break control, link URL disclosure, typography for paper, and WCAG guidance for accessible printed documents</p>
        </article>
      </a>
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
      <a class="card" href="https://github.com/mgifford/ACCESSIBILITY.md/blob/main/ACCESSIBILITY.skill">
        <article>
          <h3>AI Agent Skill <span aria-label="(GitHub)">(↗)</span></h3>
          <p>Portable <code>.skill</code> file for global installation in Codex, Claude Code, and other AI coding assistants</p>
        </article>
      </a>
      <a class="card" href="https://github.com/mgifford/ACCESSIBILITY.md/blob/main/skills/opquast-digital-quality/SKILL.md">
        <article>
          <h3>Opquast Digital Quality Skill <span aria-label="(GitHub)">(↗)</span></h3>
          <p>Installable AI agent skill covering all 244 Opquast rules across 14 categories: content, security, forms, performance, and more</p>
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

<section id="skills">
  <div class="wrap">
    <h2>Skills</h2>
    <div class="prose">
      <p>
        Skills are portable AI agent instruction files. Each skill encodes a set of best practices,
        rules, and code patterns so that AI coding assistants (GitHub Copilot, Claude, Cursor, Codex,
        and others) automatically apply those standards when generating or reviewing code.
      </p>
      <p>
        Skills are stored in the <a href="https://github.com/mgifford/ACCESSIBILITY.md/tree/main/skills"><code>skills/</code> directory</a>.
        Each skill ships in two formats: a single downloadable <code>.skill</code> ZIP archive for easy
        installation, and an expanded directory of Markdown files for human review and contribution.
      </p>
    </div>
    <div class="cards">
      <article class="card">
        <h3><a href="https://github.com/mgifford/ACCESSIBILITY.md/tree/main/skills/ACCESSIBILITY-general">ACCESSIBILITY General</a></h3>
        <p>
          Learn to use the ACCESSIBILITY.md framework — when to load topic-specific skills, how to apply
          examples, and what the project's non-negotiable accessibility requirements are.
        </p>
        <p>
          <a href="https://github.com/mgifford/ACCESSIBILITY.md/blob/main/skills/ACCESSIBILITY-general.skill">Download <code>ACCESSIBILITY-general.skill</code></a>
          &nbsp;·&nbsp;
          <a href="https://github.com/mgifford/ACCESSIBILITY.md/blob/main/skills/ACCESSIBILITY-general/SKILL.md">Browse source</a>
        </p>
      </article>
      <article class="card">
        <h3><a href="https://github.com/mgifford/ACCESSIBILITY.md/tree/main/skills/anchor-links">Anchor Links</a></h3>
        <p>
          Create accessible in-page anchor links with meaningful text, reachable targets, visible focus
          indicators, and support for <code>prefers-reduced-motion</code>.
        </p>
        <p>
          <a href="https://github.com/mgifford/ACCESSIBILITY.md/blob/main/skills/anchor-links.skill">Download <code>anchor-links.skill</code></a>
          &nbsp;·&nbsp;
          <a href="https://github.com/mgifford/ACCESSIBILITY.md/blob/main/skills/anchor-links/SKILL.md">Browse source</a>
        </p>
      </article>
      <article class="card">
        <h3><a href="https://github.com/mgifford/ACCESSIBILITY.md/tree/main/skills/audio-video">Audio / Video</a></h3>
        <p>
          Provide captions, transcripts, and accessible controls for all audio and video content so
          every user can access the full meaning of multimedia.
        </p>
        <p>
          <a href="https://github.com/mgifford/ACCESSIBILITY.md/blob/main/skills/audio-video.skill">Download <code>audio-video.skill</code></a>
          &nbsp;·&nbsp;
          <a href="https://github.com/mgifford/ACCESSIBILITY.md/blob/main/skills/audio-video/SKILL.md">Browse source</a>
        </p>
      </article>
      <article class="card">
        <h3><a href="https://github.com/mgifford/ACCESSIBILITY.md/tree/main/skills/charts-graphs">Charts &amp; Graphs</a></h3>
        <p>
          Provide text alternatives that convey the same data and insights as every chart or graph,
          covering static images, SVGs, canvas, and JavaScript charting libraries.
        </p>
        <p>
          <a href="https://github.com/mgifford/ACCESSIBILITY.md/blob/main/skills/charts-graphs.skill">Download <code>charts-graphs.skill</code></a>
          &nbsp;·&nbsp;
          <a href="https://github.com/mgifford/ACCESSIBILITY.md/blob/main/skills/charts-graphs/SKILL.md">Browse source</a>
        </p>
      </article>
      <article class="card">
        <h3><a href="https://github.com/mgifford/ACCESSIBILITY.md/tree/main/skills/content-design">Content Design</a></h3>
        <p>
          Write clear, well-structured content at approximately Grade 8 reading level using plain language
          and logical organization for the widest possible audience.
        </p>
        <p>
          <a href="https://github.com/mgifford/ACCESSIBILITY.md/blob/main/skills/content-design.skill">Download <code>content-design.skill</code></a>
          &nbsp;·&nbsp;
          <a href="https://github.com/mgifford/ACCESSIBILITY.md/blob/main/skills/content-design/SKILL.md">Browse source</a>
        </p>
      </article>
      <article class="card">
        <h3><a href="https://github.com/mgifford/ACCESSIBILITY.md/tree/main/skills/forms">Forms</a></h3>
        <p>
          Build forms with associated labels, clear instructions, and error messages that work with
          assistive technologies, keyboard-only input, and varying cognitive needs.
        </p>
        <p>
          <a href="https://github.com/mgifford/ACCESSIBILITY.md/blob/main/skills/forms.skill">Download <code>forms.skill</code></a>
          &nbsp;·&nbsp;
          <a href="https://github.com/mgifford/ACCESSIBILITY.md/blob/main/skills/forms/SKILL.md">Browse source</a>
        </p>
      </article>
      <article class="card">
        <h3><a href="https://github.com/mgifford/ACCESSIBILITY.md/tree/main/skills/keyboard">Keyboard Interactions</a></h3>
        <p>
          Ensure all interactive elements are keyboard-accessible with visible focus indicators
          so every user can operate the interface without a mouse or touch input.
        </p>
        <p>
          <a href="https://github.com/mgifford/ACCESSIBILITY.md/blob/main/skills/keyboard.skill">Download <code>keyboard.skill</code></a>
          &nbsp;·&nbsp;
          <a href="https://github.com/mgifford/ACCESSIBILITY.md/blob/main/skills/keyboard/SKILL.md">Browse source</a>
        </p>
      </article>
      <article class="card">
        <h3><a href="https://github.com/mgifford/ACCESSIBILITY.md/tree/main/skills/light-dark-mode">Light / Dark Mode</a></h3>
        <p>
          Support light and dark themes with WCAG 2.2 AA color contrast in all modes — including
          <code>forced-colors</code> / high-contrast — using CSS custom properties.
        </p>
        <p>
          <a href="https://github.com/mgifford/ACCESSIBILITY.md/blob/main/skills/light-dark-mode.skill">Download <code>light-dark-mode.skill</code></a>
          &nbsp;·&nbsp;
          <a href="https://github.com/mgifford/ACCESSIBILITY.md/blob/main/skills/light-dark-mode/SKILL.md">Browse source</a>
        </p>
      </article>
      <article class="card">
        <h3><a href="https://github.com/mgifford/ACCESSIBILITY.md/tree/main/skills/maps">Maps</a></h3>
        <p>
          Provide text alternatives and keyboard-accessible controls for static and interactive maps
          so all users can access the essential geographic information.
        </p>
        <p>
          <a href="https://github.com/mgifford/ACCESSIBILITY.md/blob/main/skills/maps.skill">Download <code>maps.skill</code></a>
          &nbsp;·&nbsp;
          <a href="https://github.com/mgifford/ACCESSIBILITY.md/blob/main/skills/maps/SKILL.md">Browse source</a>
        </p>
      </article>
      <article class="card">
        <h3><a href="https://github.com/mgifford/ACCESSIBILITY.md/tree/main/skills/mermaid">Mermaid Diagrams</a></h3>
        <p>
          Add accessibility titles and descriptions to Mermaid diagrams so screen readers can convey
          the diagram's meaning using SVG output conforming to ARIA Pattern 11.
        </p>
        <p>
          <a href="https://github.com/mgifford/ACCESSIBILITY.md/blob/main/skills/mermaid.skill">Download <code>mermaid.skill</code></a>
          &nbsp;·&nbsp;
          <a href="https://github.com/mgifford/ACCESSIBILITY.md/blob/main/skills/mermaid/SKILL.md">Browse source</a>
        </p>
      </article>
      <article class="card">
        <h3><a href="https://github.com/mgifford/ACCESSIBILITY.md/tree/main/skills/opquast-digital-quality">Opquast Digital Quality</a></h3>
        <p>
          244 web quality rules across 14 categories — content, security, forms, performance, privacy,
          and more. Complements WCAG 2.2 as a holistic quality baseline.
        </p>
        <p>
          <a href="https://github.com/mgifford/ACCESSIBILITY.md/blob/main/skills/opquast-digital-quality.skill">Download <code>opquast-digital-quality.skill</code></a>
          &nbsp;·&nbsp;
          <a href="https://github.com/mgifford/ACCESSIBILITY.md/blob/main/skills/opquast-digital-quality/SKILL.md">Browse source</a>
        </p>
      </article>
      <article class="card">
        <h3><a href="https://github.com/mgifford/ACCESSIBILITY.md/tree/main/skills/print">Print Styles</a></h3>
        <p>
          Design print stylesheets that keep content useful, readable, and complete — because
          printing is an accessibility feature for many users.
        </p>
        <p>
          <a href="https://github.com/mgifford/ACCESSIBILITY.md/blob/main/skills/print.skill">Download <code>print.skill</code></a>
          &nbsp;·&nbsp;
          <a href="https://github.com/mgifford/ACCESSIBILITY.md/blob/main/skills/print/SKILL.md">Browse source</a>
        </p>
      </article>
      <article class="card">
        <h3><a href="https://github.com/mgifford/ACCESSIBILITY.md/tree/main/skills/progressive-enhancement">Progressive Enhancement</a></h3>
        <p>
          Build with semantic HTML first, then layer CSS and JavaScript enhancements so every user
          can access core content regardless of browser capability or network speed.
        </p>
        <p>
          <a href="https://github.com/mgifford/ACCESSIBILITY.md/blob/main/skills/progressive-enhancement.skill">Download <code>progressive-enhancement.skill</code></a>
          &nbsp;·&nbsp;
          <a href="https://github.com/mgifford/ACCESSIBILITY.md/blob/main/skills/progressive-enhancement/SKILL.md">Browse source</a>
        </p>
      </article>
      <article class="card">
        <h3><a href="https://github.com/mgifford/ACCESSIBILITY.md/tree/main/skills/svg">SVG Graphics</a></h3>
        <p>
          Make SVGs perceivable with accessible names and descriptions so screen reader users receive
          the same information as sighted users.
        </p>
        <p>
          <a href="https://github.com/mgifford/ACCESSIBILITY.md/blob/main/skills/svg.skill">Download <code>svg.skill</code></a>
          &nbsp;·&nbsp;
          <a href="https://github.com/mgifford/ACCESSIBILITY.md/blob/main/skills/svg/SKILL.md">Browse source</a>
        </p>
      </article>
      <article class="card">
        <h3><a href="https://github.com/mgifford/ACCESSIBILITY.md/tree/main/skills/tooltips">Tooltips</a></h3>
        <p>
          Create keyboard-accessible tooltips with supplementary content that works for all input methods
          and is not the sole source of critical information.
        </p>
        <p>
          <a href="https://github.com/mgifford/ACCESSIBILITY.md/blob/main/skills/tooltips.skill">Download <code>tooltips.skill</code></a>
          &nbsp;·&nbsp;
          <a href="https://github.com/mgifford/ACCESSIBILITY.md/blob/main/skills/tooltips/SKILL.md">Browse source</a>
        </p>
      </article>
      <article class="card">
        <h3><a href="https://github.com/mgifford/ACCESSIBILITY.md/tree/main/skills/user-personalization">User Personalization</a></h3>
        <p>
          Enable user preference controls — font size, contrast, motion — without using accessibility
          overlays as a substitute for proper accessible design.
        </p>
        <p>
          <a href="https://github.com/mgifford/ACCESSIBILITY.md/blob/main/skills/user-personalization.skill">Download <code>user-personalization.skill</code></a>
          &nbsp;·&nbsp;
          <a href="https://github.com/mgifford/ACCESSIBILITY.md/blob/main/skills/user-personalization/SKILL.md">Browse source</a>
        </p>
      </article>
    </div>
    <div class="prose steps-footer">
      <p><strong>For installation instructions, see the <a href="https://github.com/mgifford/ACCESSIBILITY.md/tree/main/skills#how-to-use-these-skills">skills README</a>.</strong></p>
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
          Install <a href="https://github.com/mgifford/ACCESSIBILITY.md/blob/main/ACCESSIBILITY.skill"><code>ACCESSIBILITY.skill</code></a> globally in Codex, Claude Code, or other AI coding assistants. Or copy <a href="./AGENTS.html">AGENTS.md</a> / create <code>.cursorrules</code> for project-level configuration.
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