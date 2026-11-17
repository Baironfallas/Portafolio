import type { Profile } from "@/types/profile";
import profileData from "@/data/profile.json";

const profile: Profile = profileData;

export function EducationSection() {
  return (
    <section
      id="education"
      className="relative border-t border-white/10 bg-black"
    >
      <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 md:py-32 lg:px-16 xl:px-20">
        <h2 className="text-4xl font-semibold tracking-[-0.035em] text-white md:text-5xl">
          Formación
        </h2>

        <div className="mt-12 grid gap-14 md:mt-16 lg:grid-cols-12 lg:gap-x-10">
          <ul className="space-y-8 lg:col-span-7">
            {profile.education.map((edu) => (
              <li key={edu.degree}>
                <p className="text-sm tabular-nums text-white/55">{edu.year}</p>
                <h3 className="mt-1.5 text-xl font-semibold leading-snug tracking-tight text-white sm:text-2xl">
                  {edu.degree}
                </h3>
                <p className="mt-1 text-white/60">
                  {edu.institution}
                  {edu.note ? `. ${edu.note}.` : ""}
                </p>
              </li>
            ))}
          </ul>

          <div className="space-y-10 lg:col-span-4 lg:col-start-9">
            <div>
              <h3 className="text-sm text-white/50">Certificación</h3>
              <p className="mt-2 text-lg font-medium text-white">
                Scrum Fundamentals Certified (SFC)
              </p>
              <p className="text-white/60">SCRUMstudy, 2025</p>
            </div>

            <div className="border-t border-white/10 pt-10">
              <h3 className="text-sm text-white/50">Idiomas</h3>
              <ul className="mt-2 space-y-1 text-lg text-white">
                {profile.languages.map((lang) => (
                  <li key={lang.name} className="flex justify-between gap-4">
                    <span className="font-medium">{lang.name}</span>
                    <span className="text-white/60">{lang.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
