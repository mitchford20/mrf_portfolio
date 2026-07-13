import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/project-card";

export function FeaturedProjects() {
  const featured = projects.filter((project) => project.featured);
  const displayProjects = featured.length ? featured : projects.slice(0, 2);

  return (
    <section className="py-20 lg:py-28">
      <div className="mb-12 flex items-end justify-between gap-6">
        <div>
          <div className="eyebrow mb-5">02 / Selected work</div>
          <h2 className="section-title">Projects with<br /><span className="text-muted-foreground">a point of view.</span></h2>
        </div>
        <Link
          href="/projects"
          className="hidden items-center gap-2 border-b border-foreground pb-1 text-sm font-semibold transition-colors hover:border-[var(--signal)] hover:text-[var(--signal)] sm:flex"
        >
          View all work <ArrowUpRight className="size-4" />
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {displayProjects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>

      <Link
        href="/projects"
        className="mt-7 inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm font-semibold sm:hidden"
      >
        View all work <ArrowUpRight className="size-4" />
      </Link>
    </section>
  );
}
