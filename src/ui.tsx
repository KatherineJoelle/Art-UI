import {
  engine,
  Transform,
  UiCanvasInformation,
} from '@dcl/sdk/ecs'
import ReactEcs, { Button, Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import *  as  ui from 'dcl-ui-toolkit'
import { breakLines, setupUiInfoEngine, tieredFontScale, tieredModalScale, tieredModalTextWrapScale, wordWrap } from './helperFunctions'
import { hoverVisible } from './systems'
import { Color4 } from '@dcl/sdk/math'
import { Cube } from './components'
import { artTitle1, artDescription1 } from './artData'



// Fonts: 'serif', 'sans-serif', 'monospace'

const artTitle = artTitle1
const artDescription = artDescription1

const Max_Chars = 25
const Min_Chars = 25
/// hoping we dont need this const isHighGraphics = true; // Replace with your actual graphics setting check
const baseFontSize = 24;
const titleFont = 'serif'
const descriptionFont = 'sans-serif'
const titleColor = Color4.Black()
const descriptionColor = Color4.Gray()



export const uiComponent = () => [
  openUI(),
  ui.render()
]

export function setupUi() {
  setupUiInfoEngine(),
    ReactEcsRenderer.setUiRenderer(uiComponent)
}



export function openUI() {
  if (hoverVisible) {
    const artTitleWrap = wordWrap(artTitle, 20 * tieredModalTextWrapScale, 6) 
    const artDescriptionWrap = breakLines(artDescription, Max_Chars)
    return (
      <UiEntity
        uiTransform={{
          height: `${UiCanvasInformation.get(engine.RootEntity).height * .1}`,
          width: `${UiCanvasInformation.get(engine.RootEntity).width * .5}`,
          positionType: 'absolute',
          position: `27% 0 0 ${UiCanvasInformation.get(engine.RootEntity).width / 100}`,
          flexDirection: 'column',
          alignItems: 'center',
          maxHeight: '15%',
          maxWidth: '20%',

        }}
        uiBackground={{
          //texture: { src: rewardUI }, 
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
            margin: '20px 0px 0px 0px',
            positionType: 'absolute',
            position: '-80% 0 0 0%',
          }}
          color={titleColor}
        />
        {/* Label displaying Art Details */}
        <Label
          value={artDescriptionWrap}
          fontSize={20 * tieredFontScale}
          font={descriptionFont}
          textAlign="top-left"
          uiTransform={{
            width: 'auto',
            height: 'auto',
            alignSelf: 'stretch',
            margin: '10px 0px 0px 0px',
            positionType: 'absolute',
            position: '20% 0 0 0%',
          }}
          color={descriptionColor}
        />
      </UiEntity>


    );

  }

}


function getPlayerPosition() {
  const playerPosition = Transform.getOrNull(engine.PlayerEntity)
  if (!playerPosition) return ' no data yet'
  const { x, y, z } = playerPosition.position
  return `{X: ${x.toFixed(2)}, Y: ${y.toFixed(2)}, z: ${z.toFixed(2)} }`
}

