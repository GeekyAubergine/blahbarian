import { renderWorld } from "./renderer";
import "./sprites";
import "./style.css";
import { MOVEMENT, EnemyType, World } from "./types";

// ur not null shut up
const canvas: HTMLCanvasElement = document.querySelector("#game-canvas")!;
const ctx = canvas.getContext("2d")!;

const world: World = {
  tiles: [],
  enemies: [],
  player: {
    id: "player",
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    health: 100,
    movement: MOVEMENT.IDLE,
    animation: {
      [MOVEMENT.IDLE]: {
        spriteSheetId: "player",
        spriteIds: ["player-down-1", "player-down-2"],
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

export const userInputFlags = {
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

  if (userInputFlags.up) {
    world.player.position.y -= 1 * dt;
    world.player.movement = MOVEMENT.UP;
  }

  if (userInputFlags.down) {
    world.player.position.y += 1 * dt;
    world.player.movement = MOVEMENT.UP;
  }

  if (userInputFlags.left) {
    world.player.position.x -= 1 * dt;
    world.player.movement = MOVEMENT.LEFT;
  }

  if (userInputFlags.right) {
    world.player.position.x += 1 * dt;
    world.player.movement = MOVEMENT.RIGHT;
  }

  lastUpdate = Date.now();

  tick++;
}

window.requestAnimationFrame(update);

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") {
    userInputFlags.down = true;
  } else if (e.key === "ArrowUp") {
    userInputFlags.up = true;
  } else if (e.key === "ArrowLeft") {
    userInputFlags.left = true;
  } else if (e.key === "ArrowRight") {
    userInputFlags.right = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.key === "ArrowUp") {
    userInputFlags.up = false;
  } else if (e.key === "ArrowDown") {
    userInputFlags.down = false;
  } else if (e.key === "ArrowLeft") {
    userInputFlags.left = false;
  } else if (e.key === "ArrowRight") {
    userInputFlags.right = false;
  }
});
