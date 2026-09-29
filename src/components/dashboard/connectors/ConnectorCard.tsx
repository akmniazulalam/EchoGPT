"use client";

import React, { useState } from "react";
import {
  RotateCw,
  Trash2,
  MoreVertical,
  CheckCircle2,
  AlertCircle,
  Layers,
  ShieldCheck,
  MessageSquare,
} from "lucide-react";
import { Connector } from "@/types/connector";
import { ConnectorServerIcon } from "./ConnectorIcons";

interface ConnectorCardProps {
  connector: Connector;
  onViewDetails: (connector: Connector) => void;
  onUseInChat: (connector: Connector) => void;
  onToggleEnabled: (id: string) => void;
  onRetry: (id: string) => void;
  onRemove: (connector: Connector) => void;
}

export function ConnectorCard({
  connector,
  onViewDetails,
  onUseInChat,
  onToggleEnabled,
  onRetry,
  onRemove,
}: ConnectorCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetryClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRetrying(true);
    await onRetry(connector.id);
    setIsRetrying(false);
  };

  const getStatusBadge = () => {
    switch (connector.status) {
      case "connected":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Connected
          </span>
        );
      case "connecting":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <span className="size-1.5 rounded-full bg-amber-500 animate-ping" />
            Connecting...
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
            <AlertCircle className="size-3" />
            Connection failed
          </span>
        );
      case "disabled":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
            <span className="size-1.5 rounded-full bg-zinc-400" />
            Disabled
          </span>
        );
    }
  };

  return (
    <div className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#161322] border border-zinc-200/90 dark:border-white/8 hover:border-[#713CF4]/60 dark:hover:border-[#713CF4]/60 shadow-xs hover:shadow-xl hover:shadow-[#713CF4]/5 transition-all duration-200">
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-start gap-3 min-w-0">
            <div className="size-11 sm:size-12 rounded-xl flex items-center justify-center bg-zinc-100 dark:bg-[#251E38] border border-zinc-200/60 dark:border-white/[0.07] text-zinc-800 dark:text-zinc-200 shadow-2xs shrink-0">
              <ConnectorServerIcon
                url={connector.serverUrl}
                name={connector.name}
                className="size-5.5"
              />
            </div>

            <div className="min-w-0">
              <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100 truncate group-hover:text-[#713CF4] dark:group-hover:text-[#A78BFA] transition-colors">
                {connector.name}
              </h4>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 truncate font-mono mt-0.5">
                {connector.serverUrl}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {getStatusBadge()}

            {/* Overflow Menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="size-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Connector actions"
              >
                <MoreVertical className="size-4" />
              </button>

              {isMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setIsMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-1 w-44 rounded-xl bg-white dark:bg-[#1C182A] border border-zinc-200 dark:border-white/8 shadow-xl z-40 p-1.5 text-xs animate-in fade-in zoom-in-95 duration-100">
                    <button
                      type="button"
                      onClick={() => {
                        setIsMenuOpen(false);
                        onViewDetails(connector);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-white/6 text-zinc-700 dark:text-zinc-200 font-medium flex items-center gap-2"
                    >
                      <Layers className="size-3.5 text-[#713CF4]" />
                      <span>View Discovered Tools</span>
                    </button>

                    {connector.status === "failed" && (
                      <button
                        type="button"
                        onClick={(e) => {
                          setIsMenuOpen(false);
                          handleRetryClick(e);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-white/6 text-amber-600 dark:text-amber-400 font-medium flex items-center gap-2"
                      >
                        <RotateCw className="size-3.5" />
                        <span>Retry Handshake</span>
                      </button>
                    )}

                    {connector.status !== "failed" && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsMenuOpen(false);
                          onToggleEnabled(connector.id);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-white/6 text-zinc-700 dark:text-zinc-200 font-medium flex items-center gap-2"
                      >
                        <CheckCircle2 className="size-3.5 text-emerald-500" />
                        <span>{connector.enabled ? "Disable Connector" : "Enable Connector"}</span>
                      </button>
                    )}

                    <div className="h-px bg-zinc-100 dark:bg-white/[0.06] my-1" />

                    <button
                      type="button"
                      onClick={() => {
                        setIsMenuOpen(false);
                        onRemove(connector);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 text-rose-600 dark:text-rose-400 font-medium flex items-center gap-2"
                    >
                      <Trash2 className="size-3.5" />
                      <span>Remove Connector</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Failed Error Message (if any) */}
        {connector.status === "failed" && connector.errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 text-xs text-rose-700 dark:text-rose-300 flex items-start gap-2">
            <AlertCircle className="size-4 shrink-0 mt-0.5 text-rose-500" />
            <div className="flex-1 min-w-0">
              <p className="line-clamp-2">{connector.errorMessage}</p>
              <button
                type="button"
                onClick={handleRetryClick}
                disabled={isRetrying}
                className="mt-1.5 inline-flex items-center gap-1 font-semibold text-rose-700 dark:text-rose-300 hover:underline cursor-pointer"
              >
                <RotateCw className={`size-3 ${isRetrying ? "animate-spin" : ""}`} />
                <span>Retry connection</span>
              </button>
            </div>
          </div>
        )}

        {/* Discovered Tools Chips */}
        {connector.status === "failed" ? (
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-3 italic">
            No tools available · Connection failed
          </p>
        ) : connector.tools.length > 0 ? (
          <div className="space-y-2 mt-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                <Layers className="size-3.5 text-[#713CF4]" />
                <span>{connector.tools.length} Tools Discovered</span>
              </span>
              <button
                type="button"
                onClick={() => onViewDetails(connector)}
                className="text-[11px] text-[#713CF4] dark:text-[#A78BFA] hover:underline font-medium cursor-pointer"
              >
                Inspect All
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 max-h-16 overflow-hidden">
              {connector.tools.slice(0, 3).map((tool) => (
                <span
                  key={tool.name}
                  className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-white/5 border border-zinc-200/80 dark:border-white/[0.06] text-[11px] font-mono text-zinc-600 dark:text-zinc-300 truncate max-w-[180px]"
                  title={tool.description}
                >
                  {tool.displayName}
                </span>
              ))}
              {connector.tools.length > 3 && (
                <span className="px-1.5 py-0.5 rounded-md bg-zinc-50 dark:bg-white/[0.03] text-[10.5px] text-zinc-400 font-mono">
                  +{connector.tools.length - 3} more
                </span>
              )}
            </div>
          </div>
        ) : (
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-3 italic">
            Connected but no tools were exposed by this server.
          </p>
        )}

        {/* Meta badges: Auth protected, Demo simulated */}
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-zinc-100 dark:border-white/[0.06] text-[11px] text-zinc-400">
          {connector.hasAuthToken && (
            <span className="inline-flex items-center gap-1 text-zinc-500 dark:text-zinc-400 font-medium">
              <ShieldCheck className="size-3 text-emerald-500" />
              Auth Token Protected
            </span>
          )}
          <span className="text-zinc-300 dark:text-zinc-700">•</span>
          <span className="text-[10px] uppercase tracking-wider text-zinc-400">
            Demo MCP Server
          </span>
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="mt-5 pt-3.5 border-t border-zinc-100 dark:border-white/[0.06] flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onViewDetails(connector)}
          className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:text-[#713CF4] dark:hover:text-[#A78BFA] transition-colors cursor-pointer"
        >
          {connector.status === "failed" ? "View Details" : "View Tools"}
        </button>

        {connector.status === "failed" ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleRetryClick}
              disabled={isRetrying}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 transition-colors cursor-pointer disabled:opacity-50"
            >
              <RotateCw className={`size-3 ${isRetrying ? "animate-spin" : ""}`} />
              <span>Retry</span>
            </button>

            <button
              type="button"
              onClick={() => onRemove(connector)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 transition-colors cursor-pointer"
            >
              <Trash2 className="size-3" />
              <span>Remove</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            {/* Enabled Toggle Switch */}
            <label className="inline-flex items-center gap-1.5 cursor-pointer text-xs text-zinc-500 dark:text-zinc-400 select-none">
              <span>{connector.enabled ? "Enabled" : "Off"}</span>
              <input
                type="checkbox"
                checked={connector.enabled}
                onChange={() => onToggleEnabled(connector.id)}
                className="sr-only peer"
              />
              <div className="relative w-8 h-4.5 bg-zinc-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-[#713CF4]" />
            </label>

            {/* Use in Chat button */}
            <button
              type="button"
              disabled={!connector.enabled || connector.status !== "connected"}
              onClick={() => onUseInChat(connector)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#713CF4] dark:text-[#A78BFA] hover:underline disabled:opacity-40 disabled:no-underline cursor-pointer disabled:cursor-not-allowed"
            >
              <MessageSquare className="size-3.5" />
              <span>Use in Chat</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
