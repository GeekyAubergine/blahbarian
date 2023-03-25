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
      sx: 0,
      sy: 1,
    },
    "wardrobe-4": {
      id: "wardrobe-4",
      sx: 1,
      sy: 1,
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
};

// for (const spriteSheet of Object.values(SPRITE_SHEETS)) {
//   spriteSheet.img.src = spriteSheet.fileSource;
// }
