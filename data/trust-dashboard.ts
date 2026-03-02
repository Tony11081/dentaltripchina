import { MonthlyTrustMetric } from "@/lib/types";

export const monthlyTrustMetrics: MonthlyTrustMetric[] = [
  {
    month: "2025-10",
    medianFirstResponseMinutes: 24,
    appointmentFulfillmentPct: 92,
    complaintResolutionHours: 27,
    followUpCompletionPct: 89
  },
  {
    month: "2025-11",
    medianFirstResponseMinutes: 22,
    appointmentFulfillmentPct: 93,
    complaintResolutionHours: 24,
    followUpCompletionPct: 90
  },
  {
    month: "2025-12",
    medianFirstResponseMinutes: 20,
    appointmentFulfillmentPct: 94,
    complaintResolutionHours: 22,
    followUpCompletionPct: 91
  },
  {
    month: "2026-01",
    medianFirstResponseMinutes: 18,
    appointmentFulfillmentPct: 95,
    complaintResolutionHours: 21,
    followUpCompletionPct: 92
  },
  {
    month: "2026-02",
    medianFirstResponseMinutes: 17,
    appointmentFulfillmentPct: 95,
    complaintResolutionHours: 19,
    followUpCompletionPct: 93
  }
];

export const trustMetricDefinitions = [
  {
    key: "medianFirstResponseMinutes",
    title: "Median first response",
    target: "<= 30 minutes",
    note: "From first inbound message to first human response."
  },
  {
    key: "appointmentFulfillmentPct",
    title: "Appointment fulfillment",
    target: ">= 90%",
    note: "Booked consultations completed as scheduled."
  },
  {
    key: "complaintResolutionHours",
    title: "Complaint resolution",
    target: "<= 36 hours",
    note: "Median time to close patient complaint tickets."
  },
  {
    key: "followUpCompletionPct",
    title: "Post-op follow-up completion",
    target: ">= 85%",
    note: "Patients completing documented follow-up checkpoints."
  }
] as const;

export const careSlaTargets = [
  {
    trigger: "Red-flag symptoms reported",
    target: "Escalation within 15 minutes",
    owner: "Duty coordinator"
  },
  {
    trigger: "Urgent clinical clarification needed",
    target: "Clinical pathway advice within 2 hours",
    owner: "On-call medical liaison"
  },
  {
    trigger: "Request for local continuity handoff",
    target: "Transfer summary within 24 hours",
    owner: "Case coordinator"
  }
];
