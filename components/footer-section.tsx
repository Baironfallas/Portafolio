import { Github, Linkedin, Mail } from "lucide-react";
import type { Profile } from "@/types/profile";
import profileData from "@/data/profile.json";

const profile: Profile = profileData;

export function FooterSection() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-4 px-6 py-8 md:flex-row md:justify-between">
        <p className="text-xs text-muted-foreground">
          {profile.name} &copy; {new Date().getFullYear()}. All rights reserved.
        </p>

        <div className="flex items-center gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" />
          </a>
          <a
            href={profile.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={profile.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
