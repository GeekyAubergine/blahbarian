import { Game } from "./Game";
import { Vector } from "./Vector";
import { World } from "./World";

const CAMERA_MAX_SPEED_LAG = 64;
const LAG_FACTOR = 50;

export class Camera {
  readonly originalScale: number;

  position: Vector;
  scale: number;
  goalPosition: Vector | null;
  goalScale: number | null;

  constructor(position: Vector, scale: number) {
    this.originalScale = scale;
    this.position = new Vector(200, 0.0);
    this.scale = scale;
  }

  update(game: Game, dt: number) {
    const target =
      this.goalPosition ?? game.getWorld().getPlayer().getPosition();

    // this.goalPosition = game.getWorld().getPlayer().getPosition();

    // if (Number.isNaN(game.getWorld().getPlayer().getPosition().x)) {
    //   throw new Error("Player position x is NaN");
    // }

    // if (Number.isNaN(game.getWorld().getPlayer().getPosition().y)) {
    //   throw new Error("Player position y is NaN");
    // }

    // const delta = this.goalPosition.sub(this.position);

    // let move = delta.mul(dt);

    // console.log({ move })

    // let move = delta.mul(LAG_FACTOR);

    // if (delta.mag() > CAMERA_MAX_SPEED_LAG) {
    //   move = delta.normalize().mul(CAMERA_MAX_SPEED_LAG);
    // }
    
    // console.log(Vector.Lerp(new Vector(12, 0), new Vector(10, 0), 0.25).toString())

    // console.log('target', target.toString())

    // console.log(
    //   "target",
    //   target.toString(),
    //   "lerp",
    //   Vector.Lerp(this.position, target, 0.1).toString()
    // );

    this.position = target;// this.position.add(Vector.Lerp(this.position, target, 1));

    // this.scale = this.goalScale;

    // console.log({ x: this.position.x, y: this.position.y });
  }
}
