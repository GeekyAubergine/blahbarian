import { Animation, AnimationTemplate } from "./Animation";
import { EntityConfig } from "../game/entity/Entity";
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

    // @ts-ignore
    this.ctx.webkitImageSmoothingEnabled = false;
    // @ts-ignore
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
    template: AnimationTemplate | null,
    currentTime: number
  ): Animation | null {
    if (!template) {
      return null;
    }
    return Animation.fromTemplate(template, currentTime);
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

  renderCircle(
    position: Vector,
    radius: number,
    strokeColor: string,
    fillColor: string
  ) {
    const { ctx } = this;

    ctx.strokeStyle = strokeColor;
    ctx.fillStyle = fillColor;

    ctx.beginPath();
    ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill()
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
