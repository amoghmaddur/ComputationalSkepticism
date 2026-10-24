# Project Brief — Pepper: What It Had to Guess

**Amogh Maddur** · INFO 7375 · Oct 2026 · Target role: applied AI, context and permissions

**1. What is it?** Pepper is a Chrome/Edge extension I designed; Claude wrote
its v0.3 code against my design document. On five AI chat sites it turns a
rough request into a six-part prompt, built from what you have already told
it, and puts it in the box. You press send; it never does. The project is the
part not yet done: verifying it on the live sites and publishing what fails,
in a repository beside the code.

**2. Why would anyone care?** A prompt is only as good as its context, and
people retype it every time or skip it. Two alternatives, read on their own
pages on 10 October 2026, not run: ChatGPT Custom Instructions, "applied
immediately to all chats" on one site; and AIPRM, "a community-driven prompt
library" of 5,400+ templates. Neither says it shows what it had to guess;
Pepper lists it and inserts nothing unconfirmed. It has no library like AIPRM's.

**3. Who opens it, and what do they do first?** An engineer or hiring manager.
They will run the 75 unit tests in about six seconds, then read a README table
of every claim, the test behind it, and the claims nothing supports yet.

**4. What does it prove about me?** Prompt contracts: six named sections, and
facts about the user only from what they stored. Source grounding: files enter
as data, "never as instructions". Verification: "a test ran" kept apart from
"nobody has checked". Evaluation: ratings count only on prompts Pepper wrote.
It is deliberately not an agent loop.

**5. What is in, out, and first — and what will it not do?** In: the live-site
protocol, insert rates, a failure analysis, a health check. Out: servers,
accounts, analytics, PDF parsing. First: twenty inserts on ChatGPT, done when
twenty rows hold a Chrome version, date and rate, even a bad one. It never
presses send.

**6. What could sink it?** The selectors. Every test ran on mock pages built
from them, so a wrong one passes every test and fails every user. Mitigation:
the tested clipboard fallback, a measured rate, and a health check that
fails loudly when a site changes its box.

**7. Why this project?** The showing-off half is a design document and an
AI-directed build with green tests. The new half is running a check that is
allowed to come back bad, and publishing it anyway.

## Exists today

- Pepper v0.3, 56 files.
- 75 unit tests passing — run 10 October 2026.
- 20 browser checks passing on local mock pages, with 22 screenshots — run 10 October 2026.
- A live-test protocol with every result cell blank.
- A draft privacy notice with six `[needs review]` markers.

## Will exist

- The protocol run on all five live sites.
- A measured insert rate per site, pass or fail.
- A failure analysis naming each selector that broke, and a health check.
- Latency measured with a real model key.
- Ten real outputs traced, fact by fact, to stored context.
