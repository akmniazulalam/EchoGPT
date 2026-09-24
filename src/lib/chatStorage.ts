export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface CurrentChatData {
  id: string;
  title: string;
  modelId: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface ConversationHistoryItem {
  id: string;
  title: string;
  preview: string;
  createdAt: string;
  formattedDate: string;
  modelId: string;
  modelName: string;
  messageCount: number;
  messages: ChatMessage[];
  starred?: boolean;
}

export const CURRENT_CHAT_KEY = "echogpt:current-chat";
export const CHAT_HISTORY_KEY = "echogpt:chat-history";
export const SELECTED_MODEL_KEY = "echogpt:selected-model";

// Seed conversations for /history page realism
const SEED_HISTORY: ConversationHistoryItem[] = [
  {
    id: "conv-seed-1",
    title: "SOP for Customer Onboarding Process",
    preview: "Drafted a complete 4-phase standard operating procedure for customer success verification.",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    formattedDate: "Today at 11:20 AM",
    modelId: "deepseek-r1",
    modelName: "DeepSeek R1",
    messageCount: 4,
    messages: [
      {
        id: "m1",
        role: "user",
        content: "Draft a Standard Operating Procedure (SOP) for customer onboarding with verification checkpoints.",
        timestamp: "11:18 AM",
      },
      {
        id: "m2",
        role: "assistant",
        content: "### Standard Operating Procedure: Customer Onboarding\n\n**Objective:** Ensure seamless account provisioning, user training, and verification milestones.\n\n1. Initial Intake & Workspace Provisioning\n2. Integration Verification\n3. Admin Training Session\n4. First Value Milestone Confirmation",
        timestamp: "11:20 AM",
      },
    ],
  },
  {
    id: "conv-seed-2",
    title: "Image Studio Visual Concepts for SaaS Hero",
    preview: "Generated 3 isometric plane and minimalist interface concepts with #713CF4 accents.",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    formattedDate: "Yesterday at 4:45 PM",
    modelId: "gpt-4o",
    modelName: "GPT-4o",
    messageCount: 2,
    messages: [
      {
        id: "m3",
        role: "user",
        content: "Generate concept variations for a modern SaaS product visual hero illustration.",
        timestamp: "4:44 PM",
      },
      {
        id: "m4",
        role: "assistant",
        content: "### Image Studio Concept Directions:\n\n- Concept 1: Isometric Workflow Plane with neutral slate surfaces and restrained purple glow.\n- Concept 2: Minimalist high-density card clusters with subtle ambient shadows.",
        timestamp: "4:45 PM",
      },
    ],
  },
  {
    id: "conv-seed-3",
    title: "Latency & Reasoning Model Comparison",
    preview: "Compared response speed, context limits, and benchmark scores across standard and fast models.",
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    formattedDate: "2 days ago",
    modelId: "echogpt",
    modelName: "EchoGPT",
    messageCount: 3,
    messages: [
      {
        id: "m5",
        role: "user",
        content: "Compare reasoning approaches for optimizing web application frontend performance.",
        timestamp: "2 days ago",
      },
      {
        id: "m6",
        role: "assistant",
        content: "### Comparative Benchmark Analysis:\n\n- EchoGPT: Balanced multi-turn drafting.\n- GPT-4o mini: Sub-second latency for single-turn utility queries.",
        timestamp: "2 days ago",
      },
    ],
  },
];

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

// 1. Current Chat Management
export function loadCurrentChat(): CurrentChatData | null {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(CURRENT_CHAT_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
    // Migration fallback for legacy key
    const legacyRaw = localStorage.getItem("echogpt_active_chat_messages");
    if (legacyRaw) {
      const messages = JSON.parse(legacyRaw);
      if (Array.isArray(messages) && messages.length > 0) {
        const migrated: CurrentChatData = {
          id: `chat-${Date.now()}`,
          title: messages[0]?.content?.slice(0, 40) || "Conversation",
          modelId: "echogpt",
          messages,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        saveCurrentChat(migrated);
        localStorage.removeItem("echogpt_active_chat_messages");
        return migrated;
      }
    }
    return null;
  } catch {
    return null;
  }
}

export function saveCurrentChat(chat: CurrentChatData): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(CURRENT_CHAT_KEY, JSON.stringify(chat));
    window.dispatchEvent(new Event("echogpt:current-chat-updated"));
  } catch {
    // Ignore storage quota or access errors
  }
}

export function clearCurrentChat(): void {
  if (!isBrowser()) return;
  try {
    localStorage.removeItem(CURRENT_CHAT_KEY);
    window.dispatchEvent(new Event("echogpt:current-chat-updated"));
  } catch {
    // Ignore storage quota or access errors
  }
}

// Helper: Save messages directly to current chat
export function updateCurrentChatMessages(
  messages: ChatMessage[],
  modelId = "echogpt"
): void {
  if (!isBrowser()) return;
  const existing = loadCurrentChat();
  const firstUser = messages.find((m) => m.role === "user");
  const title = firstUser
    ? firstUser.content.slice(0, 45) + (firstUser.content.length > 45 ? "..." : "")
    : "New Conversation";

  const updated: CurrentChatData = {
    id: existing?.id || `chat-${Date.now()}`,
    title: existing?.title || title,
    modelId: modelId || existing?.modelId || "echogpt",
    messages,
    createdAt: existing?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  saveCurrentChat(updated);
}

// Archive current chat into history before resetting
export function archiveCurrentChat(
  modelName = "EchoGPT"
): ConversationHistoryItem | null {
  if (!isBrowser()) return null;
  const current = loadCurrentChat();
  if (!current || current.messages.length === 0) return null;

  try {
    const lastAssistantMsg = [...current.messages]
      .reverse()
      .find((m) => m.role === "assistant");
    const preview = lastAssistantMsg
      ? lastAssistantMsg.content.slice(0, 100) +
        (lastAssistantMsg.content.length > 100 ? "..." : "")
      : current.messages[0].content.slice(0, 100);

    const now = new Date();
    const formattedDate = `Today at ${now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;

    const newHistoryItem: ConversationHistoryItem = {
      id: `conv-${Date.now()}`,
      title: current.title,
      preview,
      createdAt: current.createdAt || now.toISOString(),
      formattedDate,
      modelId: current.modelId,
      modelName,
      messageCount: current.messages.length,
      messages: [...current.messages],
    };

    const currentHistory = loadHistory();
    const updated = [newHistoryItem, ...currentHistory];
    saveHistory(updated);
    clearCurrentChat();
    return newHistoryItem;
  } catch {
    return null;
  }
}

// 2. Selected Model Persistence
export function loadSelectedModel(): string {
  if (!isBrowser()) return "echogpt";
  try {
    return localStorage.getItem(SELECTED_MODEL_KEY) || "echogpt";
  } catch {
    return "echogpt";
  }
}

export function saveSelectedModel(modelId: string): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(SELECTED_MODEL_KEY, modelId);
    window.dispatchEvent(new Event("echogpt:selected-model-updated"));
  } catch {
    // Ignore storage quota or access errors
  }
}

// 3. Chat History Persistence
export function loadHistory(): ConversationHistoryItem[] {
  if (!isBrowser()) return SEED_HISTORY;
  try {
    const raw = localStorage.getItem(CHAT_HISTORY_KEY);
    if (!raw) {
      localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(SEED_HISTORY));
      return SEED_HISTORY;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : SEED_HISTORY;
  } catch {
    return SEED_HISTORY;
  }
}

export function saveHistory(items: ConversationHistoryItem[]): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("echogpt:history-updated"));
  } catch {
    // Ignore storage quota or access errors
  }
}

export function deleteHistoryItem(id: string): void {
  if (!isBrowser()) return;
  const history = loadHistory();
  const filtered = history.filter((item) => item.id !== id);
  saveHistory(filtered);
}

export function clearAllHistory(): void {
  if (!isBrowser()) return;
  try {
    localStorage.removeItem(CHAT_HISTORY_KEY);
    window.dispatchEvent(new Event("echogpt:history-updated"));
  } catch {
    // Ignore storage quota or access errors
  }
}
