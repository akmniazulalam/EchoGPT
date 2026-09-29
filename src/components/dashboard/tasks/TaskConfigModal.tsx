"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Play,
  CheckCircle2,
  ListTodo,
  Info,
  ChevronDown,
  Eye,
  EyeOff,
} from "lucide-react";
import { TaskDefinition } from "@/config/tasks";
import { TaskIconRenderer } from "./TaskIcons";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { showToast } from "@/components/ui/Toast";
import { useUpgradeModal } from "@/context/UpgradeModalContext";

interface TaskConfigModalProps {
  task: TaskDefinition | null;
  isOpen: boolean;
  onClose: () => void;
}

function TaskConfigModalForm({
  task,
  onClose,
}: {
  task: TaskDefinition;
  onClose: () => void;
}) {
  const router = useRouter();
  const { openUpgradeModal, isProUser } = useUpgradeModal();

  // Initialize form values from task field defaults directly in useState initializer
  const [formValues, setFormValues] = useState<Record<string, string>>(() => {
    const defaults: Record<string, string> = {};
    task.fields.forEach((f) => {
      defaults[f.id] = f.defaultValue || "";
    });
    return defaults;
  });
  const [showPromptPreview, setShowPromptPreview] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (fieldId: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [fieldId]: value }));
    if (errors[fieldId]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[fieldId];
        return next;
      });
    }
  };

  // Compute live prompt preview
  const generatedPrompt = task.generatePrompt(formValues);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // Pro check guard
    if (task.isPro && !isProUser) {
      openUpgradeModal(
        `${task.title} is an EchoGPT Pro workflow. Upgrade to access frontier execution.`
      );
      return;
    }

    // Validation
    const newErrors: Record<string, string> = {};
    task.fields.forEach((f) => {
      if (f.required && !formValues[f.id]?.trim()) {
        newErrors[f.id] = `${f.label} is required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast("Please fill in required fields to continue", "error");
      return;
    }

    // Success: hand off to chat
    showToast(`Configured "${task.title}". Launching in EchoGPT...`, "success");
    onClose();

    // Use timestamp query param to guarantee a fresh chat mount with prefilled prompt
    const timestamp = Date.now();
    router.push(`/chat?prompt=${encodeURIComponent(generatedPrompt)}&new=${timestamp}`);
  };

  return (
    <div className="flex flex-col max-h-[85vh]">
      {/* Modal Header */}
      <div className="p-5 sm:p-6 border-b border-zinc-100 dark:border-white/8 bg-zinc-50/60 dark:bg-white/[0.02]">
        <div className="flex items-start gap-4">
          <div className="size-13 rounded-2xl flex items-center justify-center bg-white dark:bg-[#251E38] border border-zinc-200/80 dark:border-white/8 text-zinc-900 dark:text-zinc-100 shadow-sm shrink-0">
            <TaskIconRenderer
              iconName={task.iconName}
              emoji={task.iconEmoji}
              category={task.category}
              className="size-6.5"
            />
          </div>

          <div className="flex-1 min-w-0 pr-8">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-[11px] font-semibold tracking-wider uppercase text-[#713CF4] dark:text-[#A78BFA] bg-[#713CF4]/10 dark:bg-[#713CF4]/20 px-2 py-0.5 rounded-md">
                {task.category.replace("-", " ")}
              </span>
              {task.isPro && (
                <Badge variant="pro" size="sm">
                  <Sparkles className="size-2.5 mr-0.5" />
                  PRO
                </Badge>
              )}
              <span className="text-xs text-zinc-400 dark:text-zinc-500">
                Recommended: {task.recommendedModel}
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-50 truncate">
              {task.title}
            </h2>
            <p className="text-xs sm:text-[13px] text-zinc-500 dark:text-zinc-400 line-clamp-1 mt-0.5">
              {task.description}
            </p>
          </div>
        </div>
      </div>

      {/* Scrollable Body: 2-Column Split Layout on Tablet+ */}
      <div className="overflow-y-auto custom-scrollbar flex-1 p-5 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Task Overview & Specs (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* What this task does */}
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200/70 dark:border-white/[0.06] space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                <Info className="size-3.5 text-[#713CF4]" />
                <span>What this task does</span>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {task.detailedDescription}
              </p>
            </div>

            {/* What you'll need */}
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200/70 dark:border-white/[0.06] space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                <ListTodo className="size-3.5 text-blue-500" />
                <span>What you&apos;ll need</span>
              </div>
              <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                {task.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="size-1.5 rounded-full bg-[#713CF4] shrink-0 mt-1.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Expected Output */}
            <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                <CheckCircle2 className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Expected Output</span>
              </div>
              <p className="text-xs text-emerald-900/80 dark:text-emerald-200/80 leading-relaxed">
                {task.expectedOutput}
              </p>
            </div>
          </div>

          {/* Right Column: Structured Inputs Form (7 Cols) */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 flex flex-col space-y-4">
            <div className="flex items-center justify-between pb-1">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Task Parameters
              </h4>
              <button
                type="button"
                onClick={() => setShowPromptPreview(!showPromptPreview)}
                className="inline-flex items-center gap-1 text-[11px] font-medium text-[#713CF4] dark:text-[#A78BFA] hover:underline cursor-pointer"
              >
                {showPromptPreview ? (
                  <>
                    <EyeOff className="size-3" />
                    <span>Hide Prompt</span>
                  </>
                ) : (
                  <>
                    <Eye className="size-3" />
                    <span>Preview Prompt</span>
                  </>
                )}
              </button>
            </div>

            {/* Dynamic Fields */}
            <div className="space-y-3.5 flex-1">
              {task.fields.map((field) => {
                const hasError = !!errors[field.id];

                return (
                  <div key={field.id} className="space-y-1.5">
                    <label
                      htmlFor={field.id}
                      className="block text-xs font-medium text-zinc-700 dark:text-zinc-300"
                    >
                      {field.label}
                      {field.required && <span className="text-rose-500 ml-0.5">*</span>}
                    </label>

                    {field.type === "text" && (
                      <input
                        id={field.id}
                        type="text"
                        value={formValues[field.id] || ""}
                        placeholder={field.placeholder}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        className={`w-full text-xs px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1C182A] border ${
                          hasError
                            ? "border-rose-500 focus:border-rose-500"
                            : "border-zinc-200 dark:border-white/8 focus:border-[#713CF4]"
                        } text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 outline-none focus:ring-1 focus:ring-[#713CF4] transition-all`}
                      />
                    )}

                    {field.type === "textarea" && (
                      <textarea
                        id={field.id}
                        rows={3}
                        value={formValues[field.id] || ""}
                        placeholder={field.placeholder}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        className={`w-full text-xs px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1C182A] border ${
                          hasError
                            ? "border-rose-500 focus:border-rose-500"
                            : "border-zinc-200 dark:border-white/8 focus:border-[#713CF4]"
                        } text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 outline-none focus:ring-1 focus:ring-[#713CF4] transition-all resize-none`}
                      />
                    )}

                    {field.type === "select" && (
                      <div className="relative">
                        <select
                          id={field.id}
                          value={formValues[field.id] || field.defaultValue || ""}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1C182A] border border-zinc-200 dark:border-white/8 text-zinc-900 dark:text-zinc-100 outline-none focus:border-[#713CF4] focus:ring-1 focus:ring-[#713CF4] appearance-none pr-8 cursor-pointer transition-all"
                        >
                          {field.options?.map((opt) => (
                            <option
                              key={opt.value}
                              value={opt.value}
                              className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
                            >
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-3.5 text-zinc-400 pointer-events-none" />
                      </div>
                    )}

                    {hasError && (
                      <p className="text-[11px] text-rose-500">{errors[field.id]}</p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Prompt Live Preview (Collapsible) */}
            {showPromptPreview && (
              <div className="mt-3 p-3.5 rounded-xl bg-zinc-900 dark:bg-black/50 border border-zinc-800 text-zinc-300 space-y-1">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                  Compiled Prompt Blueprint:
                </div>
                <pre className="text-[11px] font-mono whitespace-pre-wrap leading-relaxed max-h-36 overflow-y-auto custom-scrollbar select-text text-zinc-300">
                  {generatedPrompt}
                </pre>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Modal Footer */}
      <div className="p-4 sm:p-5 border-t border-zinc-100 dark:border-white/8 bg-zinc-50/60 dark:bg-white/[0.02] flex items-center justify-between gap-3">
        <Button variant="ghost" size="sm" onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="primary"
          size="md"
          onClick={() => handleSubmit()}
          leftIcon={<Play className="size-3.5 fill-current" />}
          className="px-5 font-semibold shadow-md shadow-[#713CF4]/20"
        >
          Run Task in EchoGPT
        </Button>
      </div>
    </div>
  );
}

export function TaskConfigModal({ task, isOpen, onClose }: TaskConfigModalProps) {
  if (!isOpen || !task) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="3xl"
      bodyClassName="p-0"
    >
      <TaskConfigModalForm key={task.id} task={task} onClose={onClose} />
    </Modal>
  );
}
