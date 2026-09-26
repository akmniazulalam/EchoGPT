import React from "react";

// Landing pages render outside AppShell — no sidebar, no nav chrome
export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
