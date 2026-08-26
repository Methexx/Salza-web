"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Code2, Database, GitBranch, Layers, Server, Wrench } from "lucide-react";
import { useState } from "react";

import { Pill } from "@/components/ui/Pill";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { cn } from "@/lib/utils";
import { sectionMeta } from "@/lib/data/nav";
import { skillCategories, type SkillCategory } from "@/lib/data/skills";

const categoryIcons = [Code2, Server, Database, GitBranch, Layers, Wrench];

function DetailContent({
  category,
  index,
  compact = false,
}: {
  category: SkillCategory;
  index: number;
  compact?: boolean;
}) {
  return (
    <div className="relative">
      {!compact && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-2 right-4 select-none font-display text-[8rem] font-black leading-none text-foreground/5 lg:text-[10rem]"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      )}

      <div className="relative z-10 space-y-5">
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="status-pulse h-[7px] w-[7px] rounded-full bg-accent shadow-[0_0_10px_var(--accent-glow)]"
          />
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            {category.title} · {category.tags.length} Tools
          </p>
        </div>

        <h3 className="text-3xl font-bold text-foreground sm:text-4xl">{category.title}</h3>

        <p className="max-w-lg text-base leading-8 text-muted sm:text-lg">{category.description}</p>

        <div className="flex flex-wrap gap-2.5 border-t border-border/60 pt-5">
          {category.tags.map((tag) => (
            <Pill key={tag}>{tag}</Pill>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SkillsShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full space-y-8">
      <SectionEyebrow label={sectionMeta.skills.eyebrow} />
      <h2 className="max-w-2xl text-4xl font-bold text-foreground sm:text-5xl">
        Capabilities
      </h2>

      <div className="clipped-corner overflow-hidden border border-border bg-bg-elevated/60">
        <div className="md:grid md:grid-cols-[300px_minmax(0,1fr)]">
          <div className="md:border-r md:border-border">
            {skillCategories.map((category, i) => {
              const Icon = categoryIcons[i % categoryIcons.length];
              const isActive = i === activeIndex;

              return (
                <div key={category.title} className="border-b border-border/70 last:border-b-0">
                  <button
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    aria-expanded={isActive}
                    className={cn(
                      "flex w-full items-center gap-3 border-l-2 px-5 py-4 text-left transition-colors",
                      isActive
                        ? "border-accent bg-bg-elevated-2"
                        : "border-transparent hover:bg-bg-elevated-2/50",
                    )}
                  >
                    <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                    <Icon className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
                    <span className="min-w-0 flex-1 truncate text-sm font-semibold text-foreground">
                      {category.title}
                    </span>
                    {/* Always in the layout (not conditionally mounted) so the label's
                        available width — and the row's line count/height — never changes
                        between selected and unselected. Only its visibility toggles. */}
                    <ChevronRight
                      className={cn("ml-auto h-4 w-4 shrink-0 text-accent", !isActive && "invisible")}
                      aria-hidden="true"
                    />
                  </button>

                  <div className="md:hidden">
                    {isActive && (
                      <div className="border-t border-border/70 px-5 py-6">
                        <DetailContent category={category} index={i} compact />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="relative hidden overflow-hidden p-8 md:block lg:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <DetailContent category={skillCategories[activeIndex]} index={activeIndex} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
