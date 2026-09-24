import type { Metadata } from "next";
import { ChatClient } from "@/components/dashboard/ChatClient";

export const metadata: Metadata = {
  title: "Chat",
  description: "Interactive AI Chat Workspace - EchoGPT",
};

export default function ChatPage() {
  return <ChatClient />;
}
