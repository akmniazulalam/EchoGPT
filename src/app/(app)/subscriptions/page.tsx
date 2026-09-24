import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";

export const metadata: Metadata = {
  title: "Subscriptions",
  description: "Manage your EchoGPT subscription tier, usage quotas, and billing settings.",
};

export default function SubscriptionsPage() {
  return (
    <PlaceholderPage
      title="Subscriptions"
      description="Manage your EchoGPT subscription plans, billing cycle, invoice history, and PRO feature access."
    />
  );
}
