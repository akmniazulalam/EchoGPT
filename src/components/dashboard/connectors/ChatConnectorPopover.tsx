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

  // Dynamic positioning state to clamp within viewport on all screen sizes (360px - 1440px)
  const [positionStyle, setPositionStyle] = useState<React.CSSProperties>({
    position: "fixed",
    bottom: 80,
    left: 16,
    width: "calc(100vw - 32px)",
    maxWidth: 320,
  });

  // Calculate position relative to trigger while guaranteeing >= 16px viewport margins
  useEffect(() => {
    if (!isOpen) return;

    const updatePosition = () => {
      if (!triggerRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();
      const margin = 16;
      const targetWidth = Math.min(320, window.innerWidth - margin * 2);
      const maxLeft = Math.max(margin, window.innerWidth - targetWidth - margin);
      const left = Math.max(margin, Math.min(rect.left, maxLeft));
      const bottom = Math.max(margin, window.innerHeight - rect.top + 8);

      setPositionStyle({
        position: "fixed",
        bottom: `${bottom}px`,
        left: `${left}px`,
        width: `${targetWidth}px`,
        maxWidth: "calc(100vw - 32px)",
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen, triggerRef]);

  // Close on Escape or click outside (but not when add modal is open)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isAddModalOpen) return; // let modal handle its own escape
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      // When add modal is open, clicks inside the modal portal must not close the popover
      if (isAddModalOpen) return;
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
  }, [isOpen, onClose, triggerRef, isAddModalOpen]);

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

  // Only show connectors that are connected and enabled (exclude failed and disabled)
  const usableConnectors = connectors.filter(
    (c) => c.status === "connected" && c.enabled
  );

  return (
    <>
      {/*
        Popover panel:
        - Uses fixed viewport-clamped positioning to prevent horizontal overflow on mobile
        - Guaranteed 16px safe margins on both left and right edges
        - Anchors seamlessly to the connector button on larger screens
      */}
      <div
        ref={popoverRef}
        role="dialog"
        aria-modal="false"
        aria-label="Connectors"
        style={positionStyle}
        className="rounded-xl bg-white dark:bg-[#15131F] border border-zinc-200 dark:border-white/[0.1] shadow-2xl z-50 overflow-hidden font-lexend animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Compact Header */}
        <div className="px-3.5 pt-3 pb-2 border-b border-zinc-100 dark:border-white/[0.08] flex items-center justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-[13px] font-bold text-zinc-900 dark:text-zinc-50 leading-tight">
              Connectors
            </h3>
            <div className="text-[10.5px] font-medium text-zinc-400 dark:text-zinc-500 mt-0.5">
              {isProUser ? (
                <span className="text-emerald-500 dark:text-emerald-400 font-semibold">
                  {connectedCount} connected · Pro
                </span>
              ) : (
                <>
                  <span>{connectedCount} of {quotaLimit} connected</span>
                  {!isProUser && (
                    <button
                      type="button"
                      onClick={() =>
                        openUpgradeModal("Upgrade to EchoGPT Pro for unlimited MCP server connectors.")
                      }
                      className="ml-1 text-[#713CF4] dark:text-[#a78bfa] hover:underline cursor-pointer"
                    >
                      · upgrade
                    </button>
                  )}
                </>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="size-6 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center shrink-0 cursor-pointer"
            aria-label="Close connectors panel"
          >
            <X className="size-3.5" />
          </button>
        </div>

        {/* Scrollable usable connector list (failed and disabled are excluded) */}
        <div className="max-h-48 overflow-y-auto custom-scrollbar px-2 py-2">
          {usableConnectors.length === 0 ? (
            <div className="py-6 px-3 text-center space-y-1.5">
              <div className="size-8 rounded-xl mx-auto flex items-center justify-center bg-zinc-100 dark:bg-white/[0.04] text-zinc-400">
                <McpBranchIcon className="size-4" />
              </div>
              <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                No active connectors
              </p>
              <p className="text-[11px] text-zinc-400 dark:text-zinc-500 leading-snug">
                Connect an MCP server to use its tools in chat.
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {usableConnectors.map((conn) => {
                const isActive = activeConnectorIds.includes(conn.id);

                return (
                  <div
                    key={conn.id}
                    onClick={() => toggleActiveConnectorInChat(conn.id)}
                    className={`flex items-center justify-between px-2.5 py-2 rounded-lg border transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#713CF4]/10 dark:bg-[#713CF4]/15 border-[#713CF4]/30"
                        : "bg-transparent border-transparent hover:bg-zinc-100/70 dark:hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0 pr-1.5">
                      <div className="size-6 rounded-md flex items-center justify-center bg-white dark:bg-[#251E38] border border-zinc-200/80 dark:border-white/[0.08] text-zinc-800 dark:text-zinc-200 shrink-0">
                        <ConnectorServerIcon
                          url={conn.serverUrl}
                          name={conn.name}
                          className="size-3.5"
                        />
                      </div>

                      <div className="min-w-0">
                        <h4 className="text-[12px] font-semibold text-zinc-900 dark:text-zinc-100 truncate leading-tight">
                          {conn.name}
                        </h4>
                        <p className="text-[10.5px] text-zinc-400 dark:text-zinc-500 truncate">
                          {conn.tools.length} {conn.tools.length === 1 ? "tool" : "tools"} available
                        </p>
                      </div>
                    </div>

                    {/* Checkbox */}
                    <div
                      className={`size-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                        isActive
                          ? "bg-[#713CF4] border-[#713CF4] text-white"
                          : "border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800"
                      }`}
                    >
                      {isActive && <Check className="size-2.5 stroke-[3]" />}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Compact Footer */}
        <div className="px-3 py-2 border-t border-zinc-100 dark:border-white/[0.08] flex items-center justify-between gap-2 bg-zinc-50/50 dark:bg-white/[0.02]">
          <button
            type="button"
            onClick={() => {
              onClose();
              router.push("/connectors");
            }}
            className="text-[11px] font-semibold text-[#713CF4] dark:text-[#a78bfa] hover:underline cursor-pointer whitespace-nowrap"
          >
            Manage connectors
          </button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleOpenAddModal}
            leftIcon={<Plus className="size-3" />}
            className="text-[11px] font-semibold h-7 px-2.5 shadow-xs"
          >
            Add connector
          </Button>
        </div>
      </div>

      {/* Add connector modal — renders in a portal, safe from outside-click detection */}
      <ConnectorSetupModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </>
  );
}
