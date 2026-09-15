"use client";

import { useEffect, useRef, useState } from "react";

const sections = [
  { id: "hero", label: "Inicio" },
  { id: "about", label: "Sobre mí" },
  { id: "skills", label: "Habilidades" },
  { id: "education", label: "Educación" },
  { id: "languages", label: "Idiomas" },
  { id: "projects", label: "Proyectos" },
  { id: "contact", label: "Contacto" },
];

export function SectionDots() {
  const [activeId, setActiveId] = useState("hero");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    if (targets.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    targets.forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <nav
      aria-label="Progreso de secciones"
      className="pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex"
    >
      {sections.map((section) => {
        const isActive = activeId === section.id;
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="group pointer-events-auto flex items-center gap-2.5"
            aria-label={section.label}
            aria-current={isActive}
          >
            <span className="translate-x-1 whitespace-nowrap rounded-md border border-border/70 bg-background/80 px-2 py-1 text-[0.6875rem] font-medium text-muted-foreground opacity-0 backdrop-blur-md transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
              {section.label}
            </span>
            <span
              className={[
                "block rounded-full transition-all duration-300 ease-out",
                isActive
                  ? "h-2.5 w-2.5 bg-brand shadow-[0_0_8px_1px] shadow-brand/50"
                  : "h-1.5 w-1.5 bg-border group-hover:bg-muted-foreground",
              ].join(" ")}
            />
          </a>
        );
      })}
    </nav>
  );
}
