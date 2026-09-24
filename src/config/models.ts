export interface AIModel {
  id: string;
  name: string;
  provider: "EchoGPT" | "OpenAI" | "Anthropic" | "Google" | "DeepSeek" | "Mistral" | "xAI";
  category: "Flagship" | "Reasoning" | "Fast" | "Open Source";
  description: string;
  isPro: boolean;
  contextWindow?: string;
  badge?: string;
}

export const AI_MODELS: AIModel[] = [
  // 1. EchoGPT & Fast Free Models
  {
    id: "echogpt",
    name: "EchoGPT",
    provider: "EchoGPT",
    category: "Fast",
    description: "EchoGPT's standard high-speed conversational reasoning engine",
    isPro: false,
    contextWindow: "32K",
    badge: "Default",
  },
  {
    id: "gpt-4o-mini",
    name: "GPT-4o mini",
    provider: "OpenAI",
    category: "Fast",
    description: "Fast, lightweight multimodal model for everyday quick tasks",
    isPro: false,
    contextWindow: "128K",
  },
  {
    id: "deepseek-v3",
    name: "DeepSeek-V3",
    provider: "DeepSeek",
    category: "Open Source",
    description: "Highly capable open-architecture model with balanced throughput",
    isPro: false,
    contextWindow: "64K",
  },

  // 2. Flagship Models (PRO)
  {
    id: "gpt-5",
    name: "GPT-5",
    provider: "OpenAI",
    category: "Flagship",
    description: "Next-generation frontier intelligence for complex synthetic logic",
    isPro: true,
    contextWindow: "256K",
    badge: "Frontier",
  },
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    category: "Flagship",
    description: "Omni-intelligence powerhouse with superior text and multimodal depth",
    isPro: true,
    contextWindow: "128K",
  },
  {
    id: "gemini-advanced",
    name: "Gemini Advanced",
    provider: "Google",
    category: "Flagship",
    description: "Massive 1M token context window with cross-modal analytical depth",
    isPro: true,
    contextWindow: "1M",
  },
  {
    id: "claude-4-sonnet",
    name: "Claude 4 Sonnet",
    provider: "Anthropic",
    category: "Flagship",
    description: "Industry-leading coding precision, nuanced writing, and logic",
    isPro: true,
    contextWindow: "200K",
  },
  {
    id: "claude-opus",
    name: "Claude Opus",
    provider: "Anthropic",
    category: "Flagship",
    description: "Anthropic's maximum intelligence tier for deep multi-step planning",
    isPro: true,
    contextWindow: "200K",
  },

  // 3. Deep Reasoning Models (PRO)
  {
    id: "deepseek-r1",
    name: "DeepSeek R1",
    provider: "DeepSeek",
    category: "Reasoning",
    description: "Autonomous reasoning and math verification with explicit chain of thought",
    isPro: true,
    contextWindow: "64K",
    badge: "Reasoning",
  },
  {
    id: "grok-4",
    name: "Grok 4",
    provider: "xAI",
    category: "Reasoning",
    description: "Maximum real-time compute with unconstrained logical analysis",
    isPro: true,
    contextWindow: "128K",
  },
  {
    id: "mistral-pro",
    name: "Mistral Pro",
    provider: "Mistral",
    category: "Open Source",
    description: "European frontier model with exceptional multilingual performance",
    isPro: true,
    contextWindow: "128K",
  },
];

export const IMAGE_MODELS: AIModel[] = [
  {
    id: "flux-pro",
    name: "Flux Pro",
    provider: "EchoGPT",
    category: "Flagship",
    description: "Highest-fidelity 4K neural synthesis and photorealistic detail",
    isPro: true,
    badge: "Frontier",
  },
  {
    id: "dall-e-3",
    name: "DALL-E 3",
    provider: "OpenAI",
    category: "Flagship",
    description: "Superior prompt adherence, typography, and scene composition",
    isPro: true,
    badge: "Accurate",
  },
  {
    id: "midjourney-v6",
    name: "Midjourney v6",
    provider: "EchoGPT",
    category: "Flagship",
    description: "Cinematic lighting, rich textures, and painterly aesthetic styles",
    isPro: true,
    badge: "Cinematic",
  },
  {
    id: "sdxl-turbo",
    name: "SDXL Turbo",
    provider: "EchoGPT",
    category: "Fast",
    description: "Real-time sub-second generation for rapid concept prototyping",
    isPro: false,
    badge: "Fast",
  },
];

export const DEFAULT_MODEL_ID = "echogpt";
export const DEFAULT_IMAGE_MODEL_ID = "flux-pro";
