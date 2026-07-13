"use client";

import { ArrowUpRight, Mail } from "lucide-react";
import { PERSONAL_LINKS } from "@/lib/personal-info";

export default function ContactPage() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const message = String(formData.get("message") || "");
    const subject = `Portfolio Contact from ${name}`;
    const body = `${message}\n\nFrom: ${name} <${email}>`;
    window.location.href = `mailto:${PERSONAL_LINKS.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  const inputClass =
    "w-full border-b border-border bg-transparent px-0 py-3 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-[var(--signal)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--signal)] focus-visible:ring-offset-4 focus-visible:ring-offset-background";

  return (
    <main className="mx-auto grid min-h-[calc(100svh-9rem)] w-full max-w-6xl items-center gap-14 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:py-24">
      <section>
        <div className="eyebrow mb-7">Let&apos;s connect</div>
        <h1 className="display-title">Have an idea?<br /><span className="signal-text">Say hello.</span></h1>
        <p className="mt-8 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
          I&apos;m always interested in thoughtful products, hard technical problems, and meeting people who care about their craft.
        </p>
        <a
          href={`mailto:${PERSONAL_LINKS.email}`}
          className="mt-9 inline-flex items-center gap-3 rounded-full text-sm font-semibold transition-colors hover:text-[var(--signal)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="surface grid size-11 place-items-center rounded-full"><Mail className="size-4" /></span>
          {PERSONAL_LINKS.email}
        </a>
      </section>

      <section className="surface rounded-[2rem] p-6 sm:p-9 lg:p-11">
        <div className="mb-9 flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-[-0.04em]">Send a note</h2>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Typically via email</span>
        </div>
        <form onSubmit={handleSubmit} className="grid gap-7">
          <div className="grid gap-7 sm:grid-cols-2">
            <label className="grid gap-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
              Your name
              <input name="name" type="text" required autoComplete="name" placeholder="Jane Smith" className={inputClass} />
            </label>
            <label className="grid gap-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
              Email address
              <input name="email" type="email" required autoComplete="email" placeholder="jane@example.com" className={inputClass} />
            </label>
          </div>
          <label className="grid gap-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
            Message
            <textarea name="message" required rows={5} placeholder="Tell me a little about what you're working on…" className={`${inputClass} resize-y`} />
          </label>
          <button
            type="submit"
            className="mt-2 inline-flex h-12 w-fit items-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Open in email <ArrowUpRight className="size-4" />
          </button>
        </form>
      </section>
    </main>
  );
}
