import { Entity, MOVEMENT, Vector, World } from "./types";

const ZERO_SPEED_THRESHOLD = 0.005;
const MIN_SPAWN_DISTANCE = 18;
const MAX_SPAWN_DISTANCE = 24;

export function spawnPointForEnemy(
  world: World,
  minDistance: number = MIN_SPAWN_DISTANCE,
  maxDistance: number = MAX_SPAWN_DISTANCE
): Vector {
  const angle = Math.random() * Math.PI * 2;

  const distance =
    Math.random() * (minDistance - maxDistance) + MIN_SPAWN_DISTANCE;

  const x = Math.sin(angle) * distance;
  const y = Math.cos(angle) * distance;

  return {
    x: world.player.position.x + x,
    y: world.player.position.y + y,
  };
}

/**
 * @returns Vector to be added to the current position
 **/
export function moveTowardsPlayer(
  world: World,
  dt: number,
  entity: Entity
): Vector {
  const distance = Math.hypot(
    world.player.position.x - entity.position.x,
    world.player.position.y - entity.position.y
  );

  if (distance < ZERO_SPEED_THRESHOLD) {
    return {
      x: 0,
      y: 0,
    };
  }

  const playerPosition = world.player.position;
  const entityPosition = entity.position;

  const angle = Math.atan2(
    playerPosition.x - entityPosition.x,
    playerPosition.y - entityPosition.y
  );

  const x = Math.sin(angle) * entity.walkSpeed * dt;
  const y = Math.cos(angle) * entity.walkSpeed * dt;

  return {
    x,
    y,
  };
}

export function movementForVector(vector: Vector): MOVEMENT {
  const { x, y } = vector;

  if (
    Math.abs(x) < ZERO_SPEED_THRESHOLD &&
    Math.abs(y) < ZERO_SPEED_THRESHOLD
  ) {
    return MOVEMENT.IDLE;
  }

  if (Math.abs(x) > Math.abs(y)) {
    if (x > 0) {
      return MOVEMENT.RIGHT;
    } else {
      return MOVEMENT.LEFT;
    }
  } else {
    if (y > 0) {
      return MOVEMENT.DOWN;
    } else {
      return MOVEMENT.UP;
    }
  }
}

export function playSound(audioPath: string) {
  const audio = new Audio(audioPath);
  audio.play();
}

export function exhaust(value: never): never {
  throw new Error(`Unexpected value: ${value}`);
}
