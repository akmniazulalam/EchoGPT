"use client";

import React from "react";
import Image from "next/image";
import { Plus, Clock, Pin, ExternalLink, X } from "lucide-react";
import { ExtensionTab } from "./types";

interface ExtensionHeaderProps {
  activeTab: ExtensionTab;
  onNewChat: () => void;
  onToggleHistory: () => void;
  isHistoryOpen: boolean;
  onClosePanel?: () => void;
  isPinned?: boolean;
  onTogglePin?: () => void;
}

export function ExtensionHeader({
  activeTab,
  onNewChat,
  onToggleHistory,
  isHistoryOpen,
  onClosePanel,
  isPinned = true,
  onTogglePin,
}: ExtensionHeaderProps) {
  const getTabTitle = (tab: ExtensionTab): string => {
    switch (tab) {
      case "chat":
        return "Chat";
      case "write":
        return "Write";
      case "read":
        return "Read";
      case "translate":
        return "Translate";
      case "image":
        return "Image Studio";
      case "video":
        return "Video Studio";
      case "compare":
        return "Compare";
      case "mcp":
        return "Connectors & MCP";
      case "settings":
        return "Settings";
      default:
        return "EchoGPT";
    }
  };

  return (
    <header className="shrink-0 flex flex-col border-b border-zinc-200/80 dark:border-white/[0.08] bg-white dark:bg-[#16131F] select-none">
      {/* 1. Chrome Companion Window Bar */}
      <div className="h-8.5 px-3 flex items-center justify-between bg-zinc-100/80 dark:bg-white/[0.03] border-b border-zinc-200/50 dark:border-white/[0.04]">
        <div className="flex items-center gap-1.5 min-w-0">
          <div className="relative size-4.5 rounded overflow-hidden shrink-0">
            <Image
              src="/favicon.svg"
              alt="EchoGPT"
              width={18}
              height={18}
              className="object-contain"
            />
          </div>
          <span className="text-[11.5px] font-semibold text-zinc-700 dark:text-zinc-300 truncate">
            EchoGPT - Multi-AI Chat Sidebar
          </span>
        </div>

        {/* Window action controls */}
        <div className="flex items-center gap-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">
          {onTogglePin && (
            <button
              type="button"
              onClick={onTogglePin}
              className={`p-1 rounded hover:bg-zinc-200/60 dark:hover:bg-white/[0.08] transition-colors cursor-pointer ${
                isPinned ? "text-[#713CF4] dark:text-[#a78bfa]" : ""
              }`}
              title={isPinned ? "Unpin sidebar" : "Pin sidebar to right"}
              aria-label={isPinned ? "Unpin sidebar" : "Pin sidebar"}
            >
              <Pin className="size-3.5" />
            </button>
          )}

          <a
            href="/chat"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded hover:bg-zinc-200/60 dark:hover:bg-white/[0.08] transition-colors cursor-pointer"
            title="Open in full workspace tab"
            aria-label="Open in full tab"
          >
            <ExternalLink className="size-3.5" />
          </a>

          {onClosePanel && (
            <button
              type="button"
              onClick={onClosePanel}
              className="p-1 rounded hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
              title="Close side panel"
              aria-label="Close side panel"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 2. View Title & Primary Quick Action Bar */}
      <div className="h-11 px-3.5 flex items-center justify-between gap-2">
        <h1 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 truncate tracking-tight">
          {getTabTitle(activeTab)}
        </h1>

        <div className="flex items-center gap-1.5 shrink-0">
          {/* New Chat Button */}
          <button
            type="button"
            onClick={onNewChat}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#713CF4] hover:bg-[#602ee0] active:bg-[#5223c7] text-white text-[11px] font-semibold transition-all shadow-xs cursor-pointer"
            title="Start new conversation"
          >
            <Plus className="size-3 stroke-[2.5]" />
            <span>New Chat</span>
          </button>

          {/* History Toggle Button */}
          <button
            type="button"
            onClick={onToggleHistory}
            className={`p-1.5 rounded-full transition-colors cursor-pointer ${
              isHistoryOpen
                ? "bg-[#713CF4]/15 text-[#713CF4] dark:text-[#a78bfa]"
                : "text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/[0.06]"
            }`}
            title="Conversation History"
            aria-label="Conversation History"
          >
            <Clock className="size-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
