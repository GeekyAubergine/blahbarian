import {
  Animation,
  AnimationConfig,
  AnimationTemplate,
  SpriteSheetAndAnimations,
} from "./Animation";
import { TILE_SIZE } from "./Constants";
import { EntityConfig } from "./Entity";
import { Game } from "./Game";
import {
  movementToAnimationFromConfig,
  MovementToAnimationTemplateMap,
} from "./Movement";
import { SpriteSheet } from "./SpriteSheet";
import { Vector } from "./Vector";
import { World } from "./World";

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

  // findAnimation(id: string, now: number): Animation | null {
  //   const template = this.animations[id] ?? null;

  //   console.log({ template });

  //   if (!template) {
  //     console.error(`Animation ${id} not found`);
  //     return null;
  //   }

  //   return Animation.fromTemplate(template, now);
  // }

  renderWorld(game: Game, world: World, now: number) {
    const { ctx } = this;
    const { width, height } = this.canvas;
    const camera = game.getCamera();

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

    for (const entity of world.getEntities()) {
      entity.render(this, now);
    }

    world.getPlayer().render(this, now);

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
    ctx.translate(Math.floor(position.x), Math.floor(position.y));
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
