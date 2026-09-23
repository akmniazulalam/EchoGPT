"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ChevronDown,
  Sparkles,
  Paperclip,
  ArrowUp,
  Image as ImageIcon,
  FileText,
  Columns2,
  Briefcase,
  SlidersHorizontal,
} from "lucide-react";

interface PlaceholderWorkspaceProps {
  activeNavId: string;
  onSelectNav?: (id: string) => void;
}

export function PlaceholderWorkspace({
  activeNavId,
  onSelectNav,
}: PlaceholderWorkspaceProps) {
  const [promptText, setPromptText] = useState("");

  const promptSuggestions = [
    {
      id: "image-studio",
      title: "Generate Image Concepts",
      description: "Create visual variations and styles with Image Studio",
      icon: ImageIcon,
    },
    {
      id: "ai-sop-builder",
      title: "Draft an SOP Document",
      description: "Build a structured standard operating procedure step-by-step",
      icon: FileText,
    },
    {
      id: "compare",
      title: "Compare AI Outputs",
      description: "Evaluate responses across multiple models side-by-side",
      icon: Columns2,
    },
    {
      id: "ai-job-analysis",
      title: "Analyze Job Requirements",
      description: "Extract required skills and benchmarks from descriptions",
      icon: Briefcase,
    },
  ];

  return (
    <div className="flex flex-col flex-1 h-full min-h-0 bg-[#FAFAFC] dark:bg-[#0C0D11] text-zinc-900 dark:text-zinc-100">
      {/* Top Workspace Header */}
      <header className="flex items-center justify-between h-14 shrink-0 px-4 sm:px-6 border-b border-zinc-200/70 dark:border-zinc-800/70 bg-white/70 dark:bg-[#111217]/70 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              Workspace
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">/</span>
            <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 capitalize">
              {activeNavId.replace(/-/g, " ")}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Neutral Model Selector */}
          <button
            type="button"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-850 transition-colors shadow-2xs outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] cursor-pointer"
            aria-label="Select AI model"
          >
            <SlidersHorizontal className="size-3.5 text-zinc-400" />
            <span>Select AI model</span>
            <ChevronDown className="size-3 text-zinc-400" />
          </button>
        </div>
      </header>

      {/* Main Content Scrollable Canvas */}
      <div className="flex-1 overflow-y-auto min-h-0 custom-scrollbar px-4 sm:px-8 py-8 flex flex-col justify-between max-w-4xl w-full mx-auto">
        {/* Welcome Area */}
        <div className="my-auto py-6 text-center sm:text-left space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 shadow-2xs mb-2">
              <div className="size-4 shrink-0 rounded-full flex items-center justify-center">
                <Image
                  src="/favicon.svg"
                  alt="EchoGPT icon"
                  width={16}
                  height={16}
                  className="size-4 object-contain"
                />
              </div>
              <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                EchoGPT Workspace
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-zinc-900 dark:text-zinc-50">
              How can EchoGPT help you today?
            </h1>
            <p className="text-sm sm:text-[15px] text-zinc-500 dark:text-zinc-400 max-w-xl font-normal leading-relaxed">
              Select a specialized tool from the sidebar or choose one of the
              frequently used actions below to start your session.
            </p>
          </div>

          {/* Quick Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {promptSuggestions.map((suggestion) => {
              const Icon = suggestion.icon;
              return (
                <button
                  key={suggestion.id}
                  type="button"
                  onClick={() => onSelectNav && onSelectNav(suggestion.id)}
                  className="group flex items-start gap-3.5 p-3.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#15161C] hover:border-[#713CF4]/40 hover:bg-[#713CF4]/3 dark:hover:bg-[#713CF4]/8 transition-all duration-150 text-left shadow-2xs outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] cursor-pointer"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800/70 text-zinc-600 dark:text-zinc-300 group-hover:bg-[#713CF4]/10 group-hover:text-[#713CF4] dark:group-hover:text-[#a78bfa] transition-colors">
                    <Icon className="size-4.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-[13.5px] font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-[#713CF4] dark:group-hover:text-[#a78bfa] transition-colors truncate">
                      {suggestion.title}
                    </h2>
                    <p className="text-[12px] text-zinc-500 dark:text-zinc-400 line-clamp-1 mt-0.5 font-normal">
                      {suggestion.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Chat Prompt Input Bar */}
        <div className="pt-4 pb-2 w-full">
          <div className="relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#15161C] shadow-sm p-3 focus-within:border-[#713CF4]/50 focus-within:ring-2 focus-within:ring-[#713CF4]/15 transition-all">
            <textarea
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="Message EchoGPT or ask a question..."
              rows={2}
              className="w-full resize-none bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 outline-none leading-relaxed font-normal"
              aria-label="Prompt message"
            />

            <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-850">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  className="flex items-center justify-center size-8 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4]"
                  title="Attach file"
                  aria-label="Attach file"
                >
                  <Paperclip className="size-4" />
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center size-8 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4]"
                  title="Prompts & Tools"
                  aria-label="Prompts & Tools"
                >
                  <Sparkles className="size-4" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-zinc-400 hidden sm:inline select-none">
                  Press Enter to send
                </span>
                <button
                  type="button"
                  disabled={!promptText.trim()}
                  className={`flex items-center justify-center size-8 rounded-lg transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] ${
                    promptText.trim()
                      ? "bg-[#713CF4] hover:bg-[#602ee0] text-white cursor-pointer shadow-xs"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed"
                  }`}
                  aria-label="Send message"
                >
                  <ArrowUp className="size-4" strokeWidth={2.2} />
                </button>
              </div>
            </div>
          </div>

          <p className="text-center text-[11px] text-zinc-400 dark:text-zinc-500 mt-2 select-none">
            EchoGPT can provide helpful suggestions. Verify important details.
          </p>
        </div>
      </div>
    </div>
  );
}
