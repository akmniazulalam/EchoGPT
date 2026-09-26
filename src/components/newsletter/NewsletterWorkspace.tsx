"use client";

import React, { useState } from "react";
import {
  Mail,
  TrendingUp,
  Zap,
  Rocket,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { WorkspaceHeader } from "@/components/workspace/WorkspaceHeader";

const TOPICS = [
  {
    icon: TrendingUp,
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-50 dark:bg-violet-950/30",
    border: "border-violet-100 dark:border-violet-900/40",
    title: "Industry Trends",
    description:
      "Curated analysis of the week's most impactful AI model releases, research papers, and product shifts.",
  },
  {
    icon: Zap,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-100 dark:border-amber-900/40",
    title: "Power Usage Tips",
    description:
      "Advanced prompt strategies, model selection guides, and workflow templates to get 10× more from EchoGPT.",
  },
  {
    icon: Rocket,
    color: "text-sky-600 dark:text-sky-400",
    bg: "bg-sky-50 dark:bg-sky-950/30",
    border: "border-sky-100 dark:border-sky-900/40",
    title: "Early Access",
    description:
      "Be first to know about beta features, new model integrations, and experimental capabilities before launch.",
  },
  {
    icon: BookOpen,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-100 dark:border-emerald-900/40",
    title: "Productivity Guides",
    description:
      "Step-by-step walkthroughs on using Image Studio, Video Studio, AI Job Analysis, and Compare tools effectively.",
  },
];

const PERKS = [
  "No spam, ever — unsubscribe in one click",
  "Sent weekly every Tuesday morning",
  "Exclusive early access to beta features",
];

function validateEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function NewsletterWorkspace() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email.trim()) {
      setErrorMsg("Please enter your email address.");
      return;
    }
    if (!validateEmail(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    // Simulated mock submission
    setTimeout(() => {
      setStatus("success");
    }, 1200);
  };

  const handleReset = () => {
    setEmail("");
    setStatus("idle");
    setErrorMsg("");
  };

  return (
    <div className="flex flex-col flex-1 h-full min-h-0 bg-[#FAFAFC] dark:bg-[#0E0C15] text-zinc-900 dark:text-zinc-100 font-lexend">
      <WorkspaceHeader
        title="Newsletter"
        breadcrumbs={[{ label: "Workspace" }, { label: "Newsletter" }]}
        subtitle="Weekly AI insights and EchoGPT updates, delivered to your inbox"
      />

      <div className="flex-1 overflow-y-auto min-h-0 custom-scrollbar">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-12">

          {/* Hero */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center size-14 rounded-2xl bg-[#713CF4]/10 border border-[#713CF4]/20 mx-auto">
              <Mail className="size-7 text-[#713CF4]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                Elevate your <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">AI strategy</span>
              </h1>
              <p className="mt-2 text-sm sm:text-base text-zinc-500 dark:text-zinc-400 font-normal leading-relaxed max-w-lg mx-auto">
                Join thousands of professionals who stay ahead of AI with our weekly
                newsletter — curated insights, product updates, and power-user tips.
              </p>
            </div>
          </div>

          {/* Subscription Form / Success State */}
          {status === "success" ? (
            <div className="p-8 rounded-2xl border border-emerald-200 dark:border-emerald-800/50 bg-white dark:bg-[#111217] shadow-sm text-center space-y-4">
              <div className="size-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 flex items-center justify-center mx-auto">
                <CheckCircle2 className="size-7 text-emerald-500" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                  You{"'"}re on the list!
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 font-normal mt-1 leading-relaxed">
                  Welcome aboard. Check your inbox for a confirmation — your first issue
                  arrives next Tuesday.
                </p>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 underline underline-offset-2 transition-colors cursor-pointer"
              >
                Subscribe a different address
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="p-6 sm:p-8 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#111217] shadow-sm space-y-5"
            >
              <div className="space-y-1.5">
                <label
                  htmlFor="newsletter-email"
                  className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Work or personal email
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    id="newsletter-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorMsg) setErrorMsg("");
                    }}
                    placeholder="you@example.com"
                    disabled={status === "loading"}
                    className="flex-1 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/60 px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 outline-none focus:border-[#713CF4] focus:ring-2 focus:ring-[#713CF4]/20 transition-all disabled:opacity-60"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#713CF4] hover:bg-[#602ee0] active:bg-[#5223c7] disabled:opacity-70 text-white text-sm font-medium transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] focus-visible:ring-offset-2 cursor-pointer disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      <>
                        <span>Join the Newsletter</span>
                        <ArrowRight className="size-4" />
                      </>
                    )}
                  </button>
                </div>
                {errorMsg && (
                  <p className="text-xs text-rose-500 dark:text-rose-400 pt-0.5">{errorMsg}</p>
                )}
              </div>

              {/* Perks */}
              <ul className="flex flex-col sm:flex-row flex-wrap gap-x-6 gap-y-1.5">
                {PERKS.map((perk) => (
                  <li key={perk} className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                    <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </form>
          )}

          {/* What you'll receive */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
              <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                What{"'"}s inside every issue
              </h2>
              <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TOPICS.map((topic) => {
                const Icon = topic.icon;
                return (
                  <div
                    key={topic.title}
                    className={`flex items-start gap-4 p-5 rounded-2xl border bg-white dark:bg-[#111217] ${topic.border} shadow-sm`}
                  >
                    <div
                      className={`shrink-0 size-10 rounded-xl ${topic.bg} border ${topic.border} flex items-center justify-center`}
                    >
                      <Icon className={`size-5 ${topic.color}`} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        {topic.title}
                      </h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mt-1 font-normal">
                        {topic.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer note */}
          <p className="text-center text-xs text-zinc-400 dark:text-zinc-500 font-normal pb-4">
            This is a frontend demonstration — no emails are actually sent.
            <br />
            In production, this would connect to a real subscription service.
          </p>
        </div>
      </div>
    </div>
  );
}
