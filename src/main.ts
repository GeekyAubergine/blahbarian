import { renderWorld } from "./renderer";
import "./sprites";
import "./style.css";
import {
  MOVEMENT,
  EnemyType,
  PowerUpConfig,
  PowerUpType,
  World,
} from "./types";

// ur not null shut up
const canvas: HTMLCanvasElement = document.querySelector("#game-canvas")!;
const ctx = canvas.getContext("2d")!;

export const config = {
  [PowerUpType.KETCHUP]: {
    type: PowerUpType.KETCHUP,
    duration: -1,
    radius: 8,
    color: "orange",
  },
} as const satisfies Record<PowerUpType, PowerUpConfig>;

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
      movement: MOVEMENT.DOWN,
      walkSpeed: 2,
    },
  ],
  player: {
    id: "player",
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    health: 100,
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

function update() {
  let dt = lastUpdate ? (Date.now() - lastUpdate) / 1000 : 0;

  renderWorld(canvas, ctx, tick, world);

  window.requestAnimationFrame(update);

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
