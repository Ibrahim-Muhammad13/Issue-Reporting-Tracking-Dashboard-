"use client";

import { MessageSquare } from "lucide-react";
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
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-white shadow-card">
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
            ) : issues.length === 0 && allIssuesCount === 0 ? (
              <EmptyIssuesState />
            ) : issues.length === 0 ? (
              <NoResultsState onReset={onResetFilters} />
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
  );
}
