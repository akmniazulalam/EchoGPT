import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";

export const metadata: Metadata = {
  title: "Support",
  description: "Get technical support, billing assistance, and user guides for EchoGPT.",
};

export default function SupportPage() {
  return (
    <PlaceholderPage
      title="Support"
      description="Access customer support, technical documentation, billing inquiries, and troubleshooting guides."
    />
  );
}
