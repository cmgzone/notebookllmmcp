#!/usr/bin/env node
/**
 * Coding Agent MCP Server
 *
 * This MCP server exposes code verification tools that third-party
 * coding agents can use to verify code and save it as sources.
 *
 * Tools provided:
 * - verify_code: Verify code for correctness, security, and best practices
 * - verify_and_save: Verify code and save as source if valid
 * - batch_verify: Verify multiple code snippets at once
 * - analyze_code: Deep analysis with suggestions
 * - get_verified_sources: Retrieve saved verified sources
 *
 * Agent Communication Tools (Requirements 1.1, 1.2, 2.1-2.3, 3.2, 3.3, 5.1):
 * - create_agent_notebook: Create a dedicated notebook for the agent
 * - save_code_with_context: Save code with conversation context
 * - get_followup_messages: Poll for user messages
 * - respond_to_followup: Send response to user
 * - register_webhook: Register webhook for receiving messages
 */
export {};
