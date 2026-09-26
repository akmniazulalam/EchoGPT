"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PlaceholderWorkspace } from "./PlaceholderWorkspace";

function ChatSessionContainer() {
  const searchParams = useSearchParams();
  const sessionKey = searchParams.get("new") ?? "default";
  const conversationId = searchParams.get("c") ?? "";
  const modelId = searchParams.get("model") ?? "";
  const prompt = searchParams.get("prompt") ?? undefined;

  // React key ensures clean fresh component state whenever navigating to a different
  // conversation, clicking New Chat, or selecting a new model from the Store
  const mountKey = conversationId
    ? `c-${conversationId}`
    : `new-${sessionKey}-${modelId || "default"}`;

  return (
    <PlaceholderWorkspace
      key={mountKey}
      conversationId={conversationId || undefined}
      initialModelId={modelId || undefined}
      initialPrompt={prompt}
    />
  );
}

export function ChatClient() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-1 h-full items-center justify-center bg-[#FAFAFC] dark:bg-[#0E0C15]">
          <div className="size-6 border-2 border-[#713CF4] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ChatSessionContainer />
    </Suspense>
  );
}
