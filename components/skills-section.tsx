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
    <section id="skills" className="border-t border-border">
      <div className="mx-auto max-w-[1100px] px-6 py-12 md:py-14">
        <h2 className="mb-8 text-xl font-semibold tracking-tight text-foreground">
          Habilidades
        </h2>
        <div
          ref={containerRef}
          className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6"
        >
          {skillCategories.map((category, idx) => {
            const Icon = iconMap[category.icon];
            return (
              <div
                key={category.name}
                className="skill-category group"
                style={{ opacity: 0 }}
              >
                <div className="mb-3 flex items-center gap-2">
                  {Icon && (
                    <Icon className="h-[18px] w-[18px] text-muted-foreground transition-all duration-300 group-hover:text-foreground group-hover:scale-110" />
                  )}
                  <h3 className="text-sm font-semibold text-foreground">
                    {category.name}
                  </h3>
                </div>
                <ul className="flex flex-col gap-1.5">
                  {category.skills.map((skill, skillIdx) => (
                    <li
                      key={skill}
                      className="text-sm leading-relaxed text-muted-foreground transition-all duration-300 group-hover:text-foreground hover:translate-x-1 cursor-pointer"
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
