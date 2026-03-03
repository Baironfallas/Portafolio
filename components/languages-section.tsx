import { Globe } from "lucide-react";
import type { Profile } from "@/types/profile";
import profileData from "@/data/profile.json";

const profile: Profile = profileData;

export function LanguagesSection() {
  return (
    <section id="languages" className="border-t border-border">
      <div className="mx-auto max-w-[1100px] px-6 py-12 md:py-14">
        <div className="mb-8 flex items-center gap-2.5">
          <Globe className="h-5 w-5 text-foreground" />
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Idiomas
          </h2>
        </div>

        <div className="flex flex-wrap gap-4">
          {profile.languages.map((lang, i) => (
            <div
              key={i}
              className="flex items-center gap-4 rounded-xl border border-border px-5 py-4 transition-colors duration-200 hover:bg-hover"
            >
              <span className="text-sm font-semibold text-foreground">
                {lang.name}
              </span>
              <span className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                {lang.level}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
