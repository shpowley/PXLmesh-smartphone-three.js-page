import { useThree } from '@react-three/fiber'
import { Billboard, Environment, Float, Image, PresentationControls } from '@react-three/drei'
// import { useSpring } from '@react-spring/three'

import ModelLogo from './models/ModelLogo'
import ModelPhone from './models/ModelPhone'
import { useControls, folder, button } from 'leva'
import { parameterEnabled } from './common/Utils'
import { IMAGES, VIDEOS } from './common/Constants'
import useVideoStore from './store/videoStore'
import { useRef } from 'react'
// import { Suspense, lazy } from 'react'


// DYNAMIC IMPORT FOR R3F PERFORMANCE MONITOR
let Perf = null

if (parameterEnabled('PERF') || parameterEnabled('perf')) {
  Perf = (await import('r3f-perf')).Perf
  // Perf = lazy(() => import('r3f-perf').then(module => ({ default: module.Perf })))
}


// APP ICONS
const
  icon_scale = 0.4,
  icon_spacing = 0.08

const AppIcons = () => {
  const app_icons = [
    { src: IMAGES.LUCKY_CAT_WEBP, video: VIDEOS.LUCKY_CAT },
    { src: IMAGES.FANTASY_DICE_WEBP, video: VIDEOS.FANTASY_DICE },
    { src: IMAGES.DOGECOIN_WEBP, video: VIDEOS.DOGECOIN },
    { src: IMAGES.BITCOIN_WEBP, video: VIDEOS.BITCOIN },
  ]

  const { setVideo } = useVideoStore() // zustand data store

  const canvas_style = document.querySelector('canvas')

  return <>
    {
      app_icons.map((app_icon, index) => <Image
        key={index}
        url={app_icon.src}
        // position={[0, -(icon_scale + 0.1) * index, 0]}
        position={[(icon_scale + icon_spacing) * index, 0, 0]}
        transparent
        scale={icon_scale}

        onPointerOver={() => canvas_style.style.cursor = 'pointer'}
        onPointerOut={() => canvas_style.style.cursor = ''}
        onClick={() => setVideo(app_icon.video)}
      />)
    }
  </>
}


const Experience = ({ camera_init }) => {
  const ref_logo = useRef()

  const camera = useThree(state => state.camera)

  // CAMERA CONTROLS
  useControls(
    'camera',

    {
      fov: {
        value: camera_init.fov,
        min: 0,
        max: 180,
        step: 1,

        onChange: value => {
          camera.fov = value
          camera.updateProjectionMatrix()
        }
      },

      near: {
        value: camera_init.near,
        min: 0,
        max: 10,
        step: 0.1,

        onChange: value => {
          camera.near = value
          camera.updateProjectionMatrix()
        }
      },

      far: {
        value: camera_init.far,
        min: 0,
        max: 1000,
        step: 1,

        onChange: value => {
          camera.far = value
          camera.updateProjectionMatrix()
        }
      },

      position: {
        value: camera_init.position,
        step: 0.1,

        onChange: value => {
          camera.position.set(...value)
          camera.lookAt(0, 0, 0)
        }
      },
    },

    { collapsed: true }
  )

  const controls_logo = useControls(
    'logo',

    {
      visible: {
        value: true,
      },

      scale: {
        value: 2.0,
        min: 0.1,
        max: 2,
        step: 0.01,
      },

      position: {
        value: [0.4, 0.11, 1.1],
        step: 0.01,
      },

      rotation: {
        value: [0.17, 0.65, 0],
        step: 0.01,
      },

      'animate': button(() => {
        ref_logo.current.animateLogo()
      }),
    },

    { collapsed: true }
  )

  const controls_phone = useControls(
    'phone',

    {
      visible: {
        value: true,
      },

      scale: {
        value: 2.1,
        min: 0.1,
        max: 4,
        step: 0.1,
      },

      position: {
        value: [0, 0.1, 0],
        step: 0.1,
      },

      rotation: {
        value: [0, 0, 0],
        step: 0.1,
      },

      // subfolder
      'floating effect': folder(
        {
          float_enabled: {
            label: 'enabled',
            value: true,
          },

          float_speed: {
            label: 'speed',
            value: 1.5,
            min: 0,
            max: 10,
            step: 0.1,
          },

          float_rotation: {
            label: 'rotation',
            value: 0.4,
            min: 0,
            max: 10,
            step: 0.1,
          },

          float_intensity: {
            label: 'intensity',
            value: 1.5,
            min: 0,
            max: 10,
            step: 0.1,
          },

          float_range: {
            label: 'range',
            value: [-0.08, 0.08],
            step: 0.01,
          },
        },

        { collapsed: true }
      ),

      // subfolder
      'presentation': folder(
        {
          presentation_global: {
            label: 'global',
            value: false,
          },

          presentation_config: {
            label: 'config',
            value: { mass: 1, tension: 1000 },
          },

          presentation_snap: {
            label: 'snap',
            value: { mass: 2, tension: 150 },
          },

          presentation_azimuth: {
            label: 'azimuth',
            value: 1,
            min: 0,
            max: 2,
            step: 0.1,
          },

          presentation_polar: {
            label: 'polar',
            value: 0,
            min: 0,
            max: 2,
            step: 0.1,
          },

          presentation_speed: {
            label: 'speed',
            value: 2.0,
            min: 0,
            max: 3,
            step: 0.1,
          },
        },

        { collapsed: true }
      ),
    },

    { collapsed: true }
  )

  // const [{ react_spring_x }, react_spring_api] = useSpring((
  //   () => ({
  //     react_spring_x: 0,
  //     config: { mass: 7, tension: 800, friction: 100, precision: 0.0001 },

  //     // onRest: () => {
  //     //   console.log('rest', ref_logo.current.position)
  //     //   // ref_logo.current.visible = false
  //     // }
  //   })
  // ), [])

  return <>
    {Perf && <Perf position='bottom-right' />}

    {/* <directionalLight castShadow position={[1, 2, -3]} intensity={1.5} />
    <ambientLight intensity={0.5} /> */}

    <Environment
      // background
      preset='city'
    />

    {/*
    --- REFERENCE CODE FOR ASPECT RATIO ---
    const size = useAspect(800, 600, 0.3) // defined prior to return statement

    <mesh
      scale={size}
      position={[0, 2, -3]}
    >
      <planeGeometry />

      {
        film
          ?
          <Suspense fallback={<FallbackMaterial url={CONSTANTS.IMAGE_FALLBACK} />}>
            <VideoMaterial url={film} />
          </Suspense>
          :
          <meshBasicMaterial color={0x000000} />
      }
    </mesh>
    */}

    <PresentationControls
      global={controls_phone.presentation_global}
      config={controls_phone.presentation_config}
      snap={controls_phone.presentation_snap}
      speed={controls_phone.presentation_speed}
      cursor={true}

      polar={[
        -Math.PI * controls_phone.presentation_polar,
        Math.PI * controls_phone.presentation_polar
      ]}

      azimuth={[
        -Math.PI * controls_phone.presentation_azimuth,
        Math.PI * controls_phone.presentation_azimuth
      ]}
    >
      <Float
        speed={controls_phone.float_speed}
        rotationIntensity={controls_phone.float_rotation}
        floatIntensity={controls_phone.float_intensity}
        floatingRange={controls_phone.float_range}
        enabled={controls_phone.float_enabled}
      >
        <ModelPhone
          position={controls_phone.position}
          scale={controls_phone.scale}
          rotation={controls_phone.rotation}
          visible={controls_phone.visible}
        />
      </Float>
    </PresentationControls>

    <ModelLogo
      forward_ref={ref_logo}

      visible={controls_logo.visible}
      position={controls_logo.position}
      scale={controls_logo.scale}
      rotation={controls_logo.rotation}

      // position-x={react_spring_x.to([0, 1], [0, 12.0])}

      // onClick={() => {
      //   console.log('click')
      //   react_spring_x.set(0)
      //   react_spring_api.start({ react_spring_x: 1 })
      // }}
    />

    <Billboard position={[-(icon_scale + icon_spacing) * 1.5, -1.82, 1]}>
      <AppIcons />
    </Billboard>

  </>
}

export default Experience