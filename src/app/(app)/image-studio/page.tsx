import type { Metadata } from "next";
import { ImageStudioWorkspace } from "@/components/dashboard/ImageStudioWorkspace";

export const metadata: Metadata = {
  title: "Image Studio",
  description: "AI-powered high-fidelity image generation workspace - EchoGPT PRO.",
};

export default function ImageStudioPage() {
  return <ImageStudioWorkspace />;
}
