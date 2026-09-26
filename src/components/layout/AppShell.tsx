"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { UpgradeModalProvider } from "@/context/UpgradeModalContext";
import { UpgradeProModal } from "@/components/billing/UpgradeProModal";
import { ToastContainer } from "@/components/ui/Toast";

interface AppShellProps {
  children?: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const router = useRouter();

  // Sidebar collapse state (desktop & tablet)
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  // Mobile drawer state (single source of truth)
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);

  const handleOpenDrawer = useCallback(() => {
    setIsMobileDrawerOpen(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setIsMobileDrawerOpen(false);
  }, []);

  // New Chat navigates to /chat?new=<timestamp>
  const handleNewChat = useCallback(() => {
    router.push(`/chat?new=${Date.now()}`);
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("echogpt:new-chat"));
      window.dispatchEvent(new CustomEvent("echogpt:focus-chat-input"));
    }, 100);
  }, [router]);

  // Global Keyboard Shortcut: Command+Shift+K (macOS) or Ctrl+Shift+K (Windows/Linux)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isModifier = e.metaKey || e.ctrlKey;
      if (isModifier && e.shiftKey && (e.key === "k" || e.key === "K")) {
        // Do not interrupt user if typing inside an input or textarea
        const target = e.target as HTMLElement | null;
        const isEditing =
          target &&
          (target.tagName === "INPUT" ||
            target.tagName === "TEXTAREA" ||
            target.isContentEditable);

        if (isEditing) {
          return;
        }

        e.preventDefault();
        handleNewChat();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNewChat]);

  return (
    <UpgradeModalProvider>
      <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden bg-[#FAFAFC] dark:bg-[#090A0F] font-lexend antialiased">
        {/* 1. Mobile Top Bar & Drawer (visible on < md screens) */}
        <MobileNav
          isOpen={isMobileDrawerOpen}
          onOpen={handleOpenDrawer}
          onClose={handleCloseDrawer}
          onNewChat={handleNewChat}
        />

        {/* 2. Persistent Sidebar (visible on >= md screens) */}
        <div className="hidden md:flex shrink-0 h-full">
          <Sidebar
            onNewChat={handleNewChat}
            isCollapsed={isCollapsed}
            onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
          />
        </div>

        {/* 3. Main Application Content Area */}
        <main
          className="flex-1 flex flex-col h-full min-w-0 overflow-hidden"
          role="main"
          aria-label="Application Workspace"
        >
          {children}
        </main>

        {/* 4. Global Modals & Notifications */}
        <UpgradeProModal />
        <ToastContainer />
      </div>
    </UpgradeModalProvider>
  );
}
