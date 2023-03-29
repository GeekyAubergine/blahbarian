import { EntityConfig } from "../engine/Entity";

export const BROCCOLI_ENITY_CONFIG: EntityConfig = {
  name: "broccoli",
  spriteSheet: {
    assetFileName: "enemies/broccoli.png",
    rotationPoint: {
      x: 8,
      y: 8,
    },
    spriteSize: {
      width: 16,
      height: 16,
    },
    renderedSize: {
      width: 64,
      height: 64,
    },
    sprites: {
      idle1: {
        sx: 0,
        sy: 0,
      },
      idle2: {
        sx: 1,
        sy: 0,
      },
      idle3: {
        sx:0,
        sy: 1,
      },
    },
  },
  animations: {
    "broccoli-idle": {
      frames: ["idle1", "idle2", "idle1", "idle3"],
      duration: 1,
      loop: true,
    },
  },
  attributes: {
    walkingSpeed: 0,
  }
};
