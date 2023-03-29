import { Renderer } from "../Renderer";
import { Vector } from "../Vector";
import { Collider } from "./Collider";

export class CircleCollider extends Collider {
  readonly position: Vector;
  readonly radius: number;

  constructor(position: Vector, radius: number) {
    super();
    this.position = position;
    this.radius = radius;
  }

  collidesWith(other: Collider): boolean {
    if (!(other instanceof CircleCollider)) {
      console.error(
        `Cannot check collision between CircleCollider and ${other.constructor.name}`
      );
      return false;
    }

    const distance = this.position.distance(other.position);
    return distance < this.radius + other.radius;
  }

  render(renderer: Renderer) {
    renderer.renderCircle(this.position, this.radius, "#ff0000", "#ff000044");
  }
}
