import type { Metadata } from "next";
import { SubscriptionsWorkspace } from "@/components/subscriptions/SubscriptionsWorkspace";

export const metadata: Metadata = {
  title: "Subscriptions & Plans",
  description: "Affordable plans for every need. Unlock frontier neural reasoning, 4K image synthesis, and cinematic video tools with EchoGPT Pro.",
};

export default function SubscriptionsPage() {
  return <SubscriptionsWorkspace />;
}
