export interface EditorialUpdate {
  date: string;
  page: string;
  change: string;
  reviewer: string;
}

export const editorialUpdates: EditorialUpdate[] = [
  {
    date: "2026-02-25",
    page: "/pricing",
    change: "Updated cross-country appointment and treatment timeline table with latest partner response windows.",
    reviewer: "Nora Ellis"
  },
  {
    date: "2026-02-24",
    page: "/dental-implants-china",
    change: "Refined risk disclosure copy and expanded recovery milestone guidance.",
    reviewer: "Dr. Emily Carter"
  },
  {
    date: "2026-02-22",
    page: "/lasik-china",
    change: "Added contraindication details and post-op dry-eye escalation notes.",
    reviewer: "Dr. James Walker"
  },
  {
    date: "2026-02-20",
    page: "/china-visa-free-medical-tourism",
    change: "Rechecked travel preparation checklist and emergency document list.",
    reviewer: "Nora Ellis"
  },
  {
    date: "2026-02-18",
    page: "/blog/how-much-dental-implant-cost-china-2026",
    change: "Refreshed price-scope boundaries and sensitivity factors for complex cases.",
    reviewer: "Dr. Emily Carter"
  }
];
