import { cn } from "@/lib/utils";

export function EyebrowLine() {
  return <span className="h-px w-8 bg-white/55" />;
}

export function SectionEyebrow({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "mb-5 flex items-center text-[0.65rem] font-medium uppercase tracking-[0.24em] text-white/65 sm:text-xs",
        className,
      )}
      {...props}
    />
  );
}

export function SectionTitle({
  as: Tag = "h2",
  className,
  ...props
}: React.ComponentProps<"h2"> & { as?: "h1" | "h2" }) {
  return (
    <Tag
      className={cn(
        "text-[clamp(2.35rem,10vw,4.2rem)] font-semibold uppercase leading-[0.88] tracking-[-0.065em] text-white md:text-[clamp(2.75rem,3.4vw,4rem)]",
        className,
      )}
      {...props}
    />
  );
}

interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  description: React.ReactNode;
  titleClassName?: string;
  descriptionClassName?: string;
}

// Encabezado común de sección: eyebrow + título grande + descripción
export function SectionHeading({
  eyebrow,
  title,
  description,
  titleClassName = "max-w-[7ch]",
  descriptionClassName = "max-w-[430px]",
}: SectionHeadingProps) {
  return (
    <>
      <SectionEyebrow className="gap-3">
        <EyebrowLine />
        {eyebrow}
      </SectionEyebrow>

      <SectionTitle className={titleClassName}>{title}</SectionTitle>

      <p
        className={cn(
          "mt-6 text-base leading-relaxed text-white/62 sm:mt-7 sm:text-lg",
          descriptionClassName,
        )}
      >
        {description}
      </p>
    </>
  );
}
