import P5 from "p5";
import { Meta } from "../lib/page";
import { vec2 } from "../lib/vec2";
import { Shape } from "../lib/shape";

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

    const shape = new Shape();
    shape
      .vertex(vec2(cx - 100, cy - 100))
      .vertex(vec2(cx - 100, cy + 20))
      .vertex(vec2(cx - 80, cy + 50))
      .vertex(vec2(cx - 75, cy + 10))
      .vertex(vec2(cx + 20, cy + 5))
      .vertex(vec2(cx + 70, cy - 80));

    shape.draw(p5);

    const m = vec2(p5.mouseX, p5.mouseY);
    const dir = vec2(cx, cy).sub(m).normalized();
    const right = dir.rotate90();
    const look = m.sum(dir.multiply(50));
    const look_right = m.sum(right.multiply(25));

    p5.circle(m.x, m.y, 20);
    p5.line(m.x, m.y, look.x, look.y);
    p5.line(m.x, m.y, look_right.x, look_right.y);

    const { top_left, top_right, bottom_left, bottom_right } =
      shape.bounding_box(dir);

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
