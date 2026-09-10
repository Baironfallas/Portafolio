import { Github, Linkedin, Mail } from "lucide-react";
import type { Profile } from "@/types/profile";
import profileData from "@/data/profile.json";

const profile: Profile = profileData;

export function FooterSection() {
  return (
    <footer className="relative border-t border-border/70">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
      />
      <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-5 px-5 py-10 sm:px-6 md:flex-row md:justify-between md:py-8">
        <p className="order-2 text-center text-xs tracking-wide text-muted-foreground md:order-1">
          {profile.name} &copy; {new Date().getFullYear()}. All rights reserved.
        </p>

        <div className="order-1 flex items-center gap-2 md:order-2">
          <a
            href={`mailto:${profile.email}`}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/70 bg-background/40 text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:bg-hover hover:text-foreground"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" />
          </a>
          <a
            href={profile.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/70 bg-background/40 text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:bg-hover hover:text-foreground"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={profile.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/70 bg-background/40 text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:bg-hover hover:text-foreground"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
