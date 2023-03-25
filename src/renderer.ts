import { Enemy, EnemyType, Entity, TileType, World } from "./types";

const TILE_SIZE = 16;

export function renderEnemy(ctx: CanvasRenderingContext2D, enemy: Enemy) {
  switch (enemy.type) {
    case EnemyType.CHAIR:
      ctx.fillStyle = "red";
      break;
    default:
      break;
  }

  const { x, y } = enemy.position;
  // render circle
  ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

export function renderPlayer(ctx: CanvasRenderingContext2D, player: Entity) {
  ctx.fillStyle = "blue";
  const { x, y } = player.position;
  // render circle
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
  world: World
) {
  const { width, height } = canvas;

  const renderWorldWidth = Math.floor(width / TILE_SIZE);
  const renderWorldHeight = Math.floor(height / TILE_SIZE);

  ctx.fillStyle = "grey";
  ctx.fillRect(0, 0, width, height);

  // set ctx to center of canvas

  ctx.translate(width / 2 + TILE_SIZE / 2, height / 2 + TILE_SIZE / 2);

  for (let y = -renderWorldHeight / 2; y < renderWorldHeight / 2; y++) {
    for (let x = -renderWorldWidth / 2; x < renderWorldWidth / 2; x++) {
      renderTile(ctx, TileType.FLOOR, x, y);
    }
  }

  //   tiles.forEach((row, y) => {
  //     row.forEach((tile, x) => {
  //       renderTile(ctx, tile, x + position.x, y + position.y);
  //     });
  //   });

  world.enemies.forEach((enemy) => {
    renderEnemy(ctx, enemy);
  });

  renderPlayer(ctx, world.player);

  ctx.resetTransform();
}
