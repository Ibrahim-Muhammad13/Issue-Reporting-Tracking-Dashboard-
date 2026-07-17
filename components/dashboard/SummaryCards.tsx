import { AlertTriangle, CheckCircle2, Clock, FolderOpen, TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface Kpi {
  label: string;
  value: number;
  trend: { direction: "up" | "down"; value: string; positive: boolean };
  icon: React.ElementType;
  accent: string;
  iconBg: string;
}

export function SummaryCards({
  open,
  inProgress,
  resolved,
  highPriority,
  overdue,
}: {
  open: number;
  inProgress: number;
  resolved: number;
  highPriority: number;
  overdue: number;
}) {
  const kpis: Kpi[] = [
    {
      label: "Open Issues",
      value: open,
      trend: { direction: "up", value: "+3 this week", positive: false },
      icon: FolderOpen,
      accent: "text-warning-DEFAULT",
      iconBg: "bg-warning-bg",
    },
    {
      label: "In Progress",
      value: inProgress,
      trend: { direction: "up", value: "+2 this week", positive: true },
      icon: Clock,
      accent: "text-info-DEFAULT",
      iconBg: "bg-info-bg",
    },
    {
      label: "Resolved",
      value: resolved,
      trend: { direction: "up", value: "+5 this week", positive: true },
      icon: CheckCircle2,
      accent: "text-success-DEFAULT",
      iconBg: "bg-success-bg",
    },
    {
      label: "High Priority",
      value: highPriority,
      trend: { direction: "down", value: "-1 this week", positive: true },
      icon: AlertTriangle,
      accent: "text-danger-DEFAULT",
      iconBg: "bg-danger-bg",
    },
    {
      label: "Overdue",
      value: overdue,
      trend: { direction: "up", value: "+2 this week", positive: false },
      icon: AlertTriangle,
      accent: "text-primary",
      iconBg: "bg-primary-light",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
      {kpis.map((kpi) => (
        <div
          key={kpi.label}
          className="rounded-lg border border-border bg-white p-4 shadow-card"
        >
          <div className="flex items-center justify-between">
            <span className={cn("flex h-8 w-8 items-center justify-center rounded-md", kpi.iconBg)}>
              <kpi.icon className={cn("h-4.5 w-4.5", kpi.accent)} strokeWidth={2.25} />
            </span>
            <span
              className={cn(
                "flex items-center gap-0.5 text-xs font-medium",
                kpi.trend.positive ? "text-success-DEFAULT" : "text-danger-DEFAULT"
              )}
            >
              {kpi.trend.direction === "up" ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
            </span>
          </div>
          <p className="mt-3 text-2xl font-semibold tabular text-ink">{kpi.value}</p>
          <p className="mt-0.5 text-sm text-ink-secondary">{kpi.label}</p>
          <p
            className={cn(
              "mt-2 text-xs font-medium",
              kpi.trend.positive ? "text-success-DEFAULT" : "text-ink-faint"
            )}
          >
            {kpi.trend.value}
          </p>
        </div>
      ))}
    </div>
  );
}
