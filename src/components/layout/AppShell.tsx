"use client";

import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";

interface AppShellProps {
  children?: React.ReactNode;
  activeNavId?: string;
  onSelectNav?: (id: string) => void;
  onNewChat?: () => void;
}

export function AppShell({
  children,
  activeNavId: controlledActiveId,
  onSelectNav: controlledOnSelectNav,
  onNewChat: controlledOnNewChat,
}: AppShellProps) {
  // Navigation active state (can be controlled or uncontrolled)
  const [internalActiveId, setInternalActiveId] = useState<string>("image-studio");
  const activeId = controlledActiveId ?? internalActiveId;

  // Sidebar collapse state (desktop & tablet)
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  // Mobile drawer state
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);

  const handleSelectNav = (id: string) => {
    if (controlledOnSelectNav) {
      controlledOnSelectNav(id);
    } else {
      setInternalActiveId(id);
    }
  };

  const handleNewChat = () => {
    if (controlledOnNewChat) {
      controlledOnNewChat();
    } else {
      setInternalActiveId("new-chat");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden bg-[#FAFAFC] dark:bg-[#090A0F] font-lexend antialiased">
      {/* 1. Mobile Top Bar & Drawer (visible on < md screens) */}
      <MobileNav
        isOpen={isMobileDrawerOpen}
        onOpen={() => setIsMobileDrawerOpen(true)}
        onClose={() => setIsMobileDrawerOpen(false)}
        activeId={activeId}
        onSelectNav={handleSelectNav}
        onNewChat={handleNewChat}
      />

      {/* 2. Persistent Sidebar (visible on >= md screens) */}
      <div className="hidden md:flex shrink-0 h-full">
        <Sidebar
          activeId={activeId}
          onSelectNav={handleSelectNav}
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
    </div>
  );
}
