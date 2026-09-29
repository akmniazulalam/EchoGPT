import { AIModel } from "@/config/models";
import { ExtensionConversation } from "./types";

export const EXTENSION_LANGUAGES = [
  { code: "auto", name: "Automatic", native: "Auto Detect" },
  { code: "en", name: "English", native: "English (US)" },
  { code: "bn", name: "Bengali", native: "বাংলা" },
  { code: "es", name: "Spanish", native: "Español" },
  { code: "fr", name: "French", native: "Français" },
  { code: "de", name: "German", native: "Deutsch" },
  { code: "it", name: "Italian", native: "Italiano" },
  { code: "pt", name: "Portuguese", native: "Português" },
  { code: "nl", name: "Dutch", native: "Nederlands" },
  { code: "ar", name: "Arabic", native: "العربية" },
  { code: "hi", name: "Hindi", native: "हिन्दी" },
  { code: "ur", name: "Urdu", native: "اردو" },
  { code: "zh-cn", name: "Chinese (Simplified)", native: "简体中文" },
  { code: "zh-tw", name: "Chinese (Traditional)", native: "繁體中文" },
  { code: "ja", name: "Japanese", native: "日本語" },
  { code: "ko", name: "Korean", native: "한국어" },
  { code: "ru", name: "Russian", native: "Русский" },
  { code: "tr", name: "Turkish", native: "Türkçe" },
  { code: "vi", name: "Vietnamese", native: "Tiếng Việt" },
  { code: "id", name: "Indonesian", native: "Bahasa Indonesia" },
  { code: "ms", name: "Malay", native: "Bahasa Melayu" },
  { code: "pl", name: "Polish", native: "Polski" },
  { code: "sv", name: "Swedish", native: "Svenska" },
  { code: "no", name: "Norwegian", native: "Norsk" },
  { code: "da", name: "Danish", native: "Dansk" },
  { code: "fi", name: "Finnish", native: "Suomi" },
  { code: "el", name: "Greek", native: "Ελληνικά" },
  { code: "he", name: "Hebrew", native: "עברית" },
  { code: "th", name: "Thai", native: "ไทย" },
  { code: "uk", name: "Ukrainian", native: "Українська" },
  { code: "cs", name: "Czech", native: "Čeština" },
  { code: "ro", name: "Romanian", native: "Română" },
  { code: "hu", name: "Hungarian", native: "Magyar" },
];

export const WRITE_FORMATS = [
  "Automatic",
  "Email",
  "Message",
  "Paragraph",
  "Idea",
  "Outline",
  "Blog Post",
  "Comment",
  "Article",
  "Twitter",
  "LinkedIn",
  "Summary",
];

export const WRITE_TONES = [
  "Automatic",
  "Formal",
  "Casual",
  "Friendly",
  "Professional",
  "Straightforward",
  "Confident",
  "Funny",
  "Enthusiastic",
];

export const WRITE_LENGTHS = ["Automatic", "Short", "Medium", "Long"];

export const CHAT_SUGGESTIONS = [
  "Tell me an interesting fun fact",
  "Explain quantum computing in simple terms",
  "Recommend 5 great sci-fi movies",
  "How can I improve my English speaking skills?",
];

export const INITIAL_CONVERSATIONS: ExtensionConversation[] = [
  {
    id: "conv-1",
    title: "Quantum Computing Explained",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    relativeTime: "15m ago",
    modelId: "echogpt",
    toolType: "chat",
    messages: [
      {
        id: "msg-1",
        sender: "user",
        text: "Explain quantum computing in simple terms",
        timestamp: "10:30 AM",
      },
      {
        id: "msg-2",
        sender: "ai",
        text: "Quantum computing uses the strange laws of quantum physics — like superposition (being in multiple states at once) and entanglement (instant links between particles) — to process complex information exponentially faster than conventional binary computers. Imagine flipping a coin: a normal computer sees heads or tails (0 or 1), but a quantum computer explores the coin spinning in mid-air (both at once)!",
        timestamp: "10:31 AM",
        modelId: "echogpt",
        modelName: "EchoGPT",
      },
    ],
  },
  {
    id: "conv-2",
    title: "Next.js 16 App Router Migration",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    relativeTime: "3h ago",
    modelId: "claude-3-5-sonnet",
    toolType: "read",
    messages: [
      {
        id: "msg-3",
        sender: "user",
        text: "What are the primary performance improvements in Next.js 16?",
        timestamp: "07:45 AM",
      },
      {
        id: "msg-4",
        sender: "ai",
        text: "Next.js 16 introduces accelerated Server Components streaming, optimized Turbopack default bundler speeds, improved incremental hydration, and refined route caching mechanics that significantly reduce cold-start latency across complex multi-workspace architectures.",
        timestamp: "07:46 AM",
        modelId: "claude-3-5-sonnet",
        modelName: "Claude 3.5 Sonnet",
      },
    ],
  },
  {
    id: "conv-3",
    title: "Client Email: Milestone Update",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    relativeTime: "Yesterday",
    modelId: "gpt-4o",
    toolType: "write",
    messages: [
      {
        id: "msg-5",
        sender: "user",
        text: "Draft a polite milestone completion email for the client.",
        timestamp: "Yesterday",
      },
      {
        id: "msg-6",
        sender: "ai",
        text: "Subject: Milestone Complete — EchoGPT Companion & Platform Deliverables\n\nHi Team,\n\nI am thrilled to announce that we have successfully finalized all deliverables for Milestone 7. The platform now features responsive workflows, modular MCP integrations, and verified multi-tier testing.\n\nPlease review the attached summary at your convenience.\n\nBest regards,\nEngineering Team",
        timestamp: "Yesterday",
        modelId: "gpt-4o",
        modelName: "GPT-4o",
      },
    ],
  },
  {
    id: "conv-4",
    title: "Linear Issue Tracker Sync API",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    relativeTime: "2 days ago",
    modelId: "deepseek-r1",
    toolType: "mcp",
    messages: [
      {
        id: "msg-7",
        sender: "user",
        text: "How to setup webhooks with Linear MCP server?",
        timestamp: "2 days ago",
      },
      {
        id: "msg-8",
        sender: "ai",
        text: "To configure webhooks with the Linear MCP server, generate a personal API key with read/write access in Linear Settings > API, then register your endpoint URL with HMAC verification enabled.",
        timestamp: "2 days ago",
        modelId: "deepseek-r1",
        modelName: "DeepSeek R1",
      },
    ],
  },
];

// 100+ Model Catalog for Compare and deep model picking
export const EXTENDED_COMPARE_CATALOG: AIModel[] = [
  // EchoGPT
  { id: "echogpt", name: "EchoGPT Fast", provider: "EchoGPT", category: "Fast", description: "Default high-speed conversational reasoning", isPro: false, badge: "Default" },
  { id: "echogpt-pro", name: "EchoGPT Pro", provider: "EchoGPT", category: "Flagship", description: "Maximum reasoning depth and agentic execution", isPro: true, badge: "Pro" },
  { id: "echogpt-coder", name: "EchoGPT Coder v2", provider: "EchoGPT", category: "Fast", description: "Specialized syntax, debugging and refactoring", isPro: false, badge: "Code" },

  // OpenAI
  { id: "gpt-5", name: "GPT-5 Frontier", provider: "OpenAI", category: "Flagship", description: "Frontier synthetic intelligence & multi-step autonomy", isPro: true, badge: "Frontier" },
  { id: "gpt-4o", name: "GPT-4o Omni", provider: "OpenAI", category: "Flagship", description: "High-intelligence multimodal flagship", isPro: true, badge: "Popular" },
  { id: "gpt-4o-mini", name: "GPT-4o mini", provider: "OpenAI", category: "Fast", description: "Fast, efficient everyday helper", isPro: false, badge: "Fast" },
  { id: "gpt-4-5", name: "GPT-4.5 Preview", provider: "OpenAI", category: "Flagship", description: "Deep instruction-following & nuanced prose", isPro: true },
  { id: "o3", name: "o3 Reasoning", provider: "OpenAI", category: "Reasoning", description: "Advanced STEM, logic and theorem proof", isPro: true, badge: "Reasoning" },
  { id: "o4-mini", name: "o4-mini Fast Reasoning", provider: "OpenAI", category: "Reasoning", description: "Fast chain-of-thought STEM model", isPro: true },
  { id: "o1", name: "o1 Maximum Reasoning", provider: "OpenAI", category: "Reasoning", description: "Original frontier chain-of-thought model", isPro: true },
  { id: "o1-mini", name: "o1-mini", provider: "OpenAI", category: "Reasoning", description: "Fast math and coding assistant", isPro: true },

  // Anthropic
  { id: "claude-4-sonnet", name: "Claude 4 Sonnet", provider: "Anthropic", category: "Flagship", description: "Frontier code generation and nuanced writing", isPro: true, badge: "Frontier" },
  { id: "claude-3-5-sonnet", name: "Claude 3.5 Sonnet", provider: "Anthropic", category: "Flagship", description: "Industry benchmark for software engineering", isPro: true, badge: "Popular" },
  { id: "claude-opus", name: "Claude 3 Opus", provider: "Anthropic", category: "Flagship", description: "Deepest context analysis and long-form writing", isPro: true },
  { id: "claude-haiku", name: "Claude 3.5 Haiku", provider: "Anthropic", category: "Fast", description: "Ultra-fast response latency with high precision", isPro: true, badge: "Fast" },
  { id: "claude-3-haiku", name: "Claude 3 Haiku", provider: "Anthropic", category: "Fast", description: "Cost-efficient compact assistant", isPro: false },

  // Google
  { id: "gemini-2-5-pro", name: "Gemini 2.5 Pro", provider: "Google", category: "Reasoning", description: "1M token reasoning and cross-modal synthesis", isPro: true, badge: "1M Context" },
  { id: "gemini-advanced", name: "Gemini 1.5 Pro Advanced", provider: "Google", category: "Flagship", description: "Audio, video, image and code long-context", isPro: true },
  { id: "gemini-flash-2-0", name: "Gemini 2.0 Flash", provider: "Google", category: "Fast", description: "Real-time conversational streaming", isPro: false, badge: "Free" },
  { id: "gemini-1-5-flash", name: "Gemini 1.5 Flash", provider: "Google", category: "Fast", description: "High-throughput multimodal workhorse", isPro: false },
  { id: "gemini-exp-1206", name: "Gemini 2.0 Flash Thinking", provider: "Google", category: "Reasoning", description: "Explicit chain of thought reasoning", isPro: true },

  // DeepSeek
  { id: "deepseek-r1", name: "DeepSeek R1", provider: "DeepSeek", category: "Reasoning", description: "Open reasoning matching frontier models", isPro: true, badge: "Reasoning" },
  { id: "deepseek-r2", name: "DeepSeek R2 Preview", provider: "DeepSeek", category: "Reasoning", description: "Next-gen logic and math solver", isPro: true },
  { id: "deepseek-v3", name: "DeepSeek V3", provider: "DeepSeek", category: "Open Source", description: "671B parameter mixture-of-experts model", isPro: false, badge: "Open" },
  { id: "deepseek-coder-v2", name: "DeepSeek Coder V2", provider: "DeepSeek", category: "Open Source", description: "Superior polyglot programming capability", isPro: false, badge: "Code" },

  // Meta Llama
  { id: "llama-3-3-70b", name: "Llama 3.3 70B", provider: "Meta", category: "Open Source", description: "Top open-source model matching proprietary tiers", isPro: false, badge: "Popular" },
  { id: "llama-3-1-405b", name: "Llama 3.1 405B", provider: "Meta", category: "Flagship", description: "Frontier scale open weights behemoth", isPro: true, badge: "Open Frontier" },
  { id: "llama-3-1-8b", name: "Llama 3.1 8B", provider: "Meta", category: "Fast", description: "Ultra-lean model for immediate responses", isPro: false, badge: "Fast" },
  { id: "llama-3-2-3b", name: "Llama 3.2 3B Mobile", provider: "Meta", category: "Fast", description: "Edge-optimized lightweight model", isPro: false },
  { id: "llama-guard-3", name: "Llama Guard 3", provider: "Meta", category: "Fast", description: "Content safety and moderation classifier", isPro: false },

  // Mistral
  { id: "mistral-large-2", name: "Mistral Large 2", provider: "Mistral", category: "Flagship", description: "128k context, European frontier intelligence", isPro: true, badge: "Frontier" },
  { id: "mistral-codestral", name: "Codestral 2501", provider: "Mistral", category: "Open Source", description: "Fast fill-in-the-middle software creation", isPro: false, badge: "Code" },
  { id: "mistral-pixtral", name: "Pixtral 12B Vision", provider: "Mistral", category: "Open Source", description: "Multimodal image and document comprehension", isPro: false },
  { id: "mistral-nemo", name: "Mistral NeMo 12B", provider: "Mistral", category: "Fast", description: "NVIDIA collaborated compact architecture", isPro: false },
  { id: "mistral-7b", name: "Mistral 7B Instruct", provider: "Mistral", category: "Fast", description: "Classic high-throughput open model", isPro: false },

  // xAI
  { id: "grok-4", name: "Grok 4 Frontier", provider: "xAI", category: "Reasoning", description: "Supercomputer-scale analytical synthesis", isPro: true, badge: "Reasoning" },
  { id: "grok-3", name: "Grok 3 Realtime", provider: "xAI", category: "Flagship", description: "Live real-time knowledge with humor & precision", isPro: true, badge: "Live" },
  { id: "grok-2-vision", name: "Grok 2 Vision", provider: "xAI", category: "Flagship", description: "Visual inspection and document extraction", isPro: true },

  // Alibaba Qwen
  { id: "qwen-3-235b", name: "Qwen 3 235B", provider: "Qwen", category: "Flagship", description: "Alibaba frontier model with exceptional multilingual math", isPro: true, badge: "Frontier" },
  { id: "qwen-2-5-72b", name: "Qwen 2.5 72B Instruct", provider: "Qwen", category: "Open Source", description: "Top global open-source leaderboard ranker", isPro: false, badge: "Open" },
  { id: "qwen-2-5-coder", name: "Qwen 2.5 Coder 32B", provider: "Qwen", category: "Open Source", description: "State-of-the-art open code generation", isPro: false, badge: "Code" },
  { id: "qwen-qwq-32b", name: "QwQ-32B Reasoning", provider: "Qwen", category: "Reasoning", description: "Chain-of-thought open reasoning rivaling o1", isPro: false, badge: "Reasoning" },

  // Zhipu GLM
  { id: "glm-5-3-flash", name: "GLM-5.3 Flash", provider: "GLM", category: "Fast", description: "Sub-second Chinese/English translation & chat", isPro: false, badge: "Fast" },
  { id: "glm-5-2", name: "GLM-5.2 Pro", provider: "GLM", category: "Flagship", description: "Enterprise grade reasoning and structured output", isPro: true },
  { id: "glm-4-flash", name: "GLM-4 Flash", provider: "GLM", category: "Fast", description: "Cost-free high concurrency processing", isPro: false },

  // Kimi / Moonshot
  { id: "kimi-k2-code", name: "Kimi K2.7 Code", provider: "Kimi", category: "Reasoning", description: "2M context code repository analysis", isPro: true, badge: "2M Context" },
  { id: "kimi-k1-5", name: "Kimi k1.5 Long", provider: "Kimi", category: "Reasoning", description: "Multi-hop search and document analysis", isPro: true },

  // Cohere
  { id: "command-r-plus", name: "Command R+ Enterprise", provider: "Cohere", category: "Flagship", description: "RAG citation, tool use and tabular reasoning", isPro: true, badge: "RAG" },
  { id: "command-r", name: "Command R", provider: "Cohere", category: "Fast", description: "Efficient multilingual RAG workflow model", isPro: false },

  // NovaSky
  { id: "nova-sky-8b", name: "Sky-T1 32B Open", provider: "NovaSky", category: "Reasoning", description: "Open reasoning model with frontier math score", isPro: false, badge: "Open" },
];

export const MOCK_MCP_CONNECTORS = [
  {
    id: "mcp-github",
    name: "GitHub Tools",
    url: "https://api.github.com/mcp",
    status: "connected",
    enabled: true,
    tools: [
      { name: "read_repo", description: "Read repository file structure and contents" },
      { name: "create_issue", description: "Create an issue in a tracked repository" },
      { name: "search_code", description: "Search code across public and private repositories" },
    ],
  },
  {
    id: "mcp-postgres",
    name: "PostgreSQL Database",
    url: "postgresql://localhost:5432/production",
    status: "connected",
    enabled: true,
    tools: [
      { name: "execute_query", description: "Execute read-only SQL queries on allowed tables" },
      { name: "list_tables", description: "Retrieve schema definition and column metadata" },
    ],
  },
  {
    id: "mcp-slack",
    name: "Slack Workspace",
    url: "https://slack.com/mcp/v1",
    status: "connected",
    enabled: true,
    tools: [
      { name: "send_message", description: "Post notifications to designated Slack channels" },
      { name: "search_channels", description: "Search team discussions and shared attachments" },
    ],
  },
  {
    id: "mcp-linear",
    name: "Linear Issue Tracker",
    url: "https://api.linear.app/mcp",
    status: "connected",
    enabled: false,
    tools: [
      { name: "create_task", description: "Create sprint tickets with labels and assignees" },
      { name: "view_issues", description: "List issues assigned to current sprint" },
    ],
  },
];
