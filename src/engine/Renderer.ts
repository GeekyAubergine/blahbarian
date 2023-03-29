import { Animation, AnimationTemplate } from "./Animation";
import { EntityConfig } from "./Entity";
import { Game } from "../game/Game";
import {
  movementToAnimationFromConfig,
  MovementToAnimationTemplateMap,
} from "./Movement";
import { SpriteSheet } from "./SpriteSheet";
import { Vector } from "./Vector";

export class Renderer {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private spriteSheets: Record<string, SpriteSheet> = {};
  private animations: Record<string, AnimationTemplate> = {};
  private entityNameToMovmentAnimationMapMap: Record<
    string,
    MovementToAnimationTemplateMap
  > = {};

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;

    this.ctx.webkitImageSmoothingEnabled = false;
    this.ctx.mozImageSmoothingEnabled = false;
    this.ctx.imageSmoothingEnabled = false;
  }

  parseEntityConfig(entityConfig: EntityConfig) {
    const { name, spriteSheet, animations, movementAnimationsConfig } =
      entityConfig;

    this.spriteSheets = {
      ...this.spriteSheets,
      [name]: SpriteSheet.fromConfig(spriteSheet),
    };

    this.animations = Object.entries(animations).reduce<
      Record<string, AnimationTemplate>
    >((acc, [id, animationConfig]) => {
      return {
        ...acc,
        [id]: { ...animationConfig, spriteSheetId: name },
      };
    }, this.animations);

    if (movementAnimationsConfig) {
      this.entityNameToMovmentAnimationMapMap = {
        ...this.entityNameToMovmentAnimationMapMap,
        [name]: movementToAnimationFromConfig(this, movementAnimationsConfig),
      };
    }
  }

  async loadAssets() {
    const promises = Object.values(this.spriteSheets).map((spriteSheet) =>
      spriteSheet.load()
    );

    await Promise.all(promises);

    console.log(this);
  }

  findAnimationTemplate(id: string): AnimationTemplate | null {
    return this.animations[id] ?? null;
  }

  findMovementAnimationTemplateMap(
    entityName: string
  ): MovementToAnimationTemplateMap | null {
    return this.entityNameToMovmentAnimationMapMap[entityName] ?? null;
  }

  makeAnimation(
    game: Game,
    template: AnimationTemplate | null
  ): Animation | null {
    if (!template) {
      return null;
    }
    return Animation.fromTemplate(template, game.getNow());
  }

  clear() {
    const { ctx } = this;
    const { width, height } = this.canvas;

    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = "black";

    ctx.fillRect(0, 0, width / 2, height / 2);
  }

  getSize() {
    return {
      width: this.canvas.width,
      height: this.canvas.height,
    };
  }

  saveTransform() {
    this.ctx.save();
  }

  restoreTransform() {
    this.ctx.restore();
  }

  translate(x: number, y: number) {
    this.ctx.translate(x, y);
  }

  rotate(angle: number) {
    this.ctx.rotate(angle);
  }

  scale(x: number, y: number) {
    this.ctx.scale(x, y);
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

    const scaleX = spriteSheet.renderedSize.width / spriteSize.width;
    const scaleY = spriteSheet.renderedSize.height / spriteSize.height;

    ctx.save();
    ctx.translate(Math.floor(position.x), Math.floor(position.y));
    ctx.rotate(rotationInRadians);
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
