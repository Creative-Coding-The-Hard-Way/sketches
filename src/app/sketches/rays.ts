import P5 from "p5";
import { Meta } from "../lib/page";

class Vec2 {
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

function vec2(x: number, y: number): Vec2 {
  return new Vec2(x, y);
}

function intersect(
  ray_start: Vec2,
  ray_dir: Vec2,
  segment_start: Vec2,
  segment_end: Vec2
): Vec2 | undefined {
  const segment_dir = segment_end.sub(segment_start);
  const denominator = ray_dir.cross(segment_dir);

  if (denominator == 0) {
    const delta = segment_start.sub(ray_start);
    const numerator = delta.cross(ray_dir);
    if (numerator != 0) {
      // This means the ray and line segment are parallel and not touching
      return;
    } else {
      // This means that the ray and the line segment are colinear.
      let s = segment_start;
      let e = segment_end;
      if (ray_dir.dot(segment_dir) < 0) {
        [s, e] = [e, s];
      }

      const ray_len_sq = ray_dir.length_squared();
      const t0 = s.sub(ray_start).dot(ray_dir) / ray_len_sq;
      const t1 = e.sub(ray_start).dot(ray_dir) / ray_len_sq;
      if (t0 >= 0) {
        return s;
      } else if (t0 <= 0 && t1 >= 0) {
        return ray_start;
      } else {
        return;
      }
    }
  } else {
    const delta = segment_start.sub(ray_start);
    const segment_len = delta.cross(ray_dir) / denominator;
    const ray_len = delta.cross(segment_dir) / denominator;
    if (ray_len < 0) {
      return;
    }
    if (segment_len >= 0 && segment_len <= 1) {
      return segment_start.sum(segment_dir.multiply(segment_len));
    }
  }
  return;
}

function sketch(p5: P5) {
  const w = 800;
  const h = 600;
  let segment_start: Vec2;
  let segment_end: Vec2;

  const old_paper = p5.color("#faebd7");
  const gunmetal = p5.color("#272d2d");
  const moonstone = p5.color("#50b2c0");

  p5.setup = () => {
    p5.createCanvas(w, h);
    segment_start = vec2(200, h / 2 + 100);
    segment_end = vec2(450, h / 2 + 120);
  };

  p5.draw = () => {
    p5.background(old_paper);
    p5.stroke(gunmetal);
    p5.strokeWeight(3);

    p5.line(segment_start.x, segment_start.y, segment_end.x, segment_end.y);

    const m = vec2(p5.mouseX, p5.mouseY);
    const c = vec2(w / 2, h / 2);
    const dir = c.sub(m).normalized();
    const e = c.sum(dir.multiply(800));
    p5.line(m.x, m.y, e.x, e.y);

    const i = intersect(m, dir, segment_end, segment_start);
    if (i != undefined) {
      p5.push();
      p5.stroke(moonstone);
      p5.strokeWeight(6);
      p5.line(m.x, m.y, i.x, i.y);
      p5.circle(i.x, i.y, 10);
      p5.pop();
    }
  };
}

const meta: Meta = {
  name: "Rays",
  description: "",
  sketch,
};
export default meta;
