"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
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
    <section ref={sectionRef} id={about.sectionId} className="border-t border-border">
      <div className="mx-auto max-w-[1100px] px-6 py-12 md:py-14">
        <h2 ref={titleRef} className="mb-8 text-xl font-semibold tracking-tight text-foreground">
          {about.title}
        </h2>

        <div className="flex flex-col items-start gap-8 md:flex-row md:gap-12">
          <div ref={imageRef} className="flex-shrink-0">
            <div className="profile-image-hover relative h-44 w-44 overflow-hidden rounded-xl border border-border md:h-52 md:w-52">
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
