"use client";

import { useEffect, useRef, useState } from "react";

type ProjectTagRowProps = {
  tags: string[];
};

const TAG_ROW_CLASS = "font-mono text-[11px] uppercase tracking-[0.16em]";

export function ProjectTagRow({ tags }: ProjectTagRowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(tags.length);

  useEffect(() => {
    const container = containerRef.current;
    const measure = measureRef.current;

    if (!container || !measure || tags.length === 0) {
      return;
    }

    const recalc = () => {
      const containerWidth = container.offsetWidth;
      const prefixSpans = Array.from(measure.querySelectorAll<HTMLElement>("[data-prefix]"));
      const moreSpans = Array.from(measure.querySelectorAll<HTMLElement>("[data-more]"));

      if (prefixSpans[tags.length - 1]?.offsetWidth <= containerWidth) {
        setVisibleCount(tags.length);
        return;
      }

      let fit = 1;
      for (let i = tags.length - 1; i >= 0; i -= 1) {
        const remaining = tags.length - (i + 1);
        const prefixWidth = prefixSpans[i]?.offsetWidth ?? 0;
        const moreWidth = remaining > 0 ? (moreSpans[remaining - 1]?.offsetWidth ?? 0) : 0;

        if (prefixWidth + moreWidth <= containerWidth) {
          fit = i + 1;
          break;
        }
      }

      setVisibleCount(fit);
    };

    recalc();
    const observer = new ResizeObserver(recalc);
    observer.observe(container);

    return () => observer.disconnect();
  }, [tags]);

  const visibleTags = tags.slice(0, visibleCount);
  const remainingCount = tags.length - visibleTags.length;

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      <div ref={measureRef} aria-hidden="true" className="invisible absolute left-0 top-0 -z-10 whitespace-nowrap">
        {tags.map((_, index) => (
          <span key={index} data-prefix className={`${TAG_ROW_CLASS} block w-max`}>
            {tags.slice(0, index + 1).join(" · ")}
          </span>
        ))}
        {tags.map((_, index) => (
          <span key={index} data-more className={`${TAG_ROW_CLASS} block w-max`}>
            {" "}
            +{index + 1} more
          </span>
        ))}
      </div>

      <p className={`${TAG_ROW_CLASS} truncate text-accent`}>
        {visibleTags.join(" · ")}
        {remainingCount > 0 ? <span className="text-accent/55"> +{remainingCount} more</span> : null}
      </p>
    </div>
  );
}
