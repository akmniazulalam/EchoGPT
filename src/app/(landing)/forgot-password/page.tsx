import type { Metadata } from "next";
import { KeyRound, ShieldCheck, Clock } from "lucide-react";
import { AuthPageLayout } from "@/components/auth/AuthPageLayout";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset your EchoGPT account password.",
};

const FEATURES = [
  {
    icon: <KeyRound className="size-4" />,
    label: "Secure password reset via email link",
  },
  {
    icon: <Clock className="size-4" />,
    label: "Reset links expire after 24 hours",
  },
  {
    icon: <ShieldCheck className="size-4" />,
    label: "Your account security is our priority",
  },
];

export default function ForgotPasswordPage() {
  return (
    <AuthPageLayout
      heading="Reset your password"
      subheading="We'll send you a link to reset your password."
      features={FEATURES}
    >
      <ForgotPasswordForm />
    </AuthPageLayout>
  );
}
