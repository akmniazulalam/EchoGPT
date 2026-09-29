"use client";

import React, { useState } from "react";
import {
  Globe,
  UploadCloud,
  Sparkles,
  Copy,
  Check,
  CheckCircle,
} from "lucide-react";
import { ExtensionTab } from "./types";

interface ExtensionReadViewProps {
  onInsertToChat?: (text: string) => void;
  onAddToHistory?: (
    title: string,
    toolType: ExtensionTab,
    promptOrSummary: string,
    resultText?: string,
    modelId?: string
  ) => void;
}

export function ExtensionReadView({
  onInsertToChat,
  onAddToHistory,
}: ExtensionReadViewProps) {
  const [webLink, setWebLink] = useState("");
  const [analysisType, setAnalysisType] = useState<
    "Summarize" | "Explain" | "Extract key points" | "Find important facts" | "Simplify"
  >("Summarize");
  const [depth, setDepth] = useState<"concise" | "detailed">("concise");

  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const ANALYSIS_OPTIONS = [
    "Summarize",
    "Explain",
    "Extract key points",
    "Find important facts",
    "Simplify",
  ] as const;

  const handleAnalyze = (source: string) => {
    setIsAnalyzing(true);
    setTimeout(() => {
      let output = "";
      if (analysisType === "Extract key points") {
        output = `### Key Points Extracted from ${source}\n\n1. **Core Architectural Upgrade**: Leverages streaming SSR and unified caching algorithms to minimize response times.\n2. **Component Boundaries**: Clear segregation of Client and Server boundaries eliminates hydration overhead.\n3. **Modular Tool Calling**: Built-in support for MCP endpoints ensures direct database and API tool orchestration.\n4. **Developer Experience**: Zero-config fast refresh with verified static bundle optimization.`;
      } else if (analysisType === "Explain") {
        output = `### Simplified Explanation of ${source}\n\nThis resource outlines how modern web architectures prioritize instant visual stability. Instead of waiting for full page scripts to execute before rendering content, pages are broken into bite-sized autonomous chunks that stream directly to the browser as soon as they are ready.`;
      } else {
        output = `### Executive Summary (${depth.toUpperCase()})\n**Source:** ${source}\n\nThis page outlines the core capabilities of the EchoGPT platform architecture. It covers real-time model routing across multiple flagship AI engines, browser companion integration via Chrome Side Panels, and structured workflow automation.\n\n**Primary Takeaways:**\n• Multi-AI model switching without context loss.\n• Contextual page reading directly from the active browser tab.\n• Direct integration with team tools (GitHub, Postgres, Slack).\n\n**Recommended Next Action:** Proceed with active task execution or open the chat companion to ask follow-up questions.`;
      }

      setAnalysisResult(output);
      setIsAnalyzing(false);
      onAddToHistory?.(
        `Read: ${analysisType} (${source.slice(0, 20)})`,
        "read",
        `Analyze source: ${source} with goal "${analysisType}"`,
        output,
        "echogpt"
      );
    }, 700);
  };

  const handleCopy = () => {
    if (!analysisResult) return;
    navigator.clipboard.writeText(analysisResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-white dark:bg-[#0B0912]">
      {/* ── Scrollable Body Area ── */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 sm:p-4 space-y-4">
        {/* Active Tab Quick Action Banner */}
        <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="size-8 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Globe className="size-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                Active Browser Tab Detected
              </p>
              <p className="text-[10.5px] text-zinc-500 dark:text-zinc-400 truncate">
                Next.js Documentation — https://nextjs.org/docs
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => handleAnalyze("Current Browser Tab (Next.js Docs)")}
            disabled={isAnalyzing}
            className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shrink-0 transition-colors shadow-2xs cursor-pointer"
          >
            Read Page
          </button>
        </div>

        {/* Focus & Depth Selector Pills */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Analysis Goal
            </label>
            <div className="flex items-center gap-1 p-0.5 rounded-lg bg-zinc-100 dark:bg-white/5">
              {(["concise", "detailed"] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDepth(d)}
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold capitalize transition-all cursor-pointer ${
                    depth === d
                      ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-2xs"
                      : "text-zinc-500 hover:text-zinc-800"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {ANALYSIS_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setAnalysisType(opt)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  analysisType === opt
                    ? "bg-[#713CF4] text-white shadow-2xs font-semibold"
                    : "bg-zinc-100 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-white/10"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Section 2: READ A LINK (Screenshot 3) */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Read a Link
          </label>
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <input
                type="url"
                placeholder="Enter a web page link (https://...)"
                value={webLink}
                onChange={(e) => setWebLink(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.03] text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-[#713CF4]/40 focus:border-[#713CF4]"
              />
            </div>
            <button
              type="button"
              onClick={() => handleAnalyze(webLink || "https://echogpt.app")}
              disabled={isAnalyzing}
              className="px-3.5 py-2 rounded-xl bg-[#713CF4] hover:bg-[#602ee0] text-white text-xs font-semibold shrink-0 transition-colors shadow-2xs cursor-pointer"
            >
              Read
            </button>
          </div>
        </div>

        {/* Section 3: READ A FILE (Screenshot 3) */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Read a File
          </label>
          <label className="flex flex-col items-center justify-center p-5 rounded-2xl border-2 border-dashed border-zinc-200 dark:border-white/[0.1] hover:border-[#713CF4]/50 dark:hover:border-[#713CF4]/50 bg-zinc-50/50 dark:bg-white/[0.02] transition-colors cursor-pointer group">
            <input
              type="file"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setUploadedFileName(file.name);
                  handleAnalyze(`Uploaded File (${file.name})`);
                }
              }}
            />
            <UploadCloud className="size-6 text-zinc-400 group-hover:text-[#713CF4] transition-colors mb-1.5" />
            <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              {uploadedFileName ? uploadedFileName : "Click or drag files here to upload"}
            </p>
            <p className="text-[10.5px] text-zinc-400 mt-0.5">
              Supports PDF, DOCX, TXT, CSV, JSON
            </p>
          </label>
        </div>

        {/* ── Loading Skeleton / Result ── */}
        {isAnalyzing && (
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/8 flex items-center justify-center gap-2 text-xs text-zinc-500 animate-pulse">
            <Sparkles className="size-4 text-[#713CF4] animate-spin" />
            <span>Analyzing content with EchoGPT...</span>
          </div>
        )}

        {analysisResult && !isAnalyzing && (
          <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/8 space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-200/60 dark:border-white/4">
              <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                <CheckCircle className="size-3.5 text-emerald-500" />
                Analysis Complete
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200/60 dark:hover:bg-white/6 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="size-3 text-emerald-500" />
                      <span className="text-emerald-500">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                {onInsertToChat && (
                  <button
                    type="button"
                    onClick={() => onInsertToChat(analysisResult)}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium text-[#713CF4] dark:text-[#a78bfa] hover:bg-[#713CF4]/10 transition-colors cursor-pointer"
                  >
                    Use in Chat
                  </button>
                )}
              </div>
            </div>

            <div className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap leading-relaxed">
              {analysisResult}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
