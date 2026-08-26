"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { sectionMeta } from "@/lib/data/nav";
import { profile } from "@/lib/data/profile";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CAL_BOOKING_URL, calTriggerProps } from "@/components/effects/CalBooking";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

const nameParts = profile.name.trim().split(/\s+/);
const firstName = nameParts[0] ?? profile.name;
const lastName = nameParts.slice(1).join(" ") || firstName;

export function Navbar() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const homeHref = (hash: string) => (pathname === "/" ? hash : `/${hash}`);

  useEffect(() => {
    let ticking = false;
    const sectionIds = ["hero", ...NAV_LINKS.map((link) => link.id)] as Array<keyof typeof sectionMeta>;

    const updateScrollState = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.34;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const nextActiveSection =
        sectionIds.findLast((id) => {
          const element = document.getElementById(id);

          if (!element) {
            return false;
          }

          return element.offsetTop <= scrollPosition;
        }) ?? "hero";

      setIsScrolled(window.scrollY > 24);
      setActiveSection(nextActiveSection);
      setScrollProgress(scrollHeight > 0 ? Math.min(window.scrollY / scrollHeight, 1) : 0);
      ticking = false;
    };

    const handleScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(updateScrollState);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const closeMenu = () => setIsMenuOpen(false);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        toggleRef.current?.focus();
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;

      if (!target) {
        return;
      }

      if (menuRef.current?.contains(target) || toggleRef.current?.contains(target)) {
        return;
      }

      setIsMenuOpen(false);
    };

    // Lenis drives window scroll, so locking the body is what actually stops the
    // page moving behind the panel. Same approach as IntroOverlay.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("hashchange", closeMenu);
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("hashchange", closeMenu);
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isMenuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <Container className="py-4">
        <div
          className={cn(
            "relative flex items-center justify-between overflow-hidden rounded-[6px] border px-3 py-2 transition duration-300 sm:px-4",
            isScrolled
              ? "border-border bg-bg-elevated/85 shadow-[0_18px_48px_rgb(var(--bg)/0.72)] backdrop-blur-xl"
              : "border-transparent bg-transparent",
          )}
        >
          <a
            href={homeHref("#hero")}
            className="flex items-center gap-[2px] font-mono text-sm tracking-[0.02em] text-white transition duration-300 hover:text-accent-bright"
            aria-label={`${profile.name} — Back to home`}
          >
            <span className="uppercase">{firstName}</span>
            <span className="rounded-[3px] bg-accent px-2 py-[3px] font-semibold uppercase text-bg">
              {lastName}
            </span>
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-2 md:flex">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              const isContact = link.id === "contact";

              return (
                <a
                  key={link.id}
                  href={isContact ? CAL_BOOKING_URL : homeHref(link.href)}
                  {...(isContact ? calTriggerProps : { onClick: () => setActiveSection(link.id) })}
                  className={cn(
                    "px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-white transition duration-200 hover:rounded-sm hover:bg-black/85 hover:shadow-[inset_0_-2px_0_0_rgb(var(--accent))]",
                    isActive && "text-accent accent-glow-text",
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="hidden items-center gap-[9px] md:flex">
            <span
              aria-hidden="true"
              className="status-pulse h-[7px] w-[7px] rounded-full bg-accent shadow-[0_0_10px_var(--accent-glow)]"
            />
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-white">
              Available for work
            </span>
          </div>

          <div className="flex items-center md:hidden">
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="clipped-corner-sm inline-flex h-11 w-11 items-center justify-center border border-border bg-bg-elevated text-foreground transition hover:bg-bg-elevated-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {isMenuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-border/40">
            <div
              aria-hidden="true"
              className="h-full origin-left bg-accent shadow-[0_0_12px_var(--accent-glow)] transition-none"
              style={{
                transform: `scaleX(${scrollProgress})`,
              }}
            />
          </div>
        </div>
      </Container>

      <div
        ref={menuRef}
        className={cn(
          "px-4 transition md:hidden",
          isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <Container className="flex justify-end px-0">
          <div
            id="mobile-menu"
            className={cn(
              "clipped-corner mt-2 w-full max-w-xs border border-border bg-bg-elevated/95 p-5 shadow-[0_18px_48px_rgb(var(--bg)/0.76)] backdrop-blur-xl transition duration-300",
              isMenuOpen ? "translate-y-0" : "-translate-y-3",
            )}
          >
            <nav aria-label="Mobile primary" className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;
                const isContact = link.id === "contact";

                return (
                  <a
                    key={link.id}
                    href={isContact ? CAL_BOOKING_URL : homeHref(link.href)}
                    {...(isContact
                      ? { ...calTriggerProps, onClick: () => setIsMenuOpen(false) }
                      : {
                          onClick: () => {
                            setActiveSection(link.id);
                            setIsMenuOpen(false);
                          },
                        })}
                    className={cn(
                      "px-4 py-3 font-mono text-xs uppercase tracking-[0.22em] text-white transition hover:bg-bg-elevated-2",
                      isActive && "bg-bg-elevated-2 text-accent accent-glow-text",
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </a>
                );
              })}
              <Button
                href={CAL_BOOKING_URL}
                className="mt-2"
                onClick={() => setIsMenuOpen(false)}
                {...calTriggerProps}
              >
                Get in touch
              </Button>
            </nav>
          </div>
        </Container>
      </div>
    </header>
  );
}
