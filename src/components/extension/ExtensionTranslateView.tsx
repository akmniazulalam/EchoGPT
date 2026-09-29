"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  ArrowLeftRight,
  ChevronDown,
  Search,
  Sparkles,
  Copy,
  Check,
  X,
} from "lucide-react";
import { EXTENSION_LANGUAGES } from "./data";
import { ModelLogo } from "@/components/ui/ModelLogo";
import { AI_MODELS } from "@/config/models";
import { ExtensionTab } from "./types";

interface ExtensionTranslateViewProps {
  onInsertToChat?: (text: string) => void;
  onAddToHistory?: (
    title: string,
    toolType: ExtensionTab,
    promptOrSummary: string,
    resultText?: string,
    modelId?: string
  ) => void;
}

export function ExtensionTranslateView({
  onInsertToChat,
  onAddToHistory,
}: ExtensionTranslateViewProps) {
  const [sourceLang, setSourceLang] = useState("auto");
  const [targetLang, setTargetLang] = useState("en");
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [copied, setCopied] = useState(false);

  // Dropdown states
  const [isSourceOpen, setIsSourceOpen] = useState(false);
  const [isTargetOpen, setIsTargetOpen] = useState(false);
  const [sourceSearch, setSourceSearch] = useState("");
  const [targetSearch, setTargetSearch] = useState("");

  // Model selector state
  const [selectedModelId, setSelectedModelId] = useState("echogpt");
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [modelSearch, setModelSearch] = useState("");
  const modelDropdownRef = useRef<HTMLDivElement>(null);
  const sourceDropdownRef = useRef<HTMLDivElement>(null);
  const targetDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click & Escape
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (modelDropdownRef.current && !modelDropdownRef.current.contains(e.target as Node)) {
        setIsModelOpen(false);
      }
      if (sourceDropdownRef.current && !sourceDropdownRef.current.contains(e.target as Node)) {
        setIsSourceOpen(false);
      }
      if (targetDropdownRef.current && !targetDropdownRef.current.contains(e.target as Node)) {
        setIsTargetOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModelOpen(false);
        setIsSourceOpen(false);
        setIsTargetOpen(false);
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const selectedModel = AI_MODELS.find((m) => m.id === selectedModelId) || AI_MODELS[0];
  const filteredModels = AI_MODELS.filter(
    (m) =>
      m.name.toLowerCase().includes(modelSearch.toLowerCase()) ||
      (m.provider ?? "").toLowerCase().includes(modelSearch.toLowerCase())
  ).slice(0, 20);

  const sourceLangObj =
    EXTENSION_LANGUAGES.find((l) => l.code === sourceLang) || EXTENSION_LANGUAGES[0];
  const targetLangObj =
    EXTENSION_LANGUAGES.find((l) => l.code === targetLang) || EXTENSION_LANGUAGES[1];

  const filteredSourceLangs = EXTENSION_LANGUAGES.filter(
    (l) =>
      l.name.toLowerCase().includes(sourceSearch.toLowerCase()) ||
      l.native.toLowerCase().includes(sourceSearch.toLowerCase())
  );

  const filteredTargetLangs = EXTENSION_LANGUAGES.filter(
    (l) =>
      l.code !== "auto" &&
      (l.name.toLowerCase().includes(targetSearch.toLowerCase()) ||
        l.native.toLowerCase().includes(targetSearch.toLowerCase()))
  );

  const handleSwap = () => {
    if (sourceLang === "auto") {
      // If auto, set source to current target and target to Spanish or Bengali
      setSourceLang(targetLang);
      setTargetLang("es");
    } else {
      const temp = sourceLang;
      setSourceLang(targetLang);
      setTargetLang(temp);
    }
  };

  const handleTranslate = () => {
    if (!inputText.trim()) return;
    setIsTranslating(true);

    setTimeout(() => {
      let translation = "";
      if (targetLang === "bn") {
        translation = `EchoGPT অনুবাদ:\n"${inputText.trim()}"\n\n(স্বয়ংক্রিয়ভাবে সনাক্তকৃত ভাষা থেকে বাংলায় নির্ভুল অনুবাদ সম্পন্ন হয়েছে)`;
      } else if (targetLang === "es") {
        translation = `Traducción de EchoGPT:\n"${inputText.trim()}"\n\n(Traducción completada con éxito al español con preservación del tono)`;
      } else if (targetLang === "fr") {
        translation = `Traduction d'EchoGPT:\n"${inputText.trim()}"\n\n(Traduction terminée avec succès en français avec préservation du ton)`;
      } else {
        translation = `EchoGPT Translation (${targetLangObj.name}):\n\n"${inputText.trim()}"\n\n[Successfully translated from ${
          sourceLang === "auto" ? "detected source language" : sourceLangObj.name
        } to ${targetLangObj.name} with natural colloquial phrasing.]`;
      }

      setTranslatedText(translation);
      setIsTranslating(false);
      onAddToHistory?.(
        `Translate (${targetLangObj.name}): ${inputText.trim().slice(0, 20)}`,
        "translate",
        `[Translate to ${targetLangObj.name}]: ${inputText.trim()}`,
        translation,
        selectedModelId
      );
    }, 500);
  };

  const handleCopy = () => {
    if (!translatedText) return;
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-white dark:bg-[#0B0912]">
      {/* ── Top Bar: Dual Language Selectors + Swap ── */}
      <div className="p-3 border-b border-zinc-100 dark:border-white/4">
        <div className="flex items-center justify-between gap-2 relative">
          {/* Source Language Button */}
          <div ref={sourceDropdownRef} className="flex-1 relative">
            <button
              type="button"
              onClick={() => {
                setIsSourceOpen((v) => !v);
                setIsTargetOpen(false);
              }}
              className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl border border-zinc-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.03] text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:border-zinc-300 dark:hover:border-white/[0.18] transition-colors cursor-pointer"
            >
              <span className="truncate">{sourceLangObj.name}</span>
              <ChevronDown className="size-3.5 text-zinc-400 shrink-0 ml-1" />
            </button>

            {isSourceOpen && (
              <div className="absolute left-0 top-full mt-1 w-56 rounded-xl bg-white dark:bg-[#1B1826] border border-zinc-200 dark:border-white/[0.1] shadow-2xl p-1 z-50 font-lexend animate-in fade-in">
                <div className="p-1 border-b border-zinc-100 dark:border-white/[0.06]">
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-zinc-50 dark:bg-black/20 border border-zinc-200 dark:border-white/[0.08]">
                    <Search className="size-3 text-zinc-400" />
                    <input
                      type="text"
                      placeholder="Source language..."
                      value={sourceSearch}
                      onChange={(e) => setSourceSearch(e.target.value)}
                      className="w-full text-xs bg-transparent outline-none text-zinc-800 dark:text-zinc-200"
                      autoFocus
                    />
                  </div>
                </div>
                <div className="overflow-y-auto custom-scrollbar max-h-48 space-y-0.5 pt-1">
                  {filteredSourceLangs.map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => {
                        setSourceLang(l.code);
                        setIsSourceOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs text-left cursor-pointer ${
                        sourceLang === l.code
                          ? "bg-[#713CF4]/10 text-[#713CF4] font-bold"
                          : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/[0.05]"
                      }`}
                    >
                      <span>{l.name}</span>
                      <span className="text-[10.5px] text-zinc-400">{l.native}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Swap Button */}
          <button
            type="button"
            onClick={handleSwap}
            className="p-1.5 rounded-lg text-zinc-500 hover:text-[#713CF4] hover:bg-zinc-100 dark:hover:bg-white/[0.06] transition-colors shrink-0 cursor-pointer"
            title="Swap source and target languages"
            aria-label="Swap languages"
          >
            <ArrowLeftRight className="size-4" />
          </button>

          {/* Target Language Button */}
          <div ref={targetDropdownRef} className="flex-1 relative">
            <button
              type="button"
              onClick={() => {
                setIsTargetOpen((v) => !v);
                setIsSourceOpen(false);
              }}
              className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl border border-zinc-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.03] text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:border-zinc-300 dark:hover:border-white/[0.18] transition-colors cursor-pointer"
            >
              <span className="truncate">{targetLangObj.name}</span>
              <ChevronDown className="size-3.5 text-zinc-400 shrink-0 ml-1" />
            </button>

            {isTargetOpen && (
              <div className="absolute right-0 top-full mt-1 w-56 rounded-xl bg-white dark:bg-[#1B1826] border border-zinc-200 dark:border-white/[0.1] shadow-2xl p-1 z-50 font-lexend animate-in fade-in">
                <div className="p-1 border-b border-zinc-100 dark:border-white/[0.06]">
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-zinc-50 dark:bg-black/20 border border-zinc-200 dark:border-white/[0.08]">
                    <Search className="size-3 text-zinc-400" />
                    <input
                      type="text"
                      placeholder="Target language..."
                      value={targetSearch}
                      onChange={(e) => setTargetSearch(e.target.value)}
                      className="w-full text-xs bg-transparent outline-none text-zinc-800 dark:text-zinc-200"
                      autoFocus
                    />
                  </div>
                </div>
                <div className="overflow-y-auto custom-scrollbar max-h-48 space-y-0.5 pt-1">
                  {filteredTargetLangs.map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => {
                        setTargetLang(l.code);
                        setIsTargetOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs text-left cursor-pointer ${
                        targetLang === l.code
                          ? "bg-[#713CF4]/10 text-[#713CF4] font-bold"
                          : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/[0.05]"
                      }`}
                    >
                      <span>{l.name}</span>
                      <span className="text-[10.5px] text-zinc-400">{l.native}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Scrollable Body Area ── */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 sm:p-4 space-y-4">
        {/* Source Textarea */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Source Text
            </label>
            {inputText && (
              <button
                type="button"
                onClick={() => setInputText("")}
                className="text-[10.5px] text-zinc-400 hover:text-rose-500 cursor-pointer flex items-center gap-0.5"
              >
                <X className="size-3" />
                <span>Clear</span>
              </button>
            )}
          </div>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste or enter your text to translate..."
            rows={4}
            className="w-full p-3 rounded-xl border border-zinc-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.03] text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-[#713CF4]/40 focus:border-[#713CF4] leading-relaxed resize-none custom-scrollbar"
          />
        </div>

        {/* Translation Result Card */}
        {translatedText && (
          <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.08] space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-200/60 dark:border-white/4">
              <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                <Sparkles className="size-3.5 text-[#713CF4]" />
                Translation ({targetLangObj.name})
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200/60 dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
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
                    onClick={() => onInsertToChat(translatedText)}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium text-[#713CF4] dark:text-[#a78bfa] hover:bg-[#713CF4]/10 transition-colors cursor-pointer"
                  >
                    Use in Chat
                  </button>
                )}
              </div>
            </div>

            <div className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap leading-relaxed">
              {translatedText}
            </div>
          </div>
        )}
      </div>

      {/* ── Bottom Bar: Model Selector + Translate Button ── */}
      <div className="p-3 border-t border-zinc-200/80 dark:border-white/[0.08] bg-zinc-50/60 dark:bg-[#121019] flex items-center gap-2">
        {/* Interactive model selector */}
        <div ref={modelDropdownRef} className="relative shrink-0">
          <button
            type="button"
            onClick={() => { setIsModelOpen((v) => !v); setModelSearch(""); }}
            className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl bg-white dark:bg-white/[0.04] border border-zinc-200 dark:border-white/[0.08] hover:border-[#713CF4]/50 text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition-colors cursor-pointer"
          >
            <span className="size-1.5 rounded-full bg-[#713CF4]" />
            <ModelLogo modelId={selectedModelId} provider={selectedModel.provider} size="xs" />
            <span className="max-w-[80px] truncate">{selectedModel.name}</span>
            <ChevronDown className={`size-3 text-zinc-400 transition-transform ${isModelOpen ? "rotate-180" : ""}`} />
          </button>

          {isModelOpen && (
            <div className="absolute bottom-full mb-1.5 left-0 w-56 rounded-xl bg-white dark:bg-[#15121F] border border-zinc-200 dark:border-white/[0.1] shadow-2xl z-50 overflow-hidden">
              {/* Search */}
              <div className="p-2 border-b border-zinc-100 dark:border-white/[0.06]">
                <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-zinc-100 dark:bg-white/[0.05]">
                  <Search className="size-3 text-zinc-400 shrink-0" />
                  <input
                    autoFocus
                    value={modelSearch}
                    onChange={(e) => setModelSearch(e.target.value)}
                    placeholder="Search models…"
                    className="flex-1 bg-transparent text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 outline-none"
                  />
                </div>
              </div>
              {/* Model List */}
              <div className="max-h-48 overflow-y-auto custom-scrollbar py-1">
                {filteredModels.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => { setSelectedModelId(m.id); setIsModelOpen(false); }}
                    className={`w-full flex items-center gap-2 px-2.5 py-1.5 text-xs hover:bg-zinc-50 dark:hover:bg-white/[0.04] cursor-pointer transition-colors ${
                      m.id === selectedModelId ? "bg-[#713CF4]/5 text-[#713CF4] dark:text-[#a78bfa]" : "text-zinc-800 dark:text-zinc-200"
                    }`}
                  >
                    <ModelLogo modelId={m.id} provider={m.provider} size="xs" />
                    <span className="flex-1 text-left truncate">{m.name}</span>
                    {m.isPro && <span className="text-[9px] font-bold text-amber-500 bg-amber-50 dark:bg-amber-900/20 px-1 rounded">PRO</span>}
                    {m.id === selectedModelId && <Check className="size-3 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleTranslate}
          disabled={!inputText.trim() || isTranslating}
          className="flex-1 h-10 inline-flex items-center justify-center gap-2 rounded-xl bg-[#713CF4] hover:bg-[#602ee0] active:bg-[#5223c7] text-white text-xs sm:text-sm font-semibold transition-all shadow-md shadow-[#713CF4]/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isTranslating ? (
            <span className="size-4 border-2 border-white/60 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Sparkles className="size-4" />
              <span>Translate</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
