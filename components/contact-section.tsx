"use client";

import {
  Send,
  Mail,
  Github,
  Linkedin,
  User,
  AtSign,
  MessageSquare,
} from "lucide-react";
import type { Profile } from "@/types/profile";
import profileData from "@/data/profile.json";

const profile: Profile = profileData;
import { useState } from "react";
import { AnimateOnScroll } from "@/components/animate-on-scroll";

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${profile.email}?subject=Contacto desde Portfolio - ${formState.name}&body=${encodeURIComponent(formState.message)}%0A%0AFrom: ${formState.name} (${formState.email})`;
    window.open(mailtoUrl, "_blank");
  };

  return (
    <section id="contact" className="border-t border-border/70">
      <div className="mx-auto max-w-[1100px] px-6 py-14 md:py-16">
        <div className="mb-10 flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/70 bg-background/40">
            <Mail className="h-[18px] w-[18px] text-foreground" />
          </span>
          <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-[1.375rem]">
            Contacto
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-12">
          <AnimateOnScroll>
            <div className="md:sticky md:top-24">
              <p className="mb-8 max-w-sm text-[1.0625rem] leading-relaxed text-foreground/90">
                Abierto a nuevas oportunidades y colaboraciones. Si tienes un
                proyecto en mente o deseas discutir una propuesta, estaré
                encantado de escucharla.
              </p>

              <div className="flex flex-col gap-2.5">
                <a
                  href={`mailto:${profile.email}`}
                  className="group flex items-center gap-3 rounded-lg border border-border/70 bg-gradient-to-b from-white/[0.02] to-transparent px-4 py-3 text-sm text-muted-foreground transition-all duration-200 hover:border-border hover:bg-hover hover:text-foreground"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border/70 bg-background/60 transition-colors duration-200 group-hover:text-foreground">
                    <Mail className="h-4 w-4" />
                  </span>
                  <span className="truncate">{profile.email}</span>
                </a>
                <a
                  href={profile.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-lg border border-border/70 bg-gradient-to-b from-white/[0.02] to-transparent px-4 py-3 text-sm text-muted-foreground transition-all duration-200 hover:border-border hover:bg-hover hover:text-foreground"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border/70 bg-background/60 transition-colors duration-200 group-hover:text-foreground">
                    <Github className="h-4 w-4" />
                  </span>
                  GitHub
                </a>
                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-lg border border-border/70 bg-gradient-to-b from-white/[0.02] to-transparent px-4 py-3 text-sm text-muted-foreground transition-all duration-200 hover:border-border hover:bg-hover hover:text-foreground"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border/70 bg-background/60 transition-colors duration-200 group-hover:text-foreground">
                    <Linkedin className="h-4 w-4" />
                  </span>
                  LinkedIn
                </a>
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 rounded-xl border border-border/70 bg-gradient-to-b from-white/[0.02] to-transparent p-6 md:p-7"
          >
            {/* Nombre */}
            <div className="group relative">
              <label
                htmlFor="contact-name"
                className="mb-2 flex items-center gap-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground transition-colors duration-200 group-focus-within:text-foreground"
              >
                <User className="h-3 w-3" />
                Nombre
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={formState.name}
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused(null)}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, name: e.target.value }))
                }
                className="w-full rounded-lg border border-border/70 bg-background/40 px-3.5 py-2.5 text-sm text-foreground transition-colors duration-300 placeholder:text-muted-foreground/60 hover:border-border focus:border-foreground/40 focus:bg-background/60 focus:outline-none"
                placeholder="Tu nombre"
              />
              <span
                className={`absolute -bottom-px left-0 h-px rounded-full bg-foreground/50 transition-all duration-300 ease-out ${focused ==="name" ? "w-full" : "w-0"}`}
              />
            </div>

            {/* Email */}
            <div className="group relative">
              <label
                htmlFor="contact-email"
                className="mb-2 flex items-center gap-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground transition-colors duration-200 group-focus-within:text-foreground"
              >
                <AtSign className="h-3 w-3" />
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={formState.email}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, email: e.target.value }))
                }
                className="w-full rounded-lg border border-border/70 bg-background/40 px-3.5 py-2.5 text-sm text-foreground transition-colors duration-300 placeholder:text-muted-foreground/60 hover:border-border focus:border-foreground/40 focus:bg-background/60 focus:outline-none"
                placeholder="tu@email.com"
              />
              <span
                className={`absolute -bottom-px left-0 h-px rounded-full bg-foreground/50 transition-all duration-300 ease-out ${focused ==="email" ? "w-full" : "w-0"}`}
              />
            </div>

            {/* Mensaje */}
            <div className="group relative">
              <label
                htmlFor="contact-message"
                className="mb-2 flex items-center gap-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground transition-colors duration-200 group-focus-within:text-foreground"
              >
                <MessageSquare className="h-3 w-3" />
                Mensaje
              </label>
              <textarea
                id="contact-message"
                required
                rows={4}
                value={formState.message}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, message: e.target.value }))
                }
                className="w-full resize-none rounded-lg border border-border/70 bg-background/40 px-3.5 py-2.5 text-sm text-foreground transition-colors duration-300 placeholder:text-muted-foreground/60 hover:border-border focus:border-foreground/40 focus:bg-background/60 focus:outline-none"
                placeholder="Cuéntame sobre tu proyecto..."
              />
              <span
                className={`absolute -bottom-px left-0 h-px rounded-full bg-foreground/50 transition-all duration-300 ease-out ${focused ==="message" ? "w-full" : "w-0"}`}
              />
            </div>

            <button
              type="submit"
              className="group/btn mt-1 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_1px_0_0_rgba(255,255,255,0.4)_inset] transition-all duration-200 hover:opacity-90 active:scale-[0.99] sm:w-fit"
            >
              <Send className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
              Enviar mensaje
            </button>
          </form>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
