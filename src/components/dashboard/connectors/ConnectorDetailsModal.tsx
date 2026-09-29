"use client";

import React from "react";
import {
  Layers,
  ShieldCheck,
  Trash2,
  MessageSquare,
  Terminal,
  RotateCw,
  AlertCircle,
} from "lucide-react";
import { Connector } from "@/types/connector";
import { useConnectors } from "@/context/ConnectorContext";
import { ConnectorServerIcon } from "./ConnectorIcons";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

interface ConnectorDetailsModalProps {
  connectorId: string | null; // ID only — derive live state from context
  isOpen: boolean;
  onClose: () => void;
  onUseInChat: (connector: Connector) => void;
  onRemove: (connector: Connector) => void;
}

export function ConnectorDetailsModal({
  connectorId,
  isOpen,
  onClose,
  onUseInChat,
  onRemove,
}: ConnectorDetailsModalProps) {
  const { connectors, toggleConnectorEnabled, retryConnection } = useConnectors();

  // Always derive from live context — never stale
  const connector = connectorId ? connectors.find((c) => c.id === connectorId) ?? null : null;

  if (!connector) return null;

  const isFailed = connector.status === "failed";
  const isConnecting = connector.status === "connecting";
  const isConnected = connector.status === "connected";
  const isDisabled = connector.status === "disabled";
  const hasTools = connector.tools.length > 0;

  const handleRetry = async () => {
    await retryConnection(connector.id);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="2xl"
      bodyClassName="p-0"
    >
      <div className="flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-zinc-100 dark:border-white/8 bg-zinc-50/60 dark:bg-white/[0.02]">
          <div className="flex items-start gap-4">
            <div className="size-13 rounded-2xl flex items-center justify-center bg-white dark:bg-[#251E38] border border-zinc-200/80 dark:border-white/8 text-zinc-900 dark:text-zinc-100 shadow-sm shrink-0">
              <ConnectorServerIcon
                url={connector.serverUrl}
                name={connector.name}
                className="size-6.5"
              />
            </div>

            <div className="flex-1 min-w-0 pr-6">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                {/* Connection status badge — always reflects current state */}
                {isConnected && (
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    Connected
                  </span>
                )}
                {isDisabled && (
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                    Disabled
                  </span>
                )}
                {isFailed && (
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 flex items-center gap-1">
                    <AlertCircle className="size-3" />
                    Connection Failed
                  </span>
                )}
                {isConnecting && (
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    Connecting…
                  </span>
                )}

                {connector.hasAuthToken && (
                  <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                    <ShieldCheck className="size-3 text-emerald-500" />
                    Authenticated
                  </span>
                )}
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-50 truncate">
                {connector.name}
              </h3>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 font-mono truncate mt-0.5">
                {connector.serverUrl}
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="overflow-y-auto custom-scrollbar p-5 sm:p-6 space-y-4">
          {/* Failed state */}
          {isFailed && (
            <div className="p-4 rounded-xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 text-xs text-rose-700 dark:text-rose-300 flex items-start gap-2.5">
              <AlertCircle className="size-4 shrink-0 mt-0.5 text-rose-500" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold mb-1">Connection failed</p>
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  Unable to establish a connection to this MCP server. Check the URL and server availability, or retry the connection handshake.
                </p>
                {connector.errorMessage && (
                  <p className="mt-2 p-2 rounded-lg bg-rose-100/60 dark:bg-rose-900/30 text-[11px] font-mono break-all text-rose-800 dark:text-rose-200">
                    {connector.errorMessage}
                  </p>
                )}
                <button
                  type="button"
                  onClick={handleRetry}
                  disabled={isConnecting}
                  className="mt-2.5 inline-flex items-center gap-1.5 font-semibold text-rose-700 dark:text-rose-300 hover:underline cursor-pointer disabled:opacity-50"
                >
                  <RotateCw className={`size-3 ${isConnecting ? "animate-spin" : ""}`} />
                  <span>Retry connection attempt</span>
                </button>
              </div>
            </div>
          )}

          {/* Tools section — only when connected or disabled (not failed) */}
          {!isFailed && (
            <>
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                  <Layers className="size-3.5 text-[#713CF4]" />
                  <span>Available Tools ({connector.tools.length})</span>
                </h4>
                <span className="text-[11px] text-zinc-400">
                  Active in EchoGPT conversations
                </span>
              </div>

              <div className="space-y-2.5">
                {hasTools ? (
                  connector.tools.map((tool) => (
                    <div
                      key={tool.name}
                      className="p-3.5 rounded-xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200/70 dark:border-white/6 space-y-1 hover:border-zinc-300 dark:hover:border-white/[0.12] transition-colors"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Terminal className="size-3.5 text-[#713CF4]" />
                          <span className="text-xs sm:text-[13px] font-semibold text-zinc-800 dark:text-zinc-200">
                            {tool.displayName || tool.name}
                          </span>
                        </div>
                        <code className="text-[10.5px] font-mono text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-black/30 px-1.5 py-0.5 rounded">
                          {tool.name}
                        </code>
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed pl-5.5">
                        {tool.description}
                      </p>
                    </div>
                  ))
                ) : (
                  // Zero tools — connected but no tools exposed
                  <div className="text-center py-8 px-4">
                    <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1">No tools exposed</p>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 leading-relaxed">
                      This server connected successfully but did not provide any tools that EchoGPT can use.
                    </p>
                  </div>
                )}
              </div>

              <div className="p-3 rounded-xl bg-[#713CF4]/5 border border-[#713CF4]/15 text-xs text-zinc-600 dark:text-zinc-400 flex items-center justify-between">
                <span>Demo connector · Mock MCP handshake verified</span>
                <span className="text-[11px] text-zinc-400">Ready for Chat</span>
              </div>
            </>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-zinc-100 dark:border-white/8 bg-zinc-50/60 dark:bg-white/[0.02] flex items-center justify-between gap-3">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onRemove(connector)}
            leftIcon={<Trash2 className="size-3.5 text-rose-500" />}
            className="text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20"
          >
            Remove
          </Button>

          <div className="flex items-center gap-2">
            {/* If failed: show Retry in footer */}
            {isFailed && (
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={handleRetry}
                isLoading={isConnecting}
                leftIcon={<RotateCw className="size-3.5" />}
                className="font-semibold shadow-xs"
              >
                Retry Connection
              </Button>
            )}

            {/* Enable/Disable — only meaningful when connected or disabled (not failed) */}
            {!isFailed && !isConnecting && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => toggleConnectorEnabled(connector.id)}
              >
                {connector.enabled ? "Disable" : "Enable"}
              </Button>
            )}

            {/* Use in Chat — only when connected and enabled */}
            {isConnected && connector.enabled && (
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={() => {
                  onClose();
                  onUseInChat(connector);
                }}
                leftIcon={<MessageSquare className="size-3.5" />}
                className="font-semibold shadow-xs"
              >
                Use in Chat
              </Button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
