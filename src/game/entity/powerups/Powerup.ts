import { AnimationTemplate } from "../../../engine/Animation";
import { CircleCollider } from "../../../engine/collider/CircleCollider";
import { Collider } from "../../../engine/collider/Collider";
import { Entity, EntityAttributes } from "../Entity";
import { Vector } from "../../../engine/Vector";
import { PowerupEffect } from "../../Constants";
import { Game } from "../../Game";
import { EventType } from "../../Events";

const REMOVAL_DELAY = 10000;

export class Powerup extends Entity {
  private effect: PowerupEffect;
  private radius: number;
  private activated: boolean = false;
  private activetedAt: number | null = null;

  protected idleAnimation: AnimationTemplate | null = null;
  protected activatedAnimation: AnimationTemplate | null = null;

  constructor(
    name: string,
    effect: PowerupEffect,
    radius: number,
    position: Vector,
    attributes: EntityAttributes
  ) {
    super(name, position, 0, new Vector(0, 0), 0, attributes);
    this.effect = effect;
    this.radius = radius;
  }

  update(game: Game, dt: number) {
    super.update(game, dt);

    if (this.activetedAt && game.getNow() + REMOVAL_DELAY > this.activetedAt) {
      game.getWorld().removeEntity(this);
    }

    if (this.activated) {
      return;
    }

    if (this.activeAnimation == null) {
      this.activeAnimation = game
        .getRenderer()
        .makeAnimation(this.idleAnimation, game.getNow());
    }

    const player = game.getWorld().getPlayer();

    if (player.getCollider().collidesWith(this.getCollider())) {
      this.activated = true;
      this.activetedAt = game.getNow();
      this.activeAnimation = game
        .getRenderer()
        .makeAnimation(this.activatedAnimation, game.getNow());
      game.dispatchEvent({
        type: EventType.POWERUP_TRIGGERED,
        data: {
          effect: this.effect,
        },
      });
    }
  }

  getCollider(): Collider {
    return new CircleCollider(this.position, this.radius);
  }
}
