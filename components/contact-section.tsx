"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Linkedin, Github, Mail, Send, User, AtSign, MessageSquare } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Profile } from "@/types/profile";
import profileData from "@/data/profile.json";

gsap.registerPlugin(ScrollTrigger);

const profile: Profile = profileData;

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [focused, setFocused] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const formCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced || !formCardRef.current) return;

    const tween = gsap.fromTo(
      formCardRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: formCardRef.current,
          start: "top 85%",
          once: true,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${profile.email}?subject=Contacto desde Portfolio - ${formState.name}&body=${encodeURIComponent(formState.message)}%0A%0AFrom: ${formState.name} (${formState.email})`;
    window.open(mailtoUrl, "_blank");

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
  };

  return (
    <section id="contact" className="relative bg-black">
      <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 md:py-20 lg:px-16 xl:px-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <div className="pt-4 lg:pt-8">
            <p className="mb-5 flex items-center gap-3 text-[0.65rem] font-medium uppercase tracking-[0.24em] text-white/65 sm:text-xs">
              <span className="h-px w-8 bg-white/55" />
              Contacto
            </p>

            <h2 className="max-w-[7ch] text-[clamp(2.35rem,10vw,4.2rem)] font-semibold uppercase leading-[0.88] tracking-[-0.065em] text-white md:text-[clamp(2.75rem,3.4vw,4rem)]">
              Contacto
            </h2>

            <p className="mt-6 max-w-[480px] text-base leading-relaxed text-white/62 sm:mt-7 sm:text-lg">
              Abierto a nuevas oportunidades y colaboraciones. Si tienes un proyecto en mente o deseas discutir una propuesta, estaré encantado de escucharlo.
            </p>

            <div className="mt-8 space-y-3">
              <a
                href={`mailto:${profile.email}`}
                className="group flex w-full items-center justify-between rounded-2xl border border-white/15 bg-white/[0.02] px-5 py-4 text-left text-white/90 transition-colors hover:border-white/25 hover:bg-white/[0.04]"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] text-white">
                    <Mail className="h-4 w-4" />
                  </span>
                  <span className="truncate text-lg">fallasbaltodanobairon@gmail.com</span>
                </div>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-white/70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href={profile.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full items-center justify-between rounded-2xl border border-white/15 bg-white/[0.02] px-5 py-4 text-left text-white/90 transition-colors hover:border-white/25 hover:bg-white/[0.04]"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] text-white">
                    <Github className="h-4 w-4" />
                  </span>
                  <span className="text-lg">GitHub</span>
                </div>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-white/70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full items-center justify-between rounded-2xl border border-white/15 bg-white/[0.02] px-5 py-4 text-left text-white/90 transition-colors hover:border-white/25 hover:bg-white/[0.04]"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] text-white">
                    <Linkedin className="h-4 w-4" />
                  </span>
                  <span className="text-lg">LinkedIn</span>
                </div>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-white/70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          <div className="lg:pl-8">
            <div
              ref={formCardRef}
              className="rounded-[1.75rem] border border-white/15 bg-white/[0.02] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-sm md:p-6"
              style={{ opacity: 0 }}
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] text-white">
                  <Mail className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-white">Envíame un mensaje</h3>
                  <p className="text-sm text-white/70">Cuéntame sobre tu proyecto o propuesta.</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="group">
                  <label htmlFor="contact-name" className="mb-1.5 flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-white/70">
                    <User className="h-3.5 w-3.5" />
                    Nombre
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formState.name}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                    onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                    className={`w-full rounded-xl border bg-black/30 px-3.5 py-2.5 text-sm text-white placeholder:text-white/35 transition-all duration-200 focus:outline-none ${
                      focused === "name" ? "border-white/40 bg-black/40" : "border-white/10"
                    }`}
                    placeholder="Tu nombre"
                  />
                </div>

                <div className="group">
                  <label htmlFor="contact-email" className="mb-1.5 flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-white/70">
                    <AtSign className="h-3.5 w-3.5" />
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formState.email}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                    className={`w-full rounded-xl border bg-black/30 px-3.5 py-2.5 text-sm text-white placeholder:text-white/35 transition-all duration-200 focus:outline-none ${
                      focused === "email" ? "border-white/40 bg-black/40" : "border-white/10"
                    }`}
                    placeholder="tu@email.com"
                  />
                </div>

                <div className="group">
                  <label htmlFor="contact-message" className="mb-1.5 flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-white/70">
                    <MessageSquare className="h-3.5 w-3.5" />
                    Mensaje
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formState.message}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                    className={`w-full resize-none rounded-xl border bg-black/30 px-3.5 py-2.5 text-sm text-white placeholder:text-white/35 transition-all duration-200 focus:outline-none ${
                      focused === "message" ? "border-white/40 bg-black/40" : "border-white/10"
                    }`}
                    placeholder="Cuéntame sobre tu proyecto..."
                  />
                </div>

                <button
                  type="submit"
                  className="group mt-1 inline-flex w-full items-center justify-between rounded-xl bg-white px-5 py-3 text-left text-sm font-semibold text-black transition-colors hover:bg-white/90"
                >
                  <span className="inline-flex items-center gap-2.5">
                    {submitted ? <Check className="h-4 w-4" /> : <Send className="h-4 w-4" />}
                    {submitted ? "¡Mensaje listo!" : "Enviar mensaje"}
                  </span>
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-black/10 bg-black/5 text-black">
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
