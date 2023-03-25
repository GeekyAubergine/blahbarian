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

function render() {
  renderWorld(canvas, ctx, world);

  window.requestAnimationFrame(render);
}

window.requestAnimationFrame(render);
