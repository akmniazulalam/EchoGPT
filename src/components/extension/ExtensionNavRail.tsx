"use client";

import React from "react";
import Link from "next/link";
import {
  MessageSquare,
  PenTool,
  BookOpen,
  Languages,
  Image as ImageIcon,
  Video,
  Columns2,
  Layers,
  Crown,
  Settings,
} from "lucide-react";
import { ExtensionTab } from "./types";
import { loadDemoUser } from "@/lib/authStorage";

interface ExtensionNavRailProps {
  activeTab: ExtensionTab;
  onSelectTab: (tab: ExtensionTab) => void;
}

export function ExtensionNavRail({ activeTab, onSelectTab }: ExtensionNavRailProps) {
  const demoUser = loadDemoUser();
  const userInitial = demoUser?.name?.charAt(0).toUpperCase() || "N";

  const navItems: {
    id: ExtensionTab;
    label: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: "chat",
      label: "Chat",
      icon: <MessageSquare className="size-4.5" />,
    },
    {
      id: "write",
      label: "Write",
      icon: <PenTool className="size-4.5" />,
    },
    {
      id: "read",
      label: "Read",
      icon: <BookOpen className="size-4.5" />,
    },
    {
      id: "translate",
      label: "Translate",
      icon: <Languages className="size-4.5" />,
    },
    {
      id: "image",
      label: "Image",
      icon: <ImageIcon className="size-4.5" />,
    },
    {
      id: "video",
      label: "Video",
      icon: <Video className="size-4.5" />,
    },
    {
      id: "compare",
      label: "Compare",
      icon: <Columns2 className="size-4.5" />,
    },
    {
      id: "mcp",
      label: "MCP",
      icon: <Layers className="size-4.5" />,
    },
  ];

  return (
    <aside
      aria-label="Extension navigation rail"
      className="w-13.5 sm:w-14 shrink-0 flex flex-col items-center justify-between py-2 border-l border-zinc-200/80 dark:border-white/8 bg-zinc-50/70 dark:bg-[#12111A] select-none z-10"
    >
      {/* Top Group: Primary Extension Modes */}
      <div className="flex flex-col items-center gap-1 w-full px-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTab(item.id)}
              className={`w-full py-1.5 px-1 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all cursor-pointer group relative ${
                isActive
                  ? "bg-[#713CF4]/10 dark:bg-[#713CF4]/20 text-[#713CF4] dark:text-[#a78bfa] font-bold"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/60 dark:hover:bg-white/[0.06]"
              }`}
              title={item.label}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
            >
              {isActive && (
                <span className="absolute right-0 top-1/2 -translate-y-1/2 w-0.75 h-5 bg-[#713CF4] rounded-l-full" />
              )}
              <span
                className={`transition-transform duration-150 ${
                  isActive ? "scale-105" : "group-hover:scale-105"
                }`}
              >
                {item.icon}
              </span>
              <span className="text-[10px] leading-tight tracking-tight font-medium">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bottom Group: Upgrade, Settings, Profile */}
      <div className="flex flex-col items-center gap-1.5 w-full px-1 pt-2 border-t border-zinc-200/60 dark:border-white/[0.06]">
        {/* Upgrade Button */}
        <Link
          href="/subscriptions"
          className="w-full py-1.5 px-1 rounded-xl flex flex-col items-center justify-center gap-0.5 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 dark:hover:bg-amber-500/15 transition-all cursor-pointer group"
          title="Upgrade to Pro"
          aria-label="Upgrade to Pro"
        >
          <Crown className="size-4.5 transition-transform group-hover:scale-110" />
          <span className="text-[9.5px] font-semibold leading-tight">Upgrade</span>
        </Link>

        {/* Settings Button */}
        <button
          type="button"
          onClick={() => onSelectTab("settings")}
          className={`w-full py-1.5 px-1 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all cursor-pointer group ${
            activeTab === "settings"
              ? "bg-[#713CF4]/10 dark:bg-[#713CF4]/20 text-[#713CF4] dark:text-[#a78bfa] font-bold"
              : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/60 dark:hover:bg-white/[0.06]"
          }`}
          title="Settings"
          aria-label="Settings"
        >
          <Settings className="size-4.5 transition-transform group-hover:rotate-45" />
          <span className="text-[9.5px] font-medium leading-tight">Settings</span>
        </button>

        {/* Profile / Avatar */}
        <button
          type="button"
          onClick={() => onSelectTab("settings")}
          className="size-7.5 rounded-full bg-linear-to-tr from-[#713CF4] to-[#9061F9] text-white font-bold text-xs flex items-center justify-center shadow-xs hover:ring-2 hover:ring-[#713CF4]/50 transition-all cursor-pointer"
          title="Account Profile"
          aria-label="Account Profile"
        >
          {userInitial}
        </button>
      </div>
    </aside>
  );
}
