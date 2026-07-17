# Issue Reporting & Tracking Dashboard — Procore Prototype

A high-fidelity frontend prototype for a construction issue tracking dashboard, built for a Product Manager internship assignment. Next.js 15 · React 19 · TypeScript · Tailwind CSS. Mock data only — no backend, no auth, no external services.

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Production build:

```bash
npm run build
npm run start
```

Deploys to Vercel with no additional configuration.

## Problem → design decision

| Problem | Solution in this prototype |
|---|---|
| Can't distinguish Open vs Resolved issues | Color-coded status badges (Open/In Progress/Resolved/Blocked) used consistently in the table, drawer header, and KPI cards |
| Can't filter, search, or prioritize efficiently | Full filter toolbar (search, status, priority, site, location, trade, assignee, date range, sort) plus a dedicated High Priority and Overdue KPI |
| Managers lack visibility across sites/teams | Summary KPI cards for portfolio health, a Site column and filter, and an activity timeline per issue for full audit trail |

## Structure

```
app/                  App Router entry (layout, page, global styles)
components/layout/    Top nav, sidebar
components/dashboard/ KPI cards, filter toolbar, dashboard shell
components/issues/    Issues table, detail drawer, activity timeline, comments, update panel
components/ui/        Badges, avatar, select, toast, empty/loading states
lib/                  Types, mock data (20 issues), utilities
```

## Interactions included

Clickable rows open a right-side issue drawer · status/priority/assignee update with a Save Changes action · comment posting · live filtering and sorting · loading skeleton on first load · empty and no-results states · success toast notifications · full keyboard focus states (Tab, Enter, Esc to close the drawer).
