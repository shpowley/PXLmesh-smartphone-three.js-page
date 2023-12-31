import { useGLTF } from '@react-three/drei'
import VideoMaterial from '../components/VideoMaterial'
import { useControls } from 'leva'
import { Suspense, useEffect, useState } from 'react'
import TextureMaterial from '../components/TextureMaterial'
import { VIDEOS, IMAGES } from '../common/Constants'
import useVideoStore from '../store/videoStore'

const FILE_PHONE = './models/s21-join-compressed.glb'

useGLTF.preload(FILE_PHONE)

const ScreenMesh = ({ geometry, material }) => {
  const { video, setVideo } = useVideoStore() // zustand data store

  const controls_video = useControls(
    'phone video',

    {
      video: {
        value: video,
        options: VIDEOS,

        onChange: (value) => {
          setVideo(value)
        }
      },

      loop: {
        value: false,
      },

      flip_x: {
        label: 'flip x',
        value: false,
      },

      flip_y: {
        label: 'flip y',
        value: false,
      },

      scale_x: {
        label: 'scale x',
        value: 2.24,
        min: 0,
        max: 3,
        step: 0.01,
      },

      scale_y: {
        label: 'scale y',
        value: 1,
        min: 0,
        max: 3,
        step: 0.01,
      },

      offset_x: {
        label: 'offset x',
        value: 0.61,
        min: -2,
        max: 2,
        step: 0.01,
      },

      offset_y: {
        label: 'offset y',
        value: 0,
        min: -2,
        max: 2,
        step: 0.01,
      },
    },

    { collapsed: true }
  )

  const controls_image = useControls(
    'phone image',

    {
      scale: {
        value: 0.4,
        min: 0.1,
        max: 2,
        step: 0.01,
      },

      pos_x: {
        label: 'position x',
        value: 40,
        min: -1000,
        max: 1000,
        step: 1,
      },

      pos_y: {
        label: 'position y',
        value: 660,
        min: -1000,
        max: 2000,
        step: 1,
      },
    },

    { collapsed: true }
  )

  const [is_playing, setIsPlaying] = useState(false)

  useEffect(() => {
    setIsPlaying(video !== null)
  }, [video])

  return <mesh geometry={geometry} >
    {
      is_playing && video
        ?
        <Suspense fallback={<TextureMaterial material={material} />}>
          <VideoMaterial
            video_url={video}
            material={material}
            finishPlayingEvent={setIsPlaying}
            loop={controls_video.loop}
            flip_x={controls_video.flip_x}
            flip_y={controls_video.flip_y}
            scale_x={controls_video.scale_x}
            scale_y={controls_video.scale_y}
            offset_x={controls_video.offset_x}
            offset_y={controls_video.offset_y}
          />
        </Suspense>
        :
        <TextureMaterial
          material={material}
          texture_url={IMAGES.GOOGLE_PLAY_PNG}
          scale={controls_image.scale}
          pos_x={controls_image.pos_x}
          pos_y={controls_image.pos_y}
        />
    }
  </mesh>
}

const ModelPhone = ({ position, scale, rotation, visible }) => {
  const { nodes, materials } = useGLTF(FILE_PHONE)

  return <group
    visible={visible}
    position={position}
    scale={scale}
    rotation={rotation}
    dispose={null}
  >
    <mesh geometry={nodes.back_plate.geometry} material={materials.Back} />

    {/*
    IMAGE FALLBACK EXAMPLE

    <mesh geometry={nodes.screen.geometry} material={materials.Screen}>
      <Suspense fallback={<FallbackMaterial url={CONSTANTS.IMAGE_FALLBACK} />}>
        <VideoMaterial url={props.film} />
      </Suspense>
    </mesh>
    */}

    <ScreenMesh
      geometry={nodes.screen.geometry}
      material={materials.Screen}
    />

    <mesh geometry={nodes.logo_1.geometry} material={materials.BodyFrame} />
    <mesh geometry={nodes.logo_2.geometry} material={materials.CameraModule} />
    <mesh geometry={nodes.logo_3.geometry} material={materials.Camera2} />
    <mesh geometry={nodes.logo_4.geometry} material={materials.Camera3} />
    <mesh geometry={nodes.logo_5.geometry} material={materials.Glass} />
    <mesh geometry={nodes.logo_6.geometry} material={materials.Lens} />
    <mesh geometry={nodes.logo_7.geometry} material={materials['Lens.001']} />
    <mesh geometry={nodes.logo_8.geometry} material={materials.Flash} />
    <mesh geometry={nodes.logo_9.geometry} material={materials.material} />
    <mesh geometry={nodes.logo_10.geometry} material={materials.Antennas} />
    <mesh geometry={nodes.logo_11.geometry} material={materials.Chrome} />
    <mesh geometry={nodes.logo_12.geometry} material={materials.Speaker} />
    <mesh geometry={nodes.logo_13.geometry} material={materials.ScreenBezel} />
  </group>
}

export default ModelPhone