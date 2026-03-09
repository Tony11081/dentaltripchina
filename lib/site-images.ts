import type { BlogPost } from "./types";

export type SiteImageAspect = "4:3" | "3:4";
export type SiteImageQuality = "normal" | "2k";

export interface SiteImageAsset {
  id: string;
  src: string;
  alt: string;
  prompt: string;
  aspect: SiteImageAspect;
  quality: SiteImageQuality;
}

const editorialBase = [
  "Premium editorial illustration for a medical-travel website.",
  "Soft sage green, ivory, muted blue-gray, and restrained sand accents.",
  "Calm, trustworthy, polished, non-graphic, no gore, no watermarks.",
  "Use icons, silhouettes, architecture, objects, and blank information shapes instead of interface UI.",
  "Absolutely no readable text anywhere: no words, letters, numbers, labels, captions, signage, paperwork text, screen text, logos, or badges."
].join(" ");

const portraitBase = [
  "Premium editorial portrait illustration.",
  "Soft sage green, ivory, muted blue-gray palette with subtle warm accents.",
  "Professional, credible, understated, non-photoreal but human and trustworthy.",
  "Absolutely no readable text, no logos, no watermarks, and no background signage.",
  "Do not include certificates, eye charts, paperwork, book covers, nameplates, ID badges, screens, or printed documents with marks that resemble text."
].join(" ");

function buildPrompt(core: string, variant: "editorial" | "portrait" = "editorial") {
  return `${core} ${variant === "portrait" ? portraitBase : editorialBase}`;
}

export const pageImageAssets = {
  homeHero: {
    id: "page-home-hero",
    src: "/generated/pages/home-hero.webp",
    alt: "Editorial illustration of a patient planning medical travel in China",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a flagship homepage scene showing an international patient planning treatment in China with a calm consultation desk, hospital shortlist folders, travel cues, and cost-planning icons arranged in a clean icon-only composition."
    )
  },
  aboutHero: {
    id: "page-about-hero",
    src: "/generated/pages/about-hero.webp",
    alt: "Editorial illustration about transparent medical travel coordination",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a premium coordination scene showing a transparent medical-travel operations desk, compliance folder, provider shortlist, and patient support notes with no dramatic treatment imagery."
    )
  },
  howItWorksHero: {
    id: "page-how-it-works-hero",
    src: "/generated/pages/how-it-works-hero.webp",
    alt: "Editorial illustration of a four-step medical travel process",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create an icon-led process illustration for a four-step medical travel flow with connected milestones for inquiry, provider options, plan confirmation, treatment travel, and follow-up. Use arrows, cards, calendar cues, and hospital icons only."
    )
  },
  travelSupportHero: {
    id: "page-travel-support-hero",
    src: "/generated/pages/travel-support-hero.webp",
    alt: "Editorial illustration of treatment-first travel support in China",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a calm travel-support scene for medical visitors showing airport pickup coordination, a recovery-friendly stay plan, appointment calendar cues, and a secure document folder."
    )
  },
  hotelsHero: {
    id: "page-hotels-hero",
    src: "/generated/pages/hotels-hero.webp",
    alt: "Editorial illustration of a recovery-friendly hotel stay",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a quiet recovery-hotel scene with a restful room, blackout curtains, luggage, accessible circulation, and subtle hospital-transfer cues for a medical traveler."
    )
  },
  transportHero: {
    id: "page-transport-hero",
    src: "/generated/pages/transport-hero.webp",
    alt: "Editorial illustration of airport and hospital transfer coordination",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a reliable airport-transfer scene showing arrival, luggage handling, a coordinated car route, and a hospital drop-off plan in a polished service style."
    )
  },
  visaHero: {
    id: "page-visa-hero",
    src: "/generated/pages/visa-hero.webp",
    alt: "Editorial illustration of travel documents and medical trip preparation",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a documentation-focused scene with a passport-shaped object, secure travel folder, checklist symbols, and itinerary cues for medical trip preparation, without official seals or document text."
    )
  },
  testimonialsHero: {
    id: "page-testimonials-hero",
    src: "/generated/pages/testimonials-hero.webp",
    alt: "Editorial illustration of verified patient stories and milestones",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a privacy-safe social-proof scene using anonymous patient journey symbols, trust markers, milestone steps, and quote-card shapes without any identifiable faces or readable words."
    )
  },
  hospitalsHero: {
    id: "page-hospitals-hero",
    src: "/generated/pages/hospitals-hero.webp",
    alt: "Editorial illustration comparing trusted hospitals in Shanghai and Beijing",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a premium hospital-comparison scene with two elegant healthcare campuses, international reception cues, and institutional trust symbols for Shanghai and Beijing."
    )
  },
  contactHero: {
    id: "page-contact-hero",
    src: "/generated/pages/contact-hero.webp",
    alt: "Editorial illustration of responsive medical travel communication channels",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a communication-hub scene showing email, messaging, patient notes, uploaded records, and planning folders in a trustworthy medical coordination environment."
    )
  },
  pricingHero: {
    id: "page-pricing-hero",
    src: "/generated/pages/pricing-hero.webp",
    alt: "Editorial illustration of transparent treatment budgeting and price comparison",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a budgeting scene for treatment planning with unlabeled comparison bars, coins, stacked cost blocks, a calendar, and travel-cost icons arranged as a premium price-transparency visual."
    )
  },
  trustCenterHero: {
    id: "page-trust-center-hero",
    src: "/generated/pages/trust-center-hero.webp",
    alt: "Editorial illustration of a healthcare trust center",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a trust-center overview scene combining doctor verification, hospital credentials, privacy handling, pricing clarity, and post-operative support pathways in one coherent composition."
    )
  },
  verificationBanner: {
    id: "page-verification-banner",
    src: "/generated/pages/verification-banner.webp",
    alt: "Editorial illustration of credential verification and registry checks",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a verification-focused scene with credential folders, registry-check icons, official-stamp shapes, verified markers, and structured evidence blocks, without any readable seals or text."
    )
  },
  trustDashboardBanner: {
    id: "page-trust-dashboard-banner",
    src: "/generated/pages/trust-dashboard-banner.webp",
    alt: "Editorial illustration of transparency metrics and quality scorecards",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a trust-dashboard scene with unlabeled metrics, response-time charts, quality scorecards, and monitoring widgets shown as clean abstract information panels."
    )
  },
  costCalculatorBanner: {
    id: "page-cost-calculator-banner",
    src: "/generated/pages/cost-calculator-banner.webp",
    alt: "Editorial illustration of low, median, and high budget planning",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a cost-calculator scene with three-tier budget blocks, treatment icons, hotel and flight symbols, and contingency cues arranged as a clear planning visual without labels."
    )
  },
  eligibilityBanner: {
    id: "page-eligibility-banner",
    src: "/generated/pages/eligibility-banner.webp",
    alt: "Editorial illustration of pre-travel eligibility screening",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create an eligibility-screening scene with a medical checklist, safety filter icons, physician-review symbols, and travel-readiness cues in a responsible, reassuring tone."
    )
  },
  careSlaBanner: {
    id: "page-care-sla-banner",
    src: "/generated/pages/care-sla-banner.webp",
    alt: "Editorial illustration of post-operative support workflow and response commitments",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a post-operative support workflow scene with escalation steps, timing indicators, caregiver support icons, and a calm protective-shield motif."
    )
  },
  caseStudiesBanner: {
    id: "page-case-studies-banner",
    src: "/generated/pages/case-studies-banner.webp",
    alt: "Editorial illustration of real case timelines and treatment dossiers",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a documentary-style case-center scene with anonymized patient-pathway folders, milestone steps, travel planning items, and spend-tracking symbols."
    )
  },
  blogBanner: {
    id: "page-blog-banner",
    src: "/generated/pages/blog-banner.webp",
    alt: "Editorial illustration of a medical travel article hub",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create an editorial content-hub scene with grouped article sheets, topic clusters, planning notebooks, and category icons for procedure, country, budget, and timeline."
    )
  },
  authorsBanner: {
    id: "page-authors-banner",
    src: "/generated/pages/authors-banner.webp",
    alt: "Editorial illustration of a medical content review team and review workflow",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create an editorial review-studio scene with blank article layouts, clinical review notes, magnifier tools, evidence folders, and workflow arrows for a medical content team."
    )
  }
} as const satisfies Record<string, SiteImageAsset>;

export const hospitalImageAssets = {
  "jiahui-international-hospital": {
    id: "hospital-jiahui",
    src: "/generated/hospitals/jiahui-international-hospital.webp",
    alt: "Editorial illustration of Jiahui International Hospital campus and reception",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create an architectural healthcare scene for Jiahui International Hospital in Shanghai with a modern campus exterior, international reception cues, and warm daylight. No building signage."
    )
  },
  "beijing-united-family-hospital": {
    id: "hospital-bufh",
    src: "/generated/hospitals/beijing-united-family-hospital.webp",
    alt: "Editorial illustration of Beijing United Family Hospital exterior and outpatient arrival",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create an architectural healthcare scene for Beijing United Family Hospital with a polished entrance, outpatient arrival flow, and international-service atmosphere. No readable signage."
    )
  },
  "tongren-eye-center": {
    id: "hospital-tongren-eye",
    src: "/generated/hospitals/tongren-eye-center.webp",
    alt: "Editorial illustration of Beijing Tongren Eye Center diagnostics environment",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create an ophthalmology-focused hospital scene for Tongren Eye Center with diagnostic instruments, a clean specialist environment, and calm patient-intake cues. No readable signage."
    )
  }
} as const satisfies Record<string, SiteImageAsset>;

export const procedureImageAssets = {
  "dental-implants-china": {
    id: "procedure-dental-implants",
    src: "/generated/procedures/dental-implants-china.webp",
    alt: "Editorial illustration of dental implant planning in China",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a calm dental-implant planning scene with consultation tools, implant-model icons, CBCT-inspired geometry, and travel-planning cues, without showing surgery or blood."
    )
  },
  "all-on-4-china": {
    id: "procedure-all-on-4",
    src: "/generated/procedures/all-on-4-china.webp",
    alt: "Editorial illustration of full-mouth reconstruction planning in China",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a full-mouth reconstruction planning scene with prosthetic arch symbols, consultation models, restorative workflow objects, and a premium cross-border care atmosphere."
    )
  },
  "veneers-china": {
    id: "procedure-veneers",
    src: "/generated/procedures/veneers-china.webp",
    alt: "Editorial illustration of veneer treatment design planning",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a cosmetic-dentistry planning scene with smile-design tools, shade and contour cues, consultation objects, and elegant patient-journey symbols in a refined tone."
    )
  },
  "root-canal-china": {
    id: "procedure-root-canal",
    src: "/generated/procedures/root-canal-china.webp",
    alt: "Editorial illustration of urgent endodontic care planning",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create an endodontic care planning scene with tooth-preservation symbols, specialist instruments shown abstractly, pain-relief cues, and a fast but calm clinical pathway."
    )
  },
  "lasik-china": {
    id: "procedure-lasik",
    src: "/generated/procedures/lasik-china.webp",
    alt: "Editorial illustration of LASIK evaluation and treatment planning",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a refractive-surgery planning scene with corneal-mapping inspired rings, eye-diagnostic equipment silhouettes, specialist consultation cues, and short-stay travel symbols."
    )
  },
  "health-checkup-china": {
    id: "procedure-health-checkup",
    src: "/generated/procedures/health-checkup-china.webp",
    alt: "Editorial illustration of executive health checkup planning",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a preventive screening scene with diagnostic symbols, wellness checkup objects, report-folder shapes, and a calm executive health-planning atmosphere."
    )
  },
  "cosmetic-surgery-china": {
    id: "procedure-cosmetic-surgery",
    src: "/generated/procedures/cosmetic-surgery-china.webp",
    alt: "Editorial illustration of cosmetic procedure planning in China",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a tasteful cosmetic-procedure planning scene with consultation silhouettes, refinement and recovery cues, clinic objects, and premium privacy-safe styling. No surgery-in-progress."
    )
  }
} as const satisfies Record<string, SiteImageAsset>;

export const cityGuideImageAssets = {
  "medical-tourism-shanghai": {
    id: "city-shanghai",
    src: "/generated/cities/medical-tourism-shanghai.webp",
    alt: "Editorial illustration of medical travel in Shanghai",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a city-guide scene for Shanghai medical travel with a recognizable skyline silhouette, hospital access cues, hotel stay planning, airport transfer symbols, and treatment itinerary objects."
    )
  },
  "medical-tourism-beijing": {
    id: "city-beijing",
    src: "/generated/cities/medical-tourism-beijing.webp",
    alt: "Editorial illustration of medical travel in Beijing",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a city-guide scene for Beijing medical travel with a recognizable skyline silhouette, specialist hospital cues, structured transport planning, and treatment-itinerary objects."
    )
  }
} as const satisfies Record<string, SiteImageAsset>;

export const caseStudyImageAssets = {
  "uk-implant-bone-graft-sequenced-care": {
    id: "case-uk-implant-bone-graft",
    src: "/generated/case-studies/uk-implant-bone-graft-sequenced-care.webp",
    alt: "Editorial illustration of a staged dental implant case journey in Shanghai",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a privacy-safe case-study scene for a UK patient dental-implant journey in Shanghai, showing staged milestones, diagnostics, healing progression, travel notes, and cost tracking symbols."
    )
  },
  "au-lasik-dry-eye-managed": {
    id: "case-au-lasik-dry-eye",
    src: "/generated/case-studies/au-lasik-dry-eye-managed.webp",
    alt: "Editorial illustration of a LASIK case with early dry-eye management",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a privacy-safe ophthalmology case-study scene showing LASIK milestones, diagnostic review, symptom monitoring, and follow-up support for an Australian patient in Beijing."
    )
  },
  "ca-health-checkup-incidental-findings": {
    id: "case-ca-health-checkup",
    src: "/generated/case-studies/ca-health-checkup-incidental-findings.webp",
    alt: "Editorial illustration of a health checkup case with follow-up findings review",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a privacy-safe case-study scene for a Canadian executive health checkup, showing screening milestones, incidental-findings review, report handoff, and continuity planning."
    )
  },
  "uk-all-on-4-swelling-escalation": {
    id: "case-uk-all-on-4-swelling",
    src: "/generated/case-studies/uk-all-on-4-swelling-escalation.webp",
    alt: "Editorial illustration of an All-on-4 case with escalation support",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a privacy-safe full-mouth reconstruction case-study scene showing surgery milestones, alert escalation, surgeon review, and monitored recovery for a UK patient in Beijing."
    )
  }
} as const satisfies Record<string, SiteImageAsset>;

export const authorPortraitAssets = {
  "dr-emily-carter": {
    id: "author-dr-emily-carter",
    src: "/generated/authors/dr-emily-carter.webp",
    alt: "Editorial portrait of Dr. Emily Carter",
    aspect: "3:4",
    quality: "normal",
    prompt: buildPrompt(
      "Create a waist-up editorial portrait of Dr. Emily Carter, a dental clinical content lead, in a calm professional setting with understated medical and editorial cues.",
      "portrait"
    )
  },
  "dr-james-walker": {
    id: "author-dr-james-walker",
    src: "/generated/authors/dr-james-walker.webp",
    alt: "Editorial portrait of Dr. James Walker",
    aspect: "3:4",
    quality: "normal",
    prompt: buildPrompt(
      "Create a waist-up editorial portrait of Dr. James Walker, an ophthalmology reviewer, with specialist poise, calm expression, soft optical-instrument silhouettes in the background, and no handheld objects or desktop props.",
      "portrait"
    )
  },
  "nora-ellis": {
    id: "author-nora-ellis",
    src: "/generated/authors/nora-ellis.webp",
    alt: "Editorial portrait of Nora Ellis",
    aspect: "3:4",
    quality: "normal",
    prompt: buildPrompt(
      "Create a waist-up editorial portrait of Nora Ellis, a medical travel compliance editor, in a composed professional environment with subtle governance and policy-review cues.",
      "portrait"
    )
  },
  "olivia-bennett": {
    id: "author-olivia-bennett",
    src: "/generated/authors/olivia-bennett.webp",
    alt: "Editorial portrait of Olivia Bennett",
    aspect: "3:4",
    quality: "normal",
    prompt: buildPrompt(
      "Create a waist-up editorial portrait of Olivia Bennett, a patient journey editor, in a warm and professional setting with subtle planning and care-coordination cues.",
      "portrait"
    )
  }
} as const satisfies Record<string, SiteImageAsset>;

export const generatedSiteImageAssets: SiteImageAsset[] = [
  ...Object.values(pageImageAssets),
  ...Object.values(hospitalImageAssets),
  ...Object.values(procedureImageAssets),
  ...Object.values(cityGuideImageAssets),
  ...Object.values(caseStudyImageAssets),
  ...Object.values(authorPortraitAssets)
];

export function getBlogCategoryImage(slug: string): SiteImageAsset {
  const mapping: Record<string, SiteImageAsset> = {
    "cost-comparisons": pageImageAssets.pricingHero,
    "patient-planning": pageImageAssets.caseStudiesBanner,
    dental: procedureImageAssets["dental-implants-china"],
    lasik: procedureImageAssets["lasik-china"],
    "health-checkup": procedureImageAssets["health-checkup-china"],
    cosmetic: procedureImageAssets["cosmetic-surgery-china"],
    "visa-travel": pageImageAssets.visaHero
  };

  return mapping[slug] || pageImageAssets.blogBanner;
}

export function getBlogPostImage(post: Pick<BlogPost, "slug" | "category" | "relatedProcedureSlug">): SiteImageAsset {
  if (post.relatedProcedureSlug && post.relatedProcedureSlug in procedureImageAssets) {
    return procedureImageAssets[post.relatedProcedureSlug as keyof typeof procedureImageAssets];
  }

  if (post.slug === "china-visa-free-medical-tourism-what-to-prepare") {
    return pageImageAssets.visaHero;
  }

  return getBlogCategoryImage(post.category);
}

export function getHospitalImage(slug: string): SiteImageAsset {
  return hospitalImageAssets[slug as keyof typeof hospitalImageAssets] || pageImageAssets.hospitalsHero;
}

export function getProcedureImage(slug: string): SiteImageAsset {
  return procedureImageAssets[slug as keyof typeof procedureImageAssets] || pageImageAssets.homeHero;
}

export function getCityGuideImage(slug: string): SiteImageAsset {
  return cityGuideImageAssets[slug as keyof typeof cityGuideImageAssets] || pageImageAssets.travelSupportHero;
}

export function getCaseStudyImage(slug: string): SiteImageAsset {
  return caseStudyImageAssets[slug as keyof typeof caseStudyImageAssets] || pageImageAssets.caseStudiesBanner;
}

export function getAuthorPortrait(slug: string): SiteImageAsset {
  return authorPortraitAssets[slug as keyof typeof authorPortraitAssets] || authorPortraitAssets["olivia-bennett"];
}
