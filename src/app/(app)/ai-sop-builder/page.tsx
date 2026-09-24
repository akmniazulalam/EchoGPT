import type { Metadata } from "next";
import { SopBuilderWorkspace } from "@/components/dashboard/SopBuilderWorkspace";

export const metadata: Metadata = {
  title: "AI SOP Builder",
  description: "Standard Operating Procedure generator with step-by-step verification protocols.",
};

export default function SopBuilderPage() {
  return <SopBuilderWorkspace />;
}
