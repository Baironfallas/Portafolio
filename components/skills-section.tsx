import type { SkillCategory } from "@/types/skill";
import skillsData from "@/data/skills.json";

const skillCategories: SkillCategory[] = skillsData;

export function SkillsSection() {
  return (
    <section id="skills" className="relative border-t border-white/10 bg-black">
      <div className="mx-auto max-w-[1280px] px-5 py-14 sm:px-8 md:py-32 lg:px-16 xl:px-20">
        <h2 className="text-4xl font-semibold tracking-[-0.02em] text-white md:text-5xl">
          Habilidades
        </h2>

        <ul className="mt-8 divide-y divide-white/10 border-y border-white/10 md:mt-16">
          {skillCategories.map((category) => (
            <li
              key={category.name}
              className="group grid gap-3 py-5 md:grid-cols-12 md:items-baseline md:gap-x-10 md:py-8"
            >
              <h3 className="text-sm text-white/50 transition-colors duration-300 group-hover:text-white md:col-span-3">
                {category.name}
              </h3>
              <ul className="flex flex-wrap gap-x-6 gap-y-1 text-2xl font-medium tracking-tight text-white/60 transition-colors duration-300 group-hover:text-white md:col-span-9 md:text-3xl">
                {category.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
