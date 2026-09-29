"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Layers,
  Terminal,
  ExternalLink,
  CheckCircle,
} from "lucide-react";
import { MOCK_MCP_CONNECTORS } from "./data";

export function ExtensionMcpView() {
  const [connectors, setConnectors] = useState(MOCK_MCP_CONNECTORS);
  const [testedTool, setTestedTool] = useState<string | null>(null);
  const [testOutput, setTestOutput] = useState<string | null>(null);

  const toggleConnector = (id: string) => {
    setConnectors((prev) =>
      prev.map((c) => (c.id === id ? { ...c, enabled: !c.enabled } : c))
    );
  };

  const handleTestTool = (toolName: string, connectorName: string) => {
    setTestedTool(toolName);
    setTestOutput(null);

    setTimeout(() => {
      setTestOutput(
        `[MCP Handshake: 200 OK]\nExecuted: ${connectorName} -> ${toolName}()\nPayload: { status: "active", session: "browser-side-panel", latency: "42ms" }`
      );
    }, 400);
  };

  const enabledCount = connectors.filter((c) => c.enabled).length;

  return (
    <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-white dark:bg-[#0B0912]">
      {/* ── Scrollable Body Area ── */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 sm:p-4 space-y-4">
        {/* Header & Link to Full Connectors Workspace */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              MCP Connectors
            </h2>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              Extend browser chat with live database & API tool calling.
            </p>
          </div>
          <Link
            href="/connectors"
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#713CF4] dark:text-[#a78bfa] hover:underline shrink-0"
          >
            <span>Manage All</span>
            <ExternalLink className="size-3" />
          </Link>
        </div>

        {/* Status Quota Banner */}
        <div className="p-3 rounded-2xl bg-[#713CF4]/10 border border-[#713CF4]/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="size-4 text-[#713CF4] dark:text-[#a78bfa]" />
            <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
              Active Connectors
            </span>
          </div>
          <span className="text-xs font-bold text-[#713CF4] dark:text-[#a78bfa]">
            {enabledCount} of {connectors.length} Enabled
          </span>
        </div>

        {/* Connectors List */}
        <div className="space-y-3">
          {connectors.map((c) => (
            <div
              key={c.id}
              className={`p-3 rounded-2xl border transition-all ${
                c.enabled
                  ? "bg-zinc-50 dark:bg-white/[0.03] border-zinc-200/80 dark:border-white/8"
                  : "bg-zinc-50/50 dark:bg-white/[0.01] border-zinc-200/40 dark:border-white/[0.03] opacity-60"
              }`}
            >
              {/* Connector Card Top */}
              <div className="flex items-center justify-between pb-2 border-b border-zinc-200/50 dark:border-white/4">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="size-7 rounded-xl bg-white dark:bg-[#1A1725] border border-zinc-200 dark:border-white/8 flex items-center justify-center text-zinc-700 dark:text-zinc-200 shrink-0">
                    <Terminal className="size-3.5 text-[#713CF4]" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                      {c.name}
                    </h4>
                    <span className="text-[10px] text-zinc-400 font-mono truncate block">
                      {c.url}
                    </span>
                  </div>
                </div>

                {/* Enable/Disable Toggle */}
                <button
                  type="button"
                  onClick={() => toggleConnector(c.id)}
                  className={`w-9 h-5 rounded-full transition-colors cursor-pointer relative ${
                    c.enabled ? "bg-[#713CF4]" : "bg-zinc-300 dark:bg-zinc-700"
                  }`}
                  aria-label={`Toggle ${c.name}`}
                >
                  <span
                    className={`absolute top-0.5 size-4 rounded-full bg-white transition-transform ${
                      c.enabled ? "right-0.5" : "left-0.5"
                    }`}
                  />
                </button>
              </div>

              {/* Tools List */}
              <div className="pt-2 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  Exposed Tools ({c.tools.length})
                </span>
                <div className="space-y-1">
                  {c.tools.map((t) => (
                    <div
                      key={t.name}
                      className="flex items-center justify-between p-1.5 rounded-lg bg-white dark:bg-black/20 border border-zinc-100 dark:border-white/4 text-xs"
                    >
                      <div className="min-w-0 pr-1">
                        <p className="font-mono text-[11px] font-semibold text-zinc-800 dark:text-zinc-200 truncate">
                          {t.name}
                        </p>
                        <p className="text-[10px] text-zinc-400 truncate">{t.description}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleTestTool(t.name, c.name)}
                        className="px-2 py-0.5 rounded text-[10px] font-semibold bg-zinc-100 hover:bg-[#713CF4]/10 dark:bg-white/6 hover:text-[#713CF4] transition-colors cursor-pointer shrink-0"
                      >
                        Test
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Test Tool Live Handshake Output */}
        {testedTool && (
          <div className="p-3 rounded-2xl bg-zinc-900 text-zinc-100 text-xs font-mono space-y-1.5 shadow-md">
            <div className="flex items-center justify-between text-zinc-400 pb-1 border-b border-zinc-800">
              <span className="flex items-center gap-1.5 text-emerald-400 text-[11px]">
                <CheckCircle className="size-3" />
                Live Tool Execution
              </span>
              <button
                type="button"
                onClick={() => setTestedTool(null)}
                className="text-[10px] hover:text-zinc-200 cursor-pointer"
              >
                Dismiss
              </button>
            </div>
            <pre className="text-[11px] leading-relaxed whitespace-pre-wrap">
              {testOutput || "Invoking MCP endpoint..."}
            </pre>
          </div>
        )}
      </div>

      {/* Footer Link */}
      <div className="p-3 border-t border-zinc-200/80 dark:border-white/8 bg-zinc-50/60 dark:bg-[#121019] text-center">
        <Link
          href="/connectors"
          className="text-xs font-semibold text-[#713CF4] dark:text-[#a78bfa] hover:underline"
        >
          Add new MCP servers & custom endpoints in Web App →
        </Link>
      </div>
    </div>
  );
}
