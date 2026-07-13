import assert from "node:assert/strict";
import test from "node:test";
import {
  advancePlayer,
  collidesWithObstacle,
  crossedObstacle,
  FLAP_VELOCITY,
  GRAVITY,
  OBSTACLE_GAP,
  PLAYER_X,
} from "./arcade-game-physics.ts";

test("gravity advances velocity and position", () => {
  const next = advancePlayer({ y: 100, velocity: FLAP_VELOCITY }, 0.1);
  assert.equal(next.velocity, FLAP_VELOCITY + GRAVITY * 0.1);
  assert.equal(next.y, 100 + next.velocity * 0.1);
});

test("collision detects columns but leaves the opening safe", () => {
  const obstacle = { x: PLAYER_X - 10, gapTop: 90, passed: false };
  assert.equal(collidesWithObstacle(40, obstacle), true);
  assert.equal(collidesWithObstacle(90 + OBSTACLE_GAP / 2, obstacle), false);
  assert.equal(collidesWithObstacle(280, obstacle), true);
});

test("collision includes the visible obstacle cap overhang", () => {
  const obstacle = { x: PLAYER_X + 20, gapTop: 90, passed: false };
  assert.equal(collidesWithObstacle(87, obstacle), true);
});

test("score crossing occurs only as an obstacle moves behind the player", () => {
  assert.equal(crossedObstacle(71, 66), true);
  assert.equal(crossedObstacle(80, 70), false);
  assert.equal(crossedObstacle(200, 190), false);
  assert.equal(crossedObstacle(60, 50), false);
});
