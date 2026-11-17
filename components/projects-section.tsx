"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "@/types/project";
import projectsData from "@/data/projects.json";

gsap.registerPlugin(ScrollTrigger);

const projects: Project[] = projectsData;

const link =
  "inline-flex items-center gap-1 text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white";

export function ProjectsSection() {
  const rootRef = useRef<HTMLElement>(null);

  // La captura se revela una vez al entrar.
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      {
        calm: "(prefers-reduced-motion: no-preference) and (max-width: 767px)",
        full: "(prefers-reduced-motion: no-preference) and (min-width: 768px)",
      },
      (ctx) => {
        const calm = !!ctx.conditions?.calm;
        gsap.utils.toArray<HTMLElement>("[data-shot]").forEach((shot) => {
          // En móvil: aparece con un fundido suave en vez del barrido.
          gsap.fromTo(
            shot,
            calm ? { opacity: 0, y: 12 } : { clipPath: "inset(0% 0% 100% 0%)" },
            {
              ...(calm
                ? { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
                : {
                    clipPath: "inset(0% 0% 0% 0%)",
                    duration: 1.1,
                    ease: "power3.inOut",
                  }),
              scrollTrigger: { trigger: shot, start: "top 85%", once: true },
            },
          );
        });
      },
      rootRef,
    );
    return () => mm.revert();
  }, []);

  return (
    <section ref={rootRef} id="projects" className="relative bg-black">
      <div className="mx-auto max-w-[1280px] px-5 py-14 sm:px-8 md:py-32 lg:px-16 xl:px-20">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <h2 className="text-4xl font-semibold tracking-[-0.02em] text-white md:text-5xl">
            Proyectos
          </h2>
          <p className="max-w-[420px] text-base leading-relaxed text-white/70">
            Sistemas web que he construido y publicado, con el problema que
            resolvían y las tecnologías que usé.
          </p>
        </div>

        <div className="mt-10 space-y-16 md:mt-20 md:space-y-36">
          {projects.map((project, i) => {
            const flipped = i % 2 === 1;
            return (
              <article
                key={project.id}
                className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-x-10"
              >
                <a
                  data-shot
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Abrir ${project.name}`}
                  className={`relative block aspect-[2/1] overflow-hidden rounded-lg border border-white/10 bg-secondary lg:col-span-8 lg:row-start-1 ${
                    flipped ? "lg:col-start-5" : "lg:col-start-1"
                  }`}
                >
                  <Image
                    src={project.image_url}
                    alt={`Vista previa de ${project.name}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-contain"
                  />
                </a>

                <div
                  className={`lg:col-span-4 lg:row-start-1 ${
                    flipped ? "lg:col-start-1" : "lg:col-start-9"
                  }`}
                >
                  <h3 className="text-2xl font-semibold leading-tight text-white md:text-3xl">
                    {project.name}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-white/70">
                    {project.description}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-white/50">
                    {project.stack.join(", ")}
                  </p>
                  <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
                    <a
                      href={project.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={link}
                    >
                      Ver proyecto
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                    {project.github_url ? (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={link}
                      >
                        Ver código
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      <span className="text-white/40">Código privado</span>
                    )}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
