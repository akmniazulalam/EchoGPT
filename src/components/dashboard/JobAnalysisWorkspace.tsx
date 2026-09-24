"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  RotateCcw,
  Target,
  Award,
  Zap,
} from "lucide-react";
import { WorkspaceHeader } from "@/components/workspace/WorkspaceHeader";

interface SkillItem {
  name: string;
  level: "Expert" | "Advanced" | "Proficient";
  category: "Core Tech" | "Architecture" | "Tools";
}

interface AnalysisReport {
  roleTitle: string;
  level: string;
  matchScore: number;
  overview: string;
  requiredSkills: SkillItem[];
  responsibilities: string[];
  qualifications: string[];
  gapSkills: string[];
  interviewTips: string[];
  atsKeywords: string[];
}

const SAMPLE_JOB_PRESETS = [
  {
    title: "Senior Frontend Engineer (Next.js / TypeScript)",
    text: `We are looking for a Senior Frontend Engineer to lead the architecture of our AI productivity platform.
Requirements:
- 5+ years building production web applications with React, TypeScript, and Next.js (App Router).
- Deep understanding of web performance, Core Web Vitals, SSR hydration, and state management.
- Experience with Tailwind CSS, accessible UI components (ARIA), and responsive multi-viewport design.
- Familiarity with AI developer tools, streaming interfaces, and client-side caching strategies.
- Strong communication skills, technical mentorship, and ability to collaborate with product designers.`,
  },
  {
    title: "AI Product Manager (Enterprise SaaS)",
    text: `Seeking an experienced AI Product Manager to define roadmap strategy for generative AI enterprise workflows.
Requirements:
- 4+ years of product management experience in B2B SaaS with AI/ML integrations.
- Track record of delivering user-centric generative features from discovery through monetization.
- Fluency in LLM evaluation metrics, token economics, latency considerations, and model fine-tuning.
- Proven ability to bridge cross-functional teams: engineering, UX research, compliance, and sales.`,
  },
];

export function JobAnalysisWorkspace() {
  const [jobText, setJobText] = useState("");
  const [seniorityLevel, setSeniorityLevel] = useState("Senior");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState<AnalysisReport | null>(null);
  const [copied, setCopied] = useState(false);

  const handleRunAnalysis = () => {
    if (!jobText.trim() || isAnalyzing) return;
    setIsAnalyzing(true);
    setReport(null);

    setTimeout(() => {
      const lower = jobText.toLowerCase();

      const isPM = lower.includes("product") || lower.includes("roadmap");

      const generated: AnalysisReport = isPM
        ? {
            roleTitle: "AI Product Manager (Generative SaaS)",
            level: seniorityLevel,
            matchScore: 91,
            overview:
              "High-impact strategic role requiring a balance of LLM technical fluency, user journey design, and B2B pricing telemetry.",
            requiredSkills: [
              { name: "Product Roadmap Strategy", level: "Expert", category: "Core Tech" },
              { name: "LLM Evaluation Metrics", level: "Advanced", category: "Core Tech" },
              { name: "User Journey & UX Discovery", level: "Expert", category: "Architecture" },
              { name: "Token Economics & Unit Margin", level: "Advanced", category: "Tools" },
              { name: "Cross-Functional Leadership", level: "Expert", category: "Architecture" },
            ],
            responsibilities: [
              "Own the end-to-end lifecycle for generative workspace features from ideation to general availability.",
              "Define quantitative quality benchmarks and feedback telemetry for model response consistency.",
              "Partner with engineering leads to balance inference latency, token budget, and user experience.",
              "Conduct customer discovery interviews and translate findings into concise PRDs.",
            ],
            qualifications: [
              "4+ years direct experience managing SaaS software products.",
              "Demonstrated portfolio of shipped AI or data-intensive workflows.",
              "Experience with enterprise compliance, privacy standards, and data governance.",
            ],
            gapSkills: [
              "Direct experience with multi-agent orchestration architectures.",
              "Enterprise SOC2/HIPAA compliance frameworks for cloud LLMs.",
            ],
            interviewTips: [
              "Prepare a case study explaining how you prioritized a feature under token cost constraints.",
              "Be ready to discuss how you measure model output hallucinations and customer trust.",
            ],
            atsKeywords: [
              "Product Strategy",
              "LLM Benchmarks",
              "Generative AI",
              "PRD Drafting",
              "Customer Discovery",
              "Token Optimization",
              "Telemetry Analytics",
            ],
          }
        : {
            roleTitle: "Senior Frontend Engineer (Next.js / Architecture)",
            level: seniorityLevel,
            matchScore: 94,
            overview:
              "Core architectural position centered on high-performance interactive interfaces, robust client state, and responsive SaaS design systems.",
            requiredSkills: [
              { name: "React 19 & Next.js App Router", level: "Expert", category: "Core Tech" },
              { name: "TypeScript (Strict Typing)", level: "Expert", category: "Core Tech" },
              { name: "Tailwind CSS & Token Systems", level: "Advanced", category: "Core Tech" },
              { name: "Web Vitals & Performance Profiling", level: "Advanced", category: "Architecture" },
              { name: "Accessibility (WCAG & ARIA)", level: "Advanced", category: "Architecture" },
              { name: "Client-side Persistence (Storage / Stores)", level: "Proficient", category: "Tools" },
            ],
            responsibilities: [
              "Architect scalable Next.js component systems utilizing shared route groups and layout hierarchies.",
              "Implement sub-second responsive UI with zero hydration layout shifts across desktop and mobile.",
              "Build accessible, keyboard-first interactive controls with proper focus management and ARIA states.",
              "Collaborate closely with design to realize subtle brand accents, clean typography, and dark/light themes.",
            ],
            qualifications: [
              "5+ years professional experience building enterprise or consumer-grade web frontends.",
              "Demonstrated mastery of JavaScript/TypeScript execution models and browser DOM lifecycles.",
              "Proven track record delivering fluid responsive web applications without layout thrashing.",
            ],
            gapSkills: [
              "Real-time WebSocket streaming architectures for token-by-token rendering.",
              "Automated end-to-end visual regression testing pipelines (Playwright/Cypress).",
            ],
            interviewTips: [
              "Emphasize how you solved hydration mismatch warnings and React 19 effect linting rules.",
              "Highlight practical experience calibrating font metrics (e.g. Lexend) and responsive layouts.",
            ],
            atsKeywords: [
              "Next.js App Router",
              "TypeScript",
              "Tailwind CSS",
              "Responsive Architecture",
              "Web Performance",
              "ARIA Accessibility",
              "Design Systems",
              "Hydration Optimization",
            ],
          };

      setReport(generated);
      setIsAnalyzing(false);
    }, 1100);
  };

  const handleCopyReport = () => {
    if (!report || typeof navigator === "undefined" || !navigator.clipboard) return;
    const text = `# AI Job Analysis Report: ${report.roleTitle}
Seniority Level: ${report.level}
Match Score: ${report.matchScore}%

## Overview
${report.overview}

## Core Skills
${report.requiredSkills.map((s) => `- ${s.name} (${s.level})`).join("\n")}

## Key Responsibilities
${report.responsibilities.map((r) => `- ${r}`).join("\n")}

## Identified Skill Gaps
${report.gapSkills.map((g) => `- ${g}`).join("\n")}

## Recommended Interview Focus
${report.interviewTips.map((t) => `- ${t}`).join("\n")}
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setJobText("");
    setReport(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="flex flex-col flex-1 h-full min-h-0 bg-[#FAFAFC] dark:bg-[#0E0C15] text-zinc-900 dark:text-zinc-100 font-lexend">
      {/* Top Header */}
      <WorkspaceHeader
        title="AI Job Analysis"
        breadcrumbs={[
          { label: "Workspace" },
          { label: "AI Job Analysis" },
        ]}
        subtitle="Role competency breakdown, ATS keyword extraction, and gap matrix"
        actions={
          report && (
            <>
              <button
                type="button"
                onClick={handleCopyReport}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4]"
              >
                {copied ? (
                  <>
                    <Check className="size-3.5 text-emerald-500" />
                    <span className="text-emerald-500">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    <span>Copy Report</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <RotateCcw className="size-3.5" />
                <span>Reset</span>
              </button>
            </>
          )
        }
      />

      {/* Main Analysis Body */}
      <div className="flex-1 overflow-y-auto min-h-0 custom-scrollbar p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto space-y-6">
        {/* Input Box Card */}
        <div className="p-4 sm:p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#111217] shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
              <Briefcase className="size-3.5 text-[#713CF4]" />
              Role Description Intake
            </span>
            <span className="text-[11px] text-zinc-400">Competency Extractor V2</span>
          </div>

          <div className="space-y-1.5">
            <textarea
              rows={4}
              value={jobText}
              onChange={(e) => setJobText(e.target.value)}
              placeholder="Paste complete job description, key responsibilities, candidate requirements, or role specification..."
              className="w-full resize-none rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/60 p-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 outline-none focus:border-[#713CF4] focus:ring-2 focus:ring-[#713CF4]/20 transition-all font-normal"
            />
          </div>

          {/* Quick presets */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] text-zinc-400 dark:text-zinc-500 mr-1 select-none">
              Load sample job:
            </span>
            {SAMPLE_JOB_PRESETS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setJobText(preset.text)}
                className="text-[11.5px] px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 hover:text-[#713CF4] dark:hover:text-[#a78bfa] hover:bg-[#713CF4]/10 transition-colors cursor-pointer"
              >
                {preset.title}
              </button>
            ))}
          </div>

          {/* Footer Controls: Seniority + CTA */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-zinc-100 dark:border-zinc-850">
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                Target Level:
              </span>
              <div className="flex gap-1">
                {["Mid-Level", "Senior", "Staff / Lead"].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSeniorityLevel(lvl)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-[#713CF4] ${
                      seniorityLevel === lvl
                        ? "bg-[#713CF4] text-white shadow-2xs"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleRunAnalysis}
              disabled={!jobText.trim() || isAnalyzing}
              className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] ${
                jobText.trim() && !isAnalyzing
                  ? "bg-[#713CF4] hover:bg-[#602ee0] active:bg-[#5223c7] text-white shadow-xs cursor-pointer"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed"
              }`}
            >
              {isAnalyzing ? (
                <>
                  <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Synthesizing Competencies...</span>
                </>
              ) : (
                <>
                  <Sparkles className="size-4" />
                  <span>Analyze Job Requirements</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Loading Indicator */}
        {isAnalyzing && (
          <div className="p-8 text-center space-y-3 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#111217] animate-pulse">
            <div className="size-10 rounded-xl bg-[#713CF4]/15 text-[#713CF4] flex items-center justify-center mx-auto">
              <Sparkles className="size-5 animate-spin" />
            </div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Extracting Core Competencies & Gap Vectors...
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
              Parsing requirements, classifying technical skills, and scoring candidate market readiness.
            </p>
          </div>
        )}

        {/* Structured Results Dashboard */}
        {!isAnalyzing && report && (
          <div className="space-y-6">
            {/* Overview Banner Card */}
            <div className="p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#111217] shadow-2xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-50">
                      {report.roleTitle}
                    </h2>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#713CF4]/10 text-[#713CF4] dark:text-[#a78bfa] font-medium border border-[#713CF4]/20">
                      {report.level}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed font-normal">
                    {report.overview}
                  </p>
                </div>

                {/* Score Pill */}
                <div className="shrink-0 flex items-center gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-850">
                  <div className="flex items-center justify-center size-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
                    <Award className="size-5" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-zinc-900 dark:text-zinc-50 font-mono">
                      {report.matchScore}%
                    </div>
                    <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium">
                      Market Readiness
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2-Column Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Column A: Core Skills & ATS Keywords */}
              <div className="space-y-5">
                {/* Core Technical Skills */}
                <div className="p-4 sm:p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#111217] shadow-2xs space-y-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                    <Target className="size-3.5 text-[#713CF4]" />
                    Required Technical Skills
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {report.requiredSkills.map((sk, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200/70 dark:border-zinc-800/70 text-xs"
                      >
                        <span className="font-medium text-zinc-900 dark:text-zinc-100">
                          {sk.name}
                        </span>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-medium ${
                            sk.level === "Expert"
                              ? "bg-[#713CF4]/15 text-[#713CF4] dark:text-[#a78bfa]"
                              : "bg-zinc-200/60 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                          }`}
                        >
                          {sk.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ATS Keywords */}
                <div className="p-4 sm:p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#111217] shadow-2xs space-y-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                    <Zap className="size-3.5 text-amber-500" />
                    High-Impact Resume Keywords
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {report.atsKeywords.map((kw, idx) => (
                      <span
                        key={idx}
                        className="text-[11.5px] px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-amber-900/40 font-mono font-medium"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Responsibilities */}
                <div className="p-4 sm:p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#111217] shadow-2xs space-y-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-emerald-500" />
                    Key Deliverables & Responsibilities
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-[13px] text-zinc-700 dark:text-zinc-300">
                    {report.responsibilities.map((r, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="size-1.5 rounded-full bg-[#713CF4] mt-1.5 shrink-0" />
                        <span className="leading-relaxed">{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Column B: Gaps, Tips & Qualifications */}
              <div className="space-y-5">
                {/* Skill Gaps */}
                <div className="p-4 sm:p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#111217] shadow-2xs space-y-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                    <AlertCircle className="size-3.5 text-rose-500" />
                    Identified Gap Areas & Potential Blindspots
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-[13px] text-zinc-700 dark:text-zinc-300">
                    {report.gapSkills.map((gap, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 p-2.5 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30"
                      >
                        <span className="text-rose-500 font-bold">•</span>
                        <span className="leading-relaxed">{gap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Interview Preparation Tips */}
                <div className="p-4 sm:p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#111217] shadow-2xs space-y-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                    <Sparkles className="size-3.5 text-[#713CF4]" />
                    Targeted Interview Preparation Strategy
                  </h3>
                  <ul className="space-y-2.5 text-xs sm:text-[13px] text-zinc-700 dark:text-zinc-300">
                    {report.interviewTips.map((tip, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 p-2.5 rounded-xl bg-[#713CF4]/5 dark:bg-[#713CF4]/10 border border-[#713CF4]/15"
                      >
                        <span className="text-[#713CF4] font-semibold text-xs shrink-0 mt-0.5">
                          #{idx + 1}
                        </span>
                        <span className="leading-relaxed">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isAnalyzing && !report && (
          <div className="py-8 text-center max-w-lg mx-auto space-y-3">
            <div className="size-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 flex items-center justify-center mx-auto">
              <Briefcase className="size-6" />
            </div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Paste a Job Post or Select a Preset
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
              Extract technical stack competencies, identify resume gaps, and generate
              tailored interview preparation strategies tailored to your target seniority tier.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
