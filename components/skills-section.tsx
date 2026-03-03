import {
  Monitor,
  Server,
  Database,
  Cloud,
  Wrench,
  Container,
} from "lucide-react";
import type { SkillCategory } from "@/types/skill";
import skillsData from "@/data/skills.json";

const skillCategories: SkillCategory[] = skillsData;

const iconMap: Record<string, React.ElementType> = {
  Monitor,
  Server,
  Database,
  Cloud,
  Wrench,
  Container,
};

export function SkillsSection() {
  return (
    <section id="skills" className="border-t border-border">
      <div className="mx-auto max-w-[1100px] px-6 py-12 md:py-14">
        <h2 className="mb-8 text-xl font-semibold tracking-tight text-foreground">
          Habilidades
        </h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {skillCategories.map((category) => {
            const Icon = iconMap[category.icon];
            return (
              <div key={category.name}>
                <div className="mb-3 flex items-center gap-2">
                  {Icon && (
                    <Icon className="h-[18px] w-[18px] text-muted-foreground" />
                  )}
                  <h3 className="text-sm font-semibold text-foreground">
                    {category.name}
                  </h3>
                </div>
                <ul className="flex flex-col gap-1.5">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="text-sm leading-relaxed text-muted-foreground"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
