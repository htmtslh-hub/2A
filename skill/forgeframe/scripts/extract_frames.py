"""Local video evidence extraction. Frames are a first pass, not a coverage verdict."""
import argparse
import json
import math
from pathlib import Path
import re
import shutil
import subprocess


def run(args):
    return subprocess.run(args, check=True, capture_output=True, text=True,
                          encoding="utf-8", errors="replace", timeout=180)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input")
    parser.add_argument("--output")
    parser.add_argument("--times", help="Comma separated seconds for focused evidence")
    parser.add_argument("--max-frames", type=int, default=32)
    parser.add_argument("--scene-threshold", type=float, default=0.28)
    parser.add_argument("--check-deps", action="store_true")
    args = parser.parse_args()
    from PIL import Image, ImageDraw, ImageOps
    ffmpeg, ffprobe = shutil.which("ffmpeg"), shutil.which("ffprobe")
    if not ffmpeg or not ffprobe:
        parser.error("Install FFmpeg and ffprobe on PATH; Pillow is also required")
    if args.check_deps:
        print(json.dumps({"ffmpeg": ffmpeg, "ffprobe": ffprobe, "Pillow": Image.__version__}))
        return
    if not args.input or not args.output:
        parser.error("--input and --output required")
    source, output = Path(args.input).resolve(), Path(args.output).resolve()
    if not source.is_file() or not 2 <= args.max_frames <= 120:
        parser.error("Input must exist and max-frames must be 2..120")
    if not 0 < args.scene_threshold < 1:
        parser.error("scene-threshold must be between 0 and 1")
    if output.exists() and (not output.is_dir() or any(output.iterdir())):
        parser.error("Output must be a new or empty directory; existing evidence is preserved")
    metadata = json.loads(run([ffprobe, "-v", "error", "-show_format", "-show_streams", "-of", "json", str(source)]).stdout)
    video = next((s for s in metadata["streams"] if s["codec_type"] == "video"), None)
    if not video:
        parser.error("Input contains no video stream")
    duration = float(metadata["format"].get("duration", video.get("duration", 0)))
    if not math.isfinite(duration) or duration <= 0:
        parser.error("Cannot determine finite positive duration")
    end = max(0, duration - min(0.1, duration / 10))
    scenes, warning = [], None
    if args.times:
        times = sorted(set(float(t.strip()) for t in args.times.split(",")))
        if not times or len(times) > args.max_frames or any(not math.isfinite(t) or t < 0 or t >= duration for t in times):
            parser.error("Explicit times must be finite, within video and within max-frames")
        method = "explicit timestamps"
    else:
        try:
            scene = run([ffmpeg, "-hide_banner", "-i", str(source), "-vf",
                         f"select='gt(scene,{args.scene_threshold})',showinfo", "-an", "-f", "null", "-"])
            scenes = [float(t) for t in re.findall(r"pts_time:([0-9.]+)", scene.stderr)]
        except (subprocess.SubprocessError, ValueError) as exc:
            warning = "Scene detection failed; uniform extraction only: " + str(exc)
        count = min(12, args.max_frames)
        times = [end * i / (count - 1) for i in range(count)]
        candidates = sorted(set(max(0, min(end, t + offset)) for t in scenes for offset in (-0.08, 0, 0.08)))
        while candidates and len(times) < args.max_frames:
            t = max(candidates, key=lambda x: min(abs(x - y) for y in times))
            candidates.remove(t)
            if min(abs(t - y) for y in times) > 0.035:
                times.append(t)
        times.sort()
        method = "uniform samples plus scene boundaries; manual transition review required"
    output.mkdir(parents=True, exist_ok=True)
    frames = []
    for index, timestamp in enumerate(times, 1):
        name = f"frame-{index:04d}.png"
        target = output / name
        run([ffmpeg, "-hide_banner", "-loglevel", "error", "-ss", f"{timestamp:.6f}", "-i", str(source), "-frames:v", "1", "-an", str(target)])
        with Image.open(target) as im:
            if im.size != (video["width"], video["height"]):
                raise ValueError("Extracted frame dimensions differ from source")
        frames.append({"file": name, "requestedTimeSeconds": round(timestamp, 6)})
    columns, cell_w, cell_h = 3, 360, 300
    sheet = Image.new("RGB", (columns * cell_w, math.ceil(len(frames) / columns) * cell_h), "#18202b")
    draw = ImageDraw.Draw(sheet)
    for index, frame in enumerate(frames):
        x, y = index % columns * cell_w, index // columns * cell_h
        with Image.open(output / frame["file"]) as im:
            thumb = ImageOps.contain(im.convert("RGB"), (cell_w - 16, cell_h - 38))
            sheet.paste(thumb, (x + (cell_w - thumb.width) // 2, y + 8))
        draw.text((x + 8, y + cell_h - 24), f"{index + 1:02d} | {frame['requestedTimeSeconds']:.3f}s", fill="white")
    sheet.save(output / "contact-sheet.jpg", quality=90)
    report = {"source": str(source), "durationSeconds": duration, "width": video["width"], "height": video["height"],
              "selection": method, "warning": warning, "coverage": "NOT ASSESSED", "sceneTimes": scenes, "frames": frames}
    (output / "frames.json").write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({"output": str(output), "frames": len(frames), "coverage": "NOT ASSESSED"}))


if __name__ == "__main__":
    main()
