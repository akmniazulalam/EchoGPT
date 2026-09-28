"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Video,
  ArrowRight,
  Play,
  Film,
} from "lucide-react";
import { IMAGE_MODELS, VIDEO_MODELS } from "@/config/models";

export function LandingCreativeStudio() {
  const [selectedImageModel, setSelectedImageModel] = useState<string>("flux-pro");
  const [selectedImageRatio, setSelectedImageRatio] = useState<string>("16:9");
  const [selectedImageStyle, setSelectedImageStyle] = useState<string>("Cinematic");

  const [selectedVideoModel, setSelectedVideoModel] = useState<string>("sora");
  const [selectedVideoDuration, setSelectedVideoDuration] = useState<string>("5s");

  return (
    <section id="studios" className="py-20 sm:py-28 scroll-mt-16 bg-zinc-50/50 dark:bg-white/[0.015]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#713CF4] dark:text-[#a78bfa]">
            Creative Studios
          </p>
          <h2 className="text-2xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
            From prompts to polished visuals
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed">
            Move seamlessly from brainstorming in chat into dedicated studio environments
            with deep parameter control for image synthesis and cinematic AI video.
          </p>
        </div>

        {/* Dual Panels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ── PANEL 1: IMAGE STUDIO ── */}
          <div className="rounded-2xl border border-zinc-200/90 dark:border-white/[0.08] bg-white dark:bg-[#12111A] p-5 sm:p-6 shadow-sm space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Studio Header */}
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-white/[0.06]">
                <div className="flex items-center gap-2.5">
                  <div className="size-8 rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-400 flex items-center justify-center border border-pink-500/20">
                    <Sparkles className="size-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      Image Studio
                    </h3>
                    <p className="text-[11px] text-zinc-400">FLUX Pro · DALL-E 3 · Midjourney</p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400">
                  4K Synthesis
                </span>
              </div>

              {/* Model Selector Bar */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider block">
                  Generation Model
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {IMAGE_MODELS.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setSelectedImageModel(m.id)}
                      className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                        selectedImageModel === m.id
                          ? "bg-[#713CF4]/10 dark:bg-[#713CF4]/15 border-[#713CF4]/40 text-[#713CF4] dark:text-[#a78bfa]"
                          : "bg-zinc-50 dark:bg-white/[0.03] border-zinc-200/80 dark:border-white/[0.06] text-zinc-700 dark:text-zinc-300"
                      }`}
                    >
                      <p className="text-xs font-bold truncate leading-tight">{m.name}</p>
                      <p className="text-[10px] text-zinc-400 dark:text-zinc-500 truncate mt-0.5">
                        {m.badge || "Studio"}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Aspect Ratio & Style Selectors */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                    Aspect Ratio
                  </span>
                  <div className="flex items-center gap-1">
                    {["1:1", "16:9", "9:16", "4:3"].map((ratio) => (
                      <button
                        key={ratio}
                        type="button"
                        onClick={() => setSelectedImageRatio(ratio)}
                        className={`px-2 py-0.5 rounded-md text-[11px] font-medium border transition-colors cursor-pointer ${
                          selectedImageRatio === ratio
                            ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-transparent"
                            : "bg-zinc-100 dark:bg-white/[0.04] text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-white/[0.06]"
                        }`}
                      >
                        {ratio}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                    Preset Style
                  </span>
                  <div className="flex items-center gap-1">
                    {["Photorealistic", "Cinematic", "Digital Art"].map((style) => (
                      <button
                        key={style}
                        type="button"
                        onClick={() => setSelectedImageStyle(style)}
                        className={`px-2 py-0.5 rounded-md text-[11px] font-medium border transition-colors cursor-pointer ${
                          selectedImageStyle === style
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                            : "bg-zinc-100 dark:bg-white/[0.04] text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-white/[0.06]"
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Render Canvas Preview */}
              <div className="rounded-xl border border-zinc-200/80 dark:border-white/[0.06] bg-zinc-900 text-white p-4 space-y-3 relative overflow-hidden">
                <div className="h-36 rounded-lg bg-gradient-to-tr from-violet-900/60 via-purple-800/40 to-pink-900/40 flex flex-col justify-end p-3 relative">
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-black/60 text-white/90 backdrop-blur-xs font-mono">
                      {selectedImageRatio} · 4K UHD
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-white/95">
                    &quot;Futuristic solar observatory on volcanic ridge at twilight&quot;
                  </p>
                  <p className="text-[10.5px] text-zinc-300">
                    Style: {selectedImageStyle} · Engine: {selectedImageModel}
                  </p>
                </div>
              </div>
            </div>

            {/* Panel Footer */}
            <div className="pt-3 border-t border-zinc-100 dark:border-white/[0.06] flex items-center justify-between">
              <span className="text-xs text-zinc-500">Sub-second generation ready</span>
              <Link
                href="/image-studio"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#713CF4] dark:text-[#a78bfa] hover:underline"
              >
                <span>Launch Image Studio</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>

          {/* ── PANEL 2: VIDEO STUDIO ── */}
          <div className="rounded-2xl border border-zinc-200/90 dark:border-white/[0.08] bg-white dark:bg-[#12111A] p-5 sm:p-6 shadow-sm space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Studio Header */}
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-white/[0.06]">
                <div className="flex items-center gap-2.5">
                  <div className="size-8 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center border border-sky-500/20">
                    <Video className="size-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      Video Studio
                    </h3>
                    <p className="text-[11px] text-zinc-400">Veo 3.1 · Sora · Kling · Runway</p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400">
                  Coherent Physics
                </span>
              </div>

              {/* Model Selector Bar */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider block">
                  Motion Engine
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {VIDEO_MODELS.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setSelectedVideoModel(m.id)}
                      className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                        selectedVideoModel === m.id
                          ? "bg-sky-500/10 dark:bg-sky-500/15 border-sky-500/40 text-sky-600 dark:text-sky-400"
                          : "bg-zinc-50 dark:bg-white/[0.03] border-zinc-200/80 dark:border-white/[0.06] text-zinc-700 dark:text-zinc-300"
                      }`}
                    >
                      <p className="text-xs font-bold truncate leading-tight">{m.name}</p>
                      <p className="text-[10px] text-zinc-400 dark:text-zinc-500 truncate mt-0.5">
                        {m.badge || "Engine"}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration & Camera Dynamics */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                    Clip Duration
                  </span>
                  <div className="flex items-center gap-1">
                    {["5s", "10s"].map((dur) => (
                      <button
                        key={dur}
                        type="button"
                        onClick={() => setSelectedVideoDuration(dur)}
                        className={`px-3 py-0.5 rounded-md text-[11px] font-medium border transition-colors cursor-pointer ${
                          selectedVideoDuration === dur
                            ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-transparent"
                            : "bg-zinc-100 dark:bg-white/[0.04] text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-white/[0.06]"
                        }`}
                      >
                        {dur} Clip
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                    Camera Motion
                  </span>
                  <div className="flex items-center gap-1">
                    {["Orbit", "Dolly Zoom", "Crane Pan"].map((cam, idx) => (
                      <span
                        key={cam}
                        className={`px-2 py-0.5 rounded-md text-[11px] font-medium border ${
                          idx === 0
                            ? "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30"
                            : "bg-zinc-100 dark:bg-white/[0.04] text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-white/[0.06]"
                        }`}
                      >
                        {cam}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Video Timeline Preview */}
              <div className="rounded-xl border border-zinc-200/80 dark:border-white/[0.06] bg-zinc-900 text-white p-4 space-y-3 relative overflow-hidden">
                <div className="h-36 rounded-lg bg-gradient-to-br from-indigo-950/80 via-sky-950/50 to-black flex flex-col justify-between p-3 relative">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-black/60 text-white/90 backdrop-blur-xs font-mono">
                      <Film className="size-2.5" />
                      60 FPS · 1080p Motion
                    </span>
                    <span className="size-6 rounded-full bg-white/20 flex items-center justify-center">
                      <Play className="size-3 text-white ml-0.5" />
                    </span>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-white/95">
                      &quot;Low-altitude glider flight gliding through red rock canyons&quot;
                    </p>
                    <div className="mt-2 w-full bg-white/20 rounded-full h-1 overflow-hidden">
                      <div className="bg-sky-400 h-1 w-2/3" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel Footer */}
            <div className="pt-3 border-t border-zinc-100 dark:border-white/[0.06] flex items-center justify-between">
              <span className="text-xs text-zinc-500">Veo 3.1 default included free</span>
              <Link
                href="/video-studio"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#713CF4] dark:text-[#a78bfa] hover:underline"
              >
                <span>Launch Video Studio</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
