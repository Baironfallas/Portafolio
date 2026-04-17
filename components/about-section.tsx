"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import aboutData from "@/data/aboutme.json";
import type { AboutMe } from "@/types/aboutme";

const about = aboutData as AboutMe;

export function AboutSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const paragraphsRef = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const timeline = gsap.timeline();

    // Entrada del título
    timeline.fromTo(
      titleRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: "power2.out" },
      0
    );

    // Entrada de la imagen con escala
    timeline.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.7, ease: "back.out" },
      0.2
    );

    // Entrada de los párrafos en cascada
    timeline.fromTo(
      paragraphsRef.current.filter(Boolean),
      { opacity: 0 },
      { opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
      0.4
    );
  }, []);

  return (
    <section id={about.sectionId} className="border-t border-border">
      <div className="mx-auto max-w-[1100px] px-6 py-12 md:py-14">
        <h2 ref={titleRef} className="mb-8 text-xl font-semibold tracking-tight text-foreground">
          {about.title}
        </h2>

        <div className="flex flex-col items-start gap-8 md:flex-row md:gap-12">
          <div ref={imageRef} className="flex-shrink-0">
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
                ref={(el) => (paragraphsRef.current[idx] = el)}
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
