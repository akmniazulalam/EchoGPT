import type { Metadata } from "next";
import { TasksWorkspace } from "@/components/dashboard/tasks/TasksWorkspace";

export const metadata: Metadata = {
  title: "AI Tasks",
  description:
    "Discover and run specialized AI-powered workflows that turn complex tasks into structured results.",
};

export default function TasksPage() {
  return <TasksWorkspace />;
}
