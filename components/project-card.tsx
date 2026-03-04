"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
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

    const isEven = index % 2 === 0;

    gsap.fromTo(
      cardRef.current,
      {
        opacity: 0,
        x: isEven ? -40 : 40,
        rotateY: isEven ? 4 : -4,
      },
      {
        opacity: 1,
        x: 0,
        rotateY: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 88%",
          end: "top 60%",
          toggleActions: "play none none none",
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
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-foreground/20 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgb(255,255,255,0.04)]"
      style={{ opacity: 0 }}
    >
      {/* Image / Preview */}
      <div className="relative aspect-video w-full overflow-hidden bg-secondary">
        <Image
          src={project.image_url}
          alt={`Vista previa de ${project.name}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <a
          href={project.demo_url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg bg-background/90 text-foreground opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 hover:bg-background"
          aria-label={`Ver demo de ${project.name}`}
        >
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-1.5 text-lg font-semibold text-foreground">
          {project.name}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        {/* Stack tags */}
        <div className="mb-5 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 4 && (
            <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground">
              +{project.stack.length - 4}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="mt-auto flex items-center gap-3">
          <a
            href={project.demo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-opacity duration-200 hover:opacity-90"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Ver proyecto
          </a>
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-xs font-medium text-foreground transition-colors duration-200 hover:bg-hover"
          >
            <Github className="h-3.5 w-3.5" />
            Código
          </a>
        </div>
      </div>
    </div>
  );
}
