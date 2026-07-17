"use client";

import {
  BarChart3,
  FolderKanban,
  LayoutGrid,
  ListChecks,
  Settings,
  Users,
  X,
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

export function Sidebar({
  isOpen = false,
  onClose,
}: {
  isOpen?: boolean;
  onClose?: () => void;
}) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-ink/30 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 max-w-[85vw] flex-col border-r border-border bg-white shadow-panel transition-transform duration-200 lg:static lg:z-auto lg:w-56 lg:max-w-none lg:shrink-0 lg:translate-x-0 lg:shadow-none",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-3 py-3 lg:hidden">
          <span className="text-sm font-semibold text-ink">Navigation</span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-ink-secondary hover:bg-surface hover:text-ink"
            aria-label="Close navigation menu"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

      <nav className="flex flex-col gap-0.5 p-3">
        {NAV_ITEMS.map((item) => {
          const isActive = item.label === "Issues";
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              type="button"
              aria-current={isActive ? "page" : undefined}
              onClick={onClose}
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
    </>
  );
}
