"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Scissors,
  Paperclip,
  BookOpen,
  AtSign,
  Terminal,
  Layers,
  Globe,
  Send,
  ChevronDown,
  X,
  Search,
  Check,
} from "lucide-react";
import { AI_MODELS } from "@/config/models";
import { ModelLogo } from "@/components/ui/ModelLogo";
import { MOCK_MCP_CONNECTORS } from "./data";

interface ExtensionComposerProps {
  onSendMessage: (text: string, attachments?: { type: "screenshot" | "file" | "page-context"; name: string }[]) => void;
  selectedModelId: string;
  onSelectModel: (modelId: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export function ExtensionComposer({
  onSendMessage,
  selectedModelId,
  onSelectModel,
  placeholder = "Ask a question...",
  autoFocus = false,
}: ExtensionComposerProps) {
  const [inputText, setInputText] = useState("");
  const [isWebSearch, setIsWebSearch] = useState(false);
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [modelSearch, setModelSearch] = useState("");

  // Toolbar active states & attachments
  const [hasScreenshot, setHasScreenshot] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<string[]>([]);
  const [isReadPageActive, setIsReadPageActive] = useState(false);

  // Popover menus
  const [isMentionOpen, setIsMentionOpen] = useState(false);
  const [isCommandsOpen, setIsCommandsOpen] = useState(false);
  const [isConnectorsOpen, setIsConnectorsOpen] = useState(false);
  const [activeConnectors, setActiveConnectors] = useState<string[]>(["mcp-github", "mcp-slack"]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedModel = AI_MODELS.find((m) => m.id === selectedModelId) || AI_MODELS[0];

  const filteredModels = AI_MODELS.filter((m) =>
    m.name.toLowerCase().includes(modelSearch.toLowerCase()) ||
    m.provider.toLowerCase().includes(modelSearch.toLowerCase())
  );

  // Close menus on outside click & Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsModelDropdownOpen(false);
        setIsMentionOpen(false);
        setIsCommandsOpen(false);
        setIsConnectorsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModelDropdownOpen(false);
        setIsMentionOpen(false);
        setIsCommandsOpen(false);
        setIsConnectorsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSend = () => {
    const trimmed = inputText.trim();
    if (!trimmed && !hasScreenshot && attachedFiles.length === 0 && !isReadPageActive) return;

    const attachments: { type: "screenshot" | "file" | "page-context"; name: string }[] = [];
    if (hasScreenshot) {
      attachments.push({ type: "screenshot", name: "tab-screenshot.png" });
    }
    if (isReadPageActive) {
      attachments.push({ type: "page-context", name: "Page: Next.js Documentation" });
    }
    attachedFiles.forEach((fileName) => {
      attachments.push({ type: "file", name: fileName });
    });

    onSendMessage(trimmed || (hasScreenshot ? "Analyze this screenshot" : "Analyze this document"), attachments);

    // Reset composer state
    setInputText("");
    setHasScreenshot(false);
    setAttachedFiles([]);
    setIsReadPageActive(false);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Adjust textarea height dynamically
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files).map((f) => f.name);
      setAttachedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const BOTS = [
    { name: "EchoGPT Assistant", handle: "@EchoGPT", desc: "Native unified assistant" },
    { name: "Claude 3.5 Sonnet", handle: "@Claude", desc: "Code, analysis & writing" },
    { name: "GPT-4o", handle: "@GPT-4o", desc: "Omni multimodal reasoner" },
    { name: "Gemini 2.0 Flash", handle: "@Gemini", desc: "Realtime web & media" },
    { name: "DeepSeek R1", handle: "@DeepSeek", desc: "Open chain-of-thought logic" },
  ];

  const COMMANDS = [
    { cmd: "/summarize", desc: "Generate concise bullet summary of current page" },
    { cmd: "/explain", desc: "Explain concepts in clear, intuitive terms" },
    { cmd: "/translate", desc: "Translate text to your preferred language" },
    { cmd: "/code", desc: "Write, review, or debug code snippet" },
    { cmd: "/fix-grammar", desc: "Polish tone, spelling and grammatical errors" },
  ];

  return (
    <div
      ref={dropdownRef}
      className="relative rounded-2xl border border-zinc-200/90 dark:border-white/[0.1] bg-white dark:bg-[#14121D] shadow-lg shadow-black/5 dark:shadow-none transition-all focus-within:border-[#713CF4]/60 focus-within:ring-2 focus-within:ring-[#713CF4]/20"
    >
      {/* ── Active Context / Attachment Chips ── */}
      {(hasScreenshot || attachedFiles.length > 0 || isReadPageActive) && (
        <div className="flex items-center gap-1.5 px-3 pt-2.5 flex-wrap">
          {isReadPageActive && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[11px] font-medium animate-in fade-in">
              <BookOpen className="size-3" />
              <span>Reading: Active Web Page</span>
              <button
                type="button"
                onClick={() => setIsReadPageActive(false)}
                className="hover:text-emerald-800 dark:hover:text-emerald-200 cursor-pointer ml-0.5"
              >
                <X className="size-3" />
              </button>
            </span>
          )}

          {hasScreenshot && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-[#713CF4]/10 text-[#713CF4] dark:text-[#a78bfa] border border-[#713CF4]/20 text-[11px] font-medium animate-in fade-in">
              <Scissors className="size-3" />
              <span>Screenshot attached</span>
              <button
                type="button"
                onClick={() => setHasScreenshot(false)}
                className="hover:text-purple-800 dark:hover:text-purple-200 cursor-pointer ml-0.5"
              >
                <X className="size-3" />
              </button>
            </span>
          )}

          {attachedFiles.map((f, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-[11px] font-medium animate-in fade-in"
            >
              <Paperclip className="size-3" />
              <span className="truncate max-w-[110px]">{f}</span>
              <button
                type="button"
                onClick={() => setAttachedFiles((prev) => prev.filter((_, i) => i !== idx))}
                className="hover:text-blue-800 dark:hover:text-blue-200 cursor-pointer ml-0.5"
              >
                <X className="size-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* ── Top Bar: Model Selector + Toolbar Action Icons ── */}
      <div className="flex items-center justify-between gap-1 px-2.5 pt-2 pb-1 border-b border-zinc-100 dark:border-white/4">
        {/* Model Selector Pill */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setIsModelDropdownOpen((v) => !v);
              setIsMentionOpen(false);
              setIsCommandsOpen(false);
              setIsConnectorsOpen(false);
            }}
            className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/6 transition-colors cursor-pointer border border-transparent hover:border-zinc-200 dark:hover:border-white/[0.08]"
            title="Change active AI model"
          >
            <span className="size-1.5 rounded-full bg-[#713CF4] animate-pulse" />
            <ModelLogo modelId={selectedModel.id} provider={selectedModel.provider} size="xs" />
            <span className="truncate max-w-[95px] sm:max-w-[120px]">{selectedModel.name}</span>
            <ChevronDown className="size-3 text-zinc-400" />
          </button>

          {/* Model Selection Dropdown */}
          {isModelDropdownOpen && (
            <div className="absolute left-0 bottom-full mb-1.5 w-64 max-h-72 rounded-xl bg-white dark:bg-[#1B1826] border border-zinc-200 dark:border-white/[0.1] shadow-xl z-50 overflow-hidden flex flex-col font-lexend animate-in fade-in zoom-in-95 duration-100">
              <div className="p-2 border-b border-zinc-100 dark:border-white/[0.06] bg-zinc-50 dark:bg-white/[0.02]">
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white dark:bg-black/20 border border-zinc-200/80 dark:border-white/8">
                  <Search className="size-3.5 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Search AI models..."
                    value={modelSearch}
                    onChange={(e) => setModelSearch(e.target.value)}
                    className="w-full text-xs bg-transparent outline-none text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400"
                    autoFocus
                  />
                </div>
              </div>

              <div className="overflow-y-auto custom-scrollbar p-1 space-y-0.5 max-h-56">
                {filteredModels.map((m) => {
                  const isSelected = m.id === selectedModelId;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => {
                        onSelectModel(m.id);
                        setIsModelDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-[#713CF4]/10 text-[#713CF4] dark:text-[#a78bfa] font-semibold"
                          : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/[0.05]"
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <ModelLogo modelId={m.id} provider={m.provider} size="xs" />
                        <div className="min-w-0">
                          <p className="text-xs truncate leading-tight">{m.name}</p>
                          <span className="text-[10px] text-zinc-400 dark:text-zinc-500 truncate">
                            {m.provider} · {m.category}
                          </span>
                        </div>
                      </div>
                      {isSelected && <Check className="size-3.5 text-[#713CF4] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Toolbar Action Buttons (Interactive!) */}
        <div className="flex items-center gap-0.5 text-zinc-400 dark:text-zinc-400">
          {/* 1. Screenshot Capture */}
          <button
            type="button"
            onClick={() => setHasScreenshot((v) => !v)}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              hasScreenshot
                ? "bg-[#713CF4]/15 text-[#713CF4] dark:text-[#a78bfa]"
                : "hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/6"
            }`}
            title="Capture tab screenshot"
            aria-label="Capture tab screenshot"
          >
            <Scissors className="size-3.5" />
          </button>

          {/* 2. Attach File */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              attachedFiles.length > 0
                ? "bg-blue-500/15 text-blue-600 dark:text-blue-400"
                : "hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/6"
            }`}
            title="Attach file (PDF, TXT, DOCX)"
            aria-label="Attach file"
          >
            <Paperclip className="size-3.5" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />

          {/* 3. Read Page Context */}
          <button
            type="button"
            onClick={() => setIsReadPageActive((v) => !v)}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              isReadPageActive
                ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                : "hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/6"
            }`}
            title="Include current active page context"
            aria-label="Include current page context"
          >
            <BookOpen className="size-3.5" />
          </button>

          {/* 4. Mention a Bot */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsMentionOpen((v) => !v);
                setIsCommandsOpen(false);
                setIsConnectorsOpen(false);
                setIsModelDropdownOpen(false);
              }}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isMentionOpen
                  ? "bg-[#713CF4]/15 text-[#713CF4] dark:text-[#a78bfa]"
                  : "hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/6"
              }`}
              title="Mention a bot (@)"
              aria-label="Mention a bot"
            >
              <AtSign className="size-3.5" />
            </button>

            {isMentionOpen && (
              <div className="absolute right-0 bottom-full mb-1.5 w-56 rounded-xl bg-white dark:bg-[#1B1826] border border-zinc-200 dark:border-white/[0.1] shadow-xl p-1 z-50 font-lexend animate-in fade-in">
                <p className="px-2 py-1 text-[10.5px] font-semibold text-zinc-400 uppercase tracking-wider">
                  Mention Bot
                </p>
                {BOTS.map((bot) => (
                  <button
                    key={bot.handle}
                    type="button"
                    onClick={() => {
                      setInputText((prev) => `${prev ? `${prev} ` : ""}${bot.handle} `);
                      setIsMentionOpen(false);
                      textareaRef.current?.focus();
                    }}
                    className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-white/[0.05] transition-colors cursor-pointer"
                  >
                    <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                      {bot.handle}
                    </p>
                    <p className="text-[10px] text-zinc-400">{bot.desc}</p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 5. Shortcut Commands */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsCommandsOpen((v) => !v);
                setIsMentionOpen(false);
                setIsConnectorsOpen(false);
                setIsModelDropdownOpen(false);
              }}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isCommandsOpen
                  ? "bg-[#713CF4]/15 text-[#713CF4] dark:text-[#a78bfa]"
                  : "hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/6"
              }`}
              title="Quick shortcut commands (/)"
              aria-label="Shortcut commands"
            >
              <Terminal className="size-3.5" />
            </button>

            {isCommandsOpen && (
              <div className="absolute right-0 bottom-full mb-1.5 w-60 rounded-xl bg-white dark:bg-[#1B1826] border border-zinc-200 dark:border-white/[0.1] shadow-xl p-1 z-50 font-lexend animate-in fade-in">
                <p className="px-2 py-1 text-[10.5px] font-semibold text-zinc-400 uppercase tracking-wider">
                  Quick Commands
                </p>
                {COMMANDS.map((cmd) => (
                  <button
                    key={cmd.cmd}
                    type="button"
                    onClick={() => {
                      setInputText(`${cmd.cmd} `);
                      setIsCommandsOpen(false);
                      textareaRef.current?.focus();
                    }}
                    className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-white/[0.05] transition-colors cursor-pointer"
                  >
                    <p className="text-xs font-mono font-semibold text-[#713CF4] dark:text-[#a78bfa]">
                      {cmd.cmd}
                    </p>
                    <p className="text-[10.5px] text-zinc-500 dark:text-zinc-400">{cmd.desc}</p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 6. Connectors & Tools */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsConnectorsOpen((v) => !v);
                setIsMentionOpen(false);
                setIsCommandsOpen(false);
                setIsModelDropdownOpen(false);
              }}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                activeConnectors.length > 0
                  ? "text-[#713CF4] dark:text-[#a78bfa]"
                  : "hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/6"
              }`}
              title="Active MCP Connectors"
              aria-label="Active Connectors"
            >
              <Layers className="size-3.5" />
            </button>

            {isConnectorsOpen && (
              <div className="absolute right-0 bottom-full mb-1.5 w-64 rounded-xl bg-white dark:bg-[#1B1826] border border-zinc-200 dark:border-white/[0.1] shadow-xl p-2 z-50 font-lexend animate-in fade-in">
                <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-zinc-100 dark:border-white/[0.06]">
                  <span className="text-[11px] font-bold text-zinc-800 dark:text-zinc-200">
                    Live MCP Tools
                  </span>
                  <span className="text-[10px] text-zinc-400">
                    {activeConnectors.length} active
                  </span>
                </div>
                <div className="space-y-1">
                  {MOCK_MCP_CONNECTORS.map((c) => {
                    const isChecked = activeConnectors.includes(c.id);
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => {
                          setActiveConnectors((prev) =>
                            isChecked ? prev.filter((id) => id !== c.id) : [...prev, c.id]
                          );
                        }}
                        className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-left transition-colors cursor-pointer ${
                          isChecked
                            ? "bg-[#713CF4]/10 text-zinc-900 dark:text-zinc-100"
                            : "hover:bg-zinc-100 dark:hover:bg-white/[0.04] text-zinc-600 dark:text-zinc-400"
                        }`}
                      >
                        <div className="min-w-0 pr-1">
                          <p className="text-xs font-semibold truncate leading-tight">{c.name}</p>
                          <p className="text-[9.5px] text-zinc-400 truncate">
                            {c.tools.length} exposed tools
                          </p>
                        </div>
                        <div
                          className={`size-3.5 rounded flex items-center justify-center border shrink-0 ${
                            isChecked
                              ? "bg-[#713CF4] border-[#713CF4] text-white"
                              : "border-zinc-300 dark:border-zinc-600"
                          }`}
                        >
                          {isChecked && <Check className="size-2.5 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Main Textarea Input ── */}
      <div className="px-3 pt-2 pb-1">
        <textarea
          ref={textareaRef}
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={2}
          autoFocus={autoFocus}
          className="w-full resize-none bg-transparent text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 outline-none leading-relaxed custom-scrollbar max-h-32"
        />
      </div>

      {/* ── Bottom Bar: Search Toggle + Hint + Send Action ── */}
      <div className="flex items-center justify-between px-3 py-1.5 border-t border-zinc-100 dark:border-white/4 text-[11px] text-zinc-400">
        {/* Web Search Toggle */}
        <button
          type="button"
          onClick={() => setIsWebSearch((v) => !v)}
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg font-medium transition-colors cursor-pointer ${
            isWebSearch
              ? "bg-[#713CF4]/15 text-[#713CF4] dark:text-[#a78bfa] font-semibold"
              : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/6"
          }`}
          title="Toggle live Web Search"
        >
          <Globe className="size-3" />
          <span>Search</span>
        </button>

        {/* Enter Hint */}
        <span className="hidden sm:inline-block text-[10px] text-zinc-400 dark:text-zinc-500 select-none">
          Enter to send · Shift+Enter new line
        </span>

        {/* Send Button */}
        <button
          type="button"
          onClick={handleSend}
          disabled={!inputText.trim() && !hasScreenshot && attachedFiles.length === 0 && !isReadPageActive}
          className="size-7 rounded-full bg-[#713CF4] hover:bg-[#602ee0] active:bg-[#5223c7] text-white flex items-center justify-center p-0 shrink-0 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-xs cursor-pointer hover:scale-105 active:scale-95"
          title="Send message"
          aria-label="Send message"
        >
          <Send className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
