from PIL import Image, ImageDraw, ImageFilter

w, h = 698, 524
base = Image.new('RGBA', (w, h), (18, 20, 26, 255))
draw = ImageDraw.Draw(base)

# Background subtle gradient
for y in range(h):
    r = int(18 + (28 - 18) * (y / h))
    g = int(20 + (32 - 20) * (y / h))
    b = int(28 + (44 - 28) * (y / h))
    draw.line([(0, y), (w, y)], fill=(r, g, b, 255))

# Floating card for product
card_w, card_h = 560, 420
card_x, card_y = (w - card_w) // 2, (h - card_h) // 2

# Shadow
shadow = Image.new('RGBA', (w, h), (0, 0, 0, 0))
sdraw = ImageDraw.Draw(shadow)
sdraw.rounded_rectangle([card_x, card_y + 10, card_x + card_w, card_y + card_h + 10], radius=24, fill=(0, 0, 0, 160))
shadow = shadow.filter(ImageFilter.GaussianBlur(16))
base = Image.alpha_composite(base, shadow)

# Card background (glass retro tone)
card = Image.new('RGBA', (w, h), (0, 0, 0, 0))
cdraw = ImageDraw.Draw(card)
cdraw.rounded_rectangle([card_x, card_y, card_x + card_w, card_y + card_h], radius=24, fill=(28, 31, 42, 240), outline=(255, 255, 255, 40), width=1)
base = Image.alpha_composite(base, card)

# Load and place product icon/artwork
icon = Image.open('d:/2A/web/product/agent/lingoglass/lingoglass_icon.jpg').convert('RGBA')
icon_size = 330
icon = icon.resize((icon_size, icon_size), Image.Resampling.LANCZOS)

# Create rounded mask for icon
mask = Image.new('L', (icon_size, icon_size), 0)
mdraw = ImageDraw.Draw(mask)
mdraw.rounded_rectangle([0, 0, icon_size, icon_size], radius=22, fill=255)

icon_x = card_x + (card_w - icon_size) // 2
icon_y = card_y + (card_h - icon_size) // 2
base.paste(icon, (icon_x, icon_y), mask)

base.convert('RGB').save('d:/2A/web/public/previews/lingoglass.webp', 'WEBP', quality=92)
print('Successfully generated lingoglass.webp')
