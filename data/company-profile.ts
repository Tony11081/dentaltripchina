const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8613800138000";

const unpublishedMarkers = [
  "pending public launch update",
  "to be published before go-live",
  "pending publication"
] as const;

export function isPublishedCompanyField(value: string) {
  const normalized = value.trim().toLowerCase();
  return normalized.length > 0 && !unpublishedMarkers.some((marker) => normalized.includes(marker));
}

export const companyProfile = {
  brandName: "DentalTripChina.com",
  legalEntityName:
    process.env.DTC_PUBLIC_LEGAL_ENTITY_NAME ||
    "Legal entity disclosure pending public launch update",
  registrationNumber:
    process.env.DTC_PUBLIC_REGISTRATION_NUMBER ||
    "Registration number to be published before go-live",
  registrationJurisdiction:
    process.env.DTC_PUBLIC_REGISTRATION_JURISDICTION || "Pending publication",
  registeredAddress:
    process.env.DTC_PUBLIC_REGISTERED_ADDRESS ||
    "Registered office address to be published before go-live",
  operationsAddress:
    process.env.DTC_PUBLIC_OPERATIONS_ADDRESS ||
    "Shanghai and Beijing coordination desks (address details provided in service agreement)",
  supportEmail: process.env.DTC_PUBLIC_SUPPORT_EMAIL || "care@dentaltripchina.com",
  xrayInboxEmail:
    process.env.DTC_PUBLIC_XRAY_EMAIL ||
    process.env.DTC_PUBLIC_SUPPORT_EMAIL ||
    "xray@dentaltripchina.com",
  supportPhone: process.env.DTC_PUBLIC_SUPPORT_PHONE || `+${whatsappNumber}`,
  businessHours:
    process.env.DTC_PUBLIC_BUSINESS_HOURS || "Mon-Sun 08:00-22:00 China Time (UTC+8)",
  infoLastUpdated: process.env.DTC_PUBLIC_COMPANY_INFO_UPDATED || "February 27, 2026"
};

export const companyProfileStatus = {
  hasPublishedLegalEntity: isPublishedCompanyField(companyProfile.legalEntityName),
  hasPublishedRegistrationNumber: isPublishedCompanyField(companyProfile.registrationNumber),
  hasPublishedRegistrationJurisdiction: isPublishedCompanyField(
    companyProfile.registrationJurisdiction
  ),
  hasPublishedRegisteredAddress: isPublishedCompanyField(companyProfile.registeredAddress)
};

export const companyIdentityDisclosureNote =
  "Detailed registration records are shared during consultation and added here when publication controls are finalized.";

export const publishedCompanyIdentityItems = [
  {
    key: "legal-entity",
    label: "Legal entity",
    value: companyProfile.legalEntityName,
    published: companyProfileStatus.hasPublishedLegalEntity
  },
  {
    key: "registration-number",
    label: "Registration number",
    value: companyProfile.registrationNumber,
    published: companyProfileStatus.hasPublishedRegistrationNumber
  },
  {
    key: "registration-jurisdiction",
    label: "Registration jurisdiction",
    value: companyProfile.registrationJurisdiction,
    published: companyProfileStatus.hasPublishedRegistrationJurisdiction
  },
  {
    key: "registered-office",
    label: "Registered office",
    value: companyProfile.registeredAddress,
    published: companyProfileStatus.hasPublishedRegisteredAddress
  }
].filter((item) => item.published);
