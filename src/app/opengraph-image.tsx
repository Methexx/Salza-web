import { ImageResponse } from "next/og";
import { profile } from "@/lib/data/profile";

export const runtime = "edge";
export const alt = `${profile.name} | ${profile.role}`;
export const size = { width: 1200, height: 630 };
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
          justifyContent: "center",
          padding: "80px",
          background: "rgb(20, 18, 15)",
          color: "rgb(245, 239, 233)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "rgb(255, 115, 47)",
            marginBottom: 24,
          }}
        >
          {profile.alias}
        </div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 700, lineHeight: 1.1 }}>
          {profile.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 34,
            marginTop: 28,
            color: "rgba(245, 239, 233, 0.75)",
          }}
        >
          {profile.role}
        </div>
      </div>
    ),
    { ...size }
  );
}
