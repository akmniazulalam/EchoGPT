"use client";

import React, { useState } from "react";
import { ExtensionTab, ExtensionConversation, ExtensionMessage } from "./types";
import { ExtensionHeader } from "./ExtensionHeader";
import { ExtensionNavRail } from "./ExtensionNavRail";
import { ExtensionChatView } from "./ExtensionChatView";
import { ExtensionWriteView } from "./ExtensionWriteView";
import { ExtensionReadView } from "./ExtensionReadView";
import { ExtensionTranslateView } from "./ExtensionTranslateView";
import { ExtensionImageView } from "./ExtensionImageView";
import { ExtensionVideoView } from "./ExtensionVideoView";
import { ExtensionCompareView } from "./ExtensionCompareView";
import { ExtensionMcpView } from "./ExtensionMcpView";
import { ExtensionSettingsView } from "./ExtensionSettingsView";
import { ExtensionHistoryDrawer } from "./ExtensionHistoryDrawer";
import { INITIAL_CONVERSATIONS } from "./data";
import { AI_MODELS } from "@/config/models";
import {
  loadStoredTab,
  saveStoredTab,
  loadStoredConversations,
  saveStoredConversations,
  loadStoredActiveConvId,
  saveStoredActiveConvId,
} from "./storage";

interface ExtensionSidePanelProps {
  onClosePanel?: () => void;
  isPinned?: boolean;
  onTogglePin?: () => void;
}

export function ExtensionSidePanel({
  onClosePanel,
  isPinned = true,
  onTogglePin,
}: ExtensionSidePanelProps) {
  const [activeTab, setActiveTabState] = useState<ExtensionTab>(() => loadStoredTab());
  const [selectedModelId, setSelectedModelId] = useState<string>("echogpt");
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Conversations & Chat State (restored from localStorage)
  const [conversations, setConversationsState] =
    useState<ExtensionConversation[]>(() => loadStoredConversations());
  const [activeConversationId, setActiveConversationIdState] = useState<string | null>(
    () => loadStoredActiveConvId()
  );
  const [isStreaming, setIsStreaming] = useState(false);

  const activeConversation =
    conversations.find((c) => c.id === activeConversationId) || null;

  // Wrapped setters that also persist to localStorage
  const setActiveTab = (tab: ExtensionTab) => {
    setActiveTabState(tab);
    saveStoredTab(tab);
  };

  const setConversations = (
    updater:
      | ExtensionConversation[]
      | ((prev: ExtensionConversation[]) => ExtensionConversation[])
  ) => {
    setConversationsState((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      saveStoredConversations(next);
      return next;
    });
  };

  const setActiveConversationId = (id: string | null) => {
    setActiveConversationIdState(id);
    saveStoredActiveConvId(id);
  };

  const handleNewChat = () => {
    const newId = `conv-${Date.now()}`;
    const newConv: ExtensionConversation = {
      id: newId,
      title: "New Conversation",
      timestamp: new Date().toISOString(),
      relativeTime: "Just now",
      modelId: selectedModelId,
      messages: [],
    };
    setConversations((prev) => [newConv, ...prev]);
    setActiveConversationId(newId);
    setActiveTab("chat");
  };

  const handleAddToHistory = (
    title: string,
    toolType: ExtensionTab,
    promptOrSummary: string,
    resultText?: string,
    modelId?: string
  ) => {
    const newId = `conv-${Date.now()}`;
    const newConv: ExtensionConversation = {
      id: newId,
      title: title || `${toolType.toUpperCase()} task`,
      timestamp: new Date().toISOString(),
      relativeTime: "Just now",
      modelId: modelId || selectedModelId,
      toolType,
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: "user",
          text: promptOrSummary,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
        ...(resultText
          ? [
              {
                id: `ai-${Date.now() + 1}`,
                sender: "ai" as const,
                text: resultText,
                timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                modelId: modelId || selectedModelId,
              },
            ]
          : []),
      ],
    };
    setConversations((prev) => [newConv, ...prev]);
    setActiveConversationId(newId);
  };

  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id);
    const conv = conversations.find((c) => c.id === id);
    if (conv?.toolType && conv.toolType !== "chat") {
      setActiveTab(conv.toolType);
    } else {
      setActiveTab("chat");
    }
  };

  const handleDeleteConversation = (id: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (activeConversationId === id) {
      setActiveConversationId(null);
    }
  };

  const handleSendMessage = (
    text: string,
    attachments?: { type: "screenshot" | "file" | "page-context"; name: string }[]
  ) => {
    let targetConvId = activeConversationId;

    if (!targetConvId || !conversations.some((c) => c.id === targetConvId)) {
      const newId = `conv-${Date.now()}`;
      const newConv: ExtensionConversation = {
        id: newId,
        title: text.slice(0, 32) || "New Conversation",
        timestamp: new Date().toISOString(),
        relativeTime: "Just now",
        modelId: selectedModelId,
        messages: [],
      };
      setConversations((prev) => [newConv, ...prev]);
      setActiveConversationId(newId);
      targetConvId = newId;
    }

    const userMsg: ExtensionMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      attachments,
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === targetConvId) {
          const isFirst = c.messages.length === 0;
          return {
            ...c,
            title: isFirst ? text.slice(0, 32) : c.title,
            messages: [...c.messages, userMsg],
          };
        }
        return c;
      })
    );

    // Simulate AI response
    setIsStreaming(true);
    setTimeout(() => {
      const selectedModel = AI_MODELS.find((m) => m.id === selectedModelId) || AI_MODELS[0];
      const aiMsg: ExtensionMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: `[EchoGPT ${selectedModel.name}]\n\nI have received your query: "${text}". Based on real-time multi-agent reasoning, here is an actionable solution tailored for your active browser workflow:\n\n• Verified parameters and analyzed DOM context.\n• Streamlined syntax with zero overhead.\n• Ready to export or insert directly into your active project.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        modelId: selectedModel.id,
        modelName: selectedModel.name,
      };

      setConversations((prev) =>
        prev.map((c) =>
          c.id === targetConvId ? { ...c, messages: [...c.messages, aiMsg] } : c
        )
      );
      setIsStreaming(false);
    }, 700);
  };

  const handleInsertToChat = (text: string) => {
    setActiveTab("chat");
    handleSendMessage(`Use this generated content:\n\n${text}`);
  };

  const handleClearAllHistory = () => {
    setConversations([]);
    setActiveConversationId(null);
  };

  // Prevent INITIAL_CONVERSATIONS from being used as unused import
  void INITIAL_CONVERSATIONS;

  return (
    <div className="relative flex flex-col h-full w-full bg-white dark:bg-[#0B0912] text-zinc-900 dark:text-zinc-100 font-lexend overflow-hidden shadow-2xl">
      {/* ── 1. Top Panel Header ── */}
      <ExtensionHeader
        activeTab={activeTab}
        onNewChat={handleNewChat}
        onToggleHistory={() => setIsHistoryOpen((v) => !v)}
        isHistoryOpen={isHistoryOpen}
        onClosePanel={onClosePanel}
        isPinned={isPinned}
        onTogglePin={onTogglePin}
      />

      {/* ── 2. Main Body: Active View on Left + Nav Rail on Right ── */}
      <div className="relative flex-1 flex min-h-0 overflow-hidden">
        {/* Active View Container */}
        <main className="@container flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          {activeTab === "chat" && (
            <ExtensionChatView
              onSelectTab={setActiveTab}
              selectedModelId={selectedModelId}
              onSelectModel={setSelectedModelId}
              messages={activeConversation?.messages || []}
              onSendMessage={handleSendMessage}
              isStreaming={isStreaming}
            />
          )}

          {activeTab === "write" && (
            <ExtensionWriteView
              onInsertToChat={handleInsertToChat}
              onAddToHistory={handleAddToHistory}
            />
          )}

          {activeTab === "read" && (
            <ExtensionReadView
              onInsertToChat={handleInsertToChat}
              onAddToHistory={handleAddToHistory}
            />
          )}

          {activeTab === "translate" && (
            <ExtensionTranslateView
              onInsertToChat={handleInsertToChat}
              onAddToHistory={handleAddToHistory}
            />
          )}

          {activeTab === "image" && (
            <ExtensionImageView onAddToHistory={handleAddToHistory} />
          )}

          {activeTab === "video" && (
            <ExtensionVideoView onAddToHistory={handleAddToHistory} />
          )}

          {activeTab === "compare" && (
            <ExtensionCompareView onAddToHistory={handleAddToHistory} />
          )}

          {activeTab === "mcp" && <ExtensionMcpView />}

          {activeTab === "settings" && (
            <ExtensionSettingsView onClearHistory={handleClearAllHistory} />
          )}
        </main>

        {/* Vertical Right Navigation Rail */}
        <ExtensionNavRail activeTab={activeTab} onSelectTab={setActiveTab} />

        {/* Conversation History Drawer (Slides in on history button click) */}
        <ExtensionHistoryDrawer
          isOpen={isHistoryOpen}
          onClose={() => setIsHistoryOpen(false)}
          conversations={conversations}
          activeConversationId={activeConversationId}
          onSelectConversation={handleSelectConversation}
          onNewChat={handleNewChat}
          onDeleteConversation={handleDeleteConversation}
        />
      </div>
    </div>
  );
}
