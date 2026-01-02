# NotebookLLM MCP Server

An MCP server for AI coding agents to verify code and save it to NotebookLLM.

## Quick Install

**Windows:**
```powershell
irm https://raw.githubusercontent.com/cmgzone/notebookllmmcp/main/install.ps1 | iex
```

**macOS/Linux:**
```bash
curl -fsSL https://raw.githubusercontent.com/cmgzone/notebookllmmcp/main/install.sh | bash
```

## Configuration

Add to your MCP config:

```json
{
  "mcpServers": {
    "notebookllm": {
      "command": "node",
      "args": ["~/.notebookllm-mcp/index.js"],
      "env": {
        "BACKEND_URL": "https://notebookllm-ufj7.onrender.com",
        "CODING_AGENT_API_KEY": "YOUR_TOKEN"
      }
    }
  }
}
```

Get your API token from **Settings > Agent Connections** in the app.

## License

MIT
