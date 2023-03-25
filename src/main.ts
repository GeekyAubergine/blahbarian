import { spawnEntities } from "./enemies";
import { renderWorld, TILE_SIZE } from "./renderer";
import "./sprites";
import "./style.css";
import { MOVEMENT, PowerUpConfig, PowerUpType, World, Vector } from "./types";
import { movementForVector, moveTowardsPlayer } from "./utils";

const INVINICIBILITY_TIME = 500;

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
  [PowerUpType.DRUGS]: {
    type: PowerUpType.DRUGS,
    duration: 2,
    radius: 8,
    color: "green",
    playerChanges: {
      health: 40,
      walkSpeed: 2,
    },
  },
  [PowerUpType.BROCOLLI_BOMB]: {
    type: PowerUpType.BROCOLLI_BOMB,
    duration: 5,
    radius: 8,
    color: "yellow",
    playerChanges: {
      health: -100,
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
    {
      type: PowerUpType.BROCOLLI_BOMB,
      position: { x: 4, y: 4 },
    },
  ],
  enemies: [],
  player: {
    id: "player",
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    health: 100,
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
  attack: false,
};

let lastUpdate: number | null = null;
let tick = 0;
let startTime = Date.now();

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

  if (userInputFlags.attack) {
    world.enemies.forEach((enemy) => {
      const { player } = world
      const newPosition = { ...player.position }
      switch (player.movement) {
        case MOVEMENT.UP: {
          newPosition.y -= TILE_SIZE
          break
        }
        case MOVEMENT.DOWN: {
          newPosition.y += TILE_SIZE
          break
        }
        case MOVEMENT.RIGHT: {
          newPosition.x += TILE_SIZE
          break
        }
        case MOVEMENT.LEFT: {
          newPosition.y += TILE_SIZE
          break
        }
      }
      console.log(newPosition)
      if (boundaryChecker({position: newPosition}, enemy)) {
        enemy.health -= 1000;
        console.log(enemy)
        if (enemy.health <= 0) {
          world.enemies.filter((e) => e.id !== enemy.id)
        }
      }
    })
  }

  if (world.player.health < 0) {
    window.alert('Game over! Play again?');
    window.location.reload();
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

function updateEntities(world: World, dt: number) {
  world.enemies.forEach((enemy) => {
    const velocity = moveTowardsPlayer(world, dt, enemy);
    enemy.movement = movementForVector(velocity);
  });

  world.enemies.forEach((enemy) => {
    if (dt % 60) {
      const newPosition = moveTowardsPlayer(world, dt, enemy);
      enemy.position.x += newPosition.x;
      enemy.position.y += newPosition.y;
      enemy.movement = movementForVector(newPosition);
    }

    if (boundaryChecker(world.player, enemy)) {
      const timeSinceLastDamage = Date.now() - lastTimeDamageTaken;

      if (timeSinceLastDamage < INVINICIBILITY_TIME) {
        return;
      }

      world.player.health -= 10;
      lastTimeDamageTaken = Date.now();
    }
  });

  world.powerUps.forEach((powerUp, i) => {
    if (boundaryChecker(world.player, powerUp)) {
      world.powerUps = world.powerUps.filter((_, ii) => i !== ii);

      Object.keys(config[powerUp.type]?.playerChanges || {}).forEach(
        (prop: string) => {
          if (prop === "health") {
            let health =
              (config[powerUp.type].playerChanges?.[prop] || 0) +
              world.player[prop];

            if (health > 100) {
              health = 100;
            }

            world.player[prop] = health;
            return;
          }

          // @ts-ignore
          world.player[prop] +=
            // @ts-ignore
            config[powerUp.type].playerChanges?.[prop] ?? world.player[prop];
        }
      );
    }
  });
}

function update() {
  let dt = lastUpdate ? (Date.now() - lastUpdate) / 1000 : 0;

  playerControl(world, dt);

  renderWorld(canvas, ctx, tick, world);

  updateEntities(world, dt);

  spawnEntities(world, dt, startTime);

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
  } else if (e.code === 'Space') {
    userInputFlags.attack = true
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
  } else if (e.code === 'Space') {
    userInputFlags.attack = false
  }
});
