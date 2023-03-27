import { Animation } from "./Animation";
import { Entity } from "./Entity";
import { Event } from "./Events";
import { Game } from "./Game";
import { Renderer } from "./Renderer";
import { World } from "./World";

export class Player extends Entity {
  animation: Animation | null = null;
  idleAnimation: Animation | null = null;
  downAnimation: Animation | null = null;
  upAnimation: Animation | null = null;
  leftAnimation: Animation | null = null;
  rightAnimation: Animation | null = null;

  init(game: Game, world: World, renderer: Renderer, now: number) {
    super.init(game, world, renderer, now);
    this.idleAnimation = renderer.findAnimation("shark-idle", now);
    this.downAnimation = renderer.findAnimation("shark-idle", now);
    this.upAnimation = renderer.findAnimation("shark-idle", now);
    this.leftAnimation = renderer.findAnimation("shark-idle", now);
    this.rightAnimation = renderer.findAnimation("shark-idle", now);
    this.animation = this.idleAnimation;
  }

  update(game: Game, world: World, dt: number, events: Event[]) {
    super.update(game, world, dt, events);

    if (this.animation == null) {
      this.animation = this.idleAnimation;
    }
  }

  // ...
  render(renderer: Renderer, now: number): void {
    if (this.animation) {
      this.animation.render(renderer, now, this.position, this.rotation);
    }
  }
}
