# Audio/Video Accessibility Skill

> **Canonical source**: `examples/AUDIO_VIDEO_ACCESSIBILITY_BEST_PRACTICES.md`
> This skill is derived from that file. When in doubt, the example is authoritative.

Apply these rules when implementing or reviewing any audio or video content.

---

## Core Mandate

All users must access the full meaning of multimedia through alternative formats and accessible controls — including people who are Deaf/hard of hearing, blind/low vision, or have cognitive or motor disabilities.

---

## Required: Captions

**Pre-recorded video with audio**: synchronized captions required (WCAG 1.2.2 Level A)
**Live video**: captions required where technically feasible (WCAG 1.2.4 Level AA)

Use WebVTT format:
```html
<video controls>
  <source src="video.mp4" type="video/mp4">
  <track kind="captions" src="captions.vtt" srclang="en" label="English" default>
</video>
```

Caption quality requirements:
- Accurate transcription of all dialogue
- Speaker identification when not visually apparent
- Relevant non-speech sounds: `[door slams]`, `[applause]`
- Proper punctuation, capitalization, and synchronized timing
- Never use auto-generated captions without human review

---

## Required: Transcripts

**Audio-only** (podcasts, recordings): text transcript required (WCAG 1.2.1 Level A)
**Video**: transcript strongly recommended alongside captions

```html
<details>
  <summary>Read full transcript</summary>
  <div class="transcript">
    <h3>Video Transcript</h3>
    <p><strong>Speaker 1:</strong> Welcome to our accessibility training.</p>
    <p><em>[Sound of keyboard typing]</em></p>
  </div>
</details>
```

Transcript must include: speaker identification, all dialogue, relevant non-speech sounds, description of important visual content (for video).

---

## Required: Audio Descriptions

**Pre-recorded video**: audio descriptions or text alternative required (WCAG 1.2.3 Level A, 1.2.5 Level AA)

```html
<video controls>
  <source src="video.mp4" type="video/mp4">
  <track kind="captions" src="captions.vtt" srclang="en" label="English">
  <track kind="descriptions" src="descriptions.vtt" srclang="en" label="Audio descriptions">
</video>
```

Describe: actions, characters, scene changes, on-screen text not spoken, visual cues essential to understanding.

---

## Required: Accessible Media Player

**Default recommendation: [Able Player](https://ableplayer.github.io/ableplayer/)**

```html
<video id="video1" data-able-player preload="auto" width="640" height="360">
  <source type="video/mp4" src="video.mp4">
  <track kind="captions" src="captions.vtt" srclang="en" label="English">
  <track kind="descriptions" src="descriptions.vtt" srclang="en" label="Audio descriptions">
</video>
```

Any media player must provide:
- Full keyboard access for all controls
- Visible focus indicators on all interactive elements
- Accessible names/labels for all buttons
- Play/pause/volume/seek/fullscreen state announced to screen readers
- Caption enable/disable and customization
- Transcript link or inline display

---

## Required: Custom Controls Pattern

If implementing custom controls:
```html
<div class="controls" role="group" aria-label="Video controls">
  <button id="playPause" aria-label="Play">
    <span aria-hidden="true">▶</span>
  </button>
  <input type="range" id="volume" min="0" max="100" value="100"
         aria-label="Volume" aria-valuemin="0" aria-valuemax="100" aria-valuenow="100">
  <button id="captions" aria-label="Enable captions" aria-pressed="false">CC</button>
</div>
```

Update `aria-label` on play/pause button when state changes ("Pause" when playing).
Update `aria-valuenow` on range inputs as value changes.

---

## Definition of Done Checklist

- [ ] Synchronized captions on all pre-recorded video with audio
- [ ] Auto-generated captions reviewed and corrected by a human
- [ ] Text transcript for all audio-only content
- [ ] Audio descriptions for pre-recorded video
- [ ] Accessible media player (Able Player recommended)
- [ ] All controls keyboard operable with visible focus
- [ ] Play/pause/volume state announced to screen readers
- [ ] Captions can be enabled/disabled and customized

---

## Key WCAG Criteria

- 1.2.1 Audio-only and Video-only (A)
- 1.2.2 Captions Pre-recorded (A)
- 1.2.3 Audio Description or Media Alternative (A)
- 1.2.4 Captions Live (AA)
- 1.2.5 Audio Description Pre-recorded (AA)

---

## References

- [Full best practices guide](../../examples/AUDIO_VIDEO_ACCESSIBILITY_BEST_PRACTICES.md)
- [Curated reference sources](references/references.md)
- [Able Player](https://ableplayer.github.io/ableplayer/)
