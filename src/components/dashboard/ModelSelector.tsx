"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  ChevronDown,
  Check,
  Search,
  SlidersHorizontal,
  Sparkles,
  Lock,
} from "lucide-react";
import { AIModel, AI_MODELS } from "@/config/models";
import { Badge } from "@/components/ui/Badge";
import { useUpgradeModal } from "@/context/UpgradeModalContext";

export interface ModelSelectorProps {
  // Single-select mode (default)
  selectedModelId?: string;
  onSelectModel?: (model: AIModel) => void;

  // Multi-select mode (for Compare)
  multiSelect?: boolean;
  selectedModelIds?: string[];
  onToggleModel?: (model: AIModel) => void;
  maxSelected?: number;

  // Models catalog (defaults to AI_MODELS, can pass IMAGE_MODELS)
  models?: AIModel[];

  // Customization
  triggerLabel?: string;
  triggerIcon?: React.ReactNode;
  triggerClassName?: string;
  className?: string;
  align?: "left" | "right";
  headerTitle?: string;
  allowProSelection?: boolean;
  groupByTier?: boolean;
}

export function ModelSelector({
  selectedModelId,
  onSelectModel,
  multiSelect = false,
  selectedModelIds = [],
  onToggleModel,
  maxSelected = 4,
  models = AI_MODELS,
  triggerLabel,
  triggerIcon,
  triggerClassName = "",
  className = "",
  align = "right",
  headerTitle,
  allowProSelection = false,
  groupByTier = false,
}: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [tierFilter, setTierFilter] = useState<"all" | "free" | "pro">("all");
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { openUpgradeModal } = useUpgradeModal();

  const selectedModel = useMemo(() => {
    return models.find((m) => m.id === selectedModelId) || models[0];
  }, [models, selectedModelId]);

  // Focus search input on open
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => searchInputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery("");
        setTierFilter("all");
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        setSearchQuery("");
        setTierFilter("all");
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Check if both free and pro models exist
  const hasBothTiers = useMemo(() => {
    const hasFree = models.some((m) => !m.isPro);
    const hasPro = models.some((m) => m.isPro);
    return hasFree && hasPro;
  }, [models]);

  // Filtered models
  const filteredModels = useMemo(() => {
    let result = models;
    if (tierFilter === "free") {
      result = result.filter((m) => !m.isPro);
    } else if (tierFilter === "pro") {
      result = result.filter((m) => m.isPro);
    }
    if (!searchQuery.trim()) return result;
    const q = searchQuery.toLowerCase();
    return result.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.provider.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q)
    );
  }, [models, searchQuery, tierFilter]);

  // Group by category or tier
  const categories = useMemo(() => {
    const map = new Map<string, AIModel[]>();
    for (const model of filteredModels) {
      const cat = groupByTier
        ? model.isPro
          ? "Pro Models (Frontier)"
          : "Free Models (Included)"
        : model.category;
      if (!map.has(cat)) {
        map.set(cat, []);
      }
      map.get(cat)!.push(model);
    }
    return Array.from(map.entries());
  }, [filteredModels, groupByTier]);

  const handleItemClick = (model: AIModel) => {
    if (multiSelect) {
      if (model.isPro && !allowProSelection) {
        openUpgradeModal(
          `${model.name} is an EchoGPT Pro model. Upgrade to include frontier models in your comparison.`
        );
        return;
      }
      onToggleModel?.(model);
    } else {
      if (model.isPro && !allowProSelection) {
        openUpgradeModal(
          `${model.name} is an EchoGPT Pro model. Upgrade to access frontier AI reasoning.`
        );
        setIsOpen(false);
        setSearchQuery("");
        return;
      }
      onSelectModel?.(model);
      setIsOpen(false);
      setSearchQuery("");
    }
  };

  const isModelSelected = (id: string) => {
    if (multiSelect) {
      return selectedModelIds.includes(id);
    }
    return selectedModelId === id;
  };

  return (
    <div
      className={`relative inline-block text-left ${className}`}
      ref={containerRef}
    >
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#1b1725] text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors shadow-2xs outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] cursor-pointer ${triggerClassName}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {triggerIcon || (
          <SlidersHorizontal className="size-3.5 text-zinc-400 dark:text-zinc-500 shrink-0" />
        )}

        <span className="truncate max-w-36 sm:max-w-48">
          {triggerLabel ? (
            triggerLabel
          ) : multiSelect ? (
            `${selectedModelIds.length} Models Selected`
          ) : (
            selectedModel.name
          )}
        </span>

        {!multiSelect && selectedModel.isPro && (
          <Badge variant="pro" size="sm" className="hidden sm:inline-flex">
            PRO
          </Badge>
        )}

        <ChevronDown
          className={`size-3 text-zinc-400 transition-transform duration-150 shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Popover */}
      {isOpen && (
        <div
          role="listbox"
          aria-label={headerTitle || "Available AI models"}
          className={`absolute ${
            align === "left" ? "left-0" : "right-0"
          } top-full mt-1.5 w-80 sm:w-92 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#1b1725] shadow-2xl p-2 z-50 focus:outline-none animate-in fade-in-50 zoom-in-95 duration-100`}
        >
          {/* Header & Search */}
          <div className="p-1.5 space-y-2 border-b border-zinc-100 dark:border-zinc-850 pb-2.5">
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                {headerTitle || (multiSelect ? "Select Models" : "Select AI Model")}
              </span>
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 flex items-center gap-1">
                <Sparkles className="size-3 text-[#713CF4]" />
                {multiSelect
                  ? `${selectedModelIds.length}/${maxSelected} selected`
                  : `${models.length} Models`}
              </span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-zinc-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search models or providers..."
                className="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs bg-zinc-50 dark:bg-[#1b1c24] border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-[#713CF4]"
              />
            </div>

            {/* Tier Filter Pills (All / Free / Pro) */}
            {hasBothTiers && (
              <div className="flex items-center gap-1 pt-0.5">
                {(["all", "free", "pro"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTierFilter(t)}
                    className={`px-2.5 py-0.5 rounded-md text-[10.5px] font-semibold transition-colors cursor-pointer ${
                      tierFilter === t
                        ? "bg-[#713CF4] text-white shadow-2xs"
                        : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 bg-zinc-100 dark:bg-zinc-800/80"
                    }`}
                  >
                    {t === "all" ? "All Models" : t === "free" ? "Free" : "Pro"}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Model Groups */}
          <div className="max-h-72 overflow-y-auto custom-scrollbar p-1 space-y-3 pt-2">
            {categories.length === 0 ? (
              <div className="py-6 text-center text-xs text-zinc-400">
                No matching models found
              </div>
            ) : (
              categories.map(([category, catModels]) => (
                <div key={category} className="space-y-1">
                  <div className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    {category}
                  </div>

                  <div className="space-y-0.5">
                    {catModels.map((model) => {
                      const isSelected = isModelSelected(model.id);
                      return (
                        <button
                          key={model.id}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => handleItemClick(model)}
                          className={`w-full text-left p-2 rounded-xl transition-all duration-100 flex items-start gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] cursor-pointer ${
                            isSelected
                              ? "bg-[#713CF4]/10 dark:bg-[#713CF4]/20 text-zinc-900 dark:text-zinc-100 border border-[#713CF4]/30"
                              : "hover:bg-zinc-100 dark:hover:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 border border-transparent"
                          }`}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span
                                className={`text-[12.5px] font-semibold ${
                                  isSelected
                                    ? "text-[#713CF4] dark:text-[#a78bfa]"
                                    : "text-zinc-900 dark:text-zinc-100"
                                }`}
                              >
                                {model.name}
                              </span>

                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 font-medium">
                                {model.provider}
                              </span>

                              {model.isPro && (
                                <Badge variant="pro" size="sm">
                                  PRO
                                </Badge>
                              )}

                              {model.contextWindow && (
                                <span className="text-[9.5px] text-zinc-400">
                                  {model.contextWindow}
                                </span>
                              )}
                            </div>

                            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-snug mt-0.5 line-clamp-1">
                              {model.description}
                            </p>
                          </div>

                          {model.isPro && !allowProSelection ? (
                            <span className="inline-flex items-center gap-1 text-[10px] text-amber-500 dark:text-amber-400 font-medium shrink-0 mt-0.5 px-1.5 py-0.5 rounded bg-amber-500/10 dark:bg-amber-500/20">
                              <Lock className="size-2.5" />
                              <span className="hidden sm:inline">Upgrade</span>
                            </span>
                          ) : isSelected ? (
                            <Check className="size-4 text-[#713CF4] dark:text-[#a78bfa] shrink-0 mt-0.5" />
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
