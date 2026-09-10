import type { Project } from "@/types/project";
import projectsData from "@/data/projects.json";
import { FolderGit2 } from "lucide-react";

const projects: Project[] = projectsData;
import { ProjectCard } from "@/components/project-card";

export function ProjectsSection() {
  return (
    <section id="projects" className="border-t border-border/70">
      <div className="mx-auto max-w-[1100px] px-5 py-14 sm:px-6 md:py-16">
        <div className="mb-3 flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/70 bg-background/40">
            <FolderGit2 className="h-[18px] w-[18px] text-foreground" />
          </span>
          <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-[1.375rem]">
            Proyectos
          </h2>
        </div>
        <p className="mb-9 max-w-md text-sm leading-relaxed text-muted-foreground">
          Una selección de proyectos en los que he trabajado recientemente.
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
