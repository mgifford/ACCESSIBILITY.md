---
title: Audio and Video Accessibility Best Practices
---

# Audio and Video Accessibility Best Practices

## Purpose

Accessible media provides equivalent access to speech, sound, visual
information, and playback controls. The required alternatives depend on
whether the media is audio-only, video-only, synchronized audio and video,
prerecorded, or live.

This guide covers captions, transcripts, audio description, sign languages,
media players, autoplay, motion, flashing, embedded players, live events,
metadata, and testing. It targets WCAG 2.2 Level AA while identifying relevant
Level AAA provisions and inclusive practices that go beyond minimum
conformance.

## Core Principles

1. Plan captions, description, transcripts, and sign-language access before
   production begins.
2. Match each alternative to the information available through the original
   audio and visual tracks.
3. Use qualified human review. Unreviewed automatic output is not an accessible
   final deliverable.
4. Keep alternatives easy to find next to the media.
5. Use a media player whose complete interface is keyboard, touch, speech, and
   assistive-technology accessible.
6. Give users control over playback, sound, captions, description, speed, and
   motion.
7. Do not autoplay audible media.
8. Do not treat muted autoplay as exempt from motion and pause requirements.
9. Preserve alternatives when media is embedded, translated, archived, or
   moved to another platform.
10. Test the content of the alternatives and the operation of the player.

## Determine What the Media Requires

The WCAG time-based media criteria are cumulative. Level AA includes the
applicable Level A requirements.

| Media type | WCAG Level A | WCAG Level AA | Level AAA or additional practice |
|---|---|---|---|
| Prerecorded audio-only | Alternative for time-based media, normally a transcript | No additional criterion in Guideline 1.2 | Enhanced presentation and navigation as useful |
| Prerecorded video-only | Alternative for time-based media or an equivalent audio track | No additional criterion in Guideline 1.2 | Media alternative under 1.2.8 |
| Prerecorded synchronized audio and video | Captions; audio description or a full media alternative | Audio description | Sign-language interpretation, extended audio description when needed, and a media alternative |
| Live synchronized audio and video | No Level A caption criterion | Live captions | Additional language and description services based on audience needs |
| Live audio-only | No Level A or AA media-alternative criterion | No additional criterion in Guideline 1.2 | Equivalent live alternative under 1.2.9 |

This matrix is a starting point. Procurement terms, organizational policy,
contracts, and applicable law may require more than WCAG AA.

### Media that is already an alternative for text

Several prerecorded criteria have a narrow exception when the media is an
alternative for text and is clearly labeled as such. Use this only when the
adjacent text already provides all equivalent information and functionality.
Do not label primary media as an alternative merely to avoid captions,
description, or a transcript.

### No meaningful audio or visual information

- Video with no meaningful audio does not need captions for silence or
  decorative background music.
- Audio with no speech can still need a transcript when meaningful sound
  communicates information.
- Decorative video conveys no information, but continuous motion can still
  require pause controls.
- If all important visual information is already spoken in the main audio, no
  additional audio description is needed.

Document these decisions during content review rather than assuming that every
file with a video extension has identical requirements.

## Captions

Captions are synchronized text for the speech and non-speech audio information
needed to understand synchronized media.

- Prerecorded synchronized media requires captions at Level A under WCAG
  1.2.2, subject to the media-alternative exception.
- Live synchronized media requires captions at Level AA under WCAG 1.2.4.
- The live-caption requirement is not qualified by a general "technically
  feasible" exception.
- Prerecorded audio-only media requires a transcript at Level A. Captions for
  an audio-only player can still help users follow along, but they are not the
  Level A requirement.

### Caption content and quality

Captions must include:

- complete spoken dialogue and narration;
- speaker identification when it is not otherwise clear;
- meaningful sound effects and music cues;
- punctuation, capitalization, and spelling that preserve meaning;
- timing synchronized with the audio;
- readable cue duration and line breaks;
- placement that avoids covering important visual information; and
- the same human language as the original media for WCAG conformance.

Do not remove words, simplify technical language, or censor content in a way
that changes meaning. Caption quality needs contextual human judgment, not only
an automated accuracy percentage.

### Automatic captions

Automatic speech recognition can create a draft. For prerecorded media, a
qualified person must review the complete file against the audio and correct:

- substitutions, omissions, and invented words;
- names, technical terms, and numbers;
- missing negation;
- speaker changes;
- punctuation and segmentation;
- meaningful sounds; and
- synchronization.

For live media, use trained real-time captioners or a monitored service capable
of meeting the event's needs. Plan a fallback for service or network failure.
When a recording is published afterward, edit the live captions for accuracy
and timing.

### Closed and open captions

Closed captions can be turned on and off and can often be customized by the
user. Prefer them when the delivery platform supports them reliably.

Open captions are permanently rendered in the video. They are a recognized
WCAG technique and can be appropriate when closed captions are unavailable.
Their disadvantages are that users cannot turn them off, resize them
independently, change their presentation, or move them away from important
visuals.

Do not categorically reject open captions. Choose a delivery method that
provides accurate, synchronized, readable captions in the actual player and
platform.

### Captions and translated subtitles

Use `kind="captions"` for a track that includes dialogue and meaningful
non-speech audio. Use `kind="subtitles"` for translated dialogue. A translated
track can include non-speech information, but subtitles that contain only
dialogue are not a replacement for captions in the original media language.

### HTML and WebVTT example

```html
<figure>
  <video controls preload="metadata" playsinline poster="training-poster.jpg">
    <source src="accessibility-training.mp4" type="video/mp4">
    <track kind="captions"
           src="accessibility-training.en.vtt"
           srclang="en"
           label="English captions"
           default>
    <track kind="subtitles"
           src="accessibility-training.fr.vtt"
           srclang="fr"
           label="Sous-titres français">
    <track kind="chapters"
           src="accessibility-training.chapters.en.vtt"
           srclang="en"
           label="English chapters">
    <p>
      Your browser cannot play this video.
      <a href="accessibility-training.mp4">Download the video</a>.
    </p>
  </video>
  <figcaption>Accessibility testing training, 18 minutes.</figcaption>
</figure>

<p>
  <a href="accessibility-training-transcript.html">Read the descriptive transcript</a>
  or
  <a href="accessibility-training-described.html">watch the described version</a>.
</p>
```

Use only one `default` track of a given kind. Confirm that the player's caption
menu exposes every language with an understandable label. A chapter track is a
navigation enhancement and depends on player support.

Serve WebVTT as UTF-8 with the correct `text/vtt` media type. If a track is
hosted on another origin, configure cross-origin access correctly and test the
built page.

Example WebVTT captions:

```vtt
WEBVTT

00:00:00.000 --> 00:00:03.200
<v Maya Chen>Welcome to accessibility testing.

00:00:03.500 --> 00:00:06.800
<v Sam Rivera>We will start with keyboard navigation.

00:00:07.100 --> 00:00:09.200
[keyboard keys clicking]
```

Validate the file and watch the entire video with captions enabled. Syntax
validation cannot establish accuracy or usability.

### Caption presentation

- Caption text must meet applicable text-contrast requirements.
- Do not communicate speaker identity through color alone.
- Avoid placing captions over names, controls, charts, demonstrations, or
  other information.
- Allow user caption preferences when the player and platform support them.
- Test zoom, full screen, picture-in-picture, narrow viewports, and long
  translations.
- Do not reduce caption size simply to fit more words into a cue.

## Transcripts and Media Alternatives

A basic transcript contains the speech and meaningful non-speech audio. A
descriptive transcript also contains the visual information needed to
understand the video.

### When a transcript is required

- Prerecorded audio-only media needs an equivalent alternative at Level A,
  normally a transcript.
- Prerecorded video-only media needs an alternative for time-based media or an
  equivalent audio track at Level A.
- At Level A, a complete media alternative is one option for prerecorded
  synchronized media under 1.2.3.
- At Level AA, a transcript does not replace the audio description required by
  1.2.5.
- A full media alternative for prerecorded synchronized and video-only media is
  Level AAA under 1.2.8.

Provide a descriptive transcript as an inclusive practice even when it is not
the selected conformance technique. It supports people who are DeafBlind,
people who prefer text, translation, search, study, low-bandwidth access, and
content reuse.

### Transcript content

Include, in the same sequence as the media:

- title and relevant metadata;
- speaker names;
- all dialogue and narration;
- meaningful sound and music information;
- important on-screen text;
- visual actions, expressions, demonstrations, charts, and scene changes when
  producing a descriptive transcript; and
- equivalent instructions and links for any interaction in the media.

The transcript must preserve meaning and functionality, not only provide a
rough summary.

### Transcript presentation

Publish the transcript as accessible HTML whenever possible. Place a clearly
named link immediately before or after the player.

```html
<section aria-labelledby="transcript-heading">
  <h2 id="transcript-heading">Transcript: Keyboard testing demonstration</h2>

  <p><strong>Maya Chen:</strong> Open the page and press the Tab key.</p>

  <p>
    <strong>Visual description:</strong>
    A blue focus outline appears around the Skip to main content link.
  </p>

  <p><strong>Sam Rivera:</strong> The first focusable control is the skip link.</p>

  <p><em>[Keyboard keys clicking]</em></p>
</section>
```

- Use headings, paragraphs, lists, tables, and links according to their
  meaning.
- Make the text searchable, selectable, zoomable, and printable.
- Do not provide the transcript only as an inaccessible PDF or image.
- Do not put a full transcript in an `aria-label`, tooltip, or visually hidden
  element.
- Keep transcript corrections synchronized with caption and media revisions.

### Interactive transcripts

Interactive transcripts can highlight the current passage and let users seek
to a timestamp. They are enhancements, not substitutes for a complete linear
transcript.

- Use buttons for actions that seek playback.
- Give each seek control an understandable time and topic.
- Do not move keyboard focus as playback advances.
- Do not force automatic scrolling that users cannot pause.
- Respect reduced-motion preferences for scrolling and highlighting.
- Preserve reading and copying when JavaScript is unavailable.

## Audio Description

Audio description communicates visual information that is needed to understand
prerecorded video, such as actions, scene changes, expressions, demonstrations,
charts, and on-screen text that is not already spoken.

### WCAG levels

- At Level A, WCAG 1.2.3 permits either audio description or a complete media
  alternative for prerecorded synchronized media.
- At Level AA, WCAG 1.2.5 requires audio description for prerecorded video
  content in synchronized media.
- A Level A transcript choice does not remove the Level AA audio-description
  requirement.
- Extended audio description under 1.2.7 is Level AAA. It is needed at that
  level when pauses in the main audio are insufficient to convey the necessary
  visual information.
- If the main audio already communicates all important visual information, no
  additional description is necessary.

### Plan description during production

Integrated description is often the clearest approach. Write scripts and plan
shots so speakers naturally state names, read important on-screen text, explain
charts, and describe demonstrations. This can reduce the amount of separate
description needed without making the main narration awkward.

Description should be objective, concise, timed around important dialogue, and
written by people with appropriate expertise. Review it with blind and
low-vision users.

### Delivery options

Use an accessibility-supported method in the actual platform:

- a user-selectable secondary audio track;
- a separate version with description mixed into the soundtrack;
- integrated description in the main program; or
- an extended described version that pauses the video when more time is
  required.

Provide an obvious control or adjacent link such as "Watch with audio
description." Preserve captions in the described version.

HTML defines a descriptions text track:

```html
<track kind="descriptions"
       src="accessibility-training.descriptions.en.vtt"
       srclang="en"
       label="English descriptions">
```

This technique depends on browser, player, and assistive-technology support and
is advisory in current WCAG techniques. Do not rely on it without testing.
Provide a supported selectable track or described version when the user's
player cannot present the descriptions audibly.

## Sign-Language Interpretation

WCAG 1.2.6 Sign Language (Prerecorded) is Level AAA for prerecorded audio in
synchronized media. Sign-language access may also be required by policy,
contract, jurisdiction, or audience needs.

Sign language is not universal. Identify the language, such as ASL, BSL, LSQ,
or another language appropriate for the audience.

- Use qualified interpreters or native signers appropriate to the content.
- Keep the signer's face, hands, body, and signing space visible.
- Use adequate resolution, contrast, lighting, and frame rate.
- Synchronize interpretation with the program.
- Keep captions and overlays from obscuring the signer.
- Let users select, resize, or reposition the sign-language view where the
  player supports it.
- Review the result with Deaf sign-language users.

Sign-language interpretation supplements rather than replaces captions.
Do not use invented `<track>` metadata conventions unless the selected player
documents and supports them.

## Native HTML Players

Start with native `<audio>` and `<video>` controls when they provide the
features and accessibility support the project needs. Native controls reduce
custom code, but their features and presentation vary by browser and device.
Test them rather than assuming they are sufficient.

### Audio-only example

```html
<figure>
  <figcaption>Episode 12: Testing with screen magnification, 34 minutes</figcaption>
  <audio controls preload="metadata"
         aria-label="Episode 12: Testing with screen magnification">
    <source src="episode-12.mp3" type="audio/mpeg">
    <p>
      Your browser cannot play this audio.
      <a href="episode-12.mp3">Download the episode</a>.
    </p>
  </audio>
</figure>

<p><a href="episode-12-transcript.html">Read the Episode 12 transcript</a>.</p>
```

The visible title and accessible name agree. The transcript remains available
without operating the player.

### Do not publish incomplete custom controls

Custom media controls are a complex widget. A row of visually styled buttons
is not an accessible player unless the complete behavior, state, timing,
captions, description, seeking, and full-screen interaction are implemented
and tested.

When native controls are insufficient, evaluate established players against
the requirements below. Do not designate one library as universally
accessible. Pin dependency versions, review updates, and test the rendered
interface with the project's content.

## Media Player Requirements

### Controls and state

A player must provide accessible controls for all supported functions,
including as applicable:

- play and pause;
- stop when needed;
- elapsed time and duration;
- seeking forward and backward;
- volume and mute;
- captions and caption-language selection;
- audio-description selection;
- playback speed;
- chapters;
- full screen and exit full screen;
- picture-in-picture when offered; and
- transcript display when integrated.

Use native buttons, ranges, menus, and dialogs where possible. Every control
needs an accessible name, role, state, and value.

- A play button can change its accessible name to "Pause" while playing.
- A caption toggle can use `aria-pressed` when it is truly a two-state toggle.
- A timeline needs an accessible name, minimum, maximum, current value, and a
  useful text value such as elapsed time.
- Do not announce every `timeupdate` event through a live region.
- Keep visible labels in accessible names for speech input.
- Do not communicate selected tracks or muted state through color alone.

### Keyboard interaction

- Every control is reachable in a logical tab order.
- `Enter` and `Space` operate buttons according to native behavior.
- Arrow keys operate range inputs and documented composite widgets.
- Focus is never trapped in the player or full-screen interface.
- Focus remains visible and is not obscured by auto-hiding controls.
- Entering and leaving full screen preserves a logical focus location.
- Controls do not disappear while they or their descendants have focus.

If the player provides single-character shortcuts, meet WCAG 2.1.4 by allowing
users to turn them off, remap them, or limiting them to when the relevant
component has focus. Do not intercept keys while a user is typing in a field.

### Visual and touch operation

- Text and icons meet applicable contrast requirements.
- Control boundaries and states meet non-text contrast when required.
- Controls reflow and remain available at 400 percent zoom.
- Touch targets meet WCAG 2.5.8 or a documented exception.
- Visible labels and icons remain understandable in forced-colors mode.
- Pointer hover is not required to reveal the only path to controls.
- Auto-hiding controls meet Content on Hover or Focus requirements and never
  hide the focused control.

### Captions and description controls

- Caption controls are easy to find without starting playback.
- The current caption language and on or off state are programmatically
  determinable.
- Users can select description without finding a separate inaccessible player.
- Changing a track does not reset playback unexpectedly.
- Caption and description preferences persist when the product promises that
  behavior.

## Embedded and Third-Party Players

The content owner remains responsible for the experience delivered through an
embedded service.

```html
<iframe
  src="https://media.example.org/embed/accessibility-training"
  title="Video: Accessibility testing training"
  allowfullscreen>
</iframe>

<p>
  <a href="accessibility-training-transcript.html">Read the descriptive transcript</a>.
</p>
```

Check that:

- the iframe has a concise title identifying its content;
- keyboard users can enter, operate, and leave the player;
- controls have correct names, states, and focus indicators;
- captions are published, accurate, and selectable;
- audio description is available through an accessible path;
- autoplay, advertisements, consent prompts, and full-screen controls remain
  accessible;
- transcript and described-version links remain available outside the iframe;
  and
- privacy or cookie overlays do not block media controls.

Do not rely on a vendor's accessibility claim or conformance report without
testing the configured player and current version.

## Autoplay and Audio Control

Project requirement: do not autoplay audible media. Let users choose when
sound begins.

WCAG 1.4.2 does not literally ban every instance of autoplay audio. It requires
a mechanism to pause or stop audio that plays automatically for more than three
seconds, or an independent control for its volume. The stricter no-audible-
autoplay rule avoids interfering with screen reader speech and prevents users
from having to locate a stop control while sound is already playing.

Muted autoplay does not resolve every issue:

- meaningful audio is unavailable while muted;
- moving content can distract or cause physical symptoms;
- content that moves for more than five seconds in parallel with other content
  can require a pause, stop, or hide mechanism under WCAG 2.2.2; and
- users who request reduced motion should not receive automatic decorative
  motion.

Do not state that muted autoplay is automatically acceptable merely because a
caption track exists.

## Decorative Background Video

Avoid background video when a static image communicates the same design. If it
is retained:

- it conveys no information;
- it is muted;
- it has a static poster or fallback;
- it does not autoplay for users who request reduced motion;
- it has an always-available play or pause control; and
- it meets flashing requirements.

```html
<div class="hero-media">
  <video id="background-video"
         muted
         loop
         playsinline
         preload="metadata"
         poster="background-still.jpg"
         aria-hidden="true">
    <source src="background-video.mp4" type="video/mp4">
  </video>

  <button type="button"
          id="background-video-toggle"
          aria-controls="background-video">
    Play background video
  </button>
</div>
```

```js
const backgroundVideo = document.getElementById('background-video');
const backgroundToggle = document.getElementById('background-video-toggle');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function updateBackgroundVideoButton() {
  backgroundToggle.textContent = backgroundVideo.paused
    ? 'Play background video'
    : 'Pause background video';
}

backgroundToggle.addEventListener('click', async () => {
  if (backgroundVideo.paused) {
    try {
      await backgroundVideo.play();
    } catch (error) {
      backgroundToggle.textContent = 'Background video unavailable';
      return;
    }
  } else {
    backgroundVideo.pause();
  }

  updateBackgroundVideoButton();
});

reduceMotion.addEventListener('change', (event) => {
  if (event.matches) {
    backgroundVideo.pause();
    updateBackgroundVideoButton();
  }
});

if (!reduceMotion.matches) {
  backgroundVideo.play()
    .then(updateBackgroundVideoButton)
    .catch(() => {
      backgroundToggle.textContent = 'Background video unavailable';
    });
}
```

CSS `animation-play-state` does not pause an HTML video. Control media playback
through the media element API. Do not automatically restart motion when a user
changes preferences or has manually paused it.

If the video communicates information, remove `aria-hidden="true"` and provide
all applicable alternatives. A decorative label does not make informative
content decorative.

## Motion, Flashing, and Background Audio

- Keep flashes within the WCAG 2.3.1 threshold. Avoid flashing content when it
  is not essential.
- Do not use strobing transitions around media controls.
- Avoid parallax, zooming, and animated player chrome that is unrelated to
  playback.
- Respect `prefers-reduced-motion` for authored animation and automatic media.
- Provide pause controls for moving content covered by WCAG 2.2.2.
- Keep foreground speech clear of unnecessary background audio.
- Consider the Level AAA Low or No Background Audio criterion when producing
  speech-focused content.

Reduced motion is not a substitute for flashing analysis, pause controls, or
user-controlled playback.

## Live Media and Events

Live synchronized media requires captions at WCAG AA.

Plan before the event:

- contract and schedule captioning services;
- provide captioners with names, terminology, scripts, slides, and run-of-show
  materials;
- test caption display in the actual player and event platform;
- verify the caption language and speaker identification;
- provide a backup communication path for caption failure;
- ensure audience questions, chat, polls, and controls are keyboard and screen
  reader accessible;
- explain how to request accessibility support; and
- rehearse with interpreters and describers when those services are provided.

Monitor caption availability and quality throughout the event. A caption badge
or vendor setting is not proof that attendees are receiving usable captions.

WCAG 1.2.4 is intended for live synchronized broadcasts. It is not a blanket
requirement that a communications application caption every private two-way
call regardless of participant needs. Hosts and content providers must provide
the access required for their event and users.

When publishing an archive:

- correct live captions;
- add or revise description;
- publish the transcript;
- remove inaccessible temporary chat or polling artifacts; and
- retest the recording as prerecorded media.

## Languages and Metadata

Before the player, provide visible information that helps users decide whether
and how to use the media:

- descriptive title;
- short purpose or summary;
- duration;
- spoken and sign languages;
- availability and languages of captions;
- availability of audio description and transcript;
- relevant content warnings; and
- date or version when the media can become outdated.

Set the page and language-of-parts markup correctly. Caption, description, and
media-alternative language normally matches the original human language.
Translated subtitles and translated transcripts are additional language
versions and should be labeled accurately.

Do not use flags as the only language labels. Name languages in text.

## Production Workflow

### Before recording

- Classify the planned media type and WCAG requirements.
- Budget for captioning, description, transcripts, interpretation, and QA.
- Include important visual information in the script where natural.
- Avoid unnecessary background audio and flashing visuals.
- Choose a player and publishing platform that supports the required tracks.
- Identify terminology, names, and pronunciation for captioners and
  interpreters.

### During production

- Record clean speech with adequate volume and limited background noise.
- State important names, titles, URLs, and chart conclusions aloud.
- Leave pauses for standard audio description where possible.
- Keep essential text visible long enough to perceive.
- Frame signers and demonstrations clearly.
- Avoid placing important visuals where captions or controls will cover them.

### Before publication

- Review captions against the final audio.
- Review transcript and description against the final edit.
- Verify every language and track label.
- Test the final encoded media, not only production files.
- Test third-party embeds without an authenticated editor session.
- Confirm alternatives remain available if the player fails.
- Record the reviewer, date, media version, and issues requiring follow-up.

## Testing

### Caption testing

Watch the complete media with captions enabled and audio available for
comparison.

- Verify every spoken word needed for meaning.
- Check names, numbers, technical terms, and negation.
- Confirm speakers and meaningful sounds are identified.
- Check synchronization, cue order, line breaks, and duration.
- Confirm captions do not obscure important visual content.
- Test every language and full-screen presentation.
- Confirm user caption settings are not unnecessarily overridden.

### Transcript and description testing

- Read the transcript without playing the media and confirm equivalent meaning.
- Confirm visual information is included when a descriptive transcript is
  required or promised.
- Listen to the described version without watching the screen.
- Verify description does not cover important dialogue or sound.
- Test selection of the described version or track.
- Include Deaf, hard-of-hearing, DeafBlind, blind, low-vision, and
  sign-language users in appropriate quality review.

### Keyboard and screen reader testing

Test supported browser, player, operating system, and assistive-technology
combinations. Record versions and relevant settings.

1. Reach every player control with the keyboard.
2. Operate buttons, ranges, menus, captions, description, playback speed, and
   full screen.
3. Confirm names, roles, states, and values are understandable.
4. Confirm focus remains visible and logical when controls appear or hide.
5. Enter and exit embedded and full-screen players without a trap.
6. Confirm global shortcuts do not interfere with typing or assistive
   technology.
7. Confirm progress updates are not announced continuously.

Do not publish a fixed table promising identical behavior from named screen
readers. Player behavior varies by version, browser, mode, settings, and media
configuration.

### Visual, motion, and touch testing

- Test 200 percent and 400 percent zoom.
- Test narrow viewports and both portrait and landscape orientation.
- Test forced-colors and high-contrast modes.
- Enable reduced motion before loading the page.
- Confirm autoplay motion is suppressed and manual controls still work.
- Confirm pause controls are visible and operable by touch.
- Check target sizes and spacing.
- Run flashing-content analysis when media might approach the threshold.
- Test caption and control contrast in light and dark presentation.

### Live-event testing

- Conduct a full rehearsal with caption and interpretation feeds.
- Test attendee access without presenter privileges.
- Simulate caption-service or network failure.
- Confirm support contact information is available during the event.
- Verify recording and publication responsibilities before the event starts.

### Automated checks

Automation can help detect:

- missing accessible names on custom controls;
- invalid ARIA values;
- keyboard focus-order problems in component tests;
- missing or malformed `<track>` attributes;
- WebVTT syntax errors;
- duplicate IDs;
- contrast issues in authored controls; and
- media configured to autoplay audibly.

Automation cannot establish caption accuracy, transcript equivalence,
description quality, sign-language quality, player usability, or live-caption
delivery. Manual content and interaction review is required.

## Common Failures

| Failure | Correction |
|---|---|
| Treating live captions as optional when technically difficult | Plan and provide captions for live synchronized media at WCAG AA |
| Publishing unreviewed automatic captions | Review and correct the complete caption file |
| Captioning only dialogue | Include meaningful non-speech audio and speaker identification |
| Rejecting all open captions | Evaluate open captions as a valid technique when closed captions are unsupported |
| Requiring a transcript for audio-only but hiding it in a download | Provide an easy-to-find accessible HTML transcript |
| Treating a transcript as a replacement for Level AA audio description | Provide audio description under 1.2.5 when visual information requires it |
| Classifying extended audio description as Level AA | Identify 1.2.7 as Level AAA |
| Depending only on `track kind="descriptions"` | Test support and provide a supported described track or version |
| Recommending one player as universally accessible | Evaluate and test the selected version and configuration |
| Publishing decorative custom controls without complete behavior | Use native controls or implement and test the full player interface |
| Announcing every playback-time update | Expose the timeline value without a continuous live region |
| Claiming all autoplay with sound is literally prohibited by WCAG 1.4.2 | Apply the criterion accurately and adopt the stricter project rule of no audible autoplay |
| Assuming muted autoplay is automatically acceptable | Provide motion control and honor reduced-motion preferences |
| Trying to pause video with CSS `animation-play-state` | Use the media element API |
| Adding captions to meaningless silence while omitting important visuals | Match alternatives to the information in each track |
| Providing sign language without identifying the language | Use the language required by the audience and label it |
| Trusting a third-party accessibility statement without testing | Test the configured current player and keep alternatives outside the embed |
| Using a fixed assistive-technology behavior matrix | Document tested versions and actual results without universal guarantees |

## Definition of Done

- [ ] The media is classified as audio-only, video-only, synchronized, live, or
  prerecorded.
- [ ] Applicable WCAG A and AA alternatives are documented.
- [ ] Prerecorded synchronized media has complete, synchronized captions.
- [ ] Live synchronized media has a tested real-time caption service.
- [ ] Prerecorded audio-only content has an equivalent transcript.
- [ ] Prerecorded video-only content has an equivalent text or audio
  alternative.
- [ ] Prerecorded video at Level AA has audio description when important
  visuals are not already spoken.
- [ ] Transcripts are accessible HTML, easy to find, and synchronized with the
  published version.
- [ ] Automatic caption or transcript output has been reviewed by a qualified
  person.
- [ ] Caption, transcript, description, and sign-language languages are labeled
  accurately.
- [ ] The player provides keyboard-accessible controls with correct names,
  roles, states, and values.
- [ ] Captions, description, speed, seeking, and full-screen controls work in
  supported environments.
- [ ] Single-character shortcuts meet WCAG 2.1.4.
- [ ] Audible media does not autoplay.
- [ ] Moving media has required pause controls and respects reduced motion.
- [ ] Flashing content remains below the applicable threshold.
- [ ] Embedded players have useful iframe titles and accessible alternatives
  outside the embed.
- [ ] Media metadata states duration, language, and available alternatives.
- [ ] Caption content, transcript equivalence, and description quality have
  been reviewed manually.
- [ ] Keyboard, screen reader, zoom, touch, forced-colors, reduced-motion, and
  live-event tests have been completed as applicable.
- [ ] Automated checks supplement, but do not replace, manual content and
  player testing.

## Related WCAG Criteria

### Time-based media

- [1.2.1 Audio-only and Video-only (Prerecorded) (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/audio-only-and-video-only-prerecorded.html)
- [1.2.2 Captions (Prerecorded) (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded.html)
- [1.2.3 Audio Description or Media Alternative (Prerecorded) (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/audio-description-or-media-alternative-prerecorded.html)
- [1.2.4 Captions (Live) (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/captions-live.html)
- [1.2.5 Audio Description (Prerecorded) (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/audio-description-prerecorded.html)
- [1.2.6 Sign Language (Prerecorded) (Level AAA)](https://www.w3.org/WAI/WCAG22/Understanding/sign-language-prerecorded.html)
- [1.2.7 Extended Audio Description (Prerecorded) (Level AAA)](https://www.w3.org/WAI/WCAG22/Understanding/extended-audio-description-prerecorded.html)
- [1.2.8 Media Alternative (Prerecorded) (Level AAA)](https://www.w3.org/WAI/WCAG22/Understanding/media-alternative-prerecorded.html)
- [1.2.9 Audio-only (Live) (Level AAA)](https://www.w3.org/WAI/WCAG22/Understanding/audio-only-live.html)

### Player and presentation

- [1.4.2 Audio Control (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/audio-control.html)
- [1.4.3 Contrast (Minimum) (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- [1.4.10 Reflow (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)
- [1.4.11 Non-text Contrast (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)
- [1.4.13 Content on Hover or Focus (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html)
- [2.1.1 Keyboard (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html)
- [2.1.2 No Keyboard Trap (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html)
- [2.1.4 Character Key Shortcuts (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/character-key-shortcuts.html)
- [2.2.2 Pause, Stop, Hide (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)
- [2.3.1 Three Flashes or Below Threshold (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html)
- [2.3.3 Animation from Interactions (Level AAA)](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)
- [2.4.7 Focus Visible (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html)
- [2.4.11 Focus Not Obscured (Minimum) (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html)
- [2.5.3 Label in Name (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html)
- [2.5.8 Target Size (Minimum) (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- [4.1.2 Name, Role, Value (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html)

## Related Guides

- [ARIA Live Regions Best Practices](./ARIA_LIVE_REGIONS_BEST_PRACTICES.md)
- [Color Contrast Accessibility Best Practices](./COLOR_CONTRAST_ACCESSIBILITY_BEST_PRACTICES.md)
- [Keyboard Accessibility Best Practices](./KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.md)
- [Touch and Pointer Accessibility Best Practices](./TOUCH_POINTER_ACCESSIBILITY_BEST_PRACTICES.md)
- [User Personalization Accessibility Best Practices](./USER_PERSONALIZATION_ACCESSIBILITY_BEST_PRACTICES.md)

Use the project's
[Accessibility Bug Reporting Best Practices](./ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES.md)
to assign severity and priority. This guide does not define a universal
severity scale.

## References

- [W3C WAI: Making Audio and Video Media Accessible](https://www.w3.org/WAI/media/av/)
- [W3C WAI: Captions and Subtitles](https://www.w3.org/WAI/media/av/captions/)
- [W3C WAI: Transcripts](https://www.w3.org/WAI/media/av/transcripts/)
- [W3C WAI: Description of Visual Information](https://www.w3.org/WAI/media/av/description/)
- [W3C WAI: Media Players](https://www.w3.org/WAI/media/av/player/)
- [Technique H95: Using the `track` Element to Provide Captions](https://www.w3.org/WAI/WCAG22/Techniques/html/H95)
- [Technique H96: Using the `track` Element to Provide Audio Descriptions](https://www.w3.org/WAI/WCAG22/Techniques/html/H96)
- [Technique G9: Creating Captions for Live Synchronized Media](https://www.w3.org/WAI/WCAG22/Techniques/general/G9)
- [Technique G87: Providing Closed Captions](https://www.w3.org/WAI/WCAG22/Techniques/general/G87)
- [Technique G93: Providing Open Captions](https://www.w3.org/WAI/WCAG22/Techniques/general/G93)
- [Technique G78: Providing a Selectable Audio-Description Track](https://www.w3.org/WAI/WCAG22/Techniques/general/G78)
- [Technique G173: Providing a Version with Audio Descriptions](https://www.w3.org/WAI/WCAG22/Techniques/general/G173)
- [WebVTT: The Web Video Text Tracks Format](https://www.w3.org/TR/webvtt1/)

### Machine-Readable Standards

For AI systems and automated tooling, see
[wai-yaml-ld](https://github.com/mgifford/wai-yaml-ld) for structured
accessibility standards:

- [WCAG 2.2 (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/wcag-2.2-normative.yaml)
- [HTML Living Standard Accessibility (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/html-living-standard-accessibility.yaml)
- [Standards Link Graph (YAML)](https://github.com/mgifford/wai-yaml-ld/blob/main/kitty-specs/001-wai-standards-yaml-ld-ingestion/research/standards-link-graph.yaml)

---

This document is available under the repository's [MIT License](../LICENSE).
