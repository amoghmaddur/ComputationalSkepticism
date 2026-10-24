"""Per-beat review strips from the compiled cut: 3 frames per beat (25/60/92%),
one row per beat, 7 beats per sheet. For eyes, not for a gate."""
import sys, io, os, json, math, subprocess
from PIL import Image, ImageDraw
reel, cut = sys.argv[1], sys.argv[2]
d = json.load(io.open(os.path.join(reel, "beat_sheet.json"), encoding="utf-8"))
fps, t = 24, 0.0
rows = []
for b in d["beats"]:
    rd = math.ceil(b["actual_duration_s"] * fps - 1e-8) / fps
    rows.append((b["beat_id"], t, rd)); t += rd
out = os.path.join(reel, "_qc", "review"); os.makedirs(out, exist_ok=True)
TW, TH = 560, 315
for sheet_i in range(0, len(rows), 7):
    chunk = rows[sheet_i:sheet_i + 7]
    sheet = Image.new("RGB", (TW * 3 + 80, TH * len(chunk)), "white")
    dr = ImageDraw.Draw(sheet)
    for r, (bid, t0, rd) in enumerate(chunk):
        dr.text((8, r * TH + 8), bid, fill=(0, 0, 0))
        for c, f in enumerate((0.25, 0.60, 0.92)):
            ts = t0 + rd * f
            png = os.path.join(out, f"{bid}_{int(f*100)}.png")
            subprocess.run(["ffmpeg", "-y", "-v", "error", "-ss", f"{ts:.3f}", "-i", cut, "-frames:v", "1",
                            "-vf", f"scale={TW}:{TH}", png], check=True)
            sheet.paste(Image.open(png), (80 + c * TW, r * TH))
    p = os.path.join(out, f"sheet_{sheet_i // 7 + 1}.png")
    sheet.save(p); print(p)
