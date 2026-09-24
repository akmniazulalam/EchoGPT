"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface UpgradeModalContextType {
  isOpen: boolean;
  featureReason?: string;
  openUpgradeModal: (reason?: string) => void;
  closeUpgradeModal: () => void;
}

const UpgradeModalContext = createContext<UpgradeModalContextType | undefined>(
  undefined
);

export function UpgradeModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [featureReason, setFeatureReason] = useState<string | undefined>(
    undefined
  );

  const openUpgradeModal = useCallback((reason?: string) => {
    setFeatureReason(reason);
    setIsOpen(true);
  }, []);

  const closeUpgradeModal = useCallback(() => {
    setIsOpen(false);
    setFeatureReason(undefined);
  }, []);

  return (
    <UpgradeModalContext.Provider
      value={{
        isOpen,
        featureReason,
        openUpgradeModal,
        closeUpgradeModal,
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
