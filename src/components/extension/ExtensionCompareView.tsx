"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Columns2,
  ExternalLink,
  Search,
  Check,
  X,
  Copy,
  RotateCw,
  ChevronRight,
} from "lucide-react";
import { EXTENDED_COMPARE_CATALOG } from "./data";
import { ModelLogo } from "@/components/ui/ModelLogo";
import { ExtensionTab } from "./types";

interface ExtensionCompareViewProps {
  onAddToHistory?: (
    title: string,
    toolType: ExtensionTab,
    promptOrSummary: string,
    resultText?: string,
    modelId?: string
  ) => void;
}

export function ExtensionCompareView({ onAddToHistory }: ExtensionCompareViewProps) {
  const [prompt, setPrompt] = useState("");
  const [selectedModelIds, setSelectedModelIds] = useState<string[]>([
    "echogpt",
    "gpt-4o",
    "claude-3-5-sonnet",
  ]);

  // "CHOOSE MODELS" Modal State
  const [isChooseModelsOpen, setIsChooseModelsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [tempSelectedIds, setTempSelectedIds] = useState<string[]>(selectedModelIds);

  // Comparison Execution & Results
  const [isComparing, setIsComparing] = useState(false);
  const [comparisonResults, setComparisonResults] = useState<
    {
      modelId: string;
      modelName: string;
      provider: string;
      badge?: string;
      response: string;
      latencyMs: number;
    }[]
  >([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const selectedModels = EXTENDED_COMPARE_CATALOG.filter((m) =>
    selectedModelIds.includes(m.id)
  );

  const CATEGORIES = ["All", "Flagship", "Reasoning", "Fast", "Open Source"];

  const filteredCatalog = EXTENDED_COMPARE_CATALOG.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === "All" || m.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleOpenChooseModels = () => {
    setTempSelectedIds([...selectedModelIds]);
    setIsChooseModelsOpen(true);
  };

  useEffect(() => {
    if (!isChooseModelsOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsChooseModelsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isChooseModelsOpen]);

  const handleToggleModelInModal = (id: string) => {
    setTempSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((mId) => mId !== id) : [...prev, id]
    );
  };

  const handleApplyModels = () => {
    if (tempSelectedIds.length > 0) {
      setSelectedModelIds(tempSelectedIds);
    }
    setIsChooseModelsOpen(false);
  };

  const handleRunComparison = () => {
    if (!prompt.trim() || selectedModelIds.length === 0) return;
    setIsComparing(true);
    setComparisonResults([]);

    setTimeout(() => {
      const results = selectedModels.map((m, idx) => {
        let text = "";
        if (m.id.includes("claude")) {
          text = `Claude 3.5 Sonnet Analysis:\n"${prompt.trim()}"\n\n1. Nuanced architectural breakdown prioritizing deterministic typing and immutable state transitions.\n2. Minimizes side-effect leaks through modular isolation.\n3. Verified syntax and benchmarks against modern standards.`;
        } else if (m.id.includes("gpt")) {
          text = `GPT-4o Multi-Angle Synthesis:\n"${prompt.trim()}"\n\n• Comprehensive overview covering both theoretical rationale and step-by-step practical execution.\n• High versatility across varied domains with clear modular recommendations.\n• Summary: Solid baseline for immediate implementation.`;
        } else if (m.id.includes("deepseek") || m.category === "Reasoning") {
          text = `DeepSeek / Reasoning Chain of Thought:\n"${prompt.trim()}"\n\n<thought>\nVerifying core constraints and calculating edge cases...\n</thought>\n\nConclusion: The optimal approach involves isolating state updates to prevent cascading re-renders, yielding an estimated 42% throughput improvement under high concurrency.`;
        } else {
          text = `${m.name} Response:\n"${prompt.trim()}"\n\nHigh-throughput immediate synthesis: Direct, actionable guidance tailored to low-latency execution environments. Ensures responsive interactivity without computational overhead.`;
        }

        return {
          modelId: m.id,
          modelName: m.name,
          provider: m.provider,
          badge: m.badge,
          response: text,
          latencyMs: 380 + idx * 120,
        };
      });

      setComparisonResults(results);
      setIsComparing(false);
      onAddToHistory?.(
        `Compare: ${prompt.trim().slice(0, 24)}`,
        "compare",
        `[Comparison prompt across ${results.length} models]: ${prompt.trim()}`,
        results.map((r) => `### ${r.modelName} (${r.latencyMs}ms)\n${r.response}`).join("\n\n---\n\n"),
        selectedModelIds[0]
      );
    }, 800);
  };

  const handleNewComparison = () => {
    setPrompt("");
    setComparisonResults([]);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-white dark:bg-[#0B0912]">
      {/* ── Top Bar: New Comparison Action & External Link ── */}
      <div className="p-3 border-b border-zinc-100 dark:border-white/4 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={handleNewComparison}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-white/5 dark:hover:bg-white/10 text-xs font-semibold text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
        >
          <RotateCw className="size-3" />
          <span>New Comparison</span>
        </button>

        <Link
          href="/compare"
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#713CF4] dark:text-[#a78bfa] hover:underline shrink-0"
        >
          <span>Open Full Compare</span>
          <ExternalLink className="size-3" />
        </Link>
      </div>

      {/* ── Scrollable Body Area: Comparison Output Stack ── */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 sm:p-4 space-y-4">
        {comparisonResults.length === 0 ? (
          // Empty State before comparison
          <div className="py-8 text-center space-y-3">
            <div className="size-12 rounded-2xl bg-[#713CF4]/10 text-[#713CF4] mx-auto flex items-center justify-center">
              <Columns2 className="size-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Multi-Model Comparison
              </h3>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 max-w-xs mx-auto mt-0.5">
                Send a single prompt to multiple frontier AI models and compare responses side-by-side.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
              {selectedModels.map((m) => (
                <span
                  key={m.id}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200/80 dark:border-white/8 text-xs font-medium text-zinc-700 dark:text-zinc-300"
                >
                  <ModelLogo modelId={m.id} provider={m.provider} size="xs" />
                  <span>{m.name}</span>
                </span>
              ))}
            </div>
          </div>
        ) : (
          // Comparison Response Cards (stacked on mobile/narrow, 2-col on wider panel)
          <div className="grid grid-cols-1 @lg:grid-cols-2 gap-3 animate-in fade-in">
            {comparisonResults.map((res) => (
              <div
                key={res.modelId}
                className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-white/3 border border-zinc-200/80 dark:border-white/8 space-y-2.5 shadow-xs"
              >
                {/* Model Header */}
                <div className="flex items-center justify-between pb-2 border-b border-zinc-200/60 dark:border-white/4">
                  <div className="flex items-center gap-2 min-w-0">
                    <ModelLogo modelId={res.modelId} provider={res.provider} size="xs" />
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate block">
                        {res.modelName}
                      </span>
                      <span className="text-[10px] text-zinc-400">
                        {res.provider} · ~{res.latencyMs}ms
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {res.badge && (
                      <span className="px-1.5 py-0.5 rounded text-[9.5px] font-bold bg-[#713CF4]/10 text-[#713CF4] dark:text-[#a78bfa]">
                        {res.badge}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => handleCopy(res.modelId, res.response)}
                      className="p-1 rounded hover:bg-zinc-200/60 dark:hover:bg-white/6 text-zinc-500 hover:text-zinc-800 dark:hover:text-white transition-colors cursor-pointer"
                      title="Copy response"
                    >
                      {copiedId === res.modelId ? (
                        <Check className="size-3 text-emerald-500" />
                      ) : (
                        <Copy className="size-3" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Formatted Output */}
                <div className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap leading-relaxed">
                  {res.response}
                </div>
              </div>
            ))}
          </div>
        )}

        {isComparing && (
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/3 border border-zinc-200/80 dark:border-white/8 flex items-center justify-center gap-2 text-xs text-zinc-500 animate-pulse">
            <Sparkles className="size-4 text-[#713CF4] animate-spin" />
            <span>Querying {selectedModelIds.length} models simultaneously...</span>
          </div>
        )}
      </div>

      {/* ── Bottom Input & Model Selector Control (Section 11) ── */}
      <div className="p-3 border-t border-zinc-200/80 dark:border-white/8 bg-zinc-50/60 dark:bg-[#121019] space-y-2">
        {/* Prompt Input Row */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleRunComparison();
            }}
            placeholder={`Message ${selectedModelIds.length} models...`}
            className="flex-1 h-10 px-3.5 rounded-xl border border-zinc-200 dark:border-white/[0.1] bg-white dark:bg-white/3 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-[#713CF4]/40 focus:border-[#713CF4]"
          />
          <button
            type="button"
            onClick={handleRunComparison}
            disabled={!prompt.trim() || isComparing}
            className="h-10 px-4 rounded-xl bg-[#713CF4] hover:bg-[#602ee0] active:bg-[#5223c7] text-white text-xs font-semibold transition-all shadow-md shadow-[#713CF4]/20 disabled:opacity-50 disabled:cursor-not-allowed shrink-0 cursor-pointer"
          >
            Compare
          </button>
        </div>

        {/* Model Selection Control: "EchoGPT + 3 models" */}
        <button
          type="button"
          onClick={handleOpenChooseModels}
          className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl bg-white dark:bg-white/[0.04] border border-zinc-200/80 dark:border-white/8 hover:border-zinc-300 dark:hover:border-white/[0.15] transition-colors cursor-pointer text-xs"
        >
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">
              EchoGPT + {selectedModelIds.length - 1} models
            </span>
            <div className="flex items-center -space-x-1 overflow-hidden">
              {selectedModels.slice(0, 4).map((m) => (
                <div key={m.id} className="size-4.5 rounded-full border border-white dark:border-zinc-900 overflow-hidden">
                  <ModelLogo modelId={m.id} provider={m.provider} size="xs" />
                </div>
              ))}
            </div>
          </div>
          <span className="text-[11px] font-semibold text-[#713CF4] dark:text-[#a78bfa] hover:underline flex items-center">
            Change models
            <ChevronRight className="size-3 ml-0.5" />
          </span>
        </button>
      </div>

      {/* ── CHOOSE MODELS MODAL / DRAWER (Scales to 100+ Models) ── */}
      {isChooseModelsOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsChooseModelsOpen(false);
          }}
          className="absolute inset-0 z-50 flex items-center justify-center p-3 bg-black/50 font-lexend animate-in fade-in"
        >
          <div className="w-full max-w-lg max-h-[85vh] rounded-2xl bg-white dark:bg-[#15121F] border border-zinc-200 dark:border-white/[0.1] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95">
            {/* Modal Header */}
            <div className="p-3.5 border-b border-zinc-100 dark:border-white/6 flex items-center justify-between bg-zinc-50/70 dark:bg-white/[0.02]">
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  Choose Models to Compare
                </h3>
                <p className="text-[11px] text-zinc-400">
                  {tempSelectedIds.length} models selected ({EXTENDED_COMPARE_CATALOG.length}+ available in catalog)
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsChooseModelsOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Selected Model Chips */}
            <div className="p-2.5 bg-zinc-50/40 dark:bg-white/[0.01] border-b border-zinc-100 dark:border-white/6 flex flex-wrap gap-1 max-h-24 overflow-y-auto custom-scrollbar">
              {tempSelectedIds.map((id) => {
                const model = EXTENDED_COMPARE_CATALOG.find((m) => m.id === id);
                return (
                  <span
                    key={id}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-[#713CF4]/10 text-[#713CF4] dark:text-[#a78bfa] border border-[#713CF4]/20 text-[11px] font-semibold"
                  >
                    <span>{model?.name || id}</span>
                    <button
                      type="button"
                      onClick={() => handleToggleModelInModal(id)}
                      className="hover:text-purple-900 cursor-pointer"
                    >
                      <X className="size-3" />
                    </button>
                  </span>
                );
              })}
            </div>

            {/* Search Bar & Category Filters */}
            <div className="p-2.5 border-b border-zinc-100 dark:border-white/6 space-y-2">
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200/80 dark:border-white/8">
                <Search className="size-3.5 text-zinc-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search 100+ models by name, provider, or capability..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs bg-transparent outline-none text-zinc-800 dark:text-zinc-200"
                />
              </div>

              <div className="flex items-center gap-1 overflow-x-auto custom-scrollbar pb-0.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-2 py-0.5 rounded-full text-[10.5px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      categoryFilter === cat
                        ? "bg-[#713CF4] text-white"
                        : "bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Data-Driven Searchable Model List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1 max-h-72">
              {filteredCatalog.map((m) => {
                const isSelected = tempSelectedIds.includes(m.id);
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => handleToggleModelInModal(m.id)}
                    className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[#713CF4]/10 dark:bg-[#713CF4]/15 border border-[#713CF4]/30"
                        : "hover:bg-zinc-100 dark:hover:bg-white/[0.04] border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <ModelLogo modelId={m.id} provider={m.provider} size="sm" />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                            {m.name}
                          </span>
                          {m.badge && (
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-zinc-200/80 dark:bg-white/[0.08] text-zinc-600 dark:text-zinc-400">
                              {m.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-zinc-400 truncate mt-0.5">
                          {m.provider} · {m.description}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`size-4.5 rounded-md flex items-center justify-center border shrink-0 transition-colors ${
                        isSelected
                          ? "bg-[#713CF4] border-[#713CF4] text-white"
                          : "border-zinc-300 dark:border-zinc-600"
                      }`}
                    >
                      {isSelected && <Check className="size-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Modal Footer: Apply Button */}
            <div className="p-3 border-t border-zinc-100 dark:border-white/6 bg-zinc-50/70 dark:bg-white/[0.02] flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setTempSelectedIds([])}
                className="text-xs font-semibold text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 cursor-pointer"
              >
                Clear all
              </button>

              <button
                type="button"
                onClick={handleApplyModels}
                disabled={tempSelectedIds.length === 0}
                className="px-4 py-2 rounded-xl bg-[#713CF4] hover:bg-[#602ee0] active:bg-[#5223c7] text-white text-xs font-semibold transition-all shadow-md shadow-[#713CF4]/20 disabled:opacity-50 cursor-pointer"
              >
                Apply for this chat ({tempSelectedIds.length} models)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
