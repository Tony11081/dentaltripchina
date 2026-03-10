import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { hospitals } from "@/data/hospitals";
import { hospitalTrustProfiles } from "@/data/trust";
import { buildMetadata } from "@/lib/metadata";
import { pageImageAssets } from "@/lib/site-images";

export const metadata: Metadata = buildMetadata({
  title: "Doctor & Hospital Verification",
  description:
    "Doctor license references, verification links, latest check dates, and scope boundaries for partner providers.",
  path: "/verification",
  imagePath: pageImageAssets.verificationBanner.src
});

export default function VerificationPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Verification", href: "/verification" }
        ]}
      />

      <section className="section container">
        <p className="section-kicker">Verification Desk</p>
        <h1>Doctor and Hospital Verification</h1>
        <p className="section-lede muted">
          We publish doctor license references, verification links, latest verification
          date, official hospital sources, and scope boundaries so patients can assess suitability before booking.
        </p>
        <figure className="editorial-image">
          <Image
            src={pageImageAssets.verificationBanner.src}
            alt={pageImageAssets.verificationBanner.alt}
            width={1200}
            height={900}
          />
        </figure>
      </section>

      <section className="section container card-grid three">
        <article className="card trust-block">
          <h2>What “Verified Hospital” Means</h2>
          <p>
            “Verified Hospital” means the institution is operating legally under Chinese
            healthcare regulation and that we have cross-checked key public information such
            as official hospital disclosures, department information, and relevant accreditation
            or registry references.
          </p>
          <p className="trust-note">It does not mean a government guarantee of outcomes.</p>
        </article>

        <article className="card trust-block">
          <h2>Official Links</h2>
          <p>
            Where available, we link directly to hospital websites, public registries, and
            official source materials so patients can verify key facts themselves.
          </p>
        </article>

        <article className="card trust-block">
          <h2>Doctor Assignment Note</h2>
          <p>
            Doctor profiles on this page are representative examples of verified physicians
            within partner institutions. Final doctor assignment depends on specialty fit,
            availability, and the confirmed treatment plan.
          </p>
        </article>
      </section>

      <section className="section container card-grid three">
        {hospitals.map((hospital) => {
          const trust = hospitalTrustProfiles.find((item) => item.hospitalSlug === hospital.slug);
          if (!trust) return null;

          return (
            <article className="card trust-block" key={hospital.slug}>
              <p className="card-eyebrow">Hospital Ledger</p>
              <h3>{hospital.name}</h3>
              <p className="muted">{hospital.city.toUpperCase()}</p>
              <p>
                <strong>Last verified:</strong> {trust.credentialLastVerified}
              </p>
              <p>
                <strong>Source:</strong> {trust.credentialSource}
              </p>
              <p>
                <a href={hospital.jciVerifyUrl} target="_blank" rel="noopener noreferrer">
                  Open official hospital verification link
                </a>
              </p>
            </article>
          );
        })}
      </section>

      <section className="section container">
        <h2>Doctor Verification and Scope Boundaries</h2>
        <p className="section-lede muted">
          Patients should use the registry links below to verify license references and review
          scope limits before booking. Final allocation may differ based on confirmed case fit.
        </p>
        <div className="table-scroll">
          <table className="price-table timeline-table">
            <thead>
              <tr>
                <th>Doctor</th>
                <th>License ID</th>
                <th>Latest Verification</th>
                <th>Verification Link</th>
                <th>Treatment Scope Boundary</th>
              </tr>
            </thead>
            <tbody>
              {hospitalTrustProfiles.flatMap((profile) =>
                profile.doctors.map((doctor) => (
                  <tr key={`${profile.hospitalSlug}-${doctor.licenseNumber}`}>
                    <td>
                      <strong>{doctor.name}</strong>
                      <br />
                      <span className="muted">{doctor.title}</span>
                    </td>
                    <td>{doctor.licenseNumber}</td>
                    <td>{doctor.verificationLastChecked}</td>
                    <td>
                      <a href={doctor.verificationUrl} target="_blank" rel="noopener noreferrer">
                        Verify license source
                      </a>
                    </td>
                    <td>
                      <ul className="trust-list compact">
                        {doctor.treatmentBoundary.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
