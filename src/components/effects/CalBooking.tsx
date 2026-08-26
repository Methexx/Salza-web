"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

// Contact section was removed from the page (kept only as a nav label), and
// repurposed to open a Cal.com booking popup instead of scrolling anywhere.
// Booking page: https://cal.com/methum-pathirana
const CAL_LINK = "methum-pathirana";
const CAL_NAMESPACE = "book-a-call";

export const CAL_BOOKING_URL = `https://cal.com/${CAL_LINK}`;

// Any element carrying these attributes is intercepted by the Cal.com embed
// script (once initialized below) and opens the booking modal instead of
// following its href — spread onto plain <a> tags directly. The href/target
// stay as a graceful-degradation fallback straight to the real Cal.com page
// if the embed script hasn't loaded yet.
export const calTriggerProps = {
  "data-cal-link": CAL_LINK,
  "data-cal-namespace": CAL_NAMESPACE,
  "data-cal-config": JSON.stringify({ layout: "month_view" }),
};

// Mounted once near the app root. Loads the Cal.com embed script and wires up
// the "book-a-call" namespace so every calTriggerProps element on the page
// (Navbar, mobile menu, Footer) opens the same popup.
export function CalEmbedInit() {
  useEffect(() => {
    (async function initCal() {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      cal("ui", {
        theme: "dark",
        styles: { branding: { brandColor: "#FF4F03" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return null;
}
