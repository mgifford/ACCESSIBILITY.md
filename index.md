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
        <p>Includes <a href="https://github.com/mgifford/wai-yaml-ld">wai-yaml-ld</a> for machine-readable WCAG standards</p>
      </article>
      <article class="card">
        <h3>Examples Index</h3>
        <p><a href="./examples/README.html">examples/README</a></p>
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
    </div>
  </div>
</section>

<section id="adopt">
  <div class="wrap">
    <h2>How to Adopt</h2>
    <div class="steps">
      <article class="step">
        <h3>1. Add ACCESSIBILITY.md</h3>
        <p>Create it at your repository root and link it from README.</p>
      </article>
      <article class="step">
        <h3>2. Document what matters</h3>
        <p>
          Include conformance, known gaps, test workflow, issue labels, and
          escalation policy.
        </p>
      </article>
      <article class="step">
        <h3>3. Enforce in CI</h3>
        <p>
          Wire accessibility checks and fail builds for high-severity
          regressions.
        </p>
      </article>
      <article class="step">
        <h3>4. Keep it living</h3>
        <p>Update this file as architecture, tooling, and gaps evolve.</p>
      </article>
    </div>
  </div>
</section>