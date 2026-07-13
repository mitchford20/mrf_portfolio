"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type RefObject,
} from "react";
import {
  advancePlayer,
  collidesWithObstacle,
  crossedObstacle,
  FLAP_VELOCITY,
  GAME_HEIGHT,
  GAME_WIDTH,
  GROUND_Y,
  OBSTACLE_GAP,
  OBSTACLE_CAP_HEIGHT,
  OBSTACLE_CAP_INTRUSION,
  OBSTACLE_CAP_OVERHANG,
  OBSTACLE_SPEED,
  OBSTACLE_WIDTH,
  PLAYER_RADIUS,
  PLAYER_X,
  type GameObstacle,
  type PlayerPhysics,
} from "@/components/arcade-game-physics";

type GamePhase = "ready" | "running" | "over";

const HIGH_SCORE_KEY = "mrf-byte-flight-best";

function createObstacle(x: number): GameObstacle {
  const minimumTop = 64;
  const maximumTop = GROUND_Y - OBSTACLE_GAP - 54;
  return {
    x,
    gapTop: Math.round(minimumTop + Math.random() * (maximumTop - minimumTop)),
    passed: false,
  };
}

function drawCloud(context: CanvasRenderingContext2D, x: number, y: number, scale: number) {
  context.fillStyle = "#fff8df";
  context.fillRect(x, y + 8 * scale, 44 * scale, 12 * scale);
  context.fillRect(x + 10 * scale, y, 22 * scale, 20 * scale);
}

function drawObstacleSegment(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  capAtBottom: boolean,
) {
  if (height <= 0) return;
  context.fillStyle = "#172057";
  context.fillRect(x - 4, y, width + 8, height);
  context.fillStyle = "#a93413";
  context.fillRect(x, y, width, height);
  context.fillStyle = "rgba(83, 31, 16, 0.55)";
  for (let row = y + 18; row < y + height; row += 18) {
    context.fillRect(x, row, width, 3);
  }
  for (let column = x + 18; column < x + width; column += 22) {
    context.fillRect(column, y, 3, height);
  }

  const capY = capAtBottom
    ? y + height - OBSTACLE_CAP_HEIGHT + OBSTACLE_CAP_INTRUSION
    : y - OBSTACLE_CAP_INTRUSION;
  context.fillStyle = "#172057";
  context.fillRect(
    x - OBSTACLE_CAP_OVERHANG,
    capY,
    width + OBSTACLE_CAP_OVERHANG * 2,
    OBSTACLE_CAP_HEIGHT,
  );
  context.fillStyle = "#f8d54a";
  context.fillRect(x - 5, capY + 4, width + 10, 14);
  context.fillStyle = "#d79224";
  context.fillRect(x - 5, capY + 14, width + 10, 4);
}

function drawPlayer(
  context: CanvasRenderingContext2D,
  player: PlayerPhysics,
  running: boolean,
  reduceMotion: boolean,
) {
  const x = Math.round(PLAYER_X);
  const y = Math.round(player.y);
  const tilt = reduceMotion ? 0 : Math.max(-0.35, Math.min(0.5, player.velocity / 700));

  context.save();
  context.translate(x, y);
  context.rotate(tilt);
  context.fillStyle = "#172057";
  context.fillRect(-17, -11, 30, 22);
  context.fillStyle = "#2e3c8f";
  context.fillRect(-13, -7, 22, 14);
  context.fillStyle = "#f8d54a";
  context.fillRect(-24, running && player.velocity < 0 ? -4 : 2, 15, 8);
  context.fillRect(11, -5, 11, 10);
  context.fillStyle = "#fff8df";
  context.fillRect(2, -6, 7, 7);
  context.fillStyle = "#071129";
  context.fillRect(6, -4, 3, 3);
  context.restore();
}

function drawGame(
  context: CanvasRenderingContext2D,
  player: PlayerPhysics,
  obstacles: GameObstacle[],
  worldOffset: number,
  phase: GamePhase,
  reduceMotion: boolean,
) {
  context.imageSmoothingEnabled = false;
  context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  context.fillStyle = "#5c94fc";
  context.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  const cloudOffset = reduceMotion ? 0 : worldOffset * 0.15;
  drawCloud(context, ((72 - cloudOffset) % 720 + 720) % 720 - 40, 52, 1);
  drawCloud(context, ((390 - cloudOffset) % 720 + 720) % 720 - 40, 92, 1.25);
  drawCloud(context, ((650 - cloudOffset) % 720 + 720) % 720 - 40, 38, 0.8);

  context.fillStyle = "#3b8438";
  context.beginPath();
  context.moveTo(0, GROUND_Y);
  context.lineTo(90, 236);
  context.lineTo(175, GROUND_Y);
  context.lineTo(290, 218);
  context.lineTo(420, GROUND_Y);
  context.lineTo(535, 246);
  context.lineTo(GAME_WIDTH, GROUND_Y);
  context.fill();

  for (const obstacle of obstacles) {
    const x = Math.round(obstacle.x);
    drawObstacleSegment(context, x, 0, OBSTACLE_WIDTH, obstacle.gapTop, true);
    const gapBottom = obstacle.gapTop + OBSTACLE_GAP;
    drawObstacleSegment(context, x, gapBottom, OBSTACLE_WIDTH, GROUND_Y - gapBottom, false);
  }

  context.fillStyle = "#55a938";
  context.fillRect(0, GROUND_Y, GAME_WIDTH, 10);
  context.fillStyle = "#f8d54a";
  context.fillRect(0, GROUND_Y, GAME_WIDTH, 4);
  context.fillStyle = "#a93413";
  context.fillRect(0, GROUND_Y + 10, GAME_WIDTH, GAME_HEIGHT - GROUND_Y - 10);
  context.fillStyle = "rgba(63, 29, 18, 0.65)";
  for (let x = -((worldOffset * 0.6) % 48); x < GAME_WIDTH; x += 48) {
    context.fillRect(Math.round(x), GROUND_Y + 10, 4, GAME_HEIGHT - GROUND_Y - 10);
  }

  drawPlayer(context, player, phase === "running", reduceMotion);
}

export function ArcadeGame({
  onExit,
  backButtonRef,
}: {
  onExit: () => void;
  backButtonRef: RefObject<HTMLButtonElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const actionButtonRef = useRef<HTMLButtonElement>(null);
  const playerRef = useRef<PlayerPhysics>({ y: 174, velocity: 0 });
  const obstaclesRef = useRef<GameObstacle[]>([]);
  const phaseRef = useRef<GamePhase>("ready");
  const worldOffsetRef = useRef(0);
  const spawnTimerRef = useRef(0);
  const scoreRef = useRef(0);
  const reducedMotionRef = useRef(false);
  const [phase, setPhase] = useState<GamePhase>("ready");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);

  useEffect(() => {
    actionButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => { reducedMotionRef.current = query.matches; };
    updatePreference();
    query.addEventListener("change", updatePreference);

    try {
      setBest(Number(window.localStorage.getItem(HIGH_SCORE_KEY)) || 0);
    } catch {
      // High scores are optional when storage is unavailable.
    }

    return () => query.removeEventListener("change", updatePreference);
  }, []);

  const setGamePhase = useCallback((nextPhase: GamePhase) => {
    phaseRef.current = nextPhase;
    setPhase(nextPhase);
  }, []);

  const finishRun = useCallback(() => {
    if (phaseRef.current !== "running") return;
    setGamePhase("over");
    setBest((previousBest) => {
      const nextBest = Math.max(previousBest, scoreRef.current);
      try {
        window.localStorage.setItem(HIGH_SCORE_KEY, String(nextBest));
      } catch {
        // The game remains playable without persistent storage.
      }
      return nextBest;
    });
    window.requestAnimationFrame(() => actionButtonRef.current?.focus());
  }, [setGamePhase]);

  const startRun = useCallback(() => {
    playerRef.current = { y: 174, velocity: FLAP_VELOCITY };
    obstaclesRef.current = [createObstacle(570)];
    worldOffsetRef.current = 0;
    spawnTimerRef.current = 1.45;
    scoreRef.current = 0;
    setScore(0);
    setGamePhase("running");
    window.requestAnimationFrame(() => canvasRef.current?.focus());
  }, [setGamePhase]);

  const flap = useCallback(() => {
    if (phaseRef.current !== "running") {
      startRun();
      return;
    }
    playerRef.current.velocity = FLAP_VELOCITY;
  }, [startRun]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    drawGame(
      context,
      playerRef.current,
      obstaclesRef.current,
      worldOffsetRef.current,
      phase,
      reducedMotionRef.current,
    );
    if (phase !== "running") return;

    let animationFrame = 0;
    let previousTime = performance.now();
    const frame = (time: number) => {
      const deltaSeconds = Math.min((time - previousTime) / 1000, 0.032);
      previousTime = time;
      worldOffsetRef.current += OBSTACLE_SPEED * deltaSeconds;
      playerRef.current = advancePlayer(playerRef.current, deltaSeconds);

      spawnTimerRef.current -= deltaSeconds;
      if (spawnTimerRef.current <= 0) {
        obstaclesRef.current.push(createObstacle(GAME_WIDTH + 30));
        spawnTimerRef.current += 1.45;
      }

      for (const obstacle of obstaclesRef.current) {
        const previousX = obstacle.x;
        obstacle.x -= OBSTACLE_SPEED * deltaSeconds;
        if (!obstacle.passed && crossedObstacle(previousX, obstacle.x)) {
          obstacle.passed = true;
          scoreRef.current += 1;
          setScore(scoreRef.current);
        }
      }
      obstaclesRef.current = obstaclesRef.current.filter(
        (obstacle) => obstacle.x + OBSTACLE_WIDTH > -20,
      );

      const player = playerRef.current;
      const hitBoundary =
        player.y - PLAYER_RADIUS <= 0 || player.y + PLAYER_RADIUS >= GROUND_Y;
      const hitObstacle = obstaclesRef.current.some((obstacle) =>
        collidesWithObstacle(player.y, obstacle),
      );
      if (hitBoundary || hitObstacle) finishRun();

      drawGame(
        context,
        player,
        obstaclesRef.current,
        worldOffsetRef.current,
        phaseRef.current,
        reducedMotionRef.current,
      );
      if (phaseRef.current === "running") {
        animationFrame = window.requestAnimationFrame(frame);
      }
    };

    animationFrame = window.requestAnimationFrame(frame);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [finishRun, phase]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const isFlapKey =
      event.code === "Space" ||
      event.key === " " ||
      event.key === "Space" ||
      event.key === "Spacebar" ||
      event.key === "ArrowUp" ||
      event.key === "Enter";
    if (!isFlapKey) return;
    if (event.target instanceof HTMLButtonElement && event.key !== "ArrowUp") return;
    event.preventDefault();
    flap();
  };

  const overlayTitle = phase === "over" ? "RUN OVER" : "BYTE FLIGHT";
  const overlayCopy = phase === "over"
    ? `SCORE ${String(score).padStart(2, "0")} // BEST ${String(best).padStart(2, "0")}`
    : "FLY THE SIGNAL THROUGH THE FIREWALL";

  return (
    <section className="arcade-game-screen" aria-label="Byte Flight mini game" onKeyDown={handleKeyDown}>
      <header className="arcade-game-hud">
        <button ref={backButtonRef} type="button" onClick={onExit}>
          ◀ BACK <span>[ESC]</span>
        </button>
        <strong>SCORE {String(score).padStart(2, "0")}</strong>
        <span>BEST {String(best).padStart(2, "0")}</span>
      </header>
      <div className="arcade-game-stage">
        <canvas
          ref={canvasRef}
          width={GAME_WIDTH}
          height={GAME_HEIGHT}
          tabIndex={0}
          aria-label="Byte Flight game. Press Space or Arrow Up to fly through each opening."
          onPointerDown={flap}
        />
        {phase !== "running" && (
          <div className="arcade-game-overlay">
            <div>
              <p>MRF MINI GAME</p>
              <h2>{overlayTitle}</h2>
              <span>{overlayCopy}</span>
              <button ref={actionButtonRef} type="button" onClick={startRun}>
                {phase === "over" ? "RETRY" : "START RUN"}
              </button>
              <small>SPACE / ↑ / TAP TO FLY</small>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
