from pathlib import Path
import qrcode
import cv2

source = Path(__file__).parents[2] / "source" / "index.html"
html = source.read_text(encoding="utf-8")
for name, subject in [("project", "New%20project"), ("brief", "Design%20brief")]:
    destination = "mailto:hello@example.com?subject=" + subject
    qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_M, border=4)
    qr.add_data(destination)
    qr.make(fit=True)
    matrix = qr.get_matrix()
    size = len(matrix)
    paths = " ".join(f"M{x} {y}h1v1h-1z" for y, row in enumerate(matrix) for x, on in enumerate(row) if on)
    svg = f'<svg viewBox="0 0 {size} {size}" aria-hidden="true" focusable="false" shape-rendering="crispEdges"><rect width="{size}" height="{size}" fill="#fff1d3"/><path d="{paths}" fill="#210406"/></svg>'
    marker = f'<span data-qr="{name}"></span>'
    assert marker in html, "Build only from ungenerated QR placeholders"
    html = html.replace(marker, svg)
    png = Path(__file__).parent / f"qr-{name}.png"
    qr.make_image(fill_color="#210406", back_color="#fff1d3").save(png)
    decoded = cv2.QRCodeDetector().detectAndDecode(cv2.imread(str(png)))[0]
    assert decoded == destination, (name, decoded)
    print(name, "decoded successfully")
source.write_text(html, encoding="utf-8")
