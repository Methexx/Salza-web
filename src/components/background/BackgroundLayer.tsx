"use client";

import { ParticleCanvas } from "@/components/background/ParticleCanvas";

export function BackgroundLayer() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-bg"
    >
      <ParticleCanvas
        config={{
          ambientMotion: true,
          colorVar: "--particle-color",
          density: 1.9,
          direction: "static",
          fadeOut: false,
          interaction: "magnetic",
          opacityMultiplier: 0.68,
          speed: 1,
        }}
      />
    </div>
  );
}
