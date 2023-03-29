import { EntityAttributes } from "../Entity";
import { Vector } from "../../../engine/Vector";
import { ENTITY_NAMES, POWERUP_EFFECTS } from "../../Constants";
import { Powerup } from "./Powerup";
import { Game } from "../../Game";

export class PowerupBroccoli extends Powerup {
  constructor(
    position: Vector,
    attributes: EntityAttributes
  ) {
    super(
      ENTITY_NAMES.BROCCOLI,
      POWERUP_EFFECTS['broccoli-add-health'],
      32,
      position,
      attributes
    );
  }


  init(game: Game) {
    super.init(game);

    this.idleAnimation = game
      .getRenderer()
      .findAnimationTemplate("broccoli-idle");
  }
}
