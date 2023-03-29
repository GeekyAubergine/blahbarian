import { Game } from "./Game";
import { Vector } from "../engine/Vector";
import { World } from "./World";

const CAMERA_MAX_SPEED_LAG = 64;
const LAG_FACTOR = 50;

export class Camera {
  readonly originalScale: number;

  private position: Vector;
  private scale: number;
  goalPosition: Vector;
  goalScale: number;

  constructor(position: Vector, scale: number) {
    this.originalScale = scale;
    this.position = position;
    this.scale = scale;
    this.goalPosition = this.position;
    this.goalScale = this.scale;
  }

  update(game: Game, dt: number) {
    this.position = this.goalPosition;

    this.scale = this.goalScale;
  }

  setGoalPosition(position: Vector) {
    this.goalPosition = position;
  }

  setGoalScale(scale: number) {
    this.goalScale = scale;
  }

  getScale() {
    return this.scale;
  }

  getPosition() {
    return this.position;
  }
}
