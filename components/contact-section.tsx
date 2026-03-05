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
    <section id="contact" className="border-t border-border">
      <div className="mx-auto max-w-[1100px] px-6 py-12 md:py-14">
        <h2 className="mb-8 text-xl font-semibold tracking-tight text-foreground">
          Contacto
        </h2>

        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="mb-6 max-w-sm leading-relaxed text-muted-foreground">
              Abierto a nuevas oportunidades y colaboraciones. Si tienes un
              proyecto en mente o deseas discutir una propuesta, estaré
              encantado de escucharla.
            </p>

            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2.5 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                <Mail className="h-[18px] w-[18px]" />
                {profile.email}
              </a>
              <a
                href={profile.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                <Github className="h-[18px] w-[18px]" />
                GitHub
              </a>
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                <Linkedin className="h-[18px] w-[18px]" />
                LinkedIn
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Nombre */}
            <div className="group relative">
              <label
                htmlFor="contact-name"
                className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-colors duration-200 group-focus-within:text-foreground"
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
                className="w-full border-b-2 border-border bg-transparent pb-2 text-sm text-foreground transition-colors duration-300 placeholder:text-muted-foreground/60 hover:border-foreground/25 focus:border-primary focus:outline-none"
                placeholder="Tu nombre"
              />
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ease-out ${focused === "name" ? "w-full" : "w-0"}`}
              />
            </div>

            {/* Email */}
            <div className="group relative">
              <label
                htmlFor="contact-email"
                className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-colors duration-200 group-focus-within:text-foreground"
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
                className="w-full border-b-2 border-border bg-transparent pb-2 text-sm text-foreground transition-colors duration-300 placeholder:text-muted-foreground/60 hover:border-foreground/25 focus:border-primary focus:outline-none"
                placeholder="tu@email.com"
              />
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ease-out ${focused === "email" ? "w-full" : "w-0"}`}
              />
            </div>

            {/* Mensaje */}
            <div className="group relative">
              <label
                htmlFor="contact-message"
                className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-colors duration-200 group-focus-within:text-foreground"
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
                className="w-full resize-none border-b-2 border-border bg-transparent pb-2 text-sm text-foreground transition-colors duration-300 placeholder:text-muted-foreground/60 hover:border-foreground/25 focus:border-primary focus:outline-none"
                placeholder="Cuéntame sobre tu proyecto..."
              />
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ease-out ${focused === "message" ? "w-full" : "w-0"}`}
              />
            </div>

            <button
              type="submit"
              className="group/btn mt-1 inline-flex w-fit items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all duration-200 hover:shadow-md hover:shadow-primary/20 active:scale-[0.98]"
            >
              <Send className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
              Enviar mensaje
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
