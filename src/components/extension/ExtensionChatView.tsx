"use client";

import React, { useState } from "react";
import {
  PenTool,
  Languages,
  BookOpen,
  Image as ImageIcon,
  Video,
  Columns2,
  Layers,
  Copy,
  Check,
  RotateCw,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
} from "lucide-react";
import { ExtensionTab, ExtensionMessage } from "./types";
import { ExtensionComposer } from "./ExtensionComposer";
import { CHAT_SUGGESTIONS } from "./data";
import { AI_MODELS } from "@/config/models";
import { ModelLogo } from "@/components/ui/ModelLogo";

interface ExtensionChatViewProps {
  onSelectTab: (tab: ExtensionTab) => void;
  selectedModelId: string;
  onSelectModel: (modelId: string) => void;
  messages: ExtensionMessage[];
  onSendMessage: (text: string, attachments?: { type: "screenshot" | "file" | "page-context"; name: string }[]) => void;
  isStreaming?: boolean;
}

export function ExtensionChatView({
  onSelectTab,
  selectedModelId,
  onSelectModel,
  messages,
  onSendMessage,
  isStreaming = false,
}: ExtensionChatViewProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Time-of-day greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Hi, good morning";
    if (hour < 18) return "Hi, good afternoon";
    return "Hi, good evening";
  };

  const selectedModel = AI_MODELS.find((m) => m.id === selectedModelId) || AI_MODELS[0];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Colorful feature quick actions (matching reference screenshot 1)
  const quickActions = [
    {
      tab: "write" as ExtensionTab,
      label: "Write",
      icon: <PenTool className="size-4 text-purple-600 dark:text-purple-400" />,
      bg: "bg-purple-100/80 dark:bg-purple-950/40 border-purple-200/60 dark:border-purple-800/40",
    },
    {
      tab: "translate" as ExtensionTab,
      label: "Translate",
      icon: <Languages className="size-4 text-blue-600 dark:text-blue-400" />,
      bg: "bg-blue-100/80 dark:bg-blue-950/40 border-blue-200/60 dark:border-blue-800/40",
    },
    {
      tab: "read" as ExtensionTab,
      label: "Read page",
      icon: <BookOpen className="size-4 text-emerald-600 dark:text-emerald-400" />,
      bg: "bg-emerald-100/80 dark:bg-emerald-950/40 border-emerald-200/60 dark:border-emerald-800/40",
    },
    {
      tab: "image" as ExtensionTab,
      label: "Image",
      icon: <ImageIcon className="size-4 text-rose-600 dark:text-rose-400" />,
      bg: "bg-rose-100/80 dark:bg-rose-950/40 border-rose-200/60 dark:border-rose-800/40",
    },
    {
      tab: "video" as ExtensionTab,
      label: "Video",
      icon: <Video className="size-4 text-amber-600 dark:text-amber-400" />,
      bg: "bg-amber-100/80 dark:bg-amber-950/40 border-amber-200/60 dark:border-amber-800/40",
    },
    {
      tab: "compare" as ExtensionTab,
      label: "Compare",
      icon: <Columns2 className="size-4 text-sky-600 dark:text-sky-400" />,
      bg: "bg-sky-100/80 dark:bg-sky-950/40 border-sky-200/60 dark:border-sky-800/40",
    },
    {
      tab: "mcp" as ExtensionTab,
      label: "MCP",
      icon: <Layers className="size-4 text-violet-600 dark:text-violet-400" />,
      bg: "bg-violet-100/80 dark:bg-violet-950/40 border-violet-200/60 dark:border-violet-800/40",
    },
  ];

  const hasMessages = messages.length > 0;

  return (
    <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-white dark:bg-[#0B0912]">
      {/* ── Scrollable Body Area ── */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 sm:p-4 space-y-4">
        {!hasMessages ? (
          // ── Empty State / Greeting View (Screenshot 1) ──
          <div className="space-y-4 pt-1 animate-in fade-in duration-200">
            {/* Greeting Header */}
            <div>
              <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
                {getGreeting()}
              </p>
              <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                How can I help you?
              </h2>
            </div>

            {/* Quick Action Colorful Cards (responsive to panel width) */}
            <div className="grid grid-cols-2 @lg:grid-cols-3 @2xl:grid-cols-5 gap-2">
              {quickActions.map((action, i) => {
                const isLastOdd = i === quickActions.length - 1 && quickActions.length % 2 !== 0;
                return (
                  <button
                    key={action.tab}
                    type="button"
                    onClick={() => onSelectTab(action.tab)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-left transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xs hover:shadow-xs cursor-pointer ${
                      action.bg
                    } ${isLastOdd ? "col-span-2 @lg:col-span-1" : ""}`}
                  >
                    <div className="size-7 rounded-lg bg-white/90 dark:bg-black/40 flex items-center justify-center shrink-0 shadow-2xs">
                      {action.icon}
                    </div>
                    <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                      {action.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Prompt Suggestions List */}
            <div className="space-y-1.5 pt-1">
              {CHAT_SUGGESTIONS.map((suggestion, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onSendMessage(suggestion)}
                  className="w-full text-left px-3 py-2 rounded-xl bg-zinc-50 dark:bg-white/3 hover:bg-zinc-100 dark:hover:bg-white/6 border border-zinc-200/60 dark:border-white/4 text-xs font-medium text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer truncate"
                  title={suggestion}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          // ── Conversation Message Thread ──
          <div className="space-y-3.5 pb-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                } animate-in fade-in duration-150`}
              >
                {msg.sender === "user" ? (
                  // User Message Bubble
                  <div className="max-w-[88%] rounded-2xl rounded-tr-xs bg-[#713CF4] text-white px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed shadow-xs">
                    {/* Attachments if any */}
                    {msg.attachments && msg.attachments.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-1.5 pb-1.5 border-b border-white/20">
                        {msg.attachments.map((att, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] bg-white/20"
                          >
                            <span>📎 {att.name}</span>
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    <span className="block text-[9.5px] text-white/70 text-right mt-1">
                      {msg.timestamp}
                    </span>
                  </div>
                ) : (
                  // AI Response Card
                  <div className="max-w-[94%] rounded-2xl rounded-tl-xs bg-zinc-50 dark:bg-[#16131F] border border-zinc-200/80 dark:border-white/8 p-3 text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed shadow-xs space-y-2">
                    {/* Header with Model Logo */}
                    <div className="flex items-center justify-between pb-1.5 border-b border-zinc-200/50 dark:border-white/4">
                      <div className="flex items-center gap-1.5">
                        <ModelLogo
                          modelId={msg.modelId || selectedModel.id}
                          provider={msg.modelName || selectedModel.provider}
                          size="xs"
                        />
                        <span className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300">
                          {msg.modelName || selectedModel.name}
                        </span>
                      </div>
                      <span className="text-[10px] text-zinc-400">{msg.timestamp}</span>
                    </div>

                    <div className="whitespace-pre-wrap leading-relaxed text-zinc-800 dark:text-zinc-200">
                      {msg.text}
                    </div>

                    {/* Action Bar (Copy, Thumbs, Retry) */}
                    <div className="flex items-center justify-between pt-1 border-t border-zinc-200/50 dark:border-white/4 text-zinc-400">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleCopy(msg.id, msg.text)}
                          className="p-1 rounded hover:bg-zinc-200/60 dark:hover:bg-white/6 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                          title="Copy response"
                          aria-label="Copy response"
                        >
                          {copiedId === msg.id ? (
                            <Check className="size-3 text-emerald-500" />
                          ) : (
                            <Copy className="size-3" />
                          )}
                        </button>
                        <button
                          type="button"
                          className="p-1 rounded hover:bg-zinc-200/60 dark:hover:bg-white/6 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                          title="Helpful"
                          aria-label="Helpful"
                        >
                          <ThumbsUp className="size-3" />
                        </button>
                        <button
                          type="button"
                          className="p-1 rounded hover:bg-zinc-200/60 dark:hover:bg-white/6 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                          title="Unhelpful"
                          aria-label="Unhelpful"
                        >
                          <ThumbsDown className="size-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onSendMessage(messages[messages.length - 2]?.text || "Regenerate response")}
                        className="inline-flex items-center gap-1 text-[10px] font-medium text-zinc-500 dark:text-zinc-400 hover:text-[#713CF4] transition-colors cursor-pointer"
                      >
                        <RotateCw className="size-2.5" />
                        <span>Retry</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Streaming Indicator */}
            {isStreaming && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-100 dark:bg-white/[0.04] text-xs text-zinc-500 max-w-fit animate-pulse">
                <Sparkles className="size-3.5 text-[#713CF4] animate-spin" />
                <span>EchoGPT is thinking...</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Fixed Prompt Composer at Bottom ── */}
      <div className="p-3 border-t border-zinc-200/80 dark:border-white/8 bg-zinc-50/50 dark:bg-[#121019]">
        <ExtensionComposer
          onSendMessage={onSendMessage}
          selectedModelId={selectedModelId}
          onSelectModel={onSelectModel}
        />
      </div>
    </div>
  );
}
