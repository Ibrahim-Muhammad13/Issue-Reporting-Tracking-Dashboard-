"use client";

import { Save } from "lucide-react";
import { Select } from "@/components/ui/Select";
import { ASSIGNEES } from "@/lib/data";
import { IssuePriority, IssueStatus } from "@/lib/types";

export function UpdatePanel({
  status,
  priority,
  assignee,
  onStatusChange,
  onPriorityChange,
  onAssigneeChange,
  onSave,
  isDirty,
}: {
  status: IssueStatus;
  priority: IssuePriority;
  assignee: string;
  onStatusChange: (v: IssueStatus) => void;
  onPriorityChange: (v: IssuePriority) => void;
  onAssigneeChange: (v: string) => void;
  onSave: () => void;
  isDirty: boolean;
}) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-secondary">
        Update Issue
      </p>
      <div className="grid grid-cols-2 gap-3">
        <Select
          label="Status"
          value={status}
          onChange={(v) => onStatusChange(v as IssueStatus)}
          options={[
            { value: "Open", label: "Open" },
            { value: "In Progress", label: "In Progress" },
            { value: "Resolved", label: "Resolved" },
            { value: "Blocked", label: "Blocked" },
          ]}
        />
        <Select
          label="Priority"
          value={priority}
          onChange={(v) => onPriorityChange(v as IssuePriority)}
          options={[
            { value: "High", label: "High" },
            { value: "Medium", label: "Medium" },
            { value: "Low", label: "Low" },
          ]}
        />
        <Select
          label="Assign Engineer"
          value={assignee}
          onChange={onAssigneeChange}
          options={ASSIGNEES.map((a) => ({ value: a, label: a }))}
          className="col-span-2"
        />
      </div>
      <button
        onClick={onSave}
        disabled={!isDirty}
        className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Save className="h-4 w-4" />
        Save Changes
      </button>
    </div>
  );
}
