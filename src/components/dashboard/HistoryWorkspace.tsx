"use client";

import React, { useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import {
  History as HistoryIcon,
  Search,
  Trash2,
  ExternalLink,
  Plus,
} from "lucide-react";
import { WorkspaceHeader } from "@/components/workspace/WorkspaceHeader";
import { ModelLogo } from "@/components/ui/ModelLogo";
import {
  type ConversationHistoryItem,
  CHAT_HISTORY_KEY,
  loadHistory,
  deleteHistoryItem,
  clearAllHistory,
  saveSelectedModel,
} from "@/lib/chatStorage";
import { showToast } from "@/components/ui/Toast";

// Store subscription for history updates
function subscribeHistory(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("echogpt:history-updated", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("echogpt:history-updated", callback);
    window.removeEventListener("storage", callback);
  };
}

let cachedRaw: string | null = null;
let cachedHistory: ConversationHistoryItem[] = [];

function getHistorySnapshot(): ConversationHistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CHAT_HISTORY_KEY);
    if (raw === cachedRaw) {
      return cachedHistory;
    }
    cachedRaw = raw;
    cachedHistory = loadHistory();
    return cachedHistory;
  } catch {
    return [];
  }
}

function getServerHistorySnapshot(): ConversationHistoryItem[] {
  return [];
}

export function HistoryWorkspace() {
  const router = useRouter();
  const history = useSyncExternalStore(
    subscribeHistory,
    getHistorySnapshot,
    getServerHistorySnapshot
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [confirmClearAll, setConfirmClearAll] = useState(false);

  const filterOptions = [
    { id: "all", label: "All Sessions" },
    { id: "reasoning", label: "Reasoning" },
    { id: "fast", label: "Fast" },
    { id: "flagship", label: "Flagship" },
  ];

  // Filter & search logic
  const filteredHistory = history.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.preview.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      selectedFilter === "all" ||
      item.modelId.toLowerCase().includes(selectedFilter) ||
      item.modelName.toLowerCase().includes(selectedFilter);

    return matchesSearch && matchesFilter;
  });

  const handleOpenConversation = (item: ConversationHistoryItem) => {
    saveSelectedModel(item.modelId);
    showToast(`Reopened "${item.title.slice(0, 30)}..."`, "info");
    // Explicitly restore this specific historical conversation by ID
    router.push(`/chat?c=${item.id}`);
  };

  const handleDeleteItem = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    deleteHistoryItem(id);
    showToast("Session removed from history", "info");
  };

  const handleClearAll = () => {
    if (!confirmClearAll) {
      setConfirmClearAll(true);
      setTimeout(() => setConfirmClearAll(false), 3000);
      return;
    }
    clearAllHistory();
    setConfirmClearAll(false);
    showToast("All conversation history cleared", "info");
  };

  return (
    <div className="flex flex-col flex-1 h-full min-h-0 bg-[#FAFAFC] dark:bg-[#0E0C15] text-zinc-900 dark:text-zinc-100 font-lexend">
      {/* 1. Responsive Workspace Header */}
      <WorkspaceHeader
        title="Chat History"
        breadcrumbs={[
          { label: "Workspace" },
          { label: "History" },
        ]}
        subtitle="Saved multi-turn conversations and archived sessions"
        actions={
          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <button
                type="button"
                onClick={handleClearAll}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] ${
                  confirmClearAll
                    ? "bg-rose-500 text-white font-medium shadow-xs"
                    : "text-zinc-500 hover:text-rose-600 dark:text-zinc-400 dark:hover:text-rose-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                }`}
                title="Delete all saved conversations"
              >
                <Trash2 className="size-3.5" />
                <span>{confirmClearAll ? "Confirm Clear?" : "Clear All"}</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => router.push("/chat")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#713CF4] hover:bg-[#602ee0] active:bg-[#5223c7] text-white transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] shadow-2xs"
            >
              <Plus className="size-3.5" strokeWidth={2.2} />
              <span>New Chat</span>
            </button>
          </div>
        }
      />

      {/* 2. Main Workspace Body */}
      <div className="flex-1 overflow-y-auto min-h-0 custom-scrollbar p-4 sm:p-6 lg:p-8 max-w-5xl w-full mx-auto space-y-6">
        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversation topics or prompts..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111217] text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 outline-none focus:border-[#713CF4] focus:ring-2 focus:ring-[#713CF4]/20 transition-all font-normal"
            />
          </div>

          {/* Model Category Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 custom-scrollbar">
            {filterOptions.map((f) => {
              const isSelected = selectedFilter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setSelectedFilter(f.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] ${
                    isSelected
                      ? "bg-[#713CF4] text-white shadow-2xs"
                      : "bg-white dark:bg-[#111217] border border-zinc-200/80 dark:border-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Conversation List */}
        {filteredHistory.length > 0 ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Archived Sessions ({filteredHistory.length})
              </span>
              <span className="text-[11px] text-zinc-400">
                Click any session to reopen in Chat
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {filteredHistory.map((item) => {
                return (
                  <div
                    key={item.id}
                    onClick={() => handleOpenConversation(item)}
                    className="group relative flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#111217] hover:border-[#713CF4]/40 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-all duration-150 cursor-pointer shadow-2xs"
                  >
                    <div className="flex items-start gap-3.5 min-w-0 pr-3">
                      {/* Accurate brand logo belonging to this specific conversation's stored modelId */}
                      <ModelLogo
                        modelId={item.modelId}
                        provider={item.modelName}
                        name={item.modelName}
                        size="md"
                        className="shrink-0 mt-0.5 sm:mt-0 shadow-2xs"
                      />

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-[#713CF4] dark:group-hover:text-[#a78bfa] transition-colors truncate">
                            {item.title}
                          </h3>

                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 font-medium">
                            {item.modelName}
                          </span>
                        </div>

                        <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1 mt-0.5 leading-relaxed font-normal">
                          {item.preview}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 mt-3 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-0 border-zinc-100 dark:border-zinc-850 shrink-0 text-xs text-zinc-400">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px]">{item.formattedDate}</span>
                        <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                          {item.messageCount} msg
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={(e) => handleDeleteItem(e, item.id)}
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-rose-500"
                          title="Delete session"
                          aria-label="Delete session"
                        >
                          <Trash2 className="size-3.5" />
                        </button>

                        <button
                          type="button"
                          className="p-1.5 rounded-lg text-zinc-400 group-hover:text-[#713CF4] transition-colors"
                          title="Open in Chat"
                          aria-label="Open in Chat"
                        >
                          <ExternalLink className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="py-16 text-center space-y-3">
            <div className="size-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto text-zinc-400">
              <HistoryIcon className="size-6" />
            </div>
            <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              No conversations found
            </h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              {searchQuery
                ? `No sessions matching "${searchQuery}". Try a different keyword.`
                : "Your completed multi-turn conversations will appear here."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
