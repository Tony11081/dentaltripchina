import { Procedure } from "@/lib/types";

export const procedures: Procedure[] = [
  {
    slug: "dental-implants-china",
    title: "Dental Implants in China",
    heroHeadline: "Dental Implants in China at Trusted Hospitals",
    excerpt: "Compare implant costs and treatment plans across leading providers in Shanghai and Beijing.",
    body: [
      "Dental implant treatment in China can reduce total patient cost substantially while maintaining modern clinical standards.",
      "Most international implant plans are staged: Stage 1 includes diagnostics and implant placement in China, followed by a healing period before final crown fitting.",
      "We coordinate provider matching, timeline planning, and post-treatment communication with English-speaking staff so patients know exactly what is and is not completed in one trip."
    ],
    timelineDisclosure: {
      title: "Critical Timeline Disclosure: Implant Treatment Is Multi-Stage",
      points: [
        "Stage 1 in China: diagnostics + implant placement, usually completed in 3-5 in-country days for suitable cases.",
        "Osseointegration phase: typically 3-6 months healing before final restorative loading.",
        "Stage 2: final crown or definitive restoration after healing clearance (in China or with pre-agreed local continuity pathway)."
      ],
      note: "A 3-5 day stay normally covers the initial surgical phase, not the full biological completion timeline."
    },
    schemaType: "MedicalProcedure",
    prices: { chinaUsd: 1200, usUsd: 4200, ukUsd: 3600, auUsd: 3900 },
    savingsPct: 71,
    durationDays: "3-5 days (Stage 1) + 3-6 months healing before final crown",
    timeComparison: {
      china: {
        appointmentWait: "Negligible (typically 24-72 hours)",
        treatmentTime: "Stage 1 in 3-5 days, final restoration after 3-6 months healing"
      },
      unitedStates: {
        appointmentWait: "2-6 weeks",
        treatmentTime: "2-4 visits over 3-6 months"
      },
      unitedKingdom: {
        appointmentWait: "4-10 weeks",
        treatmentTime: "2-4 visits over 3-6 months"
      },
      australia: {
        appointmentWait: "3-8 weeks",
        treatmentTime: "2-4 visits over 3-6 months"
      }
    },
    servicePackage: "Dental Basic - $499",
    partnerHospitalSlugs: ["jiahui-international-hospital", "beijing-united-family-hospital"],
    faqs: [
      {
        question: "How many days should I stay in China for implants?",
        answer: "Most first-stage treatment (diagnostics + implant placement) can be completed in 3-5 days, but final crown timing usually follows 3-6 months of healing."
      },
      {
        question: "Can implant treatment be fully completed in one short trip?",
        answer: "Usually no for definitive completion. One trip often covers surgery stage, while final restorative loading follows healing and case-specific review."
      },
      {
        question: "Can I get an estimate before traveling?",
        answer: "Yes. Share your dental records or a brief case summary and receive a preliminary estimate within two hours."
      }
    ]
  },
  {
    slug: "all-on-4-china",
    title: "All-on-4 Full Mouth in China",
    heroHeadline: "All-on-4 Full Mouth Reconstruction in China",
    excerpt: "Get full-arch restoration options with transparent package pricing.",
    body: [
      "All-on-4 treatment bundles surgery, prosthetics, and follow-up into a single plan.",
      "We compare provider options and timeline feasibility before you book travel."
    ],
    schemaType: "SurgicalProcedure",
    prices: { chinaUsd: 8500, usUsd: 28000, ukUsd: 23000, auUsd: 25000 },
    savingsPct: 70,
    durationDays: "5-7 days",
    timeComparison: {
      china: {
        appointmentWait: "Negligible (typically 24-72 hours)",
        treatmentTime: "5-7 days for surgery stage"
      },
      unitedStates: {
        appointmentWait: "3-8 weeks",
        treatmentTime: "Surgery + final restoration over 3-6 months"
      },
      unitedKingdom: {
        appointmentWait: "5-12 weeks",
        treatmentTime: "Surgery + final restoration over 3-6 months"
      },
      australia: {
        appointmentWait: "4-10 weeks",
        treatmentTime: "Surgery + final restoration over 3-6 months"
      }
    },
    servicePackage: "All-on-4 Plan - from $2,200",
    partnerHospitalSlugs: ["jiahui-international-hospital"],
    faqs: [
      {
        question: "Is All-on-4 completed in one trip?",
        answer: "Initial placement is usually one trip, while final prosthetic timing depends on healing and clinical protocol."
      },
      {
        question: "Do hospitals support English-speaking patients?",
        answer: "Yes. We prioritize providers with international departments and English-capable coordinators."
      }
    ]
  },
  {
    slug: "veneers-china",
    title: "Dental Veneers in China",
    heroHeadline: "High-Quality Veneers in China",
    excerpt: "Natural-look cosmetic veneer options with fast turnaround.",
    body: [
      "Veneer treatment is often suitable for shape, shade, and smile-line improvements.",
      "Our team coordinates consultation prep and expected treatment milestones."
    ],
    schemaType: "MedicalProcedure",
    prices: { chinaUsd: 250, usUsd: 1200, ukUsd: 1000, auUsd: 1100 },
    savingsPct: 75,
    durationDays: "2-4 days",
    timeComparison: {
      china: {
        appointmentWait: "Negligible (typically 24-72 hours)",
        treatmentTime: "2-4 days"
      },
      unitedStates: {
        appointmentWait: "1-4 weeks",
        treatmentTime: "2-3 visits over 1-3 weeks"
      },
      unitedKingdom: {
        appointmentWait: "2-6 weeks",
        treatmentTime: "2-3 visits over 1-3 weeks"
      },
      australia: {
        appointmentWait: "2-6 weeks",
        treatmentTime: "2-3 visits over 1-3 weeks"
      }
    },
    servicePackage: "Smile Veneer Package - from $699",
    partnerHospitalSlugs: ["jiahui-international-hospital"],
    faqs: [
      {
        question: "How many visits are needed for veneers?",
        answer: "Most cases require two to three visits within one short stay."
      },
      {
        question: "Are temporary veneers provided?",
        answer: "Yes, depending on case design and lab turnaround."
      }
    ]
  },
  {
    slug: "root-canal-china",
    title: "Root Canal Treatment in China",
    heroHeadline: "Root Canal in China with Modern Endodontic Care",
    excerpt: "Rapid pain-relief treatment options at international-standard clinics.",
    body: [
      "Root canal treatment targets infection while preserving the natural tooth.",
      "We help you compare urgency appointments and specialist availability."
    ],
    schemaType: "MedicalProcedure",
    prices: { chinaUsd: 200, usUsd: 1300, ukUsd: 950, auUsd: 1000 },
    savingsPct: 79,
    durationDays: "1-2 days",
    timeComparison: {
      china: {
        appointmentWait: "Negligible (typically same-day to 48 hours)",
        treatmentTime: "1-2 days"
      },
      unitedStates: {
        appointmentWait: "3-14 days",
        treatmentTime: "1-2 visits over 1-7 days"
      },
      unitedKingdom: {
        appointmentWait: "1-4 weeks",
        treatmentTime: "1-2 visits over 1-14 days"
      },
      australia: {
        appointmentWait: "1-3 weeks",
        treatmentTime: "1-2 visits over 1-14 days"
      }
    },
    servicePackage: "Urgent Endodontic Care - from $299",
    partnerHospitalSlugs: ["jiahui-international-hospital", "beijing-united-family-hospital"],
    faqs: [
      {
        question: "Can I fly right after root canal treatment?",
        answer: "In many cases yes, though final advice depends on pain level and whether additional restoration is needed."
      },
      {
        question: "Is crown placement included?",
        answer: "Crown is usually quoted separately and can be coordinated as part of your treatment plan."
      }
    ]
  },
  {
    slug: "lasik-china",
    title: "LASIK Eye Surgery in China",
    heroHeadline: "LASIK in China at Leading Eye Centers",
    excerpt: "Refractive surgery options with pre-op evaluation and post-op protocol.",
    body: [
      "LASIK candidates require initial diagnostics before procedure confirmation.",
      "We coordinate surgery window planning and travel timing based on recovery guidance."
    ],
    schemaType: "SurgicalProcedure",
    prices: { chinaUsd: 1500, usUsd: 4500, ukUsd: 3900, auUsd: 4100 },
    savingsPct: 66,
    durationDays: "2-3 days",
    timeComparison: {
      china: {
        appointmentWait: "Negligible (typically 24-72 hours)",
        treatmentTime: "2-3 days including post-op check"
      },
      unitedStates: {
        appointmentWait: "1-4 weeks",
        treatmentTime: "Procedure + follow-up over 1-2 weeks"
      },
      unitedKingdom: {
        appointmentWait: "2-6 weeks",
        treatmentTime: "Procedure + follow-up over 1-2 weeks"
      },
      australia: {
        appointmentWait: "2-5 weeks",
        treatmentTime: "Procedure + follow-up over 1-2 weeks"
      }
    },
    servicePackage: "LASIK Evaluation + Procedure Plan",
    partnerHospitalSlugs: ["tongren-eye-center", "beijing-united-family-hospital"],
    faqs: [
      {
        question: "How long before I can travel after LASIK?",
        answer: "Most patients can travel shortly after follow-up clearance, usually within one to two days."
      },
      {
        question: "Can high myopia cases still be treated?",
        answer: "Potentially, but final suitability depends on corneal thickness and diagnostic results."
      }
    ]
  },
  {
    slug: "health-checkup-china",
    title: "Comprehensive Health Checkup in China",
    heroHeadline: "Executive Health Checkups in China",
    excerpt: "Comprehensive preventive screening packages with English reports.",
    body: [
      "Health checkup packages can include blood panels, imaging, and specialist review.",
      "We align package scope to age, risk profile, and your available trip duration."
    ],
    schemaType: "MedicalProcedure",
    prices: { chinaUsd: 450, usUsd: 2400, ukUsd: 1700, auUsd: 1850 },
    savingsPct: 74,
    durationDays: "1-2 days",
    timeComparison: {
      china: {
        appointmentWait: "Negligible (typically 24-72 hours)",
        treatmentTime: "1-2 days"
      },
      unitedStates: {
        appointmentWait: "1-6 weeks",
        treatmentTime: "1-2 days"
      },
      unitedKingdom: {
        appointmentWait: "2-8 weeks",
        treatmentTime: "1-2 days"
      },
      australia: {
        appointmentWait: "2-6 weeks",
        treatmentTime: "1-2 days"
      }
    },
    servicePackage: "Executive Screening Pack - from $399",
    partnerHospitalSlugs: ["jiahui-international-hospital", "beijing-united-family-hospital"],
    faqs: [
      {
        question: "Will I receive results in English?",
        answer: "Yes, providers selected for international patients typically provide English summary reports."
      },
      {
        question: "Can package items be customized?",
        answer: "Yes, optional modules can be added based on your risk factors and goals."
      }
    ]
  },
  {
    slug: "cosmetic-surgery-china",
    title: "Cosmetic Surgery in China",
    heroHeadline: "Cosmetic Surgery Options in China",
    excerpt: "Personalized cosmetic procedure planning with clear pricing and recovery guidance.",
    body: [
      "Cosmetic treatment planning requires clear goals, candidacy screening, and recovery alignment.",
      "We support provider comparison and travel planning for international patients."
    ],
    schemaType: "SurgicalProcedure",
    prices: { chinaUsd: 2800, usUsd: 9800, ukUsd: 8200, auUsd: 8700 },
    savingsPct: 71,
    durationDays: "4-7 days",
    timeComparison: {
      china: {
        appointmentWait: "Negligible (typically 24-72 hours)",
        treatmentTime: "4-7 days for surgery and early recovery"
      },
      unitedStates: {
        appointmentWait: "4-12 weeks",
        treatmentTime: "Procedure + follow-up over 2-6 weeks"
      },
      unitedKingdom: {
        appointmentWait: "6-16 weeks",
        treatmentTime: "Procedure + follow-up over 2-6 weeks"
      },
      australia: {
        appointmentWait: "4-12 weeks",
        treatmentTime: "Procedure + follow-up over 2-6 weeks"
      }
    },
    servicePackage: "Cosmetic Consultation + Procedure Plan",
    partnerHospitalSlugs: ["beijing-united-family-hospital"],
    faqs: [
      {
        question: "How do I know which clinic is right for my case?",
        answer: "We shortlist providers by procedure focus, patient profile, and communication capability."
      },
      {
        question: "Is post-op follow-up available remotely?",
        answer: "Yes, remote follow-up can be coordinated after you return home."
      }
    ]
  }
];
