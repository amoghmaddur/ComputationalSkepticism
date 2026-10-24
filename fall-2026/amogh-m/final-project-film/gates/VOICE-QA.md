# VOICE-QA — What It Had to Guess

Kokoro `am_puck`, all 14 beats, local and free. Checked on 10 October 2026.

## The checks

1. **Intelligibility.** Every mp3 transcribed back with `faster-whisper`
   (base.en) and diffed word by word against the `narration_text` that produced
   it. Fail: the voice said a different word. Script: `tools/voice_qa.py`.
2. **Headroom.** `ffmpeg volumedetect` peak per beat. Fail: above −1.0 dBFS.
3. **Name.** The narrator's own name, checked at the phoneme level, because ASR
   cannot know how a name should sound.

## What they found, and what was done

| Found | Heard as | Fix |
|---|---|---|
| "Maddur", literal spelling, phonemizes /mˈædjʊɹ/ ("MAD-yoor") | "Madger" | Narration-only respelling **"Uh-mohg Muddoor"** → /ˈʌmˈoʊɡ mˈʌdɔːɹ/. Five respellings compared at the phoneme level. Screen text unchanged. |
| B03 "One that sends for you" | "When that sends for you" | Reworded: "A tool that sends for you" |
| B05 "And a prompt-library extension" | "In a prompt-library extension" | Reworded: "Second, a prompt-library extension" |
| B06 "the one a README does not put in bold" | "I read me" | Reworded: "the one nobody puts in bold" |
| B02 "from what you've told it once" | "told **at** once" — the opposite meaning | Reworded: "using what you've already told it" |
| B02 and B03 peaked at +0.0 dBFS | — | No flat-topped clipping (astats flat factor 0, two isolated overshoot samples). **One uniform −3.00 dB on every beat**, so relative loudness is unchanged. Beats regenerated later received the same fixed −3.00 dB. Script: `tools/headroom.py`. |

Nothing was fixed by editing audio by hand. Every fix was a rewording and a
regeneration.

## Final round trip

| Beat | Match | Peak | Remaining differences — none are wrong words |
|---|---|---|---|
| B00 | 0.967 | −4.1 dB | the name (see above) |
| B01 | 1.000 | −3.9 dB | — |
| B02 | 1.000 | −3.9 dB | — |
| B03 | 0.985 | −2.9 dB | "its" → "it's" (spelling) |
| B04 | 1.000 | −5.3 dB | — |
| B05 | 0.927 | −3.7 dB | number written as digits; "ChatGPT's" split |
| B06 | 0.870 | −4.6 dB | numbers written as digits; "re-run" → "rerun" |
| B07 | 0.915 | −3.5 dB | "sink" → "sync" (homophone); numbers as digits |
| B08 | 1.000 | −3.8 dB | — |
| B09 | 0.962 | −3.8 dB | unstressed "a" → "of"; quotation merged |
| B10 | 1.000 | −4.4 dB | — |
| B11 | 0.955 | −5.2 dB | numbers as digits |
| B12 | 0.986 | −4.1 dB | "write" → "right" (homophone) |
| B13 | 0.560 | −4.5 dB | the name; "seven three seven five" → "7375". The low ratio is a 13-word beat where those two items are most of it. |

Mean loudness across beats: −21.8 to −23.1 dB.

## Reveal timing

Every `*At` value in the beat sheet is computed from these transcripts' word
timestamps by `tools/anchors.py`: the spoken phrase a reveal must land on, as a
fraction of its beat's measured duration, minus a small lead so the ease
completes on the word. No reveal time was set by eye.

## Honest limit of this check

ASR proves the right words were said. It cannot judge prosody or pacing, and
it cannot tell whether "Uh-mohg Muddoor" sounds like my name. **That needs a
person — me — to listen to B00 and B13.**
