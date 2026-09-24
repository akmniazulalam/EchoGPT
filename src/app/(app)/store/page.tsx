import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";

export const metadata: Metadata = {
  title: "Store",
  description: "Browse AI extensions, prompt templates, and community tools for EchoGPT.",
};

export default function StorePage() {
  return (
    <PlaceholderPage
      title="Store"
      description="Browse and install specialized AI extensions, prompt templates, and community tools."
    />
  );
}
