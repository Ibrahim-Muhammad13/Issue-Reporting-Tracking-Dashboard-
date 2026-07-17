import { FolderSearch, SearchX } from "lucide-react";

export function NoResultsState({ onReset }: { onReset: () => void }) {
  return (
    <tr>
      <td colSpan={10}>
        <div className="flex flex-col items-center justify-center gap-2 py-16">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-surface">
            <SearchX className="h-5 w-5 text-ink-faint" />
          </span>
          <p className="text-sm font-medium text-ink">No issues match your filters</p>
          <p className="max-w-xs text-center text-sm text-ink-secondary">
            Try adjusting or clearing your filters to see more results.
          </p>
          <button
            onClick={onReset}
            className="mt-1 rounded-md border border-border px-3 py-1.5 text-sm font-medium text-ink-secondary hover:border-border-strong hover:text-ink"
          >
            Reset Filters
          </button>
        </div>
      </td>
    </tr>
  );
}

export function EmptyIssuesState() {
  return (
    <tr>
      <td colSpan={10}>
        <div className="flex flex-col items-center justify-center gap-2 py-16">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-surface">
            <FolderSearch className="h-5 w-5 text-ink-faint" />
          </span>
          <p className="text-sm font-medium text-ink">No issues reported yet</p>
          <p className="max-w-xs text-center text-sm text-ink-secondary">
            Issues reported by site engineers will appear here for tracking and resolution.
          </p>
        </div>
      </td>
    </tr>
  );
}
