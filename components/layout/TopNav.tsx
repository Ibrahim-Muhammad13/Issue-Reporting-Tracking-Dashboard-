"use client";

import { Bell, HelpCircle, Search, HardHat } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";

export function TopNav({
  searchValue,
  onSearchChange,
}: {
  searchValue: string;
  onSearchChange: (v: string) => void;
}) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-4 border-b border-border bg-white px-4">
      <div className="flex w-56 shrink-0 items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-white">
          <HardHat className="h-4.5 w-4.5" strokeWidth={2.25} />
        </span>
        <span className="text-md font-semibold tracking-tight text-ink">Procore</span>
      </div>

      <div className="relative w-full max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search projects, issues, drawings…"
          className="h-9 w-full rounded-md border border-border bg-surface pl-9 pr-3 text-sm text-ink placeholder:text-ink-faint focus:border-primary focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div className="ml-auto flex items-center gap-1">
        <button
          className="relative flex h-9 w-9 items-center justify-center rounded-md text-ink-secondary hover:bg-surface hover:text-ink"
          aria-label="Notifications"
        >
          <Bell className="h-4.5 w-4.5" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary" />
        </button>
        <button
          className="flex h-9 w-9 items-center justify-center rounded-md text-ink-secondary hover:bg-surface hover:text-ink"
          aria-label="Help"
        >
          <HelpCircle className="h-4.5 w-4.5" />
        </button>
        <div className="ml-2 flex items-center gap-2 border-l border-border pl-3">
          <Avatar name="Jordan Blake" size="sm" />
          <div className="hidden leading-tight md:block">
            <p className="text-sm font-medium text-ink">Jordan Blake</p>
            <p className="text-xs text-ink-secondary">Construction Manager</p>
          </div>
        </div>
      </div>
    </header>
  );
}
