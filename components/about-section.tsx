"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import aboutData from "@/data/aboutme.json";
import type { AboutMe } from "@/types/aboutme";

const about = aboutData as AboutMe;

export function AboutSection() {
  const titleRef = useRef<HTMLDivElement>(null);
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
    <section id={about.sectionId} className="border-t border-border bg-background">
      <div className="mx-auto max-w-[1180px] px-6 py-16 md:py-20 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div className="flex flex-col justify-center py-2 md:py-6 lg:py-10">
            <div
              ref={titleRef}
              className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary"
            >
              <span className="h-px w-10 bg-primary" />
              <span>{about.title}</span>
            </div>

            <h2 className="mb-8 max-w-xl text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Desarrollador <span className="text-primary">Fullstack</span>
            </h2>

            <div className="max-w-xl">
              {about.paragraphs.map((text, idx) => (
                <p
                  key={idx}
                  ref={(el) => {
                    paragraphsRef.current[idx] = el;
                  }}
                  className={[
                    "text-base leading-8 text-muted-foreground md:text-lg md:leading-9",
                    idx > 0 ? "mt-6" : "",
                  ].join(" ")}
                >
                  {text}
                </p>
              ))}
            </div>
          </div>

          <div
            ref={imageRef}
            className="relative h-[380px] overflow-hidden rounded-lg border border-border bg-secondary/40 transition-colors duration-300 hover:border-primary/50 md:h-[500px] lg:h-[580px]"
          >
            <Image
              src={about.image.src}
              alt={about.image.alt}
              fill
              className="object-cover object-center grayscale contrast-125 saturate-0"
              sizes="(max-width: 1024px) 100vw, 560px"
              priority={false}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
