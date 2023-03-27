import "./style.css";
import { SHARK_ENTITY_CONFIG } from "./assets/shark";
import { Renderer } from "./engine/Renderer";
import { Game } from "./engine/Game";
import { WARDROBE_ENITY_CONFIG } from "./assets/wardrobe";
import { EnemyWardrobe } from "./engine/enemies/EnemyWardrobe";
import { Vector } from "./engine/Vector";
import { TILE_SIZE } from "./engine/Constants";
import { ENTITY_NAMES } from "./engine/Entity";

const ENTITIES = [SHARK_ENTITY_CONFIG, WARDROBE_ENITY_CONFIG];

const canvas = document.querySelector<HTMLCanvasElement>("#canvas");
let game: Game | null = null;

function onWindowResize() {
  if (!canvas) {
    return;
  }

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

async function initialize(): Promise<void> {
  if (!canvas) {
    throw new Error("No canvas");
  }

  const g = new Game(canvas, ENTITIES);

  await g.loadAssets();

  g.getWorld().addEntity(
    g,
    new EnemyWardrobe(
      "wardobe",
      new Vector(4 * TILE_SIZE, 0),
      0,
      new Vector(-100, 0),
      0,
      g.getEntityDefaultAttributes(ENTITY_NAMES.WARDROBE)
    )
  );

  await g.init();

  game = g;
}

function tick() {
  if (!game) {
    window.requestAnimationFrame(tick);
    return;
  }

  game.update();

  game.render();

  window.requestAnimationFrame(tick);
}

window.addEventListener("resize", onWindowResize);
window.requestAnimationFrame(tick);

onWindowResize();

initialize();
