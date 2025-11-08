"use client";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { PERSONAL_LINKS } from "@/lib/personal-info";

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;
    // Construct mailto link targeting personal email
    const subject = `Portfolio Contact from ${name}`;
    const body = `${message}\n\nFrom: ${name} <${email}>`;
    const mailto = `mailto:${PERSONAL_LINKS.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  }

  return (
    <main className="min-h-screen w-full flex flex-col items-center">
      <section className="w-full max-w-xl mx-auto mt-16 md:mt-24 bg-card rounded-2xl p-4 md:p-8 shadow-md border border-border">
        <h1 className="text-3xl md:text-4xl font-header font-bold text-primary mb-6 md:mb-8">Contact</h1>
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-header text-muted-foreground mb-1">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full px-4 py-2 rounded-lg border border-border bg-muted text-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-500 dark:drop-shadow-sm dark:drop-shadow-shadow-light"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-header text-muted-foreground mb-1">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-2 rounded-lg border border-border bg-muted text-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-500 dark:drop-shadow-sm dark:drop-shadow-shadow-light"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-header text-muted-foreground mb-1">Message</label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full px-4 py-2 rounded-lg border border-border bg-muted text-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-500 dark:drop-shadow-sm dark:drop-shadow-shadow-light"
            />
          </div>
          <Button type="submit" className="font-header text-lg font-bold shadow transition-all duration-500 hover:shadow-lg">Send Message</Button>
        </form>
      </section>
    </main>
  );
} 
