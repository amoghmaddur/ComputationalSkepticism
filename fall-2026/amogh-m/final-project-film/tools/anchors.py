"""Derive every reveal fraction from measured word timestamps (phrase anchors).

Each anchor names the spoken words a reveal must land ON. The reveal starts
LEAD beats-fraction before the word so its ease completes as the word lands.
Writes props and the show-block `at` values back into the beat sheet, and
prints a table so every number is traceable to a word.

usage: python -I -X utf8 anchors.py <reel_dir>
"""
import sys, io, os, json, re

reel = sys.argv[1]
sp = os.path.join(reel, "beat_sheet.json")
S = json.load(io.open(sp, encoding="utf-8"))
W = json.load(io.open(os.path.join(reel, "_qc_words.json"), encoding="utf-8"))

def norm(w):
    return re.sub(r"[^a-z0-9]", "", w.lower())

def find(bid, phrase, after=0.0):
    words = W[bid]["words"]
    toks = [norm(t) for t in phrase.split()]
    seq = [norm(w["w"]) for w in words]
    for i in range(len(seq) - len(toks) + 1):
        if words[i]["t0"] < after:
            continue
        if seq[i:i + len(toks)] == toks:
            return words[i]["t0"]
    raise SystemExit(f"{bid}: anchor phrase not heard: {phrase!r}")

# beat -> list of (prop key, index or None, phrase, lead fraction)
PLAN = {
    "B02": [("roughAt", None, "You type", 0.01), ("slotsAt", None, "full prompt", 0.01),
            ("partsAt", 0, "who the AI", 0.02), ("partsAt", 1, "the background", 0.02),
            ("partsAt", 2, "what to write", 0.02), ("partsAt", 3, "the rules", 0.02),
            ("partsAt", 4, "the layout", 0.02), ("partsAt", 5, "what done", 0.02),
            ("footerAt", None, "drops that", 0.0)],
    "B03": [("rungsAt", 0, "only reads", 0.03), ("rungsAt", 2, "sends for you", 0.03),
            ("rungsAt", 3, "act on your account", 0.03), ("rungsAt", 1, "Pepper stops", 0.02),
            ("footerAt", None, "worse paragraph", 0.0)],
    "B04": [("shots.1.at", None, "When the prompt", 0.02), ("shots.2.at", None, "in this box", 0.04),
            ("rings.0.at", None, "in this box", 0.0), ("rings.0.until", None, "add it yourself", 0.02),
            ("rings.1.at", None, "add it yourself", 0.0), ("shots.3.at", None, "Missing context", 0.02)],
    "B05": [("columnsAt", 0, "custom", 0.04), ("gapsAt", 0, "one site", 0.03),
            ("columnsAt", 1, "Second", 0.02), ("gapsAt", 1, "somebody else", 0.03),
            ("columnsAt", 2, "both are real", 0.02), ("gapsAt", 2, "Neither", 0.02),
            ("footerAt", None, "Two of them", 0.0)],
    "B06": [("rowsAt", 0, "unit tests", 0.03), ("rowsAt", 1, "browser checks", 0.03),
            ("rowsAt", 2, "screenshots", 0.03), ("rowsAt", 3, "nobody puts", 0.02)],
    "B07": [("partsAt", 0, "inserts per", 0.03), ("partsAt", 1, "bar of", 0.02),
            ("partsAt", 2, "every Chrome", 0.03), ("afterAt", None, "release", 0.0)],
    "B08": [("rowsAt", 0, "press send", 0.04), ("rowsAt", 1, "two browser", 0.03),
            ("rowsAt", 2, "reads the prompt", 0.03),
            ("footerAt", None, "The moment", 0.0)],
    "B09": [("claimAt", None, "my own claim", 0.02), ("questionAt", None, "What would", 0.02),
            ("slotsAt", None, "Three conditions", 0.01),
            ("conditionsAt", 0, "selectors could", 0.03), ("conditionsAt", 1, "real model", 0.03),
            ("conditionsAt", 2, "nobody but me", 0.03), ("footerAt", None, "opened it", 0.0)],
    "B10": [("leftAt", None, "I designed", 0.02), ("rightAt", None, "The other half", 0.02),
            ("gapAt", None, "Anyone opening", 0.02)],
}

for b in S["beats"]:
    bid = b["beat_id"]
    if bid not in PLAN:
        continue
    dur = float(b["actual_duration_s"])
    props = b["shot"]["remotion"]["props"]
    print(f"{bid}  ({dur:.2f}s)")
    for key, idx, phrase, lead in PLAN[bid]:
        t = find(bid, phrase)
        f = round(max(0.0, t / dur - lead), 3)
        if "." in key:
            node = props
            parts = key.split(".")
            for k in parts[:-1]:
                node = node[int(k)] if k.isdigit() else node[k]
            node[parts[-1]] = f
        elif idx is None:
            props[key] = f
        else:
            arr = list(props.get(key) or [])
            while len(arr) <= idx:
                arr.append(0.0)
            arr[idx] = f
            props[key] = arr
        print(f"   {key + ('' if idx is None else f'[{idx}]'):18s} {f:.3f}   <- '{phrase}' at {t:.2f}s")

io.open(sp, "w", encoding="utf-8", newline="\n").write(json.dumps(S, ensure_ascii=False, indent=2) + "\n")
print("anchors written")
