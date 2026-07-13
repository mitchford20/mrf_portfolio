import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mitchell Ford — Software Engineer",
  description:
    "Software engineer and Georgia Tech computer science student building thoughtful, reliable digital products.",
};

const themeScript = `try{const t=localStorage.getItem("theme");if(t==="light"){document.documentElement.classList.remove("dark");document.documentElement.classList.add("light")}}catch{}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased font-body`}>
        <ThemeProvider>
          <a
            href="#main-content"
            className="fixed left-4 top-4 z-50 -translate-y-24 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-transform focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-ring"
          >
            Skip to content
          </a>
          <Navbar />
          <div id="main-content" tabIndex={-1} className="relative z-10 pt-20">{children}</div>
          <footer className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between border-t border-border px-5 py-8 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground sm:px-8">
            <span>Mitchell Ford © {new Date().getFullYear()}</span>
            <span className="hidden sm:inline">Designed &amp; built with intent</span>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
