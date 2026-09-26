import type { Metadata } from "next";
import { NewsletterWorkspace } from "@/components/newsletter/NewsletterWorkspace";

export const metadata: Metadata = {
  title: "Newsletter",
  description: "Subscribe to EchoGPT product updates, AI productivity research, and feature releases.",
};

export default function NewsletterPage() {
  return <NewsletterWorkspace />;
}
