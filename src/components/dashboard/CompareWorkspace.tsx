"use client";

import React, { useState } from "react";
import {
  Check,
  Plus,
  X,
} from "lucide-react";
import { WorkspaceHeader } from "@/components/workspace/WorkspaceHeader";
import { CompareToolbar } from "@/components/compare/CompareToolbar";
import { ComparePanel } from "@/components/compare/ComparePanel";
import { showToast } from "@/components/ui/Toast";
import { AI_MODELS } from "@/config/models";

const DEFAULT_COMPARE_MODELS = ["echogpt", "gpt-4o", "claude-4-sonnet"];

const INITIAL_RESPONSES: Record<string, string> = {
  echogpt:
    "### EchoGPT Native Synthesis:\n\nFor optimizing frontend bundle sizes:\n1. **Route-based Code Splitting**: Leverage Next.js dynamic imports (`next/dynamic`) for non-critical modals and charts.\n2. **Package Optimization**: Audit barrel files (`lucide-react`, `lodash`) to ensure tree-shaking works seamlessly.\n3. **Modern CSS**: Tailwind v4 with lightning-fast CSS-first compiling eliminates large runtime stylesheets.\n\n*Latency: 280ms • Tokens: 380 tokens*",
  "gpt-4o":
    "### GPT-4o Comparative Breakdown:\n\nFrontend bundle optimization strategies:\n- **Tree-Shaking & Dead Code Elimination**: Use Webpack/Turbopack bundle visualizers to find duplicate transitive packages.\n- **Font Optimization**: Self-host Lexend with subsetting (`latin` only) using `next/font` for zero layout shifts.\n- **Dynamic Hydration**: Keep interactive client components at the leaves of the render tree.\n\n*Latency: 410ms • Tokens: 420 tokens*",
  "claude-4-sonnet":
    "### Claude 4 Sonnet Nuanced Evaluation:\n\nFrom an architectural perspective, bundle size is only half the battle—Total Blocking Time (TBT) matters more:\n- **Client State Pruning**: Avoid hoisting local state into top-level context providers, which causes cascading re-renders.\n- **Zero-Dependency Patterns**: Use browser-native APIs (`useSyncExternalStore`, `Web Share`, `ResizeObserver`) instead of npm micro-libraries.\n- **Image Format Strategy**: Next.js `<Image />` component with AVIF/WebP ensures sub-50KB visual assets.\n\n*Latency: 520ms • Tokens: 512 tokens*",
  "deepseek-r1":
    "### DeepSeek R1 Chain-of-Thought Audit:\n\n<thought>\nAnalyzing critical bottlenecks in Next.js App Router applications...\n1. Hydration boundary overhead\n2. Font weight payload\n3. Client bundle inclusion\n</thought>\n\n**Actionable Recommendations:**\n1. Ensure Server Components remain the default for metadata and static layouts.\n2. Move heavy formatters to server actions or build-time compute.\n3. Enforce sub-150KB initial JS budget per route in CI/CD.\n\n*Latency: 780ms • Tokens: 640 tokens*",
};

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
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [focusedModelId, setFocusedModelId] = useState<string | null>(null);

  const samplePrompts = [
    "Explain recursion vs iteration with a visual analogy",
    "Write a TypeScript debounce function with immediate execution option",
    "Compare microservices vs monolithic architecture for a growing startup",
  ];

  const handleCompare = () => {
    if (!prompt.trim() || isComparing) return;
    setIsComparing(true);

    setTimeout(() => {
      const newResults: Record<string, string> = {};
      selectedModelIds.forEach((id) => {
        const model = AI_MODELS.find((m) => m.id === id);
        newResults[id] = `### ${model?.name || id} Response:\n\nHere is the comparative analysis for: "${prompt.slice(0, 60)}..."\n\n1. **Core Philosophy**: Prioritizes ${
          model?.category === "Reasoning"
            ? "rigorous multi-step proof and verification"
            : model?.category === "Fast"
            ? "low-latency execution and high throughput"
            : "balanced synthetic reasoning and nuanced formatting"
        }.\n2. **Recommendation**: Implement deliberate component modularity, strict design token compliance, and automated responsive tests.\n\n*Simulated comparative output.*`;
      });

      setResults(newResults);
      setIsComparing(false);
      showToast(`Compared across ${selectedModelIds.length} models`, "success");
    }, 1100);
  };

  const handleCopy = (id: string, text: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      showToast("Model response copied!", "success");
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleRegenerate = (id: string) => {
    const model = AI_MODELS.find((m) => m.id === id);
    setResults((prev) => ({
      ...prev,
      [id]: `### ${model?.name} (Regenerated):\n\nUpdated alternative reasoning for "${prompt.slice(0, 50)}...":\n\n- Alternative Angle 1: Zero-runtime architecture\n- Alternative Angle 2: Progressive progressive hydration\n\n*Regenerated response.*`,
    }));
    showToast(`Regenerated ${model?.name}`, "info");
  };

  const toggleModel = (id: string) => {
    if (selectedModelIds.includes(id)) {
      if (selectedModelIds.length <= 2) {
        showToast("Keep at least 2 models for comparison", "info");
        return;
      }
      setSelectedModelIds((prev) => prev.filter((m) => m !== id));
      if (focusedModelId === id) setFocusedModelId(null);
    } else {
      if (selectedModelIds.length >= 4) {
        showToast("Maximum 4 models in comparison view", "info");
        return;
      }
      setSelectedModelIds((prev) => [...prev, id]);
    }
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
        subtitle="Benchmark multiple AI models side-by-side on the exact same prompt"
        actions={
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-zinc-400 font-medium mr-1 hidden sm:inline">
              Active Models:
            </span>
            {selectedModelIds.map((id) => {
              const model = AI_MODELS.find((m) => m.id === id);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggleModel(id)}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium bg-[#713CF4]/10 dark:bg-[#713CF4]/20 text-[#713CF4] dark:text-[#a78bfa] border border-[#713CF4]/25 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-colors cursor-pointer"
                  title="Remove from comparison"
                >
                  <span>{model?.name || id}</span>
                  <X className="size-3" />
                </button>
              );
            })}
          </div>
        }
      />

      {/* 2. Compare Prompt & Focus Mode Toolbar */}
      <CompareToolbar
        prompt={prompt}
        onPromptChange={setPrompt}
        onCompare={handleCompare}
        isComparing={isComparing}
        isFocusMode={isFocusMode}
        onToggleFocusMode={() => {
          setIsFocusMode(!isFocusMode);
          if (!isFocusMode && !focusedModelId) {
            setFocusedModelId(bestModelId || selectedModelIds[0]);
          }
        }}
        modelCount={selectedModelIds.length}
      />

      {/* 3. Model Selector Chips */}
      <div className="shrink-0 px-4 sm:px-6 py-2 border-b border-zinc-200/60 dark:border-zinc-800/60 bg-white/40 dark:bg-[#111217]/40 flex items-center gap-2 overflow-x-auto custom-scrollbar">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 shrink-0">
          Available Models:
        </span>
        {AI_MODELS.slice(0, 8).map((m) => {
          const isSelected = selectedModelIds.includes(m.id);
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => toggleModel(m.id)}
              className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-all cursor-pointer outline-none ${
                isSelected
                  ? "bg-[#713CF4] text-white border-[#713CF4] shadow-2xs"
                  : "bg-white dark:bg-[#161720] border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300"
              }`}
            >
              {isSelected ? (
                <Check className="size-3" />
              ) : (
                <Plus className="size-3 text-zinc-400" />
              )}
              <span>{m.name}</span>
              {m.isPro && (
                <span className="text-[9px] px-1 py-0.2 rounded bg-white/20 text-white font-semibold">
                  PRO
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 4. Side-by-Side Comparison Panels */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 lg:p-7">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Quick Prompts Bar */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] text-zinc-400 font-medium">Try benchmark:</span>
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setPrompt(p)}
                className="text-xs px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-750 text-zinc-600 dark:text-zinc-300 transition-colors line-clamp-1 cursor-pointer"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Grid of Compare Panels */}
          <div
            className={`grid gap-4 sm:gap-5 ${
              isFocusMode
                ? "grid-cols-1"
                : selectedModelIds.length === 2
                ? "grid-cols-1 md:grid-cols-2"
                : selectedModelIds.length === 3
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
            }`}
          >
            {selectedModelIds
              .filter((id) => !isFocusMode || id === focusedModelId)
              .map((id) => {
                const model = AI_MODELS.find((m) => m.id === id);
                const response = results[id];
                const isBest = bestModelId === id;
                const isFocused = focusedModelId === id;

                return (
                  <ComparePanel
                    key={id}
                    modelId={id}
                    modelName={model?.name || id}
                    provider={model?.provider || "AI"}
                    isPro={model?.isPro}
                    latency={
                      id === "echogpt"
                        ? "280ms"
                        : id === "gpt-4o"
                        ? "410ms"
                        : id === "claude-4-sonnet"
                        ? "520ms"
                        : "780ms"
                    }
                    tokens={
                      id === "echogpt"
                        ? "380 tokens"
                        : id === "gpt-4o"
                        ? "420 tokens"
                        : id === "claude-4-sonnet"
                        ? "512 tokens"
                        : "640 tokens"
                    }
                    response={response}
                    isLoading={isComparing}
                    isBest={isBest}
                    onVoteBest={() => {
                      setBestModelId(id);
                      showToast(`Voted ${model?.name || id} as Best Answer!`, "success");
                    }}
                    onCopy={() => handleCopy(id, response || "")}
                    isCopied={copiedId === id}
                    onRegenerate={() => handleRegenerate(id)}
                    onFocus={() => {
                      if (isFocusMode && focusedModelId === id) {
                        setIsFocusMode(false);
                      } else {
                        setIsFocusMode(true);
                        setFocusedModelId(id);
                      }
                    }}
                    isFocused={isFocused}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
