import { AnimationTemplate } from "../../../engine/Animation";
import { EntityAttributes } from "../Entity";
import { Event } from "../../Events";
import { Game } from "../../Game";
import { Vector } from "../../../engine/Vector";
import { Enemy } from "./Enemy";
import { ENTITY_NAMES } from "../../Constants";

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

  update(game: Game, dt: number) {
    super.update(game, dt);

    const distanceToPlayer = this.position.distance(
      game.getWorld().getPlayer().getPosition()
    );

    if (distanceToPlayer < 96) {
      if (!this.biting) {
        this.activeAnimation = game
          .getRenderer()
          .makeAnimation(this.bitingAnimation, game.getNow());
        this.biting = true;
      }
    } else {
      if (this.biting) {
        this.activeAnimation = game
          .getRenderer()
          .makeAnimation(this.walkAnimation, game.getNow());
        this.biting = false;
      }
    }

    if (this.activeAnimation == null) {
      this.activeAnimation = game
        .getRenderer()
        .makeAnimation(this.walkAnimation, game.getNow());
    }
  }
}
