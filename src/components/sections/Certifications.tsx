import { ExternalLink } from "lucide-react";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { certifications } from "@/lib/data/certifications";
import { sectionMeta } from "@/lib/data/nav";

export function Certifications() {
  return (
    <SectionWrapper id="certifications">
      <div className="w-full space-y-10 sm:space-y-12">
        <SectionHeading
          eyebrow={sectionMeta.certifications.eyebrow}
          title={sectionMeta.certifications.heading}
          description="A growing set of certifications across agile delivery, business analysis, Jira workflows, and UI/UX learning."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certifications.map((item) => {
            const content = (
              <article className="clipped-corner h-full border border-border bg-bg-elevated/82 p-6 transition duration-300 hover:border-accent/35 hover:shadow-[0_0_24px_rgba(249,115,0,0.1)]">
                <div className="flex items-start justify-between gap-4">
                  <p className="font-mono text-xs uppercase tracking-[0.26em] text-accent">
                    {item.issuer}
                  </p>
                  {item.url ? (
                    <ExternalLink className="h-4 w-4 flex-none text-muted" />
                  ) : null}
                </div>
                <h3 className="mt-4 text-2xl font-bold text-foreground">{item.title}</h3>
                <p className="mt-3 text-sm uppercase tracking-[0.18em] text-muted">{item.date}</p>
                {item.credentialId ? (
                  <p className="mt-3 text-sm leading-7 text-muted">
                    Credential ID: <span className="break-all text-foreground/80">{item.credentialId}</span>
                  </p>
                ) : null}
                {item.skills?.length ? (
                  <p className="mt-4 text-sm leading-7 text-muted">
                    Skills: <span className="text-foreground/85">{item.skills.join(", ")}</span>
                  </p>
                ) : null}
                {item.url ? (
                  <p className="mt-4 font-mono text-xs uppercase tracking-[0.22em] text-accent">
                    Show credential
                  </p>
                ) : null}
              </article>
            );

            if (!item.url) {
              return <div key={`${item.issuer}-${item.title}`}>{content}</div>;
            }

            return (
              <a
                key={`${item.issuer}-${item.title}`}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="block h-full"
              >
                {content}
              </a>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
