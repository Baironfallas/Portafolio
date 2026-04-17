"use client";

import { useEffect, useRef } from "react";
import { GraduationCap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Profile } from "@/types/profile";
import profileData from "@/data/profile.json";

gsap.registerPlugin(ScrollTrigger);

const profile: Profile = profileData;

export function EducationSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced || !containerRef.current) return;

    const cards = containerRef.current.querySelectorAll(".edu-card");

    gsap.fromTo(
      cards,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          once: true,
        },
      }
    );
  }, []);

  const handleCardHover = (index: number, isHovering: boolean) => {
    if (cardsRef.current[index]) {
      gsap.to(cardsRef.current[index], {
        scale: isHovering ? 1.05 : 1,
        duration: 0.25,
        ease: "power2.out",
      });
    }
  };

  return (
    <section id="education" className="border-t border-border">
      <div className="mx-auto max-w-[1100px] px-6 py-16 md:py-20">
        <div className="mb-10 flex items-center gap-2.5">
          <GraduationCap className="h-5 w-5 text-foreground" />
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Formación académica
          </h2>
        </div>

        <div ref={containerRef} className="grid gap-6 md:grid-cols-3">
          {profile.education.map((edu, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              onMouseEnter={() => handleCardHover(i, true)}
              onMouseLeave={() => handleCardHover(i, false)}
              className="edu-card flex flex-col rounded-xl border border-border p-6 transition-all duration-200 hover:bg-hover cursor-pointer"
              style={{ opacity: 0 }}
            >
              <p className="text-sm font-semibold text-foreground">
                {edu.degree}
              </p>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {edu.institution}
              </p>
              <p className="mt-auto pt-3 text-xs text-muted-foreground">
                {edu.year}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
