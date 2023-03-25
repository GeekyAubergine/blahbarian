import { SPRITE_SHEETS } from "./sprites";
import {
  Enemy,
  EnemyType,
  Entity,
  SpriteSheets,
  TileType,
  World,
  PowerUp,
  PowerUpType,
} from "./types";
import { config } from "./main";
import { sample } from 'lodash'
import { spawnPointForEnemy } from "./utils";

const TILE_SIZE = 64;

export function renderSprite(
  ctx: CanvasRenderingContext2D,
  spiteSheets: SpriteSheets,
  spriteSheetId: string,
  spriteId: string,
  x: number,
  y: number
) {
  // render sprite
  const spriteSheet = spiteSheets[spriteSheetId];
  const sprite = spriteSheet.sprites[spriteId];

  const scale = TILE_SIZE / spriteSheet.spriteSize;

  const { image } = spriteSheet;

  if (!image) {
    throw new Error("Image not found");
  }

  ctx.drawImage(
    image as CanvasImageSource,
    sprite.sx * spriteSheet.spriteSize,
    sprite.sy * spriteSheet.spriteSize,
    spriteSheet.spriteSize,
    spriteSheet.spriteSize,
    x,
    y,
    spriteSheet.spriteSize * scale,
    spriteSheet.spriteSize * scale
  );
}

export function renderEnemy(
  ctx: CanvasRenderingContext2D,
  spiteSheets: SpriteSheets,
  animationFrame: number,
  enemy: Enemy
) {
  const { x, y } = enemy.position;

  //   ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  const frames = enemy.animation?.[enemy.movement].spriteIds;

  const frame =
    frames?.[
      (animationFrame + (enemy.animationStartingOffset ?? 0)) % frames.length
    ];

  if (!frame) {
    return;
  }

  renderSprite(
    ctx,
    spiteSheets,
    enemy.spriteSheetName,
    frame,
    x * TILE_SIZE,
    y * TILE_SIZE
  );

  ctx.fillStyle = "pink";
}

export function renderPlayer(
  ctx: CanvasRenderingContext2D,
  spiteSheets: SpriteSheets,
  animationFrame: number,
  player: Entity
) {
  ctx.fillStyle = "blue";
  const { x, y } = player.position;
  // render circle
  //   ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  const frames = player.animation?.[player.movement].spriteIds;

  const frame = frames?.[animationFrame % frames.length];

  if (!frame) {
    return;
  }

  renderSprite(ctx, spiteSheets, "player", frame, x * TILE_SIZE, y * TILE_SIZE);
}

export function renderPowerUp(ctx: CanvasRenderingContext2D, powerUp: PowerUp) {
  ctx.fillStyle = config[powerUp.type].color;
  const { x, y } = powerUp.position;
  ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

export function renderTile(
  ctx: CanvasRenderingContext2D,
  tile: TileType,
  x: number,
  y: number
) {
  switch (tile) {
    case TileType.FLOOR:
      ctx.fillStyle = "white";
    case TileType.WALL:
      ctx.fillStyle = "black";
    default:
      break;
  }

  ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE - 1, TILE_SIZE - 1);
}

export function renderWorld(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  tick: number,
  world: World
) {
  const animationFrame = Math.floor(tick / 10);

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  const { width, height } = canvas;
  const { player } = world;
  const { position: playerPosition } = player;

  const renderWorldWidth = Math.floor(width / TILE_SIZE);
  const renderWorldHeight = Math.floor(height / TILE_SIZE);

  ctx.fillStyle = "grey";
  ctx.fillRect(0, 0, width, height);

  ctx.translate(
    width / 2 - playerPosition.x * TILE_SIZE,
    height / 2 - playerPosition.y * TILE_SIZE
  );

  const leftEdgeOrScreen = Math.floor(playerPosition.x - renderWorldWidth / 2);
  const rightEdgeOrScreen = Math.floor(playerPosition.x + renderWorldWidth / 2);
  const topEdgeOrScreen = Math.floor(playerPosition.y - renderWorldHeight / 2);
  const bottomEdgeOrScreen = Math.floor(
    playerPosition.y + renderWorldHeight / 2
  );

  for (let y = topEdgeOrScreen - 1; y < bottomEdgeOrScreen + 2; y++) {
    for (let x = leftEdgeOrScreen - 1; x < rightEdgeOrScreen + 2; x++) {
      renderTile(ctx, TileType.FLOOR, x, y);
    }
  }

  world.enemies.forEach((enemy) => {
    renderEnemy(ctx, SPRITE_SHEETS, animationFrame, enemy);
  });

  world.powerUps.forEach((powerUp) => {
    renderPowerUp(ctx, powerUp);
  });

  renderPlayer(ctx, SPRITE_SHEETS, animationFrame, world.player);

  ctx.resetTransform();

  setInterval(() => {
    renderRandomPowerup(ctx, world);
  }, 1000);
}

export function renderRandomPowerup(ctx: CanvasRenderingContext2D, world: World): void {
  // 1 in 5 chance of spawning
  if (Math.random() < 0.8) {
    return
  }

  const powerups: PowerUpType[] = Object.keys(config) as PowerUpType[];

  const powerup: PowerUp = {
    type: sample(powerups) as PowerUpType,
    position: spawnPointForEnemy(world),
  }

  renderPowerUp(ctx, powerup);
}
