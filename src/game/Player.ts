import { Game } from "./Game";
import { Vector } from "../engine/Vector";
import { CircleCollider } from "../engine/collider/CircleCollider";
import { Collider } from "../engine/collider/Collider";
import { Entity } from "./entity/Entity";
import { Renderer } from "../engine/Renderer";
import { RENDER_COLLIDERS } from "./Constants";

const COLLIDER_RADIUS = 54;
const COLLIDER_OFFSET = new Vector(5, 2);
export class Player extends Entity {
  update(game: Game, dt: number) {
    super.update(game, dt);

    this.velocity = Vector.ZERO;

    if (
      game.getKeyboard().isKeyDown("ArrowUp") ||
      game.getKeyboard().isKeyDown("w")
    ) {
      this.velocity = this.velocity.add(new Vector(0, -1));
    }
    if (
      game.getKeyboard().isKeyDown("ArrowDown") ||
      game.getKeyboard().isKeyDown("s")
    ) {
      this.velocity = this.velocity.add(new Vector(0, 1));
    }
    if (
      game.getKeyboard().isKeyDown("ArrowLeft") ||
      game.getKeyboard().isKeyDown("a")
    ) {
      this.velocity = this.velocity.add(new Vector(-1, 0));
    }
    if (
      game.getKeyboard().isKeyDown("ArrowRight") ||
      game.getKeyboard().isKeyDown("d")
    ) {
      this.velocity = this.velocity.add(new Vector(1, 0));
    }
  }

  getCollider(): Collider {
    return new CircleCollider(this.position.add(COLLIDER_OFFSET), COLLIDER_RADIUS);
  }
}
