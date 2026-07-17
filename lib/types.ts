export type IssueStatus = "Open" | "In Progress" | "Resolved" | "Blocked";
export type IssuePriority = "High" | "Medium" | "Low";

export interface Comment {
  id: string;
  author: string;
  role: string;
  message: string;
  timestamp: string; // ISO date string
}

export interface ActivityEntry {
  id: string;
  type:
    | "created"
    | "assigned"
    | "status_changed"
    | "priority_changed"
    | "comment"
    | "inspection"
    | "resolved";
  label: string;
  actor: string;
  timestamp: string; // ISO date string
}

export interface Attachment {
  id: string;
  name: string;
  kind: "photo" | "document";
}

export interface Issue {
  id: string; // e.g. ISS-0142
  title: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriority;
  site: string;
  location: string;
  trade: string;
  reporter: string;
  assignee: string;
  createdDate: string; // ISO date string
  updatedDate: string; // ISO date string
  dueDate: string; // ISO date string
  overdue: boolean;
  attachments: Attachment[];
  comments: Comment[];
  activity: ActivityEntry[];
}

export interface FilterState {
  search: string;
  status: string;
  priority: string;
  site: string;
  location: string;
  trade: string;
  assignee: string;
  sortBy: "newest" | "oldest" | "priority" | "updated";
}
