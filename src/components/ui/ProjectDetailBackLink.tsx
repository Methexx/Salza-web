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
      Back to projects
    </Link>
  );
}
