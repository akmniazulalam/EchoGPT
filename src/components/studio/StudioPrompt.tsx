import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface StudioPromptProps {
  prompt: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  isGenerating?: boolean;
  placeholder?: string;
  buttonText?: string;
  templates?: string[];
  onSelectTemplate?: (template: string) => void;
  className?: string;
}

export function StudioPrompt({
  prompt,
  onChange,
  onSubmit,
  isGenerating = false,
  placeholder = "Describe your concept in detail...",
  buttonText = "Generate",
  templates = [],
  onSelectTemplate,
  className = "",
}: StudioPromptProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="relative rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#161720] shadow-xs focus-within:border-[#713CF4] focus-within:ring-2 focus-within:ring-[#713CF4]/20 transition-all">
        <textarea
          value={prompt}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={3}
          className="w-full resize-none p-3.5 text-[13.5px] bg-transparent text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none leading-relaxed min-h-[80px]"
        />

        <div className="flex items-center justify-between px-3 pb-3 pt-1 border-t border-zinc-100 dark:border-zinc-850">
          <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
            {prompt.length} characters
          </span>

          <Button
            variant="primary"
            size="sm"
            onClick={onSubmit}
            isLoading={isGenerating}
            disabled={!prompt.trim()}
            rightIcon={<ArrowRight className="size-3.5" />}
          >
            {buttonText}
          </Button>
        </div>
      </div>

      {templates.length > 0 && (
        <div className="space-y-1.5">
          <div className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5">
            <Sparkles className="size-3 text-[#713CF4]" />
            <span>Prompt Blueprints</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {templates.map((tpl, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onSelectTemplate?.(tpl)}
                className="text-left text-xs px-2.5 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800/70 hover:bg-zinc-200/70 dark:hover:bg-zinc-750 text-zinc-700 dark:text-zinc-300 transition-colors line-clamp-1 cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-[#713CF4]"
              >
                {tpl}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
