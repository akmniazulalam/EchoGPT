import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | EchoGPT",
    default: "EchoGPT - AI-Driven Productivity Solutions",
  },
  description: "Modern AI Productivity & Creation Ecosystem",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${lexend.variable} h-full antialiased`}
      suppressHydrationWarning>
      <head>
        {/*
          Run before the browser can paint the server-rendered light theme.
          next/script's beforeInteractive strategy queues inline scripts for
          Next.js startup in the App Router, which can be too late for this.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=null;try{t=localStorage.getItem("echogpt_theme")}catch(e){}var d=t==="dark"||(t!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d)})()`,
          }}
        />
      </head>
      <body
        className="min-h-full flex flex-col font-lexend bg-[#FCFCFD] dark:bg-[#090A0F] text-zinc-900 dark:text-zinc-100"
        suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
