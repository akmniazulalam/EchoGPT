"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Copy,
  Check,
  RotateCw,
  ChevronDown,
  Search,
  Globe,
} from "lucide-react";
import {
  WRITE_FORMATS,
  WRITE_TONES,
  WRITE_LENGTHS,
  EXTENSION_LANGUAGES,
} from "./data";
import { AI_MODELS } from "@/config/models";
import { ModelLogo } from "@/components/ui/ModelLogo";
import { ExtensionTab } from "./types";

interface ExtensionWriteViewProps {
  onInsertToChat?: (text: string) => void;
  onAddToHistory?: (
    title: string,
    toolType: ExtensionTab,
    promptOrSummary: string,
    resultText?: string,
    modelId?: string
  ) => void;
}

export function ExtensionWriteView({
  onInsertToChat,
  onAddToHistory,
}: ExtensionWriteViewProps) {
  const [subTab, setSubTab] = useState<"compose" | "reply" | "grammar">("compose");
  const [topic, setTopic] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("Automatic");
  const [selectedTone, setSelectedTone] = useState("Automatic");
  const [selectedLength, setSelectedLength] = useState("Automatic");
  const [selectedLang, setSelectedLang] = useState("auto");
  const [selectedModelId, setSelectedModelId] = useState("echogpt");
  const [isModelMenuOpen, setIsModelMenuOpen] = useState(false);

  // Language Dropdown state
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [langSearch, setLangSearch] = useState("");

  // Generation state & mock result
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const langDropdownRef = useRef<HTMLDivElement>(null);
  const modelDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside & Escape
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
      if (modelDropdownRef.current && !modelDropdownRef.current.contains(e.target as Node)) {
        setIsModelMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsLangOpen(false);
        setIsModelMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const currentLangObj =
    EXTENSION_LANGUAGES.find((l) => l.code === selectedLang) || EXTENSION_LANGUAGES[0];

  const filteredLanguages = EXTENSION_LANGUAGES.filter(
    (l) =>
      l.name.toLowerCase().includes(langSearch.toLowerCase()) ||
      l.native.toLowerCase().includes(langSearch.toLowerCase())
  );

  const selectedModel = AI_MODELS.find((m) => m.id === selectedModelId) || AI_MODELS[0];

  const handleGenerate = () => {
    if (!topic.trim()) return;
    setIsGenerating(true);

    setTimeout(() => {
      let result = "";
      if (subTab === "grammar") {
        result = `Polished version:\n\n"${topic.trim()}"\n\nFixes applied:\n• Corrected punctuation and subject-verb agreement.\n• Enhanced vocabulary flow for ${selectedTone.toLowerCase()} tone.\n• Optimized readability in ${currentLangObj.name}.`;
      } else if (subTab === "reply") {
        result = `Draft response (${selectedTone} tone):\n\nHi there,\n\nThank you for reaching out regarding "${topic.slice(0, 40)}...". I have reviewed the details and wanted to confirm that everything is progressing smoothly.\n\nPlease let me know if you need any additional clarification.\n\nBest regards,\nEchoGPT Assistant`;
      } else {
        result = `## ${selectedFormat} Draft\n\n**Topic:** ${topic.trim()}\n\nHere is your drafted ${selectedFormat.toLowerCase()} configured for a ${selectedTone.toLowerCase()} tone and ${selectedLength.toLowerCase()} length:\n\n${
          selectedFormat === "Email"
            ? `Subject: Update on ${topic.slice(0, 30)}\n\nDear Team,\n\nI am writing to share key updates regarding our work on "${topic.trim()}". We have structured our roadmap to maximize efficiency and ensure high quality results across every stage.\n\nLooking forward to your feedback.\n\nWarm regards,\nAlex`
            : `In exploring ${topic.trim()}, modern workflows benefit immensely from combining clear structural planning with rapid iteration. By establishing reliable foundational parameters and maintaining consistent communication, teams achieve higher velocity without sacrificing analytical rigour.\n\nKey Takeaways:\n1. Establish clear objectives early.\n2. Leverage automated assistance to remove repetitive friction.\n3. Validate outputs with continuous review cycles.`
        }`;
      }

      setGeneratedOutput(result);
      setIsGenerating(false);
      onAddToHistory?.(
        `Write: ${topic.trim().slice(0, 24) || "Draft"}`,
        "write",
        topic.trim(),
        result,
        selectedModelId
      );
    }, 600);
  };

  const handleCopy = () => {
    if (!generatedOutput) return;
    navigator.clipboard.writeText(generatedOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-white dark:bg-[#0B0912]">
      {/* ── Subtabs Switcher (Screenshot 2: Compose | Reply | Grammar) ── */}
      <div className="p-3 border-b border-zinc-100 dark:border-white/4">
        <div className="grid grid-cols-3 p-1 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200/60 dark:border-white/6">
          {(["compose", "reply", "grammar"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setSubTab(tab)}
              className={`py-1.5 text-xs font-semibold rounded-lg capitalize transition-all cursor-pointer ${
                subTab === tab
                  ? "bg-[#713CF4] text-white shadow-xs"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ── Scrollable Form Area ── */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 sm:p-4 space-y-4">
        {/* TOPIC Input */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            {subTab === "grammar" ? "Original Text" : subTab === "reply" ? "Message to reply to" : "Topic"}
          </label>
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder={
              subTab === "grammar"
                ? "Paste the text you want to check and polish..."
                : subTab === "reply"
                ? "Paste the incoming message you want to draft a reply for..."
                : "The topic you want to write about..."
            }
            rows={3}
            className="w-full p-3 rounded-xl border border-zinc-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.03] text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-[#713CF4]/40 focus:border-[#713CF4] leading-relaxed resize-none custom-scrollbar"
          />
        </div>

        {/* FORMAT Options Pills */}
        {subTab !== "grammar" && (
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Format
            </label>
            <div className="flex flex-wrap gap-1.5">
              {WRITE_FORMATS.map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => setSelectedFormat(fmt)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    selectedFormat === fmt
                      ? "bg-[#713CF4] text-white shadow-2xs font-semibold"
                      : "bg-zinc-100 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-white/10"
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* TONE Options Pills */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Tone
          </label>
          <div className="flex flex-wrap gap-1.5">
            {WRITE_TONES.map((tone) => (
              <button
                key={tone}
                type="button"
                onClick={() => setSelectedTone(tone)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  selectedTone === tone
                    ? "bg-[#713CF4] text-white shadow-2xs font-semibold"
                    : "bg-zinc-100 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-white/10"
                }`}
              >
                {tone}
              </button>
            ))}
          </div>
        </div>

        {/* LENGTH Options Pills */}
        {subTab !== "grammar" && (
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Length
            </label>
            <div className="flex flex-wrap gap-1.5">
              {WRITE_LENGTHS.map((len) => (
                <button
                  key={len}
                  type="button"
                  onClick={() => setSelectedLength(len)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    selectedLength === len
                      ? "bg-[#713CF4] text-white shadow-2xs font-semibold"
                      : "bg-zinc-100 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-white/10"
                  }`}
                >
                  {len}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* OUTPUT LANGUAGE Real Dropdown */}
        <div ref={langDropdownRef} className="space-y-1.5 relative">
          <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Output Language
          </label>
          <button
            type="button"
            onClick={() => setIsLangOpen((v) => !v)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl border border-zinc-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.03] text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 hover:border-zinc-300 dark:hover:border-white/[0.18] transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Globe className="size-3.5 text-[#713CF4]" />
              <span className="font-medium">{currentLangObj.name}</span>
              <span className="text-[11px] text-zinc-400">({currentLangObj.native})</span>
            </span>
            <ChevronDown className="size-3.5 text-zinc-400" />
          </button>

          {isLangOpen && (
            <div className="absolute left-0 bottom-full mb-1.5 w-full rounded-xl bg-white dark:bg-[#1B1826] border border-zinc-200 dark:border-white/[0.1] shadow-2xl p-1.5 z-50 font-lexend animate-in fade-in">
              <div className="p-1.5 border-b border-zinc-100 dark:border-white/6">
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-zinc-50 dark:bg-black/20 border border-zinc-200 dark:border-white/8">
                  <Search className="size-3 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Search 30+ languages..."
                    value={langSearch}
                    onChange={(e) => setLangSearch(e.target.value)}
                    className="w-full text-xs bg-transparent outline-none text-zinc-800 dark:text-zinc-200"
                    autoFocus
                  />
                </div>
              </div>
              <div className="overflow-y-auto custom-scrollbar max-h-48 space-y-0.5 pt-1">
                {filteredLanguages.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => {
                      setSelectedLang(l.code);
                      setIsLangOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-left transition-colors cursor-pointer ${
                      selectedLang === l.code
                        ? "bg-[#713CF4]/10 text-[#713CF4] dark:text-[#a78bfa] font-bold"
                        : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/[0.05]"
                    }`}
                  >
                    <span>{l.name}</span>
                    <span className="text-[11px] text-zinc-400">{l.native}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Generated Result State ── */}
        {generatedOutput && (
          <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/8 space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-200/60 dark:border-white/4">
              <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                <Sparkles className="size-3.5 text-[#713CF4]" />
                Generated Output
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200/60 dark:hover:bg-white/6 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="size-3 text-emerald-500" />
                      <span className="text-emerald-500">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                {onInsertToChat && (
                  <button
                    type="button"
                    onClick={() => onInsertToChat(generatedOutput)}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium text-[#713CF4] dark:text-[#a78bfa] hover:bg-[#713CF4]/10 transition-colors cursor-pointer"
                  >
                    Use in Chat
                  </button>
                )}
              </div>
            </div>

            <div className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap leading-relaxed">
              {generatedOutput}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-zinc-200/60 dark:border-white/4 text-[10.5px] text-zinc-400">
              <span>
                {generatedOutput.split(/\s+/).filter(Boolean).length} words ·{" "}
                {generatedOutput.length} characters
              </span>
              <button
                type="button"
                onClick={handleGenerate}
                className="hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer inline-flex items-center gap-1"
              >
                <RotateCw className="size-2.5" />
                Regenerate
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Bottom Action Bar (Model Selector + Generate Button) ── */}
      <div className="p-3 border-t border-zinc-200/80 dark:border-white/8 bg-zinc-50/60 dark:bg-[#121019] flex items-center gap-2 relative">
        {/* Model Selector Pill */}
        <div ref={modelDropdownRef} className="relative shrink-0">
          <button
            type="button"
            onClick={() => setIsModelMenuOpen((v) => !v)}
            className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-white dark:bg-white/[0.04] border border-zinc-200 dark:border-white/8 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:border-zinc-300 cursor-pointer"
          >
            <span className="size-1.5 rounded-full bg-[#713CF4]" />
            <ModelLogo modelId={selectedModel.id} provider={selectedModel.provider} size="xs" />
            <span className="truncate max-w-[80px]">{selectedModel.name}</span>
            <ChevronDown className="size-3 text-zinc-400" />
          </button>

          {isModelMenuOpen && (
            <div className="absolute left-0 bottom-full mb-1.5 w-52 rounded-xl bg-white dark:bg-[#1B1826] border border-zinc-200 dark:border-white/[0.1] shadow-xl p-1 z-50 font-lexend animate-in fade-in">
              {AI_MODELS.slice(0, 6).map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    setSelectedModelId(m.id);
                    setIsModelMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-left cursor-pointer ${
                    selectedModelId === m.id
                      ? "bg-[#713CF4]/10 text-[#713CF4] font-bold"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/[0.05]"
                  }`}
                >
                  <span className="truncate">{m.name}</span>
                  <span className="text-[10px] text-zinc-400">{m.category}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Generate Primary Button */}
        <button
          type="button"
          onClick={handleGenerate}
          disabled={!topic.trim() || isGenerating}
          className="flex-1 h-10 inline-flex items-center justify-center gap-2 rounded-xl bg-[#713CF4] hover:bg-[#602ee0] active:bg-[#5223c7] text-white text-xs sm:text-sm font-semibold transition-all shadow-md shadow-[#713CF4]/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isGenerating ? (
            <span className="size-4 border-2 border-white/60 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Sparkles className="size-4" />
              <span>Generate</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
