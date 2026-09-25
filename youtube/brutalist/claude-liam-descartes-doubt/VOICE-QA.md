# VOICE-QA — What Would Have to Be True

"It sounded fine" is not a check. The narration is verified the way the chapter
asks any claim to be verified: by specifying in advance what a defect would
look like, then looking for one.

## The checks

1. **Headroom** — `ffmpeg volumedetect` peak per beat. Fail: above −1.0 dBFS.
2. **Intelligibility** — every mp3 transcribed back with `faster-whisper`
   (base.en) and diffed token-by-token against the `narration_text` that
   produced it. Fail: a divergence indicating the synthesiser said a different
   *word*, as opposed to the transcriber spelling the right sound differently.

The second check is the one that matters. A level meter cannot hear a
mispronounced name.

## Defects found and fixed

**1. The subject's name was wrong.** `am_onyx` renders the spelling
"Descartes" as **"Discard's"** — the reel mispronouncing its own subject.
Found because three beats transcribed back as "discards". Fixed by A/B testing
respellings through the synthesiser: `Day-cart` produces the correct
"day-CART" and now transcribes back as "descartes". Used in `narration_text`
only; every on-screen string reads **Descartes**.

**2. The greeting was unintelligible.** "Annyeong" synthesised as **"Annual"**
and degraded the word beside it ("Liam" → "Lai'am"). Six candidates were
tested; **Shalom** was the only one that survived intact *and* left the
narrator's name correct.

**3. Beats had no headroom.** Several peaked at or above −1 dBFS, one at
exactly 0.0 (clipping). A fixed gain reduction brings any offender to −3 dBFS;
durations are unchanged, so the audio clock is unaffected. This pass is re-run
after every regeneration.

**4. The voice itself was dull — and measurably so.** Spectral centroid across
ten male candidates on the actual intro line put `am_onyx` **last at 1748 Hz**.
`am_puck` measures **2883 Hz — 65% brighter** — at the top intelligibility
tier, and mean similarity *rose* from 97.3% to 97.8%. `bm_fable` is brighter
still (4679 Hz) but scored lower on ASR and is British.

**Deviation on record:** the ai-explainer channels table pairs `claude-liam`
with `am_onyx`. The switch to `am_puck` is deliberate and reversible in one
field; see the beat sheet's `voice_note`.

## Breaks between beats — a doctrine field nothing was reading

SKILL.md requires `lead_silence_s: 0.8` on the BLUF beat and is emphatic that
"it is not defaulted". The field was written on beat sheets and **no code in
the pipeline read it** — `grep -rn lead_silence runtime/scripts` returned
nothing. The head start the law exists to guarantee had never once happened.

`generate_audio_kokoro.py` now honours it and gives every beat a short tail
(`ART_TRAIL_SILENCE`, default 0.35s), so consecutive beats do not butt one
narration against the next. Verified with `silencedetect`. The tail matches the
0.2s video dissolve at each clip edge, so a cut lands in a gap rather than on a
syllable.

## Honest limit of this check

An ASR round-trip proves the words are recognisable. It does not prove the
delivery is good — it cannot hear an unnatural pause, a flat reading, or wrong
stress on a correctly-pronounced word. It did catch three defects that were
inaudible to a level meter and would otherwise have shipped. A human listen
remains the only check for prosody, and this file does not substitute for one.
