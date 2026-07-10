import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonBaseProps = {
  children: ReactNode;
  className?: string;
  variant?: "solid" | "ghost";
};

type ButtonLinkProps = ButtonBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonElementProps = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonProps = ButtonLinkProps | ButtonElementProps;

const buttonStyles = {
  solid:
    "bg-accent text-bg hover:bg-accent-bright hover:accent-glow-shadow",
  ghost: "bg-transparent text-foreground hover:bg-bg-elevated-2/80 hover:text-foreground",
};

export function Button({
  children,
  className,
  variant = "solid",
  ...props
}: ButtonProps) {
  const classes = cn(
    "clipped-corner-sm inline-flex min-h-11 items-center justify-center border border-border bg-bg-elevated px-5 py-2 text-sm font-mono font-medium uppercase tracking-[0.2em] transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
    buttonStyles[variant],
    className,
  );

  if ("href" in props && props.href) {
    const { href, ...linkProps } = props as ButtonLinkProps;
    const shouldUseAnchor =
      Boolean(linkProps.download) ||
      href.startsWith("http") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:");

    if (shouldUseAnchor) {
      return (
        <a href={href} className={classes} {...linkProps}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonElementProps;

  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
