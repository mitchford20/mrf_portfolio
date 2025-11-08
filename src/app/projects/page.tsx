"use client";
import { useState } from "react";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects as projectList } from "@/data/projects";

export default function ProjectsPage() {
  const [modal, setModal] = useState<null | number>(null);

  return (
    <main className="min-h-screen w-full flex flex-col items-center pb-16 md:pb-24">
      <section className="w-full max-w-6xl mx-auto mt-6 md:mt-10 px-2 md:px-0">
        <h1 className="text-3xl md:text-4xl font-header font-bold text-primary mb-6 md:mb-10">All Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projectList.map((project, idx) => (
            <div key={idx} className="bg-card rounded-2xl p-6 shadow-md flex flex-col gap-4 border border-border transition-all duration-500 hover:shadow-xl">
              <div className="relative rounded-xl overflow-hidden mb-4 cursor-pointer group" onClick={() => setModal(idx)}>
                <Image src={project.image} alt={project.title} width={480} height={240} className="object-cover w-full h-48 group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center text-white font-header text-lg">Click to preview</div>
              </div>
              <div className="text-xl font-header font-bold text-primary mb-1">{project.title}</div>
              <div className="text-md font-body text-muted-foreground mb-2">{project.description}</div>
              <div className="flex flex-row flex-wrap gap-2 mb-4">
                {project.tech.map((tech, i) => (
                  <span key={i} className="bg-muted text-xs font-body px-2 py-1 rounded-lg border border-border text-muted-foreground">{tech}</span>
                ))}
              </div>
              {(project.website || project.source) && (
                <div className="flex flex-row gap-3 mt-auto">
                  {project.website && (
                    <Button variant="outline" className="flex items-center gap-2 shadow transition-all duration-500 hover:shadow-lg" asChild>
                      <a href={project.website} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" /> Website
                      </a>
                    </Button>
                  )}
                  {project.source && (
                    <Button variant="outline" className="flex items-center gap-2 shadow transition-all duration-500 hover:shadow-lg" asChild>
                      <a href={project.source} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" /> Source
                      </a>
                    </Button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Modal for image preview */}
        {modal !== null && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={() => setModal(null)}>
            <div className="bg-card rounded-2xl p-4 shadow-lg max-w-2xl w-full flex flex-col items-center relative" onClick={e => e.stopPropagation()}>
              <button className="absolute top-2 right-2 text-muted-foreground hover:text-primary transition-colors duration-500 text-2xl font-bold" onClick={() => setModal(null)}>&times;</button>
              <Image src={projectList[modal].image} alt={projectList[modal].title} width={640} height={320} className="object-cover w-full h-80 rounded-xl mb-4" />
              <div className="text-xl font-header font-bold text-primary mb-2">{projectList[modal].title}</div>
              <div className="text-md font-body text-muted-foreground mb-2">{projectList[modal].description}</div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
} 
