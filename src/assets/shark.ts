import { SpriteSheetAndAnimationsDefinition } from "../engine/Animation";

export const SHARK_SPRITE_SHEET_AND_ANIMATIONS: SpriteSheetAndAnimationsDefinition =
  {
    spriteSheet: {
      assetFileName: "shark-sprites.png",
      rotationPoint: {
        x: 64,
        y: 64,
      },
      spriteSize: {
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
  };
