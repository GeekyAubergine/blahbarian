import { EntityConfig } from "../game/entity/Entity";
import { Movement } from "../engine/Movement";

export const SHARK_ENTITY_CONFIG: EntityConfig = {
  name: "shark",
  spriteSheet: {
    assetFileName: "player/normal.png",
    rotationPoint: {
      x: 64,
      y: 64,
    },
    spriteSize: {
      width: 128,
      height: 128,
    },
    renderedSize: {
      width: 128,
      height: 128,
    },
    sprites: {
      down1: {
        sx: 0,
        sy: 0,
      },
      down2: {
        sx: 1,
        sy: 0,
      },
      up1: {
        sx: 0,
        sy: 1,
      },
      up2: {
        sx: 1,
        sy: 1,
      },
      right1: {
        sx: 0,
        sy: 2,
      },
      right2: {
        sx: 1,
        sy: 2,
      },
      left1: {
        sx: 0,
        sy: 3,
      },
      left2: {
        sx: 1,
        sy: 3,
      },
      idle1: {
        sx: 0,
        sy: 4,
      },
      idle2: {
        sx: 1,
        sy: 4,
      },
    },
  },
  animations: {
    "shark-idle": {
      frames: ["idle1", "idle2"],
      duration: 1.5,
      loop: true,
    },
    "shark-down": {
      frames: ["down1", "down2"],
      duration: 0.5,
      loop: true,
    },
    "shark-up": {
      frames: ["up1", "up2"],
      duration: 0.5,
      loop: true,
    },
    "shark-right": {
      frames: ["right1", "right2"],
      duration: 0.5,
      loop: true,
    },
    "shark-left": {
      frames: ["left1", "left2"],
      duration: 0.5,
      loop: true,
    },
  },
  movementAnimationsConfig: {
    [Movement.IDLE]: "shark-idle",
    [Movement.UP]: "shark-up",
    [Movement.UP_RIGHT]: "shark-up",
    [Movement.RIGHT]: "shark-right",
    [Movement.DOWN_RIGHT]: "shark-down",
    [Movement.DOWN]: "shark-down",
    [Movement.DOWN_LEFT]: "shark-down",
    [Movement.LEFT]: "shark-left",
    [Movement.UP_LEFT]: "shark-up",
  },
  attributes: {
    movementSpeed: 256,
    maxHealth: 100,
  },
};
