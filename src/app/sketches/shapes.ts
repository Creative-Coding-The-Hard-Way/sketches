import P5 from "p5";
import { Meta } from "../lib/page";
import { vec2 } from "../lib/vec2";
import { Shape } from "../lib/shape";

function shape_at_mouse(p5: P5): Shape {
  const shape = new Shape();

  const x = p5.mouseX;
  const y = p5.mouseY;

  shape
    .vertex(vec2(x, y))
    .vertex(vec2(x + 75, y + 75)) // bottom left
    .vertex(vec2(x + 75, y - 75))
    .vertex(vec2(x - 75, y - 75))
    .vertex(vec2(x - 75, y + 75));

  return shape;
}

function sketch(p5: P5) {
  const w = 800;
  const h = 600;

  p5.setup = () => {
    p5.createCanvas(w, h);
  };

  p5.draw = () => {
    p5.background(64);
    p5.strokeWeight(3);

    const shape = shape_at_mouse(p5);
    shape.drawLines(p5);

    const ray_start = vec2(0, h / 2);
    const ray_dir = vec2(1, 0);
    const look = ray_start.sum(ray_dir.multiply(w));
    p5.line(ray_start.x, ray_start.y, look.x, look.y);

    const intersections = shape.intersect(ray_start, ray_dir);
    for (const entry of intersections) {
      const { point } = entry;
      p5.circle(point.x, point.y, 10);
    }

    p5.push();
    p5.stroke("cornflowerblue");
    for (let i = 1; i < intersections.length; i += 2) {
      const s = intersections[i - 1].point;
      const e = intersections[i].point;
      p5.line(s.x, s.y, e.x, e.y);
    }
    p5.pop();
  };
}

const meta: Meta = {
  name: "Shapes",
  description: "Generative shapes.",
  sketch,
};
export default meta;
