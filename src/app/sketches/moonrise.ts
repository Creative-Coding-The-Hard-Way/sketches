import P5 from "p5";
import { Meta } from "../lib/page";

function sketch(p5: P5) {
  const w = 800;
  const h = 1000;

  const top = h / 4;
  const bottom = -h / 4;
  const left = -w / 4;
  const right = w / 4;

  const inner_w = right - left;
  const inner_h = top - bottom;
  const steps_x = 50;
  const steps_y = 50;
  const step_size_x = inner_w / steps_x;
  const step_size_y = inner_h / steps_y;

  const old_paper = p5.color("#faebd7");

  let font: P5.Font; // initialized in preload

  function gunmetal(alpha: number) {
    const c = p5.color("#272d2d");
    c.setAlpha(alpha);
    return c;
  }

  function layer(f: () => void) {
    p5.push();
    f();
    p5.pop();
  }

  p5.preload = () => {
    font = p5.loadFont("fonts/Special_Elite/SpecialElite-Regular.ttf");
  };

  p5.setup = () => {
    p5.createCanvas(w, h);
    p5.colorMode(p5.HSL);
  };

  p5.mouseReleased = () => {
    if (p5.mouseButton == p5.LEFT) {
      p5.redraw();
    }
  };

  p5.draw = () => {
    const seed = Math.round(1000 * p5.random(p5.millis()));
    p5.noiseSeed(seed);
    p5.background(old_paper);
    p5.translate(w / 2, h / 2);
    p5.scale(1, -1);

    // Sky Background
    layer(() => {
      for (let i = 0; i < steps_x; i++) {
        for (let j = 0; j < steps_y; j++) {
          const l = left + i * step_size_x;
          const t = top - j * step_size_y;

          if (p5.noise((2 * i) / steps_x, (2 * j) / steps_y) > 0.4) {
            const s = p5.random(0, 1.2);
            p5.line(l, t, l + step_size_x * s, t - step_size_y * s);
          }
        }
      }
    });

    // Moon
    layer(() => {
      p5.stroke(gunmetal(1));
      p5.fill(old_paper);
      p5.circle(0, bottom + 30, 100);
    });

    // Clean the bottom
    layer(() => {
      p5.noStroke();
      p5.fill(old_paper);
      p5.rect(-w / 2, bottom, w, -h);
    });

    // horizon waves
    layer(() => {
      function drawWaves(waves: number, size: number) {
        const l = -size / 2;
        const r = size / 2;
        p5.strokeWeight(1);
        for (let wave = 0; wave < waves; wave++) {
          const n = wave / waves;
          p5.stroke(gunmetal(p5.lerp(1.0, 0, n)));
          const s = p5.lerp(1.0, 0.8, n);
          const f = p5.random(1.0, 0.9);
          const g = p5.random(1.0, 0.9);
          p5.line(l * s * f, bottom - wave * 4, r * s * g, bottom - wave * 4);
        }
      }
      drawWaves(3, right - left);
      drawWaves(15, (right - left) * 0.2);
    });

    layer(() => {
      p5.textFont(font);
      p5.textSize(12);
      p5.translate(w / 2, -h / 2 + p5.textDescent());
      p5.scale(1, -1);
      p5.textAlign(p5.RIGHT, p5.BASELINE);
      p5.text("[" + seed + "]", 0, 0);
    });

    // etching
    layer(() => {
      const etchings = 500;
      p5.strokeWeight(0.5);
      p5.stroke(103, 72, 33, 0.025);
      for (let n = 0; n < etchings; n++) {
        const hw = w / 2;
        const hh = h / 2;
        p5.line(-hw, p5.random(-hh, hh), hw, p5.random(-hh, hh));
        p5.line(p5.random(-hw, hw), hh, p5.random(-hw, hw), -hh);
      }
    });
    p5.noLoop();
  };
}

const meta: Meta = {
  name: "Moonrise",
  description: "Still figuring it out",
  sketch,
};
export default meta;
