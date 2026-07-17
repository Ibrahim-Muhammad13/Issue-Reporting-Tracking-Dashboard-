import {
  CheckCircle2,
  ClipboardCheck,
  FilePlus2,
  MessageSquare,
  RefreshCcw,
  UserPlus,
} from "lucide-react";
import { ActivityEntry } from "@/lib/types";
import { cn, formatDateTime } from "@/lib/utils";

const ICONS: Record<ActivityEntry["type"], React.ElementType> = {
  created: FilePlus2,
  assigned: UserPlus,
  status_changed: RefreshCcw,
  priority_changed: RefreshCcw,
  comment: MessageSquare,
  inspection: ClipboardCheck,
  resolved: CheckCircle2,
};

const ICON_COLOR: Record<ActivityEntry["type"], string> = {
  created: "text-info-DEFAULT bg-info-bg",
  assigned: "text-primary bg-primary-light",
  status_changed: "text-ink-secondary bg-surface",
  priority_changed: "text-ink-secondary bg-surface",
  comment: "text-ink-secondary bg-surface",
  inspection: "text-warning-DEFAULT bg-warning-bg",
  resolved: "text-success-DEFAULT bg-success-bg",
};

export function ActivityTimeline({ entries }: { entries: ActivityEntry[] }) {
  if (entries.length === 0) {
    return <p className="text-sm text-ink-secondary">No activity recorded yet.</p>;
  }

  return (
    <ol className="relative">
      {entries.map((entry, idx) => {
        const Icon = ICONS[entry.type];
        const isLast = idx === entries.length - 1;
        return (
          <li key={entry.id} className="relative flex gap-3 pb-5 last:pb-0">
            {!isLast && (
              <span className="absolute left-[13px] top-7 h-[calc(100%-16px)] w-px bg-border" />
            )}
            <span
              className={cn(
                "z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                ICON_COLOR[entry.type]
              )}
            >
              <Icon className="h-3.5 w-3.5" strokeWidth={2.25} />
            </span>
            <div className="pt-0.5">
              <p className="text-sm text-ink">
                <span className="font-medium">{entry.label}</span>
              </p>
              <p className="mt-0.5 text-xs text-ink-secondary">
                {entry.actor} · {formatDateTime(entry.timestamp)}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
