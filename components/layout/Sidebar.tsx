"use client";

import {
  LayoutGrid,
  FolderKanban,
  ListChecks,
  BarChart3,
  Users,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutGrid },
  { label: "Projects", icon: FolderKanban },
  { label: "Issues", icon: ListChecks },
  { label: "Reports", icon: BarChart3 },
  { label: "Teams", icon: Users },
  { label: "Settings", icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-border bg-white">
      <nav className="flex flex-col gap-0.5 p-3">
        {NAV_ITEMS.map((item) => {
          const isActive = item.label === "Issues";
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              type="button"
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary-light text-primary"
                  : "text-ink-secondary hover:bg-surface hover:text-ink"
              )}
            >
              <Icon className="h-4.5 w-4.5" strokeWidth={2} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto p-3">
        <div className="rounded-md border border-border bg-surface p-3">
          <p className="text-xs font-semibold text-ink">Riverside Tower — Site A</p>
          <p className="mt-0.5 text-xs text-ink-secondary">Active project</p>
        </div>
      </div>
    </aside>
  );
}
