import { Page } from "./lib/page";

import moonrise from "./sketches/moonrise";
import rays from "./sketches/rays";
import bounds from "./sketches/bounds";

const page = new Page("Sketches");
page.InstallSketches([bounds, moonrise, rays]);

export {};
