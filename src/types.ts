enum Direction {
  UP = "UP",
  DOWN = "DOWN",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

enum EnemyType {
  CHAIR = "CHAIR",
}

enum TileType {
    FLOOR = "FLOOR",
    WALL = "WALL",
    DOOR = "DOOR",
}

interface Vector {
  x: number;
  y: number;
}

interface Entity {
  id: string;
  position: Vector;
  velocity: Vector;
  health: number;
  direction: Direction;
}

interface Player extends Entity {}

interface Enemy extends Entity {
    type: EnemyType;
}

interface Room {
  entities: Entity[];
  position: Vector;
}

interface World {
  rooms: Room[];
  player: Player;
}
