import { Animation, AnimationConfig } from "./Animation";
import { Event } from "./Events";
import { Game } from "./Game";
import {
  animationForMovement,
  Movement,
  movementFromVector,
  MovementToAnimationConfig,
  MovementToAnimationTemplateMap,
} from "./Movement";
import { Renderer } from "./Renderer";
import { SpriteSheetConfig } from "./SpriteSheet";
import { Vector } from "./Vector";

export type EntityAttributes = {
  walkingSpeed: number;
};

export type EntityConfig = {
  name: string;
  spriteSheet: SpriteSheetConfig;
  animations: Record<string, AnimationConfig>;
  movementAnimationsConfig?: MovementToAnimationConfig | undefined;
  attributes: EntityAttributes;
};

export const ENTITY_NAMES = {
  PLAYER: "shark",
};

let idCount = 0;
export class Entity {
  protected readonly name: string;
  protected readonly id: string;
  protected position: Vector;
  protected rotation: number;
  protected velocity: Vector;
  protected angularVelocity: number;
  protected movement: Movement = Movement.IDLE;
  protected walkingSpeed: number = 1;

  protected activeAnimation: Animation | null = null;
  protected movementAnimationTemplateMap: MovementToAnimationTemplateMap | null =
    null;

  constructor(
    name: string,
    position: Vector,
    rotation: number,
    velocity: Vector,
    angularVelocity: number
  ) {
    this.name = name;
    this.id = `${name}-${idCount}`;
    this.position = position;
    this.rotation = rotation;
    this.velocity = velocity;
    this.angularVelocity = angularVelocity;

    idCount += 1;
  }

  init(game: Game) {
    this.movementAnimationTemplateMap = game
      .getRenderer()
      .findMovementAnimationTemplateMap(this.name);
  }

  setWalkingSpeed(speed: number) {
    this.walkingSpeed = speed;
  }

  update(game: Game, dt: number, events: Event[]) {
    this.position = this.position.add(this.velocity.mul(dt));
    this.rotation += this.angularVelocity * dt;
    const previousMovement = this.movement;
    this.movement = movementFromVector(this.velocity);

    if (
      previousMovement !== this.movement &&
      this.movementAnimationTemplateMap
    ) {
      this.activeAnimation = game
        .getRenderer()
        .makeAnimation(
          game,
          animationForMovement(this.movement, this.movementAnimationTemplateMap)
        );
    }

    if (!this.activeAnimation && this.movementAnimationTemplateMap) {
      this.activeAnimation = game
        .getRenderer()
        .makeAnimation(
          game,
          animationForMovement(this.movement, this.movementAnimationTemplateMap)
        );
    }
  }

  render(renderer: Renderer, now: number) {
    if (this.activeAnimation) {
      this.activeAnimation.render(renderer, now, this.position, this.rotation);
    }
  }

  getPosition() {
    return this.position;
  }
}
