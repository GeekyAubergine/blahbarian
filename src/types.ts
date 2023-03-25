export interface SpriteSheetSprite {
  id: string;
  size: number;
  sx: number;
  sy: number;
}

export interface SpriteSheet {
  id: string;
  image: HTMLElement | null;
  sprites: Record<string, SpriteSheetSprite>;
  width: number;
  height: number;
}

export type SpriteSheets = Record<string, SpriteSheet>;

export interface Animation {
  spriteSheetId: string;
  spriteIds: string[];
}

export enum MOVEMENT {
  IDLE = "IDLE",
  UP = "UP",
  DOWN = "DOWN",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

export enum EnemyType {
  CHAIR = "CHAIR",
}

export enum TileType {
  FLOOR = "FLOOR",
  WALL = "WALL",
  DOOR = "DOOR",
}

export interface Vector {
  x: number;
  y: number;
}

export interface Entity {
  id: string;
  position: Vector;
  velocity: Vector;
  health: number;
  movement: MOVEMENT;
  animation?: Record<MOVEMENT, Animation>;
}

export interface Player extends Entity {}

export interface Enemy extends Entity {
  type: EnemyType;
}
export interface World {
  tiles: TileType[][];
  enemies: Enemy[];
  player: Player;
}
