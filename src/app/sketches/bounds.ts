import P5 from "p5";
import { Meta } from "../lib/page";
import { Vec2, vec2 } from "../lib/vec2";

function project(ray_start: Vec2, ray_dir: Vec2, point: Vec2): [Vec2, number] {
  const projected_length = point.sub(ray_start).dot(ray_dir);
  const projected_point = ray_start.sum(ray_dir.multiply(projected_length));
  return [projected_point, projected_length];
}

function sketch(p5: P5) {
  const w = 800;
  const h = 600;
  const cx = w / 2;
  const cy = h / 2;

  p5.setup = () => {
    p5.createCanvas(w, h);
    p5.colorMode(p5.HSL);
  };

  p5.draw = () => {
    p5.background(128);

    const shape: Vec2[] = [
      vec2(cx - 100, cy - 100),
      vec2(cx - 100, cy + 20),
      vec2(cx - 80, cy + 50),
      vec2(cx - 75, cy + 10),
      vec2(cx + 20, cy + 5),
      vec2(cx + 70, cy - 80),
    ];

    p5.beginShape();
    for (const vertex of shape) {
      p5.vertex(vertex.x, vertex.y);
    }
    p5.endShape(p5.CLOSE);

    const m = vec2(p5.mouseX, p5.mouseY);
    const dir = vec2(cx, cy).sub(m).normalized();
    const right = dir.rotate90();
    const look = m.sum(dir.multiply(50));
    const look_right = m.sum(right.multiply(25));

    p5.circle(m.x, m.y, 20);
    p5.line(m.x, m.y, look.x, look.y);
    p5.line(m.x, m.y, look_right.x, look_right.y);

    const primary_axis_projection = shape.map((vertex) =>
      project(m, dir, vertex)
    );
    const off_axis_projection = shape.map((vertex) =>
      project(m, right, vertex)
    );

    let y_min = primary_axis_projection[0];
    let y_max = primary_axis_projection[0];
    let x_min = off_axis_projection[0];
    let x_max = off_axis_projection[0];
    {
      for (const projection of primary_axis_projection) {
        const [p, l] = projection;
        p5.circle(p.x, p.y, 5);
        if (l > y_max[1]) {
          y_max = projection;
        }
        if (l <= y_min[1]) {
          y_min = projection;
        }
      }

      p5.circle(y_min[0].x, y_min[0].y, 10);
      p5.circle(y_max[0].x, y_max[0].y, 10);
    }

    {
      for (const projection of off_axis_projection) {
        const [p, l] = projection;
        p5.circle(p.x, p.y, 5);
        if (l > x_max[1]) {
          x_max = projection;
        }
        if (l <= x_min[1]) {
          x_min = projection;
        }
      }

      p5.circle(x_min[0].x, x_min[0].y, 10);
      p5.circle(x_max[0].x, x_max[0].y, 10);
    }

    const bottom_left = m
      .sum(dir.multiply(y_min[1]))
      .sum(right.multiply(x_min[1]));
    const bottom_right = m
      .sum(dir.multiply(y_min[1]))
      .sum(right.multiply(x_max[1]));
    const top_left = m
      .sum(dir.multiply(y_max[1]))
      .sum(right.multiply(x_min[1]));
    const top_right = m
      .sum(dir.multiply(y_max[1]))
      .sum(right.multiply(x_max[1]));

    p5.circle(bottom_left.x, bottom_left.y, 20);
    p5.circle(bottom_right.x, bottom_right.y, 20);
    p5.circle(top_left.x, top_left.y, 20);
    p5.circle(top_right.x, top_right.y, 20);

    p5.line(bottom_left.x, bottom_left.y, top_left.x, top_left.y);
    p5.line(top_left.x, top_left.y, top_right.x, top_right.y);
    p5.line(top_right.x, top_right.y, bottom_right.x, bottom_right.y);
    p5.line(bottom_right.x, bottom_right.y, bottom_left.x, bottom_left.y);
  };
}

const meta: Meta = {
  name: "Bounds",
  description: "Bounding boxes aligned with a look vector.",
  sketch,
};
export default meta;
