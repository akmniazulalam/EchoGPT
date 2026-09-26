export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface ConversationHistoryItem {
  id: string; // Unique conversation ID, e.g. "conv-1727371234567-abc"
  title: string;
  preview: string;
  createdAt: string;
  updatedAt: string;
  formattedDate: string;
  modelId: string;
  modelName: string;
  messageCount: number;
  messages: ChatMessage[];
  starred?: boolean;
}

// Deprecated single-chat interface maintained for back-compat
export interface CurrentChatData {
  id: string;
  title: string;
  modelId: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export const CHAT_HISTORY_KEY = "echogpt:chat-history";
export const SELECTED_MODEL_KEY = "echogpt:selected-model";
export const DEMO_PRO_KEY = "echogpt:is-demo-pro";
export const CURRENT_CHAT_KEY = "echogpt:current-chat"; // legacy key

// Seed conversations for /history page realism
const SEED_HISTORY: ConversationHistoryItem[] = [
  {
    id: "conv-seed-1",
    title: "SOP for Customer Onboarding Process",
    preview:
      "Drafted a complete 4-phase standard operating procedure for customer success verification.",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    formattedDate: "Today at 11:20 AM",
    modelId: "deepseek-r1",
    modelName: "DeepSeek R1",
    messageCount: 2,
    messages: [
      {
        id: "m1",
        role: "user",
        content:
          "Draft a Standard Operating Procedure (SOP) for customer onboarding with verification checkpoints.",
        timestamp: "11:18 AM",
      },
      {
        id: "m2",
        role: "assistant",
        content:
          "### Standard Operating Procedure: Customer Onboarding\n\n**Objective:** Ensure seamless account provisioning, user training, and verification milestones.\n\n1. Initial Intake & Workspace Provisioning\n2. Integration Verification\n3. Admin Training Session\n4. First Value Milestone Confirmation",
        timestamp: "11:20 AM",
      },
    ],
  },
  {
    id: "conv-seed-2",
    title: "Visual Hero Concepts for SaaS Product",
    preview:
      "Generated 3 isometric plane and minimalist interface concepts with #713CF4 accents.",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    formattedDate: "Yesterday at 4:45 PM",
    modelId: "gpt-4o",
    modelName: "GPT-4o",
    messageCount: 2,
    messages: [
      {
        id: "m3",
        role: "user",
        content:
          "Generate concept variations for a modern SaaS product visual hero illustration.",
        timestamp: "4:44 PM",
      },
      {
        id: "m4",
        role: "assistant",
        content:
          "### Image Studio Concept Directions:\n\n- Concept 1: Isometric Workflow Plane with neutral slate surfaces and restrained purple glow.\n- Concept 2: Minimalist high-density card clusters with subtle ambient shadows.",
        timestamp: "4:45 PM",
      },
    ],
  },
  {
    id: "conv-seed-3",
    title: "Reasoning Approaches for Web Optimization",
    preview:
      "Compared response speed, context limits, and benchmark scores across standard and fast models.",
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    formattedDate: "2 days ago",
    modelId: "echogpt",
    modelName: "EchoGPT",
    messageCount: 2,
    messages: [
      {
        id: "m5",
        role: "user",
        content:
          "Compare reasoning approaches for optimizing web application frontend performance.",
        timestamp: "2 days ago",
      },
      {
        id: "m6",
        role: "assistant",
        content:
          "### Comparative Benchmark Analysis:\n\n- EchoGPT: Balanced multi-turn drafting.\n- GPT-4o mini: Sub-second latency for single-turn utility queries.",
        timestamp: "2 days ago",
      },
    ],
  },
];

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

// ── 1. ID Generation & Title Derivation ───────────────────────────────────

export function generateConversationId(): string {
  const ts = Date.now();
  const rand = Math.random().toString(36).substring(2, 7);
  return `conv-${ts}-${rand}`;
}

export function deriveConversationTitle(firstPrompt: string): string {
  if (!firstPrompt) return "New conversation";
  const cleaned = firstPrompt.trim().replace(/^#+\s*/, "").replace(/\s+/g, " ");
  if (!cleaned) return "New conversation";
  if (cleaned.length <= 42) return cleaned;
  return cleaned.slice(0, 40).trim() + "...";
}

export function formatConversationTime(date: Date = new Date()): string {
  return `Today at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
}

// ── 2. Chat History Persistence ──────────────────────────────────────────

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

export function getConversationById(id: string): ConversationHistoryItem | null {
  const history = loadHistory();
  return history.find((c) => c.id === id) || null;
}

export function upsertHistoryConversation(item: ConversationHistoryItem): void {
  if (!isBrowser()) return;
  const history = loadHistory();
  const existingIdx = history.findIndex((c) => c.id === item.id);

  let updated: ConversationHistoryItem[];
  if (existingIdx >= 0) {
    // Replace and move to top of history
    const copy = [...history];
    copy.splice(existingIdx, 1);
    updated = [item, ...copy];
  } else {
    // Add to front
    updated = [item, ...history];
  }

  saveHistory(updated);
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
    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify([]));
    window.dispatchEvent(new Event("echogpt:history-updated"));
  } catch {
    // Ignore storage quota or access errors
  }
}

// ── 3. Selected Model Persistence ────────────────────────────────────────

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

// ── 4. Demo Pro State Persistence ────────────────────────────────────────

export function loadDemoProState(): boolean {
  if (!isBrowser()) return false;
  try {
    return localStorage.getItem(DEMO_PRO_KEY) === "true";
  } catch {
    return false;
  }
}

export function saveDemoProState(isPro: boolean): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(DEMO_PRO_KEY, isPro ? "true" : "false");
    window.dispatchEvent(new Event("echogpt:pro-status-updated"));
  } catch {
    // Ignore storage quota or access errors
  }
}

// ── 5. Backwards Compatibility Stubs ─────────────────────────────────────

export function loadCurrentChat(): CurrentChatData | null {
  return null;
}

export function saveCurrentChat(chat: CurrentChatData): void {
  if (!isBrowser() || !chat) return;
  upsertHistoryConversation({
    id: chat.id,
    title: chat.title || "Conversation",
    preview: chat.messages[chat.messages.length - 1]?.content.slice(0, 100) || "",
    createdAt: chat.createdAt,
    updatedAt: chat.updatedAt,
    formattedDate: formatConversationTime(),
    modelId: chat.modelId,
    modelName: chat.modelId,
    messageCount: chat.messages.length,
    messages: chat.messages,
  });
}

export function clearCurrentChat(): void {
  // Safe no-op in modern conversation-isolated architecture
}

export function updateCurrentChatMessages(
  messages: ChatMessage[],
  modelId = "echogpt"
): void {
  if (!isBrowser() || messages.length === 0) return;
  const firstUser = messages.find((m) => m.role === "user");
  const title = deriveConversationTitle(firstUser?.content || "Conversation");
  const convId = generateConversationId();
  upsertHistoryConversation({
    id: convId,
    title,
    preview: messages[messages.length - 1]?.content.slice(0, 100) || "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    formattedDate: formatConversationTime(),
    modelId,
    modelName: modelId,
    messageCount: messages.length,
    messages,
  });
}

export function archiveCurrentChat(): ConversationHistoryItem | null {
  // Legacy stub: In the new architecture, conversations are already immediately persisted in history.
  return null;
}
