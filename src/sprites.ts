import { SpriteSheet } from "./types";
import sharkSprites from "./assets/shark-sprites.png";

export const PLAYER_SPRITE_SHEET: SpriteSheet = {
  id: "player",
  file: '',
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

console.log({ sharkSprites });

const SPRITE_SHEETS = [PLAYER_SPRITE_SHEET];
