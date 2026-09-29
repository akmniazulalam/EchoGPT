"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  ExternalLink,
  ChevronDown,
  Play,
  Film,
  RotateCw,
} from "lucide-react";
import { VIDEO_MODELS } from "@/config/models";
import { ExtensionTab } from "./types";

interface ExtensionVideoViewProps {
  onAddToHistory?: (
    title: string,
    toolType: ExtensionTab,
    promptOrSummary: string,
    resultText?: string,
    modelId?: string
  ) => void;
}

export function ExtensionVideoView({ onAddToHistory }: ExtensionVideoViewProps) {
  const [prompt, setPrompt] = useState("");
  const [duration, setDuration] = useState("5s");
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [selectedModelId, setSelectedModelId] = useState(VIDEO_MODELS[0].id);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [videoGenerated, setVideoGenerated] = useState(false);

  const selectedModel = VIDEO_MODELS.find((m) => m.id === selectedModelId) || VIDEO_MODELS[0];
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
      setVideoGenerated(true);
      setIsGenerating(false);
      onAddToHistory?.(
        `Video: ${prompt.trim().slice(0, 24)}`,
        "video",
        `[Video Prompt]: ${prompt.trim()} (${duration}, ${aspectRatio})`,
        `Generated 1080p cinematic video clip with ${selectedModel.name}`,
        selectedModelId
      );
    }, 1400);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-white dark:bg-[#0B0912]">
      {/* ── Scrollable Body Area ── */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 sm:p-4 space-y-4">
        {/* Title & Link */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Video Studio</h2>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              Generate cinematic AI video clips in seconds.
            </p>
          </div>
          <Link
            href="/video-studio"
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
            placeholder="Describe the camera movement and scene action..."
            rows={3}
            className="w-full p-3 rounded-xl border border-zinc-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.03] text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-[#713CF4]/40 focus:border-[#713CF4] leading-relaxed resize-none custom-scrollbar"
          />
        </div>

        {/* DURATION & ASPECT RATIO Controls */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Duration
            </label>
            <div className="flex items-center gap-1">
              {(["5s", "10s"] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDuration(d)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    duration === d
                      ? "bg-[#713CF4] text-white shadow-xs"
                      : "bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-white/10"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Aspect Ratio
            </label>
            <div className="flex items-center gap-1">
              {(["16:9", "9:16", "1:1"] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setAspectRatio(r)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    aspectRatio === r
                      ? "bg-[#713CF4] text-white shadow-xs"
                      : "bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-white/10"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Result Video Preview Card */}
        {videoGenerated && (
          <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/8 space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between pb-1 border-b border-zinc-200/60 dark:border-white/4">
              <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                <Film className="size-3.5 text-[#713CF4]" />
                Generated Preview ({duration})
              </span>
              <span className="text-[10px] text-zinc-400">{selectedModel.name}</span>
            </div>

            {/* Simulated Animated Video Screen */}
            <div className="relative rounded-xl overflow-hidden aspect-video bg-gradient-to-tr from-purple-900 via-indigo-950 to-zinc-900 border border-white/10 flex items-center justify-center group shadow-md">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(113,60,244,0.3)_0%,_transparent_70%)] animate-pulse" />
              <div className="size-11 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 group-hover:scale-110 transition-transform cursor-pointer">
                <Play className="size-5 fill-white ml-0.5" />
              </div>
              <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded bg-black/60 backdrop-blur-xs flex items-center justify-between text-[10px] text-white">
                <span className="truncate max-w-[200px]">{prompt}</span>
                <span className="font-mono">00:0{duration.replace("s", "")}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10.5px] text-zinc-400">
              <span>Ready for download & export</span>
              <button
                type="button"
                onClick={handleGenerate}
                className="hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer flex items-center gap-1"
              >
                <RotateCw className="size-2.5" />
                <span>Re-render</span>
              </button>
            </div>
          </div>
        )}
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
                {VIDEO_MODELS.map((m) => (
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
                <span>Generate Video</span>
              </>
            )}
          </button>
        </div>

        <p className="text-[10px] text-zinc-400 dark:text-zinc-500 text-center">
          Video synthesis takes 20–40 seconds using cloud accelerators.
        </p>
      </div>
    </div>
  );
}
