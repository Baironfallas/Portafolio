"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { ExternalLink, Github, ArrowUpRight, Lock } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "@/types/project";

gsap.registerPlugin(ScrollTrigger);

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced || !cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: index * 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          once: true,
        },
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === cardRef.current) t.kill();
      });
    };
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="project-card group flex h-full flex-col overflow-hidden rounded-xl border border-border/70 bg-card transition-all duration-300 hover:border-foreground/25 hover:shadow-[0_10px_40px_-12px_rgb(0,0,0,0.5)]"
      style={{ opacity: 0 }}
    >
      {/* Image / Preview */}
      <div className="relative aspect-video w-full overflow-hidden border-b border-border/70 bg-secondary">
        <Image
          src={project.image_url}
          alt={`Vista previa de ${project.name}`}
          fill
          className="object-cover brightness-[0.92] saturate-[0.9] transition-all duration-500 ease-out group-hover:scale-[1.04] group-hover:brightness-100 group-hover:saturate-100"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/70 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-30" />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
        <a
          href={project.demo_url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-3 top-3 flex h-9 w-9 translate-y-1 items-center justify-center rounded-lg border border-border/60 bg-background/80 text-foreground opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-background"
          aria-label={`Ver demo de ${project.name}`}
        >
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 text-[0.9375rem] font-semibold tracking-tight text-foreground">
          {project.name}
        </h3>
        <p className="mb-4 line-clamp-3 text-[0.8125rem] leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        {/* Stack tags */}
        <div className="mb-5 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-border/60 bg-background/40 px-2 py-0.5 text-[0.6875rem] font-medium leading-none text-muted-foreground"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 4 && (
            <span className="rounded-md border border-border/60 bg-background/40 px-2 py-0.5 text-[0.6875rem] font-medium leading-none text-muted-foreground/70">
              +{project.stack.length - 4}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="mt-auto flex items-center gap-2 border-t border-border/60 pt-4">
          <a
            href={project.demo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground transition-opacity duration-200 hover:opacity-90"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Ver proyecto
          </a>
          {project.github_url ? (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border/70 px-3.5 py-2 text-xs font-medium text-muted-foreground transition-colors duration-200 hover:border-border hover:bg-hover hover:text-foreground"
            >
              <Github className="h-3.5 w-3.5" />
              Código
            </a>
          ) : (
            <div
              className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-border/60 px-3.5 py-2 text-xs font-medium text-muted-foreground/80"
              title="Este proyecto es privado"
            >
              <Lock className="h-3.5 w-3.5" />
              Privado
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
