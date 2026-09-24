import type { Metadata } from "next";
import { HistoryWorkspace } from "@/components/dashboard/HistoryWorkspace";

export const metadata: Metadata = {
  title: "Chat History",
  description: "Browse, search, and manage archived conversation history in EchoGPT.",
};

export default function HistoryPage() {
  return <HistoryWorkspace />;
}
