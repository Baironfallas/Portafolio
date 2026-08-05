"use client";

import { useEffect, useRef } from "react";
import { Globe } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Profile } from "@/types/profile";
import profileData from "@/data/profile.json";

gsap.registerPlugin(ScrollTrigger);

const profile: Profile = profileData;

export function LanguagesSection() {
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced || !containerRef.current) return;

    const items = containerRef.current.querySelectorAll(".lang-item");

    gsap.fromTo(
      items,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          once: true,
        },
      }
    );
  }, []);

  const handleItemHover = (index: number, isHovering: boolean) => {
    if (itemsRef.current[index]) {
      gsap.to(itemsRef.current[index], {
        scale: isHovering ? 1.05 : 1,
        duration: 0.25,
        ease: "power2.out",
      });
    }
  };

  return (
    <section id="languages" className="border-t border-border">
      <div className="mx-auto max-w-[1100px] px-6 py-16 md:py-20">
        <div className="mb-10 flex items-center gap-2.5">
          <Globe className="h-5 w-5 text-primary" />
          <h2 className="section-title-accent">
            Idiomas
          </h2>
        </div>

        <div ref={containerRef} className="flex flex-wrap gap-6">
          {profile.languages.map((lang, i) => (
            <div
              key={i}
              ref={(el) => (itemsRef.current[i] = el)}
              onMouseEnter={() => handleItemHover(i, true)}
              onMouseLeave={() => handleItemHover(i, false)}
              className="lang-item group flex cursor-pointer items-center gap-4 rounded-xl border border-border px-7 py-6 transition-all duration-200 hover:border-primary/50 hover:bg-primary/5"
              style={{ opacity: 0 }}
            >
              <span className="text-sm font-semibold text-foreground transition-colors duration-200 group-hover:text-primary">
                {lang.name}
              </span>
              <span className="rounded-md border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                {lang.level}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
