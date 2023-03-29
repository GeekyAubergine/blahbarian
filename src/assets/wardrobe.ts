import { EntityConfig } from "../game/entity/Entity";

export const WARDROBE_ENITY_CONFIG: EntityConfig = {
  name: "wardrobe",
  spriteSheet: {
    assetFileName: "enemies/wardrobe.png",
    rotationPoint: {
      x: 8,
      y: 8,
    },
    spriteSize: {
      width: 16,
      height: 16,
    },
    renderedSize: {
      width: 128,
      height: 128,
    },
    sprites: {
      still: {
        sx: 0,
        sy: 0,
      },
      bite: {
        sx: 1,
        sy: 0,
      },
      walk1: {
        sx: 0,
        sy: 1,
      },
      walk2: {
        sx: 1,
        sy: 1,
      },
    },
  },
  animations: {
    "wardrobe-walk": {
      frames: ["walk1", "walk2"],
      duration: 0.5,
      loop: true,
    },
    "wardrobe-bite": {
      frames: ["still", "bite"],
      duration: 0.325,
      loop: true,
    },
  },
  attributes: {
    movementSpeed: 32,
    maxHealth: 1,
  },
};
