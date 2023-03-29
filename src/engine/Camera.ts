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

    this.position = target;
  }
}
