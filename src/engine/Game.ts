import { Camera } from "./Camera";
import { Event } from "./Events";
import { Renderer } from "./Renderer";
import { Vector } from "./Vector";
import { World } from "./World";

export class Game {
  readonly renderer: Renderer;
  world: World;
  camera: Camera = new Camera(new Vector(0, 0), 0.5);
  events: Event[] = [];

  constructor(renderer: Renderer) {
    this.renderer = renderer;
    this.world = new World();
  }

  init(now: number) {
    this.world.init(this, this.renderer, now);
  }

  dispatchEvent(event: Event) {
    this.events.push(event);
  }

  update(dt: number) {
    this.world.update(this, dt, this.events);
    this.camera.update(this, this.world, dt);
    this.events = [];
  }

  render(now: number) {
    this.renderer.renderWorld(this, this.world, now);
  }
}
