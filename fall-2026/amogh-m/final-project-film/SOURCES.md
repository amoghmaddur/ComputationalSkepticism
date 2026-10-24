# Sources — "What It Had to Guess"

What I used, what I made, what Claude contributed, and every third-party asset
with its licence. Then every claim in the film, traced to where it comes from.

---

## 1. What I used

| # | Source | Got it how, and when | Used for |
|---|---|---|---|
| **S1** | **Pepper v0.3** — `pepper-v0.3.zip`, my own project. Files read: `CHANGES.md`, `pepper-extension/README.md`, `PRIVACY.md`, `manifest.json`, `lib/core.js`, `content.js`, `pepper-tests/README.md`, `e2e/browser.test.js`, `e2e/mock-sites.js`, `docs/LIVE-TEST-PROTOCOL.md`. | My own package, unpacked 10 Oct 2026. | B02–B11 |
| **S2** | **Pepper's unit tests** — `node --test unit/*.test.js`. Output: `tests 75 / pass 75 / fail 0`, `duration_ms 6378`, Node v24.13.0. | Run in this build session, on my machine, 10 Oct 2026. | B06, B11 |
| **S3** | **Pepper's browser tests** — `npm run test:browser`. Output: `tests 22 / pass 22 / fail 0`, 70.3 s. The 22 are two parent groups holding 7 and 13 checks: the 20 checks `CHANGES.md` counts. Chrome for Testing 156.0.8078.4, Windows 11, local mock pages only. | Run in this build session, on my machine, 10 Oct 2026, after installing Playwright 1.64.0 (with my approval). | B04, B06 |
| **S4** | **Screenshot** `panel-result-model.png`, written by S3's run. 1280×860, SHA-256 `770d5303…cb60ad`. Kept in `pepper-tests/e2e/shots-2026-10-10/`; the package's own 2 Oct copy is untouched in `shots/`. | Produced by S3, 10 Oct 2026. | B04 |
| **S5** | **ChatGPT Custom Instructions FAQ** — help.openai.com/en/articles/8096356 (page reads "Updated: 2 months ago"). | Read in the browser pane, 10 Oct 2026. | B00, B05 |
| **S6** | **AIPRM home page** — aiprm.com. | Fetched and read, 10 Oct 2026. | B05 |
| **S7** | **Brutalist toolkit** — my fork of `nikbearbrown/brutalist.art` at `github.com/amoghmaddur/ComputationalSkepticism`. The renderer, the audio pipeline, the quality gates, and the reused scene components. | Cloned 23 Sep 2026. | Every frame |

I did **not** install or run either alternative (S5, S6). The film says so on
screen in B05.

I have **not** read Pepper's design document,
`Pepper-The-Personal-AI-Prompter-SDD-and-Reflection.pdf`. It is named in
`CHANGES.md` but is not in the package. Nothing in the film depends on it.

---

## 2. What I made

For this film, 10–14 October 2026. All toolkit changes are in `toolkit.patch`.

- `PROJECT-BRIEF.md` — one page: the seven answers and the two closing lists.
- `beat_sheet.json` — 14 beats, narration, stage directions, every reveal time.
- **Five new scene components** — `runtime/remotion/src/PepperIllu.tsx`:
  `PepperSixParts`, `PepperAccessLadder`, `PepperAlternatives`,
  `PepperScreenshot` (a real screenshot moved by a camera, with a provenance
  caption), and `PepperAssumptions` (built for B04, then replaced by the real
  screenshot; it stays in the library unused).
- **One new outro component** — `runtime/remotion/src/scenes/PortfolioTitleOutro.tsx`.
  Exists because the toolkit's `ClaudeTitleOutro` hardcodes the instructor's
  handle (`@NikBearBrown`, "no prop, no lookup, no override"), and this
  assignment forbids using it.
- **Optional props on existing components**, each defaulting to the old
  behaviour so other reels render unchanged:
  - `DescartesIllu.tsx` (my own, from my previous reel): ledger `count`
    (a counter caught mid-roll would read "37 of 75", a false result),
    `sourceAt`, `rowGap`; protocol `claimAt`, `questionAt`, `claimPreview`,
    `slotsAt`; correction `evidence`, `strikeSpan`, `beforeInk`; split
    headings that shrink to one line instead of wrapping under their rule.
  - `ClaudeComposerAsk.tsx` (the toolkit's): `typeAt`, `typeDur`, `runAt`,
    `outputAt`, so typing follows the narration instead of a fixed 1.5 s.
- **Crossfade transitions in `runtime/scripts/compile.py`**, opt-in through
  `metadata.transition`. Each crossfade starts on the next beat's first audio
  frame, so no beat's sync moves; without the key, compile is unchanged.
- **One GATE T exemption in `runtime/scripts/type_check.py`**, for
  `PepperScreenshot` only, with the reason beside it (`gates/CHECKS-REPORT.md`).
- `BUILD-PROMPT.md`, `FRICTIONAL.md`, this file, `README.md`,
  `gates/CHECKS-REPORT.md`, and the scripts in `tools/`.

**Reused from the library, not made for this film:** `DescartesLedger`,
`DescartesCorrection`, `DescartesChecklist`, `DescartesProtocol`,
`DescartesSplit` (written by me, for my previous reel), and the toolkit's
`ClaudeComposerAsk`, `BrutalistHesitantWriter`, `ClaudeVerdictArtifact`.

---

## 3. What Claude contributed

**To Pepper itself:** the v0.3 code. `CHANGES.md` records the build as "Claude
steps" C1–C17 against my design document, with "Human steps" H1–H14 left for
me, of which H2 to H14 are open. I wrote the design document and directed the
build. The film says this in B10.

**To this film:** Claude (Opus 5.5, in Claude Code) did the build under my
direction, on 10 October 2026, and built the master on 14 October. Specifically, it:

- read the Pepper package and ran both of its test suites (S2, S3);
- read both alternatives' pages (S5, S6);
- drafted the brief, the narration, and every document in this folder;
- wrote the new components and props;
- generated the narration, checked it by speech recognition, and derived every
  reveal time from measured word timestamps;
- ran the toolkit's gates, inspected the frames, and fixed what failed.

**The decisions were mine:** the project (finishing Pepper's live-site
verification), the thesis (context matters more as an AI gets more access),
the requirement to be held to the honesty rule throughout, and the approval to
install Playwright and re-run the browser checks.

**No generative image or video model was used.** Every frame is a
deterministic render: same inputs, same pixels. The one non-rendered image is
S4, a real screenshot.

---

## 4. Third-party assets and licences

| Asset | Licence | Checked against |
|---|---|---|
| **Kokoro-82M** model weights (`kokoro-v1.0.onnx`, `voices-v1.0.bin`), voice `am_puck` | Apache-2.0 | Model card, huggingface.co/hexgrad/Kokoro-82M: "License: apache-2.0" |
| **kokoro-onnx** 0.6.1 | MIT | `LICENSE` in the installed package |
| **faster-whisper** 1.2.1 (QA only, never in the film) | MIT | Package metadata |
| **onnxruntime** 1.30.0, **ctranslate2** 4.8.2 | MIT | Package metadata |
| **Remotion** 4.0.486 | Remotion License, free tier: "an individual" may use it "for free (even commercial)" | `node_modules/remotion/LICENSE.md` |
| **Playwright** 1.64.0 (testing only) | Apache-2.0 | `node_modules/playwright/package.json` |
| **Chrome for Testing** 156.0.8078.4 (testing only; renders the S4 screenshot) | Google's Chrome for Testing build, downloaded by Playwright from Google's `chrome-for-testing-public` bucket | `chrome-win64/ABOUT` |
| **EB Garamond**, **Inter** fonts | SIL Open Font License 1.1 | `runtime/fonts/*/OFL.txt` |
| **FFmpeg** 9.0.2 (gyan.dev full build) | GPL v3 (built with `--enable-gpl --enable-version3`) | `ffmpeg -version` |
| **Brutalist toolkit** (`nikbearbrown/brutalist.art`) | **No LICENSE file** in the upstream repository | Repository root. My fork's `NOTICE.md` says so and offers to take it down on request. |

**The Claude interface look** — the cream, ink and terracotta of
`ClaudeComposerAsk` — is the toolkit's reconstruction of Anthropic's app. It
appears in B00 and B12, and both frames carry an on-screen chip saying
**RECONSTRUCTED UI**.

**The B04 screenshot shows Pepper's own interface** on Pepper's own mock page.
The mock page's header reads "ChatGPT (mock)"; it is a test page from
`mock-sites.js`, not OpenAI's site.

**Narration is synthetic.** No human voice is used anywhere. B00 says so in its
first sentence.

---

## 5. Every claim in the film, and where it comes from

| Beat | On screen or spoken | Source | Status |
|---|---|---|---|
| B00 | "help me write a cover letter" | — | An example request, not my data |
| B00 | "missing: who you are / what the job is / what to avoid" | — | **Constructed annotation, not a model reply.** The chip says "RECONSTRUCTED UI · NO MODEL WAS RUN". |
| B00 | "Tomorrow you'll type that background again, or set it up separately on every site you use." | S5 — ChatGPT's own context feature is per-site | The problem as a user meets it. First drafted as "you'll type that background again, on every site", which ignored per-site features like S5. |
| B02 | ROLE, CONTEXT, TASK, CONSTRAINTS, OUTPUT FORMAT, SUCCESS CRITERIA | S1, `lib/core.js` line 90, `SECTIONS`; S4 shows them in the panel | **Verbatim** labels |
| B02 | The six plain descriptions ("the background it can't guess"…) | S1, `lib/core.js` lines 92–97 | **Shortened** from Pepper's own purpose lines |
| B02 | "using what you've already told it" | S1, `pepper-extension/README.md` and `PRIVACY.md`: the up-to-15 "About you" answers, memories and files, kept in the browser | True of v0.3 |
| B02 | "Built for ChatGPT, Claude, Gemini, Perplexity and Copilot." | S1, `manifest.json` match patterns; `SITES` in `lib/core.js` | "Built for", not "works on" — tested on mock pages only |
| B02 | "It never does" (press send) | S1, `insertIntoSite` in `content.js` | Code read: no click, key event or submit in its 28 lines. Tested on mocks (S3). |
| B03 | Four rungs of access and their cost bars | — | **Constructed illustration.** Footer: "Illustrative. The ordering is the claim; the widths are not measured." |
| B03 | Pepper stops at rung two | S1, `insertIntoSite` | As above |
| B04 | The panel, its six sections, "Pepper assumed these", "None of them are in your prompt", "I am applying for roles in the United States.", "Add to prompt" | **S4** | **Real screenshot**, unaltered. Caption: "Real screenshot · Pepper's browser test, 10 Oct 2026 · mock page, mocked model, synthetic data" |
| B04 | The data in it — "Stripe new-grad SWE role", `resume.txt`, the model's reply | S1, `e2e/browser.test.js` lines 96, 110, 204–205 | **Test fixtures.** Synthetic, not my data. The model reply is the test's mocked `apiReply`. |
| B04 | "Facts may come only from your stored profile, memories and files" (spoken) | S1, `lib/core.js`, `buildSystemPrompt`: "may come ONLY from the USER PROFILE, MEMORIES and FILES" | Paraphrase of a verbatim rule |
| B05 | "Your custom instructions are applied immediately to all chats." | S5 | **Verbatim** |
| B05 | "a community-driven prompt library" / "5,400+ Prompts" | S6 | **Verbatim** |
| B05 | One site; kept on your account | S5 (the page describes ChatGPT's own settings, tied to the OpenAI account) | Paraphrase |
| B06 | 75 of 75 unit tests | S2 | Measured |
| B06 | 20 of 20 browser checks, on mock pages | S3 | **Measured** on 10 Oct 2026. First drafted as "on record", from `CHANGES.md`, before the re-run. |
| B06 | 22 screenshots | S1, `ls pepper-tests/e2e/shots/*.png` → 22 | Counted. **First drafted as 26**, which is every PNG in the package including four icons. Caught before the final render; see FRICTIONAL.md. |
| B06 | 0 live sites | S1, `CHANGES.md` C17 | True of the package |
| B07 | `input: "#prompt-textarea"` / `<div id="prompt-textarea" …>` | S1, `lib/core.js` `SITES`; `e2e/mock-sites.js` line 42 | **Verbatim** — the mock is built from the selector it tests |
| B07 | 20 inserts per site; 99% | S1, `CHANGES.md` C17, N4: "≥ 99% of 20 inserts per live site" | The project's own condition |
| B07 | "Insert works on ___ at __ of 20, Chrome ___, on ___." | — | **Blanks on purpose.** No rate has been measured, so none is shown. |
| B08 | Two permissions: storage, unlimitedStorage | S1, `manifest.json` | **Verbatim** |
| B08 | Reads the box, not the page | S1, `PRIVACY.md`: "Pepper never reads the rest of the page you are on." | Paraphrase |
| B08 | "The live-site row, N4, is still blank." | S1, `CHANGES.md` C17 and `LIVE-TEST-PROTOCOL.md` | True of the package |
| B09 | The model in those tests was mocked | S1, `CHANGES.md`, "Not tested": "A real model's output (the model was mocked)." | True of the package |
| B09 | Nobody but me has used it | S1, `CHANGES.md`: H5–H8 and H13–H14 open | True of the package |
| B10 | I wrote the design document; Claude wrote the code | S1, `CHANGES.md` (Claude steps / Human steps) | True of the package |
| B11 | Both lists | `PROJECT-BRIEF.md` | Same sources as above |
| B12 | The suggested prompt | — | Mine. **Not run**, and the chip says so. No answer is shown. |

## Claims deliberately not made

- **No insert rate, latency or user number of any kind.** None has been measured.
- **No claim that Pepper works on Windows or in Chrome for Testing beyond the
  mock pages.** The browser run used mocks, like every run before it.
- **No claim that Pepper beats either alternative at anything measured.** The
  comparison is of what each product says it does.
- **No claim about AIPRM's privacy or data handling.** Its home page does not
  say, so the film does not either.
- **No real résumé, contact, application tracker or conversation transcript.**
  Everything in B02 and B04 is an example or a test fixture.
