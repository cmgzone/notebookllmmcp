# NotebookLLM MCP Server

An MCP (Model Context Protocol) server that allows third-party coding agents to verify code and save it as sources in your NotebookLLM app.

## Quick Install

**Windows (PowerShell):**
```powershell
irm https://raw.githubusercontent.com/cmgzone/notebookllm/master/scripts/install-mcp.ps1 | iex
```

**macOS/Linux:**
```bash
curl -fsSL https://raw.githubusercontent.com/cmgzone/notebookllm/master/scripts/install-mcp.sh | bash
```



## Features

- **Code Verification**: Validate code for syntax, security, and best practices
- **AI-Powered Analysis**: Deep code analysis using Gemini AI
- **Source Management**: Save verified code as sources in your app
- **Batch Processing**: Verify multiple code snippets at once
- **Multi-Language Support**: JavaScript, TypeScript, Python, Dart, JSON, and more
- **Agent Communication**: Bidirectional communication with follow-up messages
- **GitHub Integration**: Access repositories, files, and create issues
- **Planning Mode**: Create and manage plans, requirements, tasks, and design notes

## Tools Available

### `verify_code`
Verify code for correctness, security vulnerabilities, and best practices.

```json
{
  "code": "function hello() { return 'world'; }",
  "language": "javascript",
  "context": "A simple greeting function",
  "strictMode": false
}
```

### `verify_and_save`
Verify code and save it as a source if it passes verification (score >= 60).

```json
{
  "code": "const add = (a, b) => a + b;",
  "language": "javascript",
  "title": "Add Function",
  "description": "Simple addition utility",
  "notebookId": "optional-notebook-id"
}
```

### `batch_verify`
Verify multiple code snippets at once.

```json
{
  "snippets": [
    { "id": "1", "code": "...", "language": "python" },
    { "id": "2", "code": "...", "language": "typescript" }
  ]
}
```

### `analyze_code`
Deep analysis with comprehensive suggestions.

```json
{
  "code": "...",
  "language": "python",
  "analysisType": "security"
}
```

### `get_verified_sources`
Retrieve previously saved verified code sources.

```json
{
  "notebookId": "optional-filter",
  "language": "optional-filter"
}
```

---

## Agent Communication Tools

### `create_agent_notebook`
Create a dedicated notebook for your coding agent with bidirectional communication.

```json
{
  "agentName": "Claude",
  "agentIdentifier": "claude-3-opus",
  "title": "My Agent Workspace",
  "webhookUrl": "https://your-webhook.com/messages"
}
```

### `save_code_with_context`
Save code with full conversation context for follow-up discussions.

```json
{
  "code": "...",
  "language": "typescript",
  "title": "Auth Service",
  "notebookId": "notebook-id",
  "conversationContext": "User asked for a JWT authentication service..."
}
```

### `get_followup_messages`
Poll for pending user messages about saved code.

### `respond_to_followup`
Send responses to user follow-up questions.

---

## GitHub Integration Tools

### `github_status`
Check if GitHub is connected for the current user.

### `github_list_repos`
List accessible GitHub repositories.

### `github_get_file`
Get contents of a file from a repository.

### `github_search_code`
Search for code across repositories.

### `github_create_issue`
Create issues in GitHub repositories.

### `github_add_as_source`
Import a GitHub file as a notebook source.

---

## Planning Mode Tools 🆕

### `list_plans`
List all accessible plans for the user.

### `get_plan`
Get a specific plan with full details including requirements, tasks, and design notes.

### `create_plan`
Create a new plan.

```json
{
  "title": "My Feature Plan",
  "description": "Plan for implementing new feature"
}
```

### `create_task`
Create a task within a plan.

```json
{
  "planId": "plan-id",
  "title": "Implement login form",
  "description": "Create the login form component",
  "priority": "high"
}
```

### `update_task_status`
Update the status of a task (todo, in_progress, review, done).

### `add_task_output`
Add output/notes to a task.

### `complete_task`
Mark a task as complete with a summary.

### `create_requirement` 🆕
Create a requirement with EARS (Easy Approach to Requirements Syntax) patterns.

```json
{
  "planId": "plan-id",
  "title": "User Authentication",
  "description": "Users must be able to authenticate",
  "earsPattern": "event",
  "acceptanceCriteria": [
    "User can login with email/password",
    "User receives error for invalid credentials"
  ]
}
```

**EARS Patterns:**
- `ubiquitous` - THE system SHALL response
- `event` - WHEN trigger, THE system SHALL response
- `state` - WHILE condition, THE system SHALL response
- `unwanted` - IF condition, THEN THE system SHALL response
- `optional` - WHERE option, THE system SHALL response
- `complex` - Combination of patterns

### `create_design_note` 🆕
Create a design note for architectural decisions.

```json
{
  "planId": "plan-id",
  "content": "We will use JWT tokens for authentication with refresh token rotation...",
  "requirementIds": ["req-1", "req-2"]
}
```

---

## Installation

### Option 1: Quick Install (Recommended)

Use the install scripts above - they automatically download the latest release and set everything up.

### Option 2: Manual Install from GitHub Release

1. Download the latest release from [GitHub Releases](https://github.com/cmgzone/notebookllm/releases)
2. Extract to `~/.notebookllm-mcp`
3. Run `npm install --production`
4. Configure your MCP client (see below)

### Option 3: Build from Source

```bash
cd backend/mcp-server
npm install
npm run build
```

## Authentication

The MCP server requires a personal API token to authenticate with your NotebookLLM account. This token links the coding agent to your user account, allowing it to save verified code as sources.

### Generating a Personal API Token

1. Open the NotebookLLM app
2. Go to **Settings** → **Agent Connections**
3. In the **API Tokens** section, click **Generate New Token**
4. Give your token a descriptive name (e.g., "Kiro MCP Server")
5. Optionally set an expiration date
6. Click **Generate** and **copy the token immediately**

> ⚠️ **Important**: The token is only displayed once. If you lose it, you'll need to generate a new one.

### Token Format

Personal API tokens use the format: `nllm_` followed by 43 characters of random data.

Example: `nllm_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2`

## Configuration

Create a `.env` file:

```env
BACKEND_URL=http://localhost:3000
CODING_AGENT_API_KEY=nllm_your-personal-api-token-here
```

Replace `nllm_your-personal-api-token-here` with the token you generated from the app.

## Usage with MCP Clients

### Kiro Configuration

Add to `.kiro/settings/mcp.json`:

```json
{
  "mcpServers": {
    "coding-agent": {
      "command": "node",
      "args": ["path/to/backend/mcp-server/dist/index.js"],
      "env": {
        "BACKEND_URL": "http://localhost:3000",
        "CODING_AGENT_API_KEY": "nllm_your-personal-api-token-here"
      }
    }
  }
}
```

### Claude Desktop Configuration

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "coding-agent": {
      "command": "node",
      "args": ["/absolute/path/to/backend/mcp-server/dist/index.js"],
      "env": {
        "BACKEND_URL": "http://localhost:3000",
        "CODING_AGENT_API_KEY": "nllm_your-personal-api-token-here"
      }
    }
  }
}
```

## Token Management

### Viewing Your Tokens

In the app, go to **Settings** → **Agent Connections** to see all your active tokens. You can view:
- Token name
- Creation date
- Last used date
- Partial token (last 4 characters for identification)

### Revoking Tokens

If a token is compromised or no longer needed:
1. Go to **Settings** → **Agent Connections**
2. Find the token in the list
3. Click the **Revoke** button
4. Confirm the revocation

Revoked tokens are immediately invalidated and cannot be used for authentication.

## Architecture

```
Third-Party Agent (Claude, Kiro, etc.)
           ↓
    [MCP Protocol - stdio]
           ↓
    [Coding Agent MCP Server]
           ↓
    [HTTP API calls]
           ↓
    [Your Backend API]
           ↓
    [Code Verification Service]
           ↓
    [Database - Sources Table]
```

## Development

```bash
# Run in development mode
npm run dev

# Build for production
npm run build

# Run production build
npm start
```
