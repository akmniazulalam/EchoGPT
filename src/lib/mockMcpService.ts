import { MCPTool } from "@/types/connector";

export interface DemoPreset {
  id: string;
  name: string;
  serverUrl: string;
  category: string;
  tools: MCPTool[];
}

export const DEMO_PRESETS: DemoPreset[] = [
  {
    id: "github",
    name: "GitHub Tools",
    serverUrl: "https://mcp.github.com/v1",
    category: "Developer",
    tools: [
      {
        name: "search_repositories",
        displayName: "Search repositories",
        description: "Search public and organization code repositories with language and star filters.",
        category: "Code & Repos",
      },
      {
        name: "get_repository",
        displayName: "Get repository",
        description: "Retrieve comprehensive repository details, branches, and commit status.",
        category: "Code & Repos",
      },
      {
        name: "list_issues",
        displayName: "List issues",
        description: "Fetch and filter open and closed issues, pull requests, and project discussions.",
        category: "Issues",
      },
      {
        name: "search_code",
        displayName: "Search code",
        description: "Execute regex and keyword search across file contents in repositories.",
        category: "Code & Repos",
      },
      {
        name: "create_issue",
        displayName: "Create issue",
        description: "Submit a new issue with markdown body, labels, milestones, and assignees.",
        category: "Issues",
      },
    ],
  },
  {
    id: "postgres",
    name: "PostgreSQL Database",
    serverUrl: "https://mcp.supabase.com/v1/database",
    category: "Data",
    tools: [
      {
        name: "query_database",
        displayName: "Query database",
        description: "Execute read-only SQL queries with pagination and schema safety boundaries.",
        category: "Query",
      },
      {
        name: "list_tables",
        displayName: "List tables",
        description: "Enumerate all schemas, public tables, views, and row counts.",
        category: "Schema",
      },
      {
        name: "describe_table",
        displayName: "Describe table",
        description: "Inspect column data types, foreign key relations, constraints, and indexes.",
        category: "Schema",
      },
      {
        name: "explain_query",
        displayName: "Explain query",
        description: "Retrieve performance query plan with EXPLAIN ANALYZE visual cost metrics.",
        category: "Performance",
      },
    ],
  },
  {
    id: "slack",
    name: "Slack Workspace",
    serverUrl: "https://mcp.slack.com/team",
    category: "Communication",
    tools: [
      {
        name: "send_message",
        displayName: "Send message",
        description: "Post formatted rich markdown notifications to designated team channels.",
        category: "Chat",
      },
      {
        name: "list_channels",
        displayName: "List channels",
        description: "Discover public channels and team groups with topic descriptions.",
        category: "Channels",
      },
      {
        name: "read_channel_history",
        displayName: "Read channel history",
        description: "Retrieve recent thread conversations and contextual project updates.",
        category: "History",
      },
      {
        name: "create_reminder",
        displayName: "Create reminder",
        description: "Schedule reminders and follow-up notices for team teammates.",
        category: "Productivity",
      },
    ],
  },
  {
    id: "linear",
    name: "Linear Issue Tracker",
    serverUrl: "https://mcp.linear.app/v1",
    category: "Project Management",
    tools: [
      {
        name: "create_task",
        displayName: "Create issue",
        description: "Create an engineering ticket with priority level, estimate, and assignment.",
        category: "Issues",
      },
      {
        name: "list_tasks",
        displayName: "List tasks",
        description: "Query active sprint backlog, roadmap milestones, and current cycle items.",
        category: "Sprint",
      },
      {
        name: "update_task_status",
        displayName: "Update issue status",
        description: "Transition issues between In Progress, In Review, and Done states.",
        category: "Workflow",
      },
      {
        name: "search_tasks",
        displayName: "Search backlog",
        description: "Perform fast fuzzy search across all team roadmaps and bug trackers.",
        category: "Search",
      },
    ],
  },
];

/**
 * Simulates connecting to an MCP endpoint and discovering available tools.
 * In production, this would make an HTTPS JSON-RPC handshake to the server.
 */
export async function simulateMcpHandshake(
  serverUrl: string,
  connectorName: string
): Promise<{ success: boolean; tools: MCPTool[]; error?: string }> {
  // Simulate network latency (650ms)
  await new Promise((resolve) => setTimeout(resolve, 650));

  const lowerUrl = serverUrl.toLowerCase();
  const lowerName = connectorName.toLowerCase();

  // Test failure simulation: if URL or name contains 'fail', 'error', or '500'
  if (lowerUrl.includes("fail") || lowerUrl.includes("error") || lowerName.includes("fail")) {
    return {
      success: false,
      tools: [],
      error:
        "Unable to establish MCP handshake. Endpoint returned HTTP 503 or failed TLS verification. (Simulated Demo Failure)",
    };
  }

  // Check matching presets
  for (const preset of DEMO_PRESETS) {
    if (
      lowerUrl.includes(preset.id) ||
      lowerName.includes(preset.id) ||
      (preset.id === "github" && (lowerUrl.includes("git") || lowerName.includes("git"))) ||
      (preset.id === "postgres" && (lowerUrl.includes("sql") || lowerName.includes("sql") || lowerUrl.includes("db"))) ||
      (preset.id === "slack" && (lowerUrl.includes("chat") || lowerName.includes("slack"))) ||
      (preset.id === "linear" && (lowerUrl.includes("task") || lowerName.includes("linear")))
    ) {
      return {
        success: true,
        tools: preset.tools,
      };
    }
  }

  // Generic custom MCP endpoint tool discovery fallback
  const hostname = new URL(serverUrl).hostname.replace("www.", "");
  const baseName = hostname.split(".")[0] || "custom";

  return {
    success: true,
    tools: [
      {
        name: `${baseName}.query_data`,
        displayName: `Query ${connectorName}`,
        description: `Execute contextual read queries against the ${hostname} MCP server.`,
        category: "Data",
      },
      {
        name: `${baseName}.inspect_schema`,
        displayName: "Inspect schema",
        description: `Retrieve resource definitions and schema specifications exposed by ${hostname}.`,
        category: "Schema",
      },
      {
        name: `${baseName}.execute_action`,
        displayName: "Execute action",
        description: `Trigger authorized tool actions and webhook payloads on ${hostname}.`,
        category: "Actions",
      },
    ],
  };
}
