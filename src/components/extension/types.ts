export type ExtensionTab =
  | "chat"
  | "write"
  | "read"
  | "translate"
  | "image"
  | "video"
  | "compare"
  | "mcp"
  | "settings";

export interface ExtensionMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  modelId?: string;
  modelName?: string;
  attachments?: {
    type: "screenshot" | "file" | "page-context";
    name: string;
    previewUrl?: string;
  }[];
}

export interface ExtensionConversation {
  id: string;
  title: string;
  timestamp: string;
  relativeTime: string;
  messages: ExtensionMessage[];
  modelId: string;
  toolType?: ExtensionTab;
}

export interface ExtensionSettings {
  defaultModel: string;
  temperature: number;
  streamResponses: boolean;
  autoPageContext: boolean;
  keyboardShortcuts: boolean;
}

export interface WriteOptions {
  subTab: "compose" | "reply" | "grammar";
  topic: string;
  format: string;
  tone: string;
  length: string;
  language: string;
  modelId: string;
}

export interface TranslateState {
  sourceLang: string;
  targetLang: string;
  sourceText: string;
  translatedText: string;
  modelId: string;
  isTranslating: boolean;
}

export interface ComparisonModelResult {
  modelId: string;
  modelName: string;
  provider: string;
  response: string;
  latencyMs: number;
  tokensPerSec: number;
}
