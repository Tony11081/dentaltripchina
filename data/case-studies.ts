import { CaseStudy } from "@/lib/types";

export const caseStudies: CaseStudy[] = [
  {
    slug: "uk-implant-bone-graft-sequenced-care",
    title: "UK Patient: Implant + Bone Graft Sequenced in Shanghai",
    procedureSlug: "dental-implants-china",
    country: "United Kingdom",
    city: "Shanghai",
    patientContext:
      "52-year-old with missing molars and previous failed bridge. Needed staged planning with budget control and fast return-to-work timeline.",
    proposedPlan: [
      "Day 1 diagnostics and CBCT imaging",
      "Bone graft + implant placement in one planned sequence",
      "Early healing review before departure and remote check at week 2"
    ],
    timeline: [
      { day: "Day 0", event: "Arrival and coordinator intake" },
      { day: "Day 1", event: "Diagnostics, treatment confirmation, and consent" },
      { day: "Day 2", event: "Implant surgery completed" },
      { day: "Day 4", event: "Post-op wound and pain review" },
      { day: "Week 2", event: "Remote follow-up and medication taper" }
    ],
    costBreakdown: {
      treatmentUsd: 3400,
      flightHotelUsd: 1460,
      followUpUsd: 180,
      extraUsd: 260
    },
    outcome:
      "Healing stayed on track, no urgent events, and crown phase scheduled at planned interval.",
    followUp: [
      "Two remote video checks completed",
      "Digital imaging shared to home dentist for continuity",
      "Patient-reported pain dropped from 6/10 to 2/10 by Day 4"
    ],
    complication: {
      occurred: false
    },
    testimonial: {
      quote:
        "The timeline was exact, the quote was clear, and I knew every next step before flying.",
      verified: true,
      incentiveDisclosure: "No incentive provided."
    }
  },
  {
    slug: "au-lasik-dry-eye-managed",
    title: "Australia Patient: LASIK with Early Dry-Eye Management",
    procedureSlug: "lasik-china",
    country: "Australia",
    city: "Beijing",
    patientContext:
      "31-year-old high myopia patient with mild pre-existing dry eye concerns and strict travel window.",
    proposedPlan: [
      "Full refractive suitability workup before committing",
      "Procedure only after tear-film and corneal thresholds were cleared",
      "Mandatory day-1 and day-7 checks before long-haul return"
    ],
    timeline: [
      { day: "Day 0", event: "Arrival and pre-op briefing" },
      { day: "Day 1", event: "Corneal mapping and suitability confirmation" },
      { day: "Day 2", event: "LASIK procedure" },
      { day: "Day 3", event: "Dry-eye symptoms noted and medication adjusted" },
      { day: "Day 7", event: "Clearance for return flight" }
    ],
    costBreakdown: {
      treatmentUsd: 1850,
      flightHotelUsd: 1280,
      followUpUsd: 220,
      extraUsd: 150
    },
    outcome:
      "Vision target achieved and symptoms resolved to mild levels with adjusted lubrication protocol.",
    followUp: [
      "Weekly remote check for first month",
      "Urgent symptom escalation card provided",
      "Local ophthalmologist handoff note sent"
    ],
    complication: {
      occurred: true,
      summary: "Early post-op dry-eye flare during first 48 hours.",
      action: [
        "Escalated through red-flag channel in 15 minutes",
        "Clinical advice issued in under 2 hours",
        "Medication protocol changed and recheck advanced"
      ]
    },
    testimonial: {
      quote:
        "They reacted fast when symptoms changed. That response speed mattered more than anything.",
      verified: true,
      incentiveDisclosure: "Airport transfer voucher provided and disclosed."
    }
  },
  {
    slug: "ca-health-checkup-incidental-findings",
    title: "Canada Patient: Comprehensive Checkup with Incidental Findings",
    procedureSlug: "health-checkup-china",
    country: "Canada",
    city: "Shanghai",
    patientContext:
      "44-year-old executive wanted preventive screening within one week and English report turnaround.",
    proposedPlan: [
      "One-day premium checkup package",
      "Same-day specialist review for abnormal markers",
      "Home-country follow-up recommendation pack"
    ],
    timeline: [
      { day: "Day 1", event: "Checkup panels and imaging" },
      { day: "Day 2", event: "Specialist review for incidental liver marker" },
      { day: "Day 3", event: "Final bilingual report handoff" },
      { day: "Week 4", event: "Remote review with local physician" }
    ],
    costBreakdown: {
      treatmentUsd: 620,
      flightHotelUsd: 1320,
      followUpUsd: 120,
      extraUsd: 210
    },
    outcome:
      "No acute disease identified. Incidental finding triaged with clear follow-up pathway and data export.",
    followUp: [
      "Bilingual report delivered within 48 hours",
      "Referral note for local GP completed",
      "Three-month monitoring checklist sent"
    ],
    complication: {
      occurred: false
    },
    testimonial: {
      quote:
        "I valued the report quality and the clear plan for what to do back home.",
      verified: true,
      incentiveDisclosure: "No incentive provided."
    }
  },
  {
    slug: "uk-all-on-4-swelling-escalation",
    title: "UK Patient: All-on-4 with Swelling Escalation Protocol",
    procedureSlug: "all-on-4-china",
    country: "United Kingdom",
    city: "Beijing",
    patientContext:
      "58-year-old with severe periodontal history and urgent need for fixed full-arch solution.",
    proposedPlan: [
      "Pre-op periodontal stabilization",
      "All-on-4 surgery with staged immediate-load assessment",
      "Extended 10-day monitoring before departure"
    ],
    timeline: [
      { day: "Day 1", event: "Surgical planning and anesthesia assessment" },
      { day: "Day 2", event: "All-on-4 surgery" },
      { day: "Day 3", event: "Unexpected unilateral swelling" },
      { day: "Day 3", event: "Escalated and seen by surgeon same day" },
      { day: "Day 6", event: "Symptoms stabilized and cleared" },
      { day: "Week 3", event: "Remote review completed" }
    ],
    costBreakdown: {
      treatmentUsd: 9800,
      flightHotelUsd: 1710,
      followUpUsd: 260,
      extraUsd: 430
    },
    outcome:
      "Swelling resolved without surgical revision. Final prosthetic progression resumed with no further emergency events.",
    followUp: [
      "Daily symptom check for 4 days",
      "Antibiotic and anti-inflammatory adjustment",
      "Remote check-ins at week 1 and week 3"
    ],
    complication: {
      occurred: true,
      summary: "Post-op swelling exceeded expected range on Day 3.",
      action: [
        "Red-flag triage response within 15 minutes",
        "In-person surgical review within 2 hours",
        "Documented event included in monthly quality report"
      ]
    },
    testimonial: {
      quote:
        "The complication was handled quickly and transparently. I never felt left alone.",
      verified: true,
      incentiveDisclosure: "No incentive provided."
    }
  }
];
