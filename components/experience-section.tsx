"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const jobs = [
  {
    when: "jun. 2026 – nov. 2026",
    org: "Universidad Nacional de Costa Rica",
    role: "Desarrollador backend, práctica profesional",
    what: "Lanakú, sistema de gestión hotelera y turística (Nicoya, híbrido)",
    points: [
      "Diseñé la base de datos en MySQL y desarrollé APIs REST con NestJS, TypeScript y TypeORM, con autenticación JWT y control de acceso por roles y permisos.",
      "Desarrollé módulos de reservas, habitaciones, tarifas y clientes con políticas de reserva y cancelación, y un módulo de RR. HH. con reclutamiento, empleados, vacaciones y solicitudes.",
      "Generé reportes en PDF y Excel y notificaciones por correo; documenté la API con Swagger y la probé con Jest.",
    ],
  },
  {
    when: "feb. 2025 – jun. 2026",
    org: "Centro Agrícola Cantonal de Puntarenas",
    role: "Desarrollador full stack",
    what: "Sistema de gestión de RR. HH. en producción (Jicaral, híbrido)",
    points: [
      "Participé desde el levantamiento de requerimientos con el cliente hasta las pruebas, con React, TypeScript, NestJS y MySQL.",
      "Implementé la lógica de las calculadoras de aguinaldo y liquidación según la legislación laboral costarricense.",
      "Implementé el control de asistencia y la acumulación automática de vacaciones según las políticas de la empresa.",
      "Trabajé en un equipo autogestionado bajo Scrum con Git, GitFlow y Azure DevOps.",
    ],
  },
];

export function ExperienceSection() {
  const rootRef = useRef<HTMLElement>(null);

  // La línea avanza con el scroll y cada punto se rellena al llegar a él.
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        gsap.fromTo(
          "[data-progress]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: "[data-timeline]",
              start: "top 60%",
              end: "bottom 60%",
              scrub: true,
            },
          },
        );
        gsap.utils.toArray<HTMLElement>("[data-dot]").forEach((dot) => {
          ScrollTrigger.create({
            trigger: dot,
            start: "top 60%",
            toggleClass: { targets: dot, className: "is-on" },
          });
        });
      },
      rootRef,
    );
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set("[data-progress]", { scaleY: 1 });
      gsap.set("[data-dot]", { className: "+=is-on" });
    }, rootRef);
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="experience"
      className="relative border-t border-white/10 bg-black"
    >
      <div className="mx-auto grid max-w-[1280px] gap-12 px-5 py-20 sm:px-8 md:py-32 lg:grid-cols-12 lg:gap-x-10 lg:px-16 xl:px-20">
        <h2 className="text-4xl font-semibold tracking-[-0.02em] text-white md:text-5xl lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          Experiencia
        </h2>

        <div data-timeline className="relative lg:col-span-8">
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-[5px] top-2 w-px bg-white/15"
          />
          <div
            data-progress
            aria-hidden="true"
            className="absolute bottom-0 left-[5px] top-2 w-px origin-top bg-white"
          />

          <div className="space-y-16">
            {jobs.map((job) => (
              <article key={job.org} className="relative pl-9 sm:pl-12">
                <span
                  data-dot
                  aria-hidden="true"
                  className="absolute left-0 top-2 h-[11px] w-[11px] rounded-full border border-white/50 bg-black transition-colors duration-300 [&.is-on]:border-white [&.is-on]:bg-white"
                />
                <p className="text-sm tabular-nums text-white/55">{job.when}</p>
                <h3 className="mt-2 text-2xl font-semibold leading-tight text-white">
                  {job.org}
                </h3>
                <p className="mt-2 text-base text-white/80">
                  {job.role}. {job.what}
                </p>
                <ul className="mt-5 max-w-[68ch] list-disc space-y-2.5 pl-5 text-[0.95rem] leading-relaxed text-white/60 marker:text-white/30">
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
