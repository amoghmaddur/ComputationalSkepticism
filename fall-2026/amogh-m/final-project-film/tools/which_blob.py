"""Ask GATE T's own min-size machinery which text runs it measured on a frame,
so a FAIL can be traced to the actual pixels instead of guessed at."""
import sys, os, subprocess, tempfile
sys.path.insert(0, r"C:\dev\brutalist.art\runtime\scripts")
import numpy as np
from PIL import Image
import type_check as tc

mp4, out_png = sys.argv[1], sys.argv[2]
dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", mp4],
                           capture_output=True, text=True).stdout)
t = min(dur * 0.5, dur - 0.05)                      # the same sample point type_check uses
frame = os.path.join(tempfile.mkdtemp(), "f.png")
subprocess.run(["ffmpeg", "-y", "-v", "error", "-ss", f"{t:.3f}", "-i", mp4, "-frames:v", "1", frame], check=True)
img = Image.open(frame).convert("RGB")
arr = np.array(img)
mask = tc.visible_text_mask(arr, "light")
lab, n = tc.labeled_blobs(mask)
bboxes = tc.text_run_bboxes(tc.blob_bboxes(lab, n), img.height)
floor = int(img.height * tc.MIN_SIZE_PCT / 100.0)
small = sorted(bboxes, key=lambda b: b[3] - b[1])[:6]
print(f"sample t={t:.2f}s  frame {img.width}x{img.height}  floor {floor}px  runs {len(bboxes)}")
from PIL import ImageDraw
dr = ImageDraw.Draw(img)
for b in small:
    x0, y0, x1, y1 = b[:4]
    print(f"  h={y1-y0:3d}px  bbox=({x0},{y0})-({x1},{y1})  {'BELOW FLOOR' if y1-y0 < floor else ''}")
    dr.rectangle([x0 - 4, y0 - 4, x1 + 4, y1 + 4], outline=(255, 0, 0), width=4)
img.resize((img.width // 2, img.height // 2)).save(out_png)
print("marked ->", out_png)
