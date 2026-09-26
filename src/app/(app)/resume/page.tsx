import type { Metadata } from "next";
import { JobAnalysisWorkspace } from "@/components/dashboard/JobAnalysisWorkspace";

export const metadata: Metadata = {
  title: "AI Job Analysis",
  description: "Extract required skills, ATS keywords, gap analysis, and interview strategies from job postings.",
};

export default function JobAnalysisPage() {
  return <JobAnalysisWorkspace />;
}
