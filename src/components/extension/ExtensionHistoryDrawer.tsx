"use client";

import React, { useState } from "react";
import {
  Clock,
  Search,
  Plus,
  Trash2,
  MessageSquare,
  X,
} from "lucide-react";
import { ExtensionConversation } from "./types";

interface ExtensionHistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  conversations: ExtensionConversation[];
  activeConversationId: string | null;
  onSelectConversation: (conversationId: string) => void;
  onNewChat: () => void;
  onDeleteConversation: (conversationId: string) => void;
}

export function ExtensionHistoryDrawer({
  isOpen,
  onClose,
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewChat,
  onDeleteConversation,
}: ExtensionHistoryDrawerProps) {
  const [search, setSearch] = useState("");

  if (!isOpen) return null;

  const filtered = conversations.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="absolute inset-0 z-40 bg-white/95 dark:bg-[#0E0C17]/95 backdrop-blur-md flex flex-col font-lexend animate-in fade-in duration-150">
      {/* Drawer Header */}
      <div className="p-3 border-b border-zinc-100 dark:border-white/[0.06] flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Clock className="size-4 text-[#713CF4] dark:text-[#a78bfa]" />
          <h2 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
            Recent Conversations
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer"
          aria-label="Close history"
        >
          <X className="size-4" />
        </button>
      </div>

      {/* New Chat Button & Search Input */}
      <div className="p-2.5 border-b border-zinc-100 dark:border-white/[0.06] space-y-2">
        <button
          type="button"
          onClick={() => {
            onNewChat();
            onClose();
          }}
          className="w-full h-8.5 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#713CF4] hover:bg-[#602ee0] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="size-3.5 stroke-[2.5]" />
          <span>New Conversation</span>
        </button>

        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200/80 dark:border-white/[0.08]">
          <Search className="size-3.5 text-zinc-400 shrink-0" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs bg-transparent outline-none text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="text-zinc-400 hover:text-zinc-600 cursor-pointer"
            >
              <X className="size-3" />
            </button>
          )}
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
        {filtered.length === 0 ? (
          <div className="py-12 text-center space-y-1.5">
            <MessageSquare className="size-7 text-zinc-300 dark:text-zinc-600 mx-auto" />
            <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
              No conversations found
            </p>
            <p className="text-[10px] text-zinc-400">
              {search ? "Try a different search keyword" : "Start a new chat to build your history"}
            </p>
          </div>
        ) : (
          filtered.map((conv) => {
            const isActive = conv.id === activeConversationId;
            return (
              <div
                key={conv.id}
                className={`group flex items-center justify-between p-2 rounded-xl transition-all ${
                  isActive
                    ? "bg-[#713CF4]/10 dark:bg-[#713CF4]/20 border border-[#713CF4]/30"
                    : "hover:bg-zinc-100 dark:hover:bg-white/[0.04] border border-transparent"
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    onSelectConversation(conv.id);
                    onClose();
                  }}
                  className="flex-1 min-w-0 text-left cursor-pointer"
                >
                  <p
                    className={`text-xs truncate font-medium ${
                      isActive
                        ? "text-[#713CF4] dark:text-[#a78bfa] font-bold"
                        : "text-zinc-800 dark:text-zinc-200"
                    }`}
                  >
                    {conv.title}
                  </p>
                  <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 mt-0.5 flex-wrap">
                    {conv.toolType && conv.toolType !== "chat" && (
                      <span className="text-[9px] uppercase font-bold px-1.5 py-0.2 rounded bg-[#713CF4]/10 text-[#713CF4] dark:text-[#a78bfa] border border-[#713CF4]/20">
                        {conv.toolType}
                      </span>
                    )}
                    <span>{conv.relativeTime}</span>
                    <span>·</span>
                    <span>{conv.messages.length} messages</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onDeleteConversation(conv.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-zinc-400 hover:text-rose-500 rounded transition-opacity cursor-pointer shrink-0"
                  title="Delete conversation"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
