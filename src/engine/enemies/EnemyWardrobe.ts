import { Animation, AnimationTemplate } from "../Animation";
import { TILE_SIZE } from "../Constants";
import { Event } from "../Events";
import { Game } from "../Game";
import { Renderer } from "../Renderer";
import { World } from "../World";
import { Enemy } from "./Enemy";

export class EnemyWardrobe extends Enemy {
  walkAnimation: AnimationTemplate | null = null;
  bitingAnimation: AnimationTemplate | null = null;

  biting: boolean = false;

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

    if (distanceToPlayer < TILE_SIZE * 0.75) {
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
