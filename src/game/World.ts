import { Entity } from "../engine/Entity";
import { Event } from "../engine/Events";
import { Game } from "./Game";
import { Player } from "./Player";
import { Vector } from "../engine/Vector";
import { ENTITY_NAMES } from "./Constants";

export class World {
  private player: Player;
  private entities: Entity[] = [];

  constructor(game: Game) {
    this.player = new Player(
      ENTITY_NAMES.PLAYER,
      new Vector(0, 0),
      0,
      new Vector(0, 0),
      0,
      game.getEntityDefaultAttributes(ENTITY_NAMES.PLAYER)
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

  render(game: Game, now: number) {
    const renderer = game.getRenderer();
    const { width, height } = renderer.getSize();

    renderer.saveTransform();

    renderer.translate(Math.floor(width / 2), Math.floor(height / 2));

    renderer.scale(game.getCamera().getScale(), game.getCamera().getScale());

    renderer.translate(
      Math.floor(-game.getCamera().getPosition().x),
      Math.floor(-game.getCamera().getPosition().y)
    );

    for (const entity of this.getEntities()) {
      entity.render(renderer, now);
    }

    this.getPlayer().render(renderer, now);

    renderer.restoreTransform();
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
