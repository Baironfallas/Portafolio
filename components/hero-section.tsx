"use client";

import { ArrowDown, Mail, FileDown } from "lucide-react";
import type { Profile } from "@/types/profile";
import profileData from "@/data/profile.json";

const profile: Profile = profileData;

export function HeroSection() {
  return (
    <section
      id="hero"
      className="mx-auto flex max-w-[1100px] flex-col items-center px-6 pb-16 pt-20 text-center md:pt-28"
    >
      <p className="mb-3 text-sm font-medium tracking-wide text-muted-foreground">
        {profile.role} &middot; {profile.specialization}
      </p>
      <h1 className="mb-5 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-foreground text-balance md:text-4xl lg:text-[2.75rem]">
        {profile.headline}
      </h1>
      <p className="mb-10 max-w-lg text-base leading-relaxed text-muted-foreground">
        {profile.subheadline}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity duration-200 hover:opacity-90"
        >
          <Mail className="h-4 w-4" />
          Contactar
        </a>
        <a
          href="#projects"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-hover"
        >
          <ArrowDown className="h-4 w-4" />
          Ver proyectos
        </a>
        <a
          href={profile.cv_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-hover"
        >
          <FileDown className="h-4 w-4" />
          Ver CV
        </a>
      </div>
    </section>
  );
}
