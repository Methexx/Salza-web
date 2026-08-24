"use client";

import { useEffect, useState } from "react";

/**
 * SSR-safe media query match. Always starts `false` on the server and during
 * hydration, then syncs in an effect — so callers must treat `false` as
 * "not matched yet" rather than "definitely desktop".
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const update = () => setMatches(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, [query]);

  return matches;
}

/** Below Tailwind's `md` breakpoint — the boundary this codebase treats as "mobile". */
export const MOBILE_QUERY = "(max-width: 767px)";
