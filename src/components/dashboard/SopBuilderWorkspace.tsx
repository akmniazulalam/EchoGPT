"use client";

import React, { useState } from "react";
import {
  FileText,
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  Download,
  Building,
  UserCheck,
  ShieldCheck,
  ArrowRight,
  ListOrdered,
} from "lucide-react";
import { WorkspaceHeader } from "@/components/workspace/WorkspaceHeader";

interface SopStep {
  stepNumber: number;
  title: string;
  role: string;
  action: string;
  verification: string;
}

interface GeneratedSop {
  id: string;
  title: string;
  category: string;
  owner: string;
  version: string;
  effectiveDate: string;
  objective: string;
  inputs: string[];
  steps: SopStep[];
  outputs: string[];
  failureModes: string[];
}

const SOP_TEMPLATES = [
  {
    title: "Production Deployment & Canary Verification Protocol",
    category: "Engineering",
    owner: "Release Commander",
    objective:
      "Establish safe, zero-downtime deployment verification with automatic canary rollback criteria and post-deploy health checks.",
  },
  {
    title: "Severity-1 Incident Response & Escalation Workflow",
    category: "Operations",
    owner: "Incident Lead",
    objective:
      "Triage critical system outages within 5 minutes, coordinate engineering response, and broadcast real-time status updates.",
  },
  {
    title: "Enterprise Customer Onboarding & Integration Checkpoint",
    category: "Customer Success",
    owner: "Solutions Architect",
    objective:
      "Guide enterprise clients through account provisioning, single sign-on verification, and initial workload benchmarking.",
  },
];

export function SopBuilderWorkspace() {
  const [title, setTitle] = useState(SOP_TEMPLATES[0].title);
  const [category, setCategory] = useState(SOP_TEMPLATES[0].category);
  const [owner, setOwner] = useState(SOP_TEMPLATES[0].owner);
  const [objective, setObjective] = useState(SOP_TEMPLATES[0].objective);
  const [isGenerating, setIsGenerating] = useState(false);
  const [sopDoc, setSopDoc] = useState<GeneratedSop | null>(null);
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleApplyTemplate = (tmpl: (typeof SOP_TEMPLATES)[0]) => {
    setTitle(tmpl.title);
    setCategory(tmpl.category);
    setOwner(tmpl.owner);
    setObjective(tmpl.objective);
  };

  const handleGenerate = () => {
    if (!title.trim() || isGenerating) return;
    setIsGenerating(true);
    setSopDoc(null);

    setTimeout(() => {
      const generated: GeneratedSop = {
        id: `SOP-${category.toUpperCase().slice(0, 3)}-2026-${Math.floor(
          100 + Math.random() * 900
        )}`,
        title,
        category,
        owner,
        version: "v1.0.0",
        effectiveDate: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
        objective:
          objective ||
          "Establish standardized operating protocol ensuring operational consistency and quality assurance.",
        inputs: [
          "Verified deployment configuration manifests",
          "Clean lint check and automated test suite sign-off",
          "Approval from designated role lead",
        ],
        steps: [
          {
            stepNumber: 1,
            title: "Pre-Execution Validation & Readiness Check",
            role: owner,
            action:
              "Confirm all staging parameters match production requirements. Review change delta log and notify on-call team.",
            verification: "Status dashboard confirms green across all dependency checks.",
          },
          {
            stepNumber: 2,
            title: "Phased Canary Rollout (10% Traffic Routing)",
            role: "Site Reliability Engineer",
            action:
              "Initiate progressive canary cutover. Monitor error budget telemetry and latency percentiles (P95/P99) for 10 minutes.",
            verification: "Zero 5xx threshold spikes detected on telemetry graph.",
          },
          {
            stepNumber: 3,
            title: "Broad Release & Cache Revalidation",
            role: owner,
            action:
              "Promote deployment to 100% active routing. Invalidate CDN edge caches and run synthetic end-to-end user transactions.",
            verification: "Edge cache hit ratio returns to baseline (>95%).",
          },
          {
            stepNumber: 4,
            title: "Post-Release Logging & Stakeholder Confirmation",
            role: "Operations Coordinator",
            action:
              "Record changelog ID in centralized operations audit log. Send release summary notification to product stakeholders.",
            verification: "Confirmation receipt archived in compliance audit repository.",
          },
        ],
        outputs: [
          "Live verified production service status",
          "Audit trail log entry with timestamp and sign-off",
          "Telemetry performance baseline report",
        ],
        failureModes: [
          "Canary error rate exceeds 0.1%: Automatic instant rollback to previous stable tag.",
          "Cache invalidation timeout: Force edge purge via CLI secondary token.",
        ],
      };

      setSopDoc(generated);
      setIsGenerating(false);
    }, 1100);
  };

  const handleCopyMarkdown = () => {
    if (!sopDoc || typeof navigator === "undefined" || !navigator.clipboard) return;

    const md = `# Standard Operating Procedure: ${sopDoc.title}
**Document ID:** ${sopDoc.id} | **Version:** ${sopDoc.version} | **Effective Date:** ${sopDoc.effectiveDate}
**Department:** ${sopDoc.category} | **Primary Owner:** ${sopDoc.owner}

---

### 1. Objective & Scope
${sopDoc.objective}

### 2. Prerequisites & Inputs
${sopDoc.inputs.map((i) => `- ${i}`).join("\n")}

### 3. Step-by-Step Execution Workflow
${sopDoc.steps
  .map(
    (s) =>
      `#### Step ${s.stepNumber}: ${s.title}\n- **Responsible Role:** ${s.role}\n- **Action:** ${s.action}\n- **Verification Checkpoint:** ${s.verification}`
  )
  .join("\n\n")}

### 4. Expected Outputs
${sopDoc.outputs.map((o) => `- ${o}`).join("\n")}

### 5. Failure Modes & Contingency Plans
${sopDoc.failureModes.map((f) => `- ${f}`).join("\n")}
`;

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  const handleReset = () => {
    setSopDoc(null);
    setIsGenerating(false);
  };

  return (
    <div className="flex flex-col flex-1 h-full min-h-0 bg-[#FAFAFC] dark:bg-[#0C0D11] text-zinc-900 dark:text-zinc-100 font-lexend">
      {/* Top Header */}
      <WorkspaceHeader
        title="AI SOP Builder"
        breadcrumbs={[
          { label: "Workspace" },
          { label: "AI SOP Builder" },
        ]}
        subtitle="Standard operating procedures with verification checkpoints and role assignments"
        actions={
          sopDoc && (
            <>
              <button
                type="button"
                onClick={handleCopyMarkdown}
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
                    <span>Copy Markdown</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4]"
              >
                {downloaded ? (
                  <>
                    <Check className="size-3.5 text-emerald-500" />
                    <span className="text-emerald-500">Exported</span>
                  </>
                ) : (
                  <>
                    <Download className="size-3.5" />
                    <span>Export DOC</span>
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

      {/* Main SOP Workspace */}
      <div className="flex-1 overflow-y-auto min-h-0 custom-scrollbar p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Form Column (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="p-4 sm:p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#111217] shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                  <FileText className="size-3.5 text-[#713CF4]" />
                  SOP Parameters
                </span>
                <span className="text-[11px] text-zinc-400">Structured V2</span>
              </div>

              {/* Title input */}
              <div className="space-y-1.5">
                <label
                  htmlFor="sop-title"
                  className="block text-xs font-medium text-zinc-700 dark:text-zinc-300"
                >
                  SOP Title
                </label>
                <input
                  id="sop-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Continuous Deployment Protocol"
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/60 p-2.5 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 outline-none focus:border-[#713CF4] focus:ring-2 focus:ring-[#713CF4]/20 transition-all font-normal"
                />
              </div>

              {/* Category & Owner */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    Department
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    aria-label="Department category"
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-2.5 text-xs outline-none focus:border-[#713CF4]"
                  >
                    {["Engineering", "Operations", "Customer Success", "Security", "Product"].map(
                      (c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="sop-owner"
                    className="block text-xs font-medium text-zinc-700 dark:text-zinc-300"
                  >
                    Responsible Role
                  </label>
                  <input
                    id="sop-owner"
                    type="text"
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}
                    placeholder="e.g., Lead Architect"
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/60 p-2.5 text-xs text-zinc-900 dark:text-zinc-100 outline-none focus:border-[#713CF4]"
                  />
                </div>
              </div>

              {/* Objective */}
              <div className="space-y-1.5">
                <label
                  htmlFor="sop-objective"
                  className="block text-xs font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Objective & Core Scope
                </label>
                <textarea
                  id="sop-objective"
                  rows={3}
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                  placeholder="Define the primary operational goal, trigger conditions, and success thresholds..."
                  className="w-full resize-none rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/60 p-2.5 text-xs text-zinc-900 dark:text-zinc-100 outline-none focus:border-[#713CF4] focus:ring-2 focus:ring-[#713CF4]/20 transition-all font-normal"
                />
              </div>

              {/* Quick Template Chips */}
              <div className="space-y-1.5 pt-2 border-t border-zinc-100 dark:border-zinc-850">
                <span className="text-[11px] text-zinc-400 dark:text-zinc-500 select-none block">
                  Quick SOP blueprints:
                </span>
                <div className="flex flex-col gap-1.5">
                  {SOP_TEMPLATES.map((tmpl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleApplyTemplate(tmpl)}
                      className="text-left text-[11.5px] p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 hover:bg-[#713CF4]/10 dark:hover:bg-[#713CF4]/15 text-zinc-600 dark:text-zinc-400 hover:text-[#713CF4] dark:hover:text-[#a78bfa] transition-colors border border-zinc-100 dark:border-zinc-850 cursor-pointer truncate"
                    >
                      {tmpl.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={!title.trim() || isGenerating}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] ${
                    title.trim() && !isGenerating
                      ? "bg-[#713CF4] hover:bg-[#602ee0] active:bg-[#5223c7] text-white shadow-xs cursor-pointer"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed"
                  }`}
                >
                  {isGenerating ? (
                    <>
                      <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Synthesizing Multi-Phase SOP...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="size-4" />
                      <span>Generate SOP Document</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Document Preview Column (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {isGenerating && (
              <div className="p-8 text-center space-y-3 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#111217] animate-pulse">
                <div className="size-10 rounded-xl bg-[#713CF4]/15 text-[#713CF4] flex items-center justify-center mx-auto">
                  <Sparkles className="size-5 animate-spin" />
                </div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Structuring Operating Steps & Verification Nodes...
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
                  Aligning roles, defining exit criteria checkpoints, and formulating exception handling procedures.
                </p>
              </div>
            )}

            {!isGenerating && sopDoc && (
              <div className="p-5 sm:p-7 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#111217] shadow-2xs space-y-6">
                {/* SOP Document Header Banner */}
                <div className="pb-5 border-b border-zinc-200/80 dark:border-zinc-800/80 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-md bg-[#713CF4]/10 text-[#713CF4] dark:text-[#a78bfa] border border-[#713CF4]/20">
                      {sopDoc.id}
                    </span>
                    <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
                      Version {sopDoc.version} • Effective {sopDoc.effectiveDate}
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-50">
                    {sopDoc.title}
                  </h2>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 pt-1">
                    <span className="inline-flex items-center gap-1.5">
                      <Building className="size-3.5 text-[#713CF4]" />
                      {sopDoc.category}
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1.5">
                      <UserCheck className="size-3.5 text-[#713CF4]" />
                      Owner: {sopDoc.owner}
                    </span>
                  </div>
                </div>

                {/* Section 1: Objective */}
                <div className="space-y-1.5">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    1. Objective & Operational Scope
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-850">
                    {sopDoc.objective}
                  </p>
                </div>

                {/* Section 2: Prerequisites & Inputs */}
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    2. Prerequisites & Gate Check Inputs
                  </h3>
                  <ul className="grid grid-cols-1 gap-1.5 text-xs text-zinc-700 dark:text-zinc-300">
                    {sopDoc.inputs.map((inp, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-850"
                      >
                        <ShieldCheck className="size-3.5 text-emerald-500 shrink-0" />
                        <span>{inp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Section 3: Step-by-Step Workflow */}
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                    <ListOrdered className="size-3.5 text-[#713CF4]" />
                    3. Step-by-Step Execution Workflow
                  </h3>

                  <div className="space-y-3">
                    {sopDoc.steps.map((st) => (
                      <div
                        key={st.stepNumber}
                        className="p-3.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="flex size-5 rounded-full bg-[#713CF4] text-white text-[11px] font-bold items-center justify-center shrink-0">
                              {st.stepNumber}
                            </span>
                            <h4 className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                              {st.title}
                            </h4>
                          </div>
                          <span className="text-[10.5px] px-2 py-0.5 rounded-md bg-zinc-200/60 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-medium">
                            {st.role}
                          </span>
                        </div>

                        <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed pl-7 font-normal">
                          {st.action}
                        </p>

                        <div className="flex items-start gap-1.5 text-[11.5px] text-emerald-700 dark:text-emerald-400 bg-emerald-50/60 dark:bg-emerald-950/20 p-2 rounded-lg border border-emerald-200/50 dark:border-emerald-900/30 pl-7">
                          <span className="font-semibold shrink-0">Checkpoint:</span>
                          <span>{st.verification}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 4: Expected Outputs */}
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    4. Expected Outputs & Delivery Artifacts
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {sopDoc.outputs.map((out, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-850 text-xs text-zinc-700 dark:text-zinc-300 flex items-start gap-2"
                      >
                        <ArrowRight className="size-3.5 text-[#713CF4] shrink-0 mt-0.5" />
                        <span className="leading-snug">{out}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 5: Contingency & Failure Modes */}
                <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-850">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    5. Failure Modes & Rollback Contingencies
                  </h3>
                  <ul className="space-y-1.5 text-xs text-rose-700 dark:text-rose-400">
                    {sopDoc.failureModes.map((fm, idx) => (
                      <li
                        key={idx}
                        className="p-2 rounded-lg bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 flex items-start gap-2"
                      >
                        <span className="font-bold">•</span>
                        <span>{fm}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {!isGenerating && !sopDoc && (
              <div className="py-12 text-center max-w-md mx-auto space-y-3">
                <div className="size-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 flex items-center justify-center mx-auto">
                  <FileText className="size-6" />
                </div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Configure Parameters to Generate SOP
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                  Select an operational blueprint or configure custom roles, objectives, and exit criteria
                  to create a verified Standard Operating Procedure.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
