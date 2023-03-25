import { SpriteSheet } from "./types";
// import sharkSprites from "./assets/shark-sprites.png";

export const PLAYER_SPRITE_SHEET: SpriteSheet = {
  id: "player",
  image: document.getElementById("shark-sprites"),
  sprites: {
    "player-down-1": {
      id: "player-down-1",
      size: 16,
      sx: 0,
      sy: 0,
    },
    "player-down-2": {
      id: "player-down-2",
      size: 16,
      sx: 16,
      sy: 0,
    },
  },
  width: 32,
  height: 16,
};
console.log("sdlfkjlksejhf;kj");

// console.log({ sharkSprites });

// let image = new Image();
// image.src = sharkSprites;

// console.log({ image });

export const SPRITE_SHEETS: Record<string, SpriteSheet> = {
  [PLAYER_SPRITE_SHEET.id]: PLAYER_SPRITE_SHEET,
};

// for (const spriteSheet of Object.values(SPRITE_SHEETS)) {
//   spriteSheet.img.src = spriteSheet.fileSource;
// }
