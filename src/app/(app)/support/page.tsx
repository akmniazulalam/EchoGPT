import type { Metadata } from "next";
import { SupportWorkspace } from "@/components/support/SupportWorkspace";

export const metadata: Metadata = {
  title: "Support",
  description: "Get technical support, billing assistance, and user guides for EchoGPT.",
};

export default function SupportPage() {
  return <SupportWorkspace />;
}
