export function CalmSectionBackground() {
  return (
    <div aria-hidden="true" className="absolute inset-0 bg-bg/72">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at top, rgb(var(--bg-elevated-2) / 0.56), transparent 62%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgb(var(--bg) / 0.76) 0%, rgb(var(--bg) / 0.62) 36%, rgb(var(--bg-elevated-2) / 0.54) 100%)",
        }}
      />
    </div>
  );
}
