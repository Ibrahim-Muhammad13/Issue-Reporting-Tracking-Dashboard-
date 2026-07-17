"use client";

import { RotateCcw, Search } from "lucide-react";
import { Select } from "@/components/ui/Select";
import { ASSIGNEES, SITES, TRADES } from "@/lib/data";
import { FilterState } from "@/lib/types";

const withAll = (items: readonly string[]) => [
  { value: "All", label: "All" },
  ...items.map((i) => ({ value: i, label: i })),
];

export function FilterToolbar({
  filters,
  onChange,
  onReset,
  locations,
  resultCount,
}: {
  filters: FilterState;
  onChange: (patch: Partial<FilterState>) => void;
  onReset: () => void;
  locations: string[];
  resultCount: number;
}) {
  const isDirty =
    filters.search !== "" ||
    filters.status !== "All" ||
    filters.priority !== "All" ||
    filters.site !== "All" ||
    filters.location !== "All" ||
    filters.trade !== "All" ||
    filters.assignee !== "All" ||
    filters.sortBy !== "newest";

  return (
    <div className="rounded-lg border border-border bg-white p-3 shadow-card sm:p-3.5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 2xl:flex 2xl:flex-wrap 2xl:items-end">
        <div className="min-w-0 sm:col-span-2 xl:col-span-1 2xl:min-w-[220px] 2xl:flex-1">
          <label className="mb-1 block text-xs font-medium text-ink-secondary">Search Issues</label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
            <input
              value={filters.search}
              onChange={(e) => onChange({ search: e.target.value })}
              placeholder="Search by title, ID, or location…"
              className="h-9 w-full rounded-md border border-border bg-white pl-8 pr-3 text-sm text-ink placeholder:text-ink-faint focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        <Select
          label="Status"
          value={filters.status}
          onChange={(v) => onChange({ status: v })}
          options={withAll(["Open", "In Progress", "Resolved", "Blocked"])}
          className="w-full sm:w-auto sm:min-w-[9rem]"
        />
        <Select
          label="Priority"
          value={filters.priority}
          onChange={(v) => onChange({ priority: v })}
          options={withAll(["High", "Medium", "Low"])}
          className="w-full sm:w-auto sm:min-w-[8rem]"
        />
        <Select
          label="Site"
          value={filters.site}
          onChange={(v) => onChange({ site: v })}
          options={withAll(SITES)}
          className="w-full sm:w-auto sm:min-w-[12rem]"
        />
        <Select
          label="Location"
          value={filters.location}
          onChange={(v) => onChange({ location: v })}
          options={withAll(locations)}
          className="w-full sm:w-auto sm:min-w-[11rem]"
        />
        <Select
          label="Trade"
          value={filters.trade}
          onChange={(v) => onChange({ trade: v })}
          options={withAll(TRADES)}
          className="w-full sm:w-auto sm:min-w-[9rem]"
        />
        <Select
          label="Assignee"
          value={filters.assignee}
          onChange={(v) => onChange({ assignee: v })}
          options={withAll(ASSIGNEES)}
          className="w-full sm:w-auto sm:min-w-[11rem]"
        />
        <Select
          label="Date Range"
          value="All time"
          onChange={() => {}}
          options={[
            { value: "All time", label: "All time" },
            { value: "Last 7 days", label: "Last 7 days" },
            { value: "Last 30 days", label: "Last 30 days" },
          ]}
          className="w-full sm:w-auto sm:min-w-[9rem]"
        />
        <Select
          label="Sort By"
          value={filters.sortBy}
          onChange={(v) => onChange({ sortBy: v as FilterState["sortBy"] })}
          options={[
            { value: "newest", label: "Newest" },
            { value: "oldest", label: "Oldest" },
            { value: "priority", label: "Priority" },
            { value: "updated", label: "Recently Updated" },
          ]}
          className="w-full sm:w-auto sm:min-w-[10rem]"
        />

        <button
          onClick={onReset}
          disabled={!isDirty}
          className="flex h-9 w-full items-center justify-center gap-1.5 rounded-md border border-border px-3 text-sm font-medium text-ink-secondary hover:border-border-strong hover:text-ink disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto sm:justify-start 2xl:self-end"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset Filters
        </button>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-border pt-2.5">
        <p className="text-xs text-ink-secondary">
          <span className="font-semibold text-ink">{resultCount}</span> issue{resultCount === 1 ? "" : "s"} match your filters
        </p>
      </div>
    </div>
  );
}
