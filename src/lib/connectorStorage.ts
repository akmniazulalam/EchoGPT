import { Connector } from "@/types/connector";
import { DEMO_PRESETS } from "./mockMcpService";

const CONNECTORS_KEY = "echogpt:connectors";
const ACTIVE_CHAT_CONNECTORS_KEY = "echogpt:active-chat-connectors";

export function loadStoredConnectors(): Connector[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CONNECTORS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("Failed to load stored connectors:", e);
    return [];
  }
}

export function saveStoredConnectors(connectors: Connector[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CONNECTORS_KEY, JSON.stringify(connectors));
    window.dispatchEvent(new CustomEvent("echogpt:connectors-updated"));
  } catch (e) {
    console.error("Failed to save connectors:", e);
  }
}

export function loadActiveChatConnectorIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(ACTIVE_CHAT_CONNECTORS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("Failed to load active chat connectors:", e);
    return [];
  }
}

export function saveActiveChatConnectorIds(ids: string[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(ACTIVE_CHAT_CONNECTORS_KEY, JSON.stringify(ids));
    window.dispatchEvent(new CustomEvent("echogpt:active-chat-connectors-updated"));
  } catch (e) {
    console.error("Failed to save active chat connectors:", e);
  }
}

/**
 * Creates sample demo connectors for instant exploration
 */
export function getSampleDemoConnectors(): Connector[] {
  const now = new Date().toISOString();

  const githubPreset = DEMO_PRESETS[0];
  const postgresPreset = DEMO_PRESETS[1];

  return [
    {
      id: "conn-github-demo",
      name: githubPreset.name,
      serverUrl: githubPreset.serverUrl,
      status: "connected",
      enabled: true,
      tools: githubPreset.tools,
      hasAuthToken: true,
      createdAt: now,
      updatedAt: now,
      lastConnectedAt: now,
      isDemo: true,
    },
    {
      id: "conn-postgres-demo",
      name: postgresPreset.name,
      serverUrl: postgresPreset.serverUrl,
      status: "connected",
      enabled: true,
      tools: postgresPreset.tools,
      hasAuthToken: false,
      createdAt: now,
      updatedAt: now,
      lastConnectedAt: now,
      isDemo: true,
    },
  ];
}
