"use client";

import { ChevronRight, MessageSquare } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { PriorityBadge, StatusBadge } from "@/components/ui/Badge";
import { EmptyIssuesState, NoResultsState } from "@/components/ui/EmptyState";
import { TableSkeleton } from "@/components/ui/TableSkeleton";
import { Issue } from "@/lib/types";
import { formatDate, timeAgo } from "@/lib/utils";

const COLUMNS = [
  "Issue ID",
  "Issue Title",
  "Status",
  "Priority",
  "Site",
  "Location",
  "Assigned To",
  "Created",
  "Last Updated",
  "Comments",
];

function IssueCard({ issue, onSelect }: { issue: Issue; onSelect: (issue: Issue) => void }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(issue)}
      className="w-full rounded-lg border border-border bg-white p-4 text-left shadow-card transition-colors hover:bg-surface focus:bg-primary-light focus:outline-none"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-ink-secondary">{issue.id}</p>
          <p className="mt-1 text-sm font-semibold leading-snug text-ink">{issue.title}</p>
          <p className="mt-0.5 text-xs text-ink-secondary">{issue.trade}</p>
        </div>
        <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-ink-faint" />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <StatusBadge status={issue.status} />
        <PriorityBadge priority={issue.priority} />
        {issue.overdue && (
          <span className="rounded border border-danger-border bg-danger-bg px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-danger-DEFAULT">
            Overdue
          </span>
        )}
      </div>

      <div className="mt-3 space-y-2 text-sm">
        <div className="flex items-start justify-between gap-3">
          <span className="shrink-0 text-ink-secondary">Site</span>
          <span className="min-w-0 text-right text-ink">{issue.site}</span>
        </div>
        <div className="flex items-start justify-between gap-3">
          <span className="shrink-0 text-ink-secondary">Location</span>
          <span className="min-w-0 text-right text-ink-secondary">{issue.location}</span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-ink-secondary">Assigned</span>
          <span className="flex min-w-0 items-center gap-2">
            <Avatar name={issue.assignee} />
            <span className="truncate text-ink">{issue.assignee}</span>
          </span>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3 text-xs text-ink-secondary">
        <span>Updated {timeAgo(issue.updatedDate)}</span>
        <span className="flex items-center gap-1">
          <MessageSquare className="h-3.5 w-3.5" />
          {issue.comments.length} comment{issue.comments.length === 1 ? "" : "s"}
        </span>
      </div>
    </button>
  );
}

export function IssuesTable({
  issues,
  allIssuesCount,
  isLoading,
  onSelect,
  onResetFilters,
}: {
  issues: Issue[];
  allIssuesCount: number;
  isLoading: boolean;
  onSelect: (issue: Issue) => void;
  onResetFilters: () => void;
}) {
  const emptyState =
    !isLoading && issues.length === 0 ? (
      allIssuesCount === 0 ? (
        <EmptyIssuesState />
      ) : (
        <NoResultsState onReset={onResetFilters} />
      )
    ) : null;

  return (
    <>
      <div className="space-y-3 lg:hidden">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="rounded-lg border border-border bg-white p-4 shadow-card">
              <div className="skeleton h-3 w-16" />
              <div className="skeleton mt-2 h-4 w-3/4" />
              <div className="skeleton mt-2 h-3 w-1/2" />
              <div className="mt-3 flex gap-2">
                <div className="skeleton h-5 w-20 rounded-md" />
                <div className="skeleton h-5 w-16 rounded-md" />
              </div>
            </div>
          ))
        ) : emptyState ? (
          <div className="overflow-hidden rounded-lg border border-border bg-white shadow-card">{emptyState}</div>
        ) : (
          issues.map((issue) => <IssueCard key={issue.id} issue={issue} onSelect={onSelect} />)
        )}
      </div>

      <div className="hidden overflow-hidden rounded-lg border border-border bg-white shadow-card lg:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border bg-surface">
                {COLUMNS.map((col) => (
                  <th
                    key={col}
                    className="whitespace-nowrap px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-ink-secondary"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <TableSkeleton rows={9} />
              ) : emptyState ? (
                emptyState
              ) : (
                issues.map((issue) => (
                  <tr
                    key={issue.id}
                    tabIndex={0}
                    onClick={() => onSelect(issue)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") onSelect(issue);
                    }}
                    className="cursor-pointer border-b border-border last:border-b-0 hover:bg-surface focus:bg-primary-light focus:outline-none"
                  >
                    <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-ink-secondary tabular">
                      {issue.id}
                    </td>
                    <td className="max-w-[280px] px-4 py-3">
                      <p className="truncate text-sm font-medium text-ink">{issue.title}</p>
                      <p className="mt-0.5 truncate text-xs text-ink-secondary">{issue.trade}</p>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <StatusBadge status={issue.status} />
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <PriorityBadge priority={issue.priority} />
                        {issue.overdue && (
                          <span className="rounded border border-danger-border bg-danger-bg px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-danger-DEFAULT">
                            Overdue
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="max-w-[160px] truncate px-4 py-3 text-sm text-ink">{issue.site}</td>
                    <td className="max-w-[160px] truncate px-4 py-3 text-sm text-ink-secondary">
                      {issue.location}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar name={issue.assignee} />
                        <span className="text-sm text-ink">{issue.assignee}</span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-ink-secondary">
                      {formatDate(issue.createdDate)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-ink-secondary">
                      {timeAgo(issue.updatedDate)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <span className="flex items-center gap-1 text-sm text-ink-secondary">
                        <MessageSquare className="h-3.5 w-3.5" />
                        {issue.comments.length}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
