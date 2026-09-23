"use client";

import React, { useState, useRef, useEffect } from "react";
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
import { ModelSelector } from "./ModelSelector";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface PlaceholderWorkspaceProps {
  activeNavId: string;
  onSelectNav?: (id: string) => void;
  onNewChat?: () => void;
}

export function PlaceholderWorkspace({
  activeNavId,
  onSelectNav,
  onNewChat,
}: PlaceholderWorkspaceProps) {
  const [promptText, setPromptText] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedModelId, setSelectedModelId] = useState("standard");
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
      id: "ai-sop-builder",
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
      id: "ai-job-analysis",
      title: "Analyze Job Requirements",
      description: "Extract required skills and benchmarks from descriptions",
      prompt: "Analyze the core technical skills, responsibilities, and expected competencies for a Senior Frontend Engineer role.",
      icon: Briefcase,
    },
  ];

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isGenerating]);

  // Focus textarea on initial load
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  // Adjust textarea height automatically
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPromptText(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 160)}px`;
  };

  // Click prompt card: pre-fill input, update active nav, and focus
  const handleSelectPrompt = (prompt: string, navId?: string) => {
    if (navId && onSelectNav) {
      onSelectNav(navId);
    }
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

  // Copy message text
  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(id);
    setTimeout(() => setCopiedMessageId(null), 2000);
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

*Note: This is a simulated frontend demonstration response.*`;
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

*Note: This is a simulated frontend demonstration response.*`;
    }

    if (lower.includes("compare")) {
      return `### Comparative Model Evaluation (Preview)

| Dimension | Standard Model | Fast Model | Analytical Model |
| :--- | :--- | :--- | :--- |
| **Primary Strength** | Balanced reasoning & drafting | Sub-second latency | Multi-step logic & SOPs |
| **Best Suited For** | General daily tasks | Quick lookups & chats | Deep evaluation & audits |
| **Token Efficiency** | High | Maximum | Targeted |

*Note: This is a simulated frontend demonstration response.*`;
    }

    return `I received your prompt: "${userPrompt.slice(0, 80)}${userPrompt.length > 80 ? "..." : ""}"

Using the **${selectedModelId}** model configuration, the workspace can structure concepts, draft operating procedures, or compare options across your workflow.

Feel free to refine your request or select one of the specialized tools in the sidebar to proceed.

*Note: This is a simulated frontend demonstration response.*`;
  };

  // Send message
  const handleSendMessage = () => {
    const trimmed = promptText.trim();
    if (!trimmed || isGenerating) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: trimmed,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
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
      setMessages((prev) => [...prev, assistantMessage]);
      setIsGenerating(false);
    }, 650);
  };

  // Handle Enter key (Shift+Enter for new line)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Reset conversation locally
  const handleResetChat = () => {
    if (onNewChat) {
      onNewChat();
    } else {
      setMessages([]);
      setPromptText("");
      setIsGenerating(false);
      textareaRef.current?.focus();
    }
  };

  return (
    <div className="flex flex-col flex-1 h-full min-h-0 bg-[#FAFAFC] dark:bg-[#0C0D11] text-zinc-900 dark:text-zinc-100">
      {/* Top Workspace Header */}
      <header className="flex items-center justify-between h-14 shrink-0 px-4 sm:px-6 border-b border-zinc-200/70 dark:border-zinc-800/70 bg-white/70 dark:bg-[#111217]/70 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              Workspace
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">/</span>
            <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 capitalize">
              {activeNavId.replace(/-/g, " ")}
            </span>
          </div>

          {messages.length > 0 && (
            <span className="hidden sm:inline-block text-[11px] px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 font-medium">
              {messages.length} {messages.length === 1 ? "message" : "messages"}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <button
              type="button"
              onClick={handleResetChat}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] cursor-pointer"
              title="Reset conversation"
              aria-label="Clear chat"
            >
              <RotateCcw className="size-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}

          {/* Model Selector Dropdown */}
          <ModelSelector
            selectedModelId={selectedModelId}
            onSelectModel={(model) => setSelectedModelId(model.id)}
          />
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto min-h-0 custom-scrollbar px-4 sm:px-8 py-6 flex flex-col justify-between max-w-4xl w-full mx-auto">
        {/* Case A: Empty State (Show Welcome & Prompt Cards) */}
        {messages.length === 0 ? (
          <div className="my-auto py-6 text-center sm:text-left space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 shadow-2xs mb-2">
                <div className="size-4 shrink-0 rounded-full flex items-center justify-center">
                  <Image
                    src="/favicon.svg"
                    alt="EchoGPT icon"
                    width={16}
                    height={16}
                    className="size-4 object-contain"
                  />
                </div>
                <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                  EchoGPT Workspace
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-zinc-900 dark:text-zinc-50">
                How can EchoGPT help you today?
              </h1>
              <p className="text-sm sm:text-[15px] text-zinc-500 dark:text-zinc-400 max-w-xl font-normal leading-relaxed">
                Select a specialized tool from the sidebar or click one of the
                quick prompts below to pre-fill your workspace query.
              </p>
            </div>

            {/* Quick Action Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {promptSuggestions.map((suggestion) => {
                const Icon = suggestion.icon;
                return (
                  <button
                    key={suggestion.id}
                    type="button"
                    onClick={() => handleSelectPrompt(suggestion.prompt, suggestion.id)}
                    className="group flex items-start gap-3.5 p-3.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#15161C] hover:border-[#713CF4]/40 hover:bg-[#713CF4]/3 dark:hover:bg-[#713CF4]/8 transition-all duration-150 text-left shadow-2xs outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] cursor-pointer"
                    aria-label={`Use prompt: ${suggestion.title}`}
                  >
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800/70 text-zinc-600 dark:text-zinc-300 group-hover:bg-[#713CF4]/10 group-hover:text-[#713CF4] dark:group-hover:text-[#a78bfa] transition-colors">
                      <Icon className="size-4.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-[13.5px] font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-[#713CF4] dark:group-hover:text-[#a78bfa] transition-colors truncate">
                        {suggestion.title}
                      </h2>
                      <p className="text-[12px] text-zinc-500 dark:text-zinc-400 line-clamp-1 mt-0.5 font-normal">
                        {suggestion.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Case B: Active Conversation State */
          <div className="flex-1 space-y-6 py-4">
            {messages.map((message) => {
              const isAssistant = message.role === "assistant";
              return (
                <div
                  key={message.id}
                  className={`flex gap-3.5 ${
                    isAssistant ? "items-start" : "items-start justify-end"
                  }`}
                >
                  {isAssistant && (
                    <div className="size-8 shrink-0 rounded-lg overflow-hidden flex items-center justify-center bg-white dark:bg-[#15161C] border border-zinc-200 dark:border-zinc-800 shadow-2xs mt-0.5">
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
                    className={`max-w-[88%] sm:max-w-[78%] rounded-2xl p-4 text-[13.5px] sm:text-sm leading-relaxed ${
                      isAssistant
                        ? "bg-white dark:bg-[#15161C] border border-zinc-200/80 dark:border-zinc-800/80 shadow-2xs text-zinc-800 dark:text-zinc-200"
                        : "bg-[#713CF4] text-white shadow-2xs font-normal"
                    }`}
                  >
                    <div className="whitespace-pre-wrap font-lexend">
                      {message.content}
                    </div>

                    <div
                      className={`flex items-center justify-between mt-3 pt-2 text-[11px] ${
                        isAssistant
                          ? "border-t border-zinc-100 dark:border-zinc-850 text-zinc-400 dark:text-zinc-500"
                          : "text-white/70"
                      }`}
                    >
                      <span>{message.timestamp}</span>

                      {isAssistant && (
                        <button
                          type="button"
                          onClick={() => handleCopy(message.id, message.content)}
                          className="inline-flex items-center gap-1 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors p-1 rounded outline-none focus-visible:ring-1 focus-visible:ring-[#713CF4] cursor-pointer"
                          aria-label="Copy response"
                          title="Copy response"
                        >
                          {copiedMessageId === message.id ? (
                            <>
                              <Check className="size-3 text-emerald-500" />
                              <span className="text-emerald-500 font-medium">
                                Copied
                              </span>
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

            {/* Assistant typing indicator */}
            {isGenerating && (
              <div className="flex gap-3.5 items-start">
                <div className="size-8 shrink-0 rounded-lg overflow-hidden flex items-center justify-center bg-white dark:bg-[#15161C] border border-zinc-200 dark:border-zinc-800 shadow-2xs">
                  <Image
                    src="/favicon.svg"
                    alt="EchoGPT"
                    width={20}
                    height={20}
                    className="size-5 object-contain animate-pulse"
                  />
                </div>
                <div className="rounded-2xl p-4 bg-white dark:bg-[#15161C] border border-zinc-200/80 dark:border-zinc-800/80 shadow-2xs text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                  <span className="flex gap-1 items-center">
                    <span className="size-1.5 rounded-full bg-[#713CF4] animate-bounce [animation-delay:-0.3s]" />
                    <span className="size-1.5 rounded-full bg-[#713CF4] animate-bounce [animation-delay:-0.15s]" />
                    <span className="size-1.5 rounded-full bg-[#713CF4] animate-bounce" />
                  </span>
                  <span>EchoGPT is preparing response...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Bottom Chat Prompt Input Bar */}
        <div className="pt-4 pb-2 w-full shrink-0">
          <div className="relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#15161C] shadow-sm p-3 focus-within:border-[#713CF4]/50 focus-within:ring-2 focus-within:ring-[#713CF4]/15 transition-all">
            <textarea
              ref={textareaRef}
              value={promptText}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder="Message EchoGPT... (Press Enter to send, Shift+Enter for new line)"
              rows={2}
              className="w-full resize-none bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 outline-none leading-relaxed font-normal max-h-40 custom-scrollbar"
              aria-label="Prompt message"
            />

            <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-850">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  className="flex items-center justify-center size-8 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] cursor-pointer"
                  title="Attach file (mock)"
                  aria-label="Attach file"
                >
                  <Paperclip className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleSelectPrompt("Summarize key tasks and verify requirements.")
                  }
                  className="flex items-center justify-center size-8 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] cursor-pointer"
                  title="Insert sample prompt"
                  aria-label="Insert sample prompt"
                >
                  <Sparkles className="size-4" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-zinc-400 dark:text-zinc-500 hidden sm:inline select-none">
                  Press Enter to send
                </span>
                <button
                  type="button"
                  onClick={handleSendMessage}
                  disabled={!promptText.trim() || isGenerating}
                  className={`flex items-center justify-center size-8 rounded-lg transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] ${
                    promptText.trim() && !isGenerating
                      ? "bg-[#713CF4] hover:bg-[#602ee0] active:bg-[#5223c7] text-white cursor-pointer shadow-xs"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed"
                  }`}
                  aria-label="Send message"
                >
                  <ArrowUp className="size-4" strokeWidth={2.2} />
                </button>
              </div>
            </div>
          </div>

          <p className="text-center text-[11px] text-zinc-400 dark:text-zinc-500 mt-2 select-none">
            EchoGPT Frontend Demo • Verify important details independently.
          </p>
        </div>
      </div>
    </div>
  );
}
