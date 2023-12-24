import { Page } from "./lib/page";

import moonrise from "./sketches/moonrise";
import hatching from "./sketches/hatching";
import rays from "./sketches/rays";
import bounds from "./sketches/bounds";
import shapes from "./sketches/shapes";

const page = new Page("Sketches");
page.InstallSketches([hatching, shapes, bounds, moonrise, rays]);

export {};
