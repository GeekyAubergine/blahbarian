import { Animation, AnimationConfig } from "../../engine/Animation";
import { Game } from "../Game";
import {
  animationForMovement,
  Movement,
  movementFromVector,
  MovementToAnimationConfig,
  MovementToAnimationTemplateMap,
} from "../../engine/Movement";
import { Renderer } from "../../engine/Renderer";
import { SpriteSheetConfig } from "../../engine/SpriteSheet";
import { Vector } from "../../engine/Vector";
import { Collider } from "../../engine/collider/Collider";
import { RENDER_COLLIDERS } from "../Constants";

export type EntityAttributes = {
  movementSpeed: number;
};

export type EntityConfig = {
  name: string;
  spriteSheet: SpriteSheetConfig;
  animations: Record<string, AnimationConfig>;
  movementAnimationsConfig?: MovementToAnimationConfig | undefined;
  attributes: EntityAttributes;
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
  protected attribtes: EntityAttributes;

  protected activeAnimation: Animation | null = null;
  protected movementAnimationTemplateMap: MovementToAnimationTemplateMap | null =
    null;

  constructor(
    name: string,
    position: Vector,
    rotation: number,
    velocity: Vector,
    angularVelocity: number,
    attributes: EntityAttributes
  ) {
    this.name = name;
    this.id = `${name}-${idCount}`;
    this.position = position;
    this.rotation = rotation;
    this.velocity = velocity;
    this.angularVelocity = angularVelocity;
    this.attribtes = attributes;

    idCount += 1;
  }

  init(game: Game) {
    this.movementAnimationTemplateMap = game
      .getRenderer()
      .findMovementAnimationTemplateMap(this.name);
  }

  update(game: Game, dt: number) {
    const walkingVelocity = this.velocity
      .normalize()
      .mul(this.attribtes.movementSpeed);
    this.position = this.position.add(walkingVelocity.mul(dt));
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
          animationForMovement(
            this.movement,
            this.movementAnimationTemplateMap
          ),
          game.getNow()
        );
    }

    if (!this.activeAnimation && this.movementAnimationTemplateMap) {
      this.activeAnimation = game
        .getRenderer()
        .makeAnimation(
          animationForMovement(
            this.movement,
            this.movementAnimationTemplateMap
          ),
          game.getNow()
        );
    }
  }

  render(renderer: Renderer, now: number) {
    if (this.activeAnimation) {
      this.activeAnimation.render(renderer, now, this.position, this.rotation);
    }

    if (RENDER_COLLIDERS) {
      this.getCollider()?.render(renderer);
    }
  }

  getId() {
    return this.id;
  }

  getPosition() {
    return this.position;
  }

  getWalkingSpeed() {
    return this.attribtes.movementSpeed;
  }

  getCollider(): Collider | null {
    return null;
  }
}
