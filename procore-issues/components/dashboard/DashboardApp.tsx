"use client";

import { useEffect, useMemo, useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { FilterToolbar } from "@/components/dashboard/FilterToolbar";
import { IssuesTable } from "@/components/issues/IssuesTable";
import { IssueDrawer } from "@/components/issues/IssueDrawer";
import { ToastMessage, ToastStack } from "@/components/ui/Toast";
import { getKpis, ISSUES } from "@/lib/data";
import { FilterState, Issue, IssuePriority, IssueStatus } from "@/lib/types";

const INITIAL_FILTERS: FilterState = {
  search: "",
  status: "All",
  priority: "All",
  site: "All",
  location: "All",
  trade: "All",
  assignee: "All",
  sortBy: "newest",
};

let toastCounter = 0;
const NOW = "2026-07-17T16:00:00Z";

export function DashboardApp() {
  const [issues, setIssues] = useState<Issue[]>(ISSUES);
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 650);
    return () => clearTimeout(timer);
  }, []);

  function pushToast(message: string) {
    toastCounter += 1;
    setToasts((prev) => [...prev, { id: toastCounter, message }]);
  }

  function dismissToast(id: number) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  const locations = useMemo(
    () => Array.from(new Set(issues.map((i) => i.location))).sort(),
    [issues]
  );

  const filteredIssues = useMemo(() => {
    let result = issues.filter((issue) => {
      const search = filters.search.trim().toLowerCase();
      if (
        search &&
        !issue.title.toLowerCase().includes(search) &&
        !issue.id.toLowerCase().includes(search) &&
        !issue.location.toLowerCase().includes(search)
      ) {
        return false;
      }
      if (filters.status !== "All" && issue.status !== filters.status) return false;
      if (filters.priority !== "All" && issue.priority !== filters.priority) return false;
      if (filters.site !== "All" && issue.site !== filters.site) return false;
      if (filters.location !== "All" && issue.location !== filters.location) return false;
      if (filters.trade !== "All" && issue.trade !== filters.trade) return false;
      if (filters.assignee !== "All" && issue.assignee !== filters.assignee) return false;
      return true;
    });

    const priorityRank: Record<IssuePriority, number> = { High: 0, Medium: 1, Low: 2 };

    result = [...result].sort((a, b) => {
      switch (filters.sortBy) {
        case "oldest":
          return new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime();
        case "priority":
          return priorityRank[a.priority] - priorityRank[b.priority];
        case "updated":
          return new Date(b.updatedDate).getTime() - new Date(a.updatedDate).getTime();
        case "newest":
        default:
          return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
      }
    });

    return result;
  }, [issues, filters]);

  const kpis = useMemo(() => getKpis(issues), [issues]);
  const selectedIssue = issues.find((i) => i.id === selectedIssueId) ?? null;

  function handleFilterChange(patch: Partial<FilterState>) {
    setFilters((prev) => ({ ...prev, ...patch }));
  }

  function handleResetFilters() {
    setFilters(INITIAL_FILTERS);
  }

  function handleUpdateIssue(
    issueId: string,
    patch: { status: IssueStatus; priority: IssuePriority; assignee: string }
  ) {
    setIssues((prev) =>
      prev.map((issue) => {
        if (issue.id !== issueId) return issue;

        const newActivity = [...issue.activity];
        let idx = newActivity.length + 1;

        if (patch.status !== issue.status) {
          newActivity.push({
            id: `${issueId}-act-${idx++}`,
            type: patch.status === "Resolved" ? "resolved" : "status_changed",
            label:
              patch.status === "Resolved"
                ? "Marked as Resolved"
                : `Status changed to ${patch.status}`,
            actor: "Jordan Blake",
            timestamp: NOW,
          });
        }
        if (patch.priority !== issue.priority) {
          newActivity.push({
            id: `${issueId}-act-${idx++}`,
            type: "priority_changed",
            label: `Priority changed to ${patch.priority}`,
            actor: "Jordan Blake",
            timestamp: NOW,
          });
        }
        if (patch.assignee !== issue.assignee) {
          newActivity.push({
            id: `${issueId}-act-${idx++}`,
            type: "assigned",
            label: `Reassigned to ${patch.assignee}`,
            actor: "Jordan Blake",
            timestamp: NOW,
          });
        }

        return {
          ...issue,
          status: patch.status,
          priority: patch.priority,
          assignee: patch.assignee,
          overdue: patch.status === "Resolved" ? false : issue.overdue,
          updatedDate: NOW,
          activity: newActivity,
        };
      })
    );
    pushToast(`${issueId} updated successfully.`);
  }

  function handleAddComment(issueId: string, message: string) {
    setIssues((prev) =>
      prev.map((issue) => {
        if (issue.id !== issueId) return issue;
        const commentId = `${issueId}-cmt-${issue.comments.length + 1}`;
        const activityId = `${issueId}-act-${issue.activity.length + 1}`;
        return {
          ...issue,
          updatedDate: NOW,
          comments: [
            ...issue.comments,
            {
              id: commentId,
              author: "Jordan Blake",
              role: "Construction Manager",
              message,
              timestamp: NOW,
            },
          ],
          activity: [
            ...issue.activity,
            {
              id: activityId,
              type: "comment",
              label: "Comment added",
              actor: "Jordan Blake",
              timestamp: NOW,
            },
          ],
        };
      })
    );
    pushToast("Comment posted successfully.");
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-surface">
      <TopNav searchValue={filters.search} onSearchChange={(v) => handleFilterChange({ search: v })} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-5 px-6 py-6">
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-ink">
                Issue Reporting &amp; Tracking Dashboard
              </h1>
              <p className="mt-1 text-sm text-ink-secondary">
                Monitor, prioritize and resolve construction issues across all active sites.
              </p>
            </div>

            <SummaryCards
              open={kpis.open}
              inProgress={kpis.inProgress}
              resolved={kpis.resolved}
              highPriority={kpis.highPriority}
              overdue={kpis.overdue}
            />

            <FilterToolbar
              filters={filters}
              onChange={handleFilterChange}
              onReset={handleResetFilters}
              locations={locations}
              resultCount={filteredIssues.length}
            />

            <IssuesTable
              issues={filteredIssues}
              allIssuesCount={issues.length}
              isLoading={isLoading}
              onSelect={(issue) => setSelectedIssueId(issue.id)}
              onResetFilters={handleResetFilters}
            />
          </div>
        </main>
      </div>

      {selectedIssue && (
        <IssueDrawer
          issue={selectedIssue}
          onClose={() => setSelectedIssueId(null)}
          onUpdate={handleUpdateIssue}
          onAddComment={handleAddComment}
        />
      )}

      <ToastStack toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
