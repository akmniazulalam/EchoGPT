"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { TaskDefinition } from "@/config/tasks";
import { TaskIconRenderer } from "./TaskIcons";
import { Badge } from "@/components/ui/Badge";

interface TaskCardProps {
  task: TaskDefinition;
  onSelect: (task: TaskDefinition) => void;
}

export function TaskCard({ task, onSelect }: TaskCardProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(task);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(task)}
      onKeyDown={handleKeyDown}
      className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#161322] border border-zinc-200/90 dark:border-white/[0.08] hover:border-[#713CF4]/60 dark:hover:border-[#713CF4]/60 shadow-xs hover:shadow-xl hover:shadow-[#713CF4]/5 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950 text-left select-none"
    >
      {/* Top Header: Icon & Badges */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="size-11 sm:size-12 rounded-xl flex items-center justify-center bg-zinc-100 dark:bg-[#251E38] border border-zinc-200/60 dark:border-white/[0.07] text-zinc-800 dark:text-zinc-200 shadow-2xs group-hover:scale-105 transition-transform duration-200 shrink-0">
            <TaskIconRenderer
              iconName={task.iconName}
              emoji={task.iconEmoji}
              category={task.category}
              className="size-5.5"
            />
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {task.isPro && (
              <Badge variant="pro" size="sm">
                <Sparkles className="size-2.5 mr-0.5" />
                PRO
              </Badge>
            )}
            {!task.isPro && task.badge && (
              <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-white/[0.06] text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-white/[0.06]">
                {task.badge}
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-[16.5px] font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-[#713CF4] dark:group-hover:text-[#A78BFA] transition-colors leading-snug">
          {task.title}
        </h3>

        {/* Subtitle / Description (matching reference screenshots) */}
        <p className="text-xs sm:text-[13px] text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed mt-1.5">
          {task.description}
        </p>
      </div>

      {/* Footer / Meta info */}
      <div className="mt-5 pt-3.5 border-t border-zinc-100 dark:border-white/[0.06] flex items-center justify-between text-xs">
        <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
          {task.recommendedModel}
        </span>

        <span className="inline-flex items-center gap-1 font-semibold text-[#713CF4] dark:text-[#A78BFA] group-hover:translate-x-0.5 transition-transform text-xs">
          <span>Use Task</span>
          <ArrowRight className="size-3.5" />
        </span>
      </div>
    </div>
  );
}
