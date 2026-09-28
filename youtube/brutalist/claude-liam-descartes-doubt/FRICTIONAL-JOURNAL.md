# Frictional Journal — "What Would Have to Be True"

---

## Entry 0 — the prediction that does not exist

**No prediction was locked before this reel was built.** Work started on
23 September 2026; nothing was written down beforehand about which idea I would
pick or what I expected to be hard.

The assignment says writing the prediction afterward defeats the point and is
visible. It is. So this entry records the absence rather than filling it, and
no line below carries a timestamp it did not actually have.

Reconstructing what I "would have predicted" is available and I am not doing
it. The prediction-lock's whole function is that it is falsifiable by a later
observation — a prediction written with the outcome already known cannot be
wrong, which makes it exactly the kind of unfalsifiable claim this reel is
about. Backfilling it would fail the assignment's own thesis in the act of
submitting it.

What follows is therefore: an honest reflection on the build (Entry 1), and a
genuine prediction-lock for the one piece of work still outstanding at the time
of writing (Entry 2), which was written before that work began and is checkable
against what happened (Entry 3).

---

## Entry 1 — reflection, written after the build

**23–28 September 2026.** Timestamps below are from git, file mtimes and build
logs, not memory.

**What I picked.** The Descartes move from Chapter 1 — radical doubt as a
diagnostic, not a mood. I picked it because it is the one move in the chapter
that terminates in something checkable, which meant the video could *do* it
rather than describe it.

**What actually turned out to be hard**, in the order it hurt:

1. **The tooling, not the idea.** Days one and two went almost entirely to
   getting the renderer to run at all. The Windows font path was being
   interpolated raw into an ffmpeg filtergraph where a backslash is an escape;
   `npx` is `npx.cmd` and `CreateProcess` only resolves `.exe`; atomic writers
   used the locale codec on UTF-8 content. Nine fixes before a frame rendered
   correctly. I had assumed, without examining it, that a shipped toolkit would
   run. That assumption was the first thing the chapter's move would have
   caught, and I did not apply it.

2. **A bug that made every earlier "fix" wrong.** At 0:36 a list stopped
   mid-reveal and cut. I treated it as pacing and spent two passes retiming
   reveals — which made it *worse*, because the real cause was that scenes were
   rendered at their registered 30s length and then trimmed to the beat. Only
   the first `dur/30` of every animation had ever been visible: 55% on a 17s
   beat, 11% on the outro. Pushing reveals later pushed them past the cut. The
   symptom was visible from the first render; I misread it for two days.

3. **The sources.** This is the part I got right for the wrong reason — I
   checked them because the rubric told me to, not because I doubted the
   chapter. Both external cases turned out to be misstated in it. The sepsis
   alert rate is 18% of *hospitalizations*, not of patients. And in the agent
   case, "Ash" is the *agent*, not the researcher; it wiped its entire mail
   vault rather than resetting a password and renaming an alias; there is no
   two-week interval. My video had reproduced all four errors fluently.

**What I did not expect at all.** That the working repository would be
destroyed twice mid-build by OneDrive, which owns the Desktop on this machine.
The first loss took everything including `.git`; the second took 11,156 files
while I was recovering from the first. Diagnosing it took longer than it should
have because I kept treating each loss as an anomaly instead of asking what
would have to be true for a folder to empty itself.

**The honest summary.** The idea was the easy part. Everything that cost time
was a claim I had not tested: that the toolkit worked, that the symptom was
what it looked like, that the chapter's summary of its own sources was
accurate, that a folder on the Desktop was a safe place to work. Four
unexamined claims, four failures. The reel argues that the move is cheap and
that people skip it anyway. I skipped it four times while making it.

---

## Entry 2 — PREDICTION LOCK

**Written 2026-09-28 19:07:42 EDT, before the work described begins.**

**The work.** Compiling SOURCE-LIST.md surfaced one figure in the reel that is
not exactly supported by its source: B00 says the Descartes question is *"four
hundred years old"*. The *Discourse* is 1637 and the *Meditations* 1641, so
from 2026 that is 385–389 years. I am going to change the line to "nearly four
hundred years old", regenerate that beat's narration, and re-cut the master.

**What I expect to be hard:** nothing about the edit — it is one word. I expect
the difficulty to be that **changing B00's narration changes its duration, and
the reveal timings for every beat are derived from measured audio**, so the
sync work has to be redone. I predict I will have to re-derive the phrase
anchors, and that if I forget, the drift will be invisible in B00 itself and
show up somewhere I am not looking.

**Specific, falsifiable predictions:**

1. B00's duration will change by more than 0.1s, forcing a re-derivation.
2. The re-render will be scene-level for B00 only, not a full 14-beat render.
3. GATE V's MAJOR count will stay at 6. GATE T will still pass.
4. Nothing else in the reel will need to change.

If (3) moves, my model of what those warnings depend on is wrong.

---

## Entry 3 — reflection on Entry 2

*To be written immediately after that work, against the four predictions above.
Left empty until then, deliberately.*

**Written 2026-09-28 19:18 EDT, immediately after the work.**

| # | Prediction | Outcome |
|---|---|---|
| 1 | B00's duration changes by more than 0.1s | **Correct.** 14.86s → 15.24s, +0.38s. |
| 2 | Scene-level re-render for B00 only | **Correct.** One scene re-rendered; the other thirteen were reused. |
| 3 | GATE V stays at 6 MAJOR, GATE T still passes | **Correct.** 0 BLOCKER / 6 MAJOR, GATE T PASS. |
| 4 | Nothing else needs to change | **Correct.** |

Four for four — and the prediction that mattered was still wrong.

**What I got wrong was the hard part.** I predicted the difficulty would be
re-deriving the phrase anchors, and that forgetting would cause invisible
drift somewhere I was not looking. Neither happened, and could not have: B00
is a `ClaudeComposerAsk`, which carries no derived timings at all. Every other
beat's anchors are fractions of *its own* duration, and no other duration
changed. There was nothing to re-derive.

So the four checkable predictions were all correct while the model behind them
was not. I had generalised "audio changed, therefore sync is at risk" from the
beats where it is true — the ones with `leftAt`, `rightAt`, `rowsAt` — to a
beat where it is structurally impossible. The four narrow predictions came out
right because they did not depend on the wrong belief; the one sentence that
did depend on it was the sentence about what would be hard.

This is a sharper result than a clean miss would have been. A scorecard of
four correct predictions would have read as a well-calibrated model, and the
model was wrong. It is the same failure the reel is about, at small scale: the
metrics were green and told me nothing about the thing I actually believed.
Had I asked *what would have to be true for B00 to need re-derivation* — it
would have to carry derived timings — I could have checked in ten seconds that
it does not.

**One thing this does not establish:** whether the anchors on the other
thirteen beats are still correct. Nothing in this pass tested them; I am
inferring it from the fact that their durations are unchanged. That inference
is sound, but it is an inference, not an observation.
