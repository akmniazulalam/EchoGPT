"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AI_MODELS } from "@/config/models";
import { ModelLogo } from "@/components/ui/ModelLogo";
import { Badge } from "@/components/ui/Badge";

type FilterTier = "all" | "Flagship" | "Reasoning" | "Fast" | "Open Source";

// Curated selection of representative models from our actual catalog
const SHOWCASE_MODEL_IDS = [
  "echogpt",
  "gpt-5",
  "claude-4-sonnet",
  "gemini-2-5-pro",
  "gemini-flash-2-0",
  "o3",
  "deepseek-v3",
  "deepseek-r1",
  "llama-3-3-70b",
  "glm-5-3-flash",
  "mistral-pro",
  "qwen-3-235b",
];

export function LandingModelsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterTier>("all");
  const [selectedModelId, setSelectedModelId] = useState<string>("gpt-5");

  const modelsToDisplay = AI_MODELS.filter((m) =>
    SHOWCASE_MODEL_IDS.includes(m.id)
  ).filter((m) => (activeFilter === "all" ? true : m.category === activeFilter));

  const currentModel = AI_MODELS.find((m) => m.id === selectedModelId) || AI_MODELS[0];

  return (
    <section id="models" className="py-20 sm:py-28 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#713CF4] dark:text-[#a78bfa]">
            Multi-Model Intelligence
          </p>
          <h2 className="text-2xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Choose the right model for the job
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed">
            Different models excel at different tasks. EchoGPT lets you switch between
            frontier reasoning, multimodal synthesis, and open-source models mid-workflow.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: "all", label: "All Frontiers" },
            { id: "Flagship", label: "Flagship" },
            { id: "Reasoning", label: "Deep Reasoning" },
            { id: "Fast", label: "Fast & Lightweight" },
            { id: "Open Source", label: "Open Architecture" },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveFilter(cat.id as FilterTier)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                activeFilter === cat.id
                  ? "bg-[#713CF4] text-white shadow-xs"
                  : "bg-zinc-100 hover:bg-zinc-200/70 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Model Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
          {modelsToDisplay.map((model) => {
            const isSelected = selectedModelId === model.id;
            return (
              <div
                key={model.id}
                onClick={() => setSelectedModelId(model.id)}
                className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-3 group ${
                  isSelected
                    ? "bg-[#713CF4]/6 dark:bg-[#713CF4]/12 border-[#713CF4]/40 shadow-xs ring-1 ring-[#713CF4]/30"
                    : "bg-white dark:bg-[#12111A] border-zinc-200/80 dark:border-white/8 hover:border-[#713CF4]/30 dark:hover:border-[#713CF4]/30 hover:shadow-md hover:shadow-[#713CF4]/5 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 hover:bg-zinc-50/60 dark:hover:bg-white/[0.03]"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <ModelLogo
                      modelId={model.id}
                      provider={model.provider}
                      name={model.name}
                      size="sm"
                    />
                    <div className="flex items-center gap-1.5">
                      {model.isPro ? (
                        <Badge variant="pro" size="sm">
                          PRO
                        </Badge>
                      ) : (
                        <span className="text-[10px] font-semibold px-2 py-0.2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          Free
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate group-hover:text-[#713CF4] dark:group-hover:text-[#a78bfa] transition-colors">
                      {model.name}
                    </h3>
                    <p className="text-[11px] text-zinc-400 dark:text-zinc-500 font-mono">
                      {model.provider} · {model.category}
                    </p>
                  </div>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-snug font-normal">
                    {model.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-zinc-100 dark:border-white/[0.06] flex items-center justify-between text-[11px] text-zinc-400">
                  <span>Context: {model.contextWindow || "128K"}</span>
                  <span className="text-[#713CF4] dark:text-[#a78bfa] font-semibold text-[10.5px]">
                    {isSelected ? "Selected" : "Select model"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Model Deep Dive Bar */}
        <div className="rounded-2xl border border-zinc-200 dark:border-white/[0.1] bg-zinc-50/80 dark:bg-white/[0.02] p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <ModelLogo
              modelId={currentModel.id}
              provider={currentModel.provider}
              name={currentModel.name}
              size="md"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                  {currentModel.name}
                </span>
                <span className="text-xs text-zinc-400 font-mono">
                  by {currentModel.provider}
                </span>
                {currentModel.isPro ? (
                  <Badge variant="pro" size="sm">
                    PRO
                  </Badge>
                ) : (
                  <span className="text-[10px] font-semibold px-2 py-0.2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    Free Tier
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                {currentModel.description}
              </p>
            </div>
          </div>

          <Link
            href="/chat"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#713CF4] hover:bg-[#602ee0] text-white text-xs font-semibold shrink-0 transition-colors shadow-xs"
          >
            <span>Chat with {currentModel.name}</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
