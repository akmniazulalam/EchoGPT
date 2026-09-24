import type { Metadata } from "next";
import { CompareWorkspace } from "@/components/dashboard/CompareWorkspace";

export const metadata: Metadata = {
  title: "Compare AI Models",
  description: "Side-by-side model comparison workspace across speed, reasoning, and style.",
};

export default function ComparePage() {
  return <CompareWorkspace />;
}
