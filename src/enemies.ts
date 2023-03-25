import { Enemy, EnemyType, MOVEMENT, World } from "./types";
import { spawnPointForEnemy } from "./utils";

const BASE_ENEMY_SPAWNING = 2;
const ENEMY_SPAWNING_DIVIDER = 1000;

export const BASE_WARDROBE: Enemy = {
  id: "",
  type: EnemyType.WARDROBE,
  position: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
  health: 100,
  maxHealth: 100,
  movement: MOVEMENT.IDLE,
  walkSpeed: 2,
  spriteSheetName: "wardrobe",
  animation: {
    [MOVEMENT.IDLE]: {
      spriteSheetId: "wardrobe",
      spriteIds: ["wardrobe-1"],
    },
    [MOVEMENT.UP]: {
      spriteSheetId: "wardrobe",
      spriteIds: ["wardrobe-1", "wardrobe-2", "wardrobe-3", "wardrobe-4"],
    },
    [MOVEMENT.DOWN]: {
      spriteSheetId: "wardrobe",
      spriteIds: ["wardrobe-1", "wardrobe-2", "wardrobe-3", "wardrobe-4"],
    },
    [MOVEMENT.LEFT]: {
      spriteSheetId: "wardrobe",
      spriteIds: ["wardrobe-1", "wardrobe-2", "wardrobe-3", "wardrobe-4"],
    },
    [MOVEMENT.RIGHT]: {
      spriteSheetId: "wardrobe",
      spriteIds: ["wardrobe-1", "wardrobe-2", "wardrobe-3", "wardrobe-4"],
    },
  },
};

const ENEMIES = [BASE_WARDROBE];

export function spawnEntities(world: World, dt: number, startTime: number) {
  const timeSinceStart = Date.now() - startTime;

  //   console.log({ timeSinceStart });

  const maxEnimies = Math.floor(
    (timeSinceStart / ENEMY_SPAWNING_DIVIDER)
  );

  if (dt % 60 && world.enemies.length < maxEnimies) {
    const enemy = ENEMIES[Math.floor(Math.random() * ENEMIES.length)];
    world.enemies.push({
      ...enemy,
      id: String(world.enemies.length + 1),
      position: spawnPointForEnemy(world),
      animationStartingOffset: Math.floor(Math.random() * 60),
    });
  }
}
