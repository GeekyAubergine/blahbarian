import { AnimationTemplate } from "../../engine/Animation";
import { EntityAttributes } from "../../engine/Entity";
import { Event } from "../../engine/Events";
import { Game } from "../Game";
import { Vector } from "../../engine/Vector";
import { Enemy } from "./Enemy";
import { ENTITY_NAMES } from "../Constants";

export class EnemyWardrobe extends Enemy {
  walkAnimation: AnimationTemplate | null = null;
  bitingAnimation: AnimationTemplate | null = null;

  biting: boolean = false;

  constructor(
    position: Vector,
    rotation: number,
    velocity: Vector,
    angularVelocity: number,
    attributes: EntityAttributes
  ) {
    super(
      ENTITY_NAMES.WARDROBE,
      position,
      rotation,
      velocity,
      angularVelocity,
      attributes
    );
  }

  init(game: Game) {
    super.init(game);

    this.walkAnimation = game
      .getRenderer()
      .findAnimationTemplate("wardrobe-walk");
    this.bitingAnimation = game
      .getRenderer()
      .findAnimationTemplate("wardrobe-bite");
  }

  update(game: Game, dt: number, events: Event[]) {
    super.update(game, dt, events);

    const distanceToPlayer = this.position.distance(
      game.getWorld().getPlayer().getPosition()
    );

    if (distanceToPlayer < 96) {
      if (!this.biting) {
        this.activeAnimation = game
          .getRenderer()
          .makeAnimation(game, this.bitingAnimation);
        this.biting = true;
      }
    } else {
      if (this.biting) {
        this.activeAnimation = game
          .getRenderer()
          .makeAnimation(game, this.walkAnimation);
        this.biting = false;
      }
    }

    if (this.activeAnimation == null) {
      this.activeAnimation = game
        .getRenderer()
        .makeAnimation(game, this.walkAnimation);
    }
  }
}
