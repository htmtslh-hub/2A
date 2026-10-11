"""Produce visual diagnostics; pixel similarity never grants design acceptance."""
import argparse
import json
from pathlib import Path
from PIL import Image, ImageChops, ImageStat


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--reference", required=True)
    parser.add_argument("--actual", required=True)
    parser.add_argument("--output", required=True)
    parser.add_argument("--reference-crop", help="x,y,width,height; remove reference browser chrome only")
    parser.add_argument("--tolerance", type=int, default=16)
    args = parser.parse_args()
    output = Path(args.output).resolve()
    if output.exists() and (not output.is_dir() or any(output.iterdir())):
        parser.error("Output must be new or empty; existing evidence is preserved")
    if not 0 <= args.tolerance <= 255:
        parser.error("Tolerance must be 0..255")
    def load(path):
        with Image.open(path) as image:
            rgba = image.convert("RGBA")
            base = Image.new("RGBA", rgba.size, "white")
            return Image.alpha_composite(base, rgba).convert("RGB")
    reference, actual = load(args.reference), load(args.actual)
    crop = None
    if args.reference_crop:
        crop = [int(n) for n in args.reference_crop.split(",")]
        if len(crop) != 4:
            parser.error("Crop must have four integers")
        x, y, w, h = crop
        if min(x, y) < 0 or min(w, h) <= 0 or x + w > reference.width or y + h > reference.height:
            parser.error("Crop is outside reference")
        reference = reference.crop((x, y, x + w, y + h))
    if reference.size != actual.size:
        parser.error("Sizes differ: capture at matching viewport; no automatic resize or warp")
    difference = ImageChops.difference(reference, actual)
    mae = sum(ImageStat.Stat(difference).mean) / 3
    matching = sum(max(pixel) <= args.tolerance for pixel in difference.getdata())
    output.mkdir(parents=True, exist_ok=True)
    Image.blend(reference, actual, 0.5).save(output / "overlay.png")
    difference.point(lambda value: min(255, value * 4)).save(output / "difference.png")
    pair = Image.new("RGB", (reference.width * 2, reference.height))
    pair.paste(reference, (0, 0))
    pair.paste(actual, (reference.width, 0))
    pair.save(output / "side-by-side.png")
    report = {"reference": str(Path(args.reference).resolve()), "actual": str(Path(args.actual).resolve()),
              "size": reference.size, "referenceCrop": crop, "alphaBackground": "white", "meanAbsoluteRgbError": mae,
              "pixelMatchPercent": 100 * matching / (reference.width * reference.height), "tolerance": args.tolerance,
              "gate": "NOT ASSESSED", "fidelityRubric": "NOT SCORED",
              "note": "Pixel diagnostics only. Apply weighted regional rubric and motion/scroll/video checks separately."}
    (output / "comparison.json").write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(report, ensure_ascii=False))


if __name__ == "__main__":
    main()
