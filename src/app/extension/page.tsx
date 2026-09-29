import type { Metadata } from "next";
import { MockBrowserFrame } from "@/components/extension/MockBrowserFrame";
import { UpgradeModalProvider } from "@/context/UpgradeModalContext";
import { ConnectorProvider } from "@/context/ConnectorContext";

export const metadata: Metadata = {
  title: "Chrome Extension Concept",
  description:
    "Interactive EchoGPT Chrome Side Panel companion concept. Features multi-AI chat, write studio, page reader, real-time translator, image/video workflows, 100+ model comparison, and live MCP connectors in a resizable 360px–720px side panel.",
};

export default function ExtensionPage() {
  return (
    <UpgradeModalProvider>
      <ConnectorProvider>
        <MockBrowserFrame />
      </ConnectorProvider>
    </UpgradeModalProvider>
  );
}
