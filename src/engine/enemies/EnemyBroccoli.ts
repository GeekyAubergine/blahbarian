import { Animation, AnimationTemplate } from "../Animation";
import { TILE_SIZE } from "../Constants";
import { EntityAttributes, ENTITY_NAMES } from "../Entity";
import { Event } from "../Events";
import { Game } from "../Game";
import { Renderer } from "../Renderer";
import { Vector } from "../Vector";
import { Enemy } from "./Enemy";

export class EnemyBroccoli extends Enemy {
  idleAnimation: AnimationTemplate | null = null;

  biting: boolean = false;

  constructor(
    position: Vector,
    rotation: number,
    velocity: Vector,
    angularVelocity: number,
    attributes: EntityAttributes
  ) {
    super(
      ENTITY_NAMES.BROCCOLI,
      position,
      rotation,
      velocity,
      angularVelocity,
      attributes
    );
  }

  init(game: Game) {
    super.init(game);

    this.idleAnimation = game
      .getRenderer()
      .findAnimationTemplate("broccoli-idle");
  }

  update(game: Game, dt: number, events: Event[]) {
    super.update(game, dt, events);

    const distanceToPlayer = this.position.distance(
      game.getWorld().getPlayer().getPosition()
    );

    if (this.activeAnimation == null) {
      this.activeAnimation = game
        .getRenderer()
        .makeAnimation(game, this.idleAnimation);
    }

    // if (distanceToPlayer < TILE_SIZE * 0.75) {
    //   if (!this.biting) {
    //     this.activeAnimation = game
    //       .getRenderer()
    //       .makeAnimation(game, this.bitingAnimation);
    //     this.biting = true;
    //   }
    // } else {
    //   if (this.biting) {
    //     this.activeAnimation = game
    //       .getRenderer()
    //       .makeAnimation(game, this.walkAnimation);
    //     this.biting = false;
    //   }
    // }

    // if (this.activeAnimation == null) {
    //   this.activeAnimation = game
    //     .getRenderer()
    //     .makeAnimation(game, this.walkAnimation);
    // }
  }
}
