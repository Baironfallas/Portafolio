import Image from "next/image";
import aboutData from "@/data/aboutme.json";
import type { AboutMe } from "@/types/aboutme";

const about = aboutData as AboutMe;

export function AboutSection() {
  return (
    <section id={about.sectionId} className="border-t border-border">
      <div className="mx-auto max-w-[1100px] px-6 py-12 md:py-14">
        <h2 className="mb-8 text-xl font-semibold tracking-tight text-foreground">
          {about.title}
        </h2>

        <div className="flex flex-col items-start gap-8 md:flex-row md:gap-12">
          <div className="flex-shrink-0">
            <div className="relative h-44 w-44 overflow-hidden rounded-xl border border-border md:h-52 md:w-52">
              <Image
                src={about.image.src}
                alt={about.image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 176px, 208px"
              />
            </div>
          </div>

          <div className="flex-1">
            {about.paragraphs.map((text, idx) => (
              <p
                key={idx}
                className={[
                  "leading-relaxed text-muted-foreground",
                  idx > 0 ? "mt-4" : "",
                ].join(" ")}
              >
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
