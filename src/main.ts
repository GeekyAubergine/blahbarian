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
}

function update() {
  renderWorld(canvas, ctx, world);

  window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown') {
    userInputFlags.down = true;
  }
  if (e.key === 'ArrowUp') {
    userInputFlags.up = true;
  }
});

window.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowUp') {
    userInputFlags.up = false;
  }
});
