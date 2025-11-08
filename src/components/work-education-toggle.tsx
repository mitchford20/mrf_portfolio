"use client";
import { useState } from "react";
import Image from "next/image";

const workData = [
  {
    logo: "/veritrade.png",
    date: "October 2025 – Present",
    name: "VeriTrade",
    role: "Fullstack Engineer Intern · Atlanta, GA",
    bullets: [
      "Built full-stack features for a Next.js app on Vercel backed by Supabase/PostgreSQL to power brokerage metrics across 100+ accounts, feeding dashboards used by thousands and scaled for millions of rows per user.",
      "Delivered cross-account rollups (PnL, returns, win rate, drawdown) with corrected metrics, 2x faster calculations, and 30% quicker loads via caching; added WebAuthn 2FA plus refreshed edge-function docs and runbooks."
    ]
  },
  {
    logo: "/logo.png",
    date: "December 2024 – August 2025",
    name: "WillCool Corporation",
    role: "Software Engineer Intern · Cincinnati, OH",
    bullets: [
      "Engineered and launched an end-to-end web app (Next.js/TypeScript + Django REST with Supabase auth) serving 1,000+ users with secure, correct REST flows (search, account actions) and disciplined SDLC/Agile practices.",
      "Automated CI/CD with Docker and GitHub Actions, layered on unit/integration tests, and instrumented logs/metrics for near-real-time performance/error tracking to speed safe releases and on-call debugging."
    ]
  },
  {
    logo: "/michECE.jpeg",
    date: "May 2022 – July 2022",
    name: "The Joy of Coding (University of Michigan ECE)",
    role: "Honorary Participant",
    bullets: [
      "Intensive, self-directed study of Python coding and computational analytics.",
      "Mentored by University of Michigan grad students on Python, Computer Vision, and ML principles."
    ]
  },
  {
    logo: "/IHphoto.png",
    date: "May 2022 – May 2023",
    name: "Indian Hill High School Esports",
    role: "Co-Founder, Officer, Electronics & Components Specialist",
    bullets: [
      "Founded team to mentor students on gaming/tech infrastructure.",
      "Researched and built optimized gaming systems."
    ]
  },
  {
    logo: "/placeholder-profile.png",
    date: "May 2021 – May 2023",
    name: "Stem For Future",
    role: "Co-Chair, Outreach Coordinator & Program Lead",
    bullets: [
      "Led student-run program to increase STEM literacy.",
      "Devised lesson plans and led summer camp for 100+ students."
    ]
  }
];

const educationData = [
  {
    logo: "/gtimage.png",
    date: "Expected Dec 2026",
    name: "Georgia Institute of Technology",
    role: "B.S. Computer Science (Intelligence and Internetworks Threads)",
    bullets: [
      "GPA: 3.89/4.0, Atlanta, GA",
      "Relevant Coursework: Data Structures and Algorithms, OOP, Linear Algebra, Objects and Design"
    ]
  },
  {
    logo: "/IHphoto.png",
    date: "Graduated May 2023",
    name: "Indian Hill High School",
    role: "High School Diploma",
    bullets: [
      "GPA: 4.0 (4.82 weighted), top 2%",
      "Notable Coursework: AP Calculus BC, AP Statistics, AP Physics I&II, AP Microeconomics, Advanced Engineering"
    ]
  }
];

export function WorkEducationToggle() {
  const [selected, setSelected] = useState<'work' | 'education'>('work');
  const data = selected === 'work' ? workData : educationData;

  return (
    <div>
      {/* Toggle buttons */}
      <div className="flex flex-row w-full rounded-lg bg-card px-1 py-1 mb-4 border-2 border-border shadow-lg dark:border-border">
        <button
          className={`flex-1 py-1 font-header text-lg font-bold rounded-lg border transition-colors duration-500 ${selected === 'work' ? 'text-primary bg-muted shadow border-border dark:border-white/70' : 'text-muted-foreground border-border/60 dark:border-border/40'}`}
          onClick={() => setSelected('work')}
        >
          Work
        </button>
        <button
          className={`flex-1 py-1 font-header text-lg font-bold rounded-lg border transition-colors duration-500 ${selected === 'education' ? 'text-primary bg-muted shadow border-border dark:border-white/70' : 'text-muted-foreground border-border/60 dark:border-border/40'}`}
          onClick={() => setSelected('education')}
        >
          Education
        </button>
      </div>
      {/* Content */}
      <div className="bg-card rounded-xl p-4 md:p-6 flex flex-col gap-6 md:gap-8 border-2 border-border shadow-lg dark:border-border">
        {data.map((item, idx) => (
          <div key={idx} className="flex flex-col sm:flex-row gap-4 md:gap-6 items-start">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-muted flex items-center justify-center mx-auto sm:mx-0">
              <Image src={item.logo} alt="logo" width={64} height={64} className="object-cover w-full h-full" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-muted-foreground font-body mb-1">{item.date}</div>
              <div className="text-lg md:text-xl font-header font-bold text-primary mb-1">{item.name}</div>
              <div className="text-sm md:text-md font-header mb-2" style={{ color: 'var(--subheader)' }}>{item.role}</div>
              <ul className="list-disc pl-5 text-xs md:text-sm font-body text-muted-foreground space-y-1">
                {item.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
