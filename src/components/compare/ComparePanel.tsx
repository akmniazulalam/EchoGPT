import React from "react";
import {
  Copy,
  Check,
  RotateCcw,
  ThumbsUp,
  Maximize2,
  Clock,
  Coins,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export interface ComparePanelProps {
  modelId: string;
  modelName: string;
  provider: string;
  isPro?: boolean;
  latency?: string;
  tokens?: string;
  response?: string;
  isLoading?: boolean;
  isBest?: boolean;
  onVoteBest?: () => void;
  onCopy?: () => void;
  isCopied?: boolean;
  onRegenerate?: () => void;
  onFocus?: () => void;
  isFocused?: boolean;
}

export function ComparePanel({
  modelName,
  provider,
  isPro = false,
  latency,
  tokens,
  response,
  isLoading = false,
  isBest = false,
  onVoteBest,
  onCopy,
  isCopied = false,
  onRegenerate,
  onFocus,
  isFocused = false,
}: ComparePanelProps) {
  return (
    <div
      className={`flex flex-col h-full rounded-2xl border transition-all duration-150 overflow-hidden shadow-xs ${
        isBest
          ? "border-[#713CF4] ring-1 ring-[#713CF4]/40 bg-white dark:bg-[#1b1725]"
          : "border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-[#121319]"
      } ${isFocused ? "col-span-full shadow-lg" : ""}`}
    >
      {/* Panel Header */}
      <div className="flex items-center justify-between p-3.5 border-b border-zinc-100 dark:border-zinc-850 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[13.5px] font-semibold text-zinc-900 dark:text-zinc-100 truncate">
            {modelName}
          </span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 font-medium">
            {provider}
          </span>
          {isPro && (
            <Badge variant="pro" size="sm">
              PRO
            </Badge>
          )}
          {isBest && (
            <span className="text-[10px] font-semibold text-[#713CF4] bg-[#713CF4]/10 dark:bg-[#713CF4]/20 px-1.5 py-0.5 rounded-full">
              Top Pick
            </span>
          )}
        </div>

        {/* Metrics */}
        <div className="flex items-center gap-2 text-[10.5px] text-zinc-400 shrink-0">
          {latency && (
            <span className="flex items-center gap-1">
              <Clock className="size-3" />
              {latency}
            </span>
          )}
          {tokens && (
            <span className="hidden sm:flex items-center gap-1">
              <Coins className="size-3" />
              {tokens}
            </span>
          )}
        </div>
      </div>

      {/* Response Body */}
      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar text-[13px] leading-relaxed text-zinc-700 dark:text-zinc-300 min-h-[180px]">
        {isLoading ? (
          <div className="space-y-2.5 py-2 animate-pulse">
            <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-3/4" />
            <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-full" />
            <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-5/6" />
            <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-2/3" />
          </div>
        ) : response ? (
          <div className="whitespace-pre-wrap">{response}</div>
        ) : (
          <div className="flex items-center justify-center h-full text-zinc-400 text-xs">
            Awaiting prompt comparison...
          </div>
        )}
      </div>

      {/* Panel Footer Controls */}
      <div className="flex items-center justify-between px-3.5 py-2 border-t border-zinc-100 dark:border-zinc-850 shrink-0 text-xs">
        <button
          type="button"
          onClick={onVoteBest}
          disabled={!response || isLoading}
          className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md transition-colors cursor-pointer outline-none ${
            isBest
              ? "bg-[#713CF4]/10 text-[#713CF4] font-semibold"
              : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          }`}
          title="Vote as best output"
        >
          <ThumbsUp className="size-3.5" />
          <span>{isBest ? "Best Answer" : "Vote Best"}</span>
        </button>

        <div className="flex items-center gap-1">
          {onFocus && (
            <button
              type="button"
              onClick={onFocus}
              className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer outline-none"
              title={isFocused ? "Exit Focus" : "Focus panel"}
            >
              <Maximize2 className="size-3.5" />
            </button>
          )}

          {onRegenerate && (
            <button
              type="button"
              onClick={onRegenerate}
              disabled={isLoading}
              className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer outline-none disabled:opacity-40"
              title="Regenerate this model"
            >
              <RotateCcw className={`size-3.5 ${isLoading ? "animate-spin" : ""}`} />
            </button>
          )}

          {onCopy && (
            <button
              type="button"
              onClick={onCopy}
              disabled={!response}
              className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer outline-none"
              title="Copy output"
            >
              {isCopied ? (
                <Check className="size-3.5 text-emerald-500" />
              ) : (
                <Copy className="size-3.5" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
