import { Event } from "./Events";
import { Game } from "./Game";
import { Renderer } from "./Renderer";
import { Vector } from "./Vector";
import { World } from "./World";

export class Entity {
  readonly id: string;
  position: Vector;
  rotation: number;
  velocity: Vector;
  angularVelocity: number;
  walkingSpeed: number = 1;

  constructor(
    id: string,
    position: Vector,
    rotation: number,
    velocity: Vector,
    angularVelocity: number
  ) {
    this.id = id;
    this.position = position;
    this.rotation = rotation;
    this.velocity = velocity;
    this.angularVelocity = angularVelocity;
  }

  init(game: Game, world: World, renderer: Renderer, now: number) {
    // ...
  }

  setWalkingSpeed(speed: number) {
    this.walkingSpeed = speed;
  }

  update(game: Game, world: World, dt: number, events: Event[]) {
    this.position = this.position.add(this.velocity.mul(dt));
    this.rotation += this.angularVelocity * dt;
  }

  render(renderer: Renderer, now: number) {
    // ...
  }
}
