import { Page } from "./lib/page";

import hello_color from "./sketches/hello_color";
import scribble from "./sketches/scribble";

const page = new Page("Sketches");
page.InstallSketches([hello_color, scribble]);

export {};
