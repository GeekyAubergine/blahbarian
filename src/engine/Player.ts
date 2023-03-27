import { Animation } from "./Animation";
import { Entity } from "./Entity";
import { Event } from "./Events";
import { Game } from "./Game";
import { Renderer } from "./Renderer";
import { Vector } from "./Vector";
import { World } from "./World";

export class Player extends Entity {
//   init(game: Game) {
//     super.init(game);
//     this.idleAnimation = renderer.findAnimation("shark-idle", now);
//     this.downAnimation = renderer.findAnimation("shark-idle", now);
//     this.upAnimation = renderer.findAnimation("shark-idle", now);
//     this.leftAnimation = renderer.findAnimation("shark-idle", now);
// "shark-idle",     this.rightAnimation = renderer.findAnimation(now);
//     this.animation = this.idleAnimation;
//   }

  update(game: Game, dt: number, events: Event[]) {
    super.update(game, dt, events);

    this.velocity = Vector.ZERO;

    if (game.getKeyboard().isKeyDown("ArrowUp") || game.getKeyboard().isKeyDown("w")) {
      this.velocity = this.velocity.add(new Vector(0, -1));
    }
    if (game.getKeyboard().isKeyDown("ArrowDown") || game.getKeyboard().isKeyDown("s")) {
      this.velocity = this.velocity.add(new Vector(0, 1));
    }
    if (game.getKeyboard().isKeyDown("ArrowLeft") || game.getKeyboard().isKeyDown("a")) {
      this.velocity = this.velocity.add(new Vector(-1, 0));
    }
    if (game.getKeyboard().isKeyDown("ArrowRight") || game.getKeyboard().isKeyDown("d")) {
      this.velocity = this.velocity.add(new Vector(1, 0));
    }
  }

//   // ...
//   render(renderer: Renderer, now: number): void {

//   }
}
