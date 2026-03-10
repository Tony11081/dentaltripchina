import { blogAuthors } from "@/data/authors";
import { caseStudies } from "@/data/case-studies";
import { companyProfile } from "@/data/company-profile";
import { hospitals } from "@/data/hospitals";
import { marketLandingPages } from "@/data/market-pages";
import { blogPosts } from "@/data/posts";
import { procedures } from "@/data/procedures";
import { hospitalTrustProfiles } from "@/data/trust";

function getTotalCaseCost(item: (typeof caseStudies)[number]) {
  return (
    item.costBreakdown.treatmentUsd +
    item.costBreakdown.flightHotelUsd +
    item.costBreakdown.followUpUsd +
    item.costBreakdown.extraUsd
  );
}

export function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dentaltripchina.com";
  const latestUpdated = [...blogPosts]
    .sort((left, right) => right.dateUpdated.localeCompare(left.dateUpdated))[0]?.dateUpdated;

  const payload = {
    version: "2026-03-10",
    site: {
      name: "DentalTripChina",
      url: siteUrl,
      language: "en-GB",
      description:
        "Cross-border treatment planning, hospital verification, and medical travel guidance for treatment in China.",
      updatedAt: latestUpdated || companyProfile.infoLastUpdated
    },
    organization: {
      brandName: companyProfile.brandName,
      legalEntityName: companyProfile.legalEntityName,
      supportEmail: companyProfile.supportEmail,
      supportPhone: companyProfile.supportPhone,
      businessHours: companyProfile.businessHours,
      activeClientSupportHours: companyProfile.activeClientSupportHours,
      partnershipModel: companyProfile.partnershipModel,
      serviceFeeSummary: companyProfile.serviceFeeSummary,
      treatmentPaymentSummary: companyProfile.treatmentPaymentSummary
    },
    discovery: {
      llms: `${siteUrl}/llms.txt`,
      llmsFull: `${siteUrl}/llms-full.txt`,
      rss: `${siteUrl}/rss.xml`,
      jsonFeed: `${siteUrl}/feed.json`
    },
    preferredCitationRoutes: [
      `${siteUrl}/trust-center`,
      `${siteUrl}/verification`,
      `${siteUrl}/pricing`,
      `${siteUrl}/care-sla`,
      `${siteUrl}/privacy`,
      `${siteUrl}/terms`
    ],
    procedures: procedures.map((procedure) => ({
      title: procedure.title,
      url: `${siteUrl}/${procedure.slug}`,
      excerpt: procedure.excerpt,
      chinaEstimateUsd: procedure.prices.chinaUsd,
      savingsPct: procedure.savingsPct,
      durationDays: procedure.durationDays,
      appointmentWaitChina: procedure.timeComparison.china.appointmentWait,
      relatedHospitals: procedure.partnerHospitalSlugs.map(
        (slug) => `${siteUrl}/hospital/${slug}`
      )
    })),
    marketPages: marketLandingPages.map((page) => ({
      title: page.title,
      url: `${siteUrl}/${page.slug}`,
      country: page.countryName,
      procedureUrl: `${siteUrl}/${page.procedureSlug}`,
      homeMarketReferenceNote: page.homeMarketReferenceNote || null,
      chinaEstimateUsd: page.chinaPriceUsd,
      homeMarketEstimateUsd: page.homeMarketPriceUsd,
      chinaAppointmentWait: page.chinaAppointmentWait,
      homeMarketAppointmentWait: page.homeMarketAppointmentWait
    })),
    hospitals: hospitals.map((hospital) => {
      const trustProfile = hospitalTrustProfiles.find((item) => item.hospitalSlug === hospital.slug);

      return {
        name: hospital.name,
        url: `${siteUrl}/hospital/${hospital.slug}`,
        city: hospital.city,
        summary: hospital.summary,
        website: hospital.website || null,
        officialVerificationUrl: hospital.jciVerifyUrl,
        latestVerification: trustProfile?.credentialLastVerified || null,
        specialties: hospital.specialties,
        paymentMethods: hospital.paymentMethods
      };
    }),
    blogPosts: [...blogPosts]
      .sort((left, right) => right.dateUpdated.localeCompare(left.dateUpdated))
      .map((post) => ({
        title: post.title,
        url: `${siteUrl}/blog/${post.slug}`,
        excerpt: post.excerpt,
        category: post.category,
        published: post.datePublished,
        updated: post.dateUpdated,
        author: post.authorName,
        authorUrl: post.authorSlug ? `${siteUrl}/authors/${post.authorSlug}` : null,
        relatedProcedureUrl: post.relatedProcedureSlug ? `${siteUrl}/${post.relatedProcedureSlug}` : null,
        relatedCaseUrl: post.relatedCaseSlug ? `${siteUrl}/case-studies/${post.relatedCaseSlug}` : null
      })),
    caseStudies: caseStudies.map((item) => ({
      title: item.title,
      url: `${siteUrl}/case-studies/${item.slug}`,
      procedureUrl: `${siteUrl}/${item.procedureSlug}`,
      country: item.country,
      city: item.city,
      patientContext: item.patientContext,
      totalCostUsd: getTotalCaseCost(item),
      complicationOccurred: item.complication.occurred
    })),
    authors: blogAuthors.map((author) => ({
      name: author.name,
      url: `${siteUrl}/authors/${author.slug}`,
      title: author.title,
      specialties: author.specialties,
      lastProfileReview: author.lastProfileReview
    }))
  };

  return Response.json(payload, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400"
    }
  });
}
