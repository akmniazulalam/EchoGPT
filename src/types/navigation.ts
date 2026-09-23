import type { LucideIcon } from "lucide-react";

export interface NavBadge {
  text: string;
  variant?: "pro" | "default" | "brand";
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: NavBadge;
  isPro?: boolean;
  isExternal?: boolean;
  disabled?: boolean;
}

export interface NavSection {
  id: string;
  title: string;
  items: NavItem[];
}

export interface BottomUtilityItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  ariaLabel?: string;
  isExternal?: boolean;
}
