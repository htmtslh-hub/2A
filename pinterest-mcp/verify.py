"""Exercise the real stdio MCP handshake and read/download operations."""
import asyncio
import json
import sys
from pathlib import Path

from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client


async def main():
    params = StdioServerParameters(command=sys.executable, args=[str(Path(__file__).with_name("server.py"))])
    async with stdio_client(params) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()
            tools = await session.list_tools()
            assert len(tools.tools) == 7, f"Expected 7 tools, got {len(tools.tools)}"
            print("Handshake OK; tools:", ", ".join(t.name for t in tools.tools))
            
            for name, args in [
                ("check_connection", {}),
                ("list_boards", {"page_size": 1}),
                ("get_pin", {"pin": "348958671149779866"}),
                ("get_public_pin_image", {"pin": "348958671149779866"}),
                ("download_pin_image", {"pin": "348958671149779866"}),
            ]:
                result = await session.call_tool(name, args)
                assert not result.isError, (name, result)
                data = json.loads(result.content[0].text)
                if name in {"check_connection", "list_boards"}:
                    print(name, "ok=", data.get("ok"), "status=", data.get("status", 200))
                    assert data["ok"]
                    if name == "list_boards":
                        boards = data["data"].get("items", [])
                        if boards:
                            board_id = boards[0]["id"]
                            board_result = await session.call_tool("list_board_pins", {"board_id": board_id, "page_size": 1})
                            assert not board_result.isError
                            print("list_board_pins OK")
                            
                            # Test batch board download (1 pin)
                            dl_board_result = await session.call_tool("download_board_pins", {"board_id": board_id, "limit": 1})
                            assert not dl_board_result.isError
                            dl_data = json.loads(dl_board_result.content[0].text)
                            print("download_board_pins OK, downloaded:", dl_data.get("total_downloaded"))
                elif name == "get_pin":
                    print(name, "status=", data.get("status", 200))
                elif name == "download_pin_image":
                    path = Path(data["path"])
                    assert path.exists() and path.stat().st_size > 0
                    assert path.read_bytes().startswith((b"\x89PNG", b"\xff\xd8", b"RIFF", b"GIF8"))
                    print(name, "OK", data["bytes"], "bytes", str(path))
                else:
                    print(name, "OK", data.get("source"))

            bad = await session.call_tool("get_public_pin_image", {"pin": "https://localhost/pin/123/"})
            assert bad.isError
            invalid = await session.call_tool("list_boards", {"page_size": 101})
            assert invalid.isError
            print("Invalid URL and pagination inputs properly rejected")
            print("ALL MCP TESTS PASSED SUCCESSFULLY!")


if __name__ == "__main__":
    asyncio.run(main())
