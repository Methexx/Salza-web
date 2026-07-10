"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.25M12 19.25v2.25M4.57 4.57l1.6 1.6M17.83 17.83l1.6 1.6M2.5 12h2.25M19.25 12h2.25M4.57 19.43l1.6-1.6M17.83 6.17l1.6-1.6" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.38 14.54A8.5 8.5 0 0 1 9.46 3.62a8.5 8.5 0 1 0 10.92 10.92Z" />
    </svg>
  );
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme !== "light" : true;

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "clipped-corner-sm inline-flex h-10 w-10 items-center justify-center border border-border bg-bg-elevated text-foreground transition hover:bg-bg-elevated-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
      )}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      <SunIcon className={cn("h-4 w-4", isDark ? "hidden" : "block")} />
      <MoonIcon className={cn("h-4 w-4", isDark ? "block" : "hidden")} />
    </button>
  );
}
