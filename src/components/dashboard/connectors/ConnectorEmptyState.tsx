"use client";

import React from "react";
import { Plus, Sparkles } from "lucide-react";
import { McpBranchIcon } from "./ConnectorIcons";
import { Button } from "@/components/ui/Button";

interface ConnectorEmptyStateProps {
  onAddConnector: () => void;
  onLoadSamples: () => void;
}

export function ConnectorEmptyState({
  onAddConnector,
  onLoadSamples,
}: ConnectorEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 sm:py-24 px-4 max-w-lg mx-auto">
      {/* Icon matching Screenshot 1 */}
      <div className="size-16 sm:size-18 rounded-2xl flex items-center justify-center bg-zinc-100 dark:bg-[#181524] border border-zinc-200/80 dark:border-white/[0.08] text-zinc-400 dark:text-zinc-500 mb-5 shadow-xs">
        <McpBranchIcon className="size-8" />
      </div>

      {/* Heading matching Screenshot 1 */}
      <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
        No connectors yet.
      </h3>

      {/* Supporting description matching Screenshot 1 */}
      <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mb-7 leading-relaxed">
        Add an MCP server above and the model can use its tools in chat.
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
        <Button
          variant="primary"
          size="md"
          onClick={onAddConnector}
          leftIcon={<Plus className="size-4" />}
          className="w-full sm:w-auto shadow-md shadow-[#713CF4]/20 font-semibold"
        >
          Add your first connector
        </Button>

        <Button
          variant="outline"
          size="md"
          onClick={onLoadSamples}
          leftIcon={<Sparkles className="size-3.5 text-[#713CF4] dark:text-[#A78BFA]" />}
          className="w-full sm:w-auto text-xs"
        >
          Load Demo Connectors
        </Button>
      </div>

      <p className="text-[11px] text-zinc-400 dark:text-zinc-600 mt-6">
        Model Context Protocol (MCP) links EchoGPT with real-time APIs, databases, and internal workflows.
      </p>
    </div>
  );
}
