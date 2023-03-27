const NEAR_ZERO = 0.0000001;

export class Vector {
  readonly x: number;
  readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(other: Vector): Vector {
    return new Vector(this.x + other.x, this.y + other.y);
  }

  sub(other: Vector): Vector {
    return new Vector(this.x - other.x, this.y - other.y);
  }

  mul(scalar: number): Vector {
    return new Vector(this.x * scalar, this.y * scalar);
  }

  div(scalar: number): Vector {
    return new Vector(this.x / scalar, this.y / scalar);
  }

  mag(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  distance(other: Vector): number {
    return Math.hypot(this.x - other.x, this.y - other.y);
  }

  normalize(): Vector {
    const mag = this.mag();
    if (mag < NEAR_ZERO) {
      return new Vector(0, 0);
    }
    return this.div(mag);
  }

  toString(): string {
    return `Vector(${this.x}, ${this.y})`;
  }
}
