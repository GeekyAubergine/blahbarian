import { SpriteSheet } from "./types";

export const PLAYER_SPRITE_SHEET: SpriteSheet = {
  id: "player",
  image: document.getElementById("shark-sprites"),
  spriteSize: 128,
  sprites: {
    "player-down-1": {
      id: "player-down-1",
      sx: 0,
      sy: 0,
    },
    "player-down-2": {
      id: "player-down-2",
      sx: 1,
      sy: 0,
    },
    "player-up-1": {
      id: "player-up-1",
      sx: 0,
      sy: 1,
    },
    "player-up-2": {
      id: "player-up-2",
      sx: 1,
      sy: 1,
    },
    "player-right-1": {
      id: "player-right-1",
      sx: 0,
      sy: 2,
    },
    "player-right-2": {
      id: "player-right-2",
      sx: 1,
      sy: 2,
    },
    "player-left-1": {
      id: "player-left-1",
      sx: 0,
      sy: 3,
    },
    "player-left-2": {
      id: "player-left-2",
      sx: 1,
      sy: 3,
    },
    "player-idle-1": {
      id: "player-idle-1",
      sx: 0,
      sy: 4,
    },
    "player-idle-2": {
      id: "player-idle-2",
      sx: 1,
      sy: 4,
    },
  },
  width: 128,
  height: 256,
};

export const WARDROBE_SPRITE_SHEET: SpriteSheet = {
  id: "wardrobe",
  image: document.getElementById("wardrobe"),
  spriteSize: 16,
  sprites: {
    "wardrobe-1": {
      id: "wardrobe-1",
      sx: 0,
      sy: 0,
    },
    "wardrobe-2": {
      id: "wardrobe-2",
      sx: 1,
      sy: 0,
    },
    "wardrobe-3": {
      id: "wardrobe-3",
      sx: 2,
      sy: 0,
    },
    "wardrobe-4": {
      id: "wardrobe-4",
      sx: 3,
      sy: 0,
    },
    "wardrobe-5": {
      id: "wardrobe-5",
      sx: 4,
      sy: 0,
    },
    "wardrobe-6": {
      id: "wardrobe-6",
      sx: 5,
      sy: 0,
    },
  },
  width: 128,
  height: 256,
};

export const SWORD_SPRITE: SpriteSheet = {
  id: "sword",
  image: document.getElementById("sword"),
  spriteSize: 128,
  sprites: {
    "sword-up-1": {
      id: "sword-up-1",
      sx: 0,
      sy: 0,
    },
    "sword-up-2": {
      id: "sword-up-2",
      sx: 1,
      sy: 0,
    },
    "sword-up-3": {
      id: "sword-up-3",
      sx: 2,
      sy: 0,
    },
    "sword-up-4": {
      id: "sword-up-4",
      sx: 3,
      sy: 0,
    },
    "sword-up-5": {
      id: "sword-up-5",
      sx: 4,
      sy: 0,
    },
    "sword-down-1": {
      id: "sword-down-1",
      sx: 0,
      sy: 1,
    },
    "sword-down-2": {
      id: "sword-down-2",
      sx: 1,
      sy: 1,
    },
    "sword-down-3": {
      id: "sword-down-3",
      sx: 2,
      sy: 1,
    },
    "sword-down-4": {
      id: "sword-down-4",
      sx: 3,
      sy: 1,
    },
    "sword-down-5": {
      id: "sword-down-5",
      sx: 4,
      sy: 1,
    },
    "sword-left-1": {
      id: "sword-left-1",
      sx: 0,
      sy: 3,
    },
    "sword-left-2": {
      id: "sword-left-2",
      sx: 1,
      sy: 3,
    },
    "sword-left-3": {
      id: "sword-left-3",
      sx: 2,
      sy: 3,
    },
    "sword-left-4": {
      id: "sword-left-4",
      sx: 3,
      sy: 3,
    },
    "sword-left-5": {
      id: "sword-left-5",
      sx: 4,
      sy: 3,
    },
    "sword-right-1": {
      id: "sword-right-1",
      sx: 0,
      sy: 2,
    },
    "sword-right-2": {
      id: "sword-right-2",
      sx: 1,
      sy: 2,
    },
    "sword-right-3": {
      id: "sword-right-3",
      sx: 2,
      sy: 2,
    },
    "sword-right-4": {
      id: "sword-right-4",
      sx: 3,
      sy: 2,
    },
    "sword-right-5": {
      id: "sword-right-5",
      sx: 4,
      sy: 2,
    },
  },
  width: 128,
  height: 256,
};

export const MEATBALL_SPRITE_SHEET: SpriteSheet = {
  id: "health",
  image: document.getElementById("health-sprites"),
  spriteSize: 128,
  sprites: {
    full: {
      id: "full",
      sx: 0,
      sy: 0,
    },
    half: {
      id: "half",
      sx: 1,
      sy: 0,
    },
    empty: {
      id: "empty",
      sx: 0,
      sy: 1,
    },
  },
  width: 256,
  height: 256,
};

// console.log({ sharkSprites });

// let image = new Image();
// image.src = sharkSprites;

// console.log({ image });

export const SPRITE_SHEETS: Record<string, SpriteSheet> = {
  [PLAYER_SPRITE_SHEET.id]: PLAYER_SPRITE_SHEET,
  [MEATBALL_SPRITE_SHEET.id]: MEATBALL_SPRITE_SHEET,
  [WARDROBE_SPRITE_SHEET.id]: WARDROBE_SPRITE_SHEET,
  [SWORD_SPRITE.id]: SWORD_SPRITE,
};

// for (const spriteSheet of Object.values(SPRITE_SHEETS)) {
//   spriteSheet.img.src = spriteSheet.fileSource;
// }
