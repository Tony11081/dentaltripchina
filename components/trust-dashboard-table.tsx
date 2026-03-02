import { monthlyTrustMetrics, trustMetricDefinitions } from "@/data/trust-dashboard";

function formatMonth(value: string) {
  const [year, month] = value.split("-").map(Number);
  if (!year || !month) return value;
  return new Date(year, month - 1, 1).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short"
  });
}

export function TrustDashboardTable() {
  return (
    <section className="section container">
      <p className="section-kicker">Trust Dashboard</p>
      <h2>Monthly Quality Metrics</h2>
      <div className="card-grid two trust-metric-cards">
        {trustMetricDefinitions.map((item) => (
          <article className="card trust-block" key={item.key}>
            <h3>{item.title}</h3>
            <p className="trust-note">
              <strong>Target:</strong> {item.target}
            </p>
            <p className="muted">{item.note}</p>
          </article>
        ))}
      </div>

      <div className="table-scroll">
        <table className="price-table timeline-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Median First Response</th>
              <th>Appointment Fulfillment</th>
              <th>Complaint Resolution</th>
              <th>Post-Op Follow-Up Completion</th>
            </tr>
          </thead>
          <tbody>
            {monthlyTrustMetrics.map((item, index) => (
              <tr key={item.month} className={index === monthlyTrustMetrics.length - 1 ? "advantage-row" : ""}>
                <td>{formatMonth(item.month)}</td>
                <td className={index === monthlyTrustMetrics.length - 1 ? "advantage-cell" : ""}>
                  {item.medianFirstResponseMinutes} min
                </td>
                <td className={index === monthlyTrustMetrics.length - 1 ? "advantage-cell" : ""}>
                  {item.appointmentFulfillmentPct}%
                </td>
                <td className={index === monthlyTrustMetrics.length - 1 ? "advantage-cell" : ""}>
                  {item.complaintResolutionHours} h
                </td>
                <td className={index === monthlyTrustMetrics.length - 1 ? "advantage-cell" : ""}>
                  {item.followUpCompletionPct}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
