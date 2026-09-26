"use client";

import React, { useState, useRef, useEffect, useMemo, useSyncExternalStore } from "react";
import Image from "next/image";
import {
  Sparkles,
  Paperclip,
  ArrowUp,
  Image as ImageIcon,
  FileText,
  Columns2,
  Briefcase,
  Copy,
  Check,
  RotateCcw,
} from "lucide-react";
import { WorkspaceHeader } from "@/components/workspace/WorkspaceHeader";
import { ModelSelector } from "./ModelSelector";
import { AI_MODELS, AIModel } from "@/config/models";
import {
  type ChatMessage,
  type CurrentChatData,
  CURRENT_CHAT_KEY,
  updateCurrentChatMessages,
  archiveCurrentChat,
  clearCurrentChat,
  loadSelectedModel,
  saveSelectedModel,
} from "@/lib/chatStorage";
import { useUpgradeModal } from "@/context/UpgradeModalContext";
import { showToast } from "@/components/ui/Toast";

// External store subscription for cached current chat
let cachedRaw: string | null = null;
let cachedChat: CurrentChatData | null = null;

function subscribeChat(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("echogpt:current-chat-updated", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("echogpt:current-chat-updated", callback);
    window.removeEventListener("storage", callback);
  };
}

function getChatSnapshot(): CurrentChatData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CURRENT_CHAT_KEY);
    if (raw === cachedRaw) {
      return cachedChat;
    }
    cachedRaw = raw;
    cachedChat = raw ? JSON.parse(raw) : null;
    return cachedChat;
  } catch {
    return null;
  }
}

function getServerChatSnapshot(): CurrentChatData | null {
  return null;
}

interface PlaceholderWorkspaceProps {
  onNewChat?: () => void;
  initialPrompt?: string;
}

export function PlaceholderWorkspace({
  onNewChat,
  initialPrompt,
}: PlaceholderWorkspaceProps) {
  const [promptText, setPromptText] = useState(initialPrompt || "");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const { openUpgradeModal } = useUpgradeModal();

  // Model selection with lazy initialization
  const [selectedModelId, setSelectedModelId] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return loadSelectedModel();
    }
    return "echogpt";
  });

  // Synchronized persistent chat from localStorage
  const currentChat = useSyncExternalStore(
    subscribeChat,
    getChatSnapshot,
    getServerChatSnapshot
  );

  const messages: ChatMessage[] = useMemo(
    () => currentChat?.messages || [],
    [currentChat]
  );

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isGenerating]);

  // Focus textarea when shortcut triggers
  useEffect(() => {
    const handleFocus = () => {
      textareaRef.current?.focus();
    };
    window.addEventListener("echogpt:focus-chat-input", handleFocus);
    return () => {
      window.removeEventListener("echogpt:focus-chat-input", handleFocus);
    };
  }, []);

  const handleSelectModel = (model: AIModel) => {
    setSelectedModelId(model.id);
    saveSelectedModel(model.id);
    showToast(`Switched to ${model.name}`, "info");
  };

  // Prompt card suggestions
  const promptSuggestions = [
    {
      id: "image-studio",
      title: "Generate Image Concepts",
      description: "Create visual variations and styles with Image Studio",
      prompt: "Generate concept variations for a modern SaaS product visual hero illustration with clean lighting.",
      icon: ImageIcon,
    },
    {
      id: "sop",
      title: "Draft an SOP Document",
      description: "Build a structured standard operating procedure step-by-step",
      prompt: "Draft a Standard Operating Procedure (SOP) for customer onboarding with verification checkpoints.",
      icon: FileText,
    },
    {
      id: "compare",
      title: "Compare AI Outputs",
      description: "Evaluate responses across multiple models side-by-side",
      prompt: "Compare reasoning approaches for optimizing web application frontend performance and initial bundle sizes.",
      icon: Columns2,
    },
    {
      id: "resume",
      title: "Analyze Job Requirements",
      description: "Break down role competencies, ATS keywords, and gap matrix",
      prompt: "Analyze requirements for a Senior Frontend Engineer role specializing in Next.js, React 19, and design systems.",
      icon: Briefcase,
    },
  ];

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
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        160
      )}px`;
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

  // Generate lightweight mock response
  const generateMockResponse = (userPrompt: string): string => {
    const lower = userPrompt.toLowerCase();

    if (lower.includes("sop") || lower.includes("procedure")) {
      return `### Standard Operating Procedure (Draft)

**Title:** Process Execution & Verification Workflow
**Purpose:** Establish standardized protocol for quality assurance and continuous delivery.

1. **Phase 1: Requirements Intake & Scoping**
   - Confirm verified project parameters and architectural boundary.
   - Validate design tokens (Typography: Lexend, Brand: #713CF4).

2. **Phase 2: Execution & Component Assembly**
   - Implement modular presentation logic without tight backend coupling.
   - Maintain accessible states and keyboard event listeners.

3. **Phase 3: Verification & Review**
   - Execute linter checks and multi-viewport responsive testing.
   - Document changes in master project context.

*Note: Simulated frontend demonstration response.*`;
    }

    if (lower.includes("image") || lower.includes("concept") || lower.includes("visual")) {
      return `### Image Studio Concept Directions

Here are 3 concept variations suited for modern SaaS design:

- **Concept 1: Isometric Workflow Plane**
  A clean isometric workspace highlighting data flows and collaboration nodes with subtle #713CF4 accents on neutral slate surfaces.
- **Concept 2: Minimalist Interface Focus**
  Close-up perspective of high-density dashboard cards, showcasing crisp typography and soft ambient shadowing.
- **Concept 3: Abstract AI Synthesis**
  Subtle geometric glass prism refracting restrained violet light beams across a dark canvas.

*Note: Simulated frontend demonstration response.*`;
    }

    if (lower.includes("compare")) {
      return `### Comparative Model Evaluation (Preview)

- **EchoGPT Native:** Optimized for high-throughput single-turn responses with minimal initial token latency.
- **GPT-4o mini:** Excels at succinct summarizing and tabular markdown formatting.
- **Claude 4 Sonnet [PRO]:** Recommended for deep multi-file architectural refactoring and nuanced edge-case handling.

*Note: Simulated frontend demonstration response.*`;
    }

    return `I received your prompt: "${userPrompt.slice(0, 80)}${userPrompt.length > 80 ? "..." : ""}"

EchoGPT has synthesized your request using the **${
      AI_MODELS.find((m) => m.id === selectedModelId)?.name || "EchoGPT"
    }** engine.

Key architectural takeaways:
1. **Calibrated Typography:** Lexend font weights and tracking tuned for crisp readability across mobile and desktop.
2. **Restrained Color System:** Brand purple (#713CF4) utilized intentionally for focal points, CTA actions, and selected indicators.
3. **Local Persistence:** Chat messages, model choices, and history archive persist across reloads without external backend dependencies.

*Note: Simulated frontend demonstration response.*`;
  };

  // Chat Protection & Send Handler
  const handleSendMessage = () => {
    const trimmed = promptText.trim();
    if (!trimmed || isGenerating) return;

    const currentModel =
      AI_MODELS.find((m) => m.id === selectedModelId) || AI_MODELS[0];

    // CHAT PROTECTION FLOW: If PRO model is selected, prompt for upgrade
    if (currentModel.isPro) {
      openUpgradeModal(
        `${currentModel.name} is an EchoGPT Pro model. Upgrade to access frontier AI reasoning and unlimited inference.`
      );
      return;
    }

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: trimmed,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const updatedWithUser = [...messages, userMessage];
    updateCurrentChatMessages(updatedWithUser, selectedModelId);

    setPromptText("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
    setIsGenerating(true);

    // Realistic brief simulated delay
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: "assistant",
        content: generateMockResponse(trimmed),
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      updateCurrentChatMessages(
        [...updatedWithUser, assistantMessage],
        selectedModelId
      );
      setIsGenerating(false);
    }, 650);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    const currentModel =
      AI_MODELS.find((m) => m.id === selectedModelId)?.name || "EchoGPT";
    archiveCurrentChat(currentModel);
    clearCurrentChat();
    setPromptText("");
    setIsGenerating(false);
    showToast("Conversation archived to history", "info");
    textareaRef.current?.focus();

    if (onNewChat) {
      onNewChat();
    }
  };

  return (
    <div className="flex flex-col flex-1 h-full min-h-0 bg-[#FAFAFC] dark:bg-[#0E0C15] text-zinc-900 dark:text-zinc-100">
      {/* 1. Responsive Workspace Header */}
      <WorkspaceHeader
        title="Chat"
        breadcrumbs={[
          { label: "Workspace" },
          { label: "Chat" },
        ]}
        subtitle="Conversational AI reasoning and multi-turn drafting"
        actions={
          <>
            {messages.length > 0 && (
              <button
                type="button"
                onClick={handleResetChat}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] cursor-pointer"
                title="Archive and clear chat"
                aria-label="Clear chat"
              >
                <RotateCcw className="size-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}

            <ModelSelector
              selectedModelId={selectedModelId}
              onSelectModel={handleSelectModel}
            />
          </>
        }
      />

      {/* 2. Main Scrollable Conversation Stream */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 lg:p-8 flex flex-col">
        {messages.length === 0 ? (
          /* Empty / Welcome State */
          <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full py-8 text-center my-auto">
            {/* Logo Avatar */}
            <div className="relative size-12 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 flex items-center justify-center shadow-xs mb-5">
              <Image
                src="/favicon.svg"
                alt="EchoGPT"
                width={32}
                height={32}
                className="size-8 object-contain"
                priority
              />
            </div>

            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mb-2">
              How can EchoGPT help you today?
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-md mb-8">
              Ask questions, generate concepts, draft procedures, or compare model reasoning.
            </p>

            {/* Quick Prompt Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full text-left">
              {promptSuggestions.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectPrompt(item.prompt)}
                    className="p-3.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#121319] hover:border-[#713CF4]/40 hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40 transition-all duration-150 group text-left shadow-2xs outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] cursor-pointer"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="p-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 group-hover:text-[#713CF4] group-hover:bg-[#713CF4]/10 transition-colors">
                        <Icon className="size-3.5" />
                      </div>
                      <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-[#713CF4] dark:group-hover:text-[#a78bfa] transition-colors">
                        {item.title}
                      </span>
                    </div>
                    <p className="text-[11.5px] text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Active Messages Stream */
          <div className="max-w-3xl mx-auto w-full space-y-5 pb-4">
            {messages.map((message) => {
              const isUser = message.role === "user";
              const isCopied = copiedMessageId === message.id;

              return (
                <div
                  key={message.id}
                  className={`flex gap-3 text-sm ${
                    isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  {!isUser && (
                    <div className="size-7 rounded-lg overflow-hidden shrink-0 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center shadow-2xs mt-0.5">
                      <Image
                        src="/favicon.svg"
                        alt="EchoGPT"
                        width={20}
                        height={20}
                        className="size-5 object-contain"
                      />
                    </div>
                  )}

                  <div
                    className={`group relative max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 leading-relaxed ${
                      isUser
                        ? "bg-[#713CF4] text-white rounded-br-xs shadow-xs"
                        : "bg-white dark:bg-[#1b1725] border border-zinc-200/80 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-bl-xs shadow-xs"
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

            {/* Generating typing indicator */}
            {isGenerating && (
              <div className="flex gap-3 text-sm justify-start">
                <div className="size-7 rounded-lg overflow-hidden shrink-0 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center shadow-2xs mt-0.5">
                  <Image
                    src="/favicon.svg"
                    alt="EchoGPT"
                    width={20}
                    height={20}
                    className="size-5 object-contain"
                  />
                </div>
                <div className="bg-white dark:bg-[#1b1725] border border-zinc-200/80 dark:border-zinc-800 rounded-2xl rounded-bl-xs p-4 shadow-xs flex items-center gap-1.5">
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

      {/* 3. Bottom Prompt Input Bar */}
      <div className="shrink-0 p-3 sm:p-4 bg-white/80 dark:bg-[#111217]/80 backdrop-blur-md border-t border-zinc-200/80 dark:border-zinc-800/80">
        <div className="max-w-3xl mx-auto w-full">
          <div className="relative flex flex-col rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#161720] shadow-xs focus-within:border-[#713CF4] focus-within:ring-2 focus-within:ring-[#713CF4]/20 transition-all duration-150">
            {/* Auto-expanding Textarea */}
            <textarea
              ref={textareaRef}
              value={promptText}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask EchoGPT anything... (Shift+Enter for new line)"
              rows={1}
              className="w-full resize-none p-3.5 pb-2 text-[13.5px] bg-transparent text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none leading-relaxed min-h-[44px] max-h-40"
              aria-label="Message prompt input"
            />

            {/* Bottom Actions Bar */}
            <div className="flex items-center justify-between px-3 pb-2 pt-1">
              <div className="flex items-center gap-1.5 text-zinc-400">
                <button
                  type="button"
                  onClick={() => showToast("Attachment demo: Files supported in Pro", "info")}
                  className="p-1.5 rounded-lg hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4]"
                  title="Attach file (Pro feature)"
                  aria-label="Attach file"
                >
                  <Paperclip className="size-4" />
                </button>
                <span className="text-[11px] text-zinc-400 hidden sm:inline">
                  {AI_MODELS.find((m) => m.id === selectedModelId)?.name}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSendMessage}
                  disabled={!promptText.trim() || isGenerating}
                  className="flex items-center justify-center size-8 rounded-lg bg-[#713CF4] hover:bg-[#602ee0] active:bg-[#5223c7] text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4]"
                  aria-label="Send prompt"
                  title="Send message (Enter)"
                >
                  <ArrowUp className="size-4" strokeWidth={2.2} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 mt-2 text-[11px] text-zinc-400 dark:text-zinc-500">
            <Sparkles className="size-3 text-[#713CF4]" />
            <span>EchoGPT Web App Redesign. Press Shift+Enter for new line.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
