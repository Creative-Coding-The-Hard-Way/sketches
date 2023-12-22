import P5 from "p5";
import { Meta } from "../lib/page";
import { Vec2, vec2 } from "../lib/vec2";

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
    const look = m.sum(dir.multiply(50));

    p5.circle(m.x, m.y, 20);
    p5.line(m.x, m.y, look.x, look.y);
  };
}

const meta: Meta = {
  name: "Bounds",
  description: "Bounding boxes aligned with a look vector.",
  sketch,
};
export default meta;
