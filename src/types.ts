export enum Direction {
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
  direction: Direction;
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
