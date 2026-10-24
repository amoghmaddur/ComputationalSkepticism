# Frictional Journal — Pepper: Context and Access

A dated log kept while the film was made. Entry 1 was written **before** any
brief, beat sheet or component existed, so it can be wrong. Later entries are
written at the time of the work they describe, and say when they were written.

---

## Entry 1 — PREDICTION LOCK

**Written 2026-10-10, 08:28 EDT. Nothing exists yet** except an unpacked copy of
`pepper-v0.3.zip`, four files of it read, and one test run (below). No brief, no
beat sheet, no component, no narration, no render.

### The idea I picked

**Pepper — The Personal AI Prompter**, and specifically the part of it that is
*not* done: taking it from "the logic is verified against mock pages" to
"verified against the five live sites", with a failure analysis that is honest
about what the verification found.

The film's argument is the one thing Pepper is actually about: **a prompt is
only as good as the context behind it, and the cost of missing context scales
with how much access the AI has.** Pepper is the small end of that scale — it
holds context, never presses send, and asks for two permissions. The argument
is that the discipline it enforces at the small end is the one that matters at
the large end.

### What already exists, as of this entry

One thing, and I checked it rather than repeating the README:

    $ node --test unit/*.test.js
    tests 75 / pass 75 / fail 0        (6378 ms, Node v24.13.0, 2026-10-10)

That is the only claim in this journal that has been executed so far.

### What I expect to be hard

Not the renderer this time. I have now built one reel with this toolkit and
fixed nine bugs in it, so I expect the pipeline to mostly behave.

**I expect the hard part to be the honesty rule colliding with the format.**
A pitch film wants momentum; the rule requires that every verb be tensed to
the evidence. I predict the collision shows up in the *visuals*, not the
script — that I will write a correct sentence and then put it over a graphic
that implies more than the sentence says, and that I will not notice on the
first pass because the narration will read as true.

### Specific, falsifiable predictions

1. **At least one beat will have to be re-authored for the honesty rule after
   it was already written** — not a word change, a rebuild — because the
   visual overclaims relative to the narration.
2. **The library-first search (`./art scenes`) will miss on the film's central
   visual** — the six labelled prompt parts — and I will write a new component.
   I predict at least 3 new components and at most 6.
3. **GATE V will report more MAJOR findings than the Descartes reel's 6**,
   because this film has more dense evidence tables and fewer wide type cards.
4. **The runtime will land between 3:00 and 4:00**, and I will not need to cut
   a beat to get under 4:00.
5. **The alternatives question (Q2) will be the weakest answer in the brief**,
   because I can read what the alternatives claim but cannot install and run
   them inside this session — so that answer will rest on vendor copy rather
   than on use.

If (1) does not happen, my model of where the honesty rule bites is wrong: it
would mean the rule is a script-level constraint and I have been treating it as
a design-level one.

### What I am deliberately not predicting

Whether the film is any good. I have no way to check that from inside the
session, and a prediction I cannot falsify is the thing this journal is
supposed to avoid.

---

## Entry 2 — mid-build, written at the time

**2026-10-10, 08:53 EDT.** Brief written, beat sheet written, audio generated,
first scene rendered, full scene render running.

**The first honesty catch came from a frame, not the script — as predicted,
but smaller than predicted.** B02's footer read *"The six labels and their
purposes, as written in lib/core.js."* The labels are verbatim. The purposes
are not: I had shortened `"says how to judge whether the answer is done"` to
`"how to judge that it's done"` so it would fit one line. The narration never
made the claim; only the footer did, and I wrote the footer myself. It now
says the purposes are shortened. That is a word change, not the rebuild
prediction 1 asked for, so prediction 1 is **not yet** confirmed.

**Something I did not predict at all: my own name.** The voice says the
literal spelling "Maddur" as /mˈædjʊɹ/ — "MAD-yoor" — and the ASR round-trip
hears "Madger". I would not have caught it by reading the script. Narration
now uses the respelling "Uh-mohg Muddoor" (/ˈʌmˈoʊɡ mˈʌdɔːɹ/); the screen
still says Amogh Maddur. The ASR still writes it back as "Amog Mador", and
that is the limit of what a machine can check here — whether it sounds like
my name is something only I can judge.

**Smaller things the voice check found**, all fixed by rewording, none by
hand-editing audio: "One that sends for you" was heard as "When that sends for
you"; "And a prompt-library extension" as "In a prompt-library extension"; "a
README" as "I read me". Every beat also got the same −3 dB, because two beats
peaked at 0.0 dBFS.

---

## Entry 3 — the sources pass, written at the time

**2026-10-10, 09:29 EDT.** Writing SOURCES.md turned up three errors in my own
draft, all of them already rendered into frames.

**Prediction 1 is now confirmed — but not the way I predicted it.** B10 was
re-authored, narration and visual, after it was written. It had me saying that
"building an extension and writing seventy-five tests" was something I could
already do. Pepper's own `CHANGES.md` is written by Claude to me as product
owner: the v0.3 code is a table of "Claude steps". The honest version is that
I wrote the design document and directed the build. **I predicted the honesty
rule would bite in the visuals while the narration read as true. It bit in the
narration, and it read as true to me because it was flattering.** That is a
worse failure than the one I predicted, and I did not see it coming.

**The second error was a number I never counted.** I had "26 screenshots" in
the brief, two beats and the sources. The package does hold 26 PNGs, but four
are the extension's icons; the screenshot folder holds 22. I had carried 26
forward from my own earlier summary of the package. It is the exact failure
the course is about, a figure repeated from a description instead of checked
against the thing.

**Then the browser suite.** I had been citing "20 browser checks, all passing"
from `CHANGES.md`. I approved installing Playwright, and Claude Code ran them.
They did not start: Windows refused to launch Chrome for Testing from Playwright's cache
folder (the side-by-side loader could not resolve the browser's own version
manifest). The same binary copied to another folder launched cleanly, and the
suite passed **20 of 20** in 70 seconds. So B06 now states a measurement
instead of quoting a record. B04 now shows a screenshot that run produced, not
the constructed example I had built.

**A side effect I caused and should record.** While diagnosing the launch
failure, Claude Code ran `chrome.exe --version` against my installed Google
Chrome. On Windows that does not print a version, it opens the browser, so a
window briefly opened in my real profile. Nothing was changed, but it was a
command run without knowing what it would do on this platform.

**GATE V, first run: 2 BLOCKER, 6 MAJOR.** Prediction 3 (more MAJORs than the
Descartes reel's 6) is not confirmed: it was equal on MAJORs and worse on
BLOCKERs. Both BLOCKERs were mine. A rule I had deliberately drawn 18 px past
the safe margin, and a fourth checklist row that collided with the footer. The
underfill MAJORs were mostly a real design weakness, not a metric quirk: frames
where half the screen waited for words. They are fixed by showing the empty
numbered slots the moment the narration says how many there are.

---

## Entry 4 — after watching the review cut

**2026-10-10, 10:28 EDT.** I watched the first gate-clean review cut and sent
it back with five notes: B09's narration and visuals were out of step, B10's
headings were cut in half, the transitions were abrupt, the motion was flat,
and the opening spent its first minute on how Pepper works and how it is
tested instead of on what it is for.

**Every one of the five had passed the gates.** GATE V and GATE T were both
clean on that cut. B10's headings wrapped onto a second line, and the heading
rule ran straight through them: no gate measures whether a rule bisects a
word. B09's claim appeared three seconds before the narration reached it: no
gate compares a reveal with the word it belongs to. Nobody had checked the
order of the film against what a viewer needs first, because no gate can.
This is the course's point made about my own tooling: green gates, and a film
that was still wrong in ways I could see in one viewing.

**What changed.** The cold open now shows the problem in the moment it
happens — a rough request, and the three things it leaves out — instead of
test output. B02 shows what using Pepper looks like instead of where its
labels live in the source. Testing now starts at B06. The composer's typing,
which had been running on a fixed 1.5-second timer whatever the narration was
saying, now follows the words. Beats crossfade instead of dipping to cream,
and each crossfade starts on the next beat's first audio frame, so no sync
moves.

**One more honesty catch, in a line I had just written.** The new cold open
said "tomorrow you'll type that background again, on every site you use."
B05 shows ChatGPT's Custom Instructions, which store standing context. So the
line contradicted my own film. It now says "or set it up separately on every
site you use."

---

## Entry 5 — assembling the submission, and scoring Entry 1

**2026-10-14, 17:11 EDT.** After the polished review cut, I asked for the submission to be assembled.
The master was built at 17:04–17:08: GATE T passed, GATE V clean, integrity
record `ready`. Then I checked the folder against the submission list, item by
item, against the files themselves.

**The list found one more thing I had read and never tested.** The brief must
be one page. Mine was 1,645 words — about three pages — and had been since
10 October. I had re-read it three times for honesty and never once for
length. It is now printed to PDF at 11 pt to prove it fits one page, instead
of me judging by eye.

**Entry 1's predictions, against what happened:**

| # | Prediction | Outcome |
|---|---|---|
| 1 | At least one beat rebuilt for the honesty rule after it was written, because a visual overclaims | **Confirmed, and it happened more than once.** B04's constructed example became a real screenshot; B03's stop rule had been drawn on the wrong side of the rung; B07 struck through "75 tests pass", which is true; B06's header named one command above rows from three sources; B00's chip said "verbatim" over a sentence I wrote. **What I did not predict:** the worst one was in the narration, not a visual — B10 had me claiming code that Claude wrote. |
| 2 | The library search misses the six-part visual; 3–6 new components | **Confirmed**, at the top of the range: six new components. |
| 3 | GATE V reports more than the Descartes reel's 6 MAJOR | **Wrong as stated.** First run: 6 MAJOR (equal), but 2 BLOCKER, which Descartes did not have. The final master: 0 and 0. |
| 4 | Runtime 3:00–4:00 with no beat cut | **Confirmed**: 3:57, nothing cut. Close to the limit — every revision was a trade of words for seconds. |
| 5 | Q2, the alternatives, is the weakest answer, because it rests on vendor pages rather than use | **Confirmed.** Neither alternative was installed and run. The brief and the film both say so. |

**What the score hides.** Four of five came out right, and that sounds like a
well-calibrated model. It wasn't. Every prediction was about the film. None
was about me: carrying a number forward without counting it, taking credit
for code I directed, not measuring a requirement I had read. Those were the
real failures, and the predictions had nowhere to catch them.
