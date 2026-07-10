import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="max-w-3xl space-y-5">
      <SectionEyebrow label={eyebrow} />
      <h2 className="text-4xl font-bold text-foreground sm:text-5xl">{title}</h2>
      {description ? (
        <p className="text-base leading-8 text-muted sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
