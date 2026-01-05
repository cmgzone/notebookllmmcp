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
 * - get_quota: Get current MCP usage quota and limits
 * - list_notebooks: List all notebooks with source counts
 * - get_source: Get a specific source by ID
 * - search_sources: Search across all code sources
 * - update_source: Update existing source without quota hit
 * - delete_source: Delete a source permanently
 * - export_sources: Export sources as JSON for backup
 * - get_usage_stats: Get usage statistics and analytics
 *
 * Agent Communication Tools (Requirements 1.1, 1.2, 2.1-2.3, 3.2, 3.3, 5.1):
 * - create_agent_notebook: Create a dedicated notebook for the agent
 * - save_code_with_context: Save code with conversation context
 * - get_followup_messages: Poll for user messages
 * - respond_to_followup: Send response to user
 * - register_webhook: Register webhook for receiving messages
 *
 * GitHub Integration Tools:
 * - github_status: Check GitHub connection status
 * - github_list_repos: List accessible repositories
 * - github_get_repo_tree: Get repository file structure
 * - github_get_file: Get file contents
 * - github_search_code: Search code across repos
 * - github_get_readme: Get repository README
 * - github_create_issue: Create GitHub issue
 * - github_add_comment: Comment on issues/PRs
 * - github_add_as_source: Import GitHub file as notebook source
 * - github_analyze_repo: AI analysis of repository
 *
 * Planning Mode Tools (Requirements 5.1, 5.2, 5.3, 5.4, 5.5, 5.6):
 * - list_plans: List all accessible plans
 * - get_plan: Get a specific plan with full details
 * - create_plan: Create a new plan
 * - create_task: Create a task in a plan
 * - update_task_status: Update task status
 * - add_task_output: Add output to a task
 * - complete_task: Complete a task with summary
 * - create_requirement: Create a requirement with EARS pattern
 * - create_design_note: Create a design note for architectural decisions
 */
export {};
