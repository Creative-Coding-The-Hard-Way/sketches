import { intersect_ray_and_segment } from "./geometry";
import { Vec2, vec2 } from "./vec2";
import P5 from "p5";

export class Shape {
  private vertices: Vec2[];

  constructor() {
    this.vertices = [];
  }

  /**
   * Add a vertex to the shape's outline.
   * @param point the [x, y] coordinate of the vertex
   * @returns this, for chaining
   */
  public vertex(point: Vec2): Shape {
    this.vertices.push(point);
    return this;
  }

  /**
   * Compute all of the intersections between the given ray and the sides of the
   * shape.
   *
   * @param ray_start the starting point of the ray
   * @param ray_dir the direction the ray is pointing
   * @returns A sorted list of intersections. The closest intersection is
   *   always first.
   */
  public intersect(
    ray_start: Vec2,
    ray_dir: Vec2
  ): { point: Vec2; dist: number }[] {
    const intersections = [];
    for (let i = 1; i < this.vertices.length; i++) {
      const segment_start = this.vertices[i - 1];
      const segment_end = this.vertices[i];
      const intersection = intersect_ray_and_segment(
        ray_start,
        ray_dir,
        segment_start,
        segment_end
      );
      if (intersection != undefined) {
        intersections.push({ point: intersection[0], dist: intersection[1] });
      }
    }
    const segment_start = this.vertices[this.vertices.length - 1];
    const segment_end = this.vertices[0];
    const intersection = intersect_ray_and_segment(
      ray_start,
      ray_dir,
      segment_start,
      segment_end
    );
    if (intersection != undefined) {
      intersections.push({ point: intersection[0], dist: intersection[1] });
    }

    return intersections.sort((a, b) => a.dist - b.dist);
  }

  /**
   * Draw the shape using p5.beginShape()
   * @param p5 the p5 library instance.
   */
  public draw(p5: P5) {
    p5.beginShape();
    for (const v of this.vertices) {
      p5.vertex(v.x, v.y);
    }
    p5.endShape(p5.CLOSE);
  }

  /**
   * Draw the shape by connectingh the vertices with lines.
   * @param p5 the p5 library instance.
   */
  public drawLines(p5: P5) {
    for (let i = 1; i < this.vertices.length; i++) {
      const s = this.vertices[i - 1];
      const e = this.vertices[i];
      p5.line(s.x, s.y, e.x, e.y);
    }
    const s = this.vertices[this.vertices.length - 1];
    const e = this.vertices[0];
    p5.line(s.x, s.y, e.x, e.y);
  }

  /**
   * Create a new circle.
   * @param center the coordinates for the center of the circle
   * @param radius the radius of the circle
   * @param divisions how many segments should be used to construct the circle
   * @returns
   */
  public static circle(center: Vec2, radius: number, divisions?: number) {
    divisions = divisions == undefined ? 25 : divisions;
    const circle = new Shape();
    const angle_step = (Math.PI * 2) / divisions;
    for (let i = 0; i < divisions; i++) {
      const angle = i * angle_step;
      const x = center.x + Math.cos(angle) * radius;
      const y = center.y + Math.sin(angle) * radius;
      circle.vertex(vec2(x, y));
    }
    return circle;
  }
}
