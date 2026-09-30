import type { Project } from "@/types/project";
import projectsData from "@/data/projects.json";

const projects: Project[] = projectsData;
import { ProjectCard } from "@/components/project-card";

export function ProjectsSection() {
  return (
    <section id="projects" className="relative bg-black">
      <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 md:py-20 lg:px-16 xl:px-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start">
          <div className="pt-4 lg:pt-8">
            <p className="mb-5 flex items-center gap-3 text-[0.65rem] font-medium uppercase tracking-[0.24em] text-white/65 sm:text-xs">
              <span className="h-px w-8 bg-white/55" />
              Proyectos
            </p>

            <h2 className="max-w-[7ch] text-[clamp(2.35rem,10vw,4.2rem)] font-semibold uppercase leading-[0.88] tracking-[-0.065em] text-white md:text-[clamp(2.75rem,3.4vw,4rem)]">
              Proyectos
            </h2>

            <p className="mt-6 max-w-[430px] text-base leading-relaxed text-white/62 sm:mt-7 sm:text-lg">
              Una selección de proyectos en los que he trabajado recientemente, aplicando mis conocimientos en desarrollo y diseño de soluciones.
            </p>

            {/* <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-white/85 transition-colors hover:text-white"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/[0.02]">
                <ArrowRight className="h-4 w-4" />
              </span>
              Ver todos los proyectos
            </a> */}
          </div>

          <div className="grid gap-5 xl:grid-cols-2">
            {projects.slice(0, 2).map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
