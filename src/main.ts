import { renderWorld } from "./renderer";
import "./style.css";
import { Direction, World } from "./types";

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
    direction: Direction.UP,
  },
};

export const userInputFlags = {
  down: false,
  up: false,
  left: false,
  right: false,
}

function update() {
  renderWorld(canvas, ctx, world);

  window.requestAnimationFrame(update);

  if (userInputFlags.up) {
    world.player.position.y -= 0.1;
  }
}

window.requestAnimationFrame(update);

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown') {
    userInputFlags.down = true;
  } else if (e.key === 'ArrowUp') {
    userInputFlags.up = true;
  } else if (e.key === 'ArrowLeft') {
    userInputFlags.left = true;
  } else if (e.key === 'ArrowRight') {
    userInputFlags.right = true;
  }
});

window.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowUp') {
  } else if (e.key === 'ArrowUp') {
    userInputFlags.up = false;
  } else if (e.key === 'ArrowLeft') {
    userInputFlags.left = false;
  } else if (e.key === 'ArrowRight') {
    userInputFlags.right = false;
  }
});
