import P5 from "p5";
import { Meta } from "../lib/page";
import { Vec2, vec2} from "../lib/vec2";
import { intersect_ray_and_segment } from "../lib/geometry";

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

    const i = intersect_ray_and_segment(m, dir, segment_end, segment_start);
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
