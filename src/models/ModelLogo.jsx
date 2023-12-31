import { useGLTF } from "@react-three/drei"
import { useSpring, animated } from '@react-spring/three'
import { useRef } from 'react'

const FILE_PXLMESH_LOGO = './models/pxlmesh-logo-compressed.glb'

const LOGO_POSITIONS = {
  START_X: 12,
  MID_X: 0,
  END_X: -3.8,
}

useGLTF.preload(FILE_PXLMESH_LOGO)

// single pixel mesh group -- less verbose
const Pixel = ({ position, nodes, materials }) => {
  return <group position={position}>
    <mesh geometry={nodes.pixel.geometry} material={materials['pixel-inner']} />
    <mesh geometry={nodes.pixel_1.geometry} material={materials['pixel-outer']} />
  </group>
}

// const ModelLogo = (props) => {
const ModelLogo = (props) => {
  const ref_logo = useRef()

  const { nodes, materials } = useGLTF(FILE_PXLMESH_LOGO)

  materials.mesh.wireframe = true
  materials.mesh.color.set(0xccccff)


  // REACT SPRING - PXLMESH LOGO ANIMATION
  let animated_x

  const [{ react_spring_x }, api] = useSpring((
    () => ({
      react_spring_x: 0,
      config: { mass: 7, tension: 800, friction: 100, precision: 0.0001 },

      onRest: () => {
        console.log('rest', ref_logo.current.position)
        // ref_logo.current.visible = false
      }
    })
  ), [])

  // animated_x = react_spring_x.to([0, 1], [0, 12.0]) // center to start
  animated_x = react_spring_x.to([0, 1], [12.0, 0]) // start to center
  // animated_x = react_spring_x.to([0, 1], [0, -3.5]) // center to end

  return <group
    {...props}
    dispose={null}

    // onClick={() => setAnimatingLogo(value => !value)}
    onClick={() => {
      console.log('click', ref_logo.current.position)
      react_spring_x.set(0)
      api.start({ react_spring_x: 1 })
    }}
  >
    <animated.group
      position-x={animated_x}

      ref={ref_logo}
    >
      <Pixel position={[-0.663, 0.102, -0.025]} nodes={nodes} materials={materials} />
      <Pixel position={[-0.663, 0.153, -0.025]} nodes={nodes} materials={materials} />
      <Pixel position={[-0.968, 0.153, -0.025]} nodes={nodes} materials={materials} />
      <Pixel position={[-0.917, 0.153, -0.025]} nodes={nodes} materials={materials} />
      <Pixel position={[-0.866, 0.153, -0.025]} nodes={nodes} materials={materials} />
      <Pixel position={[-0.815, 0.153, -0.025]} nodes={nodes} materials={materials} />
      <Pixel position={[-0.764, 0.153, -0.025]} nodes={nodes} materials={materials} />
      <Pixel position={[-0.968, 0.102, -0.025]} nodes={nodes} materials={materials} />
      <Pixel position={[-0.764, 0.102, -0.025]} nodes={nodes} materials={materials} />
      <Pixel position={[-0.968, 0.051, -0.025]} nodes={nodes} materials={materials} />
      <Pixel position={[-0.764, 0.051, -0.025]} nodes={nodes} materials={materials} />
      <Pixel position={[-0.968, 0, -0.025]} nodes={nodes} materials={materials} />
      <Pixel position={[-0.917, 0, -0.025]} nodes={nodes} materials={materials} />
      <Pixel position={[-0.866, 0, -0.025]} nodes={nodes} materials={materials} />
      <Pixel position={[-0.815, 0, -0.025]} nodes={nodes} materials={materials} />
      <Pixel position={[-0.764, 0, -0.025]} nodes={nodes} materials={materials} />
      <Pixel position={[-0.968, -0.051, -0.025]} nodes={nodes} materials={materials} />
      <Pixel position={[-0.968, -0.102, -0.025]} nodes={nodes} materials={materials} />
      <Pixel position={[-0.968, -0.153, -0.025]} nodes={nodes} materials={materials} />
      <Pixel position={[-0.459, 0.102, -0.025]} nodes={nodes} materials={materials} />
      <Pixel position={[-0.459, 0.153, -0.025]} nodes={nodes} materials={materials} />
      <Pixel position={[-0.612, 0.051, -0.025]} nodes={nodes} materials={materials} />
      <Pixel position={[-0.561, 0, -0.025]} nodes={nodes} materials={materials} />
      <Pixel position={[-0.51, 0.051, -0.025]} nodes={nodes} materials={materials} />
      <Pixel position={[-0.612, -0.051, -0.025]} nodes={nodes} materials={materials} />
      <Pixel position={[-0.51, -0.051, -0.025]} nodes={nodes} materials={materials} />
      <Pixel position={[-0.459, -0.102, -0.025]} nodes={nodes} materials={materials} />
      <Pixel position={[-0.459, -0.153, -0.025]} nodes={nodes} materials={materials} />
      <Pixel position={[-0.663, -0.102, -0.025]} nodes={nodes} materials={materials} />
      <Pixel position={[-0.663, -0.153, -0.025]} nodes={nodes} materials={materials} />
      <Pixel position={[-0.359, 0.153, -0.025]} nodes={nodes} materials={materials} />
      <Pixel position={[-0.359, 0.102, -0.025]} nodes={nodes} materials={materials} />
      <Pixel position={[-0.359, 0.051, -0.025]} nodes={nodes} materials={materials} />
      <Pixel position={[-0.359, 0, -0.025]} nodes={nodes} materials={materials} />
      <Pixel position={[-0.359, -0.051, -0.025]} nodes={nodes} materials={materials} />
      <Pixel position={[-0.359, -0.102, -0.025]} nodes={nodes} materials={materials} />
      <Pixel position={[-0.359, -0.153, -0.025]} nodes={nodes} materials={materials} />
      <Pixel position={[-0.308, -0.153, -0.025]} nodes={nodes} materials={materials} />
      <Pixel position={[-0.257, -0.153, -0.025]} nodes={nodes} materials={materials} />
      <Pixel position={[-0.206, -0.153, -0.025]} nodes={nodes} materials={materials} />
      <Pixel position={[-0.155, -0.153, -0.025]} nodes={nodes} materials={materials} />

      <mesh geometry={nodes.mesh_e.geometry} material={materials.mesh} position={[0.423, -0.058, -0.016]} />
      <mesh geometry={nodes.mesh_m.geometry} material={materials.mesh} position={[0.097, -0.047, -0.025]} />
      <mesh geometry={nodes.mesh_h.geometry} material={materials.mesh} position={[0.88, -0.017, -0.025]} />
      <mesh geometry={nodes.mesh_s.geometry} material={materials.mesh} position={[0.665, -0.061, -0.025]} />
    </animated.group>
  </group>
}

export default ModelLogo