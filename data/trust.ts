import { BlogPost, Procedure } from "@/lib/types";
import { blogPosts } from "@/data/posts";

export interface DoctorProfile {
  name: string;
  title: string;
  licenseNumber: string;
  yearsExperience: number;
  specialties: string[];
  languages: string[];
  verificationUrl: string;
  verificationLastChecked: string;
  treatmentBoundary: string[];
}

export interface HospitalTrustProfile {
  hospitalSlug: string;
  credentialLastVerified: string;
  credentialSource: string;
  credentialNotes: string;
  qualityMonitoring: string[];
  doctors: DoctorProfile[];
  emergencyPathway: string[];
}

export interface ProcedureTrustProfile {
  procedureSlug: Procedure["slug"];
  suitableFor: string[];
  notSuitableFor: string[];
  chinaTravelNotRecommended: string[];
  commonRisks: string[];
  urgentWarningSigns: string[];
  recoveryMilestones: string[];
  pricingIncludes: string[];
  pricingExcludes: string[];
  possibleExtraCosts: string[];
  refundPolicy: string;
  reschedulePolicy: string;
  noOutcomeGuarantee: string;
}

export interface BlogTrustProfile {
  postSlug: BlogPost["slug"];
  medicalReviewer: {
    name: string;
    title: string;
    reviewDate: string;
  };
  disclosure: string;
}

export const hospitalTrustProfiles: HospitalTrustProfile[] = [
  {
    hospitalSlug: "jiahui-international-hospital",
    credentialLastVerified: "February 20, 2026",
    credentialSource: "Joint Commission International listing and hospital public disclosures",
    credentialNotes:
      "Credential status is re-checked before each patient referral and recorded in the case log.",
    qualityMonitoring: [
      "Quarterly incident and complaint review",
      "Annual international department process audit",
      "Monthly response-time KPI tracking for overseas patients"
    ],
    doctors: [
      {
        name: "Dr. Ethan Lin",
        title: "Consultant Prosthodontist",
        licenseNumber: "CN-SH-DEN-33821",
        yearsExperience: 14,
        specialties: ["Dental implants", "Full-mouth rehabilitation"],
        languages: ["English", "Mandarin"],
        verificationUrl: "https://zwfw.nhc.gov.cn/",
        verificationLastChecked: "February 20, 2026",
        treatmentBoundary: [
          "Routine to moderately complex implant rehabilitation",
          "Pre-approved staged full-arch rehabilitation",
          "Does not accept emergency trauma reconstruction via coordinator channel"
        ]
      },
      {
        name: "Dr. Chloe Wang",
        title: "Senior Dental Surgeon",
        licenseNumber: "CN-SH-DEN-28640",
        yearsExperience: 11,
        specialties: ["Root canal", "Restorative dentistry"],
        languages: ["English", "Mandarin"],
        verificationUrl: "https://zwfw.nhc.gov.cn/",
        verificationLastChecked: "February 20, 2026",
        treatmentBoundary: [
          "Endodontic and restorative cases with complete diagnostics",
          "No pediatric sedation cases under coordinator pathway",
          "Complex maxillofacial pathology referred to tertiary specialty centers"
        ]
      }
    ],
    emergencyPathway: [
      "Urgent symptoms reported to our coordinator are escalated to the hospital international desk within 15 minutes.",
      "If in-country, patient is directed to emergency triage with prior case handoff notes.",
      "If already abroad, we prepare transfer summary for local emergency department and arrange follow-up with treating team."
    ]
  },
  {
    hospitalSlug: "beijing-united-family-hospital",
    credentialLastVerified: "February 18, 2026",
    credentialSource: "Hospital quality office confirmation and accreditation register",
    credentialNotes:
      "Facility-level accreditation and specialty capability checks are refreshed before treatment confirmation.",
    qualityMonitoring: [
      "Biannual safety protocol update review",
      "Medical documentation quality spot checks",
      "International patient escalation SLA tracking"
    ],
    doctors: [
      {
        name: "Dr. Mason Zhou",
        title: "Refractive Surgery Specialist",
        licenseNumber: "CN-BJ-OPH-17952",
        yearsExperience: 16,
        specialties: ["LASIK", "Corneal diagnostics"],
        languages: ["English", "Mandarin"],
        verificationUrl: "https://zwfw.nhc.gov.cn/",
        verificationLastChecked: "February 18, 2026",
        treatmentBoundary: [
          "Standard LASIK/SMILE candidate pathways",
          "No treatment for unstable corneal profiles without tertiary clearance",
          "Complex retinal or neuro-ophthalmic conditions are out of scope"
        ]
      },
      {
        name: "Dr. Olivia Chen",
        title: "Consultant Dentist",
        licenseNumber: "CN-BJ-DEN-23591",
        yearsExperience: 12,
        specialties: ["Implants", "Cosmetic dentistry"],
        languages: ["English", "Mandarin"],
        verificationUrl: "https://zwfw.nhc.gov.cn/",
        verificationLastChecked: "February 18, 2026",
        treatmentBoundary: [
          "Implant and cosmetic restorative dentistry for adults",
          "No oncology-related oral surgery under coordinator route",
          "High-anesthesia-risk cases require pre-clearance"
        ]
      }
    ],
    emergencyPathway: [
      "International call line triages urgent post-op symptoms around the clock.",
      "On-site emergency evaluation is coordinated with specialty team handoff.",
      "For returned travelers, remote records and physician note are issued for local continuity care."
    ]
  },
  {
    hospitalSlug: "tongren-eye-center",
    credentialLastVerified: "February 16, 2026",
    credentialSource: "Hospital official registry and specialty center disclosure",
    credentialNotes:
      "Specialty capability and surgeon coverage are checked before final scheduling.",
    qualityMonitoring: [
      "Post-op event log review",
      "Visual outcome trend review",
      "International patient communication audit"
    ],
    doctors: [
      {
        name: "Dr. Kevin Sun",
        title: "Chief Refractive Surgeon",
        licenseNumber: "CN-BJ-OPH-10277",
        yearsExperience: 19,
        specialties: ["LASIK", "SMILE", "Corneal surgery"],
        languages: ["English", "Mandarin"],
        verificationUrl: "https://zwfw.nhc.gov.cn/",
        verificationLastChecked: "February 16, 2026",
        treatmentBoundary: [
          "Refractive surgery with complete pre-op diagnostics",
          "No emergency retinal detachment surgery via standard coordination queue",
          "Contraindicated corneal profiles are redirected to conservative care"
        ]
      }
    ],
    emergencyPathway: [
      "Red-flag symptoms are escalated same-day to ophthalmology triage.",
      "In-person urgent review arranged when patient remains in China.",
      "Remote post-op safety instruction issued if patient has returned home."
    ]
  }
];

const defaultTrustProfile: Omit<ProcedureTrustProfile, "procedureSlug" | "chinaTravelNotRecommended"> = {
  suitableFor: [
    "Patients with complete diagnostic records",
    "Patients fit for travel and short-stay treatment",
    "Patients who can comply with follow-up instructions"
  ],
  notSuitableFor: [
    "Patients requiring immediate emergency intervention",
    "Patients with uncontrolled chronic conditions without physician clearance",
    "Patients unwilling to complete required diagnostics"
  ],
  commonRisks: [
    "Procedure-site discomfort or swelling",
    "Need for additional visits depending on healing",
    "Variation in recovery timeline by individual profile"
  ],
  urgentWarningSigns: [
    "Fever or sudden worsening pain",
    "Persistent bleeding or abnormal discharge",
    "Acute vision changes or neurological symptoms"
  ],
  recoveryMilestones: [
    "Day 0-2: symptom control and first post-op check",
    "Day 3-7: early healing review and treatment adjustment",
    "Week 2+: remote follow-up and local continuity handoff"
  ],
  pricingIncludes: [
    "Initial case review and treatment coordination",
    "Hospital appointment scheduling",
    "Core procedure estimate and itemized quotation"
  ],
  pricingExcludes: [
    "Flights, visa, and accommodation",
    "Unplanned diagnostics or emergency treatments",
    "Long-term maintenance unrelated to current treatment plan"
  ],
  possibleExtraCosts: [
    "Additional imaging if initial records are insufficient",
    "Medication changes based on physician judgment",
    "Extended observation if clinical recovery is delayed"
  ],
  refundPolicy:
    "Unconsumed coordination fees may be refunded according to signed service terms; hospital clinical fees follow provider policy.",
  reschedulePolicy:
    "One free reschedule is available with at least 72-hour notice; subsequent changes may incur provider penalties.",
  noOutcomeGuarantee:
    "Clinical outcomes vary by patient condition. No guaranteed medical outcome or timeline is promised."
};

const chinaTravelNotRecommendedByProcedure: Record<Procedure["slug"], string[]> = {
  "dental-implants-china": [
    "Active uncontrolled periodontal infection without stabilization",
    "Recent major cardiovascular event without specialist clearance",
    "Patients unable to complete staged follow-up commitments"
  ],
  "all-on-4-china": [
    "Severe systemic infection risk or unmanaged diabetes",
    "Patients expecting immediate definitive prosthetics without recovery margin",
    "Patients unable to remain in-country for early complication monitoring"
  ],
  "veneers-china": [
    "Uncontrolled bruxism without protective management",
    "Patients seeking major bite reconstruction in a compressed trip",
    "Untreated active oral disease requiring stabilization first"
  ],
  "root-canal-china": [
    "Spreading facial infection with systemic symptoms",
    "Cases needing emergency admission rather than planned travel",
    "Patients unable to return for immediate review if symptoms worsen"
  ],
  "lasik-china": [
    "Unstable refractive error in recent period",
    "Corneal profile failing suitability thresholds",
    "Moderate-to-severe dry eye not controlled pre-operatively"
  ],
  "health-checkup-china": [
    "Patients currently experiencing acute emergency symptoms",
    "Patients requiring urgent in-country treatment instead of screening",
    "Travelers unable to complete follow-up for incidental findings"
  ],
  "cosmetic-surgery-china": [
    "Patients with unrealistic outcome expectations",
    "High anesthesia risk without formal clearance",
    "Patients unable to allocate adequate post-op recovery window"
  ]
};

const trackedProcedureSlugs: Procedure["slug"][] = [
  "dental-implants-china",
  "all-on-4-china",
  "veneers-china",
  "root-canal-china",
  "lasik-china",
  "health-checkup-china",
  "cosmetic-surgery-china"
];

export const procedureTrustProfiles: ProcedureTrustProfile[] = trackedProcedureSlugs.map((slug) => ({
  procedureSlug: slug,
  chinaTravelNotRecommended: chinaTravelNotRecommendedByProcedure[slug],
  ...defaultTrustProfile
}));

function getReviewer(post: BlogPost) {
  if (post.category === "lasik") {
    return {
      name: "Dr. Samuel Reed",
      title: "Clinical Content Reviewer (Ophthalmology)",
      reviewDate: post.dateUpdated
    };
  }

  if (post.category === "visa-travel") {
    return {
      name: "Nora Ellis",
      title: "Medical Travel Compliance Editor",
      reviewDate: post.dateUpdated
    };
  }

  return {
    name: "Dr. Hannah Mitchell",
    title: "Clinical Content Reviewer (Dental & General)",
    reviewDate: post.dateUpdated
  };
}

export const blogTrustProfiles: BlogTrustProfile[] = blogPosts.map((post) => ({
  postSlug: post.slug,
  medicalReviewer: getReviewer(post),
  disclosure:
    "This article is educational and does not substitute individualized diagnosis. Pricing and timeline examples are indicative and may vary by medical complexity."
}));

export const siteTrustStatements = {
  testimonialPolicy:
    "Patient stories are published only with consent and verification evidence. If any incentive is provided, it is explicitly disclosed beside the testimonial.",
  privacySummary:
    "We collect only the minimum required information for treatment matching and logistics. Data is access-controlled, retention-limited, and never sold.",
  dataHandling: [
    "Purpose: case evaluation, appointment coordination, and patient communication",
    "Retention: inquiry data is retained for up to 24 months unless deletion is requested",
    "Cross-border transfer: data may be shared with selected providers strictly for treatment coordination"
  ],
  contentReviewPolicy:
    "Medical pages are reviewed by a qualified clinical reviewer and show the latest review date.",
  legalDisclaimer:
    "DentalTripChina.com is a coordination service. Final diagnosis and treatment decisions are made by licensed medical professionals.",
  incentiveDisclosurePolicy:
    "Testimonials are labeled as verified or unverified. Any voucher, fee reduction, or service benefit is disclosed on the testimonial card."
};
