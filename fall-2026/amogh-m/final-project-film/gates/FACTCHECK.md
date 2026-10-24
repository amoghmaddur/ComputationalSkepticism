# FACTCHECK — What It Had to Guess

Every factual claim and what it rests on. The full claim-by-claim table is
`SOURCES.md` §5 in the submission folder; this file records what was checked
by hand and what the check found.

## Checked against the thing itself, not a description of it

| Claim | Check | Result |
|---|---|---|
| 75 unit tests pass | Ran `node --test unit/*.test.js`, 10 Oct 2026 | `tests 75 / pass 75 / fail 0`, 6378 ms |
| 20 browser checks pass | Installed Playwright 1.64.0 (approved) and ran `npm run test:browser`, 10 Oct 2026, Chrome for Testing 156.0.8078.4 | `tests 22 / pass 22 / fail 0` = 2 parent groups of 7 + 13 checks, 70.3 s. **Mock pages only.** |
| 22 screenshots | `ls pepper-tests/e2e/shots/*.png` | **22.** First drafted as 26 — see below |
| Six section labels | `lib/core.js` line 90, `SECTIONS` | Verbatim |
| Two permissions | `manifest.json` | `"permissions": ["storage", "unlimitedStorage"]` |
| Never presses send | `CHANGES.md` C8; `insertIntoSite` in `content.js` | "dispatches no key events and clicks nothing" — code read, tested on mocks only |
| Selectors are best-effort | Comment above `SITES` in `lib/core.js` | "best-effort for the live sites as of 2026-10 and MUST be re-verified" |
| 99% of 20 inserts | `CHANGES.md` C17, N4 | The project's own condition, not a result |
| The model in the tests was mocked | `CHANGES.md`, "Not tested, or known limits" | "A real model's output (the model was mocked)." |
| B04 screenshot content is synthetic | `e2e/browser.test.js` lines 96, 110, 204–205 | The cover-letter request, résumé text and model reply are test fixtures |
| B04 screenshot is real and unaltered | Written by the 10 Oct browser run; SHA-256 compared after copying | `770d5303…cb60ad`, identical |
| B07 mock is built from the selector | `lib/core.js` SITES[chatgpt].input vs `e2e/mock-sites.js` line 42 | Both `#prompt-textarea` |
| ChatGPT Custom Instructions quote | help.openai.com/en/articles/8096356, read 10 Oct 2026 | Verbatim |
| AIPRM quotes | aiprm.com, read 10 Oct 2026 | Verbatim |

## Three errors caught before the final render

1. **"26 screenshots" was wrong.** The package holds 26 PNGs, but four are the
   extension's icons. The screenshot folder holds 22. The figure had been
   carried forward from an earlier summary instead of recounted.
2. **"Building an extension and writing seventy-five tests, I could already
   do" overclaimed authorship.** `CHANGES.md` records v0.3 as Claude steps
   C1–C17 against my design document. B10 now says I designed and directed
   and Claude wrote the code.
3. **B02's footer said the six purposes were "as written in lib/core.js".**
   The labels are; the purposes were shortened to fit. The footer now says so.

## Not claimed, on purpose

No insert rate, latency, user count or rating. No claim that Pepper beats
either alternative at anything measured. Nothing about AIPRM's data handling —
its home page does not say.
