export type HospitalCity = "shanghai" | "beijing";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ProcedureTimeComparison {
  china: {
    appointmentWait: string;
    treatmentTime: string;
  };
  unitedStates: {
    appointmentWait: string;
    treatmentTime: string;
  };
  unitedKingdom: {
    appointmentWait: string;
    treatmentTime: string;
  };
  australia: {
    appointmentWait: string;
    treatmentTime: string;
  };
}

export interface Procedure {
  slug: string;
  title: string;
  heroHeadline: string;
  excerpt: string;
  body: string[];
  timelineDisclosure?: {
    title: string;
    points: string[];
    note?: string;
  };
  schemaType: "MedicalProcedure" | "SurgicalProcedure";
  prices: {
    chinaUsd: number;
    usUsd: number;
    ukUsd: number;
    auUsd?: number;
  };
  savingsPct: number;
  durationDays: string;
  timeComparison: ProcedureTimeComparison;
  servicePackage: string;
  partnerHospitalSlugs: string[];
  faqs: FaqItem[];
}

export interface Hospital {
  slug: string;
  name: string;
  city: HospitalCity;
  jciYear: number;
  jciVerifyUrl: string;
  specialties: string[];
  address: string;
  phone?: string;
  website?: string;
  internationalDept: boolean;
  englishStaff: boolean;
  keyStat: string;
  lat: number;
  lng: number;
  summary: string;
  heroImageSrc: string;
  heroImageAlt: string;
  overview: string[];
  departmentHighlights: Array<{
    name: string;
    description: string;
  }>;
  paymentMethods: string[];
  internationalPatientNotes: string[];
}

export interface CityGuide {
  slug: string;
  city: "Shanghai" | "Beijing";
  title: string;
  summary: string;
  sections: string[];
  transportGuide: string[];
  stayAreas: Array<{
    area: string;
    description: string;
    typicalNightlyUsd: string;
  }>;
  entryTips: string[];
  faqs: FaqItem[];
}

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  excerpt: string;
  content: string[];
  datePublished: string;
  dateUpdated: string;
  authorName: string;
  coverImage?: string;
  authorSlug?: string;
  countryFocus?: string;
  budgetFocus?: string;
  timelineFocus?: string;
  relatedProcedureSlug?: string;
  relatedCaseSlug?: CaseStudy["slug"];
}

export interface BlogAuthor {
  slug: string;
  name: string;
  title: string;
  credentials: string[];
  specialties: string[];
  profile: string;
  reviewMethod: string;
  lastProfileReview: string;
}

export interface CaseTimelineItem {
  day: string;
  event: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  procedureSlug: Procedure["slug"];
  country: string;
  city: "Shanghai" | "Beijing";
  patientContext: string;
  proposedPlan: string[];
  timeline: CaseTimelineItem[];
  costBreakdown: {
    treatmentUsd: number;
    flightHotelUsd: number;
    followUpUsd: number;
    extraUsd: number;
  };
  outcome: string;
  followUp: string[];
  complication: {
    occurred: boolean;
    summary?: string;
    action?: string[];
  };
  testimonial: {
    quote: string;
    verified: boolean;
    incentiveDisclosure: string;
  };
}

export interface MonthlyTrustMetric {
  month: string;
  medianFirstResponseMinutes: number;
  appointmentFulfillmentPct: number;
  complaintResolutionHours: number;
  followUpCompletionPct: number;
}

export interface MarketLandingPage {
  slug: string;
  countryCode: string;
  countryName: string;
  procedureSlug: Procedure["slug"];
  title: string;
  heroTitle: string;
  heroDescription: string;
  metaDescription: string;
  shortAnswer: string;
  marketContext: string;
  collectionSummary: string;
  comparatorLabel: string;
  homeMarketReferenceNote?: string;
  homeMarketPriceUsd: number;
  homeMarketAppointmentWait: string;
  homeMarketTreatmentTime: string;
  chinaPriceUsd: number;
  chinaAppointmentWait: string;
  chinaTreatmentTime: string;
  planningChecklist: string[];
  whyPatientsConsiderChina: string[];
  faqItems: FaqItem[];
}
