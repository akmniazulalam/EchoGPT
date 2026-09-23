"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PlaceholderWorkspace } from "@/components/dashboard/PlaceholderWorkspace";

export default function Home() {
  const [activeNavId, setActiveNavId] = useState<string>("image-studio");
  const [chatSessionId, setChatSessionId] = useState<number>(1);

  const handleNewChat = () => {
    setActiveNavId("new-chat");
    setChatSessionId((prev) => prev + 1);
  };

  return (
    <AppShell
      activeNavId={activeNavId}
      onSelectNav={(id) => setActiveNavId(id)}
      onNewChat={handleNewChat}
    >
      <PlaceholderWorkspace
        key={chatSessionId}
        activeNavId={activeNavId}
        onSelectNav={(id) => setActiveNavId(id)}
        onNewChat={handleNewChat}
      />
    </AppShell>
  );
}
