"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

type ProjectDetailBackLinkProps = {
  fallbackHref: string;
  className?: string;
};

export function ProjectDetailBackLink({ fallbackHref, className }: ProjectDetailBackLinkProps) {
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.history.length > 1) {
      event.preventDefault();
      router.back();
    }
  };

  return (
    <Link href={fallbackHref} onClick={handleClick} className={className}>
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 text-accent"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M19 12H5M11 18l-6-6 6-6" />
      </svg>
      Back to work
    </Link>
  );
}
