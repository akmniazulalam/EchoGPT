"use client";

/**
 * Client-side wrapper for MockBrowserFrame.
 *
 * next/dynamic with ssr:false is only allowed inside Client Components.
 * This wrapper exists solely so the extension page (a Server Component) can
 * render MockBrowserFrame without SSR — eliminating the hydration mismatch
 * caused by localStorage reads in MockBrowserFrame's lazy useState initializers.
 */
import dynamic from "next/dynamic";

export const MockBrowserFrameClient = dynamic(
  () =>
    import("@/components/extension/MockBrowserFrame").then((m) => ({
      default: m.MockBrowserFrame,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="h-screen w-screen bg-zinc-100 dark:bg-[#08070D]" />
    ),
  }
);
