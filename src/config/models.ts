export interface AIModel {
  id: string;
  name: string;
  provider:
    | "EchoGPT"
    | "OpenAI"
    | "Anthropic"
    | "Google"
    | "DeepSeek"
    | "Mistral"
    | "xAI"
    | "GLM"
    | "Qwen"
    | "Kimi"
    | "Meta"
    | "Cohere"
    | "NovaSky"
    | string;
  category: "Flagship" | "Reasoning" | "Fast" | "Open Source";
  description: string;
  isPro: boolean;
  contextWindow?: string;
  badge?: string;
}

export const AI_MODELS: AIModel[] = [
  // ── 1. EchoGPT Native ─────────────────────────────────────────────────────
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

  // ── 2. Free / Fast Models ─────────────────────────────────────────────────
  {
    id: "glm-5-3-flash",
    name: "GLM-5.3 Flash",
    provider: "GLM",
    category: "Fast",
    description:
      "GLM-5.3 Flash is the fastest GLM tier, made for high-volume chat where latency matters most.",
    isPro: false,
    contextWindow: "128K",
    badge: "Fast",
  },
  {
    id: "glm-4-flash",
    name: "GLM-4 Flash",
    provider: "GLM",
    category: "Fast",
    description: "Cost-efficient high-throughput GLM engine optimized for rapid response tasks.",
    isPro: false,
    contextWindow: "128K",
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
    id: "gemini-flash-2-0",
    name: "Gemini 2.0 Flash",
    provider: "Google",
    category: "Fast",
    description: "Google's fastest Gemini tier — real-time multimodal reasoning at minimal latency",
    isPro: false,
    contextWindow: "1M",
    badge: "Free",
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
  {
    id: "qwen-2-5-plus",
    name: "Qwen 2.5 Plus",
    provider: "Qwen",
    category: "Open Source",
    description: "Open-weight reasoning powerhouse with expansive multilingual breadth",
    isPro: false,
    contextWindow: "128K",
  },
  {
    id: "llama-3-3-70b",
    name: "Llama 3.3 70B",
    provider: "Meta",
    category: "Open Source",
    description:
      "Meta's top open-source large language model with strong reasoning and instruction following",
    isPro: false,
    contextWindow: "128K",
    badge: "Open",
  },
  {
    id: "llama-3-1-8b",
    name: "Llama 3.1 8B",
    provider: "Meta",
    category: "Fast",
    description: "Compact open-source Llama model suitable for fast local and cloud inference",
    isPro: false,
    contextWindow: "128K",
  },
  {
    id: "mistral-7b",
    name: "Mistral 7B",
    provider: "Mistral",
    category: "Open Source",
    description: "Highly efficient European open-source model with strong coding and summarization",
    isPro: false,
    contextWindow: "32K",
  },

  // ── 3. Flagship Models (PRO) ──────────────────────────────────────────────
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
    id: "gpt-4-5",
    name: "GPT-4.5",
    provider: "OpenAI",
    category: "Flagship",
    description:
      "Enhanced GPT-4 series with improved following of nuanced multi-step instructions",
    isPro: true,
    contextWindow: "128K",
  },
  {
    id: "o3",
    name: "o3",
    provider: "OpenAI",
    category: "Reasoning",
    description: "OpenAI's most capable reasoning model for science, math, and advanced coding",
    isPro: true,
    contextWindow: "200K",
    badge: "Reasoning",
  },
  {
    id: "o4-mini",
    name: "o4-mini",
    provider: "OpenAI",
    category: "Reasoning",
    description:
      "Compact high-speed reasoning model from the o-series for STEM and code tasks",
    isPro: true,
    contextWindow: "200K",
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
    id: "gemini-2-5-pro",
    name: "Gemini 2.5 Pro",
    provider: "Google",
    category: "Reasoning",
    description:
      "Google's most intelligent Gemini tier with deep chain-of-thought reasoning and 1M context",
    isPro: true,
    contextWindow: "1M",
    badge: "Reasoning",
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
    id: "claude-3-5-sonnet",
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    category: "Flagship",
    description: "Exceptional coding benchmarks and sophisticated natural language reasoning",
    isPro: true,
    contextWindow: "200K",
    badge: "Popular",
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
  {
    id: "claude-haiku",
    name: "Claude 3.5 Haiku",
    provider: "Anthropic",
    category: "Fast",
    description:
      "Fastest Claude tier with balanced quality — ideal for high-volume structured tasks",
    isPro: true,
    contextWindow: "200K",
  },

  // ── 4. Reasoning / Chain-of-Thought Models (PRO) ──────────────────────────
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
    id: "deepseek-r2",
    name: "DeepSeek R2",
    provider: "DeepSeek",
    category: "Reasoning",
    description:
      "Next-generation open reasoning model with enhanced STEM and logical deduction precision",
    isPro: true,
    contextWindow: "128K",
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
    id: "grok-3",
    name: "Grok 3",
    provider: "xAI",
    category: "Flagship",
    description: "xAI's flagship model with live web knowledge and candid analytical power",
    isPro: true,
    contextWindow: "128K",
  },
  {
    id: "kimi-k2-code",
    name: "Kimi K2.7 Code",
    provider: "Kimi",
    category: "Reasoning",
    description: "Ultra-long context code reasoning engine with precise repository synthesis",
    isPro: true,
    contextWindow: "256K",
  },
  {
    id: "kimi-k1-5",
    name: "Kimi k1.5",
    provider: "Kimi",
    category: "Reasoning",
    description: "Powerful long-context reasoner specialized in multi-hop retrieval and coding",
    isPro: true,
    contextWindow: "128K",
  },
  {
    id: "qwen-qwq-32b",
    name: "QwQ-32B",
    provider: "Qwen",
    category: "Reasoning",
    description: "Alibaba's open-source chain-of-thought reasoning model matching frontier quality",
    isPro: false,
    contextWindow: "128K",
    badge: "Open",
  },

  // ── 5. Open Source Frontier Models ────────────────────────────────────────
  {
    id: "mistral-pro",
    name: "Mistral Large",
    provider: "Mistral",
    category: "Flagship",
    description: "European frontier model with exceptional multilingual performance",
    isPro: true,
    contextWindow: "128K",
  },
  {
    id: "mistral-codestral",
    name: "Codestral",
    provider: "Mistral",
    category: "Open Source",
    description: "Mistral's specialized coding model with deep fill-in-the-middle support",
    isPro: false,
    contextWindow: "32K",
    badge: "Code",
  },
  {
    id: "llama-3-1-405b",
    name: "Llama 3.1 405B",
    provider: "Meta",
    category: "Flagship",
    description: "Meta's largest open-source model at 405 billion parameters — frontier quality",
    isPro: true,
    contextWindow: "128K",
    badge: "Open Frontier",
  },
  {
    id: "command-r-plus",
    name: "Command R+",
    provider: "Cohere",
    category: "Flagship",
    description:
      "Cohere's flagship model optimized for enterprise RAG and tool-use reasoning",
    isPro: true,
    contextWindow: "128K",
  },
  {
    id: "nova-sky-8b",
    name: "Sky-T1 32B",
    provider: "NovaSky",
    category: "Reasoning",
    description:
      "Competitive open-source reasoning model with $450 training cost and frontier-class math",
    isPro: false,
    contextWindow: "32K",
    badge: "Open",
  },
  {
    id: "glm-5-2",
    name: "GLM-5.2",
    provider: "GLM",
    category: "Flagship",
    description: "Zhipu AI flagship with excellent code generation and advanced logical reasoning",
    isPro: true,
    contextWindow: "128K",
  },
  {
    id: "qwen-3-235b",
    name: "Qwen 3 235B",
    provider: "Qwen",
    category: "Flagship",
    description: "Alibaba's largest Qwen model with top-tier math and multilingual coding",
    isPro: true,
    contextWindow: "128K",
    badge: "Frontier",
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

export const VIDEO_MODELS: AIModel[] = [
  {
    id: "veo-3-fast",
    name: "Veo 3.1 fast",
    provider: "EchoGPT",
    category: "Fast",
    description: "EchoGPT's built-in video engine — fast, reliable, ready for everyday scenes",
    isPro: false,
    badge: "Default",
  },
  {
    id: "sora",
    name: "Sora",
    provider: "OpenAI",
    category: "Flagship",
    description: "World-class cinematic quality with highly realistic physics simulation",
    isPro: true,
    badge: "Frontier",
  },
  {
    id: "kling-v1-5",
    name: "Kling v1.5",
    provider: "EchoGPT",
    category: "Flagship",
    description: "High-fidelity motion coherence with exceptional character consistency",
    isPro: true,
    badge: "Cinematic",
  },
  {
    id: "runway-gen3",
    name: "Runway Gen-3",
    provider: "EchoGPT",
    category: "Flagship",
    description: "Professional-grade video generation with precise camera motion control",
    isPro: true,
    badge: "Control",
  },
];

export const DEFAULT_MODEL_ID = "echogpt";
export const DEFAULT_IMAGE_MODEL_ID = "flux-pro";
export const DEFAULT_VIDEO_MODEL_ID = "veo-3-fast";
