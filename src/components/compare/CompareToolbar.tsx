import React from "react";
import { Maximize2, Minimize2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface CompareToolbarProps {
  prompt: string;
  onPromptChange: (val: string) => void;
  onCompare: () => void;
  isComparing: boolean;
  isFocusMode: boolean;
  onToggleFocusMode: () => void;
  modelCount: number;
}

export function CompareToolbar({
  prompt,
  onPromptChange,
  onCompare,
  isComparing,
  isFocusMode,
  onToggleFocusMode,
  modelCount,
}: CompareToolbarProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onCompare();
    }
  };

  return (
    <div className="shrink-0 p-3 sm:p-4 bg-white/70 dark:bg-[#111217]/70 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-3">
        {/* Prompt Input */}
        <div className="relative flex-1 w-full">
          <input
            type="text"
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter a prompt to compare reasoning across models simultaneously..."
            className="w-full pl-3.5 pr-24 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#161720] text-xs sm:text-[13px] text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#713CF4]/30 focus:border-[#713CF4] transition-all shadow-xs"
          />

          <div className="absolute right-1.5 top-1/2 -translate-y-1/2">
            <Button
              variant="primary"
              size="xs"
              onClick={onCompare}
              isLoading={isComparing}
              disabled={!prompt.trim()}
              rightIcon={<ArrowRight className="size-3" />}
            >
              Compare
            </Button>
          </div>
        </div>

        {/* Controls: Focus Mode & Count */}
        <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto shrink-0">
          <span className="text-[11px] text-zinc-400 font-medium">
            Comparing {modelCount} models
          </span>

          <Button
            variant={isFocusMode ? "primary" : "outline"}
            size="xs"
            onClick={onToggleFocusMode}
            leftIcon={
              isFocusMode ? (
                <Minimize2 className="size-3.5" />
              ) : (
                <Maximize2 className="size-3.5" />
              )
            }
          >
            {isFocusMode ? "Grid View" : "Focus Mode"}
          </Button>
        </div>
      </div>
    </div>
  );
}
