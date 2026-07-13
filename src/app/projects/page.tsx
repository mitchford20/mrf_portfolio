import { ProjectCard } from "@/components/project-card";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-5 pb-24 pt-16 sm:px-8 lg:pb-32 lg:pt-24">
      <header className="mb-14 border-b border-border pb-12 lg:mb-16 lg:pb-16">
        <div className="eyebrow mb-6">Project archive</div>
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_0.45fr]">
          <h1 className="display-title">Things I&apos;ve<br /><span className="signal-text">built.</span></h1>
          <p className="max-w-md text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            A mix of machine learning, full-stack products, mobile apps, and systems work—each built to turn an interesting problem into something useful.
          </p>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </main>
  );
}
