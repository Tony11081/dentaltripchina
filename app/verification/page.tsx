import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { hospitals } from "@/data/hospitals";
import { hospitalTrustProfiles } from "@/data/trust";

export const metadata: Metadata = {
  title: "Doctor & Hospital Verification",
  description:
    "Doctor license references, verification links, latest check dates, and scope boundaries for partner providers."
};

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
          date, and scope boundaries so patients can assess suitability before booking.
        </p>
        <figure className="editorial-image">
          <Image
            src="/editorial/verification-ledger.svg"
            alt="Provider verification ledger illustration"
            width={1200}
            height={760}
          />
        </figure>
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
