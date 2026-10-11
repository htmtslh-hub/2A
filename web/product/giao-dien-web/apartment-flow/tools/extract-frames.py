"""Extract nearest-timestamp frames from a constant-rate source at 24fps."""
import argparse
import hashlib
import json
from pathlib import Path
import cv2
from PIL import Image

parser = argparse.ArgumentParser()
parser.add_argument('video', type=Path)
args = parser.parse_args()
product = Path(__file__).resolve().parents[1]
output = product / 'source/assets/frames'
output.mkdir(parents=True, exist_ok=True)
capture = cv2.VideoCapture(str(args.video))
if not capture.isOpened():
    raise RuntimeError('Cannot open input video')
source_fps = capture.get(cv2.CAP_PROP_FPS)
source_count = int(capture.get(cv2.CAP_PROP_FRAME_COUNT))
duration = source_count / source_fps
count = round(duration * 24)
source_index = -1
records = []
for index in range(count):
    target = min(source_count - 1, int(index * source_fps / 24 + 0.5))
    while source_index < target:
        ok, frame = capture.read()
        if not ok:
            raise RuntimeError(f'Input ended at source frame {source_index}')
        source_index += 1
    image = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
    destination = output / f'frame-{index + 1:04d}.webp'
    image.save(destination, 'WEBP', quality=85, method=4)
    records.append({'file': destination.name, 'time': index / 24,
                    'source_frame': target, 'bytes': destination.stat().st_size})
capture.release()
manifest = {'source': args.video.name, 'source_sha256': hashlib.sha256(args.video.read_bytes()).hexdigest(),
            'source_fps': source_fps, 'fps': 24, 'duration': duration,
            'width': image.width, 'height': image.height, 'count': count,
            'total_bytes': sum(row['bytes'] for row in records), 'frames': records}
(product / 'reviews/0.1.0').mkdir(parents=True, exist_ok=True)
(product / 'reviews/0.1.0/frames.json').write_text(json.dumps(manifest, indent=2), encoding='utf-8')
print(json.dumps({k: v for k, v in manifest.items() if k != 'frames'}))
