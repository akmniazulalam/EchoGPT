"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PlaceholderWorkspace } from "./PlaceholderWorkspace";

function ChatSessionContainer() {
  const searchParams = useSearchParams();
  const sessionKey = searchParams.get("new") ?? "default";

  return <PlaceholderWorkspace key={sessionKey} />;
}

export function ChatClient() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-1 h-full items-center justify-center bg-[#FAFAFC] dark:bg-[#0C0D11]">
          <div className="size-6 border-2 border-[#713CF4] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ChatSessionContainer />
    </Suspense>
  );
}
