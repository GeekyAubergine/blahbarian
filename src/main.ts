import "./style.css";
import { SHARK_SPRITE_SHEET_AND_ANIMATIONS } from "./assets/shark";
import { Renderer } from "./engine/Renderer";
import { SpriteSheet } from "./engine/SpriteSheet";
import { SpriteSheetAndAnimations } from "./engine/Animation";
import { Game } from "./engine/Game";
import { WARDROBE_SPRITE_SHEET_AND_ANIMATIONS } from "./assets/wardrobe";
import { EnemyWardrobe } from "./engine/enemies/EnemyWardrobe";
import { Vector } from "./engine/Vector";
import { TILE_SIZE } from "./engine/Constants";

const canvas = document.querySelector<HTMLCanvasElement>("#canvas");
let game: Game | null = null;

function onWindowResize() {
  if (!canvas) {
    return;
  }

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

async function initializeRenderer(): Promise<Renderer> {
  if (!canvas) {
    throw new Error("No canvas");
  }

  const renderer = new Renderer(canvas);

  renderer.addSpriteSheetAndAnimations(
    "shark",
    SpriteSheetAndAnimations.fromDefinition(
      "shark",
      SHARK_SPRITE_SHEET_AND_ANIMATIONS
    )
  );

  renderer.addSpriteSheetAndAnimations(
    "wardrobe",
    SpriteSheetAndAnimations.fromDefinition(
      "wardrobe",
      WARDROBE_SPRITE_SHEET_AND_ANIMATIONS
    )
  );

  await renderer.loadSpriteSheets();

  return renderer;
}

async function initialize(): Promise<void> {
  const renderer = await initializeRenderer();

  const g = new Game(renderer);

  g.world.addEntity(
    new EnemyWardrobe("wardobe-1", new Vector(4 * TILE_SIZE, 0), 0, new Vector(-32, 0), 0)
  );

  await g.init(Date.now() / 1000);

  game = g;
}

let lastTick = 0;
function tick() {
  if (lastTick === 0) {
    lastTick = Date.now() / 1000;
  }

  const now = Date.now() / 1000;

  const dt = now - lastTick;

  if (!game) {
    window.requestAnimationFrame(tick);
    return;
  }

  game.update(dt);

  game.render(now);

  lastTick = Date.now() / 1000;

  window.requestAnimationFrame(tick);
}

window.addEventListener("resize", onWindowResize);
window.requestAnimationFrame(tick);

onWindowResize();

initialize();
