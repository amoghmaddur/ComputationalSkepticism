# What It Had to Guess

**Amogh Maddur** · INFO 7375 · Final project pitch film · October 2026

| | |
|---|---|
| **Name** | Amogh Maddur |
| **Working title** | *What It Had to Guess* — finishing Pepper: verifying it on the live sites |
| **Target role** | An applied AI role working on context and permissions: how much an AI is told, and how much it is allowed to do |
| **Runtime** | 3:57 (236.96 s) · 3840×2160 · 24 fps · stereo AAC |
| **Film** | `What-It-Had-to-Guess.mp4` — the clean master, no review markers |
| **Narration** | Synthetic (Kokoro `am_puck`, local). The film says so in its first sentence. |

## What this is

A pitch, not a build. **Pepper — The Personal AI Prompter** is a Chrome/Edge
extension I designed; Claude wrote its v0.3 code against my design document.
You type a rough request on an AI chat site, and Pepper turns it into a full
prompt using what you have already told it. Anything it had to guess, it shows
you instead of inserting. It never presses send.

Every automated check Pepper has ran against **mock pages built from its own
selectors**. The project the film pitches is the part that does not exist
yet: verifying it on the five live sites, and publishing what fails.

The film answers the assignment's seven questions. `PROJECT-BRIEF.md` answers
them on one page and ends with what **exists today** and what **will exist**.

## What is in this folder

| File | What it is |
|---|---|
| `What-It-Had-to-Guess.mp4` | The film |
| `PROJECT-BRIEF.md` | One page: the seven answers, then *Exists today* and *Will exist* |
| `beat_sheet.json` | The narration and visual plan the film is rendered from — 14 beats |
| `BUILD-PROMPT.md` | The prompt and the commands that rebuild it |
| `SOURCES.md` | What I used, what I made, what Claude contributed, every licence, every claim traced |
| `FRICTIONAL.md` | Dated entries, starting with a prediction written before any work |
| `gates/` | The toolkit's gate reports — summary in `gates/CHECKS-REPORT.md` |
| `toolkit.patch` | The toolkit changes this film needs, against the fork's commit `dcf9dac` |
| `tools/` | The small scripts used for voice QA, headroom, reveal timing and frame review |

## The gates

All passed on the final master (14 October 2026). Details and the one
exemption are in `gates/CHECKS-REPORT.md`.

| Gate | Result | Report |
|---|---|---|
| GATE F — paperwork before rendering | PASS | `gates/FACTCHECK.md`, `gates/SHOTLIST.md`, `gates/PROMPTS.md` |
| GATE L — no one-sentence slides | PASS | `gates/log-art-run.txt` |
| GATE V — frame-level visual QC | PASS, 0 BLOCKER / 0 MAJOR | `gates/qc-REPORT.md`, `gates/qc-sheet.png` |
| GATE T — typography | PASS, 0 FAIL | `gates/TYPECHECK.md` |
| Render integrity | `status: ready` | `gates/verified.json` |
| Voice QA | No wrong words | `gates/VOICE-QA.md` |

## How to rebuild it

You need the toolkit fork at `github.com/amoghmaddur/ComputationalSkepticism`,
commit `dcf9dac`, set up with `./setup --install` (Python 3.13 venv, Node,
FFmpeg, Kokoro). Then, from the toolkit root:

```bash
git apply fall-2026/amogh-m/final-project-film/toolkit.patch
```

```bash
mkdir -p youtube/brutalist/pepper-context-and-access && cp fall-2026/amogh-m/final-project-film/beat_sheet.json youtube/brutalist/pepper-context-and-access/
```

```bash
cp fall-2026/amogh-m/final-project-film/gates/{FACTCHECK,SHOTLIST,PROMPTS}.md youtube/brutalist/pepper-context-and-access/
```

```bash
python3 runtime/scripts/generate_audio_kokoro.py youtube/brutalist/pepper-context-and-access
```

```bash
python3 -I fall-2026/amogh-m/final-project-film/tools/headroom.py youtube/brutalist/pepper-context-and-access -3.0
```

```bash
python3 runtime/scripts/remotion_scenes.py youtube/brutalist/pepper-context-and-access --force
```

```bash
./art run youtube/brutalist/pepper-context-and-access
```

```bash
./art final youtube/brutalist/pepper-context-and-access
```

The master lands at `renders/pepper-context-and-access.mp4`.

**Audio is the clock.** The beat sheet already holds every reveal time as a
fraction of its beat's measured audio. Kokoro is deterministic, so the same
narration gives the same durations and the same timing. If you change any
narration, run `tools/voice_qa.py`, then `tools/anchors.py` and
`tools/anchors_composer.py`, to re-derive the timings from the new words.

The patch adds the B04 screenshot under `runtime/remotion/public/pepper/`.
The original is in Pepper's own repository, in
`pepper-tests/e2e/shots-2026-10-10/`.

## Privacy

No real résumé, contact, application tracker or conversation transcript is in
the film or this folder. Everything shown is an example, a test fixture, or a
public page.
