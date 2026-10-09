from PIL import Image, ImageDraw
import os
import shutil

source_path = r'C:\Users\htmts\.gemini\antigravity\brain\6c6321d2-1f8c-49d2-b03f-f020cf9e3352\lingoglass_concept4_icon_1790994955315.jpg'
if not os.path.exists(source_path):
    raise FileNotFoundError(f"Source image not found: {source_path}")

im = Image.open(source_path).convert('RGBA')

# Supersampled rounded rectangle mask at 4x (4096 x 4096) for crisp anti-aliased edge
scale = 4
mask = Image.new('L', (1024 * scale, 1024 * scale), 0)
draw = ImageDraw.Draw(mask)

left = int(144 * scale)
top = int(144 * scale)
right = int(880 * scale)
bottom = int(880 * scale)
radius = int(185 * scale)

draw.rounded_rectangle([left, top, right, bottom], radius=radius, fill=255)
mask = mask.resize((1024, 1024), Image.Resampling.LANCZOS)

# Apply mask to image
im_masked = im.copy()
im_masked.putalpha(mask)

# Crop with clean proportional padding
# The squircle is 736x736, crop 764x764 gives a small balanced border
bbox = (130, 130, 894, 894)
icon_cropped = im_masked.crop(bbox)

# Create 512x512 and 256x256 high-resolution masters
icon_512 = icon_cropped.resize((512, 512), Image.Resampling.LANCZOS)

# Paths
base_dir = r'D:\3. Agent\3-app\1-mkv'
build_dir = os.path.join(base_dir, 'build')
public_dir = os.path.join(base_dir, 'public')
dist_dir = os.path.join(base_dir, 'dist')

for d in [build_dir, public_dir, dist_dir]:
    os.makedirs(d, exist_ok=True)

# Save PNGs
icon_512.save(os.path.join(build_dir, 'icon.png'), 'PNG')
icon_512.save(os.path.join(public_dir, 'icon.png'), 'PNG')
icon_512.save(os.path.join(dist_dir, 'icon.png'), 'PNG')

# Save multi-resolution Windows ICOs
icon_sizes = [(256, 256), (128, 128), (64, 64), (48, 48), (32, 32), (16, 16)]
icon_512.save(os.path.join(build_dir, 'icon.ico'), format='ICO', sizes=icon_sizes)
icon_512.save(os.path.join(build_dir, 'lingoglass.ico'), format='ICO', sizes=icon_sizes)
icon_512.save(os.path.join(public_dir, 'lingoglass.ico'), format='ICO', sizes=icon_sizes)
icon_512.save(os.path.join(dist_dir, 'lingoglass.ico'), format='ICO', sizes=icon_sizes)

# Embed in SVG for perfect fidelity in all web contexts
import base64
with open(os.path.join(build_dir, 'icon.png'), 'rb') as f:
    b64 = base64.b64encode(f.read()).decode('ascii')

svg_content = f'''<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <image width="512" height="512" xlink:href="data:image/png;base64,{b64}"/>
</svg>'''

with open(os.path.join(base_dir, 'lingoglass_icon.svg'), 'w', encoding='utf-8') as f:
    f.write(svg_content)
with open(os.path.join(public_dir, 'lingoglass_icon.svg'), 'w', encoding='utf-8') as f:
    f.write(svg_content)
with open(os.path.join(dist_dir, 'lingoglass_icon.svg'), 'w', encoding='utf-8') as f:
    f.write(svg_content)

print("SUCCESS: Generated all icon files (ICO, PNG, SVG) with Concept 4 logo.")
