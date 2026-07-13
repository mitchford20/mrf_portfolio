"use client";

import { useState } from "react";
import Image from "next/image";
import { assetPath } from "@/lib/utils";

const workData = [
  {
    logo: assetPath("/veritrade.png"),
    date: "October 2025 – Present",
    name: "VeriTrade",
    role: "Fullstack Engineer Intern · Atlanta, GA",
    bullets: [
      "Built full-stack features for a Next.js app on Vercel backed by Supabase/PostgreSQL to power brokerage metrics across 100+ accounts, feeding dashboards used by thousands and scaled for millions of rows per user.",
      "Delivered cross-account rollups (PnL, returns, win rate, drawdown) with corrected metrics, 2x faster calculations, and 30% quicker loads via caching; added WebAuthn 2FA plus refreshed edge-function docs and runbooks.",
    ],
  },
  {
    logo: assetPath("/logo.png"),
    date: "December 2024 – August 2025",
    name: "WillCool Corporation",
    role: "Software Engineer Intern · Cincinnati, OH",
    bullets: [
      "Engineered and launched an end-to-end web app (Next.js/TypeScript + Django REST with Supabase auth) serving 1,000+ users with secure, correct REST flows (search, account actions) and disciplined SDLC/Agile practices.",
      "Automated CI/CD with Docker and GitHub Actions, layered on unit/integration tests, and instrumented logs/metrics for near-real-time performance/error tracking to speed safe releases and on-call debugging.",
    ],
  },
  {
    logo: assetPath("/michECE.jpeg"),
    date: "May 2022 – July 2022",
    name: "The Joy of Coding (University of Michigan ECE)",
    role: "Honorary Participant",
    bullets: [
      "Intensive, self-directed study of Python coding and computational analytics.",
      "Mentored by University of Michigan grad students on Python, Computer Vision, and ML principles.",
    ],
  },
  {
    logo: assetPath("/IHphoto.png"),
    date: "May 2022 – May 2023",
    name: "Indian Hill High School Esports",
    role: "Co-Founder, Officer, Electronics & Components Specialist",
    bullets: [
      "Founded team to mentor students on gaming/tech infrastructure.",
      "Researched and built optimized gaming systems.",
    ],
  },
  {
    logo: assetPath("/placeholder-profile.png"),
    date: "May 2021 – May 2023",
    name: "Stem For Future",
    role: "Co-Chair, Outreach Coordinator & Program Lead",
    bullets: [
      "Led student-run program to increase STEM literacy.",
      "Devised lesson plans and led summer camp for 100+ students.",
    ],
  },
];

const educationData = [
  {
    logo: assetPath("/gtimage.png"),
    date: "Expected Dec 2026",
    name: "Georgia Institute of Technology",
    role: "B.S. Computer Science (Intelligence and Internetworks Threads)",
    bullets: [
      "GPA: 3.89/4.0, Atlanta, GA",
      "Relevant Coursework: Data Structures and Algorithms, OOP, Linear Algebra, Objects and Design",
    ],
  },
  {
    logo: assetPath("/IHphoto.png"),
    date: "Graduated May 2023",
    name: "Indian Hill High School",
    role: "High School Diploma",
    bullets: [
      "GPA: 4.0 (4.82 weighted), top 2%",
      "Notable Coursework: AP Calculus BC, AP Statistics, AP Physics I&II, AP Microeconomics, Advanced Engineering",
    ],
  },
];

export function WorkEducationToggle() {
  const [selected, setSelected] = useState<"work" | "education">("work");
  const data = selected === "work" ? workData : educationData;

  return (
    <div>
      <div className="mb-12 flex flex-col justify-between gap-7 md:flex-row md:items-end">
        <div>
          <div className="eyebrow mb-5">01 / Background</div>
          <h2 className="section-title">Experience,<br /><span className="text-muted-foreground">in the making.</span></h2>
        </div>
        <div className="surface flex w-fit rounded-2xl p-1.5" role="group" aria-label="Background type">
          {(["work", "education"] as const).map((type) => (
            <button
              key={type}
              type="button"
              aria-pressed={selected === type}
              onClick={() => setSelected(type)}
              className={`rounded-xl px-5 py-2.5 text-sm font-semibold capitalize transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                selected === type
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div key={selected} className="reveal border-t border-border">
        {data.map((item, index) => (
          <article
            key={`${item.name}-${item.date}`}
            className="grid gap-5 border-b border-border py-8 md:grid-cols-[160px_72px_1fr] md:gap-8 md:py-10"
          >
            <div className="font-mono text-[11px] uppercase leading-5 tracking-[0.1em] text-muted-foreground">
              {item.date}
            </div>
            <div className="relative hidden md:block">
              <div className="surface grid size-16 place-items-center overflow-hidden rounded-2xl p-2">
                <Image
                  src={item.logo}
                  alt={`${item.name} logo`}
                  width={64}
                  height={64}
                  className="size-full rounded-xl object-cover"
                />
              </div>
              {index === 0 && selected === "work" && (
                <span className="absolute -right-0.5 -top-0.5 size-3 rounded-full border-2 border-background bg-accent" />
              )}
            </div>
            <div>
              <div className="mb-4 flex items-start gap-4 md:hidden">
                <div className="surface grid size-12 shrink-0 place-items-center overflow-hidden rounded-xl p-1.5">
                  <Image
                    src={item.logo}
                    alt={`${item.name} logo`}
                    width={48}
                    height={48}
                    className="size-full rounded-lg object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.03em]">{item.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.role}</p>
                </div>
              </div>
              <div className="hidden md:block">
                <h3 className="text-2xl font-semibold tracking-[-0.035em]">{item.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.role}</p>
              </div>
              <ul className="mt-5 grid gap-3 text-sm leading-6 text-muted-foreground lg:grid-cols-2 lg:gap-6">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="relative pl-4 before:absolute before:left-0 before:top-[0.7em] before:size-1 before:rounded-full before:bg-[var(--signal)]">
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
