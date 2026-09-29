"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search, X } from "lucide-react";
import { Connector } from "@/types/connector";
import { useConnectors } from "@/context/ConnectorContext";
import { useUpgradeModal } from "@/context/UpgradeModalContext";
import { WorkspaceHeader } from "@/components/workspace/WorkspaceHeader";
import { Button } from "@/components/ui/Button";
import { ConnectorCard } from "./ConnectorCard";
import { ConnectorEmptyState } from "./ConnectorEmptyState";
import { ConnectorSetupModal } from "./ConnectorSetupModal";
import { ConnectorDetailsModal } from "./ConnectorDetailsModal";
import { RemoveConnectorDialog } from "./RemoveConnectorDialog";
import { McpBranchIcon } from "./ConnectorIcons";
import { showToast } from "@/components/ui/Toast";

export function ConnectorsWorkspace() {
  const router = useRouter();
  const {
    connectors,
    connectedCount,
    quotaLimit,
    canAddMore,
    toggleConnectorEnabled,
    toggleActiveConnectorInChat,
    removeConnector,
    retryConnection,
    loadSamples,
  } = useConnectors();
  const { isProUser, openUpgradeModal } = useUpgradeModal();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [showHowItWorks, setShowHowItWorks] = useState(true);

  // Modal states
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);
  const [selectedConnectorForDetails, setSelectedConnectorForDetails] = useState<Connector | null>(null);
  const [connectorToRemove, setConnectorToRemove] = useState<Connector | null>(null);

  // Filtered connectors
  const filteredConnectors = useMemo(() => {
    if (!searchQuery.trim()) return connectors;
    const q = searchQuery.toLowerCase().trim();
    return connectors.filter((c) => {
      const matchName = c.name.toLowerCase().includes(q);
      const matchUrl = c.serverUrl.toLowerCase().includes(q);
      const matchTools = c.tools.some(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.displayName.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)
      );
      return matchName || matchUrl || matchTools;
    });
  }, [connectors, searchQuery]);

  const totalToolsCount = useMemo(() => {
    return connectors.reduce((acc, c) => acc + (c.enabled ? c.tools.length : 0), 0);
  }, [connectors]);

  // Handle "Use in Chat"
  const handleUseInChat = (connector: Connector) => {
    toggleActiveConnectorInChat(connector.id);
    showToast(`"${connector.name}" activated for Chat. Redirecting...`, "success");
    router.push("/chat");
  };

  const handleOpenAddModal = () => {
    if (!canAddMore) {
      openUpgradeModal(
        "Free tier includes 1 active MCP connector. Upgrade to EchoGPT Pro for unlimited tool connectors."
      );
      return;
    }
    setIsSetupModalOpen(true);
  };

  return (
    <div className="flex flex-col flex-1 h-full min-h-0 bg-[#FAFAFC] dark:bg-[#0E0C15] text-zinc-900 dark:text-zinc-100 font-lexend">
      {/* 1. Header (matching Screenshot 1) */}
      <WorkspaceHeader
        title="Connectors"
        breadcrumbs={[{ label: "Workspace" }, { label: "Connectors" }]}
        subtitle="Connect an MCP server and its tools become available while you chat."
        actions={
          <div className="flex items-center gap-2 flex-wrap">
            {/* Quota Indicator (Matching Screenshot 1) */}
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              {isProUser ? (
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
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
                    className="ml-1.5 text-[#713CF4] dark:text-[#a78bfa] hover:underline cursor-pointer"
                  >
                    · upgrade for unlimited
                  </button>
                </>
              )}
            </span>

            {/* Primary Action Button (Matching Screenshot 1) */}
            <Button
              variant="primary"
              size="sm"
              onClick={handleOpenAddModal}
              leftIcon={<Plus className="size-3.5" />}
              className="font-semibold shadow-md shadow-[#713CF4]/20 whitespace-nowrap shrink-0"
            >
              Add connector
            </Button>
          </div>
        }
      />

      {/* 2. Scrollable Body */}
      <div className="flex-1 overflow-y-auto min-h-0 custom-scrollbar p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto space-y-6 pb-16">
          {/* How MCP Connectors Work (Educational Mental Model Banner) */}
          {showHowItWorks && (
            <div className="relative p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#161322] border border-zinc-200/90 dark:border-white/8 shadow-xs space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <div className="size-8 rounded-lg flex items-center justify-center bg-[#713CF4]/10 text-[#713CF4] dark:text-[#a78bfa]">
                    <McpBranchIcon className="size-4.5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
                      How MCP Connectors Work
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                      Model Context Protocol (MCP) gives EchoGPT direct access to private APIs, tools, and enterprise databases.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowHowItWorks(false)}
                  className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 p-1"
                  aria-label="Dismiss guide"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* 3 Step Diagram */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-white/3 border border-zinc-200/60 dark:border-white/[0.05] space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-zinc-800 dark:text-zinc-200">
                    <span className="size-5 rounded-full bg-[#713CF4] text-white text-[11px] flex items-center justify-center">
                      1
                    </span>
                    <span>Connect Server</span>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 pl-7 leading-relaxed">
                    Provide an HTTPS endpoint where an MCP server accepts requests (with optional auth).
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-white/3 border border-zinc-200/60 dark:border-white/[0.05] space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-zinc-800 dark:text-zinc-200">
                    <span className="size-5 rounded-full bg-[#713CF4] text-white text-[11px] flex items-center justify-center">
                      2
                    </span>
                    <span>Discover Tools</span>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 pl-7 leading-relaxed">
                    EchoGPT inspects the server and automatically discovers exposed tools and parameter schemas.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-white/3 border border-zinc-200/60 dark:border-white/[0.05] space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-zinc-800 dark:text-zinc-200">
                    <span className="size-5 rounded-full bg-[#713CF4] text-white text-[11px] flex items-center justify-center">
                      3
                    </span>
                    <span>Use in Chat</span>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 pl-7 leading-relaxed">
                    Select the connector in your chat composer to let the AI invoke tools and retrieve live data.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Connectors Workspace Content */}
          {connectors.length === 0 ? (
            /* Empty State (Matching Screenshot 1) */
            <ConnectorEmptyState
              onAddConnector={handleOpenAddModal}
              onLoadSamples={loadSamples}
            />
          ) : (
            /* Populated State with Search & Cards Grid */
            <div className="space-y-6">
              {/* Controls bar: Search & Metrics */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-zinc-400 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search connectors, servers, or tools..."
                    className="w-full text-xs sm:text-sm pl-10 pr-9 py-2.5 rounded-xl bg-white dark:bg-[#161322] border border-zinc-200 dark:border-white/8 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 shadow-xs focus:outline-none focus:ring-1 focus:ring-[#713CF4]"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                    >
                      <X className="size-3.5" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 self-end sm:self-center">
                  <span>
                    <strong className="text-zinc-900 dark:text-zinc-100">{connectors.length}</strong>{" "}
                    Connectors
                  </span>
                  <span>•</span>
                  <span>
                    <strong className="text-zinc-900 dark:text-zinc-100">{totalToolsCount}</strong>{" "}
                    Active Tools
                  </span>
                </div>
              </div>

              {/* Cards Grid */}
              {filteredConnectors.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {filteredConnectors.map((connector) => (
                    <ConnectorCard
                      key={connector.id}
                      connector={connector}
                      onViewDetails={setSelectedConnectorForDetails}
                      onUseInChat={handleUseInChat}
                      onToggleEnabled={toggleConnectorEnabled}
                      onRetry={retryConnection}
                      onRemove={setConnectorToRemove}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-xs text-zinc-400 space-y-2">
                  <p>No connectors match &ldquo;{searchQuery}&rdquo;</p>
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="text-[#713CF4] dark:text-[#a78bfa] hover:underline font-semibold"
                  >
                    Clear search filter
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Setup Modal */}
      <ConnectorSetupModal
        isOpen={isSetupModalOpen}
        onClose={() => setIsSetupModalOpen(false)}
      />

      {/* Details Modal */}
      <ConnectorDetailsModal
        connectorId={selectedConnectorForDetails?.id ?? null}
        isOpen={Boolean(selectedConnectorForDetails)}
        onClose={() => setSelectedConnectorForDetails(null)}
        onUseInChat={handleUseInChat}
        onRemove={(conn) => {
          setSelectedConnectorForDetails(null);
          setConnectorToRemove(conn);
        }}
      />

      {/* Remove Confirmation Dialog */}
      <RemoveConnectorDialog
        connector={connectorToRemove}
        isOpen={Boolean(connectorToRemove)}
        onClose={() => setConnectorToRemove(null)}
        onConfirm={removeConnector}
      />
    </div>
  );
}
