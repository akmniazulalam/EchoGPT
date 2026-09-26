"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, Plus, Check } from "lucide-react";
import { useConnectors } from "@/context/ConnectorContext";
import { useUpgradeModal } from "@/context/UpgradeModalContext";
import { ConnectorServerIcon, McpBranchIcon } from "./ConnectorIcons";
import { ConnectorSetupModal } from "./ConnectorSetupModal";
import { Button } from "@/components/ui/Button";

interface ChatConnectorPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLElement | null>;
}

export function ChatConnectorPopover({
  isOpen,
  onClose,
  triggerRef,
}: ChatConnectorPopoverProps) {
  const router = useRouter();
  const popoverRef = useRef<HTMLDivElement>(null);
  const {
    connectors,
    activeConnectorIds,
    toggleActiveConnectorInChat,
    connectedCount,
    quotaLimit,
    canAddMore,
  } = useConnectors();
  const { isProUser, openUpgradeModal } = useUpgradeModal();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Close on Escape or click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  const handleOpenAddModal = () => {
    if (!canAddMore) {
      openUpgradeModal(
        "Free tier includes 1 active MCP connector. Upgrade to EchoGPT Pro for unlimited tool connectors."
      );
      return;
    }
    setIsAddModalOpen(true);
  };

  return (
    <>
      <div
        ref={popoverRef}
        role="dialog"
        aria-modal="false"
        className="absolute bottom-full left-0 mb-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-[#15131F] border border-zinc-200 dark:border-white/[0.1] shadow-2xl z-50 overflow-hidden font-lexend animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Header matching Screenshot 3 */}
        <div className="p-4 sm:p-5 border-b border-zinc-100 dark:border-white/[0.08] bg-zinc-50/70 dark:bg-white/[0.02]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-50">
                Connectors
              </h3>
              <p className="text-[11.5px] sm:text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 leading-snug">
                Connect an MCP server and its tools become available in chat.
              </p>
              <div className="text-[10.5px] font-medium text-zinc-400 dark:text-zinc-500 mt-1.5 flex items-center gap-1">
                {isProUser ? (
                  <span className="text-emerald-500 dark:text-emerald-400 font-semibold">
                    {connectedCount} connected · EchoGPT Pro Active
                  </span>
                ) : (
                  <>
                    <span>{connectedCount} of {quotaLimit} connected</span>
                    <button
                      type="button"
                      onClick={() =>
                        openUpgradeModal("Upgrade to EchoGPT Pro for unlimited MCP server connectors.")
                      }
                      className="text-[#713CF4] dark:text-[#a78bfa] hover:underline cursor-pointer"
                    >
                      · upgrade for unlimited
                    </button>
                  </>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="size-7 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center shrink-0 cursor-pointer"
              aria-label="Close popover"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 max-h-64 overflow-y-auto custom-scrollbar">
          {connectors.length === 0 ? (
            /* Empty State matching Screenshot 3 */
            <div className="py-8 text-center space-y-2">
              <div className="size-10 rounded-xl mx-auto flex items-center justify-center bg-zinc-100 dark:bg-white/[0.04] text-zinc-400">
                <McpBranchIcon className="size-5" />
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                No connectors yet.
              </p>
            </div>
          ) : (
            /* Populated Connector Selection List */
            <div className="space-y-2">
              {connectors.map((conn) => {
                const isActive = activeConnectorIds.includes(conn.id);
                const isUsable = conn.status === "connected" && conn.enabled;

                return (
                  <div
                    key={conn.id}
                    onClick={() => {
                      if (isUsable) {
                        toggleActiveConnectorInChat(conn.id);
                      }
                    }}
                    className={`flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#713CF4]/10 dark:bg-[#713CF4]/15 border-[#713CF4]/40"
                        : "bg-zinc-50/50 dark:bg-white/[0.02] border-zinc-200/60 dark:border-white/[0.06] hover:bg-zinc-100/70 dark:hover:bg-white/[0.05]"
                    } ${!isUsable ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <div className="size-8 rounded-lg flex items-center justify-center bg-white dark:bg-[#251E38] border border-zinc-200/80 dark:border-white/[0.08] text-zinc-800 dark:text-zinc-200 shrink-0">
                        <ConnectorServerIcon
                          url={conn.serverUrl}
                          name={conn.name}
                          className="size-4"
                        />
                      </div>

                      <div className="min-w-0">
                        <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                          {conn.name}
                        </h4>
                        <p className="text-[10.5px] text-zinc-400 dark:text-zinc-500 truncate">
                          {conn.tools.length} tools available · {conn.status}
                        </p>
                      </div>
                    </div>

                    {/* Checkbox state */}
                    <div
                      className={`size-4.5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                        isActive
                          ? "bg-[#713CF4] border-[#713CF4] text-white"
                          : "border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800"
                      }`}
                    >
                      {isActive && <Check className="size-3 stroke-[3]" />}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Actions (Matching Screenshot 3) */}
        <div className="p-3.5 border-t border-zinc-100 dark:border-white/[0.08] bg-zinc-50/70 dark:bg-white/[0.02] flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => {
              onClose();
              router.push("/connectors");
            }}
            className="text-[11px] font-semibold text-[#713CF4] dark:text-[#a78bfa] hover:underline cursor-pointer"
          >
            Manage connectors
          </button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleOpenAddModal}
            leftIcon={<Plus className="size-3.5" />}
            className="font-semibold shadow-xs"
          >
            Add connector
          </Button>
        </div>
      </div>

      {/* Add custom connector modal triggered from Chat */}
      <ConnectorSetupModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </>
  );
}
