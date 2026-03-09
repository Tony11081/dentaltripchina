import { Hospital } from "@/lib/types";
import { hospitalImageAssets } from "@/lib/site-images";

export const hospitals: Hospital[] = [
  {
    slug: "jiahui-international-hospital",
    name: "Jiahui International Hospital",
    city: "shanghai",
    jciYear: 2021,
    jciVerifyUrl: "https://www.jointcommissioninternational.org/",
    specialties: ["dental", "checkup", "general"],
    address: "689 Guiping Road, Xuhui District, Shanghai, China",
    phone: "+86 21 5339 8999",
    website: "https://www.jiahui.com/en/",
    internationalDept: true,
    englishStaff: true,
    keyStat: "500+ physicians | International care model",
    lat: 31.1649,
    lng: 121.4067,
    summary:
      "Comprehensive private hospital with international patient pathways for dental, checkup, and multidisciplinary care.",
    heroImageSrc: hospitalImageAssets["jiahui-international-hospital"].src,
    heroImageAlt: hospitalImageAssets["jiahui-international-hospital"].alt,
    overview: [
      "Jiahui is frequently selected for overseas patients who need coordinated scheduling between diagnostics, treatment, and follow-up within one trip window.",
      "Its international patient desk supports English communication, treatment documentation handoff, and same-journey adjustments when clinical findings change."
    ],
    departmentHighlights: [
      {
        name: "Implant and Restorative Dentistry",
        description:
          "CBCT-supported implant planning, prosthodontic rehabilitation, and staged restorative pathways for international patients."
      },
      {
        name: "Executive Health Checkup Unit",
        description:
          "Preventive screening programs with bilingual reporting, physician interpretation, and continuity notes for home-country follow-up."
      },
      {
        name: "International Day Surgery Support",
        description:
          "Cross-department coordination for procedures needing pre-op clearance, anesthesia review, and post-op monitoring."
      }
    ],
    paymentMethods: [
      "International credit cards (Visa/Mastercard)",
      "UnionPay bank cards",
      "Bank transfer",
      "Selected mobile wallets subject to billing desk confirmation"
    ],
    internationalPatientNotes: [
      "Passport and appointment confirmation are required at registration.",
      "Deposits and pre-authorization requirements vary by specialty and procedure.",
      "English invoice and treatment summary can be issued for continuity care."
    ]
  },
  {
    slug: "beijing-united-family-hospital",
    name: "Beijing United Family Hospital",
    city: "beijing",
    jciYear: 2015,
    jciVerifyUrl: "https://www.jointcommissioninternational.org/",
    specialties: ["dental", "lasik", "checkup", "general"],
    address: "2 Jiangtai Road, Chaoyang District, Beijing, China",
    phone: "+86 10 5927 7000",
    website: "https://beijing.ufh.com.cn/",
    internationalDept: true,
    englishStaff: true,
    keyStat: "24/7 international clinic | Multidisciplinary specialties",
    lat: 39.9764,
    lng: 116.4862,
    summary:
      "Established international hospital with 24/7 intake and multidisciplinary pathways for overseas patients.",
    heroImageSrc: hospitalImageAssets["beijing-united-family-hospital"].src,
    heroImageAlt: hospitalImageAssets["beijing-united-family-hospital"].alt,
    overview: [
      "Beijing United Family Hospital is commonly used for patients needing coordinated dental, ophthalmology, and medical checkup planning under one system.",
      "Its international division is structured for expatriate and inbound patient communication, including records transfer and bilingual coordination."
    ],
    departmentHighlights: [
      {
        name: "International Dental Center",
        description:
          "Implants, endodontic care, and restorative pathways with case triage before treatment confirmation."
      },
      {
        name: "Refractive and Ophthalmology Services",
        description:
          "LASIK candidate assessment and perioperative monitoring with escalation routes for red-flag symptoms."
      },
      {
        name: "Comprehensive Preventive Medicine",
        description:
          "Executive screening pathways with specialist follow-up for incidental findings and report interpretation."
      }
    ],
    paymentMethods: [
      "International credit cards (Visa/Mastercard/AMEX where accepted)",
      "UnionPay bank cards",
      "Bank transfer for selected packages",
      "Payment timing confirmed before procedure booking"
    ],
    internationalPatientNotes: [
      "International desk supports 24/7 triage for urgent postoperative concerns.",
      "Final clinical fee scope depends on diagnostics and specialist confirmation.",
      "Medical reports can be issued in bilingual format on request."
    ]
  },
  {
    slug: "tongren-eye-center",
    name: "Beijing Tongren Eye Center",
    city: "beijing",
    jciYear: 0,
    jciVerifyUrl: "https://www.bjtrh.org/",
    specialties: ["lasik"],
    address: "1 Dongjiaominxiang, Dongcheng District, Beijing, China",
    phone: "+86 10 5826 6666",
    website: "https://www.bjtrh.org/",
    internationalDept: true,
    englishStaff: true,
    keyStat: "Top-tier ophthalmology center",
    lat: 39.9055,
    lng: 116.4235,
    summary:
      "Leading ophthalmology center often selected for refractive surgery pathways requiring detailed diagnostics.",
    heroImageSrc: hospitalImageAssets["tongren-eye-center"].src,
    heroImageAlt: hospitalImageAssets["tongren-eye-center"].alt,
    overview: [
      "Tongren Eye Center is recognized for refractive and corneal diagnostics, making it a key option for candidates who need strict suitability screening.",
      "For international LASIK planning, timeline decisions are usually gated by diagnostic thresholds rather than booking speed."
    ],
    departmentHighlights: [
      {
        name: "Refractive Surgery Unit",
        description:
          "LASIK/SMILE evaluation with corneal mapping, stability checks, and candidacy-boundary screening."
      },
      {
        name: "Corneal Diagnostics",
        description:
          "Pre-op and post-op measurement workflows to support safer treatment selection and follow-up planning."
      },
      {
        name: "International Coordination Support",
        description:
          "Appointment planning, translation support, and records handoff for returning travelers."
      }
    ],
    paymentMethods: [
      "Hospital billing desk payment methods vary by department",
      "Major domestic and selected international card channels",
      "Prepayment rules confirmed during booking stage"
    ],
    internationalPatientNotes: [
      "Bring prior eye reports, prescription history, and current medication list.",
      "Final procedure decision is made only after full in-person diagnostics.",
      "Post-op follow-up windows should be reserved before return flights."
    ]
  }
];
