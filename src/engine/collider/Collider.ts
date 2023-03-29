import { Renderer } from "../Renderer";

export class Collider {
  collidesWith(other: Collider): boolean {
    return false;
  }

  render(renderer: Renderer) {}
}
