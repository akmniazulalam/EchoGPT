import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";

export const metadata: Metadata = {
  title: "API Platform",
  description: "Developer API keys, documentation, and SDK resources for the EchoGPT platform.",
};

export default function ApiPlatformPage() {
  return (
    <PlaceholderPage
      title="API Platform"
      description="Access developer documentation, generate API keys, view SDK code examples, and manage API quotas."
    />
  );
}
