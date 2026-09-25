# SOURCES — claude-liam-descartes-doubt

## Scope

Frame: the **Descartes move** (radical doubt) as Chapter 1 teaches it — *"treat
every claim as a conjecture and ask what it would take to falsify it, before
the world does the falsifying for you."* Falsifiability is the machinery the
move produces (B07's metric / threshold / window); Popper's demarcation is
named in the chapter but is not this reel's subject. Hume and the Plato's Cave
move are likewise out of scope.

## Source of record

Nik Bear Brown, *Computational Skepticism for AI*, Chapter 1 — "The Skeptic's
Toolkit", read in full from
`nikbearbrown/info-7375-computational-skepticism-for-ai`.

Note: the repository copy carries unresolved git conflict markers
(`<<<<<<< HEAD` / `=======` / `>>>>>>>`) around the Knight Capital and
COVID-radiography passages. Neither passage is used here, so the ambiguity does
not propagate — but it is worth flagging to the author.

## External cases — read from the primary source, not the chapter

- **Wong et al., "External Validation of a Widely Implemented Proprietary
  Sepsis Prediction Model in Hospitalized Patients," *JAMA Internal Medicine*
  181(8), 2021.** Every figure in B09 taken from the paper. Two corrections to
  Chapter 1 resulted: the 18% alert rate is of *hospitalizations*, not of
  patients; and "hundreds of hospitals" is not stated in the abstract, so the
  narration says "widely deployed", which the study's own title supports.

- **Shapira et al., *Agents of Chaos*, arXiv:2602.20021, Case Study #1
  "Disproportionate Response" (pp. 10–11).** Read directly from the paper.
  Chapter 1's retelling proved wrong on the roles (Ash is the *agent*, owned by
  Chris; Natalie was a non-owner researcher), the action (a full mail-vault
  wipe — "all emails, all contacts, all history" — not a password reset and
  alias rename) and the timeline (no two-week interval; the owner observed the
  surviving email directly). The reel follows the paper. Itemised in
  FACTCHECK.md.

## First-hand material

B06 and B07 use a claim from this toolkit, produced during this build:
`./setup` reporting seven green features and "All core features ready" while
`./art smoke` failed before rendering a frame. Both outcomes were observed and
are reproducible from the build logs. B07's corrected claim restates the smoke
test's real contract from `runtime/scripts/smoke_test.sh`; the "every commit"
window is the reel's own proposal, not a description of current wiring.

## DOUBLE-CHECK LAW

The chapter is argued with, not paraphrased. The reel's spine — that the move
produces a checklist, and that its weakness is cost rather than logic — is a
judgment in the Teardown register; the chapter never prices the checks, and
B10 and B11 say so. Every correction is logged above and in FACTCHECK.md.
Nothing in the reel dates: no model versions, no drifting counts.

## AI use disclosure

Chapter 1 has no section by that name, but it discloses AI use in its own
figure captions. Held to the same standard, and stated **in the video**, not
only here:

- B00, first breath: *"This is Liam, a synthetic voice, in for Bear."*
- B11, on the verdict artifact: *"Disclosure — synthetic narration; every case
  figure checked against the primary source, not the chapter."*

Narration is Kokoro `am_puck`, local and free. Every visual is a deterministic
Remotion render — no generative image or video model, no screenshots.

## Determinism

`BrutalistHesitantWriter` seed is `descartes-b01`. The Descartes components
hold no state and read time only through `useP()`, and each composition is
sized from `beatSeconds` so its clock spans the beat. Kokoro is deterministic
for a given voice and text.

## Voice QA

Narration verified by transcribing every beat back with faster-whisper and
diffing against the intended text; levels checked for clipping. See
VOICE-QA.md.
