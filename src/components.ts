import { Schemas, engine } from '@dcl/sdk/ecs'


// We use this component to track and group all spinning entities.
// engine.getEntitiesWith(Spinner)
export const ArtHover = engine.defineComponent('artHover', { visible: Schemas.Boolean })

// We use this component to track and group all the cubes.
// engine.getEntitiesWith(Cube)
export const Cube = engine.defineComponent('cube-id', {
    artTitle: Schemas.String,
    artDescription: Schemas.String
})