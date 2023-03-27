import { Game } from "./Game";
import { Vector } from "./Vector";
import { World } from "./World";

export class Camera {
  position: Vector;
  scale: number;
  goalPosition: Vector;
  goalScale: number;

  constructor(position: Vector, scale: number) {
    this.position = position;
    this.scale = scale;
    this.goalPosition = position;
    this.goalScale = scale;
  }

  update(game: Game, world: World, dt: number) {
    this.goalPosition = world.player.position;
    

    this.position = this.goalPosition;
    this.scale = this.goalScale;
  }
}
