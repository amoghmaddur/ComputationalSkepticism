"""Composer beats (B00 cold open, B12 handoff): typing runs across the span in
which the typed words are actually spoken; output lines land on their words.
All values are fractions of the beat's measured duration."""
import sys, io, os, json, re
reel = sys.argv[1]
sp = os.path.join(reel, "beat_sheet.json")
S = json.load(io.open(sp, encoding="utf-8"))
W = json.load(io.open(os.path.join(reel, "_qc_words.json"), encoding="utf-8"))
norm = lambda w: re.sub(r"[^a-z0-9]", "", w.lower())

def span(bid, first, last):
    words = W[bid]["words"]; seq = [norm(w["w"]) for w in words]
    f = [norm(t) for t in first.split()]; l = [norm(t) for t in last.split()]
    i0 = next(i for i in range(len(seq)) if seq[i:i + len(f)] == f)
    i1 = next(i for i in range(i0, len(seq)) if seq[i:i + len(l)] == l) + len(l) - 1
    return words[i0]["t0"], words[i1]["t1"]

def start(bid, phrase):
    return span(bid, phrase, phrase.split()[-1])[0]

B = {b["beat_id"]: b for b in S["beats"]}
for bid, (first, last), run, outs in [
    ("B00", ("help me", "cover letter"), "doesn't know", ["who you are", "what the job", "what to avoid"]),
    ("B12", ("Take the last", "second column"), "That count", []),
]:
    dur = float(B[bid]["actual_duration_s"])
    pr = B[bid]["shot"]["remotion"]["props"]
    t0, t1 = span(bid, first, last)
    pr["typeAt"] = round(max(0.0, t0 / dur - 0.01), 3)
    pr["typeDur"] = round((t1 - t0) / dur, 3)
    pr["runAt"] = round(start(bid, run) / dur - 0.02, 3)
    if outs:
        pr["outputAt"] = [round(start(bid, o) / dur - 0.01, 3) for o in outs]
    print(f"{bid} ({dur:.2f}s) type {pr['typeAt']}+{pr['typeDur']}  run {pr['runAt']}  out {pr.get('outputAt')}")

io.open(sp, "w", encoding="utf-8", newline="\n").write(json.dumps(S, ensure_ascii=False, indent=2) + "\n")
