---
title: Prompt Generator
---

<section>
  <div class="wrap">
    <h1>ACCESSIBILITY.md Prompt Generator</h1>
    <p class="lede">Create a copy-ready prompt for an LLM to draft your project’s ACCESSIBILITY.md file.</p>

    <div class="generator-grid">
      <form id="promptForm" class="card" aria-label="Prompt generator form">
        <h2>Project Inputs</h2>

        <label for="projectName">Project name</label>
        <input id="projectName" name="projectName" type="text" placeholder="My Project" />

        <label for="repoUrl">Repository URL (optional)</label>
        <input id="repoUrl" name="repoUrl" type="url" placeholder="https://github.com/org/repo" />

        <label for="productType">Product type</label>
        <input id="productType" name="productType" type="text" placeholder="WEB_APP / MOBILE / LIBRARY / DOCS / OTHER" />

        <label for="users">Main users</label>
        <input id="users" name="users" type="text" placeholder="Who uses this product?" />

        <label for="stack">Primary UI technologies</label>
        <input id="stack" name="stack" type="text" placeholder="React, Rails, native iOS, etc." />

        <label for="target">Accessibility target</label>
        <input id="target" name="target" type="text" placeholder="WCAG 2.2 AA" />

        <label for="notes">Optional context</label>
        <textarea id="notes" name="notes" rows="5" placeholder="Any constraints, known gaps, or compliance requirements"></textarea>

        <div class="cta-row">
          <button class="button primary" type="button" id="generateBtn">Generate Prompt</button>
          <button class="button secondary" type="button" id="copyBtn">Copy</button>
          <button class="button secondary" type="button" id="downloadBtn">Download ACCESSIBILITY_PROMPT.txt</button>
        </div>
      </form>

      <article class="code-card" aria-live="polite">
        <h2>Generated Prompt</h2>
        <pre id="promptOutput"><code>Click “Generate Prompt” to create your draft prompt.</code></pre>
      </article>
    </div>
  </div>
</section>

<script>
  const outputEl = document.getElementById("promptOutput");
  const form = document.getElementById("promptForm");

  function buildPrompt() {
    const data = new FormData(form);
    const projectName = data.get("projectName") || "[PROJECT_NAME]";
    const repoUrl = data.get("repoUrl") || "[REPO_URL]";
    const productType = data.get("productType") || "[WEB_APP / MOBILE / LIBRARY / DOCS / OTHER]";
    const users = data.get("users") || "[WHO USES THIS]";
    const stack = data.get("stack") || "[TECH STACK]";
    const target = data.get("target") || "[e.g., WCAG 2.2 AA]";
    const notes = data.get("notes") || "[OPTIONAL CONTEXT]";

    return `You are helping create an ACCESSIBILITY.md file for a software project.

Goal:
- Produce a practical first draft ACCESSIBILITY.md that is transparent, actionable, and easy for both humans and AI coding agents to follow.

Project context:
- Project name: ${projectName}
- Repository URL (optional): ${repoUrl}
- Product type: ${productType}
- Main users: ${users}
- Primary UI technologies: ${stack}
- Current accessibility target: ${target}
- Additional context: ${notes}

Process requirements:
1) If key information is missing, ask clarifying questions first (max 8).
2) If a repository URL is provided, infer reasonable defaults from visible docs, then clearly mark assumptions.
3) Keep language specific and operational, not generic policy text.
4) Include explicit sections for:
   - Conformance target and scope
   - Known gaps / current barriers
   - Assistive technology test matrix
   - Issue taxonomy and severity model
   - Definition of done for pull requests
   - CI/CD enforcement and automation checks
   - Exception handling and escalation path
   - How AI coding agents should use this file
5) Include a "Living Metrics" table with placeholders where data is unknown.
6) Output valid Markdown only.

Suggested clarifying questions to ask if needed:
- Which user journeys are highest priority for accessibility?
- What assistive technologies do you actively test with today?
- Which checks currently run in CI (if any)?
- Which issues should block release vs be tracked as debt?
- Who owns accessibility sign-off for UI changes?

Deliverables:
- First output: clarifying questions (if needed).
- Final output: complete ACCESSIBILITY.md draft.`;
  }

  document.getElementById("generateBtn").addEventListener("click", () => {
    outputEl.textContent = buildPrompt();
  });

  document.getElementById("copyBtn").addEventListener("click", async () => {
    const text = outputEl.textContent;
    if (!text) return;
    await navigator.clipboard.writeText(text);
  });

  document.getElementById("downloadBtn").addEventListener("click", () => {
    const text = outputEl.textContent;
    if (!text) return;
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ACCESSIBILITY_PROMPT.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });
</script>