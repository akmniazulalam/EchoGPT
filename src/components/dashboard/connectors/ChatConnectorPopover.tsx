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

  // Position & viewport containment:
  // - Desktop (>= 1024px): anchored to trigger button with left-0 and w-96.
  // - Mobile & Tablet (< 1024px): horizontally CENTERED in viewport, with height
  //   strictly constrained so it never slides under the top header.
  useEffect(() => {
    if (!isOpen) return;

    const clampMobilePosition = () => {
      const popover = popoverRef.current;
      const trigger = triggerRef.current;
      if (!popover || !trigger) return;

      // On desktop (>= 1024px): reset inline styles so desktop CSS (left-0, lg:w-96) applies
      if (window.innerWidth >= 1024) {
        popover.style.left = "";
        popover.style.width = "";
        popover.style.maxHeight = "";
        return;
      }

      const rect = trigger.getBoundingClientRect();

      // Horizontally center on mobile and tablet
      const targetWidth = Math.min(360, window.innerWidth - 24);
      const screenLeft = (window.innerWidth - targetWidth) / 2;
      const popoverLeft = screenLeft - rect.left;

      popover.style.left = `${popoverLeft}px`;
      popover.style.width = `${targetWidth}px`;

      // Vertical safety: ensure top of popover never slides under top header
      // (keep at least 68px clearance from top of viewport for MobileNav + Header)
      const availableHeight = rect.top - 68;
      if (availableHeight > 0) {
        popover.style.maxHeight = `${Math.min(420, availableHeight)}px`;
      }
    };

    clampMobilePosition();
    window.addEventListener("resize", clampMobilePosition);
    return () => window.removeEventListener("resize", clampMobilePosition);
  }, [isOpen, triggerRef]);

  // Close on Escape or click outside — but NOT when the Add Connector modal is open.
  // The modal renders in a React portal (outside our DOM subtree), so we must skip
  // the outside-click check while it is open to avoid false closures.
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isAddModalOpen) return; // let modal handle Escape itself
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (isAddModalOpen) return; // portal click must not close popover
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

  // Only show connectors that are connected AND enabled (never show failed / disabled here)
  const usableConnectors = connectors.filter(
    (c) => c.status === "connected" && c.enabled
  );

  return (
    <>
      {/*
        Layer A — Existing Connector Picker.

        Positioning strategy:
        - `absolute bottom-full`: opens upward, anchored to its `position: relative`
          parent wrapper in PlaceholderWorkspace.
        - Desktop (>= 1024px): left-0 lg:w-96, anchored directly to trigger.
        - Mobile & Tablet (< 1024px): horizontally CENTERED in viewport and vertically
          capped below the top header.
        - Animation: `fade-in zoom-in-95` only — clean and subtle with no horizontal translate.
      */}
      <div
        ref={popoverRef}
        role="dialog"
        aria-modal="false"
        aria-label="Connectors"
        className="absolute bottom-full left-0 mb-2 w-80 lg:w-96 max-w-[calc(100vw-1.5rem)] max-h-[calc(100dvh-120px)] rounded-2xl bg-white dark:bg-[#15131F] border border-zinc-200 dark:border-white/[0.1] shadow-2xl z-50 overflow-hidden font-lexend animate-in fade-in zoom-in-95 duration-150 flex flex-col"
      >
        {/* Compact Header */}
        <div className="px-3.5 py-3 sm:px-4 sm:py-3.5 border-b border-zinc-100 dark:border-white/8 bg-zinc-50/70 dark:bg-white/[0.02] shrink-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-50 leading-tight">
                Connectors
              </h3>
              <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 leading-snug">
                Select an active MCP connector to use in this chat.
              </p>
              <div className="text-[10px] sm:text-[10.5px] font-medium text-zinc-400 dark:text-zinc-500 mt-1 flex items-center gap-1">
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
              aria-label="Close connectors panel"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* Scrollable connector list — constrained so it never pushes popover under header */}
        <div className="p-2 sm:p-3 overflow-y-auto custom-scrollbar flex-1 min-h-0 max-h-52 sm:max-h-60">
          {usableConnectors.length === 0 ? (
            <div className="py-7 text-center space-y-2">
              <div className="size-9 rounded-xl mx-auto flex items-center justify-center bg-zinc-100 dark:bg-white/[0.04] text-zinc-400">
                <McpBranchIcon className="size-4.5" />
              </div>
              <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                No active connectors
              </p>
              <p className="text-[11px] text-zinc-400 dark:text-zinc-500 leading-snug">
                Connect an MCP server and its tools become available in chat.
              </p>
            </div>
          ) : (
            <div className="space-y-1.5">
              {usableConnectors.map((conn) => {
                const isActive = activeConnectorIds.includes(conn.id);

                return (
                  <div
                    key={conn.id}
                    onClick={() => toggleActiveConnectorInChat(conn.id)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border cursor-pointer transition-all ${
                      isActive
                        ? "bg-[#713CF4]/10 dark:bg-[#713CF4]/15 border-[#713CF4]/30"
                        : "bg-white dark:bg-white/[0.02] border-zinc-200/70 dark:border-white/6 hover:border-zinc-300 dark:hover:border-white/[0.12] hover:bg-zinc-50/80 dark:hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="size-6.5 rounded-lg flex items-center justify-center bg-white dark:bg-[#251E38] border border-zinc-200/80 dark:border-white/8 text-zinc-800 dark:text-zinc-200 shrink-0">
                      <ConnectorServerIcon
                        url={conn.serverUrl}
                        name={conn.name}
                        className="size-3.5"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="text-[12px] sm:text-[12.5px] font-semibold text-zinc-900 dark:text-zinc-100 truncate leading-tight">
                        {conn.name}
                      </h4>
                      <p className="text-[10px] sm:text-[10.5px] text-zinc-400 dark:text-zinc-500 truncate">
                        {conn.tools.length} {conn.tools.length === 1 ? "tool" : "tools"} available
                      </p>
                    </div>

                    {/* Checkbox indicator */}
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
        <div className="px-3.5 py-2.5 sm:px-4 sm:py-3 border-t border-zinc-100 dark:border-white/8 bg-zinc-50/70 dark:bg-white/[0.02] flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              onClose();
              router.push("/connectors");
            }}
            className="text-xs font-semibold text-[#713CF4] dark:text-[#a78bfa] hover:underline cursor-pointer whitespace-nowrap"
          >
            Manage connectors
          </button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleOpenAddModal}
            leftIcon={<Plus className="size-3.5" />}
            className="text-xs font-semibold shadow-xs shrink-0 h-7.5 px-3"
          >
            Add connector
          </Button>
        </div>
      </div>

      {/* Layer B — Add Connector Setup Modal */}
      <ConnectorSetupModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </>
  );
}
