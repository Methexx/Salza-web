import { navLinks, sectionMeta } from "@/lib/data/nav";

export const SECTION_IDS = Object.keys(sectionMeta) as Array<keyof typeof sectionMeta>;

export type SectionId = (typeof SECTION_IDS)[number];

export const NAV_LINKS = navLinks;
