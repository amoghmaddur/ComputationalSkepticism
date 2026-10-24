"""Uniform headroom pass: one fixed gain for EVERY beat so the loudest peak in
the reel sits at TARGET dBFS. Relative loudness between beats is preserved.
Durations are re-measured and written back so the audio clock stays exact.

usage: python -I -X utf8 headroom.py <reel_dir> [target_dbfs=-3.0]
"""
import sys, os, re, io, json, subprocess, tempfile, shutil

reel = sys.argv[1]
TARGET = float(sys.argv[2]) if len(sys.argv) > 2 else -3.0
sheet_p = os.path.join(reel, "beat_sheet.json")
sheet = json.load(io.open(sheet_p, encoding="utf-8"))

def peak(p):
    r = subprocess.run(["ffmpeg", "-hide_banner", "-nostats", "-i", p, "-af", "volumedetect",
                        "-f", "null", "-"], capture_output=True, text=True)
    return float(re.search(r"max_volume: ([-0-9.]+) dB", r.stderr).group(1))

def dur(p):
    r = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                        "-of", "csv=p=0", p], capture_output=True, text=True)
    return float(r.stdout.strip())

mp3s = {b["beat_id"]: os.path.join(reel, "mp3", f"beat-{b['beat_id']}.mp3") for b in sheet["beats"]}
peaks = {k: peak(v) for k, v in mp3s.items()}
loudest = max(peaks.values())
gain = TARGET - loudest
print(f"loudest peak {loudest:+.2f} dBFS -> uniform gain {gain:+.2f} dB")
if gain >= 0:
    print("already has headroom; nothing to do"); sys.exit(0)

for b in sheet["beats"]:
    src = mp3s[b["beat_id"]]
    before = dur(src)
    with tempfile.TemporaryDirectory(dir=os.path.dirname(src)) as t:
        wav = os.path.join(t, "a.wav"); out = os.path.join(t, "a.mp3")
        subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", src, "-af", f"volume={gain:.3f}dB",
                        wav], check=True)
        subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", wav, "-c:a", "libmp3lame",
                        "-q:a", "2", out], check=True)
        shutil.move(out, src)
    after = dur(src)
    b["actual_duration_s"] = round(after, 3)
    b.pop("render_duration_s", None)
    print(f"{b['beat_id']}  peak {peaks[b['beat_id']]:+.2f} -> {peak(src):+.2f}  dur {before:.3f} -> {after:.3f}")

sheet["metadata"]["headroom_note"] = (f"Uniform gain {gain:+.2f} dB applied to every beat so the loudest "
                                      f"peak sits at {TARGET:.1f} dBFS; durations re-measured afterwards.")
io.open(sheet_p, "w", encoding="utf-8", newline="\n").write(json.dumps(sheet, ensure_ascii=False, indent=2) + "\n")
print("beat sheet durations updated")
