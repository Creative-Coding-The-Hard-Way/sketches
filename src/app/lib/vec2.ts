export class Vec2 {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  dot(vec: Vec2): number {
    return this.x * vec.x + this.y * vec.y;
  }

  sum(vec: Vec2): Vec2 {
    return new Vec2(this.x + vec.x, this.y + vec.y);
  }

  sub(vec: Vec2): Vec2 {
    return new Vec2(this.x - vec.x, this.y - vec.y);
  }

  multiply(n: number): Vec2 {
    return new Vec2(this.x * n, this.y * n);
  }

  cross(vec: Vec2): number {
    return this.x * vec.y - this.y * vec.x;
  }

  length_squared(): number {
    return this.x * this.x + this.y * this.y;
  }

  length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalized(): Vec2 {
    const len = this.length();
    return new Vec2(this.x / len, this.y / len);
  }
}

export function vec2(x: number, y: number): Vec2 {
  return new Vec2(x, y);
}
