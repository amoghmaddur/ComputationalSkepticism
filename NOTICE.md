# Notice — what is mine in this repository

This repository is a **fork of [`nikbearbrown/brutalist.art`](https://github.com/nikbearbrown/brutalist.art)**,
the Brutalist video-explainer toolkit by Nik Bear Brown. The overwhelming
majority of the files here — the `art` and `setup` entry points, the whole
`runtime/` pipeline, the skills, the icon and logo sets, and the existing reels
under `youtube/` — are his work, not mine. `README.md` and `CLAUDE.md` are his
and describe his project.

At the time of forking the upstream repository carried no LICENSE file. Nothing
here asserts any claim over that code, and if the author would prefer this fork
not exist publicly, contact me and I will take it down.

## My contribution

**A reel: `youtube/brutalist/claude-liam-descartes-doubt/`**

"What Would Have to Be True" — a 14-beat, 3:51 explainer on the Descartes move
(radical doubt) from Chapter 1 of INFO 7375, *Computational Skepticism for AI*.
Coursework. The beat sheet and the full paperwork trail are committed;
rendered video and audio are gitignored by the upstream `.gitignore`.

Worth reading even without the video: [`FACTCHECK.md`](youtube/brutalist/claude-liam-descartes-doubt/FACTCHECK.md)
records where the chapter's own retelling of its two cases diverges from the
primary sources, and what the reel does instead.

**Five Remotion components: `runtime/remotion/src/DescartesIllu.tsx`**

`DescartesProtocol`, `DescartesSplit`, `DescartesCorrection`,
`DescartesChecklist`, `DescartesLedger` — written for this reel, registered in
`Root.tsx`, and reusable.

**Toolkit fixes**

Found by building the reel on Windows; each is described in the commit message.
In short:

| File | Fix |
|---|---|
| `runtime/scripts/compile.py` | Windows font paths were interpolated raw into the ffmpeg filtergraph, where `\` is an escape — review cuts could not mux. Also beat-edge dissolves, and `ART_STRICT=0` on the master path. |
| `runtime/scripts/remotion_scenes.py` | `npx` is `npx.cmd` on Windows; `CreateProcess` resolves only `.exe`, so every scene render raised `WinError 2`. |
| `runtime/remotion/src/Root.tsx` | Compositions rendered at their registered length, then were trimmed to the beat — only the first `dur/30` of each animation was ever seen. |
| `runtime/scripts/generate_audio_kokoro.py` | `lead_silence_s` is required by doctrine and was read by nothing. |
| `runtime/scripts/build_safety.py` | Atomic writers used the locale codec with `ensure_ascii=False`; non-ASCII beat sheets failed to write on Windows. Slug guard rejected the shipped `_smoke` fixture. |
| `runtime/qc/final_frame_check.py` | Burn-in exclusion missed the review timecode, which then read as edge-bleed. |
| `runtime/remotion/src/scenes/ClaudeVerdictArtifact.tsx` | Lines staggered on a fixed frame offset, landing all of them inside ~2s of an 18s beat. |
| `runtime/remotion/src/deckPatterns.tsx` | `DivergentFates` drew its outcome cards past the title-safe inset. |
| `runtime/scripts/type_check.py` | Documented §8.1 skip where the check measures punctuation blobs rather than type. |

These are offered upstream; I have not opened a pull request.

## AI use

The reel's narration is synthetic speech (Kokoro `am_puck`, local). Every
visual is a deterministic Remotion render — no generative image or video model.
The script was drafted with AI assistance and its factual claims were checked
against primary sources, as recorded in `FACTCHECK.md` and `SOURCES.md`. The
reel states this on screen and in its opening line.

— Amogh Maddur
