"use client";

import { FormEvent, useState } from "react";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { getGmailComposeUrl } from "@/lib/contact";
import { profile } from "@/lib/data/profile";

type ContactFormState = {
  email: string;
  message: string;
  name: string;
  subject: string;
};

const contactCards = [
  {
    label: "Email",
    value: profile.email,
    href: getGmailComposeUrl("Portfolio inquiry"),
  },
  {
    label: "Location",
    value: profile.location,
    href: "#footer",
  },
  {
    label: "GitHub",
    value: profile.githubUrl.replace(/^https?:\/\//, ""),
    href: profile.githubUrl,
  },
  {
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s+/g, "")}`,
  },
];

const initialFormState: ContactFormState = {
  email: "",
  message: "",
  name: "",
  subject: "",
};

function buildWhatsappUrl(formState: ContactFormState) {
  const lines = [
    `Name: ${formState.name}`,
    `Email: ${formState.email}`,
    `Subject: ${formState.subject}`,
    "",
    formState.message,
  ];

  const text = encodeURIComponent(lines.join("\n"));
  const digits = profile.whatsappNumber?.replace(/\D/g, "") ?? "";

  if (digits) {
    return `https://wa.me/${digits}?text=${text}`;
  }

  return `https://api.whatsapp.com/send?text=${text}`;
}

export function Contact() {
  const [formState, setFormState] = useState<ContactFormState>(initialFormState);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const targetUrl = buildWhatsappUrl(formState);
    window.open(targetUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <SectionWrapper
      id="contact"
      className="border-y border-border bg-[linear-gradient(180deg,rgba(5,5,5,0.88),rgba(7,7,7,0.96))]"
      containerClassName="max-w-[92rem] items-stretch py-20 sm:py-28"
    >
      <div className="relative w-full overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(rgba(249,115,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,0,0.08) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />

        <div className="relative z-10 space-y-10 sm:space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold uppercase tracking-[-0.04em] text-foreground sm:text-6xl lg:text-7xl">
              Contact <span className="text-accent accent-glow-text">Me</span>
            </h2>
            <p className="max-w-3xl text-base leading-8 text-muted sm:text-lg">
              Reach out for business analysis work, requirement support, product discussions, and collaborative opportunities.
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(24rem,0.95fr)]">
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                {contactCards.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="clipped-corner border border-border bg-bg/70 p-5 transition duration-300 hover:border-accent/35 hover:shadow-[0_0_24px_rgba(249,115,0,0.12)]"
                  >
                    <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
                      {item.label}
                    </p>
                    <p className="mt-3 break-all text-base text-foreground sm:text-lg">{item.value}</p>
                  </a>
                ))}
              </div>

              <div className="clipped-corner border border-accent/30 bg-[rgba(6,18,11,0.82)] p-5">
                <div className="inline-flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="status-pulse-fast h-2.5 w-2.5 rounded-full bg-accent"
                  />
                  <p className="text-sm leading-7 text-muted sm:text-base">
                    Currently <span className="font-semibold text-accent">open to projects</span>, freelance work, and collaborations.
                  </p>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="clipped-corner overflow-hidden border border-accent/20 bg-[#0d0d0d] shadow-[0_0_40px_rgba(249,115,0,0.08)]"
            >
              <div className="flex items-center gap-3 border-b border-border bg-[#151515] px-5 py-4">
                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                </div>
                <p className="font-mono text-sm text-muted">sendMessage.js</p>
              </div>

              <div className="space-y-5 p-5 sm:space-y-6 sm:p-8">
                <p className="font-mono text-sm text-accent">$ ping --gihansa</p>

                <div className="space-y-5">
                  <label className="block space-y-2">
                    <span className="font-mono text-xs uppercase tracking-[0.28em] text-muted">
                      &gt; Your Name *
                    </span>
                    <input
                      required
                      value={formState.name}
                      onChange={(event) =>
                        setFormState((current) => ({ ...current, name: event.target.value }))
                      }
                      className="w-full rounded-none border border-border bg-[#121212] px-4 py-3 text-base text-foreground outline-none transition focus:border-accent"
                      placeholder="John Doe"
                    />
                  </label>

                  <label className="block space-y-2">
                    <span className="font-mono text-xs uppercase tracking-[0.28em] text-muted">
                      &gt; Your Email *
                    </span>
                    <input
                      required
                      type="email"
                      value={formState.email}
                      onChange={(event) =>
                        setFormState((current) => ({ ...current, email: event.target.value }))
                      }
                      className="w-full rounded-none border border-border bg-[#121212] px-4 py-3 text-base text-foreground outline-none transition focus:border-accent"
                      placeholder="johndoe@example.com"
                    />
                  </label>

                  <label className="block space-y-2">
                    <span className="font-mono text-xs uppercase tracking-[0.28em] text-muted">
                      &gt; Subject *
                    </span>
                    <input
                      required
                      value={formState.subject}
                      onChange={(event) =>
                        setFormState((current) => ({ ...current, subject: event.target.value }))
                      }
                      className="w-full rounded-none border border-border bg-[#121212] px-4 py-3 text-base text-foreground outline-none transition focus:border-accent"
                      placeholder="Collaboration Request"
                    />
                  </label>

                  <label className="block space-y-2">
                    <span className="font-mono text-xs uppercase tracking-[0.28em] text-muted">
                      &gt; Message *
                    </span>
                    <textarea
                      required
                      value={formState.message}
                      onChange={(event) =>
                        setFormState((current) => ({ ...current, message: event.target.value }))
                      }
                      className="min-h-[11rem] w-full rounded-none border border-border bg-[#121212] px-4 py-3 text-base text-foreground outline-none transition focus:border-accent"
                      placeholder="Just saying hi..."
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  className="clipped-corner-sm inline-flex min-h-12 w-full items-center justify-center border border-accent bg-accent px-5 py-3 font-mono text-sm font-semibold uppercase tracking-[0.24em] text-bg transition duration-300 hover:bg-accent-bright hover:accent-glow-shadow"
                >
                  $ Send --message
                </button>

                <p className="text-center font-mono text-xs text-muted">
                  {profile.whatsappNumber
                    ? "WhatsApp opens with your message ready to send."
                    : "WhatsApp opens with your message ready. Add your real WhatsApp number in profile.ts to target your account directly."}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
