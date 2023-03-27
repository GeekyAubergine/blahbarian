import { Camera } from "./Camera";
import { EntityAttributes, EntityConfig } from "./Entity";
import { Event } from "./Events";
import { Renderer } from "./Renderer";
import { Vector } from "./Vector";
import { World } from "./World";

export class Game {
  readonly renderer: Renderer;
  private world: World;
  private lastTick: number = 0;
  private now: number = 0;
  private camera: Camera = new Camera(new Vector(0, 0), 0.5);
  private events: Event[] = [];
  private entityDefaultAttributes: Record<string, EntityAttributes> = {};

  constructor(renderer: Renderer) {
    this.renderer = renderer;
    this.world = new World();
  }

  parseEntityConfig(config: EntityConfig) {
    this.renderer.parseEntityConfig(config);
    this.entityDefaultAttributes[config.name] = config.attributes;
  }

  async loadAssets() {
    await this.renderer.loadAssets();
  }

  init() {
    this.world.init(this);
  }

  dispatchEvent(event: Event) {
    this.events.push(event);
  }

  update() {
    if (this.lastTick === 0) {
      this.lastTick = Date.now() / 1000;
    }

    this.now = Date.now() / 1000;

    const dt = this.now - this.lastTick;

    this.world.update(this, dt, this.events);
    this.camera.update(this, this.world, dt);
    this.events = [];

    this.lastTick = this.now;
  }

  render() {
    this.renderer.renderWorld(this, this.world, this.now);
  }

  getNow() {
    return this.now;
  }

  getRenderer() {
    return this.renderer;
  }

  getWorld() {
    return this.world;
  }

  getCamera() {
    return this.camera;
  }

  getEntityDefaultAttributes(name: string): EntityAttributes | null {
    return this.entityDefaultAttributes[name] ?? null;
  }
}
