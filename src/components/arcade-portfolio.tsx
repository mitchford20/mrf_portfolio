"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import * as THREE from "three";
import { projects } from "@/data/projects";
import { PERSONAL_LINKS } from "@/lib/personal-info";
import { workData } from "@/components/work-education-toggle";

type SectionId = "about" | "experience" | "projects" | "contact";

const MENU_ITEMS: { id: SectionId; label: string; code: string }[] = [
  { id: "about", label: "About player", code: "01" },
  { id: "experience", label: "Experience", code: "02" },
  { id: "projects", label: "Project select", code: "03" },
  { id: "contact", label: "Connect", code: "04" },
];

const SCREEN_BOUNDS = {
  left: -1.08,
  right: 1.08,
  top: 5.43,
  bottom: 4.04,
  z: 0.87,
};

function addBox(
  parent: THREE.Object3D,
  size: [number, number, number],
  position: [number, number, number],
  material: THREE.Material,
) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
  mesh.position.set(...position);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

function ArcadeScreen({
  activeSection,
  selected,
  onBack,
  onOpen,
  onSelect,
  backButtonRef,
  menuButtonRefs,
}: {
  activeSection: SectionId | null;
  selected: number;
  onBack: () => void;
  onOpen: (section: SectionId) => void;
  onSelect: (index: number) => void;
  backButtonRef: RefObject<HTMLButtonElement | null>;
  menuButtonRefs: RefObject<(HTMLButtonElement | null)[]>;
}) {
  if (!activeSection) {
    return (
      <div className="arcade-menu-screen">
        <div className="arcade-screen-topline">
          <span>MRF//ARCADE</span>
          <span>CREDIT 01</span>
        </div>
        <div className="arcade-menu-heading">
          <p>PLAYER ONE</p>
          <h2>MITCHELL FORD</h2>
          <span>SOFTWARE ENGINEER // ATLANTA</span>
        </div>
        <nav className="arcade-menu" aria-label="Portfolio sections">
          {MENU_ITEMS.map((item, index) => (
            <button
              key={item.id}
              ref={(node) => { menuButtonRefs.current[index] = node; }}
              type="button"
              tabIndex={selected === index ? 0 : -1}
              className={selected === index ? "is-selected" : undefined}
              aria-current={selected === index ? "true" : undefined}
              onMouseEnter={() => onSelect(index)}
              onFocus={() => onSelect(index)}
              onClick={() => onOpen(item.id)}
            >
              <span className="arcade-menu-cursor" aria-hidden="true">
                {selected === index ? "▶" : ""}
              </span>
              <span>{item.label}</span>
              <span>{item.code}</span>
            </button>
          ))}
        </nav>
        <p className="arcade-menu-help">↑↓ SELECT&nbsp;&nbsp; ENTER START&nbsp;&nbsp; CLICK OK</p>
      </div>
    );
  }

  return (
    <div className="arcade-screen-panel">
      <div className="arcade-panel-header">
        <button ref={backButtonRef} type="button" onClick={onBack}>
          ◀ BACK <span>[ESC]</span>
        </button>
        <span>{MENU_ITEMS.find((item) => item.id === activeSection)?.code}/04</span>
      </div>

      {activeSection === "about" && (
        <section aria-labelledby="about-heading">
          <p className="arcade-panel-kicker">PLAYER PROFILE</p>
          <h2 id="about-heading">ABOUT MITCHELL</h2>
          <p className="arcade-panel-lede">
            Computer science student at Georgia Tech building thoughtful software
            across machine learning, financial technology, and playful digital
            experiences.
          </p>
          <dl className="arcade-stats">
            <div><dt>BASE</dt><dd>Atlanta, GA</dd></div>
            <div><dt>CLASS</dt><dd>Full-stack engineer</dd></div>
            <div><dt>THREADS</dt><dd>Intelligence + Internetworks</dd></div>
            <div><dt>STATUS</dt><dd><span className="arcade-status-dot" /> Always building</dd></div>
          </dl>
        </section>
      )}

      {activeSection === "experience" && (
        <section aria-labelledby="experience-heading">
          <p className="arcade-panel-kicker">QUEST LOG</p>
          <h2 id="experience-heading">EXPERIENCE</h2>
          <div className="arcade-record-list">
            {workData.map((role, index) => (
              <article key={`${role.name}-${role.date}`}>
                <div className="arcade-record-number">{String(index + 1).padStart(2, "0")}</div>
                <div>
                  <p className="arcade-record-date">{role.date}</p>
                  <h3>{role.name}</h3>
                  <p className="arcade-record-role">{role.role}</p>
                  <ul>
                    {role.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {activeSection === "projects" && (
        <section aria-labelledby="projects-heading">
          <p className="arcade-panel-kicker">CHOOSE YOUR BUILD</p>
          <h2 id="projects-heading">PROJECT SELECT</h2>
          <div className="arcade-project-grid">
            {projects.map((project, index) => (
              <article key={project.title}>
                <p>STAGE {String(index + 1).padStart(2, "0")}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <ul aria-label="Technologies">
                  {project.tech.map((tech) => <li key={tech}>{tech}</li>)}
                </ul>
                {project.source && (
                  <a href={project.source} target="_blank" rel="noopener noreferrer">
                    OPEN SOURCE ↗
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {activeSection === "contact" && (
        <section aria-labelledby="contact-heading" className="arcade-contact-panel">
          <p className="arcade-panel-kicker">CONTINUE?</p>
          <h2 id="contact-heading">LET&apos;S BUILD SOMETHING</h2>
          <p className="arcade-panel-lede">
            Have an interesting problem, role, or project in mind? Send a signal.
          </p>
          <div className="arcade-contact-links">
            <a href={`mailto:${PERSONAL_LINKS.email}`}>
              <span>01</span> EMAIL MITCHELL <b>↗</b>
            </a>
            <a href={PERSONAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer">
              <span>02</span> LINKEDIN <b>↗</b>
            </a>
            <a href={PERSONAL_LINKS.resume} target="_blank" rel="noopener noreferrer">
              <span>03</span> VIEW RÉSUMÉ <b>↗</b>
            </a>
          </div>
          <p className="arcade-contact-email">{PERSONAL_LINKS.email}</p>
        </section>
      )}
    </div>
  );
}

export function ArcadePortfolio() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const skippedRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const menuButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const backButtonRef = useRef<HTMLButtonElement>(null);
  const previousSectionRef = useRef<SectionId | null>(null);
  const [enhanced, setEnhanced] = useState(false);
  const [ready, setReady] = useState(false);
  const [webglFallback, setWebglFallback] = useState(false);
  const [selected, setSelected] = useState(0);
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);

  const finishIntro = useCallback(() => {
    skippedRef.current = true;
    setReady(true);
  }, []);

  const openSection = useCallback((section: SectionId) => {
    setActiveSection(section);
  }, []);

  useEffect(() => setEnhanced(true), []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      reducedMotionRef.current = query.matches;
      if (query.matches) finishIntro();
    };

    updatePreference();
    query.addEventListener("change", updatePreference);
    return () => query.removeEventListener("change", updatePreference);
  }, [finishIntro]);

  useEffect(() => {
    if (ready) return;
    const timer = window.setTimeout(() => setReady(true), 3700);
    return () => window.clearTimeout(timer);
  }, [ready]);

  useEffect(() => {
    const previousSection = previousSectionRef.current;

    if (activeSection) {
      backButtonRef.current?.focus();
    } else if (previousSection) {
      menuButtonRefs.current[selected]?.focus();
    }

    previousSectionRef.current = activeSection;
  }, [activeSection, selected]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (activeSection) {
        if (event.key === "Escape" || event.key === "ArrowLeft") {
          event.preventDefault();
          setActiveSection(null);
        }
        return;
      }

      if (!ready) {
        if (event.key === "Enter") {
          event.preventDefault();
          finishIntro();
        }
        return;
      }

      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        event.preventDefault();
        const next = (selected + 1) % MENU_ITEMS.length;
        setSelected(next);
        menuButtonRefs.current[next]?.focus();
      } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        const next = (selected - 1 + MENU_ITEMS.length) % MENU_ITEMS.length;
        setSelected(next);
        menuButtonRefs.current[next]?.focus();
      } else if (event.key === "Enter") {
        event.preventDefault();
        openSection(MENU_ITEMS[selected].id);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeSection, finishIntro, openSection, ready, selected]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const screen = screenRef.current;
    if (!canvas || !screen) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      setWebglFallback(true);
      finishIntro();
      screen.style.visibility = "visible";
      return;
    }

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x050713, 10, 28);

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    const cabinet = new THREE.Group();
    scene.add(cabinet);

    const black = new THREE.MeshStandardMaterial({ color: 0x0b0c12, roughness: 0.52, metalness: 0.18 });
    const charcoal = new THREE.MeshStandardMaterial({ color: 0x191a24, roughness: 0.38, metalness: 0.28 });
    const red = new THREE.MeshStandardMaterial({ color: 0xdc2626, emissive: 0x590808, emissiveIntensity: 0.85, roughness: 0.32 });
    const blue = new THREE.MeshStandardMaterial({ color: 0x2563eb, emissive: 0x071b66, emissiveIntensity: 0.9, roughness: 0.3 });
    const green = new THREE.MeshStandardMaterial({ color: 0x142419, emissive: 0x07190b, emissiveIntensity: 0.45, roughness: 0.42 });
    const chrome = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, roughness: 0.18, metalness: 0.82 });

    addBox(cabinet, [2.58, 3.35, 1.48], [0, 1.73, 0], black);
    addBox(cabinet, [2.86, 2.94, 1.68], [0, 4.79, 0], charcoal);
    addBox(cabinet, [2.98, 0.22, 1.55], [0, 6.26, 0.02], red);
    addBox(cabinet, [2.76, 0.27, 1.38], [0, 3.52, 0.52], charcoal);
    addBox(cabinet, [2.78, 0.74, 0.15], [0, 5.89, 0.88], black);
    addBox(cabinet, [2.42, 1.7, 0.12], [0, 4.75, 0.86], black);
    addBox(cabinet, [2.16, 1.39, 0.04], [0, 4.735, 0.93], green);
    addBox(cabinet, [0.07, 2.54, 0.08], [-1.39, 4.7, 0.89], blue);
    addBox(cabinet, [0.07, 2.54, 0.08], [1.39, 4.7, 0.89], blue);
    addBox(cabinet, [2.46, 0.12, 0.1], [0, 3.43, 1.22], red);

    const deck = addBox(cabinet, [2.78, 0.23, 1.35], [0, 3.58, 0.75], charcoal);
    deck.rotation.x = -0.055;

    const joystickStem = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.24, 18), chrome);
    joystickStem.position.set(-0.56, 3.76, 0.82);
    joystickStem.castShadow = true;
    cabinet.add(joystickStem);

    const joystickTop = new THREE.Mesh(new THREE.SphereGeometry(0.14, 20, 14), red);
    joystickTop.position.set(-0.56, 3.92, 0.82);
    joystickTop.castShadow = true;
    cabinet.add(joystickTop);

    const buttonGeometry = new THREE.CylinderGeometry(0.12, 0.14, 0.075, 24);
    [[0.34, 0.7, blue], [0.72, 0.82, red], [0.99, 0.61, blue]].forEach(([x, z, material]) => {
      const button = new THREE.Mesh(buttonGeometry, material as THREE.Material);
      button.position.set(x as number, 3.735, z as number);
      button.castShadow = true;
      cabinet.add(button);
    });

    const footGeometry = new THREE.BoxGeometry(0.44, 0.16, 1.18);
    [-0.87, 0.87].forEach((x) => {
      const foot = new THREE.Mesh(footGeometry, black);
      foot.position.set(x, 0.08, 0);
      foot.castShadow = true;
      cabinet.add(foot);
    });

    const marqueeCanvas = document.createElement("canvas");
    marqueeCanvas.width = 768;
    marqueeCanvas.height = 180;
    const context = marqueeCanvas.getContext("2d");
    if (context) {
      context.imageSmoothingEnabled = false;
      context.fillStyle = "#dc2626";
      context.fillRect(0, 0, marqueeCanvas.width, marqueeCanvas.height);
      context.fillStyle = "#050713";
      context.fillRect(18, 18, marqueeCanvas.width - 36, marqueeCanvas.height - 36);
      context.fillStyle = "#f8fafc";
      context.font = "700 68px monospace";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText("MRF // 20", marqueeCanvas.width / 2, marqueeCanvas.height / 2 + 2);
    }
    const marqueeTexture = new THREE.CanvasTexture(marqueeCanvas);
    marqueeTexture.colorSpace = THREE.SRGBColorSpace;
    marqueeTexture.minFilter = THREE.NearestFilter;
    marqueeTexture.magFilter = THREE.NearestFilter;
    const marquee = new THREE.Mesh(
      new THREE.PlaneGeometry(2.45, 0.58),
      new THREE.MeshBasicMaterial({ map: marqueeTexture }),
    );
    marquee.position.set(0, 5.9, 0.967);
    cabinet.add(marquee);

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(40, 40),
      new THREE.MeshStandardMaterial({ color: 0x03040a, roughness: 0.78, metalness: 0.08 }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.015;
    floor.receiveShadow = true;
    scene.add(floor);

    scene.add(new THREE.HemisphereLight(0x667eea, 0x050507, 1.35));
    const keyLight = new THREE.DirectionalLight(0xf8fafc, 3.4);
    keyLight.position.set(3, 9, 7);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    scene.add(keyLight);

    const redLight = new THREE.PointLight(0xdc2626, 24, 9, 2);
    redLight.position.set(-4, 3.4, 3);
    scene.add(redLight);
    const blueLight = new THREE.PointLight(0x2563eb, 27, 10, 2);
    blueLight.position.set(4, 5.6, 2.5);
    scene.add(blueLight);

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    const clockStart = performance.now();
    let frameId = 0;
    let currentProgress = 0;
    let disposed = false;

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.setSize(width, height, false);
    };

    const positionScreen = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const corners = [
        new THREE.Vector3(SCREEN_BOUNDS.left, SCREEN_BOUNDS.top, SCREEN_BOUNDS.z),
        new THREE.Vector3(SCREEN_BOUNDS.right, SCREEN_BOUNDS.top, SCREEN_BOUNDS.z),
        new THREE.Vector3(SCREEN_BOUNDS.left, SCREEN_BOUNDS.bottom, SCREEN_BOUNDS.z),
        new THREE.Vector3(SCREEN_BOUNDS.right, SCREEN_BOUNDS.bottom, SCREEN_BOUNDS.z),
      ].map((point) => point.project(camera));
      const xs = corners.map((point) => (point.x * 0.5 + 0.5) * width);
      const ys = corners.map((point) => (-point.y * 0.5 + 0.5) * height);
      const left = Math.min(...xs);
      const right = Math.max(...xs);
      const top = Math.min(...ys);
      const bottom = Math.max(...ys);

      screen.style.left = `${left}px`;
      screen.style.top = `${top}px`;
      screen.style.width = `${right - left}px`;
      screen.style.height = `${bottom - top}px`;
      screen.style.visibility = "visible";
    };

    const renderAt = (progress: number) => {
      const compact = window.innerWidth / window.innerHeight < 0.75;
      const start = compact
        ? new THREE.Vector3(3.25, 5.35, 14.8)
        : new THREE.Vector3(4.9, 5.6, 13.4);
      const end = compact
        ? new THREE.Vector3(0, 4.75, 7.65)
        : new THREE.Vector3(0, 4.72, 5.72);
      const startTarget = new THREE.Vector3(0, 3.15, 0);
      const endTarget = new THREE.Vector3(0, 4.67, 0.35);
      const eased = 1 - Math.pow(1 - progress, 3);

      camera.position.lerpVectors(start, end, eased);
      camera.lookAt(startTarget.lerp(endTarget, eased));
      positionScreen();
      renderer.render(scene, camera);
    };

    const animate = (now: number) => {
      if (disposed) return;
      currentProgress = skippedRef.current || reducedMotionRef.current
        ? 1
        : Math.min((now - clockStart) / 3600, 1);
      renderAt(currentProgress);
      if (currentProgress < 1) frameId = window.requestAnimationFrame(animate);
    };

    const handleResize = () => {
      resize();
      renderAt(currentProgress);
    };

    resize();
    frameId = window.requestAnimationFrame(animate);
    window.addEventListener("resize", handleResize);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      marqueeTexture.dispose();
      buttonGeometry.dispose();
      footGeometry.dispose();
      scene.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        object.geometry.dispose();
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.forEach((material) => material.dispose());
      });
      renderer.dispose();
    };
  }, [finishIntro]);

  return (
    <main className={`arcade-page ${enhanced ? "is-enhanced" : ""} ${webglFallback ? "is-fallback" : ""}`}>
      <h1 className="sr-only">Mitchell Ford — software engineer portfolio</h1>
      <section className="arcade-static-fallback" aria-label="Mitchell Ford portfolio">
        <div>
          <p>MRF // PORTFOLIO</p>
          <h2>Mitchell Ford</h2>
          <p>
            Software engineer and Georgia Tech computer science student building
            across financial technology, machine learning, and interactive products.
          </p>
          <p className="arcade-static-status">
            CURRENT QUEST: FULL-STACK ENGINEER INTERN AT VERITRADE
          </p>
          <nav aria-label="Portfolio fallback navigation">
            <Link href="/projects">VIEW PROJECTS</Link>
            <Link href="/contact">CONTACT</Link>
            <a href={PERSONAL_LINKS.resume}>RÉSUMÉ</a>
          </nav>
        </div>
      </section>
      <canvas ref={canvasRef} className="arcade-canvas" aria-hidden="true" />
      <div className="arcade-ambient-grid" aria-hidden="true" />

      <button className="arcade-skip" type="button" onClick={finishIntro} hidden={ready}>
        SKIP INTRO <span>↗</span>
      </button>

      <div
        ref={screenRef}
        className={`arcade-crt ${ready ? "is-ready" : "is-booting"}`}
        aria-label="Interactive portfolio arcade screen"
      >
        <div className="arcade-crt-glass">
          {!ready ? (
            <div className="arcade-boot" role="status" aria-live="polite">
              <p>MRF BIOS // REV 20.26</p>
              <p>CHECKING MEMORY............. OK</p>
              <p>LOADING PLAYER PROFILE..... OK</p>
              <div className="arcade-boot-bar"><span /></div>
              <strong>PRESS START</strong>
            </div>
          ) : (
            <ArcadeScreen
              activeSection={activeSection}
              selected={selected}
              onBack={() => setActiveSection(null)}
              onOpen={openSection}
              onSelect={setSelected}
              backButtonRef={backButtonRef}
              menuButtonRefs={menuButtonRefs}
            />
          )}
        </div>
      </div>

      <div className="arcade-chrome" aria-hidden="true">
        <span>ARCADE SYSTEM // ONLINE</span>
        <span className="arcade-chrome-desktop">MOUSE · ARROWS · ENTER</span>
      </div>
    </main>
  );
}
