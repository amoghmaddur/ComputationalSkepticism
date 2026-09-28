# AI Use Disclosure

**Artifact:** "What Would Have to Be True" — a 3:51 explainer on the Descartes
move, Chapter 1, INFO 7375 *Computational Skepticism for AI*.
**Author:** Amogh Maddur · **Dates:** 23–28 September 2026

---

**Tool(s) used:**

- **Claude (Opus 5) in Claude Code** — the whole build: reading the chapter,
  drafting narration, writing the Remotion components, running the pipeline,
  checking sources, debugging the toolkit.
- **Kokoro TTS v1.0** (`am_puck`, local ONNX) — all narration. No human voice
  is used anywhere in the video.
- **faster-whisper** (base.en, local) — QA only: transcribing the generated
  narration back to diff it against the intended script.
- **Remotion / ffmpeg / Manim-capable toolkit** — `nikbearbrown/brutalist.art`,
  the deterministic renderer. Not generative.

**Portions assisted:**

Effectively all of the production. Specifically: the 14-beat structure, the
narration script, the five new Remotion components
(`runtime/remotion/src/DescartesIllu.tsx`), all timing derivation, the
source-verification pass, and nine bug fixes to the toolkit itself. The
supporting documents in this folder — FACTCHECK, SOURCES, CHECKS-REPORT,
VOICE-QA, SHOTLIST, PROMPTS — were also AI-drafted.

**How used:**

As an executing collaborator under continuous human direction, not as a
one-shot generator. The pattern throughout was: I set the goal and the
constraints, Claude built, I watched the output and sent it back. Nothing
shipped on a single pass — the final cut is roughly the tenth render.

Concretely, Claude read Chapter 1 in full, proposed the beat structure, wrote
the script, built the components, and ran the render pipeline. It also went to
the primary sources rather than the chapter when checking the two external
cases, and derived every visual reveal's timing from the narration by phrase
anchor rather than hand-tuning numbers.

No generative image or video model was used. Every frame is a deterministic
Remotion render — same inputs, same pixels.

**What I changed:**

The direction and the rejections were mine, and they are what shaped the piece:

- Set the topic, scope (the Descartes move only), length and beat count.
- **Caught a visual defect at 0:36** — a list that stopped mid-reveal and cut
  abruptly. Chasing it exposed a pipeline bug: scenes were rendered at their
  registered length and then trimmed to the beat, so only the first ~55% of
  every animation had ever been visible. That bug predated this reel.
- **Rejected the narration voice as dull.** Measurement confirmed it —
  `am_onyx` was the darkest of 28 English voices at 1748 Hz. Changed to
  `am_puck`.
- **Rejected the reel's visual vocabulary as borrowed** from an earlier
  biology explainer. Two components were rebuilt around the idea's own
  grammar: a claim becoming boxes that tick, and the limits shown as boxes
  that cannot.
- Called for a layman entry point, which became the parcel beat.
- Required the piece be held to the assignment's four standards, which
  triggered the primary-source pass that found the chapter's errors.
- Decided the repository would be public and asked for the provenance notice.

**What the AI could not do:**

- **It could not lock a prediction before the work began.** The Frictional
  Journal's prediction half is missing for that reason, and
  FRICTIONAL-JOURNAL.md says so rather than backfilling a timestamp. That is a
  real gap in this submission, not a formatting one.
- **It could not hear the video.** Voice QA is an ASR round-trip and a level
  meter: it caught a mispronounced "Descartes" ("Discard's"), an
  unintelligible greeting, and clipping — all inaudible to a meter — but it
  cannot judge prosody, pacing or whether a reading is flat. Only a human
  listen can, and that judgment was mine.
- **It could not tell the work was good.** It repeatedly reported gate failures
  and defects accurately, but "this beat is confusing", "this ends too
  abruptly", "this sounds dull" all came from me watching it.
- **It could not resolve one ambiguity in the brief.** The assignment sheet
  names *Popperian falsifiability*; my instruction throughout was *Descartes*.
  Claude flagged the conflict and stopped rather than guessing; I confirmed
  Descartes.
- **It could not verify one claim it wanted to.** Whether the on-screen figures
  would read at a glance to someone who has not read the chapter is a human
  judgment it has no access to.
- It also could not stop OneDrive deleting the working repository twice
  mid-build — diagnosed, but the fix (moving off a synced folder) was a
  decision I made.
