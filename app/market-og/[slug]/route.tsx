import { ImageResponse } from "next/og";
import { getMarketLandingBySlug, getProcedureBySlug } from "@/lib/content";

export const runtime = "edge";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const page = getMarketLandingBySlug(slug);

  if (!page) {
    return new Response("Not found", { status: 404 });
  }

  const procedure = getProcedureBySlug(page.procedureSlug);

  if (!procedure) {
    return new Response("Not found", { status: 404 });
  }

  const procedureLabel = procedure.title.replace(" in China", "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "48px 56px",
          background:
            "linear-gradient(135deg, #f3efe3 0%, #dbe7df 48%, #b7d0c8 100%)",
          color: "#16342d",
          fontFamily: "Arial, Helvetica, sans-serif"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              padding: "10px 16px",
              borderRadius: 999,
              background: "rgba(22, 52, 45, 0.08)",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: 1
            }}
          >
            {page.countryCode.toUpperCase()} MARKET GUIDE
          </div>
          <div style={{ display: "flex", fontSize: 28, fontWeight: 700 }}>
            DentalTripChina
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: "86%" }}>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 700, color: "#246654" }}>
            Source-linked treatment planning in China
          </div>
          <div style={{ display: "flex", fontSize: 72, lineHeight: 1.05, fontWeight: 800 }}>
            {procedureLabel} for {page.countryCode} Patients
          </div>
          <div style={{ display: "flex", fontSize: 28, lineHeight: 1.35, maxWidth: "92%" }}>
            Compare China pricing, booking speed, hospitals, FAQs, and source-backed planning
            notes before you book.
          </div>
        </div>

        <div style={{ display: "flex", gap: 18 }}>
          {[
            {
              label: "China estimate",
              value: `USD ${page.chinaPriceUsd.toLocaleString()}`
            },
            {
              label: "Home reference",
              value: `USD ${page.homeMarketPriceUsd.toLocaleString()}`
            },
            {
              label: "China booking",
              value: page.chinaAppointmentWait
            }
          ].map((item) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: 320,
                minHeight: 136,
                padding: "22px 24px",
                borderRadius: 28,
                background: "rgba(255,255,255,0.78)",
                boxShadow: "0 18px 48px rgba(22,52,45,0.12)"
              }}
            >
              <div style={{ display: "flex", fontSize: 22, color: "#45665d" }}>{item.label}</div>
              <div style={{ display: "flex", fontSize: 34, fontWeight: 800 }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630
    }
  );
}
