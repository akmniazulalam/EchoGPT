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
  FileText,
  FileCheck2,
  HelpCircle,
  Clock,
  Plus,
  Send,
  Lightbulb,
  X,
  Eye,
  Link as LinkIcon,
  ChevronRight,
} from "lucide-react";
import { WorkspaceHeader } from "@/components/workspace/WorkspaceHeader";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

interface SkillItem {
  name: string;
  level: "Expert" | "Advanced" | "Proficient";
  category: "Core Tech" | "Architecture" | "Tools";
  match: "Matched" | "Partial" | "Missing";
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
  tailoringAdvice: string[];
  interviewTips: string[];
  interviewQuestions: { q: string; tip: string }[];
  atsKeywords: string[];
}

// ─────────────────────────────────────────────
// Default Active Candidate Profile / CV
// ─────────────────────────────────────────────

const DEFAULT_CANDIDATE_RESUME = {
  name: "Alex Morgan",
  title: "Senior Full-Stack & Frontend Engineer",
  location: "San Francisco, CA (Remote Available)",
  email: "alex.morgan.dev@gmail.com",
  portfolio: "https://echogpt.live",
  summary:
    "Senior Frontend & Full-Stack Engineer with 6+ years of production experience building high-performance web applications with React 19, Next.js (App Router), TypeScript, and Tailwind CSS. Proven track record leading design systems, sub-second web vitals optimization, and integrating multimodal AI streaming interfaces.",
  coreSkills: [
    "React 19 & Next.js (App Router)",
    "TypeScript & Strict Type Architectures",
    "Tailwind CSS v4 & Design Tokens",
    "Web Performance (Core Web Vitals, SSR, Hydration)",
    "WCAG 2.1 AA Accessibility & ARIA Semantics",
    "State Management & Client-side Stores",
    "Generative AI Streaming & Server-Sent Events",
    "Node.js, RESTful APIs & GraphQL",
  ],
  experience: [
    {
      role: "Lead Frontend Engineer",
      company: "Synthetix Labs",
      period: "2023 – Present",
      bullets: [
        "Architected multi-model workspace in Next.js App Router supporting 100K+ monthly active creative professionals.",
        "Built accessible keyboard-first design system with zero hydration layout shifts across desktop and mobile.",
        "Optimized client state and asset caching, reducing time-to-interactive by 44% across all workspace routes.",
      ],
    },
    {
      role: "Senior Software Engineer",
      company: "CloudScale Systems",
      period: "2020 – 2023",
      bullets: [
        "Spearheaded enterprise dashboard redesign, cutting page load from 3.2s to sub-800ms.",
        "Mentored 6 engineers on modern TypeScript patterns, accessibility standards, and responsive workflows.",
      ],
    },
  ],
  education: "B.S. in Computer Science, University of California, Berkeley (2020)",
};

// ─────────────────────────────────────────────
// Sample Presets
// ─────────────────────────────────────────────

const SAMPLE_JOB_PRESETS = [
  {
    title: "Senior Frontend Engineer (Next.js / TypeScript)",
    url: "https://careers.echogpt.live/jobs/senior-frontend",
    text: `Job Title: Senior Frontend Engineer
Company: EchoGPT AI Systems
Location: Remote (US / Global)

About the Role:
We are looking for a Senior Frontend Engineer to lead the architecture of our AI productivity platform. You will build high-speed streaming workspaces, responsive design systems, and model-switching workflows.

Requirements:
- 5+ years building production web applications with React, TypeScript, and Next.js (App Router).
- Deep understanding of web performance, Core Web Vitals, SSR hydration, and state management.
- Experience with Tailwind CSS, accessible UI components (ARIA), and responsive multi-viewport design.
- Familiarity with AI developer tools, streaming interfaces, and client-side caching strategies.
- Strong communication skills, technical mentorship, and ability to collaborate with product designers.`,
  },
  {
    title: "AI Product Manager (Enterprise SaaS)",
    url: "https://careers.echogpt.live/jobs/ai-product-manager",
    text: `Job Title: AI Product Manager (Enterprise SaaS)
Company: EchoGPT AI Systems
Location: San Francisco, CA / Remote

About the Role:
Seeking an experienced AI Product Manager to define roadmap strategy for generative AI enterprise workflows and multi-model collaboration tools.

Requirements:
- 4+ years of product management experience in B2B SaaS with AI/ML integrations.
- Track record of delivering user-centric generative features from discovery through monetization.
- Fluency in LLM evaluation metrics, token economics, latency considerations, and model fine-tuning.
- Proven ability to bridge cross-functional teams: engineering, UX research, compliance, and sales.`,
  },
  {
    title: "Full-Stack AI Engineer (Python / Next.js)",
    url: "https://careers.echogpt.live/jobs/fullstack-ai-engineer",
    text: `Job Title: Full-Stack AI Engineer
Company: Frontier Intelligence
Location: Remote

About the Role:
Build and scale intelligent application backends and interactive client interfaces for multi-agent workflows and autonomous developer assistants.

Requirements:
- 4+ years full-stack development experience with Next.js, TypeScript, and Python (FastAPI).
- Hands-on experience with vector databases, embeddings, and RAG architectures.
- Experience building production LLM pipelines, prompt evaluation benchmarks, and streaming endpoints.`,
  },
];

// ─────────────────────────────────────────────
// Component Implementation
// ─────────────────────────────────────────────

export function JobAnalysisWorkspace() {
  const [jobText, setJobText] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [inputMode, setInputMode] = useState<"text" | "url">("text");
  const [seniorityLevel, setSeniorityLevel] = useState("Senior");
  const [insightsMode, setInsightsMode] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [report, setReport] = useState<AnalysisReport | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "description" | "resume" | "skills" | "interviews">("all");
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [selectedFeatureCard, setSelectedFeatureCard] = useState<number | null>(null);

  const handleRunAnalysis = () => {
    const query = inputMode === "url" ? jobUrl.trim() : jobText.trim();
    if (!query || isAnalyzing) return;

    setIsAnalyzing(true);
    setAnalysisStep(1);
    setReport(null);

    // Multi-stage simulated analysis
    setTimeout(() => setAnalysisStep(2), 350);
    setTimeout(() => setAnalysisStep(3), 700);

    setTimeout(() => {
      const lower = query.toLowerCase();
      const isPM = lower.includes("product") || lower.includes("roadmap") || lower.includes("pm");

      const generated: AnalysisReport = isPM
        ? {
            roleTitle: "AI Product Manager (Enterprise SaaS)",
            level: seniorityLevel,
            matchScore: 89,
            overview:
              "High-impact strategic role requiring a balance of frontier LLM technical fluency, user journey design, B2B pricing telemetry, and cross-functional leadership.",
            requiredSkills: [
              { name: "Product Roadmap Strategy", level: "Expert", category: "Core Tech", match: "Matched" },
              { name: "LLM Evaluation Metrics", level: "Advanced", category: "Core Tech", match: "Matched" },
              { name: "User Journey & UX Discovery", level: "Expert", category: "Architecture", match: "Matched" },
              { name: "Token Economics & Unit Margins", level: "Advanced", category: "Tools", match: "Partial" },
              { name: "Cross-Functional Leadership", level: "Expert", category: "Architecture", match: "Matched" },
              { name: "Multi-Agent Orchestration", level: "Proficient", category: "Core Tech", match: "Missing" },
            ],
            responsibilities: [
              "Own the end-to-end lifecycle for generative workspace features from customer discovery to general availability.",
              "Define quantitative quality benchmarks and feedback telemetry for model response consistency.",
              "Partner with engineering leads to balance inference latency, token budgets, and user experience.",
              "Conduct customer discovery interviews and translate enterprise requirements into concise PRDs.",
            ],
            qualifications: [
              "4+ years direct experience managing B2B SaaS software products.",
              "Demonstrated portfolio of shipped AI or data-intensive workflows.",
              "Experience with enterprise compliance, privacy standards, and data governance.",
            ],
            gapSkills: [
              "Direct experience with multi-agent orchestration frameworks (LangGraph, CrewAI).",
              "Enterprise SOC2/HIPAA compliance frameworks for cloud LLM pipelines.",
            ],
            tailoringAdvice: [
              "Highlight unit economics and inference cost optimization in your past SaaS project summaries.",
              "Emphasize quantitative metrics on user retention and feature adoption from your Synthetix Labs role.",
              "Mention hands-on familiarity with LLM hallucination benchmarking and telemetry pipelines.",
            ],
            interviewTips: [
              "Prepare a detailed case study explaining how you prioritized a feature under tight token cost constraints.",
              "Be ready to discuss how you measure model output hallucinations and customer trust metrics.",
            ],
            interviewQuestions: [
              {
                q: "How would you determine whether to fine-tune an open-source model vs use a proprietary frontier API for an enterprise customer?",
                tip: "Discuss latency, data privacy/residency, long-term token pricing economics, and domain customization depth.",
              },
              {
                q: "Describe a time you balanced user latency expectations against model reasoning quality.",
                tip: "Talk about streaming responses (SSE), progressive disclosure, and optimistic UI updates.",
              },
            ],
            atsKeywords: [
              "Product Strategy",
              "LLM Benchmarks",
              "Generative AI",
              "PRD Drafting",
              "Customer Discovery",
              "Token Optimization",
              "Telemetry Analytics",
              "SaaS Monetization",
            ],
          }
        : {
            roleTitle: "Senior Frontend Engineer (Next.js / TypeScript)",
            level: seniorityLevel,
            matchScore: 95,
            overview:
              "Core architectural position centered on high-performance interactive interfaces, robust client state architectures, sub-second web vitals, and responsive SaaS design systems.",
            requiredSkills: [
              { name: "React 19 & Next.js App Router", level: "Expert", category: "Core Tech", match: "Matched" },
              { name: "TypeScript (Strict Typing)", level: "Expert", category: "Core Tech", match: "Matched" },
              { name: "Tailwind CSS & Token Systems", level: "Advanced", category: "Core Tech", match: "Matched" },
              { name: "Web Vitals & Performance Profiling", level: "Advanced", category: "Architecture", match: "Matched" },
              { name: "Accessibility (WCAG 2.1 & ARIA)", level: "Advanced", category: "Architecture", match: "Matched" },
              { name: "Client-side Persistence & Stores", level: "Proficient", category: "Tools", match: "Matched" },
              { name: "WebSocket & Streaming (SSE)", level: "Proficient", category: "Tools", match: "Partial" },
            ],
            responsibilities: [
              "Architect scalable Next.js component systems utilizing shared route groups and layout hierarchies.",
              "Implement sub-second responsive UI with zero hydration layout shifts across desktop and mobile viewports.",
              "Build accessible, keyboard-first interactive controls with proper focus management and ARIA states.",
              "Collaborate closely with product designers to implement subtle brand accents, clean typography, and dual light/dark themes.",
            ],
            qualifications: [
              "5+ years professional experience building enterprise or consumer-grade web frontends.",
              "Demonstrated mastery of JavaScript/TypeScript execution models and browser DOM lifecycles.",
              "Proven track record delivering fluid responsive web applications without layout thrashing.",
            ],
            gapSkills: [
              "Production real-time WebSocket streaming architectures for token-by-token rendering under packet jitter.",
              "Automated end-to-end visual regression testing pipelines (Playwright/Cypress) in CI/CD.",
            ],
            tailoringAdvice: [
              "Bring your experience with Next.js App Router and React 19 to the very top of your CV summary.",
              "Highlight the 42% bundle size reduction and zero-CLS metrics achieved at Synthetix Labs.",
              "Quantify accessibility achievements (e.g. 100% keyboard accessibility audit score) in your bullet points.",
            ],
            interviewTips: [
              "Emphasize how you solved hydration mismatch warnings and React 19 compiler effect linting rules.",
              "Highlight practical experience calibrating font metrics (e.g. Lexend) to eliminate layout shifts.",
            ],
            interviewQuestions: [
              {
                q: "How do you approach hydration mismatch errors and layout shifts when building dynamic themes in Next.js?",
                tip: "Explain suppression of hydration warnings, SSR inline theme scripts, and using external stores with useSyncExternalStore.",
              },
              {
                q: "Walk through how you would architect a side-by-side model comparison workspace that streams two live LLM outputs simultaneously.",
                tip: "Discuss independent fetch streams, reader chunk decoders, memory leaks prevention, and auto-scroll cancellation.",
              },
            ],
            atsKeywords: [
              "Next.js App Router",
              "TypeScript",
              "Tailwind CSS",
              "Responsive Architecture",
              "Core Web Vitals",
              "ARIA Accessibility",
              "Design Systems",
              "Hydration Optimization",
              "State Persistence",
            ],
          };

      setReport(generated);
      setIsAnalyzing(false);
      setAnalysisStep(0);
    }, 1100);
  };

  const handleCopyReport = () => {
    if (!report || typeof navigator === "undefined" || !navigator.clipboard) return;
    const text = `# AI Job Analysis Report: ${report.roleTitle}
Seniority Level: ${report.level}
Match Score: ${report.matchScore}%
Candidate: ${DEFAULT_CANDIDATE_RESUME.name} (${DEFAULT_CANDIDATE_RESUME.title})

## Role Overview
${report.overview}

## Core Required Skills
${report.requiredSkills.map((s) => `- ${s.name} (${s.level}) - ${s.match}`).join("\n")}

## High-Impact ATS Keywords
${report.atsKeywords.join(", ")}

## Key Deliverables & Responsibilities
${report.responsibilities.map((r) => `- ${r}`).join("\n")}

## Identified Skill Gaps
${report.gapSkills.map((g) => `- ${g}`).join("\n")}

## Resume Tailoring Recommendations
${report.tailoringAdvice.map((a) => `- ${a}`).join("\n")}

## Interview Preparation Tips
${report.interviewTips.map((t) => `- ${t}`).join("\n")}
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setJobText("");
    setJobUrl("");
    setReport(null);
    setIsAnalyzing(false);
    setSelectedFeatureCard(null);
    setActiveTab("all");
  };

  const handleFeatureCardClick = (idx: number) => {
    setSelectedFeatureCard(idx);
    if (idx === 0) {
      // Analyze Job Description -> preset 1
      setJobText(SAMPLE_JOB_PRESETS[0].text);
      setInputMode("text");
    } else if (idx === 1) {
      // Tailor Your Resume -> open resume modal or set tab
      setIsResumeModalOpen(true);
    } else if (idx === 2) {
      // Prepare for Interviews -> preset 2
      setJobText(SAMPLE_JOB_PRESETS[1].text);
      setInputMode("text");
    } else if (idx === 3) {
      // Skill Gap Analysis -> preset 0
      setJobText(SAMPLE_JOB_PRESETS[0].text);
      setInputMode("text");
    }
  };

  return (
    <div className="flex flex-col flex-1 h-full min-h-0 bg-[#FAFAFC] dark:bg-[#0E0C15] text-zinc-900 dark:text-zinc-100 font-lexend">
      {/* Top Workspace Header */}
      <WorkspaceHeader
        title="AI Job Analysis"
        breadcrumbs={[{ label: "Workspace" }, { label: "Resume" }]}
        subtitle="Analyze job requirements, tailor your resume, and prepare for interviews"
        actions={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsResumeModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-[#713CF4]/10 hover:text-[#713CF4] dark:hover:text-[#a78bfa] border border-zinc-200/80 dark:border-zinc-700/80 transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4]"
              aria-label="View Active Resume"
            >
              <Eye className="size-3.5 text-[#713CF4]" />
              <span>View Resume</span>
            </button>

            {report && (
              <>
                <button
                  type="button"
                  onClick={handleCopyReport}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4]"
                >
                  {copied ? (
                    <>
                      <Check className="size-3.5 text-emerald-500" />
                      <span className="text-emerald-500 font-medium">Copied</span>
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
                  aria-label="Reset Analysis"
                >
                  <RotateCcw className="size-3.5" />
                  <span>Reset</span>
                </button>
              </>
            )}
          </div>
        }
      />

      {/* Main Scrollable Canvas */}
      <div className="flex-1 overflow-y-auto min-h-0 custom-scrollbar p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* ─────────────────────────────────────────────────────────────
              1. HERO / TITLE (FAITHFUL TO ORIGINAL ECHOGPT SCREENSHOT)
              "EchoGPT – AI Job Insight [Assistant]"
             ───────────────────────────────────────────────────────────── */}
          <div className="text-center space-y-3 pt-2 sm:pt-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              <span>EchoGPT – AI Job Insight</span>
              <span className="inline-flex items-center px-3.5 py-1 rounded-xl bg-[#713CF4] text-white text-xl sm:text-2xl font-bold shadow-[0_0_20px_rgba(113,60,244,0.45)]">
                Assistant
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto font-normal leading-relaxed">
              Analyze any job posting to extract required competencies, identify resume gaps,
              and receive tailored interview strategies against your active CV.
            </p>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              2. FOUR FEATURE CARDS (ORIGINAL 2x2 GRID IN SCREENSHOT)
             ───────────────────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Card 1: Analyze Job Description */}
            <button
              type="button"
              onClick={() => handleFeatureCardClick(0)}
              className={`group flex flex-col items-center sm:items-start text-center sm:text-left p-5 rounded-2xl border transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] ${
                selectedFeatureCard === 0
                  ? "bg-white dark:bg-[#14151C] border-[#713CF4] ring-1 ring-[#713CF4]/40 shadow-sm"
                  : "bg-white dark:bg-[#111217] border-zinc-200/80 dark:border-zinc-800/80 hover:border-[#713CF4]/50 hover:bg-zinc-50/50 dark:hover:bg-[#14151C]"
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <FileText className="size-4 text-[#713CF4] dark:text-[#a78bfa]" />
                <h3 className="text-sm sm:text-base font-semibold text-[#713CF4] dark:text-[#a78bfa] group-hover:text-[#602ee0] dark:group-hover:text-[#c4b5fd] transition-colors">
                  Analyze Job Description
                </h3>
              </div>
              <p className="text-xs sm:text-[13px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                Instantly get AI-powered insights for any job posting.
              </p>
            </button>

            {/* Card 2: Tailor Your Resume */}
            <button
              type="button"
              onClick={() => handleFeatureCardClick(1)}
              className={`group flex flex-col items-center sm:items-start text-center sm:text-left p-5 rounded-2xl border transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] ${
                selectedFeatureCard === 1
                  ? "bg-white dark:bg-[#14151C] border-[#713CF4] ring-1 ring-[#713CF4]/40 shadow-sm"
                  : "bg-white dark:bg-[#111217] border-zinc-200/80 dark:border-zinc-800/80 hover:border-[#713CF4]/50 hover:bg-zinc-50/50 dark:hover:bg-[#14151C]"
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <FileCheck2 className="size-4 text-[#713CF4] dark:text-[#a78bfa]" />
                <h3 className="text-sm sm:text-base font-semibold text-[#713CF4] dark:text-[#a78bfa] group-hover:text-[#602ee0] dark:group-hover:text-[#c4b5fd] transition-colors">
                  Tailor Your Resume
                </h3>
              </div>
              <p className="text-xs sm:text-[13px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                Get suggestions to match your CV to the job requirements.
              </p>
            </button>

            {/* Card 3: Prepare for Interviews */}
            <button
              type="button"
              onClick={() => handleFeatureCardClick(2)}
              className={`group flex flex-col items-center sm:items-start text-center sm:text-left p-5 rounded-2xl border transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] ${
                selectedFeatureCard === 2
                  ? "bg-white dark:bg-[#14151C] border-[#713CF4] ring-1 ring-[#713CF4]/40 shadow-sm"
                  : "bg-white dark:bg-[#111217] border-zinc-200/80 dark:border-zinc-800/80 hover:border-[#713CF4]/50 hover:bg-zinc-50/50 dark:hover:bg-[#14151C]"
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <HelpCircle className="size-4 text-[#713CF4] dark:text-[#a78bfa]" />
                <h3 className="text-sm sm:text-base font-semibold text-[#713CF4] dark:text-[#a78bfa] group-hover:text-[#602ee0] dark:group-hover:text-[#c4b5fd] transition-colors">
                  Prepare for Interviews
                </h3>
              </div>
              <p className="text-xs sm:text-[13px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                Practice with AI-generated interview questions and tips.
              </p>
            </button>

            {/* Card 4: Skill Gap Analysis */}
            <button
              type="button"
              onClick={() => handleFeatureCardClick(3)}
              className={`group flex flex-col items-center sm:items-start text-center sm:text-left p-5 rounded-2xl border transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] ${
                selectedFeatureCard === 3
                  ? "bg-white dark:bg-[#14151C] border-[#713CF4] ring-1 ring-[#713CF4]/40 shadow-sm"
                  : "bg-white dark:bg-[#111217] border-zinc-200/80 dark:border-zinc-800/80 hover:border-[#713CF4]/50 hover:bg-zinc-50/50 dark:hover:bg-[#14151C]"
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Target className="size-4 text-[#713CF4] dark:text-[#a78bfa]" />
                <h3 className="text-sm sm:text-base font-semibold text-[#713CF4] dark:text-[#a78bfa] group-hover:text-[#602ee0] dark:group-hover:text-[#c4b5fd] transition-colors">
                  Skill Gap Analysis
                </h3>
              </div>
              <p className="text-xs sm:text-[13px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                Discover key skills to focus on for your target role.
              </p>
            </button>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              3. ACTIVE RESUME STATUS STRIP
             ───────────────────────────────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 py-2.5 rounded-xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/70 dark:bg-[#121319]/70 text-xs">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-zinc-500 dark:text-zinc-400 font-normal">Active Resume:</span>
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                {DEFAULT_CANDIDATE_RESUME.name} – {DEFAULT_CANDIDATE_RESUME.title}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsResumeModalOpen(true)}
              className="inline-flex items-center gap-1 text-[#713CF4] dark:text-[#a78bfa] hover:underline font-medium cursor-pointer"
            >
              <span>View & Verify Resume</span>
              <ChevronRight className="size-3.5" />
            </button>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              4. MAIN JOB INTAKE INPUT BOX (MATCHING SCREENSHOT)
             ───────────────────────────────────────────────────────────── */}
          <div className="p-4 sm:p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#111217] shadow-sm space-y-4">
            {/* Top Toolbar inside Input Card */}
            <div className="flex items-center justify-between gap-2 pb-1">
              {/* Mode switch */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setInputMode("text")}
                  className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                    inputMode === "text"
                      ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-2xs"
                      : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                  }`}
                >
                  Job Description
                </button>
                <button
                  type="button"
                  onClick={() => setInputMode("url")}
                  className={`px-3 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                    inputMode === "url"
                      ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-2xs"
                      : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                  }`}
                >
                  <LinkIcon className="size-3" />
                  <span>Job URL</span>
                </button>
              </div>

              {/* Top-right icons: '+' and Clock (from screenshot) */}
              <div className="flex items-center gap-1.5 text-zinc-400 dark:text-zinc-500">
                <button
                  type="button"
                  onClick={() => {
                    setInputMode("text");
                    setJobText(SAMPLE_JOB_PRESETS[0].text);
                  }}
                  title="Insert sample posting"
                  className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                >
                  <Plus className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setJobText(SAMPLE_JOB_PRESETS[1].text);
                  }}
                  title="Load previous preset"
                  className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                >
                  <Clock className="size-4" />
                </button>
              </div>
            </div>

            {/* Input Surface */}
            {inputMode === "text" ? (
              <textarea
                rows={5}
                value={jobText}
                onChange={(e) => setJobText(e.target.value)}
                placeholder="Paste job title & description here..."
                className="w-full resize-none rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-[#0A090F]/70 p-3.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 outline-none focus:border-[#713CF4] focus:ring-2 focus:ring-[#713CF4]/20 transition-all font-normal leading-relaxed"
              />
            ) : (
              <div className="space-y-2">
                <div className="relative">
                  <LinkIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
                  <input
                    type="url"
                    value={jobUrl}
                    onChange={(e) => setJobUrl(e.target.value)}
                    placeholder="Paste job posting URL (e.g. https://linkedin.com/jobs/view/...)"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-[#0A090F]/70 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 outline-none focus:border-[#713CF4] focus:ring-2 focus:ring-[#713CF4]/20 transition-all"
                  />
                </div>
                <p className="text-[11px] text-zinc-400 px-1">
                  Our crawler extracts key requirements, ATS keywords, and candidate qualifications directly from public job postings.
                </p>
              </div>
            )}

            {/* Quick Sample Presets */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] text-zinc-400 dark:text-zinc-500 mr-1 select-none">
                Sample postings:
              </span>
              {SAMPLE_JOB_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setInputMode("text");
                    setJobText(preset.text);
                  }}
                  className="text-[11.5px] px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 hover:text-[#713CF4] dark:hover:text-[#a78bfa] hover:bg-[#713CF4]/10 transition-colors cursor-pointer"
                >
                  {preset.title.split("(")[0].trim()}
                </button>
              ))}
            </div>

            {/* Bottom Row inside Input Box (Matching Screenshot): Job Insights pill + Analyze Job CTA */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-zinc-100 dark:border-zinc-800/80">
              <div className="flex items-center gap-2">
                {/* Pill button from screenshot: '💡 Job Insights' */}
                <button
                  type="button"
                  onClick={() => setInsightsMode((prev) => !prev)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                    insightsMode
                      ? "bg-[#713CF4]/10 border-[#713CF4]/30 text-[#713CF4] dark:text-[#a78bfa]"
                      : "bg-zinc-100 dark:bg-zinc-800 border-transparent text-zinc-500"
                  }`}
                >
                  <Lightbulb className="size-3.5" />
                  <span>Job Insights</span>
                </button>

                {/* Target Level */}
                <div className="hidden sm:flex items-center gap-1 pl-2">
                  <span className="text-[11px] text-zinc-400 mr-1">Level:</span>
                  {["Mid-Level", "Senior", "Staff / Lead"].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSeniorityLevel(lvl)}
                      className={`px-2 py-0.5 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                        seniorityLevel === lvl
                          ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
                          : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Primary Analyze Job Button (With Airplane/Send icon from screenshot) */}
              <button
                type="button"
                onClick={handleRunAnalysis}
                disabled={(inputMode === "text" ? !jobText.trim() : !jobUrl.trim()) || isAnalyzing}
                className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] focus-visible:ring-offset-2 ${
                  (inputMode === "text" ? jobText.trim() : jobUrl.trim()) && !isAnalyzing
                    ? "bg-[#713CF4] hover:bg-[#602ee0] active:bg-[#5223c7] text-white shadow-sm cursor-pointer hover:shadow-[0_0_15px_rgba(113,60,244,0.35)]"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed"
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <span>Analyze Job</span>
                    <Send className="size-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              5. MULTI-STAGE LOADING STATE
             ───────────────────────────────────────────────────────────── */}
          {isAnalyzing && (
            <div className="p-6 sm:p-8 text-center space-y-4 rounded-2xl border border-[#713CF4]/30 bg-white dark:bg-[#111217] shadow-sm animate-pulse">
              <div className="size-12 rounded-2xl bg-[#713CF4]/15 text-[#713CF4] flex items-center justify-center mx-auto">
                <Sparkles className="size-6 animate-spin" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  {analysisStep === 1 && "Parsing job requirements and key responsibilities..."}
                  {analysisStep === 2 && "Cross-referencing candidate CV with role profile..."}
                  {analysisStep === 3 && "Synthesizing ATS keywords, skill gaps, and interview prep..."}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Generating precision insights tailored to {DEFAULT_CANDIDATE_RESUME.name}&apos;s profile
                </p>
              </div>

              {/* Progress bar */}
              <div className="max-w-xs mx-auto w-full h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                <div
                  className="h-full bg-[#713CF4] transition-all duration-300"
                  style={{ width: `${analysisStep * 33.3}%` }}
                />
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              6. STRUCTURED RESULTS DASHBOARD
             ───────────────────────────────────────────────────────────── */}
          {!isAnalyzing && report && (
            <div className="space-y-6 pt-2">
              {/* Score & Overview Banner Card */}
              <div className="p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#111217] shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-50">
                        {report.roleTitle}
                      </h2>
                      <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#713CF4]/10 text-[#713CF4] dark:text-[#a78bfa] font-semibold border border-[#713CF4]/20">
                        {report.level}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed font-normal">
                      {report.overview}
                    </p>
                  </div>

                  {/* Match Score */}
                  <div className="shrink-0 flex items-center gap-3 p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center justify-center size-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
                      <Award className="size-5" />
                    </div>
                    <div>
                      <div className="text-xl font-bold text-zinc-900 dark:text-zinc-50 font-mono">
                        {report.matchScore}%
                      </div>
                      <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium">
                        Market Readiness
                      </div>
                    </div>
                  </div>
                </div>

                {/* Filter Tabs corresponding to Feature Cards */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-zinc-100 dark:border-zinc-800/60">
                  <button
                    type="button"
                    onClick={() => setActiveTab("all")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      activeTab === "all"
                        ? "bg-[#713CF4] text-white"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                    }`}
                  >
                    All Insights
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("description")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      activeTab === "description"
                        ? "bg-[#713CF4] text-white"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                    }`}
                  >
                    1. Job Requirements
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("resume")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      activeTab === "resume"
                        ? "bg-[#713CF4] text-white"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                    }`}
                  >
                    2. Tailor Resume & ATS
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("skills")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      activeTab === "skills"
                        ? "bg-[#713CF4] text-white"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                    }`}
                  >
                    3. Skill Gap Matrix
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("interviews")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      activeTab === "interviews"
                        ? "bg-[#713CF4] text-white"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                    }`}
                  >
                    4. Interview Prep
                  </button>
                </div>
              </div>

              {/* 2-Column Content Sections */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Column 1: Requirements & Tailoring */}
                <div className="space-y-5">
                  {/* Job Requirements */}
                  {(activeTab === "all" || activeTab === "description") && (
                    <div className="p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#111217] shadow-sm space-y-3">
                      <div className="flex items-center gap-2">
                        <Briefcase className="size-4 text-[#713CF4]" />
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                          Key Responsibilities & Deliverables
                        </h3>
                      </div>
                      <ul className="space-y-2 text-xs sm:text-[13px] text-zinc-700 dark:text-zinc-300">
                        {report.responsibilities.map((r, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="size-1.5 rounded-full bg-[#713CF4] mt-1.5 shrink-0" />
                            <span className="leading-relaxed">{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tailoring Advice */}
                  {(activeTab === "all" || activeTab === "resume") && (
                    <div className="p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#111217] shadow-sm space-y-3">
                      <div className="flex items-center gap-2">
                        <FileCheck2 className="size-4 text-emerald-500" />
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                          Resume Tailoring Recommendations
                        </h3>
                      </div>
                      <ul className="space-y-2.5 text-xs sm:text-[13px] text-zinc-700 dark:text-zinc-300">
                        {report.tailoringAdvice.map((advice, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 p-2.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30"
                          >
                            <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{advice}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* High-Impact ATS Keywords */}
                  {(activeTab === "all" || activeTab === "resume") && (
                    <div className="p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#111217] shadow-sm space-y-3">
                      <div className="flex items-center gap-2">
                        <Zap className="size-4 text-amber-500" />
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                          High-Impact ATS Keywords
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {report.atsKeywords.map((kw, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-amber-900/40 font-mono font-medium"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Column 2: Skills Gap & Interview Prep */}
                <div className="space-y-5">
                  {/* Skill Gap Matrix */}
                  {(activeTab === "all" || activeTab === "skills") && (
                    <div className="p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#111217] shadow-sm space-y-3">
                      <div className="flex items-center gap-2">
                        <Target className="size-4 text-[#713CF4]" />
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                          Required Technical Competencies
                        </h3>
                      </div>
                      <div className="space-y-2">
                        {report.requiredSkills.map((sk, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200/70 dark:border-zinc-800/70 text-xs"
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className={`size-2 rounded-full ${
                                  sk.match === "Matched"
                                    ? "bg-emerald-500"
                                    : sk.match === "Partial"
                                    ? "bg-amber-500"
                                    : "bg-rose-500"
                                }`}
                              />
                              <span className="font-medium text-zinc-900 dark:text-zinc-100">
                                {sk.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] text-zinc-400 font-mono">
                                {sk.level}
                              </span>
                              <span
                                className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                                  sk.match === "Matched"
                                    ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40"
                                    : sk.match === "Partial"
                                    ? "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/40"
                                    : "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/40"
                                }`}
                              >
                                {sk.match}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Identified Blindspots */}
                      <div className="pt-2">
                        <div className="flex items-center gap-1.5 mb-2">
                          <AlertCircle className="size-3.5 text-rose-500" />
                          <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">
                            Identified Blindspots & Gaps:
                          </span>
                        </div>
                        <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-300">
                          {report.gapSkills.map((gap, idx) => (
                            <li
                              key={idx}
                              className="p-2 rounded-lg bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30"
                            >
                              • {gap}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Interview Preparation */}
                  {(activeTab === "all" || activeTab === "interviews") && (
                    <div className="p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#111217] shadow-sm space-y-3">
                      <div className="flex items-center gap-2">
                        <HelpCircle className="size-4 text-[#713CF4]" />
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                          Targeted Interview Questions & Strategy
                        </h3>
                      </div>
                      <div className="space-y-3">
                        {report.interviewQuestions.map((item, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-xl bg-[#713CF4]/5 dark:bg-[#713CF4]/10 border border-[#713CF4]/15 space-y-1.5"
                          >
                            <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                              Q{idx + 1}: &ldquo;{item.q}&rdquo;
                            </p>
                            <p className="text-[11.5px] text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                              <span className="font-semibold text-[#713CF4] dark:text-[#a78bfa]">
                                Suggested Angle:{" "}
                              </span>
                              {item.tip}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              7. FOOTER NOTE
             ───────────────────────────────────────────────────────────── */}
          <div className="text-center pt-4 pb-8">
            <p className="text-xs text-zinc-400 dark:text-zinc-500 font-normal">
              EchoGPT Career Intelligence · Cross-references public job postings with active applicant profiles.
            </p>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          8. ACTIVE CANDIDATE RESUME MODAL
         ───────────────────────────────────────────────────────────── */}
      {isResumeModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
        >
          <div className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111217] shadow-2xl overflow-hidden font-lexend animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <FileText className="size-5 text-[#713CF4]" />
                <h3
                  id="resume-modal-title"
                  className="text-base font-bold text-zinc-900 dark:text-zinc-100"
                >
                  Active Candidate Profile / CV
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsResumeModalOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm">
              {/* Profile Intro */}
              <div className="space-y-1 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                  {DEFAULT_CANDIDATE_RESUME.name}
                </h4>
                <p className="text-xs font-semibold text-[#713CF4] dark:text-[#a78bfa]">
                  {DEFAULT_CANDIDATE_RESUME.title}
                </p>
                <p className="text-xs text-zinc-400">
                  {DEFAULT_CANDIDATE_RESUME.location} · {DEFAULT_CANDIDATE_RESUME.email}
                </p>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 pt-2 leading-relaxed font-normal">
                  {DEFAULT_CANDIDATE_RESUME.summary}
                </p>
              </div>

              {/* Core Skills */}
              <div className="space-y-2">
                <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Core Skills & Technologies
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {DEFAULT_CANDIDATE_RESUME.coreSkills.map((sk) => (
                    <span
                      key={sk}
                      className="text-xs px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div className="space-y-3">
                <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Professional Experience
                </h5>
                {DEFAULT_CANDIDATE_RESUME.experience.map((exp) => (
                  <div key={exp.company} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-zinc-900 dark:text-zinc-100">
                        {exp.role} · {exp.company}
                      </span>
                      <span className="text-zinc-400 font-mono">{exp.period}</span>
                    </div>
                    <ul className="space-y-1 text-xs text-zinc-600 dark:text-zinc-300 pl-4 list-disc">
                      {exp.bullets.map((b, i) => (
                        <li key={i} className="leading-relaxed">
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Education */}
              <div className="space-y-1">
                <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Education
                </h5>
                <p className="text-xs text-zinc-700 dark:text-zinc-300">
                  {DEFAULT_CANDIDATE_RESUME.education}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-6 py-3.5 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
              <span className="text-xs text-zinc-400">
                Loaded as active candidate profile for comparison
              </span>
              <button
                type="button"
                onClick={() => setIsResumeModalOpen(false)}
                className="px-4 py-1.5 rounded-xl bg-[#713CF4] hover:bg-[#602ee0] text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Close & Return
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
