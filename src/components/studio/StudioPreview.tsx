import React from "react";
import { Download, Copy, Check, Sparkles, RefreshCw, Eye } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export interface StudioPreviewProps {
  title?: string;
  isGenerating?: boolean;
  emptyStateText?: string;
  previewContent?: React.ReactNode;
  metadata?: { label: string; value: string }[];
  onDownload?: () => void;
  onCopyPrompt?: () => void;
  isCopied?: boolean;
  onRegenerate?: () => void;
  className?: string;
}

export function StudioPreview({
  title = "Studio Output",
  isGenerating = false,
  emptyStateText = "Your generated output will render here",
  previewContent,
  metadata = [],
  onDownload,
  onCopyPrompt,
  isCopied = false,
  onRegenerate,
  className = "",
}: StudioPreviewProps) {
  return (
    <div
      className={`flex flex-col h-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121319] overflow-hidden shadow-xs ${className}`}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 dark:border-zinc-850 shrink-0">
        <div className="flex items-center gap-2">
          <Eye className="size-4 text-zinc-400" />
          <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
            {title}
          </span>
          {isGenerating && (
            <Badge variant="pro" size="sm">
              Rendering...
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {onCopyPrompt && (
            <button
              type="button"
              onClick={onCopyPrompt}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-[#713CF4]"
              title="Copy prompt"
            >
              {isCopied ? (
                <Check className="size-4 text-emerald-500" />
              ) : (
                <Copy className="size-4" />
              )}
            </button>
          )}

          {onRegenerate && (
            <button
              type="button"
              onClick={onRegenerate}
              disabled={isGenerating}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-[#713CF4] disabled:opacity-40"
              title="Regenerate"
            >
              <RefreshCw
                className={`size-4 ${isGenerating ? "animate-spin" : ""}`}
              />
            </button>
          )}

          {onDownload && (
            <Button
              variant="outline"
              size="xs"
              onClick={onDownload}
              leftIcon={<Download className="size-3.5" />}
            >
              Export
            </Button>
          )}
        </div>
      </div>

      {/* Canvas / Viewport Area */}
      <div className="flex-1 min-h-75 flex items-center justify-center p-4 bg-zinc-50/50 dark:bg-[#0C0D11]/50 relative overflow-hidden">
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center gap-3 text-center z-10 animate-in fade-in">
            <div className="size-10 rounded-full border-2 border-[#713CF4] border-t-transparent animate-spin" />
            <div className="space-y-1">
              <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                Neural synthesis in progress
              </span>
              <p className="text-[11px] text-zinc-400">
                Sampling latent space with multi-stage inference...
              </p>
            </div>
          </div>
        ) : previewContent ? (
          previewContent
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 text-center text-zinc-400 max-w-xs">
            <Sparkles className="size-8 text-zinc-300 dark:text-zinc-700" />
            <p className="text-xs">{emptyStateText}</p>
          </div>
        )}
      </div>

      {/* Metadata Bar */}
      {metadata.length > 0 && (
        <div className="shrink-0 flex items-center gap-4 px-4 py-2.5 border-t border-zinc-100 dark:border-zinc-850 bg-white dark:bg-[#121319] text-[11px] text-zinc-500 overflow-x-auto">
          {metadata.map((item, idx) => (
            <div key={idx} className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="text-zinc-400 font-normal">{item.label}:</span>
              <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
