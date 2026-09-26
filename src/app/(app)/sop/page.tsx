import type { Metadata } from "next";
import { SopBuilderWorkspace } from "@/components/dashboard/SopBuilderWorkspace";

export const metadata: Metadata = {
  title: "AI SOP Builder",
  description:
    "Create compelling Standard Operating Procedures with AI-powered insights tailored to your organization's goals and industry standards.",
};

export default function SopBuilderPage() {
  return <SopBuilderWorkspace />;
}
