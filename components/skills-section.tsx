"use client";

import { useRef, useEffect } from "react";
import {
  Monitor,
  Server,
  Database,
  Cloud,
  Wrench,
  Container,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { SkillCategory } from "@/types/skill";
import skillsData from "@/data/skills.json";

gsap.registerPlugin(ScrollTrigger);

const skillCategories: SkillCategory[] = skillsData;

const iconMap: Record<string, React.ElementType> = {
  Monitor,
  Server,
  Database,
  Cloud,
  Wrench,
  Container,
};

export function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced || !containerRef.current) return;

    const categories = containerRef.current.querySelectorAll(".skill-category");

    gsap.fromTo(
      categories,
      {
        opacity: 0,
        y: 12,
      },
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
      },
    );
  }, []);

  return (
    <section id="skills" className="border-t border-border/70">
      <div className="mx-auto max-w-[1100px] px-6 py-14 md:py-16">
        <div className="mb-10 flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/70 bg-background/40">
            <Wrench className="h-[18px] w-[18px] text-foreground" />
          </span>
          <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-[1.375rem]">
            Habilidades
          </h2>
        </div>
        <div
          ref={containerRef}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skillCategories.map((category, idx) => {
            const Icon = iconMap[category.icon];
            return (
              <div
                key={category.name}
                className="skill-category group relative flex flex-col overflow-hidden rounded-xl border border-border/70 bg-gradient-to-b from-white/[0.02] to-transparent p-5 transition-all duration-200 hover:border-border"
                style={{ opacity: 0 }}
              >
                <div className="mb-4 flex items-center gap-2.5">
                  {Icon && (
                    <span className="flex h-8 w-8 items-center justify-center rounded-md border border-border/70 bg-background/60">
                      <Icon className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:text-foreground" />
                    </span>
                  )}
                  <h3 className="text-sm font-semibold text-foreground">
                    {category.name}
                  </h3>
                  <span className="ml-auto text-xs tabular-nums text-muted-foreground/70">
                    {category.skills.length}
                  </span>
                </div>
                <ul className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill, skillIdx) => (
                    <li
                      key={skill}
                      className="rounded-md border border-border/60 bg-background/40 px-2 py-1 text-xs font-medium leading-none text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:text-foreground cursor-pointer"
                      style={{
                        transitionDelay: `${skillIdx * 40}ms`,
                      }}
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
