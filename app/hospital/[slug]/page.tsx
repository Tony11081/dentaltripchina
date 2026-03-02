import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Hero } from "@/components/hero";
import { getHospitalBySlug } from "@/lib/content";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { hospitals } from "@/data/hospitals";
import {
  CredentialBlock,
  DoctorProfiles,
  EmergencyPathway,
  SiteDisclosurePanel
} from "@/components/trust-sections";
import { hospitalTrustProfiles } from "@/data/trust";

export function generateStaticParams() {
  return hospitals.map((hospital) => ({ slug: hospital.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const hospital = getHospitalBySlug(slug);
  if (!hospital) return { title: "Hospital Not Found" };

  return {
    title: hospital.name,
    description: hospital.summary
  };
}

export default async function HospitalDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const hospital = getHospitalBySlug(slug);
  const trustProfile = hospitalTrustProfiles.find((item) => item.hospitalSlug === slug);

  if (!hospital) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Hospital",
    name: hospital.name,
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://dentaltripchina.com"}/hospital/${hospital.slug}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: hospital.address,
      addressCountry: "CN"
    },
    telephone: hospital.phone,
    medicalSpecialty: hospital.specialties,
    isAccreditedBy: {
      "@type": "Organization",
      name: "Joint Commission International",
      url: hospital.jciVerifyUrl
    }
  };

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Hospitals", href: "/hospitals" },
          { label: hospital.name, href: `/hospital/${hospital.slug}` }
        ]}
      />

      <Hero
        eyebrow="Partner Hospital"
        title={hospital.name}
        subtitle={hospital.summary}
        heroImageSrc={hospital.heroImageSrc}
        heroImageAlt={hospital.heroImageAlt}
      />

      <section className="section container">
        <JsonLd data={schema} />
        <div className="card-grid two">
          <article className="card">
            <p className="card-eyebrow">Hospital Overview</p>
            <figure className="editorial-image">
              <Image
                src={hospital.heroImageSrc}
                alt={hospital.heroImageAlt}
                width={1280}
                height={840}
                priority
                fetchPriority="high"
              />
            </figure>
            {hospital.overview.map((item) => (
              <p key={item}>{item}</p>
            ))}
            <p className="trust-note">
              <strong>Key capability:</strong> {hospital.keyStat}
            </p>
          </article>

          <article className="card">
            <p className="card-eyebrow">Location and Contact</p>
            <h3>Address, Map, and Intake Desk</h3>
            <p>{hospital.address}</p>
            <p>
              <a
                href={`https://www.google.com/maps?q=${hospital.lat},${hospital.lng}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in Google Maps
              </a>
            </p>
            <p>
              <strong>Phone:</strong> {hospital.phone || "Phone available on request"}
            </p>
            {hospital.website ? (
              <p>
                <strong>Website:</strong>{" "}
                <a href={hospital.website} target="_blank" rel="noopener noreferrer">
                  Official hospital page
                </a>
              </p>
            ) : null}
            <p className="trust-note">
              <strong>City:</strong> {hospital.city.toUpperCase()} |{" "}
              {hospital.jciYear > 0
                ? `JCI since ${hospital.jciYear}`
                : "Accreditation details available on official site"}
            </p>
          </article>
        </div>
      </section>

      <section className="section container">
        <p className="section-kicker">Department Guide</p>
        <h2>Departments Used Most by International Patients</h2>
        <div className="card-grid three">
          {hospital.departmentHighlights.map((department) => (
            <article className="card trust-block" key={department.name}>
              <h3>{department.name}</h3>
              <p>{department.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section container">
        <p className="section-kicker">Admission Details</p>
        <h2>Payment Methods and International Intake Notes</h2>
        <div className="card-grid two">
          <article className="card trust-block">
            <h3>Payment Methods</h3>
            <ul className="trust-list">
              {hospital.paymentMethods.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="card trust-block">
            <h3>International Patient Notes</h3>
            <ul className="trust-list">
              {hospital.internationalPatientNotes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="section container">
        <p className="section-kicker">Verification</p>
        <h2>Credential and Monitoring Signals</h2>
        <div className="card-grid two">
          <article className="card">
            <h3>Accreditation and Registry Links</h3>
            <p>
              <a href={hospital.jciVerifyUrl} target="_blank" rel="noopener noreferrer">
                Verify accreditation or official listing
              </a>
            </p>
            {hospital.jciYear > 0 ? <p>JCI since {hospital.jciYear}</p> : null}
            <p>Specialty tags: {hospital.specialties.join(", ")}</p>
          </article>

          {trustProfile ? (
            <CredentialBlock
              lastVerified={trustProfile.credentialLastVerified}
              source={trustProfile.credentialSource}
              verifyUrl={hospital.jciVerifyUrl}
              notes={trustProfile.credentialNotes}
            />
          ) : (
            <article className="card trust-block">
              <h3>Credential Monitoring</h3>
              <p>
                Credential detail block is refreshed when hospital verification data is
                published for this profile.
              </p>
            </article>
          )}

          {trustProfile ? (
            <article className="card trust-block">
              <p className="card-eyebrow">Quality Monitoring</p>
              <h3>Ongoing Safety Audits</h3>
              <ul className="trust-list">
                {trustProfile.qualityMonitoring.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ) : null}
        </div>
      </section>

      {trustProfile ? <DoctorProfiles doctors={trustProfile.doctors} /> : null}
      {trustProfile ? <EmergencyPathway items={trustProfile.emergencyPathway} /> : null}
      <SiteDisclosurePanel />
    </>
  );
}
