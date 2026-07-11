"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

import { profile } from "@/lib/data/profile";

const colomboTime = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", hour12: false, minute: "2-digit", second: "2-digit", timeZone: "Asia/Colombo" });

export function ColomboClock() {
  const [time, setTime] = useState("--:--:--");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const updateTime = () => setTime(colomboTime.format(new Date()));
    updateTime();
    const interval = window.setInterval(updateTime, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="flex flex-col items-start gap-3 font-mono text-[0.68rem] font-medium uppercase tracking-[0.16em] sm:text-xs">
      <button type="button" onClick={copyEmail} className="group inline-flex items-center gap-2 text-muted transition hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg" aria-label={`Copy ${profile.email}`}>
        <span className="normal-case tracking-[0.08em]">{copied ? "Email copied" : profile.email}</span>
        {copied ? <Check aria-hidden="true" className="h-3.5 w-3.5 text-accent" /> : <Copy aria-hidden="true" className="h-3.5 w-3.5 transition group-hover:scale-110" />}
      </button>
      <div className="inline-flex items-center gap-3 text-muted"><span>Colombo</span><time dateTime={time} className="tabular-nums text-foreground/70">{time}</time></div>
    </div>
  );
}
