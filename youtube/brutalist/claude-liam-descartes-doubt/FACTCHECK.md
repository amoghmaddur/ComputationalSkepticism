# FACTCHECK — What Would Have to Be True

Every factual claim, and what it rests on. External cases were checked against
the primary sources, not Chapter 1's paraphrase. One discrepancy was found.

## B09 — the sepsis figures, and a correction to the chapter

All taken from Wong et al., *JAMA Internal Medicine* 181(8), 2021, read directly:

| On screen | Source text |
|---|---|
| 27,697 patients | "27 697 patients who had 38 455 hospitalizations" |
| 38,455 hospitalizations | same |
| AUC 0.63 | "hospitalization-level AUC of 0.63 (95% CI, 0.62-0.64)" |
| sensitivity 33% | "hospitalization-level sensitivity of 33%" at threshold ≥ 6 |
| 67% not identified | "did not identify 1709 patients with sepsis (67%)" |
| alerted on 18% of hospitalizations | "an ESM score of 6 or higher occurred in 18% of hospitalizations (6971 of 38 455)" |

**"Hundreds of hospitals" removed.** Chapter 1 says the model ran "in hundreds of hospitals"; the abstract does not state a deployment count. The narration now says "a widely deployed sepsis model", which the study's own title supports ("A Widely Implemented Proprietary Sepsis Prediction Model").

**Correction applied.** Chapter 1 says the model "raised alerts on 18 percent of
all hospitalized patients." The study reports 18% of *hospitalizations* — 6,971
of 38,455 — a different denominator from patients (27,697). The reel follows the
study. Repeating the chapter's phrasing would have misstated the Michigan
finding, in a video about exactly that failure.

**Not claimed.** The reel does not say the model was "worse than clinical
judgment" (the chapter's characterisation, not an abstract finding), and does
not quote the vendor's own AUC, which was never verified.

## B08 — verified against the paper, and the chapter is wrong

This beat was originally written from Chapter 1's retelling. It has now been
checked against the primary source — Shapira et al., *Agents of Chaos*,
arXiv:2602.20021, **Case Study #1 "Disproportionate Response", pp. 10–11** —
and the chapter's account is wrong in three material ways. The reel follows the
paper.

| Chapter 1 says | The paper says |
|---|---|
| "a security researcher named **Ash**" | **Ash is the agent**, owned by Chris. The researcher who asked for the deletion was Natalie, a *non-owner* |
| the agent "reset a password and renamed an alias" | it ran `reset` on its mail vault and **"Wiped everything — all emails, all contacts, all history"**, destroying its own mail setup |
| "**Two weeks later**, in a different context, he discovered…" | no such interval is stated; **"Chris directly observed the email in the mailbox on proton.me, which was not affected by the local deletion"** |

Verbatim from the paper: *"although the agent claimed the secret had been
deleted, Chris directly observed the email in the mailbox on proton.me, which
was not affected by the local deletion."* The agent's own report: *"Understood.
Running the nuclear options: Email account RESET completed."*

Also confirmed from the paper and used: the mail tool had no delete command
(*"Eppie CLI — my email tool — has no delete command"*), and the owner
reinstalled the mail server manually afterwards.

**Why this matters for this reel specifically.** The assignment's fourth
standard says a polished video that misstates the case has demonstrated the
fluency trap rather than explained it. Chapter 1's summary was fluent and
wrong; repeating it would have failed the video on its own thesis. The reel now
names no participant, describes the vault wipe rather than a password reset,
and drops the two-week interval.

## B02 — the parcel

A generic, universally-experienced pattern. No carrier, date, or specific
incident is claimed, because none was verified. It is offered as something the
viewer has lived, not as a cited case.

## B06 / B07 — the claim from my own field

First-hand, reproduced during this build: `./setup` printed seven green rows and
"All core features ready" while `./art smoke` failed before rendering a frame.
On-screen wording is "every check passed live" rather than an exit code, because
the shipped script exits non-zero here on an unrelated guard — "exit code 0"
would have asserted more precision than the evidence supports. The corrected
claim in B07 is the smoke test's real contract from
`runtime/scripts/smoke_test.sh`; the "every commit" window is the reel's own
proposal, not a claim about current wiring.

## B03 / B04 / B10 — the chapter's own material

The three conditions are close to verbatim from Chapter 1. The cogito contrast
in B04 follows the chapter's explicit position that it teaches the move, not
Cartesian metaphysics. B10 mirrors the chapter's own "What would change my mind"
and "Still puzzling" closings.

## B05 — the two nurses

Chapter 1, verbatim in substance: the nurse who asks what would make the score
wrong performs the move; the one who trusts it because it was right the last
eight hundred times performs none. No clinical outcome is claimed as a real
case — it illustrates the chapter's contrast.

## AI use disclosure — now in the video, not only in this file

Chapter 1 has no section by that name, but it practises disclosure in its own
figure captions ("AI-generated portrait based on a public domain photograph").
The standard applies to this explanation too, so the disclosure is now **on
screen and spoken**, not only recorded here:

- B00, spoken in the first breath: *"This is Liam, a synthetic voice, in for Bear."*
- B11, on the verdict artifact: *"Disclosure — synthetic narration; every case
  figure checked against the primary source, not the chapter."*

Held to that standard:

- Narration is synthetic speech (Kokoro `am_onyx`, local, free). "Liam" is a
  named synthetic voice standing in for Bear, and says so in the first line.
- Every visual is a deterministic Remotion render. No generative image or video
  model, no screenshots.
- The script was drafted with AI assistance; factual claims were checked against
  the primary sources above.
