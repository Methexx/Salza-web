export function ProjectsSectionBackground() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden bg-bg [mask-image:linear-gradient(to_bottom,transparent_0%,black_14%,black_86%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_14%,black_86%,transparent_100%)]"
    >
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(var(--foreground) / 1) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--foreground) / 1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 14% 22%, rgb(var(--accent) / 0.12), transparent 24%), radial-gradient(circle at 84% 14%, rgb(var(--accent) / 0.09), transparent 20%), radial-gradient(circle at 68% 82%, rgb(var(--accent) / 0.1), transparent 26%), radial-gradient(circle at 6% 86%, rgb(var(--accent) / 0.08), transparent 22%), radial-gradient(circle at 46% 52%, rgb(var(--accent) / 0.06), transparent 30%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.55] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
