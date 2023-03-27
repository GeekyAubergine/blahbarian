import {
  Animation,
  AnimationDefinition,
  AnimationTemplate,
  SpriteSheetAndAnimations,
} from "./Animation";
import { TILE_SIZE } from "./Constants";
import { Game } from "./Game";
import { SpriteSheet } from "./SpriteSheet";
import { Vector } from "./Vector";
import { World } from "./World";

export class Renderer {
  readonly canvas: HTMLCanvasElement;
  readonly ctx: CanvasRenderingContext2D;
  readonly spriteSheets: Record<string, SpriteSheet> = {};
  animations: Record<string, AnimationTemplate> = {};

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
  }

  addSpriteSheetAndAnimations(
    id: string,
    SpriteSheetAndAnimations: SpriteSheetAndAnimations
  ) {
    const { spriteSheet, animations } = SpriteSheetAndAnimations;

    this.spriteSheets[id] = spriteSheet;
    this.animations = { ...this.animations, ...animations };
  }

  async loadSpriteSheets() {
    const promises = Object.values(this.spriteSheets).map((spriteSheet) =>
      spriteSheet.load()
    );

    await Promise.all(promises);
  }

  findAnimation(id: string, now: number): Animation | null {
    const template = this.animations[id] ?? null;

    console.log({ template });

    if (!template) {
      throw new Error(`Animation ${id} not found`);
    }

    return Animation.fromTemplate(template, now);
  }

  renderWorld(game: Game, world: World, now: number) {
    const { ctx } = this;
    const { width, height } = this.canvas;
    const { camera } = game;

    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;

    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = "black";

    ctx.fillRect(0, 0, width / 2, height / 2);

    ctx.save();

    ctx.translate(Math.floor(width / 2), Math.floor(height / 2));

    ctx.scale(camera.scale, camera.scale);

    // ctx.translate(
    //   Math.floor(-camera.position.x),
    //   Math.floor(-camera.position.y)
    // );

    for (const entity of world.entities) {
      entity.render(this, now);
    }

    world.player.render(this, now);

    ctx.restore();
  }

  renderSprite(
    spriteSheetId: string,
    spriteId: string,
    position: Vector,
    rotation: number
  ) {
    const { ctx } = this;

    const spriteSheet = this.spriteSheets[spriteSheetId];

    if (!spriteSheet) {
      throw new Error(`No sprite sheet with id ${spriteSheetId}`);
    }

    const sprite = spriteSheet.sprites[spriteId];

    if (!sprite) {
      throw new Error(`No sprite with id ${spriteId}`);
    }

    if (!spriteSheet.image) {
      return;
    }

    const { rotationPoint, spriteSize } = spriteSheet;
    const { sx, sy } = sprite;

    const rotationInRadians = (rotation * Math.PI) / 180;

    const scaleX = TILE_SIZE / spriteSize.width;
    const scaleY = TILE_SIZE / spriteSize.height;

    ctx.save();
    // ctx.scale(scaleX, scaleY);
    ctx.translate(
      Math.floor(position.x),
      Math.floor(position.y)
    );
    ctx.rotate(rotationInRadians);
    // ctx.fillStyle = "red";
    // ctx.fillRect(
    //   Math.floor(-rotationPoint.x * scaleX),
    //   Math.floor(-rotationPoint.y * scaleY),
    //   Math.floor(spriteSize.width * scaleX),
    //   Math.floor(spriteSize.height * scaleY)
    // );
    ctx.drawImage(
      spriteSheet.image,
      Math.floor(sx * spriteSize.width),
      Math.floor(sy * spriteSize.height),
      Math.floor(spriteSize.width),
      Math.floor(spriteSize.height),
      Math.floor(-rotationPoint.x * scaleX),
      Math.floor(-rotationPoint.y * scaleY),
      Math.floor(spriteSize.width) * scaleX,
      Math.floor(spriteSize.height * scaleY)
    );
    ctx.restore();
  }
}
