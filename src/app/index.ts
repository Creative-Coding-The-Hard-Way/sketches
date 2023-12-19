import { Page } from "./lib/page";

import moonrise from "./sketches/moonrise";
import rays from "./sketches/rays";

const page = new Page("Sketches");
page.InstallSketches([moonrise, rays]);

export {};
