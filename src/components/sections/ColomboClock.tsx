"use client";

import { useEffect, useState } from "react";

const colomboTime = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  hour12: false,
  minute: "2-digit",
  second: "2-digit",
  timeZone: "Asia/Colombo",
});

export function ColomboClock() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const updateTime = () => setTime(colomboTime.format(new Date()));
    updateTime();
    const interval = window.setInterval(updateTime, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-3 font-mono text-[0.68rem] font-medium uppercase tracking-[0.16em] text-muted sm:text-xs">
      <span>Colombo</span>
      <time dateTime={time} className="tabular-nums text-foreground/70">
        {time}
      </time>
    </div>
  );
}
