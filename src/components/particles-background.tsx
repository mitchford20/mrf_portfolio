"use client";
import { useTheme } from "./theme-provider";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type Engine, type ISourceOptions } from "@tsparticles/engine";
import { useEffect, useMemo, useState } from "react";
import { loadSlim } from "@tsparticles/slim";

export function ParticlesBackground() {
  const [init, setInit] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    console.log('Initializing particles...'); // Log for debugging
    initParticlesEngine(async (engine: Engine) => {
      // you can initiate the tsParticles instance (engine) here
      // await loadAll(engine);
      // await loadFull(engine);
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: { value: "transparent" }, // Use transparent background as the body handles the main background color
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: false, // Disable click interaction for subtlety
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse", // Subtle repulse effect on hover
          },
          resize: { enable: true },
        },
        modes: {
          push: { quantity: 4 },
          repulse: { distance: 100, duration: 0.4 },
        },
      },
      particles: {
        color: {
          value: theme === "dark" ? "#404040" : "#4b5563", // Higher contrast in light mode
        },
        links: {
          color: theme === "dark" ? "#606060" : "#475569",
          distance: 150,
          enable: true,
          opacity: theme === "dark" ? 0.35 : 0.65,
          width: theme === "dark" ? 1 : 1.2,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: { default: "bounce" },
          random: true,
          speed: 0.5,
          straight: false,
        },
        number: {
          density: { enable: true, area: 600 }, // Increased density
          value: 150, // Increased number of particles
        },
        opacity: { value: 0.5 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 5 } }, // Increased particle size
      },
      detectRetina: true,
    }),
    [theme] // Re-generate options when theme changes
  );

  console.log('Particles initialized:', init); // Log for debugging
  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
        className="fixed inset-0 pointer-events-none -z-10"
      />
    );
  }

  return null; // Or a loading spinner
} 
