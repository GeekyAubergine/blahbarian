import { Animation } from "../Animation";
import { TILE_SIZE } from "../Constants";
import { Event } from "../Events";
import { Game } from "../Game";
import { Renderer } from "../Renderer";
import { World } from "../World";
import { Enemy } from "./Enemy";

export class EnemyWardrobe extends Enemy {
  animation: Animation | null = null;
  walkAnimation: Animation | null = null;
  bitingAnimation: Animation | null = null;

  init(game: Game, world: World, renderer: Renderer, now: number) {
    super.init(game, world, renderer, now);

    this.walkAnimation = renderer.findAnimation("wardrobe-walk", now);
    this.bitingAnimation = renderer.findAnimation("wardrobe-bite", now);

    this.animation = this.walkAnimation;
  }

  update(game: Game, world: World, dt: number, events: Event[]) {
    super.update(game, world, dt, events);

    const distanceToPlayer = this.position.distance(world.player.position);

    if (distanceToPlayer < TILE_SIZE * 0.75) {
      this.animation = this.bitingAnimation;
    } else {
      this.animation = this.walkAnimation;
    }
  }

  render(renderer: Renderer, now: number): void {
    if (this.animation) {
      this.animation.render(renderer, now, this.position, this.rotation);
    }
  }
}
