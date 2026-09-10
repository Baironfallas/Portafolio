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
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
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

  const levelStrength = (level: string) => {
    const l = level.toLowerCase();
    if (l.includes("nativ")) return 5;
    if (l.includes("c2")) return 5;
    if (l.includes("c1")) return 4;
    if (l.includes("b2")) return 4;
    if (l.includes("b1")) return 3;
    if (l.includes("a2")) return 2;
    if (l.includes("a1")) return 1;
    if (l.includes("avanz")) return 4;
    if (l.includes("intermedi")) return 3;
    if (l.includes("bás") || l.includes("bas")) return 2;
    return 3;
  };

  return (
    <section id="languages" className="border-t border-border/70">
      <div className="mx-auto max-w-[1100px] px-5 py-14 sm:px-6 md:py-16">
        <div className="mb-10 flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/70 bg-background/40">
            <Globe className="h-[18px] w-[18px] text-foreground" />
          </span>
          <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-[1.375rem]">
            Idiomas
          </h2>
        </div>

        <div
          ref={containerRef}
          className="grid gap-4 sm:grid-cols-2 lg:max-w-2xl"
        >
          {profile.languages.map((lang, i) => {
            const strength = levelStrength(lang.level);
            return (
              <div
                key={i}
                ref={(el) => (itemsRef.current[i] = el)}
                onMouseEnter={() => handleItemHover(i, true)}
                onMouseLeave={() => handleItemHover(i, false)}
                className="lang-item group flex items-center justify-between gap-4 overflow-hidden rounded-xl border border-border/70 bg-gradient-to-b from-white/[0.02] to-transparent px-5 py-4 transition-all duration-200 hover:border-border cursor-pointer"
                style={{ opacity: 0 }}
              >
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-foreground">
                    {lang.name}
                  </span>
                  <span className="flex items-center gap-1" aria-hidden>
                    {[0, 1, 2, 3, 4].map((dot) => (
                      <span
                        key={dot}
                        className={[
                          "h-1 w-5 rounded-full transition-colors duration-300",
                          dot < strength
                            ? "bg-foreground/80"
                            : "bg-border",
                        ].join(" ")}
                      />
                    ))}
                  </span>
                </div>
                <span className="lang-badge shrink-0 rounded-md border border-border/70 bg-secondary/60 px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                  {lang.level}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
