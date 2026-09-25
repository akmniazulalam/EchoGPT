"use client";

import React, { useState, useRef } from "react";
import {
  MoreHorizontal,
  Star,
  Film,
  Play,
  Layers,
  Copy,
  RotateCcw,
  Trash2,
  FileText,
} from "lucide-react";
import {
  CreationActionsMenu,
  CreationActionItem,
} from "@/components/dashboard/CreationActionsMenu";

export interface CreationItem {
  id: string;
  title: string;
  prompt: string;
  type: "image" | "video";
  badge: string;
  badgeIcon?: React.ReactNode;
  colorGrad: string;
  ratio: string;
  model: string;
  timestamp: string;
  isFavorite?: boolean;
  duration?: string;
  batchIndex?: number;
  batchTotal?: number;
}

export interface CreationCardProps {
  item: CreationItem;
  isActive: boolean;
  onSelect: () => void;
  onRename: (id: string, newTitle: string) => void;
  onFavorite: (id: string) => void;
  onDuplicate: (item: CreationItem) => void;
  onRegenerate: (item: CreationItem) => void;
  onDelete: (id: string) => void;
}

export function CreationCard({
  item,
  isActive,
  onSelect,
  onRename,
  onFavorite,
  onDuplicate,
  onRegenerate,
  onDelete,
}: CreationCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(item.title || item.prompt);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleCommitRename = () => {
    if (renameValue.trim()) {
      onRename(item.id, renameValue.trim());
    } else {
      setRenameValue(item.title || item.prompt);
    }
    setIsRenaming(false);
  };

  const handleKeyDownRename = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCommitRename();
    } else if (e.key === "Escape") {
      e.preventDefault();
      setRenameValue(item.title || item.prompt);
      setIsRenaming(false);
    }
  };

  const actions: CreationActionItem[] = [
    {
      label: "Rename",
      icon: <FileText className="size-3.5" />,
      onClick: () => {
        setRenameValue(item.title || item.prompt);
        setIsRenaming(true);
      },
    },
    {
      label: item.isFavorite ? "Unfavorite" : "Favorite",
      icon: (
        <Star
          className={`size-3.5 ${
            item.isFavorite ? "fill-amber-400 text-amber-400" : ""
          }`}
        />
      ),
      onClick: () => onFavorite(item.id),
    },
    {
      label: "Duplicate",
      icon: <Copy className="size-3.5" />,
      onClick: () => onDuplicate(item),
    },
    {
      label: "Regenerate",
      icon: <RotateCcw className="size-3.5" />,
      onClick: () => onRegenerate(item),
    },
    {
      label: "Delete",
      icon: <Trash2 className="size-3.5" />,
      onClick: () => onDelete(item.id),
      danger: true,
    },
  ];

  return (
    <div
      className={`relative rounded-2xl border bg-white dark:bg-[#121319] transition-all flex flex-col group ${
        isActive
          ? "border-[#713CF4] ring-2 ring-[#713CF4]/30 shadow-sm"
          : "border-zinc-200/80 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xs"
      }`}
    >
      {/* ── 1. THUMBNAIL / PREVIEW AREA ── */}
      <div
        onClick={onSelect}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect();
          }
        }}
        aria-label={`Select ${item.title || item.prompt}`}
        className={`relative aspect-[16/10] rounded-t-2xl overflow-hidden bg-gradient-to-br ${item.colorGrad} cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#713CF4]`}
      >
        {/* Radial dot grid overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#713cf4_1px,transparent_1px)] [background-size:16px_16px] opacity-25 pointer-events-none" />

        {/* Video scanline overlay */}
        {item.type === "video" && (
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.18)_50%)] bg-[length:100%_4px] pointer-events-none opacity-25" />
        )}

        {/* Center preview icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="size-11 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg group-hover:scale-105 group-hover:bg-[#713CF4] transition-all duration-200">
            {item.type === "video" ? (
              <Play className="size-4.5 ml-0.5" />
            ) : (
              <Layers className="size-5" />
            )}
          </div>
        </div>

        {/* Top bar over thumbnail */}
        <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between z-10">
          {/* Badge (Camera motion or Art style) */}
          <span className="text-[10px] font-semibold text-white/90 bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/15 flex items-center gap-1 shadow-xs">
            {item.badgeIcon}
            <span>{item.badge}</span>
          </span>

          {/* Action icons: Favorite Star & Three-dot menu trigger */}
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            {item.isFavorite && (
              <div
                className="size-6 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-amber-400 border border-white/15 shadow-xs"
                title="Favorited creation"
              >
                <Star className="size-3 fill-amber-400" />
              </div>
            )}

            <button
              ref={triggerRef}
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={`More actions for ${item.title || item.prompt}`}
              aria-haspopup="menu"
              aria-expanded={isMenuOpen}
              className="size-7 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/70 flex items-center justify-center text-white/80 hover:text-white border border-white/15 transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4]"
            >
              <MoreHorizontal className="size-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom bar over thumbnail */}
        <div className="absolute bottom-2 inset-x-2.5 flex items-center justify-between text-[9.5px] z-10 pointer-events-none">
          {/* Aspect Ratio pill */}
          <span className="text-white/70 font-mono bg-black/40 backdrop-blur-sm px-1.5 py-0.5 rounded border border-white/10">
            {item.ratio}
          </span>

          {/* Duration or Batch Variant pill */}
          {item.type === "video" && item.duration ? (
            <span className="text-white/80 font-mono bg-black/40 backdrop-blur-sm px-1.5 py-0.5 rounded border border-white/10 flex items-center gap-1">
              <Film className="size-2.5" />
              {item.duration}
            </span>
          ) : item.batchTotal && item.batchTotal > 1 ? (
            <span className="text-white/80 font-mono bg-black/40 backdrop-blur-sm px-1.5 py-0.5 rounded border border-white/10">
              #{(item.batchIndex ?? 0) + 1} of {item.batchTotal}
            </span>
          ) : null}
        </div>
      </div>

      {/* ── 2. METADATA & DETAILS AREA ── */}
      <div
        onClick={onSelect}
        className="p-3.5 space-y-1.5 bg-white dark:bg-[#121319] rounded-b-2xl border-t border-zinc-100 dark:border-zinc-800/80 cursor-pointer flex-1 flex flex-col justify-between"
      >
        <div className="space-y-1">
          {/* Title or Inline Rename input */}
          {isRenaming ? (
            <input
              type="text"
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
              onBlur={handleCommitRename}
              onKeyDown={handleKeyDownRename}
              autoFocus
              onClick={(e) => e.stopPropagation()}
              className="w-full text-xs font-semibold px-2 py-1 rounded-lg border border-[#713CF4] bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-[#713CF4]/30"
            />
          ) : (
            <div className="flex items-center gap-1.5">
              <h4 className="text-[12.5px] font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-1 group-hover:text-[#713CF4] transition-colors">
                {item.title || item.prompt}
              </h4>
              {isActive && (
                <span className="size-1.5 rounded-full bg-[#713CF4] shrink-0" />
              )}
            </div>
          )}

          {/* Prompt snippet */}
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
            {item.prompt}
          </p>
        </div>

        {/* Footer row */}
        <div className="flex items-center justify-between text-[10px] text-zinc-400 dark:text-zinc-500 pt-1.5 border-t border-zinc-100 dark:border-zinc-850">
          <span className="truncate max-w-[120px]">{item.model}</span>
          <span className="font-mono shrink-0">{item.timestamp}</span>
        </div>
      </div>

      {/* ── 3. PORTAL-BASED ACTION MENU (NEVER CLIPPED) ── */}
      <CreationActionsMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        triggerRef={triggerRef}
        actions={actions}
      />
    </div>
  );
}
