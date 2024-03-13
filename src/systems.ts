import {
  engine,
  Transform,
  inputSystem,
  PointerEvents,
  InputAction,
  PointerEventType,
  Material,
} from '@dcl/sdk/ecs'
import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'
import { Cube, ArtHover } from './components'
import { getRandomHexColor } from './utils'
import { openUI } from './ui'
import * as utils from '@dcl-sdk/utils'


/**
 * All cubes rotating behavior
 */
export function circularSystem(dt: number) {
  const entitiesWithSpinner = engine.getEntitiesWith(ArtHover, Transform)
  for (const [entity, _spinner, _transform] of entitiesWithSpinner) {
    const mutableTransform = Transform.getMutable(entity)
    const spinnerData = ArtHover.get(entity)
  }
}

export let hoverVisible = false 
/**
 * Search for the cubes that has pointerEvents, and when there is a click change the color.
 */
export function changeColorSystem() {
  for (const [entity] of engine.getEntitiesWith(Cube, PointerEvents)) {
   
    if (inputSystem.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_HOVER_ENTER, entity)) {
      Material.setPbrMaterial(entity, { albedoColor: Color4.fromHexString(getRandomHexColor()) })
      hoverVisible = !hoverVisible
      utils.timers.setTimeout(() => hoverVisible = false, 9000)
    } else if (inputSystem.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_HOVER_LEAVE, entity)) {
      hoverVisible = false
    }
  }
}
