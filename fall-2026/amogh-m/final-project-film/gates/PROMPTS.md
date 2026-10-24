# PROMPTS — What It Had to Guess

No generative image or video prompts are used. Every beat is a deterministic
Remotion scene with props from `beat_sheet.json`; B04 additionally shows one
real screenshot. Kokoro TTS is deterministic for a given voice and text. There
are no open slots and no pantry requests.

## Kokoro TTS

- Engine `kokoro` (local ONNX, free). Cost $0.00. Voice `am_puck`, all 14 beats.
- Every figure is spelled as words ("seventy-five", "ninety-nine percent"); no
  letter-by-letter sequences. "AIPRM" is never spoken — it appears on screen only.
- **`Uh-mohg Muddoor`** is a phonetic respelling used in `narration_text`
  **only**. The literal spelling phonemizes as /ˈæmɑːɡ mˈædjʊɹ/ — "MAD-yoor",
  heard back by ASR as "Madger". The respelling gives /ˈʌmˈoʊɡ mˈʌdɔːɹ/. Every
  visual string reads Amogh Maddur.
- `lead_silence_s: 0.8` on B01 (EXECUTIVE-SUMMARY LAW). `trail_silence_s` on
  B06 (1.2), B07 (2.2) and B09 (2.0) so each closing line holds before the cut.
- Verified after generation by transcribe-and-diff. See VOICE-QA.md.

## The one prompt the film shows

B12, the handoff, typed into a reconstructed composer and **not run**:

> Take the last tool I shipped. List every claim its README makes. Beside
> each, write the exact test that supports it — and where there is none,
> write "nobody has checked this". Then count the second column.

## Scene props

All in `beat_sheet.json`. Every `*At` value is derived from measured word
timestamps — see the anchor table in VOICE-QA.md.
