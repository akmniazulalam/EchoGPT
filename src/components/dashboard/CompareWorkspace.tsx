"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Plus,
  Maximize2,
  Grid,
  ArrowRight,
  Lightbulb,
  ChevronDown,
  Clock,
  Coins,
  Copy,
  Check,
  RotateCcw,
  ThumbsUp,
} from "lucide-react";
import { WorkspaceHeader } from "@/components/workspace/WorkspaceHeader";
import { ModelSelector } from "@/components/dashboard/ModelSelector";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { showToast } from "@/components/ui/Toast";
import { AIModel, AI_MODELS } from "@/config/models";

const DEFAULT_COMPARE_MODELS = ["echogpt", "gpt-4o", "claude-4-sonnet"];

const INITIAL_RESPONSES: Record<string, string> = {
  echogpt:
    "### EchoGPT Native Synthesis:\n\nFor optimizing frontend bundle sizes in modern React/Next.js:\n\n1. **Route-based Code Splitting**: Leverage Next.js dynamic imports (`next/dynamic`) for non-critical modals, charts, and heavy client components.\n2. **Package Tree-Shaking**: Audit barrel files (`lucide-react`, `lodash-es`) to verify dead code elimination compiles zero runtime overhead.\n3. **CSS-First Architecture**: Tailwind v4 with lightning-fast CSS-first compiling eliminates large runtime stylesheets entirely.\n\n*Simulated benchmark analysis.*",
  "gpt-4o":
    "### GPT-4o Comparative Breakdown:\n\nFrontend bundle optimization strategies:\n\n- **Tree-Shaking & Dead Code Elimination**: Use Webpack/Turbopack bundle visualizers to find duplicate transitive packages.\n- **Font Optimization**: Self-host Lexend with subsetting (`latin` only) using `next/font` for zero layout shifts.\n- **Dynamic Hydration**: Keep interactive client components strictly at the leaves of the render tree.\n\n*Simulated benchmark analysis.*",
  "claude-4-sonnet":
    "### Claude 4 Sonnet Nuanced Evaluation:\n\nFrom an architectural perspective, bundle size is only half the battle—Total Blocking Time (TBT) matters more:\n\n- **Client State Pruning**: Avoid hoisting local state into top-level context providers, which causes cascading re-renders across the tree.\n- **Zero-Dependency Patterns**: Use browser-native APIs (`useSyncExternalStore`, `Web Share`, `ResizeObserver`) instead of npm micro-libraries.\n- **Image Format Strategy**: Next.js `<Image />` component with AVIF/WebP ensures sub-50KB visual assets.\n\n*Simulated benchmark analysis.*",
  "deepseek-r1":
    "### DeepSeek R1 Chain-of-Thought Audit:\n\n<thought>\nAnalyzing critical bottlenecks in Next.js App Router applications...\n1. Hydration boundary overhead\n2. Font weight payload\n3. Client bundle inclusion\n</thought>\n\n**Actionable Recommendations:**\n1. Ensure Server Components remain the default for metadata and static layouts.\n2. Move heavy formatters to server actions or build-time compute.\n3. Enforce sub-150KB initial JS budget per route in CI/CD pipeline.\n\n*Simulated benchmark analysis.*",
};

const SAMPLE_BENCHMARKS = [
  "Compare recursion vs iteration with a visual analogy",
  "Write a TypeScript debounce function with immediate execution option",
  "Compare microservices vs monolithic architecture for a growing startup",
  "Explain memory management in JavaScript: Garbage Collection & Closures",
];

export function CompareWorkspace() {
  const [prompt, setPrompt] = useState(
    "Compare reasoning approaches for optimizing web application frontend performance and bundle size."
  );
  const [selectedModelIds, setSelectedModelIds] = useState<string[]>(
    DEFAULT_COMPARE_MODELS
  );
  const [isComparing, setIsComparing] = useState(false);
  const [results, setResults] = useState<Record<string, string>>(INITIAL_RESPONSES);
  const [bestModelId, setBestModelId] = useState<string | null>("claude-4-sonnet");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Focus Mode State
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [rawFocusedModelId, setRawFocusedModelId] = useState<string>("echogpt");

  // Derive focused model safely
  const focusedModelId = selectedModelIds.includes(rawFocusedModelId)
    ? rawFocusedModelId
    : selectedModelIds[0] || "echogpt";

  const setFocusedModelId = (id: string) => setRawFocusedModelId(id);

  // Benchmark Suggestions Popover State
  const [showBenchmarkPopover, setShowBenchmarkPopover] = useState(false);
  const benchmarkRef = useRef<HTMLDivElement>(null);

  // Close benchmark popover on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        benchmarkRef.current &&
        !benchmarkRef.current.contains(e.target as Node)
      ) {
        setShowBenchmarkPopover(false);
      }
    }
    if (showBenchmarkPopover) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showBenchmarkPopover]);

  const handleCompare = () => {
    if (!prompt.trim() || isComparing) return;
    setIsComparing(true);

    setTimeout(() => {
      const newResults: Record<string, string> = {};
      selectedModelIds.forEach((id) => {
        const model = AI_MODELS.find((m) => m.id === id);
        newResults[id] = `### ${model?.name || id} Comparative Analysis:\n\nResponding to benchmark prompt: "${prompt.slice(0, 70)}..."\n\n1. **Core Perspective**: Prioritizes ${
          model?.category === "Reasoning"
            ? "step-by-step rigorous logical proof, mathematical verification, and deep chain-of-thought"
            : model?.category === "Fast"
            ? "low-latency execution, concise synthesis, and rapid throughput"
            : "balanced synthetic reasoning, architectural trade-offs, and multi-faceted evaluation"
        }.\n2. **Practical Solution**: Formulate clean modular abstractions, adhere strictly to design system tokens, and verify edge-case test coverage.\n3. **Conclusion**: Optimal when developer ergonomics and production resilience are balanced.\n\n*Simulated comparative output.*`;
      });

      setResults(newResults);
      setIsComparing(false);
      showToast(`Comparison generated across ${selectedModelIds.length} models`, "success");
    }, 1100);
  };

  const handleToggleModel = (model: AIModel) => {
    if (selectedModelIds.includes(model.id)) {
      if (selectedModelIds.length <= 2) {
        showToast("Keep at least 2 models for comparison", "info");
        return;
      }
      setSelectedModelIds((prev) => prev.filter((id) => id !== model.id));
    } else {
      if (selectedModelIds.length >= 4) {
        showToast("Maximum 4 models can be compared simultaneously", "info");
        return;
      }
      setSelectedModelIds((prev) => [...prev, model.id]);
    }
  };

  const handleRemoveModel = (id: string) => {
    if (selectedModelIds.length <= 2) {
      showToast("Comparison requires at least 2 models", "info");
      return;
    }
    setSelectedModelIds((prev) => prev.filter((m) => m !== id));
  };

  const handleCopy = (id: string, text: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      showToast("Response copied to clipboard!", "success");
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleRegenerate = (id: string) => {
    const model = AI_MODELS.find((m) => m.id === id);
    setResults((prev) => ({
      ...prev,
      [id]: `### ${model?.name || id} (Regenerated):\n\nUpdated alternative reasoning for "${prompt.slice(0, 50)}...":\n\n- Alternative Angle 1: Zero-runtime compilation\n- Alternative Angle 2: Progressive partial hydration\n- Alternative Angle 3: Algorithmic tree pruning\n\n*Regenerated response.*`,
    }));
    showToast(`Regenerated response for ${model?.name}`, "info");
  };

  return (
    <div className="flex flex-col flex-1 h-full min-h-0 bg-[#FAFAFC] dark:bg-[#0E0C15] text-zinc-900 dark:text-zinc-100">
      {/* 1. Responsive Workspace Header */}
      <WorkspaceHeader
        title="Compare AI Models"
        breadcrumbs={[
          { label: "Workspace" },
          { label: "Compare" },
        ]}
        subtitle="Ask one question and see multiple frontier models answer it side-by-side in real time."
        actions={
          <div className="flex items-center gap-2 flex-wrap">
            {/* View Switcher: Compare (Grid) vs Focus Mode */}
            <div className="flex items-center p-1 rounded-xl bg-zinc-100 dark:bg-white/[0.04] border border-zinc-200/80 dark:border-white/[0.06]">
              <button
                type="button"
                onClick={() => setIsFocusMode(false)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  !isFocusMode
                    ? "bg-[#713CF4] text-white shadow-2xs font-semibold"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                }`}
              >
                <Grid className="size-3.5" />
                <span>Compare</span>
              </button>

              <button
                type="button"
                onClick={() => setIsFocusMode(true)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isFocusMode
                    ? "bg-[#713CF4] text-white shadow-2xs font-semibold"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                }`}
              >
                <Maximize2 className="size-3.5" />
                <span>Focus</span>
              </button>
            </div>

            {/* Model Selector Dropdown Popover */}
            <ModelSelector
              multiSelect={true}
              selectedModelIds={selectedModelIds}
              onToggleModel={handleToggleModel}
              triggerLabel={`${selectedModelIds.length} Models ▾`}
              triggerClassName="h-8.5 text-xs font-semibold px-3 rounded-xl border-zinc-200/80 dark:border-white/[0.08]"
              headerTitle="Select Comparison Models"
              maxSelected={4}
              allowProSelection={true}
            />
          </div>
        }
      />

      {/* 2. Secondary Strip: Active Model Chips or Focus Model Tabs */}
      <div className="shrink-0 px-4 sm:px-6 py-2.5 bg-white/60 dark:bg-[#111018]/60 border-b border-zinc-200/60 dark:border-white/[0.06] backdrop-blur-xs flex items-center justify-between gap-3 overflow-x-auto custom-scrollbar">
        {isFocusMode ? (
          /* Focus Mode Model Tabs (Matches Screenshot 3) */
          <div className="flex items-center gap-2 mx-auto sm:mx-0 overflow-x-auto">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 shrink-0 mr-1 hidden sm:inline">
              Focus Model:
            </span>
            {selectedModelIds.map((id) => {
              const model = AI_MODELS.find((m) => m.id === id);
              const isSelected = focusedModelId === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setFocusedModelId(id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer border ${
                    isSelected
                      ? "border-[#713CF4] bg-[#713CF4]/10 dark:bg-[#713CF4]/20 text-[#713CF4] dark:text-[#c4b5fd] font-semibold shadow-2xs"
                      : "border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-[#161520] text-zinc-600 dark:text-zinc-400 hover:border-zinc-300"
                  }`}
                >
                  <span>{model?.name || id}</span>
                  {model?.isPro && (
                    <span className="text-[9px] px-1 py-0.2 rounded bg-[#713CF4]/15 text-[#713CF4] dark:text-[#c4b5fd] font-semibold">
                      PRO
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ) : (
          /* Normal Compare Mode: Selected Model Chips Only */
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 shrink-0 mr-1">
              Active:
            </span>
            {selectedModelIds.map((id) => {
              const model = AI_MODELS.find((m) => m.id === id);
              return (
                <div
                  key={id}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-white dark:bg-[#161520] border border-zinc-200/80 dark:border-white/[0.08] text-zinc-800 dark:text-zinc-200 shadow-2xs group"
                >
                  <span>{model?.name || id}</span>
                  {model?.isPro && (
                    <span className="text-[9px] px-1 py-0.2 rounded bg-purple-50 dark:bg-purple-950/50 text-[#713CF4] dark:text-[#c4b5fd] font-semibold">
                      PRO
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveModel(id)}
                    className="size-4 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-rose-500 flex items-center justify-center transition-colors cursor-pointer"
                    title={`Remove ${model?.name || id}`}
                  >
                    <X className="size-3" />
                  </button>
                </div>
              );
            })}

            {/* Quick Add Model Dropdown Button */}
            {selectedModelIds.length < 4 && (
              <ModelSelector
                multiSelect={true}
                selectedModelIds={selectedModelIds}
                onToggleModel={handleToggleModel}
                triggerLabel="+ Add Model"
                triggerIcon={<Plus className="size-3 text-zinc-400" />}
                triggerClassName="h-7 text-xs px-2 rounded-lg border-dashed"
                align="left"
                maxSelected={4}
                allowProSelection={true}
              />
            )}
          </div>
        )}

        {/* Right Info Note */}
        <span className="text-[11px] text-zinc-400 dark:text-zinc-500 shrink-0 hidden md:inline">
          {selectedModelIds.length} of 4 models in comparison
        </span>
      </div>

      {/* 3. Main Workspace Scrollable Body */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 lg:p-7">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Centered / Focused Prompt Card (Matches Screenshots 2 & 3) */}
          <div className="rounded-2xl border border-zinc-200/90 dark:border-white/[0.08] bg-white dark:bg-[#121118] p-4 sm:p-5 shadow-xs space-y-3 focus-within:border-[#713CF4]/60 focus-within:ring-2 focus-within:ring-[#713CF4]/15 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Message {selectedModelIds.length} Models
              </span>

              {/* Benchmark Ideas Popover */}
              <div className="relative" ref={benchmarkRef}>
                <button
                  type="button"
                  onClick={() => setShowBenchmarkPopover(!showBenchmarkPopover)}
                  className="inline-flex items-center gap-1.5 text-xs text-[#713CF4] dark:text-[#a78bfa] hover:underline font-medium cursor-pointer"
                >
                  <Lightbulb className="size-3" />
                  <span>Try benchmark</span>
                  <ChevronDown className="size-3" />
                </button>

                {showBenchmarkPopover && (
                  <div className="absolute right-0 top-full mt-1.5 w-76 sm:w-88 rounded-xl border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-[#1b1926] shadow-xl p-2 z-30 animate-in fade-in zoom-in-95">
                    <div className="text-[10.5px] font-semibold uppercase tracking-wider text-zinc-400 px-2 py-1">
                      Curated Benchmarks
                    </div>
                    <div className="space-y-1 mt-1">
                      {SAMPLE_BENCHMARKS.map((b, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            setPrompt(b);
                            setShowBenchmarkPopover(false);
                          }}
                          className="w-full text-left p-2 rounded-lg text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/[0.06] transition-colors leading-relaxed line-clamp-2 cursor-pointer"
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Prompt Textarea */}
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask one question and see how multiple models answer it..."
              rows={3}
              className="w-full resize-none text-[13.5px] bg-transparent text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none leading-relaxed"
            />

            {/* Prompt Card Bottom Bar */}
            <div className="pt-2.5 border-t border-zinc-100 dark:border-white/[0.06] flex items-center justify-between gap-3 flex-wrap">
              <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
                5 of 5 comparisons left today · resets in a day · upgrade for unlimited
              </span>

              <Button
                variant="primary"
                size="sm"
                onClick={handleCompare}
                isLoading={isComparing}
                disabled={!prompt.trim()}
                className="h-8.5 px-4 text-xs font-semibold shadow-xs"
                rightIcon={<ArrowRight className="size-3.5" />}
              >
                Compare
              </Button>
            </div>
          </div>

          {/* 4. Results Section: Focus Mode OR Grid Comparison Mode */}
          {isFocusMode ? (
            /* FOCUS MODE: Large, Distraction-Free Reader */
            (() => {
              const model = AI_MODELS.find((m) => m.id === focusedModelId);
              const response = results[focusedModelId];
              const isBest = bestModelId === focusedModelId;

              return (
                <div className="rounded-2xl border border-zinc-200/90 dark:border-white/[0.08] bg-white dark:bg-[#121118] overflow-hidden shadow-sm animate-in fade-in duration-150">
                  {/* Focus Header */}
                  <div className="p-4 sm:p-5 border-b border-zinc-100 dark:border-white/[0.06] flex items-center justify-between gap-3 flex-wrap bg-zinc-50/50 dark:bg-white/[0.01]">
                    <div className="flex items-center gap-2.5">
                      <div className="size-8 rounded-xl bg-[#713CF4]/10 dark:bg-[#713CF4]/20 text-[#713CF4] dark:text-[#a78bfa] flex items-center justify-center font-bold text-xs">
                        {model?.name?.charAt(0) || "AI"}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                            {model?.name || focusedModelId}
                          </h3>
                          <Badge variant="outline" size="sm">
                            {model?.provider}
                          </Badge>
                          {model?.isPro && <Badge variant="pro" size="sm">PRO</Badge>}
                          {isBest && (
                            <span className="text-[10.5px] font-semibold text-[#713CF4] bg-[#713CF4]/10 dark:bg-[#713CF4]/20 px-2 py-0.5 rounded-full">
                              ★ Top Pick
                            </span>
                          )}
                        </div>
                        <p className="text-[11.5px] text-zinc-400 dark:text-zinc-500 mt-0.5">
                          {model?.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setBestModelId(focusedModelId);
                          showToast(`Voted ${model?.name} as Best Answer!`, "success");
                        }}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                          isBest
                            ? "bg-[#713CF4]/15 text-[#713CF4] font-semibold"
                            : "bg-zinc-100 dark:bg-white/[0.04] text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
                        }`}
                      >
                        <ThumbsUp className="size-3.5" />
                        <span>{isBest ? "Best Pick" : "Vote Best"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleCopy(focusedModelId, response || "")}
                        className="p-2 rounded-lg bg-zinc-100 dark:bg-white/[0.04] hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors cursor-pointer"
                        title="Copy Response"
                      >
                        {copiedId === focusedModelId ? (
                          <Check className="size-4 text-emerald-500" />
                        ) : (
                          <Copy className="size-4" />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleRegenerate(focusedModelId)}
                        disabled={isComparing}
                        className="p-2 rounded-lg bg-zinc-100 dark:bg-white/[0.04] hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors cursor-pointer"
                        title="Regenerate"
                      >
                        <RotateCcw
                          className={`size-4 ${isComparing ? "animate-spin" : ""}`}
                        />
                      </button>

                      <Button
                        variant="outline"
                        size="xs"
                        onClick={() => setIsFocusMode(false)}
                        className="h-8 text-xs font-medium ml-1"
                        leftIcon={<Grid className="size-3.5" />}
                      >
                        Exit Focus
                      </Button>
                    </div>
                  </div>

                  {/* Focus Response Content */}
                  <div className="p-6 sm:p-8 text-[14px] leading-relaxed text-zinc-800 dark:text-zinc-200 min-h-[300px] max-w-4xl mx-auto">
                    {isComparing ? (
                      <div className="space-y-3 py-6 animate-pulse">
                        <div className="h-5 bg-zinc-200 dark:bg-zinc-800 rounded-md w-3/4" />
                        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-full" />
                        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-5/6" />
                        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-2/3" />
                      </div>
                    ) : response ? (
                      <div className="whitespace-pre-wrap space-y-3">{response}</div>
                    ) : (
                      <div className="text-center py-12 text-zinc-400">
                        Click Compare above to generate benchmark responses.
                      </div>
                    )}
                  </div>

                  {/* Focus Metadata Footer */}
                  <div className="px-6 py-3 bg-zinc-50/70 dark:bg-white/[0.02] border-t border-zinc-100 dark:border-white/[0.06] flex items-center justify-between text-xs text-zinc-400">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Clock className="size-3.5" />
                        Latency: 380ms
                      </span>
                      <span className="flex items-center gap-1">
                        <Coins className="size-3.5" />
                        Context: {model?.contextWindow || "64K"}
                      </span>
                    </div>
                    <span>EchoGPT Model Benchmarking</span>
                  </div>
                </div>
              );
            })()
          ) : (
            /* GRID COMPARE MODE: Clean Side-by-Side Reading Columns */
            <div
              className={`grid gap-4 sm:gap-5 ${
                selectedModelIds.length === 2
                  ? "grid-cols-1 md:grid-cols-2"
                  : selectedModelIds.length === 3
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
              }`}
            >
              {selectedModelIds.map((id) => {
                const model = AI_MODELS.find((m) => m.id === id);
                const response = results[id];
                const isBest = bestModelId === id;

                return (
                  <div
                    key={id}
                    className={`flex flex-col rounded-2xl border transition-all duration-150 overflow-hidden shadow-xs ${
                      isBest
                        ? "border-[#713CF4]/60 ring-1 ring-[#713CF4]/20 bg-white dark:bg-[#121118]"
                        : "border-zinc-200/90 dark:border-white/[0.08] bg-white dark:bg-[#121118]"
                    }`}
                  >
                    {/* Model Card Header */}
                    <div className="flex items-center justify-between p-3.5 border-b border-zinc-100 dark:border-white/[0.06] shrink-0">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-[13px] font-bold text-zinc-900 dark:text-zinc-100 truncate">
                          {model?.name || id}
                        </span>
                        <span className="text-[9.5px] px-1.5 py-0.2 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 font-medium">
                          {model?.provider}
                        </span>
                        {model?.isPro && (
                          <Badge variant="pro" size="sm">
                            PRO
                          </Badge>
                        )}
                        {isBest && (
                          <span className="text-[9.5px] font-semibold text-[#713CF4] bg-[#713CF4]/10 dark:bg-[#713CF4]/20 px-1.5 py-0.2 rounded-full">
                            ★ Top Pick
                          </span>
                        )}
                      </div>

                      {/* Focus Icon Action */}
                      <button
                        type="button"
                        onClick={() => {
                          setFocusedModelId(id);
                          setIsFocusMode(true);
                        }}
                        className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                        title="Focus on this model"
                      >
                        <Maximize2 className="size-3.5" />
                      </button>
                    </div>

                    {/* Model Response Body */}
                    <div className="flex-1 p-4 overflow-y-auto custom-scrollbar text-[12.5px] leading-relaxed text-zinc-700 dark:text-zinc-300 min-h-[220px]">
                      {isComparing ? (
                        <div className="space-y-2.5 py-2 animate-pulse">
                          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-3/4" />
                          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-full" />
                          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-5/6" />
                          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-2/3" />
                        </div>
                      ) : response ? (
                        <div className="whitespace-pre-wrap">{response}</div>
                      ) : (
                        <div className="flex items-center justify-center h-full text-zinc-400 text-xs">
                          Click Compare to generate.
                        </div>
                      )}
                    </div>

                    {/* Model Card Footer */}
                    <div className="flex items-center justify-between px-3.5 py-2 border-t border-zinc-100 dark:border-white/[0.06] shrink-0 text-xs bg-zinc-50/50 dark:bg-white/[0.01]">
                      <button
                        type="button"
                        onClick={() => {
                          setBestModelId(id);
                          showToast(`Voted ${model?.name || id} as Best Answer!`, "success");
                        }}
                        className={`inline-flex items-center gap-1.5 px-2 py-0.8 rounded-md transition-colors cursor-pointer ${
                          isBest
                            ? "bg-[#713CF4]/10 text-[#713CF4] font-semibold"
                            : "text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
                        }`}
                        title="Vote as best output"
                      >
                        <ThumbsUp className="size-3" />
                        <span className="text-[11px]">
                          {isBest ? "Best Pick" : "Vote Best"}
                        </span>
                      </button>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleRegenerate(id)}
                          disabled={isComparing}
                          className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer disabled:opacity-40"
                          title="Regenerate"
                        >
                          <RotateCcw
                            className={`size-3.5 ${
                              isComparing ? "animate-spin" : ""
                            }`}
                          />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleCopy(id, response || "")}
                          className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                          title="Copy response"
                        >
                          {copiedId === id ? (
                            <Check className="size-3.5 text-emerald-500" />
                          ) : (
                            <Copy className="size-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
