import type { Project } from "@/types/project";
import projectsData from "@/data/projects.json";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";

const projects: Project[] = projectsData;

export function ProjectsSection() {
  return (
    <section id="projects" className="relative bg-black">
      <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 md:py-20 lg:px-16 xl:px-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start">
          <div className="pt-4 lg:pt-8">
            <SectionHeading
              eyebrow="Proyectos"
              title="Proyectos"
              description="Una selección de proyectos en los que he trabajado recientemente, aplicando mis conocimientos en desarrollo y diseño de soluciones."
            />
          </div>

          <div className="grid gap-5 xl:grid-cols-2">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
