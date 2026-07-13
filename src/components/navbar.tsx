"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Work" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-6">
      <nav className="surface mx-auto flex h-14 w-full max-w-6xl items-center justify-between rounded-2xl px-2 sm:px-3">
        <Link
          href="/"
          className="group flex items-center gap-3 rounded-xl pr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Mitchell Ford home"
        >
          <span className="grid size-10 place-items-center rounded-xl bg-primary font-mono text-xs font-bold tracking-[-0.08em] text-primary-foreground transition-transform duration-300 group-hover:rotate-3">
            MF
          </span>
          <span className="hidden text-sm font-semibold tracking-[-0.02em] sm:block">
            Mitchell Ford
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-xl px-3 py-2 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-4 sm:text-sm ${
                  active
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="ml-1 border-l border-border pl-2">
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
