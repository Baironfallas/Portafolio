"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Profile } from "@/types/profile";
import profileData from "@/data/profile.json";

const profile: Profile = profileData;

const field =
  "w-full border-0 border-b border-white/20 bg-transparent px-0 py-2.5 text-base text-white placeholder:text-white/35 transition-colors focus:border-white focus:outline-none";
const label = "mb-1 block text-sm text-white/60";
const textLink =
  "inline-flex items-center gap-1 text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white";

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [opened, setOpened] = useState(false);

  // mailto no confirma el envío: el mensaje sale desde la app de correo del visitante.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Contacto desde Portfolio - ${formState.name}`,
    );
    const body = encodeURIComponent(
      `${formState.message}\n\nDe: ${formState.name} (${formState.email})`,
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setOpened(true);
  };

  return (
    <section id="contact" className="relative border-t border-white/10 bg-black">
      <div className="mx-auto grid max-w-[1280px] gap-14 px-5 py-20 sm:px-8 md:py-32 lg:grid-cols-12 lg:gap-x-10 lg:px-16 xl:px-20">
        <div className="min-w-0 lg:col-span-7">
          <h2 className="text-4xl font-semibold tracking-[-0.02em] text-white md:text-5xl">
            Contacto
          </h2>

          <p className="mt-6 max-w-[480px] text-base leading-relaxed text-white/70 sm:text-lg">
            Abierto a nuevas oportunidades y colaboraciones. Si tienes un
            proyecto en mente o deseas discutir una propuesta, escríbeme.
          </p>

          <a
            href={`mailto:${profile.email}`}
            className="mt-10 block break-words text-2xl font-medium tracking-tight text-white underline decoration-white/25 underline-offset-8 transition-colors hover:decoration-white sm:text-3xl md:text-4xl"
          >
            {profile.email}
          </a>

          <p className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-base">
            <a
              href={profile.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className={textLink}
            >
              GitHub
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href={profile.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className={textLink}
            >
              LinkedIn
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="min-w-0 space-y-6 lg:col-span-5"
        >
          <div>
            <label htmlFor="contact-name" className={label}>
              Nombre
            </label>
            <input
              id="contact-name"
              type="text"
              required
              value={formState.name}
              onChange={(e) =>
                setFormState((s) => ({ ...s, name: e.target.value }))
              }
              className={field}
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label htmlFor="contact-email" className={label}>
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              required
              value={formState.email}
              onChange={(e) =>
                setFormState((s) => ({ ...s, email: e.target.value }))
              }
              className={field}
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label htmlFor="contact-message" className={label}>
              Mensaje
            </label>
            <textarea
              id="contact-message"
              required
              rows={4}
              value={formState.message}
              onChange={(e) =>
                setFormState((s) => ({ ...s, message: e.target.value }))
              }
              className={`${field} resize-none`}
              placeholder="Cuéntame sobre tu proyecto"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-white/85"
          >
            Abrir en mi correo
          </button>

          {opened && (
            <p role="status" className="text-sm leading-relaxed text-white/60">
              Se abrió tu app de correo con el mensaje listo. Envíalo desde
              ahí. Si no se abrió nada, escríbeme a{" "}
              <a href={`mailto:${profile.email}`} className={textLink}>
                {profile.email}
              </a>
              .
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
