"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Paperclip,
  RotateCcw,
  Copy,
  Check,
  Plus,
  Clock,
  Rocket,
  GitBranch,
  Mic,
  MicOff,
  Send,
  Share2,
  X,
  FileText,
  FileImage,
} from "lucide-react";
import { WorkspaceHeader } from "@/components/workspace/WorkspaceHeader";
import { ModelSelector } from "./ModelSelector";
import { ModelLogo } from "@/components/ui/ModelLogo";
import { AI_MODELS, AIModel } from "@/config/models";
import {
  type ChatMessage,
  generateConversationId,
  deriveConversationTitle,
  getConversationById,
  upsertHistoryConversation,
  loadSelectedModel,
  saveSelectedModel,
} from "@/lib/chatStorage";
import { useUpgradeModal } from "@/context/UpgradeModalContext";
import { showToast } from "@/components/ui/Toast";

// ─── Types ────────────────────────────────────────────────────────────────
interface PlaceholderWorkspaceProps {
  conversationId?: string; // If provided, load this existing conversation
  initialModelId?: string; // If provided, start with this model
  initialPrompt?: string; // If provided, prefill prompt
  onNewChat?: () => void;
}

interface AttachmentFile {
  name: string;
  size: number;
  type: string;
  objectUrl?: string;
}

type VoiceState = "idle" | "requesting" | "listening" | "unsupported" | "denied" | "error";

// ─── Web Speech API – self-contained type shim ───────────────────────────
interface ISpeechRecognitionResult {
  readonly transcript: string;
  readonly confidence: number;
}

interface ISpeechRecognitionResultList {
  readonly length: number;
  item(index: number): ISpeechRecognitionResult[];
  [index: number]: ISpeechRecognitionResult[];
}

interface ISpeechRecognitionEvent extends Event {
  readonly results: ISpeechRecognitionResultList;
}

interface ISpeechRecognitionErrorEvent extends Event {
  readonly error: string;
}

interface ISpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: ((this: ISpeechRecognition, ev: Event) => void) | null;
  onresult: ((this: ISpeechRecognition, ev: ISpeechRecognitionEvent) => void) | null;
  onerror: ((this: ISpeechRecognition, ev: ISpeechRecognitionErrorEvent) => void) | null;
  onend: ((this: ISpeechRecognition, ev: Event) => void) | null;
}

interface ISpeechRecognitionConstructor {
  new (): ISpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition?: ISpeechRecognitionConstructor;
    webkitSpeechRecognition?: ISpeechRecognitionConstructor;
  }
}

// ─── Prompt Suggestions (matching original EchoGPT screenshot) ────────────
const PROMPT_SUGGESTIONS = [
  {
    id: "creative-flow",
    title: "Unlock Your Creative Flow",
    description:
      "Receive custom prompts that reflect your writing style, helping you push past creative blocks and spark new ideas for your projects.",
    prompt:
      "Help me push past a creative block. Give me 3 unconventional angles to approach a product redesign with bold typography and focused interactions.",
  },
  {
    id: "resume-shines",
    title: "Build a Resume That Shines",
    description:
      "Craft a resume tailored to highlight your experience and match the job you want, designed to grab the attention of potential employers.",
    prompt:
      "Review my engineering experience and suggest high-impact resume bullet points focusing on quantifiable web performance, sub-second latency, and accessibility.",
  },
  {
    id: "transform-challenge",
    title: "Set a Challenge That Transforms You",
    description:
      "Create a personalized challenge based on your goals and habits, designed to push you out of your comfort zone and help you grow.",
    prompt:
      "Design a rigorous 14-day technical mastery challenge to level up my TypeScript architectures, Next.js optimization, and design systems.",
  },
  {
    id: "social-content",
    title: "Write Irresistible Social Content",
    description:
      "Generate catchy, clever captions for your photos or videos, perfect for increasing engagement and sparking conversations.",
    prompt:
      "Write 3 engaging launch announcements for LinkedIn and X announcing a new high-speed developer tool with clear value props.",
  },
];

const ACCEPTED_FILE_TYPES = ".pdf,.doc,.docx,.txt,.md,.png,.jpg,.jpeg,.webp,.csv";

export function PlaceholderWorkspace({
  conversationId,
  initialModelId,
  initialPrompt,
  onNewChat,
}: PlaceholderWorkspaceProps) {
  const router = useRouter();
  const { openUpgradeModal, isProUser } = useUpgradeModal();

  // ── 1. Conversation & Model Session Initialization ──────────────────────
  // If conversationId is supplied, attempt to restore it from history
  const restoredConv = useMemo(() => {
    if (!conversationId) return null;
    return getConversationById(conversationId);
  }, [conversationId]);

  // Model ID derivation: restored > initial prop > localStorage > default
  const [selectedModelId, setSelectedModelId] = useState<string>(() => {
    if (restoredConv?.modelId && AI_MODELS.some((m) => m.id === restoredConv.modelId)) {
      return restoredConv.modelId;
    }
    if (initialModelId && AI_MODELS.some((m) => m.id === initialModelId)) {
      return initialModelId;
    }
    if (typeof window !== "undefined") {
      const stored = loadSelectedModel();
      if (stored && AI_MODELS.some((m) => m.id === stored)) return stored;
    }
    return "echogpt";
  });

  // Active conversation ID
  const [activeConversationId, setActiveConversationId] = useState<string>(() => {
    return restoredConv?.id || generateConversationId();
  });

  // Active messages
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return restoredConv?.messages || [];
  });

  // Track conversation metadata refs for safe async resolution
  const activeConversationIdRef = useRef<string>(activeConversationId);
  const existingTitleRef = useRef<string>(restoredConv?.title || "");
  const createdAtRef = useRef<string>(restoredConv?.createdAt || "");

  useEffect(() => {
    activeConversationIdRef.current = activeConversationId;
  }, [activeConversationId]);

  // ── UI States ────────────────────────────────────────────────────────────
  const [promptText, setPromptText] = useState(initialPrompt || "");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [attachment, setAttachment] = useState<AttachmentFile | null>(null);
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<ISpeechRecognition | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Active Model object
  const selectedModel = useMemo(() => {
    return AI_MODELS.find((m) => m.id === selectedModelId) || AI_MODELS[0];
  }, [selectedModelId]);

  // Auto-scroll on new messages
  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isGenerating]);

  // Global focus shortcut listener
  useEffect(() => {
    const handleFocus = () => textareaRef.current?.focus();
    window.addEventListener("echogpt:focus-chat-input", handleFocus);
    return () => window.removeEventListener("echogpt:focus-chat-input", handleFocus);
  }, []);

  // Cleanup speech recognition on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  // ── Model Selection Handler (MUST START A NEW CONVERSATION) ──────────────
  const handleSelectModel = (model: AIModel) => {
    // If the user selects the same model and hasn't started typing/messaging, no-op
    if (model.id === selectedModelId && messages.length === 0) return;

    // Save preferred model for future new sessions
    saveSelectedModel(model.id);
    setSelectedModelId(model.id);

    // CRITICAL: Switching model MUST create a brand new conversation session
    // and clear all visible messages. The old conversation remains intact in History.
    const newId = generateConversationId();
    setActiveConversationId(newId);
    activeConversationIdRef.current = newId;
    existingTitleRef.current = "";
    createdAtRef.current = new Date().toISOString();

    setMessages([]);
    setPromptText("");
    setAttachment(null);
    setIsGenerating(false);

    // Clean URL so it no longer points to a historical ?c=...
    if (typeof window !== "undefined" && window.location.search) {
      router.replace("/chat");
    }

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.focus();
    }

    showToast(`Started new chat with ${model.name}`, "info");
  };

  // ── New Chat Action (CREATES A NEW CONVERSATION SESSION) ──────────────────
  const handleStartNewChat = () => {
    // CRITICAL: Generates fresh conversationId, empty messages, preserves active model
    const newId = generateConversationId();
    setActiveConversationId(newId);
    activeConversationIdRef.current = newId;
    existingTitleRef.current = "";
    createdAtRef.current = new Date().toISOString();

    setMessages([]);
    setPromptText("");
    setAttachment(null);
    setIsGenerating(false);

    // Clean URL
    if (typeof window !== "undefined" && window.location.search) {
      router.replace("/chat");
    }

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.focus();
    }

    showToast(`New chat started with ${selectedModel.name}`, "info");
    onNewChat?.();
  };

  // ── Input & Prompt Handlers ──────────────────────────────────────────────
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPromptText(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 160)}px`;
  };

  const handleSelectPrompt = (prompt: string) => {
    setPromptText(prompt);
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  };

  const handleCopy = (id: string, text: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedMessageId(id);
      showToast("Response copied to clipboard!", "success");
      setTimeout(() => setCopiedMessageId(null), 2000);
    }
  };

  // ── File Attachment Handlers (Pro-Gated) ──────────────────────────────────
  const handleAttachClick = () => {
    if (isProUser) {
      // Pro user: trigger real file selector
      fileInputRef.current?.click();
    } else {
      // Free user: show upgrade modal with feature explanation
      openUpgradeModal(
        "File attachments are an EchoGPT Pro feature. Upgrade to attach PDFs, code files, and images directly in your conversations."
      );
    }
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      showToast("File too large. Maximum attachment size is 10 MB.", "error");
      return;
    }

    const objectUrl = file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined;
    setAttachment({ name: file.name, size: file.size, type: file.type, objectUrl });
    showToast(`Attached: ${file.name}`, "success");
    e.target.value = "";
  };

  const handleRemoveAttachment = () => {
    if (attachment?.objectUrl) URL.revokeObjectURL(attachment.objectUrl);
    setAttachment(null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // ── Voice Input (Web Speech API) ─────────────────────────────────────────
  const getSpeechRecognition = () => {
    if (typeof window === "undefined") return null;
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    return SpeechRec ? new SpeechRec() : null;
  };

  const handleVoiceClick = () => {
    if (voiceState === "listening") {
      recognitionRef.current?.stop();
      setVoiceState("idle");
      return;
    }

    const recognition = getSpeechRecognition();

    if (!recognition) {
      setVoiceState("unsupported");
      showToast("Voice input isn't supported in this browser. Try Chrome or Edge.", "error");
      setTimeout(() => setVoiceState("idle"), 3000);
      return;
    }

    setVoiceState("requesting");

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;

    recognition.onstart = () => {
      setVoiceState("listening");
    };

    recognition.onresult = (event: ISpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      if (transcript) {
        setPromptText((prev) => (prev ? `${prev} ${transcript}` : transcript));
        if (textareaRef.current) {
          textareaRef.current.style.height = "auto";
          textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
          textareaRef.current.focus();
        }
        showToast("Voice transcription complete.", "success");
      }
      setVoiceState("idle");
    };

    recognition.onerror = (event: ISpeechRecognitionErrorEvent) => {
      if (event.error === "not-allowed" || event.error === "permission-denied") {
        setVoiceState("denied");
        showToast("Microphone permission denied. Allow access in your browser settings.", "error");
      } else if (event.error === "no-speech") {
        showToast("No speech detected. Please try again.", "info");
        setVoiceState("idle");
      } else {
        setVoiceState("error");
        showToast("Voice recognition failed. Please try again.", "error");
      }
      setTimeout(() => setVoiceState("idle"), 3000);
    };

    recognition.onend = () => {
      setVoiceState((prev) => (prev === "listening" ? "idle" : prev));
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch {
      setVoiceState("error");
      showToast("Could not start voice recognition.", "error");
      setTimeout(() => setVoiceState("idle"), 2000);
    }
  };

  const voiceMicClass = () => {
    switch (voiceState) {
      case "listening":
        return "text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20 animate-pulse";
      case "requesting":
        return "text-amber-500 dark:text-amber-400";
      case "denied":
      case "error":
        return "text-zinc-300 dark:text-zinc-600 cursor-not-allowed";
      default:
        return "text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800";
    }
  };

  const voiceMicLabel = () => {
    switch (voiceState) {
      case "listening":
        return "Listening — click to stop";
      case "requesting":
        return "Requesting microphone permission…";
      case "denied":
        return "Microphone permission denied";
      case "unsupported":
        return "Voice input not supported";
      case "error":
        return "Voice recognition error";
      default:
        return "Voice input";
    }
  };

  // ── Share Chat ───────────────────────────────────────────────────────────
  const handleShareChat = async () => {
    if (messages.length === 0) return;

    const shareText = messages
      .slice(0, 4)
      .map((m) => `${m.role === "user" ? "You" : selectedModel.name}: ${m.content.slice(0, 120)}`)
      .join("\n\n");
    const shareTitle = `Chat with ${selectedModel.name} on EchoGPT`;

    if (navigator.share) {
      try {
        await navigator.share({ title: shareTitle, text: shareText });
      } catch (e) {
        const err = e as Error;
        if (err.name !== "AbortError") {
          showToast("Share failed. Try copying instead.", "error");
        }
      }
    } else {
      const clipboardText = `${shareTitle}\n\n${shareText}\n\n— Shared from EchoGPT`;
      try {
        await navigator.clipboard.writeText(clipboardText);
        showToast("Chat summary copied to clipboard!", "success");
      } catch {
        showToast("Could not copy to clipboard.", "error");
      }
    }
  };

  // ── Mock AI Response Generator ───────────────────────────────────────────
  const generateMockResponse = (userPrompt: string, model: AIModel): string => {
    const lower = userPrompt.toLowerCase();

    if (lower.includes("sop") || lower.includes("procedure")) {
      return `### Standard Operating Procedure (Draft)\n\n**Title:** Process Execution & Verification Protocol\n**Target Engine:** ${model.name}\n\n1. **Phase 1: Requirements Intake & Scoping**\n   - Confirm verified project parameters and architectural boundaries.\n   - Validate design tokens (Typography: Lexend, Brand: #713CF4).\n\n2. **Phase 2: Execution & Component Assembly**\n   - Implement modular presentation logic without tight backend coupling.\n   - Maintain accessible states and keyboard event listeners.\n\n3. **Phase 3: Verification & Review**\n   - Execute linter checks and multi-viewport responsive testing.\n   - Document changes in master project context.\n\n*Note: Simulated response generated with ${model.name} (${model.provider}).*`;
    }

    if (lower.includes("resume") || lower.includes("cv") || lower.includes("experience")) {
      return `### Targeted Resume Recommendations\n\nSynthesized via **${model.name}**:\n\n- **Quantified Achievement:** "Architected multi-model workspace in Next.js App Router supporting 100K+ MAU, achieving zero hydration layout shifts."\n- **Web Vitals Optimization:** "Engineered sub-second initial load with responsive Tailwind token system, cutting TTI by 44%."\n- **Design System Governance:** "Built accessible keyboard-first UI primitive library compliant with WCAG 2.1 AA."\n\n*Note: Simulated response generated with ${model.name} (${model.provider}).*`;
    }

    return `I received your prompt: "${userPrompt.slice(0, 80)}${userPrompt.length > 80 ? "..." : ""}"\n\nEchoGPT has synthesized your request using the **${model.name}** (${model.provider}) intelligence engine.\n\nKey takeaways:\n1. **Dynamic Model Routing:** Active model is **${model.name}** with ${model.contextWindow || "standard"} context.\n2. **Design Language:** Lexend typography, clean spacing, and brand purple (#713CF4) accents.\n3. **Session Persistence:** Your conversation is isolated under its own unique ID and saved in History.\n\n*Note: Simulated response generated with ${model.name} (${model.provider}).*`;
  };

  // ── Send Message Handler (IMMEDIATE HISTORY PERSISTENCE & ASYNC ISOLATION)
  const handleSendMessage = () => {
    if (!promptText.trim() || isGenerating) return;

    // Fixed conversation target for this message exchange
    const targetConvId = activeConversationId;
    const targetModel = selectedModel;
    const sentPrompt = promptText.trim();
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}-u`,
      role: "user",
      content: sentPrompt,
      timestamp: timeStr,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setPromptText("");
    setAttachment(null);
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    // Deterministic title derivation
    const title = existingTitleRef.current || deriveConversationTitle(sentPrompt);
    existingTitleRef.current = title;

    const createdAt = createdAtRef.current || now.toISOString();

    // Silently update browser address bar so reloading restores this specific conversation
    if (typeof window !== "undefined" && !window.location.search.includes(`c=${targetConvId}`)) {
      window.history.replaceState(null, "", `/chat?c=${targetConvId}`);
    }

    // IMMEDIATELY PERSIST TO HISTORY (Section 11 requirement)
    upsertHistoryConversation({
      id: targetConvId,
      title,
      preview: sentPrompt.slice(0, 100),
      createdAt,
      updatedAt: now.toISOString(),
      formattedDate: `Today at ${timeStr}`,
      modelId: targetModel.id,
      modelName: targetModel.name,
      messageCount: updatedMessages.length,
      messages: updatedMessages,
    });

    setIsGenerating(true);

    // Asynchronous simulated AI response
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now()}-a`,
        role: "assistant",
        content: generateMockResponse(sentPrompt, targetModel),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      const finalMessages = [...updatedMessages, assistantMessage];

      // Update in History for targetConvId
      upsertHistoryConversation({
        id: targetConvId,
        title,
        preview: assistantMessage.content.slice(0, 120),
        createdAt,
        updatedAt: new Date().toISOString(),
        formattedDate: `Today at ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
        modelId: targetModel.id,
        modelName: targetModel.name,
        messageCount: finalMessages.length,
        messages: finalMessages,
      });

      // ASYNC ISOLATION (Section 18 requirement):
      // Only update local messages state if user is STILL on this conversation!
      if (activeConversationIdRef.current === targetConvId) {
        setMessages(finalMessages);
        setIsGenerating(false);
      }
    }, 850);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col flex-1 h-full min-h-0 bg-[#FAFAFC] dark:bg-[#0E0C15] text-zinc-900 dark:text-zinc-100 font-lexend">
      {/* ── 1. HEADER ──────────────────────────────────────────────────── */}
      <WorkspaceHeader
        title="Chat"
        breadcrumbs={[{ label: "Workspace" }, { label: "Chat" }]}
        subtitle={`Active: ${selectedModel.name} · ${selectedModel.provider}`}
        actions={
          <div className="flex items-center gap-1.5">
            {/* Share — only when messages exist */}
            {messages.length > 0 && (
              <button
                type="button"
                onClick={handleShareChat}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] cursor-pointer"
                title="Share conversation"
                aria-label="Share this conversation"
              >
                <Share2 className="size-3.5" />
                <span className="hidden sm:inline">Share</span>
              </button>
            )}

            {/* New Chat reset button in header */}
            {messages.length > 0 && (
              <button
                type="button"
                onClick={handleStartNewChat}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] cursor-pointer"
                title="Archive and start new chat"
                aria-label="Start new chat"
              >
                <RotateCcw className="size-3.5" />
                <span className="hidden sm:inline">New Chat</span>
              </button>
            )}

            {/* Model Selector in Header */}
            <ModelSelector
              selectedModelId={selectedModelId}
              onSelectModel={handleSelectModel}
              placement="bottom"
            />
          </div>
        }
      />

      {/* ── 2. CONVERSATION STREAM ─────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 lg:p-8 flex flex-col">
        {messages.length === 0 ? (
          /* ─── EMPTY / NEW CHAT HERO ─────────────────────────────────── */
          <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full py-6 text-center my-auto space-y-6">
            {/* Dynamic Model Logo */}
            <ModelLogo
              modelId={selectedModel.id}
              provider={selectedModel.provider}
              name={selectedModel.name}
              size="xl"
              className="shadow-sm mx-auto"
            />

            {/* Dynamic Model Name + Description */}
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                {selectedModel.name}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto font-normal leading-relaxed">
                {selectedModel.description}
              </p>
            </div>

            {/* 4 Prompt Cards — 2 × 2 grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full text-left pt-2">
              {PROMPT_SUGGESTIONS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectPrompt(item.prompt)}
                  className="p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#111217] hover:border-[#713CF4]/40 hover:bg-zinc-50/50 dark:hover:bg-[#151620] transition-all duration-150 group text-left shadow-2xs outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] cursor-pointer"
                >
                  <h3 className="text-xs sm:text-[13px] font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-[#713CF4] dark:group-hover:text-[#a78bfa] transition-colors mb-1">
                    {item.title}
                  </h3>
                  <p className="text-[11.5px] text-zinc-500 dark:text-zinc-400 line-clamp-3 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </button>
              ))}
            </div>

            {/* Quota / Limit Strip with Demo Pro Integration */}
            <div className="pt-1">
              <div className="inline-flex flex-wrap items-center justify-center gap-1.5 px-4 py-2 rounded-xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/70 dark:bg-[#121319]/70 text-[11px] text-zinc-500 dark:text-zinc-400">
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                  {isProUser
                    ? "✦ EchoGPT Pro Active"
                    : selectedModel.isPro
                    ? "Pro Model Active"
                    : "5 of 5 messages left this window"}
                </span>
                <span>·</span>
                <span>
                  {isProUser ? "Unlimited frontier reasoning" : "5 on advanced models"}
                </span>
                <span>·</span>
                {isProUser ? (
                  <button
                    type="button"
                    onClick={() => openUpgradeModal("Manage your EchoGPT Pro subscription")}
                    className="text-[#713CF4] dark:text-[#a78bfa] hover:underline font-medium cursor-pointer"
                  >
                    Manage Plan
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      openUpgradeModal(
                        "Upgrade to EchoGPT Pro for unlimited high-speed messaging across all frontier models."
                      )
                    }
                    className="text-[#713CF4] dark:text-[#a78bfa] hover:underline font-medium cursor-pointer"
                  >
                    Upgrade to Pro
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* ─── ACTIVE MESSAGES ────────────────────────────────────────── */
          <div className="max-w-3xl mx-auto w-full space-y-5 pb-4">
            {messages.map((message) => {
              const isUser = message.role === "user";
              const isCopied = copiedMessageId === message.id;

              return (
                <div
                  key={message.id}
                  className={`flex gap-3 text-sm ${isUser ? "justify-end" : "justify-start"}`}
                >
                  {!isUser && (
                    <ModelLogo
                      modelId={selectedModel.id}
                      provider={selectedModel.provider}
                      name={selectedModel.name}
                      size="md"
                      className="mt-0.5 shadow-2xs shrink-0"
                    />
                  )}

                  <div
                    className={`group relative max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 leading-relaxed ${
                      isUser
                        ? "bg-[#713CF4] text-white rounded-br-xs shadow-xs"
                        : "bg-white dark:bg-[#121319] border border-zinc-200/80 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-bl-xs shadow-xs"
                    }`}
                  >
                    <div className="text-[13.5px] leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </div>

                    <div
                      className={`flex items-center justify-between gap-3 mt-2 pt-1 border-t text-[10.5px] ${
                        isUser
                          ? "border-white/20 text-white/70"
                          : "border-zinc-100 dark:border-zinc-850 text-zinc-400 dark:text-zinc-500"
                      }`}
                    >
                      <span>{message.timestamp}</span>
                      {!isUser && (
                        <button
                          type="button"
                          onClick={() => handleCopy(message.id, message.content)}
                          className="flex items-center gap-1 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors p-1 rounded cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-[#713CF4]"
                          title="Copy response"
                          aria-label="Copy response"
                        >
                          {isCopied ? (
                            <>
                              <Check className="size-3 text-emerald-500" />
                              <span className="text-emerald-500 font-medium">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="size-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Generating indicator */}
            {isGenerating && (
              <div className="flex gap-3 text-sm justify-start">
                <ModelLogo
                  modelId={selectedModel.id}
                  provider={selectedModel.provider}
                  name={selectedModel.name}
                  size="md"
                  className="mt-0.5 shadow-2xs"
                />
                <div className="bg-white dark:bg-[#121319] border border-zinc-200/80 dark:border-zinc-800 rounded-2xl rounded-bl-xs p-4 shadow-xs flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-[#713CF4] animate-bounce [animation-delay:-0.3s]" />
                  <span className="size-2 rounded-full bg-[#713CF4] animate-bounce [animation-delay:-0.15s]" />
                  <span className="size-2 rounded-full bg-[#713CF4] animate-bounce" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* ── 3. BOTTOM COMPOSER ─────────────────────────────────────────── */}
      <div className="shrink-0 p-3 sm:p-4 bg-white/80 dark:bg-[#0E0C15]/80 backdrop-blur-md border-t border-zinc-200/80 dark:border-zinc-800/80">
        <div className="max-w-3xl mx-auto w-full">
          <div className="relative flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111217] shadow-sm focus-within:border-[#713CF4] focus-within:ring-2 focus-within:ring-[#713CF4]/20 transition-all duration-150">

            {/* ── Attachment preview chip ── */}
            {attachment && (
              <div className="flex items-center gap-2 px-3.5 pt-2.5 pb-0">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs max-w-xs">
                  {attachment.type.startsWith("image/") ? (
                    <FileImage className="size-3.5 text-zinc-500 shrink-0" />
                  ) : (
                    <FileText className="size-3.5 text-zinc-500 shrink-0" />
                  )}
                  <span className="truncate text-zinc-700 dark:text-zinc-300 font-medium">
                    {attachment.name}
                  </span>
                  <span className="text-zinc-400 shrink-0">
                    {formatFileSize(attachment.size)}
                  </span>
                  <button
                    type="button"
                    onClick={handleRemoveAttachment}
                    className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 ml-0.5 cursor-pointer"
                    aria-label="Remove attachment"
                  >
                    <X className="size-3" />
                  </button>
                </div>
              </div>
            )}

            {/* ── Top toolbar inside composer card ── */}
            <div className="flex items-center justify-between px-3.5 pt-3 pb-1 border-b border-zinc-100 dark:border-zinc-850">
              {/* Left: Model Selector (opens UPWARD) + Connectors + Rocket */}
              <div className="flex items-center gap-2">
                <ModelSelector
                  selectedModelId={selectedModel.id}
                  onSelectModel={handleSelectModel}
                  align="left"
                  placement="top"
                  triggerClassName="!border-0 !bg-transparent !p-0 !shadow-none !text-xs font-bold text-zinc-900 dark:text-zinc-100 hover:text-[#713CF4] dark:hover:text-[#a78bfa]"
                />

                <span className="text-zinc-300 dark:text-zinc-700 select-none">|</span>

                {/* Connected Tools */}
                <button
                  type="button"
                  onClick={() =>
                    showToast("Web browsing and connected real-time tools active", "info")
                  }
                  className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                  title="Connected Tools"
                  aria-label="Connected tools"
                >
                  <GitBranch className="size-3.5" />
                </button>

                {/* Rocket / Upgrade Pro */}
                <button
                  type="button"
                  onClick={() => {
                    if (isProUser) {
                      showToast("EchoGPT Pro is active. Unlimited access to all frontier models.", "info");
                    } else {
                      openUpgradeModal(
                        "Upgrade to EchoGPT Pro to unlock unlimited access to every frontier AI model."
                      );
                    }
                  }}
                  className={`p-1 rounded-md transition-colors cursor-pointer ${
                    isProUser
                      ? "text-emerald-500 hover:text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10"
                      : "text-[#713CF4] hover:text-[#602ee0] dark:text-[#a78bfa] hover:bg-[#713CF4]/10"
                  }`}
                  title={isProUser ? "EchoGPT Pro Active" : "Upgrade to Pro"}
                  aria-label={isProUser ? "EchoGPT Pro Active" : "Upgrade to Pro"}
                >
                  <Rocket className="size-3.5" />
                </button>
              </div>

              {/* Right: + New Chat + Clock History */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleStartNewChat}
                  className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                  title="New Chat — creates a new conversation"
                  aria-label="Start new chat"
                >
                  <Plus className="size-4" />
                </button>

                <button
                  type="button"
                  onClick={() => router.push("/history")}
                  className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                  title="Chat History"
                  aria-label="View chat history"
                >
                  <Clock className="size-4" />
                </button>
              </div>
            </div>

            {/* ── Bottom input row ── */}
            <div className="flex items-end gap-2 px-3 pb-2.5 pt-1.5">
              {/* Native file input for Pro attachments */}
              <input
                ref={fileInputRef}
                type="file"
                accept={ACCEPTED_FILE_TYPES}
                className="sr-only"
                aria-hidden="true"
                tabIndex={-1}
                onChange={handleFileSelected}
              />

              {/* Paperclip */}
              <button
                type="button"
                onClick={handleAttachClick}
                className="p-2 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer shrink-0 mb-0.5"
                title={isProUser ? "Attach file" : "Attach file (Pro feature)"}
                aria-label={isProUser ? "Attach file" : "Attach file — Pro feature"}
              >
                <Paperclip className="size-4" />
              </button>

              {/* Auto-expanding Textarea */}
              <textarea
                ref={textareaRef}
                value={promptText}
                onChange={handleTextareaChange}
                onKeyDown={handleKeyDown}
                placeholder={`Ask ${selectedModel.name} anything...`}
                rows={1}
                className="flex-1 resize-none py-2 text-[13.5px] bg-transparent text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none leading-relaxed min-h-[40px] max-h-36 font-normal"
                aria-label="Message prompt input"
              />

              {/* Microphone */}
              <button
                type="button"
                onClick={handleVoiceClick}
                disabled={voiceState === "denied" || voiceState === "unsupported"}
                className={`p-2 rounded-xl transition-colors cursor-pointer shrink-0 mb-0.5 outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] disabled:cursor-not-allowed ${voiceMicClass()}`}
                title={voiceMicLabel()}
                aria-label={voiceMicLabel()}
                aria-pressed={voiceState === "listening"}
              >
                {voiceState === "listening" || voiceState === "requesting" ? (
                  <MicOff className="size-4" />
                ) : (
                  <Mic className="size-4" />
                )}
              </button>

              {/* Send */}
              <button
                type="button"
                onClick={handleSendMessage}
                disabled={!promptText.trim() || isGenerating}
                className="flex items-center justify-center size-8 rounded-full bg-[#713CF4] hover:bg-[#602ee0] active:bg-[#5223c7] text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] shrink-0 mb-0.5"
                aria-label="Send message (Enter)"
                title="Send message (Enter)"
              >
                <Send className="size-3.5" />
              </button>
            </div>
          </div>

          {/* Voice listening indicator strip */}
          {voiceState === "listening" && (
            <div className="flex items-center justify-center gap-2 mt-2 text-[11px] text-red-500 dark:text-red-400">
              <span className="size-1.5 rounded-full bg-red-500 animate-ping" />
              <span className="font-medium">Listening — speak now</span>
              <span className="text-zinc-400">Click mic to stop</span>
            </div>
          )}

          {voiceState !== "listening" && (
            <div className="flex items-center justify-center gap-2 mt-2 text-[11px] text-zinc-400 dark:text-zinc-500">
              <Sparkles className="size-3 text-[#713CF4]" />
              <span>EchoGPT Web App Redesign. Press Shift+Enter for new line.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
