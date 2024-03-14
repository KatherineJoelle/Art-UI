import {
  engine,
  Entity,
  Transform,
  UiCanvasInformation,
} from '@dcl/sdk/ecs'
import ReactEcs, { Button, Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import *  as  ui from 'dcl-ui-toolkit'
import { breakLines, setupUiInfoEngine, tieredFontScale, tieredModalScale, tieredModalTextWrapScale, wordWrap } from './helperFunctions'
import { hoverVisible } from './systems'
import { Color4 } from '@dcl/sdk/math'
import { Cube } from './components'
import { artworkData, ArtworkData } from './artData'

//let currentArtworkId: number = 1; // Initialize with a default value


// Fonts: 'serif', 'sans-serif', 'monospace'
let currentArtworkId = 1;

// Function to find artwork by ID
function findArtworkById(id: number): ArtworkData | undefined {
  return artworkData.find(artwork => artwork.artworkId === id);
}



// Define your artwork data map
export const ArtworkIdMap = new Map<Entity, number>();

// Function to set artwork ID for an entity
export function setArtworkId(entity: Entity, artworkId: number) {
  ArtworkIdMap.set(entity, artworkId);
}

// Function to get artwork ID for an entity
export function getArtworkId(entity: Entity): number | undefined {
  return ArtworkIdMap.get(entity);
}







const Max_Chars = 25
const Min_Chars = 25
/// hoping we dont need this const isHighGraphics = true; // Replace with your actual graphics setting check
const baseFontSize = 24;
const titleFont = 'serif'
const descriptionFont = 'sans-serif'
const titleColor = Color4.Black()
const descriptionColor = Color4.Black()
const artFrame = 'images/artFrame.png'


export const uiComponent = () => [
  openUI(),
  ui.render()
]

export function setupUi() {
  setupUiInfoEngine(),
    ReactEcsRenderer.setUiRenderer(uiComponent)
}

export function changeCurrentArtworkId(newId: number) {
  const artwork = findArtworkById(newId);
  if (artwork && artwork.visible) {
      currentArtworkId = newId;
  }
}


// index but dont want index
export function openUI() {
  if (hoverVisible) {
    const artwork = findArtworkById(currentArtworkId);
    if (artwork && artwork.visible) {
        const { title, description } = artwork;
    const artTitleWrap = wordWrap(title, 20 * tieredModalTextWrapScale, 6) 
    const artDescriptionWrap = breakLines(description, Max_Chars)
    return (
      <UiEntity
        uiTransform={{
          height: `${UiCanvasInformation.get(engine.RootEntity).height * .15}`,
          width: `${UiCanvasInformation.get(engine.RootEntity).width * .5}`,
          positionType: 'absolute',
          position: `23% 0 0 ${UiCanvasInformation.get(engine.RootEntity).width / 100}`,
          flexDirection: 'column',
          alignItems: 'center',
          maxHeight: '15%',
          maxWidth: '17.5%',
          minWidth: '17.5%'

        }}
        uiBackground={{
          texture: { src: artFrame }, 
          textureMode: "stretch", uvs: [1, 1, 1, 1]
        }}

      >
        {/* Label displaying Art Title */}
        <Label
          value={artTitleWrap}
          fontSize={26 * tieredFontScale}
          font={titleFont}
          textAlign="middle-center"
          uiTransform={{
            width: 'auto',
            height: 'auto',
            alignSelf: 'stretch',
            margin: `20px 0px 0px ${UiCanvasInformation.get(engine.RootEntity).width * .025}`,
            positionType: 'absolute',
            position: '-30% 0 0 0%',
          }}
          color={titleColor}
        />
        {/* Label displaying Art Details */}
        <Label
          value={artDescriptionWrap}
          fontSize={15 * tieredFontScale}
          font={descriptionFont}
          textAlign="middle-left"
          uiTransform={{
            width: 'auto',
            height: 'auto',
            alignSelf: 'stretch',
            margin: `10px 0px 0px ${UiCanvasInformation.get(engine.RootEntity).width * .025}`,
            positionType: 'absolute',
            position: '15% 0 0 0%',
          }}
          color={descriptionColor}
        />
      </UiEntity>


    );

  }}

}


function getPlayerPosition() {
  const playerPosition = Transform.getOrNull(engine.PlayerEntity)
  if (!playerPosition) return ' no data yet'
  const { x, y, z } = playerPosition.position
  return `{X: ${x.toFixed(2)}, Y: ${y.toFixed(2)}, z: ${z.toFixed(2)} }`
}

