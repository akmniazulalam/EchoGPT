import type { Metadata } from "next";
import { Sparkles, Zap, Layers, ShieldCheck } from "lucide-react";
import { AuthPageLayout } from "@/components/auth/AuthPageLayout";
import { SignInForm } from "@/components/auth/SignInForm";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your EchoGPT workspace.",
};

const FEATURES = [
  {
    icon: <Sparkles className="size-4" />,
    label: "Chat with GPT-4o, Gemini, Claude & more",
  },
  {
    icon: <Zap className="size-4" />,
    label: "AI Tasks — structured automation in one click",
  },
  {
    icon: <Layers className="size-4" />,
    label: "MCP Connectors — live tools from any server",
  },
  {
    icon: <ShieldCheck className="size-4" />,
    label: "Your conversations stay private",
  },
];

export default function SignInPage() {
  return (
    <AuthPageLayout
      heading="Welcome back"
      subheading="Sign in to continue to your EchoGPT workspace."
      features={FEATURES}
    >
      <SignInForm />
    </AuthPageLayout>
  );
}
