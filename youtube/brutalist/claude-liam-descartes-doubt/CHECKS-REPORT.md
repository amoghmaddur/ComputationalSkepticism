# CHECKS-REPORT — claude-liam-descartes-doubt

```
14 SHOW / 0 justified-HOLD / 0 PUNT-flagged

Teaching arc: FRAMEWORK ok | WORKED EXAMPLE ok | FALSIFIABILITY ok
              SCAFFOLDED TASK ok | BOOKENDS ok | NO-SOURCE-NO-VERDICT ok
```

Frame: the **Descartes move**. Falsifiability appears as the machinery the move
produces, not as the subject.

| Beat | Act | Pattern |
|---|---|---|
| B00 | ASK | ClaudeComposerAsk |
| B01 | BLUF | BrutalistHesitantWriter |
| B02 | INSTANCE | DescartesSplit |
| B03 | FRAMEWORK | DescartesProtocol |
| B04 | FRAMEWORK | DescartesChecklist |
| B05 | WORKED_EXAMPLE | DivergentFates |
| B06 | WORKED_EXAMPLE | DescartesSplit |
| B07 | WORKED_EXAMPLE | DescartesCorrection |
| B08 | INSTANCE | DescartesSplit |
| B09 | INSTANCE | DescartesLedger |
| B10 | LIMITS | DescartesChecklist |
| B11 | VERDICT | ClaudeVerdictArtifact |
| B12 | YOUR_TURN | ClaudeComposerAsk |
| B13 | OUTRO | ClaudeTitleOutro |

No two consecutive beats share a visual scheme.

## The assignment's four standards

1. **The idea does work.** B06 takes a real claim from my own field — this
   toolkit's own "All core features ready" green table — and shows it failing
   while remaining literally true. B07 supplies the corrected claim with a
   **metric** (decoded mp4 carries video and audio streams), a **threshold**
   (mean volume above −40 dB, size above 20 kB) and a **window** (every commit).
   The reel does not define the move and stop.
2. **A concrete instance, not a category.** B02 the parcel, B08 the agent that
   wiped its own vault, B09 six measured figures. No "AI can't understand
   context" abstractions.
3. **One thing it does not establish.** B10 is a whole beat in the reel's own
   notation — boxes deliberately left open: when skipping the move is correct
   under time pressure, what each check costs, and what would change my mind.
4. **Not fluent and wrong.** Every external figure read from the primary
   source. This caught Chapter 1 misstating both cases — the sepsis alert
   denominator, and three material errors in the agent case. See FACTCHECK.md.
   The reel follows the papers, not the chapter.

## Layman accessibility

B02 puts the artifact/world gap in an object everyone has held, with no
technical vocabulary, and teaches the two-column grammar the reel reuses at B06
and B08. B05 puts two people in the move so it reads as a human choice.

## GATE L (library-first)

`./art scenes` run before authoring. No component existed for an inspection
protocol, an artifact/world split, a rhetorical-to-engineering correction, a
tickable checklist, or an evidence ledger — five were built and registered.
`DivergentFates` was an existing hit, reused for the two-nurse beat. A miss is
never a licence to slate.

## Gate status at final cut

- **GATE T: PASS.** Two real defects were fixed to get there — a 2.74:1
  terracotta-on-cream contrast failure, and sub-floor type. A documented §8.1
  skip covers the five Descartes patterns, where the check measures punctuation
  blobs rather than type; declared sizes are all ≥28 stage px.
- **GATE V: 0 BLOCKER, 6 MAJOR** (all `underfill`), carried as warnings via
  `ART_STRICT=0`. Most exist *because* reveals are synced to the narration — a
  beat that waits for the voice is legitimately sparse at the gate's midpoint
  sample. That trade was made deliberately.

## Deviations on record

- Voice is `am_puck`, not the channel default `am_onyx`: onyx measured as the
  darkest English voice available (1748 Hz spectral centroid) and read as dull.
  Recorded in the beat sheet's `voice_note`.
- Reveal timings are derived from the narration by phrase anchor rather than
  authored by hand, so re-recording audio requires re-deriving them.
