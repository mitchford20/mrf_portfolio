import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/data/projects";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="group surface interactive-surface flex h-full flex-col overflow-hidden rounded-[1.75rem]">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-muted">
        <Image
          src={project.image}
          alt={`${project.title} project preview`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="project-image object-cover"
        />
        <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/55 px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] text-white backdrop-blur-md">
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="text-2xl font-semibold leading-tight tracking-[-0.04em] sm:text-[1.7rem]">
          {project.title}
        </h3>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">{project.description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        {(project.website || project.source) && (
          <div className="mt-auto flex gap-4 pt-7">
            {project.website && (
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-[var(--signal)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Visit project <ArrowUpRight className="size-4" />
              </a>
            )}
            {project.source && (
              <a
                href={project.source}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-[var(--signal)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Github className="size-4" /> Source
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
