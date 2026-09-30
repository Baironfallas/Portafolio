"use client";

import { useEffect, useRef } from "react";
import {
  Cloud,
  Container,
  Database,
  Monitor,
  Server,
  Wrench,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { SkillCategory } from "@/types/skill";
import skillsData from "@/data/skills.json";
import { AnimatedCounter } from "@/components/animated-counter";
import { RevealText } from "@/components/reveal-text";

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

const categoryDescriptions: Record<string, string> = {
  Frontend: "Interfaces modernas, accesibles y de alto rendimiento.",
  Backend: "Desarrollo de APIs y servicios escalables.",
  "Base de datos": "Diseño y gestión de datos eficientes y seguros.",
  Cloud: "Despliegue y administración de aplicaciones en la nube.",
  Herramientas: "Herramientas que potencian mi productividad y flujo de trabajo.",
};

export function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const categories = containerRef.current.querySelectorAll(".skill-category");
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      gsap.set(categories, { opacity: 1, y: 0 });
      return;
    }

    const tween = gsap.fromTo(
      categories,
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 82%",
          once: true,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section
      id="skills"
      className="relative mx-1 mb-1 min-h-[900px] overflow-hidden rounded-[1.25rem] border border-white/[0.06] bg-black"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.11] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]"
      />

      <div className="relative z-10 mx-auto w-full px-5 py-16 sm:px-8 md:py-20 lg:px-[8vw]">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-start">
          <div className="pt-4 lg:pt-8">
            <p className="mb-5 flex items-center gap-3 text-[0.65rem] font-medium uppercase tracking-[0.24em] text-white/65 sm:text-xs">
              <span className="h-px w-8 bg-white/55" />
              Habilidades
            </p>

            <h2 className="max-w-[8ch] text-[clamp(2.35rem,10vw,4.2rem)] font-semibold uppercase leading-[0.88] tracking-[-0.065em] text-white md:text-[clamp(2.75rem,3.4vw,4rem)]">
              <RevealText>Habilidades</RevealText>
            </h2>

            <p className="mt-6 max-w-[500px] text-base leading-relaxed text-white/62 sm:mt-7 sm:text-lg">
              Tecnologías y herramientas que utilizo para desarrollar soluciones escalables, eficientes y de calidad.
            </p>

            <div className="relative mt-8 hidden max-w-[500px] overflow-hidden rounded-2xl border border-white/10 bg-black/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_20px_60px_-45px_rgba(0,0,0,0.95)] backdrop-blur-sm sm:block">
              <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              </div>
              <pre className="p-6 font-mono text-[0.85rem] leading-[2] text-white/40">
                <code>{`import { Profile } from "@/types/profile";

export default function Build({ profile }: Profile) {
  const stack = ["React", "Next.js", "TypeScript"];

  return (
    <main className="min-h-screen">
      <h1>Ideas into products.</h1>
      <ul>
        {stack.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
    </main>
  );
}`}</code>
              </pre>
            </div>
          </div>

          <div
            ref={containerRef}
            className="grid gap-5 sm:grid-cols-2 lg:gap-6"
          >
            {skillCategories.map((category) => {
              const Icon = iconMap[category.icon];
              const isTools = category.name === "Herramientas";

              return (
                <article
                  key={category.name}
                  className={`skill-category group relative flex min-h-[260px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/35 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_20px_60px_-45px_rgba(0,0,0,0.95)] backdrop-blur-sm transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.035] sm:p-6 ${
                    isTools ? "sm:col-span-2 sm:min-h-[200px]" : ""
                  }`}
                  style={{ opacity: 0 }}
                >
                  <div className="flex items-start gap-4">
                    {Icon && (
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/[0.025] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                        <Icon className="h-6 w-6 text-white/85 transition-transform duration-300 group-hover:scale-110" />
                      </span>
                    )}

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                          {category.name}
                        </h3>
                        <AnimatedCounter
                          value={category.skills.length}
                          className="text-sm tabular-nums text-white/50"
                        />
                      </div>

                      <p className="mt-2 max-w-[36ch] text-sm leading-relaxed text-white/55 sm:text-base">
                        {categoryDescriptions[category.name]}
                      </p>

                      <ul className="mt-5 flex flex-wrap gap-2">
                        {category.skills.map((skill, skillIndex) => (
                          <li
                            key={skill}
                            className="cursor-default rounded-full border border-white/15 bg-black/20 px-3 py-1.5 text-xs font-medium leading-none text-white/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/[0.05] hover:text-white sm:text-sm"
                            style={{ transitionDelay: `${skillIndex * 35}ms` }}
                          >
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
