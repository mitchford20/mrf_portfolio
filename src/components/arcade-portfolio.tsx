"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
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
  z: 1,
};

const INTRO_DURATION = 6200;
const MENU_REVEAL_DELAY = 5200;

function addBox(
  parent: THREE.Object3D,
  size: [number, number, number],
  position: [number, number, number],
  material: THREE.Material,
  radius = 0.06,
) {
  const safeRadius = Math.min(radius, Math.min(...size) * 0.42);
  const mesh = new THREE.Mesh(
    new RoundedBoxGeometry(...size, safeRadius > 0.01 ? 3 : 1, safeRadius),
    material,
  );
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
    const timer = window.setTimeout(() => setReady(true), MENU_REVEAL_DELAY);
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
    scene.fog = new THREE.Fog(0x04050a, 15, 36);

    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    const cabinet = new THREE.Group();
    scene.add(cabinet);

    const shell = new THREE.MeshPhysicalMaterial({
      color: 0x11131a,
      roughness: 0.3,
      metalness: 0.34,
      clearcoat: 0.58,
      clearcoatRoughness: 0.24,
    });
    const black = new THREE.MeshStandardMaterial({ color: 0x05060a, roughness: 0.66, metalness: 0.16 });
    const charcoal = new THREE.MeshStandardMaterial({ color: 0x1c202a, roughness: 0.4, metalness: 0.42 });
    const gunmetal = new THREE.MeshStandardMaterial({ color: 0x272b35, roughness: 0.34, metalness: 0.68 });
    const red = new THREE.MeshStandardMaterial({ color: 0xbf2430, emissive: 0x330308, emissiveIntensity: 0.42, roughness: 0.3, metalness: 0.2 });
    const blue = new THREE.MeshStandardMaterial({ color: 0x3567d6, emissive: 0x061846, emissiveIntensity: 0.5, roughness: 0.3, metalness: 0.16 });
    const yellow = new THREE.MeshStandardMaterial({ color: 0xe9b949, emissive: 0x3d2404, emissiveIntensity: 0.3, roughness: 0.28 });
    const screenMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x07100a,
      emissive: 0x061309,
      emissiveIntensity: 0.18,
      roughness: 0.2,
      clearcoat: 0.92,
      clearcoatRoughness: 0.12,
    });
    const chrome = new THREE.MeshPhysicalMaterial({ color: 0xd8dee9, roughness: 0.16, metalness: 0.92, clearcoat: 0.4 });

    const shellShape = new THREE.Shape();
    shellShape.moveTo(-1.12, 0.15);
    shellShape.lineTo(-1.18, 3.18);
    shellShape.lineTo(-1.4, 3.42);
    shellShape.lineTo(-1.46, 3.7);
    shellShape.lineTo(-1.29, 3.9);
    shellShape.lineTo(-1.31, 5.68);
    shellShape.lineTo(-1.46, 5.9);
    shellShape.lineTo(-1.4, 6.34);
    shellShape.quadraticCurveTo(-1.34, 6.5, -1.16, 6.56);
    shellShape.lineTo(1.16, 6.56);
    shellShape.quadraticCurveTo(1.34, 6.5, 1.4, 6.34);
    shellShape.lineTo(1.46, 5.9);
    shellShape.lineTo(1.31, 5.68);
    shellShape.lineTo(1.29, 3.9);
    shellShape.lineTo(1.46, 3.7);
    shellShape.lineTo(1.4, 3.42);
    shellShape.lineTo(1.18, 3.18);
    shellShape.lineTo(1.12, 0.15);
    shellShape.closePath();

    const shellGeometry = new THREE.ExtrudeGeometry(shellShape, {
      depth: 1.52,
      steps: 1,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize: 0.055,
      bevelThickness: 0.055,
    });
    shellGeometry.translate(0, 0, -0.76);
    const shellMesh = new THREE.Mesh(shellGeometry, shell);
    shellMesh.castShadow = true;
    shellMesh.receiveShadow = true;
    cabinet.add(shellMesh);

    addBox(cabinet, [2.2, 2.72, 0.08], [0, 1.74, 0.79], black, 0.1);
    addBox(cabinet, [3.02, 0.88, 1.62], [0, 6.05, 0.02], shell, 0.13);
    addBox(cabinet, [2.8, 0.73, 0.18], [0, 6.05, 0.84], red, 0.1);
    addBox(cabinet, [2.59, 0.56, 0.1], [0, 6.05, 0.93], black, 0.07);

    addBox(cabinet, [2.58, 1.86, 0.16], [0, 4.735, 0.84], black, 0.12);
    addBox(cabinet, [2.38, 1.66, 0.1], [0, 4.735, 0.92], charcoal, 0.1);
    addBox(cabinet, [2.16, 1.39, 0.035], [0, 4.735, 0.99], screenMaterial, 0.08);

    [-1, 1].forEach((side) => {
      const trimCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(side * 1.28, 3.88, 0.84),
        new THREE.Vector3(side * 1.32, 4.58, 0.84),
        new THREE.Vector3(side * 1.32, 5.42, 0.84),
        new THREE.Vector3(side * 1.38, 6.2, 0.84),
      ]);
      const trim = new THREE.Mesh(new THREE.TubeGeometry(trimCurve, 28, 0.028, 8, false), blue);
      trim.castShadow = true;
      cabinet.add(trim);
    });

    const ventGeometry = new THREE.CylinderGeometry(0.028, 0.028, 0.035, 12);
    for (let index = -4; index <= 4; index += 1) {
      const vent = new THREE.Mesh(ventGeometry, gunmetal);
      vent.rotation.x = Math.PI / 2;
      vent.position.set(index * 0.11, 5.6, 0.975);
      cabinet.add(vent);
    }

    const deck = addBox(cabinet, [3.08, 0.24, 1.64], [0, 3.57, 0.74], shell, 0.1);
    deck.rotation.x = -0.065;
    const controlSurface = addBox(cabinet, [2.73, 0.075, 1.28], [0, 3.715, 0.76], gunmetal, 0.07);
    controlSurface.rotation.x = -0.065;
    addBox(cabinet, [3.02, 0.3, 0.16], [0, 3.42, 1.49], red, 0.055);

    const joystickStem = new THREE.Mesh(new THREE.CylinderGeometry(0.052, 0.06, 0.24, 18), chrome);
    joystickStem.position.set(-0.58, 3.77, 0.78);
    joystickStem.castShadow = true;
    cabinet.add(joystickStem);

    const joystickTop = new THREE.Mesh(new THREE.SphereGeometry(0.14, 22, 16), red);
    joystickTop.position.set(-0.58, 3.91, 0.78);
    joystickTop.castShadow = true;
    cabinet.add(joystickTop);

    const buttonGeometry = new THREE.CylinderGeometry(0.105, 0.125, 0.07, 24);
    [[0.34, 0.71, blue], [0.67, 0.83, yellow], [0.98, 0.66, red]].forEach(([x, z, material]) => {
      const button = new THREE.Mesh(buttonGeometry, material as THREE.Material);
      button.position.set(x as number, 3.79, z as number);
      button.castShadow = true;
      cabinet.add(button);
    });

    const coinDoor = addBox(cabinet, [1.08, 1.48, 0.08], [0, 1.9, 0.82], gunmetal, 0.08);
    coinDoor.receiveShadow = true;
    addBox(cabinet, [0.88, 1.27, 0.045], [0, 1.9, 0.87], black, 0.055);
    [-0.23, 0.23].forEach((x) => {
      addBox(cabinet, [0.13, 0.3, 0.045], [x, 2.18, 0.905], chrome, 0.025);
      addBox(cabinet, [0.075, 0.14, 0.025], [x, 2.18, 0.94], red, 0.018);
    });
    addBox(cabinet, [0.48, 0.18, 0.045], [0, 1.46, 0.91], gunmetal, 0.035);

    for (let index = 0; index < 4; index += 1) {
      addBox(cabinet, [0.7, 0.035, 0.035], [0, 0.75 + index * 0.1, 0.86], gunmetal, 0.01);
    }

    [-0.87, 0.87].forEach((x) => {
      addBox(cabinet, [0.46, 0.18, 1.18], [x, 0.11, 0], black, 0.055);
    });

    const marqueeCanvas = document.createElement("canvas");
    marqueeCanvas.width = 768;
    marqueeCanvas.height = 180;
    const context = marqueeCanvas.getContext("2d");
    if (context) {
      context.imageSmoothingEnabled = false;
      const marqueeGradient = context.createLinearGradient(0, 0, marqueeCanvas.width, marqueeCanvas.height);
      marqueeGradient.addColorStop(0, "#17040a");
      marqueeGradient.addColorStop(0.48, "#0a0b14");
      marqueeGradient.addColorStop(1, "#081638");
      context.fillStyle = "#bf2430";
      context.fillRect(0, 0, marqueeCanvas.width, marqueeCanvas.height);
      context.fillStyle = marqueeGradient;
      context.fillRect(16, 16, marqueeCanvas.width - 32, marqueeCanvas.height - 32);
      context.strokeStyle = "rgba(53, 103, 214, 0.7)";
      context.lineWidth = 3;
      for (let x = 40; x < marqueeCanvas.width; x += 72) {
        context.beginPath();
        context.moveTo(x, 20);
        context.lineTo(x - 58, marqueeCanvas.height - 20);
        context.stroke();
      }
      context.fillStyle = "#f8fafc";
      context.font = "700 62px monospace";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.shadowColor = "rgba(255,255,255,0.4)";
      context.shadowBlur = 14;
      context.fillText("MRF // ARCADE", marqueeCanvas.width / 2, marqueeCanvas.height / 2 - 4);
      context.shadowBlur = 0;
      context.fillStyle = "#9cff73";
      context.font = "500 18px monospace";
      context.fillText("PORTFOLIO SYSTEM 20.26", marqueeCanvas.width / 2, marqueeCanvas.height - 29);
    }
    const marqueeTexture = new THREE.CanvasTexture(marqueeCanvas);
    marqueeTexture.colorSpace = THREE.SRGBColorSpace;
    marqueeTexture.minFilter = THREE.NearestFilter;
    marqueeTexture.magFilter = THREE.NearestFilter;
    const marqueeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: marqueeTexture });
    const marquee = new THREE.Mesh(new THREE.PlaneGeometry(2.45, 0.5), marqueeMaterial);
    marquee.position.set(0, 6.05, 0.992);
    cabinet.add(marquee);

    const poweredMaterials = [shell, black, charcoal, gunmetal, red, blue, yellow, screenMaterial, chrome, marqueeMaterial];
    const dormantMaterials = new Map<THREE.Material, THREE.Material>();
    poweredMaterials.forEach((material) => {
      const dormant = material.clone();
      if (dormant instanceof THREE.MeshStandardMaterial) {
        dormant.emissive.set(0x000000);
        dormant.emissiveIntensity = 0;
        dormant.roughness = Math.max(dormant.roughness, 0.56);
      } else if (dormant instanceof THREE.MeshBasicMaterial) {
        dormant.color.set(0x030406);
      }
      if (material === screenMaterial && dormant instanceof THREE.MeshStandardMaterial) {
        dormant.color.set(0x010202);
      }
      dormantMaterials.set(material, dormant);
    });

    [
      [-6.3, -0.7, 0.035],
      [-3.15, -0.32, 0.018],
      [3.15, -0.32, -0.018],
      [6.3, -0.7, -0.035],
    ].forEach(([x, z, rotationY]) => {
      const neighbor = cabinet.clone(true);
      neighbor.position.set(x, 0, z);
      neighbor.rotation.y = rotationY;
      neighbor.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        object.material = materials.map((material) => dormantMaterials.get(material) ?? material);
        if (materials.length === 1) object.material = object.material[0];
        object.castShadow = false;
        object.receiveShadow = true;
      });
      scene.add(neighbor);
    });

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(40, 40),
      new THREE.MeshStandardMaterial({ color: 0x030408, roughness: 0.86, metalness: 0.06 }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.015;
    floor.receiveShadow = true;
    scene.add(floor);

    const backWall = new THREE.Mesh(
      new THREE.PlaneGeometry(28, 10),
      new THREE.MeshStandardMaterial({ color: 0x020308, roughness: 0.92, metalness: 0.03 }),
    );
    backWall.position.set(0, 4.3, -1.7);
    backWall.receiveShadow = true;
    scene.add(backWall);

    const ceiling = new THREE.Mesh(
      new THREE.PlaneGeometry(28, 18),
      new THREE.MeshStandardMaterial({ color: 0x020307, roughness: 0.94, metalness: 0.02 }),
    );
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.set(0, 8.15, 2.5);
    ceiling.receiveShadow = true;
    scene.add(ceiling);

    const fixtureMaterial = new THREE.MeshStandardMaterial({
      color: 0x3b3b38,
      emissive: 0xffedcf,
      emissiveIntensity: 0.12,
      roughness: 0.34,
    });
    const dormantMetal = dormantMaterials.get(gunmetal) ?? gunmetal;
    [-6.3, -3.15, 3.15, 6.3].forEach((x) => {
      addBox(scene, [2.6, 0.18, 0.84], [x, 7.7, 0.05], dormantMetal, 0.08);
    });
    addBox(scene, [2.6, 0.18, 0.84], [0, 7.7, 0.35], dormantMetal, 0.08);
    addBox(scene, [2.2, 0.045, 0.58], [0, 7.59, 0.35], fixtureMaterial, 0.04);

    const hemisphereLight = new THREE.HemisphereLight(0x9aa9c9, 0x070509, 0.12);
    scene.add(hemisphereLight);
    const ambientLight = new THREE.AmbientLight(0x6f7890, 0.025);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff2df, 0.25);
    keyLight.position.set(-3.6, 8.5, 6.8);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.left = -4;
    keyLight.shadow.camera.right = 4;
    keyLight.shadow.camera.top = 8;
    keyLight.shadow.camera.bottom = -1;
    scene.add(keyLight);

    const frontFill = new THREE.DirectionalLight(0xc9d6ff, 0.06);
    frontFill.position.set(0, 4.8, 6);
    scene.add(frontFill);

    const blueRim = new THREE.SpotLight(0x3b67d6, 0, 14, Math.PI / 4, 0.72, 1.6);
    blueRim.position.set(4.5, 6.2, -1.8);
    blueRim.target.position.set(0, 4.2, 0);
    scene.add(blueRim, blueRim.target);

    const redRim = new THREE.SpotLight(0xbf2430, 0, 12, Math.PI / 5, 0.8, 1.7);
    redRim.position.set(-4.2, 3.4, -1.4);
    redRim.target.position.set(0, 3.4, 0);
    scene.add(redRim, redRim.target);

    const screenGlow = new THREE.PointLight(0x9cff73, 0, 3.8, 2);
    screenGlow.position.set(0, 4.72, 1.65);
    scene.add(screenGlow);

    const overheadLight = new THREE.SpotLight(0xffedcf, 2.2, 15, Math.PI / 4.6, 0.68, 1.55);
    overheadLight.position.set(0, 7.5, 0.4);
    overheadLight.target.position.set(0, 3.25, 0.2);
    scene.add(overheadLight, overheadLight.target);

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    const clockStart = performance.now();
    let frameId = 0;
    let currentProgress = 0;
    let disposed = false;
    const desktopCamera = {
      start: new THREE.Vector3(3.8, 5.45, 18.2),
      control: new THREE.Vector3(1.9, 6.15, 11.8),
      end: new THREE.Vector3(0, 4.74, 5.05),
    };
    const compactCamera = {
      start: new THREE.Vector3(2.4, 5.55, 16.8),
      control: new THREE.Vector3(1.2, 5.9, 11.4),
      end: new THREE.Vector3(0, 4.75, 7.35),
    };
    const targetPath = {
      start: new THREE.Vector3(0, 3.05, 0),
      control: new THREE.Vector3(0, 3.65, 0.12),
      end: new THREE.Vector3(0, 4.66, 0.42),
    };
    const curveA = new THREE.Vector3();
    const curveB = new THREE.Vector3();
    const lookTarget = new THREE.Vector3();

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
      const path = compact ? compactCamera : desktopCamera;
      const approach = THREE.MathUtils.clamp((progress - 0.08) / 0.92, 0, 1);
      const eased = approach * approach * (3 - 2 * approach);

      curveA.copy(path.start).lerp(path.control, eased);
      curveB.copy(path.control).lerp(path.end, eased);
      camera.position.lerpVectors(curveA, curveB, eased);

      curveA.copy(targetPath.start).lerp(targetPath.control, eased);
      curveB.copy(targetPath.control).lerp(targetPath.end, eased);
      lookTarget.lerpVectors(curveA, curveB, eased);
      camera.lookAt(lookTarget);
      const roomPower = THREE.MathUtils.smoothstep(progress, 0.36, 0.74);
      screenGlow.intensity = roomPower * 4.4;
      screenMaterial.emissiveIntensity = 0.04 + roomPower * 0.3;
      marqueeMaterial.color.setScalar(0.18 + roomPower * 0.82);
      fixtureMaterial.emissiveIntensity = 0.12 + roomPower * 1.15;
      overheadLight.intensity = 2.2 + roomPower * 3.55;
      hemisphereLight.intensity = 0.12 + roomPower * 0.1;
      ambientLight.intensity = 0.025 + roomPower * 0.025;
      keyLight.intensity = 0.25 + roomPower * 0.77;
      frontFill.intensity = 0.06 + roomPower * 0.3;
      blueRim.intensity = roomPower * 1.6;
      redRim.intensity = roomPower * 0.8;
      positionScreen();
      renderer.render(scene, camera);
    };

    const animate = (now: number) => {
      if (disposed) return;
      currentProgress = skippedRef.current || reducedMotionRef.current
        ? 1
        : Math.min((now - clockStart) / INTRO_DURATION, 1);
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
