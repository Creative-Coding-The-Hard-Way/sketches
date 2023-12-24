import P5 from "p5";
import { Meta } from "../lib/page";
import { vec2, Vec2 } from "../lib/vec2";
import { Shape } from "../lib/shape";

function hatching(p5: P5, shape: Shape, normal: Vec2) {
  //bounds =
}

function sketch(p5: P5) {
  const w = 800;
  const h = 600;

  const old_paper = p5.color("#faebd7");
  const gunmetal = p5.color("#272d2d");

  const shape = Shape.circle(vec2(w / 2, h / 2), w / 3, 75);

  p5.setup = () => {
    p5.createCanvas(w, h);
  };

  p5.draw = () => {
    p5.background(old_paper);
    p5.stroke(gunmetal);

    p5.push();
    p5.strokeWeight(2);
    shape.drawLines(p5);
    p5.pop();

    p5.push();
    p5.pop();
  };
}

const meta: Meta = {
  name: "Hatching",
  description: "Computational Cross Hatching",
  sketch,
};
export default meta;
