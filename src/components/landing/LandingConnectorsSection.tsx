"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { McpBranchIcon, ConnectorServerIcon } from "@/components/dashboard/connectors/ConnectorIcons";

const SAMPLE_CONNECTORS = [
  {
    name: "GitHub Tools",
    url: "https://mcp.github.com/v1",
    tools: [
      { name: "get_file_contents", desc: "Read code and config files directly from repository" },
      { name: "list_pull_requests", desc: "Inspect pending PRs and review discussions" },
      { name: "create_issue", desc: "Open tracked engineering issues with reproduction steps" },
    ],
    status: "Connected",
  },
  {
    name: "PostgreSQL Database",
    url: "https://db-connector.local/mcp",
    tools: [
      { name: "query_database", desc: "Execute read-only SQL queries with schema verification" },
      { name: "describe_tables", desc: "Inspect table columns, indices, and foreign keys" },
      { name: "analyze_query_plan", desc: "Inspect EXPLAIN ANALYZE execution cost metrics" },
    ],
    status: "Connected",
  },
  {
    name: "Slack Workspace",
    url: "https://mcp.slack.internal/v1",
    tools: [
      { name: "post_channel_message", desc: "Dispatch deployment updates to #engineering" },
      { name: "search_channel_history", desc: "Search incident threads and past resolutions" },
      { name: "get_user_presence", desc: "Check team member availability for handoffs" },
    ],
    status: "Connected",
  },
];

export function LandingConnectorsSection() {
  return (
    <section id="connectors" className="py-20 sm:py-28 scroll-mt-16 bg-zinc-50/50 dark:bg-white/[0.015]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#713CF4] dark:text-[#a78bfa]">
            Extensible Architecture
          </p>
          <h2 className="text-2xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Bring your tools into the conversation
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed">
            Connect supported MCP servers so databases, repositories, and custom APIs become
            callable directly while you chat with any frontier model.
          </p>
        </div>

        {/* Simplified Architectural Flow: Chat ➔ Connector ➔ Tool ➔ Output */}
        <div className="rounded-2xl border border-zinc-200/90 dark:border-white/[0.08] bg-white dark:bg-[#12111A] p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                How Connectors Work
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                Standardized model-to-server handshake based on the Model Context Protocol
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold border border-emerald-500/20">
              <ShieldCheck className="size-3.5" />
              <span>Token-Authenticated & Sandboxed</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {/* Step 1 */}
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200/70 dark:border-white/[0.06] space-y-2">
              <div className="flex items-center gap-2">
                <span className="size-6 rounded-lg bg-[#713CF4] text-white text-[11px] font-bold flex items-center justify-center">
                  1
                </span>
                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                  Ask in Natural Language
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 leading-snug">
                You ask: &quot;Check the latest commits on main and summarize changes.&quot;
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200/70 dark:border-white/[0.06] space-y-2">
              <div className="flex items-center gap-2">
                <span className="size-6 rounded-lg bg-[#713CF4] text-white text-[11px] font-bold flex items-center justify-center">
                  2
                </span>
                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                  Tool Discovery
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 leading-snug">
                EchoGPT maps your intent to connected MCP tools (`github.list_commits`).
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200/70 dark:border-white/[0.06] space-y-2">
              <div className="flex items-center gap-2">
                <span className="size-6 rounded-lg bg-[#713CF4] text-white text-[11px] font-bold flex items-center justify-center">
                  3
                </span>
                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                  Live Execution
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 leading-snug">
                The MCP server queries the live GitHub API with authenticated headers.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-4 rounded-xl bg-[#713CF4]/5 dark:bg-[#713CF4]/10 border border-[#713CF4]/20 space-y-2">
              <div className="flex items-center gap-2">
                <span className="size-6 rounded-lg bg-emerald-500 text-white text-[11px] font-bold flex items-center justify-center">
                  4
                </span>
                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                  Synthesized Answer
                </span>
              </div>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-300 leading-snug">
                Model interprets the live JSON payload and responds with clean insights.
              </p>
            </div>
          </div>
        </div>

        {/* Real Sample Server Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SAMPLE_CONNECTORS.map((conn) => (
            <div
              key={conn.name}
              className="p-5 rounded-2xl border border-zinc-200/80 dark:border-white/[0.08] bg-white dark:bg-[#12111A] flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="size-8 rounded-xl bg-zinc-100 dark:bg-white/[0.05] border border-zinc-200 dark:border-white/[0.08] flex items-center justify-center text-zinc-800 dark:text-zinc-200">
                      <ConnectorServerIcon url={conn.url} name={conn.name} className="size-4.5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                        {conn.name}
                      </h4>
                      <p className="text-[10px] text-zinc-400 font-mono truncate max-w-[160px]">
                        {conn.url}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    Active
                  </span>
                </div>

                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block">
                    Available Tools:
                  </span>
                  <div className="space-y-1.5">
                    {conn.tools.map((t) => (
                      <div
                        key={t.name}
                        className="p-2 rounded-lg bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200/60 dark:border-white/[0.06]"
                      >
                        <code className="text-[11px] font-mono font-semibold text-[#713CF4] dark:text-[#a78bfa] block">
                          {t.name}()
                        </code>
                        <p className="text-[10.5px] text-zinc-500 dark:text-zinc-400 leading-snug mt-0.5">
                          {t.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-100 dark:border-white/[0.06] flex items-center justify-between text-xs">
                <span className="text-[11px] text-zinc-400">1-Click Test Preset</span>
                <Link
                  href="/connectors"
                  className="font-semibold text-[#713CF4] dark:text-[#a78bfa] hover:underline"
                >
                  Manage →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Section Bottom CTA */}
        <div className="text-center pt-2">
          <Link
            href="/connectors"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#713CF4] hover:bg-[#602ee0] text-white text-xs sm:text-sm font-semibold transition-all shadow-sm shadow-[#713CF4]/20"
          >
            <McpBranchIcon className="size-4" />
            <span>Explore Connectors Workspace</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
