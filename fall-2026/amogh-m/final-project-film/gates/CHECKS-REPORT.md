# Gate reports — "What It Had to Guess"

Every gate the toolkit ran on the final master, its result, and the report it
wrote. The master was built on 14 October 2026 by `./art final`; the review
cut before it by `./art run`. Both logs are in this folder.

| Gate | What it checks | Result on the master | Report |
|---|---|---|---|
| **GATE F** | The paperwork exists before rendering | **PASS** — all three present | `FACTCHECK.md`, `SHOTLIST.md`, `PROMPTS.md` |
| **GATE L** | No beat is a one-sentence text slide | **PASS** — `[beat-lint] clean — beat mix OK` | `log-art-run.txt` |
| **GATE SHAPE** | Chart shapes on finance reels | **Skipped** — not a finance reel | `log-art-run.txt` |
| **GATE V** | Frame-level visual QC: edge bleed, title-safe, fill, overlap | **PASS** — 28 frames, 0 BLOCKER, 0 MAJOR | `qc-REPORT.md`, `qc-sheet.png` |
| **GATE T** | Typography: size, overflow, contrast, kerning, overlap | **PASS** — 14 beats, 0 FAIL | `TYPECHECK.md` |
| **Render integrity** | The master matches its beat sheet; hashes of every input | **`status: ready`**, master SHA-256 `2d8acf02…7277a` | `verified.json` |
| **Voice QA** | Every beat transcribed back and diffed against the script | No wrong words | `VOICE-QA.md` |

## What the gates did not pass the first time

GATE V on the first review cut: **2 BLOCKER, 6 MAJOR.** The two BLOCKERs were
mine — a rule drawn 18 px past the title-safe margin (B03), and a fourth
checklist row colliding with its footer (B08). The six MAJORs were underfilled
frames, fixed by showing empty numbered slots as the narration announces how
many there will be. A second pass left 2 MAJOR; the third was clean.

GATE T on the first clean cut: **3 FAIL.** B05's quote text sat just under
the x-height floor (raised to 30 px). B07's strike-through crossed grey text
and dropped its contrast to 2.94:1 (the strike now covers only the false
inference, over ink-coloured text). B04 — see the exemption below.

No gate was turned off, and no threshold was changed.

## One exemption, and why

**B04, `PepperScreenshot`, is exempt from §8.1 (minimum size), §8.3b (local
contrast) and §8.6b (overlap).** The flagged pixels are inside a real
screenshot of Pepper's panel — its own small UI labels, dim text on its dark
background, and adjacent buttons. Enlarging or recolouring them would mean
altering the evidence. The toolkit already exempts `GodotDesignFigure` from
§8.1 for the same reason ("a real Godot engine capture … image pixel content,
not designed typography"). The caption and spark line around the image are
authored type and sit above the floor. The reason is written beside each
exemption in `runtime/scripts/type_check.py` (see `toolkit.patch`).

## One advisory warning, left in deliberately

The skin lint prints, and the beat sheet records:

> B13: palette=claude but the outro is 'PortfolioTitleOutro' — OUTRO LAW wants ClaudeTitleOutro

This is intentional. `ClaudeTitleOutro` hardcodes the instructor's handle,
`@NikBearBrown`, with "no prop, no lookup, no override", and this assignment
forbids using the instructor's name or credit line. `PortfolioTitleOutro`
keeps the outro's look — title restate, terracotta period, name beneath — and
carries my own name. The warning is advisory and does not block a master.

## What no gate measures

Every gate above was green on a cut that still had five problems a viewer
saw at once: a heading cut in half by its rule, a claim on screen three
seconds before the narration reached it, typing that finished before it was
read aloud, abrupt transitions, and an opening about how Pepper works rather
than what it is for. Those were found by watching the film, and fixed. See
`FRICTIONAL.md`, Entry 4.
