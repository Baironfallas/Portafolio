import type { Project } from "@/types/project";
import projectsData from "@/data/projects.json";

const projects: Project[] = projectsData;
import { ProjectCard } from "@/components/project-card";

export function ProjectsSection() {
  return (
    <section id="projects" className="border-t border-border">
      <div className="mx-auto max-w-[1100px] px-6 py-12 md:py-14">
        <h2 className="mb-2 text-xl font-semibold tracking-tight text-foreground">
          Proyectos
        </h2>
        <p className="mb-8 text-sm text-muted-foreground">
          Una selección de proyectos en los que he trabajado recientemente.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
