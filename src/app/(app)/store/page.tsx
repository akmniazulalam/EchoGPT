import type { Metadata } from "next";
import { StoreWorkspace } from "@/components/dashboard/StoreWorkspace";

export const metadata: Metadata = {
  title: "EchoGPT Store",
  description:
    "Discover and create customized versions of EchoGPT that combine instructions, extra knowledge, and any combination of skills.",
};

export default function StorePage() {
  return <StoreWorkspace />;
}
