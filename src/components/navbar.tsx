"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
  { href: "/", label: "home" },
  { href: "/projects", label: "projects" },
  { href: "/contact", label: "contact" },
];

export function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="sticky top-0 z-40 w-full bg-background/70 backdrop-blur-md">
      <div className="w-full max-w-3xl mx-auto px-6 flex flex-row items-center h-16">
        {/* Links and Theme Toggle */}
        <div className="flex-1 grid grid-cols-4 items-center">
          {/* Home */}
          <div className="flex justify-start">
            <Link
              href={navLinks[0].href}
              className={`font-header text-lg capitalize px-3 py-1 rounded transition-all duration-500
                ${pathname === navLinks[0].href ? "text-primary font-bold" : "text-muted-foreground hover:text-primary hover:bg-muted/60"}
                focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60`}
            >
              {navLinks[0].label}
            </Link>
          </div>
          {/* Projects */}
          <div className="flex justify-center">
            <Link
              href={navLinks[1].href}
              className={`font-header text-lg capitalize px-3 py-1 rounded transition-all duration-500
                ${pathname.startsWith(navLinks[1].href) && navLinks[1].href !== "/" ? "text-primary font-bold" : "text-muted-foreground hover:text-primary hover:bg-muted/60"}
                focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60`}
            >
              {navLinks[1].label}
            </Link>
          </div>
          {/* Contact */}
          <div className="flex justify-center">
            <Link
              href={navLinks[2].href}
              className={`font-header text-lg capitalize px-3 py-1 rounded transition-all duration-500
                ${pathname.startsWith(navLinks[2].href) && navLinks[2].href !== "/" ? "text-primary font-bold" : "text-muted-foreground hover:text-primary hover:bg-muted/60"}
                focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60`}
            >
              {navLinks[2].label}
            </Link>
          </div>
          {/* Theme Toggle */}
          <div className="flex justify-end">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
} 