"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers,
  Check,
  Share2,
  Terminal,
  Paperclip,
  Send,
} from "lucide-react";
import { McpBranchIcon } from "@/components/dashboard/connectors/ConnectorIcons";

export function LandingHero() {
  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] h-[500px] rounded-full bg-[#713CF4]/15 blur-[120px] dark:bg-[#713CF4]/20 dark:blur-[140px]" />
        <div className="absolute top-1/2 -left-48 w-[400px] h-[400px] rounded-full bg-violet-400/10 blur-[100px] dark:bg-violet-600/10" />
        <div className="absolute top-1/3 -right-48 w-[400px] h-[400px] rounded-full bg-indigo-400/10 blur-[100px] dark:bg-indigo-600/10" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-7">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#713CF4]/25 bg-[#713CF4]/8 dark:bg-[#713CF4]/12 text-xs font-semibold text-[#713CF4] dark:text-[#a78bfa] shadow-2xs">
          <Sparkles className="size-3.5" />
          <span>One workspace for every AI workflow</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight leading-[1.12] max-w-4xl mx-auto">
          Every Frontier Model.{" "}
          <br className="hidden sm:inline" />
          <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
            Every Creative Studio.
          </span>{" "}
          One Workspace.
        </h1>

        {/* Hero Description */}
        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto font-normal leading-relaxed">
          EchoGPT brings GPT-5, Claude, Gemini, and Grok alongside 4K image generation,
          cinematic video, structured AI tasks, and live MCP tools into a unified,
          production-quality ecosystem.
        </p>

        {/* Primary & Secondary Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
          <Link
            href="/chat"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#713CF4] hover:bg-[#602ee0] active:bg-[#5223c7] text-white font-semibold text-sm transition-all shadow-md shadow-[#713CF4]/25 hover:shadow-lg hover:shadow-[#713CF4]/40 hover:-translate-y-0.5"
          >
            <Sparkles className="size-4" />
            <span>Start Using EchoGPT</span>
            <ArrowRight className="size-4 ml-0.5" />
          </Link>

          <a
            href="#preview"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-zinc-200 dark:border-white/[0.1] bg-white/80 dark:bg-white/[0.03] text-zinc-800 dark:text-zinc-200 font-semibold text-sm hover:bg-zinc-50 dark:hover:bg-white/[0.06] hover:border-zinc-300 dark:hover:border-white/[0.18] transition-all"
          >
            <span>Explore Workspaces</span>
          </a>
        </div>

        {/* Credibility Micro-copy */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-zinc-500 dark:text-zinc-400 pt-1">
          <span className="flex items-center gap-1.5">
            <Check className="size-3.5 text-emerald-500 stroke-[3]" />
            Free tier available
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="size-3.5 text-emerald-500 stroke-[3]" />
            11+ frontier models
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="size-3.5 text-emerald-500 stroke-[3]" />
            No API keys required
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="size-3.5 text-emerald-500 stroke-[3]" />
            Zero training on user prompts
          </span>
        </div>
      </div>

      {/* ── High-Fidelity Authentic Product Preview ── */}
      <div className="relative mt-12 sm:mt-16 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-2xl border border-zinc-200/90 dark:border-white/[0.1] bg-white dark:bg-[#111019] shadow-2xl shadow-[#713CF4]/10 overflow-hidden font-lexend">
          {/* Top Window Chrome */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200/80 dark:border-white/[0.08] bg-zinc-50/80 dark:bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-rose-400/80" />
              <span className="size-2.5 rounded-full bg-amber-400/80" />
              <span className="size-2.5 rounded-full bg-emerald-400/80" />
              <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 ml-2 hidden sm:inline">
                echogpt.live/chat
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-[#713CF4]/10 text-[#713CF4] dark:text-[#a78bfa] text-[11px] font-semibold border border-[#713CF4]/20 flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                EchoGPT Pro Active
              </span>
            </div>
          </div>

          {/* Internal Workspace Simulation */}
          <div className="p-4 sm:p-6 lg:p-7 space-y-5 bg-[#FAFAFC] dark:bg-[#0B0A11]">
            {/* Top Workspace Header */}
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-zinc-200/60 dark:border-white/[0.06]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  WORKSPACE / CHAT /
                </span>
                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                  Architecture & Tool Reasoning
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-white/[0.04] text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-white/[0.08]">
                  <Cpu className="size-3 text-[#713CF4]" />
                  <span>Grok 3 PRO</span>
                </span>
                <span className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors">
                  <Share2 className="size-3.5" />
                </span>
              </div>
            </div>

            {/* Conversation Flow */}
            <div className="space-y-4 py-1">
              {/* User Message */}
              <div className="flex justify-end">
                <div className="max-w-md sm:max-w-lg px-4 py-3 rounded-2xl rounded-tr-xs bg-[#713CF4] text-white text-xs sm:text-sm font-normal leading-relaxed shadow-sm">
                  Query the staging database via MCP connector to check order latency,
                  then generate a high-concurrency microservice diagram.
                </div>
              </div>

              {/* Assistant Message with Tool Calling & Output */}
              <div className="flex items-start gap-3">
                <div className="relative size-8 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/[0.1] shadow-2xs flex items-center justify-center shrink-0">
                  <Image
                    src="/favicon.svg"
                    alt="EchoGPT"
                    width={18}
                    height={18}
                    className="size-4.5 object-contain"
                  />
                </div>

                <div className="flex-1 space-y-2.5 max-w-2xl">
                  {/* Tool execution badge */}
                  <div className="inline-flex items-center flex-wrap gap-2 px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-white/[0.04] border border-zinc-200/80 dark:border-white/[0.08] text-[11px] text-zinc-600 dark:text-zinc-300 text-balance">
                    <Terminal className="size-3 text-[#713CF4]" />
                    <span className="font-mono font-medium">
                      Tool called: postgresql.query_latency(window=&quot;15m&quot;)
                    </span>
                    <span className="size-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                      p99: 14.2ms
                    </span>
                  </div>

                  {/* AI Response Card */}
                  <div className="p-4 rounded-2xl rounded-tl-xs bg-white dark:bg-[#151320] border border-zinc-200/80 dark:border-white/8 shadow-xs text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed space-y-2">
                    <p className="text-balance">
                      Query completed successfully. Average latency is steady at{" "}
                      <strong>14.2ms</strong> across 42,000 requests. Here is the
                      decoupled event architecture using Kafka and Redis Cache:
                    </p>
                    <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-black/40 border border-zinc-200/60 dark:border-white/[0.06] font-mono text-[11px] text-zinc-700 dark:text-zinc-300">
                      <code>Client ➔ API Gateway ➔ Event Stream ➔ Redis ➔ Postgres</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Composer Preview */}
            <div className="rounded-xl border border-zinc-200 dark:border-white/[0.1] bg-white dark:bg-[#151320] p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs text-zinc-400 dark:text-zinc-500 border-b border-zinc-100 dark:border-white/[0.06] pb-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                    Grok 3 PRO
                  </span>
                  <span>|</span>
                  <span className="inline-flex items-center gap-1 text-[#713CF4] dark:text-[#a78bfa] font-medium">
                    <McpBranchIcon className="size-3" />
                    <span>PostgreSQL Connected</span>
                  </span>
                </div>
                <span className="text-[11px]">Shift+Enter for newline</span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-xs text-zinc-400 dark:text-zinc-500">
                  Ask Grok 3 anything or invoke connected tools…
                </span>
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors">
                    <Paperclip className="size-3.5" />
                  </span>
                  <div className="size-7 rounded-lg bg-[#713CF4] flex items-center justify-center text-white shadow-xs">
                    <Send className="size-3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Feature Badges */}
        <div className="hidden sm:flex items-center justify-between gap-4 mt-6 text-xs text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-[#713CF4]" />
            <span>State-of-the-art MCP Tool Handshake</span>
          </div>
          <div className="flex items-center gap-2">
            <Layers className="size-4 text-[#713CF4]" />
            <span>Multi-Model Parallel Routing</span>
          </div>
          <div className="flex items-center gap-2">
            <Cpu className="size-4 text-[#713CF4]" />
            <span>Full Reasoning & Coding Benchmarks</span>
          </div>
        </div>
      </div>
    </section>
  );
}
