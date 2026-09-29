"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ListTodo,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { TASK_CATEGORIES, AI_TASKS, TaskCategory } from "@/config/tasks";

export function LandingTasksSection() {
  const [activeCategory, setActiveCategory] = useState<TaskCategory>("work");

  const filteredTasks = AI_TASKS.filter((t) => t.category === activeCategory).slice(0, 4);

  return (
    <section id="tasks" className="py-20 sm:py-28 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#713CF4] dark:text-[#a78bfa]">
            Structured Productivity
          </p>
          <h2 className="text-2xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Start with a workflow, not a blank page
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed">
            EchoGPT provides 24 curated task blueprints. Instead of wrestling with prompts,
            simply input your parameters to generate structured, professional deliverables.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {TASK_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? "bg-[#713CF4] text-white shadow-xs"
                    : "bg-zinc-100 hover:bg-zinc-200/70 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-md font-medium ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-zinc-200 dark:bg-white/[0.08] text-zinc-500 dark:text-zinc-400"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Task Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="p-5 rounded-2xl border border-zinc-200/80 dark:border-white/8 bg-white dark:bg-[#12111A] hover:border-[#713CF4]/40 hover:shadow-md hover:shadow-[#713CF4]/5 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 transition-all duration-200 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl" role="img" aria-label={task.title}>
                      {task.iconEmoji || "⚡"}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 leading-tight group-hover:text-[#713CF4] dark:group-hover:text-[#a78bfa] transition-colors">
                        {task.title}
                      </h4>
                      <p className="text-[11px] text-zinc-400 font-mono capitalize">
                        {task.category.replace("-", " ")} Blueprint
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-white/6 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-white/8">
                    {task.recommendedModel}
                  </span>
                </div>

                <p className="text-xs sm:text-[13px] text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                  {task.description}
                </p>

                {/* Requirements Pills */}
                {task.requirements && task.requirements.length > 0 && (
                  <div className="space-y-1 pt-1">
                    <span className="text-[10.5px] font-semibold text-zinc-400 uppercase tracking-wider block">
                      Required Inputs:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {task.requirements.map((req, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-zinc-50 dark:bg-white/3 border border-zinc-200/60 dark:border-white/6 text-[10.5px] text-zinc-600 dark:text-zinc-400"
                        >
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-zinc-100 dark:border-white/6 flex items-center justify-between">
                <span className="text-[11px] text-zinc-400">
                  {task.fields?.length || 3} Form parameters
                </span>
                <Link
                  href={`/tasks?category=${task.category}&task=${task.id}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#713CF4] dark:text-[#a78bfa] hover:underline"
                >
                  <span>Launch Task</span>
                  <ChevronRight className="size-3.5 group-hover:translate-x-0.5 transition-transform motion-reduce:group-hover:translate-x-0" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Section Bottom CTA */}
        <div className="text-center pt-2">
          <Link
            href="/tasks"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs sm:text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-xs"
          >
            <ListTodo className="size-4" />
            <span>Explore All 24 AI Tasks</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
