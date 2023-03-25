import { renderWorld } from "./renderer";
import "./sprites";
import "./style.css";
import {
  MOVEMENT,
  EnemyType,
  PowerUpConfig,
  PowerUpType,
  World,
  Vector,
} from "./types";
import {
  movementForVector,
  moveTowardsPlayer,
  spawnPointForEnemy,
} from "./utils";

// ur not null shut up
const canvas: HTMLCanvasElement = document.querySelector("#game-canvas")!;
const ctx = canvas.getContext("2d")!;

export const config: Record<PowerUpType, PowerUpConfig> = {
  [PowerUpType.KETCHUP]: {
    type: PowerUpType.KETCHUP,
    duration: -1,
    radius: 8,
    color: "orange",
    playerChanges: {
      walkSpeed: 2,
    },
  },
};

const world: World = {
  tiles: [],
  powerUps: [
    {
      type: PowerUpType.KETCHUP,
      position: { x: 2, y: 2 },
    },
  ],
  enemies: [
    {
      id: "2",
      type: EnemyType.CHAIR,
      position: { x: 0, y: -5 },
      velocity: { x: 0, y: 0 },
      health: 100,
      maxHealth: 100,
      movement: MOVEMENT.DOWN,
      walkSpeed: 2,
    },
  ],
  player: {
    id: "player",
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    health: 10,
    maxHealth: 150,
    walkSpeed: 3,
    movement: MOVEMENT.IDLE,
    animation: {
      [MOVEMENT.IDLE]: {
        spriteSheetId: "player",
        spriteIds: [
          "player-idle-1",
          "player-idle-1",
          "player-idle-1",
          "player-idle-1",
          "player-idle-2",
          "player-idle-2",
          "player-idle-2",
          "player-idle-2",
        ],
      },
      [MOVEMENT.UP]: {
        spriteSheetId: "player",
        spriteIds: ["player-up-1", "player-up-2"],
      },
      [MOVEMENT.DOWN]: {
        spriteSheetId: "player",
        spriteIds: ["player-down-1", "player-down-2"],
      },
      [MOVEMENT.LEFT]: {
        spriteSheetId: "player",
        spriteIds: ["player-left-1", "player-left-2"],
      },
      [MOVEMENT.RIGHT]: {
        spriteSheetId: "player",
        spriteIds: ["player-right-1", "player-right-2"],
      },
    },
  },
};

const userInputFlags = {
  down: false,
  up: false,
  left: false,
  right: false,
};

let lastUpdate: number | null = null;
let tick = 0;

export function boundaryChecker(
  entity: { position: Vector },
  entity2: { position: Vector }
) {
  return (
    Math.hypot(
      entity.position.x - entity2.position.x,
      entity.position.y - entity2.position.y
    ) <= 1
  );
}

let lastTimeDamageTaken = Date.now();
const HEALTH_INCREMENT = 0.1;
const REGEN_START_TIME = 5000;

function playerControl(world: World, dt: number) {
  let moving = false;

  if (userInputFlags.up) {
    world.player.position.y -= world.player.walkSpeed * dt;
    world.player.movement = MOVEMENT.UP;
    moving = true;
  }

  if (userInputFlags.down) {
    world.player.position.y += world.player.walkSpeed * dt;
    world.player.movement = MOVEMENT.DOWN;
    moving = true;
  }

  if (userInputFlags.left) {
    world.player.position.x -= world.player.walkSpeed * dt;
    world.player.movement = MOVEMENT.LEFT;
    moving = true;
  }

  if (userInputFlags.right) {
    world.player.position.x += world.player.walkSpeed * dt;
    world.player.movement = MOVEMENT.RIGHT;
    moving = true;
  }

  if (!moving) {
    world.player.movement = MOVEMENT.IDLE;
  }

  if (world.player.health < 0) {
    throw Error("Oh no");
  }


  if (
    Date.now() - lastTimeDamageTaken > REGEN_START_TIME &&
    world.player.health < world.player.maxHealth
  ) {
    if (world.player.health + HEALTH_INCREMENT > world.player.maxHealth) {
      world.player.health = world.player.maxHealth;
    } else {
      world.player.health += HEALTH_INCREMENT;
    }
  }
}

function spawnEntities(world: World, dt: number) {
  if (dt % 60 && world.enemies.length < 50) {
    world.enemies.push({
      id: String(world.enemies.length + 1),
      type: EnemyType.CHAIR,
      position: spawnPointForEnemy(world),
      velocity: { x: 0, y: 0 },
      health: 100,
      maxHealth: 100,
      movement: MOVEMENT.DOWN,
      walkSpeed: 2,
    })
  }
}

function updateEntities(world: World, dt: number) {
  world.enemies.forEach((enemy) => {
    const velocity = moveTowardsPlayer(world, dt, enemy);
    enemy.movement = movementForVector(velocity);
  });

  world.enemies.forEach((enemy) => {
    if (dt % 60) {
      const newPosition = moveTowardsPlayer(world, dt, enemy)
      enemy.position.x += newPosition.x
      enemy.position.y += newPosition.y
    }
    if (boundaryChecker(world.player, enemy)) {
      world.player.health -= 10;
      lastTimeDamageTaken = Date.now();
    }
  });

  world.powerUps.forEach((powerUp, i) => {
    if (boundaryChecker(world.player, powerUp)) {
      world.powerUps = world.powerUps.filter((_, ii) => i !== ii);
      for (const prop of ["walkSpeed", "health"] as const) {
        world.player[prop] +=
          config[powerUp.type].playerChanges?.[prop] ?? world.player[prop];
      }
    }
  });
}

function update() {
  let dt = lastUpdate ? (Date.now() - lastUpdate) / 1000 : 0;

  playerControl(world, dt);

  renderWorld(canvas, ctx, tick, world);

  updateEntities(world, dt);

  spawnEntities(world, dt);

  window.requestAnimationFrame(update);

  lastUpdate = Date.now();

  tick++;
}

window.requestAnimationFrame(update);

window.addEventListener("keydown", (e) => {
  if (e.code === "ArrowDown" || e.code === "KeyS") {
    userInputFlags.down = true;
  } else if (e.code === "ArrowUp" || e.code === "KeyW") {
    userInputFlags.up = true;
  } else if (e.code === "ArrowLeft" || e.code === "KeyA") {
    userInputFlags.left = true;
  } else if (e.code === "ArrowRight" || e.code === "KeyD") {
    userInputFlags.right = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.code === "ArrowUp" || e.code === "KeyW") {
    userInputFlags.up = false;
  } else if (e.code === "ArrowDown" || e.code === "KeyS") {
    userInputFlags.down = false;
  } else if (e.code === "ArrowLeft" || e.code === "KeyA") {
    userInputFlags.left = false;
  } else if (e.code === "ArrowRight" || e.code === "KeyD") {
    userInputFlags.right = false;
  }
});
