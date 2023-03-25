import { renderWorld } from "./renderer";
import "./style.css";
import { Direction, EnemyType, World } from "./types";

// ur not null shut up
const canvas: HTMLCanvasElement = document.querySelector("#game-canvas")!;
const ctx = canvas.getContext("2d")!;

const world: World = {
  tiles: [],
  enemies: [
    {
      id: "2",
      type: EnemyType.CHAIR,
      position: { x: 0, y: -5 },
      velocity: { x: 0, y: 0 },
      health: 100,
      direction: Direction.DOWN,
    },
  ],
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

//   world.player.position.x += 0.01;
//   world.player.position.y += 0.005;

//   world.enemies[0].position.x += 0.05;
//   world.enemies[0].position.y += 0.006;
}

window.requestAnimationFrame(render);
