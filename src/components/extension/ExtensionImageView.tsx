"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import { IMAGE_MODELS } from "@/config/models";
import { ExtensionTab } from "./types";

interface ExtensionImageViewProps {
  onAddToHistory?: (
    title: string,
    toolType: ExtensionTab,
    promptOrSummary: string,
    resultText?: string,
    modelId?: string
  ) => void;
}

export function ExtensionImageView({ onAddToHistory }: ExtensionImageViewProps) {
  const [prompt, setPrompt] = useState("");
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [count, setCount] = useState(1);
  const [selectedModelId, setSelectedModelId] = useState(IMAGE_MODELS[0].id);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);

  // Demo generated images gallery
  const [creations, setCreations] = useState<
    { id: string; url: string; prompt: string; ratio: string; time: string }[]
  >([
    {
      id: "demo-img-1",
      url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
      prompt: "Futuristic purple neon cybernetic neural core in dark cosmos",
      ratio: "1:1",
      time: "2h ago",
    },
    {
      id: "demo-img-2",
      url: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=600&q=80",
      prompt: "Geometric abstract crystal prisms with glowing lavender dispersion",
      ratio: "3:2",
      time: "Yesterday",
    },
  ]);

  const selectedModel = IMAGE_MODELS.find((m) => m.id === selectedModelId) || IMAGE_MODELS[0];
  const modelDropdownRef = useRef<HTMLDivElement>(null);

  // Close model dropdown on outside click & Escape
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (modelDropdownRef.current && !modelDropdownRef.current.contains(e.target as Node)) {
        setIsModelOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModelOpen(false);
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);

    setTimeout(() => {
      const newCreation = {
        id: `img-${Date.now()}`,
        url: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=600&q=80",
        prompt: prompt.trim(),
        ratio: aspectRatio,
        time: "Just now",
      };
      setCreations((prev) => [newCreation, ...prev]);
      setIsGenerating(false);
      onAddToHistory?.(
        `Image: ${prompt.trim().slice(0, 24)}`,
        "image",
        `[Prompt]: ${prompt.trim()} (Aspect Ratio: ${aspectRatio})`,
        `Generated high-resolution image using ${selectedModel.name}`,
        selectedModelId
      );
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-white dark:bg-[#0B0912]">
      {/* ── Scrollable Body Area ── */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 sm:p-4 space-y-4">
        {/* Title & Subtitle (Screenshot 5) */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Image Studio</h2>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">Create images that stop the scroll.</p>
          </div>
          <Link
            href="/image-studio"
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#713CF4] dark:text-[#a78bfa] hover:underline shrink-0"
          >
            <span>Full Studio</span>
            <ExternalLink className="size-3" />
          </Link>
        </div>

        {/* PROMPT Textarea */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Prompt
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the image you want to create..."
            rows={3}
            className="w-full p-3 rounded-xl border border-zinc-200 dark:border-white/[0.1] bg-white dark:bg-white/3 text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-[#713CF4]/40 focus:border-[#713CF4] leading-relaxed resize-none custom-scrollbar"
          />
        </div>

        {/* ASPECT RATIO & COUNT Controls (Screenshot 5) */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Aspect Ratio */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Aspect Ratio
            </label>
            <div className="flex items-center gap-1">
              {(["1:1", "3:2", "2:3", "auto"] as const).map((ratio) => (
                <button
                  key={ratio}
                  type="button"
                  onClick={() => setAspectRatio(ratio)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    aspectRatio === ratio
                      ? "bg-[#713CF4] text-white shadow-xs"
                      : "bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-white/10"
                  }`}
                >
                  {ratio}
                </button>
              ))}
            </div>
          </div>

          {/* Count */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Count
            </label>
            <div className="flex items-center gap-1">
              {([1, 2, 3, 4] as const).map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setCount(num)}
                  className={`size-7 rounded-lg text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                    count === num
                      ? "bg-[#713CF4] text-white shadow-xs"
                      : "bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-white/10"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Creations Section */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Your Creations
            </label>
            <span className="text-[10px] text-zinc-400">{creations.length} saved</span>
          </div>

          <div className="grid grid-cols-2 @md:grid-cols-3 @xl:grid-cols-4 gap-2">
            {creations.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-xl overflow-hidden border border-zinc-200/80 dark:border-white/8 bg-zinc-100 dark:bg-white/[0.02] aspect-square"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.url}
                  alt={item.prompt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-end">
                  <p className="text-[10px] text-white font-medium line-clamp-2 leading-tight">
                    {item.prompt}
                  </p>
                  <span className="text-[9px] text-white/70 mt-0.5">{item.ratio}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom Bar: Model Selector + Generate Action ── */}
      <div className="p-3 border-t border-zinc-200/80 dark:border-white/8 bg-zinc-50/60 dark:bg-[#121019] space-y-1.5">
        <div className="flex items-center gap-2 relative">
          {/* Model Selector Dropdown */}
          <div ref={modelDropdownRef} className="relative shrink-0">
            <button
              type="button"
              onClick={() => setIsModelOpen((v) => !v)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-white/[0.04] border border-zinc-200 dark:border-white/8 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:border-zinc-300 cursor-pointer"
            >
              <span className="truncate max-w-[110px]">{selectedModel.name}</span>
              <ChevronDown className="size-3.5 text-zinc-400" />
            </button>

            {isModelOpen && (
              <div className="absolute left-0 bottom-full mb-1.5 w-52 rounded-xl bg-white dark:bg-[#1B1826] border border-zinc-200 dark:border-white/[0.1] shadow-xl p-1 z-50 font-lexend animate-in fade-in">
                {IMAGE_MODELS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      setSelectedModelId(m.id);
                      setIsModelOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-left cursor-pointer ${
                      selectedModelId === m.id
                        ? "bg-[#713CF4]/10 text-[#713CF4] font-bold"
                        : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/[0.05]"
                    }`}
                  >
                    <span>{m.name}</span>
                    <span className="text-[10px] text-zinc-400">{m.badge}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Generate Button */}
          <button
            type="button"
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
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

        <p className="text-[10px] text-zinc-400 dark:text-zinc-500 text-center">
          Each image uses 1 generation credit. Generation takes 10–20 seconds.
        </p>
      </div>
    </div>
  );
}
