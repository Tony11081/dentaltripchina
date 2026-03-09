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

const photoBase = [
  "Premium website photography for a medical-travel website.",
  "Photorealistic editorial photo with natural light, premium interiors, credible healthcare and hospitality environments, and restrained sage, ivory, and blue-gray tones.",
  "Calm, trustworthy, polished, non-graphic, no gore, no watermarks.",
  "Prefer real people, real architecture, and real objects instead of diagrams, UI mockups, or infographics.",
  "Absolutely no readable text anywhere: no words, letters, numbers, labels, captions, signage, paperwork text, screen text, logos, badges, passports, certificates, or document close-ups.",
  "Do not include visible monitors, kiosks, dashboards, nameplates, plaques, certificates, airport boards, TV screens, or printed documents in the shot."
].join(" ");

function buildPrompt(core: string, variant: "editorial" | "portrait" | "photo" = "editorial") {
  if (variant === "portrait") return `${core} ${portraitBase}`;
  if (variant === "photo") return `${core} ${photoBase}`;
  return `${core} ${editorialBase}`;
}

export const pageImageAssets = {
  homeHero: {
    id: "page-home-hero",
    src: "/generated/pages/home-hero.webp",
    alt: "Photorealistic scene of an international patient planning medical travel in China",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a flagship homepage scene showing an international patient in a premium consultation lounge planning treatment in China with a coordinator, subtle hospital-shortlist materials, travel cues, and a calm high-trust atmosphere. Keep objects generic and text-free.",
      "photo"
    )
  },
  aboutHero: {
    id: "page-about-hero",
    src: "/generated/pages/about-hero.webp",
    alt: "Photorealistic scene of transparent medical travel coordination",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a realistic coordination-office scene showing a premium medical-travel team reviewing provider options, patient support materials, and compliance folders in a bright professional workspace, with no visible text.",
      "photo"
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
    alt: "Photorealistic scene of treatment-first travel support in China",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a realistic medical-travel support scene with a concierge helping an international patient coordinate airport pickup, hotel stay, and hospital visits in a calm premium setting. No screens or documents with readable text.",
      "photo"
    )
  },
  hotelsHero: {
    id: "page-hotels-hero",
    src: "/generated/pages/hotels-hero.webp",
    alt: "Photorealistic scene of a recovery-friendly hotel stay",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a realistic recovery-hotel room scene with soft daylight, blackout curtains, accessible circulation, luggage, tea service, and a restful premium atmosphere for a medical traveler.",
      "photo"
    )
  },
  transportHero: {
    id: "page-transport-hero",
    src: "/generated/pages/transport-hero.webp",
    alt: "Photorealistic scene of airport and hospital transfer coordination",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a realistic airport-transfer scene with a premium driver greeting an international patient, luggage handling, an executive vehicle, and a hospital arrival drop-off in a polished service style. No visible signage text.",
      "photo"
    )
  },
  visaHero: {
    id: "page-visa-hero",
    src: "/generated/pages/visa-hero.webp",
    alt: "Photorealistic scene of medical trip preparation and secure travel documents",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a realistic pre-travel planning scene with a patient and coordinator preparing for a China medical trip, using generic folders, luggage, and itinerary cues. Avoid any document close-ups, passport text, stamps, or visible screens.",
      "photo"
    )
  },
  testimonialsHero: {
    id: "page-testimonials-hero",
    src: "/generated/pages/testimonials-hero.webp",
    alt: "Photorealistic scene suggesting patient confidence and recovery milestones",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a realistic but privacy-safe patient-confidence scene with international patients in a premium clinic lounge or recovery setting, showing reassurance, support, and trust without quoting text, badges, or identifiable paperwork.",
      "photo"
    )
  },
  hospitalsHero: {
    id: "page-hospitals-hero",
    src: "/generated/pages/hospitals-hero.webp",
    alt: "Photorealistic scene comparing trusted hospitals in Shanghai and Beijing",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a single photorealistic premium hospital-arrival scene that communicates international-standard care in China, with elegant architecture, calm reception flow, and strong institutional credibility. No collage, no split layout, no screens, no plaques, and no readable signage.",
      "photo"
    )
  },
  contactHero: {
    id: "page-contact-hero",
    src: "/generated/pages/contact-hero.webp",
    alt: "Photorealistic scene of responsive medical travel communication",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a realistic communication scene with a medical-travel coordinator at a premium desk responding to a patient inquiry by phone or laptop, surrounded by generic planning materials and no readable screens.",
      "photo"
    )
  },
  pricingHero: {
    id: "page-pricing-hero",
    src: "/generated/pages/pricing-hero.webp",
    alt: "Photorealistic scene of transparent treatment budgeting and price comparison",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a realistic treatment-budget planning scene with a patient and coordinator reviewing generic cost printouts, calculator, coffee, and travel planning materials on a premium consultation table. No readable numbers or text.",
      "photo"
    )
  },
  trustCenterHero: {
    id: "page-trust-center-hero",
    src: "/generated/pages/trust-center-hero.webp",
    alt: "Photorealistic scene of a healthcare trust center",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a realistic trust-center scene with a premium hospital consultation area, credential review materials, staff discussion, and a calm compliance-led environment. Keep every surface and document text-free.",
      "photo"
    )
  },
  verificationBanner: {
    id: "page-verification-banner",
    src: "/generated/pages/verification-banner.webp",
    alt: "Photorealistic scene of credential verification and registry checks",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a realistic credential-review scene with a compliance specialist and clinician checking generic folders and accreditation materials in a premium office or hospital setting, with no visible text or logos.",
      "photo"
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
    alt: "Photorealistic scene of low, median, and high budget planning",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a realistic budget-planning scene with a clean desk, calculator, generic paper stacks, travel and treatment planning cues, and a patient discussing low, median, and high budget scenarios. No readable numbers or text.",
      "photo"
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
    alt: "Photorealistic scene of Jiahui International Hospital campus and reception",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a single wide-angle photorealistic premium hospital campus scene inspired by an international hospital in Shanghai, with modern architecture, landscaped grounds, and a calm reception arrival flow. No collage, no split layout, no building signage, no logos, no screens, and no plaques.",
      "photo"
    )
  },
  "beijing-united-family-hospital": {
    id: "hospital-bufh",
    src: "/generated/hospitals/beijing-united-family-hospital.webp",
    alt: "Photorealistic scene of Beijing United Family Hospital exterior and outpatient arrival",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a photorealistic international-hospital exterior scene in Beijing with a polished entrance, outpatient arrival flow, and premium service atmosphere. No readable signage, no logos, no screens, and no plaques.",
      "photo"
    )
  },
  "tongren-eye-center": {
    id: "hospital-tongren-eye",
    src: "/generated/hospitals/tongren-eye-center.webp",
    alt: "Photorealistic scene of an ophthalmology diagnostics environment in Beijing",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a photorealistic ophthalmology diagnostics environment in Beijing with premium eye-care equipment, a specialist room, and calm patient-intake cues. No readable signage, no device text, no screens in focus, and no wall plaques.",
      "photo"
    )
  }
} as const satisfies Record<string, SiteImageAsset>;

export const procedureImageAssets = {
  "dental-implants-china": {
    id: "procedure-dental-implants",
    src: "/generated/procedures/dental-implants-china.webp",
    alt: "Photorealistic scene of dental implant planning in China",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a photorealistic dental-implant consultation scene with a premium clinician, generic implant models on the table, and a calm cross-border care atmosphere. No surgery, no blood, no screens, no x-ray monitors, and no visible charts.",
      "photo"
    )
  },
  "all-on-4-china": {
    id: "procedure-all-on-4",
    src: "/generated/procedures/all-on-4-china.webp",
    alt: "Photorealistic scene of full-mouth reconstruction planning in China",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a photorealistic full-mouth reconstruction consultation scene with prosthetic models, clinician discussion, premium dental surroundings, and a calm restorative-planning mood. No surgery in progress and no readable materials.",
      "photo"
    )
  },
  "veneers-china": {
    id: "procedure-veneers",
    src: "/generated/procedures/veneers-china.webp",
    alt: "Photorealistic scene of veneer treatment design planning",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a photorealistic cosmetic-dentistry consultation scene with smile-design discussion, premium clinic lighting, generic shade tools, and refined patient-planning cues. No readable mirrors, charts, or screens.",
      "photo"
    )
  },
  "root-canal-china": {
    id: "procedure-root-canal",
    src: "/generated/procedures/root-canal-china.webp",
    alt: "Photorealistic scene of urgent endodontic care planning",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a photorealistic endodontic consultation scene with a specialist explaining urgent tooth-preservation care in a calm premium clinic, using generic instruments and no graphic treatment detail.",
      "photo"
    )
  },
  "lasik-china": {
    id: "procedure-lasik",
    src: "/generated/procedures/lasik-china.webp",
    alt: "Photorealistic scene of LASIK evaluation and treatment planning",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a photorealistic LASIK evaluation scene with premium ophthalmology equipment, pre-op discussion, and a calm clinic environment. No surgery, no readable eye charts, and no device text.",
      "photo"
    )
  },
  "health-checkup-china": {
    id: "procedure-health-checkup",
    src: "/generated/procedures/health-checkup-china.webp",
    alt: "Photorealistic scene of executive health checkup planning",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a photorealistic executive health-checkup scene with premium diagnostics spaces, clinician guidance, and a calm preventive-screening atmosphere. Avoid any visible report text or monitors.",
      "photo"
    )
  },
  "cosmetic-surgery-china": {
    id: "procedure-cosmetic-surgery",
    src: "/generated/procedures/cosmetic-surgery-china.webp",
    alt: "Photorealistic scene of cosmetic procedure planning in China",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a photorealistic cosmetic-procedure consultation scene with premium privacy-safe clinic styling, clinician discussion, and tasteful recovery cues. No surgery in progress, no bandages, and no readable materials.",
      "photo"
    )
  }
} as const satisfies Record<string, SiteImageAsset>;

export const cityGuideImageAssets = {
  "medical-tourism-shanghai": {
    id: "city-shanghai",
    src: "/generated/cities/medical-tourism-shanghai.webp",
    alt: "Photorealistic scene of medical travel in Shanghai",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a photorealistic Shanghai medical-travel scene with premium skyline context, hospital access, hotel arrival, and international patient travel cues in one cohesive real-world composition.",
      "photo"
    )
  },
  "medical-tourism-beijing": {
    id: "city-beijing",
    src: "/generated/cities/medical-tourism-beijing.webp",
    alt: "Photorealistic scene of medical travel in Beijing",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create a photorealistic Beijing medical-travel scene with specialist hospital access, premium transport flow, and subtle skyline context in a credible real-world composition.",
      "photo"
    )
  }
} as const satisfies Record<string, SiteImageAsset>;

export const articleCategoryImageAssets = {
  "cost-comparisons": {
    id: "article-cost-comparisons",
    src: "/generated/articles/cost-comparisons.webp",
    alt: "Editorial illustration for treatment cost comparison articles",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create an editorial article illustration about treatment cost comparisons using abstract budgeting cues, planning notebooks, and restrained medical-travel symbols without realistic people."
    )
  },
  "patient-planning": {
    id: "article-patient-planning",
    src: "/generated/articles/patient-planning.webp",
    alt: "Editorial illustration for patient planning articles",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create an editorial article illustration about patient planning with milestone steps, itinerary objects, provider-shortlist cards, and calm travel-planning cues."
    )
  },
  dental: {
    id: "article-dental",
    src: "/generated/articles/dental.webp",
    alt: "Editorial illustration for dental travel planning articles",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create an editorial article illustration for dental travel planning with clean clinic objects, treatment models, planning notes, and non-graphic care symbols."
    )
  },
  lasik: {
    id: "article-lasik",
    src: "/generated/articles/lasik.webp",
    alt: "Editorial illustration for LASIK planning articles",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create an editorial article illustration for LASIK planning with abstract eye-diagnostic motifs, clinical path markers, and calm short-stay travel cues."
    )
  },
  "health-checkup": {
    id: "article-health-checkup",
    src: "/generated/articles/health-checkup.webp",
    alt: "Editorial illustration for health checkup articles",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create an editorial article illustration for executive health checkup planning with preventive-screening objects, report folders, and structured decision cues."
    )
  },
  cosmetic: {
    id: "article-cosmetic",
    src: "/generated/articles/cosmetic.webp",
    alt: "Editorial illustration for cosmetic procedure articles",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create an editorial article illustration for cosmetic procedure planning with tasteful clinic objects, privacy-safe planning cues, and refined recovery symbols."
    )
  },
  "visa-travel": {
    id: "article-visa-travel",
    src: "/generated/articles/visa-travel.webp",
    alt: "Editorial illustration for medical travel and visa articles",
    aspect: "4:3",
    quality: "normal",
    prompt: buildPrompt(
      "Create an editorial article illustration for medical-travel preparation with luggage, route planning, secure folder cues, and calm pre-departure organization."
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
  ...Object.values(articleCategoryImageAssets),
  ...Object.values(caseStudyImageAssets),
  ...Object.values(authorPortraitAssets)
];

export function getBlogCategoryImage(slug: string): SiteImageAsset {
  return articleCategoryImageAssets[slug as keyof typeof articleCategoryImageAssets] || pageImageAssets.blogBanner;
}

export function getBlogPostImage(post: Pick<BlogPost, "slug" | "category" | "relatedProcedureSlug">): SiteImageAsset {
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
