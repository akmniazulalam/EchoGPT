import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";

export const metadata: Metadata = {
  title: "AI Tasks",
  description: "Automate and schedule recurring AI-powered productivity tasks in EchoGPT.",
};

export default function AiTasksPage() {
  return (
    <PlaceholderPage
      title="AI Tasks"
      description="Automate, schedule, and orchestrate recurring AI-powered productivity tasks."
    />
  );
}
