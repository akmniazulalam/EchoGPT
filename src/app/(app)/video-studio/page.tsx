import type { Metadata } from "next";
import { VideoStudioWorkspace } from "@/components/dashboard/VideoStudioWorkspace";

export const metadata: Metadata = {
  title: "Video Studio",
  description: "AI cinematic video generation and scene synthesis - EchoGPT PRO.",
};

export default function VideoStudioPage() {
  return <VideoStudioWorkspace />;
}
