"use client";

import React, { useState } from "react";
import { Sparkles, ShieldAlert, Loader2, Zap } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { useConnectors } from "@/context/ConnectorContext";
import { useUpgradeModal } from "@/context/UpgradeModalContext";
import { showToast } from "@/components/ui/Toast";
import { DEMO_PRESETS } from "@/lib/mockMcpService";

interface ConnectorSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function ConnectorSetupModal({
  isOpen,
  onClose,
  onSuccess,
}: ConnectorSetupModalProps) {
  const { addConnector, canAddMore, connectedCount, quotaLimit } = useConnectors();
  const { openUpgradeModal, isProUser } = useUpgradeModal();

  const [name, setName] = useState("");
  const [serverUrl, setServerUrl] = useState("");
  const [authHeader, setAuthHeader] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState("");

  const resetForm = () => {
    setName("");
    setServerUrl("");
    setAuthHeader("");
    setErrors({});
    setIsLoading(false);
    setLoadingPhase("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const applyPreset = (preset: (typeof DEMO_PRESETS)[0]) => {
    setName(preset.name);
    setServerUrl(preset.serverUrl);
    setAuthHeader("Bearer demo_token_secret_123");
    setErrors({});
  };

  const applyFailurePreset = () => {
    setName("Faulty Endpoint Demo");
    setServerUrl("https://mcp.failure-test.com/v1");
    setAuthHeader("Bearer test_fail");
    setErrors({});
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = "Connector name is required.";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    if (!serverUrl.trim()) {
      newErrors.serverUrl = "MCP server URL is required.";
    } else {
      try {
        const url = new URL(serverUrl.trim());
        if (url.protocol !== "https:") {
          newErrors.serverUrl = "Enter a valid HTTPS MCP server URL (http:// is not permitted).";
        }
      } catch {
        newErrors.serverUrl = "Enter a valid HTTPS MCP server URL (e.g. https://mcp.example.com/mcp).";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check quota for Free tier
    if (!canAddMore) {
      openUpgradeModal(
        "Free tier includes 1 active MCP connector. Upgrade to EchoGPT Pro for unlimited tool connectors."
      );
      return;
    }

    if (!validate()) return;

    setIsLoading(true);
    setLoadingPhase("Connecting to MCP server endpoint...");

    setTimeout(() => {
      setLoadingPhase("Discovering available tools & permissions schema...");
    }, 350);

    const result = await addConnector({
      name,
      serverUrl,
      authorizationHeader: authHeader,
    });

    setIsLoading(false);

    if (result.success && result.connector) {
      showToast(`Connected "${result.connector.name}" (${result.connector.tools.length} tools discovered)`, "success");
      handleClose();
      onSuccess?.();
    } else {
      showToast(result.error || "Connection failed. Please check the server endpoint.", "error");
      handleClose();
      onSuccess?.();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      maxWidth="md"
      bodyClassName="p-0 flex flex-col min-h-0 overflow-hidden"
    >
      <div className="flex flex-col h-full max-h-[calc(100dvh-32px)] font-lexend overflow-hidden">
        {/* Compact Modal Header (Always visible at top) */}
        <div className="px-4 py-3 sm:px-5 sm:py-3.5 border-b border-zinc-100 dark:border-white/8 bg-zinc-50/70 dark:bg-white/[0.02] shrink-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 pr-6">
              <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-50 truncate">
                Add custom connector
              </h3>
              <p className="text-[11.5px] sm:text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 leading-snug">
                Connect an MCP server and its tools become available in chat.
              </p>
            </div>

            {/* Quota Badge */}
            <span className="text-[10px] sm:text-[10.5px] font-semibold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-white/6 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-white/8 shrink-0">
              {isProUser ? "Unlimited Pro" : `${connectedCount} of ${quotaLimit}`}
            </span>
          </div>
        </div>

        {/* Scrollable Form Body (Only this section scrolls when screen is compact) */}
        <form onSubmit={handleSubmit} className="overflow-y-auto custom-scrollbar px-4 py-3 sm:px-5 sm:py-4 space-y-3 flex-1 min-h-0">
          {/* Free Tier Quota Alert if at limit */}
          {!canAddMore && (
            <div className="p-2.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 text-amber-800 dark:text-amber-300 text-xs flex items-start gap-2">
              <Sparkles className="size-4 shrink-0 text-[#713CF4] mt-0.5" />
              <div className="space-y-0.5 min-w-0">
                <p className="font-semibold text-xs">Connector Limit Reached</p>
                <p className="text-[11px] text-amber-700 dark:text-amber-400 leading-snug">
                  Free tier includes 1 connector. Upgrade to Pro for unlimited tools.
                </p>
                <button
                  type="button"
                  onClick={() => openUpgradeModal("Upgrade to EchoGPT Pro to unlock unlimited MCP connectors.")}
                  className="font-semibold text-[#713CF4] dark:text-[#a78bfa] hover:underline cursor-pointer text-xs pt-0.5"
                >
                  Upgrade to Pro →
                </button>
              </div>
            </div>
          )}

          {/* Quick Demo Presets Strip (Horizontal scroll row on mobile to save vertical space) */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1 text-[11px] sm:text-[11.5px]">
                <Zap className="size-3 text-[#713CF4]" />
                <span>Quick-Fill Presets:</span>
              </span>
              <span className="text-[10px] text-zinc-400">1-click test</span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto sm:overflow-x-visible sm:flex-wrap no-scrollbar py-0.5">
              {DEMO_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => applyPreset(preset)}
                  className="shrink-0 sm:shrink-0 px-2 py-0.5 rounded-md text-[11px] font-medium bg-zinc-100 hover:bg-zinc-200/70 dark:bg-white/5 dark:hover:bg-white/10 text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-white/8 transition-colors cursor-pointer"
                >
                  {preset.name}
                </button>
              ))}
              <button
                type="button"
                onClick={applyFailurePreset}
                className="shrink-0 sm:shrink-0 px-2 py-0.5 rounded-md text-[11px] font-medium bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/20 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200/60 dark:border-rose-900/40 transition-colors cursor-pointer"
                title="Test simulated error & retry workflow"
              >
                Test Failure
              </button>
            </div>
          </div>

          {/* Field 1: Connector Name */}
          <div className="space-y-1">
            <label
              htmlFor="connector-name"
              className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300"
            >
              Name <span className="text-rose-500">*</span>
            </label>
            <input
              id="connector-name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
              }}
              placeholder="e.g. GitHub Tools"
              disabled={isLoading}
              className={`w-full text-xs sm:text-[13px] h-9 px-3 rounded-lg bg-white dark:bg-[#181524] border ${
                errors.name
                  ? "border-rose-500 focus:border-rose-500"
                  : "border-zinc-200 dark:border-white/8 focus:border-[#713CF4]"
              } text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 outline-none focus:ring-1 focus:ring-[#713CF4] transition-all`}
            />
            {errors.name ? (
              <p className="text-[10px] text-rose-500">{errors.name}</p>
            ) : (
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500 leading-tight">
                Shown in the connector management and chat selection lists.
              </p>
            )}
          </div>

          {/* Field 2: MCP Server URL */}
          <div className="space-y-1">
            <label
              htmlFor="server-url"
              className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300"
            >
              MCP server URL <span className="text-rose-500">*</span>
            </label>
            <input
              id="server-url"
              type="text"
              value={serverUrl}
              onChange={(e) => {
                setServerUrl(e.target.value);
                if (errors.serverUrl) setErrors((prev) => ({ ...prev, serverUrl: "" }));
              }}
              placeholder="https://mcp.example.com/v1"
              disabled={isLoading}
              className={`w-full text-xs sm:text-[13px] h-9 px-3 rounded-lg bg-white dark:bg-[#181524] border ${
                errors.serverUrl
                  ? "border-rose-500 focus:border-rose-500"
                  : "border-zinc-200 dark:border-white/8 focus:border-[#713CF4]"
              } text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 outline-none focus:ring-1 focus:ring-[#713CF4] transition-all font-mono`}
            />
            {errors.serverUrl ? (
              <p className="text-[10px] text-rose-500">{errors.serverUrl}</p>
            ) : (
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500 leading-tight">
                The HTTPS address where the server accepts MCP requests.
              </p>
            )}
          </div>

          {/* Field 3: Authorization Header (Optional) */}
          <div className="space-y-1">
            <label
              htmlFor="auth-header"
              className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300"
            >
              Authorization header (optional)
            </label>
            <input
              id="auth-header"
              type="password"
              value={authHeader}
              onChange={(e) => setAuthHeader(e.target.value)}
              placeholder="Bearer your-token-here"
              disabled={isLoading}
              className="w-full text-xs sm:text-[13px] h-9 px-3 rounded-lg bg-white dark:bg-[#181524] border border-zinc-200 dark:border-white/8 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 outline-none focus:border-[#713CF4] focus:ring-1 focus:ring-[#713CF4] transition-all font-mono"
            />
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500 leading-tight">
              Only required if your MCP server requires authentication.
            </p>
          </div>

          {/* Loading Indicator State */}
          {isLoading && (
            <div className="p-2.5 rounded-lg bg-[#713CF4]/10 border border-[#713CF4]/20 flex items-center gap-2.5 animate-in fade-in duration-150">
              <Loader2 className="size-3.5 text-[#713CF4] animate-spin shrink-0" />
              <div className="text-xs text-[#713CF4] dark:text-[#a78bfa] font-medium truncate">
                {loadingPhase}
              </div>
            </div>
          )}

          {/* Security Note */}
          <div className="p-2 rounded-lg bg-zinc-50 dark:bg-white/3 border border-zinc-200/60 dark:border-white/6 text-[10.5px] text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
            <ShieldAlert className="size-3.5 shrink-0 text-amber-500" />
            <p className="leading-tight">
              Only connect servers you trust — tools can execute actions on your behalf.
            </p>
          </div>
        </form>

        {/* Compact Modal Actions Footer (Always visible at bottom) */}
        <div className="px-4 py-3 sm:px-5 sm:py-3.5 border-t border-zinc-100 dark:border-white/8 bg-zinc-50/70 dark:bg-white/[0.02] flex items-center justify-end gap-2 shrink-0">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClose}
            disabled={isLoading}
            className="h-8 px-3 text-xs"
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={handleSubmit}
            isLoading={isLoading}
            className="h-8 px-4 text-xs font-semibold shadow-xs"
          >
            Continue
          </Button>
        </div>
      </div>
    </Modal>
  );
}
