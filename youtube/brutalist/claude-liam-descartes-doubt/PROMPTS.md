# PROMPTS — What Would Have to Be True

No generative image or video prompts are used. Every beat is a Remotion scene
with props from `beat_sheet.json`. Kokoro TTS is deterministic for a given voice
and text. There are no open slots and no pantry requests.

## Kokoro TTS

- Engine `kokoro` (local ONNX, free). Cost $0.00. Voice `am_onyx`, all 14 beats.
- Every figure is spelled as words ("zero point six three", "sixty seven
  percent"); no letter-by-letter sequences.
- `Day-cart` is a phonetic respelling used in `narration_text` **only** —
  `am_onyx` renders the correct spelling as "Discard's". It never appears on
  screen; every visual string reads Descartes.
- Verified after generation by transcribe-and-diff. See VOICE-QA.md.

## Scene props

| Beat | Component | Key props |
|---|---|---|
| B00 | ClaudeComposerAsk | `greeting: "Shalom, Liam"`, the ask, 3 output lines |
| B01 | BrutalistHesitantWriter | `seed: "descartes-b01"`, `triggerWords: "mood"` → `"checklist"`, `fontSize: 300` |
| B02 | DescartesSplit | tracking page vs doorstep, gap line |
| B03 | DescartesProtocol | claim, question, the two answers, footer |
| B04 | DescartesChecklist | three queries, boxes tick |
| B05 | DivergentFates | one score, two nurses, two outcomes |
| B06 | DescartesSplit | green table vs failed build |
| B07 | DescartesCorrection | strike + metric / threshold / window |
| B08 | DescartesSplit | agent report vs system state |
| B09 | DescartesLedger | six Wong et al. figures, citation |
| B10 | DescartesChecklist | `unticked: true` — the open boxes |
| B11 | ClaudeVerdictArtifact | heading plus 5 lines |
| B12 | ClaudeComposerAsk | `greeting: "Your turn."`, the prompt |
| B13 | ClaudeTitleOutro | title restate plus slug |

## The viewer's prompt (B12, read aloud verbatim)

> Take the last thing you shipped that reported its own success. Write the claim
> in one sentence, then list three conditions that would make it wrong about the
> world — and tell me which one you have never actually checked.

It extends the chapter's move into the viewer's own work and names a specific
thing to watch for: the unchecked condition is usually the load-bearing one.

## Determinism

Every Descartes component holds no state and reads time only through `useP()`,
and each composition is sized from `beatSeconds` so its clock spans the beat.
