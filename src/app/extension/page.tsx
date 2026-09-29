import type { Metadata } from "next";
import { UpgradeModalProvider } from "@/context/UpgradeModalContext";
import { ConnectorProvider } from "@/context/ConnectorContext";
import { MockBrowserFrameClient } from "@/components/extension/MockBrowserFrameClient";

export const metadata: Metadata = {
  title: "Chrome Extension Concept",
  description:
    "Interactive EchoGPT Chrome Side Panel companion concept. Features multi-AI chat, write studio, page reader, real-time translator, image/video workflows, 100+ model comparison, and live MCP connectors in a resizable 360px–1080px side panel.",
};

/*
  MockBrowserFrame reads localStorage (panel width, active tab, conversations,
  settings) during its first render via lazy useState initializers.
  SSR would render with defaults (440px / "chat") while the client first-render
  reads the stored values — causing a React hydration mismatch.

  Because /extension has no SEO value (it's a demo concept) and all state is
  client-only, we skip SSR entirely via MockBrowserFrameClient (a "use client"
  wrapper using next/dynamic with ssr:false). This eliminates the mismatch
  without changing any component logic.
*/
export default function ExtensionPage() {
  return (
    <UpgradeModalProvider>
      <ConnectorProvider>
        <MockBrowserFrameClient />
      </ConnectorProvider>
    </UpgradeModalProvider>
  );
}
