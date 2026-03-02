export interface TestimonialEntry {
  id: string;
  name: string;
  country: string;
  procedure: string;
  content: string;
  verified: boolean;
  incentiveDisclosure: string;
  verificationMethod: string;
}

export const testimonials: TestimonialEntry[] = [
  {
    id: "emma-r-implant",
    name: "Emma R.",
    country: "United Kingdom",
    procedure: "Dental Implants",
    content:
      "Treatment quality and communication were excellent. My total cost was much lower than UK quotes.",
    verified: true,
    incentiveDisclosure: "No incentive provided.",
    verificationMethod: "Passport-country and treatment invoice cross-check"
  },
  {
    id: "andrew-l-lasik",
    name: "Andrew L.",
    country: "Australia",
    procedure: "LASIK",
    content:
      "Fast coordination and clear expectations from pre-op to follow-up.",
    verified: true,
    incentiveDisclosure: "Airport transfer voucher provided and disclosed.",
    verificationMethod: "Procedure booking ID and follow-up record"
  },
  {
    id: "sarah-m-checkup",
    name: "Sarah M.",
    country: "Canada",
    procedure: "Health Checkup",
    content:
      "Everything was efficient and the English report turnaround was quick.",
    verified: true,
    incentiveDisclosure: "No incentive provided.",
    verificationMethod: "Checkup report ID verification"
  },
  {
    id: "daniel-k-veneer",
    name: "Daniel K.",
    country: "Germany",
    procedure: "Veneers",
    content:
      "The timeline was clear and they set realistic expectations on adjustments.",
    verified: false,
    incentiveDisclosure: "Unverified submission. Not used in conversion claims.",
    verificationMethod: "Pending documentation"
  }
];
