import { Procedure } from "@/lib/types";

interface ProcedureTimeComparisonProps {
  procedure: Procedure;
}

export function ProcedureTimeComparison({ procedure }: ProcedureTimeComparisonProps) {
  const rows = [
    {
      location: "China",
      appointmentWait: procedure.timeComparison.china.appointmentWait,
      treatmentTime: procedure.timeComparison.china.treatmentTime,
      highlight: true
    },
    {
      location: "United States",
      appointmentWait: procedure.timeComparison.unitedStates.appointmentWait,
      treatmentTime: procedure.timeComparison.unitedStates.treatmentTime
    },
    {
      location: "United Kingdom",
      appointmentWait: procedure.timeComparison.unitedKingdom.appointmentWait,
      treatmentTime: procedure.timeComparison.unitedKingdom.treatmentTime
    },
    {
      location: "Australia",
      appointmentWait: procedure.timeComparison.australia.appointmentWait,
      treatmentTime: procedure.timeComparison.australia.treatmentTime
    }
  ];

  return (
    <section className="section container">
      <p className="section-kicker">Timeline Comparison</p>
      <h2>Appointment Wait vs Treatment Time</h2>
      <table className="price-table timeline-table">
        <thead>
          <tr>
            <th>Location</th>
            <th>Appointment Wait</th>
            <th>Treatment Time</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.location} className={row.highlight ? "timeline-row-highlight" : ""}>
              <td>
                {row.location}
                {row.highlight ? (
                  <>
                    <span className="timeline-chip">Appointment can be ignored</span>
                    <span className="advantage-chip">Advantage</span>
                  </>
                ) : null}
              </td>
              <td className={row.highlight ? "advantage-cell" : ""}>{row.appointmentWait}</td>
              <td className={row.highlight ? "advantage-cell" : ""}>{row.treatmentTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {procedure.timelineDisclosure ? (
        <p className="trust-note">
          <strong>Important:</strong> {procedure.timelineDisclosure.note || procedure.timelineDisclosure.title}
        </p>
      ) : null}
    </section>
  );
}
