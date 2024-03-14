// We define the empty imports so the auto-complete feature works as expected.
import { } from '@dcl/sdk/math'
import { engine } from '@dcl/sdk/ecs'

import { changeColorSystem, circularSystem } from './systems'
import { setupUi } from './ui'
import { createSphere } from './factory'
import { addArtworkData } from "./artData";


export function main() {
  // Defining behavior. See `src/systems.ts` file.
  engine.addSystem(circularSystem)
  engine.addSystem(changeColorSystem)

  // draw UI. Here is the logic to spawn cubes.
  setupUi()

  // Create entity for artwork 1
const entity1 = createSphere(2, 0, 8, 1, "Art Title 1", "Art Description 1 by dskfhjñad");
addArtworkData(entity1, 1, "Art Title 1", "Art Description 1 by sklfjdñs", true);

// Create entity for artwork 2
const entity2 = createSphere(4, 0, 8, 2, "Art Title 2", "Art Description 2 by osdhfasoidhf");
addArtworkData(entity2, 2, "Art Title 2", "Art Description 2 by sklfjdñs", true);

// Create entity for artwork 3
const entity3 = createSphere(6, 0, 8, 3, "Art Title 3", "Art Description 3 by agsesg");
addArtworkData(entity3, 3, "Art Title 3", "Art Description 3 by sklfjdñs", true);


}

