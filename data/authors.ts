import { BlogAuthor } from "@/lib/types";

export const blogAuthors: BlogAuthor[] = [
  {
    slug: "dr-emily-carter",
    name: "Dr. Emily Carter",
    title: "Clinical Content Lead (Dental)",
    credentials: ["BDS", "MClinDent", "GDC Registered"],
    specialties: ["Dental implants", "Restorative planning", "Cross-border treatment education"],
    profile:
      "Dr. Carter reviews implant and restorative content with focus on treatment sequencing, risk communication, and realistic case budgeting for international patients.",
    reviewMethod:
      "Every article is checked against partner hospital protocols, current patient pathways, and price-quote scope definitions.",
    lastProfileReview: "February 22, 2026"
  },
  {
    slug: "dr-james-walker",
    name: "Dr. James Walker",
    title: "Clinical Reviewer (Ophthalmology)",
    credentials: ["MBBS", "FRCOphth"],
    specialties: ["LASIK", "Corneal diagnostics", "Post-op safety education"],
    profile:
      "Dr. Walker validates refractive-surgery content and ensures screening criteria, contraindications, and follow-up windows are medically coherent.",
    reviewMethod:
      "LASIK articles are reviewed for candidate eligibility logic, red-flag guidance, and alignment with diagnostic requirements.",
    lastProfileReview: "February 21, 2026"
  },
  {
    slug: "nora-ellis",
    name: "Nora Ellis",
    title: "Medical Travel Compliance Editor",
    credentials: ["CIPP/E", "Cross-border Health Ops"],
    specialties: ["Medical travel policy", "Cross-border data handling", "Operational compliance"],
    profile:
      "Nora leads non-clinical policy content covering travel preparation, consent requirements, and data-transfer governance.",
    reviewMethod:
      "Policy pages are versioned, date-stamped, and rechecked whenever process or legal assumptions change.",
    lastProfileReview: "February 24, 2026"
  },
  {
    slug: "olivia-bennett",
    name: "Olivia Bennett",
    title: "Patient Journey Editor",
    credentials: ["Healthcare Communication", "International Patient Services"],
    specialties: ["Patient decision support", "Care timelines", "Expectation setting"],
    profile:
      "Olivia structures educational content around realistic timelines, cost boundaries, and post-treatment continuity planning.",
    reviewMethod:
      "All patient-journey content is reviewed with coordinator playbooks and real-world turnaround metrics.",
    lastProfileReview: "February 20, 2026"
  }
];
