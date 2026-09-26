"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight } from "lucide-react";
import { AIModel, AI_MODELS } from "@/config/models";
import { ModelLogo } from "@/components/ui/ModelLogo";
import { Badge } from "@/components/ui/Badge";
import { WorkspaceHeader } from "@/components/workspace/WorkspaceHeader";
import { saveSelectedModel } from "@/lib/chatStorage";
import { showToast } from "@/components/ui/Toast";
import { useUpgradeModal } from "@/context/UpgradeModalContext";

export function StoreWorkspace() {
  const router = useRouter();
  const { openUpgradeModal, isProUser } = useUpgradeModal();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All Apps");

  // Filtered models list
  const filteredModels = useMemo(() => {
    return AI_MODELS.filter((model) => {
      // Category filter
      if (selectedCategory !== "All Apps") {
        if (selectedCategory === "Fast" && model.category !== "Fast") return false;
        if (selectedCategory === "Flagship" && model.category !== "Flagship") return false;
        if (selectedCategory === "Reasoning" && model.category !== "Reasoning") return false;
        if (selectedCategory === "Open Source" && model.category !== "Open Source") return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = model.name.toLowerCase().includes(q);
        const matchesDesc = model.description.toLowerCase().includes(q);
        const matchesProvider = model.provider.toLowerCase().includes(q);
        const matchesCategory = model.category.toLowerCase().includes(q);
        return matchesName || matchesDesc || matchesProvider || matchesCategory;
      }

      return true;
    });
  }, [searchQuery, selectedCategory]);

  // Handle "Try App" action:
  // - PRO models for Free users: blocked by UpgradeProModal (Section 6 & 9)
  // - Free models / Pro users: starts fresh chat with selected model
  const handleTryApp = React.useCallback(
    (model: AIModel) => {
      if (model.isPro && !isProUser) {
        openUpgradeModal(
          `${model.name} is an EchoGPT Pro model. Upgrade to access frontier AI reasoning.`
        );
        return;
      }

      saveSelectedModel(model.id);
      showToast(`Started new chat with ${model.name}`, "success");
      router.push(`/chat?model=${encodeURIComponent(model.id)}&new=1`);
    },
    [isProUser, openUpgradeModal, router]
  );

  return (
    <div className="flex flex-col flex-1 h-full min-h-0 bg-[#FAFAFC] dark:bg-[#0E0C15] text-zinc-900 dark:text-zinc-100 font-lexend">
      {/* 1. Header */}
      <WorkspaceHeader
        title="Store"
        breadcrumbs={[{ label: "Workspace" }, { label: "Store" }]}
        subtitle="Discover, compare, and try specialized AI models and intelligence engines"
        actions={
          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">
              {AI_MODELS.length}
            </span>
            <span>Total Models</span>
          </div>
        }
      />

      {/* 2. Scrollable Catalog Canvas */}
      <div className="flex-1 overflow-y-auto min-h-0 custom-scrollbar p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto space-y-8 pb-12">
          {/* Hero Section (Matching EchoGPT Store Screenshot) */}
          <div className="text-center space-y-3 pt-2 sm:pt-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
              EchoGPT Store
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto font-normal leading-relaxed">
              Discover and create customized versions of EchoGPT that combine instructions,
              extra knowledge, and any combination of skills.
            </p>
          </div>

          {/* Search Bar & Filter Strip */}
          <div className="max-w-xl mx-auto space-y-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-zinc-400 dark:text-zinc-500 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for the Apps..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#121319] text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 shadow-2xs outline-none focus:border-[#713CF4] focus:ring-2 focus:ring-[#713CF4]/20 transition-all font-normal"
                aria-label="Search for apps or AI models"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                  aria-label="Clear search query"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
              {["All Apps", "Fast", "Flagship", "Reasoning", "Open Source"].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-[#713CF4] ${
                    selectedCategory === cat
                      ? "bg-[#713CF4] text-white shadow-2xs"
                      : "bg-white dark:bg-[#111217] border border-zinc-200/80 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Model Cards Grid (3 Columns on Desktop, matching screenshot) */}
          {filteredModels.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {filteredModels.map((model) => (
                <div
                  key={model.id}
                  className="group flex flex-col justify-between p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#111217] hover:border-[#713CF4]/40 hover:shadow-md transition-all duration-200"
                >
                  <div className="space-y-3">
                    {/* Top Row: Model Logo + Try App CTA */}
                    <div className="flex items-start justify-between gap-3">
                      <ModelLogo
                        modelId={model.id}
                        provider={model.provider}
                        name={model.name}
                        size="lg"
                      />

                      <button
                        type="button"
                        onClick={() => handleTryApp(model)}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold bg-[#713CF4]/10 hover:bg-[#713CF4] text-[#713CF4] hover:text-white transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] shadow-2xs"
                        aria-label={`Try ${model.name} app in New Chat`}
                      >
                        <span>Try App</span>
                        <ArrowRight className="size-3" />
                      </button>
                    </div>

                    {/* Model Title & Badges */}
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-[#713CF4] dark:group-hover:text-[#a78bfa] transition-colors">
                          {model.name}
                        </h3>

                        {model.isPro && (
                          <Badge variant="pro" size="sm">
                            PRO
                          </Badge>
                        )}

                        {model.badge && !model.isPro && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                            {model.badge}
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5">
                        {model.provider} · {model.category}
                        {model.contextWindow && ` · ${model.contextWindow} context`}
                      </p>
                    </div>

                    {/* Model Description */}
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal line-clamp-3">
                      {model.description}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-3 mt-4 border-t border-zinc-100 dark:border-zinc-850 flex items-center justify-between text-[11px] text-zinc-400">
                    <span>Direct conversational access</span>
                    <button
                      type="button"
                      onClick={() => handleTryApp(model)}
                      className="text-[#713CF4] dark:text-[#a78bfa] font-medium hover:underline cursor-pointer"
                    >
                      Open in Chat →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="py-16 text-center space-y-3 max-w-sm mx-auto">
              <div className="size-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 flex items-center justify-center mx-auto">
                <Search className="size-6" />
              </div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                No matching apps found
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                We couldn&apos;t find any model or app matching &ldquo;{searchQuery}&rdquo;. Try
                searching with a different term or clear your filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Apps");
                }}
                className="px-4 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
