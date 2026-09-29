"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Lock,
  Star,
  Plus,
  Sun,
  Moon,
  Sparkles,
  BookOpen,
  Code2,
  ExternalLink,
  GripVertical,
} from "lucide-react";
import { ExtensionSidePanel } from "./ExtensionSidePanel";
import { useTheme } from "@/context/ThemeContext";
import { loadStoredWidth, saveStoredWidth } from "./storage";

export function MockBrowserFrame() {
  const { theme, toggleTheme, mounted } = useTheme();

  // Resizable panel width state (default 440px, min 360px, max 1080px)
  // Restores immediately without visual flash
  const [panelWidth, setPanelWidth] = useState<number>(() => loadStoredWidth());
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(true);
  const [isPinned, setIsPinned] = useState<boolean>(true);
  const [isReloading, setIsReloading] = useState<boolean>(false);

  const handleWidthChange = useCallback((newWidth: number) => {
    const clamped = Math.max(360, Math.min(1080, newWidth));
    setPanelWidth(clamped);
    saveStoredWidth(clamped);
  }, []);

  const handleBrowserReload = () => {
    setIsReloading(true);
    setTimeout(() => {
      setIsReloading(false);
    }, 450);
  };

  // Mouse drag handler for horizontal resize
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Panel is docked on the right side.
      // Width = viewportWidth - clientX
      const viewportWidth = window.innerWidth;
      const calculatedWidth = viewportWidth - e.clientX;
      handleWidthChange(calculatedWidth);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.cursor = "default";
      document.body.style.userSelect = "auto";
    };

    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.body.style.cursor = "default";
      document.body.style.userSelect = "auto";
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleWidthChange]);

  // Touch drag handler for tablet/mobile
  useEffect(() => {
    if (!isDragging) return;

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const viewportWidth = window.innerWidth;
        const calculatedWidth = viewportWidth - e.touches[0].clientX;
        handleWidthChange(calculatedWidth);
      }
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, handleWidthChange]);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-zinc-100 dark:bg-[#08070D] font-lexend select-none">
      {/* ── 1. CHROME BROWSER TOP BAR (Tabs & Window Controls) ── */}
      <div className="h-10 px-3 flex items-center justify-between bg-zinc-200/90 dark:bg-[#121019] border-b border-zinc-300/80 dark:border-white/6 shrink-0">
        {/* Window Traffic Lights */}
        <div className="flex items-center gap-2 pr-4">
          <span className="size-3 rounded-full bg-rose-500/80 inline-block" />
          <span className="size-3 rounded-full bg-amber-500/80 inline-block" />
          <span className="size-3 rounded-full bg-emerald-500/80 inline-block" />
        </div>

        {/* Chrome Tabs */}
        <div className="flex-1 flex items-center gap-1 overflow-x-auto custom-scrollbar h-full pt-1.5 max-w-2xl">
          {/* Active Tab */}
          <div className="h-full px-3.5 flex items-center gap-2 rounded-t-xl bg-white dark:bg-[#1B1827] text-zinc-900 dark:text-zinc-100 text-xs font-medium shadow-xs border-t border-x border-zinc-300/60 dark:border-white/8 min-w-[180px] max-w-[240px] truncate">
            <span className="size-3.5 rounded-full bg-black dark:bg-white text-white dark:text-black font-extrabold text-[8px] flex items-center justify-center shrink-0">
              N
            </span>
            <span className="truncate">Next.js 16 Documentation</span>
          </div>

          {/* Inactive Tab */}
          <div className="h-full px-3 flex items-center gap-2 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-300/50 dark:hover:bg-white/[0.04] rounded-t-xl text-xs transition-colors cursor-pointer min-w-[150px] max-w-[200px] truncate">
            <span className="size-3.5 rounded bg-zinc-400/40 text-zinc-700 dark:text-zinc-300 text-[8px] flex items-center justify-center shrink-0">
              GH
            </span>
            <span className="truncate">echogpt / companion</span>
          </div>

          <button
            type="button"
            className="p-1 rounded-full text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-300/60 dark:hover:bg-white/6 transition-colors cursor-pointer"
            title="New Tab">
            <Plus className="size-3.5" />
          </button>
        </div>

        {/* Web App Link */}
        <Link
          href="/"
          className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-[#713CF4] dark:text-[#a78bfa] hover:underline">
          <span>Back to Landing</span>
          <ExternalLink className="size-3" />
        </Link>
      </div>

      {/* ── 2. CHROME OMNIBOX & EXTENSION CONTROLS BAR ── */}
      <div className="h-11 px-3 flex items-center justify-between gap-3 bg-white dark:bg-[#15121F] border-b border-zinc-200 dark:border-white/8 shrink-0">
        {/* Navigation Arrows */}
        <div className="flex items-center gap-1 text-zinc-400">
          <button
            type="button"
            className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-white/6 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors cursor-pointer"
            title="Back">
            <ArrowLeft className="size-4" />
          </button>
          <button
            type="button"
            className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-white/6 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors cursor-pointer"
            title="Forward">
            <ArrowRight className="size-4" />
          </button>
          <button
            type="button"
            onClick={handleBrowserReload}
            className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-white/6 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors cursor-pointer"
            title="Reload">
            <RotateCw className={`size-3.5 ${isReloading ? "animate-spin" : ""}`} />
          </button>
        </div>

        {/* Omnibox Address Bar */}
        <div className="flex-1 max-w-xl flex items-center justify-between px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200/80 dark:border-white/6 text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <Lock className="size-3 text-emerald-500 shrink-0" />
            <span className="text-zinc-900 dark:text-zinc-100 font-medium truncate">
              https://nextjs.org/docs/app/building-your-application
            </span>
          </div>
          <Star className="size-3.5 text-zinc-400 shrink-0 hover:text-amber-400 cursor-pointer" />
        </div>

        {/* Right Action Controls: Extension Icons & Width Presets */}
        <div className="flex items-center gap-2">
          {/* Quick Width Presets (Instant test for 360px -> 720px responsive behavior) */}
          <div className="hidden lg:flex items-center gap-1 p-0.5 rounded-xl bg-zinc-100 dark:bg-white/[0.04] border border-zinc-200/60 dark:border-white/6">
            <span className="text-[10px] font-semibold text-zinc-400 px-1.5 uppercase">
              Width:
            </span>
            {[
              { label: "360px", w: 360 },
              { label: "440px", w: 440 },
              { label: "720px", w: 720 },
              { label: "900px", w: 900 },
              { label: "1080px", w: 1080 },
            ].map((p) => (
              <button
                key={p.w}
                type="button"
                onClick={() => handleWidthChange(p.w)}
                className={`px-2 py-0.5 rounded-lg text-[10.5px] font-medium transition-all cursor-pointer ${
                  panelWidth === p.w
                    ? "bg-[#713CF4] text-white font-bold shadow-2xs"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                }`}
                title={`Set side panel width to ${p.w}px`}>
                {p.label}
              </button>
            ))}
          </div>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="size-8 rounded-xl flex items-center justify-center text-zinc-500 hover:text-[#713CF4] dark:text-zinc-400 dark:hover:text-[#a78bfa] hover:bg-zinc-100 dark:hover:bg-white/6 transition-colors cursor-pointer"
            title="Toggle light/dark mode"
            aria-label="Toggle theme">
            {mounted && theme === "dark" ? (
              <Sun className="size-4 text-amber-400" />
            ) : (
              <Moon className="size-4 text-zinc-600 dark:text-zinc-400" />
            )}
          </button>

          {/* EchoGPT Extension Action Icon (Purple Glow) */}
          <button
            type="button"
            onClick={() => setIsPanelOpen((v) => !v)}
            className={`relative size-8.5 rounded-xl flex items-center justify-center border transition-all cursor-pointer ${
              isPanelOpen
                ? "bg-[#713CF4] border-[#713CF4] text-white shadow-md shadow-[#713CF4]/30"
                : "bg-zinc-100 dark:bg-white/6 border-zinc-200 dark:border-white/8 text-zinc-600 dark:text-zinc-400"
            }`}
            title={
              isPanelOpen
                ? "Close EchoGPT Side Panel"
                : "Open EchoGPT Side Panel"
            }>
            <Image
              src="/favicon.svg"
              alt="EchoGPT"
              width={20}
              height={20}
              className="object-contain"
            />
            {isPanelOpen && (
              <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-emerald-400 border border-white dark:border-black" />
            )}
          </button>
        </div>
      </div>

      {/* ── 3. MAIN WORKSPACE VIEWPORT: Mock Web Page (Left) + Side Panel (Right) ── */}
      <div className="flex-1 flex min-h-0 overflow-hidden relative">
        {/* ── Left Side: Simulated Active Webpage (e.g. Next.js Documentation) ── */}
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto custom-scrollbar bg-white dark:bg-[#0E0C17] p-6 sm:p-10 select-text">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-medium">
              <span>Documentation</span>
              <span>/</span>
              <span>App Router</span>
              <span>/</span>
              <span className="text-[#713CF4] dark:text-[#a78bfa]">
                Building Your Application
              </span>
            </div>

            {/* Page Header */}
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
                Next.js 16 Architecture & Tool Integration
              </h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Learn how Next.js 16 optimizes modern web applications through
                streaming Server Components, modular caching boundaries, and
                real-time Model Context Protocol (MCP) adapters.
              </p>
            </div>

            {/* Simulated Action Banner for the Extension */}
            <div className="p-4 rounded-2xl bg-[#713CF4]/5 dark:bg-[#713CF4]/10 border border-[#713CF4]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-[#713CF4] text-white flex items-center justify-center shrink-0 shadow-sm shadow-[#713CF4]/30">
                  <Sparkles className="size-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    EchoGPT Companion Active
                  </h4>
                  <p className="text-[11.5px] text-zinc-500 dark:text-zinc-400">
                    The browser side panel can summarize, extract code, or
                    translate this page.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsPanelOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-[#713CF4] hover:bg-[#602ee0] text-white text-xs font-semibold shrink-0 transition-colors shadow-xs cursor-pointer inline-flex items-center gap-1.5">
                <BookOpen className="size-3.5" />
                <span>Read in Side Panel</span>
              </button>
            </div>

            {/* Article Content Paragraphs */}
            <div className="space-y-4 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
              <p>
                In production-scale SaaS ecosystems, the challenge is rarely
                just delivering HTML — it is orchestrating real-time AI context,
                multi-engine comparison, and database connectors directly within
                the user&apos;s workflow. The browser side panel bridges the gap
                between static web browsing and proactive intelligence.
              </p>

              <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 pt-2">
                Unified Model Routing
              </h2>
              <p>
                By connecting to multiple frontier models (GPT-4o, Claude 3.5
                Sonnet, Gemini 2.0 Flash, DeepSeek R1), developers can
                dynamically balance cost, latency, and reasoning power without
                managing disparate API integrations or context serializations.
              </p>

              {/* Sample Code Block */}
              <div className="rounded-2xl bg-zinc-900 text-zinc-100 p-4 font-mono text-xs overflow-x-auto shadow-md border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between text-zinc-400 pb-2 border-b border-zinc-800 text-[11px]">
                  <span className="flex items-center gap-1.5 text-zinc-300">
                    <Code2 className="size-3.5 text-[#713CF4]" />
                    route.ts
                  </span>
                  <span>TypeScript</span>
                </div>
                <pre className="text-emerald-400 leading-relaxed">
                  {`import { createMcpClient } from "@echogpt/mcp";

export async function POST(req: Request) {
  const client = await createMcpClient({
    serverUrl: "https://api.github.com/mcp",
    auth: process.env.GITHUB_TOKEN
  });

  const tools = await client.listTools();
  return Response.json({ status: "active", tools });
}`}
                </pre>
              </div>

              <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 pt-2">
                Client-Side Panel Docking
              </h2>
              <p>
                The companion side panel docks cleanly to the viewport right
                edge. It supports horizontal drag resizing between 360px and
                720px, ensuring that controls remain ergonomic on both compact
                notebook displays and ultra-wide developer setups.
              </p>
            </div>
          </div>
        </div>

        {/* ── DRAG RESIZE HANDLE (Divider between Webpage and Side Panel) ── */}
        {isPanelOpen && (
          <div
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
            className={`relative w-2.5 hover:w-3 bg-zinc-200/80 dark:bg-white/4 hover:bg-[#713CF4]/40 dark:hover:bg-[#713CF4]/40 cursor-col-resize transition-all shrink-0 flex items-center justify-center select-none z-20 group ${
              isDragging ? "bg-[#713CF4] w-3" : ""
            }`}
            title="Drag to resize EchoGPT Side Panel (360px – 1080px)">
            {/* Visual Grip Handle */}
            <div className="p-0.5 rounded bg-zinc-400/60 dark:bg-white/20 group-hover:bg-[#713CF4] group-hover:text-white text-zinc-600 transition-colors">
              <GripVertical className="size-3.5 stroke-2" />
            </div>

            {/* Active Width Tooltip while dragging */}
            {isDragging && (
              <div className="absolute right-full mr-2 px-2 py-1 rounded-md bg-zinc-900 text-white text-[10px] font-mono whitespace-nowrap shadow-lg">
                {panelWidth}px
              </div>
            )}
          </div>
        )}

        {/* ── Right Side: EchoGPT Chrome Side Panel ── */}
        {isPanelOpen && (
          <div
            style={{ width: `${panelWidth}px` }}
            className="h-full shrink-0 flex flex-col border-l border-zinc-200 dark:border-white/8 shadow-2xl relative z-20 animate-in slide-in-from-right-4 duration-150">
            <ExtensionSidePanel
              onClosePanel={() => setIsPanelOpen(false)}
              isPinned={isPinned}
              onTogglePin={() => setIsPinned((v) => !v)}
            />
            {isReloading && (
              <div className="absolute inset-0 z-50 bg-white/60 dark:bg-black/60 flex items-center justify-center animate-in fade-in duration-100">
                <div className="size-8 border-2 border-[#713CF4]/30 border-t-[#713CF4] rounded-full animate-spin" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
