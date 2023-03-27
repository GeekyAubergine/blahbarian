import { Entity } from "./Entity";
import { Event } from "./Events";
import { Game } from "./Game";
import { Player } from "./Player";
import { Renderer } from "./Renderer";
import { Vector } from "./Vector";

export class World {
  private player: Player;
  private entities: Entity[] = [];

  constructor() {
    this.player = new Player(
      "shark",
      new Vector(0, 0),
      0,
      new Vector(0, 0),
      0
    );
  }

  init(game: Game) {
    for (const entity of this.entities) {
      entity.init(game);
    }
    this.player.init(game);
  }

  update(game: Game, dt: number, events: Event[]) {
    this.player.update(game, dt, events);
    for (const entity of this.entities) {
      entity.update(game, dt, events);
    }
  }

  addEntity(game: Game, entity: Entity) {
    entity.init(game);
    this.entities.push(entity);
    console.log("Added entity", entity);
  }

  getPlayer() {
    return this.player;
  }

  getEntities() {
    return this.entities;
  }
}
