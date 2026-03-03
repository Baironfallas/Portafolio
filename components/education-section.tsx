import { GraduationCap } from "lucide-react";
import type { Profile } from "@/types/profile";
import profileData from "@/data/profile.json";

const profile: Profile = profileData;

export function EducationSection() {
  return (
    <section id="education" className="border-t border-border">
      <div className="mx-auto max-w-[1100px] px-6 py-12 md:py-14">
        <div className="mb-8 flex items-center gap-2.5">
          <GraduationCap className="h-5 w-5 text-foreground" />
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Formación académica
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {profile.education.map((edu, i) => (
            <div
              key={i}
              className="flex flex-col rounded-xl border border-border p-5 transition-colors duration-200 hover:bg-hover"
            >
              <p className="text-sm font-semibold text-foreground">
                {edu.degree}
              </p>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {edu.institution}
              </p>
              <p className="mt-auto pt-3 text-xs text-muted-foreground">
                {edu.year}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
