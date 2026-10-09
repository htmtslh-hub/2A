from PIL import Image, ImageDraw, ImageFilter

# 1. Load user screenshot
src_path = r"C:\Users\htmts\.gemini\antigravity\brain\a542b1ec-5f77-4770-9a52-de369ff4ac90\.user_uploaded\media_1791529121147_a6847285.png"
src = Image.open(src_path).convert("RGBA")

# Target canvas dimensions
W, H = 698, 524

# Target floating frame dimensions
# Keep aspect ratio: 1024 / 682 = 1.5014
frame_w = 642
frame_h = int(frame_w / (src.width / src.height)) # ~427 px
frame_x = (W - frame_w) // 2
frame_y = (H - frame_h) // 2

# Create canvas with warm retro cream/sand gradient matching LingoGlass palette
base = Image.new("RGBA", (W, H), (236, 228, 215, 255))
draw = ImageDraw.Draw(base)

for y in range(H):
    factor = y / H
    r = int(238 + (224 - 238) * factor)
    g = int(231 + (216 - 231) * factor)
    b = int(220 + (203 - 220) * factor)
    draw.line([(0, y), (W, y)], fill=(r, g, b, 255))

# Subtle ambient center warm highlight
radial = Image.new("RGBA", (W, H), (0, 0, 0, 0))
rdraw = ImageDraw.Draw(radial)
rdraw.ellipse([W//2 - 280, H//2 - 200, W//2 + 280, H//2 + 200], fill=(255, 250, 240, 90))
radial = radial.filter(ImageFilter.GaussianBlur(50))
base = Image.alpha_composite(base, radial)

# Drop shadow for the floating frame
shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
sdraw = ImageDraw.Draw(shadow)
sdraw.rounded_rectangle(
    [frame_x, frame_y + 10, frame_x + frame_w, frame_y + frame_h + 10],
    radius=16,
    fill=(40, 30, 20, 110)
)
shadow = shadow.filter(ImageFilter.GaussianBlur(18))
base = Image.alpha_composite(base, shadow)

# Resize screenshot with high quality lanczos
resized_src = src.resize((frame_w, frame_h), Image.Resampling.LANCZOS)

# Create mask for rounded corners
mask = Image.new("L", (frame_w, frame_h), 0)
mdraw = ImageDraw.Draw(mask)
mdraw.rounded_rectangle([0, 0, frame_w, frame_h], radius=14, fill=255)

# Paste the screenshot onto base
base.paste(resized_src, (frame_x, frame_y), mask)

# Add subtle border around the frame for crispness
border = Image.new("RGBA", (W, H), (0, 0, 0, 0))
bdraw = ImageDraw.Draw(border)
bdraw.rounded_rectangle(
    [frame_x, frame_y, frame_x + frame_w, frame_y + frame_h],
    radius=14,
    outline=(0, 0, 0, 45),
    width=1
)
base = Image.alpha_composite(base, border)

# Save to public/previews/lingoglass.webp with high quality WebP
out_path = r"d:\2A\web\public\previews\lingoglass.webp"
base.convert("RGB").save(out_path, "WEBP", quality=95)
print("Successfully generated lingoglass.webp at", out_path)
