import {
  Image as ImageIcon,
  Video as VideoIcon,
  Columns2,
  Workflow,
  History,
  Store,
  ListCheck,
  Briefcase,
  FileText,
  LifeBuoy,
  Mail,
  CreditCard,
  Code2,
  MessageSquare,
  User,
  Settings,
  SunMoon,
} from "lucide-react";
import type { NavSection, NavItem, BottomUtilityItem } from "@/types/navigation";

export const ENGAGEMENT_ITEMS: NavItem[] = [
  {
    id: "image-studio",
    label: "Image Studio",
    href: "#image-studio",
    icon: ImageIcon,
    isPro: true,
    badge: { text: "PRO", variant: "pro" },
  },
  {
    id: "video-studio",
    label: "Video Studio",
    href: "#video-studio",
    icon: VideoIcon,
    isPro: true,
    badge: { text: "PRO", variant: "pro" },
  },
  {
    id: "compare",
    label: "Compare",
    href: "#compare",
    icon: Columns2,
  },
  {
    id: "connectors",
    label: "Connectors",
    href: "#connectors",
    icon: Workflow,
  },
  {
    id: "history",
    label: "History",
    href: "#history",
    icon: History,
  },
  {
    id: "store",
    label: "Store",
    href: "#store",
    icon: Store,
  },
  {
    id: "ai-tasks",
    label: "AI Tasks",
    href: "#ai-tasks",
    icon: ListCheck,
  },
  {
    id: "ai-job-analysis",
    label: "AI Job Analysis",
    href: "#ai-job-analysis",
    icon: Briefcase,
  },
  {
    id: "ai-sop-builder",
    label: "AI SOP Builder",
    href: "#ai-sop-builder",
    icon: FileText,
  },
];

export const HELP_SUPPORT_ITEMS: NavItem[] = [
  {
    id: "support",
    label: "Support",
    href: "#support",
    icon: LifeBuoy,
  },
  {
    id: "newsletter",
    label: "Newsletter",
    href: "#newsletter",
    icon: Mail,
  },
  {
    id: "subscriptions",
    label: "Subscriptions",
    href: "#subscriptions",
    icon: CreditCard,
  },
  {
    id: "api-platform",
    label: "API Platform",
    href: "#api-platform",
    icon: Code2,
  },
  {
    id: "discord",
    label: "Discord",
    href: "https://discord.gg/echogpt",
    icon: MessageSquare,
    isExternal: true,
  },
];

export const NAVIGATION_SECTIONS: NavSection[] = [
  {
    id: "engagement",
    title: "ENGAGEMENT",
    items: ENGAGEMENT_ITEMS,
  },
  {
    id: "help-support",
    title: "HELP & SUPPORT",
    items: HELP_SUPPORT_ITEMS,
  },
];

export const BOTTOM_UTILITY_ITEMS: BottomUtilityItem[] = [
  {
    id: "account",
    label: "Account",
    href: "#account",
    icon: User,
    ariaLabel: "User account and profile",
  },
  {
    id: "settings",
    label: "Settings",
    href: "#settings",
    icon: Settings,
    ariaLabel: "Application settings",
  },
  {
    id: "theme",
    label: "Theme",
    href: "#theme",
    icon: SunMoon,
    ariaLabel: "Toggle theme",
  },
];
