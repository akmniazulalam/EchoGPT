import { ExtensionConversation, ExtensionTab, ExtensionSettings } from "./types";
import { INITIAL_CONVERSATIONS } from "./data";

export const EXTENSION_STORAGE_KEYS = {
  WIDTH: "echogpt:extension-panel-width",
  ACTIVE_TAB: "echogpt:extension-active-tab",
  CONVERSATIONS: "echogpt:extension-conversations",
  ACTIVE_CONV_ID: "echogpt:extension-active-conv-id",
  SETTINGS: "echogpt:extension-settings",
};

export const DEFAULT_SETTINGS: ExtensionSettings = {
  defaultModel: "echogpt",
  temperature: 0.7,
  streamResponses: true,
  autoPageContext: true,
  keyboardShortcuts: true,
};

/**
 * Load panel width safely from localStorage.
 * Clamped between 360px and 1080px.
 */
export function loadStoredWidth(): number {
  if (typeof window === "undefined") return 440;
  try {
    const raw = localStorage.getItem(EXTENSION_STORAGE_KEYS.WIDTH);
    if (!raw) return 440;
    const parsed = parseInt(raw, 10);
    if (!isNaN(parsed) && parsed >= 360 && parsed <= 1080) {
      return parsed;
    }
  } catch {
    // Ignore storage quota or security errors
  }
  return 440;
}

/**
 * Save panel width to localStorage.
 */
export function saveStoredWidth(width: number): void {
  if (typeof window === "undefined") return;
  try {
    const clamped = Math.max(360, Math.min(1080, width));
    localStorage.setItem(EXTENSION_STORAGE_KEYS.WIDTH, clamped.toString());
  } catch {
    // Ignore
  }
}

/**
 * Load active extension tab safely from localStorage.
 */
export function loadStoredTab(): ExtensionTab {
  if (typeof window === "undefined") return "chat";
  try {
    const raw = localStorage.getItem(EXTENSION_STORAGE_KEYS.ACTIVE_TAB);
    const validTabs: ExtensionTab[] = [
      "chat",
      "write",
      "read",
      "translate",
      "image",
      "video",
      "compare",
      "mcp",
      "settings",
    ];
    if (raw && validTabs.includes(raw as ExtensionTab)) {
      return raw as ExtensionTab;
    }
  } catch {
    // Ignore
  }
  return "chat";
}

/**
 * Save active extension tab to localStorage.
 */
export function saveStoredTab(tab: ExtensionTab): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(EXTENSION_STORAGE_KEYS.ACTIVE_TAB, tab);
  } catch {
    // Ignore
  }
}

/**
 * Load conversations list from localStorage or return default initial mock conversations.
 */
export function loadStoredConversations(): ExtensionConversation[] {
  if (typeof window === "undefined") return INITIAL_CONVERSATIONS;
  try {
    const raw = localStorage.getItem(EXTENSION_STORAGE_KEYS.CONVERSATIONS);
    if (raw) {
      const parsed = JSON.parse(raw) as ExtensionConversation[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // Ignore
  }
  return INITIAL_CONVERSATIONS;
}

/**
 * Save conversations list to localStorage.
 */
export function saveStoredConversations(conversations: ExtensionConversation[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(EXTENSION_STORAGE_KEYS.CONVERSATIONS, JSON.stringify(conversations));
  } catch {
    // Ignore
  }
}

/**
 * Load active conversation ID from localStorage.
 */
export function loadStoredActiveConvId(): string | null {
  if (typeof window === "undefined") return INITIAL_CONVERSATIONS[0].id;
  try {
    const raw = localStorage.getItem(EXTENSION_STORAGE_KEYS.ACTIVE_CONV_ID);
    if (raw !== null) return raw;
  } catch {
    // Ignore
  }
  return INITIAL_CONVERSATIONS[0].id;
}

/**
 * Save active conversation ID to localStorage.
 */
export function saveStoredActiveConvId(id: string | null): void {
  if (typeof window === "undefined") return;
  try {
    if (id) {
      localStorage.setItem(EXTENSION_STORAGE_KEYS.ACTIVE_CONV_ID, id);
    } else {
      localStorage.removeItem(EXTENSION_STORAGE_KEYS.ACTIVE_CONV_ID);
    }
  } catch {
    // Ignore
  }
}

/**
 * Load extension settings from localStorage.
 */
export function loadStoredSettings(): ExtensionSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(EXTENSION_STORAGE_KEYS.SETTINGS);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_SETTINGS, ...parsed };
    }
  } catch {
    // Ignore
  }
  return DEFAULT_SETTINGS;
}

/**
 * Save extension settings to localStorage.
 */
export function saveStoredSettings(settings: ExtensionSettings): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(EXTENSION_STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch {
    // Ignore
  }
}
