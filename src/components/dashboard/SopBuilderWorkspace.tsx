"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  Download,
  UserCheck,
  ShieldCheck,
  ArrowRight,
  Plus,
  Layers,
  LayoutTemplate,
  AlertTriangle,
  ClipboardList,
  FilePlus2,
  X,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";
import { WorkspaceHeader } from "@/components/workspace/WorkspaceHeader";
import { showToast } from "@/components/ui/Toast";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

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

interface SopTemplate {
  id: string;
  title: string;
  category: "Operations" | "IT & DevOps" | "HR & People" | "Security & Compliance";
  owner: string;
  icon: typeof FileText;
  iconColor: string;
  iconBg: string;
  tags: string[];
  objective: string;
  inputs: string[];
  steps: SopStep[];
  outputs: string[];
  failureModes: string[];
}

// ─────────────────────────────────────────────
// Curated SOP Templates (Matching Reference)
// ─────────────────────────────────────────────

const SOP_TEMPLATES: SopTemplate[] = [
  {
    id: "sop-production-deploy",
    title: "Production Deployment & Canary Verification",
    category: "Operations",
    owner: "Release Commander",
    icon: ClipboardList,
    iconColor: "text-violet-500",
    iconBg: "bg-violet-500/10",
    tags: ["Operations", "Canary Release", "Quality Gate"],
    objective:
      "Establish safe, zero-downtime deployment verification with automatic canary rollback criteria, synthetics health checks, and role handoffs.",
    inputs: [
      "Staging smoke test pass report (automated CI pipeline)",
      "Approved change request ticket with documented release scope",
      "Baseline application telemetry and error budget threshold",
      "Release Commander on-call rotation confirmed active",
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Pre-Flight Canary Traffic Route (5%)",
        role: "DevOps Engineer",
        action:
          "Route 5% of incoming live production traffic to newly provisioned immutable worker nodes.",
        verification:
          "Verify HTTP 5xx error rate remains below 0.01% over a consecutive 10-minute sampling window.",
      },
      {
        stepNumber: 2,
        title: "Database Migration & Schema Compatibility",
        role: "Database Administrator",
        action:
          "Apply backwards-compatible database migrations in additive-only mode without table locks.",
        verification:
          "Check active lock duration on primary clusters; confirm replication lag < 150ms.",
      },
      {
        stepNumber: 3,
        title: "Incremental Traffic Ramp (25% → 100%)",
        role: "Release Commander",
        action:
          "Progressively increase traffic to 25%, 50%, and 100% while observing p99 latency metrics.",
        verification:
          "Core Web Vitals and p99 server response time must remain within ±5% of pre-deploy baseline.",
      },
      {
        stepNumber: 4,
        title: "Post-Deployment Stakeholder Sign-Off",
        role: "QA Lead",
        action:
          "Execute end-to-end synthetic user transaction tests covering checkout, auth, and AI model generation.",
        verification:
          "100% synthetic test suite passing; sign off in deployment audit registry.",
      },
    ],
    outputs: [
      "Audited production deployment log recorded in release registry",
      "Telemetry dashboard snapshot showing healthy error budgets",
      "Automated release summary notification posted to engineering channels",
    ],
    failureModes: [
      "If canary 5xx rate exceeds 0.05%: trigger automatic instant rollback to previous container digest.",
      "If database migration locks for > 3 seconds: kill query, restore snapshot, abort deployment.",
    ],
  },
  {
    id: "sop-incident-response",
    title: "Severity-1 Incident Response & Escalation",
    category: "IT & DevOps",
    owner: "Incident Commander",
    icon: AlertTriangle,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-500/10",
    tags: ["IT Support", "Incident Response", "DevOps"],
    objective:
      "Triage critical system outages within 5 minutes, coordinate cross-functional engineering leads, root-cause trees, and broadcast real-time status updates.",
    inputs: [
      "Automated pager alert or verified customer escalation ticket",
      "Direct communication channel (dedicated Incident War Room)",
      "Current infrastructure health matrix and active deployment timeline",
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Incident Triage & Severity Classification",
        role: "Incident Commander",
        action:
          "Acknowledge alert within 3 minutes; determine whether outage affects core user workflows or data integrity.",
        verification:
          "Severity rating declared (Sev-1) and documented in emergency incident register.",
      },
      {
        stepNumber: 2,
        title: "War Room Assembly & Role Delegation",
        role: "Operations Lead",
        action:
          "Open dedicated audio/video war room; assign Communications Lead, Technical Lead, and Scribe.",
        verification:
          "All assigned responders acknowledged in room within 5 minutes of page.",
      },
      {
        stepNumber: 3,
        title: "Public Status Page Broadcast & Customer Notice",
        role: "Communications Lead",
        action:
          "Post initial incident acknowledgment to public status page: 'Investigating degraded service performance'.",
        verification:
          "Broadcast timestamp verified; update status page every 20 minutes until resolved.",
      },
      {
        stepNumber: 4,
        title: "Remediation & Traffic Redirection",
        role: "Technical Lead",
        action:
          "Isolate compromised region, spin up standby compute clusters, or reroute DNS traffic to backup infrastructure.",
        verification:
          "Telemetry shows restored availability (> 99.9%) and zero ongoing data loss.",
      },
    ],
    outputs: [
      "Comprehensive incident timeline recorded by designated Scribe",
      "Blameless post-mortem retrospective scheduled within 48 hours",
      "Remediation action items added to engineering backlog with assignees",
    ],
    failureModes: [
      "If primary region completely unresponsive: initiate catastrophic cross-region disaster recovery switchover.",
      "If credentials compromised: immediately revoke cloud IAM session keys and initiate security lockdown.",
    ],
  },
  {
    id: "sop-employee-onboarding",
    title: "Engineering Team Onboarding & Access",
    category: "HR & People",
    owner: "Engineering Manager",
    icon: UserCheck,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-500/10",
    tags: ["HR & People", "Onboarding", "Training"],
    objective:
      "Structured 30-60-90 day technical onboarding track, security clearance, local dev environment setup, and mentor pairing checkpoints.",
    inputs: [
      "Signed employment agreement and IT equipment receipt confirmation",
      "Designated team mentor assignment and introductory 1-on-1 schedule",
      "Provisioned enterprise identity account (Okta/Google Workspace)",
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Zero-Trust Security & Credential Setup",
        role: "IT Security Lead",
        action:
          "Enforce hardware security key (FIDO2) enrollment, MDM device registration, and password manager vault provisioning.",
        verification:
          "Multi-factor authentication verified active; disk encryption verified enforced.",
      },
      {
        stepNumber: 2,
        title: "Developer Environment Initialization",
        role: "Onboarding Mentor",
        action:
          "Guide new engineer through repo cloning, environment variables bootstrap, and running test suite locally.",
        verification:
          "Local application builds cleanly and passes all unit tests within Day 1.",
      },
      {
        stepNumber: 3,
        title: "First Code Contribution (Day 3 Goal)",
        role: "New Engineer",
        action:
          "Pick a designated starter task, implement change, open pull request, and observe CI verification pipeline.",
        verification:
          "Pull request reviewed by mentor and merged to staging within first week.",
      },
      {
        stepNumber: 4,
        title: "30-Day Competency & Feedback Milestone",
        role: "Engineering Manager",
        action:
          "Conduct 30-day review covering architecture understanding, team collaboration, and roadmap alignment.",
        verification:
          "Written onboarding survey completed and goals calibrated for 60-day milestone.",
      },
    ],
    outputs: [
      "Fully operational developer workstation with audited access permissions",
      "Initial production/staging commit completed within first sprint",
      "Completed 30-day review documentation in people operations portal",
    ],
    failureModes: [
      "If hardware fails to arrive on time: provision temporary secure virtual cloud desktop (VDI).",
      "If background clearance blocked: restrict code access to public open-source modules only.",
    ],
  },
  {
    id: "sop-security-audit",
    title: "Zero-Trust Access & SOC2 Evidence Audit",
    category: "Security & Compliance",
    owner: "Security Compliance Officer",
    icon: ShieldCheck,
    iconColor: "text-sky-500",
    iconBg: "bg-sky-500/10",
    tags: ["Security", "SOC2 / ISO", "Compliance"],
    objective:
      "Automated credential rotation cycles, quarterly least-privilege cloud IAM audits, and cryptographic evidence gathering protocols.",
    inputs: [
      "Quarterly compliance audit calendar trigger",
      "Cloud IAM active role listing across all production accounts",
      "Third-party vendor access inventory and current SLA terms",
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Cloud IAM Least-Privilege Role Auditing",
        role: "SecOps Lead",
        action:
          "Run automated permission analyzer across AWS/GCP accounts to flag dormant access (> 60 days unused).",
        verification:
          "Zero administrative roles assigned to individual user credentials; all access mapped to scoped SSO groups.",
      },
      {
        stepNumber: 2,
        title: "Cryptographic Key & Secret Rotation",
        role: "Infra Engineer",
        action:
          "Trigger rotation of database master passwords, API platform credentials, and TLS wildcard certificates.",
        verification:
          "Key rotation log verified in secrets manager with zero service disruption.",
      },
      {
        stepNumber: 3,
        title: "SOC2 Trust Criteria Evidence Extraction",
        role: "Compliance Officer",
        action:
          "Export immutable audit logs for change management, vulnerability scan results, and background checks.",
        verification:
          "Evidence package cryptographically signed and uploaded to auditor compliance portal.",
      },
      {
        stepNumber: 4,
        title: "Executive Security Summary & Sign-Off",
        role: "CISO / VP Eng",
        action:
          "Present quarterly risk assessment matrix and open vulnerability burn-down chart to executive leadership.",
        verification:
          "Quarterly audit report approved and archived in compliance repository.",
      },
    ],
    outputs: [
      "Cryptographically verified audit evidence package for SOC2 Type II examination",
      "De-provisioning of all identified dormant and over-privileged accounts",
      "Updated vulnerability registry with zero unmitigated Critical/High CVEs",
    ],
    failureModes: [
      "If critical vulnerability unpatched > 14 days: trigger emergency incident response protocol.",
      "If secret rotation causes downstream service failure: rollback to dual-secret transition window.",
    ],
  },
];

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export function SopBuilderWorkspace() {
  const router = useRouter();

  // State
  const [selectedCategory, setSelectedCategory] = useState<string>("All Templates");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalCategory, setModalCategory] = useState("Operations");
  const [modalOwner, setModalOwner] = useState("");
  const [modalObjective, setModalObjective] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [sopDoc, setSopDoc] = useState<GeneratedSop | null>(null);
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  // Filter templates
  const filteredTemplates = SOP_TEMPLATES.filter((tmpl) => {
    if (selectedCategory === "All Templates") return true;
    return tmpl.category === selectedCategory;
  });

  // Open modal with template
  const handleOpenTemplateModal = (tmpl: SopTemplate) => {
    setModalTitle(tmpl.title);
    setModalCategory(tmpl.category);
    setModalOwner(tmpl.owner);
    setModalObjective(tmpl.objective);
    setIsModalOpen(true);
  };

  // Open empty modal
  const handleOpenCustomModal = () => {
    setModalTitle("");
    setModalCategory("Operations");
    setModalOwner("");
    setModalObjective("");
    setIsModalOpen(true);
  };

  // Run generation
  const handleGenerateSop = () => {
    if (!modalTitle.trim()) return;

    setIsModalOpen(false);
    setIsGenerating(true);
    setGenerationStep(1);
    setSopDoc(null);

    // Find if matching template exists or create custom
    const matched = SOP_TEMPLATES.find(
      (t) => t.title.toLowerCase() === modalTitle.toLowerCase()
    );

    setTimeout(() => setGenerationStep(2), 350);
    setTimeout(() => setGenerationStep(3), 700);

    setTimeout(() => {
      const generated: GeneratedSop = {
        id: `SOP-${modalCategory.toUpperCase().slice(0, 3)}-2026-${Math.floor(
          100 + Math.random() * 900
        )}`,
        title: modalTitle,
        category: modalCategory,
        owner: modalOwner || "Operations Lead",
        version: "v1.0.0",
        effectiveDate: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
        objective:
          modalObjective ||
          matched?.objective ||
          "Establish rigorous, repeatable operational procedures with explicit verification checkpoints and responsible role handoffs.",
        inputs: matched?.inputs || [
          "Operational requirement scope & stakeholder approval",
          "Access credentials and verified system permissions",
          "Baseline telemetry benchmarks and monitoring dashboards",
        ],
        steps: matched?.steps || [
          {
            stepNumber: 1,
            title: "Phase Initialization & Scope Verification",
            role: modalOwner || "Process Owner",
            action:
              "Confirm all prerequisite conditions are met and designate primary on-call personnel.",
            verification:
              "Check prerequisites against operational checklist; document sign-off.",
          },
          {
            stepNumber: 2,
            title: "Core Execution & Protocol Implementation",
            role: "Assigned Lead",
            action:
              "Execute primary procedural workflow according to documented specifications.",
            verification:
              "Automated verification test suite passing with zero critical alerts.",
          },
          {
            stepNumber: 3,
            title: "Quality Review & Checkpoint Sign-Off",
            role: "Quality Assurance Lead",
            action:
              "Audit outputs against acceptable tolerance parameters and broadcast completion status.",
            verification:
              "100% compliance criteria satisfied; update central governance registry.",
          },
        ],
        outputs: matched?.outputs || [
          "Audited execution record in organization process portal",
          "Verification telemetry logs archived for compliance review",
          "Automated stakeholder notification dispatched upon completion",
        ],
        failureModes: matched?.failureModes || [
          "If deviation detected at Step 1: halt execution immediately and notify process owner.",
          "If verification fails at Step 3: initiate rollback to previous known-good baseline.",
        ],
      };

      setSopDoc(generated);
      setIsGenerating(false);
      setGenerationStep(0);
      showToast("SOP generated successfully!", "success");
    }, 1100);
  };

  // Draft in AI Chat
  const handleDraftInChat = () => {
    const prompt = `Draft a comprehensive, production-ready Standard Operating Procedure (SOP) for "${modalTitle || "Operational Process"}" in ${modalCategory}.
Objective: ${modalObjective || "Ensure standardized, high-quality execution with role ownership."}
Responsible Owner: ${modalOwner || "Operations Lead"}

Please format with:
1. Executive Summary & Objective
2. Pre-execution Prerequisites & Inputs
3. Step-by-Step Procedure with Verification Checkpoints & Role Assignments
4. Expected Deliverables & Outputs
5. Failure Modes & Emergency Contingency Escalation`;

    setIsModalOpen(false);
    showToast("Opening new SOP session in AI Chat...", "info");
    router.push(`/chat?prompt=${encodeURIComponent(prompt)}`);
  };

  // Copy Markdown
  const handleCopyMarkdown = () => {
    if (!sopDoc || typeof navigator === "undefined" || !navigator.clipboard) return;

    const md = `# Standard Operating Procedure: ${sopDoc.title}
**Document ID:** ${sopDoc.id} | **Version:** ${sopDoc.version} | **Effective Date:** ${sopDoc.effectiveDate}
**Department:** ${sopDoc.category} | **Responsible Owner:** ${sopDoc.owner}

---

## 1. Objective & Scope
${sopDoc.objective}

## 2. Prerequisites & Required Inputs
${sopDoc.inputs.map((inp) => `- ${inp}`).join("\n")}

## 3. Step-by-Step Execution Protocols

${sopDoc.steps
  .map(
    (s) => `### Step ${s.stepNumber}: ${s.title}
- **Responsible Role:** ${s.role}
- **Action Required:** ${s.action}
- **Verification Checkpoint:** ${s.verification}`
  )
  .join("\n\n")}

## 4. Expected Deliverables & Outputs
${sopDoc.outputs.map((out) => `- ${out}`).join("\n")}

## 5. Failure Modes & Contingency Escalation
${sopDoc.failureModes.map((f) => `- ${f}`).join("\n")}
`;

    navigator.clipboard.writeText(md);
    setCopied(true);
    showToast("SOP copied to clipboard in Markdown format!", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  // Export DOC
  const handleDownload = () => {
    setDownloaded(true);
    showToast("Exporting SOP document...", "info");
    setTimeout(() => setDownloaded(false), 2000);
  };

  // Reset
  const handleReset = () => {
    setSopDoc(null);
    setIsGenerating(false);
  };

  return (
    <div className="flex flex-col flex-1 h-full min-h-0 bg-[#FAFAFC] dark:bg-[#0E0C15] text-zinc-900 dark:text-zinc-100 font-lexend">
      {/* Top Workspace Header */}
      <WorkspaceHeader
        title="AI SOP Builder"
        breadcrumbs={[{ label: "Workspace" }, { label: "SOP Builder" }]}
        subtitle="Standard Operating Procedures with role assignments, verification protocols, and contingency workflows"
        actions={
          <div className="flex items-center gap-2">
            {sopDoc ? (
              <>
                <button
                  type="button"
                  onClick={handleCopyMarkdown}
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
                      <span>Copy Markdown</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4]"
                >
                  {downloaded ? (
                    <>
                      <Check className="size-3.5 text-emerald-500" />
                      <span className="text-emerald-500 font-medium">Exported</span>
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
                  aria-label="Back to Templates"
                >
                  <RotateCcw className="size-3.5" />
                  <span>Templates</span>
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={handleOpenCustomModal}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#713CF4] hover:bg-[#602ee0] active:bg-[#5223c7] text-white text-xs font-semibold shadow-xs hover:shadow-[0_0_15px_rgba(113,60,244,0.35)] transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4]"
              >
                <Plus className="size-3.5" />
                <span>Create New SOP</span>
              </button>
            )}
          </div>
        }
      />

      {/* Main Canvas */}
      <div className="flex-1 overflow-y-auto min-h-0 custom-scrollbar p-4 sm:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto space-y-10">
          {/* ─────────────────────────────────────────────────────────────
              1. HERO SECTION (INSPIRED BY ORIGINAL ECHOGPT SCREENSHOT)
             ───────────────────────────────────────────────────────────── */}
          {!sopDoc && !isGenerating && (
            <div className="text-center space-y-4 pt-2 sm:pt-4">
              {/* Badge Icon */}
              <div className="inline-flex items-center justify-center size-12 rounded-2xl bg-[#713CF4] text-white shadow-[0_0_24px_rgba(113,60,244,0.4)] mx-auto">
                <FileText className="size-6" />
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
                AI-Powered SOP Builder
              </h1>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto font-normal leading-relaxed">
                Create compelling Standard Operating Procedures with AI-powered insights tailored
                to your organization&apos;s goals and industry standards.
              </p>

              {/* 3 Quick Stat / Feature Pills */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#111217] shadow-2xs text-xs">
                  <Sparkles className="size-3.5 text-[#713CF4] dark:text-[#a78bfa]" />
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">AI-Enhanced</span>
                  <span className="text-zinc-400">·</span>
                  <span className="text-zinc-500 dark:text-zinc-400 font-normal">Quality & Speed</span>
                </div>

                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#111217] shadow-2xs text-xs">
                  <Layers className="size-3.5 text-[#713CF4] dark:text-[#a78bfa]" />
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">6 Categories</span>
                  <span className="text-zinc-400">·</span>
                  <span className="text-zinc-500 dark:text-zinc-400 font-normal">Cross-Industry</span>
                </div>

                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#111217] shadow-2xs text-xs">
                  <LayoutTemplate className="size-3.5 text-[#713CF4] dark:text-[#a78bfa]" />
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">4 Templates</span>
                  <span className="text-zinc-400">·</span>
                  <span className="text-zinc-500 dark:text-zinc-400 font-normal">Rapid Frameworks</span>
                </div>
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              2. MULTI-STAGE GENERATING STATE
             ───────────────────────────────────────────────────────────── */}
          {isGenerating && (
            <div className="p-8 sm:p-10 text-center space-y-4 rounded-2xl border border-[#713CF4]/30 bg-white dark:bg-[#111217] shadow-sm animate-pulse max-w-xl mx-auto my-8">
              <div className="size-12 rounded-2xl bg-[#713CF4]/15 text-[#713CF4] flex items-center justify-center mx-auto">
                <Sparkles className="size-6 animate-spin" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  {generationStep === 1 && "Analyzing operational requirements and scope boundaries..."}
                  {generationStep === 2 && "Structuring step-by-step verification checkpoints & role handoffs..."}
                  {generationStep === 3 && "Synthesizing failure modes and emergency escalation protocols..."}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Building verified Standard Operating Procedure: {modalTitle}
                </p>
              </div>

              {/* Progress bar */}
              <div className="max-w-xs mx-auto w-full h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                <div
                  className="h-full bg-[#713CF4] transition-all duration-300"
                  style={{ width: `${generationStep * 33.3}%` }}
                />
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              3. GENERATED SOP VIEWER
             ───────────────────────────────────────────────────────────── */}
          {!isGenerating && sopDoc && (
            <div className="space-y-6">
              {/* Document Header Card */}
              <div className="p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#111217] shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200/70 dark:border-zinc-700/70">
                        {sopDoc.id}
                      </span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-[#713CF4]/10 text-[#713CF4] dark:text-[#a78bfa] font-semibold border border-[#713CF4]/20">
                        {sopDoc.version}
                      </span>
                      <span className="text-xs text-zinc-400">
                        Effective: {sopDoc.effectiveDate}
                      </span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-50 pt-1">
                      {sopDoc.title}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <span className="text-[11px] text-zinc-400 block">Owner / Role</span>
                      <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                        {sopDoc.owner}
                      </span>
                    </div>
                    <div className="size-9 rounded-xl bg-[#713CF4]/10 border border-[#713CF4]/20 flex items-center justify-center text-[#713CF4]">
                      <UserCheck className="size-4" />
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-850">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                    Objective & Core Scope
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                    {sopDoc.objective}
                  </p>
                </div>
              </div>

              {/* Main Content Grid: Inputs & Failures */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Inputs & Prerequisites */}
                <div className="p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#111217] shadow-sm space-y-3">
                  <div className="flex items-center gap-2">
                    <ClipboardList className="size-4 text-[#713CF4]" />
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      Required Inputs & Prerequisites
                    </h3>
                  </div>
                  <ul className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300">
                    {sopDoc.inputs.map((inp, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="size-3.5 text-emerald-500 mt-0.5 shrink-0" />
                        <span className="leading-relaxed">{inp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Outputs & Deliverables */}
                <div className="p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#111217] shadow-sm space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-emerald-500" />
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      Expected Outputs & Deliverables
                    </h3>
                  </div>
                  <ul className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300">
                    {sopDoc.outputs.map((out, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="size-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        <span className="leading-relaxed">{out}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Step-by-Step Procedure */}
              <div className="p-5 sm:p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#111217] shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="size-4 text-[#713CF4]" />
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      Execution Protocols & Verification Checkpoints
                    </h3>
                  </div>
                  <span className="text-[11px] text-zinc-400 font-mono">
                    {sopDoc.steps.length} Sequenced Steps
                  </span>
                </div>

                <div className="space-y-3">
                  {sopDoc.steps.map((step) => (
                    <div
                      key={step.stepNumber}
                      className="p-4 rounded-xl border border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/60 dark:bg-zinc-900/50 space-y-2.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="size-6 rounded-full bg-[#713CF4]/10 text-[#713CF4] dark:text-[#a78bfa] text-xs font-bold flex items-center justify-center border border-[#713CF4]/20 font-mono">
                            {step.stepNumber}
                          </span>
                          <h4 className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                            {step.title}
                          </h4>
                        </div>
                        <span className="text-[11px] px-2 py-0.5 rounded-md bg-zinc-200/70 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-medium">
                          {step.role}
                        </span>
                      </div>

                      <div className="text-xs text-zinc-600 dark:text-zinc-300 pl-8 leading-relaxed font-normal">
                        <p>{step.action}</p>
                        <div className="mt-2 p-2 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 flex items-start gap-1.5">
                          <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <p className="text-[11.5px] text-emerald-800 dark:text-emerald-300">
                            <span className="font-semibold">Verification Checkpoint: </span>
                            {step.verification}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Failure Modes & Contingency Plans */}
              <div className="p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#111217] shadow-sm space-y-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="size-4 text-amber-500" />
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Failure Modes & Contingency Protocols
                  </h3>
                </div>
                <div className="space-y-2">
                  {sopDoc.failureModes.map((fm, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/30 text-xs text-amber-900 dark:text-amber-200 leading-relaxed font-normal"
                    >
                      ⚠️ {fm}
                    </div>
                  ))}
                </div>
              </div>

              {/* Document Action Footer */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#111217]">
                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                  Ready to iterate? Refine this procedure or export for team documentation.
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const prompt = `Please review and help optimize this Standard Operating Procedure: "${sopDoc.title}".
Objective: ${sopDoc.objective}
Category: ${sopDoc.category}
What specific edge cases or automation improvements would you recommend?`;
                      router.push(`/chat?prompt=${encodeURIComponent(prompt)}`);
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 text-xs font-medium hover:border-[#713CF4]/40 hover:text-[#713CF4] transition-colors cursor-pointer"
                  >
                    <MessageSquare className="size-3.5" />
                    <span>Refine in AI Chat</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#713CF4] hover:bg-[#602ee0] text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                  >
                    <Plus className="size-3.5" />
                    <span>Create Another SOP</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              4. TEMPLATES SECTION (FAITHFUL TO ORIGINAL SCREENSHOT)
             ───────────────────────────────────────────────────────────── */}
          {!sopDoc && !isGenerating && (
            <div className="space-y-6">
              {/* Section Header */}
              <div className="text-center space-y-2">
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                  Choose Your SOP Template
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto font-normal">
                  Select from our curated collection of industry-proven SOP templates or create a
                  custom one from scratch tailored to your specific organizational needs.
                </p>

                {/* Category Filter Pills */}
                <div className="flex flex-wrap items-center justify-center gap-1.5 pt-3">
                  {[
                    "All Templates",
                    "Operations",
                    "IT & DevOps",
                    "HR & People",
                    "Security & Compliance",
                  ].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-[#713CF4] ${
                        selectedCategory === cat
                          ? "bg-[#713CF4] text-white shadow-2xs"
                          : "bg-white dark:bg-[#111217] border border-zinc-200/80 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4 Template Cards (2x2 Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredTemplates.map((tmpl) => {
                  const Icon = tmpl.icon;
                  return (
                    <div
                      key={tmpl.id}
                      className="group flex flex-col justify-between p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#111217] hover:border-[#713CF4]/50 hover:shadow-md transition-all duration-200"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div
                            className={`size-10 rounded-xl ${tmpl.iconBg} border border-current/10 flex items-center justify-center ${tmpl.iconColor}`}
                          >
                            <Icon className="size-5" />
                          </div>
                          <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500">
                            {tmpl.owner}
                          </span>
                        </div>

                        <div>
                          <h3 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-[#713CF4] dark:group-hover:text-[#a78bfa] transition-colors">
                            {tmpl.title}
                          </h3>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5 leading-relaxed font-normal">
                            {tmpl.objective}
                          </p>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {tmpl.tags.map((t) => (
                            <span
                              key={t}
                              className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-medium"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Card Action */}
                      <div className="pt-4 mt-4 border-t border-zinc-100 dark:border-zinc-850 flex items-center justify-between">
                        <span className="text-[11px] text-zinc-400">
                          {tmpl.steps.length} verification steps
                        </span>
                        <button
                          type="button"
                          onClick={() => handleOpenTemplateModal(tmpl)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#713CF4] dark:text-[#a78bfa] hover:text-[#602ee0] dark:hover:text-[#c4b5fd] cursor-pointer"
                        >
                          <span>Use Template</span>
                          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              5. "CREATE CUSTOM SOP" BOTTOM BANNER (MATCHING SCREENSHOT)
             ───────────────────────────────────────────────────────────── */}
          {!sopDoc && !isGenerating && (
            <div className="p-6 sm:p-8 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#111217] shadow-sm text-center space-y-4">
              <div className="size-12 rounded-2xl bg-[#713CF4]/10 border border-[#713CF4]/20 flex items-center justify-center text-[#713CF4] mx-auto">
                <FilePlus2 className="size-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-50">
                  Ready to create your custom SOP?
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto font-normal">
                  Start from scratch or tailor an existing framework to fit your exact workflow.
                </p>
              </div>
              <div>
                <button
                  type="button"
                  onClick={handleOpenCustomModal}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#713CF4] hover:bg-[#602ee0] active:bg-[#5223c7] text-white text-xs sm:text-sm font-semibold shadow-sm hover:shadow-[0_0_20px_rgba(113,60,244,0.35)] transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4]"
                >
                  <span>Create New SOP</span>
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>
          )}

          {/* Footer Note */}
          <div className="text-center pt-2 pb-8">
            <p className="text-xs text-zinc-400 dark:text-zinc-500 font-normal">
              EchoGPT Standard Operating Procedures · Zero-downtime operational frameworks.
            </p>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          6. MODAL: CREATE / CUSTOMIZE SOP
         ───────────────────────────────────────────────────────────── */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="sop-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-lexend"
        >
          <div className="relative w-full max-w-lg rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111217] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <FileText className="size-5 text-[#713CF4]" />
                <h3
                  id="sop-modal-title"
                  className="text-base font-bold text-zinc-900 dark:text-zinc-100"
                >
                  {modalTitle ? "Configure SOP Document" : "Create Custom SOP"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 text-xs sm:text-sm">
              {/* Title */}
              <div className="space-y-1.5">
                <label
                  htmlFor="modal-sop-title"
                  className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                >
                  SOP Title *
                </label>
                <input
                  id="modal-sop-title"
                  type="text"
                  value={modalTitle}
                  onChange={(e) => setModalTitle(e.target.value)}
                  placeholder="e.g., Customer Data Incident Escalation Protocol"
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/60 p-2.5 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 outline-none focus:border-[#713CF4] focus:ring-2 focus:ring-[#713CF4]/20 transition-all font-normal"
                />
              </div>

              {/* Category & Owner */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label
                    htmlFor="modal-sop-cat"
                    className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                  >
                    Category
                  </label>
                  <select
                    id="modal-sop-cat"
                    value={modalCategory}
                    onChange={(e) => setModalCategory(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/60 p-2.5 text-xs text-zinc-900 dark:text-zinc-100 outline-none focus:border-[#713CF4] cursor-pointer"
                  >
                    <option value="Operations">Operations</option>
                    <option value="IT & DevOps">IT & DevOps</option>
                    <option value="HR & People">HR & People</option>
                    <option value="Security & Compliance">Security & Compliance</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Customer Success">Customer Success</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="modal-sop-owner"
                    className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                  >
                    Responsible Role / Owner
                  </label>
                  <input
                    id="modal-sop-owner"
                    type="text"
                    value={modalOwner}
                    onChange={(e) => setModalOwner(e.target.value)}
                    placeholder="e.g., Release Commander"
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/60 p-2.5 text-xs text-zinc-900 dark:text-zinc-100 outline-none focus:border-[#713CF4] font-normal"
                  />
                </div>
              </div>

              {/* Objective */}
              <div className="space-y-1.5">
                <label
                  htmlFor="modal-sop-obj"
                  className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                >
                  Objective & Core Scope
                </label>
                <textarea
                  id="modal-sop-obj"
                  rows={3}
                  value={modalObjective}
                  onChange={(e) => setModalObjective(e.target.value)}
                  placeholder="Outline the operational goals, quality thresholds, and expected verification criteria..."
                  className="w-full resize-none rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/60 p-2.5 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 outline-none focus:border-[#713CF4] font-normal"
                />
              </div>
            </div>

            {/* Modal Footer with Two Clear Action Paths */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-6 py-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/50">
              <button
                type="button"
                onClick={handleDraftInChat}
                disabled={!modalTitle.trim()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 text-xs font-semibold hover:border-[#713CF4]/40 hover:text-[#713CF4] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <MessageSquare className="size-3.5" />
                <span>Draft in AI Chat →</span>
              </button>

              <button
                type="button"
                onClick={handleGenerateSop}
                disabled={!modalTitle.trim()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-xl bg-[#713CF4] hover:bg-[#602ee0] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles className="size-3.5" />
                <span>Generate SOP Document</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
