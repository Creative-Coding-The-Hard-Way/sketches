import { Page } from "./lib/page";

import moonrise from "./sketches/moonrise";
import rays from "./sketches/rays";
import bounds from "./sketches/bounds";
import shapes from "./sketches/shapes";

const page = new Page("Sketches");
page.InstallSketches([shapes, bounds, moonrise, rays]);

export {};
