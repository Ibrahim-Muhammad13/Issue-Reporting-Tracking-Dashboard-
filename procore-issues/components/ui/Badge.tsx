import { IssuePriority, IssueStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<IssueStatus, string> = {
  Open: "bg-warning-bg text-warning-DEFAULT border-warning-border",
  "In Progress": "bg-info-bg text-info-DEFAULT border-info-border",
  Resolved: "bg-success-bg text-success-DEFAULT border-success-border",
  Blocked: "bg-danger-bg text-danger-DEFAULT border-danger-border",
};

const STATUS_DOT: Record<IssueStatus, string> = {
  Open: "bg-[#B45309]",
  "In Progress": "bg-[#1D4ED8]",
  Resolved: "bg-[#15803D]",
  Blocked: "bg-[#B91C1C]",
};

export function StatusBadge({ status, className }: { status: IssueStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium whitespace-nowrap",
        STATUS_STYLES[status],
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", STATUS_DOT[status])} />
      {status}
    </span>
  );
}

const PRIORITY_STYLES: Record<IssuePriority, string> = {
  High: "text-danger-DEFAULT",
  Medium: "text-warning-DEFAULT",
  Low: "text-success-DEFAULT",
};

const PRIORITY_DOT: Record<IssuePriority, string> = {
  High: "bg-[#B91C1C]",
  Medium: "bg-[#B45309]",
  Low: "bg-[#15803D]",
};

export function PriorityBadge({ priority, className }: { priority: IssuePriority; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-xs font-medium whitespace-nowrap", PRIORITY_STYLES[priority], className)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", PRIORITY_DOT[priority])} />
      {priority}
    </span>
  );
}
