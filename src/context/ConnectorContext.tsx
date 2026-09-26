"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { Connector, AddConnectorInput } from "@/types/connector";
import {
  loadStoredConnectors,
  saveStoredConnectors,
  loadActiveChatConnectorIds,
  saveActiveChatConnectorIds,
  getSampleDemoConnectors,
} from "@/lib/connectorStorage";
import { simulateMcpHandshake } from "@/lib/mockMcpService";
import { useUpgradeModal } from "./UpgradeModalContext";

interface ConnectorContextType {
  connectors: Connector[];
  activeConnectorIds: string[];
  quotaLimit: number;
  connectedCount: number;
  canAddMore: boolean;
  addConnector: (
    input: AddConnectorInput
  ) => Promise<{ success: boolean; error?: string; connector?: Connector }>;
  removeConnector: (id: string) => void;
  toggleConnectorEnabled: (id: string) => void;
  toggleActiveConnectorInChat: (id: string) => void;
  setActiveConnectorsInChat: (ids: string[]) => void;
  retryConnection: (id: string) => Promise<boolean>;
  loadSamples: () => void;
  clearAllConnectors: () => void;
}

const ConnectorContext = createContext<ConnectorContextType | undefined>(undefined);

export function ConnectorProvider({ children }: { children: React.ReactNode }) {
  const { isProUser } = useUpgradeModal();

  const [connectors, setConnectors] = useState<Connector[]>(() => {
    if (typeof window !== "undefined") {
      return loadStoredConnectors();
    }
    return [];
  });

  const [activeConnectorIds, setActiveConnectorIds] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      return loadActiveChatConnectorIds();
    }
    return [];
  });

  // Keep state synced across tabs / custom events
  useEffect(() => {
    const handleUpdate = () => {
      setConnectors(loadStoredConnectors());
      setActiveConnectorIds(loadActiveChatConnectorIds());
    };

    window.addEventListener("echogpt:connectors-updated", handleUpdate);
    window.addEventListener("echogpt:active-chat-connectors-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("echogpt:connectors-updated", handleUpdate);
      window.removeEventListener("echogpt:active-chat-connectors-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  // Connected count & Quota
  const connectedCount = useMemo(() => {
    return connectors.filter((c) => c.status === "connected").length;
  }, [connectors]);

  // Free users: 1 connector allowed; Pro users: unlimited
  const quotaLimit = isProUser ? Infinity : 1;
  const canAddMore = isProUser || connectedCount < quotaLimit;

  // Add Connector
  const addConnector = useCallback(
    async (
      input: AddConnectorInput
    ): Promise<{ success: boolean; error?: string; connector?: Connector }> => {
      const now = new Date().toISOString();
      const tempId = `conn-${Date.now()}`;

      // Simulate handshake & tool discovery
      const handshake = await simulateMcpHandshake(input.serverUrl, input.name);

      if (!handshake.success) {
        const failedConnector: Connector = {
          id: tempId,
          name: input.name.trim(),
          serverUrl: input.serverUrl.trim(),
          status: "failed",
          enabled: false,
          tools: [],
          hasAuthToken: Boolean(input.authorizationHeader?.trim()),
          createdAt: now,
          updatedAt: now,
          errorMessage: handshake.error,
          isDemo: true,
        };

        const updated = [failedConnector, ...connectors];
        setConnectors(updated);
        saveStoredConnectors(updated);

        return {
          success: false,
          error: handshake.error,
          connector: failedConnector,
        };
      }

      const newConnector: Connector = {
        id: tempId,
        name: input.name.trim(),
        serverUrl: input.serverUrl.trim(),
        status: "connected",
        enabled: true,
        tools: handshake.tools,
        hasAuthToken: Boolean(input.authorizationHeader?.trim()),
        createdAt: now,
        updatedAt: now,
        lastConnectedAt: now,
        isDemo: true,
      };

      const updated = [newConnector, ...connectors];
      setConnectors(updated);
      saveStoredConnectors(updated);

      // Automatically enable newly connected connector in active chat if within limits
      const updatedActive = [...activeConnectorIds, newConnector.id];
      setActiveConnectorIds(updatedActive);
      saveActiveChatConnectorIds(updatedActive);

      return {
        success: true,
        connector: newConnector,
      };
    },
    [activeConnectorIds, connectors]
  );

  // Remove Connector
  const removeConnector = useCallback(
    (id: string) => {
      const updated = connectors.filter((c) => c.id !== id);
      setConnectors(updated);
      saveStoredConnectors(updated);

      const updatedActive = activeConnectorIds.filter((activeId) => activeId !== id);
      setActiveConnectorIds(updatedActive);
      saveActiveChatConnectorIds(updatedActive);
    },
    [activeConnectorIds, connectors]
  );

  // Toggle Enabled
  const toggleConnectorEnabled = useCallback(
    (id: string) => {
      const updated = connectors.map((c) => {
        if (c.id === id) {
          const nextEnabled = !c.enabled;
          return {
            ...c,
            enabled: nextEnabled,
            status: nextEnabled ? ("connected" as const) : ("disabled" as const),
            updatedAt: new Date().toISOString(),
          };
        }
        return c;
      });

      setConnectors(updated);
      saveStoredConnectors(updated);

      // If disabled, also remove from active chat selection
      const target = updated.find((c) => c.id === id);
      if (target && !target.enabled) {
        const nextActive = activeConnectorIds.filter((actId) => actId !== id);
        setActiveConnectorIds(nextActive);
        saveActiveChatConnectorIds(nextActive);
      }
    },
    [activeConnectorIds, connectors]
  );

  // Toggle Active Connector in Chat
  const toggleActiveConnectorInChat = useCallback(
    (id: string) => {
      const isAlreadyActive = activeConnectorIds.includes(id);
      let updated: string[];

      if (isAlreadyActive) {
        updated = activeConnectorIds.filter((actId) => actId !== id);
      } else {
        // Can only activate if enabled and connected
        const target = connectors.find((c) => c.id === id);
        if (!target || target.status !== "connected" || !target.enabled) {
          return;
        }
        updated = [...activeConnectorIds, id];
      }

      setActiveConnectorIds(updated);
      saveActiveChatConnectorIds(updated);
    },
    [activeConnectorIds, connectors]
  );

  const setActiveConnectorsInChat = useCallback((ids: string[]) => {
    setActiveConnectorIds(ids);
    saveActiveChatConnectorIds(ids);
  }, []);

  // Retry failed connection
  const retryConnection = useCallback(
    async (id: string): Promise<boolean> => {
      const target = connectors.find((c) => c.id === id);
      if (!target) return false;

      // Temporary update to connecting
      const updatingList = connectors.map((c) =>
        c.id === id ? { ...c, status: "connecting" as const } : c
      );
      setConnectors(updatingList);

      const handshake = await simulateMcpHandshake(target.serverUrl, target.name);

      if (handshake.success) {
        const updated = connectors.map((c) =>
          c.id === id
            ? {
                ...c,
                status: "connected" as const,
                enabled: true,
                tools: handshake.tools,
                errorMessage: undefined,
                lastConnectedAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              }
            : c
        );
        setConnectors(updated);
        saveStoredConnectors(updated);
        return true;
      } else {
        const updated = connectors.map((c) =>
          c.id === id
            ? {
                ...c,
                status: "failed" as const,
                enabled: false,
                errorMessage: handshake.error,
                updatedAt: new Date().toISOString(),
              }
            : c
        );
        setConnectors(updated);
        saveStoredConnectors(updated);
        return false;
      }
    },
    [connectors]
  );

  // Load sample demo connectors
  const loadSamples = useCallback(() => {
    const samples = getSampleDemoConnectors();
    setConnectors(samples);
    saveStoredConnectors(samples);

    const activeIds = [samples[0].id];
    setActiveConnectorIds(activeIds);
    saveActiveChatConnectorIds(activeIds);
  }, []);

  // Clear all
  const clearAllConnectors = useCallback(() => {
    setConnectors([]);
    saveStoredConnectors([]);
    setActiveConnectorIds([]);
    saveActiveChatConnectorIds([]);
  }, []);

  return (
    <ConnectorContext.Provider
      value={{
        connectors,
        activeConnectorIds,
        quotaLimit,
        connectedCount,
        canAddMore,
        addConnector,
        removeConnector,
        toggleConnectorEnabled,
        toggleActiveConnectorInChat,
        setActiveConnectorsInChat,
        retryConnection,
        loadSamples,
        clearAllConnectors,
      }}
    >
      {children}
    </ConnectorContext.Provider>
  );
}

export function useConnectors() {
  const context = useContext(ConnectorContext);
  if (!context) {
    throw new Error("useConnectors must be used within a ConnectorProvider");
  }
  return context;
}
