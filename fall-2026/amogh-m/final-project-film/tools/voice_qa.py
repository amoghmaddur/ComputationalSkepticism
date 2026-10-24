"""Voice QA: ASR round-trip each beat's narration, report word diffs and levels,
and dump word-level timestamps for phrase-anchor derivation.

usage: python -I -X utf8 voice_qa.py <reel_dir>
"""
import sys, os, json, io, re, subprocess, difflib
from faster_whisper import WhisperModel

reel = sys.argv[1]
sheet = json.load(io.open(os.path.join(reel, "beat_sheet.json"), encoding="utf-8"))
asr = WhisperModel("base.en", device="cpu", compute_type="int8")

# narration-only respellings -> what the ear should hear
RESPELL = {"uh-mohg": "amogh", "muddoor": "maddur"}

def norm(t):
    t = t.lower().replace("’", "'")
    t = re.sub(r"[^a-z0-9' -]", " ", t)
    t = t.replace("-", " ")
    return [w for w in t.split() if w]

def levels(mp3):
    r = subprocess.run(["ffmpeg", "-hide_banner", "-nostats", "-i", mp3, "-af",
                        "volumedetect", "-f", "null", "-"], capture_output=True, text=True)
    mx = re.search(r"max_volume: ([-0-9.]+) dB", r.stderr)
    mn = re.search(r"mean_volume: ([-0-9.]+) dB", r.stderr)
    return float(mx.group(1)), float(mn.group(1))

out = {}
for b in sheet["beats"]:
    bid = b["beat_id"]
    mp3 = os.path.join(reel, "mp3", f"beat-{bid}.mp3")
    segs, _ = asr.transcribe(mp3, beam_size=5, language="en", word_timestamps=True)
    words = []
    for s in segs:
        for w in s.words:
            words.append({"w": w.word.strip(), "t0": round(w.start, 3), "t1": round(w.end, 3)})
    heard = " ".join(w["w"] for w in words)
    said = b["narration_text"]
    a = norm(said)
    a = [RESPELL.get(x, x) for x in a]
    h = norm(heard)
    sm = difflib.SequenceMatcher(a=a, b=h)
    diffs = []
    for op, i1, i2, j1, j2 in sm.get_opcodes():
        if op != "equal":
            diffs.append(f"{op}: '{' '.join(a[i1:i2])}' -> '{' '.join(h[j1:j2])}'")
    mx, mn = levels(mp3)
    out[bid] = {"words": words, "said": said, "heard": heard}
    flag = "OK " if not diffs else "DIF"
    print(f"{bid} {flag} ratio={sm.ratio():.3f} peak={mx:+.1f}dB mean={mn:+.1f}dB")
    for d in diffs:
        print("      ", d)

json.dump(out, io.open(os.path.join(reel, "_qc_words.json"), "w", encoding="utf-8"),
          ensure_ascii=False, indent=1)
print("word timings ->", os.path.join(reel, "_qc_words.json"))
