import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";

export const metadata: Metadata = {
  title: "Newsletter",
  description: "Subscribe to EchoGPT product updates, AI productivity research, and feature releases.",
};

export default function NewsletterPage() {
  return (
    <PlaceholderPage
      title="Newsletter"
      description="Stay informed with weekly EchoGPT product releases, research highlights, and AI productivity strategies."
    />
  );
}
