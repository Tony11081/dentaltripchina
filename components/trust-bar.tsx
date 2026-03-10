export function TrustBar() {
  const items = [
    { icon: "01", label: "Source-linked hospital profiles" },
    { icon: "02", label: "English-speaking patient support" },
    { icon: "03", label: "Save 70-85% vs UK/US" },
    { icon: "04", label: "Fast response within 2 hours" }
  ];

  return (
    <section className="trust-bar">
      <div className="container trust-grid">
        {items.map((item) => (
          <div className="trust-item" key={item.label}>
            <span className="trust-icon">{item.icon}</span>
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
