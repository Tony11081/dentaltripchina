const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8613800138000";

export function isPublishedCompanyField(value: string) {
  return value.trim().length > 0;
}

export const companyProfile = {
  brandName: "DentalTripChina.com",
  legalEntityName: process.env.DTC_PUBLIC_LEGAL_ENTITY_NAME || "",
  registrationNumber: process.env.DTC_PUBLIC_REGISTRATION_NUMBER || "",
  registrationJurisdiction: process.env.DTC_PUBLIC_REGISTRATION_JURISDICTION || "",
  registeredAddress: process.env.DTC_PUBLIC_REGISTERED_ADDRESS || "",
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
  infoLastUpdated: process.env.DTC_PUBLIC_COMPANY_INFO_UPDATED || "March 9, 2026"
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
  "Public legal entity details are not currently published on the website. Add verified legal name, registration number, jurisdiction, and registered office before treating the entity profile as complete.";

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
