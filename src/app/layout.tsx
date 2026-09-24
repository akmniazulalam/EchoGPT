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
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("echogpt_theme");var d=window.matchMedia("(prefers-color-scheme: dark)").matches;if(t==="dark"||(!t&&d)){document.documentElement.classList.add("dark")}else{document.documentElement.classList.remove("dark")}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-lexend bg-[#FCFCFD] dark:bg-[#090A0F] text-zinc-900 dark:text-zinc-100" cz-shortcut-listen="true">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
