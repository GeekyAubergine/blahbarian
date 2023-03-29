import "./style.css";
import { SHARK_ENTITY_CONFIG } from "./assets/shark";
import { Renderer } from "./engine/Renderer";
import { Game } from "./game/Game";
import { WARDROBE_ENITY_CONFIG } from "./assets/wardrobe";
import { EnemyWardrobe } from "./game/entity/enemies/EnemyWardrobe";
import { Vector } from "./engine/Vector";
import { TEST_ENITY_CONFIG } from "./assets/test";
import { BROCCOLI_ENITY_CONFIG } from "./assets/broccoli";
import { ENTITY_NAMES } from "./game/Constants";
import { PowerupBroccoli } from "./game/entity/powerups/PowerupBroccoli";

const ENTITIES = [
  TEST_ENITY_CONFIG,
  SHARK_ENTITY_CONFIG,
  WARDROBE_ENITY_CONFIG,
  BROCCOLI_ENITY_CONFIG,
];

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
    new PowerupBroccoli(
      new Vector(0, -256),
      g.getEntityDefaultAttributes(ENTITY_NAMES.WARDROBE)
    )
  );

  g.getWorld().addEntity(
    g,
    new EnemyWardrobe(
      new Vector(256, 0),
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
