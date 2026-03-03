"use client";

import { useState } from "react";
import { Menu, X, FileDown } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import type { Profile } from "@/types/profile";
import profileData from "@/data/profile.json";

const profile: Profile = profileData;

const navLinks = [
  { label: "Sobre mí", href: "#about" },
  { label: "Habilidades", href: "#skills" },
  { label: "Proyectos", href: "#projects" },
  { label: "Contacto", href: "#contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-[1100px] items-center justify-between px-6">
        <a
          href="#about"
          className="text-base font-semibold tracking-tight text-foreground transition-opacity duration-200 hover:opacity-80"
        >
          {profile.name}
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors duration-200 hover:bg-hover hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <a
            href={profile.cv_url}
            download
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors duration-200 hover:bg-hover hover:text-foreground"
          >
            <FileDown className="h-3.5 w-3.5" />
            CV
          </a>
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-200 hover:bg-hover"
            aria-label="Abrir menú"
          >
            {mobileOpen ? (
              <X className="h-[18px] w-[18px] text-foreground" />
            ) : (
              <Menu className="h-[18px] w-[18px] text-foreground" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-border bg-background px-6 pb-4 pt-2 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors duration-200 hover:bg-hover hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <a
            href={profile.cv_url}
            download
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors duration-200 hover:bg-hover hover:text-foreground"
          >
            <FileDown className="h-3.5 w-3.5" />
            Descargar CV
          </a>
        </nav>
      )}
    </header>
  );
}
