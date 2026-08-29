import { ImageResponse } from "next/og";
import { getProjectBySlug } from "@/lib/data/projects";

export const runtime = "edge";
export const alt = "Methum Pathirana — Project";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function ProjectOpengraphImage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  const title = project?.title ?? "Methum Pathirana";
  const category = project?.category ?? "Full-Stack Developer";

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
          {category}
        </div>
        <div style={{ display: "flex", fontSize: 68, fontWeight: 700, lineHeight: 1.1 }}>
          {title}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            marginTop: 28,
            color: "rgba(245, 239, 233, 0.75)",
          }}
        >
          Methum Pathirana — Full-Stack Developer
        </div>
      </div>
    ),
    { ...size }
  );
}
