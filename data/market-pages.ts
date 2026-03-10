import { procedures } from "@/data/procedures";
import { MarketLandingPage, Procedure } from "@/lib/types";

type CountryPriceKey = "ukUsd" | "usUsd" | "auUsd";
type CountryTimeKey = "unitedKingdom" | "unitedStates" | "australia";

interface CountryProfile {
  slugPrefix: string;
  countryCode: string;
  countryName: string;
  comparatorLabel: string;
  homeMarketReferenceNote?: string;
  priceKey: CountryPriceKey;
  timeKey: CountryTimeKey;
  marketContext: string;
}

interface ProcedureBlueprint {
  procedureSlug: Procedure["slug"];
  whyPatientsConsiderChina: (procedure: Procedure, country: CountryProfile) => string[];
  planningChecklist: (procedure: Procedure, country: CountryProfile) => string[];
  faqItems: (procedure: Procedure, country: CountryProfile) => MarketLandingPage["faqItems"];
}

const countryProfiles: CountryProfile[] = [
  {
    slugPrefix: "uk",
    countryCode: "UK",
    countryName: "United Kingdom",
    comparatorLabel: "UK private-care reference",
    priceKey: "ukUsd",
    timeKey: "unitedKingdom",
    marketContext:
      "UK patients often compare high private pricing and longer specialist waits against faster appointment access in China. This page is built to reduce uncertainty before you spend time or money on travel."
  },
  {
    slugPrefix: "us",
    countryCode: "US",
    countryName: "United States",
    comparatorLabel: "US private-care reference",
    priceKey: "usUsd",
    timeKey: "unitedStates",
    marketContext:
      "US patients usually focus on total out-of-pocket cost and scope clarity. This page is built to compare China against US private-care assumptions without hiding timeline or follow-up constraints."
  },
  {
    slugPrefix: "australia",
    countryCode: "Australia",
    countryName: "Australia",
    comparatorLabel: "Australia private-care reference",
    priceKey: "auUsd",
    timeKey: "australia",
    marketContext:
      "Australian patients often care about both cost and long-haul travel fit. This page is built to connect price, booking speed, and safe return-flight timing in one collection."
  },
  {
    slugPrefix: "canada",
    countryCode: "Canada",
    countryName: "Canada",
    comparatorLabel: "Canada private-care planning reference",
    homeMarketReferenceNote:
      "This page uses North America private-clinic comparison patterns as a planning reference because Canada pricing varies by province, clinic model, and procedural scope.",
    priceKey: "usUsd",
    timeKey: "unitedStates",
    marketContext:
      "Canadian patients often compare China when they want lower out-of-pocket pricing without giving up source-linked planning. The key questions are scope clarity, continuity back home, and whether the trip window is realistic for your case."
  },
  {
    slugPrefix: "new-zealand",
    countryCode: "New Zealand",
    countryName: "New Zealand",
    comparatorLabel: "New Zealand private-care planning reference",
    homeMarketReferenceNote:
      "This page uses Australia/New Zealand private-care comparison patterns as a planning reference because New Zealand provider pricing varies widely by city, clinic, and package scope.",
    priceKey: "auUsd",
    timeKey: "australia",
    marketContext:
      "New Zealand patients usually need to weigh long-haul travel effort against the value of faster booking and lower treatment cost. This page is built to help you judge whether the timing, budget, and recovery window are strong enough before you fly."
  },
  {
    slugPrefix: "singapore",
    countryCode: "Singapore",
    countryName: "Singapore",
    comparatorLabel: "Singapore private-hospital planning reference",
    homeMarketReferenceNote:
      "This page uses regional private-hospital comparison patterns as a planning reference rather than a provider-issued Singapore quote. Final local pricing can vary materially by institution and package scope.",
    priceKey: "auUsd",
    timeKey: "australia",
    marketContext:
      "Singapore patients often value speed, price transparency, and predictable scheduling. This page is built to show when China can be a rational planning option and when local urgent care or a shorter local pathway is the better fit."
  }
];

function getCountryPrice(procedure: Procedure, priceKey: CountryPriceKey) {
  return procedure.prices[priceKey] ?? procedure.prices.usUsd;
}

function requireProcedure(slug: Procedure["slug"]) {
  const procedure = procedures.find((item) => item.slug === slug);
  if (!procedure) {
    throw new Error(`Missing procedure config for market page: ${slug}`);
  }

  return procedure;
}

const procedureBlueprints: ProcedureBlueprint[] = [
  {
    procedureSlug: "dental-implants-china",
    whyPatientsConsiderChina: (procedure, country) => [
      `${country.countryCode} patients often see China estimates start around USD ${procedure.prices.chinaUsd.toLocaleString()} compared with about USD ${getCountryPrice(procedure, country.priceKey).toLocaleString()} at home-market private rates.`,
      `China booking is usually ${procedure.timeComparison.china.appointmentWait}, while ${country.countryCode.toLowerCase()} private-care planning often looks more like ${procedure.timeComparison[country.timeKey].appointmentWait}.`,
      "The key decision is not only lower price. It is whether staged timing, follow-up, and provider verification still work for your case."
    ],
    planningChecklist: (procedure) => [
      "Confirm whether your trip covers stage 1 only or whether definitive crown timing is realistic for your schedule.",
      "Request an itemized quote covering diagnostics, implant system, grafting, temporary restoration, medication, and early post-op review.",
      `Protect the recommended China stay window: ${procedure.durationDays}.`,
      "Arrange continuity handoff for your home dentist before you fly back."
    ],
    faqItems: (procedure, country) => [
      {
        question: `Is ${procedure.title.toLowerCase()} in China realistic for ${country.countryCode} patients?`,
        answer:
          "Often yes for suitable cases, especially when the patient accepts staged treatment logic and protects early follow-up time before flying home."
      },
      {
        question: `How much could ${country.countryCode} patients compare against at home?`,
        answer: `This planning page uses a China estimate of around USD ${procedure.prices.chinaUsd.toLocaleString()} and a ${country.comparatorLabel.toLowerCase()} of around USD ${getCountryPrice(procedure, country.priceKey).toLocaleString()} as the first comparison band. Final hospital pricing depends on diagnostics and case complexity.`
      },
      {
        question: "Can implants be fully completed in one short trip?",
        answer:
          "Usually not for definitive biological completion. Many implant pathways are staged, with surgery in China followed by healing clearance before final restorative loading."
      },
      {
        question: "Can I get an itemized quote before I travel?",
        answer:
          "Yes. We can arrange an itemized pre-travel quote once diagnostics or case records are sufficient for provider review."
      }
    ]
  },
  {
    procedureSlug: "all-on-4-china",
    whyPatientsConsiderChina: (procedure, country) => [
      `${country.countryCode} patients often look at China when full-arch treatment budgets at home move toward USD ${getCountryPrice(procedure, country.priceKey).toLocaleString()} while China estimates start around USD ${procedure.prices.chinaUsd.toLocaleString()}.`,
      `China can usually shorten appointment access to ${procedure.timeComparison.china.appointmentWait}, but safe planning still depends on surgery fit and recovery monitoring.`,
      "This is only a good use of travel if the case can be screened properly, monitored early, and not compressed below a safe recovery window."
    ],
    planningChecklist: (procedure) => [
      "Check whether immediate-load expectations are realistic for your bone condition and periodontal history.",
      "Budget separately for treatment, flights, hotel, medication, and any extra observation nights.",
      `Protect the surgery-stage stay guidance: ${procedure.durationDays}.`,
      "Do not book inflexible return flights until post-op review windows are protected."
    ],
    faqItems: (procedure, country) => [
      {
        question: `Why do ${country.countryCode} patients compare All-on-4 in China?`,
        answer:
          "Usually because full-mouth private-care costs at home are high and patients want a structured, source-linked comparison before committing to treatment."
      },
      {
        question: `What home-market reference does this ${country.countryCode} page use?`,
        answer: `This page compares China planning estimates around USD ${procedure.prices.chinaUsd.toLocaleString()} with a ${country.comparatorLabel.toLowerCase()} of around USD ${getCountryPrice(procedure, country.priceKey).toLocaleString()}. Final scope remains case-dependent.`
      },
      {
        question: "Can I do All-on-4 on a very short trip?",
        answer:
          "That is rarely the safest way to plan. Full-arch surgery needs enough time for review, swelling checks, medication adjustment, and contingency before long-haul return."
      },
      {
        question: "Will the service fee increase if the medical quote changes?",
        answer:
          "Hospital treatment fees go directly to the hospital. Our coordination fee is separate and only changes if the agreed coordination scope materially expands."
      }
    ]
  },
  {
    procedureSlug: "lasik-china",
    whyPatientsConsiderChina: (procedure, country) => [
      `${country.countryCode} patients often compare China because LASIK estimates can start around USD ${procedure.prices.chinaUsd.toLocaleString()} versus about USD ${getCountryPrice(procedure, country.priceKey).toLocaleString()} in ${country.comparatorLabel.toLowerCase()}.`,
      `Booking can often move at ${procedure.timeComparison.china.appointmentWait} in China, while home-market planning more often starts at ${procedure.timeComparison[country.timeKey].appointmentWait}.`,
      "The real decision point is candidacy. If diagnostics do not clear you, the safest outcome is to pause surgery."
    ],
    planningChecklist: (procedure) => [
      "Treat diagnostics as the gate, not the procedure date.",
      "Keep enough time for day-1 review, symptom monitoring, and return-flight clearance.",
      `Use the China treatment window as a planning baseline: ${procedure.durationDays}.`,
      "Request a continuity packet for your local ophthalmologist before return travel."
    ],
    faqItems: (procedure, country) => [
      {
        question: `Is LASIK in China worth comparing for ${country.countryCode} patients?`,
        answer:
          "Often yes when the patient wants a lower out-of-pocket price and can preserve the diagnostic and follow-up checkpoints needed for safe travel."
      },
      {
        question: `What home-market comparison does this ${country.countryCode} page use?`,
        answer: `This page uses a China starting point around USD ${procedure.prices.chinaUsd.toLocaleString()} and a ${country.comparatorLabel.toLowerCase()} around USD ${getCountryPrice(procedure, country.priceKey).toLocaleString()} for first-pass planning.`
      },
      {
        question: "Can I force LASIK into a fixed flight schedule?",
        answer:
          "That is a weak way to plan. Surgery should follow diagnostic clearance, and return travel should follow early post-op review and symptom stability."
      },
      {
        question: "Can I speak with a doctor before flying?",
        answer:
          "A doctor video consultation may be arranged after deposit and case pre-screening, depending on hospital and specialty availability."
      }
    ]
  },
  {
    procedureSlug: "health-checkup-china",
    whyPatientsConsiderChina: (procedure, country) => [
      `${country.countryCode} patients often compare China because premium checkup packages can start around USD ${procedure.prices.chinaUsd.toLocaleString()} compared with about USD ${getCountryPrice(procedure, country.priceKey).toLocaleString()} in ${country.comparatorLabel.toLowerCase()}.`,
      `China can often schedule these pathways at ${procedure.timeComparison.china.appointmentWait}, which is useful when the patient wants a compressed but well-structured trip.`,
      "The real value is not only speed. It is whether incidental findings, specialist clarification, and report handoff are handled properly."
    ],
    planningChecklist: (procedure) => [
      "Define exactly what screening scope you want before you book flights.",
      "Reserve budget for incidental findings, extra diagnostics, and specialist review.",
      `Use the China timing guidance as your baseline: ${procedure.durationDays}.`,
      "Request a bilingual or clearly structured handoff summary for your home doctor."
    ],
    faqItems: (procedure, country) => [
      {
        question: `Why do ${country.countryCode} patients compare health checkups in China?`,
        answer:
          "Usually because they want faster access, clearer package pricing, and a structured preventive screening trip without long waits."
      },
      {
        question: `What comparison does this ${country.countryCode} page use?`,
        answer: `This page starts with a China planning estimate around USD ${procedure.prices.chinaUsd.toLocaleString()} and a ${country.comparatorLabel.toLowerCase()} around USD ${getCountryPrice(procedure, country.priceKey).toLocaleString()}.`
      },
      {
        question: "Are flights included in the checkup estimate?",
        answer:
          "No. International airfare is excluded unless explicitly stated. Hotel, local transfers, and additional diagnostics may also be separate."
      },
      {
        question: "What happens if a checkup finds something unexpected?",
        answer:
          "That is exactly why continuity planning matters. Same-trip clarification may be arranged where appropriate, and patients should leave with a clear summary for home-country follow-up."
      }
    ]
  }
];

export const marketLandingPages: MarketLandingPage[] = countryProfiles.flatMap((country) =>
  procedureBlueprints.map((blueprint) => {
    const procedure = requireProcedure(blueprint.procedureSlug);
    const homeMarketPriceUsd =
      procedure.prices[country.priceKey] ??
      procedure.prices.usUsd;
    const homeTiming = procedure.timeComparison[country.timeKey];

    return {
      slug: `${country.slugPrefix}-${procedure.slug}`,
      countryCode: country.countryCode,
      countryName: country.countryName,
      procedureSlug: procedure.slug,
      title: `${country.countryCode} ${procedure.title.replace(" in China", "")} in China: Cost, Wait Time & Hospitals`,
      heroTitle: `${procedure.title} for ${country.countryCode} Patients`,
      heroDescription:
        `Compare China vs ${country.comparatorLabel.toLowerCase()} pricing, booking speed, hospitals, and planning risks before you book.`,
      metaDescription:
        `Planning guide for ${country.countryName} patients considering ${procedure.title.toLowerCase()} in China. Compare China vs ${country.comparatorLabel.toLowerCase()} costs, timelines, hospitals, FAQs, and sources.`,
      shortAnswer:
        `${country.countryCode} patients often look at ${procedure.title.toLowerCase()} in China because treatment can be materially cheaper and faster to book than at home, but the right choice still depends on candidacy, travel fit, and provider verification.`,
      marketContext: country.marketContext,
      collectionSummary:
        `This page collects the most relevant procedure guide, hospital profiles, case studies, and planning articles for ${country.countryName} patients considering ${procedure.title.toLowerCase()} in China.`,
      comparatorLabel: country.comparatorLabel,
      homeMarketReferenceNote: country.homeMarketReferenceNote,
      homeMarketPriceUsd,
      homeMarketAppointmentWait: homeTiming.appointmentWait,
      homeMarketTreatmentTime: homeTiming.treatmentTime,
      chinaPriceUsd: procedure.prices.chinaUsd,
      chinaAppointmentWait: procedure.timeComparison.china.appointmentWait,
      chinaTreatmentTime: procedure.timeComparison.china.treatmentTime,
      planningChecklist: blueprint.planningChecklist(procedure, country),
      whyPatientsConsiderChina: blueprint.whyPatientsConsiderChina(procedure, country),
      faqItems: blueprint.faqItems(procedure, country)
    };
  })
);
