import type { Metadata } from "next";
import { Sparkles, Zap, Layers, Users } from "lucide-react";
import { AuthPageLayout } from "@/components/auth/AuthPageLayout";
import { SignUpForm } from "@/components/auth/SignUpForm";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create your free EchoGPT account and start building AI workflows.",
};

const FEATURES = [
  {
    icon: <Sparkles className="size-4" />,
    label: "Access GPT-4o, Gemini, Claude — all in one place",
  },
  {
    icon: <Zap className="size-4" />,
    label: "Pre-built AI Tasks for writing, coding & research",
  },
  {
    icon: <Layers className="size-4" />,
    label: "Connect MCP servers for live tool capabilities",
  },
  {
    icon: <Users className="size-4" />,
    label: "Free tier — no credit card required",
  },
];

export default function SignUpPage() {
  return (
    <AuthPageLayout
      heading="Create your account"
      subheading="Start building with EchoGPT — free forever, no card needed."
      features={FEATURES}
    >
      <SignUpForm />
    </AuthPageLayout>
  );
}
