import { Camera } from "./Camera";
import { EntityAttributes, EntityConfig } from "./entity/Entity";
import { Event } from "./Events";
import { Keyboard } from "../engine/Keyboard";
import { Renderer } from "../engine/Renderer";
import { Vector } from "../engine/Vector";
import { World } from "./World";
import { ENTITY_NAMES } from "./Constants";

export class Game {
  private renderer: Renderer;
  private world: World;
  private keyboard: Keyboard;

  private lastTick: number = 0;
  private now: number = 0;
  private camera: Camera = new Camera(new Vector(0, 0), 0.5);
  private events: Event[] = [];
  private entityDefaultAttributes: Record<ENTITY_NAMES, EntityAttributes> = {};

  constructor(canvas: HTMLCanvasElement, entityConfits: EntityConfig[]) {
    this.renderer = new Renderer(canvas);
    this.keyboard = new Keyboard();

    for (const config of entityConfits) {
      this.parseEntityConfig(config);
    }

    this.world = new World(this);
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
    this.keyboard.update();

    if (this.lastTick === 0) {
      this.lastTick = Date.now() / 1000;
    }

    this.now = Date.now() / 1000;

    const dt = this.now - this.lastTick;

    const eventsToProcess = this.events.slice();
    this.events = [];

    for (const event of eventsToProcess) {
      this.world.onEvent(this, event);
    }

    this.world.update(this, dt);
    this.camera.update(this, dt);

    this.lastTick = this.now;
  }

  render() {
    this.renderer.clear();
    this.world.render(this, this.now);
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

  getEntityDefaultAttributes(name: ENTITY_NAMES): EntityAttributes {
    return this.entityDefaultAttributes[name];
  }

  getKeyboard() {
    return this.keyboard;
  }
}
