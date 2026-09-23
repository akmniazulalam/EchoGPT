"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, SlidersHorizontal, Sparkles } from "lucide-react";

export interface AIModel {
  id: string;
  name: string;
  tag: string;
  description: string;
}

export const NEUTRAL_AI_MODELS: AIModel[] = [
  {
    id: "standard",
    name: "Standard Model",
    tag: "Balanced",
    description: "General reasoning, text generation, and problem solving",
  },
  {
    id: "fast",
    name: "Fast Model",
    tag: "High Speed",
    description: "Low-latency responses optimized for quick answers and summaries",
  },
  {
    id: "creative",
    name: "Creative Studio Model",
    tag: "Creation",
    description: "Idea brainstorming, drafting, and multimodal studio prompts",
  },
  {
    id: "analytical",
    name: "Analytical Model",
    tag: "In-depth",
    description: "Deep structured analysis, SOP blueprints, and comparative evaluations",
  },
];

interface ModelSelectorProps {
  selectedModelId: string;
  onSelectModel: (model: AIModel) => void;
}

export function ModelSelector({
  selectedModelId,
  onSelectModel,
}: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const selectedModel =
    NEUTRAL_AI_MODELS.find((m) => m.id === selectedModelId) ||
    NEUTRAL_AI_MODELS[0];

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
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
        triggerRef.current?.focus();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (model: AIModel) => {
    onSelectModel(model);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#15161C] text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors shadow-2xs outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] cursor-pointer"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select AI model"
      >
        <SlidersHorizontal className="size-3.5 text-zinc-400 dark:text-zinc-500" />
        <span className="truncate max-w-[140px] sm:max-w-[200px]">
          {selectedModel.name}
        </span>
        <ChevronDown
          className={`size-3 text-zinc-400 transition-transform duration-150 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          aria-label="Available AI models"
          className="absolute right-0 top-full mt-1.5 w-76 sm:w-84 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#15161C] shadow-lg p-1.5 z-40 focus:outline-none animate-in fade-in-50 zoom-in-95 duration-100"
        >
          <div className="px-2.5 py-1.5 border-b border-zinc-100 dark:border-zinc-850 mb-1 flex items-center justify-between">
            <span className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              Select AI Model
            </span>
            <span className="text-[10px] text-zinc-400 dark:text-zinc-500 flex items-center gap-1">
              <Sparkles className="size-3 text-[#713CF4]" />
              Demo Mode
            </span>
          </div>

          <div className="space-y-0.5">
            {NEUTRAL_AI_MODELS.map((model) => {
              const isSelected = model.id === selectedModelId;
              return (
                <button
                  key={model.id}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(model)}
                  className={`w-full text-left p-2.5 rounded-lg transition-colors flex items-start gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] cursor-pointer ${
                    isSelected
                      ? "bg-[#713CF4]/10 dark:bg-[#713CF4]/18 text-zinc-900 dark:text-zinc-100"
                      : "hover:bg-zinc-100 dark:hover:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[13px] font-medium ${
                          isSelected
                            ? "text-[#713CF4] dark:text-[#a78bfa]"
                            : "text-zinc-900 dark:text-zinc-100"
                        }`}
                      >
                        {model.name}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 font-medium">
                        {model.tag}
                      </span>
                    </div>
                    <p className="text-[11.5px] text-zinc-500 dark:text-zinc-400 leading-snug mt-0.5 font-normal">
                      {model.description}
                    </p>
                  </div>

                  {isSelected && (
                    <Check className="size-4 text-[#713CF4] dark:text-[#a78bfa] shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
