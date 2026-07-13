export const GAME_WIDTH = 640;
export const GAME_HEIGHT = 360;
export const GROUND_Y = 326;
export const PLAYER_X = 142;
export const PLAYER_RADIUS = 13;
export const OBSTACLE_WIDTH = 66;
export const OBSTACLE_GAP = 144;
export const OBSTACLE_CAP_OVERHANG = 9;
export const OBSTACLE_CAP_HEIGHT = 22;
export const OBSTACLE_CAP_INTRUSION = 4;
export const OBSTACLE_SPEED = 178;
export const GRAVITY = 1120;
export const FLAP_VELOCITY = -390;
export const MAX_FALL_SPEED = 620;

export type PlayerPhysics = {
  y: number;
  velocity: number;
};

export type GameObstacle = {
  x: number;
  gapTop: number;
  passed: boolean;
};

export function advancePlayer(player: PlayerPhysics, deltaSeconds: number): PlayerPhysics {
  const velocity = Math.min(player.velocity + GRAVITY * deltaSeconds, MAX_FALL_SPEED);
  return { y: player.y + velocity * deltaSeconds, velocity };
}

export function circleIntersectsRectangle(
  circleX: number,
  circleY: number,
  radius: number,
  rectX: number,
  rectY: number,
  rectWidth: number,
  rectHeight: number,
) {
  const nearestX = Math.max(rectX, Math.min(circleX, rectX + rectWidth));
  const nearestY = Math.max(rectY, Math.min(circleY, rectY + rectHeight));
  const distanceX = circleX - nearestX;
  const distanceY = circleY - nearestY;
  return distanceX * distanceX + distanceY * distanceY <= radius * radius;
}

export function collidesWithObstacle(playerY: number, obstacle: GameObstacle) {
  const gapBottom = obstacle.gapTop + OBSTACLE_GAP;
  return (
    circleIntersectsRectangle(
      PLAYER_X,
      playerY,
      PLAYER_RADIUS,
      obstacle.x,
      0,
      OBSTACLE_WIDTH,
      obstacle.gapTop,
    ) ||
    circleIntersectsRectangle(
      PLAYER_X,
      playerY,
      PLAYER_RADIUS,
      obstacle.x - OBSTACLE_CAP_OVERHANG,
      obstacle.gapTop - OBSTACLE_CAP_HEIGHT + OBSTACLE_CAP_INTRUSION,
      OBSTACLE_WIDTH + OBSTACLE_CAP_OVERHANG * 2,
      OBSTACLE_CAP_HEIGHT,
    ) ||
    circleIntersectsRectangle(
      PLAYER_X,
      playerY,
      PLAYER_RADIUS,
      obstacle.x,
      gapBottom,
      OBSTACLE_WIDTH,
      GROUND_Y - gapBottom,
    ) ||
    circleIntersectsRectangle(
      PLAYER_X,
      playerY,
      PLAYER_RADIUS,
      obstacle.x - OBSTACLE_CAP_OVERHANG,
      gapBottom - OBSTACLE_CAP_INTRUSION,
      OBSTACLE_WIDTH + OBSTACLE_CAP_OVERHANG * 2,
      OBSTACLE_CAP_HEIGHT,
    )
  );
}

export function crossedObstacle(previousX: number, currentX: number) {
  const previousRight = previousX + OBSTACLE_WIDTH + OBSTACLE_CAP_OVERHANG;
  const currentRight = currentX + OBSTACLE_WIDTH + OBSTACLE_CAP_OVERHANG;
  return previousRight >= PLAYER_X && currentRight < PLAYER_X;
}
