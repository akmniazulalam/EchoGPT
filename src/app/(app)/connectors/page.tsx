import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";

export const metadata: Metadata = {
  title: "Connectors",
  description: "Connect EchoGPT to your databases, tools, and enterprise workflows.",
};

export default function ConnectorsPage() {
  return (
    <PlaceholderPage
      title="Connectors"
      description="Connect EchoGPT to your data sources, knowledge bases, and team workflow tools."
    />
  );
}
