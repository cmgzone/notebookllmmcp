#!/bin/bash
# NotebookLLM MCP Server Installer for macOS/Linux
# Usage: curl -fsSL https://raw.githubusercontent.com/cmgzone/notebookllm/master/scripts/install-mcp.sh | bash

set -e

echo "ðŸ“¦ Installing NotebookLLM MCP Server..."

# Configuration - UPDATE THESE VALUES
GITHUB_REPO="cmgzone/notebookllmmcp"
BACKEND_URL="https://notebookllm-ufj7.onrender.com"

# Get latest release
echo "ðŸ” Finding latest release..."
RELEASE_INFO=$(curl -s "https://api.github.com/repos/$GITHUB_REPO/releases/latest" 2>/dev/null || echo "{}")
VERSION=$(echo "$RELEASE_INFO" | grep -o '"tag_name": *"[^"]*"' | head -1 | sed 's/.*"mcp-v\([^"]*\)".*/\1/' || echo "1.0.0")
DOWNLOAD_URL=$(echo "$RELEASE_INFO" | grep -o '"browser_download_url": *"[^"]*\.zip"' | head -1 | sed 's/.*"\(http[^"]*\)".*/\1/' || echo "")

if [ -z "$DOWNLOAD_URL" ]; then
    VERSION="1.0.0"
    DOWNLOAD_URL="https://github.com/$GITHUB_REPO/releases/latest/download/notebookllm-mcp-$VERSION.zip"
fi

echo "ðŸ“¥ Downloading version $VERSION..."

# Create directory
MCP_DIR="$HOME/.notebookllm-mcp"
rm -rf "$MCP_DIR"
mkdir -p "$MCP_DIR"

# Download and extract
TEMP_ZIP="/tmp/notebookllm-mcp.zip"
curl -fsSL "$DOWNLOAD_URL" -o "$TEMP_ZIP"
unzip -q "$TEMP_ZIP" -d "$MCP_DIR"
rm "$TEMP_ZIP"

# Install dependencies
echo "ðŸ“¥ Installing dependencies..."
cd "$MCP_DIR"
npm install --production --silent 2>/dev/null || npm install --production

echo ""
echo "âœ… NotebookLLM MCP Server v$VERSION installed to $MCP_DIR"
echo ""
echo "ðŸ“ Add this to your MCP config:"
echo ""
cat << EOF
{
  "mcpServers": {
    "notebookllm": {
      "command": "node",
      "args": ["$MCP_DIR/index.js"],
      "env": {
        "BACKEND_URL": "$BACKEND_URL",
        "CODING_AGENT_API_KEY": "YOUR_API_TOKEN_HERE"
      }
    }
  }
}
EOF
echo ""
echo "ðŸ”‘ Get your API token from Settings â†’ Agent Connections in the app"
echo ""
