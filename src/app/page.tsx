import Image from "next/image";
import { ArrowDownRight, FileText, Linkedin, Mail } from "lucide-react";
import { WorkEducationToggle } from "@/components/work-education-toggle";
import { FeaturedProjects } from "@/components/featured-projects";
import { PERSONAL_LINKS } from "@/lib/personal-info";
import { assetPath } from "@/lib/utils";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 sm:px-8">
      <section className="grid min-h-[calc(100svh-5rem)] items-center gap-14 py-16 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20 lg:py-24">
        <div>
          <div className="eyebrow reveal mb-7">Software engineer · Georgia Tech</div>
          <h1 className="display-title reveal reveal-delay-1 max-w-4xl">
            Hi, I&apos;m Mitchell. I build <span className="signal-text">software</span> that moves ideas forward.
          </h1>
          <p className="reveal reveal-delay-2 mt-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            I&apos;m a Computer Science student at Georgia Tech passionate about building impactful software and connecting people through technology.
          </p>

          <div className="reveal reveal-delay-2 mt-9 flex flex-wrap items-center gap-3">
            <a
              href={PERSONAL_LINKS.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <FileText className="size-4" /> View résumé
            </a>
            <a
              href={PERSONAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="surface grid size-12 place-items-center rounded-full text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Linkedin className="size-4" />
            </a>
            <a
              href={`mailto:${PERSONAL_LINKS.email}`}
              aria-label="Email Mitchell"
              className="surface grid size-12 place-items-center rounded-full text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Mail className="size-4" />
            </a>
          </div>
        </div>

        <div className="reveal reveal-delay-2 mx-auto w-full max-w-sm lg:ml-auto">
          <div className="surface relative rotate-[1.5deg] rounded-[2rem] p-3 transition-transform duration-500 hover:rotate-0">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem] bg-muted">
              <Image
                src={assetPath("/profile_pic.png")}
                alt="Mitchell Ford portrait"
                fill
                priority
                sizes="(max-width: 1024px) 384px, 32vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent" />
              <span className="absolute bottom-5 left-5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/80">
                Atlanta, Georgia
              </span>
            </div>
            <div className="absolute -bottom-5 -left-5 flex items-center gap-3 rounded-2xl border border-border bg-background/90 px-4 py-3 shadow-2xl backdrop-blur-xl">
              <span className="relative flex size-3">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-50" />
                <span className="relative inline-flex size-3 rounded-full bg-accent" />
              </span>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em]">Always building</span>
            </div>
          </div>
        </div>

        <a
          href="#experience"
          className="hidden items-center gap-2 self-end font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground lg:flex"
        >
          Scroll to explore <ArrowDownRight className="size-4" />
        </a>
      </section>

      <section id="experience" className="scroll-mt-28 py-20 lg:py-28">
        <WorkEducationToggle />
      </section>

      <FeaturedProjects />
    </main>
  );
}
