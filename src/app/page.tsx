"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PlaceholderWorkspace } from "@/components/dashboard/PlaceholderWorkspace";

export default function Home() {
  const [activeNavId, setActiveNavId] = useState<string>("image-studio");

  return (
    <AppShell
      activeNavId={activeNavId}
      onSelectNav={(id) => setActiveNavId(id)}
      onNewChat={() => setActiveNavId("new-chat")}
    >
      <PlaceholderWorkspace
        activeNavId={activeNavId}
        onSelectNav={(id) => setActiveNavId(id)}
      />
    </AppShell>
  );
}
