"use client";

import Image from "next/image";
import { ArrowDown, Mail } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { Profile } from "@/types/profile";
import profileData from "@/data/profile.json";

const profile: Profile = profileData;

const headlineLines = ["Código que", "convierte", "ideas en", "productos"];

export function HeroSection() {
  const rootRef = useRef<HTMLElement>(null);

  // Única animación orquestada de la página: retrato, titular por líneas, resto del contenido.
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from("[data-portrait]", { opacity: 0, scale: 1.06, duration: 1.2 }, 0)
          .from("[data-line]", { yPercent: 115, duration: 0.9, stagger: 0.1 }, 0.15)
          .from(
            "[data-fade]",
            { opacity: 0, y: 14, duration: 0.6, stagger: 0.1 },
            0.75,
          );
      },
      rootRef,
    );
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate flex flex-col overflow-hidden bg-black lg:block lg:min-h-svh"
    >
      <div
        data-portrait
        aria-hidden="true"
        className="relative h-[46vh] max-h-[380px] w-full sm:h-[52vh] sm:max-h-[460px] lg:absolute lg:inset-0 lg:h-auto lg:max-h-none lg:w-auto"
      >
        <Image
          src="/images/me2.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="h-full w-full object-cover object-[center_22%] grayscale-[0.2] lg:object-[68%_center]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black lg:hidden"
        />
      </div>

      <div
        aria-hidden="true"
        className="hidden lg:absolute lg:inset-0 lg:block lg:bg-[linear-gradient(90deg,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.74)_25%,rgba(0,0,0,0.42)_42%,rgba(0,0,0,0.12)_60%,rgba(0,0,0,0.08)_100%),linear-gradient(180deg,rgba(0,0,0,0.52)_0%,rgba(0,0,0,0.3)_30%,rgba(0,0,0,0.24)_100%)]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-1 flex-col justify-center px-5 py-8 sm:px-8 sm:py-10 lg:min-h-svh lg:px-16 lg:py-24 xl:px-20">
        <div className="max-w-[470px]">
          <p data-fade className="mb-5 text-sm text-white/70 sm:text-base">
            Bairon Fallas, {profile.role}
          </p>

          <h1
            id="hero-title"
            className="max-w-[10.5ch] text-[clamp(2.35rem,10vw,4.2rem)] font-semibold uppercase leading-[0.88] tracking-[-0.065em] text-white md:text-[clamp(2.75rem,3.4vw,4rem)]"
          >
            {headlineLines.map((line) => (
              <span
                key={line}
                className="block overflow-hidden py-[0.16em] -my-[0.16em]"
              >
                <span data-line className="block">
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p
            data-fade
            className="mt-6 max-w-[430px] text-base leading-relaxed text-white/70 sm:mt-7 sm:text-lg"
          >
            {profile.subheadline}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8">
            <a
              data-fade
              href="#projects"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-white/85"
            >
              Explorar proyectos
              <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              data-fade
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-medium text-white transition-colors hover:border-white/50 hover:bg-white/10"
            >
              <Mail className="h-3.5 w-3.5" />
              Hablemos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
