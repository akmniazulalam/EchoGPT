"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Sparkles,
  Video,
  ListTodo,
  Columns2,
  ArrowRight,
  Cpu,
} from "lucide-react";

type PreviewTab = "chat" | "image" | "video" | "tasks" | "compare";

interface TabItem {
  id: PreviewTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  route: string;
}

const TABS: TabItem[] = [
  { id: "chat", label: "AI Chat & Connectors", icon: MessageSquare, tag: "Multi-Model", route: "/chat" },
  { id: "image", label: "Image Studio", icon: Sparkles, tag: "4K Render", route: "/image-studio" },
  { id: "video", label: "Video Studio", icon: Video, tag: "Cinematic", route: "/video-studio" },
  { id: "tasks", label: "AI Tasks", icon: ListTodo, tag: "24 Workflows", route: "/tasks" },
  { id: "compare", label: "Model Compare", icon: Columns2, tag: "Side-by-Side", route: "/compare" },
];

export function LandingProductPreview() {
  const [activeTab, setActiveTab] = useState<PreviewTab>("chat");

  return (
    <section id="preview" className="py-20 sm:py-28 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#713CF4] dark:text-[#a78bfa]">
            Interactive Workspace Preview
          </p>
          <h2 className="text-2xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
            One interface. Infinite creative capability.
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed">
            Switch between conversational reasoning, generative studios, structured
            automations, and live MCP tools without context fragmentation.
          </p>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto no-scrollbar pb-2 pt-1">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? "bg-[#713CF4] text-white shadow-sm shadow-[#713CF4]/25"
                    : "bg-zinc-100 hover:bg-zinc-200/70 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary"
                }`}
              >
                <Icon className="size-3.5" />
                <span>{tab.label}</span>
                <span
                  className={`text-[9.5px] px-1.5 py-0.2 rounded-md font-medium ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-zinc-200 dark:bg-white/[0.08] text-zinc-500 dark:text-zinc-400"
                  }`}
                >
                  {tab.tag}
                </span>
              </button>
            );
          })}
        </div>

        {/* Preview Frame */}
        <div className="rounded-2xl border border-zinc-200/90 dark:border-white/[0.1] bg-white dark:bg-[#111019] shadow-xl overflow-hidden font-lexend">
          {/* Top Bar with Route Indicator */}
          <div className="px-4 py-3 border-b border-zinc-200/80 dark:border-white/8 bg-zinc-50/70 dark:bg-white/[0.02] flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-rose-400/80" />
              <span className="size-2.5 rounded-full bg-amber-400/80" />
              <span className="size-2.5 rounded-full bg-emerald-400/80" />
              <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500 ml-1.5">
                echogpt.live{TABS.find((t) => t.id === activeTab)?.route}
              </span>
            </div>

            <Link
              href={TABS.find((t) => t.id === activeTab)?.route || "/chat"}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#713CF4] dark:text-[#a78bfa] hover:underline"
            >
              <span>Launch this workspace</span>
              <ArrowRight className="size-3" />
            </Link>
          </div>

          {/* Dynamic Tab Body */}
          <div className="p-4 sm:p-6 bg-[#FAFAFC] dark:bg-[#0B0A11] min-h-[360px] flex flex-col justify-center">
            {/* 1. CHAT TAB */}
            {activeTab === "chat" && (
              <div className="space-y-4 max-w-3xl mx-auto w-full">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-200/60 dark:border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-emerald-500" />
                    <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                      Grok 3 PRO · Conversational Logic & Tool Invocation
                    </span>
                  </div>
                  <span className="text-[11px] text-zinc-400 font-mono">128K context</span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-end">
                    <div className="bg-[#713CF4] text-white text-xs sm:text-sm px-4 py-2.5 rounded-2xl rounded-tr-xs max-w-md">
                      Analyze the performance impact of indexing this PostgreSQL table with 10M rows.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="size-7 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-white/[0.1] flex items-center justify-center shrink-0">
                      <Cpu className="size-3.5 text-[#713CF4]" />
                    </div>
                    <div className="flex-1 bg-white dark:bg-[#151320] border border-zinc-200 dark:border-white/8 p-3.5 rounded-2xl rounded-tl-xs space-y-2 text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed">
                      <p>
                        A <strong>B-tree index</strong> on `created_at` will drop scan times
                        from <strong>2,400ms</strong> to under <strong>4ms</strong>.
                        Write latency increases slightly by ~3.2% per batch insert.
                      </p>
                      <div className="p-2 rounded-lg bg-zinc-50 dark:bg-black/40 border border-zinc-200/60 dark:border-white/[0.06] font-mono text-[11px] text-zinc-700 dark:text-zinc-300">
                        <code>CREATE INDEX CONCURRENTLY idx_orders_created ON orders (created_at DESC);</code>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Simulated Input */}
                <div className="rounded-xl border border-zinc-200 dark:border-white/8 bg-white dark:bg-[#151320] p-3 flex items-center justify-between text-xs text-zinc-400">
                  <span>Ask a follow-up or switch models mid-chat…</span>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-white/[0.06] text-[10.5px] font-semibold text-zinc-600 dark:text-zinc-400">
                      GPT-5 / Claude Ready
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 2. IMAGE STUDIO TAB */}
            {activeTab === "image" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center max-w-4xl mx-auto w-full">
                <div className="space-y-3.5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-pink-500/10 text-pink-600 dark:text-pink-400 text-xs font-semibold">
                    <Sparkles className="size-3" />
                    <span>FLUX Pro & DALL-E 3 Integrated</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                    Precision Generative Visuals
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                    Generate 4K production assets with exact aspect ratio control,
                    sub-second SDXL Turbo draft iterations, and deep style presets.
                  </p>

                  <div className="space-y-2 pt-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-400 w-24">Aspect Ratios:</span>
                      <div className="flex gap-1.5">
                        {["1:1 Square", "16:9 Banner", "9:16 Story", "4:3 Classic"].map((r, i) => (
                          <span
                            key={r}
                            className={`px-2 py-0.5 rounded-md text-[11px] font-medium border ${
                              i === 1
                                ? "bg-[#713CF4]/10 text-[#713CF4] border-[#713CF4]/30"
                                : "bg-zinc-100 dark:bg-white/[0.04] text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-white/[0.06]"
                            }`}
                          >
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-zinc-400 w-24">Aesthetic Styles:</span>
                      <div className="flex gap-1.5 flex-wrap">
                        {["Photorealistic", "Cinematic", "Cyberpunk", "Minimal 3D"].map((s, i) => (
                          <span
                            key={s}
                            className={`px-2 py-0.5 rounded-md text-[11px] font-medium border ${
                              i === 0
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                                : "bg-zinc-100 dark:bg-white/[0.04] text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-white/[0.06]"
                            }`}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Studio Canvas Preview */}
                <div className="rounded-2xl border border-zinc-200 dark:border-white/8 bg-white dark:bg-[#151320] p-4 shadow-sm space-y-3">
                  <div className="h-44 rounded-xl bg-gradient-to-tr from-violet-600/20 via-pink-500/20 to-amber-400/20 border border-zinc-200/60 dark:border-white/[0.06] flex flex-col items-center justify-center text-center p-4 relative overflow-hidden">
                    <Sparkles className="size-8 text-[#713CF4] mb-2 animate-pulse" />
                    <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                      High-Precision 4K Asset Rendered
                    </p>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                      Prompt: &quot;Futuristic architectural glass pavilion in misty Nordic forest&quot;
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-zinc-400">
                    <span>Model: FLUX Pro · Seed: 491028</span>
                    <span className="text-emerald-500 font-semibold">Rendered in 2.8s</span>
                  </div>
                </div>
              </div>
            )}

            {/* 3. VIDEO STUDIO TAB */}
            {activeTab === "video" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center max-w-4xl mx-auto w-full">
                <div className="space-y-3.5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-semibold">
                    <Video className="size-3" />
                    <span>Sora & Kling Video Pipeline</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                    Cinematic Short-Form Video
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                    Generate temporally coherent motion from natural language prompts.
                    Control camera transitions, frame rate, and clip duration.
                  </p>

                  <div className="space-y-2 pt-1 text-xs">
                    <div className="flex items-center gap-3">
                      <span className="text-zinc-400 w-24">Engines:</span>
                      <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-white/[0.04] text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
                        Veo 3.1 Fast (Default)
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#713CF4]/10 text-[11px] font-semibold text-[#713CF4] dark:text-[#a78bfa]">
                        Sora Pro
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-zinc-400 w-24">Durations:</span>
                      <span className="text-xs text-zinc-700 dark:text-zinc-300 font-mono">5s · 10s · 60fps motion</span>
                    </div>
                  </div>
                </div>

                {/* Video Preview Card */}
                <div className="rounded-2xl border border-zinc-200 dark:border-white/8 bg-white dark:bg-[#151320] p-4 shadow-sm space-y-3">
                  <div className="h-44 rounded-xl bg-gradient-to-br from-indigo-900/30 via-sky-800/20 to-black/40 border border-zinc-200/60 dark:border-white/[0.06] flex flex-col items-center justify-center text-center p-4 relative overflow-hidden">
                    <Video className="size-8 text-sky-400 mb-2" />
                    <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                      Coherent Temporal Physics Verified
                    </p>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                      Camera: Slow drone orbit over crystal ocean cliffs at sunset
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-zinc-400">
                    <span>Aspect: 16:9 Cinematic</span>
                    <span className="text-sky-500 font-semibold">Physics Simulation: High</span>
                  </div>
                </div>
              </div>
            )}

            {/* 4. AI TASKS TAB */}
            {activeTab === "tasks" && (
              <div className="space-y-4 max-w-4xl mx-auto w-full">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-200/60 dark:border-white/[0.06]">
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      Structured Productivity Workflows
                    </h3>
                    <p className="text-xs text-zinc-500">
                      Overcome blank-prompt syndrome with 24 purpose-built blueprints
                    </p>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#713CF4]/10 text-[#713CF4] dark:text-[#a78bfa] text-xs font-semibold">
                    4 Categories
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { cat: "Work", title: "Executive Summary", desc: "Condense long reports into key decisions", badge: "Fast" },
                    { cat: "Ideas", title: "Think Outside the Box", desc: "Break conventional limits with divergent brainstorming", badge: "Creative" },
                    { cat: "Online Content", title: "Viral Thread Architect", desc: "Structure hooks and retention for social distribution", badge: "Growth" },
                    { cat: "Fun", title: "Interactive Quiz Engine", desc: "Build trivia and educational quizzes with scoring", badge: "Engaging" },
                  ].map((t) => (
                    <div
                      key={t.title}
                      className="p-3.5 rounded-xl border border-zinc-200/80 dark:border-white/8 bg-white dark:bg-[#151320] space-y-1.5 hover:border-[#713CF4]/30 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#713CF4] dark:text-[#a78bfa]">
                          {t.cat}
                        </span>
                        <span className="text-[9.5px] px-1.5 py-0.2 rounded bg-zinc-100 dark:bg-white/[0.06] text-zinc-500">
                          {t.badge}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
                        {t.title}
                      </h4>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-snug">
                        {t.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. COMPARE TAB */}
            {activeTab === "compare" && (
              <div className="space-y-4 max-w-4xl mx-auto w-full">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-200/60 dark:border-white/[0.06]">
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      Side-by-Side Model Benchmark
                    </h3>
                    <p className="text-xs text-zinc-500">
                      Send 1 prompt to multiple frontier models simultaneously
                    </p>
                  </div>
                  <span className="text-xs font-mono text-zinc-400">Prompt: &quot;Implement rate limiter in Go&quot;</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Model 1 */}
                  <div className="p-3.5 rounded-xl border border-zinc-200/80 dark:border-white/8 bg-white dark:bg-[#151320] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-emerald-500" />
                        Claude 3.7 Sonnet
                      </span>
                      <span className="text-[10px] text-zinc-400 font-mono">Token Bucket · 1.8s</span>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-mono text-[11px] bg-zinc-50 dark:bg-black/30 p-2 rounded-lg">
                      type Limiter struct &#123; tokens float64; capacity float64; rate float64 &#125;
                    </p>
                    <p className="text-[11px] text-zinc-500">
                      Emphasized thread-safe mutex locking and fractional replenishment.
                    </p>
                  </div>

                  {/* Model 2 */}
                  <div className="p-3.5 rounded-xl border border-zinc-200/80 dark:border-white/8 bg-white dark:bg-[#151320] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-[#713CF4]" />
                        GPT-5
                      </span>
                      <span className="text-[10px] text-zinc-400 font-mono">Sliding Window · 2.1s</span>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-mono text-[11px] bg-zinc-50 dark:bg-black/30 p-2 rounded-lg">
                      func (w *Window) Allow() bool &#123; return atomic.AddInt64(&amp;w.count, 1) &lt;= limit &#125;
                    </p>
                    <p className="text-[11px] text-zinc-500">
                      Emphasized lock-free atomic primitives for high throughput.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
