import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/LandingPage";

export const metadata: Metadata = {
  title: "EchoGPT – Your complete AI productivity ecosystem",
  description:
    "Chat with GPT-5, Claude, and Gemini. Generate images and videos. Compare AI models side-by-side. One platform, every AI superpower.",
};

export default function HomePage() {
  return <LandingPage />;
}
