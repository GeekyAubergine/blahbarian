import { SpriteSheetAndAnimationsDefinition } from "../engine/Animation";

export const WARDROBE_SPRITE_SHEET_AND_ANIMATIONS: SpriteSheetAndAnimationsDefinition =
  {
    spriteSheet: {
      assetFileName: "wardrobe.png",
      rotationPoint: {
        x: 8,
        y: 8,
      },
      spriteSize: {
        width: 16,
        height: 16,
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
        duration: 1,
        loop: true,
      },
      "wardrobe-bite": {
        frames: ["still", "bite"],
        duration: 0.5,
        loop: true,
      },
    },
  };
