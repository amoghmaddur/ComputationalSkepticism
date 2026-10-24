# Build Prompt — "What It Had to Guess"

The prompt that rebuilds the film, and the exact commands it runs. Paste
section 1 into Claude Code, opened in the toolkit fork
(`github.com/amoghmaddur/ComputationalSkepticism`, commit `dcf9dac`, with
`toolkit.patch` applied), with `pepper-v0.3.zip` unpacked beside it.

The film was built in one Claude Code session on 10 October 2026, then
revised after I watched it (see `FRICTIONAL.md`), and mastered on 14 October.
This prompt collects that session's instructions in the order they ended up
mattering. It is not a transcript.

---

## 1. The prompt

> Read every file in `pepper-v0.3/` before writing anything. Run both of its
> test suites — `node --test unit/*.test.js` and `npm run test:browser` — and
> record the exact output and the date.
>
> Then make a 2–4 minute Brutalist pitch film for my final project, using this
> toolkit's `ai-explainer` skill (read the whole `SKILL.md` first): **taking
> Pepper from "verified against mock pages" to "verified against the five live
> sites", and publishing what fails.**
>
> **Order:** open on the problem a user actually hits — a rough request, and
> what it leaves out — and on what using Pepper looks like. Testing and
> technical detail come later. The film's argument: a prompt is only as good as
> the context behind it, and missing context costs more the more a tool is
> allowed to do. Pepper's difference is that it shows you what it had to guess
> instead of inventing it.
>
> Answer the seven questions: what it is and what exists when it is done; why
> anyone would care, naming one or two real alternatives you actually looked
> at; who opens it and what they do in the first 60 seconds; what it proves
> about me; what is in, out and first, and one thing it will deliberately not
> do; one concrete risk and its mitigation; and why this project, saying which
> part is showing off.
>
> **Honesty rule — every word and every frame:**
> - Past tense only for things that exist and can be shown. Everything else is
>   "will".
> - No invented users, employers, metrics, testimonials or results. If a number
>   has not been measured, show a blank.
> - Real screenshots only, each dated. Mock-ups are labelled constructed on
>   screen.
> - Any Claude interface shown is labelled reconstructed. No model reply is
>   shown that was not actually produced.
> - Narrate as me, Amogh Maddur, with a synthetic voice that says it is
>   synthetic. Do not use the instructor's name, persona, handle or outro.
> - Say who wrote what: I wrote Pepper's design document and directed the
>   build; Claude wrote the v0.3 code.
> - Check every count against the files. Do not carry a number forward from a
>   summary.
>
> Use Kokoro `am_puck`. Transcribe every beat back and fix any misheard word by
> rewording, never by editing audio. Check how it says my name. Give every beat
> the same headroom.
>
> Search the scene library before authoring any beat. Derive every reveal from
> measured word timestamps, including the composer's typing. Crossfade between
> beats without moving any beat's audio. Run every gate, look at the frames,
> fix what fails and re-render. Stop at the review cut for me to watch before
> building the master.

## 2. What it produces

`PROJECT-BRIEF.md` · `beat_sheet.json` (14 beats) · the 4K master · the gate
reports in `gates/` · `SOURCES.md` · `FRICTIONAL.md`.

## 3. The commands

From the toolkit root, with the Python 3.13 venv on `PATH`.

**Apply the toolkit changes this film needs:**

```bash
git apply fall-2026/amogh-m/final-project-film/toolkit.patch
```

**Library first, for every beat:**

```bash
./art scenes "what the beat needs"
```

**Pepper's own tests** (in `pepper-v0.3/pepper-tests/`; the browser suite needs
Playwright and its Chromium, and `PEPPER_CHROME` pointing at a Chromium that
can load extensions):

```bash
node --test unit/*.test.js
```

```bash
npm run test:browser
```

**Narration, then one uniform headroom pass:**

```bash
python3 runtime/scripts/generate_audio_kokoro.py youtube/brutalist/pepper-context-and-access
```

```bash
python3 -I fall-2026/amogh-m/final-project-film/tools/headroom.py youtube/brutalist/pepper-context-and-access -3.0
```

**Voice check, then every reveal timed from the words** (only needed if the
narration changes; the beat sheet already holds the results):

```bash
python3 -I fall-2026/amogh-m/final-project-film/tools/voice_qa.py youtube/brutalist/pepper-context-and-access
```

```bash
python3 -I fall-2026/amogh-m/final-project-film/tools/anchors.py youtube/brutalist/pepper-context-and-access
```

```bash
python3 -I fall-2026/amogh-m/final-project-film/tools/anchors_composer.py youtube/brutalist/pepper-context-and-access
```

**Scenes, review cut and gates, then the master:**

```bash
python3 runtime/scripts/remotion_scenes.py youtube/brutalist/pepper-context-and-access --force
```

```bash
./art run youtube/brutalist/pepper-context-and-access
```

```bash
./art final youtube/brutalist/pepper-context-and-access
```

`review_sheets.py` and `which_blob.py` in `tools/` are review aids: per-beat
frame strips from a cut, and GATE T's own measurement of which text run it
flagged.

## 4. What it will not do

Publish anything. The toolkit has no upload path, and this prompt asks for
none. The film is written to a folder; what happens to it next is mine.
