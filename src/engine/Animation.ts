import { Renderer } from "./Renderer";
import { SpriteSheet, SpriteSheetDefinition } from "./SpriteSheet";
import { Vector } from "./Vector";

export interface AnimationDefinition {
  readonly frames: string[];
  readonly duration: number;
  readonly loop: boolean;
}

export interface AnimationTemplate {
  readonly spriteSheetId: string;
  readonly frames: string[];
  readonly duration: number;
  readonly loop: boolean;
}

export class Animation {
  readonly spriteSheetId: string;
  readonly frames: string[];
  readonly duration: number;
  startTime: number;
  readonly loop: boolean = true;

  constructor(
    spriteSheetId: string,
    definition: AnimationDefinition,
    startTime: number,
    loop: boolean
  ) {
    this.spriteSheetId = spriteSheetId;
    this.frames = definition.frames;
    this.duration = definition.duration;
    this.startTime = startTime;
    this.loop = loop;
  }

  static fromTemplate(
    template: AnimationTemplate,
    startTime: number
  ): Animation {
    return new Animation(
      template.spriteSheetId,
      template,
      startTime,
      template.loop
    );
  }

  getFrame(currentTime: number): string | null {
    let runTime = currentTime - this.startTime;

    if (runTime > this.duration) {
      if (this.loop) {
        this.startTime = currentTime;
        runTime = 0;
      } else {
        // dispatch event

        return null;
      }
    }

    const frameIndex = Math.floor(
      runTime / (this.duration / this.frames.length)
    );
    return this.frames[frameIndex % this.frames.length];
  }

  render(
    renderer: Renderer,
    currentTime: number,
    position: Vector,
    rotation: number
  ) {
    const frame = this.getFrame(currentTime);
    if (frame) {
      renderer.renderSprite(this.spriteSheetId, frame, position, rotation);
    }
  }
}

export type SpriteSheetAndAnimationsDefinition = {
  spriteSheet: SpriteSheetDefinition;
  animations: Record<string, AnimationDefinition>;
};

export class SpriteSheetAndAnimations {
  readonly spriteSheet: SpriteSheet;
  readonly animations: Record<string, AnimationTemplate>;

  constructor(
    spriteSheet: SpriteSheet,
    animations: Record<string, AnimationTemplate>
  ) {
    this.spriteSheet = spriteSheet;
    this.animations = animations;
  }

  static fromDefinition(
    spriteSheetId: string,
    definition: SpriteSheetAndAnimationsDefinition
  ): SpriteSheetAndAnimations {
    const spriteSheet = SpriteSheet.fromDefinition(definition.spriteSheet);
    const animations = Object.entries(definition.animations).reduce<
      Record<string, AnimationTemplate>
    >(
      (animations, [id, animationDefinition]) => ({
        ...animations,
        [id]: { ...animationDefinition, spriteSheetId },
      }),
      {}
    );

    return new SpriteSheetAndAnimations(spriteSheet, animations);
  }
}
