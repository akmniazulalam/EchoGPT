"use client";

import React from "react";
import {
  Layers,
  ShieldCheck,
  Trash2,
  MessageSquare,
  Terminal,
} from "lucide-react";
import { Connector } from "@/types/connector";
import { ConnectorServerIcon } from "./ConnectorIcons";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

interface ConnectorDetailsModalProps {
  connector: Connector | null;
  isOpen: boolean;
  onClose: () => void;
  onUseInChat: (connector: Connector) => void;
  onToggleEnabled: (id: string) => void;
  onRemove: (connector: Connector) => void;
}

export function ConnectorDetailsModal({
  connector,
  isOpen,
  onClose,
  onUseInChat,
  onToggleEnabled,
  onRemove,
}: ConnectorDetailsModalProps) {
  if (!connector) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="2xl"
      bodyClassName="p-0"
    >
      <div className="flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-zinc-100 dark:border-white/[0.08] bg-zinc-50/60 dark:bg-white/[0.02]">
          <div className="flex items-start gap-4">
            <div className="size-13 rounded-2xl flex items-center justify-center bg-white dark:bg-[#251E38] border border-zinc-200/80 dark:border-white/[0.08] text-zinc-900 dark:text-zinc-100 shadow-sm shrink-0">
              <ConnectorServerIcon
                url={connector.serverUrl}
                name={connector.name}
                className="size-6.5"
              />
            </div>

            <div className="flex-1 min-w-0 pr-6">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  {connector.status === "connected" ? "Connected" : connector.status}
                </span>

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

        {/* Body: Discovered Tools List */}
        <div className="overflow-y-auto custom-scrollbar p-5 sm:p-6 space-y-4">
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
            {connector.tools.map((tool) => (
              <div
                key={tool.name}
                className="p-3.5 rounded-xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200/70 dark:border-white/[0.06] space-y-1 hover:border-zinc-300 dark:hover:border-white/[0.12] transition-colors"
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
            ))}

            {connector.tools.length === 0 && (
              <div className="text-center py-8 text-xs text-zinc-400">
                No tools were discovered from this endpoint.
              </div>
            )}
          </div>

          <div className="p-3 rounded-xl bg-[#713CF4]/5 border border-[#713CF4]/15 text-xs text-zinc-600 dark:text-zinc-400 flex items-center justify-between">
            <span>Demo connector · Mock MCP handshake verified</span>
            <span className="text-[11px] text-zinc-400">Ready for Chat</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-zinc-100 dark:border-white/[0.08] bg-zinc-50/60 dark:bg-white/[0.02] flex items-center justify-between gap-3">
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
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onToggleEnabled(connector.id)}
            >
              {connector.enabled ? "Disable" : "Enable"}
            </Button>

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
          </div>
        </div>
      </div>
    </Modal>
  );
}
