"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, FileDown } from "lucide-react";
import gsap from "gsap";
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
  const [activeSection, setActiveSection] = useState("");
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<Record<number, HTMLAnchorElement | null>>({});
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Animación de entrada del logo
  useEffect(() => {
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out" }
      );
    }
  }, []);

  // Animación de entrada de los links de navegación
  useEffect(() => {
    if (navRef.current && Object.keys(linksRef.current).length > 0) {
      gsap.fromTo(
        Object.values(linksRef.current).filter(Boolean),
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          delay: 0.2,
        }
      );
    }
  }, []);

  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.href.replace("#", ""));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-35% 0px -50% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Animación del menú móvil
  useEffect(() => {
    if (mobileNavRef.current) {
      if (mobileOpen) {
        gsap.fromTo(
          mobileNavRef.current,
          { opacity: 0, height: 0 },
          {
            opacity: 1,
            height: "auto",
            duration: 0.4,
            ease: "power2.out",
          }
        );

        // Animar los items del menú móvil en cascada
        const mobileLinks = mobileNavRef.current.querySelectorAll("a");
        gsap.fromTo(
          mobileLinks,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: "power2.out",
            delay: 0.1,
          }
        );
      }
    }
  }, [mobileOpen]);

  const handleNavHover = (index: number, isHovering: boolean) => {
    const element = linksRef.current[index];
    if (element) {
      gsap.to(element, {
        scale: isHovering ? 1.05 : 1,
        duration: 0.25,
        ease: "power2.out",
      });
    }
  };

  const handleMobileItemHover = (element: HTMLElement | null, isHovering: boolean) => {
    if (element instanceof HTMLElement) {
      gsap.to(element, {
        x: isHovering ? 8 : 0,
        duration: 0.25,
        ease: "power2.out",
      });
    }
  };

  const handleMenuClick = () => {
    if (menuButtonRef.current) {
      gsap.to(menuButtonRef.current, {
        rotation: mobileOpen ? 0 : 180,
        duration: 0.3,
        ease: "power2.out",
      });
    }
    setMobileOpen(!mobileOpen);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#1a1a1a] bg-[#0a0a0a]/90 shadow-[0_1px_18px_rgba(0,0,0,0.18)] backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1100px] items-center justify-between px-6">
        <a
          ref={logoRef}
          href="#hero"
          className="group inline-flex items-center gap-2 text-base font-semibold tracking-tight text-foreground transition-opacity duration-200 hover:opacity-90"
        >
          <span>
            B<span className="text-primary">J</span>
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-primary transition-transform duration-200 group-hover:scale-125" />
        </a>

        <nav
          ref={navRef}
          className="hidden items-center gap-1 md:flex"
        >
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              ref={(el) => {
                if (el) linksRef.current[index] = el;
              }}
              href={link.href}
              onMouseEnter={() => handleNavHover(index, true)}
              onMouseLeave={() => handleNavHover(index, false)}
              className={[
                "relative rounded-lg px-3 py-2 text-sm transition-colors duration-200 ease-out hover:text-primary",
                activeSection === link.href.slice(1)
                  ? "text-foreground"
                  : "text-muted-foreground",
              ].join(" ")}
            >
              {link.label}
              <span
                className={[
                  "absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary transition-all duration-200 ease-out",
                  activeSection === link.href.slice(1)
                    ? "scale-100 opacity-100"
                    : "scale-0 opacity-0",
                ].join(" ")}
              />
            </a>
          ))}
          <a
            ref={(el) => {
              if (el) linksRef.current[navLinks.length] = el;
            }}
            href={profile.cv_url}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => handleNavHover(navLinks.length, true)}
            onMouseLeave={() => handleNavHover(navLinks.length, false)}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors duration-200 ease-out hover:text-primary"
          >
            <FileDown className="h-3.5 w-3.5" />
            CV
          </a>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <button
            ref={menuButtonRef}
            onClick={handleMenuClick}
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
        <nav
          ref={mobileNavRef}
          className="overflow-hidden border-t border-[#1a1a1a] bg-[#0a0a0a] px-6 pb-4 pt-2 md:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              onMouseEnter={(e) => handleMobileItemHover(e.currentTarget as HTMLElement, true)}
              onMouseLeave={(e) => handleMobileItemHover(e.currentTarget as HTMLElement, false)}
              className={[
                "relative block rounded-lg px-3 py-2 text-sm transition-colors duration-200 ease-out hover:text-primary",
                activeSection === link.href.slice(1)
                  ? "text-foreground"
                  : "text-muted-foreground",
              ].join(" ")}
            >
              {link.label}
              {activeSection === link.href.slice(1) && (
                <span className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-primary" />
              )}
            </a>
          ))}
          <a
            href={profile.cv_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            onMouseEnter={(e) => handleMobileItemHover(e.currentTarget as HTMLElement, true)}
            onMouseLeave={(e) => handleMobileItemHover(e.currentTarget as HTMLElement, false)}
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors duration-200 ease-out hover:text-primary"
          >
            <FileDown className="h-3.5 w-3.5" />
            Ver CV
          </a>
        </nav>
      )}
    </header>
  );
}
