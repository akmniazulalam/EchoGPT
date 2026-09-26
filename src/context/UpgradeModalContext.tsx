"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useSyncExternalStore,
} from "react";
import { loadDemoProState, saveDemoProState } from "@/lib/chatStorage";

interface UpgradeModalContextType {
  isOpen: boolean;
  featureReason?: string;
  isProUser: boolean;
  openUpgradeModal: (reason?: string) => void;
  closeUpgradeModal: () => void;
  activateDemoPro: () => void;
  resetDemoPro: () => void;
}

const UpgradeModalContext = createContext<UpgradeModalContextType | undefined>(
  undefined
);

function subscribeProStatus(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("echogpt:pro-status-updated", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("echogpt:pro-status-updated", callback);
    window.removeEventListener("storage", callback);
  };
}

function getProSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  return loadDemoProState();
}

function getServerProSnapshot(): boolean {
  return false;
}

export function UpgradeModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [featureReason, setFeatureReason] = useState<string | undefined>(
    undefined
  );

  const isProUser = useSyncExternalStore(
    subscribeProStatus,
    getProSnapshot,
    getServerProSnapshot
  );

  const openUpgradeModal = useCallback((reason?: string) => {
    setFeatureReason(reason);
    setIsOpen(true);
  }, []);

  const closeUpgradeModal = useCallback(() => {
    setIsOpen(false);
    setFeatureReason(undefined);
  }, []);

  const activateDemoPro = useCallback(() => {
    saveDemoProState(true);
  }, []);

  const resetDemoPro = useCallback(() => {
    saveDemoProState(false);
  }, []);

  return (
    <UpgradeModalContext.Provider
      value={{
        isOpen,
        featureReason,
        isProUser,
        openUpgradeModal,
        closeUpgradeModal,
        activateDemoPro,
        resetDemoPro,
      }}
    >
      {children}
    </UpgradeModalContext.Provider>
  );
}

export function useUpgradeModal() {
  const context = useContext(UpgradeModalContext);
  if (!context) {
    throw new Error(
      "useUpgradeModal must be used within an UpgradeModalProvider"
    );
  }
  return context;
}
