# Pinterest MCP (Local Python)

MCP local qua stdio, Python 3.12, MCP SDK 1.30.0 chuyên phục vụ duyệt và tải ảnh từ Pinterest.

## Danh sách công cụ (Tools)

- `check_connection`: Kiểm tra xác thực tài khoản Pinterest qua Access Token.
- `list_boards`: Liệt kê các bảng (boards) trong tài khoản của bạn (hỗ trợ phân trang qua `bookmark`).
- `list_board_pins`: Liệt kê các Pin trong bảng (bao gồm ID, tiêu đề, link ảnh chất lượng cao).
- `get_pin`: Đọc thông tin Pin qua API chính thức.
- `get_public_pin_image`: Trích xuất link ảnh gốc (`i.pinimg.com/originals/...`) từ trang công khai mà không cần token.
- `download_pin_image`: Tải ảnh của Pin (hỗ trợ Pin ID, link `pinterest.com/pin/...`, link rút gọn `pin.it/...`, hoặc link ảnh `i.pinimg.com/...`) về thư mục chỉ định hoặc mặc định `~/Downloads/Pinterest`. Tự động tránh ghi đè file.
- `download_board_pins`: Tải hàng loạt ảnh từ một bảng (`board_id`, số lượng `limit` 1..100) về thư mục riêng theo từng bảng.

## Cách chạy & Cài đặt

```powershell
# Di chuyển vào thư mục dự án
cd "D:\3. Dự án\2A\pinterest-mcp"

# Kích hoạt môi trường và cài đặt (nếu chưa cài)
.\.venv\Scripts\python.exe -m pip install -r requirements.txt

# Chạy test kiểm thử tự động
.\.venv\Scripts\python.exe verify.py
```

### 1. Đăng ký vào OpenAI Codex
Thêm vào file `~/.codex/config.toml`:
```toml
[mcp_servers.pinterest_local]
command = 'D:\3. Dự án\2A\pinterest-mcp\.venv\Scripts\python.exe'
args = ['D:\3. Dự án\2A\pinterest-mcp\server.py']
```

### 2. Đăng ký vào Antigravity
Thêm vào file `%USERPROFILE%\.gemini\antigravity\mcp_config.json`:
```json
{
  "mcpServers": {
    "pinterest": {
      "command": "D:\\3. Dự án\\2A\\pinterest-mcp\\.venv\\Scripts\\python.exe",
      "args": ["D:\\3. Dự án\\2A\\pinterest-mcp\\server.py"]
    }
  }
}
```

### 3. Đăng ký vào Claude Desktop
Thêm vào file `%APPDATA%\Claude\claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "pinterest": {
      "command": "D:\\3. Dự án\\2A\\pinterest-mcp\\.venv\\Scripts\\python.exe",
      "args": ["D:\\3. Dự án\\2A\\pinterest-mcp\\server.py"]
    }
  }
}
```

## Cấu hình Token & Thư mục tải
- Token được ưu tiên đọc từ biến môi trường `PINTEREST_ACCESS_TOKEN`, hoặc file bí mật `~/.codex/pinterest-token.secret`.
- Đường dẫn lưu ảnh mặc định: `~/Downloads/Pinterest` (có thể đổi qua biến môi trường `PINTEREST_DOWNLOAD_DIR` hoặc tham số `download_dir` khi gọi tool).
