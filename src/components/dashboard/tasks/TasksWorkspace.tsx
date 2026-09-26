"use client";

import React, { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { AI_TASKS, TASK_CATEGORIES, TaskCategory, TaskDefinition } from "@/config/tasks";
import { TaskCard } from "./TaskCard";
import { TaskConfigModal } from "./TaskConfigModal";
import { WorkspaceHeader } from "@/components/workspace/WorkspaceHeader";
import { useUpgradeModal } from "@/context/UpgradeModalContext";

export function TasksWorkspace() {
  const { openUpgradeModal, isProUser } = useUpgradeModal();

  // State
  const [selectedCategory, setSelectedCategory] = useState<TaskCategory | "all">("ideas");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTask, setActiveTask] = useState<TaskDefinition | null>(null);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);

  // Filter tasks based on category & search query
  const filteredTasks = useMemo(() => {
    return AI_TASKS.filter((task) => {
      // Category filter (if not "all")
      if (selectedCategory !== "all" && task.category !== selectedCategory) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = task.title.toLowerCase().includes(q);
        const matchesDesc = task.description.toLowerCase().includes(q);
        const matchesDetailed = task.detailedDescription.toLowerCase().includes(q);
        const matchesKeywords = task.keywords.some((k) => k.toLowerCase().includes(q));
        const matchesCategory = task.category.toLowerCase().includes(q);
        return matchesTitle || matchesDesc || matchesDetailed || matchesKeywords || matchesCategory;
      }

      return true;
    });
  }, [selectedCategory, searchQuery]);

  // Handle task selection
  const handleSelectTask = (task: TaskDefinition) => {
    if (task.isPro && !isProUser) {
      openUpgradeModal(
        `${task.title} is an EchoGPT Pro workflow. Upgrade to access frontier AI execution.`
      );
      return;
    }

    setActiveTask(task);
    setIsConfigModalOpen(true);
  };

  return (
    <div className="flex flex-col flex-1 h-full min-h-0 bg-[#FAFAFC] dark:bg-[#0E0C15] text-zinc-900 dark:text-zinc-100 font-lexend">
      {/* 1. Header with Breadcrumbs & Metric Stats */}
      <WorkspaceHeader
        title="AI Tasks"
        breadcrumbs={[{ label: "Workspace" }, { label: "AI Tasks" }]}
        subtitle="Automate, orchestrate, and execute high-impact AI workflows"
        actions={
          <div className="flex items-center gap-3 text-xs text-zinc-400">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                {AI_TASKS.length}
              </span>
              <span>Workflows</span>
            </div>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                {TASK_CATEGORIES.length}
              </span>
              <span>Categories</span>
            </div>
          </div>
        }
      />

      {/* 2. Scrollable Canvas */}
      <div className="flex-1 overflow-y-auto min-h-0 custom-scrollbar p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto space-y-8 pb-16">
          {/* Hero Section (Matching EchoGPT Screenshot) */}
          <div className="text-center space-y-3 pt-2 sm:pt-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
              EchoGPT AI Tasks
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto font-normal leading-relaxed">
              Discover and create custom versions of ChatGPT that combine instructions,
              extra knowledge, and any combination of skills.
            </p>
          </div>

          {/* Search Bar (Matching EchoGPT Screenshot) */}
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-zinc-400 dark:text-zinc-500 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for the Apps"
                className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white dark:bg-[#181524] border border-zinc-200 dark:border-white/8 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#713CF4] focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  aria-label="Clear search"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Category Navigation Tabs (Matching EchoGPT Screenshot) */}
          <div className="flex items-center justify-start sm:justify-center border-b border-zinc-200 dark:border-white/8 overflow-x-auto no-scrollbar gap-2 sm:gap-6">
            {TASK_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`pb-3 px-3 text-xs sm:text-sm font-medium transition-all relative whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "text-zinc-900 dark:text-zinc-100 font-bold"
                      : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                  }`}
                >
                  <span>{cat.label}</span>

                  {/* Active Underline Indicator */}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#713CF4] rounded-full shadow-xs shadow-[#713CF4]/50" />
                  )}
                </button>
              );
            })}

            {/* Optional "All" Tab when searching or exploring */}
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className={`pb-3 px-3 text-xs sm:text-sm font-medium transition-all relative whitespace-nowrap cursor-pointer ${
                  selectedCategory === "all"
                    ? "text-zinc-900 dark:text-zinc-100 font-bold"
                    : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                <span>All Tasks ({AI_TASKS.length})</span>
                {selectedCategory === "all" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#713CF4] rounded-full" />
                )}
              </button>
            )}
          </div>

          {/* 3. Task Cards Grid */}
          {filteredTasks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onSelect={handleSelectTask}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="py-16 text-center space-y-4">
              <div className="size-12 rounded-2xl mx-auto flex items-center justify-center bg-zinc-100 dark:bg-white/4 text-zinc-400">
                <Search className="size-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  No workflows found
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
                  We couldn&apos;t find any tasks matching &ldquo;{searchQuery}&rdquo;. Try another
                  search keyword or switch categories.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("ideas");
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#713CF4] dark:text-[#A78BFA] hover:underline cursor-pointer"
              >
                <span>Reset filters</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 4. Task Preview & Configuration Modal */}
      <TaskConfigModal
        task={activeTask}
        isOpen={isConfigModalOpen}
        onClose={() => {
          setIsConfigModalOpen(false);
          setActiveTask(null);
        }}
      />
    </div>
  );
}
