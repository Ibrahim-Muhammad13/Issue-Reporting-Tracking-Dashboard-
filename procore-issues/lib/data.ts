import { Issue } from "./types";

export const SITES = [
  "Riverside Tower — Site A",
  "Lakeside Business Park",
  "Grandview Medical Center",
  "Harbor Point Logistics Hub",
  "Maple Ridge Residences",
] as const;

export const TRADES = [
  "Concrete",
  "Electrical",
  "Plumbing",
  "HVAC",
  "Structural",
  "Safety",
  "Framing",
  "Roofing",
] as const;

export const ASSIGNEES = [
  "Ahmed Hassan",
  "Priya Nandakumar",
  "Marcus Webb",
  "Elena Torres",
  "Jonah Fitzgerald",
  "Grace Okafor",
  "Daniel Kim",
  "Sofia Marchetti",
] as const;

function mkActivity(
  issueId: string,
  entries: Array<{ type: Issue["activity"][number]["type"]; label: string; actor: string; timestamp: string }>
) {
  return entries.map((e, i) => ({ id: `${issueId}-act-${i + 1}`, ...e }));
}

function mkComments(
  issueId: string,
  entries: Array<{ author: string; role: string; message: string; timestamp: string }>
) {
  return entries.map((e, i) => ({ id: `${issueId}-cmt-${i + 1}`, ...e }));
}

export const ISSUES: Issue[] = [
  {
    id: "ISS-1042",
    title: "Concrete crack in parking structure column",
    description:
      "Vertical hairline crack observed on column B-12 in the lower parking structure, approximately 1.2m in length. Potential structural concern — requires engineer review before pour on level 3 continues.",
    status: "Open",
    priority: "High",
    site: SITES[0],
    location: "Level B1 · Column B-12",
    trade: "Concrete",
    reporter: "Marcus Webb",
    assignee: "Ahmed Hassan",
    createdDate: "2026-07-10T08:32:00Z",
    updatedDate: "2026-07-15T14:05:00Z",
    dueDate: "2026-07-18T17:00:00Z",
    overdue: false,
    attachments: [
      { id: "a1", name: "column-b12-crack-01.jpg", kind: "photo" },
      { id: "a2", name: "column-b12-crack-02.jpg", kind: "photo" },
    ],
    comments: mkComments("ISS-1042", [
      {
        author: "Marcus Webb",
        role: "Site Engineer",
        message: "Flagged during routine walk-through. Marked area with cones and tape until reviewed.",
        timestamp: "2026-07-10T08:40:00Z",
      },
      {
        author: "Ahmed Hassan",
        role: "Structural Engineer",
        message: "Scheduling a site visit tomorrow morning to assess load impact before we clear level 3 pour.",
        timestamp: "2026-07-15T14:05:00Z",
      },
    ]),
    activity: mkActivity("ISS-1042", [
      { type: "created", label: "Issue created", actor: "Marcus Webb", timestamp: "2026-07-10T08:32:00Z" },
      { type: "assigned", label: "Assigned to Ahmed Hassan", actor: "System", timestamp: "2026-07-10T09:10:00Z" },
      { type: "comment", label: "Comment added", actor: "Ahmed Hassan", timestamp: "2026-07-15T14:05:00Z" },
    ]),
  },
  {
    id: "ISS-1043",
    title: "Missing rebar in footing F-22",
    description:
      "Inspection revealed insufficient rebar spacing in footing F-22, non-compliant with structural drawings rev. C. Pour has been halted pending correction.",
    status: "Blocked",
    priority: "High",
    site: SITES[0],
    location: "Level B2 · Footing F-22",
    trade: "Structural",
    reporter: "Grace Okafor",
    assignee: "Daniel Kim",
    createdDate: "2026-07-08T11:15:00Z",
    updatedDate: "2026-07-14T09:20:00Z",
    dueDate: "2026-07-16T17:00:00Z",
    overdue: true,
    attachments: [{ id: "a3", name: "footing-f22-inspection.jpg", kind: "photo" }],
    comments: mkComments("ISS-1043", [
      {
        author: "Grace Okafor",
        role: "Quality Inspector",
        message: "Rebar spacing measured at 220mm against a specified 150mm. Photos attached for record.",
        timestamp: "2026-07-08T11:20:00Z",
      },
    ]),
    activity: mkActivity("ISS-1043", [
      { type: "created", label: "Issue created", actor: "Grace Okafor", timestamp: "2026-07-08T11:15:00Z" },
      { type: "status_changed", label: "Status changed to Blocked", actor: "Daniel Kim", timestamp: "2026-07-14T09:20:00Z" },
    ]),
  },
  {
    id: "ISS-1044",
    title: "Water leakage near east stairwell",
    description:
      "Active water intrusion noted near the east stairwell on level 4, likely from unsealed conduit penetration. Risk of damage to adjacent drywall if unresolved.",
    status: "In Progress",
    priority: "Medium",
    site: SITES[1],
    location: "Level 4 · East Stairwell",
    trade: "Plumbing",
    reporter: "Sofia Marchetti",
    assignee: "Elena Torres",
    createdDate: "2026-07-09T13:44:00Z",
    updatedDate: "2026-07-16T10:02:00Z",
    dueDate: "2026-07-19T17:00:00Z",
    overdue: false,
    attachments: [{ id: "a4", name: "east-stairwell-leak.jpg", kind: "photo" }],
    comments: mkComments("ISS-1044", [
      {
        author: "Elena Torres",
        role: "Plumbing Lead",
        message: "Traced source to a conduit penetration on the roof deck. Sealing scheduled for Thursday.",
        timestamp: "2026-07-16T10:02:00Z",
      },
    ]),
    activity: mkActivity("ISS-1044", [
      { type: "created", label: "Issue created", actor: "Sofia Marchetti", timestamp: "2026-07-09T13:44:00Z" },
      { type: "assigned", label: "Assigned to Elena Torres", actor: "System", timestamp: "2026-07-09T15:00:00Z" },
      { type: "status_changed", label: "Status changed to In Progress", actor: "Elena Torres", timestamp: "2026-07-11T09:00:00Z" },
    ]),
  },
  {
    id: "ISS-1045",
    title: "Electrical rough-in delay — Floor 6",
    description:
      "Electrical rough-in on floor 6 is behind schedule due to a material backorder on conduit fittings, pushing downstream drywall by an estimated 4 days.",
    status: "Open",
    priority: "Medium",
    site: SITES[0],
    location: "Level 6 · Zone C",
    trade: "Electrical",
    reporter: "Jonah Fitzgerald",
    assignee: "Priya Nandakumar",
    createdDate: "2026-07-12T09:00:00Z",
    updatedDate: "2026-07-15T16:40:00Z",
    dueDate: "2026-07-20T17:00:00Z",
    overdue: false,
    attachments: [],
    comments: mkComments("ISS-1045", [
      {
        author: "Priya Nandakumar",
        role: "Electrical Foreman",
        message: "Supplier confirmed fittings ship Friday. Requesting a revised sequencing note for drywall crew.",
        timestamp: "2026-07-15T16:40:00Z",
      },
    ]),
    activity: mkActivity("ISS-1045", [
      { type: "created", label: "Issue created", actor: "Jonah Fitzgerald", timestamp: "2026-07-12T09:00:00Z" },
      { type: "comment", label: "Comment added", actor: "Priya Nandakumar", timestamp: "2026-07-15T16:40:00Z" },
    ]),
  },
  {
    id: "ISS-1046",
    title: "Safety hazard — exposed rebar at loading dock",
    description:
      "Exposed vertical rebar at the loading dock entrance poses an impalement hazard for foot traffic. Requires immediate capping.",
    status: "Resolved",
    priority: "High",
    site: SITES[3],
    location: "Loading Dock · Entrance 2",
    trade: "Safety",
    reporter: "Daniel Kim",
    assignee: "Marcus Webb",
    createdDate: "2026-07-05T07:50:00Z",
    updatedDate: "2026-07-06T12:15:00Z",
    dueDate: "2026-07-06T17:00:00Z",
    overdue: false,
    attachments: [{ id: "a5", name: "rebar-caps-installed.jpg", kind: "photo" }],
    comments: mkComments("ISS-1046", [
      {
        author: "Marcus Webb",
        role: "Site Engineer",
        message: "Rebar caps installed across all exposed bars at the dock. Area cleared for foot traffic.",
        timestamp: "2026-07-06T12:15:00Z",
      },
    ]),
    activity: mkActivity("ISS-1046", [
      { type: "created", label: "Issue created", actor: "Daniel Kim", timestamp: "2026-07-05T07:50:00Z" },
      { type: "assigned", label: "Assigned to Marcus Webb", actor: "System", timestamp: "2026-07-05T08:05:00Z" },
      { type: "inspection", label: "Inspection completed", actor: "Grace Okafor", timestamp: "2026-07-06T11:50:00Z" },
      { type: "resolved", label: "Marked as Resolved", actor: "Marcus Webb", timestamp: "2026-07-06T12:15:00Z" },
    ]),
  },
  {
    id: "ISS-1047",
    title: "Inspection failed — fire-rated wall assembly",
    description:
      "Third-party inspector failed the fire-rated wall assembly on level 2 due to incorrect fastener spacing. Requires rework before re-inspection.",
    status: "Blocked",
    priority: "High",
    site: SITES[2],
    location: "Level 2 · Corridor 2B",
    trade: "Framing",
    reporter: "Grace Okafor",
    assignee: "Daniel Kim",
    createdDate: "2026-07-11T10:05:00Z",
    updatedDate: "2026-07-16T08:30:00Z",
    dueDate: "2026-07-17T17:00:00Z",
    overdue: true,
    attachments: [{ id: "a6", name: "fire-wall-inspection-report.jpg", kind: "document" }],
    comments: mkComments("ISS-1047", [
      {
        author: "Grace Okafor",
        role: "Quality Inspector",
        message: "Fastener spacing exceeds UL assembly listing by 2 inches on 3 of 8 panels. Full report attached.",
        timestamp: "2026-07-11T10:10:00Z",
      },
      {
        author: "Daniel Kim",
        role: "Project Manager",
        message: "Framing crew scheduled to correct spacing tomorrow. Re-inspection requested for Friday.",
        timestamp: "2026-07-16T08:30:00Z",
      },
    ]),
    activity: mkActivity("ISS-1047", [
      { type: "created", label: "Issue created", actor: "Grace Okafor", timestamp: "2026-07-11T10:05:00Z" },
      { type: "status_changed", label: "Status changed to Blocked", actor: "Grace Okafor", timestamp: "2026-07-11T10:12:00Z" },
      { type: "comment", label: "Comment added", actor: "Daniel Kim", timestamp: "2026-07-16T08:30:00Z" },
    ]),
  },
  {
    id: "ISS-1048",
    title: "HVAC installation delay — mechanical room",
    description:
      "Rooftop mechanical unit installation delayed due to crane scheduling conflict with the neighboring site. Ductwork crew idle until unit is set.",
    status: "Open",
    priority: "Medium",
    site: SITES[1],
    location: "Roof · Mechanical Room",
    trade: "HVAC",
    reporter: "Elena Torres",
    assignee: "Jonah Fitzgerald",
    createdDate: "2026-07-13T09:30:00Z",
    updatedDate: "2026-07-14T11:00:00Z",
    dueDate: "2026-07-21T17:00:00Z",
    overdue: false,
    attachments: [],
    comments: mkComments("ISS-1048", [
      {
        author: "Jonah Fitzgerald",
        role: "MEP Coordinator",
        message: "Crane rescheduled for Wednesday 6am. Will confirm with ductwork crew once unit is set.",
        timestamp: "2026-07-14T11:00:00Z",
      },
    ]),
    activity: mkActivity("ISS-1048", [
      { type: "created", label: "Issue created", actor: "Elena Torres", timestamp: "2026-07-13T09:30:00Z" },
      { type: "comment", label: "Comment added", actor: "Jonah Fitzgerald", timestamp: "2026-07-14T11:00:00Z" },
    ]),
  },
  {
    id: "ISS-1049",
    title: "Material shortage — structural steel beams",
    description:
      "Delivery of W-shape structural steel beams for level 5 framing is delayed by two weeks per supplier notice, affecting critical path.",
    status: "Open",
    priority: "High",
    site: SITES[0],
    location: "Level 5 · Grid Line D",
    trade: "Structural",
    reporter: "Priya Nandakumar",
    assignee: "Ahmed Hassan",
    createdDate: "2026-07-06T08:00:00Z",
    updatedDate: "2026-07-16T13:10:00Z",
    dueDate: "2026-07-17T17:00:00Z",
    overdue: true,
    attachments: [{ id: "a7", name: "supplier-delay-notice.jpg", kind: "document" }],
    comments: mkComments("ISS-1049", [
      {
        author: "Ahmed Hassan",
        role: "Structural Engineer",
        message: "Exploring an alternate supplier for a partial shipment to keep grid line D on schedule.",
        timestamp: "2026-07-16T13:10:00Z",
      },
    ]),
    activity: mkActivity("ISS-1049", [
      { type: "created", label: "Issue created", actor: "Priya Nandakumar", timestamp: "2026-07-06T08:00:00Z" },
      { type: "assigned", label: "Assigned to Ahmed Hassan", actor: "System", timestamp: "2026-07-06T08:20:00Z" },
      { type: "comment", label: "Comment added", actor: "Ahmed Hassan", timestamp: "2026-07-16T13:10:00Z" },
    ]),
  },
  {
    id: "ISS-1050",
    title: "Concrete crack — foundation wall, west elevation",
    description:
      "Diagonal crack pattern observed on the west foundation wall following recent curing. Monitoring gauges installed to track movement.",
    status: "In Progress",
    priority: "Medium",
    site: SITES[4],
    location: "Foundation · West Elevation",
    trade: "Concrete",
    reporter: "Marcus Webb",
    assignee: "Grace Okafor",
    createdDate: "2026-07-07T14:20:00Z",
    updatedDate: "2026-07-15T09:45:00Z",
    dueDate: "2026-07-22T17:00:00Z",
    overdue: false,
    attachments: [{ id: "a8", name: "west-wall-crack-gauge.jpg", kind: "photo" }],
    comments: mkComments("ISS-1050", [
      {
        author: "Grace Okafor",
        role: "Quality Inspector",
        message: "Crack width steady at 0.3mm over 5 days of monitoring. No active movement detected so far.",
        timestamp: "2026-07-15T09:45:00Z",
      },
    ]),
    activity: mkActivity("ISS-1050", [
      { type: "created", label: "Issue created", actor: "Marcus Webb", timestamp: "2026-07-07T14:20:00Z" },
      { type: "status_changed", label: "Status changed to In Progress", actor: "Grace Okafor", timestamp: "2026-07-08T10:00:00Z" },
      { type: "comment", label: "Comment added", actor: "Grace Okafor", timestamp: "2026-07-15T09:45:00Z" },
    ]),
  },
  {
    id: "ISS-1051",
    title: "Missing rebar dowels — slab-on-grade section 4",
    description:
      "Dowel bars were omitted at the construction joint in slab-on-grade section 4, per as-built photos taken prior to pour.",
    status: "Resolved",
    priority: "Medium",
    site: SITES[2],
    location: "Ground Floor · Section 4",
    trade: "Concrete",
    reporter: "Sofia Marchetti",
    assignee: "Daniel Kim",
    createdDate: "2026-06-29T08:10:00Z",
    updatedDate: "2026-07-02T15:30:00Z",
    dueDate: "2026-07-03T17:00:00Z",
    overdue: false,
    attachments: [],
    comments: mkComments("ISS-1051", [
      {
        author: "Daniel Kim",
        role: "Project Manager",
        message: "Drilled and epoxied dowels retroactively per engineer's detail. Re-inspected and approved.",
        timestamp: "2026-07-02T15:30:00Z",
      },
    ]),
    activity: mkActivity("ISS-1051", [
      { type: "created", label: "Issue created", actor: "Sofia Marchetti", timestamp: "2026-06-29T08:10:00Z" },
      { type: "inspection", label: "Inspection completed", actor: "Grace Okafor", timestamp: "2026-07-02T15:00:00Z" },
      { type: "resolved", label: "Marked as Resolved", actor: "Daniel Kim", timestamp: "2026-07-02T15:30:00Z" },
    ]),
  },
  {
    id: "ISS-1052",
    title: "Water leakage — roof membrane seam",
    description:
      "Ponding water traced to a failed seam in the roof membrane above unit 412. Interior ceiling stain reported by finishing crew.",
    status: "Open",
    priority: "High",
    site: SITES[4],
    location: "Roof · Above Unit 412",
    trade: "Roofing",
    reporter: "Jonah Fitzgerald",
    assignee: "Elena Torres",
    createdDate: "2026-07-14T07:40:00Z",
    updatedDate: "2026-07-16T07:55:00Z",
    dueDate: "2026-07-18T17:00:00Z",
    overdue: false,
    attachments: [{ id: "a9", name: "roof-seam-failure.jpg", kind: "photo" }],
    comments: mkComments("ISS-1052", [
      {
        author: "Elena Torres",
        role: "Roofing Lead",
        message: "Roofing sub scheduled to re-weld the seam and re-test with a flood test tomorrow.",
        timestamp: "2026-07-16T07:55:00Z",
      },
    ]),
    activity: mkActivity("ISS-1052", [
      { type: "created", label: "Issue created", actor: "Jonah Fitzgerald", timestamp: "2026-07-14T07:40:00Z" },
      { type: "assigned", label: "Assigned to Elena Torres", actor: "System", timestamp: "2026-07-14T08:00:00Z" },
      { type: "comment", label: "Comment added", actor: "Elena Torres", timestamp: "2026-07-16T07:55:00Z" },
    ]),
  },
  {
    id: "ISS-1053",
    title: "Electrical panel delay — Building C",
    description:
      "Main distribution panel for Building C is on backorder, delaying temporary power activation for interior finishing trades.",
    status: "Blocked",
    priority: "High",
    site: SITES[1],
    location: "Building C · Electrical Room",
    trade: "Electrical",
    reporter: "Priya Nandakumar",
    assignee: "Jonah Fitzgerald",
    createdDate: "2026-07-04T09:15:00Z",
    updatedDate: "2026-07-16T12:00:00Z",
    dueDate: "2026-07-15T17:00:00Z",
    overdue: true,
    attachments: [],
    comments: mkComments("ISS-1053", [
      {
        author: "Jonah Fitzgerald",
        role: "MEP Coordinator",
        message: "Manufacturer pushed ship date again — now targeting July 24. Escalating to procurement.",
        timestamp: "2026-07-16T12:00:00Z",
      },
    ]),
    activity: mkActivity("ISS-1053", [
      { type: "created", label: "Issue created", actor: "Priya Nandakumar", timestamp: "2026-07-04T09:15:00Z" },
      { type: "status_changed", label: "Status changed to Blocked", actor: "Jonah Fitzgerald", timestamp: "2026-07-10T09:00:00Z" },
      { type: "comment", label: "Comment added", actor: "Jonah Fitzgerald", timestamp: "2026-07-16T12:00:00Z" },
    ]),
  },
  {
    id: "ISS-1054",
    title: "Safety hazard — unguarded floor opening",
    description:
      "Unguarded floor opening for future MEP riser found on level 3 without required barricade or signage.",
    status: "Resolved",
    priority: "High",
    site: SITES[0],
    location: "Level 3 · MEP Riser Shaft",
    trade: "Safety",
    reporter: "Grace Okafor",
    assignee: "Marcus Webb",
    createdDate: "2026-07-12T06:55:00Z",
    updatedDate: "2026-07-12T10:20:00Z",
    dueDate: "2026-07-12T12:00:00Z",
    overdue: false,
    attachments: [{ id: "a10", name: "riser-shaft-barricade.jpg", kind: "photo" }],
    comments: mkComments("ISS-1054", [
      {
        author: "Marcus Webb",
        role: "Site Engineer",
        message: "Installed guardrail and high-visibility signage immediately. Toolbox talk held with crew.",
        timestamp: "2026-07-12T10:20:00Z",
      },
    ]),
    activity: mkActivity("ISS-1054", [
      { type: "created", label: "Issue created", actor: "Grace Okafor", timestamp: "2026-07-12T06:55:00Z" },
      { type: "resolved", label: "Marked as Resolved", actor: "Marcus Webb", timestamp: "2026-07-12T10:20:00Z" },
    ]),
  },
  {
    id: "ISS-1055",
    title: "Inspection failed — waterproofing at podium deck",
    description:
      "Waterproofing membrane at the podium deck failed flood test inspection; ponding detected near drain 6.",
    status: "In Progress",
    priority: "Medium",
    site: SITES[2],
    location: "Podium Deck · Drain 6",
    trade: "Roofing",
    reporter: "Grace Okafor",
    assignee: "Sofia Marchetti",
    createdDate: "2026-07-10T13:00:00Z",
    updatedDate: "2026-07-15T11:30:00Z",
    dueDate: "2026-07-19T17:00:00Z",
    overdue: false,
    attachments: [{ id: "a11", name: "podium-flood-test.jpg", kind: "photo" }],
    comments: mkComments("ISS-1055", [
      {
        author: "Sofia Marchetti",
        role: "Waterproofing Sub",
        message: "Regrading drain slope this week to correct low spot causing ponding.",
        timestamp: "2026-07-15T11:30:00Z",
      },
    ]),
    activity: mkActivity("ISS-1055", [
      { type: "created", label: "Issue created", actor: "Grace Okafor", timestamp: "2026-07-10T13:00:00Z" },
      { type: "status_changed", label: "Status changed to In Progress", actor: "Sofia Marchetti", timestamp: "2026-07-11T09:00:00Z" },
      { type: "comment", label: "Comment added", actor: "Sofia Marchetti", timestamp: "2026-07-15T11:30:00Z" },
    ]),
  },
  {
    id: "ISS-1056",
    title: "HVAC ductwork clash — corridor ceiling",
    description:
      "Ductwork routing conflicts with sprinkler main in the level 7 corridor ceiling per coordination model. Requires re-route.",
    status: "Open",
    priority: "Low",
    site: SITES[0],
    location: "Level 7 · Main Corridor",
    trade: "HVAC",
    reporter: "Daniel Kim",
    assignee: "Jonah Fitzgerald",
    createdDate: "2026-07-15T10:00:00Z",
    updatedDate: "2026-07-15T10:00:00Z",
    dueDate: "2026-07-24T17:00:00Z",
    overdue: false,
    attachments: [],
    comments: [],
    activity: mkActivity("ISS-1056", [
      { type: "created", label: "Issue created", actor: "Daniel Kim", timestamp: "2026-07-15T10:00:00Z" },
    ]),
  },
  {
    id: "ISS-1057",
    title: "Material shortage — insulation batts",
    description:
      "Fiberglass insulation batts for levels 8–10 are short by an estimated 40% of required quantity due to a supplier fulfillment error.",
    status: "Open",
    priority: "Low",
    site: SITES[1],
    location: "Levels 8–10",
    trade: "Framing",
    reporter: "Sofia Marchetti",
    assignee: "Priya Nandakumar",
    createdDate: "2026-07-16T08:15:00Z",
    updatedDate: "2026-07-16T08:15:00Z",
    dueDate: "2026-07-23T17:00:00Z",
    overdue: false,
    attachments: [],
    comments: [],
    activity: mkActivity("ISS-1057", [
      { type: "created", label: "Issue created", actor: "Sofia Marchetti", timestamp: "2026-07-16T08:15:00Z" },
    ]),
  },
  {
    id: "ISS-1058",
    title: "Concrete crack — slab expansion joint",
    description:
      "Spalling observed at the expansion joint on the level 1 slab near grid E-4, likely from thermal movement during cure.",
    status: "In Progress",
    priority: "Low",
    site: SITES[3],
    location: "Level 1 · Grid E-4",
    trade: "Concrete",
    reporter: "Ahmed Hassan",
    assignee: "Grace Okafor",
    createdDate: "2026-07-11T15:30:00Z",
    updatedDate: "2026-07-14T16:10:00Z",
    dueDate: "2026-07-20T17:00:00Z",
    overdue: false,
    attachments: [{ id: "a12", name: "expansion-joint-spalling.jpg", kind: "photo" }],
    comments: mkComments("ISS-1058", [
      {
        author: "Grace Okafor",
        role: "Quality Inspector",
        message: "Minor spalling only, within tolerance. Recommending patch repair rather than replacement.",
        timestamp: "2026-07-14T16:10:00Z",
      },
    ]),
    activity: mkActivity("ISS-1058", [
      { type: "created", label: "Issue created", actor: "Ahmed Hassan", timestamp: "2026-07-11T15:30:00Z" },
      { type: "comment", label: "Comment added", actor: "Grace Okafor", timestamp: "2026-07-14T16:10:00Z" },
    ]),
  },
  {
    id: "ISS-1059",
    title: "Safety hazard — scaffold missing toe boards",
    description:
      "Scaffold on the north facade is missing required toe boards at the second lift, creating a falling object hazard over the pedestrian walkway.",
    status: "Resolved",
    priority: "High",
    site: SITES[4],
    location: "North Facade · Lift 2",
    trade: "Safety",
    reporter: "Elena Torres",
    assignee: "Marcus Webb",
    createdDate: "2026-07-13T07:05:00Z",
    updatedDate: "2026-07-13T09:40:00Z",
    dueDate: "2026-07-13T12:00:00Z",
    overdue: false,
    attachments: [{ id: "a13", name: "scaffold-toeboards.jpg", kind: "photo" }],
    comments: mkComments("ISS-1059", [
      {
        author: "Marcus Webb",
        role: "Site Engineer",
        message: "Toe boards installed across the full second lift and verified by the scaffold competent person.",
        timestamp: "2026-07-13T09:40:00Z",
      },
    ]),
    activity: mkActivity("ISS-1059", [
      { type: "created", label: "Issue created", actor: "Elena Torres", timestamp: "2026-07-13T07:05:00Z" },
      { type: "resolved", label: "Marked as Resolved", actor: "Marcus Webb", timestamp: "2026-07-13T09:40:00Z" },
    ]),
  },
  {
    id: "ISS-1060",
    title: "Inspection failed — egress door hardware",
    description:
      "Fire marshal pre-inspection failed egress door hardware on level 1 stair B; panic hardware not rated for occupancy type.",
    status: "Blocked",
    priority: "Medium",
    site: SITES[2],
    location: "Level 1 · Stair B",
    trade: "Safety",
    reporter: "Grace Okafor",
    assignee: "Daniel Kim",
    createdDate: "2026-07-09T09:50:00Z",
    updatedDate: "2026-07-16T09:00:00Z",
    dueDate: "2026-07-16T17:00:00Z",
    overdue: true,
    attachments: [{ id: "a14", name: "egress-hardware-report.jpg", kind: "document" }],
    comments: mkComments("ISS-1060", [
      {
        author: "Daniel Kim",
        role: "Project Manager",
        message: "Correct panic hardware ordered with expedited shipping; re-inspection to be scheduled on arrival.",
        timestamp: "2026-07-16T09:00:00Z",
      },
    ]),
    activity: mkActivity("ISS-1060", [
      { type: "created", label: "Issue created", actor: "Grace Okafor", timestamp: "2026-07-09T09:50:00Z" },
      { type: "status_changed", label: "Status changed to Blocked", actor: "Grace Okafor", timestamp: "2026-07-09T10:00:00Z" },
      { type: "comment", label: "Comment added", actor: "Daniel Kim", timestamp: "2026-07-16T09:00:00Z" },
    ]),
  },
  {
    id: "ISS-1061",
    title: "Electrical delay — generator commissioning",
    description:
      "Emergency generator commissioning pushed back a week awaiting utility inspector availability for the transfer switch sign-off.",
    status: "Open",
    priority: "Medium",
    site: SITES[3],
    location: "Generator Yard",
    trade: "Electrical",
    reporter: "Priya Nandakumar",
    assignee: "Ahmed Hassan",
    createdDate: "2026-07-14T12:20:00Z",
    updatedDate: "2026-07-16T09:15:00Z",
    dueDate: "2026-07-25T17:00:00Z",
    overdue: false,
    attachments: [],
    comments: mkComments("ISS-1061", [
      {
        author: "Ahmed Hassan",
        role: "Structural Engineer",
        message: "Confirmed inspector slot for July 25. Notifying commissioning agent to align schedule.",
        timestamp: "2026-07-16T09:15:00Z",
      },
    ]),
    activity: mkActivity("ISS-1061", [
      { type: "created", label: "Issue created", actor: "Priya Nandakumar", timestamp: "2026-07-14T12:20:00Z" },
      { type: "comment", label: "Comment added", actor: "Ahmed Hassan", timestamp: "2026-07-16T09:15:00Z" },
    ]),
  },
];

export function getKpis(issues: Issue[]) {
  const open = issues.filter((i) => i.status === "Open").length;
  const inProgress = issues.filter((i) => i.status === "In Progress").length;
  const resolved = issues.filter((i) => i.status === "Resolved").length;
  const highPriority = issues.filter((i) => i.priority === "High").length;
  const overdue = issues.filter((i) => i.overdue).length;
  return { open, inProgress, resolved, highPriority, overdue };
}
