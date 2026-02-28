---
title: Audio/Video Accessibility Best Practices
---

# Audio/Video Accessibility Best Practices

This document defines accessibility requirements for audio and video content on the web, ensuring that all users can perceive, understand, and interact with multimedia regardless of sensory, cognitive, or physical abilities.

Multimedia accessibility is not optional. This guidance ensures compliance with WCAG 2.2 Level AA requirements and supports diverse user needs through captions, transcripts, audio descriptions, and accessible media player controls.

---

## 1. Core Principle

All users must be able to access the full meaning and experience of audio and video content through alternative formats and accessible controls. This includes people who are Deaf or hard of hearing, blind or low vision, and those with cognitive or motor disabilities.

---

## 2. Captions (Synchronized Text)

Captions provide synchronized text alternatives for audio content, making video accessible to people who are Deaf or hard of hearing, and beneficial to all users in sound-sensitive environments.

### Required for all video content with meaningful audio

- **Pre-recorded video**: Must provide synchronized captions (WCAG 2.2 Level A - 1.2.2)
- **Live video**: Must provide synchronized captions when technically feasible (WCAG 2.2 Level AA - 1.2.4)

### Caption quality requirements

- Accurate transcription of spoken dialogue
- Identification of speakers when not visually apparent
- Description of relevant non-speech sounds (e.g., [door slams], [phone rings], [applause])
- Proper punctuation and capitalization
- Synchronized timing with audio (not too fast or too slow)
- Readable presentation (sufficient contrast, appropriate font size)

### Caption format

Use WebVTT (`.vtt`) format for HTML5 video:

```html
<video controls>
  <source src="video.mp4" type="video/mp4">
  <track kind="captions" src="captions.vtt" srclang="en" label="English" default>
</video>
```

Example WebVTT file:

```
WEBVTT

00:00:00.000 --> 00:00:03.000
Welcome to our accessibility training.

00:00:03.500 --> 00:00:07.000
Today we'll learn about accessible media.

00:00:07.500 --> 00:00:10.000
[keyboard typing]
```

Avoid:

- Auto-generated captions without human review (often inaccurate)
- Open captions burned into video (prevents user customization)
- Captions that are too fast to read or poorly timed

---

## 3. Transcripts

Transcripts provide a complete text version of audio and video content, supporting users who cannot or prefer not to consume multimedia formats.

### Required for audio-only and video content

- **Audio-only (podcasts, recordings)**: Must provide text transcript (WCAG 2.2 Level A - 1.2.1)
- **Video**: Should provide text transcript in addition to captions (WCAG 2.2 Level AAA - 1.2.8, but recommended for AA)

### Transcript content

Include:

- Speaker identification
- All dialogue and narration
- Relevant non-speech sounds
- Description of important visual content (for video transcripts)

### Transcript placement

Make transcripts easy to find:

```html
<video controls>
  <source src="video.mp4" type="video/mp4">
  <track kind="captions" src="captions.vtt" srclang="en" label="English">
</video>

<details>
  <summary>Read full transcript</summary>
  <div class="transcript">
    <h3>Video Transcript</h3>
    <p><strong>Speaker 1:</strong> Welcome to our accessibility training.</p>
    <p><strong>Speaker 2:</strong> Today we'll learn about accessible media.</p>
    <p><em>[Sound of keyboard typing]</em></p>
  </div>
</details>
```

---

## 4. Audio Descriptions

Audio descriptions provide narration of important visual information for people who are blind or have low vision.

### Required when visual content is essential

- **Pre-recorded video**: Must provide audio descriptions or text alternative (WCAG 2.2 Level A - 1.2.3)
- **Pre-recorded video**: Should provide extended audio descriptions when pauses in audio are insufficient (WCAG 2.2 Level AA - 1.2.5)

### What to describe

- Actions, characters, scene changes
- On-screen text that is not spoken
- Visual cues essential to understanding
- Facial expressions and body language when relevant

### Audio description formats

1. **Standard audio description**: Narration fits into natural pauses
2. **Extended audio description**: Video pauses to allow for complete description
3. **Descriptive transcript**: Text description included in transcript

```html
<video controls>
  <source src="video.mp4" type="video/mp4">
  <track kind="captions" src="captions.vtt" srclang="en" label="English">
  <track kind="descriptions" src="descriptions.vtt" srclang="en" label="Audio descriptions">
</video>
```

---

## 5. Accessible Media Players

Use media players with full keyboard support and accessible controls. **Default recommendation: [Able Player](https://ableplayer.github.io/ableplayer/)**

### Why Able Player

Able Player is a fully accessible, cross-browser media player that supports:

- Full keyboard navigation
- Screen reader compatibility
- Captions with customizable styling
- Audio descriptions
- Interactive transcripts
- Sign language video
- Chapters and playback rate control

### Basic Able Player implementation

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <script src="https://cdn.jsdelivr.net/npm/ableplayer@latest/build/ableplayer.min.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ableplayer@latest/build/ableplayer.min.css">
</head>
<body>
  <video id="video1" data-able-player preload="auto" width="640" height="360">
    <source type="video/mp4" src="video.mp4">
    <track kind="captions" src="captions.vtt" srclang="en" label="English">
    <track kind="descriptions" src="descriptions.vtt" srclang="en" label="Audio descriptions">
  </video>
</body>
</html>
```

### Media player accessibility requirements

Any media player must provide:

- **Keyboard access**: All controls operable without a mouse
- **Focus indicators**: Visible focus on all interactive elements
- **Accessible names**: Clear labels for all buttons and controls
- **State announcements**: Play/pause, volume, progress communicated to screen readers
- **Caption controls**: Easy to enable/disable and customize captions
- **Playback controls**: Play, pause, volume, seek, fullscreen
- **Transcript integration**: Link or display transcript alongside video

### Example custom controls pattern

If implementing custom controls, ensure full accessibility:

```html
<div class="video-container">
  <video id="myVideo">
    <source src="video.mp4" type="video/mp4">
    <track kind="captions" src="captions.vtt" srclang="en" label="English">
  </video>
  
  <div class="controls" role="group" aria-label="Video controls">
    <button id="playPause" aria-label="Play">
      <span aria-hidden="true">▶</span>
    </button>
    <button id="mute" aria-label="Mute">
      <span aria-hidden="true">🔊</span>
    </button>
    <input type="range" id="volume" min="0" max="100" value="100" 
           aria-label="Volume" aria-valuemin="0" aria-valuemax="100" aria-valuenow="100">
    <button id="captions" aria-label="Toggle captions" aria-pressed="false">
      <span aria-hidden="true">CC</span>
    </button>
    <button id="fullscreen" aria-label="Fullscreen">
      <span aria-hidden="true">⛶</span>
    </button>
  </div>
</div>
```

Avoid:

- Mouse-only controls (must work with keyboard)
- Controls without accessible names
- Auto-playing videos with sound (WCAG 2.2 Level A - 1.4.2)
- Keyboard traps in media player UI

---

## 6. Autoplay and Motion

Respect user control over media playback and motion preferences.

### Autoplay restrictions

- **No autoplay with sound**: Videos must not autoplay with sound (WCAG 2.2 Level A - 1.4.2)
- **User control**: Provide mechanism to pause or stop autoplay
- **Exception**: Autoplay allowed if video is muted by default and captions are enabled

```html
<!-- Acceptable autoplay: muted, with captions -->
<video autoplay muted loop>
  <source src="background-video.mp4" type="video/mp4">
  <track kind="captions" src="captions.vtt" srclang="en" label="English" default>
</video>

<!-- Unacceptable: autoplay with sound -->
<video autoplay>
  <source src="video.mp4" type="video/mp4">
</video>
```

### Motion and animation

Respect `prefers-reduced-motion` preference:

```css
@media (prefers-reduced-motion: reduce) {
  video {
    animation: none;
  }
  
  /* Pause autoplay videos for users who prefer reduced motion */
  video[autoplay] {
    animation-play-state: paused;
  }
}
```

---

## 7. Audio-Only Content (Podcasts, Audio Recordings)

Audio-only content must provide text alternatives.

### Required elements

1. **Transcript**: Complete text version of audio content (WCAG 2.2 Level A - 1.2.1)
2. **Accessible player**: Controls must be keyboard accessible
3. **Time-stamped transcript**: Helpful for navigation (recommended)

### Audio player pattern

```html
<div class="audio-player">
  <audio id="podcast" controls>
    <source src="podcast.mp3" type="audio/mpeg">
    Your browser does not support the audio element.
  </audio>
  
  <a href="transcript.html">Read full transcript</a>
</div>
```

### Podcast accessibility checklist

- [ ] Provide complete transcript with speaker identification
- [ ] Include show notes with timestamps for key topics
- [ ] Use accessible media player with keyboard support
- [ ] Provide episode description and metadata
- [ ] Consider descriptive titles that convey content

---

## 8. Sign Language Interpretation

Sign language videos provide essential access for Deaf users whose primary language is sign language.

### When to provide sign language

- **Legal requirement**: Some jurisdictions require sign language for government content
- **Best practice**: Provide for important announcements, educational content, emergency information
- **User preference**: Some Deaf users prefer sign language over captions

### Sign language video implementation

Able Player supports sign language video overlays:

```html
<video data-able-player data-sign-lang="asl">
  <source type="video/mp4" src="main-video.mp4">
  <track kind="captions" src="captions.vtt" srclang="en" label="English">
  
  <!-- Sign language video -->
  <track kind="metadata" src="sign-language.vtt" data-sign-src="sign-language.mp4">
</video>
```

### Sign language video requirements

- High-quality video showing signer clearly
- Adequate contrast between signer and background
- Consistent lighting
- Full view of signer (face, hands, upper body)
- Appropriate signing space visible

---

## 9. Testing Expectations

Minimum checks for each audio/video implementation:

### Manual testing

- [ ] Navigate all media controls using keyboard only (Tab, Enter, Space, arrows)
- [ ] Verify screen reader announces all button labels and states
- [ ] Enable captions and verify they are accurate, synchronized, and readable
- [ ] Test with captions disabled - verify transcript is available
- [ ] Test audio descriptions (if applicable)
- [ ] Verify no autoplay with sound
- [ ] Check that video works at 200% zoom
- [ ] Test with different screen reader and browser combinations

### Automated testing

- Run axe-core or similar accessibility scanner
- Validate HTML5 video/audio element structure
- Check that all controls have accessible names
- Verify ARIA roles and properties if using custom controls
- Test keyboard focus order through controls

### Cross-platform testing

Test with:

- Windows: NVDA or JAWS with Chrome/Firefox
- macOS: VoiceOver with Safari
- Mobile: TalkBack (Android) or VoiceOver (iOS)
- Different browsers: Chrome, Firefox, Safari, Edge

---

## 10. Definition of Done

An audio/video implementation is complete when:

- All video content has synchronized captions
- All audio content has text transcripts
- Audio descriptions provided when visual content is essential
- Media player is fully keyboard accessible
- All controls have clear, accessible names
- No autoplay with sound (or user can easily stop/pause)
- Content tested with screen readers
- Captions are accurate and properly synchronized
- Transcripts are complete and easy to find
- No blocking accessibility defects remain

---

## References

### W3C Specifications and Guidance

- [W3C WAI: Making Audio and Video Media Accessible](https://www.w3.org/WAI/media/av/) - Comprehensive guidance on accessible multimedia
- [WCAG 2.2 Understanding 1.2.1 Audio-only and Video-only (Prerecorded)](https://www.w3.org/WAI/WCAG22/Understanding/audio-only-and-video-only-prerecorded.html)
- [WCAG 2.2 Understanding 1.2.2 Captions (Prerecorded)](https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded.html)
- [WCAG 2.2 Understanding 1.2.3 Audio Description or Media Alternative (Prerecorded)](https://www.w3.org/WAI/WCAG22/Understanding/audio-description-or-media-alternative-prerecorded.html)
- [WCAG 2.2 Understanding 1.2.4 Captions (Live)](https://www.w3.org/WAI/WCAG22/Understanding/captions-live.html)
- [WCAG 2.2 Understanding 1.2.5 Audio Description (Prerecorded)](https://www.w3.org/WAI/WCAG22/Understanding/audio-description-prerecorded.html)
- [WCAG 2.2 Understanding 1.4.2 Audio Control](https://www.w3.org/WAI/WCAG22/Understanding/audio-control.html)
- [HTML Living Standard: The video element](https://html.spec.whatwg.org/multipage/media.html#the-video-element)
- [WebVTT: The Web Video Text Tracks Format](https://www.w3.org/TR/webvtt1/)

### Machine-Readable Standards

For AI systems and automated tooling, see [wai-yaml-ld](https://github.com/mgifford/wai-yaml-ld) for structured accessibility standards:

- [WCAG 2.2 (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wcag-2.2-normative.yaml) - Machine-readable WCAG 2.2 normative content including media success criteria
- [HTML Living Standard Accessibility (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/html-living-standard-accessibility.yaml) - HTML media element accessibility
- [Standards Link Graph (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/standards-link-graph.yaml) - Relationships across WCAG/HTML media standards

### Tools and Resources

- [Able Player](https://ableplayer.github.io/ableplayer/) - Fully accessible HTML5 media player (recommended)
- [3Play Media](https://www.3playmedia.com/) - Professional captioning and transcription services
- [Described and Captioned Media Program (DCMP)](https://dcmp.org/) - Resources and accessible educational media
- [Access Media](https://access-media.org/) - Tools and resources for accessible digital media

### Additional Reading

- [WebAIM: Captions, Transcripts, and Audio Descriptions](https://webaim.org/articles/captions/)
- [Deque: Accessible Media Players](https://www.deque.com/blog/accessible-media-players/)
- [National Association of the Deaf: Captioning Standards](https://nad.org/)
- [BBC: Subtitle Guidelines](https://bbc.github.io/subtitle-guidelines/)

---

AGPL-3.0-or-later License - See LICENSE file for full text  
Copyright (c) 2026 Mike Gifford
