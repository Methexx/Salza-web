import type { Metadata } from "next";
import { BackgroundLayer } from "@/components/background/BackgroundLayer";
import { CursorOrb } from "@/components/effects/CursorOrb";
import { IntroOverlay } from "@/components/effects/IntroOverlay";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { BackToTopButton } from "@/components/layout/BackToTopButton";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Methum Pathirana | Full-Stack Developer",
  description: "Portfolio of Methum Pathirana, a Software Engineering undergraduate and full-stack developer building modern web applications, backend services, and APIs.",
  icons: {
    icon: [
      { url: "/favicons/favicon.ico" },
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicons/favicon.ico",
    apple: [{ url: "/favicons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/favicons/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="bg-bg text-foreground antialiased"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <IntroOverlay />
          <a
            href="#main-content"
            className="sr-only z-[70] clipped-corner-sm bg-accent px-4 py-2 text-sm font-mono font-medium uppercase tracking-[0.24em] text-bg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          >
            Skip to content
          </a>
          <div className="relative min-h-screen bg-bg text-foreground">
            <SmoothScroll />
            <CursorOrb />
            <BackToTopButton />
            <BackgroundLayer />
            <Navbar />
            <main id="main-content" className="relative z-10">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
