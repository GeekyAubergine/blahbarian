import { Entity } from "./Entity";
import { Event } from "./Events";
import { Game } from "./Game";
import { Player } from "./Player";
import { Renderer } from "./Renderer";
import { Vector } from "./Vector";

export class World {
  player: Player;
  entities: Entity[] = [];

  constructor() {
    this.player = new Player(
      "player",
      new Vector(0, 0),
      0,
      new Vector(0, 0),
      0
    );
  }

  init(game: Game, renderer: Renderer, now: number) {
    for (const entity of this.entities) {
      entity.init(game, this, renderer, now);
    }
    this.player.init(game, this, renderer, now);
  }

  update(game: Game, dt: number, events: Event[]) {
    this.player.update(game, this, dt, events);
    for (const entity of this.entities) {
      entity.update(game, this, dt, events);
    }
  }

  addEntity(entity: Entity) {
    this.entities.push(entity);
    console.log("Added entity", entity);
  }
}
