import {
  Entity,
  engine,
  Transform,
  MeshRenderer,
  MeshCollider,
  PointerEvents,
  PointerEventType,
  InputAction,
  Material
} from '@dcl/sdk/ecs'
import { Cube, ArtHover } from './components'
import { Color4 } from '@dcl/sdk/math'
import { getRandomHexColor } from './utils'

// Cube factory
export function createSphere(x: number, y: number, z: number, artTitle: string, artDescription: string): Entity {
 
  const entity = engine.addEntity()

  // Used to track the cubes
  Cube.create(entity, {artTitle, artDescription})

  Transform.create(entity, { position: { x, y, z } })

  // set how the cube looks and collides
  MeshRenderer.setSphere(entity)
  MeshCollider.setSphere(entity)
  Material.setPbrMaterial(entity, { albedoColor: Color4.fromHexString(getRandomHexColor()) })

  // Give art hover component
  ArtHover.create(entity, { visible: false })

  // Create PointerEvent with the hover feedback.
  // We are going to check the onClick event on the changeColorSystem.
  PointerEvents.create(entity, {
    pointerEvents: [
      { eventType: PointerEventType.PET_HOVER_ENTER, eventInfo: { button: InputAction.IA_ANY, hoverText: 'Change Color', 
       } }
    ]
  })

  return entity
}
