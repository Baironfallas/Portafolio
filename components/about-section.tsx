"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { UserRound } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import aboutData from "@/data/aboutme.json";

gsap.registerPlugin(ScrollTrigger);
import type { AboutMe } from "@/types/aboutme";

const about = aboutData as AboutMe;

export function AboutSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const paragraphsRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const targets = [
      titleRef.current,
      imageRef.current,
      ...paragraphsRef.current.filter(Boolean),
    ];

    if (prefersReduced || !sectionRef.current) {
      gsap.set(targets, { opacity: 1, x: 0, y: 0 });
      return;
    }

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        once: true,
      },
    });

    // Primero el título (fade-up)
    timeline.fromTo(
      titleRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      0
    );

    // Luego la imagen (desplazamiento lateral muy ligero)
    timeline.fromTo(
      imageRef.current,
      { opacity: 0, x: -16 },
      { opacity: 1, x: 0, duration: 0.55, ease: "power2.out" },
      0.15
    );

    // Y el texto en cascada
    timeline.fromTo(
      paragraphsRef.current.filter(Boolean),
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
      0.25
    );
  }, []);

  return (
    <section ref={sectionRef} id={about.sectionId} className="relative border-t border-border/70">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
      />
      <div className="mx-auto max-w-[1100px] px-6 py-14 md:py-16">
        <div className="mb-10 flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/70 bg-background/40">
            <UserRound className="h-[18px] w-[18px] text-foreground" />
          </span>
          <h2
            ref={titleRef}
            className="text-xl font-semibold tracking-tight text-foreground md:text-[1.375rem]"
          >
            {about.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[13rem_1fr] md:gap-14 lg:grid-cols-[15rem_1fr]">
          <div ref={imageRef} className="flex-shrink-0">
            <div className="group relative">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-3 rounded-[1.4rem] bg-foreground/[0.07] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="relative rounded-2xl bg-gradient-to-br from-border/80 via-border/30 to-transparent p-px">
                <div className="profile-image-hover relative aspect-square w-full overflow-hidden rounded-2xl border border-border/60 bg-background md:h-60 md:w-60 lg:h-[15rem] lg:w-[15rem]">
                  <Image
                    src={about.image.src}
                    alt={about.image.alt}
                    fill
                    className="object-cover grayscale-[0.15] transition-all duration-500 group-hover:grayscale-0"
                    sizes="(max-width: 768px) 100vw, 240px"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-2xl">
            {about.paragraphs.map((text, idx) => (
              <p
                key={idx}
                ref={(el) => (paragraphsRef.current[idx] = el)}
                className={[
                  "leading-relaxed",
                  idx === 0
                    ? "text-lg text-foreground/90 md:text-xl"
                    : "mt-5 text-muted-foreground",
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
