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
import { addArtworkData, setArtworkId } from './artData'
import { openUI } from './ui'

// Cube factory
export function createSphere(x: number, y: number, z: number, artworkId: number, artTitle: string, artDescription: string): Entity {
  const entity = engine.addEntity()

  // Used to track the cubes
  Cube.create(entity, { artTitle, artDescription })
  addArtworkData(entity, artworkId, artTitle, artDescription, true);
  setArtworkId(entity, artworkId);
  Transform.create(entity, { position: { x, y, z } })
  MeshRenderer.setSphere(entity)
  MeshCollider.setSphere(entity)
  Material.setPbrMaterial(entity, { albedoColor: Color4.fromHexString(getRandomHexColor()) })

  ArtHover.create(entity, { visible: false })
  PointerEvents.create(entity, {
    pointerEvents: [
      {
        eventType: PointerEventType.PET_HOVER_ENTER, eventInfo: {
          button: InputAction.IA_ANY, hoverText: 'Change Color',
        }
      }
    ]
  })




  return entity
}
