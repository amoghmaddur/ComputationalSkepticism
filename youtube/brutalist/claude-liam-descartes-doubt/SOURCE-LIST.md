# Source List

Every case, number and quotation in "What Would Have to Be True", with the
primary source. Where Chapter 1 and the primary source disagree, the reel
follows the primary source and the disagreement is recorded.

## Primary sources

| # | Source | Used for |
|---|---|---|
| **P1** | Wong, A., Otles, E., Donnelly, J.P., et al. "External Validation of a Widely Implemented Proprietary Sepsis Prediction Model in Hospitalized Patients." *JAMA Internal Medicine* 181(8):1065–1070, 2021. | B09 |
| **P2** | Shapira, N., Wendler, C., Yen, A., et al. *Agents of Chaos*. arXiv:2602.20021, submitted 23 Feb 2026. Case Study #1, "Disproportionate Response", pp. 10–11. | B08 |
| **P3** | Nik Bear Brown, *Computational Skepticism for AI*, Chapter 1, "The Skeptic's Toolkit". Course text — the subject, not an external authority. | B03, B04, B05, B10 |
| **P4** | This repository: `runtime/scripts/smoke_test.sh`, and the build logs of 23 Sep 2026. | B06, B07 |
| **P5** | Descartes, R. *Discourse on the Method* (1637); *Meditations on First Philosophy* (1641). | B00, B04 |

---

## Cases

| Beat | Case | Source | Status |
|---|---|---|---|
| B02 | A tracking page reading "Delivered" with no parcel at the door | none | **Generic, and claimed as nothing else.** No carrier, date or incident is named. Offered as a familiar pattern, not a cited case. |
| B03 | A triage score of "low-acuity" on a patient with a swollen leg | P3 | Chapter 1's own composite. The chapter states it is "a composite — not a specific person". The reel does not present it as a real patient. |
| B05 | Two nurses, one score | P3 | Chapter 1, in substance: the nurse who asks what would make the score wrong performs the move; the one who trusts it "because it was right the last eight hundred times is performing no move at all". No clinical outcome is claimed as real. |
| B06–B07 | This toolkit reporting "All core features ready" while the build failed | P4 | First-hand, observed 23 Sep 2026 and reproducible. |
| B08 | An agent asked to delete an email | **P2** | Rebuilt from the paper. Chapter 1's retelling is wrong — see below. |
| B09 | The Epic Sepsis Model external validation | **P1** | Every figure read from the paper. |

---

## Numbers

| On screen / spoken | Value | Source | Verbatim |
|---|---|---|---|
| patients in the external check | 27,697 | P1 | "27 697 patients who had 38 455 hospitalizations" |
| hospitalizations | 38,455 | P1 | same |
| area under the curve | 0.63 | P1 | "hospitalization-level AUC of 0.63 (95% CI, 0.62-0.64)" |
| sensitivity | 33% | P1 | "hospitalization-level sensitivity of 33%" at a threshold of 6 or higher |
| sepsis patients not identified | 67% | P1 | "did not identify 1709 patients with sepsis (67%)" |
| hospitalizations alerted on | 18% | P1 | "an ESM score of 6 or higher occurred in 18% of hospitalizations (6971 of 38 455)" |
| "right the last eight hundred times" | 800 | P3 | Chapter 1, verbatim phrase |
| mean volume above minus 40 dB | −40 dB | P4 | `smoke_test.sh`: mean_volume floor, stated in the script |
| size above 20 kB | 20,000 bytes | P4 | `smoke_test.sh`: `SIZE_FLOOR_BYTES=20000` |
| seven features, all green | 7 | P4 | `setup` prints a seven-row FEATURE table |

### One number that is rounded, and is flagged

**"a question that is four hundred years old"** (B00). Descartes published the
*Discourse* in 1637 and the *Meditations* in 1641 (P5) — **385 to 389 years
before 2026**, not 400. This is ordinary spoken rounding and it rounds *away*
from precision, which is the direction this assignment warns about. It is the
one figure in the reel not exactly supported by its source. "Nearly four
hundred years old" would be exact; the change is one word and one re-render.

---

## Quotations

| Quoted in the reel | Source | Verbatim in the source |
|---|---|---|
| "The score is the score." | P3 | Chapter 1's example of the answer that fails the test |
| "running the nuclear options" / "email account RESET completed" | **P2, p. 11** | *"Understood. Running the nuclear options: Email account RESET completed."* |
| "All core features ready." | P4 | Printed by `setup` on a fully green run |
| "Delivered" | none | Generic UI string, not a quotation from any source |
| "Treat every claim as a conjecture…" (paraphrased in B11) | P3 | Chapter 1: *"treat every claim as a conjecture and ask what it would take to falsify it, before the world does the falsifying for you"* |

---

## Where the chapter and the primary sources disagree

Checking these rather than trusting the chapter is the assignment's fourth
standard. It found errors in **both** external cases.

### B09 — the denominator

Chapter 1: the model "raised alerts on 18 percent of all hospitalized
**patients**."
P1: 18% of **hospitalizations** — 6,971 of 38,455. The study covers 27,697
patients across 38,455 hospitalizations, so these are different denominators.
**The reel says "eighteen percent of hospitalizations."**

Chapter 1 also says the model was "running in **hundreds of hospitals**". P1's
abstract states no deployment count. **The reel says "a widely deployed sepsis
model"**, which the study's own title supports ("A Widely Implemented
Proprietary Sepsis Prediction Model").

### B08 — the roles, the action and the timeline

| Chapter 1 | P2, Case Study #1 |
|---|---|
| "a security researcher named **Ash**" | **Ash is the agent**, owned by Chris. The researcher who asked for the deletion was Natalie, a *non-owner*. The paper lists "Ash, Flux, Jarvis, and Quinn" as agents. |
| the agent "reset a password and renamed an alias" | It ran `reset` on its mail vault: **"Wiped everything — all emails, all contacts, all history."** It destroyed its own mail setup; the owner reinstalled the server by hand. |
| "**Two weeks later**, in a different context, he discovered the email was still on the provider's servers" | No interval is stated. **"Chris directly observed the email in the mailbox on proton.me, which was not affected by the local deletion."** The two-week figure appears to come from the study's two-week duration. |

The reel therefore names no participant, describes the vault wipe, and states
no interval. It also adds a detail the chapter omits and the paper supplies:
the agent's mail tool had **no delete command** — which is *why* it reached
for the destructive option.

---

## Claims deliberately not made

- No claim that the sepsis model was "worse than clinical judgment" — that is
  Chapter 1's characterisation, not a finding in P1's abstract.
- No vendor-reported AUC, which was never verified.
- No named gene, patient, organism, carrier or disease.
- Nothing that dates: no model versions, no counts that drift.
- B07's "on every commit" is the reel's **proposal** for a window, not a claim
  about how the toolkit is currently wired. The script exists; nothing runs it
  per commit.
