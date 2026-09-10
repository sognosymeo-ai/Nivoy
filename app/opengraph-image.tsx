import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #eef2ff 0%, #ffffff 50%, #f1f5f9 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 40,
            fontWeight: 700,
            color: "#1e1b4b",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#4f46e5",
              color: "white",
              fontSize: 32,
            }}
          >
            N
          </div>
          Nivoy
        </div>
        <div
          style={{
            marginTop: 36,
            maxWidth: 860,
            textAlign: "center",
            fontSize: 52,
            fontWeight: 800,
            color: "#0f172a",
            lineHeight: 1.15,
          }}
        >
          Le CRA et la facture racontent-ils la même histoire&nbsp;?
        </div>
        <div style={{ marginTop: 28, fontSize: 26, color: "#475569" }}>
          Détection des écarts entre jours travaillés et jours facturés
        </div>
      </div>
    ),
    { ...size }
  );
}
