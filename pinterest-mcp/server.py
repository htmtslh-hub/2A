"""Local, read-only Pinterest MCP for searching and downloading images."""
import html
import os
import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse

import httpx
from mcp.server.fastmcp import FastMCP
from mcp.types import ToolAnnotations

mcp = FastMCP("Pinterest local")
READ = ToolAnnotations(readOnlyHint=True, destructiveHint=False, openWorldHint=True)
WRITE = ToolAnnotations(readOnlyHint=False, destructiveHint=False, openWorldHint=True)
DOWNLOADS = Path(os.environ.get("PINTEREST_DOWNLOAD_DIR", str(Path.home() / "Downloads" / "Pinterest"))).resolve()

BROWSER_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9,vi;q=0.8",
}


def token():
    value = os.environ.get("PINTEREST_ACCESS_TOKEN", "")
    if not value:
        secret = Path(os.environ.get("PINTEREST_TOKEN_FILE", str(Path.home() / ".codex" / "pinterest-token.secret")))
        if secret.exists():
            value = secret.read_text(encoding="utf-8-sig").strip()
    if not value:
        raise ValueError("Missing Pinterest token. Set PINTEREST_TOKEN_FILE or PINTEREST_ACCESS_TOKEN.")
    return value


def api(path, params=None):
    with httpx.Client(timeout=25, follow_redirects=False) as client:
        response = client.get("https://api.pinterest.com/v5/" + path,
                              headers={"Authorization": "Bearer " + token()}, params=params)
    if response.is_error:
        messages = {401: "Token expired or invalid.", 403: "Token lacks permission or app access.",
                    404: "Not found or unavailable to this account; a public page may still exist.",
                    429: "Pinterest rate limit reached. Try again later."}
        return {"ok": False, "status": response.status_code,
                "message": messages.get(response.status_code, "Pinterest API request failed.")}
    return {"ok": True, "data": response.json()}


def numeric_id(value):
    val_str = str(value).strip()
    if not re.fullmatch(r"\d{1,30}", val_str):
        raise ValueError("Expected a numeric Pinterest ID.")
    return val_str


def pin_id(value):
    val_str = str(value).strip()
    if val_str.isdigit():
        return numeric_id(val_str)

    parsed = urlparse(val_str)
    # Support pin.it short links
    if parsed.hostname == "pin.it":
        with httpx.Client(timeout=10, follow_redirects=True, headers=BROWSER_HEADERS) as client:
            resp = client.head(val_str)
            parsed = urlparse(str(resp.url))

    if parsed.scheme != "https":
        raise ValueError("Use a numeric Pin ID or https://www.pinterest.com/pin/ID/ URL.")

    hostname = parsed.hostname or ""
    if hostname != "pinterest.com" and not hostname.endswith(".pinterest.com"):
        raise ValueError("Use a numeric Pin ID or https://www.pinterest.com/pin/ID/ URL.")

    match = re.search(r"/pin/(\d{1,30})/?", parsed.path)
    if not match:
        raise ValueError("Invalid Pin URL.")
    return match[1]


def image_url(value):
    parsed = urlparse(str(value).strip())
    if parsed.scheme != "https" or parsed.hostname != "i.pinimg.com" or parsed.port not in {None, 443} or parsed.username:
        raise ValueError("Only HTTPS images on i.pinimg.com are allowed.")
    return str(value).strip()


class PinMeta(HTMLParser):
    def __init__(self):
        super().__init__()
        self.values = {}

    def handle_starttag(self, tag, attrs):
        if tag == "meta":
            attrs = dict(attrs)
            name = attrs.get("property", attrs.get("name", ""))
            if name in {"og:image", "og:title", "og:description"}:
                self.values[name] = attrs.get("content", "")


def public_pin(value):
    identifier = pin_id(value)
    url = f"https://www.pinterest.com/pin/{identifier}/"
    with httpx.Client(timeout=25, follow_redirects=False, headers=BROWSER_HEADERS) as client:
        response = client.get(url)
    if response.status_code != 200:
        raise ValueError(f"Public page unavailable (HTTP {response.status_code}).")
    parser = PinMeta()
    parser.feed(response.text)
    preview = parser.values.get("og:image")
    if not preview:
        raise ValueError("Public page has no image metadata; it may require login or be unavailable.")
    image_url(preview)
    image_hash = Path(urlparse(preview).path).stem
    originals = re.findall(r"https://i\.pinimg\.com/originals/[a-zA-Z0-9/_.-]+", html.unescape(response.text))
    original = next((u for u in originals if Path(urlparse(u).path).stem == image_hash), None)
    return {"pin_id": identifier, "page_url": url, "title": parser.values.get("og:title", ""),
            "image_url": image_url(original or preview), "preview_url": preview,
            "source": "public_page", "note": "Public metadata is not an API permission grant and may change."}


def resolve_pin_image(pin: str) -> dict:
    val_str = str(pin).strip()
    # Check if direct image URL
    if val_str.startswith("https://i.pinimg.com/"):
        valid_url = image_url(val_str)
        stem = Path(urlparse(valid_url).path).stem
        return {"pin_id": stem, "title": "", "image_url": valid_url, "source": "direct_url"}

    identifier = pin_id(val_str)
    # 1. Try official API first (best quality and fastest if pin is accessible)
    api_res = api("pins/" + identifier)
    if api_res.get("ok"):
        pin_data = api_res.get("data", {})
        images = pin_data.get("media", {}).get("images", {})
        for res_key in ["originals", "1200x", "600x", "400x300", "150x150"]:
            if res_key in images and "url" in images[res_key]:
                return {
                    "pin_id": identifier,
                    "title": pin_data.get("title", ""),
                    "image_url": images[res_key]["url"],
                    "source": "api"
                }

    # 2. Fallback to public web metadata with browser headers
    return public_pin(val_str)


def save_image_stream(url: str, target_dir: Path, file_prefix: str) -> dict:
    valid_url = image_url(url)
    target_dir.mkdir(parents=True, exist_ok=True)
    # A separate unauthenticated client prevents credentials from reaching image hosts.
    with httpx.Client(timeout=25, follow_redirects=True, headers={"User-Agent": BROWSER_HEADERS["User-Agent"]}) as client:
        with client.stream("GET", valid_url) as response:
            if response.status_code != 200:
                raise ValueError(f"Image unavailable (HTTP {response.status_code}).")
            extension = {"image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp", "image/gif": ".gif"}.get(
                response.headers.get("content-type", "").split(";")[0]
            )
            if not extension:
                suffix = Path(urlparse(valid_url).path).suffix.lower()
                extension = suffix if suffix in {".jpg", ".jpeg", ".png", ".webp", ".gif"} else ".jpg"
                if extension == ".jpeg":
                    extension = ".jpg"

            content = bytearray()
            for chunk in response.iter_bytes():
                content.extend(chunk)
                if len(content) > 30 * 1024 * 1024:
                    raise ValueError("Image exceeds 30 MB download limit.")

    for index in range(10000):
        suffix = f"-{index}" if index else ""
        output = target_dir / f"{file_prefix}{suffix}{extension}"
        try:
            with output.open("xb") as file:
                file.write(content)
            return {"ok": True, "path": str(output), "bytes": len(content), "image_url": valid_url}
        except FileExistsError:
            continue
    raise ValueError("Too many existing downloads for this prefix.")


@mcp.tool(annotations=READ)
def check_connection() -> dict:
    """Check Pinterest authentication. Success does not prove other endpoint permissions."""
    return api("user_account")


@mcp.tool(annotations=READ)
def list_boards(page_size: int = 25, bookmark: str | None = None) -> dict:
    """List boards accessible to the token account. Pass returned bookmark for the next page."""
    if not 1 <= page_size <= 100:
        raise ValueError("page_size must be 1..100")
    return api("boards", {k: v for k, v in {"page_size": page_size, "bookmark": bookmark}.items() if v is not None})


@mcp.tool(annotations=READ)
def list_board_pins(board_id: str, page_size: int = 25, bookmark: str | None = None) -> dict:
    """Read accessible board Pins, including available media URLs. Supports pagination."""
    if not 1 <= page_size <= 100:
        raise ValueError("page_size must be 1..100")
    return api(f"boards/{numeric_id(board_id)}/pins", {k: v for k, v in {"page_size": page_size, "bookmark": bookmark}.items() if v is not None})


@mcp.tool(annotations=READ)
def get_pin(pin: str) -> dict:
    """Read a Pin through official API. A public Pin can still return 404 to this token."""
    return api("pins/" + pin_id(pin))


@mcp.tool(annotations=READ)
def get_public_pin_image(pin: str) -> dict:
    """Get image metadata from a public Pinterest Pin page without sending an API token."""
    return public_pin(pin)


@mcp.tool(annotations=WRITE)
def download_pin_image(pin: str, download_dir: str | None = None) -> dict:
    """Download a Pin image or direct Pinterest image URL into the download folder. Never overwrites existing files."""
    info = resolve_pin_image(pin)
    target_dir = Path(download_dir).resolve() if download_dir else DOWNLOADS
    res = save_image_stream(info["image_url"], target_dir, f"pinterest-{info['pin_id']}")
    res["title"] = info.get("title", "")
    res["pin_id"] = info.get("pin_id", "")
    res["source"] = info.get("source", "unknown")
    return res


@mcp.tool(annotations=WRITE)
def download_board_pins(board_id: str, limit: int = 20, download_dir: str | None = None) -> dict:
    """Download images from an accessible Pinterest board. Limits to at most 100 pins per request."""
    if not 1 <= limit <= 100:
        raise ValueError("limit must be between 1 and 100.")
    b_id = numeric_id(board_id)
    target_dir = (Path(download_dir).resolve() if download_dir else DOWNLOADS) / f"board-{b_id}"

    pins_res = api(f"boards/{b_id}/pins", params={"page_size": min(limit, 100)})
    if not pins_res.get("ok"):
        return {"ok": False, "error": pins_res.get("message", "Failed to fetch board pins.")}

    items = pins_res.get("data", {}).get("items", [])
    downloaded = []
    errors = []

    for item in items[:limit]:
        p_id = item.get("id")
        images = item.get("media", {}).get("images", {})
        best_url = None
        for res_key in ["originals", "1200x", "600x", "400x300", "150x150"]:
            if res_key in images and "url" in images[res_key]:
                best_url = images[res_key]["url"]
                break
        if not best_url:
            errors.append({"pin_id": p_id, "error": "No image URL in media."})
            continue
        try:
            res = save_image_stream(best_url, target_dir, f"pinterest-{p_id}")
            downloaded.append({
                "pin_id": p_id,
                "title": item.get("title", ""),
                "path": res["path"],
                "bytes": res["bytes"]
            })
        except Exception as e:
            errors.append({"pin_id": p_id, "error": str(e)})

    return {
        "ok": True,
        "board_id": b_id,
        "folder": str(target_dir),
        "total_downloaded": len(downloaded),
        "downloaded": downloaded,
        "errors": errors
    }


if __name__ == "__main__":
    mcp.run(transport="stdio")
