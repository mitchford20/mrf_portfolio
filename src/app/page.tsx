import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, FileText } from "lucide-react";
import { WorkEducationToggle } from "@/components/work-education-toggle";
import { FeaturedProjects } from "@/components/featured-projects";
import { PERSONAL_LINKS } from "@/lib/personal-info";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center">
      <div className="w-full max-w-3xl mx-auto px-6 flex flex-col gap-0">
        {/* Side-by-side intro */}
        <section className="flex flex-col md:flex-row w-full py-8 md:py-16 gap-6 md:gap-8 items-center justify-between">
          {/* Left: Intro */}
          <div className="flex-1 flex flex-col gap-4 md:gap-6">
            <h1 className="text-4xl md:text-5xl font-header font-bold text-primary mb-2">Hi, I&apos;m Mitchell Ford</h1>
            <h2 className="text-xl md:text-2xl font-header mb-4" style={{ color: 'var(--subheader)' }}>Software Engineer & CS Student</h2>
            <p className="text-base md:text-lg font-body text-muted-foreground max-w-xl">
              I&apos;m a Computer Science student at Georgia Tech passionate about building impactful software and connecting people through technology. Welcome to my portfolio!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-4">
              <a href={PERSONAL_LINKS.resume} download target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="flex items-center gap-2 shadow transition-all duration-500 hover:shadow-lg">
                  <FileText className="w-5 h-5" /> Resume
                </Button>
              </a>
              <a href={PERSONAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="flex items-center gap-2 shadow transition-all duration-500 hover:shadow-lg">
                  <Linkedin className="w-5 h-5" /> LinkedIn
                </Button>
              </a>
              <a href={`mailto:${PERSONAL_LINKS.email}`}>
                <Button variant="outline" className="flex items-center gap-2 shadow transition-all duration-500 hover:shadow-lg">
                  <Mail className="w-5 h-5" /> Email
                </Button>
              </a>
            </div>
          </div>
          {/* Right: Placeholder image */}
          <div className="flex-1 flex items-center justify-center mt-6 md:mt-0">
            <div className="rounded-2xl overflow-hidden shadow-lg w-32 h-40 md:w-56 md:h-72 bg-muted flex items-center justify-center">
              <Image src="/profile_pic.png" alt="Mitchell Ford portrait" width={224} height={288} className="object-cover w-full h-full" />
            </div>
          </div>
        </section>
        {/* Work/Education toggle section */}
        <section className="w-full mt-4">
          <WorkEducationToggle />
        </section>
        {/* Featured projects section */}
        <section className="w-full">
          <FeaturedProjects />
        </section>
      </div>
    </main>
  );
}
