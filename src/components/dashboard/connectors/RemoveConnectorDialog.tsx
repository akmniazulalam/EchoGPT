"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";
import { Connector } from "@/types/connector";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

interface RemoveConnectorDialogProps {
  connector: Connector | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: string) => void;
}

export function RemoveConnectorDialog({
  connector,
  isOpen,
  onClose,
  onConfirm,
}: RemoveConnectorDialogProps) {
  if (!connector) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="md"
      showCloseButton={false}
      bodyClassName="p-6"
    >
      <div className="space-y-4">
        <div className="size-11 rounded-2xl flex items-center justify-center bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400">
          <AlertTriangle className="size-5" />
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
            Remove &ldquo;{connector.name}&rdquo;?
          </h3>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1.5 leading-relaxed">
            This will remove the connector from EchoGPT and its {connector.tools.length} discovered tools
            will no longer be available during your conversations.
          </p>
        </div>

        <div className="pt-2 flex items-center justify-end gap-3">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>

          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              onConfirm(connector.id);
              onClose();
            }}
          >
            Remove connector
          </Button>
        </div>
      </div>
    </Modal>
  );
}
