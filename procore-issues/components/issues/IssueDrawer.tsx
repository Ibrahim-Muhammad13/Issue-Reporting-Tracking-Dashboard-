"use client";

import { Image as ImageIcon, FileText, MapPin, X } from "lucide-react";
import { useEffect, useState } from "react";
import { PriorityBadge, StatusBadge } from "@/components/ui/Badge";
import { ActivityTimeline } from "@/components/issues/ActivityTimeline";
import { CommentsSection } from "@/components/issues/CommentsSection";
import { UpdatePanel } from "@/components/issues/UpdatePanel";
import { Issue, IssuePriority, IssueStatus } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function IssueDrawer({
  issue,
  onClose,
  onUpdate,
  onAddComment,
}: {
  issue: Issue;
  onClose: () => void;
  onUpdate: (issueId: string, patch: { status: IssueStatus; priority: IssuePriority; assignee: string }) => void;
  onAddComment: (issueId: string, message: string) => void;
}) {
  const [status, setStatus] = useState<IssueStatus>(issue.status);
  const [priority, setPriority] = useState<IssuePriority>(issue.priority);
  const [assignee, setAssignee] = useState(issue.assignee);

  useEffect(() => {
    setStatus(issue.status);
    setPriority(issue.priority);
    setAssignee(issue.assignee);
  }, [issue.id, issue.status, issue.priority, issue.assignee]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const isDirty = status !== issue.status || priority !== issue.priority || assignee !== issue.assignee;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 animate-fade-in bg-ink/30"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Issue details for ${issue.id}`}
        className="relative flex h-full w-full max-w-[520px] animate-slide-in flex-col bg-white shadow-drawer"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
          <div className="min-w-0">
            <p className="text-xs font-medium text-ink-secondary">{issue.id}</p>
            <h2 className="mt-0.5 text-lg font-semibold leading-snug text-ink">{issue.title}</h2>
            <div className="mt-2 flex items-center gap-3">
              <StatusBadge status={status} />
              <PriorityBadge priority={priority} />
            </div>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 rounded-md p-1.5 text-ink-secondary hover:bg-surface hover:text-ink"
            aria-label="Close issue details"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          <section>
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-ink-secondary">
              Description
            </p>
            <p className="text-sm leading-relaxed text-ink">{issue.description}</p>
          </section>

          <section className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 rounded-lg border border-border bg-surface p-4">
            <Field label="Construction Site" value={issue.site} icon={MapPin} />
            <Field label="Exact Location" value={issue.location} />
            <Field label="Trade" value={issue.trade} />
            <Field label="Reporter" value={issue.reporter} />
            <Field label="Assigned Engineer" value={assignee} />
            <Field label="Created" value={formatDate(issue.createdDate)} />
            <Field label="Last Updated" value={formatDate(issue.updatedDate)} />
            <Field label="Due Date" value={formatDate(issue.dueDate)} />
          </section>

          <section className="mt-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-secondary">
              Attachments
            </p>
            {issue.attachments.length === 0 ? (
              <p className="text-sm text-ink-secondary">No attachments uploaded for this issue.</p>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {issue.attachments.map((a) => (
                  <div
                    key={a.id}
                    className="flex aspect-square flex-col items-center justify-center gap-1.5 rounded-md border border-dashed border-border-strong bg-surface"
                  >
                    {a.kind === "photo" ? (
                      <ImageIcon className="h-5 w-5 text-ink-faint" />
                    ) : (
                      <FileText className="h-5 w-5 text-ink-faint" />
                    )}
                    <span className="max-w-[90%] truncate text-[10px] text-ink-secondary">{a.name}</span>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="mt-6 border-t border-border pt-5">
            <UpdatePanel
              status={status}
              priority={priority}
              assignee={assignee}
              onStatusChange={setStatus}
              onPriorityChange={setPriority}
              onAssigneeChange={setAssignee}
              isDirty={isDirty}
              onSave={() => onUpdate(issue.id, { status, priority, assignee })}
            />
          </section>

          <section className="mt-6 border-t border-border pt-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-secondary">
              Activity Timeline
            </p>
            <ActivityTimeline entries={issue.activity} />
          </section>

          <section className="mt-6 border-t border-border pt-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-secondary">
              Comments
            </p>
            <CommentsSection
              comments={issue.comments}
              onPostComment={(message) => onAddComment(issue.id, message)}
            />
          </section>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon?: React.ElementType;
}) {
  return (
    <div>
      <p className="text-xs text-ink-secondary">{label}</p>
      <p className="mt-0.5 flex items-center gap-1 text-sm font-medium text-ink">
        {Icon && <Icon className="h-3.5 w-3.5 text-ink-faint" />}
        {value}
      </p>
    </div>
  );
}
