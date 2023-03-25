export interface SpriteSheetSprite {
  id: string;
  sx: number;
  sy: number;
}

export interface SpriteSheet {
  id: string;
  image: HTMLElement | null;
  sprites: Record<string, SpriteSheetSprite>;
  spriteSize: number;
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
  walkSpeed: number;
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
  powerUps: PowerUp[];
}

export enum PowerUpType {
  KETCHUP = "KETCHUP",
}

export interface PowerUpConfig {
  duration: number;
  radius: number;
  type: PowerUpType;
  color: string;
  playerChanges: Partial<Player>
}

export interface PowerUp {
  position: Vector;
  type: PowerUpType;
}

export enum WeaponType {
  PROJECTILE = "PROJECTILE",
  MELEE = "MELEE",
}

export type Weapon<
  TWeaponType extends WeaponType,
  TExtras = TWeaponType extends WeaponType.MELEE
    ? {}
    : TWeaponType extends WeaponType.PROJECTILE
    ? { speed: number }
    : never
> = {
  type: TWeaponType;
  damage: number;
} & TExtras;
