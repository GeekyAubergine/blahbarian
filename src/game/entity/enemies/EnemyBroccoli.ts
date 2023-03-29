import { AnimationTemplate } from "../../../engine/Animation";
import { EntityAttributes } from "../Entity";
import { Event } from "../../Events";
import { Game } from "../../Game";
import { Vector } from "../../../engine/Vector";
import { Enemy } from "./Enemy";
import { ENTITY_NAMES } from "../../Constants";
import { Renderer } from "../../../engine/Renderer";

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

  init(renderer: Renderer) {
    super.init(renderer);

    this.idleAnimation = renderer.findAnimationTemplate("broccoli-idle");
  }

  update(game: Game, dt: number) {
    super.update(game, dt);

    const distanceToPlayer = this.position.distance(
      game.getWorld().getPlayer().getPosition()
    );

    if (this.activeAnimation == null) {
      this.activeAnimation = game
        .getRenderer()
        .makeAnimation(this.idleAnimation, game.getNow());
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
