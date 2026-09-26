import type { Metadata } from "next";
import { ConnectorsWorkspace } from "@/components/dashboard/connectors/ConnectorsWorkspace";

export const metadata: Metadata = {
  title: "Connectors | EchoGPT",
  description:
    "Connect external tools to EchoGPT through MCP and make them available while you chat.",
};

export default function ConnectorsPage() {
  return <ConnectorsWorkspace />;
}
